import React, { useState } from 'react';
import { FileText, Clock, CheckCircle2, Truck, AlertCircle } from 'lucide-react';
import { claimsData } from '../../../data/mockData';

export default function MyClaims() {
  const [claims] = useState(claimsData);

  return (
    <div className="space-y-6 pb-12">
      <div>
        <nav className="text-xs font-medium text-gray-500 mb-2 select-none">
          <span>Home</span>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-700">My Claims</span>
        </nav>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Claimed Food Donations</h1>
        <p className="text-sm text-gray-500 mt-1">History of claims processed and fulfilled by Helping Hands NGO.</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                <th className="py-3 px-6">Claim ID</th>
                <th className="py-3 px-6">Donor</th>
                <th className="py-3 px-6">Food ID</th>
                <th className="py-3 px-6">Pickup Status</th>
                <th className="py-3 px-6">Claim Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {claims.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/70 transition">
                  <td className="py-4 px-6 font-bold text-gray-900">{c.id}</td>
                  <td className="py-4 px-6 font-semibold text-gray-800">{c.donor}</td>
                  <td className="py-4 px-6 text-gray-600 font-mono text-xs">{c.foodId}</td>
                  <td className="py-4 px-6">
                    <span className="inline-block text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {c.pickupStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-block text-xs font-bold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700">
                      {c.claimStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
