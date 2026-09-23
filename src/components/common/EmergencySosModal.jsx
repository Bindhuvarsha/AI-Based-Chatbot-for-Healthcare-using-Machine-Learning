import React, { useState, useEffect } from 'react';
import { useHealthData } from '../../context/HealthDataContext';
import { useAuth } from '../../context/AuthContext';

export const EmergencySosModal = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();
  const [countdown, setCountdown] = useState(5);
  const [isTriggered, setIsTriggered] = useState(false);
  const [activeStep, setActiveStep] = useState(1); // 1: countdown, 2: sending location, 3: calling, 4: active emergency
  const [locationStatus, setLocationStatus] = useState('Fetching high-accuracy GPS coordinates...');
  const [coords, setCoords] = useState({ lat: 12.9352, lng: 77.6245 });

  useEffect(() => {
    let timer;
    if (isOpen && !isTriggered && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsTriggered(true);
            setActiveStep(2);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOpen, isTriggered, countdown]);

  useEffect(() => {
    if (activeStep === 2) {
      const stepTimer = setTimeout(() => {
        setLocationStatus('GPS Coordinates locked: 12.9352° N, 77.6245° E (Koramangala, BLR)');
        setActiveStep(3);
      }, 2000);
      return () => clearTimeout(stepTimer);
    }
    if (activeStep === 3) {
      const stepTimer = setTimeout(() => {
        setActiveStep(4);
      }, 2500);
      return () => clearTimeout(stepTimer);
    }
  }, [activeStep]);

  if (!isOpen) return null;

  const handleCancel = () => {
    setCountdown(5);
    setIsTriggered(false);
    setActiveStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-rose-100 animate-scale-up">
        {/* Header */}
        <div className="bg-rose-600 text-white p-6 text-center relative">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-3 animate-pulse">
            <span className="text-3xl">🚨</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">EMERGENCY SOS</h2>
          <p className="text-rose-100 text-sm mt-1">Your safety and immediate care is our top priority</p>
          <button
            onClick={handleCancel}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {activeStep === 1 && (
            <div className="text-center py-4">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-rose-500 flex items-center justify-center relative bg-rose-50">
                <span className="text-5xl font-black text-rose-600">{countdown}</span>
                <span className="absolute bottom-3 text-xs font-semibold text-rose-400">SECONDS</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Preparing Emergency Dispatch</h3>
              <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto">
                SOS will automatically trigger in {countdown} seconds. Tap cancel immediately if this was accidental.
              </p>
              <button
                onClick={handleCancel}
                className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition"
              >
                Cancel SOS
              </button>
            </div>
          )}

          {activeStep === 2 && (
            <div className="text-center py-6">
              <div className="w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-800 mb-1">Acquiring Location & Dispatching</h3>
              <p className="text-sm text-slate-500 mb-4">{locationStatus}</p>
              <div className="bg-slate-50 rounded-2xl p-4 text-left border border-slate-100 text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-700 font-medium">
                  <span>📍 GPS Coordinates</span>
                  <span className="text-emerald-600 font-bold">✓ Locked</span>
                </div>
                <div className="flex items-center justify-between text-slate-700 font-medium">
                  <span>📡 Emergency Contacts Alert</span>
                  <span className="text-amber-600 font-bold">Sending...</span>
                </div>
                <div className="flex items-center justify-between text-slate-700 font-medium">
                  <span>🚑 Ambulance Dispatch (108)</span>
                  <span className="text-blue-600 font-bold">Connecting...</span>
                </div>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                <span className="text-3xl">📞</span>
              </div>
              <h3 className="text-lg font-bold text-slate-800">Calling Emergency Contact</h3>
              <p className="text-sm text-slate-500 mt-1">Connecting to Mom (Sunita Sharma): +91 98765 43210</p>
              <p className="text-xs text-rose-500 font-semibold mt-3">Sharing live GPS stream & Medical ID details...</p>
            </div>
          )}

          {activeStep === 4 && (
            <div className="py-2 space-y-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <h4 className="font-bold text-emerald-900 text-sm">Emergency SOS Active</h4>
                  <p className="text-xs text-emerald-700">
                    Location & Medical ID sent to contacts & National Ambulance Helpline (108).
                  </p>
                </div>
              </div>

              {/* Shared Medical ID Card Preview */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-red-500 font-bold text-lg">✚</span>
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Medical ID (Shared)</span>
                  </div>
                  <span className="text-[11px] px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full font-bold">
                    Blood Group: {currentUser?.bloodGroup || 'B+'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Name</span>
                    <span className="font-semibold text-slate-800">{currentUser?.name || 'Rahul Sharma'}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Age / Gender</span>
                    <span className="font-semibold text-slate-800">28 / Male</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Allergies</span>
                    <span className="font-semibold text-rose-600">Penicillin, Dust</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Chronic Conditions</span>
                    <span className="font-semibold text-slate-800">Mild Asthma</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => window.open('tel:108')}
                  className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-rose-200"
                >
                  <span>📞</span> Call 108 Direct
                </button>
                <button
                  onClick={handleCancel}
                  className="px-5 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-2xl"
                >
                  End SOS
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default EmergencySosModal;
