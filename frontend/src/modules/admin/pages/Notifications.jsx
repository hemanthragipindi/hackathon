import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, Bell, CheckCircle2, AlertTriangle, Info, XCircle, 
  Trash2, Check, Filter, MoreVertical, Eye, Trash, BellOff
} from 'lucide-react';
import { useAdminData } from '../context/AdminDataContext';
import DetailDrawer from '../components/DetailDrawer';
import ConfirmationModal from '../components/ConfirmationModal';
import DataTable from '../../common/components/DataTable';

export default function Notifications() {
  const { notifications, setNotifications, addToast } = useAdminData();
  const navigate = useNavigate();
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [readFilter, setReadFilter] = useState('All');

  // UI State
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [confirmConfig, setConfirmConfig] = useState({ isOpen: false, action: null, targetId: null });

  // Filtering Logic
  const filteredNotifications = notifications.filter(notif => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      notif.title.toLowerCase().includes(searchLower) ||
      notif.description.toLowerCase().includes(searchLower);
    
    const matchesCategory = categoryFilter === 'All' || notif.category === categoryFilter;
    const matchesType = typeFilter === 'All' || notif.type === typeFilter;
    const matchesRead = readFilter === 'All' 
      ? true 
      : readFilter === 'Read' ? notif.read : !notif.read;
    
    return matchesSearch && matchesCategory && matchesType && matchesRead;
  });

  // Actions
  const handleMarkAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    addToast('Notification marked as read');
  };

  const handleMarkAsUnread = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: false } : n));
    addToast('Notification marked as unread');
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    addToast('All notifications marked as read', 'success');
  };

  const executeBulkAction = () => {
    const { action, targetId } = confirmConfig;
    
    if (action === 'delete') {
      setNotifications(prev => prev.filter(n => n.id !== targetId));
      addToast('Notification deleted successfully', 'success');
      if (selectedNotification?.id === targetId) setSelectedNotification(null);
    } else if (action === 'clear_all') {
      setNotifications([]);
      addToast('All notifications cleared', 'success');
    }
  };

  // Helper icons
  const getTypeIcon = (type) => {
    switch (type) {
      case 'Success': return <CheckCircle2 size={18} className="text-green-500" />;
      case 'Warning': return <AlertTriangle size={18} className="text-yellow-500" />;
      case 'Error': return <XCircle size={18} className="text-red-500" />;
      case 'Information': default: return <Info size={18} className="text-blue-500" />;
    }
  };

  const getEntityName = (path) => {
    if (!path) return '';
    if (path.includes('food')) return 'Food Listing';
    if (path.includes('claims')) return 'Claim';
    if (path.includes('pickups')) return 'Pickup';
    if (path.includes('users')) return 'User';
    if (path.includes('ngos')) return 'NGO';
    return 'Entity';
  };

  // Table Columns
  const columns = [
    { header: 'Type', render: (row) => (
      <div className="flex items-center gap-2">
        {getTypeIcon(row.type)}
        <span className="text-xs font-medium text-gray-500">{row.category}</span>
      </div>
    )},
    { header: 'Message', render: (row) => (
      <div className={`cursor-pointer ${row.read ? 'text-gray-600' : 'text-gray-900 font-medium'}`} onClick={() => {
        setSelectedNotification(row);
        if (!row.read) handleMarkAsRead(row.id);
      }}>
        <p>{row.title}</p>
        <p className={`text-xs ${row.read ? 'text-gray-400' : 'text-gray-500'} truncate max-w-md`}>{row.description}</p>
      </div>
    )},
    { header: 'Date', render: (row) => (
      <span className="text-sm text-gray-500">{row.timestamp}</span>
    )},
    { header: 'Status', render: (row) => (
      row.read ? (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">Read</span>
      ) : (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">Unread</span>
      )
    )},
    { header: 'Actions', render: (row) => (
      <div className="flex items-center gap-2">
        <button 
          onClick={() => {
            setSelectedNotification(row);
            if (!row.read) handleMarkAsRead(row.id);
          }}
          className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
          title="View Details"
        >
          <Eye size={18} />
        </button>
        {row.read ? (
          <button onClick={() => handleMarkAsUnread(row.id)} className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors" title="Mark as Unread">
            <BellOff size={18} />
          </button>
        ) : (
          <button onClick={() => handleMarkAsRead(row.id)} className="p-1.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors" title="Mark as Read">
            <Check size={18} />
          </button>
        )}
        <button 
          onClick={() => setConfirmConfig({ isOpen: true, action: 'delete', targetId: row.id })}
          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
          title="Delete Notification"
        >
          <Trash2 size={18} />
        </button>
      </div>
    )}
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
          <p className="text-gray-500 mt-1">Manage system alerts and activity logs.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleMarkAllAsRead}
            disabled={notifications.every(n => n.read)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Check size={16} /> Mark All Read
          </button>
          <button 
            onClick={() => setConfirmConfig({ isOpen: true, action: 'clear_all', targetId: null })}
            disabled={notifications.length === 0}
            className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-700 rounded-md bg-red-50 hover:bg-red-100 shadow-sm font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash size={16} /> Clear All
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search messages..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
          />
        </div>
        
        <div className="flex items-center border border-gray-300 rounded-md px-3 bg-white focus-within:ring-1 focus-within:ring-green-500 focus-within:border-green-500">
          <Filter size={16} className="text-gray-400 mr-2" />
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full py-2 text-sm focus:outline-none bg-transparent"
          >
            <option value="All">All Categories</option>
            <option value="Food">Food</option>
            <option value="Claims">Claims</option>
            <option value="Pickups">Pickups</option>
            <option value="Users">Users</option>
            <option value="NGOs">NGOs</option>
            <option value="System">System</option>
          </select>
        </div>

        <select 
          value={typeFilter} 
          onChange={(e) => setTypeFilter(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 bg-white"
        >
          <option value="All">All Types</option>
          <option value="Success">Success</option>
          <option value="Information">Information</option>
          <option value="Warning">Warning</option>
          <option value="Error">Error</option>
        </select>

        <select 
          value={readFilter} 
          onChange={(e) => setReadFilter(e.target.value)}
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 bg-white"
        >
          <option value="All">All Statuses</option>
          <option value="Unread">Unread</option>
          <option value="Read">Read</option>
        </select>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-500 font-medium">
        {filteredNotifications.length} notification{filteredNotifications.length !== 1 && 's'} found
      </div>

      {/* Table / Empty State */}
      {filteredNotifications.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-xl border border-gray-200 border-dashed">
          <Bell className="mx-auto h-12 w-12 text-gray-300 mb-3" />
          <p className="text-gray-900 font-medium text-lg">No notifications</p>
          <p className="text-gray-500">You're all caught up!</p>
        </div>
      ) : (
        <DataTable columns={columns} data={filteredNotifications} />
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal 
        isOpen={confirmConfig.isOpen}
        onClose={() => setConfirmConfig({ isOpen: false, action: null, targetId: null })}
        onConfirm={executeBulkAction}
        title={confirmConfig.action === 'clear_all' ? 'Clear All Notifications?' : 'Delete Notification?'}
        message={confirmConfig.action === 'clear_all' 
          ? 'Are you sure you want to permanently delete all notifications? This action cannot be undone.'
          : 'Are you sure you want to delete this notification?'
        }
        confirmText={confirmConfig.action === 'clear_all' ? 'Clear All' : 'Delete'}
        confirmStyle="danger"
      />

      {/* Detail Drawer */}
      <DetailDrawer 
        isOpen={!!selectedNotification} 
        onClose={() => setSelectedNotification(null)} 
        title="Notification Details"
      >
        {selectedNotification && (
          <div className="space-y-6">
            
            <div className="flex flex-col gap-2 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-50 rounded-full">
                  {getTypeIcon(selectedNotification.type)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedNotification.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{selectedNotification.category}</span>
                    <span className="text-xs text-gray-500">{selectedNotification.timestamp}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Message</h4>
              <p className="text-gray-900 text-sm leading-relaxed">{selectedNotification.description}</p>
            </div>

            <div className="pt-4 space-y-3">
              {selectedNotification.relatedEntity && (
                <button 
                  onClick={() => {
                    navigate(selectedNotification.relatedEntity);
                  }}
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium text-sm flex justify-center items-center gap-2"
                >
                  View Related {getEntityName(selectedNotification.relatedEntity)}
                </button>
              )}
              
              <button 
                onClick={() => setConfirmConfig({ isOpen: true, action: 'delete', targetId: selectedNotification.id })}
                className="w-full px-4 py-2 border border-red-200 text-red-700 bg-red-50 rounded-md hover:bg-red-100 transition-colors font-medium text-sm flex justify-center items-center gap-2"
              >
                <Trash2 size={16} /> Delete Notification
              </button>
            </div>
            
          </div>
        )}
      </DetailDrawer>
    </div>
  );
}
