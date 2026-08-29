import React, { useState, useMemo } from 'react';
import { Target, Search, Clock, Info, CheckCircle2 } from 'lucide-react';
import { foodData } from '../../common/data/foodData';
import { mockNgoProfile } from '../../common/data/mockSmartMatchData';
import { calculateFoodMatchScore } from '../../common/utils/smartMatchUtils';
import RecommendedFoodCard from '../components/RecommendedFoodCard';
import ClaimFoodModal from '../components/ClaimFoodModal';

export default function RecommendedFood() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [successToast, setSuccessToast] = useState(null);
  const [claimedDonations, setClaimedDonations] = useState(new Set());

  // Generate recommendations
  const recommendations = useMemo(() => {
    // 1. Filter out claimed/unavailable donations and apply search query
    let availableFood = foodData.filter(food => 
      food.status !== 'Claimed' && !claimedDonations.has(food.id)
    );

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      availableFood = availableFood.filter(food => 
        food.title.toLowerCase().includes(q) || 
        food.donor.toLowerCase().includes(q) ||
        food.foodType.toLowerCase().includes(q)
      );
    }

    // 2. Calculate scores
    const scored = availableFood.map(donation => {
      const matchResult = calculateFoodMatchScore(donation, mockNgoProfile);
      return {
        donation,
        matchResult
      };
    });

    // 3. Sort by total score descending
    return scored.sort((a, b) => b.matchResult.totalScore - a.matchResult.totalScore);
  }, [searchQuery, claimedDonations]);

  const handleClaimConfirm = (donation) => {
    // Add to claimed set
    setClaimedDonations(prev => new Set([...prev, donation.id]));
    
    // Show toast
    setSuccessToast(`"${donation.title}" has been successfully claimed.`);
    setTimeout(() => setSuccessToast(null), 3500);
    
    setSelectedDonation(null);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Toast */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#064e3b] text-white px-4 py-3 rounded-xl shadow-lg border border-emerald-600 animate-slideUp text-sm font-medium">
          <CheckCircle2 size={18} className="text-emerald-300 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <nav className="text-xs font-medium text-slate-500 mb-2 select-none">
          <span>Home</span>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-700">Recommended Food</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-sm shadow-amber-200/50">
                <Target size={26} className="stroke-[2.5]" />
              </div>
              Recommended Food
            </h1>
            <p className="text-slate-500 mt-3 text-base leading-relaxed">
              Find food donations that best match your organization's needs based on your requirements, capacity, urgency, location, and donor reliability.
            </p>
          </div>
          
          {/* Search / Filter */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search recommendations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border-2 border-slate-200 rounded-xl text-sm focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 transition-all font-medium text-slate-700 placeholder-slate-400 shadow-sm"
            />
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 stroke-[2.5]" />
          </div>
        </div>
      </div>

      {/* Info Alert */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3 text-blue-800 shadow-sm">
        <Info size={20} className="shrink-0 text-blue-500 mt-0.5" />
        <div>
          <h4 className="font-bold text-sm">How recommendations work</h4>
          <p className="text-xs text-blue-700 mt-1 leading-snug">
            We evaluate available donations against {mockNgoProfile.name}'s profile. The Match Score considers location (30%), food need match (30%), capacity limits (20%), urgency (10%), and donor trust score (10%).
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">
            {recommendations.length} {recommendations.length === 1 ? 'Match' : 'Matches'} Found
          </h2>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <Clock size={14} className="stroke-[2.5]" />
            Updated just now
          </div>
        </div>

        {recommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {recommendations.map((rec, index) => (
              <RecommendedFoodCard 
                key={rec.donation.id} 
                donation={rec.donation}
                matchResult={rec.matchResult}
                isBestMatch={index === 0 && rec.matchResult.totalScore > 75}
                onView={(donation) => setSelectedDonation(donation)} // Viewing currently opens claim modal, could be changed
                onClaim={(donation) => setSelectedDonation(donation)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 text-slate-400 flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Search size={24} className="stroke-[2]" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No recommendations found</h3>
            <p className="text-sm text-slate-500">
              {searchQuery 
                ? "Try adjusting your search terms."
                : "No food donations currently match your organization's needs."}
            </p>
          </div>
        )}
      </div>

      {/* Claim Food Modal (Reused) */}
      <ClaimFoodModal
        item={selectedDonation}
        isOpen={Boolean(selectedDonation)}
        onClose={() => setSelectedDonation(null)}
        onConfirm={handleClaimConfirm}
      />
    </div>
  );
}
