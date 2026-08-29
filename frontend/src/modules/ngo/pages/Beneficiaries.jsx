import React, { useState } from 'react';
import { Users, Building, MapPin, Phone, Heart, Plus, Search, CheckCircle } from 'lucide-react';

const sheltersData = [
  {
    id: 'BEN-01',
    name: 'Sunshine Community Shelter',
    category: 'Homeless Shelter & Community Kitchen',
    capacity: '120 People',
    mealsServedToday: 180,
    contactPerson: 'Sister Mary / Rajesh Verma',
    phone: '+91 9876501234',
    address: 'East District, Block B, Delhi',
    status: 'High Need',
    statusColor: 'bg-red-100 text-red-700',
  },
  {
    id: 'BEN-02',
    name: 'North District Childrenâ€™s Home',
    category: 'Orphanage & Youth Center',
    capacity: '65 Children',
    mealsServedToday: 130,
    contactPerson: 'Anjali Sharma',
    phone: '+91 9876505678',
    address: 'Sector 9, North Delhi',
    status: 'Served Today',
    statusColor: 'bg-green-100 text-green-700',
  },
  {
    id: 'BEN-03',
    name: 'Hope Care Elderly Home',
    category: 'Senior Citizen Care Foundation',
    capacity: '45 Seniors',
    mealsServedToday: 90,
    contactPerson: 'Dr. S. K. Roy',
    phone: '+91 9876509999',
    address: 'Civil Lines, Delhi',
    status: 'Served Today',
    statusColor: 'bg-green-100 text-green-700',
  },
  {
    id: 'BEN-04',
    name: 'Railway Colony Night Kitchen',
    category: 'Transit Labor & Night Food Relief',
    capacity: '200 Daily Walk-ins',
    mealsServedToday: 210,
    contactPerson: 'Mohan Lal',
    phone: '+91 9876504433',
    address: 'Near Old Railway Station Platform 4',
    status: 'Active Tonight',
    statusColor: 'bg-blue-100 text-blue-700',
  }
];

export default function Beneficiaries() {
  const [shelters, setShelters] = useState(sheltersData);
  const [search, setSearch] = useState('');

  const filtered = shelters.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.address.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <nav className="text-xs font-medium text-gray-500 mb-2 select-none">
            <span>Home</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700">Beneficiaries</span>
          </nav>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Beneficiaries & Shelters</h1>
          <p className="text-sm text-gray-500 mt-1">Shelter centers and vulnerable communities served by Helping Hands NGO.</p>
        </div>
      </div>

      {/* Summary KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <p className="text-xs font-bold text-gray-500 uppercase">Total Partner Centers</p>
          <p className="text-3xl font-black text-gray-900 mt-2">18 Centers</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1">Across 6 municipal zones</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <p className="text-xs font-bold text-gray-500 uppercase">People Served Today</p>
          <p className="text-3xl font-black text-gray-900 mt-2">8,420</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1">â†— 16.8% increase vs last month</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <p className="text-xs font-bold text-gray-500 uppercase">Emergency Hotspots</p>
          <p className="text-3xl font-black text-amber-600 mt-2">3 Shelters</p>
          <p className="text-xs text-gray-500 font-medium mt-1">Awaiting evening meal drop-off</p>
        </div>
      </div>

      {/* Center Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((s) => (
          <div key={s.id} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs hover:shadow-md transition">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase">{s.id}</span>
                <h3 className="text-lg font-bold text-gray-900 mt-0.5">{s.name}</h3>
                <p className="text-xs text-gray-500 font-medium">{s.category}</p>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${s.statusColor}`}>
                {s.status}
              </span>
            </div>

            <div className="mt-5 space-y-2 text-xs text-gray-600 font-medium">
              <div className="flex items-center gap-2">
                <Users size={15} className="text-gray-400 shrink-0" />
                <span>Target Capacity: <strong className="text-gray-900">{s.capacity}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Heart size={15} className="text-red-400 shrink-0" />
                <span>Meals Delivered Today: <strong className="text-emerald-700">{s.mealsServedToday} meals</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={15} className="text-gray-400 shrink-0" />
                <span>{s.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={15} className="text-gray-400 shrink-0" />
                <span>{s.contactPerson} • {s.phone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
