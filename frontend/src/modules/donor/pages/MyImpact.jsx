import React, { useState } from 'react';
import { 
  Utensils, 
  CheckCircle2, 
  Recycle, 
  Users, 
  Award, 
  ChevronDown, 
  Truck, 
  Building2, 
  Heart,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { Link } from 'react-router-dom';

const mealsData = [
  { month: 'Jan', value: 150 },
  { month: 'Feb', value: 220 },
  { month: 'Mar', value: 180 },
  { month: 'Apr', value: 290 },
  { month: 'May', value: 250 },
  { month: 'Jun', value: 320 },
];

const donationsCountData = [
  { month: 'Jan', value: 6 },
  { month: 'Feb', value: 9 },
  { month: 'Mar', value: 7 },
  { month: 'Apr', value: 12 },
  { month: 'May', value: 10 },
  { month: 'Jun', value: 14 },
];

const CustomTooltip = ({ active, payload, label, chartType }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white text-xs rounded-xl px-3 py-2 shadow-lg border border-slate-800">
        <p className="font-bold">{label}</p>
        <p className="text-emerald-400 font-semibold mt-0.5">
          {payload[0].value} {chartType === 'Meals Donated' ? 'meals' : 'donations'}
        </p>
      </div>
    );
  }
  return null;
};

// Customized Dot for the Spline Chart matching the screenshot design
const CustomizedDot = (props) => {
  const { cx, cy } = props;
  return (
    <svg x={cx - 5} y={cy - 5} width={10} height={10} fill="white">
      <circle cx="5" cy="5" r="4.5" fill="white" stroke="#059669" strokeWidth="2.5" />
    </svg>
  );
};

export default function MyImpact() {
  const [timeframe, setTimeframe] = useState('This Month');
  const [chartType, setChartType] = useState('Meals Donated');

  const activeData = chartType === 'Meals Donated' ? mealsData : donationsCountData;
  const yAxisMax = chartType === 'Meals Donated' ? 350 : 16;
  const yAxisTicks = chartType === 'Meals Donated' 
    ? [0, 50, 100, 150, 200, 250, 300, 350] 
    : [0, 4, 8, 12, 16];

  return (
    <div className="space-y-7 pb-12 max-w-[1300px] mx-auto select-none">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-[26px] font-extrabold text-slate-900 tracking-tight">
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
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            MEALS DONATED
          </p>
          <h3 className="text-3xl sm:text-[34px] font-extrabold text-slate-900 tracking-tight mt-1">
            1,250
          </h3>
        </div>

        {/* Card 2: SUCCESSFUL DONATIONS */}
        <div className="bg-white rounded-3xl border border-slate-100/90 shadow-xs p-6 transition-all duration-200 hover:shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#fff1e6] text-[#ea580c] flex items-center justify-center mb-4">
            <CheckCircle2 size={20} className="stroke-[2.4]" />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            SUCCESSFUL DONATIONS
          </p>
          <h3 className="text-3xl sm:text-[34px] font-extrabold text-slate-900 tracking-tight mt-1">
            42
          </h3>
        </div>

        {/* Card 3: FOOD WASTE REDUCED */}
        <div className="bg-white rounded-3xl border border-slate-100/90 shadow-xs p-6 transition-all duration-200 hover:shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-[#ecfdf5] text-[#059669] flex items-center justify-center mb-4">
            <Recycle size={20} className="stroke-[2.2]" />
          </div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            FOOD WASTE REDUCED
          </p>
          <div className="flex items-baseline gap-1 mt-1">
            <h3 className="text-3xl sm:text-[34px] font-extrabold text-slate-900 tracking-tight">
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
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            COMMUNITY PARTNERS
          </p>
          <h3 className="text-3xl sm:text-[34px] font-extrabold text-slate-900 tracking-tight mt-1">
            18
          </h3>
        </div>
      </div>

      {/* Row 2: Donation Activity Chart & Community Partners */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left Column: Donation Activity Chart (8 cols on lg) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-100/90 shadow-xs p-6 sm:p-7 flex flex-col justify-between space-y-6">
          {/* Header & Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
              Donation Activity
            </h3>

            {/* Toggle Buttons */}
            <div className="inline-flex items-center p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setChartType('Meals Donated')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  chartType === 'Meals Donated'
                    ? 'bg-white text-[#064e3b] shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Meals Donated
              </button>
              <button
                type="button"
                onClick={() => setChartType('Donations')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  chartType === 'Donations'
                    ? 'bg-white text-[#064e3b] shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Donations
              </button>
            </div>
          </div>

          {/* Area Line Chart */}
          <div className="w-full h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  tickLine={false} 
                  axisLine={{ stroke: '#f1f5f9' }}
                  tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }} 
                />
                <YAxis 
                  domain={[0, yAxisMax]} 
                  ticks={yAxisTicks}
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }} 
                />
                <Tooltip content={<CustomTooltip chartType={chartType} />} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#059669" 
                  strokeWidth={2.5}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  dot={<CustomizedDot />}
                  activeDot={{ r: 6, fill: '#059669', stroke: '#ffffff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column: Community Partners List (4 cols on lg) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-100/90 shadow-xs p-6 sm:p-7 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
              Community Partners
            </h3>

            {/* Partner 1: Hope Foundation */}
            <div className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-3.5 flex items-center gap-3.5 hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-xs font-bold text-sky-600 shadow-2xs shrink-0">
                <span className="text-base">🤝</span>
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-slate-900 truncate">
                  Hope Foundation
                </h4>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium mt-0.5">
                  <span className="flex items-center gap-1">
                    <Truck size={12} className="text-slate-400" />
                    <span>12 donations</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Utensils size={12} className="text-slate-400" />
                    <span>420 meals</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Partner 2: Food For All */}
            <div className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-3.5 flex items-center gap-3.5 hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-xs font-bold text-amber-600 shadow-2xs shrink-0">
                <span className="text-base">🍲</span>
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-slate-900 truncate">
                  Food For All
                </h4>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium mt-0.5">
                  <span className="flex items-center gap-1">
                    <Truck size={12} className="text-slate-400" />
                    <span>8 donations</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Utensils size={12} className="text-slate-400" />
                    <span>280 meals</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Partner 3: Community Kitchen */}
            <div className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-3.5 flex items-center gap-3.5 hover:bg-slate-50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center text-xs font-bold text-emerald-600 shadow-2xs shrink-0">
                <span className="text-base">🥗</span>
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-slate-900 truncate">
                  Community Kitchen
                </h4>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium mt-0.5">
                  <span className="flex items-center gap-1">
                    <Truck size={12} className="text-slate-400" />
                    <span>6 donations</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Utensils size={12} className="text-slate-400" />
                    <span>190 meals</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* View All Partners Button */}
          <div>
            <Link
              to="/donor/community-partners"
              className="block w-full py-2.5 border border-emerald-200 bg-white hover:bg-emerald-50 text-[#064e3b] font-bold text-xs sm:text-sm rounded-xl text-center transition-colors shadow-2xs cursor-pointer"
            >
              View All Partners
            </Link>
          </div>
        </div>
      </div>

      {/* Row 3: 1,000 Meals Milestone Card */}
      <div className="bg-gradient-to-r from-[#e6f7ef] via-[#f2faf5] to-[#e8f5ee] border border-emerald-100/90 rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col md:flex-row items-center gap-6">
        {/* Medal Circle */}
        <div className="w-16 h-16 rounded-full bg-[#064e3b] text-white flex items-center justify-center shadow-md shadow-emerald-950/20 shrink-0">
          <Award size={30} className="stroke-[2.2]" />
        </div>

        {/* Content & Progress */}
        <div className="min-w-0 flex-1 w-full space-y-2">
          <h3 className="text-lg sm:text-xl font-extrabold text-[#064e3b] tracking-tight">
            1,000 Meals Milestone
          </h3>
          <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed max-w-3xl">
            Your restaurant has helped provide over 1,000 meals through the GoodFood Rescue network. Thank you for your continued dedication to reducing waste and feeding the community.
          </p>

          {/* Full Progress Bar */}
          <div className="pt-2">
            <div className="w-full h-2.5 rounded-full bg-emerald-200/80 overflow-hidden">
              <div className="w-full h-full bg-[#059669] rounded-full" />
            </div>
            <div className="flex justify-end pt-1">
              <span className="text-xs font-bold text-[#064e3b]">
                Unlocked!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
