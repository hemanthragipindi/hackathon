import React from 'react';

const getStatusColor = (status) => {
  const normalizedStatus = status.toLowerCase();
  
  if (normalizedStatus.includes('active') || normalizedStatus.includes('delivered') || normalizedStatus.includes('verified') || normalizedStatus.includes('completed')) {
    return 'bg-green-100 text-green-800 border-green-200';
  }
  if (normalizedStatus.includes('pending') || normalizedStatus.includes('unassigned') || normalizedStatus.includes('available')) {
    return 'bg-yellow-100 text-yellow-800 border-yellow-200';
  }
  if (normalizedStatus.includes('route') || normalizedStatus.includes('assigned') || normalizedStatus.includes('claimed') || normalizedStatus.includes('busy')) {
    return 'bg-blue-100 text-blue-800 border-blue-200';
  }
  if (normalizedStatus.includes('suspended') || normalizedStatus.includes('expired') || normalizedStatus.includes('failed') || normalizedStatus.includes('cancelled')) {
    return 'bg-red-100 text-red-800 border-red-200';
  }
  return 'bg-gray-100 text-gray-800 border-gray-200';
};

export default function StatusBadge({ status }) {
  const colorClasses = getStatusColor(status);
  
  return (
    <span className={`inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium border ${colorClasses}`}>
      {status}
    </span>
  );
}
