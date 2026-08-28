import React from 'react';
import { Outlet } from 'react-router-dom';
import VolunteerSidebar from './components/VolunteerSidebar';
import VolunteerBottomNav from './components/VolunteerBottomNav';
import { VolunteerDataProvider } from './context/VolunteerDataContext';

export default function VolunteerLayout() {
  return (
    <VolunteerDataProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans">
        {/* Desktop Sidebar */}
        <VolunteerSidebar />
        
        {/* Main Content Area */}
        <main className="flex-1 md:ml-64 pb-16 md:pb-0 overflow-y-auto">
          <div className="max-w-3xl mx-auto p-4 md:p-8">
            <Outlet />
          </div>
        </main>
        
        {/* Mobile Bottom Navigation */}
        <VolunteerBottomNav />
      </div>
    </VolunteerDataProvider>
  );
}
