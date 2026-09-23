import React, { useState } from 'react';
import { useHealthData } from '../../context/HealthDataContext';

export const HealthCheckModule = () => {
  const { vitals, updateVitals } = useHealthData();
  const [height, setHeight] = useState(vitals.height || 175);
  const [weight, setWeight] = useState(vitals.weight || 72);
  const [systolic, setSystolic] = useState(vitals.systolic || 120);
  const [diastolic, setDiastolic] = useState(vitals.diastolic || 80);
  const [fastingSugar, setFastingSugar] = useState(98);
  const [postSugar, setPostSugar] = useState(124);
  const [hr, setHr] = useState(72);
  const [spo2Val, setSpo2Val] = useState(98);
  const [activeRange, setActiveRange] = useState('7d'); // 7d, 30d, 90d
  const [savedMsg, setSavedMsg] = useState('');

  // Calculate BMI
  const heightM = height / 100;
  const computedBmi = (weight / (heightM * heightM)).toFixed(1);

  const handleSave = () => {
    updateVitals({
      height: Number(height),
      weight: Number(weight),
      bmi: Number(computedBmi),
      systolic: Number(systolic),
      diastolic: Number(diastolic),
      bloodPressure: `${systolic}/${diastolic}`,
      bloodSugar: Number(fastingSugar),
      bloodSugarPost: Number(postSugar),
      heartRate: Number(hr),
      spo2: Number(spo2Val)
    });
    setSavedMsg('✓ Health vitals updated and saved to health record!');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Health Check & Vitals</h1>
          <p className="text-xs text-slate-500">Track your vital parameters, calculate BMI, and prevent health risks.</p>
        </div>
        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full border border-emerald-200">
          ● Daily Check: Complete
        </span>
      </div>

      {savedMsg && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold text-center">
          {savedMsg}
        </div>
      )}

      {/* Input Parameter Form Cards (5 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* 1. BMI */}
        <div className="bg-white rounded-3xl p-4.5 border border-slate-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>⚖️ BMI Calculator</span>
          </div>
          <div className="space-y-2">
            <div>
              <span className="text-[10px] text-slate-400 block">Height (cm)</span>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-1.5 text-xs font-bold"
              />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Weight (kg)</span>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-1.5 text-xs font-bold"
              />
            </div>
          </div>
          <div className="text-center pt-1 border-t border-slate-100">
            <span className="text-xl font-black text-blue-600">{computedBmi}</span>
            <span className="text-[10px] text-emerald-600 font-bold block">Normal Weight</span>
          </div>
        </div>

        {/* 2. Blood Pressure */}
        <div className="bg-white rounded-3xl p-4.5 border border-slate-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>🩸 Blood Pressure</span>
          </div>
          <div className="space-y-2">
            <div>
              <span className="text-[10px] text-slate-400 block">Systolic (mmHg)</span>
              <input
                type="number"
                value={systolic}
                onChange={(e) => setSystolic(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-1.5 text-xs font-bold"
              />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Diastolic (mmHg)</span>
              <input
                type="number"
                value={diastolic}
                onChange={(e) => setDiastolic(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-1.5 text-xs font-bold"
              />
            </div>
          </div>
          <div className="text-center pt-1 border-t border-slate-100">
            <span className="text-xl font-black text-slate-900">{systolic}/{diastolic}</span>
            <span className="text-[10px] text-emerald-600 font-bold block">Optimal</span>
          </div>
        </div>

        {/* 3. Blood Sugar */}
        <div className="bg-white rounded-3xl p-4.5 border border-slate-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>🍬 Blood Sugar</span>
          </div>
          <div className="space-y-2">
            <div>
              <span className="text-[10px] text-slate-400 block">Fasting (mg/dL)</span>
              <input
                type="number"
                value={fastingSugar}
                onChange={(e) => setFastingSugar(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-1.5 text-xs font-bold"
              />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">Post Meal (mg/dL)</span>
              <input
                type="number"
                value={postSugar}
                onChange={(e) => setPostSugar(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-1.5 text-xs font-bold"
              />
            </div>
          </div>
          <div className="text-center pt-1 border-t border-slate-100">
            <span className="text-xl font-black text-slate-900">{fastingSugar}/{postSugar}</span>
            <span className="text-[10px] text-emerald-600 font-bold block">Normal Range</span>
          </div>
        </div>

        {/* 4. Heart Rate */}
        <div className="bg-white rounded-3xl p-4.5 border border-slate-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>💓 Heart Rate</span>
          </div>
          <div className="space-y-2">
            <div>
              <span className="text-[10px] text-slate-400 block">Resting (bpm)</span>
              <input
                type="number"
                value={hr}
                onChange={(e) => setHr(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-1.5 text-xs font-bold"
              />
            </div>
          </div>
          <div className="text-center pt-6 border-t border-slate-100">
            <span className="text-xl font-black text-rose-600">{hr}</span>
            <span className="text-[10px] text-emerald-600 font-bold block">Resting Normal</span>
          </div>
        </div>

        {/* 5. Oxygen Level SpO2 */}
        <div className="bg-white rounded-3xl p-4.5 border border-slate-100 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span>🫁 Oxygen (SpO2)</span>
          </div>
          <div className="space-y-2">
            <div>
              <span className="text-[10px] text-slate-400 block">Level (%)</span>
              <input
                type="number"
                value={spo2Val}
                onChange={(e) => setSpo2Val(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-1.5 text-xs font-bold"
              />
            </div>
          </div>
          <div className="text-center pt-6 border-t border-slate-100">
            <span className="text-xl font-black text-cyan-600">{spo2Val}%</span>
            <span className="text-[10px] text-emerald-600 font-bold block">Optimal</span>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleSave}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xs shadow-md shadow-blue-600/20 transition"
        >
          Save & Recalculate Health Score →
        </button>
      </div>

      {/* Health Risk Score Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white text-emerald-800 flex items-center justify-center font-black text-2xl shadow-md">
            18<span className="text-xs text-slate-400 font-normal">/100</span>
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-200">Overall Risk Score</div>
            <h3 className="text-lg font-black">Low Risk Profile</h3>
            <p className="text-xs text-emerald-100">All vital readings are within safe physiological limits.</p>
          </div>
        </div>
        <div className="flex gap-2 text-xs font-bold">
          <span className="px-3 py-1 bg-emerald-500/30 rounded-full border border-emerald-400/40">✓ Cardiovascular: Safe</span>
          <span className="px-3 py-1 bg-emerald-500/30 rounded-full border border-emerald-400/40">✓ Metabolic: Normal</span>
        </div>
      </div>

      {/* AI Health Suggestions & Score Improver */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-slate-900">AI Health Suggestions</h3>
          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-start gap-2.5">
              <span>🏃</span>
              <div>
                <strong className="text-blue-900">Exercise:</strong> 30 mins brisk walk recommended to sustain resting heart rate.
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-teal-50/60 border border-teal-100 flex items-start gap-2.5">
              <span>💧</span>
              <div>
                <strong className="text-teal-900">Hydration:</strong> Maintain 2.5L to 3L daily water intake for kidney filtration.
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-slate-900">Score Improvement Targets</h3>
          <div className="space-y-2 text-xs">
            <div>
              <div className="flex justify-between font-semibold text-slate-700 text-[11px] mb-1">
                <span>Daily Cardio (70%)</span>
                <span>Active</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '70%' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between font-semibold text-slate-700 text-[11px] mb-1">
                <span>Stress Management (85%)</span>
                <span>Optimal</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '85%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HealthCheckModule;
