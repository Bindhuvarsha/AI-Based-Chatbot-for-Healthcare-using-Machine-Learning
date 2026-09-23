import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

export const TopBar = ({ activeModule, onNavigate, onTriggerSos }) => {
  const { currentUser, switchRole, logout, ROLES } = useAuth();
  const { currentLang, setLanguage, LANGUAGES, t } = useLanguage();
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-40 bg-[#0B132B] text-white border-b border-[#1C2541] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <div
          onClick={() => onNavigate('02_home')}
          className="flex items-center gap-3 cursor-pointer group select-none flex-shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 via-indigo-500 to-blue-500 p-0.5 shadow-md group-hover:scale-105 transition">
            <div className="w-full h-full bg-[#0B132B] rounded-[10px] flex items-center justify-center">
              <span className="text-xl">❤️‍🩹</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-blue-200">
                Jeeva Raksha
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                AI Health
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">
              {t('appTagline')}
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full bg-[#1C2541] border border-slate-700/60 rounded-full pl-10 pr-4 py-2 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          />
          <span className="absolute left-3.5 top-2.5 text-slate-400 text-sm">🔍</span>
        </div>

        {/* Actions & Role Switcher */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Emergency SOS Shortcut */}
          <button
            onClick={onTriggerSos}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full font-bold text-xs shadow-lg shadow-rose-600/30 transition transform active:scale-95 animate-pulse"
          >
            <span>🚨</span>
            <span className="hidden sm:inline">SOS</span>
          </button>

          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#1C2541] hover:bg-[#27355a] text-xs text-slate-300 font-semibold border border-slate-700/60 transition"
            >
              <span>🌐</span>
              <span className="uppercase">{currentLang}</span>
              <span className="text-[10px] text-slate-400">▼</span>
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-[#1C2541] border border-slate-700 rounded-2xl shadow-xl py-1.5 z-50 animate-scale-up">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setShowLangMenu(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-blue-600/20 ${
                      currentLang === lang.code ? 'text-blue-400 font-bold' : 'text-slate-300'
                    }`}
                  >
                    <span>{lang.name}</span>
                    <span className="text-[11px] opacity-70">{lang.native}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Role Switcher & User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-[#1C2541] hover:bg-[#27355a] border border-slate-700/60 transition"
            >
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                alt={currentUser?.name}
                className="w-7 h-7 rounded-full object-cover border border-blue-400"
              />
              <div className="text-left hidden lg:block">
                <div className="text-xs font-bold text-slate-200 truncate max-w-[100px]">{currentUser?.name}</div>
                <div className="text-[10px] text-blue-300 capitalize">{currentUser?.role || 'Patient'}</div>
              </div>
              <span className="text-[10px] text-slate-400">▼</span>
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-[#1C2541] border border-slate-700 rounded-2xl shadow-xl p-2 z-50 animate-scale-up text-xs">
                <div className="p-2 border-b border-slate-700/60">
                  <div className="font-bold text-white">{currentUser?.name}</div>
                  <div className="text-[11px] text-slate-400 truncate">{currentUser?.email}</div>
                  <div className="mt-1 inline-block px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-semibold uppercase">
                    Role: {currentUser?.role}
                  </div>
                </div>

                <div className="py-2">
                  <div className="text-[10px] uppercase font-bold text-slate-400 px-2 mb-1 tracking-wider">
                    Quick Role Switch
                  </div>
                  <button
                    onClick={() => {
                      switchRole(ROLES.USER);
                      setShowRoleMenu(false);
                      onNavigate('03_dashboard');
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-slate-700/50 flex items-center justify-between text-slate-200"
                  >
                    <span>👤 Patient (User)</span>
                    {currentUser?.role === ROLES.USER && <span className="text-blue-400 font-bold">✓</span>}
                  </button>
                  <button
                    onClick={() => {
                      switchRole(ROLES.DOCTOR);
                      setShowRoleMenu(false);
                      onNavigate('20_video_consult');
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-slate-700/50 flex items-center justify-between text-slate-200"
                  >
                    <span>🩺 Doctor Panel</span>
                    {currentUser?.role === ROLES.DOCTOR && <span className="text-blue-400 font-bold">✓</span>}
                  </button>
                  <button
                    onClick={() => {
                      switchRole(ROLES.ADMIN);
                      setShowRoleMenu(false);
                      onNavigate('27_admin_analytics');
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-slate-700/50 flex items-center justify-between text-slate-200"
                  >
                    <span>⚡ Admin Control</span>
                    {currentUser?.role === ROLES.ADMIN && <span className="text-blue-400 font-bold">✓</span>}
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-700/60">
                  <button
                    onClick={() => {
                      onNavigate('01_login');
                      setShowRoleMenu(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-rose-500/20 text-rose-300 font-medium"
                  >
                    🚪 Switch / Sign In Screen
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default TopBar;
