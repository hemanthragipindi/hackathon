import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Utensils, 
  FileText, 
  Truck, 
  Building2, 
  Bike, 
  BarChart2, 
  Bell, 
  Settings,
  LogOut,
  X
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
  { name: 'Users', icon: Users, path: '/admin/users' },
  { name: 'Food Listings', icon: Utensils, path: '/admin/food-listings' },
  { name: 'Claims', icon: FileText, path: '/admin/claims' },
  { name: 'Pickups', icon: Truck, path: '/admin/pickups' },
  { name: 'NGOs', icon: Building2, path: '/admin/ngos' },
  { name: 'Volunteers', icon: Bike, path: '/admin/volunteers' },
  { name: 'Analytics', icon: BarChart2, path: '/admin/analytics' },
  { name: 'Notifications', icon: Bell, path: '/admin/notifications' },
  { name: 'Settings', icon: Settings, path: '/admin/settings' },
];

export default function Sidebar({ onClose }) {
  return (
    <div className="flex flex-col h-full bg-white text-gray-700">
      <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-600 text-white font-bold text-xl">
            F
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">FoodResque</span>
        </div>
        <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-600">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium transition-colors ${
                isActive 
                  ? 'bg-green-50 text-green-700' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <item.icon size={18} className="shrink-0" />
            {item.name}
          </NavLink>
        ))}
      </div>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">Admin User</p>
            <p className="text-xs text-gray-500 truncate">Super Admin</p>
          </div>
        </div>
        <button className="flex items-center gap-3 w-full px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-700 transition-colors">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
}
