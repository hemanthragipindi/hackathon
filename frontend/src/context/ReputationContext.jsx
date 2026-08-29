import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockReputationData } from '../modules/common/data/mockReputationData';

const ReputationContext = createContext();

export function ReputationProvider({ children }) {
  // Store all profiles, keyed by userId
  const [profiles, setProfiles] = useState(mockReputationData);
  
  // For the sake of the demo, we will simulate the "current user"
  // If no user is explicitly set, we'll default to DONOR-1
  const [currentUserId, setCurrentUserId] = useState("DONOR-1");

  const getProfile = (userId) => profiles[userId];
  
  const getCurrentProfile = () => profiles[currentUserId];

  // Switch active user (useful for testing different dashboards)
  const switchUser = (userId) => {
    if (profiles[userId]) {
      setCurrentUserId(userId);
    }
  };

  // Helper to recalculate trust score based on metrics
  const calculateTrustScore = (metrics) => {
    // Weighted formula:
    // completionRate: 35%
    // cancellationRate (inverted): 25% (100 - rate)
    // onTimeRate: 20%
    // positiveFeedback: 20%
    const score = (
      (metrics.completionRate * 0.35) +
      ((100 - metrics.cancellationRate) * 0.25) +
      (metrics.onTimeRate * 0.20) +
      (metrics.positiveFeedback * 0.20)
    );
    return Math.round(score);
  };

  const addRewardTransaction = (userId, action, points, referenceId = null) => {
    setProfiles(prev => {
      const user = prev[userId];
      if (!user) return prev;

      const newTransaction = {
        id: `RT-${Date.now()}`,
        action,
        points,
        referenceId,
        createdAt: new Date().toISOString()
      };

      const newPoints = user.rewards.points + points;
      let newTier = user.rewards.tier;

      // Simple tier logic
      if (newPoints >= 5000) newTier = "Platinum";
      else if (newPoints >= 3000) newTier = "Gold";
      else if (newPoints >= 1000) newTier = "Silver";
      else newTier = "Bronze";

      return {
        ...prev,
        [userId]: {
          ...user,
          rewards: {
            points: newPoints,
            tier: newTier
          },
          transactions: [newTransaction, ...user.transactions]
        }
      };
    });
  };

  const updateTrustMetrics = (userId, metricUpdates) => {
    setProfiles(prev => {
      const user = prev[userId];
      if (!user) return prev;

      const newMetrics = {
        ...user.trust.metrics,
        ...metricUpdates
      };

      return {
        ...prev,
        [userId]: {
          ...user,
          trust: {
            metrics: newMetrics
          }
        }
      };
    });
  };

  const value = {
    currentUserId,
    switchUser,
    getProfile,
    getCurrentProfile,
    calculateTrustScore,
    addRewardTransaction,
    updateTrustMetrics
  };

  return (
    <ReputationContext.Provider value={value}>
      {children}
    </ReputationContext.Provider>
  );
}

export function useReputation() {
  const context = useContext(ReputationContext);
  if (!context) {
    throw new Error('useReputation must be used within a ReputationProvider');
  }
  return context;
}
