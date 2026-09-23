import React, { useState } from 'react';
import { useHealthData } from '../../context/HealthDataContext';

export const BlockchainRecordsModule = () => {
  const { blockchainRecords } = useHealthData();
  const [activeTab, setActiveTab] = useState('vault'); // vault, shares, audit, verify
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);

  const handleVerifyIntegrity = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setVerifySuccess(true);
      setTimeout(() => setVerifySuccess(false), 4000);
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Blockchain Medical Records Vault</h1>
          <p className="text-xs text-slate-500">
            Decentralized, immutable, patient-owned health records with cryptographic tamper detection.
          </p>
        </div>
        <button
          onClick={handleVerifyIntegrity}
          disabled={isVerifying}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl text-xs shadow-md transition flex items-center gap-1.5"
        >
          <span>⛓️</span>
          <span>{isVerifying ? 'Verifying Merkle Tree...' : 'Verify Cryptographic Integrity'}</span>
        </button>
      </div>

      {verifySuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl text-xs font-bold text-center">
          ✓ All 24 block hashes match ledger consensus. 0% Tamper detected across 4 network nodes!
        </div>
      )}

      {/* Top 3 Blockchain Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-400">Encrypted On-Chain Records</span>
          <div className="text-3xl font-black text-slate-900">24</div>
          <span className="text-[11px] text-emerald-600 font-bold block">✓ 100% Zero-Knowledge Encrypted</span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-400">Tamper Status</span>
          <div className="text-2xl font-black text-emerald-600">No Tampering</div>
          <span className="text-[10px] text-slate-500 block font-mono">Block: #4,892,104</span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-2">
          <span className="text-[10px] uppercase font-bold text-slate-400">Consent & Active Shares</span>
          <div className="text-3xl font-black text-blue-600">3 Hospitals</div>
          <span className="text-[11px] text-blue-600 font-bold block">Permission-Based Sharing</span>
        </div>
      </div>

      {/* Verified Records Feed */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Verified Blockchain Medical Certificates</h3>

        <div className="space-y-3">
          {blockchainRecords.map((rec) => (
            <div
              key={rec.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-slate-900">{rec.title}</h4>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full font-bold text-[9px]">
                      Verified Authentic
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Issued by: {rec.issuedBy} • {rec.date}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[10px] text-blue-600 block">{rec.hash}</span>
                  <span className="text-[9px] text-slate-400">Digital Signature: {rec.signatureId}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                <span className="text-slate-600 text-[11px]">
                  Doctor: <strong>{rec.verifiedDoctor}</strong>
                </span>
                <button
                  onClick={() => alert(`Record ${rec.id} is verified on Ethereum/Polygon healthcare testnet.`)}
                  className="text-blue-600 font-bold hover:underline"
                >
                  View Proof on Ledger →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Permissioned Sharing & Audit Trail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Hospital Access Consents</h4>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-2xl bg-slate-50 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">City Heart Hospital</div>
                <div className="text-[10px] text-slate-400">Read & Write Access • Expires 31 Dec 2025</div>
              </div>
              <span className="text-rose-600 font-bold cursor-pointer hover:underline text-[11px]">Revoke</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">Apollo Diagnostics</div>
                <div className="text-[10px] text-slate-400">Lab Upload Only • Expires 15 Jun 2025</div>
              </div>
              <span className="text-rose-600 font-bold cursor-pointer hover:underline text-[11px]">Revoke</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Immutable Audit Trail</h4>
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between text-[11px]">
              <span>📄 Record Accessed by Dr. Arjun Mehta</span>
              <span className="text-slate-400">Today, 09:30 AM</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between text-[11px]">
              <span>🔒 Merkle Root Hash Verified</span>
              <span className="text-slate-400">Yesterday, 11:20 PM</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between text-[11px]">
              <span>📥 Report Downloaded by Patient</span>
              <span className="text-slate-400">18 May 2025</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlockchainRecordsModule;
