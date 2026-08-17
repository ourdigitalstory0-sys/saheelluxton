import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Crown, Sparkles, Layers, Eye, Check, ArrowRight } from 'lucide-react';
import { projectData } from '../data/projectData';

interface InteractiveTowerExplorerProps {
  onOpenBooking: () => void;
  onOpenBrochure: () => void;
}

export const InteractiveTowerExplorer: React.FC<InteractiveTowerExplorerProps> = ({ onOpenBooking, onOpenBrochure }) => {
  const [selectedTier, setSelectedTier] = useState<'sky' | 'presidential' | 'grand' | 'podium' | 'lobby'>('sky');

  const towerTiers = [
    {
      id: 'sky',
      floors: 'Level 29 - 30 (Rooftop)',
      title: '5-Star Sky Club & Aqua Theatre',
      tag: 'Skyline Pinnacle',
      description: 'Open-air cinema under the stars, infinity horizon pool, sunset cocktail lounge, yoga deck, and 360° Pune skyline observatory.',
      image: projectData.heroMedia.nightView,
      features: ['5-Star Rooftop Aqua Theatre', 'Skyline Horizon Pool', 'Observatory Sunset Deck', 'Acoustic Starlight Lounge'],
      badgeColor: 'bg-champagne-600 text-white'
    },
    {
      id: 'presidential',
      floors: 'Levels 24 - 28',
      title: '4 BHK Presidential Sky Suites',
      tag: '1,458 Sq. Ft. Carpet',
      description: 'Expansive full-floor luxury residences with wrap-around balconies, private foyer access, and panoramic double-height corner living rooms.',
      image: projectData.heroMedia.dayElevation,
      features: ['Dual Master Walk-in Closets', '180° Sunset Balconies', 'Servant Quarters & Utility', 'Italian Marble Living Suites'],
      badgeColor: 'bg-champagne-700 text-white'
    },
    {
      id: 'grand',
      floors: 'Levels 10 - 23',
      title: '3 BHK Grand Luxury Residences',
      tag: '1,027 - 1,162 Sq. Ft.',
      description: 'Optimally engineered zero-wastage layouts with dedicated work-from-home nooks, master dressing corridors, and east-west cross ventilation.',
      image: projectData.galleryRenders[2]?.image || projectData.heroMedia.dayElevation,
      features: ['Zero Wastage Floor Plan', 'Master Suite Walk-in Closet', 'Vaastu Compliant Sunlight', 'Smart Digital Lock Access'],
      badgeColor: 'bg-champagne-800 text-white'
    },
    {
      id: 'podium',
      floors: 'Levels 2 - 9',
      title: '2 BHK Luxury Haven',
      tag: '753 - 809 Sq. Ft.',
      description: 'Modern urban luxury designed for tech leaders and young families, overlooking lush landscaped podium gardens and infinity greenery.',
      image: projectData.galleryRenders[1]?.image || projectData.heroMedia.dayElevation,
      features: ['Private Master Bedroom Wardrobe Corridors', 'Panoramic Garden Views', 'Acoustic Soundproof Glass', 'Designer Modular Kitchen Ready'],
      badgeColor: 'bg-slate-900 text-white'
    },
    {
      id: 'lobby',
      floors: 'Ground & Level 1',
      title: "Pune's 1st 4,000 Sq. Ft. Grand Lobby",
      tag: 'Double-Height Arrival',
      description: 'Monumental 5-star hotel style arrival lobby with Italian marble flooring, 24/7 dedicated concierge desk, and air-conditioned guest lounges.',
      image: projectData.heroMedia.entranceView,
      features: ['4,000 Sq. Ft. Double-Height Arrival', 'Valet Drop-off Porch', 'Biometric Security Access', 'Chauffeur Lounge & EV Stations'],
      badgeColor: 'bg-champagne-600 text-white'
    }
  ];

  const activeData = towerTiers.find(t => t.id === selectedTier) || towerTiers[0];

  return (
    <section id="tower-explorer" className="py-24 lg:py-32 relative bg-gradient-to-b from-[#F4F0E8] via-[#FAF8F5] to-[#F4F0E8] overflow-hidden">
      
      {/* Gliding Fluid Ambient Glows */}
      <motion.div 
        animate={{ y: [0, -40, 0], x: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 -left-48 w-[600px] h-[600px] bg-champagne-300/25 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 -right-48 w-[600px] h-[600px] bg-champagne-400/20 rounded-full blur-3xl pointer-events-none"
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
            <Building2 className="w-4 h-4 text-champagne-600" />
            Interactive 30-Storey Tower Explorer
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-slate-900 tracking-tight leading-tight"
          >
            Explore Pune's Landmark <br />
            <span className="gold-gradient-text">Floor by Floor</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-600 text-sm sm:text-base font-normal"
          >
            Click across any elevation tier to discover residences, luxury typologies, grand lobbies, and the 5-star rooftop sky club.
          </motion.p>

          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "112px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-transparent via-champagne-500 to-transparent mx-auto mt-4"
          />
        </div>

        {/* Interactive 2-Column Explorer Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Interactive Storey Selector Ribbon */}
          <motion.div 
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-3"
          >
            <div className="text-xs font-bold text-champagne-800 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Layers className="w-4 h-4 text-champagne-600" />
              Select Tower Vertical Zone:
            </div>

            {towerTiers.map((tier) => (
              <motion.button
                key={tier.id}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedTier(tier.id as any)}
                className={`w-full text-left p-4 rounded-2xl transition-all duration-300 flex items-center justify-between border cursor-pointer ${
                  selectedTier === tier.id
                    ? 'btn-auric text-white border-transparent shadow-gold-glow scale-102 font-bold'
                    : 'ultra-glass bg-white border-champagne-500/20 text-slate-700 hover:border-champagne-500 shadow-sm'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="text-[10px] uppercase tracking-wider font-mono opacity-80">
                    {tier.floors}
                  </div>
                  <div className="text-sm font-bold font-cinzel">
                    {tier.title}
                  </div>
                </div>

                <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider ${
                  selectedTier === tier.id ? 'bg-white/25 text-white' : 'bg-champagne-100 text-champagne-800'
                }`}>
                  {tier.tag}
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* Right Column: Dynamic Tier Showcase Card */}
          <motion.div 
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="ultra-glass rounded-3xl p-6 sm:p-8 border-2 border-champagne-500/40 bg-white shadow-milky-hover">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeData.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  {/* Tier Image Frame */}
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-950 shadow-inner group">
                    <img
                      src={activeData.image}
                      alt={`${activeData.title} (${activeData.floors}) - Saheel Luxton 30-Storey Tower Wakad Pune`}
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                    
                    {/* Badge Overlay */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-champagne-500 text-slate-900 text-xs font-mono font-bold shadow-md">
                        {activeData.floors}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h4 className="text-lg sm:text-xl font-bold font-cinzel text-white">
                        {activeData.title}
                      </h4>
                      <p className="text-xs text-slate-200 mt-0.5 line-clamp-1">
                        {activeData.tag}
                      </p>
                    </div>
                  </div>

                  {/* Tier Description */}
                  <p className="text-sm text-slate-700 font-normal leading-relaxed">
                    {activeData.description}
                  </p>

                  {/* Feature Inclusions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {activeData.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-milky-100 border border-slate-200 text-xs text-slate-800 font-medium">
                        <Check className="w-4 h-4 text-champagne-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <motion.button
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={onOpenBooking}
                      className="btn-auric flex-1 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-gold-glow cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      Check Availability in {activeData.floors}
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={onOpenBrochure}
                      className="btn-auric-outline px-6 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase cursor-pointer"
                    >
                      Download Floor Plate
                    </motion.button>
                  </div>

                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
