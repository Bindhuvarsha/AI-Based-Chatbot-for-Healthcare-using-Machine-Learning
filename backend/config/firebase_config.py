import firebase_admin
from firebase_admin import credentials, firestore
import os
from dotenv import load_dotenv

load_dotenv()

def initialize_firebase():
    cred_path = os.getenv("FIREBASE_SERVICE_ACCOUNT_JSON")
    if cred_path and os.path.exists(cred_path):
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
    else:
        # Fallback or error
        print("Firebase credentials not found. Ensure FIREBASE_SERVICE_ACCOUNT_JSON is set.")
        # If already initialized (e.g. during reload)
        if not firebase_admin._apps:
            firebase_admin.initialize_app()

db = firestore.client() if firebase_admin._apps else None
