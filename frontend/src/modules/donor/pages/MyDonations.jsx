import React, { useState } from 'react';
import { Filter, Search } from 'lucide-react';
import DonationCard from '../components/DonationCard';

export default function MyDonations() {
  const [filter, setFilter] = useState('ACTIVE');

  // Mock data representing the clear lifecycle states
  const allDonations = [
    { id: 'FD-1042', name: 'Vegetable Biryani', category: 'Prepared Meals', quantity: '35 Meals', pickupWindow: '6:30 PM - 8:30 PM', deadline: '8:30 PM', createdDate: 'Today, 5:00 PM', status: 'Waiting for Claim', phase: 'ACTIVE' },
    { id: 'FD-1041', name: 'Assorted Breads', category: 'Baked Goods', quantity: '20 kg', pickupWindow: '4:00 PM - 6:00 PM', deadline: '6:00 PM', createdDate: 'Today, 2:00 PM', status: 'Pickup Assigned', assignedTo: 'Hope Foundation', volunteer: 'Rahul Kumar', phase: 'ACTIVE' },
    { id: 'FD-1040', name: 'Dal Makhani & Rice', category: 'Prepared Meals', quantity: '50 Meals', pickupWindow: '1:00 PM - 3:00 PM', deadline: '3:00 PM', createdDate: 'Today, 11:00 AM', status: 'Pickup In Progress', assignedTo: 'Care Foundation', volunteer: 'Priya Singh', phase: 'ACTIVE' },
    
    { id: 'FD-1035', name: 'Wedding Buffet Leftovers', category: 'Prepared Meals', quantity: '120 Meals', pickupWindow: '11:00 PM - 1:00 AM', deadline: '1:00 AM', createdDate: 'Yesterday, 10:00 PM', status: 'Delivered', assignedTo: 'FoodForAll', volunteer: 'Anil Desai', phase: 'COMPLETED' },
    { id: 'FD-1030', name: 'Mixed Vegetables', category: 'Raw Produce', quantity: '15 kg', pickupWindow: '10:00 AM - 12:00 PM', deadline: '12:00 PM', createdDate: 'Yesterday, 8:00 AM', status: 'Delivered', assignedTo: 'Hope Foundation', volunteer: 'Rahul Kumar', phase: 'COMPLETED' },
    
    { id: 'FD-1025', name: 'Overripe Bananas', category: 'Raw Produce', quantity: '5 kg', pickupWindow: '4:00 PM - 6:00 PM', deadline: '6:00 PM', createdDate: 'Oct 20, 2:00 PM', status: 'Not Claimed', phase: 'EXPIRED' },
  ];

  const filteredDonations = allDonations.filter(d => filter === 'ALL' || d.phase === filter);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Donations</h2>
          <p className="text-gray-500 mt-1">Track the lifecycle of your food listings.</p>
        </div>
      </div>

      {/* Tabs and Search */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex bg-gray-100 p-1 rounded-lg w-full sm:w-auto">
          {['ACTIVE', 'COMPLETED', 'EXPIRED', 'ALL'].map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`flex-1 sm:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                filter === tab ? 'bg-white text-green-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.charAt(0) + tab.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search donations..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 text-sm"
          />
        </div>
      </div>

      {/* Grid of Cards */}
      {filteredDonations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonations.map(donation => (
            <DonationCard key={donation.id} donation={donation} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-200 border-dashed">
          <p className="text-gray-500 text-lg">No donations found for this filter.</p>
        </div>
      )}
    </div>
  );
}
