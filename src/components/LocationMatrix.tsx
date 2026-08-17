import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, ExternalLink, Briefcase, ShoppingBag, GraduationCap, HeartPulse, Navigation2, Clock, Car } from 'lucide-react';
import { projectData } from '../data/projectData';

interface LocationMatrixProps {
  onOpenBooking: () => void;
}

export const LocationMatrix: React.FC<LocationMatrixProps> = ({ onOpenBooking }) => {
  const [activeCategoryId, setActiveCategoryId] = useState('it_hubs');

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'it_hubs': return <Briefcase className="w-4 h-4" />;
      case 'shopping': return <ShoppingBag className="w-4 h-4" />;
      case 'schools': return <GraduationCap className="w-4 h-4" />;
      case 'hospitals': return <HeartPulse className="w-4 h-4" />;
      case 'connectivity': return <Navigation2 className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  const activeCategory = projectData.locationData.categories.find(c => c.id === activeCategoryId) || projectData.locationData.categories[0];

  return (
    <section id="location" className="py-24 lg:py-32 relative bg-white overflow-hidden">
      
      {/* Gliding Fluid Background Orbs */}
      <motion.div 
        animate={{ y: [0, 40, 0], x: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 -left-48 w-[550px] h-[550px] bg-champagne-300/25 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full ultra-glass border-champagne-500/40 text-champagne-800 text-xs font-bold uppercase tracking-widest shadow-sm"
          >
            <MapPin className="w-4 h-4 text-champagne-600" />
            Prime Wakad, Pune Location
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-slate-900 tracking-tight leading-tight"
          >
            Saheel Luxton Wakad: <br />
            <span className="gold-gradient-text">Strategic Location & Proximity Map</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-600 text-sm sm:text-base font-normal"
          >
            Enjoy seamless connectivity to Hinjawadi IT Parks, Phoenix Mall of the Millennium, Mumbai-Pune Expressway, and top schools.
          </motion.p>

          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "112px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-transparent via-champagne-500 to-transparent mx-auto mt-4"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3.5 mb-12">
          {projectData.locationData.categories.map((cat) => (
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              key={cat.id}
              onClick={() => setActiveCategoryId(cat.id)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 flex items-center gap-2 border cursor-pointer ${
                activeCategoryId === cat.id
                  ? 'btn-auric border-transparent shadow-gold-glow scale-105 text-white'
                  : 'ultra-glass border-champagne-500/20 text-slate-700 hover:border-champagne-500 hover:text-slate-950 bg-white'
              }`}
            >
              {getCategoryIcon(cat.id)}
              <span>{cat.name}</span>
            </motion.button>
          ))}
        </div>

        {/* 2-Column Grid: Landmark List & Live Google Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Landmark Breakdown */}
          <motion.div 
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="ultra-glass rounded-3xl p-6 sm:p-7 border-champagne-500/30 space-y-4 shadow-milky-card bg-white">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2.5">
                  <span className="p-2.5 rounded-xl bg-champagne-100 text-champagne-700 border border-champagne-400">
                    {getCategoryIcon(activeCategory.id)}
                  </span>
                  <div>
                    <h4 className="text-base font-bold font-cinzel text-slate-900">{activeCategory.name}</h4>
                    <span className="text-[11px] text-slate-500 font-medium">Proximity & Travel Times</span>
                  </div>
                </div>
                <span className="text-xs font-mono text-champagne-800 bg-champagne-50 px-3 py-1 rounded-lg border border-champagne-300 font-bold">
                  {activeCategory.items.length} Points
                </span>
              </div>

              {/* Items List with Staggered Spring Reveal */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeCategoryId}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-3"
                >
                  {activeCategory.items.map((item, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -3, scale: 1.01 }}
                      className="p-3.5 rounded-2xl bg-milky-100 border border-slate-200 hover:border-champagne-500 hover:bg-champagne-50/50 transition-all flex items-center justify-between group shadow-sm"
                    >
                      <div className="space-y-0.5 pr-2">
                        <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-champagne-700 transition-colors">
                          {item.name}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-2 font-medium">
                          <span>Distance: <strong className="text-slate-800 font-bold">{item.distance}</strong></span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-champagne-100 border border-champagne-400 text-champagne-900 text-xs font-mono font-black shrink-0">
                        <Car className="w-3.5 h-3.5 text-champagne-600" />
                        <span>{item.time}</span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Booking CTA */}
              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onOpenBooking}
                  className="w-full btn-auric py-3.5 rounded-full text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-gold-glow cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  Schedule Site Visit with Free Pick-up
                </motion.button>
              </div>
            </div>

            {/* Strategic Location Highlights Banner */}
            <motion.div 
              whileHover={{ y: -2 }}
              className="p-5 rounded-2xl bg-gradient-to-r from-champagne-100 via-white to-champagne-50 border border-champagne-400/40 text-xs text-slate-700 space-y-2 shadow-sm"
            >
              <div className="font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-champagne-600" />
                Why Wakad is Pune’s Premier Growth Corridor:
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px] font-normal">
                Direct proximity to Hinjawadi Rajiv Gandhi Infotech Park (400,000+ tech workforce), seamless access to Mumbai-Pune Expressway, Phoenix Mall of Millennium, and newly proposed Metro connectivity make Wakad the highest appreciating luxury micro-market.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column: Google Maps & Strategic Map Graphic */}
          <motion.div 
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-4"
          >
            <motion.div 
              whileHover={{ y: -4 }}
              className="ultra-glass rounded-3xl overflow-hidden border-champagne-500/30 p-2.5 shadow-milky-card bg-white"
            >
              
              {/* Map Container */}
              <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-slate-100 group">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                  src={projectData.locationData.mapImage}
                  alt="Saheel Luxton S. No. 111 Shankar Kalat Nagar Wakad Pune Location and Connectivity Map"
                  className="w-full h-full object-cover"
                />

                {/* Map Overlay Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-4 left-4 max-w-xs p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-champagne-500/40 shadow-xl"
                >
                  <div className="text-xs font-mono text-champagne-700 uppercase font-bold">Project Coordinates</div>
                  <h5 className="text-sm font-bold text-slate-900 font-cinzel mt-0.5">Saheel Luxton, Wakad</h5>
                  <p className="text-[11px] text-slate-600 mt-1 line-clamp-2">
                    S. No. 111, Near Phoenix Mall of the Millennium, Wakad, Pune - 411057
                  </p>
                  <a
                    href={projectData.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-champagne-700 hover:underline font-bold mt-2.5"
                  >
                    Open in Google Maps <ExternalLink className="w-3 h-3" />
                  </a>
                </motion.div>

                {/* Directions Bottom Bar */}
                <div className="absolute bottom-4 right-4 left-4 flex justify-between items-center bg-white/95 backdrop-blur-xl px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-xs text-slate-700 font-medium">
                    Coordinates: <strong className="text-slate-900 font-mono font-bold">18.6041° N, 73.7555° E</strong>
                  </span>
                  <a
                    href={projectData.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-auric px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
                  >
                    <Navigation className="w-3 h-3" /> Directions
                  </a>
                </div>
              </div>

            </motion.div>

            {/* Micro Connectivity Badges with Gliding Hover Physics */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <motion.div whileHover={{ y: -4, scale: 1.02 }} className="p-3.5 rounded-2xl ultra-glass border-champagne-500/20 bg-white shadow-sm cursor-default">
                <span className="text-champagne-700 font-black block text-lg font-cinzel">5 Mins</span>
                <span className="text-slate-600 text-[11px] font-semibold">Phoenix Mall Millennium</span>
              </motion.div>
              <motion.div whileHover={{ y: -4, scale: 1.02 }} className="p-3.5 rounded-2xl ultra-glass border-champagne-500/20 bg-white shadow-sm cursor-default">
                <span className="text-champagne-700 font-black block text-lg font-cinzel">8 Mins</span>
                <span className="text-slate-600 text-[11px] font-semibold">Hinjawadi IT Park Phase 1</span>
              </motion.div>
              <motion.div whileHover={{ y: -4, scale: 1.02 }} className="p-3.5 rounded-2xl ultra-glass border-champagne-500/20 bg-white shadow-sm cursor-default">
                <span className="text-champagne-700 font-black block text-lg font-cinzel">5 Mins</span>
                <span className="text-slate-600 text-[11px] font-semibold">Mumbai-Pune Expressway</span>
              </motion.div>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
