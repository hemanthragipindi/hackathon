import React, { useState } from 'react';
import { Search, Bike, CheckCircle, Clock, Ban, MoreVertical, Eye, ShieldOff, Shield, Trash2, Mail, Phone, MapPin, Star } from 'lucide-react';
import DataTable from '../../common/components/DataTable';
import StatusBadge from '../../common/components/StatusBadge';
import StatCard from '../../common/components/StatCard';
import DetailDrawer from '../components/DetailDrawer';
import ConfirmationModal from '../components/ConfirmationModal';
import { useAdminData } from '../context/AdminDataContext';

export default function Volunteers() {
  const { volunteers, setVolunteers, pickups, addToast } = useAdminData();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('All Availability');
  const [statusFilter, setStatusFilter] = useState('All Statuses');

  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [confirmConfig, setConfirmConfig] = useState({ isOpen: false, type: null, volunteer: null });

  // Stats
  const activeVolunteers = volunteers.filter(v => v.status === 'Active').length;
  const availableVolunteers = volunteers.filter(v => v.availability === 'Available').length;
  const busyVolunteers = volunteers.filter(v => v.availability === 'Busy').length;
  const suspendedVolunteers = volunteers.filter(v => v.status === 'Suspended').length;

  const stats = [
    { title: 'Total Active', value: activeVolunteers, icon: Bike },
    { title: 'Available Now', value: availableVolunteers, icon: CheckCircle },
    { title: 'Currently Busy', value: busyVolunteers, icon: Clock },
    { title: 'Suspended', value: suspendedVolunteers, icon: Ban },
  ];

  // Filtering
  const filteredVolunteers = volunteers.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          v.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAvailability = availabilityFilter === 'All Availability' || v.availability === availabilityFilter;
    const matchesStatus = statusFilter === 'All Statuses' || v.status === statusFilter;
    return matchesSearch && matchesAvailability && matchesStatus;
  });

  // Actions
  const handleAction = (type, volunteer) => {
    setConfirmConfig({ isOpen: true, type, volunteer });
  };

  const executeAction = () => {
    const { type, volunteer } = confirmConfig;
    if (!volunteer) return;

    if (type === 'suspend') {
      setVolunteers(prev => prev.map(v => v.id === volunteer.id ? { ...v, status: 'Suspended', availability: 'Offline' } : v));
      addToast(`${volunteer.name} suspended.`, 'error');
    } else if (type === 'activate') {
      setVolunteers(prev => prev.map(v => v.id === volunteer.id ? { ...v, status: 'Active', availability: 'Available' } : v));
      addToast(`${volunteer.name} activated.`, 'success');
    } else if (type === 'delete') {
      setVolunteers(prev => prev.filter(v => v.id !== volunteer.id));
      addToast(`${volunteer.name} deleted.`, 'info');
      if (selectedVolunteer?.id === volunteer.id) setSelectedVolunteer(null);
    }
  };

  const columns = [
    { header: 'Volunteer ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Location', accessor: 'location' },
    { header: 'Availability', render: (row) => <StatusBadge status={row.availability} /> },
    { header: 'Completed Pickups', accessor: 'completedPickups' },
    { header: 'Rating', render: (row) => (
      <span className="inline-flex items-center gap-1 font-medium text-gray-700">
        <Star size={14} className="fill-yellow-400 text-yellow-400" /> {row.rating}
      </span>
    ) },
    { header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    { header: 'Actions', render: (row) => (
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setSelectedVolunteer(row)}
          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          title="View Details"
        >
          <Eye size={18} />
        </button>
        {row.status === 'Active' ? (
          <button 
            onClick={() => handleAction('suspend', row)}
            className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
            title="Suspend Volunteer"
          >
            <ShieldOff size={18} />
          </button>
        ) : (
          <button 
            onClick={() => handleAction('activate', row)}
            className="p-1.5 text-green-600 hover:bg-green-50 rounded-md transition-colors"
            title="Activate Volunteer"
          >
            <Shield size={18} />
          </button>
        )}
      </div>
    ) }
  ];

  const renderModalContent = () => {
    if (!confirmConfig.volunteer) return { title: '', message: '', style: 'danger', confirmText: '' };
    const name = confirmConfig.volunteer.name;
    switch (confirmConfig.type) {
      case 'suspend': return { title: 'Suspend Volunteer?', message: `Suspend ${name}?`, style: 'danger', confirmText: 'Suspend' };
      case 'activate': return { title: 'Activate Volunteer?', message: `Activate ${name}?`, style: 'success', confirmText: 'Activate' };
      default: return { title: '', message: '', style: 'danger', confirmText: '' };
    }
  };

  const modalConfig = renderModalContent();

  return (
    <div className="space-y-6 pb-12">
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
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <select 
          value={availabilityFilter}
          onChange={e => setAvailabilityFilter(e.target.value)}
          className="border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:ring-1 focus:ring-green-500 focus:border-green-500 bg-white"
        >
          <option>All Availability</option>
          <option>Available</option>
          <option>Busy</option>
          <option>Offline</option>
        </select>
        <select 
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border border-gray-300 rounded-md py-2 pl-3 pr-8 focus:ring-1 focus:ring-green-500 focus:border-green-500 bg-white"
        >
          <option>All Statuses</option>
          <option>Active</option>
          <option>Suspended</option>
          <option>Pending</option>
        </select>
      </div>

      {filteredVolunteers.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-200 border-dashed">
          <Search className="mx-auto h-12 w-12 text-gray-300 mb-3" />
          <p className="text-gray-900 font-medium text-lg">No volunteers found</p>
          <p className="text-gray-500">Try changing your filters or search term.</p>
          <button 
            onClick={() => { setSearchTerm(''); setAvailabilityFilter('All Availability'); setStatusFilter('All Statuses'); }}
            className="mt-4 px-4 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-md hover:bg-green-100 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <DataTable columns={columns} data={filteredVolunteers} />
      )}

      <ConfirmationModal 
        isOpen={confirmConfig.isOpen}
        onClose={() => setConfirmConfig({ isOpen: false, type: null, volunteer: null })}
        onConfirm={executeAction}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        confirmStyle={modalConfig.style}
      />

      <DetailDrawer 
        isOpen={!!selectedVolunteer} 
        onClose={() => setSelectedVolunteer(null)} 
        title="Volunteer Details"
      >
        {selectedVolunteer && (
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-2xl font-bold">
                {selectedVolunteer.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedVolunteer.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <StatusBadge status={selectedVolunteer.status} />
                  <span className="text-gray-300">•</span>
                  <StatusBadge status={selectedVolunteer.availability} />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 space-y-4 border border-gray-100">
              <div className="flex flex-col gap-3 text-sm text-gray-700">
                <div className="flex items-center gap-3"><Mail size={16} className="text-gray-400" /> {selectedVolunteer.email || 'volunteer@example.com'}</div>
                <div className="flex items-center gap-3"><Phone size={16} className="text-gray-400" /> {selectedVolunteer.phone || '+91 9876543210'}</div>
                <div className="flex items-center gap-3"><MapPin size={16} className="text-gray-400" /> {selectedVolunteer.location}</div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">Statistics</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500 uppercase">Completed Pickups</p>
                  <p className="text-lg font-bold text-gray-900">{selectedVolunteer.completedPickups}</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500 uppercase">Rating</p>
                  <p className="text-lg font-bold text-gray-900 flex items-center gap-1">
                    <Star size={16} className="fill-yellow-400 text-yellow-400" /> {selectedVolunteer.rating}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </DetailDrawer>
    </div>
  );
}
