import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  HelpCircle, 
  Check, 
  Car, 
  Clock, 
  Building2, 
  User, 
  ShoppingBag, 
  Flag, 
  ArrowRight, 
  Leaf, 
  Plus,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LiveRescues() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  return (
    <div className="space-y-7 pb-12 max-w-[1300px] mx-auto select-none">
      {/* Top Header & Search Bar Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Live Rescues
          </h1>
          <p className="text-xs sm:text-[13.5px] text-slate-500 font-medium mt-0.5">
            Track your active food donations from sharing to successful pickup.
          </p>
        </div>

        {/* Search, Notifications, Help & Profile */}
        <div className="flex items-center gap-3">
          {/* Search Box */}
          <div className="relative w-48 sm:w-64">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search rescues..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200/90 rounded-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
            />
          </div>

          {/* Bell button */}
          <button className="relative w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-2xs">
            <Bell size={17} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-orange-500" />
          </button>

          {/* Help button */}
          <button className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-2xs">
            <HelpCircle size={17} />
          </button>

          {/* Avatar */}
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-emerald-600 shadow-2xs bg-emerald-50 flex items-center justify-center">
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

      {/* Filter and Status Counter Bar */}
      <div className="flex items-center justify-end gap-3 pt-1">
        {/* Active Rescues Pill */}
        <div className="px-4 py-2 rounded-full bg-[#e6f4ea] text-[#15803d] text-xs font-bold flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>3 Active Rescues</span>
        </div>

        {/* Status Dropdown */}
        <div className="relative">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 pr-8 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500/20 cursor-pointer shadow-2xs"
          >
            <option>All Statuses</option>
            <option>On the way</option>
            <option>Claimed</option>
            <option>Awaiting Claim</option>
          </select>
          <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Main Featured Active Rescue Card (Hero Card) */}
      <div className="bg-white rounded-3xl border border-slate-100/90 shadow-xs overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Column: Image with "Ready for pickup" badge */}
          <div className="lg:col-span-5 relative min-h-[220px] lg:min-h-full bg-slate-100">
            <img 
              src="/biryani.jpg" 
              alt="Vegetable Biryani" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=500&auto=format&fit=crop&q=80';
              }}
            />
            {/* Tag Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full bg-[#10b981] text-white text-[11.5px] font-extrabold flex items-center gap-2 shadow-sm">
                <Check size={13} className="stroke-[3]" />
                <span>Ready for pickup</span>
              </span>
            </div>
          </div>

          {/* Right Column: Information, Status, Stepper & Button */}
          <div className="lg:col-span-7 p-6 sm:p-7 flex flex-col justify-between space-y-5">
            {/* Header & Expiry */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  Vegetable Biryani <span className="text-slate-500 font-semibold text-base sm:text-lg">(40 meals)</span>
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#fff1e6] text-[#ea580c] border border-orange-200/70 text-xs font-extrabold flex items-center gap-1 shrink-0">
                <Clock size={13} />
                <span>Expires in 2h</span>
              </span>
            </div>

            {/* NGO & Volunteer Info Row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-2 text-slate-700">
                <Building2 size={15} className="text-slate-400" />
                <span>Hope Foundation</span>
              </div>
              <span className="text-slate-300">|</span>
              <div className="flex items-center gap-2 text-slate-700">
                <User size={15} className="text-slate-400" />
                <span>Volunteer: Rahul</span>
              </div>
            </div>

            {/* Status Highlight Banner */}
            <div className="bg-[#f0f9ff] text-[#0284c7] rounded-xl p-3 flex items-center gap-2 text-xs font-bold">
              <Car size={16} className="text-[#0284c7] stroke-[2.4]" />
              <span>Status: On the way</span>
            </div>

            {/* 5-Step Stepper Progress Bar */}
            <div className="pt-2">
              <div className="relative flex items-center justify-between">
                {/* Connecting Line */}
                <div className="absolute left-3 right-3 top-1/2 -translate-y-1/2 h-1 bg-slate-100 z-0">
                  <div className="absolute left-0 w-1/4 h-full bg-[#059669]" />
                  <div className="absolute left-1/4 w-1/4 h-full bg-[#ea580c]" />
                </div>

                {/* Step 1 */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-[#059669] text-white flex items-center justify-center shadow-xs">
                    <Check size={13} className="stroke-[3]" />
                  </div>
                  <span className="text-[10.5px] font-bold text-slate-700 mt-2">
                    Food Shared
                  </span>
                </div>

                {/* Step 2 */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-[#059669] text-white flex items-center justify-center shadow-xs">
                    <Check size={13} className="stroke-[3]" />
                  </div>
                  <span className="text-[10.5px] font-bold text-slate-700 mt-2">
                    NGO Claimed
                  </span>
                </div>

                {/* Step 3 (Active) */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-7 h-7 rounded-full bg-white border-2 border-[#ea580c] flex items-center justify-center shadow-sm">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ea580c]" />
                  </div>
                  <span className="text-[10.5px] font-bold text-[#ea580c] mt-2 text-center leading-tight">
                    Volunteer En<br />Route
                  </span>
                </div>

                {/* Step 4 */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-slate-50 border border-slate-200 text-slate-400 flex items-center justify-center">
                    <ShoppingBag size={12} className="stroke-[2]" />
                  </div>
                  <span className="text-[10.5px] font-semibold text-slate-400 mt-2">
                    Picked Up
                  </span>
                </div>

                {/* Step 5 */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-slate-50 border border-slate-200 text-slate-400 flex items-center justify-center">
                    <Flag size={12} className="stroke-[2]" />
                  </div>
                  <span className="text-[10.5px] font-semibold text-slate-400 mt-2">
                    Completed
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="pt-2 flex justify-end">
              <button 
                onClick={() => alert('Opening live GPS tracker...')}
                className="px-5 py-3 bg-[#064e3b] hover:bg-[#085a44] text-white font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all duration-200 active:scale-[0.99] cursor-pointer"
              >
                <span>View Live Tracking</span>
                <ArrowRight size={15} />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Secondary Rescue Listing 1: Mixed Salad */}
      <div className="bg-white rounded-2xl border border-slate-100/90 shadow-xs p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-slate-100 bg-slate-50">
            <img 
              src="/salad.jpg" 
              alt="Mixed Salad" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&auto=format&fit=crop&q=80';
              }}
            />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm sm:text-base font-bold text-slate-900 truncate">
              Mixed Salad <span className="text-slate-500 font-semibold text-xs sm:text-sm">(20 meals)</span>
            </h4>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1">
                <Clock size={13} className="text-slate-400" />
                <span>Posted 30 mins ago</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1 text-orange-600 font-semibold">
                <Clock size={13} />
                <span>Expires in 3.5h</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
          <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
            Awaiting Claim
          </span>
          <button 
            onClick={() => alert('Managing Mixed Salad listing')}
            className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-2xs transition-colors cursor-pointer"
          >
            Manage
          </button>
        </div>
      </div>

      {/* Secondary Rescue Listing 2: Artisan Breads */}
      <div className="bg-white rounded-2xl border border-slate-100/90 shadow-xs p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-slate-100 bg-slate-50">
            <img 
              src="/breads.jpg" 
              alt="Artisan Breads" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&auto=format&fit=crop&q=80';
              }}
            />
          </div>
          <div className="min-w-0">
            <h4 className="text-sm sm:text-base font-bold text-slate-900 truncate">
              Artisan Breads <span className="text-slate-500 font-semibold text-xs sm:text-sm">(15 items)</span>
            </h4>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1 text-slate-700">
                <Building2 size={13} className="text-slate-400" />
                <span>City Mission</span>
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1 text-slate-600 font-medium">
                <span>Arriving in 15 mins</span>
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
          <span className="px-3 py-1 rounded-full bg-[#e6f4ea] text-[#15803d] text-xs font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            <span>Claimed</span>
          </span>
          <button 
            onClick={() => alert('Managing Artisan Breads listing')}
            className="px-4 py-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-2xs transition-colors cursor-pointer"
          >
            Manage
          </button>
        </div>
      </div>

      {/* Bottom Banner: Keep the good going */}
      <div className="bg-gradient-to-r from-[#f0fdf4] via-[#f8fafc] to-[#f0fdf9] border border-emerald-100/70 rounded-3xl p-8 sm:p-9 text-center space-y-3.5 shadow-xs">
        {/* Leaf Icon Circle */}
        <div className="w-11 h-11 rounded-full bg-white shadow-xs text-emerald-600 flex items-center justify-center mx-auto border border-emerald-100/60">
          <Leaf size={22} className="stroke-[2.2]" />
        </div>

        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
          Keep the good going
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          Have more surplus food today? Share it with your community before it goes to waste.
        </p>

        <div className="pt-2">
          <Link
            to="/donor/create"
            className="px-6 py-3 rounded-xl bg-[#e6f4ea] hover:bg-emerald-100 text-emerald-800 font-bold text-xs sm:text-sm inline-flex items-center gap-2 transition-colors border border-emerald-200/80 cursor-pointer"
          >
            <Plus size={15} className="stroke-[2.5]" />
            <span>Share More Food</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
