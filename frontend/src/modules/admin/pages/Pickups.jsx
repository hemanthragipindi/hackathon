import React from 'react';
import { Search, MoreVertical } from 'lucide-react';
import DataTable from '../../common/components/DataTable';
import StatusBadge from '../../common/components/StatusBadge';
import { pickupsData } from '../../../data/mockData';

export default function Pickups() {
  const columns = [
    { header: 'Pickup ID', accessor: 'id' },
    { header: 'Food ID', accessor: 'foodId' },
    { header: 'Donor', accessor: 'donor' },
    { header: 'NGO', accessor: 'ngo' },
    { header: 'Volunteer', accessor: 'volunteer' },
    { header: 'Created Time', accessor: 'createdTime', render: (row) => new Date(row.createdTime).toLocaleString() },
    { header: 'ETA', accessor: 'eta' },
    { header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    { header: 'Actions', render: () => (
      <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"><MoreVertical size={18} /></button>
    ) }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Pickup Logistics</h2>
          <p className="text-gray-500 mt-1">Manage and track volunteer pickup assignments.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search pickups or volunteers..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <select className="border-gray-300 rounded-md py-2 pl-3 pr-8 focus:ring-green-500 focus:border-green-500 bg-white border">
          <option>All Pickups</option>
          <option>En Route</option>
          <option>Unassigned</option>
          <option>Delivered</option>
        </select>
      </div>

      <DataTable columns={columns} data={pickupsData} />
    </div>
  );
}
