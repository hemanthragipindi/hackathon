import React, { useState } from 'react';
import { 
  Bookmark, 
  Clock, 
  Info, 
  Store, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function CreateDonation() {
  const navigate = useNavigate();

  // Form State
  const [foodName, setFoodName] = useState('Vegetable Biryani');
  const [category, setCategory] = useState('Cooked Meals');
  const [quantity, setQuantity] = useState('40');
  const [foodType, setFoodType] = useState('Vegetarian');
  const [description, setDescription] = useState('');
  const [preparedTime, setPreparedTime] = useState('14:30');
  const [availableUntil, setAvailableUntil] = useState('21:30');
  const [storageCondition, setStorageCondition] = useState('Room Temperature');
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  // UI Interaction State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      navigate('/donor/dashboard');
    }, 1500);
  };

  // Format 24h time to 12h for preview display
  const formatTime = (timeStr) => {
    if (!timeStr) return '9:30 PM';
    const [hours, minutes] = timeStr.split(':');
    let h = parseInt(hours, 10);
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12;
    return `${h}:${minutes} ${ampm}`;
  };

  return (
    <div className="space-y-7 pb-12 max-w-[1300px] mx-auto select-none">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-[26px] font-extrabold text-slate-900 tracking-tight">
            Share Surplus Food
          </h1>
          <p className="text-xs sm:text-[13.5px] text-slate-500 font-medium mt-0.5">
            Help good food reach people who need it instead of going to waste.
          </p>
        </div>

        <button 
          onClick={() => alert('Draft saved successfully!')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-emerald-700 hover:text-emerald-800 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <Bookmark size={15} className="stroke-[2.2]" />
          <span>Save as Draft</span>
        </button>
      </div>

      {/* Step Wizard Indicator */}
      <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-[13.5px] overflow-x-auto pb-1">
        {/* Step 1 */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-5 h-5 rounded-full bg-[#064e3b] text-white font-bold text-[11px] flex items-center justify-center">
            1
          </div>
          <span className="font-bold text-[#064e3b]">Food Details</span>
        </div>

        {/* Divider 1 */}
        <div className="w-10 sm:w-16 h-0.5 bg-slate-200 shrink-0" />

        {/* Step 2 */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 font-semibold text-[11px] flex items-center justify-center">
            2
          </div>
          <span className="font-medium text-slate-400">Pickup Details</span>
        </div>

        {/* Divider 2 */}
        <div className="w-10 sm:w-16 h-0.5 bg-slate-200 shrink-0" />

        {/* Step 3 */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-5 h-5 rounded-full bg-slate-100 text-slate-400 font-semibold text-[11px] flex items-center justify-center">
            3
          </div>
          <span className="font-medium text-slate-400">Review & Share</span>
        </div>
      </div>

      {/* Main Grid: Form Sections (Left) + Donation Preview & Actions (Right) */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols on lg) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Card 1: What food are you sharing? */}
          <div className="bg-white rounded-3xl border border-slate-100/90 shadow-xs p-6 sm:p-7 space-y-5">
            <h3 className="text-base sm:text-[17px] font-bold text-slate-900 tracking-tight">
              What food are you sharing?
            </h3>

            {/* Food Name */}
            <div>
              <label className="block text-[12.5px] font-semibold text-slate-700 mb-1.5">
                Food Name
              </label>
              <input 
                type="text" 
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                placeholder="e.g., Vegetable Biryani" 
                className="w-full px-4 py-2.5 bg-white border border-slate-200/90 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                required
              />
            </div>

            {/* Category & Quantity Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[12.5px] font-semibold text-slate-700 mb-1.5">
                  Category
                </label>
                <div className="relative">
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200/90 rounded-2xl text-sm text-slate-800 appearance-none focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all pr-10 cursor-pointer"
                  >
                    <option>Cooked Meals</option>
                    <option>Raw Produce</option>
                    <option>Baked Goods</option>
                    <option>Packaged Food</option>
                    <option>Dairy & Beverages</option>
                  </select>
                  <ChevronDown size={17} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[12.5px] font-semibold text-slate-700 mb-1.5">
                  Quantity (Meals/Servings)
                </label>
                <input 
                  type="number" 
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="40" 
                  className="w-full px-4 py-2.5 bg-white border border-slate-200/90 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Food Type (Radio Group) */}
            <div>
              <label className="block text-[12.5px] font-semibold text-slate-700 mb-2">
                Food Type
              </label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input 
                    type="radio" 
                    name="foodType" 
                    value="Vegetarian"
                    checked={foodType === 'Vegetarian'}
                    onChange={() => setFoodType('Vegetarian')}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 accent-emerald-600"
                  />
                  <span className="text-sm font-medium text-slate-700">Vegetarian</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input 
                    type="radio" 
                    name="foodType" 
                    value="Non-Vegetarian"
                    checked={foodType === 'Non-Vegetarian'}
                    onChange={() => setFoodType('Non-Vegetarian')}
                    className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 border-slate-300 accent-emerald-600"
                  />
                  <span className="text-sm font-medium text-slate-700">Non-Vegetarian</span>
                </label>
              </div>
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-[12.5px] font-semibold text-slate-700 mb-1.5">
                Short Description (Optional)
              </label>
              <input 
                type="text" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Any specific details about ingredients or allergens?" 
                className="w-full px-4 py-2.5 bg-white border border-slate-200/90 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

          {/* Card 2: Food Freshness */}
          <div className="bg-white rounded-3xl border border-slate-100/90 shadow-xs p-6 sm:p-7 space-y-5">
            <h3 className="text-base sm:text-[17px] font-bold text-slate-900 tracking-tight">
              Food Freshness
            </h3>

            {/* Timing Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[12.5px] font-semibold text-slate-700 mb-1.5">
                  Prepared Time
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={preparedTime}
                    onChange={(e) => setPreparedTime(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200/90 rounded-2xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all pr-10"
                  />
                  <Clock size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[12.5px] font-semibold text-slate-700 mb-1.5">
                  Available Until
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={availableUntil}
                    onChange={(e) => setAvailableUntil(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-slate-200/90 rounded-2xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all pr-10"
                  />
                  <Clock size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Storage Condition */}
            <div>
              <label className="block text-[12.5px] font-semibold text-slate-700 mb-2">
                Storage Condition
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStorageCondition('Room Temperature')}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    storageCondition === 'Room Temperature'
                      ? 'border-2 border-emerald-600 bg-white text-emerald-800 shadow-xs'
                      : 'border border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  Room Temperature
                </button>

                <button
                  type="button"
                  onClick={() => setStorageCondition('Refrigerated')}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    storageCondition === 'Refrigerated'
                      ? 'border-2 border-emerald-600 bg-white text-emerald-800 shadow-xs'
                      : 'border border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  Refrigerated
                </button>
              </div>
            </div>

            {/* Info Callout Box */}
            <div className="bg-[#f0f7ff] border border-sky-100 rounded-2xl p-3.5 flex items-start gap-2.5 text-[12px] text-slate-600 leading-snug">
              <Info size={16} className="text-sky-600 shrink-0 mt-0.5" />
              <span>
                Accurate information helps us safely connect your food with the right community partner.
              </span>
            </div>
          </div>

          {/* Card 3: Pickup Details */}
          <div className="bg-white rounded-3xl border border-slate-100/90 shadow-xs p-6 sm:p-7 space-y-4">
            <h3 className="text-base sm:text-[17px] font-bold text-slate-900 tracking-tight">
              Pickup Details
            </h3>

            {/* Address Box */}
            <div className="bg-[#f0fdf4] border border-emerald-100/90 rounded-2xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-emerald-100/80 text-emerald-700 flex items-center justify-center shrink-0">
                  <Store size={19} className="stroke-[2.2]" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate leading-snug">
                    Spice Garden Restaurant
                  </h4>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    124 Culinary Avenue, Food District
                  </p>
                </div>
              </div>

              <button 
                type="button"
                onClick={() => alert('Editing location')}
                className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors shrink-0 ml-3 cursor-pointer"
              >
                Change
              </button>
            </div>

            {/* Special Pickup Instructions */}
            <div>
              <label className="block text-[12.5px] font-semibold text-slate-700 mb-1.5">
                Special Pickup Instructions
              </label>
              <input 
                type="text" 
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="e.g., Ask for John at the back kitchen door." 
                className="w-full px-4 py-2.5 bg-white border border-slate-200/90 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
              />
            </div>
          </div>

        </div>

        {/* Right Column: Donation Preview & Action Cards (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-8">
          
          {/* Card 1: DONATION PREVIEW */}
          <div className="bg-white rounded-3xl border border-slate-100/90 shadow-xs p-6 space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              DONATION PREVIEW
            </h4>

            {/* Dish Info */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-lg"></span>
                <h5 className="text-base font-bold text-slate-900 tracking-tight">
                  {foodName || 'Vegetable Biryani'}
                </h5>
              </div>
              <p className="text-xs text-slate-500 font-medium leading-relaxed pl-7">
                {quantity || '40'} Meals • {foodType} • {category}
              </p>
            </div>

            {/* Details List */}
            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-slate-400 shrink-0" />
                <span className="truncate">Spice Garden Restaurant</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-slate-400 shrink-0" />
                <span>Available until {formatTime(availableUntil)}</span>
              </div>
            </div>

            {/* Status Badge */}
            <div className="pt-2">
              <span className="px-3 py-1 rounded-lg bg-[#ecfdf5] text-[#059669] border border-emerald-100 text-xs font-bold inline-block">
                Ready to Share
              </span>
            </div>
          </div>

          {/* Card 2: Impact & Share Button Card */}
          <div className="bg-gradient-to-b from-[#f8fafc] via-[#fbfdff] to-[#f0fdf4] rounded-3xl border border-slate-100/90 shadow-xs p-6 text-center space-y-4">
            {/* Encouragement note */}
            <p className="text-xs text-slate-600 leading-relaxed max-w-[260px] mx-auto font-medium">
              Your food could make a difference today. Nearby verified partners will be notified.
            </p>

            {/* Main Action Button */}
            <button
              type="submit"
              disabled={isSubmitted}
              className="w-full py-3.5 px-5 rounded-2xl bg-[#064e3b] hover:bg-[#085a44] text-white font-bold text-sm shadow-sm transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer group"
            >
              {isSubmitted ? (
                <>
                  <CheckCircle2 size={18} className="animate-bounce" />
                  <span>Sharing for Rescue...</span>
                </>
              ) : (
                <>
                  <span>Share Food for Rescue</span>
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>

            {/* Secondary Link */}
            <div>
              <button 
                type="button"
                onClick={() => alert('Draft saved successfully!')}
                className="text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
              >
                Save Draft
              </button>
            </div>
          </div>

        </div>
      </form>
    </div>
  );
}
