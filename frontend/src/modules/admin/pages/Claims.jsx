import React, { useState } from 'react';
import { Search, Eye, XCircle, Trash2, Building2, User, Package, Clock, Truck, MapPin } from 'lucide-react';
import DataTable from '../../common/components/DataTable';
import StatusBadge from '../../common/components/StatusBadge';
import DetailDrawer from '../components/DetailDrawer';
import ConfirmationModal from '../components/ConfirmationModal';
import { useAdminData } from '../context/AdminDataContext';

export default function Claims() {
  const { claims, setClaims, foodListings, addToast } = useAdminData();
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [ngoFilter, setNgoFilter] = useState('All');

  // UI State
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [confirmConfig, setConfirmConfig] = useState({ isOpen: false, type: null, claim: null });

  // Extract unique filter options
  const ngos = [...new Set(claims.map(c => c.ngo))];

  // Filtering Logic
  const filteredClaims = claims.filter(claim => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      claim.id.toLowerCase().includes(searchLower) ||
      claim.foodId.toLowerCase().includes(searchLower) ||
      claim.donor.toLowerCase().includes(searchLower);
    
    const matchesStatus = statusFilter === 'All' || claim.claimStatus === statusFilter;
    const matchesNgo = ngoFilter === 'All' || claim.ngo === ngoFilter;
    
    return matchesSearch && matchesStatus && matchesNgo;
  });

  // Actions
  const handleAction = (type, claim) => {
    setConfirmConfig({ isOpen: true, type, claim });
  };

  const executeAction = () => {
    const { type, claim } = confirmConfig;
    if (!claim) return;

    if (type === 'cancel') {
      setClaims(prev => prev.map(c => c.id === claim.id ? { ...c, claimStatus: 'Cancelled', pickupStatus: 'Cancelled' } : c));
      addToast(`Claim ${claim.id} has been cancelled.`, 'error');
    } else if (type === 'remove') {
      setClaims(prev => prev.filter(c => c.id !== claim.id));
      addToast(`Claim ${claim.id} has been permanently removed.`, 'info');
      if (selectedClaim && selectedClaim.id === claim.id) setSelectedClaim(null);
    }
  };

  // Columns for DataTable
  const columns = [
    { header: 'Claim ID', accessor: 'id' },
    { header: 'NGO', accessor: 'ngo' },
    { header: 'Food Listing', render: (row) => (
      <div>
        <p className="font-medium text-gray-900">{row.foodId}</p>
        <p className="text-xs text-gray-500">From {row.donor}</p>
      </div>
    )},
    { header: 'Claim Time', render: (row) => {
      const date = new Date(row.claimedTime);
      return (
        <div className="flex flex-col">
          <span className="text-sm text-gray-900">{date.toLocaleDateString()}</span>
          <span className="text-xs text-gray-500">{date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>
      );
    }},
    { header: 'Pickup Status', render: (row) => <StatusBadge status={row.pickupStatus} /> },
    { header: 'Claim Status', render: (row) => <StatusBadge status={row.claimStatus} /> },
    { header: 'Actions', render: (row) => (
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setSelectedClaim(row)}
          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          title="View Details"
        >
          <Eye size={18} />
        </button>
        {row.claimStatus === 'Claimed' && (
          <button 
            onClick={() => handleAction('cancel', row)}
            className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
            title="Cancel Claim"
          >
            <XCircle size={18} />
          </button>
        )}
        <button 
          onClick={() => handleAction('remove', row)}
          className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
          title="Remove Claim"
        >
          <Trash2 size={18} />
        </button>
      </div>
    ) }
  ];

  const renderModalContent = () => {
    if (!confirmConfig.claim) return { title: '', message: '', style: 'danger', confirmText: '' };
    const id = confirmConfig.claim.id;
    switch (confirmConfig.type) {
      case 'cancel':
        return { 
          title: 'Cancel Claim?', 
          message: `Are you sure you want to cancel claim ${id}? This will notify the NGO and revert the food listing to Available.`,
          style: 'danger', confirmText: 'Cancel Claim'
        };
      case 'remove':
        return { 
          title: 'Delete Claim Record?', 
          message: `Are you sure you want to permanently delete claim ${id}? This action cannot be undone.`,
          style: 'danger', confirmText: 'Delete Permanently'
        };
      default: return { title: '', message: '', style: 'danger', confirmText: '' };
    }
  };

  const modalConfig = renderModalContent();

  // Helper to find associated food listing for drawer
  const getAssociatedFood = (foodId) => {
    return foodListings.find(f => f.id === foodId) || null;
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Claims Management</h2>
          <p className="text-gray-500 mt-1">Track and manage food claims made by NGOs.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative md:col-span-2 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by Claim ID, Food ID, or Donor..." 
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
          <option value="Claimed">Claimed</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <select 
          value={ngoFilter} 
          onChange={(e) => setNgoFilter(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 bg-white"
        >
          <option value="All">All NGOs</option>
          {ngos.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-500 font-medium">
        {filteredClaims.length} claim{filteredClaims.length !== 1 && 's'} found
      </div>

      {/* Empty State vs Data Table */}
      {filteredClaims.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-200 border-dashed">
          <Search className="mx-auto h-12 w-12 text-gray-300 mb-3" />
          <p className="text-gray-900 font-medium text-lg">No claims found</p>
          <p className="text-gray-500">Try changing your filters or search term.</p>
          <button 
            onClick={() => { setSearchTerm(''); setStatusFilter('All'); setNgoFilter('All'); }}
            className="mt-4 px-4 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-md hover:bg-green-100 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <DataTable columns={columns} data={filteredClaims} />
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal 
        isOpen={confirmConfig.isOpen}
        onClose={() => setConfirmConfig({ isOpen: false, type: null, claim: null })}
        onConfirm={executeAction}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        confirmStyle={modalConfig.style}
      />

      {/* Details Drawer */}
      <DetailDrawer 
        isOpen={!!selectedClaim} 
        onClose={() => setSelectedClaim(null)} 
        title="Claim Details"
      >
        {selectedClaim && (
          <div className="space-y-6">
            
            {/* Top Status */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedClaim.id}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Claimed at {new Date(selectedClaim.claimedTime).toLocaleString()}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <StatusBadge status={selectedClaim.claimStatus} />
                <StatusBadge status={selectedClaim.pickupStatus} />
              </div>
            </div>

            {/* NGO Section */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Building2 size={14} /> Claimed By (NGO)
              </h4>
              <p className="font-semibold text-gray-900 text-lg">{selectedClaim.ngo}</p>
            </div>

            {/* Food Listing Section */}
            <div className="border border-gray-200 rounded-lg p-4 space-y-4">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
                <Package size={14} /> Associated Food Listing
              </h4>
              
              {getAssociatedFood(selectedClaim.foodId) ? (
                <>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900">{getAssociatedFood(selectedClaim.foodId).name}</p>
                      <p className="text-sm text-gray-500">{selectedClaim.foodId}</p>
                    </div>
                    <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded text-gray-700">
                      {getAssociatedFood(selectedClaim.foodId).quantity}
                    </span>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-3">
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <User size={12} /> Donor
                    </p>
                    <p className="text-sm font-medium text-gray-900">{selectedClaim.donor}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                      <MapPin size={12} /> Pickup Location
                    </p>
                    <p className="text-sm font-medium text-gray-900">{getAssociatedFood(selectedClaim.foodId).location}</p>
                  </div>
                </>
              ) : (
                <div className="text-sm text-gray-500 italic">
                  Food listing {selectedClaim.foodId} no longer exists or was removed.
                </div>
              )}
            </div>
            
            {/* Timeline */}
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 mt-6">Claim Lifecycle</h4>
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white bg-green-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-semibold text-gray-900 text-sm">Claim Initiated</div>
                      <time className="text-[10px] font-medium text-gray-500 whitespace-nowrap ml-2">
                        {new Date(selectedClaim.claimedTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </time>
                    </div>
                    <div className="text-xs text-gray-600">By {selectedClaim.ngo}</div>
                  </div>
                </div>

                {['En Route', 'Delivered'].includes(selectedClaim.pickupStatus) && (
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white bg-blue-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-semibold text-gray-900 text-sm">Pickup Assigned</div>
                      </div>
                      <div className="text-xs text-gray-600">Volunteer dispatched</div>
                    </div>
                  </div>
                )}
                
                {selectedClaim.claimStatus === 'Completed' && (
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white bg-green-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-semibold text-gray-900 text-sm">Completed</div>
                      </div>
                      <div className="text-xs text-gray-600">Food successfully delivered</div>
                    </div>
                  </div>
                )}

                {selectedClaim.claimStatus === 'Cancelled' && (
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white bg-red-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-white p-3 rounded-lg border border-gray-200 shadow-sm border-red-100">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-semibold text-red-700 text-sm">Cancelled</div>
                      </div>
                      <div className="text-xs text-gray-600">Claim was aborted</div>
                    </div>
                  </div>
                )}
                
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-gray-200 flex gap-3">
              {selectedClaim.claimStatus === 'Claimed' && (
                <button 
                  onClick={() => handleAction('cancel', selectedClaim)}
                  className="flex-1 flex justify-center items-center gap-2 px-4 py-2 border border-orange-300 text-orange-700 bg-orange-50 rounded-md hover:bg-orange-100 transition-colors font-medium text-sm"
                >
                  <XCircle size={16} /> Cancel Claim
                </button>
              )}
              <button 
                onClick={() => handleAction('remove', selectedClaim)}
                className="flex-1 flex justify-center items-center gap-2 px-4 py-2 border border-red-300 text-red-700 bg-red-50 rounded-md hover:bg-red-100 transition-colors font-medium text-sm"
              >
                <Trash2 size={16} /> Remove Record
              </button>
            </div>
            
          </div>
        )}
      </DetailDrawer>
    </div>
  );
}
