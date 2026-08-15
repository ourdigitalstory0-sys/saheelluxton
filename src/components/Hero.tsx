import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Download, Play, ShieldCheck, ArrowRight, Building2, TrendingUp, Compass, Navigation, Maximize2 } from 'lucide-react';
import { projectData } from '../data/projectData';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenBrochure: () => void;
  onOpenVideo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenBrochure, onOpenVideo }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const heroSlides = [
    {
      image: projectData.heroMedia.dayElevation,
      title: "Master Architectural Elevation",
      caption: "Iconic 30-Storey Sky Landmark on 3.38 Acres",
      tag: "Master Facade"
    },
    {
      image: projectData.heroMedia.desktopBanner,
      title: "Official Master Horizon",
      caption: "Wakad's Premier 5-Star Luxury Destination",
      tag: "Master Banner"
    },
    {
      image: projectData.heroMedia.entranceView,
      title: "Grand Arrival Lobby",
      caption: "Pune's First 4,000 Sq. Ft. Double-Height Grand Lobby",
      tag: "Grand Lobby"
    },
    {
      image: projectData.heroMedia.nightView,
      title: "Bespoke Night Skyline",
      caption: "Illuminated 5-Star Rooftop Aqua Theatre & Sky Deck",
      tag: "Night Elevation"
    },
    {
      image: projectData.heroMedia.birdsEyeView,
      title: "Aerial Master Layout",
      caption: "3.38 Acres Gated Sanctuary with 30+ World-Class Amenities",
      tag: "Aerial Masterplan"
    }
  ];

  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-5 h-5 text-champagne-600" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-champagne-600" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-champagne-600" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-champagne-600" />;
      case 'Navigation': return <Navigation className="w-5 h-5 text-champagne-600" />;
      default: return <Compass className="w-5 h-5 text-champagne-600" />;
    }
  };

  const currentSlide = heroSlides[activeSlide];

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 lg:pt-32 lg:pb-16 overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#FAF8F5] to-[#F4F0E8]">
      
      {/* Gliding Fluid Ambient Orbs with Infinite Motion */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            y: [0, -35, 0],
            x: [0, 25, 0],
            scale: [1, 1.08, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-[650px] h-[650px] bg-champagne-300/35 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            y: [0, 40, 0],
            x: [0, -30, 0],
            scale: [1, 1.12, 1]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/3 -right-32 w-[650px] h-[650px] bg-champagne-400/25 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            y: [0, -25, 0],
            x: [0, -20, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-32 left-1/3 w-[600px] h-[600px] bg-milky-400/30 rounded-full blur-3xl"
        />
      </div>

      {/* Main Hero Container with 2-Column Showcase */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full my-auto z-10 py-4 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Project Copy, Pricing & CTAs */}
          <motion.div 
            initial={{ opacity: 0, x: -40, filter: 'blur(8px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            
            {/* RERA and Launch Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ultra-glass border-champagne-500/40 text-xs font-semibold text-slate-800 shadow-sm"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-champagne-500 animate-ping"></span>
              <span className="font-extrabold text-slate-900 tracking-wider uppercase text-[11px]">Wakad's Ultimate Luxury Landmark</span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1 font-mono text-slate-700 font-bold text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-champagne-600" /> {projectData.reraNo}
              </span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-1.5">
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-xs sm:text-sm uppercase tracking-[0.3em] text-champagne-700 font-extrabold font-mono"
              >
                Ultra-Luxury 2, 3 & 4 BHK Skyline Residences
              </motion.p>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 font-cinzel leading-[1.08] tracking-tight"
              >
                SAHEEL LUXTON <br />
                <span className="gold-gradient-text font-light">WAKAD, PUNE</span>
              </motion.h1>
            </div>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-sm sm:text-base text-slate-700 font-normal leading-relaxed"
            >
              Step into Pune's most anticipated real estate masterpiece. Featuring <strong className="text-slate-950 font-bold">Pune's 1st 4,000 Sq. Ft. Double-Height Grand Lobby</strong>, 
              an open-air <strong className="text-champagne-700 font-bold">5-Star Rooftop Aqua Theatre</strong>, Designer Walk-In Closets, and 30 storeys of breathtaking architectural prestige on 3.38 acres in prime Wakad.
            </motion.p>

            {/* Typology and Price Glass Badges */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1"
            >
              <motion.div whileHover={{ y: -3, scale: 1.02 }} className="p-3 rounded-2xl ultra-glass-card border-champagne-500/30 shadow-sm cursor-default">
                <span className="text-slate-500 block text-[10px] uppercase tracking-wider font-bold">Configuration</span>
                <strong className="text-slate-900 text-xs sm:text-sm font-bold">2, 3 & 4 BHK</strong>
              </motion.div>

              <motion.div whileHover={{ y: -3, scale: 1.02 }} className="p-3 rounded-2xl ultra-glass-card border-champagne-500/40 shadow-sm cursor-default">
                <span className="text-champagne-700 block text-[10px] uppercase tracking-wider font-bold">Location</span>
                <strong className="text-slate-900 text-xs sm:text-sm font-bold">Wakad, Pune</strong>
              </motion.div>

              <motion.div whileHover={{ y: -3, scale: 1.02 }} className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-gradient-to-r from-champagne-100 via-white to-champagne-50 border border-champagne-400/60 shadow-sm cursor-default">
                <span className="text-champagne-700 block text-[10px] uppercase tracking-wider font-bold">Starting Price</span>
                <strong className="gold-gradient-text text-sm sm:text-base font-black">₹ 97 Lakhs*</strong>
              </motion.div>
            </motion.div>

            {/* Action CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="flex flex-wrap items-center gap-3.5 pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenBooking}
                className="btn-auric px-7 py-3.5 rounded-full text-xs sm:text-sm font-extrabold tracking-wider uppercase flex items-center gap-2.5 shadow-gold-glow-lg group cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                Book VIP Visit
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenBrochure}
                className="btn-auric-outline px-6 py-3.5 rounded-full text-xs sm:text-sm font-extrabold tracking-wider uppercase flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-champagne-600" />
                Brochure
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenVideo}
                className="px-5 py-3.5 rounded-full ultra-glass hover:bg-white text-slate-800 text-xs sm:text-sm font-bold tracking-wider flex items-center gap-2 transition shadow-sm group cursor-pointer"
              >
                <span className="w-6 h-6 rounded-full bg-gradient-to-br from-champagne-400 to-champagne-700 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </span>
                Video Tour
              </motion.button>
            </motion.div>

          </motion.div>

          {/* Right Column: Master Architectural Image Showcase with Gliding Float Animation */}
          <motion.div 
            initial={{ opacity: 0, x: 40, filter: 'blur(8px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-6 space-y-4"
          >
            {/* Master Image Frame with Gentle Gliding Float Effect */}
            <motion.div 
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative rounded-3xl overflow-hidden ultra-glass p-3 sm:p-4 shadow-milky-hover border-2 border-champagne-500/40 bg-white group"
            >
              
              {/* Image Container with Smooth Animation */}
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-slate-950 shadow-inner">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentSlide.image}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1.0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    src={currentSlide.image}
                    alt={currentSlide.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                </AnimatePresence>

                {/* Top Badge Overlay */}
                <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
                  <span className="px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-champagne-500/60 text-slate-900 text-[11px] font-black uppercase tracking-wider shadow-md">
                    {currentSlide.tag}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-champagne-600/90 text-white text-[10px] font-black uppercase tracking-wider shadow-sm">
                    Master Render
                  </span>
                </div>

                {/* Bottom Gradient with Image Caption & 4K Tour Trigger */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-4 sm:p-5 flex items-end justify-between z-10">
                  <div className="space-y-0.5 max-w-xs sm:max-w-sm">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-champagne-400 font-bold">
                      Luxton by Saheel • Wakad
                    </span>
                    <h3 className="text-white font-cinzel text-base sm:text-lg font-bold line-clamp-1">
                      {currentSlide.title}
                    </h3>
                    <p className="text-slate-200 text-xs line-clamp-1 font-normal">
                      {currentSlide.caption}
                    </p>
                  </div>

                  <button
                    onClick={onOpenVideo}
                    className="w-11 h-11 rounded-full btn-auric text-white flex items-center justify-center shadow-gold-glow group-hover:scale-110 transition-transform shrink-0 ml-3 cursor-pointer"
                    title="Watch 4K Video Tour"
                  >
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </button>
                </div>
              </div>

              {/* Master Image Slide Selector Ribbon */}
              <div className="grid grid-cols-5 gap-2 mt-3">
                {heroSlides.map((slide, idx) => (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`relative rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all duration-300 cursor-pointer ${
                      activeSlide === idx 
                        ? 'border-champagne-600 shadow-md scale-105 ring-2 ring-champagne-400/40' 
                        : 'border-slate-200 opacity-65 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={slide.image} 
                      alt={slide.tag} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute bottom-0 inset-x-0 bg-slate-950/80 text-[8px] sm:text-[9px] text-white text-center py-0.5 font-bold truncate px-0.5">
                      {slide.tag}
                    </div>
                  </motion.button>
                ))}
              </div>

            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Key Project Statistics Ribbon with Staggered Gliding Reveal */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 w-full z-10 mt-4"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {projectData.keyStats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="ultra-glass-card rounded-2xl p-4 text-center group border-champagne-500/25 shadow-milky-card hover:shadow-milky-hover bg-white transition-all"
            >
              <div className="flex justify-center mb-1.5">
                {getStatIcon(stat.icon)}
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-cinzel tracking-tight group-hover:text-champagne-600 transition-colors">
                {stat.value} <span className="text-xs sm:text-sm font-sans font-bold text-champagne-600">{stat.unit}</span>
              </div>
              <div className="text-[11px] sm:text-xs text-slate-600 mt-1 font-semibold leading-tight">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
