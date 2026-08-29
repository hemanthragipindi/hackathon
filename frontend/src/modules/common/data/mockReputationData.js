export const mockReputationData = {
  "DONOR-1": {
    userId: "DONOR-1",
    role: "donor",
    name: "Spice Garden Bistro",
    
    verification: {
      verified: true,
      verifiedAt: "2025-11-15T10:00:00Z"
    },

    rewards: {
      points: 2450,
      tier: "Silver"
    },

    trust: {
      metrics: {
        completionRate: 98,
        cancellationRate: 2,
        onTimeRate: 100, // mostly for volunteers, but keeping consistent structure
        positiveFeedback: 94
      }
    },

    transactions: [
      {
        id: "RT-101",
        action: "donation_created",
        points: 50,
        referenceId: "FD-501",
        createdAt: "2026-08-28T14:30:00Z"
      },
      {
        id: "RT-102",
        action: "donation_completed",
        points: 50,
        referenceId: "FD-500",
        createdAt: "2026-08-25T11:20:00Z"
      }
    ]
  },

  "NGO-1": {
    userId: "NGO-1",
    role: "ngo",
    name: "Hope Foundation",
    
    verification: {
      verified: true,
      verifiedAt: "2025-01-10T09:00:00Z"
    },

    rewards: {
      points: 3420,
      tier: "Gold"
    },

    trust: {
      metrics: {
        completionRate: 99,
        cancellationRate: 1,
        onTimeRate: 95,
        positiveFeedback: 98
      }
    },

    transactions: [
      {
        id: "RT-201",
        action: "food_claimed",
        points: 20,
        referenceId: "FD-501",
        createdAt: "2026-08-28T14:45:00Z"
      },
      {
        id: "RT-202",
        action: "distribution_reported",
        points: 50,
        referenceId: "FD-500",
        createdAt: "2026-08-26T10:00:00Z"
      }
    ]
  },

  "VOL-1": {
    userId: "VOL-1",
    role: "volunteer",
    name: "Rahul Sharma",
    
    verification: {
      verified: true,
      verifiedAt: "2026-02-20T10:30:00Z"
    },

    rewards: {
      points: 1840,
      tier: "Bronze"
    },

    trust: {
      metrics: {
        completionRate: 96,
        cancellationRate: 4,
        onTimeRate: 92,
        positiveFeedback: 95
      }
    },

    transactions: [
      {
        id: "RT-301",
        action: "pickup_accepted",
        points: 10,
        referenceId: "PK-101",
        createdAt: "2026-08-28T15:00:00Z"
      },
      {
        id: "RT-302",
        action: "pickup_completed",
        points: 40,
        referenceId: "PK-100",
        createdAt: "2026-08-27T18:30:00Z"
      }
    ]
  }
};
