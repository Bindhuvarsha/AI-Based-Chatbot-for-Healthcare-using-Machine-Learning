import React, { useState } from 'react';

export const NearbyPharmacyFinderModule = ({ onNavigate }) => {
  const [searchMedicine, setSearchMedicine] = useState('Paracetamol 650 mg');
  const [filter24x7, setFilter24x7] = useState(true);

  const pharmacies = [
    {
      id: 'ph-1',
      name: 'MedPlus Pharmacy',
      address: '100ft Road, Koramangala 4th Block, Bengaluru',
      distance: '1.2 km',
      time: '5 mins away',
      isOpen24: true,
      rating: 4.6,
      reviews: 128,
      stockStatus: 'In Stock (Available)',
      price: '₹15.00 / Strip',
      phone: '+91 80 2553 1234'
    },
    {
      id: 'ph-2',
      name: 'Apollo Pharmacy',
      address: '80ft Road, Sony World Signal, Koramangala, Bengaluru',
      distance: '2.4 km',
      time: '10 mins away',
      isOpen24: true,
      rating: 4.5,
      reviews: 96,
      stockStatus: 'In Stock (Available)',
      price: '₹14.50 / Strip',
      phone: '+91 80 2552 5678'
    },
    {
      id: 'ph-3',
      name: 'Netmeds Local Express Store',
      address: 'Near Forum Mall, Hosur Road, Bengaluru',
      distance: '800 m',
      time: '3 mins away',
      isOpen24: false,
      rating: 4.3,
      reviews: 72,
      stockStatus: 'In Stock (Lowest Price)',
      price: '₹13.00 / Strip',
      phone: '+91 80 4111 9999'
    }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Nearby Pharmacy Finder</h1>
          <p className="text-xs text-slate-500">
            Find certified pharmacies, compare medicine prices, and verify live stock.
          </p>
        </div>
        <span className="px-3 py-1 bg-blue-50 text-blue-700 font-bold text-xs rounded-full border border-blue-200">
          📍 Location: Koramangala, BLR
        </span>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchMedicine}
              onChange={(e) => setSearchMedicine(e.target.value)}
              placeholder="Search medicine name to check live store stock..."
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-blue-500"
            />
            <span className="absolute left-3.5 top-3 text-slate-400 text-sm">🔍</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter24x7(!filter24x7)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition ${
                filter24x7
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              🕒 24x7 Open Stores
            </button>
          </div>
        </div>
      </div>

      {/* Map Simulation & Pharmacy Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Map Simulation Graphic */}
        <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-6 text-white min-h-[380px] flex flex-col justify-between relative overflow-hidden shadow-lg">
          <div className="relative z-10 space-y-2">
            <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Live Pharmacy Radar</span>
            <h3 className="text-base font-bold">3 Pharmacies Within 3 km</h3>
            <p className="text-xs text-slate-400">All showing active stock for "{searchMedicine}"</p>
          </div>

          {/* Graphical Map Representation */}
          <div className="relative my-6 h-40 bg-slate-800/80 rounded-2xl border border-slate-700 p-4 flex items-center justify-center">
            <div className="absolute w-32 h-32 rounded-full border border-blue-500/30 animate-ping" />
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-lg z-10">
              📍 You
            </div>
            <div className="absolute top-4 left-6 bg-emerald-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full shadow">
              MedPlus (1.2km)
            </div>
            <div className="absolute bottom-4 right-6 bg-blue-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full shadow">
              Apollo (2.4km)
            </div>
          </div>

          <div className="relative z-10 text-[11px] text-slate-400 text-center">
            Interactive GPS powered by OpenStreetMap / Leaflet
          </div>
        </div>

        {/* Right Pharmacy List */}
        <div className="lg:col-span-7 space-y-4">
          {pharmacies.map((pharm) => (
            <div
              key={pharm.id}
              className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm space-y-3 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">{pharm.name}</h3>
                    {pharm.isOpen24 && (
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 font-bold text-[9px] rounded-full border border-emerald-200">
                        24x7 Open
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{pharm.address}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-900">{pharm.price}</span>
                  <span className="text-[10px] text-emerald-600 block font-semibold">{pharm.stockStatus}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                <span className="text-slate-500 text-[11px]">
                  📍 {pharm.distance} • ⭐ {pharm.rating} ({pharm.reviews} reviews)
                </span>
                <div className="flex gap-2">
                  <a
                    href={`tel:${pharm.phone}`}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition"
                  >
                    📞 Call
                  </a>
                  <button
                    onClick={() => onNavigate('15_medicine_delivery')}
                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-sm transition"
                  >
                    Order from Store
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default NearbyPharmacyFinderModule;
