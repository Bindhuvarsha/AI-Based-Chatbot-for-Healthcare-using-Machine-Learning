import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Activity, Heart, ChevronRight, Play } from 'lucide-react';

const Landing = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden selection:bg-emerald-500/30">
      {/* Navigation */}
      <nav className="h-24 flex items-center justify-between px-10 md:px-20 relative z-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500 rounded-xl shadow-lg shadow-emerald-500/20">
            <Heart className="text-slate-950 w-6 h-6 fill-current" />
          </div>
          <span className="text-2xl font-black tracking-tighter">Jeeva Raksha</span>
        </div>
        <div className="hidden md:flex items-center gap-10 text-sm font-bold uppercase tracking-widest text-slate-400">
          <a href="#" className="hover:text-emerald-400 transition-colors">Technology</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">Services</a>
          <a href="#" className="hover:text-emerald-400 transition-colors">Security</a>
        </div>
        <button 
          onClick={onStart}
          className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-3 rounded-2xl font-bold transition-all active:scale-95"
        >
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-20 pb-32 px-10 md:px-20 flex flex-col items-center text-center">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/10 blur-[160px] rounded-full opacity-50" />
          <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-[140px] rounded-full opacity-30" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-black uppercase tracking-[0.2em] mb-8">
            <Zap size={14} className="animate-pulse" /> AI-Powered Health Intelligence
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
            Your Personal <br />
            <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">Health Guardian.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            Experience the future of personal healthcare. Analyze symptoms with GPT-4, discover nearby care instantly, and manage your wellness with AI-driven insights.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={onStart}
              className="group bg-emerald-500 text-slate-950 px-10 py-5 rounded-[2rem] font-black text-lg flex items-center gap-3 hover:bg-emerald-400 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-emerald-500/30"
            >
              Get Started for Free <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center gap-3 px-8 py-5 text-slate-300 font-bold hover:text-white transition-colors group">
              <div className="w-12 h-12 rounded-full border border-slate-800 flex items-center justify-center group-hover:border-emerald-500/50 group-hover:bg-emerald-500/5 transition-all">
                <Play size={18} fill="currentColor" />
              </div>
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 relative z-10 w-full max-w-6xl"
        >
          <LandingCard 
            icon={<ShieldCheck className="text-emerald-400" />} 
            title="Privacy First" 
            desc="Your health data is encrypted and stays private. We prioritize your security above all else."
          />
          <LandingCard 
            icon={<Zap className="text-amber-400" />} 
            title="Instant Insights" 
            desc="No more waiting. Get AI-powered analysis of your symptoms in seconds, anytime, anywhere."
          />
          <LandingCard 
            icon={<Activity className="text-blue-400" />} 
            title="Smart Tracking" 
            desc="Monitor your vitals and medicine reminders with an interface designed for clarity."
          />
        </motion.div>
      </main>

      {/* Footer Branding */}
      <footer className="py-20 border-t border-slate-900 flex flex-col items-center gap-8 bg-slate-950 relative z-10">
        <div className="flex items-center gap-3 opacity-50 grayscale hover:grayscale-0 transition-all cursor-pointer">
          <Heart className="text-emerald-500 w-5 h-5" />
          <span className="font-black tracking-tighter text-xl">Jeeva Raksha</span>
        </div>
        <p className="text-slate-600 text-xs font-bold uppercase tracking-widest">© 2026 Advanced Health Systems. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

const LandingCard = ({ icon, title, desc }) => (
  <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800 p-10 rounded-[3rem] hover:border-emerald-500/30 transition-all group text-left">
    <div className="w-16 h-16 rounded-2xl bg-slate-950 flex items-center justify-center mb-8 border border-slate-800 group-hover:scale-110 transition-transform duration-500 shadow-xl">
      {React.cloneElement(icon, { size: 32 })}
    </div>
    <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
    <p className="text-slate-500 font-medium leading-relaxed">{desc}</p>
  </div>
);

export default Landing;
