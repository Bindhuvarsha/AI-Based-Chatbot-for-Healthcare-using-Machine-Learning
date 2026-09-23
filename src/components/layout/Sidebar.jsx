import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export const MODULE_GROUPS = [
  {
    title: 'Core & Overview',
    items: [
      { id: '02_home', num: '02', name: 'App Home / All Features', icon: '🏠' },
      { id: '03_dashboard', num: '03', name: 'Health Dashboard', icon: '📊' },
      { id: '04_emergency_sos', num: '04', name: 'Medical ID & SOS', icon: '🚨', alert: true },
      { id: '01_login', num: '01', name: 'Login Portal (User/Doc/Admin)', icon: '🔐' }
    ]
  },
  {
    title: 'AI & Diagnostics',
    items: [
      { id: '05_symptom_checker', num: '05', name: 'AI Symptom Checker', icon: '🩺' },
      { id: '06_risk_prediction', num: '06', name: 'AI Health Risk Prediction', icon: '📈' },
      { id: '07_ai_assistant', num: '07', name: 'AI Health Assistant (MedBot)', icon: '🤖' },
      { id: '08_voice_assistant', num: '08', name: 'Voice-Based AI Assistant', icon: '🎙️' },
      { id: '09_multi_language', num: '09', name: 'Multi-Language Support', icon: '🌐' },
      { id: '10_health_check', num: '10', name: 'Health Check (Vitals/BMI)', icon: '❤️' }
    ]
  },
  {
    title: 'Medicines & Labs',
    items: [
      { id: '11_blood_sample', num: '11', name: 'Blood Sample Tracking', icon: '🩸' },
      { id: '12_scan_prescription', num: '12', name: 'Scan Prescription (OCR)', icon: '📋' },
      { id: '13_medicine_recommend', num: '13', name: 'Medicine Recommendation', icon: '💊' },
      { id: '14_medicine_reminder', num: '14', name: 'Smart Medicine Reminder', icon: '⏰' },
      { id: '15_medicine_delivery', num: '15', name: 'Medicine Delivery', icon: '🚚' },
      { id: '16_pharmacy_finder', num: '16', name: 'Nearby Pharmacy Finder', icon: '🏥' }
    ]
  },
  {
    title: 'Consultations & Connected',
    items: [
      { id: '17_physiotherapy', num: '17', name: 'Physiotherapy & Exercises', icon: '🧘' },
      { id: '18_wearable', num: '18', name: 'Wearable Device Sync', icon: '⌚' },
      { id: '19_skin_hair', num: '19', name: 'Skin & Hair AI Consult', icon: '✨' },
      { id: '20_video_consult', num: '20', name: 'Doctor Video Consultation', icon: '📹' }
    ]
  },
  {
    title: 'Insurance & Family',
    items: [
      { id: '21_insurance', num: '21', name: 'Insurance Integration', icon: '🛡️' },
      { id: '22_family_doctor', num: '22', name: 'Family Doctor & Coverage', icon: '👨‍👩‍👧‍👦' }
    ]
  },
  {
    title: 'Reports & Records',
    items: [
      { id: '23_scanner', num: '23', name: 'Medical Document Scanner', icon: '📱' },
      { id: '24_analysis', num: '24', name: 'Deep Health Analysis', icon: '🔬' },
      { id: '25_consolidated_report', num: '25', name: 'Consolidated Medical Report', icon: '📑' },
      { id: '26_blockchain_records', num: '26', name: 'Blockchain Records', icon: '⛓️' }
    ]
  },
  {
    title: 'Administration',
    adminOnly: true,
    items: [
      { id: '27_admin_analytics', num: '27', name: 'Admin Analytics Panel', icon: '📊', admin: true }
    ]
  }
];

export const Sidebar = ({ activeModule, onNavigate, isMobileOpen, onCloseMobile }) => {
  const { currentUser, ROLES } = useAuth();
  const isAdmin = currentUser?.role === ROLES.ADMIN;
  const isDoctor = currentUser?.role === ROLES.DOCTOR;

  const handleSelect = (id) => {
    onNavigate(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed lg:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)] w-72 bg-[#0B132B] text-slate-300 border-r border-[#1C2541] overflow-y-auto custom-scrollbar flex flex-col transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* User Status Bar */}
        <div className="p-4 border-b border-[#1C2541] bg-[#101A3B]/60">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-blue-500/50"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#0B132B] rounded-full" />
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">{currentUser?.name}</div>
              <div className="text-[11px] text-blue-300 font-medium capitalize flex items-center gap-1">
                <span>{currentUser?.role === 'admin' ? '🛡️ Admin' : currentUser?.role === 'doctor' ? '🩺 Doctor' : '👤 Patient'}</span>
                <span>• Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Modules list */}
        <div className="flex-1 py-3 px-2.5 space-y-4">
          {MODULE_GROUPS.map((group, gIdx) => {
            if (group.adminOnly && !isAdmin) return null;

            return (
              <div key={gIdx} className="space-y-1">
                <div className="px-2.5 text-[10px] uppercase font-black tracking-wider text-slate-400/80">
                  {group.title}
                </div>

                {group.items.map((item) => {
                  const isActive = activeModule === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition text-left group ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold'
                          : 'hover:bg-[#1C2541] text-slate-300 hover:text-white'
                      }`}
                    >
                      <span className="text-sm">{item.icon}</span>
                      <span className="flex-1 truncate">{item.name}</span>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                          isActive
                            ? 'bg-blue-700 text-blue-100'
                            : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700 group-hover:text-slate-200'
                        }`}
                      >
                        {item.num}
                      </span>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Version info */}
        <div className="p-3 text-[10px] text-slate-500 text-center border-t border-[#1C2541] bg-[#070D1F]">
          Jeeva Raksha v2.4 • 27 UI Modules
        </div>
      </aside>
    </>
  );
};
export default Sidebar;
