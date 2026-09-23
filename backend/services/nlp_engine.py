import spacy
import pandas as pd
import openai
import os
import json
import re
from dotenv import load_dotenv
from typing import List, Dict, Optional, Tuple
from datetime import datetime

load_dotenv()

nlp = spacy.load("en_core_web_sm")
openai.api_key = os.getenv("OPENAI_API_KEY")

SEVERITY_KEYWORDS = {
    "mild": ["slight", "minor", "barely", "little", "minimal"],
    "moderate": ["some", "quite", "fairly", "rather", "somewhat"],
    "severe": ["extreme", "intense", "severe", "terrible", "unbearable", "worst"]
}


class NLPEngine:
    def __init__(self, dataset_path="backend/data/symptoms_dataset.csv"):
        try:
            self.df = pd.read_csv(dataset_path)
            # Normalize column names if needed
            self.df.columns = [c.strip().lower() for c in self.df.columns]
            # Create comprehensive symptom list
            if 'symptom' in self.df.columns:
                self.symptom_list = self.df['symptom'].dropna().unique().tolist()
            elif 'symptom_text' in self.df.columns:
                self.symptom_list = self.df['symptom_text'].dropna().unique().tolist()
            else:
                self.symptom_list = []
        except Exception as e:
            print(f"Error loading dataset: {e}")
            self.df = None
            self.symptom_list = []
        
        # Conversation memory
        self.conversation_memory: Dict[str, Dict] = {}

    def extract_symptoms(self, text: str) -> List[str]:
        """
        Extract symptoms from user input using NLP and dataset matching
        """
        doc = nlp(text.lower())
        extracted = []
        
        # Match against symptom list from dataset
        for symptom in self.symptom_list:
            # Check for direct match
            if symptom.lower() in text.lower():
                extracted.append(symptom)
            else:
                # Check for partial matches with individual words
                symptom_words = symptom.lower().split()
                text_lower = text.lower()
                if all(word in text_lower for word in symptom_words):
                    extracted.append(symptom)
        
        return list(set(extracted))

    def detect_severity(self, text: str, symptom: str) -> str:
        """
        Detect severity of a symptom from context (mild/moderate/severe)
        """
        text_lower = text.lower()
        
        for severity, keywords in SEVERITY_KEYWORDS.items():
            for keyword in keywords:
                if keyword in text_lower:
                    # Check if keyword is near the symptom
                    symptom_pos = text_lower.find(symptom.lower())
                    keyword_pos = text_lower.find(keyword)
                    if symptom_pos != -1 and keyword_pos != -1:
                        distance = abs(symptom_pos - keyword_pos)
                        if distance < 30:  # within 30 chars
                            return severity
        
        return "moderate"  # default

    def generate_followup_questions(self, symptoms: List[str], severity_map: Dict[str, str]) -> List[str]:
        """
        Generate follow-up questions to refine diagnosis
        """
        questions = []
        
        if not symptoms:
            return ["Could you describe what symptoms you're experiencing?"]
        
        # Ask about duration
        questions.append(f"How long have you had these symptoms? (hours/days/weeks)")
        
        # Ask about triggers
        questions.append("Did anything trigger these symptoms? (food, activity, stress, etc.)")
        
        # Ask about associated symptoms
        questions.append("Are you experiencing any fever, nausea, or fatigue?")
        
        # Ask about previous similar episodes
        questions.append("Have you experienced similar symptoms before?")
        
        # Ask about medications
        questions.append("Are you taking any medications that might be related?")
        
        return questions

    async def get_diagnosis_from_openai(self, symptoms_text: str, conversation_context: str = "") -> Dict:
        """
        Generate AI diagnosis with additional context
        """
        if not openai.api_key:
            return {
                "conditions": [],
                "severity": "Unknown",
                "requires_immediate_attention": False,
                "error": "OpenAI API Key not configured"
            }

        context_str = f"\n\nPrevious conversation context:\n{conversation_context}" if conversation_context else ""
        
        prompt = f"""
You are an experienced medical AI assistant. Based on the following symptoms, provide a structured medical analysis.

Symptoms reported: {symptoms_text}
{context_str}

Please provide your response in the following JSON format:
{{
    "conditions": [
        {{
            "name": "Condition name",
            "probability": 0.85,
            "description": "Brief description of condition"
        }}
    ],
    "severity": "Low/Medium/High/Critical",
    "requires_immediate_attention": true/false,
    "recommended_specialties": ["Specialty1", "Specialty2"],
    "additional_tests": ["Test1", "Test2"],
    "general_advice": "General health advice",
    "warning_signs": ["Sign1", "Sign2"]
}}

IMPORTANT DISCLAIMERS:
- This is NOT a substitute for professional medical advice
- Always consult a licensed healthcare provider for proper diagnosis
- In case of emergency, call emergency services immediately
"""

        try:
            response = await openai.ChatCompletion.acreate(
                model="gpt-4",
                messages=[
                    {
                        "role": "system",
                        "content": "You are a medical AI assistant providing structured diagnostic suggestions. Always prioritize user safety and recommend professional consultation."
                    },
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7
            )
            
            content = response.choices[0].message.content
            # Try to parse JSON from response
            try:
                # Find JSON in response
                json_match = re.search(r'\{[\s\S]*\}', content)
                if json_match:
                    return json.loads(json_match.group())
            except json.JSONDecodeError:
                pass
            
            # Fallback: return structured response
            return {
                "conditions": [],
                "severity": "Medium",
                "requires_immediate_attention": False,
                "response": content
            }
        except Exception as e:
            return {
                "conditions": [],
                "severity": "Unknown",
                "error": f"Error contacting OpenAI: {str(e)}"
            }

    async def recommend_medicines(self, symptoms: List[str], diagnosis: Dict) -> Dict:
        """
        Recommend medicines based on symptoms and diagnosis
        """
        if not openai.api_key:
            return {"error": "OpenAI API Key not configured", "medicines": []}

        symptoms_str = ", ".join(symptoms)
        conditions_str = ", ".join([c.get("name", "") for c in diagnosis.get("conditions", [])])
        
        prompt = f"""
You are a pharmacy consultant AI. Based on the following condition, recommend appropriate medicines.

Reported Symptoms: {symptoms_str}
Likely Conditions: {conditions_str}

Please provide recommendations in JSON format:
{{
    "over_the_counter": [
        {{
            "name": "Medicine name",
            "type": "Type (e.g., antibiotic, pain_reliever)",
            "dosage": "Recommended dosage",
            "frequency": "How often to take",
            "duration": "How long to take for",
            "warnings": ["Warning1", "Warning2"]
        }}
    ],
    "prescription_required": [
        {{
            "name": "Medicine name",
            "type": "Type",
            "dosage": "Typical dosage",
            "frequency": "Frequency",
            "warnings": ["Warning1", "Warning2"]
        }}
    ],
    "drug_interactions": ["Drug1 may interact with Drug2"],
    "consultation_required": true,
    "notes": "Additional medical notes"
}}

IMPORTANT:
- Avoid recommending antibiotics for viral infections
- Include common side effects and allergies
- Recommend consulting a doctor for prescription medications
"""

        try:
            response = await openai.ChatCompletion.acreate(
                model="gpt-4",
                messages=[
                    {
                        "role": "system",
                        "content": "You are a pharmacy consultant. Provide safe, evidence-based medicine recommendations with appropriate warnings."
                    },
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7
            )
            
            content = response.choices[0].message.content
            try:
                json_match = re.search(r'\{[\s\S]*\}', content)
                if json_match:
                    return json.loads(json_match.group())
            except json.JSONDecodeError:
                pass
            
            return {
                "over_the_counter": [],
                "prescription_required": [],
                "response": content
            }
        except Exception as e:
            return {
                "error": f"Error generating recommendations: {str(e)}",
                "medicines": []
            }

    def save_conversation_turn(self, conversation_id: str, user_message: str, symptoms: List[str], diagnosis: Optional[Dict] = None):
        """
        Save a conversation turn for context preservation
        """
        if conversation_id not in self.conversation_memory:
            self.conversation_memory[conversation_id] = {
                "created_at": datetime.now(),
                "messages": [],
                "accumulated_symptoms": []
            }
        
        self.conversation_memory[conversation_id]["messages"].append({
            "role": "user",
            "content": user_message,
            "timestamp": datetime.now()
        })
        
        # Accumulate symptoms
        for symptom in symptoms:
            if symptom not in self.conversation_memory[conversation_id]["accumulated_symptoms"]:
                self.conversation_memory[conversation_id]["accumulated_symptoms"].append(symptom)
        
        if diagnosis:
            self.conversation_memory[conversation_id]["latest_diagnosis"] = diagnosis

    def save_assistant_message(self, conversation_id: str, assistant_message: str):
        """
        Save assistant response in conversation
        """
        if conversation_id in self.conversation_memory:
            self.conversation_memory[conversation_id]["messages"].append({
                "role": "assistant",
                "content": assistant_message,
                "timestamp": datetime.now()
            })

    def get_conversation_context(self, conversation_id: str) -> Tuple[str, List[str]]:
        """
        Get context from conversation history
        """
        if conversation_id not in self.conversation_memory:
            return "", []
        
        conv = self.conversation_memory[conversation_id]
        messages_text = "\n".join([f"{m['role']}: {m['content']}" for m in conv['messages'][-5:]])  # last 5
        symptoms = conv['accumulated_symptoms']
        
        return messages_text, symptoms


nlp_engine = NLPEngine()
