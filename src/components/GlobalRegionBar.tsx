import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Phone, Clock, ChevronDown, Check, Sparkles } from 'lucide-react';
import { projectData } from '../data/projectData';

interface GlobalRegionBarProps {
  onOpenBooking: () => void;
}

export const GlobalRegionBar: React.FC<GlobalRegionBarProps> = ({ onOpenBooking }) => {
  const [activeRegion, setActiveRegion] = useState<'IN' | 'UAE' | 'USA' | 'UK' | 'SG'>('IN');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const regionConfigs = {
    IN: {
      flag: "🇮🇳",
      name: "India (IST)",
      currency: "INR (₹)",
      priceLabel: "₹97 Lakhs* onwards",
      phone: "+91 9179617961",
      timezone: "10:00 AM - 8:00 PM IST",
      badge: "MahaRERA: PM1260002502043"
    },
    UAE: {
      flag: "🇦🇪",
      name: "UAE & GCC (GST)",
      currency: "AED (د.إ)",
      priceLabel: "AED 412,000* onwards",
      phone: "+91 9179617961",
      timezone: "8:30 AM - 6:30 PM GST",
      badge: "Dedicated Dubai / GCC NRI Desk"
    },
    USA: {
      flag: "🇺🇸",
      name: "USA & Canada (EST/PST)",
      currency: "USD ($)",
      priceLabel: "$112,000* onwards",
      phone: "+91 9179617961",
      timezone: "24/7 Global US Investor Line",
      badge: "FEMA Compliant Repatriation"
    },
    UK: {
      flag: "🇬🇧",
      name: "UK & Europe (BST)",
      currency: "GBP (£)",
      priceLabel: "£88,000* onwards",
      phone: "+91 9179617961",
      timezone: "9:00 AM - 5:00 PM BST",
      badge: "NRE / NRO Direct Facilitation"
    },
    SG: {
      flag: "🇸🇬",
      name: "Singapore & APAC (SGT)",
      currency: "SGD (S$)",
      priceLabel: "S$152,000* onwards",
      phone: "+91 9179617961",
      timezone: "12:30 PM - 10:30 PM SGT",
      badge: "High-Yield Portfolio Desk"
    }
  };

  const current = regionConfigs[activeRegion];

  return (
    <div className="bg-slate-950 text-slate-200 border-b border-champagne-500/20 text-[11px] py-1.5 px-4 sm:px-6 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        
        {/* Left: Global Region & Currency Selector */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-1.5 font-bold text-white hover:text-champagne-400 transition cursor-pointer bg-white/10 px-2.5 py-0.5 rounded-md"
            >
              <span>{current.flag}</span>
              <span>{current.name}</span>
              <ChevronDown className="w-3 h-3 text-champagne-400" />
            </button>

            {dropdownOpen && (
              <div className="absolute top-full mt-1 left-0 w-56 rounded-2xl bg-slate-900 border border-champagne-500/40 shadow-2xl p-1.5 z-50">
                {(Object.keys(regionConfigs) as Array<keyof typeof regionConfigs>).map((key) => {
                  const reg = regionConfigs[key];
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        setActiveRegion(key);
                        setDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition cursor-pointer ${
                        activeRegion === key
                          ? 'bg-champagne-500 text-slate-950 font-bold'
                          : 'hover:bg-white/10 text-slate-300'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{reg.flag}</span>
                        <span>{reg.name}</span>
                      </span>
                      {activeRegion === key && <Check className="w-3.5 h-3.5 text-slate-950" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <span className="text-slate-400 hidden md:inline">•</span>
          <span className="text-champagne-400 font-mono font-bold hidden md:inline">
            Starting: {current.priceLabel}
          </span>
        </div>

        {/* Right: Direct Global Investor Concierge & MahaRERA Badge */}
        <div className="flex items-center gap-4 text-slate-300">
          <span className="hidden lg:inline-flex items-center gap-1 text-[10px] font-mono text-champagne-300">
            <Sparkles className="w-3 h-3 text-champagne-400" /> {current.badge}
          </span>

          <a
            href={`tel:${current.phone}`}
            className="flex items-center gap-1.5 font-bold text-white hover:text-champagne-400 transition"
          >
            <Phone className="w-3 h-3 text-champagne-400" />
            <span>{current.phone}</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="btn-auric px-3 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-slate-950 cursor-pointer hidden sm:block shadow-sm"
          >
            VIP Schedule
          </button>
        </div>

      </div>
    </div>
  );
};
