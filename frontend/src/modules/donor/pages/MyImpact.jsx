import React, { useState } from 'react';
import { 
  Utensils, 
  CheckCircle2, 
  Recycle, 
  Users, 
  ChevronDown, 
  Truck, 
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MyImpact() {
  const [timeframe, setTimeframe] = useState('This Month');

  return (
    <div className="space-y-7 pb-12 max-w-[1300px] mx-auto select-none">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Impact
          </h1>
          <p className="text-xs sm:text-[13.5px] text-slate-500 font-medium mt-0.5">
            See the difference your restaurant has made through food donations.
          </p>
        </div>

        {/* Timeframe Dropdown */}
        <div className="relative self-start sm:self-auto">
          <select 
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-4 py-2 pr-9 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500/20 shadow-2xs cursor-pointer"
          >
            <option>This Month</option>
            <option>Last 3 Months</option>
            <option>Year to Date</option>
            <option>All Time</option>
          </select>
          <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* 4 Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: MEALS DONATED */}
        <div className="bg-white rounded-3xl border border-slate-100/90 shadow-xs p-6 transition-all duration-200 hover:shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#e8f7ee] text-[#16a34a] flex items-center justify-center mb-4">
            <Utensils size={20} className="stroke-[2.2]" />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            MEALS DONATED
          </p>
          <h3 className="text-3xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            1,250
          </h3>
        </div>

        {/* Card 2: SUCCESSFUL DONATIONS */}
        <div className="bg-white rounded-3xl border border-slate-100/90 shadow-xs p-6 transition-all duration-200 hover:shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#fff1e6] text-[#ea580c] flex items-center justify-center mb-4">
            <CheckCircle2 size={20} className="stroke-[2.4]" />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            SUCCESSFUL DONATIONS
          </p>
          <h3 className="text-3xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            42
          </h3>
        </div>

        {/* Card 3: FOOD WASTE REDUCED */}
        <div className="bg-white rounded-3xl border border-slate-100/90 shadow-xs p-6 transition-all duration-200 hover:shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#ecfdf5] text-[#059669] flex items-center justify-center mb-4">
            <Recycle size={20} className="stroke-[2.2]" />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            FOOD WASTE REDUCED
          </p>
          <div className="flex items-baseline gap-1 mt-1">
            <h3 className="text-3xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              320
            </h3>
            <span className="text-sm font-bold text-slate-500">kg</span>
          </div>
        </div>

        {/* Card 4: COMMUNITY PARTNERS */}
        <div className="bg-white rounded-3xl border border-slate-100/90 shadow-xs p-6 transition-all duration-200 hover:shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#f1f5f9] text-[#475569] flex items-center justify-center mb-4">
            <Users size={20} className="stroke-[2.2]" />
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            COMMUNITY PARTNERS
          </p>
          <h3 className="text-3xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            18
          </h3>
        </div>
      </div>

      {/* Row 2: Community Partners List */}
      <div className="bg-white rounded-3xl border border-slate-100/90 shadow-xs p-6 sm:p-7 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
            Community Partners
          </h3>
          <Link
            to="/donor/community-partners"
            className="text-emerald-600 font-bold text-sm hover:text-emerald-700 flex items-center gap-1 transition-colors"
          >
            View All Partners <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Partner 1: Hope Foundation */}
          <div className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-5 flex flex-col items-center text-center gap-3 hover:bg-slate-50 transition-colors">
            <div className="w-14 h-14 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-lg font-extrabold text-sky-600 shadow-2xs">
              HF
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">
                Hope Foundation
              </h4>
              <div className="flex items-center justify-center gap-3 text-xs text-slate-500 font-medium mt-2">
                <span className="flex items-center gap-1">
                  <Truck size={14} className="text-slate-400" />
                  <span>12 donations</span>
                </span>
                <span>â€¢</span>
                <span className="flex items-center gap-1">
                  <Utensils size={14} className="text-slate-400" />
                  <span>420 meals</span>
                </span>
              </div>
            </div>
          </div>

          {/* Partner 2: Food For All */}
          <div className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-5 flex flex-col items-center text-center gap-3 hover:bg-slate-50 transition-colors">
            <div className="w-14 h-14 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-lg font-extrabold text-amber-600 shadow-2xs">
              FA
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">
                Food For All
              </h4>
              <div className="flex items-center justify-center gap-3 text-xs text-slate-500 font-medium mt-2">
                <span className="flex items-center gap-1">
                  <Truck size={14} className="text-slate-400" />
                  <span>8 donations</span>
                </span>
                <span>â€¢</span>
                <span className="flex items-center gap-1">
                  <Utensils size={14} className="text-slate-400" />
                  <span>280 meals</span>
                </span>
              </div>
            </div>
          </div>

          {/* Partner 3: Community Kitchen */}
          <div className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-5 flex flex-col items-center text-center gap-3 hover:bg-slate-50 transition-colors">
            <div className="w-14 h-14 rounded-full bg-white border border-slate-200/80 flex items-center justify-center text-lg font-extrabold text-emerald-600 shadow-2xs">
              CK
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">
                Community Kitchen
              </h4>
              <div className="flex items-center justify-center gap-3 text-xs text-slate-500 font-medium mt-2">
                <span className="flex items-center gap-1">
                  <Truck size={14} className="text-slate-400" />
                  <span>6 donations</span>
                </span>
                <span>â€¢</span>
                <span className="flex items-center gap-1">
                  <Utensils size={14} className="text-slate-400" />
                  <span>190 meals</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
