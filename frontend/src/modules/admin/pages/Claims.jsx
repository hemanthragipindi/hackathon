import React from 'react';
import { Search, MoreVertical } from 'lucide-react';
import DataTable from '../../common/components/DataTable';
import StatusBadge from '../../common/components/StatusBadge';
import { claimsData } from '../../../data/mockData';

export default function Claims() {
  const columns = [
    { header: 'Claim ID', accessor: 'id' },
    { header: 'Food ID', accessor: 'foodId' },
    { header: 'Donor', accessor: 'donor' },
    { header: 'Claimed By (NGO)', accessor: 'ngo' },
    { header: 'Claimed Time', accessor: 'claimedTime', render: (row) => new Date(row.claimedTime).toLocaleString() },
    { header: 'Pickup Status', render: (row) => <StatusBadge status={row.pickupStatus} /> },
    { header: 'Claim Status', render: (row) => <StatusBadge status={row.claimStatus} /> },
    { header: 'Actions', render: () => (
      <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"><MoreVertical size={18} /></button>
    ) }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Food Claims</h2>
          <p className="text-gray-500 mt-1">Track food that has been claimed by NGOs.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search claims..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
          />
        </div>
      </div>

      <DataTable columns={columns} data={claimsData} />
    </div>
  );
}
