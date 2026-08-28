import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutGrid,
  UtensilsCrossed,
  Truck,
  Users,
  BarChart3,
  Wallet,
  Building2,
  X
} from 'lucide-react';

const navItems = [
  { name: 'Overview', icon: LayoutGrid, path: '/ngo/dashboard' },
  { name: 'Food', icon: UtensilsCrossed, path: '/ngo/food' },
  { name: 'Pickup', icon: Truck, path: '/ngo/operations' },
  { name: 'Beneficiaries', icon: Users, path: '/ngo/beneficiaries' },
  { name: 'Impact', icon: BarChart3, path: '/ngo/impact' },
  { name: 'Wallet', icon: Wallet, path: '/ngo/wallet' },
  { name: 'Organization', icon: Building2, path: '/ngo/organization' },
];

export default function NgoSidebar({ onClose }) {
  return (
    <div className="flex flex-col h-full bg-white text-gray-700 select-none">
      {/* Brand Header */}
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-start justify-between">
          <Link to="/ngo/dashboard" className="block group">
            <h1 className="text-[22px] font-black text-[#064e3b] leading-tight tracking-tight">
              Helping Hands
            </h1>
            <div className="text-[17px] font-extrabold text-[#064e3b] tracking-tight">
              NGO
            </div>
            <div className="text-xs font-semibold text-gray-500 mt-1">
              FoodRescue
            </div>
          </Link>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1.5">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 px-3.5 py-3 rounded-lg text-[15px] font-medium transition-all duration-150 ${isActive
                ? 'bg-[#dcfce7] text-[#15803d] font-semibold'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  size={20}
                  className={`shrink-0 transition-colors ${isActive ? 'text-[#15803d]' : 'text-gray-500 group-hover:text-gray-800'
                    }`}
                />
                <span className="flex-1">{item.name}</span>
                {isActive && (
                  <span className="w-1.5 h-7 bg-[#15803d] rounded-full absolute right-1 top-1/2 -translate-y-1/2" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Profile Footer */}
      <div className="p-4 border-t border-gray-100 mt-auto">
        <div className="flex items-center gap-3 px-1 py-1 rounded-xl hover:bg-gray-50 transition cursor-pointer">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Rahul Kumar"
              className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-xs"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">Rahul Kumar</p>
            <p className="text-xs text-gray-500 truncate">Helping Hands NGO</p>
          </div>
        </div>
      </div>
    </div>
  );
}
