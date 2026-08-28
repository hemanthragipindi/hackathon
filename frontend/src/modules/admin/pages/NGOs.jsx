import React, { useState } from 'react';
import { Search, Eye, CheckCircle, XCircle, Ban, ShieldCheck, MapPin, Phone, Building2, BarChart2, ShieldAlert } from 'lucide-react';
import DataTable from '../../common/components/DataTable';
import StatusBadge from '../../common/components/StatusBadge';
import DetailDrawer from '../components/DetailDrawer';
import ConfirmationModal from '../components/ConfirmationModal';
import { useAdminData } from '../context/AdminDataContext';

export default function NGOs() {
  const { ngos, setNgos, claims, pickups, addToast } = useAdminData();
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [verificationFilter, setVerificationFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');

  // UI State
  const [selectedNgo, setSelectedNgo] = useState(null);
  const [confirmConfig, setConfirmConfig] = useState({ isOpen: false, type: null, ngo: null });

  // Extract unique locations
  const locations = [...new Set(ngos.map(n => n.location))];

  // Helper functions for NGO stats
  const getNgoStats = (ngoOrgName) => {
    const ngoClaims = claims.filter(c => c.ngo === ngoOrgName);
    const totalClaims = ngoClaims.length;
    const completedClaims = ngoClaims.filter(c => c.claimStatus === 'Completed').length;
    
    const ngoPickups = pickups.filter(p => p.ngo === ngoOrgName);
    const completedPickups = ngoPickups.filter(p => p.status === 'Delivered').length;
    
    const successRate = totalClaims > 0 ? Math.round((completedClaims / totalClaims) * 100) : 0;
    
    return { totalClaims, completedClaims, completedPickups, successRate };
  };

  // KPIs
  const totalNgos = ngos.length;
  const verifiedNgos = ngos.filter(n => n.verification === 'Verified').length;
  const pendingNgos = ngos.filter(n => n.verification === 'Pending Verification').length;
  const suspendedNgos = ngos.filter(n => n.regStatus === 'Suspended').length;

  // Filtering Logic
  const filteredNgos = ngos.filter(ngo => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      ngo.organization.toLowerCase().includes(searchLower) ||
      ngo.contact.toLowerCase().includes(searchLower) ||
      ngo.id.toLowerCase().includes(searchLower);
    
    const matchesVerification = verificationFilter === 'All' || ngo.verification === verificationFilter;
    const matchesStatus = statusFilter === 'All' || ngo.regStatus === statusFilter;
    const matchesLocation = locationFilter === 'All' || ngo.location === locationFilter;
    
    return matchesSearch && matchesVerification && matchesStatus && matchesLocation;
  });

  // Actions
  const handleAction = (type, ngo) => {
    setConfirmConfig({ isOpen: true, type, ngo });
  };

  const executeAction = () => {
    const { type, ngo } = confirmConfig;
    if (!ngo) return;

    let newVerification = ngo.verification;
    let newRegStatus = ngo.regStatus;
    let toastMsg = '';
    let toastType = 'success';

    if (type === 'approve') {
      newVerification = 'Verified';
      toastMsg = `${ngo.organization} approved successfully.`;
    } else if (type === 'reject') {
      newVerification = 'Rejected';
      toastMsg = `${ngo.organization}'s verification was rejected.`;
      toastType = 'error';
    } else if (type === 'suspend') {
      newRegStatus = 'Suspended';
      toastMsg = `${ngo.organization} has been suspended.`;
      toastType = 'error';
    } else if (type === 'reactivate') {
      newRegStatus = 'Active';
      toastMsg = `${ngo.organization} has been reactivated.`;
    }

    setNgos(prev => prev.map(n => n.id === ngo.id ? { ...n, verification: newVerification, regStatus: newRegStatus } : n));
    addToast(toastMsg, toastType);
    
    if (selectedNgo && selectedNgo.id === ngo.id) {
      setSelectedNgo({ ...ngo, verification: newVerification, regStatus: newRegStatus });
    }
  };

  // Columns for DataTable
  const columns = [
    { header: 'Organization', render: (row) => (
      <div>
        <p className="font-medium text-gray-900">{row.organization}</p>
        <p className="text-xs text-gray-500">{row.id}</p>
      </div>
    )},
    { header: 'Contact Person', accessor: 'contact' },
    { header: 'Location', render: (row) => (
      <div>
        <p className="text-gray-900 text-sm">{row.location}</p>
        <p className="text-xs text-gray-500">{row.serviceArea}</p>
      </div>
    )},
    { header: 'Claims', render: (row) => {
      const stats = getNgoStats(row.organization);
      return (
        <div className="text-sm">
          <span className="font-medium text-gray-900">{stats.totalClaims}</span> total
          <span className="text-gray-400 mx-1">|</span>
          <span className="text-green-600">{stats.completedClaims}</span> completed
        </div>
      );
    }},
    { header: 'Status', render: (row) => <StatusBadge status={row.regStatus} /> },
    { header: 'Verification', render: (row) => <StatusBadge status={row.verification} /> },
    { header: 'Actions', render: (row) => (
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setSelectedNgo(row)}
          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          title="View Details"
        >
          <Eye size={18} />
        </button>
        {row.verification === 'Pending Verification' && (
          <button 
            onClick={() => handleAction('approve', row)}
            className="p-1.5 text-green-600 hover:bg-green-50 rounded-md transition-colors"
            title="Approve NGO"
          >
            <CheckCircle size={18} />
          </button>
        )}
      </div>
    ) }
  ];

  const renderModalContent = () => {
    if (!confirmConfig.ngo) return { title: '', message: '', style: 'primary', confirmText: '' };
    const org = confirmConfig.ngo.organization;
    switch (confirmConfig.type) {
      case 'approve':
        return { 
          title: 'Approve NGO?', 
          message: `This organization (${org}) will become verified and can start claiming food listings.`,
          style: 'primary', confirmText: 'Approve'
        };
      case 'reject':
        return { 
          title: 'Reject NGO?', 
          message: `Please confirm this verification decision. ${org} will be rejected.`,
          style: 'danger', confirmText: 'Reject'
        };
      case 'suspend':
        return { 
          title: 'Suspend NGO?', 
          message: `Are you sure you want to suspend ${org}? They will no longer be able to claim food or login.`,
          style: 'danger', confirmText: 'Suspend'
        };
      case 'reactivate':
        return { 
          title: 'Reactivate NGO?', 
          message: `Are you sure you want to reactivate ${org}? Their account privileges will be restored.`,
          style: 'primary', confirmText: 'Reactivate'
        };
      default: return { title: '', message: '', style: 'primary', confirmText: '' };
    }
  };

  const modalConfig = renderModalContent();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">NGO Management</h2>
          <p className="text-gray-500 mt-1">Verify, manage, and monitor partner organizations.</p>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total NGOs</p>
            <p className="text-2xl font-bold text-gray-900">{totalNgos}</p>
          </div>
          <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
            <Building2 size={20} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Verified</p>
            <p className="text-2xl font-bold text-gray-900">{verifiedNgos}</p>
          </div>
          <div className="h-10 w-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
            <ShieldCheck size={20} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Pending Verification</p>
            <p className="text-2xl font-bold text-gray-900">{pendingNgos}</p>
          </div>
          <div className="h-10 w-10 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center">
            <ShieldAlert size={20} />
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Suspended</p>
            <p className="text-2xl font-bold text-gray-900">{suspendedNgos}</p>
          </div>
          <div className="h-10 w-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center">
            <Ban size={20} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by Org, ID, Contact..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <select 
          value={verificationFilter} 
          onChange={(e) => setVerificationFilter(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 bg-white"
        >
          <option value="All">All Verification Statuses</option>
          <option value="Verified">Verified</option>
          <option value="Pending Verification">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 bg-white"
        >
          <option value="All">All Account Statuses</option>
          <option value="Registered">Registered</option>
          <option value="Active">Active</option>
          <option value="Suspended">Suspended</option>
        </select>
        <select 
          value={locationFilter} 
          onChange={(e) => setLocationFilter(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 bg-white"
        >
          <option value="All">All Locations</option>
          {locations.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-500 font-medium">
        {filteredNgos.length} NGO{filteredNgos.length !== 1 && 's'} found
      </div>

      {/* Table */}
      {filteredNgos.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-200 border-dashed">
          <Building2 className="mx-auto h-12 w-12 text-gray-300 mb-3" />
          <p className="text-gray-900 font-medium text-lg">No NGOs found</p>
          <p className="text-gray-500">Try changing your filters or search term.</p>
        </div>
      ) : (
        <DataTable columns={columns} data={filteredNgos} />
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal 
        isOpen={confirmConfig.isOpen}
        onClose={() => setConfirmConfig({ isOpen: false, type: null, ngo: null })}
        onConfirm={executeAction}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        confirmStyle={modalConfig.style}
      />

      {/* Details Drawer */}
      <DetailDrawer 
        isOpen={!!selectedNgo} 
        onClose={() => setSelectedNgo(null)} 
        title="NGO Profile"
      >
        {selectedNgo && (
          <div className="space-y-6">
            
            {/* Top Identity */}
            <div className="flex flex-col gap-2 border-b border-gray-100 pb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">{selectedNgo.organization}</h3>
                <span className="text-sm font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded">{selectedNgo.id}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <StatusBadge status={selectedNgo.verification} />
                <StatusBadge status={selectedNgo.regStatus} />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              
              {/* Contact Information */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-2">
                  <Phone size={14} /> Contact Information
                </h4>
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{selectedNgo.contact}</p>
                  <p className="text-gray-600 mt-1">Primary Representative</p>
                </div>
              </div>

              {/* Location */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-2">
                  <MapPin size={14} /> Location & Service Area
                </h4>
                <div className="text-sm space-y-2">
                  <p><span className="font-medium text-gray-700">HQ Location:</span> {selectedNgo.location}</p>
                  <p><span className="font-medium text-gray-700">Service Area:</span> {selectedNgo.serviceArea}</p>
                </div>
              </div>

              {/* Verification Information */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-2">
                  <ShieldCheck size={14} /> Verification Info
                </h4>
                <div className="text-sm space-y-2">
                  <p><span className="font-medium text-gray-700">Status:</span> {selectedNgo.verification}</p>
                  <p><span className="font-medium text-gray-700">Submitted Date:</span> 2023-10-15</p>
                  <div className="mt-3">
                    <p className="font-medium text-gray-700 mb-1">Documents:</p>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded text-xs cursor-pointer hover:bg-blue-100">80G_Certificate.pdf</span>
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded text-xs cursor-pointer hover:bg-blue-100">Trust_Deed.pdf</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance */}
              <div className="border border-gray-200 p-4 rounded-lg space-y-3">
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-2">
                  <BarChart2 size={14} /> Performance
                </h4>
                {(() => {
                  const stats = getNgoStats(selectedNgo.organization);
                  return (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded border border-gray-100 text-center">
                        <p className="text-xl font-bold text-gray-900">{stats.totalClaims}</p>
                        <p className="text-xs text-gray-500">Total Claims</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded border border-green-100 text-center">
                        <p className="text-xl font-bold text-green-700">{stats.successRate}%</p>
                        <p className="text-xs text-green-600">Success Rate</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded border border-gray-100 text-center">
                        <p className="text-xl font-bold text-gray-900">{stats.completedClaims}</p>
                        <p className="text-xs text-gray-500">Successful Claims</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded border border-blue-100 text-center">
                        <p className="text-xl font-bold text-blue-700">{stats.completedPickups}</p>
                        <p className="text-xs text-blue-600">Completed Pickups</p>
                      </div>
                    </div>
                  );
                })()}
              </div>

            </div>

            {/* Admin Actions */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Admin Actions</h4>
              
              {selectedNgo.verification === 'Pending Verification' && (
                <div className="flex gap-3 mb-3">
                  <button onClick={() => handleAction('approve', selectedNgo)} className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium text-sm flex justify-center items-center gap-2">
                    <CheckCircle size={16} /> Approve
                  </button>
                  <button onClick={() => handleAction('reject', selectedNgo)} className="flex-1 px-4 py-2 border border-red-300 text-red-700 bg-red-50 rounded-md hover:bg-red-100 transition-colors font-medium text-sm flex justify-center items-center gap-2">
                    <XCircle size={16} /> Reject
                  </button>
                </div>
              )}

              <div className="flex gap-3">
                {selectedNgo.regStatus !== 'Suspended' ? (
                  <button onClick={() => handleAction('suspend', selectedNgo)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-md hover:bg-gray-50 transition-colors font-medium text-sm flex justify-center items-center gap-2">
                    <Ban size={16} /> Suspend Account
                  </button>
                ) : (
                  <button onClick={() => handleAction('reactivate', selectedNgo)} className="flex-1 px-4 py-2 border border-blue-300 text-blue-700 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors font-medium text-sm flex justify-center items-center gap-2">
                    <CheckCircle size={16} /> Reactivate Account
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
