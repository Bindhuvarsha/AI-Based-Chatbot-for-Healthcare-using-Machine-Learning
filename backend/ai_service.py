import openai
import os
from config import settings

openai.api_key = settings.OPENAI_API_KEY

async def analyze_symptoms_with_ai(symptoms: list) -> dict:
    """Use OpenAI to analyze symptoms"""
    try:
        symptoms_text = ", ".join(symptoms)
        
        prompt = f"""
        A patient is experiencing the following symptoms: {symptoms_text}
        
        Based on these symptoms, provide:
        1. A list of potential diseases (with confidence scores 0-1)
        2. Recommended actions
        3. Severity assessment (mild, moderate, severe)
        4. Recommendation to see a doctor
        
        Format the response as a structured analysis with clear sections.
        Always include a disclaimer that this is not a medical diagnosis.
        """
        
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful medical information assistant. Provide evidence-based health information."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=1000
        )
        
        analysis_text = response.choices[0].message.content
        
        return {
            'analysis': analysis_text,
            'symptoms_input': symptoms,
            'model': 'gpt-3.5-turbo'
        }
    except Exception as e:
        print(f"Error in AI analysis: {e}")
        return {'error': str(e), 'symptoms_input': symptoms}

async def get_medical_advice(message: str) -> str:
    """Chat with AI for medical advice"""
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful medical information assistant. Provide evidence-based health information. Always remind users to consult healthcare professionals for medical diagnosis and treatment."},
                {"role": "user", "content": message}
            ],
            temperature=0.7,
            max_tokens=500
        )
        
        return response.choices[0].message.content
    except Exception as e:
        print(f"Error in chat: {e}")
        return f"Error: {str(e)}"
