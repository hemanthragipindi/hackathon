import React from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Utensils, 
  Package, 
  Phone, 
  User, 
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { foodData } from '../data/foodData';

export default function FoodDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const basePath = location.pathname.startsWith('/ngo') ? '/ngo' : '/donor';
  
  const item = foodData.find(f => f.id === id);

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <AlertCircle size={48} className="text-slate-400" />
        <h2 className="text-xl font-bold text-slate-900">Food Listing Not Found</h2>
        <p className="text-slate-500">The requested food listing could not be found or has been removed.</p>
        <button 
          onClick={() => navigate(`${basePath}/hub`)}
          className="mt-4 px-6 py-2 bg-emerald-700 text-white font-bold rounded-lg hover:bg-emerald-800 transition-colors cursor-pointer"
        >
          Return to Hub
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Navigation */}
      <div className="flex items-center gap-4">
        <Link 
          to={`${basePath}/hub`} 
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all shadow-xs cursor-pointer"
        >
          <ArrowLeft size={20} />
        </Link>
        <nav className="text-xs font-medium text-slate-500 select-none flex-1">
          <span className="cursor-pointer hover:text-slate-700" onClick={() => navigate(`${basePath}/hub`)}>Food Hub</span>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-900 font-semibold">{item.title}</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Image Placeholder & Header Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="h-48 bg-slate-100 flex items-center justify-center relative">
              <Utensils size={48} className="text-slate-300" />
              {/* Status Badge overlay on image */}
              <div className="absolute top-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl font-bold text-sm text-emerald-700 shadow-sm flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" />
                {item.status}
              </div>
            </div>
            
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-amber-50 text-amber-700 border border-amber-100/60 rounded-lg text-xs font-bold uppercase tracking-wider">
                  Expires in {item.expiresIn}
                </span>
                <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold uppercase tracking-wider">
                  {item.foodType}
                </span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {item.title}
              </h1>
              
              <p className="mt-4 text-[15px] leading-relaxed text-slate-600 font-medium">
                {item.description}
              </p>
            </div>
          </div>

          {/* Details Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Listing Details</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                  <Package size={20} className="text-emerald-700" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Quantity Available</p>
                  <p className="font-semibold text-slate-900 text-base">{item.quantity}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                  <Utensils size={20} className="text-orange-700" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Dietary Category</p>
                  <p className="font-semibold text-slate-900 text-base">{item.dietary}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Pickup Information Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-5">Pickup Information</h2>
            
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-900 text-sm leading-snug">{item.donor}</p>
                  <p className="text-sm text-slate-500 mt-1 leading-snug">{item.location}</p>
                  <p className="text-xs font-bold text-emerald-600 mt-1.5">{item.distance} away</p>
                </div>
              </div>
              
              <div className="w-full h-px bg-slate-100" />
              
              <div className="flex items-start gap-3">
                <Clock size={18} className="text-slate-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold text-slate-900 text-sm">Required Pickup Time</p>
                  <p className="text-sm text-slate-500 mt-1">{item.pickupTime}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details Card */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-5">Contact Details</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <User size={16} className="text-slate-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.contactPerson}</p>
                  <p className="text-xs text-slate-500">Point of Contact</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-slate-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.contactPhone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          {basePath === '/ngo' && (
            <button className="w-full py-3 h-12 rounded-xl text-sm font-bold bg-[#064e3b] text-white hover:bg-[#059669] transition-colors shadow-md shadow-emerald-900/10 cursor-pointer">
              Claim this Food
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
