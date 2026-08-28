import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area 
} from 'recharts';
import { TrendingUp, Award, Leaf, Users, Utensils, Scale } from 'lucide-react';
import { chartData } from '../../../data/mockData';

export default function Impact() {
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <nav className="text-xs font-medium text-gray-500 mb-2 select-none">
          <span>Home</span>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-700">Impact Analytics</span>
        </nav>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Social & Environmental Impact</h1>
        <p className="text-sm text-gray-500 mt-1">Verified records of food rescued, carbon emissions prevented, and individuals nourished.</p>
      </div>

      {/* 4 KPI Hero Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase">Food Rescued</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Scale size={18} />
            </div>
          </div>
          <p className="text-3xl font-black text-gray-900 mt-3">2,840 <span className="text-sm font-bold text-gray-500">kg</span></p>
          <p className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1">
            <TrendingUp size={13} /> +18.4% vs last month
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase">Meals Provided</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Utensils size={18} />
            </div>
          </div>
          <p className="text-3xl font-black text-gray-900 mt-3">5,620</p>
          <p className="text-xs font-semibold text-emerald-600 mt-1 flex items-center gap-1">
            <TrendingUp size={13} /> +24.2% this month
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase">CO₂ Emissions Saved</span>
            <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
              <Leaf size={18} />
            </div>
          </div>
          <p className="text-3xl font-black text-gray-900 mt-3">6.8 <span className="text-sm font-bold text-gray-500">Tons</span></p>
          <p className="text-xs font-semibold text-teal-600 mt-1 flex items-center gap-1">
            <TrendingUp size={13} /> Equivalent to 15,200 km driven
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 uppercase">People Nourished</span>
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
              <Users size={18} />
            </div>
          </div>
          <p className="text-3xl font-black text-gray-900 mt-3">8,420</p>
          <p className="text-xs font-semibold text-blue-600 mt-1 flex items-center gap-1">
            <TrendingUp size={13} /> Across 18 community shelters
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Trend */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
          <h2 className="text-base font-bold text-gray-900 mb-1">Weekly Food Rescued (kg)</h2>
          <p className="text-xs text-gray-500 mb-6">Daily kilograms of edible surplus rescued from donors</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', color: '#fff', border: 'none' }}
                />
                <Bar dataKey="rescued" fill="#15803d" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Impact Growth */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
          <h2 className="text-base font-bold text-gray-900 mb-1">Meals Distributed Trajectory</h2>
          <p className="text-xs text-gray-500 mb-6">Cumulative beneficiaries reached over 7-day period</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorMeals" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', color: '#fff', border: 'none' }}
                />
                <Area type="monotone" dataKey="rescued" stroke="#059669" strokeWidth={2.5} fillOpacity={1} fill="url(#colorMeals)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
