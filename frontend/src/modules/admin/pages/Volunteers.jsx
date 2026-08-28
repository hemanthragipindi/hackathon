import React from 'react';
import { Search, Bike, CheckCircle2, Clock, Ban, MoreVertical } from 'lucide-react';
import DataTable from '../../common/components/DataTable';
import StatusBadge from '../../common/components/StatusBadge';
import StatCard from '../../common/components/StatCard';
import { volunteersData } from '../../../data/mockData';

export default function Volunteers() {
  const stats = [
    { title: 'Total Volunteers', value: '1,247', icon: Bike },
    { title: 'Available Volunteers', value: '82', icon: CheckCircle2 },
    { title: 'Active Pickups', value: '47', icon: Clock },
    { title: 'Suspended', value: '14', icon: Ban },
  ];

  const columns = [
    { header: 'Volunteer ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Location', accessor: 'location' },
    { header: 'Availability', render: (row) => <StatusBadge status={row.availability} /> },
    { header: 'Completed Pickups', accessor: 'completedPickups' },
    { header: 'Rating', render: (row) => (
      <span className="inline-flex items-center gap-1 font-medium text-gray-700">
        <span className="text-yellow-400">★</span> {row.rating}
      </span>
    ) },
    { header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    { header: 'Actions', render: () => (
      <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"><MoreVertical size={18} /></button>
    ) }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Volunteer Fleet</h2>
          <p className="text-gray-500 mt-1">Manage volunteers and delivery operations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatCard key={idx} {...stat} />
        ))}
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center gap-4 mt-8">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search volunteers by name or location..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <select className="border-gray-300 rounded-md py-2 pl-3 pr-8 focus:ring-green-500 focus:border-green-500 bg-white border">
          <option>All Availability</option>
          <option>Available</option>
          <option>Busy</option>
          <option>Offline</option>
        </select>
      </div>

      <DataTable columns={columns} data={volunteersData} />
    </div>
  );
}
