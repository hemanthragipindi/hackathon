import React from 'react';
import { Search, Building2, ShieldCheck, Clock, Ban, MoreVertical } from 'lucide-react';
import DataTable from '../../common/components/DataTable';
import StatusBadge from '../../common/components/StatusBadge';
import StatCard from '../../common/components/StatCard';
import { ngosData } from '../../../data/mockData';

export default function NGOs() {
  const stats = [
    { title: 'Total NGOs', value: '142', icon: Building2 },
    { title: 'Verified NGOs', value: '86', icon: ShieldCheck, secondaryText: '+5 this week' },
    { title: 'Pending Verification', value: '12', icon: Clock },
    { title: 'Suspended NGOs', value: '3', icon: Ban },
  ];

  const columns = [
    { header: 'NGO ID', accessor: 'id' },
    { header: 'Organization', accessor: 'organization' },
    { header: 'Contact Person', accessor: 'contact' },
    { header: 'Location', accessor: 'location' },
    { header: 'Service Area', accessor: 'serviceArea' },
    { header: 'Reg Status', render: (row) => <StatusBadge status={row.regStatus} /> },
    { header: 'Verification', render: (row) => <StatusBadge status={row.verification} /> },
    { header: 'Actions', render: (row) => (
      <div className="flex items-center gap-2">
        {row.verification === 'Pending Verification' && (
          <button className="text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded hover:bg-green-100">Review</button>
        )}
        <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"><MoreVertical size={18} /></button>
      </div>
    ) }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">NGO Management</h2>
          <p className="text-gray-500 mt-1">Review, verify, and manage NGO partners.</p>
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
            placeholder="Search NGOs..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <select className="border-gray-300 rounded-md py-2 pl-3 pr-8 focus:ring-green-500 focus:border-green-500 bg-white border">
          <option>All Verification Statuses</option>
          <option>Verified</option>
          <option>Pending Verification</option>
          <option>Rejected</option>
        </select>
      </div>

      <DataTable columns={columns} data={ngosData} />
    </div>
  );
}
