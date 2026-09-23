import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export const AiHealthAssistantModule = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: `Hello ${currentUser?.name || 'Rahul'}! I'm MedBot, your AI Health Assistant. How can I help you with your health, medications, or lab reports today?`,
      time: '10:30 AM'
    },
    {
      sender: 'user',
      text: 'Can you explain my blood test report from yesterday?',
      time: '10:31 AM'
    },
    {
      sender: 'bot',
      text: `Sure! Here is a simple summary of your latest blood panel (18 May 2025):
• Hemoglobin: 13.2 g/dL (Normal)
• WBC Count: 6,200 /µL (Healthy immune response)
• Platelet Count: 2.45 Lakhs (Normal range)
• Vitamin D: 18 ng/mL (⚠️ Slightly Low - Normal is >30)
• Total Cholesterol: 210 mg/dL (Borderline)`,
      time: '10:32 AM'
    },
    {
      sender: 'user',
      text: 'What can I do to improve my Vitamin D levels naturally?',
      time: '10:33 AM'
    },
    {
      sender: 'bot',
      text: `To improve Vitamin D levels:
1. ☀️ Morning Sunlight: Get 15-20 minutes of direct morning sun exposure (8 AM to 10 AM).
2. 🍳 Nutrition: Include egg yolks, fortified milk, mushrooms, and fatty fish.
3. 💊 Supplementation: Your doctor may recommend Vitamin D3 60,000 IU once weekly for 8 weeks.`,
      time: '10:34 AM'
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  const quickQuestions = [
    'Tell me about Paracetamol dosage',
    'What causes migraine headaches?',
    'Explain my ECG report',
    'Diet plan for pre-diabetes',
    'Book doctor appointment'
  ];

  const handleSend = (textToSend) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const userMsg = { sender: 'user', text, time: 'Just now' };
    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');

    setTimeout(() => {
      let reply = `I have analyzed your query about "${text}". `;
      if (text.toLowerCase().includes('paracetamol')) {
        reply += 'Paracetamol (500mg/650mg) is commonly used for mild to moderate fever and pain relief. Usual adult interval is every 6-8 hours with food. Do not exceed 3000mg in 24 hours.';
      } else if (text.toLowerCase().includes('appointment')) {
        reply += 'I can help you book an appointment with our specialist doctors right now.';
      } else {
        reply += 'Maintaining balanced hydration, light physical exercise, and regular sleep rhythms will significantly support your wellness. Would you like me to connect you with a doctor?';
      }
      setMessages((prev) => [...prev, { sender: 'bot', text: reply, time: 'Just now' }]);
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">AI Health Assistant (MedBot)</h1>
          <p className="text-xs text-slate-500">
            Intelligent healthcare companion powered by clinical NLP.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full border border-emerald-200">
            ● Context Memory: ON
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Chat History / Categories */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">What I Can Help With</h3>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-blue-50/60 text-blue-900 font-semibold flex items-center gap-2">
                <span>💬</span> Health Q&A & Symptom Analysis
              </div>
              <div className="p-2.5 rounded-xl bg-purple-50/60 text-purple-900 font-semibold flex items-center gap-2">
                <span>📑</span> Explain Complex Medical Reports
              </div>
              <div className="p-2.5 rounded-xl bg-teal-50/60 text-teal-900 font-semibold flex items-center gap-2">
                <span>💊</span> Drug Interactions & Side Effects
              </div>
              <div className="p-2.5 rounded-xl bg-amber-50/60 text-amber-900 font-semibold flex items-center gap-2">
                <span>🚨</span> Real-Time Emergency Triage
              </div>
            </div>
          </div>

          {/* Quick Prompts */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Quick Questions</h4>
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="w-full text-left p-2 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-medium transition"
              >
                {q} →
              </button>
            ))}
          </div>
        </div>

        {/* Right Active Conversation Area */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-100 shadow-sm flex flex-col h-[600px] overflow-hidden">
          {/* Top Chat Bar */}
          <div className="p-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-xl shadow-md">
                🤖
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">MedBot AI Assistant</h3>
                <span className="text-[10px] text-emerald-600 font-semibold">● Active Clinical Knowledge Base</span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('08_voice_assistant')}
              className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition"
            >
              <span>🎙️</span> Switch to Voice Mode
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm flex-shrink-0">
                    🤖
                  </div>
                )}
                <div
                  className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                    m.sender === 'user'
                      ? 'bg-blue-600 text-white font-medium rounded-tr-none'
                      : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/60'
                  }`}
                >
                  {m.text}
                  <span
                    className={`block text-[9px] mt-1.5 ${
                      m.sender === 'user' ? 'text-blue-200 text-right' : 'text-slate-400'
                    }`}
                  >
                    {m.time}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-slate-50 border-t border-slate-100">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask MedBot about your health, medicines, or symptoms..."
                className="flex-1 bg-white border border-slate-200 rounded-2xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-blue-500 shadow-sm"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xs shadow-md shadow-blue-600/20 transition flex items-center gap-1"
              >
                <span>Send</span> ➔
              </button>
            </form>
            <div className="text-[10px] text-slate-400 text-center mt-2">
              ⚠️ General health info only • Not a substitute for professional medical advice
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AiHealthAssistantModule;
