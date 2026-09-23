import React, { useState } from 'react';

export const HealthRiskPredictionModule = () => {
  const [simWeightLoss, setSimWeightLoss] = useState(5);
  const [simSteps, setSimSteps] = useState(8000);
  const [simSleep, setSimSleep] = useState(8);

  // Compute what-if simulation
  const initialRisk = 62;
  const reduction = Math.min(35, Math.round((simWeightLoss * 2) + (simSteps / 1000) * 1.5 + (simSleep - 6) * 3));
  const simulatedRisk = Math.max(20, initialRisk - reduction);

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">AI Health Risk Prediction</h1>
          <p className="text-xs text-slate-500">
            Predict tomorrow. Prevent today. Advanced AI analyses longitudinal biomarkers.
          </p>
        </div>
        <span className="px-3 py-1 bg-purple-50 text-purple-700 font-bold text-xs rounded-full border border-purple-200">
          🧠 Predictive Bio-Modeling
        </span>
      </div>

      {/* Top 3 Metric Cards (Overview, Biological Age, What-If Simulator) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Health Risk Overview */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Overall Health Risk</span>
            <span className="px-2 py-0.5 bg-amber-50 text-amber-700 font-bold text-[10px] rounded-full border border-amber-200">
              Moderate Risk
            </span>
          </div>

          <div className="text-center py-2">
            <div className="text-4xl font-black text-amber-600">{initialRisk}%</div>
            <p className="text-xs text-slate-500 mt-1">Multi-factor composite risk level</p>
          </div>

          <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
            <div className="flex justify-between font-semibold">
              <span className="text-slate-700">Type 2 Diabetes Risk</span>
              <span className="text-rose-600 font-bold">72% (High)</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className="text-slate-700">Hypertension / CVD</span>
              <span className="text-amber-600 font-bold">58% (Moderate)</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className="text-slate-700">Fatty Liver Disease</span>
              <span className="text-emerald-600 font-bold">22% (Low)</span>
            </div>
          </div>
        </div>

        {/* 2. Biological Age */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Biological Age</span>
            <span className="text-xs text-slate-400">Actual: 25 Yrs</span>
          </div>

          <div className="text-center py-2">
            <div className="text-4xl font-black text-rose-600">31 <span className="text-sm font-normal text-slate-400">Years</span></div>
            <p className="text-xs text-rose-500 font-semibold mt-1">You are ~6 years older than chronological age</p>
          </div>

          <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
            <div className="flex justify-between">
              <span className="text-slate-500">Sleep Deprivation:</span>
              <span className="text-rose-600 font-bold">+3.2 Yrs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Workplace Stress:</span>
              <span className="text-amber-600 font-bold">+2.1 Yrs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Sedentary Hours:</span>
              <span className="text-amber-600 font-bold">+0.7 Yrs</span>
            </div>
          </div>
        </div>

        {/* 3. What-If Simulator */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">What-If Simulator</span>
            <span className="text-[10px] font-bold text-blue-600">Live AI Model</span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between mb-1 text-slate-700 font-semibold">
                <span>Weight Target Reduction:</span>
                <span className="font-bold text-blue-600">-{simWeightLoss} kg</span>
              </div>
              <input
                type="range"
                min="0"
                max="15"
                value={simWeightLoss}
                onChange={(e) => setSimWeightLoss(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1 text-slate-700 font-semibold">
                <span>Daily Steps Goal:</span>
                <span className="font-bold text-blue-600">{simSteps.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="4000"
                max="15000"
                step="1000"
                value={simSteps}
                onChange={(e) => setSimSteps(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg accent-blue-600"
              />
            </div>
          </div>

          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
            <span className="text-[10px] text-emerald-800 uppercase font-bold block">Simulated Projected Risk</span>
            <div className="flex items-center justify-center gap-2 mt-0.5">
              <span className="line-through text-slate-400 text-sm font-bold">{initialRisk}%</span>
              <span className="text-xl font-black text-emerald-700">{simulatedRisk}%</span>
              <span className="text-xs font-bold text-emerald-600">(-{reduction}%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row: Environmental Risks & Health Readiness */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Environmental Health Risk */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900">Environmental & Seasonal Risk</h3>
            <span className="text-xs text-slate-400">Bengaluru, Karnataka</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-100">
              <span className="text-[10px] text-rose-500 block font-semibold">Air Quality (AQI)</span>
              <span className="text-base font-black text-rose-700">162</span>
              <span className="text-[9px] text-rose-500 block">Unhealthy</span>
            </div>
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-100">
              <span className="text-[10px] text-amber-500 block font-semibold">UV Index</span>
              <span className="text-base font-black text-amber-700">6/10</span>
              <span className="text-[9px] text-amber-500 block">High</span>
            </div>
            <div className="p-3 rounded-2xl bg-blue-50 border border-blue-100">
              <span className="text-[10px] text-blue-500 block font-semibold">Pollen Count</span>
              <span className="text-base font-black text-blue-700">23</span>
              <span className="text-[9px] text-blue-500 block">Moderate</span>
            </div>
            <div className="p-3 rounded-2xl bg-teal-50 border border-teal-100">
              <span className="text-[10px] text-teal-500 block font-semibold">Humidity</span>
              <span className="text-base font-black text-teal-700">60%</span>
              <span className="text-[9px] text-teal-500 block">Comfortable</span>
            </div>
          </div>
        </div>

        {/* Health Readiness Score */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900">Health Readiness Index</h3>
            <span className="text-xs font-bold text-emerald-600">81 / 100 Good</span>
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <div className="flex justify-between font-semibold text-slate-700 text-[11px] mb-1">
                <span>Heart Health Score</span>
                <span>82 / 100</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '82%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 text-[11px] mb-1">
                <span>Metabolic Health Score</span>
                <span>75 / 100</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '75%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold text-slate-700 text-[11px] mb-1">
                <span>Mental Well-being</span>
                <span>78 / 100</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: '78%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HealthRiskPredictionModule;
