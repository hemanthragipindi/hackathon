import React, { useState } from 'react';
import { 
  Bell, 
  User, 
  ChevronDown, 
  ChevronUp, 
  Headphones, 
  ShieldCheck, 
  ArrowRight,
  MessageSquare,
  Phone,
  Mail,
  X
} from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: 'How do I share surplus food?',
    answer: 'Navigate to "Share Surplus" in the sidebar, fill in your food details (name, quantity, dietary type, and freshness time), confirm your pickup address, and click "Share Food for Rescue". Nearby verified NGOs will be notified instantly.'
  },
  {
    id: 2,
    question: 'What happens after my food is claimed?',
    answer: 'Once a verified NGO partner accepts your listing, a dedicated pickup volunteer is dispatched. You can track their real-time journey, view their estimated arrival time, and contact them directly on the "Pickup Journey" page.'
  },
  {
    id: 3,
    question: 'How does pickup work?',
    answer: 'The volunteer will arrive at your specified pickup window at your kitchen or back door. Have the food packed safely in food-grade containers. The volunteer will verify the food item and scan the digital handover QR code.'
  },
  {
    id: 4,
    question: 'What should I do if a pickup is delayed?',
    answer: 'If the assigned volunteer is running late or if your kitchen is closing soon, you can directly message or call the volunteer using the contact button on the Pickup Journey tracker, or reach out to our 24/7 rescue support hotline.'
  }
];

export default function HelpSupport() {
  const [openFaq, setOpenFaq] = useState(1);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showGuidelinesModal, setShowGuidelinesModal] = useState(false);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  return (
    <div className="space-y-7 pb-12 max-w-[1300px] mx-auto select-none">
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl sm:text-[26px] font-extrabold text-slate-900 tracking-tight">
            Help & Support
          </h1>
          <p className="text-xs sm:text-[13.5px] text-slate-500 font-medium mt-0.5">
            Find answers or get help when you need it.
          </p>
        </div>

        {/* Top-Right Control Icons */}
        <div className="flex items-center gap-3">
          <button className="relative w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer">
            <Bell size={17} />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500" />
          </button>
          
          <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600">
            <User size={18} />
          </div>
        </div>
      </div>

      {/* Main Grid: FAQs (Left) + Support Cards (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Frequently Asked Questions Accordion (8 cols on lg) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-100/90 shadow-xs p-6 sm:p-8 space-y-6">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>

          <div className="divide-y divide-slate-100">
            {faqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div key={faq.id} className="py-4 first:pt-1 last:pb-1">
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between text-left gap-4 cursor-pointer group"
                  >
                    <span className={`text-sm sm:text-[14.5px] font-bold transition-colors ${
                      isOpen ? 'text-[#064e3b]' : 'text-slate-800 group-hover:text-slate-900'
                    }`}>
                      {faq.question}
                    </span>
                    <span className="text-slate-400 group-hover:text-slate-600 shrink-0">
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pt-3 pr-6 text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Support & Guidelines Widgets (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-5">
          
          {/* Widget 1: Still need help? */}
          <div className="bg-white rounded-3xl border border-slate-100/90 shadow-xs p-6 sm:p-7 text-center space-y-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-2xs">
              <Headphones size={22} className="stroke-[2.2]" />
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                Still need help?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[220px] mx-auto mt-1">
                Our support team is here to help you.
              </p>
            </div>

            <div className="pt-2">
              <button 
                type="button"
                onClick={() => setShowSupportModal(true)}
                className="w-full py-3 px-5 bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all active:scale-[0.99] cursor-pointer"
              >
                Contact Support
              </button>
            </div>
          </div>

          {/* Widget 2: Food Sharing Guidelines */}
          <div className="bg-gradient-to-r from-[#f0f7ff] via-[#f7faff] to-[#f4f9ff] border border-sky-100/90 rounded-2xl p-5 shadow-2xs space-y-2">
            <div className="flex items-start gap-2.5">
              <ShieldCheck size={18} className="text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs sm:text-[13px] font-bold text-slate-900">
                  Food Sharing Guidelines
                </h4>
                <p className="text-[11.5px] text-slate-500 leading-snug mt-0.5">
                  Review the basic guidelines before sharing food.
                </p>
              </div>
            </div>

            <div className="pl-7 pt-1">
              <button
                type="button"
                onClick={() => setShowGuidelinesModal(true)}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-900 inline-flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>View Guidelines</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Support Contact Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-xl space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Headphones size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">24/7 Rescue Support</h3>
              </div>
              <button onClick={() => setShowSupportModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X size={20} />
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Have an urgent issue with an active rescue or food safety verification? Connect directly with our live dispatch team.
            </p>

            <div className="space-y-3 text-xs sm:text-sm">
              <a 
                href="tel:18005554321" 
                className="flex items-center gap-3 p-3.5 bg-slate-50 hover:bg-emerald-50 rounded-2xl border border-slate-100 transition-colors"
              >
                <Phone size={18} className="text-emerald-700" />
                <div>
                  <p className="font-bold text-slate-900">Toll-Free Rescue Hotline</p>
                  <p className="text-slate-500 text-xs">1-800-555-FOOD (24/7)</p>
                </div>
              </a>

              <a 
                href="mailto:support@goodfoodrescue.org" 
                className="flex items-center gap-3 p-3.5 bg-slate-50 hover:bg-emerald-50 rounded-2xl border border-slate-100 transition-colors"
              >
                <Mail size={18} className="text-emerald-700" />
                <div>
                  <p className="font-bold text-slate-900">Email Support Dispatch</p>
                  <p className="text-slate-500 text-xs">dispatch@goodfoodrescue.org</p>
                </div>
              </a>
            </div>

            <button
              onClick={() => setShowSupportModal(false)}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Food Guidelines Modal */}
      {showGuidelinesModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-xl space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Food Safety & Quality Guidelines</h3>
              </div>
              <button onClick={() => setShowGuidelinesModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600">
              <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100/80">
                <strong className="text-emerald-900 block font-bold mb-0.5">1. Temperature Control</strong>
                Hot cooked food must be kept above 60°C (140°F) or rapidly cooled to below 4°C (40°F) before handover.
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <strong className="text-slate-900 block font-bold mb-0.5">2. Packaging & Labeling</strong>
                Food must be stored in food-grade, sealed containers clearly labeled with dish name and preparation time.
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <strong className="text-slate-900 block font-bold mb-0.5">3. Allergen Awareness</strong>
                Always declare common allergens (nuts, dairy, gluten, shellfish) in the optional description field.
              </div>
            </div>

            <button
              onClick={() => setShowGuidelinesModal(false)}
              className="w-full py-2.5 bg-[#059669] hover:bg-[#047857] text-white font-bold rounded-xl text-xs transition-colors"
            >
              I Understand
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
