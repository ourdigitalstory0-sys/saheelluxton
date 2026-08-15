import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation2, Car, Train, Footprints, Clock, MapPin, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';
import { projectData } from '../data/projectData';

interface TransitDistanceCalculatorProps {
  onOpenBooking: () => void;
}

export const TransitDistanceCalculator: React.FC<TransitDistanceCalculatorProps> = ({ onOpenBooking }) => {
  const [selectedDestination, setSelectedDestination] = useState<string>('phoenix-mall');
  const [travelMode, setTravelMode] = useState<'car' | 'metro' | 'walk'>('car');

  const destinations = [
    {
      id: 'phoenix-mall',
      name: "Phoenix Mall of the Millennium",
      category: "Shopping & Entertainment",
      distanceKm: "1.8 km",
      carTime: "4 - 5 Mins",
      metroTime: "3 Mins (Wakad Stn)",
      walkTime: "18 Mins",
      description: "Pune's largest luxury lifestyle mall featuring 300+ international brands, multiplex & fine dining.",
      googleMapsRoute: "https://maps.google.com/?daddr=Phoenix+Mall+of+the+Millennium+Wakad+Pune"
    },
    {
      id: 'infosys-phase1',
      name: "Infosys & Wipro (Hinjawadi Phase 1)",
      category: "IT Park & Work Hub",
      distanceKm: "3.2 km",
      carTime: "7 - 8 Mins",
      metroTime: "6 Mins (Direct Metro)",
      walkTime: "35 Mins",
      description: "Rajiv Gandhi Infotech Park Phase 1 housing major IT multinational campuses and tech centres.",
      googleMapsRoute: "https://maps.google.com/?daddr=Infosys+Phase+1+Hinjawadi+Pune"
    },
    {
      id: 'balewadi-high-street',
      name: "Balewadi High Street & Baner",
      category: "Nightlife & Fine Dining",
      distanceKm: "4.5 km",
      carTime: "9 - 10 Mins",
      metroTime: "8 Mins",
      walkTime: "45 Mins",
      description: "West Pune's bustling gourmet dining strip, corporate headquarters, and high-street shopping boulevard.",
      googleMapsRoute: "https://maps.google.com/?daddr=Balewadi+High+Street+Pune"
    },
    {
      id: 'wakad-chowk-metro',
      name: "Upcoming Metro Line 3 Station (Wakad Chowk)",
      category: "Transit Hub",
      distanceKm: "1.2 km",
      carTime: "3 Mins",
      metroTime: "Immediate Hub",
      walkTime: "12 Mins",
      description: "Elevated 23.3 km rapid metro transit corridor connecting directly to Hinjawadi and Shivajinagar.",
      googleMapsRoute: "https://maps.google.com/?daddr=Wakad+Chowk+Pune"
    },
    {
      id: 'mumbai-pune-expressway',
      name: "Mumbai-Pune Expressway (Dehu Road)",
      category: "Interstate Highway",
      distanceKm: "6.8 km",
      carTime: "12 - 14 Mins",
      metroTime: "N/A",
      walkTime: "N/A",
      description: "Seamless non-stop highway link connecting to Navi Mumbai, Panvel International Airport & Lonavala.",
      googleMapsRoute: "https://maps.google.com/?daddr=Mumbai+Pune+Expressway+Toll+Plaza"
    },
    {
      id: 'ruby-hall-clinic',
      name: "Ruby Hall Clinic & Aditya Birla Hospital",
      category: "Healthcare & Hospitals",
      distanceKm: "2.4 km",
      carTime: "5 - 6 Mins",
      metroTime: "5 Mins",
      walkTime: "25 Mins",
      description: "Multi-specialty tertiary care hospitals offering 24/7 trauma care and world-class medical facilities.",
      googleMapsRoute: "https://maps.google.com/?daddr=Ruby+Hall+Clinic+Hinjawadi+Pune"
    }
  ];

  const currentDest = destinations.find(d => d.id === selectedDestination) || destinations[0];

  const getActiveTime = () => {
    switch (travelMode) {
      case 'car': return currentDest.carTime;
      case 'metro': return currentDest.metroTime;
      case 'walk': return currentDest.walkTime;
      default: return currentDest.carTime;
    }
  };

  return (
    <section id="commute-matrix" className="py-24 lg:py-32 relative bg-white overflow-hidden border-t border-champagne-500/20">
      
      {/* Gliding Fluid Background Orbs */}
      <motion.div 
        animate={{ y: [0, 30, 0], x: [0, -25, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -right-48 w-[550px] h-[550px] bg-champagne-300/20 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full ultra-glass border-champagne-500/40 text-champagne-800 text-xs font-bold uppercase tracking-widest shadow-sm"
          >
            <Navigation2 className="w-4 h-4 text-champagne-600" />
            Phase 3: Micro-Market Transit & Commute Matrix
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-slate-900 tracking-tight leading-tight"
          >
            Interactive Commute Time <br />
            <span className="gold-gradient-text">& Strategic Distance Calculator</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-600 text-sm sm:text-base font-normal"
          >
            Calculate live door-to-door transit times from Saheel Luxton Wakad across Hinjawadi IT Park, Phoenix Mall, Balewadi High Street & Pune Metro Line 3.
          </motion.p>
        </div>

        {/* Interactive Commute Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Destination Selector Column */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl ultra-glass border-2 border-champagne-500/40 bg-white shadow-milky-card space-y-4">
            <span className="text-xs font-bold font-cinzel text-slate-900 uppercase tracking-wider block">
              Select Your Key Destination:
            </span>

            <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
              {destinations.map((dest) => (
                <motion.button
                  key={dest.id}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedDestination(dest.id)}
                  className={`w-full p-3.5 rounded-2xl text-left border transition-all cursor-pointer flex items-center justify-between ${
                    selectedDestination === dest.id
                      ? 'bg-gradient-to-r from-champagne-100/80 via-white to-champagne-50 border-champagne-500 shadow-md ring-1 ring-champagne-400'
                      : 'bg-milky-50/60 border-slate-200 hover:border-champagne-400 text-slate-700'
                  }`}
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-champagne-700 uppercase font-bold block">{dest.category}</span>
                    <strong className="text-xs sm:text-sm font-bold font-cinzel text-slate-900 block">{dest.name}</strong>
                  </div>
                  <span className="text-xs font-mono font-bold text-champagne-800 bg-white px-2.5 py-1 rounded-full border border-champagne-300 shadow-sm shrink-0 ml-2">
                    {dest.distanceKm}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Commute Time Display Box */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl ultra-glass border-2 border-champagne-500/40 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white shadow-2xl space-y-6">
            
            {/* Mode Switcher */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-champagne-400 font-bold block">Transit Mode</span>
                <h4 className="text-sm font-bold font-cinzel text-white">Estimated Travel Time</h4>
              </div>

              <div className="flex items-center p-1 rounded-2xl bg-white/10 border border-champagne-500/40 gap-1">
                {[
                  { id: 'car', icon: <Car className="w-3.5 h-3.5" />, label: 'Drive' },
                  { id: 'metro', icon: <Train className="w-3.5 h-3.5" />, label: 'Metro' },
                  { id: 'walk', icon: <Footprints className="w-3.5 h-3.5" />, label: 'Walk' }
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setTravelMode(mode.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                      travelMode === mode.id
                        ? 'btn-auric text-slate-950 shadow-md font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {mode.icon}
                    <span>{mode.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Output Card */}
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-champagne-400 font-bold block">
                  {currentDest.name}
                </span>
                <strong className="text-3xl sm:text-4xl font-black font-cinzel gold-gradient-text mt-1 block">
                  {getActiveTime()}
                </strong>
                <span className="text-xs text-slate-400 mt-1 block">
                  Approx. {currentDest.distanceKm} via Shankar Kalat Nagar & Wakad Main Rd
                </span>
              </div>
              <div className="w-14 h-14 rounded-2xl btn-auric text-slate-950 flex items-center justify-center font-black shadow-gold-glow shrink-0">
                <Clock className="w-7 h-7" />
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {currentDest.description}
            </p>

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href={currentDest.googleMapsRoute}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-auric-outline py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer text-white border-champagne-400/50 hover:bg-white/10 text-center"
              >
                <MapPin className="w-4 h-4 text-champagne-400" /> Open Live GPS Route
              </a>

              <button
                onClick={onOpenBooking}
                className="btn-auric py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-glow cursor-pointer text-slate-950"
              >
                <Sparkles className="w-4 h-4" /> Book AC Cab Site Visit
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
