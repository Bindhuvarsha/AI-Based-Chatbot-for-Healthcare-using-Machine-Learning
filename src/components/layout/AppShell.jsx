import React, { useState } from 'react';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import EmergencySosModal from '../common/EmergencySosModal';

export const AppShell = ({ activeModule, onNavigate, children }) => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isSosModalOpen, setIsSosModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased">
      {/* Top Header Shell */}
      <TopBar
        activeModule={activeModule}
        onNavigate={onNavigate}
        onTriggerSos={() => setIsSosModalOpen(true)}
      />

      {/* Main Container */}
      <div className="flex-1 flex w-full max-w-[1600px] mx-auto">
        {/* Left Sidebar */}
        <Sidebar
          activeModule={activeModule}
          onNavigate={onNavigate}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-12 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        activeModule={activeModule}
        onNavigate={onNavigate}
        onToggleSidebar={() => setIsMobileSidebarOpen(prev => !prev)}
      />

      {/* Safe Emergency SOS Modal */}
      <EmergencySosModal
        isOpen={isSosModalOpen}
        onClose={() => setIsSosModalOpen(false)}
      />
    </div>
  );
};
export default AppShell;
