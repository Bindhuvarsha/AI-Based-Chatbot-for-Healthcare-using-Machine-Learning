import React from 'react';

export const BottomNav = ({ activeModule, onNavigate, onToggleSidebar }) => {
  const navButtons = [
    { id: '02_home', label: 'Home', icon: '🏠' },
    { id: '03_dashboard', label: 'Dashboard', icon: '📊' },
    { id: '05_symptom_checker', label: 'Symptom AI', icon: '🩺' },
    { id: '07_ai_assistant', label: 'MedBot', icon: '🤖' },
    { id: 'more', label: 'All (27)', icon: '☰' }
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B132B] border-t border-[#1C2541] px-2 py-1.5 flex items-center justify-around shadow-2xl">
      {navButtons.map((btn) => {
        const isActive = activeModule === btn.id;
        return (
          <button
            key={btn.id}
            onClick={() => {
              if (btn.id === 'more') {
                onToggleSidebar();
              } else {
                onNavigate(btn.id);
              }
            }}
            className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition ${
              isActive ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span className="text-lg">{btn.icon}</span>
            <span className="text-[10px] mt-0.5">{btn.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
export default BottomNav;
