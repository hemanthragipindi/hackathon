import React, { useState } from 'react';
import { X, CheckCircle, Clock, MapPin, AlertCircle, Sparkles } from 'lucide-react';

export default function ClaimFoodModal({ item, isOpen, onClose, onConfirm }) {
  const [targetShelter, setTargetShelter] = useState('Sunshine Community Shelter');
  const [estimatedArrival, setEstimatedArrival] = useState('1:30 PM');
  const [notes, setNotes] = useState('Will bring insulated boxes for safe transport.');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !item) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onConfirm(item);
        onClose();
      }, 1000);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-100 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition"
        >
          <X size={20} />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Food Claimed Successfully!</h3>
            <p className="text-sm text-gray-500">
              Notification sent to {item.donor}. Pickup dispatch is scheduled.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center font-bold">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Claim Food Donation</h3>
                <p className="text-xs text-gray-500">Helping Hands NGO • Instant Claim</p>
              </div>
            </div>

            {/* Donation Summary Card */}
            <div className="p-4 bg-green-50/70 border border-green-100 rounded-xl mb-5">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-gray-900">{item.title}</h4>
                <span className="text-xs font-semibold px-2 py-0.5 bg-green-200/80 text-green-800 rounded">
                  {item.distance}
                </span>
              </div>
              <p className="text-sm text-gray-700 font-medium mt-1">
                {item.quantity ? `${item.quantity} • ` : ''}{item.donor}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-gray-600 mt-2 font-medium">
                <Clock size={14} className="text-green-700" />
                <span>Pickup: {item.pickupTime}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Distribution Beneficiary / Shelter
                </label>
                <select
                  value={targetShelter}
                  onChange={(e) => setTargetShelter(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600"
                >
                  <option value="Sunshine Community Shelter">Sunshine Community Shelter (120 people)</option>
                  <option value="North District Orphanage">North District Orphanage (65 people)</option>
                  <option value="Hope Care Elderly Home">Hope Care Elderly Home (45 people)</option>
                  <option value="Direct Slum Community Distribution">Direct Slum Community Distribution</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Estimated Pickup Arrival
                </label>
                <input
                  type="text"
                  value={estimatedArrival}
                  onChange={(e) => setEstimatedArrival(e.target.value)}
                  placeholder="e.g. 1:30 PM"
                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                  Logistics Notes for Donor
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-sm font-semibold text-white bg-[#064e3b] hover:bg-[#043d2c] rounded-lg shadow-sm transition disabled:opacity-50 flex items-center gap-2"
                >
                  {isSubmitting ? 'Confirming...' : 'Confirm & Claim Food'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
