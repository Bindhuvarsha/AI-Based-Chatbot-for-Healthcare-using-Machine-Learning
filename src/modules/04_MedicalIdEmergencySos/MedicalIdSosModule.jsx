import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useHealthData } from '../../context/HealthDataContext';

export const MedicalIdSosModule = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('sos'); // 'sos' | 'medical_id'
  const [sosState, setSosState] = useState('idle'); // idle, countdown, active
  const [countdown, setCountdown] = useState(5);
  const [editStep, setEditStep] = useState(1);

  const [medicalIdData, setMedicalIdData] = useState({
    fullName: currentUser?.name || 'Rahul Sharma',
    dob: '28 May 1996',
    gender: 'Male',
    bloodGroup: 'B+',
    height: '175 cm',
    weight: '70 kg',
    allergies: ['Penicillin', 'Dust mites'],
    conditions: ['Mild Asthma'],
    medications: ['Inhaler (Salbutamol)', 'Montelukast 10mg'],
    contacts: [
      { name: 'Mom (Sunita Sharma)', relation: 'Mother', phone: '+91 98765 43210' },
      { name: 'Dad (Ramesh Sharma)', relation: 'Father', phone: '+91 91234 56789' },
      { name: 'Brother (Amit Sharma)', relation: 'Brother', phone: '+91 99887 66554' }
    ]
  });

  const triggerSos = () => {
    setSosState('countdown');
    setCountdown(5);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setSosState('active');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const cancelSos = () => {
    setSosState('idle');
    setCountdown(5);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* Module Navigation Tabs */}
      <div className="flex justify-between items-center bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('sos')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 ${
              activeTab === 'sos'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>🚨</span> Emergency SOS
          </button>
          <button
            onClick={() => setActiveTab('medical_id')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 ${
              activeTab === 'medical_id'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>📋</span> Digital Medical ID
          </button>
        </div>
        <span className="text-xs text-slate-400 font-semibold hidden sm:inline">Module 04</span>
      </div>

      {activeTab === 'sos' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left SOS Trigger Panel */}
          <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm text-center flex flex-col items-center justify-center min-h-[440px] relative overflow-hidden">
            {sosState === 'idle' && (
              <div className="space-y-6 max-w-sm">
                <div>
                  <h2 className="text-xl font-black text-slate-900">In an Emergency?</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Press the SOS button or say <strong className="text-rose-600">"Hey Health, Help!"</strong>
                  </p>
                </div>

                <div className="relative py-4">
                  <button
                    onClick={triggerSos}
                    className="w-44 h-44 rounded-full bg-gradient-to-tr from-rose-600 via-red-500 to-rose-700 text-white font-black text-2xl shadow-2xl shadow-rose-500/40 hover:scale-105 active:scale-95 transition-all duration-300 flex flex-col items-center justify-center mx-auto ring-8 ring-rose-100"
                  >
                    <span className="text-4xl mb-1">🆘</span>
                    <span>SOS</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-200 mt-1">TAP TO SEND</span>
                  </button>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  Voice SOS Command Active
                </div>
              </div>
            )}

            {sosState === 'countdown' && (
              <div className="space-y-6 max-w-sm">
                <h3 className="text-lg font-bold text-slate-900">SOS Triggering In...</h3>
                <div className="w-36 h-36 rounded-full bg-rose-50 border-4 border-rose-500 flex items-center justify-center mx-auto text-5xl font-black text-rose-600 animate-pulse">
                  {countdown}
                </div>
                <p className="text-xs text-slate-500">Please stay calm. Alerting ambulance & contacts.</p>
                <button
                  onClick={cancelSos}
                  className="w-full py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-2xl text-xs transition"
                >
                  Cancel SOS
                </button>
              </div>
            )}

            {sosState === 'active' && (
              <div className="space-y-4 w-full text-left">
                <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl flex items-center gap-3">
                  <span className="text-2xl">🚨</span>
                  <div>
                    <h4 className="font-bold text-rose-900 text-sm">EMERGENCY SOS IS ACTIVE</h4>
                    <p className="text-xs text-rose-700">Live GPS tracking and Medical ID broadcasted to 108 & contacts.</p>
                  </div>
                </div>

                {/* Live GPS Dispatch Box */}
                <div className="bg-slate-900 text-white p-4 rounded-2xl text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Live Location:</span>
                    <span className="font-mono text-emerald-400">12.9352° N, 77.6245° E (Koramangala)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Ambulance ETA:</span>
                    <span className="font-bold text-amber-300">~ 7 Mins (Unit #108-KA01)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Contacts Alerted:</span>
                    <span className="text-emerald-300 font-bold">Mom, Dad, Brother (SMS + Call)</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => window.open('tel:108')}
                    className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-md transition text-center"
                  >
                    📞 Call 108 Direct
                  </button>
                  <button
                    onClick={cancelSos}
                    className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
                  >
                    End Emergency
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Helplines & Emergency Contacts */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900">National Emergency Helplines</h3>

              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href="tel:108"
                  className="p-3 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-900 transition block text-left"
                >
                  <span className="text-xl block mb-1">🚑</span>
                  <div className="font-bold text-xs">Ambulance</div>
                  <div className="text-sm font-black text-rose-600">108</div>
                </a>

                <a
                  href="tel:112"
                  className="p-3 rounded-2xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-900 transition block text-left"
                >
                  <span className="text-xl block mb-1">🚨</span>
                  <div className="font-bold text-xs">National Emergency</div>
                  <div className="text-sm font-black text-blue-600">112</div>
                </a>

                <a
                  href="tel:1091"
                  className="p-3 rounded-2xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 transition block text-left"
                >
                  <span className="text-xl block mb-1">👩</span>
                  <div className="font-bold text-xs">Women Safety</div>
                  <div className="text-sm font-black text-purple-600">1091</div>
                </a>

                <a
                  href="tel:1098"
                  className="p-3 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 transition block text-left"
                >
                  <span className="text-xl block mb-1">👶</span>
                  <div className="font-bold text-xs">Child Helpline</div>
                  <div className="text-sm font-black text-amber-600">1098</div>
                </a>
              </div>
            </div>

            {/* Configured Emergency Contacts */}
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">My Emergency Contacts</h4>
                <span className="text-[10px] text-blue-600 font-bold">Auto-Dial Ready</span>
              </div>

              <div className="space-y-2">
                {medicalIdData.contacts.map((c, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-800">{c.name}</div>
                      <div className="text-[10px] text-slate-400">{c.phone}</div>
                    </div>
                    <a href={`tel:${c.phone}`} className="p-1.5 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-xs">
                      📞
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'medical_id' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-black text-slate-900">Digital Medical ID (ABHA Compatible)</h2>
              <p className="text-xs text-slate-500">Create once, instantly accessible by emergency responders</p>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full font-bold text-xs border border-emerald-200">
              Verified & Locked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Full Name</span>
              <span className="font-bold text-slate-900 text-sm">{medicalIdData.fullName}</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Date of Birth / Age</span>
              <span className="font-bold text-slate-900 text-sm">{medicalIdData.dob} (28 Yrs)</span>
            </div>
            <div className="p-3.5 bg-rose-50 rounded-2xl border border-rose-100">
              <span className="text-rose-400 block text-[10px]">Blood Group</span>
              <span className="font-black text-rose-700 text-base">{medicalIdData.bloodGroup}</span>
            </div>
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-slate-400 block text-[10px]">Height & Weight</span>
              <span className="font-bold text-slate-900 text-sm">{medicalIdData.height} • {medicalIdData.weight}</span>
            </div>
            <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-100">
              <span className="text-amber-600 block text-[10px]">Known Allergies</span>
              <span className="font-bold text-amber-900">{medicalIdData.allergies.join(', ')}</span>
            </div>
            <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-100">
              <span className="text-blue-600 block text-[10px]">Chronic Conditions</span>
              <span className="font-bold text-blue-900">{medicalIdData.conditions.join(', ')}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 text-white flex items-center justify-between">
            <div>
              <div className="text-xs font-bold">Lock Screen Emergency QR Code</div>
              <div className="text-[11px] text-slate-400">Paramedics can scan without unlocking phone</div>
            </div>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-bold transition">
              Download QR Badge
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default MedicalIdSosModule;
