import React, { createContext, useContext, useState } from 'react';
import { 
  usersData as initialUsers, 
  foodListingsData as initialFoodListings, 
  pickupsData as initialPickups, 
  claimsData as initialClaims, 
  ngosData as initialNgos, 
  volunteersData as initialVolunteers, 
  notificationsData as initialNotifications 
} from '../../../data/mockData';

const AdminDataContext = createContext();

export function AdminDataProvider({ children }) {
  const [users, setUsers] = useState(initialUsers);
  const [foodListings, setFoodListings] = useState(initialFoodListings);
  const [pickups, setPickups] = useState(initialPickups);
  const [claims, setClaims] = useState(initialClaims);
  const [ngos, setNgos] = useState(initialNgos);
  const [volunteers, setVolunteers] = useState(initialVolunteers);
  const [notifications, setNotifications] = useState(initialNotifications);
  
  // Toast Management
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 5000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const value = {
    users, setUsers,
    foodListings, setFoodListings,
    pickups, setPickups,
    claims, setClaims,
    ngos, setNgos,
    volunteers, setVolunteers,
    notifications, setNotifications,
    toasts, addToast, removeToast
  };

  return (
    <AdminDataContext.Provider value={value}>
      {children}
    </AdminDataContext.Provider>
  );
}

export function useAdminData() {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error('useAdminData must be used within an AdminDataProvider');
  }
  return context;
}
