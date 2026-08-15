import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Crown, Compass, Check, ArrowRight } from 'lucide-react';
import { projectData } from '../data/projectData';

interface AmenitiesProps {
  onOpenBooking: () => void;
}

export const Amenities: React.FC<AmenitiesProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'rooftop' | 'ground'>('rooftop');

  const currentAmenities = projectData.amenitiesByLevel[activeTab];

  return (
    <section id="amenities" className="py-24 lg:py-32 relative bg-gradient-to-b from-[#FAF8F5] via-[#F4F0E8] to-[#FAF8F5] overflow-hidden">
      
      {/* Gliding Fluid Background Glows */}
      <motion.div 
        animate={{ scale: [1, 1.15, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[750px] bg-champagne-300/25 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full ultra-glass border-champagne-500/40 text-champagne-800 text-xs font-bold uppercase tracking-widest shadow-sm"
          >
            <Crown className="w-4 h-4 text-champagne-600" />
            30+ Curated World-Class Amenities
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-slate-900 tracking-tight leading-tight"
          >
            Designed to Elevate <br />
            <span className="gold-gradient-text">Every Leisure & Living Moment</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-600 text-sm sm:text-base font-normal"
          >
            Indulge in resort-grade hospitality across dual amenity decks: the high-altitude Rooftop Sky Club and the lush Ground & Podium Sanctuary.
          </motion.p>

          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "112px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-transparent via-champagne-500 to-transparent mx-auto mt-4"
          />
        </div>

        {/* Tab Switcher with Gliding Fluid Pill */}
        <div className="flex justify-center mb-14">
          <div className="inline-flex p-1.5 rounded-full ultra-glass border-champagne-500/30 shadow-md relative bg-white">
            <button
              onClick={() => setActiveTab('rooftop')}
              className={`relative px-6 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2.5 z-10 cursor-pointer ${
                activeTab === 'rooftop' ? 'text-white' : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              {activeTab === 'rooftop' && (
                <motion.div
                  layoutId="activeAmenityTab"
                  className="absolute inset-0 btn-auric rounded-full -z-10 shadow-gold-glow"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                />
              )}
              <Crown className="w-4 h-4" />
              5-Star Rooftop Sky Club
            </button>

            <button
              onClick={() => setActiveTab('ground')}
              className={`relative px-6 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2.5 z-10 cursor-pointer ${
                activeTab === 'ground' ? 'text-white' : 'text-slate-700 hover:text-slate-950'
              }`}
            >
              {activeTab === 'ground' && (
                <motion.div
                  layoutId="activeAmenityTab"
                  className="absolute inset-0 btn-auric rounded-full -z-10 shadow-gold-glow"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                />
              )}
              <Compass className="w-4 h-4" />
              Ground & Podium World
            </button>
          </div>
        </div>

        {/* Amenities Card Grid with Fluid Spring Motion */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {currentAmenities.map((amenity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="ultra-glass rounded-3xl overflow-hidden group flex flex-col justify-between border-champagne-500/25 hover:border-champagne-500 shadow-milky-card hover:shadow-milky-hover transition-all duration-500 bg-white"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <motion.img
                      whileHover={{ scale: 1.12 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      src={amenity.image}
                      alt={amenity.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
                    
                    {/* Tag */}
                    <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-champagne-500/40 text-champagne-800 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                      {amenity.tag}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 sm:p-6 space-y-2">
                    <h4 className="text-base font-bold font-cinzel text-slate-900 group-hover:text-champagne-700 transition-colors line-clamp-1">
                      {amenity.title}
                    </h4>
                    <p className="text-xs text-slate-600 font-normal leading-relaxed line-clamp-3">
                      {amenity.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom Quick Feature Pill */}
                <div className="p-5 sm:p-6 pt-0">
                  <div className="flex items-center gap-2 text-[11px] text-champagne-700 font-bold border-t border-slate-100 pt-3">
                    <Check className="w-3.5 h-3.5 text-champagne-600" />
                    <span>Exclusive to Residents</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Explore All Amenities Call to Action */}
        <div className="mt-16 text-center">
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenBooking}
            className="btn-auric px-9 py-4 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase inline-flex items-center gap-2.5 shadow-gold-glow cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            Book VIP Visit to Experience Amenities
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>

      </div>
    </section>
  );
};
