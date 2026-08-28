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
import LiveRescues from './modules/donor/pages/LiveRescues';
import PickupJourney from './modules/donor/pages/PickupJourney';
import MyImpact from './modules/donor/pages/MyImpact';
import Achievements from './modules/donor/pages/Achievements';
import CommunityPartners from './modules/donor/pages/CommunityPartners';
import DonorSettings from './modules/donor/pages/Settings';
import HelpSupport from './modules/donor/pages/HelpSupport';
import MyDonations from './modules/donor/pages/MyDonations';

import Notifications from './modules/common/pages/Notifications';
import Settings from './modules/common/pages/Settings';

// Temporary Landing Page
function Landing() {
  return (
    <div className="min-h-screen bg-emerald-50/50 flex flex-col items-center justify-center text-center p-6 font-sans">
      <div className="w-16 h-16 rounded-3xl bg-emerald-600 text-white font-black text-3xl flex items-center justify-center mb-6 shadow-md shadow-emerald-600/20">
        F
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Welcome to FoodBridge</h1>
      <p className="text-lg text-slate-600 max-w-xl mb-8 leading-relaxed">
        Connecting surplus food with those in need. Choose a portal to continue.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
        <Link to="/donor" className="p-6 bg-white rounded-2xl border border-emerald-200 shadow-sm hover:shadow-md hover:border-emerald-400 transition-all font-bold text-emerald-900 flex flex-col items-center gap-2">
          <span className="text-2xl">🥗</span>
          <span>Donor Portal</span>
        </Link>
        <Link to="/admin" className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-400 transition-all font-bold text-slate-800 flex flex-col items-center gap-2">
          <span className="text-2xl">⚡</span>
          <span>Admin Portal</span>
        </Link>
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 font-semibold text-slate-400 cursor-not-allowed flex flex-col items-center gap-2">
          <span className="text-2xl opacity-50">🤝</span>
          <span>NGO Portal (WIP)</span>
        </div>
        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 font-semibold text-slate-400 cursor-not-allowed flex flex-col items-center gap-2">
          <span className="text-2xl opacity-50">🚚</span>
          <span>Volunteer Portal (WIP)</span>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/donor" replace />} />
      
      {/* Donor Routes */}
      <Route path="/donor" element={<DonorLayout />}>
        <Route index element={<Navigate to="/donor/dashboard" replace />} />
        <Route path="dashboard" element={<DonorDashboard />} />
        <Route path="create" element={<CreateDonation />} />
        <Route path="live-rescues" element={<LiveRescues />} />
        <Route path="pickup-journey" element={<PickupJourney />} />
        <Route path="my-impact" element={<MyImpact />} />
        <Route path="achievements" element={<Achievements />} />
        <Route path="community-partners" element={<CommunityPartners />} />
        <Route path="settings" element={<DonorSettings />} />
        <Route path="help" element={<HelpSupport />} />
        <Route path="my-donations" element={<MyDonations />} />
        <Route path="donation-history" element={<MyDonations />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>

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
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<div className="flex h-screen items-center justify-center bg-slate-50 text-slate-500 font-bold">404 Not Found</div>} />
    </Routes>
  );
}

export default App;
