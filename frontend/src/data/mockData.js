export const usersData = [
  { id: 'USR-001', name: 'John Doe', role: 'Admin', email: 'admin@foodbridge.org', phone: '+91 9876543210', location: 'Delhi', status: 'Active', joinedDate: '2023-01-15' },
  { id: 'USR-002', name: 'Green Leaf Restaurant', role: 'Donor', email: 'contact@greenleaf.com', phone: '+91 9876543211', location: 'Mumbai', status: 'Active', joinedDate: '2023-03-22' },
  { id: 'USR-003', name: 'Hope Foundation', role: 'NGO', email: 'hello@hopefoundation.in', phone: '+91 9876543212', location: 'Delhi', status: 'Active', joinedDate: '2023-04-10' },
  { id: 'USR-004', name: 'Rahul Kumar', role: 'Volunteer', email: 'rahul.k@example.com', phone: '+91 9876543213', location: 'Delhi', status: 'Active', joinedDate: '2023-05-05' },
  { id: 'USR-005', name: 'Sunrise Bakery', role: 'Donor', email: 'info@sunrise.com', phone: '+91 9876543214', location: 'Bangalore', status: 'Pending Verification', joinedDate: '2023-10-12' },
];

export const foodListingsData = [
  { id: 'FD-1024', donor: 'Green Leaf Restaurant', name: 'Vegetable Biryani', quantity: '35 Meals', location: 'Delhi', deadline: '8:30 PM', status: 'Available' },
  { id: 'FD-1025', donor: 'Sunrise Bakery', name: 'Assorted Breads & Pastries', quantity: '20 kg', location: 'Bangalore', deadline: '6:00 PM', status: 'Claimed' },
  { id: 'FD-1026', donor: 'Wedding Banquet Hall', name: 'Mixed Buffet Leftovers', quantity: '150 Meals', location: 'Mumbai', deadline: '11:30 PM', status: 'Pickup Assigned' },
  { id: 'FD-1027', donor: 'Fresh Mart', name: 'Produce (Veggies & Fruits)', quantity: '45 kg', location: 'Delhi', deadline: 'Expired', status: 'Expired' },
  { id: 'FD-1028', donor: 'Green Leaf Restaurant', name: 'Lentil Soup', quantity: '15 Meals', location: 'Delhi', deadline: '9:00 PM', status: 'Delivered' },
];

export const pickupsData = [
  { id: 'PK-2048', foodId: 'FD-1026', donor: 'Wedding Banquet Hall', ngo: 'Care Foundation', volunteer: 'Rahul Kumar', status: 'En Route', eta: '12 min', createdTime: '2023-10-24T18:30:00Z' },
  { id: 'PK-2049', foodId: 'FD-1025', donor: 'Sunrise Bakery', ngo: 'Hope Foundation', volunteer: 'Unassigned', status: 'Unassigned', eta: '-', createdTime: '2023-10-24T14:15:00Z' },
  { id: 'PK-2050', foodId: 'FD-1028', donor: 'Green Leaf Restaurant', ngo: 'FoodForAll', volunteer: 'Priya Singh', status: 'Delivered', eta: '-', createdTime: '2023-10-23T19:00:00Z' },
];

export const claimsData = [
  { id: 'CLM-501', foodId: 'FD-1025', donor: 'Sunrise Bakery', ngo: 'Hope Foundation', claimedTime: '2023-10-24T13:45:00Z', pickupStatus: 'Pending', claimStatus: 'Claimed' },
  { id: 'CLM-502', foodId: 'FD-1026', donor: 'Wedding Banquet Hall', ngo: 'Care Foundation', claimedTime: '2023-10-24T18:10:00Z', pickupStatus: 'En Route', claimStatus: 'Claimed' },
  { id: 'CLM-503', foodId: 'FD-1028', donor: 'Green Leaf Restaurant', ngo: 'FoodForAll', claimedTime: '2023-10-23T18:20:00Z', pickupStatus: 'Delivered', claimStatus: 'Completed' },
];

export const ngosData = [
  { id: 'NGO-001', organization: 'Hope Foundation', contact: 'Amit Shah', location: 'Delhi', serviceArea: 'North Delhi', regStatus: 'Registered', verification: 'Verified' },
  { id: 'NGO-002', organization: 'Care Foundation', contact: 'Sneha Patel', location: 'Mumbai', serviceArea: 'Andheri', regStatus: 'Registered', verification: 'Verified' },
  { id: 'NGO-003', organization: 'FoodForAll', contact: 'Vikram Singh', location: 'Bangalore', serviceArea: 'Indiranagar', regStatus: 'Registered', verification: 'Pending Verification' },
];

export const volunteersData = [
  { id: 'VOL-001', name: 'Rahul Kumar', location: 'Mumbai', availability: 'Available', completedPickups: 42, rating: 4.8, status: 'Active' },
  { id: 'VOL-002', name: 'Priya Singh', location: 'Delhi', availability: 'Busy', completedPickups: 85, rating: 4.9, status: 'Active' },
  { id: 'VOL-003', name: 'Anil Desai', location: 'Bangalore', availability: 'Offline', completedPickups: 12, rating: 4.5, status: 'Inactive' },
  { id: 'VOL-004', name: 'Kavita Rao', location: 'Delhi', availability: 'Available', completedPickups: 3, rating: 4.0, status: 'Active' },
];

export const notificationsData = [
  { id: 'NOT-1', title: 'New Food Listing', description: 'Green Leaf Restaurant added a new food listing.', timestamp: '2 minutes ago', read: false },
  { id: 'NOT-2', title: 'Food Claimed', description: 'Hope Foundation claimed 40 meal packages.', timestamp: '15 minutes ago', read: false },
  { id: 'NOT-3', title: 'Pickup Completed', description: 'Volunteer Rahul completed pickup #PK1024.', timestamp: '1 hour ago', read: true },
  { id: 'NOT-4', title: 'NGO Verified', description: 'Care Foundation verification was approved.', timestamp: '3 hours ago', read: true },
  { id: 'NOT-5', title: 'Listing Expired', description: 'A food listing (FD-992) expired without being claimed.', timestamp: 'Yesterday', read: true },
];

export const chartData = [
  { name: 'Mon', rescued: 420 },
  { name: 'Tue', rescued: 610 },
  { name: 'Wed', rescued: 520 },
  { name: 'Thu', rescued: 780 },
  { name: 'Fri', rescued: 890 },
  { name: 'Sat', rescued: 640 },
  { name: 'Sun', rescued: 730 },
];
