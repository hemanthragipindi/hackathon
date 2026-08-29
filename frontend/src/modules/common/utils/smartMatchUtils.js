/**
 * Calculates a match score between a donation and an NGO.
 * 
 * Weights:
 * - Location proximity: 30%
 * - Food requirement match: 25%
 * - NGO capacity: 20%
 * - Availability: 15%
 * - Trust Score: 10%
 * 
 * @param {Object} donation - The food donation object
 * @param {Object} ngo - The mock NGO object
 * @returns {Object} result - Contains totalScore (0-100) and match breakdown
 */
export function calculateMatchScore(donation, ngo) {
  let locationScore = 0;
  let foodNeedScore = 0;
  let capacityScore = 0;
  let availabilityScore = 0;
  let trustScoreValue = 0;

  // 1. Location proximity (30%)
  // In a real app, this would use Haversine distance between donation.location and ngo.location
  // Here we use the mock distance. Let's assume <= 3km is 100% score, up to 10km scales down to 0%.
  const maxDistance = 10;
  if (ngo.distance <= 3) {
    locationScore = 30;
  } else if (ngo.distance < maxDistance) {
    locationScore = 30 * (1 - ((ngo.distance - 3) / (maxDistance - 3)));
  }

  // 2. Food requirement match (25%)
  // Does the NGO need this type of food?
  const donationTags = [];
  if (donation.dietary) donationTags.push(donation.dietary.toLowerCase());
  if (donation.foodType) donationTags.push(donation.foodType.toLowerCase());
  
  const ngoNeeds = ngo.foodNeeds.map(need => need.toLowerCase());
  let matches = 0;
  donationTags.forEach(tag => {
    // Basic substring match for mock purposes
    if (ngoNeeds.some(need => need.includes(tag) || tag.includes(need))) {
      matches++;
    }
  });
  
  if (matches > 0 || ngoNeeds.length === 0) {
    foodNeedScore = 25; // Good match
  } else {
    foodNeedScore = 5; // Minimal match (they might still take it, but it's not their top need)
  }

  // 3. NGO capacity (20%)
  // Can the NGO handle the donation quantity?
  // Extract number from quantity string (e.g. "50 meals" -> 50)
  let donationAmount = 0;
  if (typeof donation.quantity === 'string') {
    const match = donation.quantity.match(/(\d+)/);
    if (match) donationAmount = parseInt(match[1], 10);
  } else {
    donationAmount = donation.quantity;
  }

  if (donationAmount <= ngo.capacity) {
    capacityScore = 20; // Full capacity
  } else if (donationAmount <= ngo.capacity * 1.5) {
    capacityScore = 10; // Can take most of it
  } else {
    capacityScore = 0; // Way beyond capacity
  }

  // 4. Availability (15%)
  if (ngo.availability) {
    availabilityScore = 15;
  } else {
    availabilityScore = 0;
  }

  // 5. Trust Score (10%)
  // Direct mapping of trust score (0-100) to 10% weight
  trustScoreValue = (ngo.trustScore / 100) * 10;

  // Calculate total score
  const totalScore = Math.round(locationScore + foodNeedScore + capacityScore + availabilityScore + trustScoreValue);

  return {
    totalScore,
    breakdown: {
      location: { score: locationScore, max: 30 },
      foodNeed: { score: foodNeedScore, max: 25 },
      capacity: { score: capacityScore, max: 20 },
      availability: { score: availabilityScore, max: 15 },
      trust: { score: trustScoreValue, max: 10 }
    },
    explanations: {
      location: ngo.distance <= 3 ? 'Nearby (less than 3km)' : `${ngo.distance}km away`,
      foodNeed: foodNeedScore > 10 ? 'Needs this type of food' : 'Other food preferences',
      capacity: capacityScore === 20 ? 'Has sufficient capacity' : (capacityScore > 0 ? 'Partial capacity available' : 'Exceeds current capacity'),
      availability: ngo.availability ? 'Available for pickup' : 'Currently busy',
      trust: `High trust score (${ngo.trustScore}/100)`
    }
  };
}
