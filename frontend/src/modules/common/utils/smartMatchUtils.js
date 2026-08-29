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

/**
 * Calculates a match score between a food donation and the logged-in NGO's needs.
 * 
 * Weights:
 * - Location proximity: 30%
 * - Food requirement match: 30%
 * - NGO capacity: 20%
 * - Urgency: 10%
 * - Donor Trust Score: 10%
 * 
 * @param {Object} donation - The food donation object
 * @param {Object} ngo - The mock NGO object (e.g. from mockNgoProfile)
 * @returns {Object} result - Contains totalScore (0-100) and match breakdown
 */
export function calculateFoodMatchScore(donation, ngo) {
  let locationScore = 0;
  let foodNeedScore = 0;
  let capacityScore = 0;
  let urgencyScore = 0;
  let trustScoreValue = 0;

  // 1. Location (30%)
  // Using the parsed float from the donation.distance string (e.g., "2.4km" -> 2.4)
  let distance = 5; // default fallback
  if (typeof donation.distance === 'string') {
    const distMatch = donation.distance.match(/([\d.]+)/);
    if (distMatch) distance = parseFloat(distMatch[1]);
  }
  const maxDistance = 15;
  if (distance <= 3) {
    locationScore = 30;
  } else if (distance < maxDistance) {
    locationScore = 30 * (1 - ((distance - 3) / (maxDistance - 3)));
  }

  // 2. Food Need Match (30%)
  const donationTags = [];
  if (donation.dietary) donationTags.push(...donation.dietary.toLowerCase().split(/[\s/]+/));
  if (donation.foodType) donationTags.push(...donation.foodType.toLowerCase().split(/[\s/]+/));
  if (donation.title) donationTags.push(...donation.title.toLowerCase().split(/[\s/]+/));
  
  const ngoNeeds = ngo.foodNeeds.map(need => need.toLowerCase());
  let matches = 0;
  ngoNeeds.forEach(need => {
    if (donationTags.some(tag => tag.includes(need) || need.includes(tag))) {
      matches++;
    }
  });

  if (matches >= 2) {
    foodNeedScore = 30;
  } else if (matches === 1) {
    foodNeedScore = 15;
  } else {
    foodNeedScore = 5;
  }

  // 3. Capacity (20%)
  let donationAmount = 0;
  if (typeof donation.quantity === 'string') {
    const match = donation.quantity.match(/(\d+)/);
    if (match) donationAmount = parseInt(match[1], 10);
  } else {
    donationAmount = donation.quantity || 0;
  }

  if (donationAmount > 0 && donationAmount <= ngo.capacity) {
    capacityScore = 20; // Fits capacity perfectly
  } else if (donationAmount > ngo.capacity && donationAmount <= ngo.capacity * 1.5) {
    capacityScore = 10; // Slightly over capacity
  } else if (donationAmount > ngo.capacity * 1.5) {
    capacityScore = 0; // Exceeds capacity significantly
  } else {
    capacityScore = 20; // If quantity not well defined, assume it fits
  }

  // 4. Urgency (10%)
  let urgencyLevel = 'Normal'; // Normal, Urgent, Critical
  if (donation.expiresIn) {
    const hoursMatch = donation.expiresIn.match(/(\d+)/);
    if (hoursMatch) {
      const hours = parseInt(hoursMatch[1], 10);
      if (hours <= 2) {
        urgencyScore = 10;
        urgencyLevel = 'Critical';
      } else if (hours <= 4) {
        urgencyScore = 8;
        urgencyLevel = 'Urgent';
      } else {
        urgencyScore = 5;
        urgencyLevel = 'Normal';
      }
    } else {
      urgencyScore = 5;
    }
  } else {
    urgencyScore = 5;
  }

  // 5. Trust Score (10%)
  // Assuming default donor trust score is 90 if not specified
  const donorTrust = donation.donorTrustScore || 90;
  trustScoreValue = (donorTrust / 100) * 10;

  const totalScore = Math.round(locationScore + foodNeedScore + capacityScore + urgencyScore + trustScoreValue);

  return {
    totalScore,
    urgencyLevel,
    breakdown: {
      location: { score: locationScore, max: 30 },
      foodNeed: { score: foodNeedScore, max: 30 },
      capacity: { score: capacityScore, max: 20 },
      urgency: { score: urgencyScore, max: 10 },
      trust: { score: trustScoreValue, max: 10 }
    },
    explanations: {
      location: distance <= 3 ? `${distance}km away (Nearby)` : `${distance}km away`,
      foodNeed: foodNeedScore > 10 ? 'Matches your food requirements' : 'Other food preferences',
      capacity: capacityScore === 20 ? 'Fits your current capacity' : (capacityScore > 0 ? 'Partial capacity fit' : 'Exceeds current capacity'),
      urgency: urgencyLevel === 'Critical' ? 'Critical pickup (Expires soon)' : (urgencyLevel === 'Urgent' ? 'Urgent pickup' : 'Normal pickup timeframe'),
      trust: `Donor Trust Score: ${donorTrust}/100`
    }
  };
}
