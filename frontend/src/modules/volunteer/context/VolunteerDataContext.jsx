import React, { createContext, useContext, useState } from 'react';

const VolunteerDataContext = createContext();

export function VolunteerDataProvider({ children }) {
  const [profile, setProfile] = useState({
    name: 'Rahul Kumar',
    id: 'VOL-1024',
    phone: '********90',
    email: 'rahul@email.com'
  });

  // 'Available', 'Busy', 'Offline'
  const [availabilityStatus, setAvailabilityStatus] = useState('Available'); 

  const [preferences, setPreferences] = useState({
    maxDistance: 5,
    notifications: {
      newPickupAlerts: true,
      pickupReminders: true,
      deliveryUpdates: true
    }
  });
  
  const [availablePickups, setAvailablePickups] = useState([
    {
      id: 'PK105',
      food: '50 Meals',
      donor: 'Green Leaf Restaurant',
      ngo: 'Helping Hands NGO',
      distance: '2.4 km',
      timeWindow: '5:00 PM - 6:00 PM'
    },
    {
      id: 'PK106',
      food: '30 Meals',
      donor: 'Fresh Bites Restaurant',
      ngo: 'Hope Foundation',
      distance: '3.1 km',
      timeWindow: '6:30 PM - 7:30 PM'
    }
  ]);

  // null if no active pickup, otherwise object
  const [activePickup, setActivePickup] = useState(null); 
  
  const [pickupHistory, setPickupHistory] = useState([
    {
      id: 'PK102',
      donor: 'Green Leaf Restaurant',
      ngo: 'Helping Hands NGO',
      food: '50 Meals',
      date: 'Aug 28, 2026',
      status: 'Completed'
    },
    {
      id: 'PK101',
      donor: 'Fresh Bites',
      ngo: 'Hope Foundation',
      food: '30 Meals',
      date: 'Aug 27, 2026',
      status: 'Completed'
    }
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'new_pickup', message: 'A 40-meal donation is available 2.1 km from your location.', time: '5 min ago', read: false },
    { id: 2, type: 'reminder', message: 'Your pickup at Green Leaf Restaurant starts in 30 minutes.', time: '28 min ago', read: true },
    { id: 3, type: 'success', message: 'PK102 has been successfully delivered.', time: '1 hour ago', read: true },
  ]);

  const addNotification = (type, message) => {
    const newNotif = {
      id: Date.now(),
      type,
      message,
      time: 'Just now',
      read: false
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const acceptPickup = (pickupId) => {
    const pickup = availablePickups.find(p => p.id === pickupId);
    if(pickup) {
       setActivePickup({ ...pickup, status: 'accepted' });
       setAvailablePickups(prev => prev.filter(p => p.id !== pickupId));
       addNotification('reminder', `You accepted pickup #${pickup.id}. Please head to ${pickup.donor}.`);
    }
  };

  const updatePickupStatus = (newStatus) => {
    if(activePickup) {
       setActivePickup({ ...activePickup, status: newStatus });
    }
  };

  const completeActivePickup = () => {
    if(activePickup) {
       const completedPickup = {
         ...activePickup,
         date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
         status: 'Completed'
       };
       setPickupHistory([completedPickup, ...pickupHistory]);
       addNotification('success', `${activePickup.food} delivered successfully to ${activePickup.ngo}.`);
       setActivePickup(null);
    }
  };

  return (
    <VolunteerDataContext.Provider value={{
      profile,
      availabilityStatus,
      setAvailabilityStatus,
      preferences,
      setPreferences,
      availablePickups,
      activePickup,
      pickupHistory,
      notifications,
      addNotification,
      markAsRead,
      markAllAsRead,
      acceptPickup,
      updatePickupStatus,
      completeActivePickup
    }}>
      {children}
    </VolunteerDataContext.Provider>
  );
}

export const useVolunteerData = () => useContext(VolunteerDataContext);
