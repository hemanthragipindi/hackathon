import React from 'react';
import { MapPin, Package, Clock, ShieldCheck, Star, Info, Check } from 'lucide-react';
import MatchScoreBadge from './MatchScoreBadge';

export default function NGOMatchCard({ 
  ngo, 
  matchResult, 
  isBestMatch, 
  onView, 
  onNotify, 
  notified 
}) {
  const { totalScore, explanations, breakdown } = matchResult;

  return (
    <div className={`bg-white rounded-2xl border ${isBestMatch ? 'border-emerald-500 shadow-md ring-1 ring-emerald-500/20' : 'border-slate-200 shadow-xs'} overflow-hidden relative flex flex-col`}>
      {isBestMatch && (
        <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-bl-xl shadow-sm">
          Best Match
        </div>
      )}
      
      <div className="p-5 flex-1">
        <div className="flex items-start justify-between mb-4 pr-16">
          <div>
            <h3 className="text-lg font-bold text-slate-900 leading-tight">{ngo.name}</h3>
            {ngo.verified && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 uppercase tracking-wide mt-1">
                <ShieldCheck size={12} className="fill-emerald-100" /> Verified
              </span>
            )}
          </div>
        </div>

        <div className="mb-5">
          <MatchScoreBadge score={totalScore} />
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="flex items-center gap-2 text-slate-600 bg-slate-50 p-2 rounded-lg">
            <MapPin size={16} className="text-slate-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-900 truncate">{ngo.distance} km away</p>
              <p className="text-[10px] font-medium text-slate-500 truncate">{ngo.locationName}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-slate-600 bg-slate-50 p-2 rounded-lg">
            <Star size={16} className="text-yellow-400 fill-yellow-400 shrink-0" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-900">Score {ngo.trustScore}/100</p>
              <p className="text-[10px] font-medium text-slate-500">Reputation</p>
            </div>
          </div>
        </div>

        {/* Why this match? */}
        <div className="bg-emerald-50/50 rounded-xl p-3 border border-emerald-100/50">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Info size={12} className="text-emerald-500" /> Why this match?
          </p>
          <ul className="space-y-1.5">
            {breakdown.location.score > 15 && (
              <li className="flex items-start gap-1.5 text-xs text-slate-700 font-medium">
                <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>{explanations.location}</span>
              </li>
            )}
            {breakdown.foodNeed.score > 10 && (
              <li className="flex items-start gap-1.5 text-xs text-slate-700 font-medium">
                <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>{explanations.foodNeed}</span>
              </li>
            )}
            {breakdown.capacity.score > 0 && (
              <li className="flex items-start gap-1.5 text-xs text-slate-700 font-medium">
                <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>{explanations.capacity}</span>
              </li>
            )}
            {breakdown.availability.score > 0 && (
              <li className="flex items-start gap-1.5 text-xs text-slate-700 font-medium">
                <Check size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                <span>{explanations.availability}</span>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3">
        <button 
          onClick={onView}
          className="flex-1 bg-white text-slate-700 font-bold text-sm py-2 rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
        >
          View NGO
        </button>
        <button 
          onClick={onNotify}
          disabled={notified}
          className={`flex-1 font-bold text-sm py-2 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 ${
            notified 
              ? 'bg-emerald-100 text-emerald-700 cursor-not-allowed border border-emerald-200' 
              : 'bg-slate-900 text-white hover:bg-slate-800'
          }`}
        >
          {notified ? (
            <>
              <Check size={16} /> Notified
            </>
          ) : 'Notify NGO'}
        </button>
      </div>
    </div>
  );
}
