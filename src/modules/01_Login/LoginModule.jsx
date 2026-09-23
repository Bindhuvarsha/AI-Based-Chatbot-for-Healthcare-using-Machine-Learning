import React, { useState } from 'react';
import { useAuth, ROLES } from '../../context/AuthContext';

export const LoginModule = ({ onNavigate }) => {
  const { login } = useAuth();

  // Separate states for each card
  const [userCredentials, setUserCredentials] = useState({
    identifier: 'rahul.sharma@jeevalife.org',
    password: '••••••••••••',
    rememberMe: true,
    showPassword: false
  });

  const [doctorCredentials, setDoctorCredentials] = useState({
    email: 'dr.aravind.mehta@jeevalife.org',
    password: '••••••••••••',
    rememberMe: true,
    showPassword: false
  });

  const [adminCredentials, setAdminCredentials] = useState({
    username: 'superadmin_ops',
    password: '••••••••••••',
    rememberMe: true,
    showPassword: false
  });

  const [toastMessage, setToastMessage] = useState(null);

  const handleLogin = (e, role) => {
    e.preventDefault();
    login(role);
    setToastMessage({
      role: role.toUpperCase(),
      text: `Authenticated successfully as ${role.toUpperCase()}!`
    });

    setTimeout(() => {
      if (role === ROLES.ADMIN) {
        onNavigate('27_admin_analytics');
      } else if (role === ROLES.DOCTOR) {
        onNavigate('20_video_consult');
      } else {
        onNavigate('03_dashboard');
      }
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] text-slate-800 flex flex-col items-center justify-between font-sans selection:bg-rose-100 -m-4 sm:-m-6 lg:-m-8 p-3 sm:p-6 lg:p-8">
      
      {/* 1. Header Slide Bar */}
      <div className="w-full max-w-7xl bg-[#09122C] text-white px-5 sm:px-8 py-3.5 rounded-2xl flex items-center justify-between shadow-md mb-6 sm:mb-8">
        <div className="flex items-center gap-3">
          <span className="font-bold text-sm sm:text-base tracking-wide text-slate-100">
            01. Login (User / Doctor / Admin)
          </span>
        </div>
        <div className="bg-white/10 text-white/90 text-xs font-semibold px-3 py-1 rounded-md border border-white/15">
          Jeeva Raksha UI Design
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce border border-emerald-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm font-semibold">{toastMessage.text}</span>
        </div>
      )}

      {/* 2. Main Center Header / Branding */}
      <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
        <div className="flex items-center justify-center gap-3 mb-1.5">
          {/* Logo Icon */}
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-500 via-red-500 to-rose-600 p-0.5 shadow-md flex items-center justify-center">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <svg className="w-7 h-7 text-rose-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                <path d="M7 11h2.5l1.5-3 2 6 1.5-3H17" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* Logo Typography */}
          <div className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            <span className="text-[#0B132B]">jeeva </span>
            <span className="text-[#E63946]">Raksha</span>
          </div>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm font-medium tracking-wide">
          Compassionate Care, Anytime Anywhere
        </p>
      </div>

      {/* 3. Three Login Cards in a Row */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch mb-10">
        
        {/* ================= CARD 1: USER LOGIN ================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden group">
          {/* Subtle background decoration */}
          <div className="absolute -top-12 -right-12 w-28 h-28 bg-teal-50 rounded-full blur-2xl opacity-60 pointer-events-none" />
          
          <div>
            {/* Avatar with Teal Accent */}
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="w-full h-full rounded-full bg-teal-50 border-2 border-teal-100 flex items-center justify-center overflow-hidden">
                {/* Patient illustration */}
                <svg className="w-20 h-20 text-teal-600 mt-2" viewBox="0 0 64 64" fill="none">
                  {/* Head */}
                  <circle cx="32" cy="22" r="12" fill="#FBD5B5" />
                  {/* Hair */}
                  <path d="M20 20c0-7 5.5-11 12-11s12 4 12 11c0 2-1 3-3 2-2-1-4-2-9-2s-7 1-9 2c-2 1-3 0-3-2z" fill="#2D3748" />
                  {/* Shirt */}
                  <path d="M14 52c0-9 8-16 18-16s18 7 18 16v4H14v-4z" fill="#0D9488" />
                  {/* Collar */}
                  <path d="M28 36l4 5 4-5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              {/* Badge: Heart */}
              <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#0D9488] text-white flex items-center justify-center shadow-md border-2 border-white">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Title & Subtitle */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-[#0D9488]">User Login</h2>
              <p className="text-xs text-slate-500 mt-0.5">Access your health account</p>
            </div>

            {/* Form */}
            <form onSubmit={(e) => handleLogin(e, ROLES.USER)} className="space-y-4">
              {/* Identifier Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email or Phone Number
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    required
                    value={userCredentials.identifier}
                    onChange={(e) => setUserCredentials({ ...userCredentials, identifier: e.target.value })}
                    placeholder="Enter email or phone number"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] transition"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    type={userCredentials.showPassword ? "text" : "password"}
                    required
                    value={userCredentials.password}
                    onChange={(e) => setUserCredentials({ ...userCredentials, password: e.target.value })}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0D9488]/20 focus:border-[#0D9488] transition"
                  />
                  <button
                    type="button"
                    onClick={() => setUserCredentials({ ...userCredentials, showPassword: !userCredentials.showPassword })}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 select-none">
                  <input
                    type="checkbox"
                    checked={userCredentials.rememberMe}
                    onChange={(e) => setUserCredentials({ ...userCredentials, rememberMe: e.target.checked })}
                    className="w-4 h-4 text-[#0D9488] rounded border-slate-300 focus:ring-[#0D9488]"
                  />
                  <span>Remember Me</span>
                </label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[#0D9488] hover:underline font-medium">
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 bg-[#0D9488] hover:bg-[#0f766e] text-white font-semibold text-sm rounded-xl shadow-md shadow-teal-700/10 flex items-center justify-center gap-2 transition active:scale-[0.99]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Login as User</span>
              </button>
            </form>
          </div>

          {/* Social Auth & Sign Up Footer */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400 mb-3 font-medium">or continue with</p>
            <div className="flex items-center justify-center gap-3 mb-4">
              {/* Google */}
              <button
                type="button"
                onClick={() => handleLogin({ preventDefault: () => {} }, ROLES.USER)}
                className="w-10 h-10 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-center shadow-sm transition hover:scale-105"
                title="Continue with Google"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
              </button>
              {/* Apple */}
              <button
                type="button"
                onClick={() => handleLogin({ preventDefault: () => {} }, ROLES.USER)}
                className="w-10 h-10 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-center shadow-sm transition hover:scale-105"
                title="Continue with Apple"
              >
                <svg className="w-4 h-4 text-slate-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.86c.66-.8 1.11-1.92.99-3.04-.96.04-2.12.64-2.8 1.44-.6.69-1.13 1.83-1 2.94 1.07.08 2.15-.54 2.81-1.34z"/>
                </svg>
              </button>
              {/* Facebook */}
              <button
                type="button"
                onClick={() => handleLogin({ preventDefault: () => {} }, ROLES.USER)}
                className="w-10 h-10 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-center shadow-sm transition hover:scale-105 text-[#1877F2]"
                title="Continue with Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Don't have an account?{' '}
              <span className="text-[#0D9488] font-bold cursor-pointer hover:underline">
                Sign Up
              </span>
            </p>
          </div>
        </div>

        {/* ================= CARD 2: DOCTOR LOGIN ================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden group">
          {/* Subtle background decoration */}
          <div className="absolute -top-12 -right-12 w-28 h-28 bg-blue-50 rounded-full blur-2xl opacity-60 pointer-events-none" />
          
          <div>
            {/* Avatar with Blue Accent */}
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="w-full h-full rounded-full bg-blue-50 border-2 border-blue-100 flex items-center justify-center overflow-hidden">
                {/* Doctor illustration with stethoscope */}
                <svg className="w-20 h-20 text-blue-600 mt-2" viewBox="0 0 64 64" fill="none">
                  {/* Head */}
                  <circle cx="32" cy="22" r="12" fill="#FBD5B5" />
                  {/* Hair */}
                  <path d="M20 19c0-6 5.5-10 12-10s12 4 12 10c0 2-1 3-3 2-2-1-4-2-9-2s-7 1-9 2c-2 1-3 0-3-2z" fill="#1A202C" />
                  {/* Doctor Coat & Tie */}
                  <path d="M14 52c0-9 8-16 18-16s18 7 18 16v4H14v-4z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
                  <path d="M28 36l4 8 4-8" fill="#2563EB" />
                  {/* Stethoscope */}
                  <path d="M24 37c0 5 4 9 8 9s8-4 8-9" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="32" cy="48" r="2.5" fill="#3B82F6" />
                </svg>
              </div>
              {/* Badge: Stethoscope */}
              <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#1D63ED] text-white flex items-center justify-center shadow-md border-2 border-white">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 3v2m6-2v2M9 5a7 7 0 0014 0v-2M9 5a7 7 0 01-7 0V3m14 10a4 4 0 11-8 0v-1a4 4 0 018 0v1z" />
                </svg>
              </div>
            </div>

            {/* Title & Subtitle */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-[#1D63ED]">Doctor Login</h2>
              <p className="text-xs text-slate-500 mt-0.5">Access your doctor dashboard</p>
            </div>

            {/* Form */}
            <form onSubmit={(e) => handleLogin(e, ROLES.DOCTOR)} className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    required
                    value={doctorCredentials.email}
                    onChange={(e) => setDoctorCredentials({ ...doctorCredentials, email: e.target.value })}
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1D63ED]/20 focus:border-[#1D63ED] transition"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    type={doctorCredentials.showPassword ? "text" : "password"}
                    required
                    value={doctorCredentials.password}
                    onChange={(e) => setDoctorCredentials({ ...doctorCredentials, password: e.target.value })}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1D63ED]/20 focus:border-[#1D63ED] transition"
                  />
                  <button
                    type="button"
                    onClick={() => setDoctorCredentials({ ...doctorCredentials, showPassword: !doctorCredentials.showPassword })}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 select-none">
                  <input
                    type="checkbox"
                    checked={doctorCredentials.rememberMe}
                    onChange={(e) => setDoctorCredentials({ ...doctorCredentials, rememberMe: e.target.checked })}
                    className="w-4 h-4 text-[#1D63ED] rounded border-slate-300 focus:ring-[#1D63ED]"
                  />
                  <span>Remember Me</span>
                </label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[#1D63ED] hover:underline font-medium">
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 bg-[#1D63ED] hover:bg-[#1550ca] text-white font-semibold text-sm rounded-xl shadow-md shadow-blue-700/10 flex items-center justify-center gap-2 transition active:scale-[0.99]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Login as Doctor</span>
              </button>
            </form>
          </div>

          {/* Social Auth & Register Footer */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400 mb-3 font-medium">or continue with</p>
            <div className="flex items-center justify-center gap-3 mb-4">
              {/* Google */}
              <button
                type="button"
                onClick={() => handleLogin({ preventDefault: () => {} }, ROLES.DOCTOR)}
                className="w-10 h-10 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-center shadow-sm transition hover:scale-105"
                title="Continue with Google"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
              </button>
              {/* Apple */}
              <button
                type="button"
                onClick={() => handleLogin({ preventDefault: () => {} }, ROLES.DOCTOR)}
                className="w-10 h-10 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-center shadow-sm transition hover:scale-105"
                title="Continue with Apple"
              >
                <svg className="w-4 h-4 text-slate-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.86c.66-.8 1.11-1.92.99-3.04-.96.04-2.12.64-2.8 1.44-.6.69-1.13 1.83-1 2.94 1.07.08 2.15-.54 2.81-1.34z"/>
                </svg>
              </button>
              {/* Medical Hospital ID */}
              <button
                type="button"
                onClick={() => handleLogin({ preventDefault: () => {} }, ROLES.DOCTOR)}
                className="w-10 h-10 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-center shadow-sm transition hover:scale-105 text-[#1D63ED]"
                title="Continue with Hospital ID"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"/>
                </svg>
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Don't have an account?{' '}
              <span className="text-[#1D63ED] font-bold cursor-pointer hover:underline">
                Register Now
              </span>
            </p>
          </div>
        </div>

        {/* ================= CARD 3: ADMIN LOGIN ================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden group">
          {/* Subtle background decoration */}
          <div className="absolute -top-12 -right-12 w-28 h-28 bg-purple-50 rounded-full blur-2xl opacity-60 pointer-events-none" />
          
          <div>
            {/* Avatar with Purple Accent */}
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="w-full h-full rounded-full bg-purple-50 border-2 border-purple-100 flex items-center justify-center overflow-hidden">
                {/* Admin illustration in suit */}
                <svg className="w-20 h-20 text-purple-600 mt-2" viewBox="0 0 64 64" fill="none">
                  {/* Head */}
                  <circle cx="32" cy="22" r="12" fill="#FBD5B5" />
                  {/* Hair and Beard */}
                  <path d="M20 18c0-5 5.5-9 12-9s12 4 12 9c0 2-1 3-3 2-2-1-4-2-9-2s-7 1-9 2c-2 1-3 0-3-2z" fill="#1E293B" />
                  <path d="M27 28c0 4 2.5 6 5 6s5-2 5-6" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
                  {/* Suit */}
                  <path d="M14 52c0-9 8-16 18-16s18 7 18 16v4H14v-4z" fill="#312E81" />
                  <path d="M29 36l3 7 3-7" fill="#6366F1" />
                  <path d="M26 36l6 14 6-14" fill="#FFFFFF" />
                  <polygon points="31,40 33,40 32.5,47 31.5,47" fill="#4338CA" />
                </svg>
              </div>
              {/* Badge: Shield/Key */}
              <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#5925DC] text-white flex items-center justify-center shadow-md border-2 border-white">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" />
                </svg>
              </div>
            </div>

            {/* Title & Subtitle */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-[#5925DC]">Admin Login</h2>
              <p className="text-xs text-slate-500 mt-0.5">Access admin control panel</p>
            </div>

            {/* Form */}
            <form onSubmit={(e) => handleLogin(e, ROLES.ADMIN)} className="space-y-4">
              {/* Username Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Username
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    required
                    value={adminCredentials.username}
                    onChange={(e) => setAdminCredentials({ ...adminCredentials, username: e.target.value })}
                    placeholder="Enter admin username"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5925DC]/20 focus:border-[#5925DC] transition"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    type={adminCredentials.showPassword ? "text" : "password"}
                    required
                    value={adminCredentials.password}
                    onChange={(e) => setAdminCredentials({ ...adminCredentials, password: e.target.value })}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#5925DC]/20 focus:border-[#5925DC] transition"
                  />
                  <button
                    type="button"
                    onClick={() => setAdminCredentials({ ...adminCredentials, showPassword: !adminCredentials.showPassword })}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 select-none">
                  <input
                    type="checkbox"
                    checked={adminCredentials.rememberMe}
                    onChange={(e) => setAdminCredentials({ ...adminCredentials, rememberMe: e.target.checked })}
                    className="w-4 h-4 text-[#5925DC] rounded border-slate-300 focus:ring-[#5925DC]"
                  />
                  <span>Remember Me</span>
                </label>
                <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-[#5925DC] hover:underline font-medium">
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-2 py-3 px-4 bg-[#5925DC] hover:bg-[#4719b8] text-white font-semibold text-sm rounded-xl shadow-md shadow-purple-700/10 flex items-center justify-center gap-2 transition active:scale-[0.99]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>Login as Admin</span>
              </button>
            </form>
          </div>

          {/* Social Auth & Secure Admin Footer */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400 mb-3 font-medium">or continue with</p>
            <div className="flex items-center justify-center gap-3 mb-4">
              {/* Google */}
              <button
                type="button"
                onClick={() => handleLogin({ preventDefault: () => {} }, ROLES.ADMIN)}
                className="w-10 h-10 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-center shadow-sm transition hover:scale-105"
                title="Continue with Google Workspace"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
              </button>
              {/* SSO / Shield */}
              <button
                type="button"
                onClick={() => handleLogin({ preventDefault: () => {} }, ROLES.ADMIN)}
                className="w-10 h-10 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-center shadow-sm transition hover:scale-105 text-[#5925DC]"
                title="Enterprise SSO Shield"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944z" clipRule="evenodd" />
                </svg>
              </button>
              {/* Microsoft */}
              <button
                type="button"
                onClick={() => handleLogin({ preventDefault: () => {} }, ROLES.ADMIN)}
                className="w-10 h-10 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center justify-center shadow-sm transition hover:scale-105"
                title="Continue with Microsoft Azure AD"
              >
                <svg className="w-4 h-4" viewBox="0 0 21 21">
                  <path fill="#f25022" d="M1 1h9v9H1z"/>
                  <path fill="#00a4ef" d="M1 11h9v9H1z"/>
                  <path fill="#7fba00" d="M11 1h9v9h-9z"/>
                  <path fill="#ffb900" d="M11 11h9v9h-9z"/>
                </svg>
              </button>
            </div>

            <p className="text-xs text-slate-400 font-medium">
              Secure Admin Access Only
            </p>
          </div>
        </div>

      </div>

      {/* 4. Bottom Feature Highlights Banner (4 Items) */}
      <div className="w-full max-w-7xl bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.03)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        
        {/* Item 1: Secure & Private */}
        <div className="flex items-center gap-3.5 p-2 rounded-xl">
          <div className="w-11 h-11 rounded-xl bg-teal-50 text-[#0D9488] flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Secure & Private</h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
              Your data is encrypted and 100% secure
            </p>
          </div>
        </div>

        {/* Item 2: Role-based Access */}
        <div className="flex items-center gap-3.5 p-2 rounded-xl">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#1D63ED] flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Role-based Access</h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
              Features and data access based on your role
            </p>
          </div>
        </div>

        {/* Item 3: Trusted Platform */}
        <div className="flex items-center gap-3.5 p-2 rounded-xl">
          <div className="w-11 h-11 rounded-xl bg-purple-50 text-[#5925DC] flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.54 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">Trusted Platform</h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
              HIPAA compliant & industry standard security
            </p>
          </div>
        </div>

        {/* Item 4: 24/7 Support */}
        <div className="flex items-center gap-3.5 p-2 rounded-xl">
          <div className="w-11 h-11 rounded-xl bg-rose-50 text-[#E63946] flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-.79-.79A5.964 5.964 0 0015 10a6 6 0 00-6-6c-.73 0-1.42.13-2.06.368l-.8-.8A7.957 7.957 0 0110 2c4.418 0 8 3.582 8 8zm-8 6a6 6 0 006-6c0-.73-.13-1.42-.368-2.06l-.8.8c.238.39.368.84.368 1.26a4 4 0 11-8 0c0-.42.13-.87.368-1.26l-.8-.8A5.964 5.964 0 004 10a6 6 0 006 6z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">24/7 Support</h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
              We are here to help you anytime, anywhere
            </p>
          </div>
        </div>

      </div>

      {/* 5. Page Number Indicator */}
      <div className="text-center text-xs text-slate-400 font-medium py-2">
        Page 3
      </div>

    </div>
  );
};

export default LoginModule;
