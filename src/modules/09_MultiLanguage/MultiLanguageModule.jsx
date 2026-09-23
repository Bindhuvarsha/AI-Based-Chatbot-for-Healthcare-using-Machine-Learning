import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const MultiLanguageModule = () => {
  const { currentLang, setLanguage, LANGUAGES, t } = useLanguage();
  const [sourceText, setSourceText] = useState('Please take this medicine after food twice daily.');
  const [targetLang, setTargetLang] = useState('hi');
  const [translatedText, setTranslatedText] = useState('कृपया यह दवा भोजन के बाद दिन में दो बार लें।');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isDoctorModeActive, setIsDoctorModeActive] = useState(true);

  const sampleTranslations = {
    hi: 'कृपया यह दवा भोजन के बाद दिन में दो बार लें।',
    kn: 'ದಯವಿಟ್ಟು ಈ ಔಷಧಿಯನ್ನು ಊಟದ ನಂತರ ದಿನಕ್ಕೆ ಎರಡು ಬಾರಿ ತೆಗೆದುಕೊಳ್ಳಿ.',
    ta: 'தயவுசெய்து இந்த மருந்தை உணவுக்குப் பிறகு தினமும் இரண்டு முறை உட்கொள்ளவும்.',
    te: 'దయచేసి ఈ మందును భోజనం తర్వాత రోజుకు రెండుసార్లు తీసుకోండి.',
    ml: 'ദയവായി ഈ മരുന്ന് ഭക്ഷണത്തിന് ശേഷം ദിവസത്തിൽ രണ്ടുതവണ കഴിക്കുക.'
  };

  const handleTranslate = () => {
    setTranslatedText(sampleTranslations[targetLang] || 'Translated text...');
  };

  const playSpeech = (text) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      alert('Text-to-speech is not supported in this browser.');
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Multi-Language & Accessibility</h1>
          <p className="text-xs text-slate-500">Choose, translate, and communicate in your preferred Indian language.</p>
        </div>
        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-full border border-indigo-200">
          6 Regional Languages
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* 1. App Language Selection (Left Column) */}
        <div className="md:col-span-6 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">App Language Selection</h3>
            <span className="text-xs text-slate-400 font-medium">Instant UI Switch</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => setLanguage(l.code)}
                className={`p-3.5 rounded-2xl border text-left transition flex items-center justify-between ${
                  currentLang === l.code
                    ? 'bg-blue-50 border-blue-500 text-blue-900 font-bold ring-2 ring-blue-400/20'
                    : 'bg-slate-50/50 border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div>
                  <div className="text-xs">{l.name}</div>
                  <div className="text-sm font-semibold opacity-80">{l.native}</div>
                </div>
                {currentLang === l.code && <span className="text-blue-600 text-sm">✓</span>}
              </button>
            ))}
          </div>

          {/* Accessibility Mode Options */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Accessibility Features</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 cursor-pointer">
                <input type="checkbox" className="rounded text-blue-600" />
                <span className="font-semibold text-slate-700">Large Text (Aa)</span>
              </label>
              <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 cursor-pointer">
                <input type="checkbox" className="rounded text-blue-600" />
                <span className="font-semibold text-slate-700">High Contrast</span>
              </label>
              <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                <span className="font-semibold text-slate-700">Voice Assistance</span>
              </label>
              <label className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-blue-600" />
                <span className="font-semibold text-slate-700">Simple Words</span>
              </label>
            </div>
          </div>
        </div>

        {/* 2. Text & Voice Translation (Right Column) */}
        <div className="md:col-span-6 space-y-6">
          {/* Medical Text Translator */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Medical Text Translation</h3>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="bg-slate-100 border-none rounded-xl text-xs px-3 py-1 font-semibold text-slate-700"
              >
                <option value="hi">Hindi (हिंदी)</option>
                <option value="kn">Kannada (ಕನ್ನಡ)</option>
                <option value="ta">Tamil (தமிழ்)</option>
                <option value="te">Telugu (తెలుగు)</option>
                <option value="ml">Malayalam (മലയാളം)</option>
              </select>
            </div>

            <div>
              <textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                rows={3}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                placeholder="Type medical instruction or prescription note in English..."
              />
            </div>

            <button
              onClick={handleTranslate}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-600/20 transition"
            >
              Translate to {targetLang.toUpperCase()} →
            </button>

            {/* Translated Output Box */}
            <div className="p-3.5 bg-indigo-50/60 border border-indigo-100 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-indigo-900">
                <span>Translated Output</span>
                <button
                  onClick={() => playSpeech(translatedText)}
                  className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                >
                  <span>🔊</span> Listen Audio
                </button>
              </div>
              <p className="text-xs font-semibold text-slate-800 leading-relaxed">{translatedText}</p>
            </div>
          </div>

          {/* Doctor-Patient Live Translation Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">🩺</span>
                <h4 className="text-xs font-bold text-slate-900">Doctor Real-time Translation Mode</h4>
              </div>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full font-bold text-[10px]">
                Active
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Speak in Hindi / Regional language — the doctor sees English subtitles, and vice versa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MultiLanguageModule;
