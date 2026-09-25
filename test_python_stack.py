import sys
import os

if sys.platform.startswith('win'):
    try:
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')
        sys.stderr.reconfigure(encoding='utf-8', errors='replace')
    except Exception:
        pass

# Add backend directory to path
backend_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'backend')
sys.path.insert(0, backend_dir)

from fastapi.testclient import TestClient
from server import app

client = TestClient(app)

print("\n" + "=" * 60)
print("  🏥 JEEVA RAKSHA - PYTHON TECH STACK VERIFICATION SUITE")
print("=" * 60)

passed = 0
total = 0

def test_case(name, condition, details=""):
    global passed, total
    total += 1
    if condition:
        passed += 1
        print(f"  [PASS] {name}")
        if details:
            print(f"         └─ {details}")
    else:
        print(f"  [FAIL] {name}")
        if details:
            print(f"         └─ {details}")

# Test 1: Health Check
res = client.get("/api/health")
data = res.json()
test_case(
    "1. Health Check Endpoint (/api/health)",
    res.status_code == 200 and data.get("success") is True and data.get("datasetLoaded") is True,
    f"Status: {res.status_code}, Records: {data.get('totalRecords')}, Tech Stack: {data.get('techStack')}"
)

# Test 2: Symptom Prediction (Real Dataset ML)
res = client.post("/api/predict-symptoms", json={"symptoms": ["fever", "cough", "headache"]})
data = res.json()
conditions = data.get("predictions", {}).get("conditions", [])
test_case(
    "2. Machine Learning Symptom Prediction (/api/predict-symptoms)",
    res.status_code == 200 and len(conditions) > 0 and data.get("predictions", {}).get("confidence", 0) > 0,
    f"Top Diagnosis: {conditions[0]['name']} ({conditions[0]['confidence']}% confidence, {conditions[0]['matchedSymptoms']} matched)"
)

# Test 3: AI Chatbot - English Fever
res = client.post("/api/chat", json={"message": "I have high fever and shivering", "language": "English"})
data = res.json()
test_case(
    "3. Multilingual Chatbot - English Fever (/api/chat)",
    res.status_code == 200 and "Paracetamol" in data.get("response", ""),
    f"Response preview: {data.get('response', '')[:65]}..."
)

# Test 4: AI Chatbot - Kannada Language
res = client.post("/api/chat", json={"message": "ನನಗೆ ಜ್ವರ ಬಂದಿದೆ", "language": "Kannada"})
data = res.json()
test_case(
    "4. Multilingual Chatbot - Kannada (/api/chat)",
    res.status_code == 200 and ("ಜ್ವರ" in data.get("response", "") or "ಪ್ಯಾರಸಿಟಮಾಲ್" in data.get("response", "")),
    f"Language: {data.get('language')} | Response preview: {data.get('response', '')[:50]}..."
)

# Test 5: AI Chatbot - Hindi Language
res = client.post("/api/chat", json={"message": "मुझे तेज बुखार है", "language": "Hindi"})
data = res.json()
test_case(
    "5. Multilingual Chatbot - Hindi (/api/chat)",
    res.status_code == 200 and ("बुखार" in data.get("response", "") or "पैरासिटामोल" in data.get("response", "")),
    f"Language: {data.get('language')} | Response preview: {data.get('response', '')[:50]}..."
)

# Test 6: AI Chatbot - Ayurvedic Mode
res = client.post("/api/chat", json={"message": "I have a cold and cough", "language": "English", "isAyurveda": True})
data = res.json()
test_case(
    "6. Ayurvedic Consultation Mode (/api/chat)",
    res.status_code == 200 and "Ayurvedic" in data.get("response", ""),
    f"Response preview: {data.get('response', '')[:60]}..."
)

# Test 7: Emergency SOS / Critical Detection
res = client.post("/api/chat", json={"message": "I feel severe chest pain and difficulty breathing", "language": "English"})
data = res.json()
test_case(
    "7. Emergency Critical Symptoms Triage (/api/chat)",
    res.status_code == 200 and "108" in data.get("response", ""),
    f"Emergency advice triggered: 108 Ambulance / Cardiologist detected"
)

# Test 8: Hospitals Search
res = client.post("/api/hospitals", json={"city": "Bangalore", "radius": 5000})
data = res.json()
hospitals = data.get("hospitals", [])
test_case(
    "8. Hospital Finder by City (/api/hospitals)",
    res.status_code == 200 and len(hospitals) > 0,
    f"Found {len(hospitals)} hospitals in Bangalore (e.g. {hospitals[0]['name']})"
)

# Test 9: Dataset Statistics
res = client.get("/api/dataset-stats")
data = res.json()
test_case(
    "9. Dataset Statistics Endpoint (/api/dataset-stats)",
    res.status_code == 200 and data.get("totalRecords", 0) > 0,
    f"Total Records: {data.get('totalRecords')}, Diseases: {data.get('totalDiseases')}, Symptoms: {data.get('totalSymptoms')}"
)

# Test 10: Daily Tip
res = client.get("/api/daily-tip")
data = res.json()
test_case(
    "10. Daily Health Tip (/api/daily-tip)",
    res.status_code == 200 and "tip" in data,
    f"Tip: '{data.get('tip')}'"
)

# Test 11: Health Library Articles
res = client.get("/api/health-library")
data = res.json()
articles = data.get("articles", [])
test_case(
    "11. Clinical Health Library (/api/health-library)",
    res.status_code == 200 and len(articles) >= 4,
    f"Articles: {len(articles)} clinical guides loaded"
)

# Test 12: Health Biometrics Status
res = client.post("/api/health-status", json={"userId": "USR-1002"})
data = res.json()
metrics = data.get("metrics", {})
test_case(
    "12. Patient Health Status & Biometrics (/api/health-status)",
    res.status_code == 200 and "heartRate" in metrics and "steps" in metrics,
    f"Biometrics: Heart Rate {metrics.get('heartRate')} bpm, Steps {metrics.get('steps')}, Sleep {metrics.get('sleep')} hrs"
)

# Test 13: Legacy Endpoints (/analyze-symptoms & /similar-diseases)
res_legacy1 = client.post("/analyze-symptoms", json={"symptoms": ["chest tightness", "palpitations"]})
res_legacy2 = client.post("/similar-diseases", json={"symptoms": ["dizziness", "insomnia"]})
test_case(
    "13. Legacy Endpoints Compatibility (/analyze-symptoms & /similar-diseases)",
    res_legacy1.status_code == 200 and res_legacy2.status_code == 200,
    f"Legacy symptom analysis & disease matching operational"
)

print("=" * 60)
print(f"  RESULTS: {passed}/{total} TESTS PASSED ({passed/total*100:.1f}%)")
print("=" * 60 + "\n")
