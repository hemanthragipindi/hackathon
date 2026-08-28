import React from 'react';
import { useVolunteerData } from '../context/VolunteerDataContext';
import { Bell, Truck, CheckCircle2, Clock, CheckCheck, Package, Circle } from 'lucide-react';

export default function Notifications() {
  const { notifications, markAsRead, markAllAsRead } = useVolunteerData();

  const getIcon = (type) => {
    switch (type) {
      case 'new_pickup': return <Truck size={20} className="text-blue-500" />;
      case 'reminder': return <Clock size={20} className="text-orange-500" />;
      case 'success': return <CheckCircle2 size={20} className="text-emerald-500" />;
      default: return <Bell size={20} className="text-gray-500" />;
    }
  };

  const getBgColor = (type, read) => {
    if (read) return 'bg-white border-gray-100';
    switch (type) {
      case 'new_pickup': return 'bg-blue-50 border-blue-100';
      case 'reminder': return 'bg-orange-50 border-orange-100';
      case 'success': return 'bg-emerald-50 border-emerald-100';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6 pb-20 md:pb-6 animate-fadeIn">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            Notifications
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </h1>
          <p className="text-gray-500 mt-1">Updates on pickups and your schedule.</p>
        </div>
        {unreadCount > 0 && (
          <button 
            onClick={markAllAsRead}
            className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700 active:scale-95 transition-all"
          >
            <CheckCheck size={16} />
            <span className="hidden sm:inline">Mark all as read</span>
          </button>
        )}
      </div>

      {/* List */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <Bell size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-900 font-bold">You're all caught up!</p>
            <p className="text-gray-500 text-sm mt-1">We'll notify you when new pickups arrive.</p>
          </div>
        ) : (
          notifications.map(notif => (
            <div 
              key={notif.id}
              onClick={() => markAsRead(notif.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-4 ${getBgColor(notif.type, notif.read)} ${!notif.read ? 'shadow-sm hover:shadow-md' : 'shadow-none opacity-75'}`}
            >
              {/* Icon */}
              <div className={`mt-1 shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-sm border ${notif.read ? 'border-gray-100' : 'border-gray-200'}`}>
                {getIcon(notif.type)}
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <div className="flex justify-between items-start gap-2">
                  <p className={`text-sm md:text-base ${notif.read ? 'text-gray-700' : 'text-gray-900 font-bold'}`}>
                    {notif.message}
                  </p>
                  {!notif.read && (
                    <Circle size={10} className="text-blue-500 fill-blue-500 shrink-0 mt-1.5" />
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1.5 font-medium flex items-center gap-1">
                  {notif.time}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
