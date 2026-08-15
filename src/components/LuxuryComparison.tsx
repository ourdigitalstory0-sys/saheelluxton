import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Check, X, ShieldAlert, Award, ArrowRight } from 'lucide-react';

interface LuxuryComparisonProps {
  onOpenBooking: () => void;
}

export const LuxuryComparison: React.FC<LuxuryComparisonProps> = ({ onOpenBooking }) => {
  const comparisonItems = [
    {
      feature: 'Arrival Experience & Lobby',
      standard: 'Standard 400 - 800 sq.ft basic ground lobby',
      luxton: "Pune's 1st 4,000 Sq. Ft. Double-Height Italian Marble Grand Lobby",
      winner: 'luxton'
    },
    {
      feature: 'Rooftop Lifestyle',
      standard: 'Basic terrace solar panels or empty water tank area',
      luxton: '5-Star Rooftop Sky Club with Open-Air Aqua Theatre & Infinity Horizon Pool',
      winner: 'luxton'
    },
    {
      feature: 'Master Bedroom Wardrobes',
      standard: 'Cramped bedroom space with wall-fitted single wardrobes',
      luxton: 'Dedicated Private Designer Walk-In Closet corridors in every residence',
      winner: 'luxton'
    },
    {
      feature: 'Architectural Elevation',
      standard: 'Conventional 15 - 20 storeys boxy residential towers',
      luxton: 'Majestic 30-Storey New York Art-Deco inspired landmark elevation',
      winner: 'luxton'
    },
    {
      feature: 'Curated Amenities Level',
      standard: '10 - 15 basic ground-level clubhouse amenities',
      luxton: '30+ Resort-Grade Amenities across dual Sky & Ground Podium decks',
      winner: 'luxton'
    },
    {
      feature: 'Location & Appreciation',
      standard: 'Interior fringe roads with narrow connectivity',
      luxton: 'Prime Wakad growth hub, 5 mins from Phoenix Mall of the Millennium',
      winner: 'luxton'
    }
  ];

  return (
    <section id="comparison" className="py-24 lg:py-32 relative bg-white overflow-hidden">
      
      {/* Gliding Fluid Ambient Glows */}
      <motion.div 
        animate={{ scale: [1, 1.15, 1], y: [0, 30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -right-48 w-[600px] h-[600px] bg-champagne-300/20 rounded-full blur-3xl pointer-events-none"
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
            <Award className="w-4 h-4 text-champagne-600" />
            The Benchmark of Distinction
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-slate-900 tracking-tight leading-tight"
          >
            Why Saheel Luxton Wakad <br />
            <span className="gold-gradient-text">Outclasses Ordinary Pune Developments</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-600 text-sm sm:text-base font-normal"
          >
            See how Saheel Luxton elevates every lifestyle parameter far beyond conventional residential offerings in Wakad.
          </motion.p>

          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "112px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-transparent via-champagne-500 to-transparent mx-auto mt-4"
          />
        </div>

        {/* Comparison Matrix Table with Glass Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="ultra-glass rounded-3xl overflow-hidden border-2 border-champagne-500/40 shadow-milky-hover bg-white"
        >
          {/* Header Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 bg-gradient-to-r from-champagne-100 via-white to-champagne-50 p-5 sm:p-6 border-b border-champagne-500/30 text-xs font-bold uppercase tracking-wider">
            <div className="md:col-span-4 text-slate-700">Lifestyle Feature</div>
            <div className="md:col-span-4 text-slate-500 hidden md:block">Standard Pune Projects</div>
            <div className="md:col-span-4 text-champagne-800 font-extrabold flex items-center gap-1.5 hidden md:flex">
              <Sparkles className="w-4 h-4 text-champagne-600" />
              Luxton by Saheel Privilege
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-100">
            {comparisonItems.map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ backgroundColor: "rgba(254, 249, 238, 0.4)" }}
                className="grid grid-cols-1 md:grid-cols-12 p-5 sm:p-6 items-center gap-4 transition-colors"
              >
                {/* Feature Name */}
                <div className="md:col-span-4 space-y-1">
                  <h4 className="text-sm font-bold font-cinzel text-slate-900">
                    {item.feature}
                  </h4>
                  <div className="md:hidden text-xs text-slate-500 flex items-center gap-1.5 pt-1">
                    <X className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>Standard: {item.standard}</span>
                  </div>
                </div>

                {/* Standard Project */}
                <div className="md:col-span-4 hidden md:flex items-center gap-2 text-xs text-slate-500 font-normal">
                  <X className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{item.standard}</span>
                </div>

                {/* Luxton Privilege */}
                <div className="md:col-span-4 flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-900 bg-champagne-50/70 p-3 rounded-2xl border border-champagne-400/40">
                  <div className="w-6 h-6 rounded-full bg-champagne-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>{item.luxton}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Table Bottom Footer */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-champagne-50 via-white to-champagne-100 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-champagne-500/30">
            <div className="text-xs text-slate-700 text-center sm:text-left font-medium">
              Invest in long-term capital appreciation and unmatched 5-star lifestyle status.
            </div>

            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenBooking}
              className="btn-auric px-8 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-2 shadow-gold-glow cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              Claim Your Exclusive Luxton Unit
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
