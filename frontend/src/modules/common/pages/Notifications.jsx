import React, { useState } from 'react';
import { Check, Trash2 } from 'lucide-react';
import { notificationsData as initialData } from '../../../data/mockData';

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialData);

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
          <p className="text-gray-500 mt-1">Review system alerts and activity.</p>
        </div>
        <button 
          onClick={markAllAsRead}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm"
        >
          <Check size={16} />
          Mark All as Read
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden divide-y divide-gray-100">
        {notifications.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No notifications found.</div>
        ) : (
          notifications.map(notif => (
            <div key={notif.id} className={`p-4 flex gap-4 transition-colors hover:bg-gray-50 ${!notif.read ? 'bg-green-50/30' : ''}`}>
              <div className={`w-2.5 h-2.5 mt-2 rounded-full shrink-0 ${!notif.read ? 'bg-green-500' : 'bg-transparent'}`} />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className={`text-sm font-semibold ${!notif.read ? 'text-gray-900' : 'text-gray-700'}`}>{notif.title}</h4>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4">{notif.timestamp}</span>
                </div>
                <p className={`text-sm mt-1 ${!notif.read ? 'text-gray-800' : 'text-gray-500'}`}>{notif.description}</p>
                <div className="mt-3 flex gap-3">
                  {!notif.read && (
                    <button onClick={() => markAsRead(notif.id)} className="text-xs font-medium text-green-600 hover:text-green-700">
                      Mark as read
                    </button>
                  )}
                  <button onClick={() => deleteNotification(notif.id)} className="text-xs font-medium text-red-500 hover:text-red-700 flex items-center gap-1">
                    <Trash2 size={12} /> Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
