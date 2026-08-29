import React, { useState, useRef, useEffect } from 'react';
import { Star, ShieldAlert, CheckCircle, Info } from 'lucide-react';

export default function TrustBadge({ trustScore, metrics }) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef(null);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={popoverRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200/60 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/30"
        aria-label="View Trust Score details"
      >
        <Star size={14} className="fill-amber-400 text-amber-500" />
        <span className="text-xs font-bold text-amber-900">
          {trustScore}/100
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-50 top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="text-sm font-extrabold text-slate-900">Trust Score</h4>
              <p className="text-xs text-slate-500 font-medium">Based on historical reliability</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
              <span className="text-sm font-black text-amber-600">{trustScore}</span>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600 font-medium">Completion Rate</span>
              <span className="font-bold text-slate-900">{metrics.completionRate}%</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600 font-medium">Cancellation Rate</span>
              <span className="font-bold text-slate-900">{metrics.cancellationRate}%</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600 font-medium">On-Time Rate</span>
              <span className="font-bold text-slate-900">{metrics.onTimeRate}%</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600 font-medium">Community Feedback</span>
              <span className="font-bold text-slate-900">{metrics.positiveFeedback}%</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-start gap-2 text-[11px] text-slate-500 leading-tight">
            <Info size={14} className="shrink-0 text-slate-400 mt-0.5" />
            <p>
              Your trust score is derived algorithmically from your underlying behavioral metrics. Higher scores increase your priority in matching.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
