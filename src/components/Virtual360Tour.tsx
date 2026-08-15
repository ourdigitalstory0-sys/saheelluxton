import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Compass, Sun, Moon, Maximize2, Sparkles, Layers, ArrowRight } from 'lucide-react';
import { projectData } from '../data/projectData';

interface Virtual360TourProps {
  onOpenBooking: () => void;
}

export const Virtual360Tour: React.FC<Virtual360TourProps> = ({ onOpenBooking }) => {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [lightingMode, setLightingMode] = useState<'day' | 'night'>('day');

  const scenes = [
    {
      id: 'grand-lobby',
      title: "4,000 Sq. Ft. Grand Lobby",
      category: "Arrival Experience",
      dayImage: projectData.heroMedia.entranceView,
      nightImage: projectData.heroMedia.entranceView,
      description: "Pune's first double-height arrival lounge with Italian marble, 24/7 concierge, and bespoke guest salons.",
      hotspots: [
        { label: "Concierge Desk", x: "32%", y: "58%" },
        { label: "Italian Marble Flooring", x: "50%", y: "82%" },
        { label: "Double-Height Chandelier", x: "65%", y: "25%" }
      ]
    },
    {
      id: 'rooftop-club',
      title: "5-Star Rooftop Aqua Theatre",
      category: "30th Floor Sky Club",
      dayImage: projectData.heroMedia.desktopBanner,
      nightImage: projectData.heroMedia.nightView,
      description: "Open-air cinematic screenings under starry skies, infinity horizon pool, and skyline cocktail decks.",
      hotspots: [
        { label: "Open-Air Aqua Theatre", x: "42%", y: "45%" },
        { label: "Horizon Infinity Pool", x: "70%", y: "65%" },
        { label: "Skyline Sundeck", x: "25%", y: "72%" }
      ]
    },
    {
      id: 'day-elevation',
      title: "30-Storey Architectural Tower",
      category: "Iconic Elevation",
      dayImage: projectData.heroMedia.dayElevation,
      nightImage: projectData.heroMedia.nightView,
      description: "Majestic 30-storey towers designed with Art-Deco lines, glass sundecks, and seismic RCC engineering.",
      hotspots: [
        { label: "Private Glass Balconies", x: "48%", y: "38%" },
        { label: "Rooftop Crown", x: "52%", y: "12%" },
        { label: "Podium Leisure Sanctuary", x: "50%", y: "88%" }
      ]
    },
    {
      id: 'birds-eye',
      title: "3.38-Acre Gated Masterplan",
      category: "Aerial Layout",
      dayImage: projectData.heroMedia.birdsEyeView,
      nightImage: projectData.heroMedia.birdsEyeView,
      description: "Comprehensive bird's-eye panorama showing 3 distinct wings, vehicular drop-off, and sports courts.",
      hotspots: [
        { label: "Tower Wing A & B", x: "45%", y: "42%" },
        { label: "Central Green Commons", x: "55%", y: "60%" },
        { label: "Grand Entry Gateway", x: "30%", y: "75%" }
      ]
    }
  ];

  const currentScene = scenes[activeSceneIndex];
  const activeImage = lightingMode === 'night' ? currentScene.nightImage : currentScene.dayImage;

  return (
    <section id="virtual-360" className="py-24 lg:py-32 relative bg-slate-950 text-white overflow-hidden">
      
      {/* Gliding Ambient Lighting */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -right-48 w-[650px] h-[650px] bg-champagne-500/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 -left-48 w-[650px] h-[650px] bg-champagne-600/15 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-champagne-500/40 text-champagne-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md shadow-sm"
          >
            <Eye className="w-4 h-4 text-champagne-400" />
            Virtual Immersion & 360° Visualizer
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-white tracking-tight leading-tight"
          >
            Experience Saheel Luxton <br />
            <span className="gold-gradient-text">In Ultra-High Definition</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-300 text-sm sm:text-base font-normal"
          >
            Step into the 30-storey skyline landmark. Explore interactive architectural hotspots, toggle day/night lighting ambiances, and preview luxury finishes.
          </motion.p>
        </div>

        {/* 360 Visualizer Container */}
        <div className="relative rounded-3xl overflow-hidden border-2 border-champagne-500/40 bg-slate-900 shadow-2xl">
          
          {/* Main Panorama Frame */}
          <div className="relative aspect-[16/10] sm:aspect-[21/10] overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.img
                key={`${currentScene.id}-${lightingMode}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1.0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                src={activeImage}
                alt={`Saheel Luxton Wakad 360 View - ${currentScene.title}`}
                className="w-full h-full object-cover object-center"
              />
            </AnimatePresence>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40 pointer-events-none" />

            {/* Interactive Hotspots */}
            {currentScene.hotspots.map((spot, idx) => (
              <motion.div
                key={idx}
                style={{ left: spot.x, top: spot.y }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 + idx * 0.15 }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group/spot cursor-pointer"
              >
                <div className="relative flex items-center justify-center">
                  <span className="w-8 h-8 rounded-full bg-champagne-500/50 animate-ping absolute"></span>
                  <div className="w-7 h-7 rounded-full btn-auric text-slate-950 flex items-center justify-center font-bold text-xs shadow-gold-glow">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover/spot:flex items-center px-3 py-1.5 rounded-xl bg-slate-950/90 border border-champagne-400 text-white text-[11px] font-bold whitespace-nowrap shadow-xl backdrop-blur-md">
                    {spot.label}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Top Scene Meta Ribbon */}
            <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-6 flex items-center justify-between z-20">
              <div className="px-4 py-2 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-champagne-500/40 flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-champagne-500 animate-pulse"></span>
                <div>
                  <span className="text-[10px] font-mono uppercase text-champagne-400 font-bold block">{currentScene.category}</span>
                  <h4 className="text-xs sm:text-sm font-bold font-cinzel text-white">{currentScene.title}</h4>
                </div>
              </div>

              {/* Day / Night Ambiance Switcher */}
              <div className="flex items-center p-1 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-champagne-500/40 gap-1">
                <button
                  onClick={() => setLightingMode('day')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    lightingMode === 'day' ? 'bg-champagne-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Daytime Sun View"
                >
                  <Sun className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Day</span>
                </button>
                <button
                  onClick={() => setLightingMode('night')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                    lightingMode === 'night' ? 'bg-champagne-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'
                  }`}
                  title="Illuminated Night View"
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Night</span>
                </button>
              </div>
            </div>

            {/* Bottom Caption & VIP CTA */}
            <div className="absolute bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 z-20">
              <p className="text-xs sm:text-sm text-slate-200 max-w-xl font-normal drop-shadow-md">
                {currentScene.description}
              </p>
              <button
                onClick={onOpenBooking}
                className="btn-auric px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-glow shrink-0 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" /> Book Physical Tour
              </button>
            </div>
          </div>

          {/* Scene Selector Ribbon */}
          <div className="p-4 sm:p-5 bg-slate-900/95 border-t border-champagne-500/30 grid grid-cols-2 md:grid-cols-4 gap-3">
            {scenes.map((scene, idx) => (
              <motion.button
                key={scene.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveSceneIndex(idx)}
                className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                  activeSceneIndex === idx
                    ? 'bg-gradient-to-r from-champagne-500/20 via-slate-800 to-champagne-500/10 border-champagne-400 shadow-md ring-1 ring-champagne-400'
                    : 'bg-slate-950/60 border-slate-800 hover:border-champagne-500/50 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="text-[10px] font-mono text-champagne-400 uppercase font-bold block">0{idx + 1} • {scene.category}</span>
                <strong className="text-xs font-bold font-cinzel text-white line-clamp-1 mt-0.5">{scene.title}</strong>
              </motion.button>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
