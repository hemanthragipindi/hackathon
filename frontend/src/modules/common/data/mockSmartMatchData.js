export const mockSmartMatchNGOs = [
  {
    id: "NGO-001",
    name: "Hope Foundation",
    locationName: "Andheri, Mumbai",
    location: {
      latitude: 19.1197,
      longitude: 72.8468
    },
    distance: 2.1,
    foodNeeds: ["rice", "biryani", "chapati", "prepared meal", "vegetarian"],
    currentNeed: 40,
    capacity: 50,
    availability: true,
    trustScore: 96,
    verified: true,
    successfulClaims: 48,
    completedPickups: 45
  },
  {
    id: "NGO-002",
    name: "Care Community",
    locationName: "Bandra, Mumbai",
    location: {
      latitude: 19.0596,
      longitude: 72.8295
    },
    distance: 4.8,
    foodNeeds: ["sandwiches", "snacks", "packaged food", "veg / non-veg options"],
    currentNeed: 50,
    capacity: 100,
    availability: true,
    trustScore: 91,
    verified: true,
    successfulClaims: 112,
    completedPickups: 105
  },
  {
    id: "NGO-003",
    name: "Helping Hands NGO",
    locationName: "Dadar, Mumbai",
    location: {
      latitude: 19.0176,
      longitude: 72.8561
    },
    distance: 6.5,
    foodNeeds: ["cooked hot food", "pure vegetarian", "rice", "dal"],
    currentNeed: 150,
    capacity: 200,
    availability: false, 
    trustScore: 85,
    verified: true,
    successfulClaims: 320,
    completedPickups: 310
  },
  {
    id: "NGO-004",
    name: "Food For All",
    locationName: "Goregaon, Mumbai",
    location: {
      latitude: 19.1663,
      longitude: 72.8526
    },
    distance: 3.4,
    foodNeeds: ["bakery", "breads", "pastries", "vegetarian", "raw produce"],
    currentNeed: 20,
    capacity: 30,
    availability: true,
    trustScore: 78,
    verified: false,
    successfulClaims: 15,
    completedPickups: 12
  }
];
