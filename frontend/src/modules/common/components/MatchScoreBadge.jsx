import React from 'react';
import { Target } from 'lucide-react';

export default function MatchScoreBadge({ score, className = '' }) {
  // Determine color based on score
  let bgColor = 'bg-emerald-100';
  let textColor = 'text-emerald-700';
  let iconColor = 'text-emerald-500';

  if (score < 60) {
    bgColor = 'bg-slate-100';
    textColor = 'text-slate-700';
    iconColor = 'text-slate-500';
  } else if (score < 80) {
    bgColor = 'bg-blue-100';
    textColor = 'text-blue-700';
    iconColor = 'text-blue-500';
  }

  return (
    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black ${bgColor} ${textColor} ${className}`}>
      <Target size={14} className={`shrink-0 ${iconColor}`} />
      <span>{score}% Match</span>
    </div>
  );
}
