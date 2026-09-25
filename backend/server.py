import sys
import os
import re
import random
import argparse
from datetime import datetime, timezone
from typing import List, Optional, Dict, Any

if sys.platform.startswith('win'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

# Add current directory to path
backend_dir = os.path.dirname(os.path.abspath(__file__))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from medical_dataset import medical_dataset

# ==============================================================================
# MULTILINGUAL RESPONSES & KNOWLEDGE BASE
# ==============================================================================
responses = {
    "fever": {
        "English": "Based on your symptoms, you may have a fever.\n\n💊 What to take:\n✓ Paracetamol (e.g., Dolo 650 or Crocin 500mg) for fever and body ache.\n✓ Drink plenty of water and ORS to stay hydrated.\n✓ Get plenty of rest.\n\n👨‍⚕️ Suggested Doctor: General Physician",
        "हिंदी": "आपको बुखार लग रहा है।\n\n💊 क्या लें:\n✓ बुखार के लिए पैरासिटामोल (जैसे डोलो 650 या क्रोसिन 500mg) लें।\n✓ खूब पानी और ओआरएस पिएं।\n✓ आराम करें।\n\n👨‍⚕️ सुझाए गए डॉक्टर: सामान्य चिकित्सक (General Physician)",
        "ಕನ್ನಡ": "ನಿಮಗೆ ಜ್ವರ ಇರುವಂತಿದೆ.\n\n💊 ಏನು ತೆಗೆದುಕೊಳ್ಳಬೇಕು:\n✓ ಜ್ವರಕ್ಕೆ ಪ್ಯಾರಸಿಟಮಾಲ್ (ಉದಾ. ಡೋಲೋ 650) ತೆಗೆದುಕೊಳ್ಳಿ.\n✓ ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ ಮತ್ತು ವಿಶ್ರಾಂತಿ ಪಡೆಯಿರಿ.\n\n👨‍⚕️ ಸೂಚಿತ ವೈದ್ಯರು: ಸಾಮಾನ್ಯ ವೈದ್ಯರು (General Physician)",
        "தமிழ்": "உங்களுக்கு காய்ச்சல் உள்ளது.\n\n💊 என்ன எடுக்க வேண்டும்:\n✓ பாராசிட்டமால் (உம். டோலோ 650) எடுக்கவும்.\n✓ நிறைய தண்ணீர் குடிக்கவும்.\n\n👨‍⚕️ பரிந்துரைக்கப்பட்ட மருத்துவர்: பொது மருத்துவர்",
        "తెలుగు": "మీకు జ్వరం ఉన్నట్లుంది.\n\nఏమి తీసుకోవాలి:\n✓ జ్వరానికి పారాసిటమోల్ (ఉదా. డోలో 650) వాడండి.\n✓ తగినంత నీరు త్రాగాలి.\n\nసూచించిన డాక్టర్: జనరల్ ఫిజీషియన్",
        "മലയാളം": "നിങ്ങൾക്ക് പനി ഉള്ളതായി തോന്നുന്നു.\n\nഎന്ത് കഴിക്കണം:\n✓ പനിക്ക് പാരസെറ്റമോൾ ഉപയോഗിക്കുക.\n✓ ധാരാളം വെള്ളം കുടിക്കുക.\n\nനിർദ്ദേശിക്കുന്ന ഡോക്ടർ: ജനറൽ ഫിസിഷ്യൻ"
    },
    "cold": {
        "English": "Based on your symptoms, you may have a cold or cough.\n\n💊 What to take:\n✓ Antihistamines like Cetirizine for a runny nose.\n✓ Cough syrup (e.g., Benadryl) or warm water with honey.\n✓ Steam inhalation 2-3 times a day.\n\n👨‍⚕️ Suggested Doctor: ENT Specialist or General Physician",
        "हिंदी": "आपको सर्दी या खांसी लग रही है।\n\n💊 क्या लें:\n✓ बहती नाक के लिए सिटिरिज़िन।\n✓ कफ सिरप या शहद के साथ गर्म पानी।\n✓ भाप लें।\n\n👨‍⚕️ सुझाए गए डॉक्टर: ईएनटी विशेषज्ञ या सामान्य चिकित्सक",
        "ಕನ್ನಡ": "ನಿಮಗೆ ಶೀತ ಅಥವಾ ಕೆಮ್ಮು ಇರುವಂತಿದೆ.\n\n💊 ಏನು ತೆಗೆದುಕೊಳ್ಳಬೇಕು:\n✓ ಹರಿಯುವ ಮೂಗಿಗೆ ಸೆಟಿರಿಜಿನ್.\n✓ ಕೆಮ್ಮಿನ ಸಿರಪ್ ಅಥವಾ ಜೇನುತುಪ್ಪದೊಂದಿಗೆ ಬಿಸಿ ನೀರು.\n✓ ಹಬೆ ತೆಗೆದುಕೊಳ್ಳಿ.\n\n👨‍⚕️ ಸೂಚಿತ ವೈದ್ಯರು: ಇಎನ್ಟಿ ತಜ್ಞ ಅಥವಾ ಸಾಮಾನ್ಯ ವೈದ್ಯರು",
        "தமிழ்": "உங்களுக்கு சளி அல்லது இருமல் உள்ளது.\n\n💊 என்ன எடுக்க வேண்டும்:\n✓ சளிக்கு சிட்டிரிசின்.\n✓ இருமல் சிரப்.\n✓ நீராவி பிடிக்கவும்.\n\n👨‍⚕️ பரிந்துரைக்கப்பட்ட மருத்துவர்: காது மூக்கு தொண்டை நிபுணர்",
        "తెలుగు": "మీకు జలుబు లేదా దగ్గు ఉన్నట్లుంది.\n\n💊 ఏమి తీసుకోవాలి:\n✓ జలుబుకు సిట్రిజిన్ వాడండి.\n✓ దగ్గు సిరప్ లేదా తేనెతో వేడి నీరు త్రాగాలి.\n✓ ఆవిరి పట్టాలి.\n\n👨‍⚕️ సూచించిన డాక్టర్: ఈఎన్‌టీ నిపుణుడు",
        "മലയാളം": "നിങ്ങൾക്ക് ജലദോഷമോ ചുമയോ ഉള്ളതായി തോന്നുന്നു.\n\n💊 എന്ത് കഴിക്കണം:\n✓ ജലദോഷത്തിന് സെറ്റിരിസിൻ.\n✓ ചുമ സിറപ്പ് ഉപയോഗിക്കുക.\n✓ ആവി പിടിക്കുക.\n\n👨‍⚕️ നിർദ്ദേശിക്കുന്ന ഡോക്ടർ: ഇഎൻടി സ്പെഷ്യലിസ്റ്റ്"
    },
    "headache": {
        "English": "You seem to have a headache.\n\n💊 What to take:\n✓ Ibuprofen or Aspirin for pain relief.\n✓ Rest in a dark, quiet room.\n✓ Stay hydrated.\n\n👨‍⚕️ Suggested Doctor: Neurologist or General Physician",
        "हिंदी": "आपको सिरदर्द लग रहा है।\n\n💊 क्या लें:\n✓ दर्द से राहत के लिए इबुप्रोफेन या पैरासिटामोल।\n✓ शांत कमरे में आराम करें।\n\n👨‍⚕️ सुझाए गए डॉक्टर: न्यूरोलॉजिस्ट या सामान्य चिकित्सक",
        "ಕನ್ನಡ": "ನಿಮಗೆ ತಲೆನೋವು ಇರುವಂತಿದೆ.\n\n💊 ಏನು ತೆಗೆದುಕೊಳ್ಳಬೇಕು:\n✓ ನೋವು ನಿವಾರಣೆಗಾಗಿ ಐಬುಪ್ರೊಫೇನ್ ಅಥವಾ ಆಸ್ಪಿರಿನ್.\n✓ ಕತ್ತಲೆಯಾದ, ಶಾಂತ ಕೊಠಡಿಯಲ್ಲಿ ವಿಶ್ರಾಂತಿ ಪಡೆಯಿರಿ.\n\n👨‍⚕️ ಸೂಚಿತ ವೈದ್ಯರು: ನರರೋಗ ತಜ್ಞರು ಅಥವಾ ಸಾಮಾನ್ಯ ವೈದ್ಯರು"
    },
    "stomach_pain": {
        "English": "You seem to have stomach pain or acidity.\n\n💊 What to take:\n✓ Antacids (e.g., Digene or Eno) for acidity.\n✓ Drink plenty of water.\n✓ Avoid spicy or heavy food.\n\n👨‍⚕️ Suggested Doctor: Gastroenterologist",
        "हिंदी": "आपको पेट दर्द या एसिडिटी लग रही है।\n\n💊 क्या लें:\n✓ एंटासिड (जैसे डाइजीन या ईनो)।\n✓ खूब पानी पिएं।\n\n👨‍⚕️ सुझाए गए डॉक्टर: गैस्ट्रोएंटेरोलॉजिस्ट",
        "ಕನ್ನಡ": "ನಿಮಗೆ ಹೊಟ್ಟೆ ನೋವು ಅಥವಾ ಅಸಿಡಿಟಿ ಇರುವಂತಿದೆ.\n\n💊 ಏನು ತೆಗೆದುಕೊಳ್ಳಬೇಕು:\n✓ ಅಸಿಡಿಟಿಗೆ ಆಂಟಾಸಿಡ್‌ಗಳು (ಉದಾ. ಡೈಜಿನ್).\n✓ ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ.\n\n👨‍⚕️ ಸೂಚಿತ ವೈದ್ಯರು: ಗ್ಯಾಸ್ಟ್ರೋಎಂಟರಾಲಜಿಸ್ಟ್"
    },
    "severe": {
        "English": "🚨 CRITICAL: Your symptoms indicate a possible emergency!\n\n⚠️ Immediate Precautions:\n✓ Sit or lie down and try to remain calm.\n✓ Loosen any tight clothing.\n✓ If you have prescribed heart medication (like Aspirin), take it immediately.\n✓ **CALL AN AMBULANCE (108) OR GO TO THE NEAREST EMERGENCY ROOM NOW.**\n✓ Do not wait—every minute counts.\n\n👨‍⚕️ Suggested Doctor: Cardiologist (Meet immediately)",
        "हिंदी": "🚨 आपातकालीन स्थिति: आपके लक्षण गंभीर संकेत दे रहे हैं!\n\n⚠️ तत्काल सावधानियां:\n✓ शांत होकर बैठें या लेट जाएं।\n✓ तुरंत एम्बुलेंस (108) को कॉल करें या नजदीकी अस्पताल जाएं।\n\n👨‍⚕️ सुझाए गए डॉक्टर: हृदय रोग विशेषज्ञ (तुरंत मिलें)",
        "ಕನ್ನಡ": "🚨 ತುರ್ತು ಪರಿಸ್ಥಿತಿ: ನಿಮ್ಮ ಲಕ್ಷಣಗಳು ಗಂಭೀರವಾಗಿವೆ!\n\n⚠️ ತಕ್ಷಣದ ಮುನ್ನೆಚ್ಚರಿಕೆಗಳು:\n✓ ಶಾಂತವಾಗಿರಿ ಮತ್ತು ಆರಾಮದಾಯಕವಾಗಿ ಕುಳಿತುಕೊಳ್ಳಿ ಅಥವಾ ಮಲಗಿಕೊಳ್ಳಿ.\n✓ ಬಿಗಿಯಾದ ಬಟ್ಟೆಗಳನ್ನು ಸಡಿಲಗೊಳಿಸಿ.\n✓ ವೈದ್ಯರು ಸೂಚಿಸಿದ ಹೃದಯದ ಔಷಧಿಗಳಿದ್ದರೆ (ಉದಾ. ಆಸ್ಪಿರಿನ್) ತಕ್ಷಣ ತೆಗೆದುಕೊಳ್ಳಿ.\n✓ **ತಕ್ಷಣ ಅಂಬುಲೆನ್ಸ್‌ಗೆ ಕರೆ ಮಾಡಿ (108 ಡಯಲ್ ಮಾಡಿ) ಅಥವಾ ಆಸ್ಪತ್ರೆಗೆ ಹೋಗಿ.**\n✓ ತಡ ಮಾಡಬೇಡಿ—ತಕ್ಷಣ ವೈದ್ಯರನ್ನು ಭೇಟಿ ಮಾಡಿ.\n\n👨‍⚕️ ಸೂಚಿತ ವೈದ್ಯರು: ಹೃದ್ರೋಗ ತಜ್ಞರು (ತಕ್ಷಣ ಭೇಟಿ ಮಾಡಿ)"
    },
    "default": {
        "English": "Hello! I'm MedBot, your AI health assistant.\n\nPlease describe your symptoms (e.g., 'I have a fever' or 'I have a cold') so I can tell you what to take and which doctor to consult.",
        "हिंदी": "नमस्ते! मैं MedBot हूं। कृपया अपने लक्षण बताएं ताकि मैं आपको दवा और डॉक्टर का सुझाव दे सकूं।",
        "ಕನ್ನಡ": "ನಮಸ್ಕಾರ! ನಾನು MedBot. ದಯವಿಟ್ಟು ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳನ್ನು ತಿಳಿಸಿ, ನಾನು ಯಾವ ಔಷಧಿ ತೆಗೆದುಕೊಳ್ಳಬೇಕು ಮತ್ತು ಯಾವ ವೈದ್ಯರನ್ನು ಭೇಟಿಯಾಗಬೇಕು ಎಂದು ಸೂಚಿಸುತ್ತೇನೆ.",
        "தமிழ்": "வணக்கம்! நான் MedBot. உங்கள் அறிகுறிகளை கூறவும்.",
        "తెలుగు": "నమస్కారం! నేను MedBot. దయచేసి మీ లక్షణాలను వివరించండి.",
        "മലയാളം": "നമസ്കാരം! ഞാൻ MedBot. നിങ്ങളുടെ ലക്ഷണങ്ങൾ പറയുക."
    }
}

ayurvedic_responses = {
    "fever": {
        "English": "🌿 Ayurvedic Response for Fever:\n\n💊 Ayurvedic Medicine:\n✓ Maha Sudarshan Vati (1-2 tabs) with warm water.\n✓ Amritarishta (15-20ml) after meals.\n\n🌱 Home Remedies:\n✓ Drink Giloy juice or Tulsi water.\n✓ Take a decoction of Ginger and Black Pepper.\n\n👨‍⚕️ Suggested Doctor: Ayurvedic Physician (BAMS)",
        "ಕನ್ನಡ": "🌿 ಜ್ವರಕ್ಕೆ ಆಯುರ್ವೇದ ಚಿಕಿತ್ಸೆ:\n\n💊 ಆಯುರ್ವೇದ ಔಷಧಿಗಳು:\n✓ ಮಹಾಸುದರ್ಶನ ವಟಿ (1-2 ಮಾತ್ರೆ) ಬಿಸಿ ನೀರಿನೊಂದಿಗೆ.\n✓ ಅಮೃತಾರೀಷ್ಟ (15-20ಮಿಲಿ) ಊಟದ ನಂತರ.\n\n🌱 ಮನೆಮದ್ದು:\n✓ ಗಿಳೋಯ್ ಜ್ಯೂಸ್ ಅಥವಾ ತುಳಸಿ ನೀರು ಕುಡಿಯಿರಿ.\n✓ ಶುಂಠಿ ಮತ್ತು ಕರಿಮೆಣಸಿನ ಕಷಾಯ ಸೇವಿಸಿ.\n\n👨‍⚕️ ಸೂಚಿತ ವೈದ್ಯರು: ಆಯುರ್ವೇದ ವೈದ್ಯರು (BAMS)"
    },
    "cold": {
        "English": "🌿 Ayurvedic Response for Cold & Cough:\n\n💊 Ayurvedic Medicine:\n✓ Sitopaladi Churna (3g) with honey.\n✓ Tribhuvan Kirti Ras (125mg) twice a day.\n\n🌱 Home Remedies:\n✓ Drink Ginger tea or Turmeric milk (Golden milk).\n✓ Steam inhalation with Eucalyptus oil.\n\n👨‍⚕️ Suggested Doctor: Ayurvedic Physician",
        "ಕನ್ನಡ": "🌿 ಶೀತ ಮತ್ತು ಕೆಮ್ಮಿಗೆ ಆಯುರ್ವೇದ ಚಿಕಿತ್ಸೆ:\n\n💊 ಆಯುರ್ವೇದ ಔಷಧಿಗಳು:\n✓ ಸಿತೋಪಲಾದಿ ಚೂರ್ಣ (3ಗ್ರಾಂ) ಜೇನುತುಪ್ಪದೊಂದಿಗೆ.\n✓ ತ್ರಿಭುವನ ಕೀರ್ತಿ ರಸ.\n\n🌱 ಮನೆಮದ್ದು:\n✓ ಶುಂಠಿ ಚಹಾ ಅಥವಾ ಅರಿಶಿನ ಹಾಲು ಕುಡಿಯಿರಿ.\n✓ ನೀಲಗಿರಿ ಎಣ್ಣೆಯೊಂದಿಗೆ ಹಬೆ ತೆಗೆದುಕೊಳ್ಳಿ.\n\n👨‍⚕️ ಸೂಚಿತ ವೈದ್ಯರು: ಆಯುರ್ವೇದ ವೈದ್ಯರು"
    },
    "headache": {
        "English": "🌿 Ayurvedic Response for Headache:\n\n💊 Ayurvedic Medicine:\n✓ Pathyadi Kadha (15ml) with equal water.\n\n🌱 Home Remedies:\n✓ Apply Sandalwood paste or Nutmeg paste on the forehead.\n✓ Practice Pranayama (Breathing exercises).\n\n👨‍⚕️ Suggested Doctor: Ayurvedic Physician",
        "ಕನ್ನಡ": "🌿 ತಲೆನೋವಿಗೆ ಆಯುರ್ವೇದ ಚಿಕಿತ್ಸೆ:\n\n💊 ಆಯುರ್ವೇದ ಔಷಧಿಗಳು:\n✓ ಪಥ್ಯಾದಿ ಕಷಾಯ.\n\n🌱 ಮನೆಮದ್ದು:\n✓ ಹಣೆಗೆ ಶ್ರೀಗಂಧದ ಲೇಪನ ಹಚ್ಚಿ.\n✓ ಪ್ರಾಣಾಯಾಮ ಮಾಡಿ."
    },
    "stomach_pain": {
        "English": "🌿 Ayurvedic Response for Stomach Pain/Acidity:\n\n💊 Ayurvedic Medicine:\n✓ Shankh Vati or Hingwashtak Churna.\n\n🌱 Home Remedies:\n✓ Take half a teaspoon of Ajwain with warm water.\n✓ Drink Buttermilk with Cumin powder.\n\n👨‍⚕️ Suggested Doctor: Ayurvedic Physician",
        "ಕನ್ನಡ": "🌿 ಹೊಟ್ಟೆ ನೋವಿಗೆ ಆಯುರ್ವೇದ ಚಿಕಿತ್ಸೆ:\n\n💊 ಆಯುರ್ವೇದ ಔಷಧಿಗಳು:\n✓ ಶಂಖ ವಟಿ ಅಥವಾ ಹಿಂಗ್ವಾಷ್ಟಕ ಚೂರ್ಣ.\n\n🌱 ಮನೆಮದ್ದು:\n✓ ಬಿಸಿ ನೀರಿನೊಂದಿಗೆ ಓಮದ ಕಾಳು ಸೇವಿಸಿ.\n✓ ಜೀರಿಗೆ ಪುಡಿ ಹಾಕಿದ ಮಜ್ಜಿಗೆ ಕುಡಿಯಿರಿ."
    }
}

LANGUAGE_MAP = {
    'english': 'English', 'en': 'English',
    'hindi': 'हिंदी', 'hi': 'हिंदी',
    'kannada': 'ಕನ್ನಡ', 'kn': 'ಕನ್ನಡ',
    'tamil': 'தமிழ்', 'ta': 'தமிழ்',
    'telugu': 'తెలుగు', 'te': 'తెలుగు',
    'malayalam': 'മലയാളം', 'ml': 'മലയാളം',
}

SCRIPT_MAP = {
    'English': 'English', 'Hindi': 'हिंदी',
    'Kannada': 'ಕನ್ನಡ', 'Tamil': 'தமிழ்',
    'Telugu': 'తెలుగు', 'Malayalam': 'മലയാളം',
}

INDIA_HOSPITALS = {
    "Bangalore": [
        {"name": "Apollo Hospitals Bangalore", "address": "154, Cubbon Road", "phone": "080-4000-4000", "distance": 2.5, "rating": 4.8},
        {"name": "Manipal Hospitals", "address": "98, Rustum Bagh", "phone": "080-4141-4000", "distance": 3.2, "rating": 4.7},
        {"name": "Fortis Hospital", "address": "Bannerghatta Road", "phone": "080-6659-2000", "distance": 4.1, "rating": 4.6},
        {"name": "Sakra World Hospital", "address": "Devarabisanahalli", "phone": "080-4160-0000", "distance": 5.0, "rating": 4.5},
    ],
    "Delhi": [
        {"name": "AIIMS Delhi", "address": "Ansari Nagar, New Delhi", "phone": "011-2658-8500", "distance": 1.8, "rating": 4.9},
        {"name": "Max Super Specialty Hospital", "address": "Saket, Delhi", "phone": "011-4141-4000", "distance": 2.3, "rating": 4.7},
        {"name": "Apollo Hospital Delhi", "address": "Sarita Vihar", "phone": "011-4141-0000", "distance": 3.0, "rating": 4.6},
        {"name": "Fortis Hospital", "address": "Okhla Road", "phone": "011-3088-8888", "distance": 3.5, "rating": 4.5},
    ],
    "Mumbai": [
        {"name": "Tata Memorial Hospital", "address": "Dr E Borges Road, Parel", "phone": "022-2417-7000", "distance": 2.0, "rating": 4.8},
        {"name": "Hinduja Hospital", "address": "Mahim", "phone": "022-6163-0000", "distance": 2.5, "rating": 4.7},
        {"name": "Kokilaben Hospital", "address": "Andheri West", "phone": "022-4269-6969", "distance": 3.2, "rating": 4.8},
        {"name": "Lilavati Hospital", "address": "Bandra", "phone": "022-2451-1111", "distance": 3.5, "rating": 4.7},
    ],
    "default": [
        {"name": "City General Hospital", "address": "Central Medical Complex", "phone": "080-2222-1111", "distance": 1.5, "rating": 4.5},
        {"name": "Medical Care Center", "address": "Health District", "phone": "080-3333-2222", "distance": 2.0, "rating": 4.4},
        {"name": "District Hospital", "address": "Government Sector", "phone": "080-4444-3333", "distance": 2.8, "rating": 4.3},
    ],
}

TIPS = [
    "Drink at least 8 glasses of water daily to stay hydrated.",
    "Exercise for 30 minutes every day to maintain good health.",
    "Get 7-8 hours of quality sleep for optimal recovery.",
    "Include more fruits and vegetables in your diet.",
    "Practice meditation or deep breathing for stress relief.",
    "Wash your hands regularly to prevent infections.",
    "Limit sugar and processed foods in your diet.",
    "Regular check-ups can prevent serious health issues.",
]

ARTICLES = [
    {"id": 1, "title": "Understanding Seasonal Flu", "category": "Infectious Diseases", "content": "The seasonal flu is caused by influenza viruses. Symptoms include sudden fever, chills, cough, and body aches.", "readTime": "5 min"},
    {"id": 2, "title": "Heart Health Tips", "category": "Cardiology", "content": "Keep your heart healthy with regular cardiovascular exercise, balanced low-sodium meals, and stress control.", "readTime": "7 min"},
    {"id": 3, "title": "Diabetes Management", "category": "Endocrinology", "content": "A comprehensive clinical guide to managing blood sugar effectively with diet, lifestyle, and timely vitals monitoring.", "readTime": "8 min"},
    {"id": 4, "title": "Mental Health and Stress", "category": "Mental Health", "content": "Understanding stressors, cognitive reframing, and practical mindfulness techniques to promote emotional equilibrium.", "readTime": "6 min"},
]

# ==============================================================================
# FASTAPI APPLICATION SETUP
# ==============================================================================
app = FastAPI(
    title="Jeeva Raksha AI Healthcare API",
    version="2.0.0",
    description="Python FastAPI backend for AI-powered symptom analysis, multilingual medical bot, and hospital finder."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Models
class ChatRequest(BaseModel):
    message: str
    language: Optional[str] = "English"
    isAyurveda: Optional[bool] = False

class SymptomPredictionRequest(BaseModel):
    symptoms: List[str]
    userId: Optional[str] = None
    user_id: Optional[str] = None

class HospitalRequest(BaseModel):
    city: Optional[str] = None
    radius: Optional[int] = 5000

class HealthStatusRequest(BaseModel):
    userId: Optional[str] = "patient_001"

# ==============================================================================
# API ENDPOINTS
# ==============================================================================

@app.post("/api/chat")
@app.post("/chat")
async def chat_endpoint(req: ChatRequest):
    """Multilingual medical AI chat assistant supporting English and Indian languages."""
    msg = req.message.lower().strip()
    lang = req.language or "English"
    normalized_lang = SCRIPT_MAP.get(lang) or LANGUAGE_MAP.get(lang.lower(), "English")
    is_ayurveda = bool(req.isAyurveda)

    active_responses = ayurvedic_responses if is_ayurveda else responses

    if re.search(r"chest pain|heart pain|difficulty breathing|breathless|ಬಹಳ ನೋವು|ಎದೆ ನೋವು|ಶ್ವಾಸಕೋಶದ ಸಮಸ್ಯೆ|सीने में दर्द|மூச்சுத்திணறல்", msg):
        answer = responses["severe"].get(normalized_lang) or responses["severe"]["English"]
    elif re.search(r"fever|temperature|बुखार|ಜ್ವರ|ಕಾಯಿಲೆ|காய்ச்சல்|జ్వరం|പനി", msg):
        cat = active_responses.get("fever", responses["fever"])
        answer = cat.get(normalized_lang) or cat.get("English", "")
    elif re.search(r"cold|cough|sneeze|ಶೀತ|ಕೆಮ್ಮು|सर्दी|खांसी|சளி|இருமல்|జలుబు|దగ్గు|ചുമ", msg):
        cat = active_responses.get("cold", responses["cold"])
        answer = cat.get(normalized_lang) or cat.get("English", "")
    elif re.search(r"headache|head pain|ತಲೆನೋವು|ತಲೆ ನೋವು|सिरदर्द|தலைவலி|తలనెప్పి|തലവേദന", msg):
        cat = active_responses.get("headache", responses["headache"])
        answer = cat.get(normalized_lang) or cat.get("English", "")
    elif re.search(r"stomach|acidity|belly pain|ಹೊಟ್ಟೆ ನೋವು|ಹೊಟ್ಟೆನೋವು|पेट दर्द|வயிற்று வலி|కడుపు నొప్పి|വയറുവേദന", msg):
        cat = active_responses.get("stomach_pain", responses["stomach_pain"])
        answer = cat.get(normalized_lang) or cat.get("English", "")
    else:
        if is_ayurveda:
            answer = "🌿 Namaste! I'm VaidyaBot. Please tell me your symptoms (e.g. fever, headache, cold) for Ayurvedic suggestions."
        else:
            cat = responses["default"]
            answer = cat.get(normalized_lang) or cat.get("English", "")

    timestamp = datetime.now(timezone.utc).isoformat()
    return {
        "success": True,
        "message": req.message,
        "response": answer,
        "language": normalized_lang,
        "isAyurveda": is_ayurveda,
        "timestamp": timestamp
    }

@app.post("/api/predict-symptoms")
async def predict_symptoms_endpoint(req: SymptomPredictionRequest):
    """Predict disease conditions from input symptoms using real 246K medical dataset."""
    if not req.symptoms:
        return {
            "success": False,
            "error": "No symptoms provided.",
            "predictions": {"conditions": [], "confidence": 0}
        }

    results = medical_dataset.predict_symptoms(req.symptoms)
    timestamp = datetime.now(timezone.utc).isoformat()

    if not results:
        return {
            "success": True,
            "predictions": {
                "conditions": [{"name": "General Wellness Check", "confidence": 70}],
                "confidence": 70
            },
            "advice": "No specific condition matched in dataset. Please consult a healthcare professional.",
            "timestamp": timestamp
        }

    return {
        "success": True,
        "predictions": {
            "conditions": results,
            "confidence": results[0]["confidence"] if results else 0
        },
        "advice": "This prediction is generated by Python machine learning logic on a clinical dataset of 246,945 records. Always consult a qualified medical professional.",
        "datasetInfo": {
            "totalRecords": medical_dataset.total_records,
            "totalDiseases": len(medical_dataset.disease_symptom_map),
            "totalSymptoms": len(medical_dataset.symptom_disease_map)
        },
        "timestamp": timestamp
    }

@app.post("/analyze-symptoms")
async def analyze_symptoms_endpoint(req: SymptomPredictionRequest):
    """Legacy endpoint for symptom analysis."""
    if not req.symptoms:
        raise HTTPException(status_code=400, detail="At least one symptom required")

    preds = medical_dataset.predict_symptoms(req.symptoms)
    conditions = [p["name"] for p in preds[:3]] if preds else ["General Viral Syndrome"]

    return {
        "symptoms": req.symptoms,
        "possible_conditions": conditions,
        "severity": "moderate" if any("pain" in s.lower() or "fever" in s.lower() for s in req.symptoms) else "mild",
        "recommendations": [
            "Please consult a healthcare professional for accurate diagnosis",
            "Monitor your vitals and symptoms closely",
            "Ensure hydration and adequate rest"
        ],
        "urgency": "medium",
        "confidence": preds[0]["confidence"] if preds else 75,
        "conditions": preds
    }

@app.post("/similar-diseases")
async def similar_diseases_endpoint(req: SymptomPredictionRequest):
    """Find similar diseases based on symptoms."""
    similar = medical_dataset.find_similar_diseases(req.symptoms)
    return {
        "input_symptoms": req.symptoms,
        "similar_diseases": similar,
        "count": len(similar)
    }

@app.get("/medical-info/{disease}")
async def medical_info_endpoint(disease: str):
    """Get information and symptom indicators for a disease."""
    info = medical_dataset.get_disease_info(disease)
    if not info:
        return {
            "disease": disease,
            "info": "Information not found in database. Please consult a doctor.",
            "from_ai": False
        }
    return {
        "disease": disease,
        "info": info,
        "from_ai": True
    }

@app.get("/api/dataset-stats")
async def dataset_stats_endpoint():
    """Get dataset statistics."""
    stats = medical_dataset.get_stats()
    stats["success"] = True
    stats["timestamp"] = datetime.now(timezone.utc).isoformat()
    return stats

@app.post("/api/hospitals")
async def hospitals_endpoint(req: HospitalRequest):
    """Find hospitals by city or location."""
    city_name = req.city or ""
    matched_key = "default"
    for k in INDIA_HOSPITALS:
        if k != "default" and k.lower() in city_name.lower():
            matched_key = k
            break

    hospitals = INDIA_HOSPITALS[matched_key]
    return {
        "success": True,
        "city": city_name,
        "radius": req.radius or 5000,
        "hospitals": hospitals,
        "totalCount": len(hospitals),
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

@app.get("/nearby-hospitals")
async def nearby_hospitals_get(lat: float = 12.9716, lng: float = 77.5946, radius: int = 5000):
    """Nearby hospital finder via coordinates."""
    hospitals = INDIA_HOSPITALS["Bangalore"]
    return {
        "hospitals": hospitals,
        "count": len(hospitals),
        "lat": lat,
        "lng": lng,
        "radius": radius
    }

@app.get("/api/daily-tip")
async def daily_tip_endpoint():
    """Get a daily health recommendation."""
    tip = random.choice(TIPS)
    return {
        "success": True,
        "tip": tip,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

@app.get("/api/health-library")
async def health_library_endpoint():
    """Get health and wellness articles."""
    return {
        "success": True,
        "articles": ARTICLES,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

@app.post("/api/health-status")
async def health_status_endpoint(req: HealthStatusRequest):
    """Simulated biometric and health tracking metrics."""
    return {
        "success": True,
        "userId": req.userId,
        "metrics": {
            "steps": random.randint(3000, 10000),
            "calories": random.randint(1200, 2500),
            "water": random.randint(3, 8),
            "sleep": round(random.uniform(5.5, 9.0), 1),
            "heartRate": random.randint(62, 98)
        },
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

@app.get("/api/health")
@app.get("/health")
async def health_check():
    """System health check endpoint."""
    return {
        "success": True,
        "message": "Jeeva Raksha Backend is running! ✓ (Python FastAPI)",
        "techStack": "Python 3 + FastAPI + Uvicorn + Scikit-Learn",
        "datasetLoaded": medical_dataset.is_loaded,
        "totalRecords": medical_dataset.total_records,
        "totalDiseases": len(medical_dataset.disease_symptom_map),
        "totalSymptoms": len(medical_dataset.symptom_disease_map),
        "version": "2.0.0",
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

# ==============================================================================
# STATIC FRONTEND SERVING (SERVES BUILT WEB APP VIA PYTHON)
# ==============================================================================
workspace_dir = os.path.dirname(backend_dir)
dist_dir = os.path.join(workspace_dir, "dist")
dist_assets = os.path.join(dist_dir, "assets")

if os.path.exists(dist_assets):
    app.mount("/assets", StaticFiles(directory=dist_assets), name="assets")

@app.get("/")
async def root(request: Request):
    """Serve frontend index.html if browser requests root, otherwise return API info."""
    accept = request.headers.get("accept", "")
    index_html = os.path.join(dist_dir, "index.html")
    if "text/html" in accept and os.path.exists(index_html):
        return FileResponse(index_html)

    return {
        "message": "Welcome to Jeeva Raksha Healthcare API (Python Stack)",
        "techStack": "Python 3 + FastAPI + Scikit-Learn",
        "version": "2.0.0",
        "endpoints": [
            "POST /api/chat",
            "POST /api/predict-symptoms",
            "GET  /api/dataset-stats",
            "POST /api/hospitals",
            "GET  /api/daily-tip",
            "GET  /api/health-library",
            "POST /api/health-status",
            "GET  /api/health",
            "POST /analyze-symptoms",
            "POST /similar-diseases",
            "GET  /medical-info/{disease}"
        ]
    }

# SPA Fallback for client-side routing
@app.exception_handler(404)
async def spa_fallback(request: Request, exc: HTTPException):
    index_html = os.path.join(dist_dir, "index.html")
    if os.path.exists(index_html) and not request.url.path.startswith("/api/"):
        return FileResponse(index_html)
    return JSONResponse(status_code=404, content={"detail": "Not Found"})

# ==============================================================================
# MAIN ENTRYPOINT
# ==============================================================================
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Jeeva Raksha Python Backend Server")
    parser.add_argument("--port", type=int, default=int(os.getenv("PORT", 3001)), help="Port to run server on")
    parser.add_argument("--host", type=str, default="0.0.0.0", help="Host IP to bind server to")
    args = parser.parse_args()

    port = args.port
    print(f"\n=======================================================")
    print(f"  ✓ Jeeva Raksha Python Backend v2.0")
    print(f"  ✓ Tech Stack: Python 3 + FastAPI + Uvicorn + Scikit-Learn")
    print(f"  ✓ Running on http://localhost:{port}")
    print(f"  ✓ Dataset: {medical_dataset.total_records} records | {len(medical_dataset.disease_symptom_map)} diseases | {len(medical_dataset.symptom_disease_map)} symptoms")
    print(f"=======================================================")
    print("Endpoints:")
    print("  POST /api/chat              - Multilingual AI Chatbot")
    print("  POST /api/predict-symptoms  - ML Dataset Symptom Prediction")
    print("  GET  /api/dataset-stats     - Dataset Analysis & Top Symptoms")
    print("  POST /api/hospitals         - Find Nearby Hospitals")
    print("  GET  /api/daily-tip         - Health Recommendation Tips")
    print("  GET  /api/health-library    - Clinical Articles")
    print("  POST /api/health-status     - Health Tracker Metrics")
    print("  GET  /api/health            - Health Status\n")

    import uvicorn
    uvicorn.run(app, host=args.host, port=port)
