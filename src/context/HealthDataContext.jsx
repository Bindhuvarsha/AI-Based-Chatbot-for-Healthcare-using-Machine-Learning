// Centralized Health Data Context managing state across all 27 modules
import React, { createContext, useContext, useState } from 'react';

const HealthDataContext = createContext();

export const HealthDataProvider = ({ children }) => {
  // 1. Health Score & Vitals
  const [healthScore, setHealthScore] = useState(82);
  const [vitals, setVitals] = useState({
    heartRate: 72,
    bloodPressure: '120/80',
    systolic: 120,
    diastolic: 80,
    bloodSugar: 98,
    bloodSugarPost: 124,
    spo2: 98,
    temperature: 36.6,
    respiratoryRate: 16,
    stressLevel: 36,
    bmi: 23.5,
    height: 175,
    weight: 72,
    steps: 7842,
    stepGoal: 10000,
    sleepHours: 7.2,
    waterGlasses: 6,
    waterGoal: 8,
    caloriesBurned: 412
  });

  // 2. Medicine Reminders
  const [reminders, setReminders] = useState([
    { id: 'rem-1', name: 'Paracetamol 650mg', dosage: '1 Tablet', time: '08:00 AM', when: 'After Food', taken: true, streak: 12 },
    { id: 'rem-2', name: 'Vitamin D3 60K', dosage: '1 Capsule', time: '10:00 AM', when: 'After Food', taken: true, streak: 5 },
    { id: 'rem-3', name: 'Metformin 500mg', dosage: '1 Tablet', time: '02:00 PM', when: 'Before Food', taken: false, streak: 18 },
    { id: 'rem-4', name: 'Atorvastatin 10mg', dosage: '1 Tablet', time: '08:00 PM', when: 'After Food', taken: false, streak: 20 },
    { id: 'rem-5', name: 'Omega 3 Capsule', dosage: '1 Softgel', time: '09:30 PM', when: 'With Food', taken: false, streak: 9 }
  ]);

  // 3. Appointments
  const [appointments, setAppointments] = useState([
    {
      id: 'apt-101',
      doctor: 'Dr. Arjun Mehta',
      specialty: 'Cardiologist',
      hospital: 'City Care Hospital, Mumbai',
      date: '22 May 2025',
      time: '10:30 AM',
      type: 'Video Call',
      status: 'Confirmed',
      token: 15,
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80'
    },
    {
      id: 'apt-102',
      doctor: 'Dr. Neha Verma',
      specialty: 'Dermatologist',
      hospital: 'Skin Plus Clinic, Bengaluru',
      date: '24 May 2025',
      time: '04:00 PM',
      type: 'In-Clinic',
      status: 'Confirmed',
      token: 8,
      avatar: 'https://images.unsplash.com/photo-1594824813511-2092147775a7?w=150&auto=format&fit=crop&q=80'
    }
  ]);

  // 4. Blood Tests & Lab Tracking
  const [bloodTestOrders, setBloodTestOrders] = useState([
    {
      bookingId: 'BLD1092432',
      sampleId: 'SMP59284291',
      testName: 'Complete Blood Count (CBC) + Lipid Profile',
      date: '21 May 2025',
      timeSlot: '08:00 AM - 09:00 AM',
      address: '12, Green Vista, Koramangala, Bangalore',
      technician: { name: 'Amit Kumar', phone: '+91 98100 45210', vehicle: 'KA-03-JK-1234', eta: '12 mins' },
      status: 'Sample Collected', // Scheduled -> Technician Assigned -> Sample Collected -> At Lab -> Processing -> Completed
      lab: 'Redcliffe Labs, Koramangala',
      isCompleted: false
    }
  ]);

  // 5. Medicine Cart & Orders
  const [medicineCart, setMedicineCart] = useState([
    { id: 'm-1', name: 'Paracetamol 650mg', type: 'Tablet', qty: 2, price: 45.00, inStock: true },
    { id: 'm-2', name: 'Azithromycin 500mg', type: 'Tablet', qty: 1, price: 120.00, inStock: true },
    { id: 'm-3', name: 'Cetirizine 10mg', type: 'Tablet', qty: 1, price: 75.00, inStock: true },
    { id: 'm-4', name: 'Vitamin D3 60K', type: 'Capsule', qty: 1, price: 60.00, inStock: true }
  ]);

  const [activeDelivery, setActiveDelivery] = useState({
    orderId: 'MD12567890',
    expectedTime: '7:30 PM - 8:30 PM',
    status: 'Out for Delivery',
    agent: { name: 'Harish Kumar', rating: 4.8, phone: '+91 98450 12345' },
    total: 300.00,
    itemsCount: 4,
    steps: ['Order Placed', 'Packed', 'Dispatched', 'Out for Delivery', 'Delivered']
  });

  // 6. Insurance & Claims
  const [insurancePolicy, setInsurancePolicy] = useState({
    policyName: 'Star Comprehensive Health Insurance',
    policyNumber: 'SH/12/3456789/2024',
    provider: 'Star Health and Allied Insurance',
    sumInsured: 1000000,
    availableBalance: 700000,
    usedAmount: 300000,
    validTill: '31 Mar 2026',
    membersCovered: 4,
    premiumDueDate: '15 May 2026',
    status: 'Active'
  });

  const [insuranceClaims, setInsuranceClaims] = useState([
    { id: 'CLM123456', title: 'Hospitalization - Knee Arthroscopy', date: '16 May 2024', amount: 45000, status: 'Approved' },
    { id: 'CLM123455', title: 'Day Care - Cataract Surgery', date: '14 May 2024', amount: 12500, status: 'Approved' },
    { id: 'CLM123454', title: 'Hospitalization - Dengue Care', date: '05 Apr 2024', amount: 18750, status: 'Approved' },
    { id: 'CLM123453', title: 'Dental Emergency Root Canal', date: '20 Mar 2024', amount: 5000, status: 'Rejected' }
  ]);

  // 7. Family Members
  const [familyMembers, setFamilyMembers] = useState([
    { id: 'fam-1', name: 'Dhanushree V M', relation: 'Self', age: 21, gender: 'Female', blood: 'O+', role: 'Admin' },
    { id: 'fam-2', name: 'Nithin K V', relation: 'Spouse', age: 24, gender: 'Male', blood: 'B+', role: 'Member' },
    { id: 'fam-3', name: 'Aarav V', relation: 'Son', age: 4, gender: 'Male', blood: 'O+', role: 'Member', nextVaccine: 'Hepatitis A - 2nd Dose' },
    { id: 'fam-4', name: 'Ananya V', relation: 'Daughter', age: 2, gender: 'Female', blood: 'B+', role: 'Member', nextCheckup: 'Dental Checkup' }
  ]);

  // 8. Blockchain Verified Records
  const [blockchainRecords, setBlockchainRecords] = useState([
    {
      id: 'BC-984210',
      title: 'Blood Test Report (Full Panel)',
      issuedBy: 'City Heart Hospital',
      date: '18 May 2025',
      hash: '0x8f2d...39c1',
      signatureId: 'DIG-7A5F-8BC1-44D2',
      isTamperFree: true,
      blockNumber: 4892104,
      verifiedDoctor: 'Dr. Rahul Sharma (MBBS, MD)'
    },
    {
      id: 'BC-984211',
      title: 'MRI Brain Scan Report',
      issuedBy: 'Apollo Diagnostics',
      date: '10 May 2025',
      hash: '0x31b2...9f7a',
      signatureId: 'DIG-9C4B-11F2-99E1',
      isTamperFree: true,
      blockNumber: 4887302,
      verifiedDoctor: 'Dr. Priya Verma (MD Radiology)'
    }
  ]);

  // 9. Emergency SOS State
  const [isSosActive, setIsSosActive] = useState(false);
  const [sosCountdown, setSosCountdown] = useState(5);

  const toggleReminder = (id) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, taken: !r.taken } : r));
  };

  const addReminder = (newRem) => {
    setReminders(prev => [...prev, { id: `rem-${Date.now()}`, taken: false, streak: 0, ...newRem }]);
  };

  const updateVitals = (newVitals) => {
    setVitals(prev => ({ ...prev, ...newVitals }));
  };

  return (
    <HealthDataContext.Provider value={{
      healthScore, setHealthScore,
      vitals, updateVitals,
      reminders, toggleReminder, addReminder,
      appointments, setAppointments,
      bloodTestOrders, setBloodTestOrders,
      medicineCart, setMedicineCart,
      activeDelivery, setActiveDelivery,
      insurancePolicy, setInsurancePolicy,
      insuranceClaims, setInsuranceClaims,
      familyMembers, setFamilyMembers,
      blockchainRecords, setBlockchainRecords,
      isSosActive, setIsSosActive,
      sosCountdown, setSosCountdown
    }}>
      {children}
    </HealthDataContext.Provider>
  );
};

export const useHealthData = () => {
  const context = useContext(HealthDataContext);
  if (!context) throw new Error('useHealthData must be used within a HealthDataProvider');
  return context;
};
