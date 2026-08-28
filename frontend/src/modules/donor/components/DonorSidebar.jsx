import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutGrid, 
  PlusCircle, 
  Truck, 
  Route as RouteIcon, 
  TrendingUp, 
  Trophy, 
  Settings,
  HelpCircle,
  X
} from 'lucide-react';

const mainNavItems = [
  { name: 'Overview', icon: LayoutGrid, path: '/donor/dashboard' },
  { name: 'Share Surplus', icon: PlusCircle, path: '/donor/create' },
  { name: 'Live Rescues', icon: Truck, path: '/donor/live-rescues' },
  { name: 'Pickup Journey', icon: RouteIcon, path: '/donor/pickup-journey' },
  { name: 'My Impact', icon: TrendingUp, path: '/donor/my-impact' },
  { name: 'Achievements', icon: Trophy, path: '/donor/achievements' },
];

const secondaryNavItems = [
  { name: 'Settings', icon: Settings, path: '/donor/settings' },
  { name: 'Help & Support', icon: HelpCircle, path: '/donor/help' },
];

export default function DonorSidebar({ onClose }) {
  return (
    <aside className="flex flex-col h-full bg-white text-slate-700 border-r border-slate-100 select-none">
      {/* Brand Header */}
      <div className="flex items-center justify-between h-20 px-6 pt-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100/80 flex flex-col items-center justify-center p-1.5 shadow-xs">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-emerald-600 fill-none stroke-current stroke-[2.2] stroke-linecap-round stroke-linejoin-round">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 14a4 4 0 1 1 4-4 4 4 0 0 1-4 4z" />
              <path d="M12 6v2m0 8v2M6 12H4m16 0h-2" />
            </svg>
            <span className="text-[6.5px] font-bold text-emerald-800 tracking-tighter leading-none mt-0.5">GoodFood</span>
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">GoodFood</span>
        </div>
        <button 
          onClick={onClose} 
          className="lg:hidden text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
          aria-label="Close Sidebar"
        >
          <X size={20} />
        </button>
      </div>

      {/* Main Navigation Menu */}
      <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5">
        {mainNavItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3.5 px-4 py-3 rounded-2xl text-[14.5px] font-medium transition-all duration-200 ${
                isActive 
                  ? 'bg-[#059669] text-white font-bold shadow-xs' 
                  : 'text-slate-600 hover:bg-slate-50/90 hover:text-slate-900'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon 
                  size={19} 
                  className={`shrink-0 transition-colors ${
                    isActive ? 'text-white stroke-[2.4]' : 'text-slate-500 stroke-[1.8]'
                  }`} 
                />
                <span className="truncate">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Secondary Bottom Navigation + Profile */}
      <div className="p-4 space-y-1 border-t border-slate-100/80">
        {secondaryNavItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13.5px] font-medium transition-colors ${
                isActive 
                  ? 'text-emerald-700 bg-emerald-50 font-bold' 
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            <item.icon size={18} className="text-slate-500 stroke-[1.8]" />
            <span>{item.name}</span>
          </NavLink>
        ))}

        {/* Profile Card */}
        <div className="pt-3 mt-2">
          <div className="flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-[#dcfce7] text-[#0f766e] font-bold text-sm flex items-center justify-center shrink-0 border border-emerald-100 shadow-xs">
              SG
            </div>
            <div className="min-w-0">
              <p className="text-[13.5px] font-bold text-slate-900 truncate leading-snug">Spice Garden</p>
              <p className="text-[11.5px] text-slate-400 truncate leading-tight font-medium">Restaurant Profile</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
