import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useHealthData } from '../../context/HealthDataContext';

export const HealthDashboardModule = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const { healthScore, vitals, reminders, toggleReminder, appointments } = useHealthData();
  const [trendMetric, setTrendMetric] = useState('steps'); // steps, hr, sleep, weight

  const takenCount = reminders.filter(r => r.taken).length;
  const pendingCount = reminders.length - takenCount;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Health Dashboard</h1>
          <p className="text-xs text-slate-500">Welcome back, {currentUser?.name || 'Rahul'}! Track your vitals & progress.</p>
        </div>
        <div className="flex gap-2.5">
          <button
            onClick={() => onNavigate('10_health_check')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xs shadow-md shadow-blue-600/20 transition flex items-center gap-1.5"
          >
            <span>❤️</span> Record Vitals
          </button>
          <button
            onClick={() => onNavigate('25_consolidated_report')}
            className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-2xl text-xs transition"
          >
            Download Report
          </button>
        </div>
      </div>

      {/* Top 3 Metric Blocks (Overall Score, Medicine Status, Appointments) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Overall Health Score */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Overall Health Score</span>
            <span className="text-[10px] text-slate-400">Updated today</span>
          </div>

          <div className="flex items-center justify-center py-2">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-emerald-500"
                  strokeDasharray={`${healthScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-black text-slate-900">{healthScore}</span>
                <span className="text-[10px] text-slate-400 font-semibold">/100</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full font-bold text-xs">
              ✓ Good Condition
            </span>
            <p className="text-[11px] text-slate-500 mt-1">You're doing great! Keep it up.</p>
          </div>

          {/* Sub-breakdowns */}
          <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-center text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block">Physical</span>
              <span className="font-bold text-slate-800">85</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Mental</span>
              <span className="font-bold text-slate-800">78</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Lifestyle</span>
              <span className="font-bold text-slate-800">80</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Sleep</span>
              <span className="font-bold text-slate-800">83</span>
            </div>
          </div>
        </div>

        {/* 2. Today's Medicine Status */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Today's Medicine Status</span>
            <button onClick={() => onNavigate('14_medicine_reminder')} className="text-xs text-blue-600 font-bold hover:underline">
              View All
            </button>
          </div>

          <div className="flex items-center justify-around py-1 bg-slate-50 rounded-2xl p-3">
            <div className="text-center">
              <span className="text-2xl font-black text-emerald-600">{takenCount}</span>
              <span className="text-[10px] text-slate-500 block font-semibold">Taken</span>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="text-center">
              <span className="text-2xl font-black text-amber-600">{pendingCount}</span>
              <span className="text-[10px] text-slate-500 block font-semibold">Pending</span>
            </div>
            <div className="w-px h-8 bg-slate-200" />
            <div className="text-center">
              <span className="text-2xl font-black text-slate-400">0</span>
              <span className="text-[10px] text-slate-500 block font-semibold">Missed</span>
            </div>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
            {reminders.map((med) => (
              <div
                key={med.id}
                onClick={() => toggleReminder(med.id)}
                className={`p-2.5 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition ${
                  med.taken
                    ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900'
                    : 'bg-white border-slate-200 text-slate-800 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={med.taken ? 'text-emerald-600' : 'text-slate-400'}>
                    {med.taken ? '✅' : '⏳'}
                  </span>
                  <div>
                    <div className="font-bold">{med.name}</div>
                    <div className="text-[10px] text-slate-400">{med.time} • {med.when}</div>
                  </div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  med.taken ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {med.taken ? 'Taken' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Upcoming Appointments */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Upcoming Appointments</span>
            <button onClick={() => onNavigate('20_video_consult')} className="text-xs text-blue-600 font-bold hover:underline">
              View All
            </button>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex flex-col items-center justify-center font-bold text-xs flex-shrink-0">
                <span>MAY</span>
                <span className="text-base font-black">21</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-slate-900 truncate">Dr. Arjun Mehta</h4>
                <p className="text-[11px] text-slate-500">Cardiologist • 11:30 AM</p>
                <span className="text-[10px] text-blue-600 font-semibold">City Heart Clinic</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-slate-800 text-white flex flex-col items-center justify-center font-bold text-xs flex-shrink-0">
                <span>MAY</span>
                <span className="text-base font-black">24</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-slate-900 truncate">Dr. Neha Verma</h4>
                <p className="text-[11px] text-slate-500">Dermatologist • 04:00 PM</p>
                <span className="text-[10px] text-slate-600">Skin Plus Clinic</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('20_video_consult')}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md shadow-blue-600/20 transition flex items-center justify-center gap-1.5"
          >
            <span>+</span> Book New Appointment
          </button>
        </div>
      </div>

      {/* Middle Row: Health Trends & Wearable Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Health Trends Graph (7 Days) */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Health Trends (Last 7 Days)</h3>
              <p className="text-xs text-slate-400">Activity and physiological monitoring</p>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setTrendMetric('steps')}
                className={`px-3 py-1 rounded-lg transition ${trendMetric === 'steps' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
              >
                Steps
              </button>
              <button
                onClick={() => setTrendMetric('hr')}
                className={`px-3 py-1 rounded-lg transition ${trendMetric === 'hr' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
              >
                Heart Rate
              </button>
              <button
                onClick={() => setTrendMetric('sleep')}
                className={`px-3 py-1 rounded-lg transition ${trendMetric === 'sleep' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
              >
                Sleep
              </button>
              <button
                onClick={() => setTrendMetric('weight')}
                className={`px-3 py-1 rounded-lg transition ${trendMetric === 'weight' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
              >
                Weight
              </button>
            </div>
          </div>

          {/* SVG Trend Wave Graph */}
          <div className="h-48 w-full relative flex items-end pt-6 pb-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 500 120">
              <defs>
                <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 10 90 Q 90 30, 170 65 T 330 40 T 490 20 L 490 120 L 10 120 Z"
                fill="url(#trendGrad)"
              />
              <path
                d="M 10 90 Q 90 30, 170 65 T 330 40 T 490 20"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Highlight Nodes */}
              <circle cx="10" cy="90" r="4" fill="#3B82F6" />
              <circle cx="90" cy="45" r="4" fill="#3B82F6" />
              <circle cx="170" cy="65" r="4" fill="#3B82F6" />
              <circle cx="250" cy="50" r="4" fill="#3B82F6" />
              <circle cx="330" cy="40" r="4" fill="#3B82F6" />
              <circle cx="410" cy="30" r="4" fill="#3B82F6" />
              <circle cx="490" cy="20" r="5" fill="#10B981" />
            </svg>
          </div>

          {/* Bottom stats summary */}
          <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-100 text-center text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block">Avg Steps</span>
              <span className="font-bold text-slate-800">10,452</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Avg Heart Rate</span>
              <span className="font-bold text-slate-800">72 bpm</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Avg Sleep</span>
              <span className="font-bold text-slate-800">7h 15m</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Weight</span>
              <span className="font-bold text-slate-800">68.4 kg</span>
            </div>
          </div>
        </div>

        {/* Wearable Summary (FitPro Max) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Wearable Summary</h3>
              <p className="text-xs text-slate-400">FitPro Max • Synced 07:30 AM</p>
            </div>
            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold text-[10px] rounded-full border border-emerald-200">
              ● Connected
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Steps</span>
              <span className="text-lg font-bold text-slate-900">{vitals.steps.toLocaleString()}</span>
              <span className="text-[10px] text-emerald-600 block">Goal: 10,000</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Heart Rate</span>
              <span className="text-lg font-bold text-slate-900">{vitals.heartRate} bpm</span>
              <span className="text-[10px] text-blue-600 block">Resting Normal</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Sleep Quality</span>
              <span className="text-lg font-bold text-slate-900">7h 45m</span>
              <span className="text-[10px] text-indigo-600 block">Deep: 2h 15m</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
              <span className="text-slate-400 block text-[10px]">SpO2</span>
              <span className="text-lg font-bold text-slate-900">98%</span>
              <span className="text-[10px] text-teal-600 block">Optimal</span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('18_wearable')}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
          >
            Manage Wearable Device →
          </button>
        </div>
      </div>

      {/* Bottom Row: Recent Reports, Health Goals, AI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recent Reports */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Recent Lab Reports</span>
            <button onClick={() => onNavigate('25_consolidated_report')} className="text-xs text-blue-600 font-bold hover:underline">
              View All
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-800">Blood Test Report</div>
                <div className="text-[10px] text-slate-400">18 May 2024</div>
              </div>
              <span className="text-blue-600 font-bold cursor-pointer hover:underline">📥 Download</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-800">X-Ray Chest PA</div>
                <div className="text-[10px] text-slate-400">12 May 2024</div>
              </div>
              <span className="text-blue-600 font-bold cursor-pointer hover:underline">📥 Download</span>
            </div>
          </div>
        </div>

        {/* Health Goals Progress */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Health Goals</span>
            <span className="text-xs text-emerald-600 font-bold">On Track</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                <span>Daily Steps (7,842 / 10,000)</span>
                <span>78%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '78%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                <span>Water Hydration (6 / 8 glasses)</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full rounded-full" style={{ width: '75%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* AI Health Insights */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">AI Health Insights</span>
            <span className="text-xs text-blue-600 font-bold">MedBot AI</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-blue-50/50 border border-blue-100">
              <span className="font-bold text-blue-900 block mb-0.5">🏃 Step Consistency</span>
              <p className="text-slate-600 text-[11px]">Your daily activity increased by 14% this week. Great endurance progress!</p>
            </div>
            <div className="p-2.5 rounded-xl bg-indigo-50/50 border border-indigo-100">
              <span className="font-bold text-indigo-900 block mb-0.5">🌙 Sleep Rhythm</span>
              <p className="text-slate-600 text-[11px]">Consistent bedtime detected. Deep sleep duration improved by 22 mins.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HealthDashboardModule;
