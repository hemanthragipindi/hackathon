import React from 'react';
import { useReputation } from '../../../context/ReputationContext';
import RewardProgress from '../components/RewardProgress';
import RewardHistory from '../components/RewardHistory';
import TrustBadge from '../components/TrustBadge';
import VerificationBadge from '../components/VerificationBadge';
import { Shield, Medal } from 'lucide-react';

export default function ReputationProfile({ userId, userType }) {
  const { getProfile, calculateTrustScore } = useReputation();
  const profile = getProfile(userId);

  if (!profile) return <div className="p-6">Profile not found.</div>;

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Medal className="text-indigo-600" />
          My Reputation & Rewards
        </h1>
        <p className="text-slate-500 mt-1">Track your trust score, tier progress, and points history.</p>
      </div>

      {/* Badges Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {profile.verification && (
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-center">
            <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Shield size={18} className="text-emerald-600" /> Verification Status
            </h3>
            <VerificationBadge verified={profile.verification.verified} verifiedAt={profile.verification.verifiedAt} />
          </div>
        )}
        
        {profile.trust && (
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs flex flex-col justify-center">
             <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Shield size={18} className="text-blue-600" /> Trust Metrics
            </h3>
            <TrustBadge 
              trustScore={calculateTrustScore(profile.trust.metrics)} 
              metrics={profile.trust.metrics} 
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
           {/* Reward Progress */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Current Tier</h3>
            <RewardProgress points={profile.rewards.points} tier={profile.rewards.tier} />
          </div>
        </div>
        
        <div className="lg:col-span-1">
          {/* History */}
          <RewardHistory transactions={profile.transactions} />
        </div>
      </div>
    </div>
  );
}
