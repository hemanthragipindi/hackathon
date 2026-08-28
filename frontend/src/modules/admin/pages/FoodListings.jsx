import React, { useState } from 'react';
import { Search, AlertTriangle, Eye, XCircle, Trash2, Clock, MapPin, Package, User, Building2, Truck } from 'lucide-react';
import DataTable from '../../common/components/DataTable';
import StatusBadge from '../../common/components/StatusBadge';
import DetailDrawer from '../components/DetailDrawer';
import ConfirmationModal from '../components/ConfirmationModal';
import { useAdminData } from '../context/AdminDataContext';

export default function FoodListings() {
  const { foodListings, setFoodListings, addToast } = useAdminData();
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [donorFilter, setDonorFilter] = useState('All');
  const [expiringOnly, setExpiringOnly] = useState(false);

  // UI State
  const [selectedListing, setSelectedListing] = useState(null);
  const [confirmConfig, setConfirmConfig] = useState({ isOpen: false, type: null, listing: null });

  // Extract unique filter options
  const categories = [...new Set(foodListings.map(f => f.category || 'Prepared Meals'))];
  const donors = [...new Set(foodListings.map(f => f.donor))];

  // Helper to determine if expiring soon (mock logic: if Available, we pretend it's expiring soon)
  const isExpiringSoon = (listing) => listing.status === 'Available';

  // Filtering Logic
  const filteredListings = foodListings.filter(listing => {
    const matchesSearch = 
      listing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || listing.status === statusFilter;
    const matchesCategory = categoryFilter === 'All' || (listing.category || 'Prepared Meals') === categoryFilter;
    const matchesDonor = donorFilter === 'All' || listing.donor === donorFilter;
    const matchesExpiring = !expiringOnly || isExpiringSoon(listing);
    
    return matchesSearch && matchesStatus && matchesCategory && matchesDonor && matchesExpiring;
  });

  // Actions
  const handleAction = (type, listing) => {
    setConfirmConfig({ isOpen: true, type, listing });
  };

  const executeAction = () => {
    const { type, listing } = confirmConfig;
    if (!listing) return;

    if (type === 'expire') {
      setFoodListings(prev => prev.map(f => f.id === listing.id ? { ...f, status: 'Expired' } : f));
      addToast(`Listing ${listing.id} marked as Expired.`, 'info');
    } else if (type === 'cancel') {
      setFoodListings(prev => prev.map(f => f.id === listing.id ? { ...f, status: 'Cancelled' } : f));
      addToast(`Listing ${listing.id} has been Cancelled.`, 'error');
    } else if (type === 'remove') {
      setFoodListings(prev => prev.filter(f => f.id !== listing.id));
      addToast(`Listing ${listing.id} has been permanently removed.`, 'info');
      if (selectedListing && selectedListing.id === listing.id) setSelectedListing(null);
    }
  };

  // Columns for DataTable
  const columns = [
    { header: 'Listing ID', accessor: 'id' },
    { header: 'Food Name', render: (row) => (
      <div>
        <p className="font-medium text-gray-900">{row.name}</p>
        <p className="text-xs text-gray-500">{row.category || 'Prepared Meals'}</p>
      </div>
    )},
    { header: 'Donor', accessor: 'donor' },
    { header: 'Quantity', accessor: 'quantity' },
    { header: 'Deadline', render: (row) => (
      <div className="flex flex-col">
        <span className={isExpiringSoon(row) ? 'text-orange-600 font-semibold' : 'text-gray-700'}>{row.deadline}</span>
        {isExpiringSoon(row) && (
          <span className="flex items-center gap-1 text-[10px] text-orange-600 font-bold uppercase tracking-wider mt-0.5">
            <AlertTriangle size={10} /> Expires Soon
          </span>
        )}
      </div>
    ) },
    { header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    { header: 'Actions', render: (row) => (
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setSelectedListing(row)}
          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          title="View Details"
        >
          <Eye size={18} />
        </button>
        {row.status === 'Available' && (
          <button 
            onClick={() => handleAction('expire', row)}
            className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
            title="Mark Expired"
          >
            <Clock size={18} />
          </button>
        )}
        {['Available', 'Claimed', 'Pickup Assigned'].includes(row.status) && (
          <button 
            onClick={() => handleAction('cancel', row)}
            className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
            title="Cancel Listing"
          >
            <XCircle size={18} />
          </button>
        )}
        <button 
          onClick={() => handleAction('remove', row)}
          className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
          title="Remove Listing"
        >
          <Trash2 size={18} />
        </button>
      </div>
    ) }
  ];

  const renderModalContent = () => {
    if (!confirmConfig.listing) return { title: '', message: '', style: 'danger', confirmText: '' };
    const id = confirmConfig.listing.id;
    switch (confirmConfig.type) {
      case 'expire':
        return { 
          title: 'Mark Listing Expired?', 
          message: `Are you sure you want to mark ${id} as Expired? It will no longer be claimable.`,
          style: 'danger', confirmText: 'Mark Expired'
        };
      case 'cancel':
        return { 
          title: 'Cancel Listing?', 
          message: `Are you sure you want to cancel ${id}? This will notify any assigned NGOs or Volunteers.`,
          style: 'danger', confirmText: 'Cancel Listing'
        };
      case 'remove':
        return { 
          title: 'Delete Listing?', 
          message: `Are you sure you want to permanently delete ${id}? This action cannot be undone.`,
          style: 'danger', confirmText: 'Delete Permanently'
        };
      default: return { title: '', message: '', style: 'danger', confirmText: '' };
    }
  };

  const modalConfig = renderModalContent();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Food Listings</h2>
          <p className="text-gray-500 mt-1">Monitor, manage, and audit all food listings.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col gap-4">
        
        {/* Top row filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by Food Name or ID..." 
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
            <option value="Available">Available</option>
            <option value="Claimed">Claimed</option>
            <option value="Pickup Assigned">Pickup Assigned</option>
            <option value="Picked Up">Picked Up</option>
            <option value="Delivered">Delivered</option>
            <option value="Expired">Expired</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 bg-white"
          >
            <option value="All">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Bottom row filters */}
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-between border-t border-gray-100 pt-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <select 
              value={donorFilter} 
              onChange={(e) => setDonorFilter(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 bg-white min-w-[200px]"
            >
              <option value="All">All Donors</option>
              {donors.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
              <input 
                type="checkbox" 
                checked={expiringOnly}
                onChange={(e) => setExpiringOnly(e.target.checked)}
                className="w-4 h-4 text-orange-600 rounded border-gray-300 focus:ring-orange-500 cursor-pointer"
              />
              <AlertTriangle size={16} className={expiringOnly ? 'text-orange-500' : 'text-gray-400'} />
              Expiring Soon Only
            </label>
          </div>
          
          <div className="text-sm text-gray-500 font-medium whitespace-nowrap">
            {filteredListings.length} listing{filteredListings.length !== 1 && 's'}
          </div>
        </div>
      </div>

      {/* Empty State vs Data Table */}
      {filteredListings.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-200 border-dashed">
          <Search className="mx-auto h-12 w-12 text-gray-300 mb-3" />
          <p className="text-gray-900 font-medium text-lg">No listings found</p>
          <p className="text-gray-500">Try changing your filters or search term.</p>
          <button 
            onClick={() => { setSearchTerm(''); setStatusFilter('All'); setCategoryFilter('All'); setDonorFilter('All'); setExpiringOnly(false); }}
            className="mt-4 px-4 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-md hover:bg-green-100 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <DataTable columns={columns} data={filteredListings} />
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal 
        isOpen={confirmConfig.isOpen}
        onClose={() => setConfirmConfig({ isOpen: false, type: null, listing: null })}
        onConfirm={executeAction}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        confirmStyle={modalConfig.style}
      />

      {/* Details Drawer */}
      <DetailDrawer 
        isOpen={!!selectedListing} 
        onClose={() => setSelectedListing(null)} 
        title="Listing Details"
      >
        {selectedListing && (
          <div className="space-y-8">
            
            {/* Header & Photo placeholder */}
            <div>
              <div className="w-full h-40 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 mb-4 overflow-hidden relative">
                <Package size={48} className="opacity-20 absolute" />
                <span className="text-xs font-medium z-10 bg-white/80 px-2 py-1 rounded">No Photo Provided</span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 leading-tight">{selectedListing.name}</h3>
                  <p className="text-sm text-gray-500 font-medium mt-1">{selectedListing.id} • {selectedListing.category || 'Prepared Meals'}</p>
                </div>
                <StatusBadge status={selectedListing.status} />
              </div>
            </div>

            {/* Core Food Info */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Quantity</p>
                <p className="text-sm font-medium text-gray-900">{selectedListing.quantity}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Dietary Type</p>
                <p className="text-sm font-medium text-gray-900">Mixed / Unspecified</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Prepared Time</p>
                <p className="text-sm font-medium text-gray-900">Today, 2:00 PM</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Safe Until</p>
                <p className="text-sm font-medium text-gray-900">Today, {selectedListing.deadline}</p>
              </div>
            </div>

            {/* Relations */}
            <div className="space-y-4">
              
              {/* Donor Box */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <User size={14} /> Donor
                </h4>
                <p className="font-medium text-gray-900">{selectedListing.donor}</p>
                <div className="flex items-start gap-2 mt-2 text-sm text-gray-600">
                  <MapPin size={16} className="shrink-0 mt-0.5 text-gray-400" />
                  <span>{selectedListing.location}</span>
                </div>
              </div>

              {/* NGO/Claim Box (Mocked) */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Building2 size={14} /> Claim
                </h4>
                {['Claimed', 'Pickup Assigned', 'Picked Up', 'Delivered'].includes(selectedListing.status) ? (
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900">Hope Foundation</p>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium">Claimed</span>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">No active claims yet.</p>
                )}
              </div>

              {/* Pickup/Volunteer Box (Mocked) */}
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Truck size={14} /> Pickup
                </h4>
                {['Pickup Assigned', 'Picked Up', 'Delivered'].includes(selectedListing.status) ? (
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900">Rahul Kumar</p>
                    <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded font-medium">Assigned</span>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">No volunteer assigned.</p>
                )}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Activity Timeline</h4>
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white bg-green-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-semibold text-gray-900 text-sm">Listing Created</div>
                      <time className="text-xs font-medium text-gray-500">Today, 2:00 PM</time>
                    </div>
                    <div className="text-xs text-gray-600">By {selectedListing.donor}</div>
                  </div>
                </div>

                {['Claimed', 'Pickup Assigned', 'Picked Up', 'Delivered'].includes(selectedListing.status) && (
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white bg-green-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-semibold text-gray-900 text-sm">Food Claimed</div>
                        <time className="text-xs font-medium text-gray-500">Today, 3:15 PM</time>
                      </div>
                      <div className="text-xs text-gray-600">By Hope Foundation</div>
                    </div>
                  </div>
                )}
                
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-gray-200 flex gap-3">
              {selectedListing.status === 'Available' && (
                <button 
                  onClick={() => handleAction('expire', selectedListing)}
                  className="flex-1 flex justify-center items-center gap-2 px-4 py-2 border border-orange-300 text-orange-700 bg-orange-50 rounded-md hover:bg-orange-100 transition-colors font-medium text-sm"
                >
                  <Clock size={16} /> Mark Expired
                </button>
              )}
              {['Available', 'Claimed', 'Pickup Assigned'].includes(selectedListing.status) && (
                <button 
                  onClick={() => handleAction('cancel', selectedListing)}
                  className="flex-1 flex justify-center items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors font-medium text-sm"
                >
                  <XCircle size={16} /> Cancel Listing
                </button>
              )}
              <button 
                onClick={() => handleAction('remove', selectedListing)}
                className="flex-1 flex justify-center items-center gap-2 px-4 py-2 border border-red-300 text-red-700 bg-red-50 rounded-md hover:bg-red-100 transition-colors font-medium text-sm"
              >
                <Trash2 size={16} /> Remove
              </button>
            </div>
          </div>
        )}
      </DetailDrawer>
    </div>
  );
}
