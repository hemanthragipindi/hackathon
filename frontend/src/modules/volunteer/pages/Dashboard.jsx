import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useVolunteerData } from '../context/VolunteerDataContext';
import { Truck, MapPin, Clock, ArrowRight, Package, CheckCircle2, Utensils } from 'lucide-react';
import { useReputation } from '../../../context/ReputationContext';
import TrustBadge from '../../common/components/TrustBadge';
import VerificationBadge from '../../common/components/VerificationBadge';

export default function Dashboard() {
  const navigate = useNavigate();
  const { 
    profile: volunteerProfile, // renamed to avoid conflict
    availablePickups, 
    activePickup, 
    pickupHistory,
    acceptPickup
  } = useVolunteerData();

  const { getProfile, calculateTrustScore, addRewardTransaction } = useReputation();
  const profile = getProfile("VOL-1");

  const completedToday = pickupHistory.filter(p => p.date.includes('Aug 28') && p.status === 'Completed').length; // Mock logic for today

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-gray-900">Good morning, {profile?.name.split(' ')[0] || volunteerProfile.name.split(' ')[0]}</h1>
          {profile?.verification && (
            <VerificationBadge verified={profile.verification.verified} verifiedAt={profile.verification.verifiedAt} />
          )}
          {profile?.trust?.metrics && (
            <TrustBadge 
              trustScore={calculateTrustScore(profile.trust.metrics)} 
              metrics={profile.trust.metrics} 
            />
          )}
        </div>
        <p className="text-gray-500 mt-1">Ready to make an impact today?</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3 mt-6">
        <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center items-center text-center">
          <span className="text-2xl font-black text-gray-900">{availablePickups.length + (activePickup ? 1 : 0) + completedToday}</span>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">Today</span>
        </div>
        <div className={`p-3 rounded-xl border shadow-sm flex flex-col justify-center items-center text-center transition-colors ${activePickup ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-white border-gray-200 text-gray-900'}`}>
          <span className="text-2xl font-black">{activePickup ? 1 : 0}</span>
          <span className={`text-xs font-semibold uppercase tracking-wider mt-1 ${activePickup ? 'text-emerald-700' : 'text-gray-500'}`}>Active</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-center items-center text-center">
          <span className="text-2xl font-black text-gray-900">{pickupHistory.length}</span>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">Completed</span>
        </div>
      </div>

      {/* ACTIVE PICKUP (Prioritized) */}
      {activePickup && (
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            Active Pickup
          </h2>
          
          <div className="bg-white rounded-2xl border-2 border-emerald-500 shadow-md overflow-hidden">
            <div className="p-4 bg-emerald-50 border-b border-emerald-100 flex items-start justify-between">
              <div>
                <span className="inline-block px-2 py-1 rounded bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider mb-2">
                  {activePickup.status === 'accepted' ? 'Accepted' : activePickup.status}
                </span>
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  <Package size={18} className="text-emerald-600" />
                  {activePickup.food}
                </h3>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="relative pl-6 space-y-4 border-l-2 border-dashed border-gray-200 ml-2">
                <div className="relative">
                  <div className="absolute -left-[31px] top-1 bg-white border-2 border-emerald-500 rounded-full w-4 h-4 flex items-center justify-center"></div>
                  <p className="text-xs font-bold text-gray-500 uppercase">Pickup From</p>
                  <p className="font-semibold text-gray-900 mt-0.5">{activePickup.donor}</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[31px] top-1 bg-gray-100 border-2 border-gray-300 rounded-full w-4 h-4 flex items-center justify-center"></div>
                  <p className="text-xs font-bold text-gray-500 uppercase">Deliver To</p>
                  <p className="font-semibold text-gray-900 mt-0.5">{activePickup.ngo}</p>
                </div>
              </div>
              
              <button 
                onClick={() => navigate('/volunteer/active-pickup')}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-sm transition-colors active:scale-95">
                Continue Pickup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AVAILABLE PICKUPS */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider flex items-center justify-between">
          <span>Available Pickups</span>
          <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">{availablePickups.length}</span>
        </h2>

        {availablePickups.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center shadow-sm">
            <CheckCircle2 size={32} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-900 font-bold">No pickups available</p>
            <p className="text-gray-500 text-sm mt-1">Check back later for more opportunities in your area.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {availablePickups.map(pickup => (
              <div key={pickup.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:border-emerald-300 transition-colors">
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
                <div className="p-3 bg-gray-50 flex items-center gap-2">
                  <button 
                    onClick={() => addRewardTransaction("VOL-1", "Completed Pickup", 40)}
                    className="px-3 py-2.5 rounded-xl text-xs font-bold bg-indigo-100 hover:bg-indigo-200 text-indigo-700 shadow-sm transition-all active:scale-95 cursor-pointer whitespace-nowrap"
                  >
                    Simulate +40
                  </button>
                  <button 
                    onClick={() => acceptPickup(pickup.id)}
                    disabled={activePickup !== null}
                    className={`flex-1 py-2.5 rounded-xl font-bold shadow-sm transition-all active:scale-95 ${
                      activePickup 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                  >
                    {activePickup ? 'Complete active pickup first' : 'Accept Pickup'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
