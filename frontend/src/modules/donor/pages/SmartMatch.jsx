import React, { useState, useMemo } from 'react';
import { Target, Search, Clock, Info, CheckCircle2, MapPin, Package } from 'lucide-react';
import { foodData } from '../../common/data/foodData';
import { mockSmartMatchNGOs } from '../../common/data/mockSmartMatchData';
import { calculateMatchScore } from '../../common/utils/smartMatchUtils';
import NGOMatchCard from '../components/NGOMatchCard';
import NGODetailsModal from '../components/NGODetailsModal';

// Temporary dummy notification system
function NotificationToast({ message, show }) {
  if (!show) return null;
  return (
    <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-xl flex items-center gap-3 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
      <CheckCircle2 size={18} className="text-emerald-400" />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}

export default function SmartMatch() {
  const [selectedDonationId, setSelectedDonationId] = useState(null);
  const [selectedNgo, setSelectedNgo] = useState(null);
  const [notifiedNgos, setNotifiedNgos] = useState({});
  const [toastMessage, setToastMessage] = useState('');

  // Filter donor's active donations
  // In a real app, we'd fetch this from the backend or context for the specific logged-in donor
  const activeDonations = foodData.filter(
    (food) => food.status === 'Available' && food.donor === 'Green Hotel' // Mocking "Green Hotel" or we can just show a few
  );

  // If no "Green Hotel", just use the first two available for demo
  const displayDonations = activeDonations.length > 0 
    ? activeDonations 
    : foodData.filter(food => food.status === 'Available').slice(0, 2);

  const selectedDonation = displayDonations.find(d => d.id === selectedDonationId) || null;

  // Calculate matches when a donation is selected
  const matches = useMemo(() => {
    if (!selectedDonation) return [];
    
    return mockSmartMatchNGOs
      .map(ngo => {
        const result = calculateMatchScore(selectedDonation, ngo);
        return { ngo, result };
      })
      .sort((a, b) => b.result.totalScore - a.result.totalScore); // Sort descending
  }, [selectedDonation]);

  const handleNotify = (ngoId, ngoName) => {
    setNotifiedNgos(prev => ({ ...prev, [ngoId]: true }));
    setToastMessage(`${ngoName} has been notified about your donation.`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  return (
    <div className="max-w-[1000px] mx-auto pb-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
          <Target className="text-emerald-500" size={32} />
          Smart Match
        </h1>
        <p className="text-slate-500 mt-2 font-medium">
          Find the right nearby NGO for your surplus food.
        </p>
      </div>

      <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 mb-8 flex items-start gap-3">
        <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800 font-medium leading-relaxed">
          Smart Match recommends NGOs that are best suited for your donation based on location, food requirements, capacity, availability, urgency, and trust. 
          <span className="block mt-1 font-semibold text-blue-900">
            Note: This is a recommendation layer. Actual claims will still process through the Food Hub.
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Active Donations */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
            Your Available Donations
          </h2>

          {displayDonations.length === 0 ? (
            <div className="text-center p-8 border border-dashed border-slate-200 rounded-2xl">
              <Package size={32} className="mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-medium text-slate-500">No active donations available for Smart Match.</p>
            </div>
          ) : (
            displayDonations.map(donation => {
              const isSelected = selectedDonationId === donation.id;
              
              // Calculate urgency
              let urgencyColor = 'bg-emerald-500';
              let urgencyText = 'Normal';
              if (donation.expiresIn.includes('2') || donation.expiresIn.includes('3')) {
                urgencyColor = 'bg-yellow-500';
                urgencyText = 'Urgent';
              } else if (donation.expiresIn.includes('1') || donation.expiresIn.includes('min')) {
                urgencyColor = 'bg-red-500';
                urgencyText = 'Critical';
              }

              return (
                <div 
                  key={donation.id}
                  className={`bg-white rounded-2xl border transition-all ${
                    isSelected 
                      ? 'border-slate-900 shadow-md ring-1 ring-slate-900' 
                      : 'border-slate-200 shadow-xs hover:border-slate-300'
                  }`}
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-slate-900 pr-4">{donation.title}</h3>
                      <div className={`shrink-0 flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        isSelected ? 'bg-slate-100 text-slate-700' : 'bg-slate-50 text-slate-500'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${urgencyColor}`}></div>
                        {urgencyText}
                      </div>
                    </div>
                    
                    <p className="text-xs font-semibold text-emerald-600 mb-3">{donation.quantity}</p>
                    
                    <div className="flex flex-col gap-1.5 text-xs text-slate-500 font-medium mb-5">
                      <p className="flex items-center gap-1.5"><MapPin size={14} /> {donation.location}</p>
                      <p className="flex items-center gap-1.5"><Clock size={14} /> Available: {donation.expiresIn}</p>
                    </div>

                    <button 
                      onClick={() => setSelectedDonationId(isSelected ? null : donation.id)}
                      className={`w-full py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2 ${
                        isSelected 
                          ? 'bg-slate-900 text-white' 
                          : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {isSelected ? 'Viewing Matches' : 'Find Matches'}
                      {!isSelected && <Search size={16} />}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Column: Recommendations */}
        <div className="lg:col-span-7">
          {selectedDonationId ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                  Recommended NGOs
                </h2>
                <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                  {matches.length} found
                </span>
              </div>
              
              {matches.length === 0 ? (
                <div className="text-center p-8 border border-dashed border-slate-200 rounded-2xl bg-white">
                  <p className="text-sm font-medium text-slate-500">No suitable NGO matches found yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                  {matches.map(({ ngo, result }, index) => (
                    <NGOMatchCard 
                      key={ngo.id} 
                      ngo={ngo} 
                      matchResult={result} 
                      isBestMatch={index === 0} 
                      notified={!!notifiedNgos[`${selectedDonationId}-${ngo.id}`]}
                      onView={() => setSelectedNgo({ ngo, result })}
                      onNotify={() => handleNotify(`${selectedDonationId}-${ngo.id}`, ngo.name)}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="h-full min-h-[300px] flex items-center justify-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
              <div className="text-center max-w-sm px-6">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center mx-auto mb-4">
                  <Target size={28} className="text-emerald-400" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Select a Donation</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  Choose one of your available donations from the list to see AI-recommended NGO matches.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals & Toasts */}
      <NGODetailsModal 
        ngo={selectedNgo?.ngo} 
        matchResult={selectedNgo?.result}
        onClose={() => setSelectedNgo(null)}
        notified={selectedNgo ? !!notifiedNgos[`${selectedDonationId}-${selectedNgo.ngo.id}`] : false}
        onNotify={() => {
          if (selectedNgo) {
            handleNotify(`${selectedDonationId}-${selectedNgo.ngo.id}`, selectedNgo.ngo.name);
            setSelectedNgo(null);
          }
        }}
      />

      <NotificationToast message={toastMessage} show={!!toastMessage} />
    </div>
  );
}
