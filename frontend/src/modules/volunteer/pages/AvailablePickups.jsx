import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Clock, ArrowRight, Package, SlidersHorizontal, Utensils } from 'lucide-react';
import { useVolunteerData } from '../context/VolunteerDataContext';
import PickupDetailModal from '../components/PickupDetailModal';

export default function AvailablePickups() {
  const { availablePickups, activePickup, acceptPickup } = useVolunteerData();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPickup, setSelectedPickup] = useState(null);

  // Filter pickups
  const filteredPickups = availablePickups.filter(pickup => {
    const term = searchTerm.toLowerCase();
    return (
      pickup.food.toLowerCase().includes(term) ||
      pickup.donor.toLowerCase().includes(term) ||
      pickup.ngo.toLowerCase().includes(term)
    );
  });

  const handleAccept = (pickupId) => {
    acceptPickup(pickupId);
    // Navigate back to dashboard to show active pickup
    navigate('/volunteer/dashboard');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Available Pickups</h1>
        <p className="text-gray-500 mt-1">Find and claim food pickups near you.</p>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by food, donor, or NGO..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm shadow-sm"
          />
        </div>
        <button className="p-3 bg-white border border-gray-200 rounded-xl text-gray-600 shadow-sm hover:bg-gray-50 active:scale-95 transition-all">
          <SlidersHorizontal size={20} />
        </button>
      </div>

      {/* Active Pickup Warning */}
      {activePickup && (
        <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
          <p className="text-orange-800 text-sm font-medium">
            You currently have an active pickup. You must complete it before accepting a new one.
          </p>
        </div>
      )}

      {/* List */}
      <div className="space-y-4">
        {filteredPickups.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200 shadow-sm">
            <Package size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-900 font-bold">No pickups found</p>
            <p className="text-gray-500 text-sm mt-1">Try adjusting your search criteria.</p>
          </div>
        ) : (
          filteredPickups.map(pickup => (
            <div key={pickup.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:border-emerald-300 transition-colors group">
              <div className="p-4 border-b border-gray-50">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                    <Utensils className="text-emerald-600" size={20} /> {pickup.food}
                  </h3>
                  <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded-lg">
                    {pickup.distance}
                  </span>
                </div>
                
                <div className="space-y-1 mt-3">
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    <MapPin size={14} className="text-gray-400 shrink-0" /> 
                    <span className="font-medium truncate">{pickup.donor}</span>
                  </p>
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    <ArrowRight size={14} className="text-gray-400 shrink-0" />
                    <span className="truncate">{pickup.ngo}</span>
                  </p>
                  <p className="text-sm text-gray-700 flex items-center gap-2">
                    <Clock size={14} className="text-gray-400 shrink-0" />
                    <span>{pickup.timeWindow}</span>
                  </p>
                </div>
              </div>
              <div className="p-3 bg-gray-50 flex gap-2">
                <button 
                  onClick={() => setSelectedPickup(pickup)}
                  className="flex-1 py-2.5 rounded-xl font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-100 transition-colors shadow-sm active:scale-95"
                >
                  View Details
                </button>
                <button 
                  onClick={() => handleAccept(pickup.id)}
                  disabled={activePickup !== null}
                  className={`flex-1 py-2.5 rounded-xl font-bold transition-all shadow-sm active:scale-95 ${
                    activePickup 
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  }`}
                >
                  Accept
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <PickupDetailModal 
        pickup={selectedPickup} 
        isOpen={!!selectedPickup} 
        onClose={() => setSelectedPickup(null)} 
        onAccept={handleAccept}
        activePickupExists={activePickup !== null}
      />
    </div>
  );
}
