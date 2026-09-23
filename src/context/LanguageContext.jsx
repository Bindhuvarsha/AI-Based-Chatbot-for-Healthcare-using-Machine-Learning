// Language Context supporting English, Hindi, Kannada, Tamil, Telugu, Malayalam
import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिंदी' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' }
];

export const TRANSLATIONS = {
  en: {
    appName: "Jeeva Raksha",
    appTagline: "Compassionate Care, Anytime Anywhere",
    emergencySos: "Emergency SOS",
    tapToCall: "Tap for immediate emergency assistance",
    healthDashboard: "Health Dashboard",
    symptomChecker: "AI Symptom Checker",
    riskPrediction: "AI Health Risk Prediction",
    aiAssistant: "AI Health Assistant",
    voiceAssistant: "Voice Assistant",
    healthCheck: "Health Check",
    bloodSample: "Blood Sample Tracking",
    scanPrescription: "Scan Prescription (OCR)",
    medicineRecommend: "Medicine Recommendation",
    medicineReminder: "Smart Medicine Reminder",
    medicineDelivery: "Medicine Delivery",
    pharmacyFinder: "Nearby Pharmacy Finder",
    physiotherapy: "Physiotherapy",
    wearable: "Wearable Device Integration",
    consultation: "Skin & Hair Consultation",
    videoConsult: "Doctor Video Consultation",
    insurance: "Insurance Integration",
    familyDoctor: "Family Doctor & Health Insurance",
    scanner: "Document Scanner",
    analysis: "Deep Analysis",
    consolidatedReport: "Consolidated Report",
    blockchainRecords: "Blockchain Medical Records",
    adminAnalytics: "Admin Analytics Panel",
    welcomeBack: "Welcome back",
    healthScore: "Health Score",
    bpm: "bpm",
    normal: "Normal",
    optimal: "Optimal",
    stepsToday: "Steps Today",
    activeTime: "Active Time",
    calories: "Calories",
    allFeatures: "All Features",
    searchPlaceholder: "Search symptoms, medicines, doctors, or features..."
  },
  hi: {
    appName: "जीवा रक्षा",
    appTagline: "सहानुभूतिपूर्ण देखभाल, कभी भी कहीं भी",
    emergencySos: "आपातकालीन एसओएस",
    tapToCall: "तत्काल आपातकालीन सहायता के लिए टैप करें",
    healthDashboard: "स्वास्थ्य डैशबोर्ड",
    symptomChecker: "एआई लक्षण जांचकर्ता",
    riskPrediction: "एआई स्वास्थ्य जोखिम भविष्यवाणी",
    aiAssistant: "एआई स्वास्थ्य सहायक",
    voiceAssistant: "वॉयस सहायक",
    healthCheck: "स्वास्थ्य जांच",
    bloodSample: "रक्त नमूना ट्रैकिंग",
    scanPrescription: "पर्चा स्कैन (ओसीआर)",
    medicineRecommend: "दवा अनुशंसा",
    medicineReminder: "स्मार्ट दवा रिमाइंडर",
    medicineDelivery: "दवा वितरण",
    pharmacyFinder: "नजदीकी फार्मेसी खोजें",
    physiotherapy: "फिजियोथेरेपी",
    wearable: "पहनने योग्य उपकरण",
    consultation: "त्वचा और बाल परामर्श",
    videoConsult: "डॉक्टर वीडियो परामर्श",
    insurance: "बीमा एकीकरण",
    familyDoctor: "पारिवारिक डॉक्टर और बीमा",
    scanner: "दस्तावेज़ स्कैनर",
    analysis: "गहन विश्लेषण",
    consolidatedReport: "समेकित रिपोर्ट",
    blockchainRecords: "ब्लॉकचेन मेडिकल रिकॉर्ड्स",
    adminAnalytics: "एडमिन एनालिटिक्स",
    welcomeBack: "वापसी पर स्वागत है",
    healthScore: "स्वास्थ्य स्कोर",
    bpm: "बीपीएम",
    normal: "सामान्य",
    optimal: "उत्कृष्ट",
    stepsToday: "आज के कदम",
    activeTime: "सक्रिय समय",
    calories: "कैलोरी",
    allFeatures: "सभी सुविधाएं",
    searchPlaceholder: "लक्षण, दवाएं, डॉक्टर या सुविधाएं खोजें..."
  },
  kn: {
    appName: "ಜೀವ ರಕ್ಷಾ",
    appTagline: "ಕಾಳಜಿಯುಕ್ತ ಆರೈಕೆ, ಯಾವುದೇ ಸಮಯದಲ್ಲಿ ಎಲ್ಲಿಯಾದರೂ",
    emergencySos: "ತುರ್ತು ಎಸ್‌ಒಎಸ್",
    tapToCall: "ತಕ್ಷಣದ ತುರ್ತು ಸಹಾಯಕ್ಕಾಗಿ ಸ್ಪರ್ಶಿಸಿ",
    healthDashboard: "ಆರೋಗ್ಯ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    symptomChecker: "ಎಐ ರೋಗಲಕ್ಷಣ ತಪಾಸಣೆ",
    riskPrediction: "ಆರೋಗ್ಯ ಅಪಾಯ ಮುನ್ಸೂಚನೆ",
    aiAssistant: "ಎಐ ಆರೋಗ್ಯ ಸಹಾಯಕ",
    voiceAssistant: "ಧ್ವನಿ ಸಹಾಯಕ",
    healthCheck: "ಆರೋಗ್ಯ ತಪಾಸಣೆ",
    bloodSample: "ರಕ್ತದ ಮಾದರಿ ಟ್ರ್ಯಾಕಿಂಗ್",
    scanPrescription: "ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಸ್ಕ್ಯಾನ್",
    medicineRecommend: "ಔಷಧಿ ಶಿಫಾರಸು",
    medicineReminder: "ಔಷಧಿ ರಿಮೈಂಡರ್",
    medicineDelivery: "ಔಷಧಿ ಡೆಲಿವರಿ",
    pharmacyFinder: "ಹತ್ತಿರದ ಔಷಧಾಲಯ",
    physiotherapy: "ಫಿಸಿಯೋಥೆರಪಿ",
    wearable: "ವೇರಬಲ್ ಸಾಧನಗಳು",
    consultation: "ಚರ್ಮ ಮತ್ತು ಕೂದಲು ಸಲಹೆ",
    videoConsult: "ವೈದ್ಯರ ವೀಡಿಯೊ ಸಮಾಲೋಚನೆ",
    insurance: "ವಿಮೆ ಏಕೀಕರಣ",
    familyDoctor: "ಕುಟುಂಬ ವೈದ್ಯರು",
    scanner: "ಡಾಕ್ಯುಮೆಂಟ್ ಸ್ಕ್ಯಾನರ್",
    analysis: "ಆಳವಾದ ವಿಶ್ಲೇಷಣೆ",
    consolidatedReport: "ಸಮಗ್ರ ವರದಿ",
    blockchainRecords: "ಬ್ಲಾಕ್‌ಚೈನ್ ರೆಕಾರ್ಡ್ಸ್",
    adminAnalytics: "ಅಡ್ಮಿನ್ ವಿಶ್ಲೇಷಣೆ",
    welcomeBack: "ಮರಳಿ ಸ್ವಾಗತ",
    healthScore: "ಆರೋಗ್ಯ ಸ್ಕೋರ್",
    bpm: "ಬಿಪಿಎಂ",
    normal: "ಸಾಮಾನ್ಯ",
    optimal: "ಉತ್ತಮ",
    stepsToday: "ಇಂದಿನ ಹೆಜ್ಜೆಗಳು",
    activeTime: "ಸಕ್ರಿಯ ಸಮಯ",
    calories: "ಕ್ಯಾಲೋರಿಗಳು",
    allFeatures: "ಎಲ್ಲಾ ಸೌಲಭ್ಯಗಳು",
    searchPlaceholder: "ಹುಡುಕಿ..."
  },
  ta: {
    appName: "ஜீவ ரக்ஷா",
    appTagline: "அன்பான கவனிப்பு, எப்போதும் எங்கும்",
    emergencySos: "அவசர எஸ்ஓஎஸ்",
    tapToCall: "அவசர உதவிக்கு தட்டவும்",
    healthDashboard: "சுகாதார டாஷ்போர்டு",
    symptomChecker: "AI அறிகுறி சரிபார்ப்பான்",
    riskPrediction: "சுகாதார ஆபத்து கணிப்பு",
    aiAssistant: "AI சுகாதார உதவியாளர்",
    voiceAssistant: "குரல் உதவியாளர்",
    healthCheck: "சுகாதார சோதனை",
    bloodSample: "இரத்த மாதிரி கண்காணிப்பு",
    scanPrescription: "மருந்துச்சீட்டு ஸ்கேன்",
    medicineRecommend: "மருந்து பரிந்துரை",
    medicineReminder: "மருந்து நினைவூட்டல்",
    medicineDelivery: "மருந்து டெலிவரி",
    pharmacyFinder: "அருகிலுள்ள மருந்தகம்",
    physiotherapy: "பிசியோதெரபி",
    wearable: "ஸ்மார்ட் வாட்ச் இணைப்பு",
    consultation: "தோல் மற்றும் முடி ஆலோசனை",
    videoConsult: "மருத்துவர் வீடியோ ஆலோசனை",
    insurance: "காப்பீடு ஒருங்கிணைப்பு",
    familyDoctor: "குடும்ப மருத்துவர்",
    scanner: "ஸ்கேனர்",
    analysis: "விரிவான பகுப்பாய்வு",
    consolidatedReport: "ஒருங்கிணைந்த அறிக்கை",
    blockchainRecords: "பிளாக்செயின் பதிவுகள்",
    adminAnalytics: "நிர்வாக பகுப்பாய்வு",
    welcomeBack: "மீண்டும் வருக",
    healthScore: "சுகாதார மதிப்பெண்",
    bpm: "பிபிஎம்",
    normal: "சாதாரணமானது",
    optimal: "சிறந்தது",
    stepsToday: "இன்றைய படிகள்",
    activeTime: "செயலில் உள்ள நேரம்",
    calories: "கலோரிகள்",
    allFeatures: "அனைத்து அம்சங்கள்",
    searchPlaceholder: "தேடுங்கள்..."
  },
  te: {
    appName: "జీవ రక్ష",
    appTagline: "దయతో కూడిన సంరక్షణ, ఎప్పుడైనా ఎక్కడైనా",
    emergencySos: "ఎమర్జెన్సీ SOS",
    tapToCall: "తక్షణ అత్యవసర సహాయం కోసం నొక్కండి",
    healthDashboard: "ఆరోగ్య డాష్‌బోర్డ్",
    symptomChecker: "AI లక్షణాల తనిఖీ",
    riskPrediction: "ఆరోగ్య ప్రమాద అంచనా",
    aiAssistant: "AI ఆరోగ్య సహాయకుడు",
    voiceAssistant: "వాయిస్ అసిస్టెంట్",
    healthCheck: "ఆరోగ్య తనిఖీ",
    bloodSample: "రక్త నమూనా ట్రాకింగ్",
    scanPrescription: "ప్రిస్క్రిప్షన్ స్కాన్",
    medicineRecommend: "మందుల సిఫార్సు",
    medicineReminder: "మందుల రిమైండర్",
    medicineDelivery: "మందుల డెలివరీ",
    pharmacyFinder: "సమీప ఫార్మసీ",
    physiotherapy: "ఫిజియోథెరపీ",
    wearable: "స్మార్ట్‌వాచ్ అనుసంధానం",
    consultation: "చర్మ & జుట్టు సంప్రదింపులు",
    videoConsult: "డాక్టర్ వీడియో కన్సల్టేషన్",
    insurance: "భీమా అనుసంధానం",
    familyDoctor: "ఫ్యామిలీ డాక్టర్",
    scanner: "డాక్యుమెంట్ స్కానర్",
    analysis: "లోతైన విశ్లేషణ",
    consolidatedReport: "సమగ్ర నివేదిక",
    blockchainRecords: "బ్లాక్‌చెయిన్ రికార్డులు",
    adminAnalytics: "అడ్మిన్ అనలిటిక్స్",
    welcomeBack: "స్వాగతం",
    healthScore: "ఆరోగ్య స్కోర్",
    bpm: "బీపీఎం",
    normal: "సాధారణం",
    optimal: "అద్భుతం",
    stepsToday: "నేటి అడుగులు",
    activeTime: "క్రియాశీల సమయం",
    calories: "క్యాలరీలు",
    allFeatures: "అన్ని ఫీచర్లు",
    searchPlaceholder: "శోధించండి..."
  },
  ml: {
    appName: "ജീവ രക്ഷ",
    appTagline: "കരുതലോടെയുള്ള പരിചരണം, എപ്പോഴും എവിടെയും",
    emergencySos: "അടിയന്തിര SOS",
    tapToCall: "അടിയന്തര സഹായത്തിനായി ടാപ്പ് ചെയ്യുക",
    healthDashboard: "ആരോഗ്യ ഡാഷ്‌ബോർഡ്",
    symptomChecker: "AI രോഗലക്ഷണ പരിശോധന",
    riskPrediction: "ആരോഗ്യ അപകടസാധ്യത പ്രവചനം",
    aiAssistant: "AI ആരോഗ്യ സഹായി",
    voiceAssistant: "വോയ്‌സ് അസിസ്റ്റന്റ്",
    healthCheck: "ആരോഗ്യ പരിശോധന",
    bloodSample: "രക്ത സാമ്പിൾ ട്രാക്കിംഗ്",
    scanPrescription: "പ്രിസ്ക്രിപ്ഷൻ സ്കാൻ",
    medicineRecommend: "മരുന്ന് നിർദ്ദേശം",
    medicineReminder: "മരുന്ന് ഓർമ്മപ്പെടുത്തൽ",
    medicineDelivery: "മരുന്ന് വിതരണം",
    pharmacyFinder: "അടുത്തുള്ള ഫാർമസി",
    physiotherapy: "ഫിസിയോതെറാപ്പി",
    wearable: "സ്മാർട്ട് വാച്ച് കണക്ഷൻ",
    consultation: "ചർമ്മ & മുടി കൺസൾട്ടേഷൻ",
    videoConsult: "ഡോക്ടർ വീഡിയോ കൺസൾട്ടേഷൻ",
    insurance: "ഇൻഷുറൻസ് സേവനങ്ങൾ",
    familyDoctor: "കുടുംബ ഡോക്ടർ",
    scanner: "ഡോക്യുമെന്റ് സ്കാനർ",
    analysis: "ആഴത്തിലുള്ള വിശകലനം",
    consolidatedReport: "ഏകോപിത റിപ്പോർട്ട്",
    blockchainRecords: "ബ്ലോക്ക്‌ചെയിൻ രേഖകൾ",
    adminAnalytics: "അഡ്മിൻ അനലിറ്റിക്സ്",
    welcomeBack: "സ്വാഗതം",
    healthScore: "ആരോഗ്യ സ്കോർ",
    bpm: "ബിപിഎം",
    normal: "സാധാരണം",
    optimal: "മികച്ചത്",
    stepsToday: "ഇന്നത്തെ ചുവടുകൾ",
    activeTime: "സജീവ സമയം",
    calories: "കലോറികൾ",
    allFeatures: "എല്ലാ സേവനങ്ങളും",
    searchPlaceholder: "തിരയുക..."
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState(() => {
    try {
      return localStorage.getItem('jr_lang') || 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (code) => {
    setCurrentLang(code);
    try {
      localStorage.setItem('jr_lang', code);
    } catch (e) {
      console.warn(e);
    }
  };

  const t = (key) => {
    const langDict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    return langDict[key] || TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLang, setLanguage, t, LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
