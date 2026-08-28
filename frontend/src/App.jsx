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

import NgoLayout from './modules/ngo/NgoLayout';
import NgoDashboard from './modules/ngo/pages/Dashboard';
import NgoFood from './modules/ngo/pages/Food';
import NgoOperations from './modules/ngo/pages/Operations';
import NgoBeneficiaries from './modules/ngo/pages/Beneficiaries';
import NgoImpact from './modules/ngo/pages/Impact';
import NgoWallet from './modules/ngo/pages/Wallet';
import NgoOrganization from './modules/ngo/pages/Organization';

import Notifications from './modules/common/pages/Notifications';
import Settings from './modules/common/pages/Settings';

// Landing Page
function Landing() {
  return (
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
          <span>Volunteer Portal (WIP)</span>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
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
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<Settings />} />
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

      {/* Donor Routes */}
      <Route path="/donor" element={<DonorLayout />}>
        <Route index element={<Navigate to="/donor/dashboard" replace />} />
        <Route path="dashboard" element={<DonorDashboard />} />
        <Route path="create" element={<CreateDonation />} />
        <Route path="my-donations" element={<MyDonations />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<div className="flex h-screen items-center justify-center bg-gray-50 text-gray-500">404 Not Found</div>} />
    </Routes>
  );
}

export default App;
