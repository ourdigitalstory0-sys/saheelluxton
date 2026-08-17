import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';
import { projectData } from '../data/projectData';
import { GalleryRender } from '../types/project';

interface GalleryModalProps {
  onOpenBooking: () => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Exterior', 'Interiors', 'Rooftop', 'Podium'];

  const filteredRenders: GalleryRender[] = selectedCategory === 'All'
    ? projectData.galleryRenders
    : projectData.galleryRenders.filter(img => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextImage = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredRenders.length);
    }
  };

  const prevImage = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + filteredRenders.length) % filteredRenders.length);
    }
  };

  return (
    <section id="gallery" className="py-24 lg:py-32 relative bg-gradient-to-b from-[#FAF8F5] via-[#F4F0E8] to-[#FAF8F5] overflow-hidden">
      
      {/* Gliding Fluid Background Orbs */}
      <motion.div 
        animate={{ y: [0, -35, 0], x: [0, -25, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-0 w-[550px] h-[550px] bg-champagne-300/25 rounded-full blur-3xl pointer-events-none"
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
            <Image className="w-4 h-4 text-champagne-600" />
            Cinematic Virtual Gallery
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-slate-900 tracking-tight leading-tight"
          >
            Experience the Craftsmanship, <br />
            <span className="gold-gradient-text">One Frame at a Time</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-600 text-sm sm:text-base font-normal"
          >
            Step inside a curated showcase of refined spaces, double-height grand lounges, sky decks, and master suite architecture.
          </motion.p>

          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "112px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-transparent via-champagne-500 to-transparent mx-auto mt-4"
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? 'btn-auric text-white shadow-gold-glow scale-105'
                  : 'ultra-glass text-slate-700 hover:text-slate-950 border-champagne-500/30 hover:border-champagne-500 bg-white'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Gallery Grid with Fluid Motion Layout */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredRenders.map((item, index) => (
              <motion.div
                layout
                key={item.title}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => openLightbox(index)}
                className="group relative rounded-3xl overflow-hidden ultra-glass border-champagne-500/25 hover:border-champagne-500 cursor-pointer shadow-milky-card hover:shadow-milky-hover transition-all duration-500 bg-white"
              >
                {/* Image */}
                <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                  <motion.img
                    whileHover={{ scale: 1.12 }}
                    transition={{ duration: 0.7 }}
                    src={item.image}
                    alt={`${item.title} (${item.category}) - Saheel Luxton Wakad Pune 30-Storey Landmark`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                  
                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-champagne-500/40 text-champagne-800 text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    {item.category}
                  </span>

                  {/* Center Hover Magnifier with Spring Motion */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-12 h-12 rounded-full btn-auric text-white flex items-center justify-center shadow-gold-glow"
                    >
                      <Maximize2 className="w-5 h-5" />
                    </motion.div>
                  </div>

                  {/* Bottom Title & Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 space-y-1">
                    <h4 className="text-base font-bold font-cinzel text-white group-hover:text-champagne-300 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-200 font-normal line-clamp-1">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Booking Trigger */}
        <div className="mt-16 text-center">
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenBooking}
            className="btn-auric px-9 py-4 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase inline-flex items-center gap-2 shadow-gold-glow cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            Book Site Walkthrough to View Sample Flat
          </motion.button>
        </div>

      </div>

      {/* Lightbox Modal with Fluid Fade */}
      <AnimatePresence>
        {activeLightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/20 hover:bg-champagne-500 text-white hover:text-white transition z-50 cursor-pointer shadow-md"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Navigation Controls */}
            <motion.button
              whileHover={{ scale: 1.1, x: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-white/20 hover:bg-champagne-500 text-white transition z-50 cursor-pointer shadow-md"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1, x: 3 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-white/20 hover:bg-champagne-500 text-white transition z-50 cursor-pointer shadow-md"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>

            {/* Main Modal Image Container */}
            <motion.div 
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.93, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl max-h-[85vh] flex flex-col items-center justify-center space-y-4"
            >
              <div className="relative rounded-2xl overflow-hidden border border-champagne-500/40 shadow-2xl bg-black">
                <img
                  src={filteredRenders[activeLightboxIndex].image}
                  alt={`${filteredRenders[activeLightboxIndex].title} - ${filteredRenders[activeLightboxIndex].caption} | Saheel Luxton Wakad Pune`}
                  className="max-h-[70vh] max-w-full object-contain"
                />
              </div>

              <div className="text-center space-y-1">
                <span className="text-xs font-mono text-champagne-400 uppercase tracking-widest font-bold">
                  Image {activeLightboxIndex + 1} of {filteredRenders.length} • {filteredRenders[activeLightboxIndex].category}
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-cinzel text-white">
                  {filteredRenders[activeLightboxIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-normal">
                  {filteredRenders[activeLightboxIndex].caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
