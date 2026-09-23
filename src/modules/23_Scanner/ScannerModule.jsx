import React, { useState } from 'react';

export const ScannerModule = ({ onNavigate }) => {
  const [scanType, setScanType] = useState('abha'); // 'qr' | 'abha' | 'insurance' | 'report'
  const [isScanning, setIsScanning] = useState(false);
  const [scannedResult, setScannedResult] = useState(null);

  const handleScan = (type) => {
    setScanType(type);
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScannedResult({
        type: type.toUpperCase(),
        title: type === 'abha' ? 'National Health ID (ABHA Card)' : 'Diagnostic Lab Report',
        idNumber: '14-A05E-88K3',
        holder: 'Dhanushree V M',
        dob: '05 Mar 2005 (Age: 21)',
        bloodGroup: 'O+',
        extractedText: 'Haemoglobin: 13.2 g/dL | WBC: 6,200 | Platelets: 2.45 L | Serum Creatinine: 0.9 mg/dL',
        status: 'Auto-Cropped & Text Extracted'
      });
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Medical Document Scanner & OCR</h1>
          <p className="text-xs text-slate-500">
            Digitize ABHA health cards, insurance policies, and lab reports with auto-crop edge detection.
          </p>
        </div>
        <span className="px-3 py-1 bg-blue-50 text-blue-700 font-bold text-xs rounded-full border border-blue-200">
          📱 Vision Edge Detection
        </span>
      </div>

      {/* Scanner Mode Options */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={() => handleScan('qr')}
          className="p-4 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-300 transition text-left space-y-1"
        >
          <span className="text-2xl block mb-1">🏁</span>
          <div className="font-bold text-xs text-slate-900">Scan QR Code</div>
          <div className="text-[11px] text-slate-400">Instant health check-in</div>
        </button>

        <button
          onClick={() => handleScan('abha')}
          className="p-4 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-300 transition text-left space-y-1"
        >
          <span className="text-2xl block mb-1">💳</span>
          <div className="font-bold text-xs text-slate-900">Scan Health Card</div>
          <div className="text-[11px] text-slate-400">ABHA / Ayushman Bharat</div>
        </button>

        <button
          onClick={() => handleScan('insurance')}
          className="p-4 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-300 transition text-left space-y-1"
        >
          <span className="text-2xl block mb-1">🛡️</span>
          <div className="font-bold text-xs text-slate-900">Scan Insurance</div>
          <div className="text-[11px] text-slate-400">Extract TPA & Policy No.</div>
        </button>

        <button
          onClick={() => handleScan('report')}
          className="p-4 rounded-3xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-blue-300 transition text-left space-y-1"
        >
          <span className="text-2xl block mb-1">📑</span>
          <div className="font-bold text-xs text-slate-900">Scan Lab Report</div>
          <div className="text-[11px] text-slate-400">Auto-crop & parse values</div>
        </button>
      </div>

      {/* Scanner Visualizer & Extracted Results */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
        {isScanning ? (
          <div className="text-center py-16 space-y-3">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <h3 className="text-base font-bold text-slate-900">Scanning Document & Auto-Cropping Margins...</h3>
          </div>
        ) : scannedResult ? (
          <div className="space-y-5 animate-fade-in">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-800 tracking-wider">
                  Document Digitized Successfully
                </span>
                <h3 className="text-sm font-bold text-emerald-950 mt-0.5">{scannedResult.title}</h3>
              </div>
              <span className="px-3 py-1 bg-emerald-600 text-white rounded-full font-bold text-xs">
                {scannedResult.status}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 block text-[10px]">ID / Number</span>
                <span className="font-mono font-bold text-slate-900">{scannedResult.idNumber}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 block text-[10px]">Beneficiary Name</span>
                <span className="font-bold text-slate-900">{scannedResult.holder}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 block text-[10px]">DOB / Gender</span>
                <span className="font-bold text-slate-900">{scannedResult.dob}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-slate-400 block text-[10px]">Blood Group</span>
                <span className="font-black text-rose-600">{scannedResult.bloodGroup}</span>
              </div>
            </div>

            <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl text-xs space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                OCR Extracted Values
              </span>
              <p className="font-mono">{scannedResult.extractedText}</p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => onNavigate('26_blockchain_records')}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition"
              >
                Save to Blockchain Vault →
              </button>
              <button
                onClick={() => onNavigate('25_consolidated_report')}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
              >
                Add to Consolidated Report
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400 space-y-2">
            <span className="text-4xl block">📷</span>
            <h4 className="font-bold text-slate-700 text-sm">Select a Scan Mode Above</h4>
            <p className="text-xs max-w-sm mx-auto">
              You can scan cards, prescriptions, or QR codes to instantly parse medical values.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
export default ScannerModule;
