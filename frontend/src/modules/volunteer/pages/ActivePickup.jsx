import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVolunteerData } from '../context/VolunteerDataContext';
import { ArrowLeft, MapPin, Building2, Package, CheckCircle2, Navigation, Clock, Truck, ShieldAlert, Utensils } from 'lucide-react';

export default function ActivePickup() {
  const { activePickup, updatePickupStatus, completeActivePickup } = useVolunteerData();
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  if (!activePickup) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4 animate-fadeIn">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mx-auto">
          <CheckCircle2 size={40} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">No Active Pickup</h2>
          <p className="text-gray-500 mt-2 max-w-xs mx-auto">You don't have any ongoing pickups right now.</p>
        </div>
        <button 
          onClick={() => navigate('/volunteer/pickups')}
          className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 shadow-sm active:scale-95 transition-all mt-4"
        >
          Find Pickups
        </button>
      </div>
    );
  }

  const getActionConfig = () => {
    switch (activePickup.status) {
      case 'accepted': return { text: 'Start Pickup', next: 'en_route', color: 'bg-emerald-600 hover:bg-emerald-700' };
      case 'en_route': return { text: "I've Arrived at Donor", next: 'arrived', color: 'bg-blue-600 hover:bg-blue-700' };
      case 'arrived': return { text: 'Food Picked Up', next: 'picked_up', color: 'bg-emerald-600 hover:bg-emerald-700' };
      case 'picked_up': return { text: 'Start Delivery', next: 'delivering', color: 'bg-purple-600 hover:bg-purple-700' };
      case 'delivering': return { text: "I've Arrived at NGO", next: 'arrived_ngo', color: 'bg-blue-600 hover:bg-blue-700' };
      case 'arrived_ngo': return { text: 'Mark Delivered', next: 'delivered', color: 'bg-emerald-600 hover:bg-emerald-700', requireConfirm: true };
      case 'delivered': return { text: 'Finish & Go Home', next: 'complete', color: 'bg-gray-900 hover:bg-gray-800' };
      default: return { text: 'Start Pickup', next: 'en_route', color: 'bg-emerald-600 hover:bg-emerald-700' };
    }
  };

  const action = getActionConfig();

  const handleActionClick = () => {
    if (action.requireConfirm) {
      setShowConfirmModal(true);
    } else if (action.next === 'complete') {
      completeActivePickup();
      navigate('/volunteer/dashboard');
    } else {
      updatePickupStatus(action.next);
    }
  };

  const handleConfirmDelivery = () => {
    updatePickupStatus('delivered');
    setShowConfirmModal(false);
  };

  // Helper to determine active step in the timeline
  const getStepStatus = (stepIndex) => {
    const statusOrder = ['accepted', 'en_route', 'arrived', 'picked_up', 'delivering', 'arrived_ngo', 'delivered'];
    const currentIndex = statusOrder.indexOf(activePickup.status);
    
    if (currentIndex > stepIndex) return 'completed';
    if (currentIndex === stepIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="space-y-6 pb-20 md:pb-6 relative animate-fadeIn">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => navigate('/volunteer/dashboard')}
          className="p-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 active:scale-95 transition-all"
        >
          <ArrowLeft size={20} className="text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Active Pickup</h1>
      </div>

      {/* Main Card */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-md overflow-hidden">
        
        {/* Top Section */}
        <div className="p-5 bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-b border-emerald-100">
          <div className="flex justify-between items-start">
            <div>
              <span className="inline-block px-2.5 py-1 rounded bg-white text-emerald-800 text-xs font-black uppercase tracking-wider mb-3 shadow-sm">
                Pickup #{activePickup.id}
              </span>
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                <Utensils size={32} className="text-emerald-600" /> {activePickup.food}
              </h2>
            </div>
          </div>
        </div>

        {/* Info & Map Placards */}
        <div className="p-5 space-y-5">
          {/* Timeline / Progress */}
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <div className="flex items-center justify-between text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
              <span>Status</span>
              <span className="text-emerald-600">{activePickup.status.replace('_', ' ')}</span>
            </div>
            
            <div className="relative pl-6 space-y-6 border-l-2 border-emerald-200 ml-2">
              
              {/* Donor Step */}
              <div className="relative">
                <div className={`absolute -left-[31px] top-1 rounded-full w-4 h-4 flex items-center justify-center border-2 transition-colors ${
                  getStepStatus(1) === 'completed' || getStepStatus(1) === 'current' ? 'bg-emerald-500 border-emerald-500' : 'bg-white border-gray-300'
                }`}>
                  {getStepStatus(1) === 'completed' && <CheckCircle2 size={12} className="text-white absolute" />}
                </div>
                <div className={getStepStatus(1) === 'current' ? 'opacity-100' : 'opacity-50'}>
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Pickup From</p>
                  <p className="font-bold text-gray-900 text-lg mt-0.5">{activePickup.donor}</p>
                  <p className="text-sm text-gray-500 font-medium">{activePickup.distance} • {activePickup.timeWindow}</p>
                </div>
              </div>

              {/* Delivery Step */}
              <div className="relative">
                <div className={`absolute -left-[31px] top-1 rounded-full w-4 h-4 flex items-center justify-center border-2 transition-colors ${
                  getStepStatus(4) === 'completed' || getStepStatus(4) === 'current' ? 'bg-purple-500 border-purple-500' : 'bg-white border-gray-300'
                }`}>
                  {getStepStatus(4) === 'completed' && <CheckCircle2 size={12} className="text-white absolute" />}
                </div>
                <div className={getStepStatus(4) === 'current' || getStepStatus(4) === 'completed' ? 'opacity-100' : 'opacity-50'}>
                  <p className="text-xs font-bold text-purple-600 uppercase tracking-wider">Deliver To</p>
                  <p className="font-bold text-gray-900 text-lg mt-0.5">{activePickup.ngo}</p>
                  <p className="text-sm text-gray-500 font-medium">Recipient awaits delivery</p>
                </div>
              </div>

            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-colors">
              <Navigation size={18} />
              Navigate
            </button>
            <button className="flex items-center justify-center gap-2 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold transition-colors">
              <ShieldAlert size={18} />
              Report Issue
            </button>
          </div>
          
        </div>

        {/* Action Button Container */}
        <div className="p-5 border-t border-gray-100 bg-white">
          <button 
            onClick={handleActionClick}
            className={`w-full py-4 text-white rounded-2xl font-black text-lg transition-all shadow-md active:scale-95 ${action.color} flex items-center justify-center gap-2`}
          >
            {activePickup.status === 'delivered' ? <CheckCircle2 size={24} /> : <Truck size={24} className="animate-pulse" />}
            {action.text}
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl p-6 text-center animate-slideUp">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-2">Complete Delivery?</h2>
            <p className="text-gray-600 mb-6">
              You are about to mark <span className="font-bold text-gray-900">{activePickup.food}</span> as delivered to <span className="font-bold text-gray-900">{activePickup.ngo}</span>.
            </p>
            <div className="space-y-3">
              <button 
                onClick={handleConfirmDelivery}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-sm active:scale-95 transition-all"
              >
                Confirm Delivery
              </button>
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="w-full py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold active:scale-95 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
