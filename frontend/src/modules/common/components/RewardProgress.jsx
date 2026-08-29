import React from 'react';
import { Trophy, Gift, ArrowRight } from 'lucide-react';

export default function RewardProgress({ points, tier }) {
  const getNextTier = (currentPoints) => {
    if (currentPoints < 1000) return { name: "Silver", target: 1000 };
    if (currentPoints < 3000) return { name: "Gold", target: 3000 };
    if (currentPoints < 5000) return { name: "Platinum", target: 5000 };
    return { name: "Max Tier", target: 5000 }; // Reached max
  };

  const nextTier = getNextTier(points);
  
  // Calculate percentage for progress bar
  let progress = 100;
  if (points < 5000) {
    const prevTarget = points < 1000 ? 0 : points < 3000 ? 1000 : 3000;
    const range = nextTier.target - prevTarget;
    const currentProgress = points - prevTarget;
    progress = Math.min(100, Math.max(0, (currentProgress / range) * 100));
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-5">
      
      {/* Left side: Current Points & Tier */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
          <Gift size={22} className="text-indigo-600" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              {points.toLocaleString()} <span className="text-sm font-bold text-slate-400">pts</span>
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-600">
              {tier}
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Total Reward Points
          </p>
        </div>
      </div>

      {/* Right side: Progress Bar */}
      <div className="flex-1 w-full sm:max-w-xs space-y-2">
        {points < 5000 ? (
          <>
            <div className="flex justify-between text-[11px] font-bold">
              <span className="text-slate-400 uppercase tracking-wider">Next: {nextTier.name}</span>
              <span className="text-indigo-600">{nextTier.target.toLocaleString()}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
              <div 
                className="h-full bg-indigo-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[10px] text-right text-slate-400 font-medium">
              {(nextTier.target - points).toLocaleString()} points remaining
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center sm:items-end justify-center h-full pt-1">
            <span className="flex items-center gap-1.5 text-sm font-bold text-emerald-600">
              <Trophy size={16} /> Maximum Tier Reached!
            </span>
          </div>
        )}
      </div>

    </div>
  );
}
