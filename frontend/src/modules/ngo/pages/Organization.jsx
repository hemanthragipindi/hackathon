import React from 'react';
import { Building2, ShieldCheck, Mail, Phone, MapPin, Users, Award, FileText } from 'lucide-react';

export default function Organization() {
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <nav className="text-xs font-medium text-gray-500 mb-2 select-none">
          <span>Home</span>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-700">Organization Profile</span>
        </nav>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Helping Hands NGO</h1>
        <p className="text-sm text-gray-500 mt-1">Verified Non-Profit Food Rescue Organization profile, compliance, and team.</p>
      </div>

      {/* Main Info Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#064e3b] to-[#15803d] text-white flex items-center justify-center text-2xl font-black shadow-md">
              HH
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-gray-900">Helping Hands NGO</h2>
                <span className="flex items-center gap-1 text-xs font-bold px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  <ShieldCheck size={14} /> Verified Non-Profit
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">Registration No: NGO-DL-2018-847291 â€¢ Food Safety Licensed</p>
            </div>
          </div>

          <button className="px-4 py-2 bg-[#064e3b] hover:bg-[#043d2c] text-white text-xs font-bold rounded-xl shadow-xs transition">
            Edit Profile
          </button>
        </div>

        {/* Contact Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6 border-b border-gray-100">
          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-400 uppercase">Primary Contact</span>
            <p className="text-sm font-bold text-gray-900">Amit Shah (Director of Operations)</p>
            <p className="text-xs text-gray-600 flex items-center gap-2"><Mail size={13} /> contact@helpinghands.ngo</p>
            <p className="text-xs text-gray-600 flex items-center gap-2"><Phone size={13} /> +91 9876543210</p>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-400 uppercase">Operational Headquarters</span>
            <p className="text-sm font-bold text-gray-900">Central Food Bank & Logistics Base</p>
            <p className="text-xs text-gray-600 flex items-center gap-2"><MapPin size={13} /> Plot 44, Okhla Industrial Area Phase III, New Delhi 110020</p>
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-gray-400 uppercase">Active Logistics Capacity</span>
            <p className="text-sm font-bold text-gray-900">4 Refrigerated Vans â€¢ 12 Volunteers</p>
            <p className="text-xs text-emerald-700 font-semibold">Capacity: ~1,500 kg / day</p>
          </div>
        </div>

        {/* Core Team Members */}
        <div className="pt-6">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Authorized Team Members</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl border border-gray-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                AS
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Amit Shah</p>
                <p className="text-xs text-gray-500">Director of Operations</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-sm">
                RK
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Rahul Kumar</p>
                <p className="text-xs text-gray-500">Fleet Lead & Dispatcher</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-gray-200 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center font-bold text-sm">
                PS
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Priya Singh</p>
                <p className="text-xs text-gray-500">Community Outreach Lead</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
