import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ icon, label, value, unit, trend, color = 'emerald' }) => {
  const colorMap = {
    emerald: 'from-emerald-500/20 to-emerald-500/5 text-emerald-400 border-emerald-500/20',
    rose: 'from-rose-500/20 to-rose-500/5 text-rose-400 border-rose-500/20',
    blue: 'from-blue-500/20 to-blue-500/5 text-blue-400 border-blue-500/20',
    amber: 'from-amber-500/20 to-amber-500/5 text-amber-400 border-amber-500/20',
  };

  return (
    <motion.div 
      whileHover={{ y: -5, scale: 1.02 }}
      className={`bg-gradient-to-br ${colorMap[color]} border backdrop-blur-md rounded-[2rem] p-6 relative overflow-hidden group`}
    >
      <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
        {React.cloneElement(icon, { size: 80 })}
      </div>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-slate-950/50 rounded-2xl border border-white/5 backdrop-blur-sm">
          {icon}
        </div>
        <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">{label}</span>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-black tracking-tight text-white">{value}</span>
        <span className="text-slate-500 font-bold text-sm">{unit}</span>
      </div>

      {trend && (
        <div className="mt-4 flex items-center gap-2">
          <span className={`text-xs font-bold px-2 py-1 rounded-lg bg-white/5 ${trend.includes('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
            {trend}
          </span>
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">vs last week</span>
        </div>
      )}
    </motion.div>
  );
};

export default StatCard;
