import React from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, CheckCircle2, Award, Shield, FileText, ArrowRight } from 'lucide-react';
import { projectData } from '../data/projectData';

interface OverviewProps {
  onOpenBooking: () => void;
  onOpenBrochure: () => void;
  onOpenVideo: () => void;
}

export const Overview: React.FC<OverviewProps> = ({ onOpenBooking, onOpenBrochure, onOpenVideo }) => {
  return (
    <section id="overview" className="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F4F0E8] to-[#FAF8F5]">
      
      {/* Gliding Fluid Background Orbs */}
      <motion.div 
        animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-48 w-[500px] h-[500px] bg-champagne-300/25 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        animate={{ x: [0, -30, 0], y: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-10 -right-48 w-[500px] h-[500px] bg-champagne-400/20 rounded-full blur-3xl pointer-events-none"
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
            The Signature Statement of Wakad
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-slate-900 tracking-tight leading-tight"
          >
            Crafted for Those Who <br />
            <span className="gold-gradient-text">Demand Exclusivity</span>
          </motion.h2>
          
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "112px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-transparent via-champagne-500 to-transparent mx-auto"
          />
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Video Card with Gliding Float Effect */}
          <motion.div 
            initial={{ opacity: 0, x: -40, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6"
          >
            <motion.div 
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-3xl overflow-hidden ultra-glass p-3 shadow-milky-card border-champagne-500/40 group bg-white"
            >
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={projectData.heroMedia.dayElevation}
                  alt="Saheel Luxton Day Elevation"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent flex flex-col justify-between p-6">
                  <div className="flex justify-between items-start">
                    <span className="px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-champagne-400/40 text-xs text-slate-900 font-bold tracking-wider uppercase shadow-sm">
                      Official Cinematic Tour
                    </span>
                    <span className="px-2.5 py-1 rounded-md btn-auric text-white text-[11px] font-black uppercase shadow-sm">
                      4K UHD
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-cinzel text-xl font-bold">Experience Luxton</h4>
                      <p className="text-slate-200 text-xs mt-0.5 font-medium">A walkthrough of Wakad's finest luxury benchmark</p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onOpenVideo}
                      className="w-14 h-14 rounded-full btn-auric text-white flex items-center justify-center shadow-gold-glow cursor-pointer"
                      aria-label="Play Project Video Tour"
                    >
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Card Meta Points */}
              <div className="grid grid-cols-3 gap-3 p-4 bg-milky-100 rounded-2xl mt-2 border border-champagne-500/20 text-center">
                <motion.div whileHover={{ y: -2 }}>
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider font-bold">Land Parcel</div>
                  <div className="text-sm sm:text-base font-bold text-slate-900 font-cinzel mt-0.5">{projectData.landParcel}</div>
                </motion.div>
                <motion.div whileHover={{ y: -2 }} className="border-x border-slate-300">
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider font-bold">Elevation</div>
                  <div className="text-sm sm:text-base font-bold text-champagne-700 font-cinzel mt-0.5">30 Storeys</div>
                </motion.div>
                <motion.div whileHover={{ y: -2 }}>
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider font-bold">Towers</div>
                  <div className="text-sm sm:text-base font-bold text-slate-900 font-cinzel mt-0.5">3 Iconic Wings</div>
                </motion.div>
              </div>
            </motion.div>

            {/* Quick Certifications Bar */}
            <motion.div 
              whileHover={{ y: -3 }}
              className="flex items-center justify-between px-5 py-3.5 rounded-2xl ultra-glass text-xs text-slate-700 border-champagne-500/30 shadow-sm"
            >
              <div className="flex items-center gap-2.5">
                <Shield className="w-4 h-4 text-champagne-600" />
                <span>MahaRERA: <strong className="text-slate-900 font-mono">{projectData.reraNo}</strong></span>
              </div>
              <a
                href="https://maharera.mahaonline.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-champagne-700 hover:underline flex items-center gap-1 font-bold"
              >
                Verify on Portal <ArrowRight className="w-3 h-3" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Architectural Narrative with Staggered Gliding Items */}
          <motion.div 
            initial={{ opacity: 0, x: 40, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-champagne-700 font-mono">
                Architectural Vision
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-slate-900 leading-snug">
                Where Unrivalled Sophistication Meets Strategic Wakad Connectivity
              </h3>
            </div>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
              {projectData.overviewText}
            </p>

            <div className="space-y-3.5 pt-2">
              {[
                {
                  title: "Pune's First 4,000 Sq. Ft. Grand Lobby",
                  desc: "Double-height Italian marble arrival lounge designed to evoke the ambiance of a world-class 5-star international hotel."
                },
                {
                  title: "5-Star Rooftop Aqua Theatre & Sky Deck",
                  desc: "Experience movie screenings under the stars, infinity pool lounging, and cocktail terraces overlooking Hinjawadi skyline."
                },
                {
                  title: "Designer Walk-In Closets in Every Residence",
                  desc: "Smartly planned master bedroom suites with expansive private dressing corridors for high-fashion lifestyles."
                }
              ].map((feat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="flex items-start gap-3.5 p-4 rounded-2xl ultra-glass-card border-champagne-500/25 shadow-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-champagne-600 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-slate-900 font-bold text-sm">{feat.title}</h5>
                    <p className="text-xs text-slate-600 mt-1 font-normal leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenBooking}
                className="btn-auric px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase flex items-center gap-2 cursor-pointer shadow-gold-glow"
              >
                <Sparkles className="w-4 h-4" />
                Schedule VIP Visit
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenBrochure}
                className="btn-auric-outline px-6 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-champagne-600" />
                View Detailed Specs
              </motion.button>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
