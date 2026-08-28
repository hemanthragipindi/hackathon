import React, { useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { 
  TrendingUp, 
  Utensils, 
  Truck, 
  Users, 
  Hourglass, 
  Plus, 
  AlertTriangle,
  ChevronRight,
  Sparkles,
  Check
} from 'lucide-react';
import ClaimFoodModal from '../components/ClaimFoodModal';
import AssignPickupModal from '../components/AssignPickupModal';
import TrackPickupModal from '../components/TrackPickupModal';

export default function NgoDashboard() {
  const navigate = useNavigate();
  const outletContext = useOutletContext() || {};
  const searchTerm = (outletContext.searchTerm || '').toLowerCase();

  // State for Pickups
  const [pickups, setPickups] = useState([
    {
      id: 'PK-101',
      time: '10:30 AM',
      meals: '75 meals',
      donor: 'ABC Restaurant',
      title: '75 meals',
      status: 'EN ROUTE',
      statusType: 'success', // green
      volunteer: 'Rahul Kumar',
    },
    {
      id: 'PK-102',
      time: '12:00 PM',
      meals: '50 meals',
      donor: 'Green Hotel',
      title: '50 meals',
      status: 'NEEDS ASSIGNMENT',
      statusType: 'warning', // yellow
      volunteer: null,
    },
    {
      id: 'PK-103',
      time: '2:30 PM',
      meals: '100 meals',
      donor: 'City Event Hall',
      title: '100 meals',
      status: 'SCHEDULED',
      statusType: 'neutral', // gray
      volunteer: 'Priya Singh',
    }
  ]);

  // State for Available Food Items
  const [foodItems, setFoodItems] = useState([
    {
      id: 'FOOD-1',
      title: 'Vegetarian Biryani',
      distance: '2.4km',
      quantity: '75 meals',
      donor: 'ABC Restaurant',
      pickupTime: '1:00 PM - 2:00 PM',
      claimed: false,
    },
    {
      id: 'FOOD-2',
      title: '50 Sandwiches',
      distance: '1.8km',
      quantity: '',
      donor: 'Green Hotel',
      pickupTime: 'ASAP',
      claimed: false,
    },
    {
      id: 'FOOD-3',
      title: '120 Rice Meals',
      distance: '3.2km',
      quantity: '',
      donor: 'City Caterers',
      pickupTime: 'Before 4:00 PM',
      claimed: false,
    }
  ]);

  // Modals state
  const [claimModalItem, setClaimModalItem] = useState(null);
  const [assignPickupItem, setAssignPickupItem] = useState(null);
  const [trackPickupItem, setTrackPickupItem] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleClaimConfirm = (item) => {
    setFoodItems(prev => prev.map(f => f.id === item.id ? { ...f, claimed: true } : f));
    // Add to pickups
    const newPickup = {
      id: `PK-${Date.now().toString().slice(-3)}`,
      time: '3:00 PM',
      meals: item.quantity || item.title,
      donor: item.donor,
      title: item.title,
      status: 'NEEDS ASSIGNMENT',
      statusType: 'warning',
      volunteer: null,
    };
    setPickups(prev => [newPickup, ...prev]);
    showToast(`Claimed "${item.title}" successfully! Added to Today's Pickups.`);
  };

  const handleAssignVolunteer = (pickupId, volunteerName) => {
    setPickups(prev => prev.map(p => {
      if (p.id === pickupId) {
        return {
          ...p,
          status: 'SCHEDULED',
          statusType: 'neutral',
          volunteer: volunteerName,
        };
      }
      return p;
    }));
    showToast(`Assigned ${volunteerName} to pickup.`);
  };

  // Filter based on top search bar if used
  const filteredPickups = pickups.filter(p => 
    p.donor.toLowerCase().includes(searchTerm) || 
    p.title.toLowerCase().includes(searchTerm) ||
    p.status.toLowerCase().includes(searchTerm)
  );

  const filteredFood = foodItems.filter(f => 
    f.title.toLowerCase().includes(searchTerm) || 
    f.donor.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#064e3b] text-white px-4 py-3 rounded-xl shadow-lg border border-emerald-600 animate-slideUp text-sm font-medium">
          <Check size={18} className="text-green-300 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Breadcrumb & Page Header */}
      <div>
        <nav className="text-xs font-medium text-gray-500 mb-2 select-none">
          <span>Home</span>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-700">Dashboard</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Dashboard
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-base md:text-lg font-semibold text-gray-800">
                Good morning, Helping Hands NGO <span className="inline-block">👏</span>
              </p>
            </div>
            <p className="text-sm text-gray-500 mt-0.5">
              Here's what's happening with your food rescue operations today.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/ngo/operations')}
              className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#86efac] hover:bg-[#6ee7b7] text-[#064e3b] transition-all shadow-xs active:scale-95 cursor-pointer"
            >
              View Pickups
            </button>
            <button
              onClick={() => navigate('/ngo/food')}
              className="px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#064e3b] hover:bg-[#043d2c] text-white transition-all shadow-xs flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <Plus size={16} className="stroke-[3]" />
              <span>Find Food</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Food Rescued */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition">
          <div className="flex items-start justify-between">
            <span className="text-sm font-semibold text-gray-600">Food Rescued</span>
            <div className="w-10 h-10 rounded-xl bg-[#dcfce7] flex items-center justify-center text-[#15803d]">
              <Hourglass size={20} className="stroke-[2.2]" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-gray-900 tracking-tight">2,840</span>
              <span className="text-sm font-bold text-gray-500">kg</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 mt-2">
              <TrendingUp size={14} className="stroke-[2.5]" />
              <span>18.4% vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 2: Meals Distributed */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition">
          <div className="flex items-start justify-between">
            <span className="text-sm font-semibold text-gray-600">Meals Distributed</span>
            <div className="w-10 h-10 rounded-xl bg-[#dcfce7] flex items-center justify-center text-[#15803d]">
              <Utensils size={20} className="stroke-[2.2]" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-gray-900 tracking-tight">5,620</div>
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 mt-2">
              <TrendingUp size={14} className="stroke-[2.5]" />
              <span>24.2% this month</span>
            </div>
          </div>
        </div>

        {/* Card 3: Active Pickups */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition">
          <div className="flex items-start justify-between">
            <span className="text-sm font-semibold text-gray-600">Active Pickups</span>
            <div className="w-10 h-10 rounded-xl bg-[#dcfce7] flex items-center justify-center text-[#15803d]">
              <Truck size={20} className="stroke-[2.2]" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-gray-900 tracking-tight">{pickups.length}</div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>4 scheduled today</span>
            </div>
          </div>
        </div>

        {/* Card 4: People Served */}
        <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition">
          <div className="flex items-start justify-between">
            <span className="text-sm font-semibold text-gray-600">People Served</span>
            <div className="w-10 h-10 rounded-xl bg-[#f1f5f9] flex items-center justify-center text-gray-600">
              <Users size={20} className="stroke-[2.2]" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-black text-gray-900 tracking-tight">8,420</div>
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 mt-2">
              <TrendingUp size={14} className="stroke-[2.5]" />
              <span>16.8% this month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Column & Right Column Adjusted Without Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (7 cols on lg, 58%) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Today's Pickups Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Today's Pickups</h2>
              <Link 
                to="/ngo/operations" 
                className="text-sm font-semibold text-[#15803d] hover:text-[#064e3b] hover:underline"
              >
                View All
              </Link>
            </div>

            <div className="divide-y divide-gray-100">
              {filteredPickups.map((pickup) => (
                <div key={pickup.id} className="py-4 first:pt-4 last:pb-1 flex items-center justify-between gap-4">
                  {/* Left: Time */}
                  <div className="w-20 shrink-0 text-sm font-semibold text-gray-700">
                    {pickup.time}
                  </div>

                  {/* Middle: Details & Badge */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900 truncate">
                      {pickup.meals} • {pickup.donor}
                    </p>
                    <div className="mt-1">
                      {pickup.statusType === 'success' && (
                        <span className="inline-block text-[11px] font-black px-2 py-0.5 rounded bg-[#dcfce7] text-[#15803d] tracking-wide">
                          {pickup.status}
                        </span>
                      )}
                      {pickup.statusType === 'warning' && (
                        <span className="inline-block text-[11px] font-black px-2 py-0.5 rounded bg-[#fef9c3] text-[#854d0e] tracking-wide">
                          {pickup.status}
                        </span>
                      )}
                      {pickup.statusType === 'neutral' && (
                        <span className="inline-block text-[11px] font-black px-2 py-0.5 rounded bg-[#f1f5f9] text-gray-700 tracking-wide">
                          {pickup.status}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Right: Action Button */}
                  <div className="shrink-0">
                    {pickup.status === 'EN ROUTE' && (
                      <button
                        onClick={() => setTrackPickupItem(pickup)}
                        className="px-4 py-1.5 text-xs font-bold rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 shadow-xs transition cursor-pointer"
                      >
                        Track
                      </button>
                    )}
                    {pickup.status === 'NEEDS ASSIGNMENT' && (
                      <button
                        onClick={() => setAssignPickupItem(pickup)}
                        className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-[#064e3b] text-white hover:bg-[#043d2c] shadow-xs transition cursor-pointer"
                      >
                        Assign Pickup
                      </button>
                    )}
                    {pickup.status === 'SCHEDULED' && (
                      <button
                        onClick={() => setTrackPickupItem(pickup)}
                        className="px-4 py-1.5 text-xs font-bold rounded-lg border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 shadow-xs transition cursor-pointer"
                      >
                        View
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Needs Attention Card on Left below Pickups for clean balance */}
          <div className="bg-[#fef2f2] border border-[#fee2e2] rounded-2xl p-6 shadow-xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-lg text-red-600">⚠</span>
              <h3 className="text-base font-bold text-[#b91c1c]">
                Needs Attention
              </h3>
            </div>

            <ul className="space-y-2.5 text-xs font-semibold text-gray-800">
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-red-500 mt-1 shrink-0"></span>
                <span>2 food listings expiring soon in your area.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 mt-1 shrink-0"></span>
                <span>3 pickups need volunteer assignment.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-red-500 mt-1 shrink-0"></span>
                <span>1 pickup delayed (Route #4).</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column (5 cols on lg, 42%) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Available Food Near You Card */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">
                Available Food Near You
              </h2>
              <Link 
                to="/ngo/food" 
                className="text-xs font-semibold text-[#15803d] hover:text-[#064e3b] hover:underline"
              >
                View All ({foodItems.length})
              </Link>
            </div>

            <div className="space-y-4">
              {filteredFood.map((food) => (
                <div
                  key={food.id}
                  className="p-4 rounded-xl border border-gray-200/90 hover:border-green-300 transition-all bg-white"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-gray-900 text-sm">{food.title}</h3>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#dcfce7] text-[#15803d]">
                      {food.distance}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 mt-1 font-medium">
                    {food.quantity ? `${food.quantity} • ` : ''}{food.donor}
                  </p>
                  
                  <p className="text-xs text-gray-500 mt-0.5">
                    Pickup: {food.pickupTime}
                  </p>

                  <button
                    onClick={() => {
                      if (!food.claimed) {
                        setClaimModalItem(food);
                      }
                    }}
                    disabled={food.claimed}
                    className={`w-full mt-3 py-2 px-3 rounded-lg text-xs font-bold transition shadow-xs text-center ${
                      food.claimed
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-[#86efac] hover:bg-[#4ade80] text-[#064e3b] cursor-pointer active:scale-98'
                    }`}
                  >
                    {food.claimed ? 'Claimed' : 'Claim Food'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="pt-8 text-center text-xs font-medium text-gray-500 select-none">
        © 2024 FoodRescue Platform. <span className="hover:underline text-gray-700 cursor-pointer">Support</span> • <span className="hover:underline text-gray-700 cursor-pointer">Terms</span>
      </footer>

      {/* Modals */}
      <ClaimFoodModal
        item={claimModalItem}
        isOpen={Boolean(claimModalItem)}
        onClose={() => setClaimModalItem(null)}
        onConfirm={handleClaimConfirm}
      />

      <AssignPickupModal
        pickup={assignPickupItem}
        isOpen={Boolean(assignPickupItem)}
        onClose={() => setAssignPickupItem(null)}
        onAssign={handleAssignVolunteer}
      />

      <TrackPickupModal
        pickup={trackPickupItem}
        isOpen={Boolean(trackPickupItem)}
        onClose={() => setTrackPickupItem(null)}
      />
    </div>
  );
}
