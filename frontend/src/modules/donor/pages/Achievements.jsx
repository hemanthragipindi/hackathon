import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  User, 
  Star, 
  CheckCircle2, 
  Utensils, 
  Recycle, 
  Users, 
  Trophy, 
  Truck, 
  PartyPopper,
  Sparkles
} from 'lucide-react';

const completedAchievements = [
  {
    id: 1,
    title: 'First Donation',
    description: 'Completed your first successful food donation.',
    icon: CheckCircle2,
    color: 'text-[#15803d]',
    bg: 'bg-[#e6f4ea]'
  },
  {
    id: 2,
    title: '100 Meals Shared',
    description: 'Helped provide more than 100 meals.',
    icon: Utensils,
    color: 'text-[#15803d]',
    bg: 'bg-[#e6f4ea]'
  },
  {
    id: 3,
    title: 'Waste Reducer',
    description: 'Prevented 100 kg of food from going to waste.',
    icon: Recycle,
    color: 'text-[#15803d]',
    bg: 'bg-[#e6f4ea]'
  },
  {
    id: 4,
    title: 'Community Partner',
    description: 'Completed 25 successful food rescues.',
    icon: Users,
    color: 'text-[#15803d]',
    bg: 'bg-[#e6f4ea]'
  }
];

export default function Achievements() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCompleted = completedAchievements.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-7 pb-12 max-w-[1300px] mx-auto select-none">
      {/* Top Search & Profile Row */}
      <div className="flex items-center justify-between gap-4 pt-1">
        {/* Search Bar */}
        <div className="relative w-full max-w-xs sm:max-w-sm">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search achievements..." 
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200/90 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-2xs transition-all"
          />
        </div>

        {/* Top Right Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button className="relative w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer">
            <Bell size={17} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500" />
          </button>
          
          <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
            <User size={18} />
          </div>
        </div>
      </div>

      {/* Page Title & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-[26px] font-extrabold text-slate-900 tracking-tight">
          Achievements
        </h1>
        <p className="text-xs sm:text-[13.5px] text-slate-500 font-medium mt-0.5 max-w-xl leading-relaxed">
          Milestones and recognition earned through your contribution to the community.
        </p>
      </div>

      {/* Top Hero Card: Current Rescues Milestone */}
      <div className="bg-white rounded-3xl border border-slate-100/90 shadow-xs p-6 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Left Title & Star Badge */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-emerald-100/80 text-[#059669] flex items-center justify-center shrink-0">
              <Star size={22} className="fill-[#059669] stroke-[1.5]" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                42 Successful Food Rescues
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-500 font-medium mt-0.5">
                Active Community Contributor
              </p>
            </div>
          </div>

          {/* Right Next Milestone target */}
          <div className="sm:text-right self-start sm:self-auto">
            <p className="text-[11px] font-semibold text-slate-400">
              Next Milestone
            </p>
            <p className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5">
              50 Rescues
            </p>
          </div>
        </div>

        {/* Progress bar (42/50 = 84%) */}
        <div className="pt-2">
          <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
            <div 
              className="h-full rounded-full bg-[#064e3b] transition-all duration-700"
              style={{ width: '84%' }}
            />
          </div>
          <p className="text-[11.5px] text-slate-400 font-medium text-right mt-1.5">
            You are 8 donations away from your next milestone
          </p>
        </div>
      </div>

      {/* Section 1: Completed Badges */}
      <div className="space-y-4 pt-1">
        <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
          Completed
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredCompleted.map((badge) => (
            <div 
              key={badge.id}
              className="bg-white rounded-2xl border border-slate-100/90 p-5 space-y-2.5 shadow-xs transition-all duration-200 hover:shadow-sm"
            >
              <div className={`w-9 h-9 rounded-xl ${badge.bg} ${badge.color} flex items-center justify-center`}>
                <badge.icon size={19} className="stroke-[2.2]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {badge.title}
                </h4>
                <p className="text-xs text-slate-500 leading-snug mt-1">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Upcoming Milestones */}
      <div className="space-y-4 pt-2">
        <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">
          Upcoming
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: 1,000 Meals Shared */}
          <div className="bg-white rounded-2xl border border-dashed border-slate-200/90 p-5 sm:p-6 space-y-4 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Trophy size={18} className="stroke-[2]" />
              </div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900">
                1,000 Meals Shared
              </h4>
            </div>

            <div>
              <div className="flex items-center justify-between text-[11px] mb-1.5 font-bold">
                <span className="text-slate-400 font-semibold">Progress</span>
                <span className="text-slate-600">750 / 1,000 meals</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-indigo-300 transition-all duration-700" 
                  style={{ width: '75%' }}
                />
              </div>
            </div>
          </div>

          {/* Card 2: Food Rescue Champion */}
          <div className="bg-white rounded-2xl border border-dashed border-slate-200/90 p-5 sm:p-6 space-y-4 shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <Truck size={18} className="stroke-[2]" />
              </div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900">
                Food Rescue Champion
              </h4>
            </div>

            <div>
              <div className="flex items-center justify-between text-[11px] mb-1.5 font-bold">
                <span className="text-slate-400 font-semibold">Progress</span>
                <span className="text-slate-600">42 / 50 rescues</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div 
                  className="h-full rounded-full bg-sky-300 transition-all duration-700" 
                  style={{ width: '84%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Latest Achievement Callout */}
      <div className="bg-gradient-to-r from-[#eef9f3] via-[#f7fbf8] to-[#edf7f2] border border-emerald-100/90 rounded-2xl p-5 shadow-xs flex items-start gap-4">
        {/* Party Popper Circle Icon */}
        <div className="w-11 h-11 rounded-full bg-[#064e3b] text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
          <PartyPopper size={20} className="stroke-[2]" />
        </div>

        <div className="min-w-0 flex-1">
          <span className="text-[11px] font-extrabold text-[#064e3b] tracking-wider uppercase">
            Latest Achievement
          </span>
          <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-snug">
            Your restaurant recently reached <strong className="font-bold text-slate-900">100 Meals Shared</strong> through Food Rescue.
          </p>
          <p className="text-[11px] text-slate-400 font-medium mt-1">
            Earned on Oct 12, 2023
          </p>
        </div>
      </div>
    </div>
  );
}
