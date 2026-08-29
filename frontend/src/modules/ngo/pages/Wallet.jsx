import React, { useState } from 'react';
import { Wallet as WalletIcon, ArrowDownLeft, ArrowUpRight, Plus, Download, ShieldCheck } from 'lucide-react';

export default function Wallet() {
  const transactions = [
    { id: 'TX-901', description: 'Logistics Fuel Grant - Municipal Subsidy', type: 'Credit', amount: '+ ₹15,000', date: 'Oct 24, 2023', status: 'Completed' },
    { id: 'TX-902', description: 'Volunteer Fuel Reimbursement - PK-1024', type: 'Debit', amount: '- ₹850', date: 'Oct 23, 2023', status: 'Completed' },
    { id: 'TX-903', description: 'Food Storage & Insulated Crates Purchase', type: 'Debit', amount: '- ₹4,200', date: 'Oct 20, 2023', status: 'Completed' },
    { id: 'TX-904', description: 'Corporate CSR FoodRescue Support', type: 'Credit', amount: '+ ₹50,000', date: 'Oct 15, 2023', status: 'Completed' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <nav className="text-xs font-medium text-gray-500 mb-2 select-none">
            <span>Home</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700">Wallet & Grants</span>
          </nav>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Logistics Wallet & Grants</h1>
          <p className="text-sm text-gray-500 mt-1">Manage operational rescue credits, fuel allowances, and CSR support funds.</p>
        </div>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-[#064e3b] to-[#043d2c] p-6 rounded-2xl text-white shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between opacity-80 text-xs font-bold uppercase tracking-wider">
              <span>Operational Balance</span>
              <WalletIcon size={18} />
            </div>
            <p className="text-3xl font-black mt-3">₹59,950.00</p>
            <p className="text-xs text-green-200 mt-1">Available for fleet fuel & volunteer allowances</p>
          </div>
          <div className="mt-6 flex items-center gap-2">
            <button className="px-4 py-2 bg-white text-[#064e3b] font-bold text-xs rounded-lg hover:bg-gray-100 transition shadow-xs">
              + Add Funds
            </button>
            <button className="px-4 py-2 bg-white/20 text-white font-bold text-xs rounded-lg hover:bg-white/30 transition">
              Disburse Fuel
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Rescue Credits Earned</span>
            <p className="text-3xl font-black text-gray-900 mt-3">14,280 <span className="text-sm font-bold text-emerald-600">RC</span></p>
            <p className="text-xs text-gray-500 mt-1">Earned via 2,840 kg verified food rescues</p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
            <ShieldCheck size={16} /> Verified Carbon & Hunger Credits
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pending Reimbursals</span>
            <p className="text-3xl font-black text-amber-600 mt-3">₹2,450.00</p>
            <p className="text-xs text-gray-500 mt-1">3 driver receipts submitted for verification</p>
          </div>
          <button className="text-left text-xs font-bold text-[#064e3b] hover:underline">
            Review volunteer receipts →
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Transaction History</h2>
          <button className="flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-gray-900 border border-gray-200 px-3 py-2 rounded-lg shadow-xs">
            <Download size={13} /> Export Statement
          </button>
        </div>
        <div className="divide-y divide-gray-100">
          {transactions.map((tx) => (
            <div key={tx.id} className="p-4 sm:px-6 flex items-center justify-between hover:bg-gray-50/70 transition">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                  tx.type === 'Credit' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {tx.type === 'Credit' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{tx.description}</p>
                  <p className="text-xs text-gray-500">{tx.id} • {tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-black ${
                  tx.type === 'Credit' ? 'text-emerald-700' : 'text-gray-900'
                }`}>
                  {tx.amount}
                </p>
                <span className="text-xs font-semibold text-gray-400">{tx.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
