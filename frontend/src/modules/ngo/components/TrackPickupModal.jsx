import React from 'react';
import { X, Truck, CheckCircle2, Clock, MapPin, Phone, User, ShieldCheck } from 'lucide-react';

export default function TrackPickupModal({ pickup, isOpen, onClose }) {
  if (!isOpen || !pickup) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center font-bold">
            <Truck size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Live Pickup Tracking</h3>
            <p className="text-xs text-gray-500">Route #{pickup.id || 'PK-1024'} â€¢ Status: <span className="font-semibold text-green-700">{pickup.status}</span></p>
          </div>
        </div>

        {/* Status card */}
        <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-xl mb-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Estimated Delivery</span>
            <span className="text-sm font-bold text-emerald-800">8 mins remaining</span>
          </div>
          <p className="text-base font-bold text-gray-900 mt-1">{pickup.title} â€¢ {pickup.donor}</p>
          <p className="text-xs text-gray-600 mt-0.5">Scheduled for: {pickup.time}</p>
        </div>

        {/* Timeline Steps */}
        <div className="relative pl-6 space-y-5 my-6 border-l-2 border-green-300 ml-3">
          <div className="relative">
            <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-green-600 ring-4 ring-green-100"></div>
            <p className="text-xs font-bold text-gray-900">Claim Confirmed</p>
            <p className="text-xs text-gray-500">Helping Hands NGO claimed food listing</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-green-600 ring-4 ring-green-100"></div>
            <p className="text-xs font-bold text-gray-900">Volunteer Dispatched</p>
            <p className="text-xs text-gray-500">Rahul Kumar assigned to pickup vehicle #3</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-amber-500 ring-4 ring-amber-100 animate-pulse"></div>
            <p className="text-xs font-bold text-gray-900">En Route to Donor</p>
            <p className="text-xs text-gray-500">Heading towards ABC Restaurant (ETA 8 mins)</p>
          </div>
          <div className="relative opacity-50">
            <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-gray-300"></div>
            <p className="text-xs font-bold text-gray-600">Distribution at Shelter</p>
            <p className="text-xs text-gray-400">Scheduled arrival at Sunshine Community Shelter</p>
          </div>
        </div>

        {/* Volunteer Info Card */}
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">
              RK
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Rahul Kumar</p>
              <p className="text-xs text-gray-500">Verified Volunteer Driver</p>
            </div>
          </div>
          <a
            href="tel:+919876543213"
            className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-semibold shadow-xs"
          >
            <Phone size={13} className="text-green-700" />
            Call
          </a>
        </div>

        <div className="mt-5 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
