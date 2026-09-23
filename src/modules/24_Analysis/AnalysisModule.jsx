import React from 'react';

export const AnalysisModule = () => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Comprehensive Health Analytics</h1>
          <p className="text-xs text-slate-500">
            Deep algorithmic biomarker trend discovery and multi-parameter wellness analysis.
          </p>
        </div>
        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 font-bold text-xs rounded-full border border-indigo-200">
          🔬 24 Reports Indexed
        </span>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Health Score</span>
          <div className="text-3xl font-black text-slate-900">78 <span className="text-xs font-normal text-slate-400">/ 100</span></div>
          <span className="text-[11px] text-emerald-600 font-bold block">↑ 12% vs last month</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Reports Analyzed</span>
          <div className="text-3xl font-black text-blue-600">24</div>
          <span className="text-[11px] text-slate-500 font-semibold block">9 new this month</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Clinical Risk Level</span>
          <div className="text-3xl font-black text-emerald-600">Low</div>
          <span className="text-[11px] text-emerald-600 font-bold block">✓ Improved</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-1">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">AI Confidence</span>
          <div className="text-3xl font-black text-purple-600">92%</div>
          <span className="text-[11px] text-purple-600 font-bold block">High Reliability</span>
        </div>
      </div>

      {/* Middle Row: Disease Trend Analysis & Pattern Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Disease Trend Analysis Graph */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Longitudinal Disease Trend</h3>
              <p className="text-xs text-slate-400">6-Month historical biomarker trajectory</p>
            </div>
            <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full">
              + Improving
            </span>
          </div>

          <div className="h-44 w-full relative flex items-end pt-6 pb-2">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100">
              <path
                d="M 10 80 Q 80 40, 150 60 T 290 30 T 390 15"
                fill="none"
                stroke="#6366F1"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="10" cy="80" r="4" fill="#6366F1" />
              <circle cx="100" cy="55" r="4" fill="#6366F1" />
              <circle cx="200" cy="45" r="4" fill="#6366F1" />
              <circle cx="300" cy="30" r="4" fill="#6366F1" />
              <circle cx="390" cy="15" r="5" fill="#10B981" />
            </svg>
          </div>

          <div className="flex justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 font-mono">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>
        </div>

        {/* Health Pattern Spider / Balance Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900">Health Balance Matrix</h3>
            <span className="text-xs font-bold text-emerald-600">Balanced</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div>
              <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                <span>Cardiovascular Activity</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '85%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                <span>Hydration Balance</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-cyan-500 h-full rounded-full" style={{ width: '75%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                <span>Circadian Sleep Rhythm</span>
                <span>82%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full rounded-full" style={{ width: '82%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-semibold text-slate-700 mb-1">
                <span>Metabolic / Nutrition</span>
                <span>78%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '78%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Medicine Effectiveness & Predictive Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900">Medicine Response Rate</h3>
            <span className="text-xl font-black text-emerald-600">85% Effective</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your regular adherence to Metformin and Vitamin D has yielded substantial stabilization in fasting glycemic and bone density indicators.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900">6-Month Predictive Health Risk</h3>
            <span className="text-xl font-black text-blue-600">20% Low Risk</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Maintaining current daily steps and sleep parameters projects a continuing downward trend in potential lifestyle complications.
          </p>
        </div>
      </div>
    </div>
  );
};
export default AnalysisModule;
