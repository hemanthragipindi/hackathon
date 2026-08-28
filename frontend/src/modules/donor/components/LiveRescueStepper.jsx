import React from 'react';
import { Check, Truck, Package, Home } from 'lucide-react';

export default function LiveRescueStepper({ currentStep = 'on_the_way' }) {
  // Define our available steps and their sequence
  const steps = [
    { id: 'listed', label: 'Listed', icon: Check },
    { id: 'claimed', label: 'Claimed', icon: Check },
    { id: 'on_the_way', label: 'On the way', icon: Truck },
    { id: 'picked_up', label: 'Picked up', icon: Package },
    { id: 'delivered', label: 'Delivered', icon: Home },
  ];

  // Find the index of the current active step
  const activeIndex = steps.findIndex(step => step.id === currentStep);
  // Default to 0 if an invalid step is passed
  const validActiveIndex = activeIndex === -1 ? 0 : activeIndex;
  
  // Calculate widths for the colored progress bar
  const totalSegments = steps.length - 1;
  const completedSegments = Math.max(0, validActiveIndex - 1);
  
  // The green part goes up to the last fully completed step
  const completedPercentage = (completedSegments / totalSegments) * 100;
  
  // The orange part connects the last completed step to the current active step
  const hasActiveSegment = validActiveIndex > 0 && validActiveIndex < steps.length;
  // If the very last step (delivered) is active, validActiveIndex is 4. completedSegments is 3 (75%). 
  // activeSegment is 25%. So the last chunk is orange. That works nicely!
  const activeSegmentWidth = hasActiveSegment ? (1 / totalSegments) * 100 : 0;

  return (
    <div className="pt-2 w-full">
      <div className="relative flex items-center justify-between">
        {/* Connecting Background Line Bar */}
        <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-1 bg-slate-100 z-0 overflow-hidden rounded-full">
          {/* Completed green segment */}
          <div 
            className="absolute left-0 top-0 bottom-0 bg-[#059669] transition-all duration-500 ease-in-out" 
            style={{ width: `${completedPercentage}%` }}
          />
          {/* Active orange segment */}
          {hasActiveSegment && (
            <div 
              className="absolute top-0 bottom-0 bg-[#ea580c] transition-all duration-500 ease-in-out" 
              style={{ 
                left: `${completedPercentage}%`, 
                width: `${activeSegmentWidth}%` 
              }}
            />
          )}
        </div>

        {/* Render each step node dynamically */}
        {steps.map((step, index) => {
          const isCompleted = index < validActiveIndex;
          const isActive = index === validActiveIndex;
          const isPending = index > validActiveIndex;
          
          const IconComponent = step.icon;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center">
              {/* Node Circle */}
              {isCompleted && (
                <div className="w-8 h-8 rounded-full bg-[#059669] text-white flex items-center justify-center shadow-xs transition-colors duration-300">
                  <IconComponent size={16} className="stroke-[3]" />
                </div>
              )}
              
              {isActive && (
                <div className="relative w-9 h-9 rounded-full bg-[#f97316] text-white flex items-center justify-center shadow-md shadow-orange-500/25 ring-4 ring-orange-100 transition-all duration-300">
                  <IconComponent size={17} className="stroke-[2.4]" />
                  {/* Ping dot for active step */}
                  <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-orange-500 ring-2 ring-white animate-pulse" />
                </div>
              )}

              {isPending && (
                <div className="w-8 h-8 rounded-full bg-slate-50 border-2 border-slate-200 text-slate-400 flex items-center justify-center transition-colors duration-300">
                  <IconComponent size={15} className="stroke-[2]" />
                </div>
              )}
              
              {/* Label */}
              <span className={`mt-2 transition-colors duration-300 ${
                isCompleted ? 'text-[11.5px] font-bold text-slate-900' :
                isActive ? 'text-[11.5px] font-extrabold text-[#ea580c]' :
                'text-[11.5px] font-semibold text-slate-400'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
