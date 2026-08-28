import React from 'react';
import { Calendar, Clock, MapPin, Package } from 'lucide-react';
import StatusBadge from '../../common/components/StatusBadge';

export default function DonationCard({ donation }) {
  // Mapping the conceptual states to UI representation
  const isActive = ['Waiting for Claim', 'Claimed', 'Pickup Assigned', 'Pickup In Progress'].includes(donation.status);
  const isCompleted = donation.status === 'Delivered';
  
  return (
    <div className={`bg-white rounded-xl border shadow-sm overflow-hidden flex flex-col transition-shadow hover:shadow-md ${
      isActive ? 'border-green-200' : 'border-gray-200'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">{donation.name}</h3>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <span className="font-medium text-gray-700">{donation.category}</span>
            <span>•</span>
            <span className="text-gray-500">{donation.id}</span>
          </p>
        </div>
        <StatusBadge status={donation.status} />
      </div>

      {/* Body */}
      <div className="p-4 flex-1 space-y-3">
        <div className="flex items-start gap-3">
          <Package size={16} className="text-gray-400 mt-0.5 shrink-0" />
          <p className="text-sm text-gray-700"><span className="font-medium">Quantity:</span> {donation.quantity}</p>
        </div>
        
        <div className="flex items-start gap-3">
          <Clock size={16} className="text-gray-400 mt-0.5 shrink-0" />
          <div className="text-sm text-gray-700">
            <p><span className="font-medium">Pickup Window:</span> {donation.pickupWindow}</p>
            {isActive && <p className="text-orange-600 text-xs mt-0.5 font-medium">Expires at {donation.deadline}</p>}
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Calendar size={16} className="text-gray-400 mt-0.5 shrink-0" />
          <p className="text-sm text-gray-700"><span className="font-medium">Listed on:</span> {donation.createdDate}</p>
        </div>

        {/* Action/Assignment Area depending on status */}
        {isActive && donation.assignedTo && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-xs text-blue-800 font-medium mb-1">Current Assignment</p>
            <p className="text-sm text-blue-900">{donation.assignedTo}</p>
            {donation.volunteer && <p className="text-xs text-blue-700 mt-1">Driver: {donation.volunteer}</p>}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-white">
        <button className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-1.5 transition-colors">
          View Details
        </button>
        {isActive && !donation.assignedTo && (
          <button className="text-sm font-medium text-white bg-green-600 hover:bg-green-700 px-4 py-1.5 rounded transition-colors">
            Edit
          </button>
        )}
      </div>
    </div>
  );
}
