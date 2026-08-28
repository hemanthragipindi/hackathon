import React from 'react';
import { HeartHandshake, Utensils, Truck, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import StatCard from '../../common/components/StatCard';
import StatusBadge from '../../common/components/StatusBadge';

export default function Dashboard() {
  const stats = [
    { title: 'Total Meals Donated', value: '1,240', secondaryText: '+150 this month', icon: HeartHandshake, trend: 'up' },
    { title: 'Active Listings', value: '2', secondaryText: 'Waiting for claim', icon: Utensils },
    { title: 'Pickups in Progress', value: '1', secondaryText: 'En route now', icon: Truck },
    { title: 'Donor Rating', value: '4.9', secondaryText: 'Top 5% Donor', icon: Star, trend: 'up' },
  ];

  const recentListings = [
    { id: 'FD-1042', name: 'Vegetable Biryani', quantity: '35 Meals', deadline: '8:30 PM', status: 'Available' },
    { id: 'FD-1041', name: 'Assorted Breads', quantity: '20 kg', deadline: '6:00 PM', status: 'Pickup Assigned' },
  ];

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome back, Green Leaf!</h2>
          <p className="text-gray-500 mt-1">Here is the impact you're making and your current listings.</p>
        </div>
        <Link 
          to="/donor/create"
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md font-medium text-sm hover:bg-green-700 transition-colors shadow-sm"
        >
          <Utensils size={16} />
          Create New Listing
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Recent Listings */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Current Listings</h3>
            <Link to="/donor/my-donations" className="text-sm font-medium text-green-600 hover:text-green-700">View All</Link>
          </div>
          <div className="p-0 flex-1">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 font-medium">
                <tr>
                  <th className="px-6 py-3">Food Item</th>
                  <th className="px-6 py-3">Deadline</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentListings.map(listing => (
                  <tr key={listing.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{listing.name}</td>
                    <td className="px-6 py-4 text-gray-600">{listing.deadline}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={listing.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Impact Highlight */}
        <div className="bg-green-600 rounded-xl border border-green-700 shadow-sm p-8 text-white flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <HeartHandshake size={48} className="mb-4 text-green-100 relative z-10" />
          <h3 className="text-2xl font-bold relative z-10 mb-2">Thank you for your generosity!</h3>
          <p className="text-green-100 relative z-10 max-w-md mx-auto">
            Your donations this month have helped feed over 150 people in your local community.
          </p>
          <Link to="/donor/analytics" className="mt-6 inline-flex items-center gap-2 text-white font-medium hover:text-green-100 relative z-10">
            View detailed impact report <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
