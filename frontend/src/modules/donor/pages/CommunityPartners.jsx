import React, { useState } from 'react';
import { 
  Search, 
  Bell, 
  User, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Truck, 
  Utensils, 
  ShieldCheck, 
  ExternalLink,
  ChevronDown,
  Sparkles,
  Heart,
  Star
} from 'lucide-react';

const partnersData = [
  {
    id: 1,
    name: 'Hope Foundation',
    type: 'Community Shelter & Food Bank',
    address: '450 Hope Blvd, Downtown District',
    distance: '1.2 km away',
    totalRescues: 18,
    mealsReceived: 640,
    contactPerson: 'Sarah Jenkins',
    phone: '+1 (555) 432-8900',
    email: 'contact@hopefoundation.org',
    verified: true,
    active: true,
    recentPickup: 'Today, 2:30 PM',
    rating: '4.9'
  },
  {
    id: 2,
    name: 'Food For All Network',
    type: 'Urban Hunger Relief',
    address: '88 River Street, Eastside',
    distance: '2.5 km away',
    totalRescues: 12,
    mealsReceived: 420,
    contactPerson: 'David Chen',
    phone: '+1 (555) 876-5432',
    email: 'dispatch@foodforall.org',
    verified: true,
    active: true,
    recentPickup: 'Yesterday',
    rating: '5.0'
  },
  {
    id: 3,
    name: 'Community Kitchen & Pantry',
    type: 'Youth & Senior Meal Program',
    address: '102 Pine Avenue, Metro Core',
    distance: '3.1 km away',
    totalRescues: 8,
    mealsReceived: 290,
    contactPerson: 'Elena Gomez',
    phone: '+1 (555) 345-6789',
    email: 'elena@communitykitchen.org',
    verified: true,
    active: true,
    recentPickup: 'Oct 24, 2023',
    rating: '4.8'
  },
  {
    id: 4,
    name: 'City Harvest Outreach',
    type: 'Emergency Food Distribution',
    address: '772 Industrial Park Rd',
    distance: '4.0 km away',
    totalRescues: 6,
    mealsReceived: 210,
    contactPerson: 'Marcus Vance',
    phone: '+1 (555) 901-2345',
    email: 'marcus@cityharvestoutreach.org',
    verified: true,
    active: true,
    recentPickup: 'Last week',
    rating: '4.9 â˜…'
  }
];

export default function CommunityPartners() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All Types');

  const filteredPartners = partnersData.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          partner.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          partner.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="space-y-7 pb-12 max-w-[1300px] mx-auto select-none">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Community Partners
          </h1>
          <p className="text-xs sm:text-[13.5px] text-slate-500 font-medium mt-0.5">
            Verified local shelters, NGOs, and food banks connected to your rescue network.
          </p>
        </div>

        {/* Search & Header Controls */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="relative w-48 sm:w-64">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search partners..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200/90 rounded-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-2xs"
            />
          </div>

          <button className="relative w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-2xs">
            <Bell size={17} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500" />
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

      {/* Stats Overview Pill Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <Building2 size={22} className="stroke-[2.2]" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-slate-400">Total Partners</p>
            <h3 className="text-2xl font-extrabold text-slate-900">18 NGOs</h3>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
            <Truck size={22} className="stroke-[2.2]" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-slate-400">Total Deliveries</p>
            <h3 className="text-2xl font-extrabold text-slate-900">42 Rescues</h3>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Utensils size={22} className="stroke-[2.2]" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-slate-400">Meals Distributed</p>
            <h3 className="text-2xl font-extrabold text-slate-900">1,250 Meals</h3>
          </div>
        </div>
      </div>

      {/* Partner Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredPartners.map((partner) => (
          <div 
            key={partner.id}
            className="bg-white rounded-3xl border border-slate-100/90 shadow-xs p-6 flex flex-col justify-between space-y-5 hover:shadow-sm transition-shadow"
          >
            {/* Top Partner Details */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50/80 border border-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold text-lg shadow-2xs">
                  {partner.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {partner.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10.5px] font-bold flex items-center gap-0.5">
                      <ShieldCheck size={11} className="stroke-[3]" />
                      <span>Verified</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {partner.type}
                  </p>
                </div>
              </div>

              <span className="flex items-center text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-lg">
                {partner.rating} <Star size={12} className="ml-1 fill-current" />
              </span>
            </div>

            {/* Address & Logistics Info */}
            <div className="space-y-2 py-1 text-xs text-slate-600 border-y border-slate-100">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-500">
                  <MapPin size={14} className="text-slate-400" />
                  <span>{partner.address}</span>
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50/80 px-2 py-0.5 rounded-md">
                  {partner.distance}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-500">
                <span className="flex items-center gap-2">
                  <Phone size={14} className="text-slate-400" />
                  <span>{partner.phone}</span>
                </span>
                <span className="flex items-center gap-2">
                  <Mail size={14} className="text-slate-400" />
                  <span>{partner.email}</span>
                </span>
              </div>
            </div>

            {/* Impact Metrics Row */}
            <div className="grid grid-cols-2 gap-3 bg-slate-50/70 p-3 rounded-2xl text-center">
              <div>
                <p className="text-[10.5px] font-semibold text-slate-400 uppercase">Donations Completed</p>
                <p className="text-base font-extrabold text-slate-900 mt-0.5">{partner.totalRescues} Pickups</p>
              </div>
              <div className="border-l border-slate-200/80">
                <p className="text-[10.5px] font-semibold text-slate-400 uppercase">Meals Provided</p>
                <p className="text-base font-extrabold text-emerald-700 mt-0.5">{partner.mealsReceived} Meals</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-3 pt-1">
              <span className="text-xs text-slate-400 font-medium">
                Last rescue: <strong className="text-slate-600 font-bold">{partner.recentPickup}</strong>
              </span>

              <button 
                onClick={() => alert(`Connecting with ${partner.name}: ${partner.phone}`)}
                className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Contact Partner
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
