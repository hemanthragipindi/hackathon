import React, { useState } from 'react';
import { Truck, MapPin, Clock, User, Phone, CheckCircle2, AlertCircle, Plus, Search, Navigation, ShieldCheck } from 'lucide-react';
import AssignPickupModal from '../components/AssignPickupModal';
import TrackPickupModal from '../components/TrackPickupModal';

const initialOperations = [
  {
    id: 'PK-101',
    title: '75 meals • Vegetarian Biryani',
    donor: 'ABC Restaurant',
    ngoDestination: 'Sunshine Community Shelter',
    time: '10:30 AM',
    driver: 'Rahul Kumar',
    driverPhone: '+91 9876543213',
    status: 'En Route',
    statusBadge: 'bg-green-100 text-green-700',
    eta: '8 mins',
    route: 'Route #2 - West Corridor',
  },
  {
    id: 'PK-102',
    title: '50 meals • Sandwiches & Snacks',
    donor: 'Green Hotel',
    ngoDestination: 'North District Orphanage',
    time: '12:00 PM',
    driver: 'Unassigned',
    driverPhone: '-',
    status: 'Needs Assignment',
    statusBadge: 'bg-yellow-100 text-yellow-800',
    eta: 'Pending Driver',
    route: 'Route #1 - Downtown',
  },
  {
    id: 'PK-103',
    title: '100 meals • Buffet Lunch',
    donor: 'City Event Hall',
    ngoDestination: 'Hope Care Elderly Home',
    time: '2:30 PM',
    driver: 'Priya Singh',
    driverPhone: '+91 9876543212',
    status: 'Scheduled',
    statusBadge: 'bg-blue-100 text-blue-700',
    eta: 'Scheduled',
    route: 'Route #3 - South Hub',
  },
  {
    id: 'PK-104',
    title: '60 kg • Fresh Vegetables',
    donor: 'Fresh Mart Supermarket',
    ngoDestination: 'Community Kitchen Hub',
    time: '4:00 PM',
    driver: 'Anil Desai',
    driverPhone: '+91 9876543214',
    status: 'Scheduled',
    statusBadge: 'bg-blue-100 text-blue-700',
    eta: 'Scheduled',
    route: 'Route #5 - Outer Ring',
  }
];

export default function Operations() {
  const [operations, setOperations] = useState(initialOperations);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedPickupForAssign, setSelectedPickupForAssign] = useState(null);
  const [selectedPickupForTrack, setSelectedPickupForTrack] = useState(null);

  const handleAssign = (pickupId, volunteerName) => {
    setOperations(prev => prev.map(op => {
      if (op.id === pickupId) {
        return {
          ...op,
          driver: volunteerName,
          status: 'Scheduled',
          statusBadge: 'bg-blue-100 text-blue-700',
          eta: 'Scheduled'
        };
      }
      return op;
    }));
  };

  const filteredOperations = operations.filter(op => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'En Route') return op.status === 'En Route';
    if (selectedFilter === 'Needs Assignment') return op.status === 'Needs Assignment';
    if (selectedFilter === 'Scheduled') return op.status === 'Scheduled';
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <nav className="text-xs font-medium text-gray-500 mb-2 select-none">
          <span>Home</span>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-700">Pickup Logistics</span>
        </nav>
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Pickup Logistics & Dispatches</h1>
        <p className="text-sm text-gray-500 mt-1">Manage and assign food rescue dispatches, monitor active routes, and track volunteer drivers.</p>
      </div>

      {/* 3 Operational KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase">Active En Route</p>
            <p className="text-2xl font-black text-emerald-700 mt-1">1 Vehicle</p>
            <p className="text-xs text-gray-500 mt-0.5">Route #2 • ETA 8 mins</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Truck size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase">Needs Driver</p>
            <p className="text-2xl font-black text-amber-600 mt-1">1 Pickup</p>
            <p className="text-xs text-gray-500 mt-0.5">Green Hotel • 12:00 PM</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <AlertCircle size={24} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase">Scheduled Later Today</p>
            <p className="text-2xl font-black text-gray-900 mt-1">2 Dispatches</p>
            <p className="text-xs text-gray-500 mt-0.5">Assigned to Priya & Anil</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
            <Clock size={24} />
          </div>
        </div>
      </div>

      {/* Pickups Table Card */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Today's Dispatch Schedule</h2>
            <p className="text-xs text-gray-500 mt-0.5">Active and pending logistics runs for Helping Hands NGO</p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2">
            {['All', 'En Route', 'Needs Assignment', 'Scheduled'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedFilter(tab)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  selectedFilter === tab
                    ? 'bg-[#064e3b] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 text-[11px] font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                <th className="py-3 px-6">ID & Time</th>
                <th className="py-3 px-6">Donation Details</th>
                <th className="py-3 px-6">Destination Shelter</th>
                <th className="py-3 px-6">Volunteer Driver</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filteredOperations.map((op) => (
                <tr key={op.id} className="hover:bg-gray-50/70 transition">
                  <td className="py-4 px-6">
                    <span className="font-bold text-gray-900 block">{op.id}</span>
                    <span className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                      <Clock size={12} /> {op.time}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-semibold text-gray-900 block">{op.title}</span>
                    <span className="text-xs text-emerald-700 font-medium">{op.donor}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-800 font-medium block">{op.ngoDestination}</span>
                    <span className="text-xs text-gray-400">{op.route}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                        {op.driver === 'Unassigned' ? '?' : op.driver.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-900">{op.driver}</p>
                        {op.driverPhone !== '-' && (
                          <p className="text-[11px] text-gray-500">{op.driverPhone}</p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full ${op.statusBadge}`}>
                      {op.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    {op.status === 'Needs Assignment' ? (
                      <button
                        onClick={() => setSelectedPickupForAssign(op)}
                        className="px-3.5 py-1.5 bg-[#064e3b] text-white hover:bg-[#043d2c] rounded-lg text-xs font-bold shadow-xs transition cursor-pointer"
                      >
                        Assign Driver
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedPickupForTrack(op)}
                        className="px-3.5 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-xs font-bold shadow-xs transition cursor-pointer"
                      >
                        Track Route
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AssignPickupModal
        pickup={selectedPickupForAssign}
        isOpen={Boolean(selectedPickupForAssign)}
        onClose={() => setSelectedPickupForAssign(null)}
        onAssign={handleAssign}
      />

      <TrackPickupModal
        pickup={selectedPickupForTrack}
        isOpen={Boolean(selectedPickupForTrack)}
        onClose={() => setSelectedPickupForTrack(null)}
      />
    </div>
  );
}
