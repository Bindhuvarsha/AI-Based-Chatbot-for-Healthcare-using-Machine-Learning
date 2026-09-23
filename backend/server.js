import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

// ─── LOAD & INDEX DATASET ─────────────────────────────────────────────────────
console.log('⏳ Loading symptoms dataset (streaming)...');

const CSV_PATH = path.join(__dirname, 'data_set.csv');
let diseaseSymptomMap = {};   // disease → Map<symptom, count>
let symptomDiseaseMap = {};   // symptom → Map<disease, count>
let totalRecords = 0;
let isDatasetLoaded = false;

try {
  const fileStream = fs.createReadStream(CSV_PATH, 'utf8');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let headers = [];
  let isFirstLine = true;

  rl.on('line', (line) => {
    line = line.trim();
    if (!line) return;

    if (isFirstLine) {
      // First line contains headers
      headers = line.split(',').map(h => h.trim().toLowerCase().replace(/_/g, ' '));
      isFirstLine = false;
      return;
    }

    const parts = line.split(',');
    if (parts.length < 2) return;

    const disease = parts[0].trim().toLowerCase();
    if (!disease) return;

    totalRecords++;
    if (!diseaseSymptomMap[disease]) diseaseSymptomMap[disease] = {};

    for (let j = 1; j < parts.length; j++) {
      if (parts[j].trim() === '1' && headers[j]) {
        const sym = headers[j];
        
        // Count symptom occurrence per disease (for frequency weighting)
        diseaseSymptomMap[disease][sym] = (diseaseSymptomMap[disease][sym] || 0) + 1;

        if (!symptomDiseaseMap[sym]) symptomDiseaseMap[sym] = {};
        symptomDiseaseMap[sym][disease] = (symptomDiseaseMap[sym][disease] || 0) + 1;
      }
    }
  });

  rl.on('close', () => {
    isDatasetLoaded = true;
    const diseaseCount = Object.keys(diseaseSymptomMap).length;
    const symptomCount = Object.keys(symptomDiseaseMap).length;
    console.log(`✓ Dataset loaded: ${totalRecords} records | ${diseaseCount} diseases | ${symptomCount} unique symptoms`);
  });

  rl.on('error', (err) => {
    console.error('❌ Failed to load dataset stream:', err.message);
  });

} catch (err) {
  console.error('❌ Failed to initiate dataset loading:', err.message);
}

// ─── PREDICTION ALGORITHM ─────────────────────────────────────────────────────
// Uses weighted Jaccard-style scoring:
//   score = (matched symptom frequency in disease) / (total symptom freq in disease + penalty for unmatched)
function predictFromDataset(inputSymptoms) {
  if (!inputSymptoms || inputSymptoms.length === 0) return [];

  const normalised = inputSymptoms.map(s => s.trim().toLowerCase());
  const scores = {};

  // Collect candidate diseases from symptom index
  normalised.forEach(sym => {
    const diseases = symptomDiseaseMap[sym];
    if (!diseases) return;
    Object.entries(diseases).forEach(([disease, freq]) => {
      scores[disease] = (scores[disease] || 0) + freq;
    });
  });

  if (Object.keys(scores).length === 0) return [];

  // Compute Jaccard-like confidence per candidate disease
  const results = Object.entries(scores).map(([disease, matchedScore]) => {
    const symFreqMap = diseaseSymptomMap[disease] || {};
    const totalSymFreq = Object.values(symFreqMap).reduce((a, b) => a + b, 0);

    // Jaccard similarity: intersection / union
    const intersection = matchedScore;
    const union = totalSymFreq + normalised.length - intersection;
    const jaccard = union > 0 ? intersection / union : 0;

    // Also compute symptom coverage: how many input symptoms matched
    const matchedCount = normalised.filter(s => symFreqMap[s]).length;
    const coverage = matchedCount / normalised.length;

    // Combined score
    const confidence = Math.round((jaccard * 0.6 + coverage * 0.4) * 100);

    return {
      name: disease.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      confidence: Math.min(confidence, 97),
      matchedSymptoms: matchedCount,
      totalInputSymptoms: normalised.length,
    };
  });

  // Sort by confidence, take top 5
  results.sort((a, b) => b.confidence - a.confidence);
  return results.slice(0, 5);
}

// ─── MULTILINGUAL RESPONSES ────────────────────────────────────────────────────
const responses = {
  fever: {
    English: "Based on your symptoms, you may have a fever.\n\n💊 What to take:\n✓ Paracetamol (e.g., Dolo 650 or Crocin 500mg) for fever and body ache.\n✓ Drink plenty of water and ORS to stay hydrated.\n✓ Get plenty of rest.\n\n👨‍⚕️ Suggested Doctor: General Physician",
    "हिंदी": "आपको बुखार लग रहा है।\n\n💊 क्या लें:\n✓ बुखार के लिए पैरासิตामोल (जैसे डोलो 650 या क्रोसिन 500mg) लें।\n✓ खूब पानी और ओआरएस पिएं।\n✓ आराम करें।\n\n👨‍⚕️ सुझाए गए डॉक्टर: सामान्य चिकित्सक (General Physician)",
    "ಕನ್ನಡ": "ನಿಮಗೆ ಜ್ವರ ಇರುವಂತಿದೆ.\n\n💊 ಏನು ತೆಗೆದುಕೊಳ್ಳಬೇಕು:\n✓ ಜ್ವರಕ್ಕೆ ಪ್ಯಾರಸಿಟಮಾಲ್ (ಉದಾ. ಡೋಲೋ 650) ತೆಗೆದುಕೊಳ್ಳಿ.\n✓ ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ ಮತ್ತು ವಿಶ್ರಾಂತಿ ಪಡೆಯಿರಿ.\n\n👨‍⚕️ ಸೂಚಿತ ವೈದ್ಯರು: ಸಾಮಾನ್ಯ ವೈದ್ಯರು (General Physician)",
    "தமிழ்": "உங்களுக்கு காய்ச்சல் உள்ளது.\n\n💊 என்ன எடுக்க வேண்டும்:\n✓ பாராசிட்டமால் (உம். டோலோ 650) எடுக்கவும்.\n✓ நிறைய தண்ணீர் குடிக்கவும்.\n\n👨‍⚕️ பரிந்துரைக்கப்பட்ட மருத்துவர்: பொது மருத்துவர்",
    "తెలుగు": "మీకు జ్వరం ఉన్నట్లుంది.\n\nఏమి తీసుకోవాలి:\n✓ జ్వరానికి పారాసిటమోల్ (ఉదా. డోలో 650) వాడండి.\n✓ తగినంత నీరు త్రాగాలి.\n\nసూಚించిన డాక్టర్: జనరల్ ఫిజీషియన్",
    "മലയാളം": "നിങ്ങൾക്ക് പനി ഉള്ളതായി തോന്നുന്നു.\n\nഎന്ത് കഴിക്കണം:\n✓ പനിക്ക് പാരസെറ്റമോൾ ഉപയോഗിക്കുക.\n✓ ധാരാളം വെള്ളം കുടിക്കുക.\n\nനിർദ്ദേശിക്കുന്ന ഡോക്ടർ: ജനറൽ ഫിസിഷ്യൻ"
  },
  cold: {
    English: "Based on your symptoms, you may have a cold or cough.\n\n💊 What to take:\n✓ Antihistamines like Cetirizine for a runny nose.\n✓ Cough syrup (e.g., Benadryl) or warm water with honey.\n✓ Steam inhalation 2-3 times a day.\n\n👨‍⚕️ Suggested Doctor: ENT Specialist or General Physician",
    "हिंदी": "आपको सर्दी या खांसी लग रही है।\n\n💊 क्या लें:\n✓ बहتی नाक के लिए सिटिरिज़িন।\n✓ ಕಫ್ ಸಿಿರಪ್ ಅಥವಾ ಜೇನುತುಪ್ಪದೊಂದಿಗೆ ಬಿಸಿ ನೀರು।\n✓ भाप लें।\n\n👨‍⚕️ सुझाए गए डॉक्टर: ईएनटी विशेषज्ञ या सामान्य चिकित्सक",
    "ಕನ್ನಡ": "ನಿಮಗೆ ಶೀತ ಅಥವಾ ಕೆಮ್ಮು ಇರುವಂತಿದೆ.\n\n💊 ಏನು ತೆಗೆದುಕೊಳ್ಳಬೇಕು:\n✓ ಹರಿಯುವ ಮೂಗಿಗೆ ಸೆಟಿರಿಜಿನ್.\n✓ ಕೆಮ್ಮಿನ ಸಿರಪ್ ಅಥವಾ ಜೇನುತುಪ್ಪದೊಂದಿಗೆ ಬಿಸಿ ನೀರು.\n✓ ಹಬೆ ತೆಗೆದುಕೊಳ್ಳಿ.\n\n👨‍⚕️ ಸೂಚಿತ ವೈದ್ಯರು: ಇಎನ್ಟಿ ತಜ್ಞ ಅಥವಾ ಸಾಮಾನ್ಯ ವೈದ್ಯರು",
    "தமிழ்": "உங்களுக்கு சளி அல்லது இருமல் உள்ளது.\n\n💊 என்ன எடுக்க வேண்டும்:\n✓ சளிக்கு சிட்டிரிசின்.\n✓ இருமல் சிரப்.\n✓ நீராவி பிடிக்கவும்.\n\n👨‍⚕️ பரிந்துரைக்கப்பட்ட மருத்துவர்: காது மூக்கு தொண்டை நிபுணர்",
    "తెలుగు": "మీకు జలుబు లేదా దగ్గు ఉన్నట్లుంది.\n\n💊 ఏమి తీసుకోవాలి:\n✓ జలుబుకు సిట్రిజిన్ వాడండి.\n✓ దగ్గు సిరప్ లేదా తేనెతో వేడి నీరు త్రాగాలి.\n✓ ఆవిరి పట్టాలి.\n\n👨‍⚕️ సూచించిన డాక్టర్: ఈఎన్‌టీ నిపుణుడు",
    "മലയാളം": "നിങ്ങൾക്ക് ജലദോഷമോ ചുമയോ ഉള്ളതായി തോന്നുന്നു.\n\n💊 എന്ത് കഴിക്കണം:\n✓ ജലദോഷത്തിന് సెటిరిసిൻ.\n✓ ചുമ സിറപ്പ് ഉപയോഗിക്കുക.\n✓ ആവി പിടിക്കുക.\n\n👨‍⚕️ നിർദ്ദേശിക്കുന്ന ഡോക്ടർ: ಇಎನ್ಟಿ ಸ್ಪೆಷ್ಯಲಿಸ್ಟ್"
  },
  headache: {
    English: "You seem to have a headache.\n\n💊 What to take:\n✓ Ibuprofen or Aspirin for pain relief.\n✓ Rest in a dark, quiet room.\n✓ Stay hydrated.\n\n👨‍⚕️ Suggested Doctor: Neurologist or General Physician",
    "ಕನ್ನಡ": "ನಿಮಗೆ ತಲೆನೋವು ಇರುವಂತಿದೆ.\n\n💊 ಏನು ತೆಗೆದುಕೊಳ್ಳಬೇಕು:\n✓ ನೋವು ನಿವಾರಣೆಗಾಗಿ ಐಬುಪ್ರೊಫೇನ್ ಅಥವಾ ಆಸ್ಪಿರಿನ್.\n✓ ಕತ್ತಲೆಯಾದ, ಶಾಂತ ಕೊಠಡಿಯಲ್ಲಿ ವಿಶ್ರಾಂತಿ ಪಡೆಯಿರಿ.\n\n👨‍⚕️ ಸೂಚಿತ ವೈದ್ಯರು: ನರರೋಗ ತಜ್ಞರು ಅಥವಾ ಸಾಮಾನ್ಯ ವೈದ್ಯರು"
  },
  stomach_pain: {
    English: "You seem to have stomach pain or acidity.\n\n💊 What to take:\n✓ Antacids (e.g., Digene or Eno) for acidity.\n✓ Drink plenty of water.\n✓ Avoid spicy or heavy food.\n\n👨‍⚕️ Suggested Doctor: Gastroenterologist",
    "ಕನ್ನಡ": "ನಿಮಗೆ ಹೊಟ್ಟೆ ನೋವು ಅಥವಾ ಅಸಿಡಿಟಿ ಇರುವಂತಿದೆ.\n\n💊 ಏನು ತೆಗೆದುಕೊಳ್ಳಬೇಕು:\n✓ ಅಸಿಡಿಟಿಗೆ ಆಂಟಾಸಿಡ್‌ಗಳು (ಉದಾ. ಡೈಜಿನ್).\n✓ ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ.\n\n👨‍⚕️ ಸೂಚಿತ ವೈದ್ಯರು: ಗ್ಯಾಸ್ಟ್ರೋಎಂಟರಾಲಜಿಸ್ಟ್"
  },
  severe: {
    English: "🚨 CRITICAL: Your symptoms indicate a possible emergency!\n\n⚠️ Immediate Precautions:\n✓ Sit or lie down and try to remain calm.\n✓ Loosen any tight clothing.\n✓ If you have prescribed heart medication (like Aspirin), take it immediately.\n✓ **CALL AN AMBULANCE (108) OR GO TO THE NEAREST EMERGENCY ROOM NOW.**\n✓ Do not wait—every minute counts.\n\n👨‍⚕️ Suggested Doctor: Cardiologist (Meet immediately)",
    "ಕನ್ನಡ": "🚨 ತುರ್ತು ಪರಿಸ್ಥಿತಿ: ನಿಮ್ಮ ಲಕ್ಷಣಗಳು ಗಂಭೀರವಾಗಿವೆ!\n\n⚠️ ತಕ್ಷಣದ ಮುನ್ನೆಚ್ಚರಿಕೆಗಳು:\n✓ ಶಾಂತವಾಗಿರಿ ಮತ್ತು ಆರಾಮದಾಯಕವಾಗಿ ಕುಳಿತುಕೊಳ್ಳಿ ಅಥವಾ ಮಲಗಿಕೊಳ್ಳಿ.\n✓ ಬಿಗಿಯಾದ ಬಟ್ಟೆಗಳನ್ನು ಸಡಿಲಗೊಳಿಸಿ.\n✓ ವೈದ್ಯರು ಸೂಚಿಸಿದ ಹೃದಯದ ಔಷಧಿಗಳಿದ್ದರೆ (ಉದಾ. ಆಸ್ಪಿರಿನ್) ತಕ್ಷಣ ತೆಗೆದುಕೊಳ್ಳಿ.\n✓ **ತಕ್ಷಣ ಅಂಬುಲೆನ್ಸ್‌ಗೆ ಕರೆ ಮಾಡಿ (108 ಡಯಲ್ ಮಾಡಿ) ಅಥವಾ ಆಸ್ಪತ್ರೆಗೆ ಹೋಗಿ.**\n✓ ತಡ ಮಾಡಬೇಡಿ—ತಕ್ಷಣ ವೈದ್ಯರನ್ನು ಭೇಟಿ ಮಾಡಿ.\n\n👨‍⚕️ ಸೂಚಿತ ವೈದ್ಯರು: ಹೃದ್ರೋಗ ತಜ್ಞರು (ತಕ್ಷಣ ಭೇಟಿ ಮಾಡಿ)"
  },
  default: {
    English: "Hello! I'm MedBot, your health assistant.\n\nPlease describe your symptoms (e.g., 'I have a fever' or 'I have a cold') so I can tell you what to take and which doctor to consult.",
    "हिंदी": "नमस्ते! मैं MedBot हूं। कृपया अपने लक्षण बताएं ताकि मैं आपको दवा और डॉक्टर का सुझाव दे सकूं।",
    "ಕನ್ನಡ": "ನಮಸ್ಕಾರ! ನಾನು MedBot. ದಯವಿಟ್ಟು ನಿಮ್ಮ ರೋಗಲಕ್ಷಣಗಳನ್ನು ತಿಳಿಸಿ, ನಾನು ಯಾವ ಔಷಧಿ ತೆಗೆದುಕೊಳ್ಳಬೇಕು ಮತ್ತು ಯಾವ ವೈದ್ಯರನ್ನು ಭೇಟಿಯಾಗಬೇಕು ಎಂದು ಸೂಚಿಸುತ್ತೇನೆ.",
    "தமிழ்": "வணக்கம்! நான் MedBot. உங்கள் அறிகுறிகளை கூறவும்.",
    "తెలుగు": "నమస్కారం! నేను MedBot. దయచేసి మీ లక్షణాలను వివరించండి.",
    "മലയാളം": "നമസ്കാരം! ഞാൻ MedBot. ನಿಮ್ಮ ಲಕ್ಷಣಗಳು പറയുക."
  }
};

const ayurvedic_responses = {
  fever: {
    English: "🌿 Ayurvedic Response for Fever:\n\n💊 Ayurvedic Medicine:\n✓ Maha Sudarshan Vati (1-2 tabs) with warm water.\n✓ Amritarishta (15-20ml) after meals.\n\n🌱 Home Remedies:\n✓ Drink Giloy juice or Tulsi water.\n✓ Take a decoction of Ginger and Black Pepper.\n\n👨‍⚕️ Suggested Doctor: Ayurvedic Physician (BAMS)",
    "ಕನ್ನಡ": "🌿 ಜ್ವರಕ್ಕೆ ಆಯುರ್ವೇದ ಚಿಕಿತ್ಸೆ:\n\n💊 ಆಯುರ್ವೇದ ಔಷಧಿಗಳು:\n✓ ಮಹಾಸುದರ್ಶನ ವಟಿ (1-2 ಮಾತ್ರೆ) ಬಿಸಿ ನೀರಿನೊಂದಿಗೆ.\n✓ ಅಮೃತಾರೀಷ್ಟ (15-20ಮಿಲಿ) ಊಟದ ನಂತರ.\n\n🌱 ಮನೆಮದ್ದು:\n✓ ಗಿಳೋಯ್ ಜ್ಯೂಸ್ ಅಥವಾ ತುಳಸಿ ನೀರು ಕುಡಿಯಿರಿ.\n✓ ಶುಂಠಿ ಮತ್ತು ಕರಿಮೆಣಸಿನ ಕಷಾಯ ಸೇವಿಸಿ.\n\n👨‍⚕️ ಸೂಚಿತ ವೈದ್ಯರು: ಆಯುರ್ವೇದ ವೈದ್ಯರು (BAMS)"
  },
  cold: {
    English: "🌿 Ayurvedic Response for Cold & Cough:\n\n💊 Ayurvedic Medicine:\n✓ Sitopaladi Churna (3g) with honey.\n✓ Tribhuvan Kirti Ras (125mg) twice a day.\n\n🌱 Home Remedies:\n✓ Drink Ginger tea or Turmeric milk (Golden milk).\n✓ Steam inhalation with Eucalyptus oil.\n\n👨‍⚕️ Suggested Doctor: Ayurvedic Physician",
    "ಕನ್ನಡ": "🌿 ಶೀತ ಮತ್ತು ಕೆಮ್ಮಿಗೆ ಆಯುರ್ವೇದ ಚಿಕಿತ್ಸೆ:\n\n💊 ಆಯುರ್ವೇದ ಔಷಧಿಗಳು:\n✓ ಸಿತೋಪಲಾದಿ ಚೂರ್ಣ (3ಗ್ರಾಂ) ಜೇನುತುಪ್ಪದೊಂದಿಗೆ.\n✓ ತ್ರಿಭುವನ ಕೀರ್ತಿ ರಸ.\n\n🌱 ಮನೆಮದ್ದು:\n✓ ಶುಂಠಿ ಚಹಾ ಅಥವಾ ಅರಿಶಿನ ಹಾಲು ಕುಡಿಯಿರಿ.\n✓ ನೀಲಗಿರಿ ಎಣ್ಣೆಯೊಂದಿಗೆ ಹಬೆ ತೆಗೆದುಕೊಳ್ಳಿ.\n\n👨‍⚕️ ಸೂಚಿತ ವೈದ್ಯರು: ಆಯುರ್ವೇದ ವೈದ್ಯರು"
  },
  headache: {
    English: "🌿 Ayurvedic Response for Headache:\n\n💊 Ayurvedic Medicine:\n✓ Pathyadi Kadha (15ml) with equal water.\n\n🌱 Home Remedies:\n✓ Apply Sandalwood paste or Nutmeg paste on the forehead.\n✓ Practice Pranayama (Breathing exercises).\n\n👨‍⚕️ Suggested Doctor: Ayurvedic Physician",
    "ಕನ್ನಡ": "🌿 ತಲೆನೋವಿಗೆ ಆಯುರ್ವೇದ ಚಿಕಿತ್ಸೆ:\n\n💊 ಆಯುರ್ವೇದ ಔಷಧಿಗಳು:\n✓ ಪಥ್ಯಾದಿ ಕಷಾಯ.\n\n🌱 ಮನೆಮದ್ದು:\n✓ ಹಣೆಗೆ ಶ್ರೀಗಂಧದ ಲೇಪನ ಹಚ್ಚಿ.\n✓ ಪ್ರಾಣಾಯಾಮ ಮಾಡಿ."
  },
  stomach_pain: {
    English: "🌿 Ayurvedic Response for Stomach Pain/Acidity:\n\n💊 Ayurvedic Medicine:\n✓ Shankh Vati or Hingwashtak Churna.\n\n🌱 Home Remedies:\n✓ Take half a teaspoon of Ajwain with warm water.\n✓ Drink Buttermilk with Cumin powder.\n\n👨‍⚕️ Suggested Doctor: Ayurvedic Physician",
    "ಕನ್ನಡ": "🌿 ಹೊಟ್ಟೆ ನೋವಿಗೆ ಆಯುರ್ವೇದ ಚಿಕಿತ್ಸೆ:\n\n💊 ಆಯುರ್ವೇದ ಔಷಧಿಗಳು:\n✓ ಶಂಖ ವಟಿ ಅಥವಾ ಹಿಂಗ್ವಾಷ್ಟಕ ಚೂರ್ಣ.\n\n🌱 ಮನೆಮದ್ದು:\n✓ ಬಿಸಿ ನೀರಿನೊಂದಿಗೆ ಓಮದ ಕಾಳು ಸೇವಿಸಿ.\n✓ ಜೀರಿಗೆ ಪುಡಿ ಹಾಕಿದ ಮಜ್ಜಿಗೆ ಕುಡಿಯಿರಿ."
  }
};

const languageMap = {
  'english': 'English', 'en': 'English',
  'hindi': 'हिंदी', 'hi': 'हिंदी',
  'kannada': 'ಕನ್ನಡ', 'kn': 'ಕನ್ನಡ',
  'tamil': 'தமிழ்', 'ta': 'தமிழ்',
  'telugu': 'తెలుగు', 'te': 'తెలుగు',
  'malayalam': 'മലയാളം', 'ml': 'മലയാളം',
};

const scriptMap = {
  'English': 'English', 'Hindi': 'हिंदी',
  'Kannada': 'ಕನ್ನಡ', 'Tamil': 'தமிழ்',
  'Telugu': 'తెలుగు', 'Malayalam': 'മലയാളം',
};

// ─── AI CHAT ENDPOINT ─────────────────────────────────────────────────────────
app.post('/api/chat', (req, res) => {
  let { message, language = 'English', isAyurveda = false } = req.body;
  let normalizedLang = scriptMap[language] || languageMap[language?.toLowerCase()] || 'English';
  let response = '';

  const msg = message.toLowerCase();
  const activeResponses = isAyurveda ? ayurvedic_responses : responses;
  
  if (msg.match(/chest pain|heart pain|difficulty breathing|breathless|ಬಹಳ ನೋವು|ಎದೆ ನೋವು|ಶ್ವಾಸಕೋಶದ ಸಮಸ್ಯೆ/)) {
    response = responses.severe[normalizedLang] || responses.severe.English;
  } else if (msg.match(/fever|temperature|बुखार|ಜ್ವರ|ಕಾಯಿಲೆ/)) {
    response = activeResponses.fever[normalizedLang] || activeResponses.fever.English;
  } else if (msg.match(/cold|cough|sneeze|ಶೀತ|ಕೆಮ್ಮು/)) {
    response = activeResponses.cold[normalizedLang] || activeResponses.cold.English;
  } else if (msg.match(/headache|head pain|ತಲೆನೋವು|ತಲೆ ನೋವು/)) {
    response = activeResponses.headache[normalizedLang] || activeResponses.headache.English;
  } else if (msg.match(/stomach|acidity|belly pain|ಹೊಟ್ಟೆ ನೋವು|ಹೊಟ್ಟೆನೋವು/)) {
    response = activeResponses.stomach_pain[normalizedLang] || activeResponses.stomach_pain.English;
  } else {
    response = isAyurveda ? "🌿 Namaste! I'm VaidyaBot. Please tell me your symptoms for Ayurvedic suggestions." : (responses.default[normalizedLang] || responses.default.English);
  }

  res.json({ success: true, response, language: normalizedLang, timestamp: new Date().toISOString() });
});

// ─── SYMPTOM PREDICTION ENDPOINT (uses real dataset) ──────────────────────────
app.post('/api/predict-symptoms', (req, res) => {
  const { symptoms } = req.body;

  if (!symptoms || symptoms.length === 0) {
    return res.json({
      success: false,
      error: 'No symptoms provided.',
      predictions: { conditions: [], confidence: 0 },
    });
  }

  // Normalize English symptom names to lowercase
  const normalizedInput = symptoms.map(s => s.trim().toLowerCase());
  const results = predictFromDataset(normalizedInput);

  if (results.length === 0) {
    return res.json({
      success: true,
      predictions: {
        conditions: [{ name: 'General Wellness Check', confidence: 70 }],
        confidence: 70,
      },
      advice: 'No specific condition matched. Please consult a healthcare professional.',
      timestamp: new Date().toISOString(),
    });
  }

  res.json({
    success: true,
    predictions: {
      conditions: results,
      confidence: results[0]?.confidence || 0,
    },
    advice: 'This prediction is based on a real medical symptoms dataset. Always consult a qualified healthcare professional for accurate diagnosis.',
    datasetInfo: {
      totalRecords,
      totalDiseases: Object.keys(diseaseSymptomMap).length,
      totalSymptoms: Object.keys(symptomDiseaseMap).length,
    },
    timestamp: new Date().toISOString(),
  });
});

// ─── DATASET STATS ENDPOINT ───────────────────────────────────────────────────
app.get('/api/dataset-stats', (req, res) => {
  res.json({
    success: true,
    totalRecords,
    totalDiseases: Object.keys(diseaseSymptomMap).length,
    totalSymptoms: Object.keys(symptomDiseaseMap).length,
    diseases: Object.keys(diseaseSymptomMap).slice(0, 50),
    topSymptoms: Object.entries(symptomDiseaseMap)
      .sort((a, b) => Object.keys(b[1]).length - Object.keys(a[1]).length)
      .slice(0, 30)
      .map(([sym, diseases]) => ({ symptom: sym, diseaseCount: Object.keys(diseases).length })),
    timestamp: new Date().toISOString(),
  });
});

// ─── HOSPITALS ENDPOINT ────────────────────────────────────────────────────────
const INDIA_HOSPITALS = {
  "Bangalore": [
    { name: "Apollo Hospitals Bangalore", address: "154, Cubbon Road", phone: "080-4000-4000", distance: 2.5, rating: 4.8 },
    { name: "Manipal Hospitals", address: "98, Rustum Bagh", phone: "080-4141-4000", distance: 3.2, rating: 4.7 },
    { name: "Fortis Hospital", address: "Bannerghatta Road", phone: "080-6659-2000", distance: 4.1, rating: 4.6 },
    { name: "Sakra World Hospital", address: "Devarabisanahalli", phone: "080-4160-0000", distance: 5.0, rating: 4.5 },
  ],
  "Delhi": [
    { name: "AIIMS Delhi", address: "Ansari Nagar, New Delhi", phone: "011-2658-8500", distance: 1.8, rating: 4.9 },
    { name: "Max Super Specialty Hospital", address: "Saket, Delhi", phone: "011-4141-4000", distance: 2.3, rating: 4.7 },
    { name: "Apollo Hospital Delhi", address: "Sarita Vihar", phone: "011-4141-0000", distance: 3.0, rating: 4.6 },
    { name: "Fortis Hospital", address: "Okhla Road", phone: "011-3088-8888", distance: 3.5, rating: 4.5 },
  ],
  "Mumbai": [
    { name: "Tata Memorial Hospital", address: "Dr E Borges Road, Parel", phone: "022-2417-7000", distance: 2.0, rating: 4.8 },
    { name: "Hinduja Hospital", address: "Mahim", phone: "022-6163-0000", distance: 2.5, rating: 4.7 },
    { name: "Kokilaben Hospital", address: "Andheri West", phone: "022-4269-6969", distance: 3.2, rating: 4.8 },
    { name: "Lilavati Hospital", address: "Bandra", phone: "022-2451-1111", distance: 3.5, rating: 4.7 },
  ],
  "default": [
    { name: "City General Hospital", address: "Central Medical Complex", phone: "XXX-XXX-XXXX", distance: 1.5, rating: 4.5 },
    { name: "Medical Care Center", address: "Health District", phone: "XXX-XXX-XXXX", distance: 2.0, rating: 4.4 },
    { name: "District Hospital", address: "Government Sector", phone: "XXX-XXX-XXXX", distance: 2.8, rating: 4.3 },
  ],
};

app.post('/api/hospitals', (req, res) => {
  const { city, radius } = req.body;
  const key = city ? Object.keys(INDIA_HOSPITALS).find(k => city.includes(k)) : null;
  const hospitals = INDIA_HOSPITALS[key] || INDIA_HOSPITALS["default"];
  res.json({ success: true, city, radius, hospitals, totalCount: hospitals.length, timestamp: new Date().toISOString() });
});

// ─── DAILY TIP ────────────────────────────────────────────────────────────────
const TIPS = [
  "Drink at least 8 glasses of water daily to stay hydrated.",
  "Exercise for 30 minutes every day to maintain good health.",
  "Get 7-8 hours of quality sleep for optimal recovery.",
  "Include more fruits and vegetables in your diet.",
  "Practice meditation or deep breathing for stress relief.",
  "Wash your hands regularly to prevent infections.",
  "Limit sugar and processed foods in your diet.",
  "Regular check-ups can prevent serious health issues.",
];

app.get('/api/daily-tip', (req, res) => {
  res.json({ success: true, tip: TIPS[Math.floor(Math.random() * TIPS.length)], timestamp: new Date().toISOString() });
});

// ─── HEALTH LIBRARY ────────────────────────────────────────────────────────────
app.get('/api/health-library', (req, res) => {
  res.json({
    success: true,
    articles: [
      { id: 1, title: "Understanding Seasonal Flu", category: "Infectious Diseases", content: "The seasonal flu is caused by influenza viruses.", readTime: "5 min" },
      { id: 2, title: "Heart Health Tips", category: "Cardiology", content: "Keep your heart healthy with proven lifestyle changes.", readTime: "7 min" },
      { id: 3, title: "Diabetes Management", category: "Endocrinology", content: "A guide to managing diabetes effectively.", readTime: "8 min" },
      { id: 4, title: "Mental Health and Stress", category: "Mental Health", content: "Understanding stress and practical techniques to manage it.", readTime: "6 min" },
    ],
    timestamp: new Date().toISOString(),
  });
});

// ─── HEALTH STATUS ─────────────────────────────────────────────────────────────
app.post('/api/health-status', (req, res) => {
  const { userId } = req.body;
  res.json({
    success: true, userId,
    metrics: {
      steps: Math.floor(Math.random() * 10000),
      calories: Math.floor(Math.random() * 2500),
      water: Math.floor(Math.random() * 8),
      sleep: (Math.random() * 4 + 5).toFixed(1),
      heartRate: Math.floor(Math.random() * 40 + 60),
    },
    timestamp: new Date().toISOString(),
  });
});

// ─── HEALTH CHECK ──────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: "Jeeva Raksha Backend is running! ✓",
    datasetLoaded: totalRecords > 0,
    totalRecords,
    totalDiseases: Object.keys(diseaseSymptomMap).length,
    totalSymptoms: Object.keys(symptomDiseaseMap).length,
    version: "2.0.0",
    timestamp: new Date().toISOString(),
  });
});

// ─── START SERVER ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n✓ Jeeva Raksha Backend v2.0 running on http://localhost:${PORT}`);
  console.log(`✓ Dataset: ${totalRecords} records | ${Object.keys(diseaseSymptomMap).length} diseases | ${Object.keys(symptomDiseaseMap).length} symptoms`);
  console.log(`\nEndpoints:`);
  console.log(`  POST /api/chat              - AI Chat`);
  console.log(`  POST /api/predict-symptoms  - Real Dataset Prediction`);
  console.log(`  GET  /api/dataset-stats     - Dataset Statistics`);
  console.log(`  POST /api/hospitals         - Find Hospitals`);
  console.log(`  GET  /api/daily-tip         - Daily Health Tip`);
  console.log(`  GET  /api/health-library    - Health Articles`);
  console.log(`  GET  /api/health            - Health Check\n`);
});
