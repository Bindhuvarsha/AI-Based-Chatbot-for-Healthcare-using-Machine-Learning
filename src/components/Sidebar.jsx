import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  MessageSquare, 
  MapPin, 
  Bell, 
  User, 
  Settings,
  Activity,
  Heart
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', icon: <LayoutDashboard />, label: 'Dashboard' },
    { id: 'symptoms', icon: <Activity />, label: 'Symptom Checker' },
    { id: 'chat', icon: <MessageSquare />, label: 'AI Health Chat' },
    { id: 'hospitals', icon: <MapPin />, label: 'Hospitals' },
    { id: 'reminders', icon: <Bell />, label: 'Reminders' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-72 bg-slate-900/40 backdrop-blur-xl border-r border-slate-800/50 p-6 z-50">
      <div className="flex items-center gap-3 mb-12 px-2 group cursor-pointer">
        <div className="p-3 bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-500/20 group-hover:scale-110 transition-transform duration-300">
          <Heart className="text-slate-950 w-6 h-6 fill-current" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">Jeeva Raksha</h1>
          <p className="text-[10px] uppercase tracking-widest text-emerald-500 font-bold">AI Health Guardian</p>
        </div>
      </div>

      <nav className="space-y-2 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group ${
              activeTab === item.id
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-inner'
                : 'text-slate-500 hover:bg-slate-800/40 hover:text-slate-200'
            }`}
          >
            <span className={`${activeTab === item.id ? 'text-emerald-400 scale-110' : 'group-hover:text-slate-200'} transition-all duration-300`}>
              {item.icon}
            </span>
            <span className="font-semibold tracking-wide">{item.label}</span>
            {activeTab === item.id && (
              <motion.div 
                layoutId="activeTabGlow"
                className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]"
              />
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto space-y-2 pt-6 border-t border-slate-800/50">
        <button
          onClick={() => setActiveTab('profile')}
          className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-slate-500 hover:bg-slate-800/40 hover:text-slate-200 transition-all"
        >
          <User size={20} />
          <span className="font-semibold">Profile</span>
        </button>
        <button
          onClick={() => setActiveTab('landing')}
          className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-rose-500 hover:bg-rose-500/10 transition-all group"
        >
          <div className="p-1 rounded bg-rose-500/10 group-hover:bg-rose-500/20 transition-colors">
             <User size={18} />
          </div>
          <span className="font-semibold text-sm uppercase tracking-widest">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
