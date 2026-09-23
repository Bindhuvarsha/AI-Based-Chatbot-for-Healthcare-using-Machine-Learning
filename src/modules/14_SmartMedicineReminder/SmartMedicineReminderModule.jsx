import React, { useState } from 'react';
import { useHealthData } from '../../context/HealthDataContext';

export const SmartMedicineReminderModule = () => {
  const { reminders, toggleReminder, addReminder } = useHealthData();
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState('schedule'); // schedule, adherence, caregiver, water
  const [newMed, setNewMed] = useState({
    name: '',
    dosage: '',
    time: '08:00 AM',
    when: 'After Food'
  });
  const [voiceConfirmed, setVoiceConfirmed] = useState(false);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newMed.name) return;
    addReminder(newMed);
    setNewMed({ name: '', dosage: '', time: '08:00 AM', when: 'After Food' });
    setShowAddModal(false);
  };

  const handleVoiceConfirm = () => {
    setVoiceConfirmed(true);
    setTimeout(() => {
      setVoiceConfirmed(false);
    }, 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Smart Medicine Reminder</h1>
          <p className="text-xs text-slate-500">
            Never miss a dose. Timezone-aware schedules with voice confirmation & caregiver safety alerts.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xs shadow-md shadow-blue-600/20 transition flex items-center gap-1.5"
        >
          <span>+</span> Add Medicine
        </button>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('schedule')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'schedule' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          📅 Today's Schedule
        </button>
        <button
          onClick={() => setActiveTab('adherence')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'adherence' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          📊 Adherence & Streaks
        </button>
        <button
          onClick={() => setActiveTab('caregiver')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'caregiver' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          👨‍👩‍👦 Caregiver Alerts
        </button>
        <button
          onClick={() => setActiveTab('water')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'water' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          💧 Water Hydration
        </button>
      </div>

      {activeTab === 'schedule' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Schedule Feed */}
          <div className="md:col-span-7 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Today's Dosage Timeline</h3>
              <span className="text-xs text-slate-400 font-semibold">20 May 2025</span>
            </div>

            <div className="space-y-3">
              {reminders.map((r) => (
                <div
                  key={r.id}
                  className={`p-4 rounded-2xl border transition flex items-center justify-between ${
                    r.taken
                      ? 'bg-emerald-50/40 border-emerald-200'
                      : 'bg-white border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleReminder(r.id)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border ${
                        r.taken
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-slate-300 hover:border-blue-500'
                      }`}
                    >
                      {r.taken && '✓'}
                    </button>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{r.name}</h4>
                      <p className="text-[11px] text-slate-500">{r.dosage} • {r.when}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700">{r.time}</span>
                    <button
                      onClick={() => toggleReminder(r.id)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs transition ${
                        r.taken
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-600 text-white shadow-sm hover:bg-blue-700'
                      }`}
                    >
                      {r.taken ? 'Taken' : 'Mark Taken'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Voice Confirmation & Active Reminder Alert */}
          <div className="md:col-span-5 space-y-4">
            {/* Active Reminder Card */}
            <div className="bg-gradient-to-tr from-blue-900 via-indigo-900 to-[#0B132B] text-white p-6 rounded-3xl shadow-lg space-y-4 text-center">
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-2xl mx-auto animate-bounce">
                🔔
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-300 tracking-wider">Active Reminder (02:00 PM)</span>
                <h3 className="text-lg font-black mt-1">Metformin 500 mg</h3>
                <p className="text-xs text-slate-300">1 Tablet • Take Before Food</p>
              </div>

              {voiceConfirmed && (
                <div className="p-2.5 bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 rounded-xl text-xs font-bold">
                  ✓ Voice Recognized: "I took my Metformin"
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button
                  onClick={handleVoiceConfirm}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5"
                >
                  <span>🎙️</span> Say "I Took It"
                </button>
                <button
                  onClick={() => alert('Snoozed for 10 minutes')}
                  className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs transition"
                >
                  Snooze
                </button>
              </div>
            </div>

            {/* Antibiotic Course Tracker */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800">Antibiotic Course (Amoxicillin)</span>
                <span className="text-blue-600 font-bold">Day 4 of 7</span>
              </div>
              <div className="flex gap-1.5 pt-1">
                {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                  <div
                    key={d}
                    className={`flex-1 h-3 rounded-full ${
                      d <= 4 ? 'bg-emerald-500' : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[10px] text-slate-400 block pt-1">Complete your full course to prevent bacterial resistance.</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'adherence' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-slate-900">Medication Adherence Dashboard</h3>
              <p className="text-xs text-slate-500">Track habit consistency and streak multipliers.</p>
            </div>
            <div className="text-center px-6 py-3 bg-emerald-50 rounded-2xl border border-emerald-200">
              <div className="text-3xl font-black text-emerald-700">92%</div>
              <div className="text-[10px] text-emerald-600 font-bold uppercase">Weekly Adherence</div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Taken on Time</span>
              <span className="text-xl font-black text-emerald-600">26</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Missed</span>
              <span className="text-xl font-black text-rose-600">2</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Current Streak</span>
              <span className="text-xl font-black text-blue-600">10 Days 🔥</span>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Longest Streak</span>
              <span className="text-xl font-black text-purple-600">23 Days 🏆</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'caregiver' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">Caregiver Missed Dose Alerts</h3>
          <p className="text-xs text-slate-500">
            If a critical medicine dose is missed twice consecutively, automatic SMS alerts are dispatched to trusted caregivers.
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-slate-800">Mom (Sunita Sharma)</div>
                <div className="text-[10px] text-slate-400">+91 98765 43210 • Primary Caregiver</div>
              </div>
              <span className="text-xs font-bold text-emerald-600">✓ SMS Alert Enabled</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between text-xs">
              <div>
                <div className="font-bold text-slate-800">Dad (Ramesh Sharma)</div>
                <div className="text-[10px] text-slate-400">+91 91234 56789 • Secondary</div>
              </div>
              <span className="text-xs font-bold text-emerald-600">✓ SMS Alert Enabled</span>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'water' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm text-center max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-cyan-50 border border-cyan-200 flex items-center justify-center text-3xl mx-auto">
            💧
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Hydration with Medicine</h3>
            <p className="text-xs text-slate-500 mt-1">
              Taking medicines with 200ml to 250ml water protects stomach mucosal lining and speeds absorption.
            </p>
          </div>
          <div className="p-4 bg-cyan-50/60 rounded-2xl border border-cyan-100 text-xs font-semibold text-cyan-900">
            ✓ Smart water pop-up reminder triggers 5 minutes after every recorded dose.
          </div>
        </div>
      )}

      {/* Add Medicine Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-scale-up">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Add New Medicine Reminder</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Medicine Name</label>
                <input
                  type="text"
                  value={newMed.name}
                  onChange={(e) => setNewMed({ ...newMed, name: e.target.value })}
                  placeholder="e.g. Dolo 650"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Dosage</label>
                  <input
                    type="text"
                    value={newMed.dosage}
                    onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })}
                    placeholder="e.g. 1 Tablet"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Time</label>
                  <input
                    type="text"
                    value={newMed.time}
                    onChange={(e) => setNewMed({ ...newMed, time: e.target.value })}
                    placeholder="e.g. 08:00 AM"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">When to take</label>
                <select
                  value={newMed.when}
                  onChange={(e) => setNewMed({ ...newMed, when: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs"
                >
                  <option value="After Food">After Food</option>
                  <option value="Before Food">Before Food</option>
                  <option value="With Food">With Food</option>
                  <option value="Empty Stomach">Empty Stomach</option>
                </select>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md transition"
                >
                  Save Reminder
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default SmartMedicineReminderModule;
