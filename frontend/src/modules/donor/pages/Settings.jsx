import React, { useState } from 'react';
import { 
  Bell, 
  Settings as SettingsIcon, 
  User, 
  ShieldCheck, 
  Headphones, 
  ArrowRight, 
  Check, 
  Store,
  Upload
} from 'lucide-react';

export default function DonorSettings() {
  const [activeTab, setActiveTab] = useState('Restaurant Profile');
  const [restaurantName, setRestaurantName] = useState('Green Table Bistro');
  const [contactPerson, setContactPerson] = useState('Maria Rodriguez');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  const [email, setEmail] = useState('hello@greentable.com');
  const [address, setAddress] = useState('123 Culinary Lane, Suite 100');
  const [isSaved, setIsSaved] = useState(false);

  const tabs = [
    'Restaurant Profile',
    'Pickup Details',
    'Notifications',
    'Account'
  ];

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-7 pb-12 max-w-[1300px] mx-auto select-none">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-[26px] font-extrabold text-slate-900 tracking-tight">
            Restaurant Settings
          </h1>
          <p className="text-xs sm:text-[13.5px] text-slate-500 font-medium mt-0.5">
            Manage your restaurant information and preferences.
          </p>
        </div>

        {/* Top-Right Control Icons */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button className="relative w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer">
            <Bell size={17} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500" />
          </button>
          
          <button className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer">
            <SettingsIcon size={17} />
          </button>

          <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 bg-emerald-50 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
              alt="Profile" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80';
              }}
            />
          </div>
        </div>
      </div>

      {/* Horizontal Tabs Navigation */}
      <div className="border-b border-slate-200/80">
        <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-xs sm:text-sm font-bold transition-all relative whitespace-nowrap cursor-pointer ${
                activeTab === tab 
                  ? 'text-slate-900 border-b-2 border-[#064e3b]' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Grid: Settings Form (Left) + Side Widgets (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Form Settings (8 cols on lg) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-100/90 shadow-xs p-6 sm:p-7 space-y-6">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            Restaurant Profile
          </h2>

          <form onSubmit={handleSave} className="space-y-5">
            {/* Logo Upload Box */}
            <div className="flex items-center gap-4 pt-1">
              <div className="w-20 h-20 rounded-2xl bg-emerald-50/70 border border-emerald-100/90 flex flex-col items-center justify-center p-2 shadow-2xs shrink-0">
                <svg viewBox="0 0 24 24" className="w-8 h-8 text-emerald-600 fill-none stroke-current stroke-[2]">
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 14a4 4 0 1 1 4-4 4 4 0 0 1-4 4z" />
                  <path d="M12 6v2m0 8v2M6 12H4m16 0h-2" />
                </svg>
                <span className="text-[7.5px] font-bold text-emerald-800 mt-1">The Green Fork</span>
              </div>

              <div>
                <label className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-2xs cursor-pointer inline-flex items-center gap-1.5 transition-colors">
                  <Upload size={14} />
                  <span>Change Logo</span>
                  <input type="file" className="hidden" accept="image/*" />
                </label>
                <p className="text-[11.5px] text-slate-400 mt-1.5">
                  JPG, GIF or PNG. 1MB max.
                </p>
              </div>
            </div>

            {/* Field: Restaurant Name */}
            <div>
              <label className="block text-[12.5px] font-bold text-slate-700 mb-1.5">
                Restaurant Name
              </label>
              <input 
                type="text" 
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-slate-200/90 rounded-2xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-2xs"
                required
              />
            </div>

            {/* 2-Column Grid: Contact Person & Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[12.5px] font-bold text-slate-700 mb-1.5">
                  Contact Person
                </label>
                <input 
                  type="text" 
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200/90 rounded-2xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-2xs"
                  required
                />
              </div>

              <div>
                <label className="block text-[12.5px] font-bold text-slate-700 mb-1.5">
                  Phone Number
                </label>
                <input 
                  type="text" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200/90 rounded-2xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-2xs"
                  required
                />
              </div>
            </div>

            {/* Field: Email Address */}
            <div>
              <label className="block text-[12.5px] font-bold text-slate-700 mb-1.5">
                Email Address
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-slate-200/90 rounded-2xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-2xs"
                required
              />
            </div>

            {/* Field: Street Address */}
            <div>
              <label className="block text-[12.5px] font-bold text-slate-700 mb-1.5">
                Street Address
              </label>
              <input 
                type="text" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-slate-200/90 rounded-2xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-2xs"
                required
              />
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button 
                type="button"
                onClick={() => {
                  setRestaurantName('Green Table Bistro');
                  setContactPerson('Maria Rodriguez');
                  setPhone('+1 (555) 123-4567');
                  setEmail('hello@greentable.com');
                  setAddress('123 Culinary Lane, Suite 100');
                }}
                className="px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button 
                type="submit"
                className="px-6 py-2.5 bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all duration-200 active:scale-[0.99] flex items-center gap-2 cursor-pointer"
              >
                {isSaved ? (
                  <>
                    <Check size={16} className="stroke-[3]" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <span>Save Changes</span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Status & Assistance Widgets (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Widget 1: Account Status */}
          <div className="relative bg-white rounded-3xl border border-slate-100/90 shadow-xs p-6 space-y-3.5 overflow-hidden">
            {/* Background Watermark */}
            <ShieldCheck className="absolute -right-2 -top-2 w-28 h-28 text-slate-100/70 pointer-events-none stroke-[1.2]" />

            <div className="relative z-10 space-y-2">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Account Status
              </h4>
              <p className="text-sm sm:text-base font-extrabold text-slate-900">
                Active & Verified
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Your restaurant is currently active and visible to local NGOs for food rescue pickups.
              </p>
            </div>

            <div className="pt-2 relative z-10">
              <button 
                type="button"
                onClick={() => alert('Opening public donor profile preview...')}
                className="w-full py-2.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm rounded-xl shadow-2xs text-center transition-colors cursor-pointer"
              >
                View Public Profile
              </button>
            </div>
          </div>

          {/* Widget 2: Need Assistance? */}
          <div className="bg-white rounded-3xl border border-slate-100/90 shadow-xs p-6 space-y-3">
            <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-700 flex items-center justify-center">
              <Headphones size={18} className="stroke-[2.2]" />
            </div>

            <div>
              <h4 className="text-sm font-extrabold text-slate-900">
                Need Assistance?
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed mt-1">
                Our support team is available 24/7 for urgent pickup issues.
              </p>
            </div>

            <div className="pt-1">
              <button 
                type="button"
                onClick={() => alert('Contacting 24/7 Support: support@goodfoodrescue.org')}
                className="text-xs font-bold text-slate-900 hover:text-emerald-700 inline-flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>Contact Support</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
