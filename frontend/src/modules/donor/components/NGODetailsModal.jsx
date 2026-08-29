import React from 'react';
import { X, MapPin, Package, ShieldCheck, Star, Activity, Check, Info } from 'lucide-react';
import MatchScoreBadge from '../../common/components/MatchScoreBadge';

export default function NGODetailsModal({ 
  ngo, 
  matchResult, 
  onClose, 
  onNotify, 
  notified 
}) {
  if (!ngo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
      <div 
        className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{ngo.name}</h2>
            {ngo.verified && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 uppercase tracking-wide mt-1">
                <ShieldCheck size={14} className="fill-emerald-100" /> Verified Organization
              </span>
            )}
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {/* Match Score prominent section */}
          <div className="flex items-center justify-between mb-6 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
            <div>
              <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">Recommendation</p>
              <MatchScoreBadge score={matchResult.totalScore} className="scale-110 origin-left" />
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Status</p>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-white border border-slate-200 text-slate-700 shadow-sm">
                <span className={`w-1.5 h-1.5 rounded-full ${ngo.availability ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                {ngo.availability ? 'Available' : 'Busy'}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Location & Trust */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <MapPin size={12} /> Location
                </p>
                <p className="text-sm font-semibold text-slate-900">{ngo.distance} km away</p>
                <p className="text-xs text-slate-500">{ngo.locationName}</p>
              </div>
              
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Star size={12} /> Trust Score
                </p>
                <p className="text-sm font-semibold text-slate-900">{ngo.trustScore} / 100</p>
                <p className="text-xs text-slate-500">Based on past rescues</p>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Capacity & Needs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Package size={12} /> Current Need
                </p>
                <p className="text-sm font-semibold text-slate-900">{ngo.currentNeed} meals</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {ngo.foodNeeds.slice(0, 3).map(need => (
                    <span key={need} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-semibold capitalize">
                      {need}
                    </span>
                  ))}
                  {ngo.foodNeeds.length > 3 && (
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-semibold">
                      +{ngo.foodNeeds.length - 3} more
                    </span>
                  )}
                </div>
              </div>
              
              <div>
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Activity size={12} /> Total Capacity
                </p>
                <p className="text-sm font-semibold text-slate-900">{ngo.capacity} meals max</p>
              </div>
            </div>

            <hr className="border-slate-100" />

            {/* Stats */}
            <div>
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3">Platform History</p>
              <div className="flex gap-6">
                <div>
                  <p className="text-xl font-black text-slate-900">{ngo.successfulClaims}</p>
                  <p className="text-[11px] font-medium text-slate-500">Successful Claims</p>
                </div>
                <div>
                  <p className="text-xl font-black text-slate-900">{ngo.completedPickups}</p>
                  <p className="text-[11px] font-medium text-slate-500">Completed Pickups</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-bold text-sm text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
          >
            Close
          </button>
          <button 
            onClick={onNotify}
            disabled={notified}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm flex items-center justify-center gap-2 ${
              notified 
                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200 cursor-not-allowed' 
                : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            {notified ? (
              <>
                <Check size={18} /> Notification Sent
              </>
            ) : 'Notify NGO'}
          </button>
        </div>
      </div>
    </div>
  );
}
