import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NgoSidebar from './components/NgoSidebar';
import NgoNavbar from './components/NgoNavbar';

export default function NgoLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <NgoSidebar onClose={() => setSidebarOpen(false)} />
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 w-full min-w-0 overflow-hidden">
        <NgoNavbar 
          onMenuClick={() => setSidebarOpen(true)}
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
        />
        
        <main className="flex-1 overflow-y-auto bg-[#fbfcfd] p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet context={{ searchTerm }} />
          </div>
        </main>
      </div>
    </div>
  );
}
