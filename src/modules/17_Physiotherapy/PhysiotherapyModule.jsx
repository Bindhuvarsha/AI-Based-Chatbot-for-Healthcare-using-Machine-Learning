import React, { useState } from 'react';

export const PhysiotherapyModule = ({ onNavigate }) => {
  const [activeExercise, setActiveExercise] = useState('Cat Cow Stretch');
  const [timerSeconds, setTimerSeconds] = useState(28);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [painScore, setPainScore] = useState(3);

  const exercises = [
    { name: 'Pelvic Tilt', reps: '3 sets • 15 reps', duration: '5 mins', focus: 'Lower Back & Core', intensity: 'Low' },
    { name: 'Cat Cow Stretch', reps: '3 sets • 12 reps', duration: '6 mins', focus: 'Spine & Lumbar Mobility', intensity: 'Low to Moderate' },
    { name: 'Hamstring Stretch', reps: '2 sets • 30s holds', duration: '8 mins', focus: 'Leg & Pelvis Alignment', intensity: 'Moderate' }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Physiotherapy & Rehabilitation</h1>
          <p className="text-xs text-slate-500">
            AI-guided customized physical exercise routines, timers, and pain tracking.
          </p>
        </div>
        <span className="px-3 py-1 bg-teal-50 text-teal-700 font-bold text-xs rounded-full border border-teal-200">
          🧘 Recovery Score: 78/100
        </span>
      </div>

      {/* Top AI Recommendation Plan */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-lg">🤖</span>
            <h3 className="text-sm font-bold text-slate-900">Today's AI Recommended Exercise Routine</h3>
          </div>
          <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2.5 py-0.5 rounded-full">
            Focus: Lower Back Pain Relief
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {exercises.map((ex, i) => (
            <div
              key={i}
              onClick={() => setActiveExercise(ex.name)}
              className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col justify-between ${
                activeExercise === ex.name
                  ? 'bg-teal-50/50 border-teal-500 shadow-sm ring-2 ring-teal-400/20'
                  : 'bg-slate-50/50 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div>
                <h4 className="font-bold text-xs text-slate-900">{ex.name}</h4>
                <p className="text-[11px] text-slate-500 mt-1">{ex.reps} • {ex.duration}</p>
                <div className="text-[10px] text-teal-700 font-semibold mt-2">Target: {ex.focus}</div>
              </div>
              <span className="text-[10px] text-slate-400 font-medium block mt-3">Intensity: {ex.intensity}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Video Demonstration & Exercise Timer */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Video Simulation Box */}
        <div className="md:col-span-7 bg-slate-900 rounded-3xl p-6 text-white flex flex-col justify-between min-h-[320px] relative overflow-hidden shadow-lg">
          <div className="relative z-10 flex justify-between items-center">
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">{activeExercise}</span>
            <span className="text-[10px] bg-white/20 px-2.5 py-0.5 rounded-full">HD Motion Coach</span>
          </div>

          <div className="text-center my-8">
            <div className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-3xl mx-auto cursor-pointer transition">
              ▶️
            </div>
            <p className="text-xs text-slate-300 mt-3 font-medium">
              Demonstrating gentle spinal flexion and extension for pelvic stability.
            </p>
          </div>

          <div className="relative z-10 text-[11px] text-slate-400 text-center">
            Follow slow, controlled breathing during each repetition.
          </div>
        </div>

        {/* Live Exercise Timer & Pain Scale */}
        <div className="md:col-span-5 space-y-6">
          {/* Exercise Stopwatch */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Exercise Timer</span>
            <div className="text-4xl font-black text-slate-900 font-mono">
              00:{timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds}
            </div>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs transition"
              >
                {isTimerRunning ? 'Pause' : 'Start Timer'}
              </button>
              <button
                onClick={() => setTimerSeconds(30)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Pain Assessment Slider */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pain Level Tracker</span>
              <span className="text-xs font-bold text-amber-600">{painScore} / 10 (Mild Pain)</span>
            </div>

            <input
              type="range"
              min="0"
              max="10"
              value={painScore}
              onChange={(e) => setPainScore(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg accent-teal-600"
            />

            <p className="text-[11px] text-slate-500">
              Down from 7/10 last week. Your recovery trajectory is progressing smoothly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PhysiotherapyModule;
