import React, { useState } from 'react';

export const MedicineRecommendModule = ({ onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState('allopathic'); // 'allopathic' | 'ayurvedic' | 'compare'
  const [selectedCondition, setSelectedCondition] = useState('Cold & Cough');

  const conditions = ['Cold & Cough', 'Fever', 'Headache', 'Acidity', 'Body Pain', 'Stress & Sleep', 'Digestive Health'];

  const allopathicMeds = [
    {
      name: 'Paracetamol 650 mg',
      type: 'Allopathic (Antipyretic/Analgesic)',
      uses: 'Relieves fever and mild to moderate pain (headache, body ache).',
      dosage: '1 tablet every 6-8 hours after food. Max 3g daily.',
      precautions: 'Avoid with alcohol. Consult doctor if liver history.',
      genericAlt: 'Dolo 650, Calpol 650',
      price: '₹32.00',
      inStock: true
    },
    {
      name: 'Cetirizine 10 mg',
      type: 'Allopathic (Antihistamine)',
      uses: 'Relieves runny nose, sneezing, itchy eyes, and seasonal allergies.',
      dosage: '1 tablet once daily at bedtime.',
      precautions: 'May cause mild drowsiness. Avoid driving.',
      genericAlt: 'Cetzine, Alerid',
      price: '₹28.00',
      inStock: true
    },
    {
      name: 'Ambroxol & Guaifenesin Cough Syrup',
      type: 'Allopathic (Expectorant)',
      uses: 'Loosens thick mucus and relieves wet chest congestion.',
      dosage: '10ml thrice daily with warm water.',
      precautions: 'Drink plenty of warm fluids throughout the day.',
      genericAlt: 'Ascoril, Benadryl',
      price: '₹115.00',
      inStock: true
    }
  ];

  const ayurvedicMeds = [
    {
      name: 'Sitopaladi Churna',
      type: 'Ayurvedic (Rasayana)',
      uses: 'Soothes throat irritation, chronic cough, and enhances respiratory immunity.',
      dosage: '2-3 grams mixed with pure honey twice daily after food.',
      ingredients: 'Mishri, Vanshlochan, Pippali, Elaichi, Twak (Cinnamon)',
      precautions: 'Diabetic individuals should consult regarding honey mixture.',
      price: '₹85.00',
      inStock: true
    },
    {
      name: 'Panch Tulsi Drops',
      type: 'Ayurvedic (Immunomodulator)',
      uses: 'Potent antibacterial and anti-inflammatory drops for viral defense.',
      dosage: '3-5 drops in warm water or herbal tea twice daily.',
      ingredients: 'Shyam Tulsi, Rama Tulsi, Van Tulsi, Vishnu Tulsi, Nimbu Tulsi',
      precautions: '100% natural formulation.',
      price: '₹140.00',
      inStock: true
    },
    {
      name: 'Khadiradi Vati',
      type: 'Ayurvedic (Throat Soother)',
      uses: 'Relieves sore throat, hoarseness, and oral ulcerations.',
      dosage: '1 tablet to be sucked slowly 3-4 times a day.',
      ingredients: 'Khadira, Pushkaramula, Haritaki, Camphor',
      precautions: 'Avoid drinking cold water immediately after.',
      price: '₹65.00',
      inStock: true
    }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Medicine Recommendation System</h1>
          <p className="text-xs text-slate-500">
            India's premier AI dual-recommender: Modern Allopathy + Ancient Ayurveda remedies.
          </p>
        </div>
        <span className="px-3 py-1 bg-teal-50 text-teal-700 font-bold text-xs rounded-full border border-teal-200">
          🌿 Dual Science AI
        </span>
      </div>

      {/* Conditions Selector */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Select Condition</span>
        <div className="flex flex-wrap gap-2">
          {conditions.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCondition(c)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition ${
                selectedCondition === c
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Medicine Type Switcher */}
      <div className="flex justify-center">
        <div className="bg-slate-200/80 p-1 rounded-2xl flex max-w-md w-full">
          <button
            onClick={() => setActiveCategory('allopathic')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeCategory === 'allopathic' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'
            }`}
          >
            <span>💊</span> Allopathic (Modern)
          </button>
          <button
            onClick={() => setActiveCategory('ayurvedic')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeCategory === 'ayurvedic' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-600'
            }`}
          >
            <span>🌿</span> Ayurvedic (Herbal)
          </button>
          <button
            onClick={() => setActiveCategory('compare')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeCategory === 'compare' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-600'
            }`}
          >
            <span>⚖️</span> Compare
          </button>
        </div>
      </div>

      {/* Content Rendering */}
      {activeCategory === 'allopathic' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {allopathicMeds.map((med, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] uppercase font-bold text-blue-600">Modern Medicine</span>
                  <span className="text-xs font-bold text-slate-900">{med.price}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{med.name}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{med.uses}</p>

                <div className="mt-3 p-3 bg-blue-50/60 rounded-xl text-xs space-y-1">
                  <span className="font-bold text-blue-900 block text-[11px]">Recommended Dosage:</span>
                  <p className="text-slate-700">{med.dosage}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => onNavigate('14_medicine_reminder')}
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition"
                >
                  + Add Reminder
                </button>
                <button
                  onClick={() => onNavigate('15_medicine_delivery')}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
                >
                  Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeCategory === 'ayurvedic' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ayurvedicMeds.map((med, i) => (
            <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[10px] uppercase font-bold text-emerald-600">Ancient Ayurvedic</span>
                  <span className="text-xs font-bold text-slate-900">{med.price}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{med.name}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{med.uses}</p>

                <div className="mt-3 p-3 bg-emerald-50/60 rounded-xl text-xs space-y-1">
                  <span className="font-bold text-emerald-900 block text-[11px]">Dosage & Ingredients:</span>
                  <p className="text-slate-700">{med.dosage}</p>
                  <p className="text-[10px] text-slate-500 font-medium">Herbs: {med.ingredients}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => onNavigate('14_medicine_reminder')}
                  className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition"
                >
                  + Add Reminder
                </button>
                <button
                  onClick={() => onNavigate('15_medicine_delivery')}
                  className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
                >
                  Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeCategory === 'compare' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-slate-900 text-center">
            Side-by-Side Science Comparison ({selectedCondition})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-3">
              <span className="px-2.5 py-1 bg-blue-600 text-white rounded-full font-bold text-xs">
                💊 Modern Allopathy
              </span>
              <h4 className="text-sm font-bold text-slate-900">Paracetamol + Cetirizine</h4>
              <ul className="text-xs text-slate-700 space-y-2 list-disc pl-4">
                <li><strong>Speed of Action:</strong> Rapid symptom relief within 30-45 minutes.</li>
                <li><strong>Target:</strong> Directly blocks pain/histamine receptors.</li>
                <li><strong>Best for:</strong> Acute severe fever, unmanageable headaches, active workdays.</li>
                <li><strong>Side effects:</strong> Mild drowsiness, potential gastric acidity.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3">
              <span className="px-2.5 py-1 bg-emerald-600 text-white rounded-full font-bold text-xs">
                🌿 Ancient Ayurveda
              </span>
              <h4 className="text-sm font-bold text-slate-900">Sitopaladi Churna + Tulsi</h4>
              <ul className="text-xs text-slate-700 space-y-2 list-disc pl-4">
                <li><strong>Speed of Action:</strong> Progressive relief over 12-24 hours.</li>
                <li><strong>Target:</strong> Boosts mucosal immunity and balances Kapha/Pitta doshas.</li>
                <li><strong>Best for:</strong> Chronic recurrence, soothing throat lining, long-term vitality.</li>
                <li><strong>Side effects:</strong> Negligible when taken with recommended honey/warm water.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default MedicineRecommendModule;
