import firebase_admin
from firebase_admin import credentials, db, firestore
from config import settings

# Initialize Firebase (use credentials file)
if settings.FIREBASE_CREDENTIALS_PATH and not firebase_admin._apps:
    cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS_PATH)
    firebase_admin.initialize_app(cred)

# Get Firestore client
firestore_db = firestore.client()

# Store user analyses
def save_analysis(user_id: str, analysis_data: dict):
    """Save symptom analysis to Firestore"""
    try:
        firestore_db.collection('analyses').document(user_id).set({
            'data': analysis_data,
            'timestamp': firestore.SERVER_TIMESTAMP
        }, merge=True)
        return True
    except Exception as e:
        print(f"Error saving analysis: {e}")
        return False

# Get user analyses
def get_user_analyses(user_id: str):
    """Get all analyses for a user"""
    try:
        doc = firestore_db.collection('analyses').document(user_id).get()
        if doc.exists:
            return doc.to_dict()
        return {}
    except Exception as e:
        print(f"Error retrieving analyses: {e}")
        return {}
