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
import AdminNotifications from './modules/admin/pages/Notifications';
import AdminSettings from './modules/admin/pages/Settings';

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

import NgoLayout from './modules/ngo/NgoLayout';
import NgoDashboard from './modules/ngo/pages/Dashboard';
import NgoFood from './modules/ngo/pages/Food';
import NgoOperations from './modules/ngo/pages/Operations';
import NgoBeneficiaries from './modules/ngo/pages/Beneficiaries';
import NgoImpact from './modules/ngo/pages/Impact';
import NgoWallet from './modules/ngo/pages/Wallet';
import NgoOrganization from './modules/ngo/pages/Organization';

import CommonNotifications from './modules/common/pages/Notifications';
import CommonSettings from './modules/common/pages/Settings';

// Landing Page
function Landing() {
  return (
<<<<<<< HEAD
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
=======
    <div className="min-h-screen bg-green-50/60 flex flex-col items-center justify-center text-center p-6">
      <div className="w-16 h-16 rounded-2xl bg-[#064e3b] text-white font-bold text-4xl flex items-center justify-center mb-6 shadow-md">
        F
      </div>
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">Welcome to FoodRescue</h1>
      <p className="text-lg text-gray-600 max-w-2xl mb-8 font-medium">
        Connecting surplus food with community shelters and those in need. Choose a portal to continue.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
        <Link 
          to="/ngo/dashboard" 
          className="p-6 bg-white rounded-2xl border-2 border-emerald-500 shadow-md hover:shadow-lg transition-all font-bold text-gray-900 flex flex-col items-center gap-2 group"
        >
          <span className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black group-hover:scale-110 transition">
            NGO
          </span>
          <span>NGO Portal</span>
          <span className="text-xs font-normal text-emerald-700">Helping Hands NGO</span>
        </Link>
        <Link 
          to="/admin" 
          className="p-6 bg-white rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition font-semibold text-gray-800 flex flex-col items-center gap-2"
        >
          <span className="w-10 h-10 rounded-xl bg-gray-100 text-gray-700 flex items-center justify-center font-black">
            AD
          </span>
          <span>Admin Portal</span>
        </Link>
        <Link 
          to="/donor" 
          className="p-6 bg-white rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition font-semibold text-gray-800 flex flex-col items-center gap-2"
        >
          <span className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center font-black">
            DN
          </span>
          <span>Donor Portal</span>
        </Link>
        <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 font-semibold text-gray-400 cursor-not-allowed flex flex-col items-center gap-2">
          <span className="w-10 h-10 rounded-xl bg-gray-200 text-gray-400 flex items-center justify-center font-black">
            VL
          </span>
>>>>>>> b7be43e9d6c8673f829e312d809262b55f54c917
          <span>Volunteer Portal (WIP)</span>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
<<<<<<< HEAD
      <Route path="/" element={<Navigate to="/donor" replace />} />
=======
      <Route path="/" element={<Landing />} />

      {/* NGO Routes */}
      <Route path="/ngo" element={<NgoLayout />}>
        <Route index element={<Navigate to="/ngo/dashboard" replace />} />
        <Route path="dashboard" element={<NgoDashboard />} />
        <Route path="food" element={<NgoFood />} />
        <Route path="operations" element={<NgoOperations />} />
        <Route path="beneficiaries" element={<NgoBeneficiaries />} />
        <Route path="impact" element={<NgoImpact />} />
        <Route path="wallet" element={<NgoWallet />} />
        <Route path="organization" element={<NgoOrganization />} />
        <Route path="notifications" element={<CommonNotifications />} />
        <Route path="settings" element={<CommonSettings />} />
      </Route>
>>>>>>> b7be43e9d6c8673f829e312d809262b55f54c917
      
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
        <Route path="notifications" element={<AdminNotifications />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

<<<<<<< HEAD
      <Route path="*" element={<div className="flex h-screen items-center justify-center bg-slate-50 text-slate-500 font-bold">404 Not Found</div>} />
=======
      {/* Donor Routes */}
      <Route path="/donor" element={<DonorLayout />}>
        <Route index element={<Navigate to="/donor/dashboard" replace />} />
        <Route path="dashboard" element={<DonorDashboard />} />
        <Route path="create" element={<CreateDonation />} />
        <Route path="my-donations" element={<MyDonations />} />
        <Route path="notifications" element={<CommonNotifications />} />
        <Route path="settings" element={<CommonSettings />} />
      </Route>

      <Route path="*" element={<div className="flex h-screen items-center justify-center bg-gray-50 text-gray-500">404 Not Found</div>} />
>>>>>>> b7be43e9d6c8673f829e312d809262b55f54c917
    </Routes>
  );
}

export default App;
