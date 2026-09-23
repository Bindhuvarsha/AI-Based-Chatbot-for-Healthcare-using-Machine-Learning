import React, { useState } from 'react';

export const SkinHairConsultationModule = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState('Skin');
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(true);

  const categories = ['Skin', 'Hair', 'Dental', 'General', 'Eye', 'Nutrition'];

  const doctors = [
    {
      name: 'Dr. Ananya Reddy',
      degree: 'MBBS, MD - Dermatology & Cosmetology',
      exp: '8+ Years Exp',
      rating: '5.0 (324 Reviews)',
      match: '98% Best Match',
      fee: '₹600',
      avatar: 'https://images.unsplash.com/photo-1594824813511-2092147775a7?w=150'
    },
    {
      name: 'Dr. Kavya Sharma',
      degree: 'MBBS, DVD - Trichology & Skin Care',
      exp: '6+ Years Exp',
      rating: '4.9 (256 Reviews)',
      match: '95% Match',
      fee: '₹500',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150'
    }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Specialized Consultation (Skin & Hair)</h1>
          <p className="text-xs text-slate-500">
            AI image pre-screening paired with top board-certified dermatologists and specialists.
          </p>
        </div>
        <span className="px-3 py-1 bg-purple-50 text-purple-700 font-bold text-xs rounded-full border border-purple-200">
          ✨ Dermatology AI Vision
        </span>
      </div>

      {/* Category Pills */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Choose Concern Area</span>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left AI Vision Pre-Screening Results */}
        <div className="md:col-span-6 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-5">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900">AI Visual Pre-Screening</h3>
            <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2.5 py-0.5 rounded-full">
              Confidence: 82%
            </span>
          </div>

          {/* AI Checklist Status */}
          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between">
              <span className="text-slate-700 font-medium">📸 Image Resolution & Lighting</span>
              <span className="text-emerald-600 font-bold">✓ High Quality</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between">
              <span className="text-slate-700 font-medium">🔬 Skin Pattern Classification</span>
              <span className="text-blue-600 font-bold">✓ Erythema / Papules</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-2xl flex items-center justify-between">
              <span className="text-slate-700 font-medium">⚠️ Clinical Risk Tier</span>
              <span className="text-amber-600 font-bold">Low to Moderate Risk</span>
            </div>
          </div>

          <div className="p-3.5 bg-purple-50/60 border border-purple-100 rounded-2xl space-y-1.5">
            <div className="text-xs font-bold text-purple-900">AI Suspected Conditions:</div>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2.5 py-1 bg-white text-purple-800 text-[11px] font-bold rounded-lg border border-purple-200">
                Acne Vulgaris (Grade II)
              </span>
              <span className="px-2.5 py-1 bg-white text-purple-800 text-[11px] font-bold rounded-lg border border-purple-200">
                Mild Contact Dermatitis
              </span>
            </div>
          </div>
        </div>

        {/* Right Matched Specialists & Booking */}
        <div className="md:col-span-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900">Recommended Board-Certified Specialists</h3>

          {doctors.map((doc, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3 hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <img
                  src={doc.avatar}
                  alt={doc.name}
                  className="w-12 h-12 rounded-2xl object-cover border"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{doc.name}</h4>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {doc.match}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">{doc.degree}</p>
                  <span className="text-[10px] text-slate-400 font-semibold">{doc.exp} • ⭐ {doc.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                <span className="font-bold text-slate-900">Fee: {doc.fee}</span>
                <button
                  onClick={() => onNavigate('20_video_consult')}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl text-xs shadow-sm transition"
                >
                  Book Video Consult →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SkinHairConsultationModule;
