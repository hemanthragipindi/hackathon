import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Utensils, Search, Clock, MapPin, Globe } from 'lucide-react';
import { foodData } from '../data/foodData';

export default function Hub() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const basePath = location.pathname.startsWith('/ngo') ? '/ngo' : '/donor';

  const categories = ['All', 'Prepared Meal', 'Cooked Hot Food', 'Packaged Food', 'Bakery', 'Raw Produce'];

  const filteredItems = foodData.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.foodType === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.donor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-1">
        <div>
          <nav className="text-xs font-medium text-slate-500 mb-2 select-none">
            <span>Home</span>
            <span className="mx-2 text-slate-400">/</span>
            <span className="text-slate-700">Food Hub</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <Globe className="text-emerald-600" size={28} />
            Community Food Hub
          </h1>
          <p className="text-sm text-slate-500 mt-2">
            A global view of all surplus food listings available across the network.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100/90 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search dish, donor, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Food Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl p-6 border border-slate-100/90 shadow-xs hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-bold px-3 py-2 rounded-lg bg-emerald-50 text-emerald-700">
                  {item.distance}
                </span>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-100/50 px-3 py-2 rounded-lg">
                  {item.expiresIn}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mt-4 leading-snug">{item.title}</h3>
              <p className="text-sm font-semibold text-emerald-700 mt-1">{item.donor}</p>

              <div className="mt-5 space-y-3 text-[13.5px] text-slate-600 font-medium">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-slate-50 flex items-center justify-center shrink-0">
                    <Utensils size={14} className="text-slate-400" />
                  </div>
                  <span>Quantity: <strong className="text-slate-800">{item.quantity}</strong> ({item.foodType})</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-slate-50 flex items-center justify-center shrink-0">
                    <Clock size={14} className="text-slate-400" />
                  </div>
                  <span>Pickup: {item.pickupTime}</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-md bg-slate-50 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={14} className="text-slate-400" />
                  </div>
                  <span className="leading-snug">{item.location}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-100/80">
              <Link
                to={`${basePath}/hub/${item.id}`}
                className="w-full py-2 px-4 h-10 rounded-lg text-sm font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors shadow-xs cursor-pointer flex items-center justify-center"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
