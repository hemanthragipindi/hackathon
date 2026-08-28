import React, { useState } from 'react';
import { X, CheckCircle, Bike, Star, Phone, UserCheck } from 'lucide-react';
import { volunteersData } from '../../../data/mockData';

export default function AssignPickupModal({ pickup, isOpen, onClose, onAssign }) {
  const [selectedVolunteer, setSelectedVolunteer] = useState('VOL-001');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !pickup) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const vol = volunteersData.find(v => v.id === selectedVolunteer) || { name: 'Rahul Kumar' };
    setTimeout(() => {
      setIsSubmitting(false);
      onAssign(pickup.id, vol.name);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <UserCheck size={20} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Assign Volunteer Driver</h3>
            <p className="text-xs text-gray-500">Pickup: {pickup.title} • {pickup.donor}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Available Volunteers in Area
            </label>
            {volunteersData.map((v) => (
              <label
                key={v.id}
                className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition ${
                  selectedVolunteer === v.id
                    ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-600'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="volunteer"
                    value={v.id}
                    checked={selectedVolunteer === v.id}
                    onChange={() => setSelectedVolunteer(v.id)}
                    className="text-emerald-700 focus:ring-emerald-700"
                  />
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{v.name}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-2">
                      <span>{v.location}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5 text-amber-600 font-medium">
                        <Star size={12} className="fill-amber-500" /> {v.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                  v.availability === 'Available' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {v.availability}
                </span>
              </label>
            ))}
          </div>

          <div className="pt-3 flex items-center justify-end gap-3">
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
              className="px-5 py-2 text-sm font-semibold text-white bg-[#064e3b] hover:bg-[#043d2c] rounded-lg shadow-sm transition disabled:opacity-50"
            >
              {isSubmitting ? 'Assigning...' : 'Confirm Assignment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
