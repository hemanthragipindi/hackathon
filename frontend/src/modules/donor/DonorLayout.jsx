import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DonorSidebar from './components/DonorSidebar';
import { Menu } from 'lucide-react';

export default function DonorLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc] font-sans antialiased text-slate-800">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white border-r border-slate-100 transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <DonorSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        {/* Mobile Header Bar (Only visible on small screens for drawer access) */}
        <div className="lg:hidden flex items-center justify-between h-16 px-4 bg-white border-b border-slate-100 z-10 shrink-0">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 text-slate-600 rounded-xl hover:bg-slate-100"
            aria-label="Open navigation menu"
          >
            <Menu size={22} />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center p-1">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-emerald-600 fill-none stroke-current stroke-[2]">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 14a4 4 0 1 1 4-4 4 4 0 0 1-4 4z" />
              </svg>
            </div>
            <span className="font-bold text-slate-900 text-base">GoodFood</span>
          </div>

          <div className="w-8 h-8 rounded-full bg-[#064e3b] text-white font-bold text-xs flex items-center justify-center">
            SG
          </div>
        </div>

        {/* Scrollable Main Canvas */}
        <main className="flex-1 overflow-y-auto bg-[#f8fafc] px-4 sm:px-8 lg:px-10 py-6 sm:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
