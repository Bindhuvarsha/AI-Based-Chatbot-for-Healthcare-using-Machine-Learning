import React from 'react';
import { useAuth, ROLES } from '../../context/AuthContext';

export const AdminAnalyticsModule = () => {
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === ROLES.ADMIN;

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Admin Analytics & System Control</h1>
            <span className="px-2.5 py-0.5 bg-purple-100 text-purple-800 font-bold text-[10px] rounded-full uppercase">
              Super Admin Level
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Monitor nationwide health tele-triages, clinical queues, pharmacy dispatches, and emergency responses.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold rounded-full border border-emerald-200">
            ● Server Uptime: 23d 14h 32m
          </span>
        </div>
      </div>

      {!isAdmin && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span>ℹ️</span>
            <span className="text-amber-900 font-medium">
              You are currently viewing this in preview mode. Full administrative changes require Super Admin role.
            </span>
          </div>
        </div>
      )}

      {/* 6 Platform KPI Cards (Matches PDF Page 29) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="bg-white rounded-3xl p-4.5 border border-slate-100 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Total Users</span>
            <span>👤</span>
          </div>
          <div className="text-xl font-black text-slate-900">24,568</div>
          <span className="text-[10px] text-emerald-600 font-bold block">↑ 12.5% wk</span>
        </div>

        <div className="bg-white rounded-3xl p-4.5 border border-slate-100 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Total Doctors</span>
            <span>🩺</span>
          </div>
          <div className="text-xl font-black text-slate-900">1,248</div>
          <span className="text-[10px] text-emerald-600 font-bold block">↑ 8.3% wk</span>
        </div>

        <div className="bg-white rounded-3xl p-4.5 border border-slate-100 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Pharmacies</span>
            <span>🏥</span>
          </div>
          <div className="text-xl font-black text-slate-900">842</div>
          <span className="text-[10px] text-emerald-600 font-bold block">↑ 6.7% wk</span>
        </div>

        <div className="bg-white rounded-3xl p-4.5 border border-slate-100 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Appointments</span>
            <span>📅</span>
          </div>
          <div className="text-xl font-black text-slate-900">18,932</div>
          <span className="text-[10px] text-emerald-600 font-bold block">↑ 14.2% wk</span>
        </div>

        <div className="bg-white rounded-3xl p-4.5 border border-slate-100 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Emergencies</span>
            <span>🚨</span>
          </div>
          <div className="text-xl font-black text-rose-600">1,256</div>
          <span className="text-[10px] text-emerald-600 font-bold block">↑ 9.8% wk</span>
        </div>

        <div className="bg-white rounded-3xl p-4.5 border border-slate-100 shadow-sm space-y-1">
          <div className="flex justify-between items-center text-xs text-slate-400">
            <span>Revenue</span>
            <span>💳</span>
          </div>
          <div className="text-xl font-black text-blue-600">₹12.45 L</div>
          <span className="text-[10px] text-emerald-600 font-bold block">↑ 16.4% wk</span>
        </div>
      </div>

      {/* Middle Analytics: Disease Trends & User Growth */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* User Growth Chart */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-slate-900">User Growth & Registrations</h3>
              <p className="text-xs text-slate-400">Daily new patient and doctor on-boardings</p>
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              7 Days View
            </span>
          </div>

          <div className="h-44 w-full relative flex items-end pt-4 pb-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100">
              <path
                d="M 10 90 Q 70 60, 140 70 T 280 35 T 390 10"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="10" cy="90" r="4" fill="#3B82F6" />
              <circle cx="70" cy="65" r="4" fill="#3B82F6" />
              <circle cx="140" cy="70" r="4" fill="#3B82F6" />
              <circle cx="210" cy="50" r="4" fill="#3B82F6" />
              <circle cx="280" cy="35" r="4" fill="#3B82F6" />
              <circle cx="350" cy="20" r="4" fill="#3B82F6" />
              <circle cx="390" cy="10" r="5" fill="#10B981" />
            </svg>
          </div>

          <div className="grid grid-cols-4 gap-2 pt-2 border-t border-slate-100 text-center text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block">Active Users</span>
              <span className="font-bold text-slate-900">18,245</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">New Users</span>
              <span className="font-bold text-emerald-600">2,323</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Returning</span>
              <span className="font-bold text-blue-600">15,922</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Churn Rate</span>
              <span className="font-bold text-slate-500">2.45%</span>
            </div>
          </div>
        </div>

        {/* Disease Prevalence Statistics */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900">Top Triaged Conditions</h3>
            <span className="text-xs text-slate-400">This Week</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-slate-700 font-semibold mb-1">
                <span>Fever / Viral Infection (4,562 cases)</span>
                <span className="font-bold text-slate-900">24.1%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: '24.1%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-700 font-semibold mb-1">
                <span>Diabetes / Metabolic (3,128 cases)</span>
                <span className="font-bold text-slate-900">16.5%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: '16.5%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-700 font-semibold mb-1">
                <span>Hypertension (2,812 cases)</span>
                <span className="font-bold text-slate-900">14.8%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full rounded-full" style={{ width: '14.8%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-700 font-semibold mb-1">
                <span>Cold & Cough (2,346 cases)</span>
                <span className="font-bold text-slate-900">12.4%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-teal-500 h-full rounded-full" style={{ width: '12.4%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Dispatch Analytics & Role Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-slate-900">Emergency Dispatch Operations</h3>
          <div className="grid grid-cols-2 gap-3 text-center text-xs pt-1">
            <div className="p-3 bg-rose-50 rounded-2xl border border-rose-100">
              <span className="text-[10px] text-rose-500 block font-bold">Avg SOS Response Time</span>
              <span className="text-2xl font-black text-rose-700">6.4 mins</span>
            </div>
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100">
              <span className="text-[10px] text-emerald-500 block font-bold">Lives Impacted</span>
              <span className="text-2xl font-black text-emerald-700">1,102</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-slate-900">Platform User Role Mix</h3>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">👤 Patients / Citizens:</span>
              <span className="font-bold text-slate-900">72.8% (17,825)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">🩺 Certified Doctors:</span>
              <span className="font-bold text-slate-900">12.4% (3,046)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-600">🏥 Partner Pharmacies:</span>
              <span className="font-bold text-slate-900">8.6% (2,112)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminAnalyticsModule;
