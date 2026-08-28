import React from 'react';
import { Menu, Search, Bell, ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function Navbar({ onMenuClick, user }) {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);
  const currentPage = pathParts[pathParts.length - 1] || 'dashboard';
  const title = currentPage.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <header className="flex items-center justify-between h-16 px-4 md:px-6 bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-gray-500 rounded-md hover:bg-gray-100 lg:hidden"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-gray-900 hidden sm:block">{title}</h1>
      </div>

      <div className="flex items-center gap-4 flex-1 justify-end">
        <div className="max-w-md w-full hidden md:block relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search users, listings, pickups..." 
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-green-500 focus:border-green-500 sm:text-sm transition-colors"
          />
        </div>

        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        <div className="flex items-center gap-2 cursor-pointer p-1.5 hover:bg-gray-50 rounded-md transition-colors">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold text-sm">
            {user?.initials || 'U'}
          </div>
          <ChevronDown size={16} className="text-gray-500 hidden sm:block" />
        </div>
      </div>
    </header>
  );
}
