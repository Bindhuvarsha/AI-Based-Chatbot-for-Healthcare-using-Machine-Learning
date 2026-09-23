"""
Pydantic models for request/response validation
"""
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime


# ============= CHAT & SYMPTOM ANALYSIS MODELS =============

class ChatMessage(BaseModel):
    """Single message in a conversation"""
    role: str  # "user" or "assistant"
    content: str
    timestamp: Optional[datetime] = None


class ChatRequest(BaseModel):
    """Request for chat/symptom analysis"""
    message: str
    user_id: Optional[str] = None
    conversation_id: Optional[str] = None
    include_context: bool = True


class SymptomExtraction(BaseModel):
    """Extracted symptoms from user input"""
    symptoms: List[str]
    severity_indicators: Dict[str, str]  # symptom -> severity (mild/moderate/severe)


class Diagnosis(BaseModel):
    """AI-generated diagnosis"""
    conditions: List[Dict[str, Any]]  # {name, probability, description}
    severity: str  # Low, Medium, High, Critical
    requires_immediate_attention: bool
    recommended_specialties: List[str]
    additional_tests: List[str]


class Medicine(BaseModel):
    """Medicine recommendation"""
    name: str
    type: str  # antibiotic, pain_reliever, etc.
    dosage: str
    frequency: str
    duration: str
    warnings: List[str]
    interactions: List[str]  # with other drugs


class MedicineRecommendations(BaseModel):
    """Response with medicine options"""
    medicines: List[Medicine]
    drug_interaction_warnings: List[str]
    over_the_counter_options: List[Medicine]
    prescription_required: List[Medicine]
    consultation_required: bool


class ChatResponse(BaseModel):
    """Response from chat endpoint"""
    status: str
    message: str  # AI's response message
    symptoms_extracted: List[str]
    symptoms_updated: List[str]  # accumulated across conversation
    diagnosis: Optional[Diagnosis] = None
    followup_questions: List[str]
    medicines: Optional[MedicineRecommendations] = None
    confidence_score: float  # 0-1


class ConversationHistory(BaseModel):
    """Stored conversation"""
    conversation_id: str
    user_id: Optional[str] = None
    messages: List[ChatMessage]
    symptoms_list: List[str]
    diagnosis: Optional[Diagnosis] = None
    created_at: datetime
    updated_at: datetime
    status: str  # active, completed, archived


# ============= HOSPITAL & LOCATION MODELS =============

class HospitalRequest(BaseModel):
    """Request for hospital search"""
    location: str  # lat,lng or address
    radius: int = 5000  # in meters
    specialty: Optional[str] = None  # filter by medical specialty
    sort_by: str = "distance"  # distance, rating, emergency_availability


class Hospital(BaseModel):
    """Hospital information"""
    id: str
    name: str
    address: str
    phone: str
    latitude: float
    longitude: float
    distance: float  # in km from user
    rating: Optional[float] = None
    reviews_count: Optional[int] = None
    emergency_available: bool
    specialties: List[str]
    opening_hours: Optional[str] = None
    website: Optional[str] = None


class HospitalResponse(BaseModel):
    """Response with hospitals"""
    status: str
    hospitals: List[Hospital]
    total_found: int


# ============= EMERGENCY SERVICES MODELS =============

class EmergencyContact(BaseModel):
    """Emergency contact information"""
    name: str
    phone: str
    type: str  # hospital, ambulance, police, fire
    distance: Optional[float] = None


class EmergencyRequest(BaseModel):
    """Request for emergency services"""
    location: str  # lat,lng or address
    emergency_type: str  # medical, accident, etc.
    user_id: Optional[str] = None


class EmergencyResponse(BaseModel):
    """Emergency services response"""
    status: str
    nearby_hospitals: List[Hospital]
    ambulance_services: List[EmergencyContact]
    police_contacts: List[EmergencyContact]
    fire_services: List[EmergencyContact]
    nearest_emergency: Hospital


# ============= REMINDERS & NOTIFICATIONS MODELS =============

class Reminder(BaseModel):
    """Medicine reminder"""
    id: Optional[str] = None
    user_id: str
    medicine_name: str
    dosage: str
    time: str  # HH:MM format
    frequency: str  # daily, weekly, custom
    days: Optional[List[str]] = None  # Mon, Tue, etc. for weekly
    notes: Optional[str] = None
    created_at: Optional[datetime] = None
    is_active: bool = True


class ReminderRequest(BaseModel):
    """Request to create/update reminder"""
    medicine_name: str
    dosage: str
    time: str
    frequency: str
    days: Optional[List[str]] = None
    notes: Optional[str] = None
    user_id: str


class NotificationCheckResponse(BaseModel):
    """Response with due reminders"""
    status: str
    due_reminders: List[Reminder]
    next_reminder_in_minutes: int


# ============= CONSULTATION & HISTORY MODELS =============

class ConsultationRecord(BaseModel):
    """Saved consultation"""
    id: Optional[str] = None
    user_id: Optional[str] = None
    symptoms: List[str]
    diagnosis: Diagnosis
    medicines: Optional[MedicineRecommendations] = None
    hospital_referred: Optional[str] = None
    notes: str
    created_at: datetime
    status: str  # pending, completed, cancelled


class SaveConsultationRequest(BaseModel):
    """Request to save consultation"""
    user_id: Optional[str] = None
    symptoms: List[str]
    diagnosis: Dict[str, Any]
    medicines: Optional[Dict[str, Any]] = None
    hospital_referred: Optional[str] = None
    notes: str


class ConsultationHistoryResponse(BaseModel):
    """Response with consultation history"""
    status: str
    consultations: List[ConsultationRecord]
    total_count: int


# ============= HEALTH PROFILE MODELS =============

class HealthProfile(BaseModel):
    """User health profile"""
    user_id: str
    age: int
    blood_type: str  # A+, B-, O+, etc.
    allergies: List[str]
    chronic_conditions: List[str]
    current_medications: List[str]
    emergency_contact_name: str
    emergency_contact_phone: str
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None


class HealthProfileRequest(BaseModel):
    """Request to create/update health profile"""
    user_id: str
    age: int
    blood_type: str
    allergies: List[str]
    chronic_conditions: List[str]
    current_medications: List[str]
    emergency_contact_name: str
    emergency_contact_phone: str


# ============= ERROR MODELS =============

class ErrorResponse(BaseModel):
    """Error response"""
    status: str = "error"
    message: str
    error_code: str
    details: Optional[Dict[str, Any]] = None
