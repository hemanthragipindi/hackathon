import React from 'react';
import { MapPin, Clock, Package, Building2, User, X } from 'lucide-react';

export default function PickupDetailModal({ pickup, isOpen, onClose, onAccept, activePickupExists }) {
  if (!isOpen || !pickup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-slideUp">
        
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <h2 className="text-lg font-bold text-gray-900">Pickup #{pickup.id}</h2>
          <button 
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-6">
          
          <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-100">
            <h3 className="font-bold text-xl flex items-center gap-2 mb-1">
              <span className="text-2xl">🍱</span> {pickup.food}
            </h3>
            <p className="text-emerald-700 font-medium flex items-center gap-2 text-sm">
              <Clock size={16} /> Pickup Window: {pickup.timeWindow}
            </p>
          </div>

          <div className="space-y-5">
            {/* Donor / Source */}
            <div className="flex items-start gap-3">
              <div className="mt-1 bg-blue-100 text-blue-600 p-2 rounded-lg shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pickup From</p>
                <p className="font-bold text-gray-900">{pickup.donor}</p>
                <p className="text-sm text-gray-600 mt-0.5">123 Donor Street, Local Area</p>
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 mt-1">
                  Open in Maps
                </button>
              </div>
            </div>

            {/* NGO / Destination */}
            <div className="flex items-start gap-3">
              <div className="mt-1 bg-purple-100 text-purple-600 p-2 rounded-lg shrink-0">
                <Building2 size={18} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Deliver To</p>
                <p className="font-bold text-gray-900">{pickup.ngo}</p>
                <p className="text-sm text-gray-600 mt-0.5">45 Charity Road, Safe Zone</p>
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 mt-1">
                  Open in Maps
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl font-bold text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button 
            onClick={() => {
              onAccept(pickup.id);
              onClose();
            }}
            disabled={activePickupExists}
            className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all shadow-sm ${
              activePickupExists 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-95'
            }`}
          >
            {activePickupExists ? 'Cannot Accept' : 'Accept Pickup'}
          </button>
        </div>

      </div>
    </div>
  );
}
