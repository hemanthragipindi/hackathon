import React, { useState } from 'react';
import { useVolunteerData } from '../context/VolunteerDataContext';
import { Search, MapPin, ArrowRight, Package, CheckCircle2, XCircle } from 'lucide-react';

export default function PickupHistory() {
  const { pickupHistory } = useVolunteerData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All'); // 'All', 'Completed', 'Cancelled'

  const filteredHistory = pickupHistory.filter(pickup => {
    // 1. Filter by tab
    if (filter !== 'All' && pickup.status !== filter) return false;
    
    // 2. Filter by search term
    const term = searchTerm.toLowerCase();
    return (
      pickup.food.toLowerCase().includes(term) ||
      pickup.donor.toLowerCase().includes(term) ||
      pickup.ngo.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6 pb-20 md:pb-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pickup History</h1>
        <p className="text-gray-500 mt-1">Review your completed and cancelled pickups.</p>
      </div>

      {/* Search Bar */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Search history..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm shadow-sm"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-gray-200/50 p-1 rounded-xl">
        {['All', 'Completed', 'Cancelled'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
              filter === f 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* History List */}
      <div className="space-y-4">
        {filteredHistory.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <Package size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-900 font-bold">No history found</p>
            <p className="text-gray-500 text-sm mt-1">Try adjusting your filters.</p>
          </div>
        ) : (
          filteredHistory.map((pickup, index) => (
            <div key={`${pickup.id}-${index}`} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden group">
              <div className="p-4 border-b border-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                    {pickup.status === 'Completed' ? (
                      <CheckCircle2 size={20} className="text-emerald-500" />
                    ) : (
                      <XCircle size={20} className="text-gray-400" />
                    )}
                    {pickup.food}
                  </h3>
                  <span className="text-gray-500 text-sm font-medium">
                    {pickup.date}
                  </span>
                </div>
                
                <div className="space-y-2 mt-3 pl-7 border-l-2 border-gray-100 ml-[9px]">
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">From</p>
                    <p className="text-sm font-semibold text-gray-900">{pickup.donor}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">To</p>
                    <p className="text-sm font-semibold text-gray-900">{pickup.ngo}</p>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-gray-50 flex justify-between items-center px-4">
                <span className="text-sm font-medium text-gray-500">
                  Pickup #{pickup.id}
                </span>
                <span className={`text-xs font-bold px-2 py-1 rounded-lg uppercase tracking-wider ${
                  pickup.status === 'Completed' 
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  {pickup.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
