import React, { useState, useEffect } from 'react';

export const VoiceAssistantModule = ({ onNavigate }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [assistantResponse, setAssistantResponse] = useState(
    'Namaste! I am listening. Say "Hey Health" followed by your command.'
  );
  const [activeIntent, setActiveIntent] = useState(null);

  const voiceCommands = [
    { cmd: '"Hey Health, check my symptoms"', target: '05_symptom_checker', label: 'Check Symptoms' },
    { cmd: '"Hey Health, show today\'s medicines"', target: '14_medicine_reminder', label: 'Medicine Reminder' },
    { cmd: '"Hey Health, book doctor appointment"', target: '20_video_consult', label: 'Book Doctor' },
    { cmd: '"Hey Health, call ambulance!"', target: '04_emergency_sos', label: 'Emergency SOS' },
    { cmd: '"Hey Health, open my lab reports"', target: '25_consolidated_report', label: 'Health Reports' },
    { cmd: '"Hey Health, nearest pharmacy"', target: '16_pharmacy_finder', label: 'Find Pharmacy' }
  ];

  const handleToggleListening = () => {
    if (!isListening) {
      setIsListening(true);
      setTranscript('Listening for voice...');
      // Simulated voice recognition if Web Speech not active
      setTimeout(() => {
        setTranscript('User said: "Check my symptoms"');
        setActiveIntent('Intent: Open Symptom Checker');
        setAssistantResponse('Opening AI Symptom Checker for you now...');
        setIsListening(false);
      }, 2500);
    } else {
      setIsListening(false);
    }
  };

  const handleCommandClick = (item) => {
    setTranscript(`Voice input: ${item.cmd}`);
    setActiveIntent(`Intent: Navigate to ${item.label}`);
    setAssistantResponse(`Opening ${item.label}...`);
    setTimeout(() => {
      onNavigate(item.target);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Voice-Based AI Assistant</h1>
          <p className="text-xs text-slate-500">
            Hands-free healthcare companion. Wake word: <strong className="text-blue-600">"Hey Health"</strong>.
          </p>
        </div>
        <span className="px-3 py-1 bg-teal-50 text-teal-700 font-bold text-xs rounded-full border border-teal-200">
          🎙️ Web Speech API & NLP
        </span>
      </div>

      {/* Main Interactive Mic Visualizer (Matches PDF Page 10) */}
      <div className="bg-gradient-to-tr from-[#0B132B] via-[#1C2541] to-[#0B132B] rounded-3xl p-8 text-white text-center shadow-xl relative overflow-hidden space-y-6">
        <div className="max-w-md mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
            <span>✨</span> Wake Word Activation: "Hey Health"
          </div>
          <h2 className="text-2xl font-black">Talk to Your Health Assistant</h2>
          <p className="text-xs text-slate-300">
            Ask questions about symptoms, medicine timings, or navigate across the entire app using your voice.
          </p>
        </div>

        {/* Pulsing Audio Waves & Microphone Button */}
        <div className="py-6 flex flex-col items-center justify-center relative">
          {/* Animated Wave Rings */}
          {isListening && (
            <>
              <div className="absolute w-44 h-44 rounded-full border-2 border-blue-400/40 animate-ping" />
              <div className="absolute w-60 h-60 rounded-full border border-teal-400/20 animate-pulse" />
            </>
          )}

          <button
            onClick={handleToggleListening}
            className={`w-28 h-28 rounded-full flex items-center justify-center text-4xl shadow-2xl transition transform hover:scale-105 active:scale-95 z-10 ${
              isListening
                ? 'bg-gradient-to-tr from-rose-500 to-rose-600 text-white ring-8 ring-rose-500/30 animate-pulse'
                : 'bg-gradient-to-tr from-blue-600 to-teal-500 text-white ring-8 ring-blue-500/20'
            }`}
          >
            {isListening ? '⏹️' : '🎙️'}
          </button>
          <span className="text-xs font-bold text-slate-300 mt-4 tracking-wider uppercase">
            {isListening ? 'Listening... Speak Now' : 'Tap Mic to Start Speaking'}
          </span>
        </div>

        {/* Real-Time Transcript & AI Speech Feedback */}
        <div className="max-w-lg mx-auto bg-[#070D1F]/80 backdrop-blur-md rounded-2xl p-4 border border-slate-700/60 text-left space-y-2 text-xs">
          <div className="flex items-center justify-between text-slate-400 text-[10px]">
            <span>VOICE RECOGNITION</span>
            {activeIntent && <span className="text-teal-400 font-bold">{activeIntent}</span>}
          </div>
          <div className="font-mono text-slate-200">{transcript || 'Say something like: "Hey Health, check symptoms"'}</div>
          <div className="pt-2 border-t border-slate-700/60 text-blue-300 font-medium">
            🤖 Assistant: {assistantResponse}
          </div>
        </div>
      </div>

      {/* Example Voice Commands Grid */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Try Saying These Commands</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {voiceCommands.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleCommandClick(item)}
              className="p-3.5 rounded-2xl border border-slate-200 hover:border-blue-300 bg-slate-50/50 hover:bg-blue-50 text-left transition group"
            >
              <div className="text-xs font-bold text-slate-800 group-hover:text-blue-700">{item.cmd}</div>
              <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                <span>Action: {item.label}</span>
                <span className="text-blue-600 font-bold">➔</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
export default VoiceAssistantModule;
