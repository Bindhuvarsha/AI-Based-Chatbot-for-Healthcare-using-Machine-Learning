import React, { useState } from 'react';
import { useHealthData } from '../../context/HealthDataContext';

export const FamilyDoctorInsuranceModule = ({ onNavigate }) => {
  const { familyMembers, setFamilyMembers } = useHealthData();
  const [selectedMember, setSelectedMember] = useState(familyMembers[0]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Family Doctor & Health Hub</h1>
          <p className="text-xs text-slate-500">
            Unified family health monitoring, assigned family physician, and child immunization tracking.
          </p>
        </div>
        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-full border border-indigo-200">
          👨‍👩‍👧‍👦 4 Family Members
        </span>
      </div>

      {/* Family Members Row */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Family Members</span>
        <div className="flex flex-wrap gap-3">
          {familyMembers.map((m) => (
            <div
              key={m.id}
              onClick={() => setSelectedMember(m)}
              className={`p-3.5 rounded-2xl border transition cursor-pointer flex items-center gap-3 min-w-[170px] ${
                selectedMember?.id === m.id
                  ? 'bg-blue-50 border-blue-500 shadow-sm ring-2 ring-blue-400/20'
                  : 'bg-slate-50/50 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
                {m.name.charAt(0)}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">{m.name}</div>
                <div className="text-[10px] text-slate-500">{m.relation} • {m.blood}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Column: Assigned Family Doctor & Child Alerts */}
        <div className="md:col-span-7 space-y-6">
          {/* Assigned Family Physician */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Assigned Family Doctor</span>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold text-[10px] rounded-full">
                Available 24/7
              </span>
            </div>

            <div className="flex items-center gap-3.5">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150"
                alt="Doctor"
                className="w-14 h-14 rounded-2xl object-cover border"
              />
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900">Dr. Rahul Sharma</h4>
                <p className="text-xs text-slate-500">MBBS, MD (Family Medicine) • 12+ Yrs Exp</p>
                <div className="text-[11px] text-blue-600 font-semibold mt-1">
                  ⭐ 4.9 • Direct Family Line Active
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => onNavigate('20_video_consult')}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-sm transition"
              >
                Instant Video Consult
              </button>
              <button
                onClick={() => onNavigate('07_ai_assistant')}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
              >
                Message
              </button>
            </div>
          </div>

          {/* Child Vaccination Alerts */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Child & Elder Health Milestones</h3>

            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">💉</span>
                <div>
                  <div className="font-bold text-amber-900">Aarav V (Son, 4 Yrs)</div>
                  <div className="text-[11px] text-amber-800">Vaccination Due: Hepatitis A (2nd Dose)</div>
                </div>
              </div>
              <span className="font-bold text-amber-900">Due in 5 Days</span>
            </div>

            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-2xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">🦷</span>
                <div>
                  <div className="font-bold text-blue-900">Ananya V (Daughter, 2 Yrs)</div>
                  <div className="text-[11px] text-blue-800">Pediatric Dental Checkup Scheduled</div>
                </div>
              </div>
              <span className="font-bold text-blue-900">27 May 2025</span>
            </div>
          </div>
        </div>

        {/* Right Column: Shared Family Records & Quick Links */}
        <div className="md:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Shared Family Health Records</h3>
            <div className="space-y-2 text-xs">
              <div
                onClick={() => onNavigate('25_consolidated_report')}
                className="p-3 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 rounded-2xl border border-slate-100 transition cursor-pointer flex justify-between items-center"
              >
                <span>📑 Family Consolidated Records</span>
                <span>➔</span>
              </div>
              <div
                onClick={() => onNavigate('21_insurance')}
                className="p-3 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 rounded-2xl border border-slate-100 transition cursor-pointer flex justify-between items-center"
              >
                <span>🛡️ Family Floater Insurance</span>
                <span>➔</span>
              </div>
              <div
                onClick={() => onNavigate('04_emergency_sos')}
                className="p-3 bg-slate-50 hover:bg-blue-50 hover:text-blue-700 rounded-2xl border border-slate-100 transition cursor-pointer flex justify-between items-center"
              >
                <span>🚨 Shared Emergency Contacts</span>
                <span>➔</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FamilyDoctorInsuranceModule;
