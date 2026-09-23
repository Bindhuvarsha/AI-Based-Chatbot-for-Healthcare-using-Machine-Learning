from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from config import settings
from medical_dataset import medical_dataset

# Conditional imports for services that require API keys
try:
    from maps_service import find_nearby_hospitals, get_place_details
    MAPS_AVAILABLE = True
except Exception as e:
    print(f"Warning: Maps service not available - {e}")
    MAPS_AVAILABLE = False

try:
    from ai_service import analyze_symptoms_with_ai, get_medical_advice
    AI_AVAILABLE = True
except Exception as e:
    print(f"Warning: AI service not available - {e}")
    AI_AVAILABLE = False

try:
    import sys
    import os
    sys.path.append(os.path.join(os.path.dirname(__file__), '..'))
    from database.database import save_analysis, get_user_analyses
    DATABASE_AVAILABLE = True
except Exception as e:
    print(f"Warning: Database service not available - {e}")
    DATABASE_AVAILABLE = False

# Initialize FastAPI app
app = FastAPI(
    title=settings.API_TITLE,
    version=settings.API_VERSION,
    description="AI-powered medical symptom analyzer and healthcare finder"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response Models
class SymptomAnalysisRequest(BaseModel):
    symptoms: List[str]
    user_id: Optional[str] = None

class HospitalSearchRequest(BaseModel):
    latitude: float
    longitude: float
    radius: int = 5000

class MedicalInfoRequest(BaseModel):
    disease: str

class ChatRequest(BaseModel):
    message: str

class SimilarDiseasesRequest(BaseModel):
    symptoms: List[str]

# Routes
@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": "Welcome to Jeeva Raksha API",
        "version": settings.API_VERSION,
        "endpoints": [
            "/analyze-symptoms",
            "/similar-diseases",
            "/nearby-hospitals",
            "/medical-info/{disease}",
            "/chat",
            "/docs"
        ]
    }

@app.post("/analyze-symptoms")
async def analyze_symptoms(request: SymptomAnalysisRequest):
    """Analyze symptoms using AI"""
    try:
        if not request.symptoms:
            raise HTTPException(status_code=400, detail="At least one symptom required")

        if not AI_AVAILABLE:
            # Fallback analysis using dataset
            similar_diseases = medical_dataset.find_similar_diseases(request.symptoms)
            analysis = {
                "symptoms": request.symptoms,
                "possible_conditions": [d["disease"] for d in similar_diseases[:3]],
                "severity": "moderate",
                "recommendations": [
                    "Please consult a healthcare professional for accurate diagnosis",
                    "Monitor your symptoms closely",
                    "Rest and stay hydrated"
                ],
                "urgency": "medium",
                "note": "AI analysis unavailable - using basic symptom matching"
            }
        else:
            analysis = await analyze_symptoms_with_ai(request.symptoms)

        # Save to database if user_id provided and database is available
        if request.user_id and DATABASE_AVAILABLE:
            save_analysis(request.user_id, analysis)
        elif request.user_id and not DATABASE_AVAILABLE:
            print(f"Warning: Database not available, analysis not saved for user {request.user_id}")

        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/similar-diseases")
async def find_similar_diseases(request: SimilarDiseasesRequest):
    """Find similar diseases based on symptoms from dataset"""
    try:
        if not request.symptoms:
            raise HTTPException(status_code=400, detail="At least one symptom required")
        
        similar = medical_dataset.find_similar_diseases(request.symptoms)
        
        return {
            "input_symptoms": request.symptoms,
            "similar_diseases": similar,
            "count": len(similar)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/nearby-hospitals")
async def nearby_hospitals(lat: float, lng: float, radius: int = 5000):
    """Find nearby hospitals"""
    try:
        if not -90 <= lat <= 90 or not -180 <= lng <= 180:
            raise HTTPException(status_code=400, detail="Invalid coordinates")

        if not MAPS_AVAILABLE:
            # Return mock hospital data
            return {
                "hospitals": [
                    {
                        "name": "City General Hospital",
                        "address": "123 Main St, Your City",
                        "phone": "+1-555-0123",
                        "rating": 4.2,
                        "distance": "2.1 km",
                        "place_id": "mock_hospital_1"
                    },
                    {
                        "name": "Regional Medical Center",
                        "address": "456 Health Ave, Your City",
                        "phone": "+1-555-0456",
                        "rating": 4.5,
                        "distance": "3.8 km",
                        "place_id": "mock_hospital_2"
                    }
                ],
                "note": "Google Maps API not configured - showing sample data"
            }

        hospitals = find_nearby_hospitals(lat, lng, radius)
        return hospitals
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/medical-info/{disease}")
async def get_medical_info(disease: str):
    """Get medical information about a disease"""
    try:
        if not disease or len(disease) < 2:
            raise HTTPException(status_code=400, detail="Invalid disease name")
        
        disease_info = medical_dataset.get_disease_info(disease)
        
        if not disease_info:
            # Return generic info if not found in dataset
            return {
                "disease": disease,
                "info": "Information not found in database. Please consult a healthcare professional.",
                "from_ai": False
            }
        
        return {
            "disease": disease,
            "info": disease_info,
            "from_ai": False
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat")
async def chat(request: ChatRequest):
    """Chat with AI for medical advice"""
    try:
        if not request.message or len(request.message) < 2:
            raise HTTPException(status_code=400, detail="Invalid message")

        if not AI_AVAILABLE:
            # Fallback response
            response = "I'm sorry, but the AI medical assistant is currently unavailable due to missing API configuration. Please consult a healthcare professional for medical advice. For testing purposes, you can use the symptom analysis feature with our medical dataset."
        else:
            response = await get_medical_advice(request.message)

        return {
            "message": request.message,
            "response": response
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}

# Error handlers
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return {"detail": exc.detail, "status_code": exc.status_code}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=settings.DEBUG)
