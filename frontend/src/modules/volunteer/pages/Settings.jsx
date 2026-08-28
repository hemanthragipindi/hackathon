import React from 'react';
import { useVolunteerData } from '../context/VolunteerDataContext';
import { User, Phone, Mail, MapPin, Bell, LogOut, ChevronRight, Lock } from 'lucide-react';

export default function Settings() {
  const { 
    profile, 
    availabilityStatus, 
    setAvailabilityStatus,
    preferences,
    setPreferences 
  } = useVolunteerData();

  const handleDistanceChange = (dist) => {
    setPreferences(prev => ({ ...prev, maxDistance: dist }));
  };

  const toggleNotification = (key) => {
    setPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your profile and preferences.</p>
      </div>

      {/* 1. Profile Section */}
      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Profile</h2>
          <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">Edit Profile</button>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xl flex items-center justify-center shrink-0">
              {profile.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{profile.name}</h3>
              <p className="text-sm text-gray-500 font-medium">Volunteer</p>
            </div>
          </div>
          
          <div className="space-y-3 pt-3 border-t border-gray-50">
            <div className="flex items-center gap-3 text-gray-700">
              <User size={18} className="text-gray-400" />
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Volunteer ID</p>
                <p className="text-sm font-semibold">{profile.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Phone size={18} className="text-gray-400" />
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone</p>
                <p className="text-sm font-semibold">{profile.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Mail size={18} className="text-gray-400" />
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</p>
                <p className="text-sm font-semibold">{profile.email}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Availability Section */}
      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Availability</h2>
          <p className="text-xs text-gray-500 mt-0.5">Let us know if you are ready to accept pickups.</p>
        </div>
        <div className="p-2">
          {[
            { status: 'Available', desc: 'Ready to accept pickups', color: 'bg-emerald-500' },
            { status: 'Busy', desc: 'Currently completing a pickup', color: 'bg-orange-500' },
            { status: 'Offline', desc: 'Not accepting pickups', color: 'bg-gray-400' }
          ].map((item) => (
            <div 
              key={item.status}
              onClick={() => setAvailabilityStatus(item.status)}
              className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-colors ${
                availabilityStatus === item.status ? 'bg-gray-50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <div>
                  <p className={`text-sm font-bold ${availabilityStatus === item.status ? 'text-gray-900' : 'text-gray-700'}`}>
                    {item.status}
                  </p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </div>
              {availabilityStatus === item.status && (
                <CheckCircle2 size={18} className="text-emerald-500" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 3. Preferences Section */}
      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Pickup Preferences</h2>
        </div>
        <div className="p-4 space-y-6">
          
          {/* Distance */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={18} className="text-gray-400" />
              <h3 className="text-sm font-bold text-gray-900">Maximum pickup distance</h3>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[2, 5, 10, 20].map(dist => (
                <button
                  key={dist}
                  onClick={() => handleDistanceChange(dist)}
                  className={`py-2 rounded-lg text-sm font-semibold transition-colors ${
                    preferences.maxDistance === dist 
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {dist} km
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center gap-2 mb-3">
              <Bell size={18} className="text-gray-400" />
              <h3 className="text-sm font-bold text-gray-900">Notifications</h3>
            </div>
            <div className="space-y-3">
              {[
                { key: 'newPickupAlerts', label: 'New pickup alerts' },
                { key: 'pickupReminders', label: 'Pickup reminders' },
                { key: 'deliveryUpdates', label: 'Delivery updates' }
              ].map(notif => (
                <label key={notif.key} className="flex items-center justify-between cursor-pointer group">
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                    {notif.label}
                  </span>
                  <div 
                    onClick={() => toggleNotification(notif.key)}
                    className={`w-11 h-6 rounded-full p-1 transition-colors ${
                      preferences.notifications[notif.key] ? 'bg-emerald-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
                      preferences.notifications[notif.key] ? 'translate-x-5' : 'translate-x-0'
                    }`}></div>
                  </div>
                </label>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. Account Section */}
      <section className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Account</h2>
        </div>
        <div className="p-2">
          <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group">
            <div className="flex items-center gap-3">
              <Lock size={18} className="text-gray-500 group-hover:text-gray-700" />
              <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">Change Password</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-red-50 transition-colors group mt-1">
            <div className="flex items-center gap-3">
              <LogOut size={18} className="text-red-500" />
              <span className="text-sm font-semibold text-red-600">Log Out</span>
            </div>
          </button>
        </div>
      </section>

    </div>
  );
}

function CheckCircle2(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
