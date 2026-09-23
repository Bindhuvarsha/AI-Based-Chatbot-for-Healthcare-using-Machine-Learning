import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    """Application settings"""
    # API Keys
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
    GOOGLE_MAPS_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY", "")
    
    # Firebase
    FIREBASE_PROJECT_ID = os.getenv("FIREBASE_PROJECT_ID", "")
    FIREBASE_CREDENTIALS_PATH = os.getenv("FIREBASE_CREDENTIALS_PATH", "")
    
    # App Settings
    CORS_ORIGINS = ["http://localhost:3000", "http://localhost:5173", "*"]
    API_TITLE = "Jeeva Raksha API"
    API_VERSION = "1.0.0"
    DEBUG = os.getenv("DEBUG", "True").lower() == "true"

settings = Settings()
