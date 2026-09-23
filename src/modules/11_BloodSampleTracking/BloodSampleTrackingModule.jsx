import React, { useState } from 'react';
import { useHealthData } from '../../context/HealthDataContext';

export const BloodSampleTrackingModule = () => {
  const { bloodTestOrders } = useHealthData();
  const activeOrder = bloodTestOrders[0];
  const [activeStep, setActiveStep] = useState(3); // 1: Scheduled, 2: Tech Assigned, 3: Sample Collected, 4: At Lab, 5: Report Ready

  const steps = [
    { title: 'Scheduled', time: '21 May, 07:00 AM' },
    { title: 'Tech Assigned', time: '21 May, 07:45 AM' },
    { title: 'Sample Collected', time: '21 May, 08:30 AM' },
    { title: 'At Processing Lab', time: 'In Progress' },
    { title: 'Report Ready', time: 'Pending' }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Blood Sample Tracking</h1>
          <p className="text-xs text-slate-500">
            Real-time phlebotomist tracking from home collection to digital lab report.
          </p>
        </div>
        <span className="px-3 py-1 bg-rose-50 text-rose-700 font-bold text-xs rounded-full border border-rose-200">
          🩸 Booking #{activeOrder?.bookingId}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Phlebotomist & Booking Card */}
        <div className="md:col-span-6 space-y-6">
          {/* Booking Summary Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Sample Collection Details</h3>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                Home Visit
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Test Package:</span>
                <span className="font-bold text-slate-800">{activeOrder?.testName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Scheduled Date:</span>
                <span className="font-semibold text-slate-800">{activeOrder?.date} ({activeOrder?.timeSlot})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Sample Address:</span>
                <span className="font-semibold text-slate-800">{activeOrder?.address}</span>
              </div>
            </div>
          </div>

          {/* Phlebotomist Tracking */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Technician Details</h3>
              <span className="text-xs text-emerald-600 font-bold">● On Route</span>
            </div>

            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"
                alt="Phlebotomist"
                className="w-12 h-12 rounded-2xl object-cover border"
              />
              <div className="flex-1">
                <h4 className="text-xs font-bold text-slate-900">{activeOrder?.technician.name}</h4>
                <p className="text-[11px] text-slate-500">Certified Lab Phlebotomist • ⭐ 4.8</p>
                <div className="text-[11px] text-slate-600 mt-0.5">
                  Bike: {activeOrder?.technician.vehicle} • ETA: <strong>{activeOrder?.technician.eta}</strong>
                </div>
              </div>
              <a
                href={`tel:${activeOrder?.technician.phone}`}
                className="p-2.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-xl font-bold text-xs"
              >
                📞 Call
              </a>
            </div>
          </div>
        </div>

        {/* Right Live Processing Status & Barcode */}
        <div className="md:col-span-6 space-y-6">
          {/* Live Progress Timeline */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-5">
            <h3 className="text-sm font-bold text-slate-900">Live Sample Progress</h3>

            <div className="space-y-4">
              {steps.map((step, idx) => {
                const isPassed = idx + 1 <= activeStep;
                const isCurrent = idx + 1 === activeStep;
                return (
                  <div key={idx} className="flex items-start gap-3 relative">
                    {idx < steps.length - 1 && (
                      <div
                        className={`absolute left-3.5 top-7 bottom-0 w-0.5 ${
                          isPassed ? 'bg-blue-600' : 'bg-slate-200'
                        }`}
                      />
                    )}
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold z-10 ${
                        isPassed
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-slate-100 text-slate-400 border border-slate-200'
                      }`}
                    >
                      {isPassed ? '✓' : idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className={`font-bold ${isCurrent ? 'text-blue-600' : 'text-slate-800'}`}>
                          {step.title}
                        </span>
                        <span className="text-[10px] text-slate-400">{step.time}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Barcode & Lab Accreditation */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Sample Barcode & ID</span>
              <span className="font-mono text-xs font-bold text-slate-900">{activeOrder?.sampleId}</span>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-center font-mono text-lg tracking-widest text-slate-700">
              |||||| | | ||||| || |||||| | |||
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
              <span>Testing Lab: <strong>{activeOrder?.lab}</strong></span>
              <span className="text-emerald-600 font-bold">NABL Certified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BloodSampleTrackingModule;
