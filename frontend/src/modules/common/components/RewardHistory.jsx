import React from 'react';
import { Clock, PlusCircle } from 'lucide-react';

export default function RewardHistory({ transactions = [] }) {
  if (transactions.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs">
      <h3 className="text-sm font-extrabold text-slate-900 mb-4 flex items-center gap-2">
        <Clock size={16} className="text-indigo-500" />
        Points History
      </h3>
      <div className="space-y-3">
        {transactions.slice(0, 5).map(tx => (
          <div key={tx.id} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0 last:pb-0">
            <div>
              <p className="text-sm font-bold text-slate-800">{tx.action}</p>
              <p className="text-xs text-slate-400">
                {new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            <div className="flex items-center gap-1 bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md text-xs font-bold">
              <PlusCircle size={12} />
              {tx.points} pts
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
