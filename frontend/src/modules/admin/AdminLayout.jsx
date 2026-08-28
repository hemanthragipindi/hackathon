import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { AdminDataProvider } from './context/AdminDataContext';
import ToastContainer from './components/ToastContainer';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 bg-gray-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white border-r border-gray-200 transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        <Navbar 
          onMenuClick={() => setSidebarOpen(true)} 
          user={{ name: "Admin User", initials: "AD", role: "Admin" }}
        />
        <main className="flex-1 overflow-y-auto bg-[#f8fafc] p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            <AdminDataProvider>
              <Outlet />
              <ToastContainer />
            </AdminDataProvider>
          </div>
        </main>
      </div>
    </div>
  );
}
