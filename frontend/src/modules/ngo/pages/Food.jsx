import React, { useState } from 'react';
import { Utensils, Search, Filter, Clock, MapPin, Sparkles, CheckCircle } from 'lucide-react';
import ClaimFoodModal from '../components/ClaimFoodModal';

const initialFoodData = [
  {
    id: 'FD-101',
    title: 'Vegetarian Biryani',
    donor: 'ABC Restaurant',
    quantity: '75 meals',
    distance: '2.4km',
    location: 'Sector 14, Connaught Place',
    pickupTime: '1:00 PM - 2:00 PM',
    foodType: 'Prepared Meal',
    dietary: 'Vegetarian',
    status: 'Available',
    expiresIn: '2 hours left',
  },
  {
    id: 'FD-102',
    title: '50 Fresh Assorted Sandwiches',
    donor: 'Green Hotel',
    quantity: '50 meals',
    distance: '1.8km',
    location: 'Green Valley Road',
    pickupTime: 'ASAP',
    foodType: 'Packaged Food',
    dietary: 'Veg / Non-Veg options',
    status: 'Available',
    expiresIn: '4 hours left',
  },
  {
    id: 'FD-103',
    title: '120 Rice Meals & Dal Tadka',
    donor: 'City Caterers',
    quantity: '120 meals',
    distance: '3.2km',
    location: 'Industrial Area Phase 2',
    pickupTime: 'Before 4:00 PM',
    foodType: 'Cooked Hot Food',
    dietary: 'Pure Vegetarian',
    status: 'Available',
    expiresIn: '3 hours left',
  },
  {
    id: 'FD-104',
    title: 'Bakery Surplus: Breads & Pastries',
    donor: 'Sunrise Bakery',
    quantity: '40 kg',
    distance: '4.1km',
    location: 'Market Complex Block C',
    pickupTime: '5:00 PM - 6:30 PM',
    foodType: 'Bakery',
    dietary: 'Vegetarian',
    status: 'Available',
    expiresIn: '5 hours left',
  },
  {
    id: 'FD-105',
    title: 'Fresh Vegetables & Seasonal Fruits',
    donor: 'Fresh Mart Supermarket',
    quantity: '60 kg',
    distance: '5.0km',
    location: 'Wholesale Mandi Gate 3',
    pickupTime: 'Today by 7:00 PM',
    foodType: 'Raw Produce',
    dietary: 'Vegan / Fresh',
    status: 'Available',
    expiresIn: '6 hours left',
  }
];

export default function Food() {
  const [foodList, setFoodList] = useState(initialFoodData);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [successToast, setSuccessToast] = useState(null);

  const categories = ['All', 'Prepared Meal', 'Cooked Hot Food', 'Packaged Food', 'Bakery', 'Raw Produce'];

  const filteredItems = foodList.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.foodType === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.donor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleClaim = (item) => {
    setFoodList(prev => prev.map(f => f.id === item.id ? { ...f, status: 'Claimed' } : f));
    setSuccessToast(`Successfully claimed "${item.title}" from ${item.donor}!`);
    setTimeout(() => setSuccessToast(null), 3500);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast */}
      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#064e3b] text-white px-4 py-3 rounded-xl shadow-lg border border-emerald-600 animate-slideUp text-sm font-medium">
          <CheckCircle size={18} className="text-green-300 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <nav className="text-xs font-medium text-gray-500 mb-2 select-none">
            <span>Home</span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-700">Food Listings</span>
          </nav>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Available Food Listings</h1>
          <p className="text-sm text-gray-500 mt-1">Browse and claim surplus food available near Helping Hands NGO.</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search dish, donor, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600/20 focus:border-green-600"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-[#064e3b] text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Food Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl p-5 border border-gray-200 shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-[#dcfce7] text-[#15803d]">
                  {item.distance}
                </span>
                <span className="text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded">
                  {item.expiresIn}
                </span>
              </div>

              <h3 className="text-base font-bold text-gray-900 mt-3">{item.title}</h3>
              <p className="text-xs font-semibold text-[#064e3b] mt-0.5">{item.donor}</p>

              <div className="mt-4 space-y-2 text-xs text-gray-600 font-medium">
                <div className="flex items-center gap-2">
                  <Utensils size={14} className="text-gray-400 shrink-0" />
                  <span>Quantity: <strong>{item.quantity}</strong> ({item.foodType})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-gray-400 shrink-0" />
                  <span>Pickup: {item.pickupTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-gray-400 shrink-0" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-gray-100">
              <button
                onClick={() => {
                  if (item.status === 'Available') setSelectedItem(item);
                }}
                disabled={item.status !== 'Available'}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-2 ${
                  item.status === 'Available'
                    ? 'bg-[#86efac] hover:bg-[#4ade80] text-[#064e3b] active:scale-98 cursor-pointer'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <Sparkles size={14} />
                {item.status === 'Available' ? 'Claim Food Donation' : 'Already Claimed'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <ClaimFoodModal
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        onConfirm={handleClaim}
      />
    </div>
  );
}
