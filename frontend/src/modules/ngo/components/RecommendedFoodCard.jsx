import React from 'react';
import { MapPin, Package, Clock, ShieldCheck, Check, Trophy } from 'lucide-react';
import MatchScoreBadge from '../../common/components/MatchScoreBadge';

export default function RecommendedFoodCard({ 
  donation, 
  matchResult, 
  isBestMatch, 
  onView, 
  onClaim 
}) {
  const urgencyColor = 
    matchResult.urgencyLevel === 'Critical' ? 'text-red-600 bg-red-50' : 
    matchResult.urgencyLevel === 'Urgent' ? 'text-amber-600 bg-amber-50' : 
    'text-green-600 bg-green-50';

  const urgencyDot = 
    matchResult.urgencyLevel === 'Critical' ? 'bg-red-500' : 
    matchResult.urgencyLevel === 'Urgent' ? 'bg-amber-500' : 
    'bg-green-500';

  return (
    <div className={`relative bg-white rounded-3xl border-2 transition-all duration-300 hover:shadow-lg ${
      isBestMatch ? 'border-amber-300 shadow-sm shadow-amber-100' : 'border-slate-100/90'
    }`}>
      {/* Best Match Indicator */}
      {isBestMatch && (
        <div className="absolute -top-3.5 left-6 px-4 py-1.5 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-black uppercase tracking-wider rounded-full shadow-sm shadow-amber-500/30 flex items-center gap-1.5 z-10">
          <Trophy size={14} className="stroke-[2.5]" />
          Best Match
        </div>
      )}

      <div className="p-6">
        {/* Header Section */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="min-w-0">
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight truncate">
              {donation.title}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-sm font-semibold text-slate-500">
              <span>{donation.donor}</span>
              {(!donation.donorTrustScore || donation.donorTrustScore >= 90) && (
                <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-xs font-bold">
                  <ShieldCheck size={12} className="stroke-[2.5]" />
                  Verified
                </span>
              )}
            </div>
          </div>
          <div className="shrink-0">
            <MatchScoreBadge score={matchResult.totalScore} />
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-slate-50 rounded-2xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
              <Package size={16} className="stroke-[2.5]" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Quantity</p>
              <p className="text-sm font-black text-slate-700">{donation.quantity}</p>
            </div>
          </div>
          <div className="bg-slate-50 rounded-2xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center shrink-0">
              <MapPin size={16} className="stroke-[2.5]" />
            </div>
            <div className="truncate">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Location</p>
              <p className="text-sm font-black text-slate-700 truncate">{donation.distance}</p>
            </div>
          </div>
        </div>

        {/* Urgency Alert */}
        <div className={`mb-6 p-3 rounded-2xl flex items-center justify-between ${urgencyColor}`}>
          <div className="flex items-center gap-2">
            <Clock size={16} className="stroke-[2.5]" />
            <span className="text-sm font-bold tracking-tight">Available: {donation.expiresIn}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/60 rounded-lg shadow-sm">
            <span className={`w-2 h-2 rounded-full ${urgencyDot} animate-pulse`} />
            <span className="text-xs font-black uppercase tracking-wider">{matchResult.urgencyLevel}</span>
          </div>
        </div>

        {/* Why this match? */}
        <div className="mb-6">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Why this is a good match:
          </p>
          <div className="space-y-2">
            {Object.entries(matchResult.explanations).map(([key, text]) => {
              // Only show positive matching reasons
              const scoreData = matchResult.breakdown[key];
              if (scoreData.score >= (scoreData.max * 0.5)) {
                return (
                  <div key={key} className="flex items-start gap-2.5">
                    <div className="mt-0.5 w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <Check size={10} className="text-emerald-700 stroke-[3]" />
                    </div>
                    <span className="text-sm font-medium text-slate-600 leading-snug">
                      {text}
                    </span>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3 pt-5 border-t border-slate-100">
          <button 
            onClick={() => onView(donation, matchResult)}
            className="px-4 py-3 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-colors cursor-pointer"
          >
            View Donation
          </button>
          <button 
            onClick={() => onClaim(donation)}
            className="px-4 py-3 bg-[#064e3b] text-white font-bold rounded-xl hover:bg-[#043d2c] transition-colors shadow-xs shadow-emerald-900/20 cursor-pointer"
          >
            Claim Food
          </button>
        </div>
      </div>
    </div>
  );
}
