import React, { useState } from 'react';
import { Search, Filter, Download, MoreVertical, Eye, ShieldOff, Shield, Trash2, Mail, Phone, MapPin, Calendar as CalIcon } from 'lucide-react';
import DataTable from '../../common/components/DataTable';
import StatusBadge from '../../common/components/StatusBadge';
import DetailDrawer from '../components/DetailDrawer';
import ConfirmationModal from '../components/ConfirmationModal';
import { useAdminData } from '../context/AdminDataContext';

export default function Users() {
  const { users, setUsers, addToast } = useAdminData();
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // UI State
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmConfig, setConfirmConfig] = useState({ isOpen: false, type: null, user: null });

  // Filtering Logic
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // Actions
  const handleAction = (type, user) => {
    setConfirmConfig({ isOpen: true, type, user });
  };

  const executeAction = () => {
    const { type, user } = confirmConfig;
    if (!user) return;

    if (type === 'suspend') {
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: 'Suspended' } : u));
      addToast(`${user.name} has been suspended.`, 'error');
    } else if (type === 'activate') {
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: 'Active' } : u));
      addToast(`${user.name} is now active.`, 'success');
    } else if (type === 'delete') {
      setUsers(prev => prev.filter(u => u.id !== user.id));
      addToast(`${user.name} has been permanently deleted.`, 'info');
      if (selectedUser && selectedUser.id === user.id) setSelectedUser(null);
    }
  };

  // Columns for DataTable
  const columns = [
    { header: 'User ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Role', accessor: 'role' },
    { header: 'Email', accessor: 'email' },
    { header: 'Status', render: (row) => <StatusBadge status={row.status} /> },
    { header: 'Actions', render: (row) => (
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setSelectedUser(row)}
          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          title="View Details"
        >
          <Eye size={18} />
        </button>
        {row.status === 'Active' ? (
          <button 
            onClick={() => handleAction('suspend', row)}
            className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-md transition-colors"
            title="Suspend User"
          >
            <ShieldOff size={18} />
          </button>
        ) : (
          <button 
            onClick={() => handleAction('activate', row)}
            className="p-1.5 text-green-600 hover:bg-green-50 rounded-md transition-colors"
            title="Activate User"
          >
            <Shield size={18} />
          </button>
        )}
        <button 
          onClick={() => handleAction('delete', row)}
          className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition-colors"
          title="Delete User"
        >
          <Trash2 size={18} />
        </button>
      </div>
    ) }
  ];

  const renderModalContent = () => {
    if (!confirmConfig.user) return { title: '', message: '', style: 'danger', confirmText: '' };
    const name = confirmConfig.user.name;
    switch (confirmConfig.type) {
      case 'suspend':
        return { 
          title: 'Suspend User?', 
          message: `Are you sure you want to suspend ${name}? They will lose access to the platform immediately.`,
          style: 'danger', confirmText: 'Suspend User'
        };
      case 'activate':
        return { 
          title: 'Activate User?', 
          message: `Are you sure you want to activate ${name}? They will regain full access to the platform.`,
          style: 'success', confirmText: 'Activate User'
        };
      case 'delete':
        return { 
          title: 'Delete User?', 
          message: `Are you sure you want to permanently delete ${name}? This action cannot be undone and will remove all their associated data.`,
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
          <h2 className="text-2xl font-bold text-gray-900">Users</h2>
          <p className="text-gray-500 mt-1">Manage all registered users on the platform.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm">
            <Download size={16} />
            Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative md:col-span-2 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <div>
          <select 
            value={roleFilter} 
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 bg-white"
          >
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Donor">Donor</option>
            <option value="NGO">NGO</option>
            <option value="Volunteer">Volunteer</option>
          </select>
        </div>
        <div>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 bg-white"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Suspended">Suspended</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-500 font-medium">
        Filtered results: {filteredUsers.length} user{filteredUsers.length !== 1 && 's'}
      </div>

      {/* Empty State vs Data Table */}
      {filteredUsers.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-200 border-dashed">
          <Search className="mx-auto h-12 w-12 text-gray-300 mb-3" />
          <p className="text-gray-900 font-medium text-lg">No users found</p>
          <p className="text-gray-500">Try changing your filters or search term.</p>
          <button 
            onClick={() => { setSearchTerm(''); setRoleFilter('All'); setStatusFilter('All'); }}
            className="mt-4 px-4 py-2 text-sm font-medium text-green-700 bg-green-50 rounded-md hover:bg-green-100 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <DataTable columns={columns} data={filteredUsers} />
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal 
        isOpen={confirmConfig.isOpen}
        onClose={() => setConfirmConfig({ isOpen: false, type: null, user: null })}
        onConfirm={executeAction}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        confirmStyle={modalConfig.style}
      />

      {/* Details Drawer */}
      <DetailDrawer 
        isOpen={!!selectedUser} 
        onClose={() => setSelectedUser(null)} 
        title="User Details"
      >
        {selectedUser && (
          <div className="space-y-8">
            {/* Profile Header */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-2xl font-bold">
                {selectedUser.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedUser.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm font-medium text-gray-600">{selectedUser.role}</span>
                  <span className="text-gray-300">•</span>
                  <StatusBadge status={selectedUser.status} />
                </div>
              </div>
            </div>

            {/* Contact & Info */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-4 border border-gray-100">
              <div className="flex flex-col gap-3 text-sm text-gray-700">
                <div className="flex items-center gap-3"><Mail size={16} className="text-gray-400" /> {selectedUser.email}</div>
                <div className="flex items-center gap-3"><Phone size={16} className="text-gray-400" /> {selectedUser.phone}</div>
                <div className="flex items-center gap-3"><MapPin size={16} className="text-gray-400" /> {selectedUser.location}</div>
                <div className="flex items-center gap-3"><CalIcon size={16} className="text-gray-400" /> Joined: {selectedUser.joinedDate}</div>
              </div>
            </div>

            {/* Activity/Stats (Mocked dynamically based on role) */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">Activity & Statistics</h4>
              <div className="grid grid-cols-2 gap-4">
                {selectedUser.role === 'Volunteer' && (
                  <>
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-xs text-gray-500 uppercase">Completed Pickups</p>
                      <p className="text-lg font-bold text-gray-900">42</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-xs text-gray-500 uppercase">Rating</p>
                      <p className="text-lg font-bold text-gray-900">4.8 / 5.0</p>
                    </div>
                  </>
                )}
                {selectedUser.role === 'Donor' && (
                  <>
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-xs text-gray-500 uppercase">Total Donations</p>
                      <p className="text-lg font-bold text-gray-900">128</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-xs text-gray-500 uppercase">Food Rescued</p>
                      <p className="text-lg font-bold text-gray-900">540 kg</p>
                    </div>
                  </>
                )}
                {selectedUser.role === 'NGO' && (
                  <>
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-xs text-gray-500 uppercase">Successful Claims</p>
                      <p className="text-lg font-bold text-gray-900">315</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-gray-200">
                      <p className="text-xs text-gray-500 uppercase">People Fed (Est.)</p>
                      <p className="text-lg font-bold text-gray-900">~1,500</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">
              {selectedUser.status === 'Active' ? (
                <button 
                  onClick={() => handleAction('suspend', selectedUser)}
                  className="w-full flex justify-center items-center gap-2 px-4 py-2 border border-orange-300 text-orange-700 bg-orange-50 rounded-md hover:bg-orange-100 transition-colors font-medium text-sm"
                >
                  <ShieldOff size={16} /> Suspend User
                </button>
              ) : (
                <button 
                  onClick={() => handleAction('activate', selectedUser)}
                  className="w-full flex justify-center items-center gap-2 px-4 py-2 border border-green-300 text-green-700 bg-green-50 rounded-md hover:bg-green-100 transition-colors font-medium text-sm"
                >
                  <Shield size={16} /> Activate User
                </button>
              )}
            </div>
          </div>
        )}
      </DetailDrawer>
    </div>
  );
}
