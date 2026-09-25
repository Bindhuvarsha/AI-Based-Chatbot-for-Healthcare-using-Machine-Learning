import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { HealthDataProvider } from './context/HealthDataContext';
import AppShell from './components/layout/AppShell';

// Legacy View
import ClassicJeevaRaksha from './JeevaRaksha.jsx';

// 27 Modular Components
import { LoginModule } from './modules/01_Login/LoginModule';
import { AppHomeModule } from './modules/02_AppHome/AppHomeModule';
import { HealthDashboardModule } from './modules/03_HealthDashboard/HealthDashboardModule';
import { MedicalIdSosModule } from './modules/04_MedicalIdEmergencySos/MedicalIdSosModule';
import { SymptomCheckerModule } from './modules/05_SymptomChecker/SymptomCheckerModule';
import { HealthRiskPredictionModule } from './modules/06_HealthRiskPrediction/HealthRiskPredictionModule';
import { AiHealthAssistantModule } from './modules/07_AiHealthAssistant/AiHealthAssistantModule';
import { VoiceAssistantModule } from './modules/08_VoiceAssistant/VoiceAssistantModule';
import { MultiLanguageModule } from './modules/09_MultiLanguage/MultiLanguageModule';
import { HealthCheckModule } from './modules/10_HealthCheck/HealthCheckModule';
import { BloodSampleTrackingModule } from './modules/11_BloodSampleTracking/BloodSampleTrackingModule';
import { ScanPrescriptionModule } from './modules/12_ScanPrescription/ScanPrescriptionModule';
import { MedicineRecommendModule } from './modules/13_MedicineRecommend/MedicineRecommendModule';
import { SmartMedicineReminderModule } from './modules/14_SmartMedicineReminder/SmartMedicineReminderModule';
import { MedicineDeliveryModule } from './modules/15_MedicineDelivery/MedicineDeliveryModule';
import { NearbyPharmacyFinderModule } from './modules/16_NearbyPharmacyFinder/NearbyPharmacyFinderModule';
import { PhysiotherapyModule } from './modules/17_Physiotherapy/PhysiotherapyModule';
import { WearableIntegrationModule } from './modules/18_WearableIntegration/WearableIntegrationModule';
import { SkinHairConsultationModule } from './modules/19_SkinHairConsultation/SkinHairConsultationModule';
import { DoctorVideoConsultModule } from './modules/20_DoctorVideoConsult/DoctorVideoConsultModule';
import { InsuranceIntegrationModule } from './modules/21_InsuranceIntegration/InsuranceIntegrationModule';
import { FamilyDoctorInsuranceModule } from './modules/22_FamilyDoctorInsurance/FamilyDoctorInsuranceModule';
import { ScannerModule } from './modules/23_Scanner/ScannerModule';
import { AnalysisModule } from './modules/24_Analysis/AnalysisModule';
import { ConsolidatedReportModule } from './modules/25_ConsolidatedReport/ConsolidatedReportModule';
import { BlockchainRecordsModule } from './modules/26_BlockchainRecords/BlockchainRecordsModule';
import { AdminAnalyticsModule } from './modules/27_AdminAnalytics/AdminAnalyticsModule';

const ModuleRouter = ({ activeModule, onNavigate, viewMode, setViewMode }) => {
  const { currentUser, isAuthenticated } = useAuth();

  // If not logged in or active module is login, show the clean full-screen Login Page matching Page 3
  if (!isAuthenticated || activeModule === '01_login') {
    return (
      <div className="min-h-screen bg-[#F5F7FB] flex flex-col justify-center items-center p-3 sm:p-6 lg:p-8 relative">
        <div className="w-full max-w-7xl flex flex-wrap justify-between items-center mb-3 gap-2">
          <button
            onClick={() => setViewMode('classic')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 shadow-sm border border-slate-200 hover:bg-slate-50 transition flex items-center gap-2 cursor-pointer"
          >
            📱 Switch to Classic Mobile App View
          </button>
          <button
            onClick={() => onNavigate('02_home')}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-sm hover:bg-blue-700 transition flex items-center gap-2 cursor-pointer"
          >
            🚀 Skip Login / Enter Patient Portal →
          </button>
        </div>
        <LoginModule onNavigate={onNavigate} />
      </div>
    );
  }

  // Render the selected module once authenticated
  const renderModule = () => {
    switch (activeModule) {
      case '01_login':
        return <LoginModule onNavigate={onNavigate} />;
      case '02_home':
        return <AppHomeModule onNavigate={onNavigate} />;
      case '03_dashboard':
        return <HealthDashboardModule onNavigate={onNavigate} />;
      case '04_emergency_sos':
        return <MedicalIdSosModule onNavigate={onNavigate} />;
      case '05_symptom_checker':
        return <SymptomCheckerModule onNavigate={onNavigate} />;
      case '06_risk_prediction':
        return <HealthRiskPredictionModule onNavigate={onNavigate} />;
      case '07_ai_assistant':
        return <AiHealthAssistantModule onNavigate={onNavigate} />;
      case '08_voice_assistant':
        return <VoiceAssistantModule onNavigate={onNavigate} />;
      case '09_multi_language':
        return <MultiLanguageModule onNavigate={onNavigate} />;
      case '10_health_check':
        return <HealthCheckModule onNavigate={onNavigate} />;
      case '11_blood_sample':
        return <BloodSampleTrackingModule onNavigate={onNavigate} />;
      case '12_scan_prescription':
        return <ScanPrescriptionModule onNavigate={onNavigate} />;
      case '13_medicine_recommend':
        return <MedicineRecommendModule onNavigate={onNavigate} />;
      case '14_medicine_reminder':
        return <SmartMedicineReminderModule onNavigate={onNavigate} />;
      case '15_medicine_delivery':
        return <MedicineDeliveryModule onNavigate={onNavigate} />;
      case '16_pharmacy_finder':
        return <NearbyPharmacyFinderModule onNavigate={onNavigate} />;
      case '17_physiotherapy':
        return <PhysiotherapyModule onNavigate={onNavigate} />;
      case '18_wearable':
        return <WearableIntegrationModule onNavigate={onNavigate} />;
      case '19_skin_hair':
        return <SkinHairConsultationModule onNavigate={onNavigate} />;
      case '20_video_consult':
        return <DoctorVideoConsultModule onNavigate={onNavigate} />;
      case '21_insurance':
        return <InsuranceIntegrationModule onNavigate={onNavigate} />;
      case '22_family_doctor':
        return <FamilyDoctorInsuranceModule onNavigate={onNavigate} />;
      case '23_scanner':
        return <ScannerModule onNavigate={onNavigate} />;
      case '24_analysis':
        return <AnalysisModule onNavigate={onNavigate} />;
      case '25_consolidated_report':
        return <ConsolidatedReportModule onNavigate={onNavigate} />;
      case '26_blockchain_records':
        return <BlockchainRecordsModule onNavigate={onNavigate} />;
      case '27_admin_analytics':
        return <AdminAnalyticsModule onNavigate={onNavigate} />;
      default:
        return <HealthDashboardModule onNavigate={onNavigate} />;
    }
  };

  return (
    <AppShell activeModule={activeModule} onNavigate={onNavigate}>
      {/* Top Banner with Mode Selector & Current User Role indicator */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <p className="text-xs font-semibold text-slate-700">
            Active Workspace: <span className="text-blue-600 font-bold">27-Module Enterprise Suite</span>
          </p>
          <span className="text-xs text-slate-400">|</span>
          <span className="text-xs text-slate-500">
            Logged in as: <strong className="text-slate-800">{currentUser?.name || 'Authorized User'}</strong> ({currentUser?.role?.toUpperCase() || 'PATIENT'})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('classic')}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1.5"
            title="Switch to Classic Mobile Demo View"
          >
            📱 Switch to Classic Mobile View
          </button>
        </div>
      </div>

      {/* Render Current Module */}
      <div className="transition-all duration-200">
        {renderModule()}
      </div>
    </AppShell>
  );
};

export const UnifiedJeevaRakshaApp = () => {
  const [activeModule, setActiveModule] = useState('01_login');
  const [viewMode, setViewMode] = useState('suite'); // 'suite' | 'classic'

  // Scroll to top on navigation
  const handleNavigate = (moduleId) => {
    setActiveModule(moduleId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (viewMode === 'classic') {
    return (
      <div className="relative min-h-screen bg-slate-900">
        {/* Floating switcher back to 27 modules */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setViewMode('suite')}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-full shadow-2xl hover:scale-105 transition flex items-center gap-2 border border-white/20"
          >
            ✨ Switch to 27-Module Suite
          </button>
        </div>
        <ClassicJeevaRaksha />
      </div>
    );
  }

  return (
    <AuthProvider>
      <LanguageProvider>
        <HealthDataProvider>
          <ModuleRouter
            activeModule={activeModule}
            onNavigate={handleNavigate}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        </HealthDataProvider>
      </LanguageProvider>
    </AuthProvider>
  );
};

export default UnifiedJeevaRakshaApp;
