import React, { useState } from 'react';
import { useHealthData } from '../../context/HealthDataContext';

export const WearableIntegrationModule = () => {
  const { vitals } = useHealthData();
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState('Last synced: Today, 08:45 AM');

  const handleSyncNow = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncStatus('Last synced: Just now ✓');
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Wearable Device Integration</h1>
          <p className="text-xs text-slate-500">Real-time health telemetry from connected smartwatches & sensors.</p>
        </div>
        <button
          onClick={handleSyncNow}
          disabled={isSyncing}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xs shadow-md transition flex items-center gap-2"
        >
          <span>{isSyncing ? '⏳' : '🔄'}</span>
          <span>{isSyncing ? 'Syncing...' : 'Sync Device'}</span>
        </button>
      </div>

      {/* Device Connection Status Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-2xl shadow-md">
            ⌚
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">FitPro Max Smartwatch</h3>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold text-[10px] rounded-full border border-emerald-200">
                Connected
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Firmware v2.4.6 • Battery: <strong>92%</strong> • Bluetooth 5.3 BLE</p>
          </div>
        </div>

        <div className="text-right text-xs">
          <span className="text-slate-400 block text-[10px]">Cloud Sync</span>
          <span className="font-semibold text-slate-700">{syncStatus}</span>
        </div>
      </div>

      {/* Real-Time Biomarker Telemetry Grid (8 Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-3xl p-4.5 border border-slate-100 shadow-sm space-y-1">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">💓 Heart Rate</span>
          <div className="text-2xl font-black text-slate-900">{vitals.heartRate} <span className="text-xs font-normal text-slate-400">bpm</span></div>
          <span className="text-[10px] text-blue-600 font-semibold block">Resting Normal</span>
        </div>

        <div className="bg-white rounded-3xl p-4.5 border border-slate-100 shadow-sm space-y-1">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">🫁 SpO2 Level</span>
          <div className="text-2xl font-black text-emerald-600">{vitals.spo2}%</div>
          <span className="text-[10px] text-emerald-600 font-semibold block">Optimal Oxygen</span>
        </div>

        <div className="bg-white rounded-3xl p-4.5 border border-slate-100 shadow-sm space-y-1">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">🌙 Sleep Stages</span>
          <div className="text-2xl font-black text-indigo-600">7h 45m</div>
          <span className="text-[10px] text-indigo-500 font-semibold block">Deep: 2h 15m</span>
        </div>

        <div className="bg-white rounded-3xl p-4.5 border border-slate-100 shadow-sm space-y-1">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">🏃 Daily Steps</span>
          <div className="text-2xl font-black text-slate-900">{vitals.steps.toLocaleString()}</div>
          <span className="text-[10px] text-slate-400 font-semibold block">Goal: 10,000</span>
        </div>

        <div className="bg-white rounded-3xl p-4.5 border border-slate-100 shadow-sm space-y-1">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">🧘 Stress Score</span>
          <div className="text-2xl font-black text-slate-900">36 <span className="text-xs font-normal text-slate-400">/ 100</span></div>
          <span className="text-[10px] text-emerald-600 font-semibold block">Low Stress State</span>
        </div>

        <div className="bg-white rounded-3xl p-4.5 border border-slate-100 shadow-sm space-y-1">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">🚨 Fall Detection</span>
          <div className="text-base font-black text-emerald-700 mt-1.5">No Falls</div>
          <span className="text-[10px] text-slate-400 font-semibold block">Accelerometer Active</span>
        </div>

        <div className="bg-white rounded-3xl p-4.5 border border-slate-100 shadow-sm space-y-1">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">🌡️ Skin Temp</span>
          <div className="text-2xl font-black text-slate-900">36.6°C</div>
          <span className="text-[10px] text-emerald-600 font-semibold block">Normal Range</span>
        </div>

        <div className="bg-white rounded-3xl p-4.5 border border-slate-100 shadow-sm space-y-1">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">💨 Respiration</span>
          <div className="text-2xl font-black text-slate-900">16 <span className="text-xs font-normal text-slate-400">/min</span></div>
          <span className="text-[10px] text-emerald-600 font-semibold block">Eupneic Rhythm</span>
        </div>
      </div>

      {/* Anomaly Detection Alerts */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-slate-900">Biometric Anomaly Monitoring</h3>
        <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            <span className="text-emerald-600 text-lg">🛡️</span>
            <div>
              <div className="font-bold text-slate-900">Continuous Cardiac & Respiratory Surveillance</div>
              <div className="text-slate-500 text-[11px]">No sudden tachycardia, arrhythmia, or desaturation events recorded in 24h.</div>
            </div>
          </div>
          <span className="text-emerald-700 font-bold">Status: Normal</span>
        </div>
      </div>
    </div>
  );
};
export default WearableIntegrationModule;
