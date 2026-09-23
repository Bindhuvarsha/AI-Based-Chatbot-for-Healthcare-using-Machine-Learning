import React, { useState } from 'react';
import { useHealthData } from '../../context/HealthDataContext';

export const InsuranceIntegrationModule = () => {
  const { insurancePolicy, insuranceClaims } = useHealthData();
  const [activeTab, setActiveTab] = useState('policy'); // policy, claims, cashless, submit

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Health Insurance Integration</h1>
          <p className="text-xs text-slate-500">Manage your family health policies, cashless claims, and hospital admissions.</p>
        </div>
        <span className="px-3 py-1 bg-blue-50 text-blue-700 font-bold text-xs rounded-full border border-blue-200">
          🛡️ Verified Cashless Policy
        </span>
      </div>

      {/* Sub Tabs */}
      <div className="flex gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('policy')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'policy' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          📜 My Policy
        </button>
        <button
          onClick={() => setActiveTab('claims')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'claims' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          🔍 Claim Status (8)
        </button>
        <button
          onClick={() => setActiveTab('cashless')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'cashless' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          🏥 Cashless Hospitals
        </button>
      </div>

      {activeTab === 'policy' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Active Policy Card */}
          <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{insurancePolicy.policyName}</h3>
                  <p className="text-[11px] text-slate-500">{insurancePolicy.provider}</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 font-bold text-[10px] rounded-full border border-emerald-200">
                {insurancePolicy.status}
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Policy Number:</span>
                <span className="font-mono font-bold text-slate-800">{insurancePolicy.policyNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Members Covered:</span>
                <span className="font-semibold text-slate-800">{insurancePolicy.membersCovered} (Family Floater)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Policy Period:</span>
                <span className="font-semibold text-slate-800">01 Apr 2024 - {insurancePolicy.validTill}</span>
              </div>
            </div>

            {/* Sum Insured Meter */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-500">Available Claim Balance</span>
                <span className="text-emerald-600 font-bold">₹{insurancePolicy.availableBalance.toLocaleString()}</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '70%' }} />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Used: ₹{insurancePolicy.usedAmount.toLocaleString()}</span>
                <span>Total Sum: ₹{insurancePolicy.sumInsured.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-sm transition">
                📥 Download E-Health Card
              </button>
            </div>
          </div>

          {/* Quick Actions & Premium Reminder */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-gradient-to-tr from-indigo-900 to-[#0B132B] text-white p-6 rounded-3xl shadow-lg space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300">Premium Due Reminder</span>
              <h4 className="text-xl font-black">₹14,256</h4>
              <p className="text-xs text-slate-300">Due by {insurancePolicy.premiumDueDate}. Auto-debit scheduled.</p>
              <button className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs transition">
                Pay / Renew Premium
              </button>
            </div>

            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3 text-xs">
              <h4 className="font-bold text-slate-900">What's Covered in Your Policy:</h4>
              <ul className="space-y-1.5 text-slate-600 pl-4 list-disc">
                <li>Hospitalization expenses (100% Cashless)</li>
                <li>Day care medical procedures</li>
                <li>Pre and post-hospitalization (60/90 days)</li>
                <li>Emergency ambulance coverage up to ₹5,000</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'claims' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-bold text-slate-900">Historical & Active Claims</h3>
            <span className="text-xs text-slate-400">Total: 8 Claims</span>
          </div>

          <div className="space-y-3">
            {insuranceClaims.map((claim) => (
              <div
                key={claim.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-slate-900">{claim.title}</div>
                  <span className="text-[10px] text-slate-400 font-mono">Claim #{claim.id} • {claim.date}</span>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-900">₹{claim.amount.toLocaleString()}</div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      claim.status === 'Approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {claim.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'cashless' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900">Network Cashless Hospitals Nearby</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center">
              <div>
                <div className="font-bold text-slate-900">Manipal Hospital, Koramangala</div>
                <div className="text-[10px] text-slate-400">1.8 km • 24x7 TPA Desk</div>
              </div>
              <span className="text-emerald-600 font-bold">✓ Cashless</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center">
              <div>
                <div className="font-bold text-slate-900">Apollo Spectra Hospital</div>
                <div className="text-[10px] text-slate-400">2.5 km • 24x7 TPA Desk</div>
              </div>
              <span className="text-emerald-600 font-bold">✓ Cashless</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default InsuranceIntegrationModule;
