import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export const DoctorVideoConsultModule = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState('08:24');

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Doctor Video Consultation</h1>
          <p className="text-xs text-slate-500">
            Encrypted HD telemedicine with live speech transcription and real-time multilingual subtitles.
          </p>
        </div>
        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full border border-emerald-200">
          🔒 256-Bit WebRTC Encrypted
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Video Room / Live Queue */}
        <div className="lg:col-span-7 space-y-6">
          {!isInCall ? (
            /* Queue Status Card */
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm text-center space-y-5">
              <div className="w-20 h-20 mx-auto rounded-full bg-blue-50 border-4 border-blue-500 flex items-center justify-center text-3xl font-black text-blue-600">
                15
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Your Digital Token</span>
                <h3 className="text-lg font-black text-slate-900 mt-0.5">Live Consultation Queue</h3>
                <p className="text-xs text-slate-500 mt-1">Consulting Physician: <strong>Dr. Arjun Mehta (MD)</strong></p>
              </div>

              <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto text-xs">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Patients Ahead</span>
                  <span className="text-lg font-bold text-slate-900">2</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <span className="text-slate-400 block text-[10px]">Estimated Wait</span>
                  <span className="text-lg font-bold text-blue-600">~ 4 Mins</span>
                </div>
              </div>

              <button
                onClick={() => setIsInCall(true)}
                className="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xs shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2 mx-auto"
              >
                <span>📹</span> Enter HD Video Consult Room
              </button>
            </div>
          ) : (
            /* Active Video Stream Box */
            <div className="bg-slate-950 rounded-3xl p-5 text-white flex flex-col justify-between min-h-[420px] shadow-2xl relative overflow-hidden">
              {/* Doctor Top Overlay */}
              <div className="flex justify-between items-center z-10">
                <div className="flex items-center gap-2.5 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-bold">Dr. Arjun Mehta (Cardiologist)</span>
                </div>
                <span className="bg-rose-600 px-3 py-1 rounded-full text-xs font-mono font-bold">
                  {callDuration}
                </span>
              </div>

              {/* Main Doctor Video Representation */}
              <div className="text-center my-6 z-10">
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300"
                  alt="Doctor stream"
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-blue-500 shadow-2xl"
                />
                <div className="mt-3 text-xs text-slate-300 font-medium">Doctor's Audio & Video Feed Active</div>
              </div>

              {/* Patient Picture-in-Picture Self-View */}
              <div className="absolute bottom-20 right-6 w-24 h-32 bg-slate-800 rounded-2xl border-2 border-slate-600 overflow-hidden shadow-lg z-20">
                <img
                  src={currentUser?.avatar}
                  alt="Self"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* In-Call Controls Bar */}
              <div className="flex justify-center items-center gap-3 z-10 pt-4 border-t border-slate-800">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`p-3.5 rounded-full font-bold transition text-xs ${
                    isMuted ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  {isMuted ? '🔇 Unmute' : '🎙️ Mic'}
                </button>
                <button
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className={`p-3.5 rounded-full font-bold transition text-xs ${
                    isVideoOff ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  {isVideoOff ? '🚫 Cam On' : '📹 Cam'}
                </button>
                <button
                  onClick={() => setIsInCall(false)}
                  className="px-6 py-3.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full font-bold text-xs shadow-lg transition"
                >
                  End Call
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Real-Time Transcription, Live Subtitles & AI Prescription */}
        <div className="lg:col-span-5 space-y-4">
          {/* Live Translation Subtitles */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Live AI Speech-to-Text</span>
              <span className="text-[10px] text-blue-600 font-bold">English ↔ Hindi</span>
            </div>

            <div className="space-y-2 text-xs max-h-48 overflow-y-auto custom-scrollbar p-1">
              <div className="p-2.5 rounded-xl bg-blue-50/60 border border-blue-100">
                <span className="font-bold text-blue-900 block text-[10px]">🩺 Dr. Arjun (English):</span>
                <p className="text-slate-800">"Take this Paracetamol tablet after food twice daily."</p>
                <span className="text-[10px] text-slate-500 font-hindi block mt-0.5">
                  "यह दवा भोजन के बाद दिन में दो बार लें।"
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-700 block text-[10px]">👤 You (Hindi):</span>
                <p className="text-slate-800">"मुझे पिछले 2 दिनों से हल्का बुखार और सिरदर्द है।"</p>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  "I have had mild fever and headache for the last 2 days."
                </span>
              </div>
            </div>
          </div>

          {/* Instant Clinical Summary & Prescription */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Auto-Generated Clinical Summary</h3>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full font-bold text-[10px]">
                Ready
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl text-xs space-y-2">
              <div>
                <span className="text-slate-400 block text-[10px]">Clinical Diagnosis</span>
                <span className="font-bold text-slate-900">Viral Pharyngitis with Mild Pyrexia</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Doctor's Advice</span>
                <span className="text-slate-700">Rest, warm water hydration, avoid iced beverages for 5 days.</span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('12_scan_prescription')}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-sm transition"
            >
              View & Order Prescribed Medicines →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DoctorVideoConsultModule;
