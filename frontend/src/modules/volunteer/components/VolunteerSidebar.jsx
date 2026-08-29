import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Package, 
  Truck, 
  Clock, 
  Bell, 
  Settings,
  Trophy
} from 'lucide-react';
import { useVolunteerData } from '../context/VolunteerDataContext';

export default function VolunteerSidebar() {
  const { profile, availabilityStatus, setAvailabilityStatus, notifications } = useVolunteerData();
  const unreadCount = notifications ? notifications.filter(n => !n.read).length : 0;

  const navItems = [
    { name: 'Dashboard', path: '/volunteer/dashboard', icon: Home },
    { name: 'Available Pickups', path: '/volunteer/pickups', icon: Package },
    { name: 'Active Pickup', path: '/volunteer/active-pickup', icon: Truck },
    { name: 'Pickup History', path: '/volunteer/history', icon: Clock },
    { name: 'Reputation', path: '/volunteer/reputation', icon: Trophy },
    { name: 'Notifications', path: '/volunteer/notifications', icon: Bell },
    { name: 'Settings', path: '/volunteer/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen hidden md:flex flex-col fixed top-0 left-0 z-40">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">FoodResque</h2>
        <p className="text-xs font-semibold text-emerald-600 mt-1 uppercase tracking-wider">Volunteer Portal</p>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-colors ${
                isActive
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <div className="flex items-center gap-3">
              <item.icon size={20} className="shrink-0" />
              <span>{item.name}</span>
            </div>
            {item.name === 'Notifications' && unreadCount > 0 && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0">
              {profile.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-gray-900 truncate">{profile.name}</p>
              <p className="text-xs text-gray-500 truncate">Volunteer</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs font-semibold bg-white p-2 rounded-lg border border-gray-200 cursor-pointer" onClick={() => setAvailabilityStatus(availabilityStatus === 'Available' ? 'Busy' : 'Available')}>
            <span className="flex items-center gap-1.5 text-gray-700">
              <span className={`w-2 h-2 rounded-full ${availabilityStatus === 'Available' ? 'bg-green-500' : 'bg-orange-500'}`}></span>
              {availabilityStatus}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
