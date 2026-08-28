import React from 'react';
import { Search, Bell, HelpCircle, Menu } from 'lucide-react';

export default function NgoNavbar({ onMenuClick, searchValue, onSearchChange }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-4 md:px-8 bg-white border-b border-gray-200">
      {/* Left side: Mobile menu toggle + Search bar */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <div className="relative w-full">
          <Search 
            size={18} 
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" 
          />
          <input
            type="text"
            placeholder="Search food, pickups, volunteers..."
            value={searchValue || ''}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600 transition"
          />
        </div>
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center gap-2 md:gap-3 ml-4">
        <button 
          className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition"
          title="Notifications"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white"></span>
        </button>

        <button 
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition"
          title="Help & Support"
          aria-label="Help & Support"
        >
          <HelpCircle size={20} />
        </button>
      </div>
    </header>
  );
}
