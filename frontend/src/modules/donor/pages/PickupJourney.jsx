import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  HelpCircle, 
  Clock, 
  Check, 
  Car, 
  MapPin, 
  Utensils, 
  Phone, 
  ChevronRight, 
  ArrowRight, 
  Package, 
  Store, 
  Gift, 
  Sparkles,
  Radio
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PickupJourney() {
  const [searchQuery, setSearchQuery] = useState('');
  const [callModal, setCallModal] = useState(false);

  return (
    <div className="space-y-8 pb-12 max-w-[1300px] mx-auto select-none">
      {/* Top Header & Search Bar Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Pickup Journey
          </h1>
          <p className="text-xs sm:text-[13.5px] text-slate-500 font-medium mt-0.5">
            Follow your food from pickup to the community it supports.
          </p>
        </div>

        {/* Search, Notifications, Help & Profile */}
        <div className="flex items-center gap-3">
          {/* Search Box */}
          <div className="relative w-48 sm:w-60">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200/90 rounded-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>

          {/* Bell button */}
          <button className="relative w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-2xs">
            <Bell size={17} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500" />
          </button>

          {/* Help button */}
          <button className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-2xs">
            <HelpCircle size={17} />
          </button>

          {/* Avatar */}
          <div className="w-9 h-9 rounded-full overflow-hidden border border-slate-200 bg-emerald-50 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
              alt="Owner" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80';
              }}
            />
          </div>
        </div>
      </div>

      {/* Header Status Indicator */}
      <div className="flex items-center justify-end">
        <div className="px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-bold flex items-center gap-2 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>1 Pickup in Progress</span>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Active Journey Stepper Card (8 cols on lg) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-100/90 shadow-xs p-6 sm:p-8 space-y-6">
          {/* Header & Urgent Tag */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl sm:text-xl font-extrabold text-slate-900 tracking-tight">
                Vegetable Biryani <span className="text-emerald-700 font-bold text-lg sm:text-xl">(40 Meals)</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                Claimed by: <strong className="text-slate-900 font-bold">Hope Foundation</strong> | Pickup Volunteer: <strong className="text-slate-900 font-bold">Rahul</strong>
              </p>
            </div>

            <span className="px-3 py-1 rounded-full bg-[#e6f4ea] text-[#15803d] border border-emerald-200/80 text-[11.5px] font-extrabold flex items-center gap-1 shrink-0">
              <Clock size={13} className="stroke-[2.5]" />
              <span>Urgent</span>
            </span>
          </div>

          {/* Volunteer is on the way Highlight Banner */}
          <div className="bg-[#f0f9ff] border border-sky-100 rounded-2xl p-4 flex items-center gap-3.5 text-xs text-[#0284c7]">
            <div className="w-10 h-10 rounded-xl bg-sky-100/80 text-[#0284c7] flex items-center justify-center shrink-0">
              <Car size={20} className="stroke-[2.4]" />
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-[13.5px] font-extrabold text-[#0369a1] leading-snug">
                Volunteer is on the way
              </h4>
              <p className="text-xs text-[#0284c7] mt-0.5 font-medium">
                Estimated arrival: <strong className="font-bold text-[#0369a1]">4 minutes</strong>
              </p>
            </div>
          </div>

          {/* Vertical Progress Stepper */}
          <div className="pt-3 pl-2 sm:pl-4 space-y-6">
            
            {/* Step 1: Food Shared */}
            <div className="flex items-start gap-4 relative">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-[#059669] text-white flex items-center justify-center shadow-xs shrink-0 z-10">
                  <Check size={14} className="stroke-[3]" />
                </div>
                <div className="w-0.5 h-12 bg-[#059669] mt-1" />
              </div>
              <div className="min-w-0 pt-0.5">
                <h4 className="text-sm font-bold text-slate-900">
                  Food Shared
                </h4>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Donation was successfully shared with nearby community partners.
                </p>
              </div>
            </div>

            {/* Step 2: Claimed by Hope Foundation */}
            <div className="flex items-start gap-4 relative">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-[#059669] text-white flex items-center justify-center shadow-xs shrink-0 z-10">
                  <Check size={14} className="stroke-[3]" />
                </div>
                <div className="w-0.5 h-12 bg-slate-200 mt-1" />
              </div>
              <div className="min-w-0 pt-0.5">
                <h4 className="text-sm font-bold text-slate-900">
                  Claimed by Hope Foundation
                </h4>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  A verified community partner accepted the donation.
                </p>
              </div>
            </div>

            {/* Step 3: Volunteer on the Way (Active) */}
            <div className="flex items-start gap-4 relative">
              <div className="flex flex-col items-center">
                <div className="w-7 h-7 -ml-0.5 rounded-full bg-emerald-50 border-2 border-emerald-600 flex items-center justify-center shrink-0 z-10 shadow-xs">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                </div>
                <div className="w-0.5 h-8 bg-slate-200 mt-1" />
              </div>
              <div className="min-w-0 pt-0.5">
                <h4 className="text-sm font-bold text-[#059669]">
                  Volunteer on the Way
                </h4>
                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                  Rahul is currently travelling to the restaurant.
                </p>
              </div>
            </div>

            {/* Step 4: Food Picked Up */}
            <div className="flex items-start gap-4 relative">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-slate-100 border-2 border-slate-200 shrink-0 z-10 mt-1" />
                <div className="w-0.5 h-7 bg-slate-200 mt-1" />
              </div>
              <div className="min-w-0 pt-0.5">
                <h4 className="text-sm font-semibold text-slate-400">
                  Food Picked Up
                </h4>
              </div>
            </div>

            {/* Step 5: Delivered Successfully */}
            <div className="flex items-start gap-4 relative">
              <div className="flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-slate-100 border-2 border-slate-200 shrink-0 z-10 mt-1" />
              </div>
              <div className="min-w-0 pt-0.5">
                <h4 className="text-sm font-semibold text-slate-400">
                  Delivered Successfully
                </h4>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Widgets (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Widget 1: PICKUP DETAILS */}
          <div className="bg-white rounded-3xl border border-slate-100/90 shadow-xs p-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              PICKUP DETAILS
            </h4>

            <div className="space-y-4 text-xs">
              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={15} />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-xs sm:text-sm">
                    Spice Garden Restaurant
                  </h5>
                  <p className="text-slate-500 mt-0.5">123 Culinary Ave, Floor 1</p>
                </div>
              </div>

              {/* Window */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock size={15} />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-xs sm:text-sm">
                    Pickup Window
                  </h5>
                  <p className="text-slate-500 mt-0.5">7:30 PM - 8:30 PM (Today)</p>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Utensils size={15} />
                </div>
                <div>
                  <h5 className="font-bold text-slate-900 text-xs sm:text-sm">
                    Quantity
                  </h5>
                  <p className="text-slate-500 mt-0.5">40 Meals</p>
                </div>
              </div>
            </div>
          </div>

          {/* Widget 2: Volunteer Card */}
          <div className="bg-white rounded-3xl border border-slate-100/90 shadow-xs p-6 text-center space-y-3.5">
            {/* Volunteer Photo */}
            <div className="w-16 h-16 rounded-full overflow-hidden mx-auto border-2 border-slate-100 shadow-xs">
              <img 
                src="/rahul.jpg" 
                alt="Rahul Volunteer" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80';
                }}
              />
            </div>

            <div>
              <h4 className="text-base font-extrabold text-slate-900">Rahul</h4>
              <span className="px-3 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold inline-block mt-1">
                Pickup Volunteer
              </span>
            </div>

            <div className="text-xs font-bold text-emerald-600 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>On the way</span>
            </div>

            <button 
              onClick={() => alert('Calling Rahul (Pickup Volunteer): +1 (555) 234-5678')}
              className="w-full py-3 px-4 rounded-xl bg-[#064e3b] hover:bg-[#085a44] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all duration-200 active:scale-[0.99] cursor-pointer"
            >
              <Phone size={15} />
              <span>Contact Volunteer</span>
            </button>
          </div>

          {/* Widget 3: Live Transit Status Card */}
          <div className="rounded-3xl border border-slate-100/90 shadow-xs p-5 bg-white flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Transit Info
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10.5px] font-bold">
                ETA 12 mins
              </span>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-800">
                Driver Route #2 â€¢ West Corridor
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Vehicle: White Eco-Van (DL-04-A-8921)
              </p>
            </div>

            <div className="pt-1 flex items-center gap-2 text-xs font-bold text-emerald-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live dispatch in progress</span>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Section: Your Recent Food Journeys */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
            Your Recent Food Journeys
          </h3>
          <button 
            onClick={() => alert('Viewing full history log...')}
            className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>View All History</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* History Item 1 */}
        <div className="bg-white rounded-2xl border border-slate-100/90 p-4 sm:p-5 shadow-xs flex items-center justify-between hover:bg-slate-50/60 transition-colors cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#e6f4ea] text-[#15803d] flex items-center justify-center shrink-0">
              <Gift size={18} className="stroke-[2.2]" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Mixed Vegetable Meals (60 meals)
              </h4>
              <p className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-1">
                <Check size={13} className="text-emerald-600 stroke-[3]" />
                <span>Successfully delivered yesterday</span>
              </p>
            </div>
          </div>
          <ChevronRight size={18} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </div>

        {/* History Item 2 */}
        <div className="bg-white rounded-2xl border border-slate-100/90 p-4 sm:p-5 shadow-xs flex items-center justify-between hover:bg-slate-50/60 transition-colors cursor-pointer group">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#e6f4ea] text-[#0d9488] flex items-center justify-center shrink-0">
              <Package size={18} className="stroke-[2.2]" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Fresh Bread & Bakery Items (25 portions)
              </h4>
              <p className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-1">
                <Check size={13} className="text-emerald-600 stroke-[3]" />
                <span>Successfully delivered</span>
              </p>
            </div>
          </div>
          <ChevronRight size={18} className="text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </div>

        {/* Inspiring Footer Quote */}
        <div className="text-center pt-4">
          <p className="text-xs sm:text-sm text-slate-500 italic font-medium">
            Every successful pickup brings good food closer to someone who needs it.
          </p>
        </div>
      </div>
    </div>
  );
}
