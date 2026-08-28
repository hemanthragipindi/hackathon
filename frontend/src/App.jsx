import { Routes, Route, Navigate, Link } from 'react-router-dom';
import AdminLayout from './modules/admin/AdminLayout';
import AdminDashboard from './modules/admin/pages/Dashboard';
import Users from './modules/admin/pages/Users';
import FoodListings from './modules/admin/pages/FoodListings';
import Claims from './modules/admin/pages/Claims';
import Pickups from './modules/admin/pages/Pickups';
import NGOs from './modules/admin/pages/NGOs';
import Volunteers from './modules/admin/pages/Volunteers';
import Analytics from './modules/admin/pages/Analytics';

import DonorLayout from './modules/donor/DonorLayout';
import DonorDashboard from './modules/donor/pages/Dashboard';
import CreateDonation from './modules/donor/pages/CreateDonation';
import MyDonations from './modules/donor/pages/MyDonations';

import AdminNotifications from './modules/admin/pages/Notifications';
import AdminSettings from './modules/admin/pages/Settings';

import DonorNotifications from './modules/common/pages/Notifications';
import DonorSettings from './modules/common/pages/Settings';

// Temporary Landing Page
function Landing() {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center text-center p-6">
      <div className="w-16 h-16 rounded-2xl bg-green-600 text-white font-bold text-4xl flex items-center justify-center mb-6">F</div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to FoodBridge</h1>
      <p className="text-xl text-gray-600 max-w-2xl mb-8">Connecting surplus food with those in need. Choose a portal to continue.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
        <Link to="/admin" className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow font-semibold text-gray-800">Admin Portal</Link>
        <Link to="/donor" className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow font-semibold text-gray-800">Donor Portal</Link>
        <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 font-semibold text-gray-400 cursor-not-allowed">NGO Portal (WIP)</div>
        <div className="p-6 bg-gray-50 rounded-xl border border-gray-200 font-semibold text-gray-400 cursor-not-allowed">Volunteer Portal (WIP)</div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      
      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="food-listings" element={<FoodListings />} />
        <Route path="claims" element={<Claims />} />
        <Route path="pickups" element={<Pickups />} />
        <Route path="ngos" element={<NGOs />} />
        <Route path="volunteers" element={<Volunteers />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="notifications" element={<AdminNotifications />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Donor Routes */}
      <Route path="/donor" element={<DonorLayout />}>
        <Route index element={<Navigate to="/donor/dashboard" replace />} />
        <Route path="dashboard" element={<DonorDashboard />} />
        <Route path="create" element={<CreateDonation />} />
        <Route path="my-donations" element={<MyDonations />} />
        <Route path="notifications" element={<DonorNotifications />} />
        <Route path="settings" element={<DonorSettings />} />
      </Route>

      <Route path="*" element={<div className="flex h-screen items-center justify-center bg-gray-50 text-gray-500">404 Not Found</div>} />
    </Routes>
  );
}

export default App;
