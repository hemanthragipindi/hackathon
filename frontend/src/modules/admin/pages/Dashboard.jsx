import React, { useState } from 'react';
import { Users, Utensils, HeartHandshake, Truck, Building2, Bike, Calendar, ChevronDown, Activity, Clock, MoreVertical, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import StatCard from '../../common/components/StatCard';
import StatusBadge from '../../common/components/StatusBadge';
import DataTable from '../../common/components/DataTable';
import { chartData } from '../../../data/mockData';
import { useAdminData } from '../context/AdminDataContext';

export default function Dashboard() {
  const [timeRange, setTimeRange] = useState('Today');
  
  const { users, foodListings, pickups, ngos, volunteers, notifications } = useAdminData();

  // Derived Statistics
  const totalUsers = users.length;
  const activeListings = foodListings.filter(f => ['Available', 'Claimed', 'Pickup Assigned'].includes(f.status)).length;
  const deliveredPickups = pickups.filter(p => p.status === 'Delivered').length;
  const rescuedAmount = 18500 + (deliveredPickups * 120); // Simulated dynamic number
  const activePickups = pickups.filter(p => ['Assigned', 'Accepted', 'En Route', 'Arrived'].includes(p.status)).length;
  const verifiedNgos = ngos.filter(n => n.verification === 'Verified').length;
  const pendingNgos = ngos.filter(n => n.verification === 'Pending').length;
  const activeVols = volunteers.filter(v => ['Available', 'Busy'].includes(v.status)).length;

  const stats = [
    { title: 'Total Users', value: totalUsers.toLocaleString(), secondaryText: 'Across all roles', icon: Users, trend: 'up', link: '/admin/users' },
    { title: 'Active Food Listings', value: activeListings, secondaryText: 'Waiting or claimed', icon: Utensils, link: '/admin/food-listings' },
    { title: 'Food Rescued', value: `${rescuedAmount.toLocaleString()} kg`, secondaryText: 'Total impact', icon: HeartHandshake, trend: 'up', link: '/admin/analytics' },
    { title: 'Active Pickups', value: activePickups, secondaryText: 'Currently in progress', icon: Truck, link: '/admin/pickups' },
    { title: 'Verified NGOs', value: verifiedNgos, secondaryText: `${pendingNgos} pending verification`, icon: Building2, link: '/admin/ngos' },
    { title: 'Active Volunteers', value: activeVols, secondaryText: 'Ready or on task', icon: Bike, link: '/admin/volunteers' },
  ];

  const expiringListings = foodListings.filter(f => f.status === 'Available').slice(0, 2);

  const foodColumns = [
    { header: 'Food ID', accessor: 'id' },
    { header: 'Donor', accessor: 'donor' },
    { header: 'Food Name', accessor: 'name' },
    { header: 'Quantity', accessor: 'quantity' },
    { header: 'Deadline', accessor: 'deadline' },
    { header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
  ];

  const pickupColumns = [
    { header: 'Pickup ID', accessor: 'id' },
    { header: 'Donor', accessor: 'donor' },
    { header: 'NGO', accessor: 'ngo' },
    { header: 'Volunteer', accessor: 'volunteer' },
    { header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    { header: 'ETA', accessor: 'eta' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Good morning, Admin 👋</h2>
          <p className="text-gray-500 mt-1">Here's what's happening across the FoodBridge platform today.</p>
        </div>
        
        <div className="relative inline-block text-left">
          <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer shadow-sm">
            <Calendar size={16} className="text-gray-500" />
            {timeRange}
            <ChevronDown size={16} className="text-gray-500" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <Link to={stat.link} key={idx} className="block transition-transform hover:-translate-y-1">
            <StatCard 
              title={stat.title} 
              value={stat.value} 
              secondaryText={stat.secondaryText} 
              icon={stat.icon} 
              trend={stat.trend} 
            />
          </Link>
        ))}
      </div>

      {/* Charts & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Activity size={20} className="text-green-600" />
              Food Rescue Activity
            </h3>
            <select className="text-sm border-gray-300 rounded-md bg-gray-50 text-gray-700 py-1 pl-2 pr-8 focus:ring-green-500 focus:border-green-500 outline-none border cursor-pointer">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="flex-1 min-h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dx={-10} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`${value} kg`, 'Rescued']}
                />
                <Line type="monotone" dataKey="rescued" stroke="#16a34a" strokeWidth={3} dot={{ r: 4, fill: '#16a34a', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {/* Expiring Alerts */}
          {expiringListings.length > 0 && (
            <div className="bg-orange-50 rounded-xl border border-orange-200 shadow-sm p-5">
              <h3 className="text-sm font-bold text-orange-800 mb-3 flex items-center gap-2">
                <AlertTriangle size={18} />
                Expiring Soon
              </h3>
              <div className="space-y-3">
                {expiringListings.map(listing => (
                  <div key={listing.id} className="bg-white p-3 rounded-lg border border-orange-100 shadow-sm flex justify-between items-center">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{listing.name}</p>
                      <p className="text-xs text-gray-500">Expires at {listing.deadline}</p>
                    </div>
                    <Link to="/admin/food-listings" className="text-xs font-medium text-orange-600 hover:text-orange-700">View</Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex-1 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Clock size={20} className="text-blue-600" />
              Recent Activity
            </h3>
            <div className="space-y-6 flex-1">
              {notifications.slice(0, 4).map(notif => (
                <div key={notif.id} className="flex gap-4">
                  <div className={`w-2 h-2 mt-2 rounded-full shrink-0 ${notif.read ? 'bg-gray-300' : 'bg-green-500'}`} />
                  <div>
                    <p className="text-sm text-gray-800 font-medium">{notif.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{notif.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/admin/notifications" className="mt-4 block text-center w-full py-2 text-sm font-medium text-green-600 bg-green-50 rounded-md hover:bg-green-100 transition-colors">
              View All Activity
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Recent Food Listings */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Food Listings</h3>
            <Link to="/admin/food-listings" className="text-sm font-medium text-green-600 hover:text-green-700">View All &rarr;</Link>
          </div>
          <DataTable columns={foodColumns} data={foodListings.slice(0, 5)} />
        </div>

        {/* Active Pickups */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Active Pickups</h3>
            <Link to="/admin/pickups" className="text-sm font-medium text-green-600 hover:text-green-700">View All &rarr;</Link>
          </div>
          <DataTable columns={pickupColumns} data={pickups.slice(0, 5)} />
        </div>
      </div>

    </div>
  );
}
