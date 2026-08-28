import React, { useState } from 'react';
import { Search, Eye, Truck, User, Building2, MapPin, Package, Clock, XCircle, CheckCircle, Navigation } from 'lucide-react';
import DataTable from '../../common/components/DataTable';
import StatusBadge from '../../common/components/StatusBadge';
import DetailDrawer from '../components/DetailDrawer';
import ConfirmationModal from '../components/ConfirmationModal';
import { useAdminData } from '../context/AdminDataContext';

export default function Pickups() {
  const { pickups, setPickups, foodListings, ngos, volunteers, addToast } = useAdminData();
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [volunteerFilter, setVolunteerFilter] = useState('All');
  const [ngoFilter, setNgoFilter] = useState('All');

  // UI State
  const [selectedPickup, setSelectedPickup] = useState(null);
  const [confirmConfig, setConfirmConfig] = useState({ isOpen: false, type: null, pickup: null });

  // Extract unique filter options
  const uniqueVolunteers = [...new Set(pickups.map(p => p.volunteer))].filter(v => v !== 'Unassigned');
  const uniqueNgos = [...new Set(pickups.map(p => p.ngo))];

  // Filtering Logic
  const filteredPickups = pickups.filter(pickup => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      pickup.id.toLowerCase().includes(searchLower) ||
      pickup.foodId.toLowerCase().includes(searchLower) ||
      pickup.donor.toLowerCase().includes(searchLower);
    
    const matchesStatus = statusFilter === 'All' || pickup.status === statusFilter;
    const matchesVolunteer = volunteerFilter === 'All' || 
      (volunteerFilter === 'Unassigned' ? pickup.volunteer === 'Unassigned' : pickup.volunteer === volunteerFilter);
    const matchesNgo = ngoFilter === 'All' || pickup.ngo === ngoFilter;
    
    return matchesSearch && matchesStatus && matchesVolunteer && matchesNgo;
  });

  // Actions
  const handleAction = (type, pickup) => {
    setConfirmConfig({ isOpen: true, type, pickup });
  };

  const executeAction = () => {
    const { type, pickup } = confirmConfig;
    if (!pickup) return;

    let newStatus = pickup.status;
    let toastMsg = '';

    if (type === 'cancel') {
      newStatus = 'Cancelled';
      toastMsg = `Pickup ${pickup.id} has been cancelled.`;
    } else if (type === 'arrived') {
      newStatus = 'Arrived';
      toastMsg = `Volunteer arrived for ${pickup.id}.`;
    } else if (type === 'picked_up') {
      newStatus = 'Picked Up';
      toastMsg = `Food picked up for ${pickup.id}.`;
    } else if (type === 'delivered') {
      newStatus = 'Delivered';
      toastMsg = `Pickup ${pickup.id} has been successfully delivered.`;
    } else if (type === 'assign') {
      newStatus = 'Assigned';
      toastMsg = `Volunteer assigned to ${pickup.id}.`;
    }

    setPickups(prev => prev.map(p => p.id === pickup.id ? { ...p, status: newStatus, volunteer: type === 'assign' ? 'John Doe' : p.volunteer } : p));
    addToast(toastMsg, type === 'cancel' ? 'error' : 'success');
    
    if (selectedPickup && selectedPickup.id === pickup.id) {
      setSelectedPickup({ ...pickup, status: newStatus, volunteer: type === 'assign' ? 'John Doe' : pickup.volunteer });
    }
  };

  // Columns for DataTable
  const columns = [
    { header: 'Pickup ID', accessor: 'id' },
    { header: 'Food Listing', render: (row) => (
      <div>
        <p className="font-medium text-gray-900">{row.foodId}</p>
        <p className="text-xs text-gray-500">From {row.donor}</p>
      </div>
    )},
    { header: 'NGO', accessor: 'ngo' },
    { header: 'Volunteer', render: (row) => (
      <span className={row.volunteer === 'Unassigned' ? 'text-orange-600 font-medium' : 'text-gray-900'}>
        {row.volunteer}
      </span>
    )},
    { header: 'Pickup Time', render: (row) => {
      const date = new Date(row.createdTime);
      return (
        <div className="flex flex-col">
          <span className="text-sm text-gray-900">{date.toLocaleDateString()}</span>
          <span className="text-xs text-gray-500">{date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>
      );
    }},
    { header: 'ETA', accessor: 'eta' },
    { header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    { header: 'Actions', render: (row) => (
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setSelectedPickup(row)}
          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          title="View Details"
        >
          <Eye size={18} />
        </button>
      </div>
    ) }
  ];

  const renderModalContent = () => {
    if (!confirmConfig.pickup) return { title: '', message: '', style: 'primary', confirmText: '' };
    const id = confirmConfig.pickup.id;
    switch (confirmConfig.type) {
      case 'cancel':
        return { 
          title: 'Cancel Pickup?', 
          message: `Are you sure you want to cancel pickup ${id}? This will notify all parties.`,
          style: 'danger', confirmText: 'Cancel Pickup'
        };
      case 'assign':
        return { 
          title: 'Assign Volunteer?', 
          message: `Assign a volunteer to pickup ${id}?`,
          style: 'primary', confirmText: 'Assign'
        };
      case 'arrived':
        return { 
          title: 'Mark Arrived?', 
          message: `Mark volunteer as arrived at donor location for ${id}?`,
          style: 'primary', confirmText: 'Mark Arrived'
        };
      case 'picked_up':
        return { 
          title: 'Mark Picked Up?', 
          message: `Confirm food has been picked up for ${id}?`,
          style: 'primary', confirmText: 'Confirm Pickup'
        };
      case 'delivered':
        return { 
          title: 'Mark Delivered?', 
          message: `Confirm food has been delivered to NGO for ${id}?`,
          style: 'primary', confirmText: 'Confirm Delivery'
        };
      default: return { title: '', message: '', style: 'primary', confirmText: '' };
    }
  };

  const modalConfig = renderModalContent();

  // Helper to find associated details
  const getAssociatedFood = (foodId) => foodListings.find(f => f.id === foodId) || null;
  const getAssociatedNgo = (ngoName) => ngos.find(n => n.name === ngoName) || null;
  const getAssociatedVolunteer = (volName) => volunteers.find(v => v.name === volName) || null;

  // Timeline Helper
  const timelineSteps = [
    { label: 'Created', statuses: ['Unassigned', 'Assigned', 'Accepted', 'En Route', 'Arrived', 'Picked Up', 'Delivered'] },
    { label: 'Assigned', statuses: ['Assigned', 'Accepted', 'En Route', 'Arrived', 'Picked Up', 'Delivered'] },
    { label: 'Accepted', statuses: ['Accepted', 'En Route', 'Arrived', 'Picked Up', 'Delivered'] },
    { label: 'En Route', statuses: ['En Route', 'Arrived', 'Picked Up', 'Delivered'] },
    { label: 'Arrived', statuses: ['Arrived', 'Picked Up', 'Delivered'] },
    { label: 'Picked Up', statuses: ['Picked Up', 'Delivered'] },
    { label: 'Delivered', statuses: ['Delivered'] }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Pickup Logistics</h2>
          <p className="text-gray-500 mt-1">Real-time tracking and management of food pickups.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search ID, Food, Donor..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 bg-white"
        >
          <option value="All">All Statuses</option>
          <option value="Unassigned">Unassigned</option>
          <option value="Assigned">Assigned</option>
          <option value="Accepted">Accepted</option>
          <option value="En Route">En Route</option>
          <option value="Arrived">Arrived</option>
          <option value="Picked Up">Picked Up</option>
          <option value="Delivered">Delivered</option>
          <option value="Failed">Failed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <select 
          value={volunteerFilter} 
          onChange={(e) => setVolunteerFilter(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 bg-white"
        >
          <option value="All">All Volunteers</option>
          <option value="Unassigned">Unassigned</option>
          {uniqueVolunteers.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
        <select 
          value={ngoFilter} 
          onChange={(e) => setNgoFilter(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 bg-white"
        >
          <option value="All">All NGOs</option>
          {uniqueNgos.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-500 font-medium">
        {filteredPickups.length} pickup{filteredPickups.length !== 1 && 's'} found
      </div>

      {/* Table */}
      {filteredPickups.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-200 border-dashed">
          <Truck className="mx-auto h-12 w-12 text-gray-300 mb-3" />
          <p className="text-gray-900 font-medium text-lg">No pickups found</p>
          <p className="text-gray-500">Try changing your filters or search term.</p>
        </div>
      ) : (
        <DataTable columns={columns} data={filteredPickups} />
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal 
        isOpen={confirmConfig.isOpen}
        onClose={() => setConfirmConfig({ isOpen: false, type: null, pickup: null })}
        onConfirm={executeAction}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        confirmStyle={modalConfig.style}
      />

      {/* Details Drawer */}
      <DetailDrawer 
        isOpen={!!selectedPickup} 
        onClose={() => setSelectedPickup(null)} 
        title="Pickup Details"
      >
        {selectedPickup && (
          <div className="space-y-6">
            
            {/* Top Status */}
            <div className="flex flex-col gap-2 border-b border-gray-100 pb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">{selectedPickup.id}</h3>
                <StatusBadge status={selectedPickup.status} />
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1"><Clock size={14} /> Created: {new Date(selectedPickup.createdTime).toLocaleString()}</span>
                {selectedPickup.eta !== '-' && <span className="flex items-center gap-1 font-medium text-blue-600"><Navigation size={14} /> ETA: {selectedPickup.eta}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              
              {/* Food & Donor */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Package size={14} /> Food & Donor
                </h4>
                {getAssociatedFood(selectedPickup.foodId) ? (
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Food:</span> {getAssociatedFood(selectedPickup.foodId).name} ({getAssociatedFood(selectedPickup.foodId).quantity})</p>
                    <p><span className="font-medium">Donor:</span> {selectedPickup.donor}</p>
                    <p className="flex items-start gap-1 text-gray-600 mt-1">
                      <MapPin size={14} className="mt-0.5 shrink-0" />
                      <span>{getAssociatedFood(selectedPickup.foodId).location}</span>
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">Data not available.</p>
                )}
              </div>

              {/* NGO Destination */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Building2 size={14} /> Destination NGO
                </h4>
                {getAssociatedNgo(selectedPickup.ngo) ? (
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">{selectedPickup.ngo}</p>
                    <p className="flex items-start gap-1 text-gray-600">
                      <MapPin size={14} className="mt-0.5 shrink-0" />
                      <span>{getAssociatedNgo(selectedPickup.ngo).location}</span>
                    </p>
                    <p className="text-gray-600">Contact: {getAssociatedNgo(selectedPickup.ngo).contactPerson}</p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">{selectedPickup.ngo}</p>
                )}
              </div>

              {/* Volunteer */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <User size={14} /> Volunteer
                </h4>
                {selectedPickup.volunteer === 'Unassigned' ? (
                  <p className="text-sm text-orange-600 font-medium">No volunteer assigned yet.</p>
                ) : getAssociatedVolunteer(selectedPickup.volunteer) ? (
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">{selectedPickup.volunteer}</p>
                    <p className="text-gray-600">Vehicle: {getAssociatedVolunteer(selectedPickup.volunteer).vehicle}</p>
                    <p className="text-gray-600">Rating: ⭐ {getAssociatedVolunteer(selectedPickup.volunteer).rating}</p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-900">{selectedPickup.volunteer}</p>
                )}
              </div>

            </div>

            {/* Timeline */}
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 mt-4">Pickup Progress</h4>
              {selectedPickup.status === 'Cancelled' ? (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 font-medium flex items-center gap-2">
                  <XCircle size={18} /> This pickup was cancelled.
                </div>
              ) : selectedPickup.status === 'Failed' ? (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 font-medium flex items-center gap-2">
                  <XCircle size={18} /> This pickup failed to complete.
                </div>
              ) : (
                <div className="relative border-l-2 border-gray-200 ml-3 space-y-6">
                  {timelineSteps.map((step, idx) => {
                    const isCompleted = step.statuses.includes(selectedPickup.status);
                    const isCurrent = selectedPickup.status === step.label;
                    return (
                      <div key={idx} className="relative pl-6">
                        <div className={`absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-white ${
                          isCompleted ? 'bg-green-500' : 'bg-gray-300'
                        }`}></div>
                        <div className={`text-sm ${isCompleted ? 'text-gray-900 font-medium' : 'text-gray-500'} ${isCurrent ? 'font-bold text-blue-700' : ''}`}>
                          {step.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Admin Actions */}
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Admin Actions</h4>
              <div className="grid grid-cols-2 gap-3">
                {selectedPickup.status === 'Unassigned' && (
                  <button onClick={() => handleAction('assign', selectedPickup)} className="px-4 py-2 border border-blue-300 text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors font-medium text-sm">
                    Assign Volunteer
                  </button>
                )}
                {['Assigned', 'Accepted', 'En Route'].includes(selectedPickup.status) && (
                  <button onClick={() => handleAction('arrived', selectedPickup)} className="px-4 py-2 border border-indigo-300 text-indigo-700 bg-indigo-50 rounded-md hover:bg-indigo-100 transition-colors font-medium text-sm">
                    Mark Arrived
                  </button>
                )}
                {selectedPickup.status === 'Arrived' && (
                  <button onClick={() => handleAction('picked_up', selectedPickup)} className="px-4 py-2 border border-purple-300 text-purple-700 bg-purple-50 rounded-md hover:bg-purple-100 transition-colors font-medium text-sm">
                    Mark Picked Up
                  </button>
                )}
                {selectedPickup.status === 'Picked Up' && (
                  <button onClick={() => handleAction('delivered', selectedPickup)} className="px-4 py-2 border border-green-300 text-green-700 bg-green-50 rounded-md hover:bg-green-100 transition-colors font-medium text-sm">
                    Mark Delivered
                  </button>
                )}
                
                {!['Delivered', 'Cancelled', 'Failed'].includes(selectedPickup.status) && (
                  <button onClick={() => handleAction('cancel', selectedPickup)} className="px-4 py-2 border border-red-300 text-red-700 bg-red-50 rounded-md hover:bg-red-100 transition-colors font-medium text-sm">
                    Cancel Pickup
                  </button>
                )}
              </div>
            </div>
            
          </div>
        )}
      </DetailDrawer>
    </div>
  );
}
