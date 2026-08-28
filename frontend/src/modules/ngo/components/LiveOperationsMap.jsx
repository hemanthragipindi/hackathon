import React, { useState } from 'react';
import { Utensils, Building2, Truck, Heart, MapPin, Navigation, Info } from 'lucide-react';

export default function LiveOperationsMap() {
  const [activeMarker, setActiveMarker] = useState(null);

  const markers = [
    {
      id: 'food',
      type: 'food',
      title: 'Available Food: Vegetarian Biryani',
      location: 'ABC Restaurant, 2.4 km away',
      details: '75 meals ready for pickup (1:00 PM - 2:00 PM)',
      x: '39%',
      y: '37%',
      color: 'bg-emerald-700 text-white',
      ringColor: 'ring-emerald-400',
      icon: Utensils,
    },
    {
      id: 'ngo',
      type: 'ngo',
      title: 'Helping Hands NGO HQ',
      location: 'Central Relief Center, Sector 4',
      details: 'Active logistics hub & dispatch unit',
      x: '48%',
      y: '47%',
      color: 'bg-blue-600 text-white',
      ringColor: 'ring-blue-400',
      icon: Building2,
    },
    {
      id: 'truck',
      type: 'truck',
      title: 'Active Truck #3 (Route #2)',
      location: 'En Route to ABC Restaurant',
      details: 'Driver: Rahul Kumar • ETA: 8 mins',
      x: '58%',
      y: '50%',
      color: 'bg-amber-500 text-white',
      ringColor: 'ring-amber-300',
      icon: Truck,
      pulse: true,
    },
    {
      id: 'beneficiary',
      type: 'beneficiary',
      title: 'Sunshine Community Shelter',
      location: 'East District, Block B',
      details: 'Beneficiaries: 120 individuals registered',
      x: '35%',
      y: '53%',
      color: 'bg-pink-500 text-white',
      ringColor: 'ring-pink-300',
      icon: Heart,
    },
  ];

  return (
    <div className="relative w-full h-80 md:h-[340px] rounded-2xl overflow-hidden border border-gray-200/80 shadow-xs bg-[#eef3f6]">
      {/* Stylized Vector Map Background */}
      <svg 
        className="absolute inset-0 w-full h-full object-cover select-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 800 450"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1" opacity="0.6" />
          </pattern>
          {/* Subtle river gradient */}
          <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Base terrain */}
        <rect width="100%" height="100%" fill="#f1f5f9" />
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />

        {/* Park / Green spaces */}
        <path d="M50,40 Q120,20 180,60 T300,80 L280,180 Q180,160 100,200 Z" fill="#dcfce7" opacity="0.6" />
        <path d="M540,280 Q640,240 720,290 T800,340 L760,450 Q620,440 520,400 Z" fill="#dcfce7" opacity="0.5" />
        <path d="M20,320 Q80,290 140,330 T220,420 L20,440 Z" fill="#dcfce7" opacity="0.6" />

        {/* Waterway / River */}
        <path 
          d="M480,0 Q540,90 620,130 T750,180 T800,220 L800,0 Z" 
          fill="url(#riverGrad)" 
        />
        <path 
          d="M0,220 Q120,240 260,280 T460,370 T550,450 L400,450 Q300,380 180,330 T0,300 Z" 
          fill="url(#riverGrad)" 
        />

        {/* City Blocks & Buildings (Subtle geometric polygons) */}
        <g fill="#e2e8f0" opacity="0.7">
          <rect x="70" y="70" width="60" height="40" rx="3" />
          <rect x="140" y="70" width="50" height="35" rx="3" />
          <rect x="70" y="120" width="40" height="50" rx="3" />
          <rect x="120" y="115" width="70" height="40" rx="3" />
          <rect x="220" y="100" width="80" height="60" rx="4" />
          <rect x="320" y="60" width="90" height="70" rx="4" />
          <rect x="430" y="80" width="70" height="50" rx="4" />
          
          <rect x="250" y="180" width="90" height="60" rx="4" />
          <rect x="360" y="150" width="80" height="50" rx="4" />
          <rect x="460" y="160" width="100" height="70" rx="4" />
          <rect x="580" y="190" width="70" height="60" rx="4" />

          <rect x="180" y="260" width="60" height="40" rx="3" />
          <rect x="260" y="270" width="80" height="55" rx="4" />
          <rect x="360" y="230" width="110" height="80" rx="4" />
          <rect x="490" y="250" width="80" height="65" rx="4" />
          <rect x="590" y="270" width="90" height="50" rx="4" />

          <rect x="100" y="360" width="70" height="45" rx="3" />
          <rect x="280" y="360" width="90" height="50" rx="4" />
          <rect x="390" y="340" width="75" height="60" rx="4" />
          <rect x="620" y="350" width="80" height="55" rx="4" />
        </g>

        {/* Major Roads & Avenues */}
        <g stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
          <line x1="0" y1="170" x2="800" y2="150" />
          <line x1="0" y1="250" x2="800" y2="240" />
          <line x1="0" y1="340" x2="800" y2="330" />
          
          <line x1="200" y1="0" x2="220" y2="450" />
          <line x1="340" y1="0" x2="350" y2="450" />
          <line x1="480" y1="0" x2="470" y2="450" />
          <line x1="620" y1="0" x2="600" y2="450" />
          
          {/* Diagonal Highway */}
          <path d="M50,0 Q250,150 480,260 T750,450" fill="none" strokeWidth="9" stroke="#f8fafc" />
        </g>

        {/* Road centerline accents */}
        <path d="M50,0 Q250,150 480,260 T750,450" fill="none" strokeWidth="2" stroke="#cbd5e1" strokeDasharray="6,6" />

        {/* Live Route line connecting NGO to Pickup */}
        <path 
          d="M 384,211 L 312,166" 
          fill="none" 
          stroke="#f59e0b" 
          strokeWidth="3" 
          strokeDasharray="4,4" 
          className="animate-pulse"
        />
        <path 
          d="M 384,211 L 464,225" 
          fill="none" 
          stroke="#3b82f6" 
          strokeWidth="2.5" 
          strokeDasharray="4,4"
        />
      </svg>

      {/* Top Left Floating Header */}
      <div className="absolute top-3 left-4 z-10 select-none">
        <div className="text-xs font-bold text-gray-500 tracking-wider uppercase drop-shadow-xs">
          FoodRescue Dashboard
        </div>
        <h3 className="text-lg md:text-xl font-black text-gray-800 drop-shadow-xs tracking-tight">
          Live Operations
        </h3>
      </div>

      {/* Map Pins */}
      {markers.map((marker) => {
        const IconComponent = marker.icon;
        const isHovered = activeMarker === marker.id;

        return (
          <div
            key={marker.id}
            style={{ left: marker.x, top: marker.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
            onMouseEnter={() => setActiveMarker(marker.id)}
            onMouseLeave={() => setActiveMarker(null)}
            onClick={() => setActiveMarker(activeMarker === marker.id ? null : marker.id)}
          >
            {/* Pulsing ring for active tracking */}
            {marker.pulse && (
              <span className="absolute -inset-2 rounded-full bg-amber-400 opacity-75 animate-ping pointer-events-none" />
            )}

            {/* Pin Circle */}
            <div 
              className={`relative flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full shadow-md transition-transform duration-150 transform hover:scale-115 ${marker.color} ring-2 ring-white`}
            >
              <IconComponent size={17} className="stroke-[2.5]" />
            </div>

            {/* Tooltip on hover */}
            {isHovered && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-2.5 bg-gray-900/95 text-white text-xs rounded-xl shadow-xl backdrop-blur-xs z-30 pointer-events-none animate-fadeIn">
                <div className="font-bold text-sm text-white mb-0.5">{marker.title}</div>
                <div className="text-gray-300 font-medium text-[11px] mb-1">{marker.location}</div>
                <div className="text-emerald-400 font-medium text-[11px]">{marker.details}</div>
                <div className="absolute bottom-[-5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-gray-900/95 rotate-45"></div>
              </div>
            )}
          </div>
        );
      })}

      {/* Bottom Right Floating Legend Card */}
      <div className="absolute bottom-3 right-3 z-10 bg-white/95 backdrop-blur-md rounded-xl py-2 px-3.5 shadow-md border border-gray-200/80 text-xs font-medium text-gray-700 select-none">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-700 ring-1 ring-emerald-600/30"></span>
            <span className="text-[11px] font-semibold text-gray-800">Available Food</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 ring-1 ring-blue-500/30"></span>
            <span className="text-[11px] font-semibold text-gray-800">NGO Center</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 ring-1 ring-amber-400/30"></span>
            <span className="text-[11px] font-semibold text-gray-800">Active Truck</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-500 ring-1 ring-pink-400/30"></span>
            <span className="text-[11px] font-semibold text-gray-800">Beneficiary</span>
          </div>
        </div>
      </div>
    </div>
  );
}
