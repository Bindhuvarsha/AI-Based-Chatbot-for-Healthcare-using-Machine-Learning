import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useHealthData } from '../../context/HealthDataContext';

export const AppHomeModule = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const { vitals, appointments, reminders } = useHealthData();

  const featureTiles = [
    { id: '03_dashboard', name: 'Dashboard', desc: 'Overview & metrics', icon: '📊', color: 'bg-blue-50 text-blue-600' },
    { id: '20_video_consult', name: 'Appointments', desc: 'Book & manage', icon: '📅', color: 'bg-indigo-50 text-indigo-600' },
    { id: '20_video_consult', name: 'Doctors', desc: 'Find & consult', icon: '🩺', color: 'bg-sky-50 text-sky-600' },
    { id: '07_ai_assistant', name: 'AI Chatbot', desc: 'MedBot Q&A', icon: '🤖', color: 'bg-cyan-50 text-cyan-600' },
    { id: '18_wearable', name: 'Wearable & Health', desc: 'Vitals & activity', icon: '⌚', color: 'bg-purple-50 text-purple-600' },
    { id: '15_medicine_delivery', name: 'Medicine Delivery', desc: 'Order meds online', icon: '🚚', color: 'bg-emerald-50 text-emerald-600' },
    { id: '11_blood_sample', name: 'Blood Sample', desc: 'Track lab tests', icon: '🩸', color: 'bg-rose-50 text-rose-600' },
    { id: '17_physiotherapy', name: 'Physiotherapy', desc: 'Exercises & recovery', icon: '🧘', color: 'bg-teal-50 text-teal-600' },
    { id: '10_health_check', name: 'Health Check', desc: 'Vitals & BMI check', icon: '❤️', color: 'bg-pink-50 text-pink-600' },
    { id: '26_blockchain_records', name: 'Health Records', desc: 'Secure blockchain', icon: '⛓️', color: 'bg-blue-50 text-blue-600' },
    { id: '04_emergency_sos', name: 'Emergency SOS', desc: 'Instant help & GPS', icon: '🚨', color: 'bg-rose-50 text-rose-600' },
    { id: '12_scan_prescription', name: 'Prescriptions', desc: 'OCR & history', icon: '📋', color: 'bg-amber-50 text-amber-600' },
    { id: '25_consolidated_report', name: 'Reports', desc: 'Consolidated PDF', icon: '📑', color: 'bg-violet-50 text-violet-600' },
    { id: '16_pharmacy_finder', name: 'Nearby Pharmacy', desc: 'Find 24/7 stores', icon: '🏥', color: 'bg-emerald-50 text-emerald-600' },
    { id: '21_insurance', name: 'Health Insurance', desc: 'Claims & policies', icon: '🛡️', color: 'bg-blue-50 text-blue-600' },
    { id: '05_symptom_checker', name: 'Symptom Checker', desc: 'AI disease predictor', icon: '🔍', color: 'bg-indigo-50 text-indigo-600' }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Welcome Banner + Quick Counter Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Welcome Area */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-[#0B132B] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl">
            <div className="relative z-10 max-w-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/30 border border-blue-400/30 text-blue-200 text-xs font-semibold mb-3">
                <span>✨</span> Personalized AI Health Guardian
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                Welcome back, {currentUser?.name || 'Rahul Sharma'} 👋
              </h1>
              <p className="text-sm text-slate-300 mt-2 font-normal">
                Take charge of your health today. We are here to help you live a healthier, longer, and safer life.
              </p>
              <div className="flex flex-wrap gap-3 mt-5">
                <button
                  onClick={() => onNavigate('05_symptom_checker')}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl text-xs shadow-lg shadow-blue-600/30 transition flex items-center gap-2"
                >
                  <span>🩺</span> Check Symptoms Now
                </button>
                <button
                  onClick={() => onNavigate('07_ai_assistant')}
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl text-xs backdrop-blur-sm border border-white/20 transition flex items-center gap-2"
                >
                  <span>🤖</span> Talk to MedBot
                </button>
              </div>
            </div>

            {/* Decorative circles */}
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:block text-7xl opacity-80 select-none">
              👨‍⚕️
            </div>
          </div>

          {/* Quick Metric Tiles (Matches PDF Page 4) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div
              onClick={() => onNavigate('20_video_consult')}
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1">
                <span>Upcoming</span>
                <span className="text-blue-500 text-base">📅</span>
              </div>
              <div className="text-2xl font-black text-slate-900">2</div>
              <div className="text-[11px] text-blue-600 font-bold mt-1">Appointments →</div>
            </div>

            <div
              onClick={() => onNavigate('12_scan_prescription')}
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1">
                <span>Prescriptions</span>
                <span className="text-teal-500 text-base">📋</span>
              </div>
              <div className="text-2xl font-black text-slate-900">3</div>
              <div className="text-[11px] text-teal-600 font-bold mt-1">View All →</div>
            </div>

            <div
              onClick={() => onNavigate('15_medicine_delivery')}
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1">
                <span>Medicines</span>
                <span className="text-amber-500 text-base">💊</span>
              </div>
              <div className="text-2xl font-black text-slate-900">2</div>
              <div className="text-[11px] text-amber-600 font-bold mt-1">To Reorder →</div>
            </div>

            <div
              onClick={() => onNavigate('06_risk_prediction')}
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1">
                <span>Health Alerts</span>
                <span className="text-rose-500 text-base">⚠️</span>
              </div>
              <div className="text-2xl font-black text-rose-600">1</div>
              <div className="text-[11px] text-rose-600 font-bold mt-1">Action Required →</div>
            </div>
          </div>

          {/* All Features Grid (Matches PDF Page 4) */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">All Healthcare Features</h2>
                <p className="text-xs text-slate-500">Quick access to all 27 specialized modules</p>
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
                27 Modules
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {featureTiles.map((tile) => (
                <div
                  key={tile.id}
                  onClick={() => onNavigate(tile.id)}
                  className="p-3.5 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md bg-slate-50/50 hover:bg-white transition cursor-pointer group"
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg mb-2 ${tile.color}`}>
                    {tile.icon}
                  </div>
                  <div className="font-bold text-xs text-slate-800 group-hover:text-blue-600 transition truncate">
                    {tile.name}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate mt-0.5">{tile.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Upcoming Appointment, Vitals & Alerts */}
        <div className="lg:col-span-4 space-y-6">
          {/* Upcoming Appointment Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Upcoming Appointment</span>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold text-[10px] rounded-full border border-emerald-200">
                Confirmed
              </span>
            </div>

            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150"
                alt="Doctor"
                className="w-12 h-12 rounded-2xl object-cover border"
              />
              <div>
                <h3 className="text-sm font-bold text-slate-900">Dr. Arjun Mehta</h3>
                <p className="text-xs text-slate-500">Cardiologist • City Care Hospital</p>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-600">
                  <span>📅 22 May 2025</span>
                  <span>⏰ 10:30 AM</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => onNavigate('20_video_consult')}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-600/20 transition flex items-center justify-center gap-1.5"
              >
                <span>📹</span> Join Video Call
              </button>
              <button
                onClick={() => onNavigate('20_video_consult')}
                className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs"
              >
                Reschedule
              </button>
            </div>
          </div>

          {/* Health Summary & Risk Score */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Health Summary</span>
              <button onClick={() => onNavigate('03_dashboard')} className="text-xs text-blue-600 font-bold hover:underline">
                View Details
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-slate-50">
                <span className="text-[10px] text-slate-400 block">Heart Rate</span>
                <span className="text-sm font-bold text-slate-900">{vitals.heartRate}</span>
                <span className="text-[9px] text-slate-400 block">bpm</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50">
                <span className="text-[10px] text-slate-400 block">SpO2</span>
                <span className="text-sm font-bold text-emerald-600">{vitals.spo2}%</span>
                <span className="text-[9px] text-slate-400 block">Normal</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50">
                <span className="text-[10px] text-slate-400 block">Steps</span>
                <span className="text-sm font-bold text-slate-900">{vitals.steps.toLocaleString()}</span>
                <span className="text-[9px] text-slate-400 block">steps</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50">
                <span className="text-[10px] text-slate-400 block">Sleep</span>
                <span className="text-sm font-bold text-indigo-600">{vitals.sleepHours}</span>
                <span className="text-[9px] text-slate-400 block">hrs</span>
              </div>
            </div>

            {/* Health Risk Score Gauge */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-500/10 to-blue-500/10 border border-teal-200/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full border-4 border-teal-500 flex items-center justify-center font-black text-teal-700 text-sm bg-white shadow-sm">
                  82<span className="text-[9px] text-slate-400">/100</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Health Risk Score: Low</div>
                  <div className="text-[11px] text-slate-500">You are maintaining a healthy lifestyle!</div>
                </div>
              </div>
              <span className="text-xs font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">
                Good
              </span>
            </div>
          </div>

          {/* Alerts & Notifications */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Alerts & Reminders</span>
              <span className="text-[11px] text-slate-400">Today</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span>💊</span>
                  <div>
                    <div className="font-bold text-slate-800">Medicine Reminder</div>
                    <div className="text-[11px] text-slate-500">Metformin 500mg • 02:00 PM</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full">Pending</span>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span>🧪</span>
                  <div>
                    <div className="font-bold text-slate-800">Lab Test Report Ready</div>
                    <div className="text-[11px] text-slate-500">Complete Blood Count (CBC)</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">View</span>
              </div>
            </div>
          </div>

          {/* AI Health Tip */}
          <div className="p-5 rounded-3xl bg-gradient-to-tr from-indigo-900 to-blue-900 text-white flex items-center gap-4 shadow-md">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl flex-shrink-0">
              🤖
            </div>
            <div>
              <div className="text-xs font-bold text-blue-300">MedBot Health Tip</div>
              <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                "Drink plenty of water today and take a brisk 30-minute walk to optimize cardiovascular endurance."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Emergency Banner Bar */}
      <div className="p-4 rounded-3xl bg-gradient-to-r from-rose-600 to-rose-700 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl">
            🚨
          </div>
          <div>
            <div className="font-bold text-sm">Need Urgent Help or Ambulance?</div>
            <div className="text-xs text-rose-100">National Ambulance (108) • Instant GPS location dispatch</div>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onNavigate('04_emergency_sos')}
            className="px-5 py-2 bg-white text-rose-700 hover:bg-rose-50 font-bold text-xs rounded-xl shadow transition"
          >
            Open Emergency Hub
          </button>
        </div>
      </div>
    </div>
  );
};
export default AppHomeModule;
