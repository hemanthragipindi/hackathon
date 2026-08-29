import React, { useState } from 'react';
import { 
  User, Bell, Settings as SettingsIcon, Shield, Lock, 
  Smartphone, MapPin, Mail, Upload, Save
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';

export default function Settings() {
  const { addToast } = useAdminData();
  const [activeTab, setActiveTab] = useState('profile');

  // Form States (Local State for editing)
  const [profileForm, setProfileForm] = useState({
    fullName: 'Admin User',
    email: 'admin@foodresque.org',
    phone: '+91 98765 43210'
  });

  const [notifForm, setNotifForm] = useState({
    newListings: true,
    newClaims: true,
    pickupUpdates: true,
    ngoVerifications: true,
    userActivity: false,
    systemAlerts: true
  });

  const [rescueForm, setRescueForm] = useState({
    minQuantity: '10 Meals',
    pickupWindow: '2 Hours',
    expiryWarning: '4 Hours',
    maxClaimTime: '24 Hours'
  });

  const [platformForm, setPlatformForm] = useState({
    platformName: 'FoodResque',
    supportEmail: 'support@foodresque.org',
    defaultLocation: 'Mumbai, India',
    timezone: 'Asia/Kolkata'
  });

  const handleSave = (section) => {
    // In a real app, you would dispatch to AdminDataContext or backend here.
    addToast(`${section} settings updated successfully`, 'success');
  };

  const tabs = [
    { id: 'profile', label: 'Admin Profile', icon: User },
    { id: 'notifications', label: 'Notification Preferences', icon: Bell },
    { id: 'rescue', label: 'Food Rescue Config', icon: SettingsIcon },
    { id: 'platform', label: 'Platform Settings', icon: MapPin },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-500 mt-1">Manage your account and platform configurations.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors border-l-2 ${
                    isActive 
                      ? 'border-green-600 bg-green-50 text-green-700' 
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon size={18} className={isActive ? 'text-green-600' : 'text-gray-400'} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          
          {/* 1. Admin Profile */}
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-2xl">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Admin Profile</h3>
              
              <div className="flex items-center gap-6">
                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 overflow-hidden border border-gray-300">
                  <User size={40} />
                </div>
                <div>
                  <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    <Upload size={14} /> Change Photo
                  </button>
                  <p className="text-xs text-gray-500 mt-2">JPG, GIF or PNG. Max size of 800K</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" value={profileForm.fullName} onChange={(e) => setProfileForm({...profileForm, fullName: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Role</label>
                  <input type="text" value="Administrator" disabled className="w-full px-3 py-2 border border-gray-200 bg-gray-50 rounded-lg text-gray-500 cursor-not-allowed" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" value={profileForm.email} onChange={(e) => setProfileForm({...profileForm, email: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <input type="text" value={profileForm.phone} onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                <button onClick={() => handleSave('Profile')} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700">
                  <Save size={16} /> Save Changes
                </button>
              </div>
            </div>
          )}

          {/* 2. Notification Preferences */}
          {activeTab === 'notifications' && (
            <div className="space-y-6 max-w-2xl">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Notification Preferences</h3>
              
              <div className="space-y-4">
                {[
                  { id: 'newListings', label: 'New Food Listings', desc: 'Alert when a donor creates a new listing' },
                  { id: 'newClaims', label: 'New Claims', desc: 'Alert when an NGO claims food' },
                  { id: 'pickupUpdates', label: 'Pickup Updates', desc: 'Status changes for active pickups' },
                  { id: 'ngoVerifications', label: 'NGO Verification Requests', desc: 'When a new NGO submits documents' },
                  { id: 'userActivity', label: 'User Activity', desc: 'When new users register or delete accounts' },
                  { id: 'systemAlerts', label: 'System Alerts', desc: 'Critical platform performance warnings' }
                ].map(pref => (
                  <div key={pref.id} className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{pref.label}</p>
                      <p className="text-xs text-gray-500">{pref.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer mt-1">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notifForm[pref.id]}
                        onChange={(e) => setNotifForm({...notifForm, [pref.id]: e.target.checked})}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100 mt-8">
                <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                <button onClick={() => handleSave('Notification Preferences')} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700">
                  <Save size={16} /> Save Changes
                </button>
              </div>
            </div>
          )}

          {/* 3. Food Rescue Configuration */}
          {activeTab === 'rescue' && (
            <div className="space-y-6 max-w-2xl">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Food Rescue Configuration</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Minimum Donation Quantity</label>
                  <input type="text" value={rescueForm.minQuantity} onChange={(e) => setRescueForm({...rescueForm, minQuantity: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
                  <p className="text-xs text-gray-500">Threshold required to dispatch volunteers.</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Default Pickup Window</label>
                  <input type="text" value={rescueForm.pickupWindow} onChange={(e) => setRescueForm({...rescueForm, pickupWindow: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
                  <p className="text-xs text-gray-500">Expected time to complete logistics.</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Expiry Warning Threshold</label>
                  <input type="text" value={rescueForm.expiryWarning} onChange={(e) => setRescueForm({...rescueForm, expiryWarning: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
                  <p className="text-xs text-gray-500">When to trigger expiry alerts for listings.</p>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Maximum Claim Time</label>
                  <input type="text" value={rescueForm.maxClaimTime} onChange={(e) => setRescueForm({...rescueForm, maxClaimTime: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
                  <p className="text-xs text-gray-500">Time allowed for NGO to claim food.</p>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                <button onClick={() => handleSave('Food Rescue Settings')} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700">
                  <Save size={16} /> Save Changes
                </button>
              </div>
            </div>
          )}

          {/* 4. Platform Settings */}
          {activeTab === 'platform' && (
            <div className="space-y-6 max-w-2xl">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Platform Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Platform Name</label>
                  <input type="text" value={platformForm.platformName} onChange={(e) => setPlatformForm({...platformForm, platformName: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Support Email</label>
                  <input type="email" value={platformForm.supportEmail} onChange={(e) => setPlatformForm({...platformForm, supportEmail: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Default Location</label>
                  <input type="text" value={platformForm.defaultLocation} onChange={(e) => setPlatformForm({...platformForm, defaultLocation: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Timezone</label>
                  <select value={platformForm.timezone} onChange={(e) => setPlatformForm({...platformForm, timezone: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 bg-white">
                    <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">America/New_York (EST)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                <button onClick={() => handleSave('Platform Settings')} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700">
                  <Save size={16} /> Save Changes
                </button>
              </div>
            </div>
          )}

          {/* 5. Security */}
          {activeTab === 'security' && (
            <div className="space-y-6 max-w-2xl">
              <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">Security</h3>
              
              <div className="space-y-6">
                
                {/* Password */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 flex items-center gap-2 mb-3"><Lock size={16} /> Change Password</h4>
                  <div className="space-y-3">
                    <input type="password" placeholder="Current Password" className="w-full max-w-sm px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-sm" />
                    <input type="password" placeholder="New Password" className="w-full max-w-sm px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-sm" />
                    <input type="password" placeholder="Confirm New Password" className="w-full max-w-sm px-3 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 text-sm" />
                    <button onClick={() => handleSave('Password')} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 mt-1">Update Password</button>
                  </div>
                </div>
                
                <hr className="border-gray-100" />

                {/* 2FA */}
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Smartphone size={20} /></div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                      <p className="text-xs text-gray-500 mt-1 max-w-md">Add an extra layer of security to your account by requiring a code from your authenticator app.</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 border border-green-600 text-green-700 bg-green-50 rounded-md text-sm font-medium hover:bg-green-100 transition-colors">Enable 2FA</button>
                </div>

                <hr className="border-gray-100" />

                {/* Active Sessions */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 flex items-center gap-2 mb-3"><Shield size={16} /> Active Sessions</h4>
                  <div className="border border-gray-200 rounded-lg divide-y divide-gray-100">
                    <div className="p-3 flex items-center justify-between bg-gray-50">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Windows • Chrome</p>
                        <p className="text-xs text-gray-500">Mumbai, India (Current session)</p>
                      </div>
                      <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">Active Now</span>
                    </div>
                    <div className="p-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">MacBook Pro • Safari</p>
                        <p className="text-xs text-gray-500">Delhi, India (Last active: 2 hours ago)</p>
                      </div>
                      <button onClick={() => addToast('Session revoked', 'success')} className="text-sm text-red-600 hover:text-red-700 font-medium">Revoke</button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
