"""
Firebase Firestore service for data persistence
"""
import os
import json
from dotenv import load_dotenv
from typing import List, Dict, Optional, Any
from datetime import datetime
import firebase_admin
from firebase_admin import credentials, firestore

load_dotenv()


class FirestoreService:
    def __init__(self):
        self.db = None
        self.initialized = False
        self._initialize()

    def _initialize(self):
        """Initialize Firebase connection"""
        try:
            # Try to get credentials from environment or file
            cred_path = os.getenv("FIREBASE_CREDENTIALS_PATH")
            cred_json = os.getenv("FIREBASE_SERVICE_ACCOUNT_JSON")
            
            if cred_path and os.path.exists(cred_path):
                cred = credentials.Certificate(cred_path)
                firebase_admin.initialize_app(cred)
                self.db = firestore.client()
                self.initialized = True
                print("Firebase initialized from file")
            elif cred_json:
                # Parse JSON string from environment
                cred_dict = json.loads(cred_json)
                cred = credentials.Certificate(cred_dict)
                firebase_admin.initialize_app(cred)
                self.db = firestore.client()
                self.initialized = True
                print("Firebase initialized from JSON")
            else:
                print("Warning: Firebase credentials not found")
        except Exception as e:
            print(f"Firebase initialization error: {e}")

    # ============= CONSULTATION RECORDS =============

    async def save_consultation(self, consultation_data: Dict) -> Dict:
        """Save a consultation record"""
        if not self.initialized:
            return {"status": "error", "message": "Firebase not initialized"}

        try:
            consultation_data["created_at"] = datetime.now()
            doc_ref = self.db.collection("consultations").add(consultation_data)
            return {
                "status": "success",
                "consultation_id": doc_ref[1].id,
                "timestamp": datetime.now().isoformat()
            }
        except Exception as e:
            return {"status": "error", "message": str(e)}

    async def get_consultation_history(self, user_id: Optional[str] = None, limit: int = 10) -> Dict:
        """Retrieve consultation history"""
        if not self.initialized:
            return {"status": "error", "consultations": []}

        try:
            if user_id:
                query = self.db.collection("consultations").where("user_id", "==", user_id)
            else:
                query = self.db.collection("consultations")
            
            docs = query.order_by("created_at", direction=firestore.Query.DESCENDING).limit(limit).stream()
            
            consultations = []
            for doc in docs:
                data = doc.to_dict()
                data["id"] = doc.id
                consultations.append(data)
            
            return {
                "status": "success",
                "consultations": consultations,
                "count": len(consultations)
            }
        except Exception as e:
            return {"status": "error", "message": str(e), "consultations": []}

    async def get_consultation(self, consultation_id: str) -> Dict:
        """Get a specific consultation"""
        if not self.initialized:
            return {"status": "error"}

        try:
            doc = self.db.collection("consultations").document(consultation_id).get()
            if doc.exists:
                data = doc.to_dict()
                data["id"] = doc.id
                return {"status": "success", "consultation": data}
            else:
                return {"status": "error", "message": "Consultation not found"}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    # ============= CHAT HISTORY =============

    async def save_chat_message(self, conversation_id: str, message: Dict) -> Dict:
        """Save a chat message"""
        if not self.initialized:
            return {"status": "error"}

        try:
            message["timestamp"] = datetime.now()
            self.db.collection("chat_history").document(conversation_id).collection("messages").add(message)
            return {"status": "success"}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    async def get_chat_history(self, conversation_id: str, limit: int = 50) -> Dict:
        """Get chat history for a conversation"""
        if not self.initialized:
            return {"status": "error", "messages": []}

        try:
            docs = (
                self.db.collection("chat_history")
                .document(conversation_id)
                .collection("messages")
                .order_by("timestamp")
                .limit(limit)
                .stream()
            )
            
            messages = []
            for doc in docs:
                data = doc.to_dict()
                messages.append(data)
            
            return {"status": "success", "messages": messages}
        except Exception as e:
            return {"status": "error", "message": str(e), "messages": []}

    async def save_conversation_summary(self, conversation_id: str, summary: Dict) -> Dict:
        """Save conversation summary"""
        if not self.initialized:
            return {"status": "error"}

        try:
            summary["updated_at"] = datetime.now()
            self.db.collection("chat_history").document(conversation_id).set(summary, merge=True)
            return {"status": "success", "conversation_id": conversation_id}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    # ============= REMINDERS =============

    async def create_reminder(self, reminder_data: Dict) -> Dict:
        """Create a new reminder"""
        if not self.initialized:
            return {"status": "error"}

        try:
            reminder_data["created_at"] = datetime.now()
            doc_ref = self.db.collection("reminders").add(reminder_data)
            return {
                "status": "success",
                "reminder_id": doc_ref[1].id
            }
        except Exception as e:
            return {"status": "error", "message": str(e)}

    async def get_reminders(self, user_id: str) -> Dict:
        """Get all reminders for a user"""
        if not self.initialized:
            return {"status": "error", "reminders": []}

        try:
            docs = self.db.collection("reminders").where("user_id", "==", user_id).where("is_active", "==", True).stream()
            
            reminders = []
            for doc in docs:
                data = doc.to_dict()
                data["id"] = doc.id
                reminders.append(data)
            
            return {"status": "success", "reminders": reminders}
        except Exception as e:
            return {"status": "error", "message": str(e), "reminders": []}

    async def update_reminder(self, reminder_id: str, update_data: Dict) -> Dict:
        """Update a reminder"""
        if not self.initialized:
            return {"status": "error"}

        try:
            self.db.collection("reminders").document(reminder_id).set(update_data, merge=True)
            return {"status": "success"}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    async def delete_reminder(self, reminder_id: str) -> Dict:
        """Delete a reminder"""
        if not self.initialized:
            return {"status": "error"}

        try:
            self.db.collection("reminders").document(reminder_id).delete()
            return {"status": "success"}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    # ============= HEALTH PROFILE =============

    async def save_health_profile(self, user_id: str, profile_data: Dict) -> Dict:
        """Save or update health profile"""
        if not self.initialized:
            return {"status": "error"}

        try:
            profile_data["user_id"] = user_id
            profile_data["updated_at"] = datetime.now()
            self.db.collection("health_profiles").document(user_id).set(profile_data, merge=True)
            return {"status": "success", "user_id": user_id}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    async def get_health_profile(self, user_id: str) -> Dict:
        """Get health profile for a user"""
        if not self.initialized:
            return {"status": "error"}

        try:
            doc = self.db.collection("health_profiles").document(user_id).get()
            if doc.exists:
                return {"status": "success", "profile": doc.to_dict()}
            else:
                return {"status": "error", "message": "Profile not found"}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    # ============= EMERGENCY CONTACTS =============

    async def save_emergency_contacts(self, user_id: str, contacts: List[Dict]) -> Dict:
        """Save emergency contacts"""
        if not self.initialized:
            return {"status": "error"}

        try:
            for contact in contacts:
                contact["user_id"] = user_id
                contact["saved_at"] = datetime.now()
            
            self.db.collection("emergency_contacts").document(user_id).set({
                "contacts": contacts,
                "updated_at": datetime.now()
            }, merge=True)
            
            return {"status": "success"}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    async def get_emergency_contacts(self, user_id: str) -> Dict:
        """Get emergency contacts for a user"""
        if not self.initialized:
            return {"status": "error", "contacts": []}

        try:
            doc = self.db.collection("emergency_contacts").document(user_id).get()
            if doc.exists:
                contacts = doc.to_dict().get("contacts", [])
                return {"status": "success", "contacts": contacts}
            else:
                return {"status": "success", "contacts": []}
        except Exception as e:
            return {"status": "error", "message": str(e), "contacts": []}

    # ============= UTILITY METHODS =============

    async def cleanup_old_data(self, days: int = 90) -> Dict:
        """Clean up old consultation records"""
        if not self.initialized:
            return {"status": "error"}

        try:
            from datetime import timedelta
            cutoff_date = datetime.now() - timedelta(days=days)
            
            docs = self.db.collection("consultations").where("created_at", "<", cutoff_date).stream()
            
            count = 0
            for doc in docs:
                doc.reference.delete()
                count += 1
            
            return {"status": "success", "deleted_count": count}
        except Exception as e:
            return {"status": "error", "message": str(e)}

    def health_check(self) -> Dict:
        """Check Firebase connection status"""
        return {
            "initialized": self.initialized,
            "timestamp": datetime.now().isoformat()
        }


# Singleton instance
firestore_service = FirestoreService()
