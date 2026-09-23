import React, { useState } from 'react';

export const ScanPrescriptionModule = ({ onNavigate }) => {
  const [scanStep, setScanStep] = useState(1); // 1: upload/scan, 2: quality check, 3: extracting, 4: results
  const [extractedData, setExtractedData] = useState(null);

  const handleStartScan = () => {
    setScanStep(2);
    setTimeout(() => {
      setScanStep(3);
      setTimeout(() => {
        setScanStep(4);
        setExtractedData({
          doctor: 'Dr. Rahul Sharma (MBBS, MD)',
          regNo: 'KMC 12345',
          date: '20 May 2025',
          patient: 'Ramesh Verma (45 / Male)',
          hospital: 'City Care Hospital, Bengaluru',
          authenticityScore: '98% Verified Authentic',
          medicines: [
            { name: 'Paracetamol 500 mg', dosage: '1-0-1 (After Food)', duration: '5 Days', confidence: '98%' },
            { name: 'Amoxicillin 500 mg', dosage: '1-1-1 (After Food)', duration: '5 Days', confidence: '94%' },
            { name: 'Pantoprazole 40 mg', dosage: '1-0-0 (Before Food)', duration: '10 Days', confidence: '96%' }
          ]
        });
      }, 1500);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Scan Prescription (OCR)</h1>
          <p className="text-xs text-slate-500">
            Extract handwritten medicines, dosages, and verify doctor credentials with AI.
          </p>
        </div>
        <span className="px-3 py-1 bg-amber-50 text-amber-700 font-bold text-xs rounded-full border border-amber-200">
          🔍 Neural Handwriting OCR
        </span>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
        {scanStep === 1 && (
          <div className="text-center py-10 space-y-5 max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto bg-amber-50 border-2 border-dashed border-amber-300 rounded-3xl flex items-center justify-center text-4xl">
              📄
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Upload or Capture Prescription</h3>
              <p className="text-xs text-slate-500 mt-1">
                Supports camera capture or gallery image (JPG, PNG, PDF up to 10MB)
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleStartScan}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xs shadow-md transition flex items-center justify-center gap-2"
              >
                <span>📷</span> Scan with Camera
              </button>
              <button
                onClick={handleStartScan}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs transition flex items-center justify-center gap-2"
              >
                <span>🖼️</span> Upload from Gallery
              </button>
            </div>
          </div>
        )}

        {(scanStep === 2 || scanStep === 3) && (
          <div className="text-center py-14 space-y-4">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <h3 className="text-lg font-bold text-slate-900">
              {scanStep === 2 ? 'Analyzing Image Quality & Alignment...' : 'Extracting Doctor Handwriting & Medicine Dosages...'}
            </h3>
            <p className="text-xs text-slate-400">Powered by Healthcare Vision NLP</p>
          </div>
        )}

        {scanStep === 4 && extractedData && (
          <div className="space-y-6 animate-fade-in">
            {/* Authenticity Badge */}
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">✅</span>
                <div>
                  <h4 className="text-xs font-bold text-emerald-900">Prescription Authenticity Verified</h4>
                  <p className="text-[11px] text-emerald-700">
                    Doctor Signature Detected • Hospital Stamp Validated • {extractedData.regNo}
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                {extractedData.authenticityScore}
              </span>
            </div>

            {/* Doctor & Patient Metadata */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 block text-[10px]">Prescribing Doctor</span>
                <span className="font-bold text-slate-900">{extractedData.doctor}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 block text-[10px]">Patient Name</span>
                <span className="font-bold text-slate-900">{extractedData.patient}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 block text-[10px]">Date Issued</span>
                <span className="font-bold text-slate-900">{extractedData.date}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 block text-[10px]">Hospital / Clinic</span>
                <span className="font-bold text-slate-900">{extractedData.hospital}</span>
              </div>
            </div>

            {/* Extracted Dosage Table */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Extracted Medicines & Dosage Plan
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border border-slate-200 rounded-2xl overflow-hidden">
                  <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Medicine Name</th>
                      <th className="p-3">Dosage / Timings</th>
                      <th className="p-3">Course Duration</th>
                      <th className="p-3">OCR Confidence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {extractedData.medicines.map((med, i) => (
                      <tr key={i} className="hover:bg-slate-50/60">
                        <td className="p-3 font-bold text-slate-900">{med.name}</td>
                        <td className="p-3 text-slate-700">{med.dosage}</td>
                        <td className="p-3 text-slate-700">{med.duration}</td>
                        <td className="p-3 font-bold text-emerald-600">{med.confidence}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => onNavigate('14_medicine_reminder')}
                className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xs shadow-md transition flex items-center gap-2"
              >
                <span>⏰</span> Add to Smart Reminder
              </button>
              <button
                onClick={() => onNavigate('15_medicine_delivery')}
                className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs shadow-md transition flex items-center gap-2"
              >
                <span>🚚</span> Order Medicines Online
              </button>
              <button
                onClick={() => setScanStep(1)}
                className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-xs transition"
              >
                Scan Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ScanPrescriptionModule;
