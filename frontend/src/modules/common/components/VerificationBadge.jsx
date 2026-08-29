import React from 'react';
import { ShieldCheck, ShieldAlert } from 'lucide-react';

export default function VerificationBadge({ verified, verifiedAt }) {
  if (!verified) {
    return (
      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-full text-slate-500">
        <ShieldAlert size={14} className="text-slate-400" />
        <span className="text-[10px] font-bold uppercase tracking-wider">Unverified</span>
      </div>
    );
  }

  return (
    <div 
      className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 border border-emerald-200/50 rounded-full text-emerald-700 shadow-[0_1px_2px_rgba(0,0,0,0.02)] cursor-default"
      title={`Verified Identity since ${new Date(verifiedAt).toLocaleDateString()}`}
    >
      <ShieldCheck size={14} className="text-emerald-500" />
      <span className="text-[10px] font-bold uppercase tracking-wider">Verified</span>
    </div>
  );
}
