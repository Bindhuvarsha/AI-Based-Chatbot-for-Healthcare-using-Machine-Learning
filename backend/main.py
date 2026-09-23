from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import (
    ChatRequest, ChatResponse, SymptomExtraction, Diagnosis,
    HospitalRequest, HospitalResponse, EmergencyRequest, EmergencyResponse,
    ReminderRequest, SaveConsultationRequest, ErrorResponse, MedicineRecommendations
)
from services.nlp_engine import nlp_engine
from services.maps_service import maps_service
from services.firestore_service import firestore_service
import uvicorn
import os
import uuid
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

app = FastAPI(title="Jeeva Raksha API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============= HEALTH CHECK =============

@app.get("/")
async def root():
    return {
        "message": "Welcome to Jeeva Raksha Healthcare API",
        "version": "1.0.0",
        "status": "operational"
    }

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "services": {
            "firebase": firestore_service.health_check()
        }
    }

# ============= CHAT & SYMPTOM ANALYSIS =============

@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Multi-turn chat endpoint for symptom analysis with conversational AI
    """
    try:
        # Validate input
        if not request.message or len(request.message.strip()) < 5:
            raise HTTPException(status_code=400, detail="Message too short")

        # Generate conversation ID if not provided
        conversation_id = request.conversation_id or str(uuid.uuid4())

        # Extract symptoms from user message
        extracted_symptoms = nlp_engine.extract_symptoms(request.message)

        # Get conversation context if requested
        context_text = ""
        accumulated_symptoms = []
        if request.include_context:
            context_text, accumulated_symptoms = nlp_engine.get_conversation_context(conversation_id)

        # Combine with extracted symptoms
        all_symptoms = list(set(accumulated_symptoms + extracted_symptoms))

        # Generate diagnosis if we have enough symptoms (or this is a follow-up)
        diagnosis = None
        if len(all_symptoms) >= 2 or len(accumulated_symptoms) > 0:
            diagnosis_response = await nlp_engine.get_diagnosis_from_openai(request.message, context_text)
            if "error" not in diagnosis_response:
                diagnosis = Diagnosis(**diagnosis_response) if isinstance(diagnosis_response, dict) else None

        # Generate medicine recommendations if diagnosis exists
        medicines = None
        if diagnosis:
            medicines_response = await nlp_engine.recommend_medicines(all_symptoms, diagnosis_response if isinstance(diagnosis_response, dict) else {})
            if "error" not in medicines_response:
                try:
                    medicines = MedicineRecommendations(**medicines_response)
                except:
                    medicines = None

        # Generate follow-up questions
        followup_questions = nlp_engine.generate_followup_questions(all_symptoms, {})

        # Create AI response message
        ai_message = f"I've identified the following symptoms from your description: {', '.join(extracted_symptoms)}"
        if diagnosis:
            ai_message += f"\n\nBased on your symptoms, here are possible conditions to discuss with a doctor."
        ai_message += f"\n\nSome follow-up questions: {followup_questions[0] if followup_questions else ''}"

        # Save conversation turns
        nlp_engine.save_conversation_turn(conversation_id, request.message, extracted_symptoms, diagnosis_response if isinstance(diagnosis_response, dict) else None)
        nlp_engine.save_assistant_message(conversation_id, ai_message)

        # Save to Firebase if user_id provided
        if request.user_id:
            await firestore_service.save_chat_message(conversation_id, {
                "role": "user",
                "content": request.message
            })
            await firestore_service.save_chat_message(conversation_id, {
                "role": "assistant",
                "content": ai_message
            })

        return ChatResponse(
            status="success",
            message=ai_message,
            symptoms_extracted=extracted_symptoms,
            symptoms_updated=all_symptoms,
            diagnosis=diagnosis,
            followup_questions=followup_questions,
            medicines=medicines,
            confidence_score=0.85 if diagnosis else 0.5
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat processing error: {str(e)}")


@app.post("/api/analyze-symptoms")
async def analyze_symptoms(request: ChatRequest):
    """
    Legacy endpoint - redirect to /api/chat
    """
    return await chat(request)


# ============= HOSPITAL & LOCATION SERVICES =============

@app.post("/api/nearby-hospitals", response_model=HospitalResponse)
async def get_hospitals(request: HospitalRequest):
    """
    Find nearby hospitals with optional specialty filtering
    """
    try:
        if not request.location:
            raise HTTPException(status_code=400, detail="Location is required")

        # Search hospitals
        if request.specialty:
            result = maps_service.search_hospitals_by_specialty(
                request.location,
                request.specialty,
                request.radius
            )
        else:
            result = maps_service.get_nearby_hospitals(
                request.location,
                request.radius,
                request.specialty,
                request.sort_by
            )

        if "error" in result:
            raise HTTPException(status_code=400, detail=result["error"])

        return HospitalResponse(
            status="success",
            hospitals=result.get("hospitals", []),
            total_found=result.get("total", 0)
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Hospital search error: {str(e)}")


@app.post("/api/emergency-services", response_model=EmergencyResponse)
async def get_emergency_services(request: EmergencyRequest):
    """
    Get nearby emergency services (hospitals with 24-hour ER, ambulances)
    """
    try:
        if not request.location:
            raise HTTPException(status_code=400, detail="Location is required")

        # Get emergency hospitals
        hospitals_result = maps_service.get_emergency_services(request.location)

        if "error" in hospitals_result:
            raise HTTPException(status_code=400, detail=hospitals_result["error"])

        nearby_hospitals = hospitals_result.get("emergency_services", [])
        nearest_emergency = nearby_hospitals[0] if nearby_hospitals else None

        return EmergencyResponse(
            status="success",
            nearby_hospitals=nearby_hospitals,
            ambulance_services=[],  # TODO: Integrate with ambulance APIs
            police_contacts=[],      # TODO: Integrate with police services
            fire_services=[],        # TODO: Integrate with fire services
            nearest_emergency=nearest_emergency
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Emergency services error: {str(e)}")


# ============= CONSULTATION HISTORY =============

@app.post("/api/consultations")
async def save_consultation(request: SaveConsultationRequest):
    """
    Save a consultation record to Firebase
    """
    try:
        consultation_data = {
            "user_id": request.user_id,
            "symptoms": request.symptoms,
            "diagnosis": request.diagnosis,
            "medicines": request.medicines,
            "hospital_referred": request.hospital_referred,
            "notes": request.notes,
            "status": "completed",
            "created_at": datetime.now().isoformat()
        }

        result = await firestore_service.save_consultation(consultation_data)
        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Consultation save error: {str(e)}")


@app.get("/api/consultations")
async def get_consultations(user_id: str = None, limit: int = 10):
    """
    Retrieve consultation history
    """
    try:
        result = await firestore_service.get_consultation_history(user_id, limit)
        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Consultation retrieval error: {str(e)}")


# ============= REMINDERS =============

@app.post("/api/reminders")
async def create_reminder(request: ReminderRequest):
    """
    Create a medicine reminder
    """
    try:
        reminder_data = {
            "user_id": request.user_id,
            "medicine_name": request.medicine_name,
            "dosage": request.dosage,
            "time": request.time,
            "frequency": request.frequency,
            "days": request.days,
            "notes": request.notes,
            "is_active": True
        }

        result = await firestore_service.create_reminder(reminder_data)
        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Reminder creation error: {str(e)}")


@app.get("/api/reminders/{user_id}")
async def get_reminders(user_id: str):
    """
    Get reminders for a user
    """
    try:
        result = await firestore_service.get_reminders(user_id)
        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Reminder retrieval error: {str(e)}")


@app.put("/api/reminders/{reminder_id}")
async def update_reminder(reminder_id: str, update_data: dict):
    """
    Update a reminder
    """
    try:
        result = await firestore_service.update_reminder(reminder_id, update_data)
        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Reminder update error: {str(e)}")


@app.delete("/api/reminders/{reminder_id}")
async def delete_reminder(reminder_id: str):
    """
    Delete a reminder
    """
    try:
        result = await firestore_service.delete_reminder(reminder_id)
        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Reminder deletion error: {str(e)}")


# ============= ERROR HANDLERS =============

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return {
        "status": "error",
        "message": exc.detail,
        "status_code": exc.status_code
    }


@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    return {
        "status": "error",
        "message": "An unexpected error occurred",
        "error": str(exc)
    }


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
