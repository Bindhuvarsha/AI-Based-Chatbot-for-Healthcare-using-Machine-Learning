import React, { useState } from 'react';
import { useHealthData } from '../../context/HealthDataContext';

export const MedicineDeliveryModule = ({ onNavigate }) => {
  const { medicineCart, setMedicineCart, activeDelivery } = useHealthData();
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [isExpress, setIsExpress] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalItemCost = medicineCart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const deliveryFee = isExpress ? 49 : 0;
  const finalTotal = totalItemCost + deliveryFee;

  const handleCheckout = () => {
    setOrderPlaced(true);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Medicine Delivery & Pharmacy Store</h1>
          <p className="text-xs text-slate-500">
            Delivering to: <strong className="text-blue-600">12, Green Vista, Koramangala, Bengaluru</strong>
          </p>
        </div>
        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full border border-emerald-200">
          🚚 60-Min Express Available
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Cart & Upload Prescription */}
        <div className="lg:col-span-7 space-y-6">
          {/* Upload Prescription Dropzone */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-900">Upload Prescription for Pharmacist Verification</h3>
              <span className="text-[10px] text-slate-400">Step 1</span>
            </div>

            <div
              onClick={() => onNavigate('12_scan_prescription')}
              className="p-6 border-2 border-dashed border-blue-200 rounded-2xl bg-blue-50/40 text-center hover:bg-blue-50 transition cursor-pointer"
            >
              <span className="text-3xl block mb-2">📋</span>
              <div className="text-xs font-bold text-slate-800">Drag & Drop prescription image or Click to Scan</div>
              <div className="text-[10px] text-slate-400 mt-1">Our licensed pharmacist will verify medicines within 5 mins</div>
            </div>
          </div>

          {/* Medicine Cart */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-900">Medicine Cart ({medicineCart.length} Items)</h3>
              <span className="text-xs text-emerald-600 font-bold">✓ 100% Genuine Pharmacy Stock</span>
            </div>

            <div className="space-y-3 divide-y divide-slate-100">
              {medicineCart.map((item) => (
                <div key={item.id} className="pt-3 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{item.name}</div>
                    <span className="text-[10px] text-slate-400">{item.type} • Qty: {item.qty}</span>
                  </div>
                  <div className="font-bold text-slate-900">₹{(item.price * item.qty).toFixed(2)}</div>
                </div>
              ))}
            </div>

            {/* Express Delivery Add-on */}
            <div className="p-3.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">⚡</span>
                <div>
                  <div className="text-xs font-bold text-amber-900">60-Minute Express Delivery</div>
                  <div className="text-[10px] text-amber-700">Priority packing & dedicated bike rider</div>
                </div>
              </div>
              <button
                onClick={() => setIsExpress(!isExpress)}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition ${
                  isExpress ? 'bg-amber-600 text-white' : 'bg-white text-amber-800 border border-amber-300'
                }`}
              >
                {isExpress ? 'Added (+₹49)' : '+ ₹49'}
              </button>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs pt-3 border-t border-slate-100">
              <div className="flex justify-between text-slate-600">
                <span>Items Subtotal</span>
                <span>₹{totalItemCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}.00`}</span>
              </div>
              <div className="flex justify-between font-black text-slate-900 text-sm pt-2 border-t border-slate-200">
                <span>Total Payable Amount</span>
                <span className="text-blue-600">₹{finalTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Live Delivery Tracking & Payment */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Live Delivery Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Live Order Status</span>
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 font-bold text-[10px] rounded-full border border-emerald-200">
                {activeDelivery.status}
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl text-xs space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>Order ID:</span>
                <span className="font-mono font-bold text-slate-900">{activeDelivery.orderId}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Expected Time:</span>
                <span className="font-bold text-blue-600">{activeDelivery.expectedTime}</span>
              </div>
            </div>

            {/* Delivery Agent Card */}
            <div className="p-3.5 bg-blue-50/50 border border-blue-100 rounded-2xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-lg">
                  🛵
                </div>
                <div>
                  <div className="font-bold text-slate-900">{activeDelivery.agent.name}</div>
                  <div className="text-[10px] text-slate-500">⭐ {activeDelivery.agent.rating} • Delivery Partner</div>
                </div>
              </div>
              <a href={`tel:${activeDelivery.agent.phone}`} className="p-2 bg-blue-100 text-blue-700 rounded-xl font-bold">
                📞 Call
              </a>
            </div>
          </div>

          {/* Payment Gateway */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Choose Payment Method</h3>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setSelectedPayment('upi')}
                className={`p-3 rounded-2xl border text-center transition font-bold ${
                  selectedPayment === 'upi' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                UPI (GPay / PhonePe)
              </button>
              <button
                onClick={() => setSelectedPayment('cod')}
                className={`p-3 rounded-2xl border text-center transition font-bold ${
                  selectedPayment === 'cod' ? 'bg-blue-50 border-blue-500 text-blue-700' : 'bg-slate-50 border-slate-200'
                }`}
              >
                Cash on Delivery
              </button>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs shadow-lg shadow-emerald-600/30 transition"
            >
              Pay ₹{finalTotal.toFixed(2)} Securely 🔒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MedicineDeliveryModule;
