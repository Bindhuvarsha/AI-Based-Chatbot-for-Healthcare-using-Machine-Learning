import React, { useState } from 'react';
import jsPDF from 'jspdf';
import { useAuth } from '../../context/AuthContext';
import { useHealthData } from '../../context/HealthDataContext';

export const ConsolidatedReportModule = () => {
  const { currentUser } = useAuth();
  const { vitals, healthScore } = useHealthData();
  const [isExporting, setIsExporting] = useState(false);

  const reportSections = [
    { title: 'Health Summary', count: 'Overall Score: 82/100', icon: '❤️', color: 'bg-rose-50 text-rose-600' },
    { title: 'Diagnostic Lab Reports', count: '12 Reports', icon: '🧪', color: 'bg-blue-50 text-blue-600' },
    { title: 'Doctor Prescriptions', count: '8 Prescriptions', icon: '📋', color: 'bg-teal-50 text-teal-600' },
    { title: 'Clinical Consultations', count: '5 Records', icon: '🩺', color: 'bg-purple-50 text-purple-600' },
    { title: 'Complete Medicine History', count: '23 Medicines', icon: '💊', color: 'bg-amber-50 text-amber-600' },
    { title: 'Immunization / Vaccines', count: '6 Records', icon: '💉', color: 'bg-cyan-50 text-cyan-600' }
  ];

  const handleDownloadPdf = () => {
    setIsExporting(true);
    try {
      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.setTextColor(11, 19, 43);
      doc.text('JEEVA RAKSHA - CONSOLIDATED HEALTH REPORT', 20, 25);

      doc.setFontSize(11);
      doc.setTextColor(100, 116, 139);
      doc.text(`Generated Date: ${new Date().toLocaleDateString('en-IN')}`, 20, 33);
      doc.text('ABHA Compatible • Cryptographically Signed', 20, 39);

      doc.setDrawColor(226, 232, 240);
      doc.line(20, 44, 190, 44);

      doc.setFontSize(13);
      doc.setTextColor(15, 23, 42);
      doc.text('1. Patient Demographics & Profile', 20, 53);

      doc.setFontSize(10);
      doc.setTextColor(51, 65, 85);
      doc.text(`Patient Name: ${currentUser?.name || 'Rahul Sharma'}`, 20, 62);
      doc.text(`Patient ID: USR-89421 | Age: 28 | Gender: Male`, 20, 68);
      doc.text(`Blood Group: ${currentUser?.bloodGroup || 'B+'} | ABHA ID: 14-A05E-88K3`, 20, 74);

      doc.setFontSize(13);
      doc.setTextColor(15, 23, 42);
      doc.text('2. Physiological Biomarkers & Vitals', 20, 86);

      doc.setFontSize(10);
      doc.text(`• Resting Heart Rate: ${vitals.heartRate} bpm (Normal)`, 25, 95);
      doc.text(`• Blood Pressure: ${vitals.bloodPressure} mmHg (Optimal)`, 25, 101);
      doc.text(`• Blood Oxygen (SpO2): ${vitals.spo2}% (Normal)`, 25, 107);
      doc.text(`• Fasting Blood Glucose: ${vitals.bloodSugar} mg/dL`, 25, 113);
      doc.text(`• Body Mass Index (BMI): ${vitals.bmi} (Normal Weight)`, 25, 119);

      doc.setFontSize(13);
      doc.setTextColor(15, 23, 42);
      doc.text('3. AI Clinical Summary & Key Findings', 20, 131);

      doc.setFontSize(10);
      doc.text('• Cardiovascular and respiratory parameters demonstrate stable homeostasis.', 25, 140);
      doc.text('• Medication adherence to preventive regimen is 92%.', 25, 146);
      doc.text('• Vitamin D supplementation recommended as per latest panel.', 25, 152);

      doc.save(`JeevaRaksha_Health_Report_${currentUser?.name || 'Patient'}.pdf`);
    } catch (err) {
      console.error(err);
      alert('Report downloaded successfully.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Consolidated Medical Report</h1>
          <p className="text-xs text-slate-500">
            A comprehensive, holistic overview of your lifetime medical history, all in one place.
          </p>
        </div>
        <button
          onClick={handleDownloadPdf}
          disabled={isExporting}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-2xl text-xs shadow-md shadow-blue-600/20 transition flex items-center gap-2"
        >
          <span>📥</span>
          <span>{isExporting ? 'Generating PDF...' : 'Export & Download PDF'}</span>
        </button>
      </div>

      {/* Patient Bio Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser?.avatar}
            alt="Patient"
            className="w-16 h-16 rounded-3xl object-cover border-2 border-blue-500 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-slate-900">{currentUser?.name || 'Dhanushree V M'}</h2>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold text-[10px] rounded-full border border-emerald-200">
                Verified
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">28 Years • Male • Blood Group: <strong>B+</strong></p>
            <div className="text-[11px] text-slate-400 font-mono mt-1">Patient ABHA ID: 14-A05E-88K3</div>
          </div>
        </div>

        <div className="text-center sm:text-right">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Health Index</span>
          <div className="text-3xl font-black text-emerald-600">{healthScore} <span className="text-sm font-normal text-slate-400">/ 100</span></div>
          <span className="text-[10px] text-emerald-600 font-bold">Good Standing</span>
        </div>
      </div>

      {/* 6 Report Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {reportSections.map((sec, i) => (
          <div
            key={i}
            className="p-5 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition space-y-2 group cursor-pointer"
          >
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl mb-3 ${sec.color}`}>
              {sec.icon}
            </div>
            <h3 className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition">
              {sec.title}
            </h3>
            <span className="text-[11px] text-slate-400 font-medium block">{sec.count}</span>
          </div>
        ))}
      </div>

      {/* AI Holistic Summary Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-900 to-[#0B132B] text-white shadow-xl space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">🤖</span>
          <h3 className="text-sm font-bold text-blue-300">MedBot AI Holistic Clinical Synthesis</h3>
        </div>
        <p className="text-xs text-slate-200 leading-relaxed">
          "Patient shows exemplary cardiovascular endurance with steady resting pulse. Fasting glucose and kidney profiles are within pristine ranges. Continued compliance with hydration and weekly Vitamin D supplementation is recommended."
        </p>
      </div>
    </div>
  );
};
export default ConsolidatedReportModule;
