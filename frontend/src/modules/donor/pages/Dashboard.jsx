import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PlusCircle, 
  Utensils, 
  Leaf, 
  Handshake, 
  ShieldCheck, 
  Radio, 
  Check, 
  Truck, 
  Package, 
  Home, 
  Heart, 
  Trophy,
  Bell
} from 'lucide-react';

export default function DonorDashboard({ onMenuClick }) {
  const currentDate = 'SATURDAY, AUGUST 29';

  return (
    <div className="space-y-7 pb-10 max-w-[1340px] mx-auto">
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-4 pt-1">
        <div>
          <p className="text-[11.5px] font-bold text-slate-400 tracking-wider uppercase mb-1">
            {currentDate}
          </p>
          <h1 className="text-2xl sm:text-[28px] font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Good morning, Spice Garden <span>👋</span>
          </h1>
        </div>

        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <button 
            className="relative w-11 h-11 rounded-full bg-white border border-slate-100 shadow-xs flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all cursor-pointer"
            aria-label="Notifications"
          >
            <Bell size={19} className="stroke-[1.9]" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-orange-500 ring-2 ring-white" />
          </button>

          {/* User Avatar Circle */}
          <div className="w-11 h-11 rounded-full bg-[#064e3b] text-white font-bold text-sm flex items-center justify-center shadow-xs select-none">
            SG
          </div>
        </div>
      </div>

      {/* Hero Banner with textured plus grid pattern */}
      <div className="relative rounded-3xl bg-gradient-to-r from-[#064e3b] via-[#085540] to-[#0a634b] p-8 sm:p-10 text-white shadow-sm overflow-hidden">
        {/* Subtle Decorative Pattern Background */}
        <div 
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)`,
            backgroundSize: '24px 24px'
          }}
        />
        
        {/* Decorative Plus Crosses Overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none font-mono text-xl tracking-[18px] leading-[30px] p-4 text-emerald-200 overflow-hidden">
          + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +
        </div>

        <div className="relative z-10 max-w-2xl">
          <h2 className="text-2xl sm:text-[34px] font-extrabold tracking-tight leading-[1.18] text-white">
            Turn today's surplus into someone's meal.
          </h2>
          <p className="mt-3.5 text-sm sm:text-[15px] leading-relaxed text-emerald-100/90 max-w-xl font-normal">
            Every portion saved is a step towards a zero-waste community. Connect with local NGOs instantly and track your positive impact.
          </p>

          <div className="mt-7">
            <Link
              to="/donor/create"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-white text-[#064e3b] hover:bg-emerald-50 rounded-2xl sm:rounded-full font-bold text-sm shadow-sm transition-all duration-200 hover:shadow active:scale-[0.99] group cursor-pointer"
            >
              <div className="w-5 h-5 rounded-full border-2 border-[#064e3b] flex items-center justify-center text-[#064e3b] font-bold text-xs">
                +
              </div>
              <span>Rescue Surplus Food</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: MEALS SHARED */}
        <div className="relative bg-white rounded-3xl border border-slate-100/90 shadow-xs p-6 overflow-hidden transition-all duration-200 hover:shadow-sm">
          {/* Subtle Watermark Silhouette */}
          <Utensils className="absolute -right-3 -bottom-3 w-28 h-28 text-slate-100/60 pointer-events-none stroke-[1.2]" />
          
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-[#e8f7ee] text-[#16a34a] flex items-center justify-center mb-5">
              <Utensils size={22} className="stroke-[2.2]" />
            </div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              MEALS SHARED
            </p>
            <h3 className="text-[34px] font-extrabold text-slate-900 tracking-tight mt-1">
              1,250
            </h3>
          </div>
        </div>

        {/* Card 2: WASTE PREVENTED */}
        <div className="relative bg-white rounded-3xl border border-slate-100/90 shadow-xs p-6 overflow-hidden transition-all duration-200 hover:shadow-sm">
          {/* Subtle Watermark Silhouette */}
          <Leaf className="absolute -right-3 -bottom-3 w-28 h-28 text-slate-100/60 pointer-events-none stroke-[1.2]" />

          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-[#fff1e6] text-[#ea580c] flex items-center justify-center mb-5">
              <Leaf size={22} className="stroke-[2.2]" />
            </div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              WASTE PREVENTED
            </p>
            <div className="flex items-baseline gap-1 mt-1">
              <h3 className="text-[34px] font-extrabold text-slate-900 tracking-tight">
                320
              </h3>
              <span className="text-base font-bold text-slate-500">kg</span>
            </div>
          </div>
        </div>

        {/* Card 3: COMMUNITY PARTNERS */}
        <div className="relative bg-white rounded-3xl border border-slate-100/90 shadow-xs p-6 overflow-hidden transition-all duration-200 hover:shadow-sm">
          {/* Subtle Watermark Silhouette */}
          <Handshake className="absolute -right-3 -bottom-3 w-28 h-28 text-slate-100/60 pointer-events-none stroke-[1.2]" />

          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-[#f1f5f9] text-[#475569] flex items-center justify-center mb-5">
              <Handshake size={22} className="stroke-[2.2]" />
            </div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              COMMUNITY PARTNERS
            </p>
            <h3 className="text-[34px] font-extrabold text-slate-900 tracking-tight mt-1">
              18
            </h3>
          </div>
        </div>

        {/* Card 4: SUCCESSFUL RESCUES */}
        <div className="relative bg-white rounded-3xl border border-slate-100/90 shadow-xs p-6 overflow-hidden transition-all duration-200 hover:shadow-sm">
          {/* Subtle Watermark Silhouette */}
          <ShieldCheck className="absolute -right-3 -bottom-3 w-28 h-28 text-slate-100/60 pointer-events-none stroke-[1.2]" />

          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-[#059669] text-white flex items-center justify-center mb-5 shadow-sm shadow-emerald-600/20">
              <Check size={22} className="stroke-[3]" />
            </div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              SUCCESSFUL RESCUES
            </p>
            <h3 className="text-[34px] font-extrabold text-slate-900 tracking-tight mt-1">
              42
            </h3>
          </div>
        </div>
      </div>

      {/* Middle Section: Live Rescue + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Left Column: Live Rescue Card (7 cols on lg) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100/90 shadow-xs p-6 sm:p-7 flex flex-col justify-between space-y-7">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Radio size={20} className="text-orange-500 stroke-[2.5]" />
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                Live Rescue
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold tracking-wide">
              ID: #4092A
            </span>
          </div>

          {/* Food Details Row */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Food Thumbnail */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border border-slate-100 bg-slate-50 shadow-xs">
              <img 
                src="/biryani.jpg" 
                alt="Vegetable Biryani" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if image path has an issue
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&auto=format&fit=crop&q=80';
                }}
              />
            </div>

            {/* Food Text & Badges */}
            <div className="min-w-0 flex-1">
              <h4 className="text-base sm:text-[17px] font-bold text-slate-900 tracking-tight truncate">
                Vegetable Biryani (40 meals)
              </h4>
              <p className="text-xs sm:text-[13px] text-slate-500 mt-1 leading-snug">
                Prepared 2 hours ago. Needs pickup before 4:00 PM.
              </p>

              {/* Tags */}
              <div className="flex items-center gap-2 mt-3.5">
                <span className="px-2.5 py-1 rounded-lg bg-[#dcfce7] text-[#15803d] text-[11px] font-extrabold tracking-wider uppercase">
                  VEGAN
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[#e2e8f0] text-[#475569] text-[11px] font-extrabold tracking-wider uppercase">
                  BULK
                </span>
              </div>
            </div>
          </div>

          {/* Stepper Progress Bar matching screenshot */}
          <div className="pt-2">
            <div className="relative flex items-center justify-between">
              {/* Connecting Background Line Bar */}
              <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-1 bg-slate-100 z-0">
                {/* Completed green segment from Listed to Claimed */}
                <div className="absolute left-0 w-1/4 h-full bg-[#059669]" />
                {/* In-progress orange segment from Claimed to On the way */}
                <div className="absolute left-1/4 w-1/4 h-full bg-[#ea580c]" />
              </div>

              {/* Step 1: Listed */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#059669] text-white flex items-center justify-center shadow-xs">
                  <Check size={16} className="stroke-[3]" />
                </div>
                <span className="text-[11.5px] font-bold text-slate-900 mt-2">
                  Listed
                </span>
              </div>

              {/* Step 2: Claimed */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#059669] text-white flex items-center justify-center shadow-xs">
                  <Check size={16} className="stroke-[3]" />
                </div>
                <span className="text-[11.5px] font-bold text-slate-900 mt-2">
                  Claimed
                </span>
              </div>

              {/* Step 3: On the way (Active) */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative w-9 h-9 rounded-full bg-[#f97316] text-white flex items-center justify-center shadow-md shadow-orange-500/25 ring-4 ring-orange-100">
                  <Truck size={17} className="stroke-[2.4]" />
                  {/* Ping dot */}
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-orange-500 ring-2 ring-white animate-pulse" />
                </div>
                <span className="text-[11.5px] font-extrabold text-[#ea580c] mt-2">
                  On the way
                </span>
              </div>

              {/* Step 4: Picked up */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-slate-50 border-2 border-slate-200 text-slate-400 flex items-center justify-center">
                  <Package size={15} className="stroke-[2]" />
                </div>
                <span className="text-[11.5px] font-semibold text-slate-400 mt-2">
                  Picked up
                </span>
              </div>

              {/* Step 5: Delivered */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-slate-50 border-2 border-slate-200 text-slate-400 flex items-center justify-center">
                  <Home size={15} className="stroke-[2]" />
                </div>
                <span className="text-[11.5px] font-semibold text-slate-400 mt-2">
                  Delivered
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Activity Card (5 cols on lg) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-100/90 shadow-xs p-6 sm:p-7 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight mb-6">
              Recent Activity
            </h3>

            <div className="space-y-6">
              {/* Activity Item 1 */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#ecfdf5] text-[#059669] flex items-center justify-center shrink-0 mt-0.5">
                  <Heart size={18} className="fill-[#059669] stroke-[1.5]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[13.5px] text-slate-700 leading-snug">
                    <strong className="font-bold text-slate-900">City Harvest NGO</strong> left a thank you note for yesterday's bakery surplus.
                  </p>
                  <p className="text-[10.5px] font-bold text-slate-400 tracking-wide uppercase mt-1.5">
                    2 HOURS AGO
                  </p>
                </div>
              </div>

              {/* Activity Item 2 */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#fff7ed] text-[#ea580c] flex items-center justify-center shrink-0 mt-0.5">
                  <Truck size={18} className="stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[13.5px] text-slate-700 leading-snug">
                    <strong className="font-bold text-slate-900">Volunteer Mark</strong> completed delivery of 15kg fresh produce to Downtown Shelter.
                  </p>
                  <p className="text-[10.5px] font-bold text-slate-400 tracking-wide uppercase mt-1.5">
                    YESTERDAY, 4:30 PM
                  </p>
                </div>
              </div>

              {/* Activity Item 3 */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#f0fdfa] text-[#0d9488] flex items-center justify-center shrink-0 mt-0.5">
                  <Utensils size={18} className="stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[13.5px] text-slate-700 leading-snug">
                    You successfully listed <strong className="font-bold text-slate-900">Roasted Chicken (20 portions)</strong>.
                  </p>
                  <p className="text-[10.5px] font-bold text-slate-400 tracking-wide uppercase mt-1.5">
                    YESTERDAY, 1:15 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Community Champion Gamification / Level Progress Card */}
      <div className="rounded-3xl border border-emerald-50/90 p-6 sm:p-7 shadow-xs bg-gradient-to-r from-[#f4fcf6] via-[#fbfdff] to-[#f3f8fe] flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Badge + Text */}
        <div className="flex items-center gap-5 w-full md:w-auto">
          {/* Trophy Coin Badge */}
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md shadow-amber-500/20 shrink-0 select-none">
            <Trophy size={26} className="stroke-[2.2]" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
              Community Champion
            </h3>
            <p className="text-xs font-extrabold text-emerald-600 tracking-wider uppercase mt-0.5">
              LEVEL 4 CONTRIBUTOR
            </p>
          </div>
        </div>

        {/* Center Progress Bar + Subtitle */}
        <div className="flex-1 w-full max-w-xl">
          {/* Progress track */}
          <div className="w-full h-3 rounded-full bg-emerald-100/70 overflow-hidden relative">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500 transition-all duration-700" 
              style={{ width: '88%' }}
            />
          </div>
          <p className="text-xs sm:text-[13px] text-slate-600 mt-2.5 leading-snug">
            Just <strong className="font-bold text-slate-900">12 more successful rescues</strong> to reach Level 5 and unlock priority NGO matching.
          </p>
        </div>

        {/* Right Percentage */}
        <div className="shrink-0 text-right self-end md:self-center">
          <span className="text-3xl sm:text-4xl font-extrabold text-[#059669] tracking-tight">
            88%
          </span>
        </div>
      </div>
    </div>
  );
}
