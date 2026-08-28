import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Package, 
  Truck, 
  Clock, 
  Bell 
} from 'lucide-react';
import { useVolunteerData } from '../context/VolunteerDataContext';

export default function VolunteerBottomNav() {
  const { notifications } = useVolunteerData();
  const unreadCount = notifications ? notifications.filter(n => !n.read).length : 0;

  const navItems = [
    { name: 'Home', path: '/volunteer/dashboard', icon: Home },
    { name: 'Available', path: '/volunteer/pickups', icon: Package },
    { name: 'Active', path: '/volunteer/active-pickup', icon: Truck },
    { name: 'History', path: '/volunteer/history', icon: Clock },
    { name: 'Alerts', path: '/volunteer/notifications', icon: Bell },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 px-2 pb-safe">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? 'text-emerald-700' : 'text-gray-500 hover:text-gray-900'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <item.icon size={22} className={isActive ? "fill-emerald-100" : ""} />
                  {item.name === 'Alerts' && unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-semibold">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
