# Jeeva Raksha - AI-Based Healthcare Platform & Medical Chatbot

An intelligent healthcare application combining AI-powered symptom analysis with Machine Learning, multilingual conversational medical assistant (6 Indian languages + Ayurveda), hospital finder, and 27 healthcare modules.

---

## 🐍 Technology Stack

| Layer | Technology | Details |
|---|---|---|
| **Backend Framework** | **Python 3 (FastAPI & Uvicorn)** | High-performance asynchronous REST API |
| **Machine Learning / NLP** | **Scikit-Learn, Pandas, NumPy** | Jaccard similarity & symptom coverage algorithm over 246K records |
| **Multilingual AI** | **Python Regex & Script Mapping** | English, Hindi (हिंदी), Kannada (ಕನ್ನಡ), Tamil (தமிழ்), Telugu (తెలుగు), Malayalam (മലയാളം) |
| **Ayurvedic Medicine** | **Python Clinical Knowledge Engine** | Traditional remedies, dosages, and BAMS physician suggestions |
| **Frontend** | **React 18 + Vite + Tailwind CSS** | 27 comprehensive modular healthcare management interfaces |
| **Dataset** | **Clinical Dataset (246,945 records)** | 713 indexed diseases & 328 unique symptoms with binary instant cache |

---

## 🏗️ Project Structure

```
jeeva-raksha/
├── backend/
│   ├── server.py              # Main Python FastAPI backend server
│   ├── medical_dataset.py      # ML symptom prediction & dataset indexer
│   ├── dataset_cache.pkl       # Instant binary cache of 246K records (loads in <0.01s)
│   ├── build_cache.py         # Cache generation utility script
│   ├── config.py              # Configuration & environment settings
│   ├── requirements.txt       # Python dependencies (fastapi, uvicorn, scikit-learn, etc.)
│   └── data_set.csv           # Clinical dataset (246,945 records)
├── dist/                      # Production compiled web application
├── src/                       # React frontend source code (27 modules)
│   ├── UnifiedJeevaRakshaApp.jsx # Unified multi-module application router
│   ├── JeevaRaksha.jsx        # Classic single-page health suite
│   └── modules/               # 27 individual specialized healthcare modules
├── run_project.bat            # Dual runner: starts Python FastAPI backend + Vite frontend
├── run_python_app.bat         # Single-click launcher via Python stack
├── run_app.py                 # Pure Python web server & browser launcher
├── test_python_stack.py       # Comprehensive 13-point test suite for Python stack
├── vite.config.js             # Vite configuration with proxy to Python backend (port 3001)
├── package.json               # Frontend package definition
└── README.md                  # Project documentation
```

---

## 🚀 Quick Start

### Prerequisites
- **Python 3.8+** (Tested on Python 3.10, 3.11, 3.12, 3.13, 3.14)
- **Node.js 18+** (Optional for development mode; production is served directly via Python)

### 1. Install Python Dependencies
```bash
cd backend
pip install -r requirements.txt
cd ..
```

### 2. Start the Application

#### Option A: Single-Click Python Launcher (Recommended)
Double-click `run_python_app.bat` or run:
```bash
python run_app.py
```
> This starts the Python FastAPI server on `http://localhost:3001` and opens your browser automatically.

#### Option B: Standard Project Runner (Batch File)
Double-click `run_project.bat` or run:
```cmd
run_project.bat
```
> Starts Python FastAPI backend on `http://localhost:3001` and Vite frontend on `http://localhost:5173`.

#### Option C: Start Services Separately
**Terminal 1 (Backend):**
```bash
cd backend
python server.py --port 3001
```

**Terminal 2 (Frontend):**
```bash
npm run dev
```

---

## 🧪 Verification & Testing

To verify that all features, endpoints, and machine learning models are operational on Python:

```bash
python test_python_stack.py
```

### Expected Output:
```
============================================================
  🏥 JEEVA RAKSHA - PYTHON TECH STACK VERIFICATION SUITE
============================================================
  [PASS] 1. Health Check Endpoint (/api/health)
  [PASS] 2. Machine Learning Symptom Prediction (/api/predict-symptoms)
  [PASS] 3. Multilingual Chatbot - English Fever (/api/chat)
  [PASS] 4. Multilingual Chatbot - Kannada (/api/chat)
  [PASS] 5. Multilingual Chatbot - Hindi (/api/chat)
  [PASS] 6. Ayurvedic Consultation Mode (/api/chat)
  [PASS] 7. Emergency Critical Symptoms Triage (/api/chat)
  [PASS] 8. Hospital Finder by City (/api/hospitals)
  [PASS] 9. Dataset Statistics Endpoint (/api/dataset-stats)
  [PASS] 10. Daily Health Tip (/api/daily-tip)
  [PASS] 11. Clinical Health Library (/api/health-library)
  [PASS] 12. Patient Health Status & Biometrics (/api/health-status)
  [PASS] 13. Legacy Endpoints Compatibility (/analyze-symptoms & /similar-diseases)
============================================================
  RESULTS: 13/13 TESTS PASSED (100.0%)
============================================================
```

---

## 🌐 API Endpoints (Python FastAPI)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/chat` | Multilingual conversational AI (English, Hindi, Kannada, Tamil, Telugu, Malayalam) + Ayurveda |
| `POST` | `/api/predict-symptoms` | Real dataset ML symptom prediction using weighted Jaccard similarity & coverage |
| `GET` | `/api/dataset-stats` | Clinical dataset statistics (246K records, top symptoms, diseases) |
| `POST` | `/api/hospitals` | Hospital locator with city matching, contacts, ratings, distances |
| `GET` | `/api/daily-tip` | Verified daily wellness & medical tips |
| `GET` | `/api/health-library` | Curated clinical healthcare articles |
| `POST` | `/api/health-status` | Patient biometric tracking (heart rate, steps, sleep, hydration) |
| `GET` | `/api/health` | Health check endpoint with dataset load status |
| `GET` | `/docs` | Interactive Swagger UI API documentation |
| `GET` | `/redoc` | Interactive ReDoc API documentation |

---

## 📱 Features Included (27 Modules)

1. **Login & Patient Authentication** - OTP, Patient ID, Role selection
2. **App Home Dashboard** - SOS quick access, wellness score, health cards
3. **Health Vitals Dashboard** - Live charts, step tracker, BPM monitor
4. **Medical ID & Emergency SOS** - GPS dispatch, 108 ambulance link, ICE contacts
5. **Symptom Checker** - Multi-symptom selector, ML disease probability
6. **Health Risk Prediction** - Cardiac, Diabetes, and Hypertension risk assessment
7. **AI Health Assistant (MedBot)** - Conversational medical guidance
8. **Voice Assistant** - Speech recognition and voice audio feedback
9. **Multi-Language Switcher** - 6 Indian regional languages
10. **Health Checkup Score** - Comprehensive body health questionnaire
11. **Blood Sample Tracking** - Home collection tracking & phlebotomist map
12. **Prescription Scanner** - OCR medication extraction simulation
13. **Medicine Recommendations** - Generic substitutes, dosage, side-effects
14. **Smart Medicine Reminder** - Audio alarms, medication schedule
15. **Medicine Delivery Tracker** - Pharmacy order dispatch & live delivery
16. **Nearby Pharmacy Finder** - Local pharmacy location directory
17. **Physiotherapy & Rehab** - Exercise routines & posture guides
18. **Wearable Integration** - Smartwatch data synchronization
19. **Skin & Hair Consultation** - Dermatology screening assistance
20. **Doctor Video Consultation** - Virtual consultation room
21. **Insurance Integration** - Policy claims & cashless network
22. **Family Doctor Vault** - Family health records repository
23. **Medical Scanner** - Lab reports and prescription scanning
24. **Lab Report Analysis** - Biomarker breakdown and normal range flags
25. **Consolidated Health Report** - Printable comprehensive PDF summary
26. **Blockchain Health Records** - Tamper-evident hash ledger logs
27. **Admin Analytics** - Hospital bed occupancy & health metrics

---

## 📄 License
MIT License - Developed for Academic & Healthcare Research.