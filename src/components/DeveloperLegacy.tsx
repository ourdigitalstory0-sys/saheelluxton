import React from 'react';
import { motion } from 'framer-motion';
import { Award, Building, Sparkles, MapPin, Phone, Mail } from 'lucide-react';
import { projectData } from '../data/projectData';

interface DeveloperLegacyProps {
  onOpenBooking: () => void;
}

export const DeveloperLegacy: React.FC<DeveloperLegacyProps> = ({ onOpenBooking }) => {
  const { developerInfo } = projectData;

  return (
    <section id="developer" className="py-24 lg:py-32 relative bg-gradient-to-b from-[#FAF8F5] via-[#F4F0E8] to-[#FAF8F5] overflow-hidden">
      
      {/* Gliding Fluid Background Orbs */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: [0, 45, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-champagne-300/20 rounded-full blur-3xl pointer-events-none"
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
            A Legacy of Trust & Architectural Excellence
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-slate-900 tracking-tight leading-tight"
          >
            The Visionaries Behind <br />
            <span className="gold-gradient-text">Pune’s Most Iconic Landmarks</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-600 text-sm sm:text-base font-normal"
          >
            Saheel Properties has transformed Pune's skyline across Wakad, Hinjawadi, Tathawade, and Balewadi with world-class residential and commercial developments.
          </motion.p>

          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "112px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-transparent via-champagne-500 to-transparent mx-auto mt-4"
          />
        </div>

        {/* 2-Column Developer Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
          
          {/* Left Column: Brand Pillars & Stats */}
          <motion.div 
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-champagne-700 font-bold">About the Developer</span>
              <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-slate-900">
                {developerInfo.name}
              </h3>
              <p className="text-champagne-800 text-sm italic font-garamond text-base font-bold">
                "{developerInfo.tagline}"
              </p>
            </div>

            <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
              {developerInfo.overview}
            </p>

            {/* 3 Metrics */}
            <div className="grid grid-cols-3 gap-3.5 pt-2">
              <motion.div whileHover={{ y: -4, scale: 1.03 }} className="p-4 rounded-2xl ultra-glass text-center border-champagne-500/20 bg-white shadow-sm cursor-default">
                <div className="text-2xl sm:text-3xl font-black font-cinzel gold-gradient-text">25+</div>
                <div className="text-[11px] text-slate-600 mt-1 font-bold">Years Legacy</div>
              </motion.div>

              <motion.div whileHover={{ y: -4, scale: 1.03 }} className="p-4 rounded-2xl ultra-glass text-center border-champagne-500/20 bg-white shadow-sm cursor-default">
                <div className="text-2xl sm:text-3xl font-black font-cinzel text-slate-900">10M+</div>
                <div className="text-[11px] text-slate-600 mt-1 font-bold">Sq. Ft. Delivered</div>
              </motion.div>

              <motion.div whileHover={{ y: -4, scale: 1.03 }} className="p-4 rounded-2xl ultra-glass text-center border-champagne-500/20 bg-white shadow-sm cursor-default">
                <div className="text-2xl sm:text-3xl font-black font-cinzel text-champagne-700">8,500+</div>
                <div className="text-[11px] text-slate-600 mt-1 font-bold">Happy Families</div>
              </motion.div>
            </div>

            {/* Address & Contact Info */}
            <motion.div whileHover={{ y: -2 }} className="p-5 rounded-2xl ultra-glass border-champagne-500/20 space-y-2.5 text-xs text-slate-700 bg-white shadow-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-champagne-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900">Corporate Headquarters:</strong> {projectData.corporateAddress}
                </span>
              </div>
              <div className="flex items-center gap-6 pt-1">
                <a href={`tel:${projectData.contactPhone}`} className="hover:text-champagne-700 transition-colors flex items-center gap-1.5 font-mono font-bold">
                  <Phone className="w-3.5 h-3.5 text-champagne-600" /> {projectData.contactPhone}
                </a>
                <a href={`mailto:${projectData.contactEmail}`} className="hover:text-champagne-700 transition-colors flex items-center gap-1.5 font-medium">
                  <Mail className="w-3.5 h-3.5 text-champagne-600" /> {projectData.contactEmail}
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Delivered & Ongoing Portfolio */}
          <motion.div 
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-4"
          >
            <h4 className="text-base font-bold font-cinzel text-slate-900 flex items-center gap-2">
              <Building className="w-4 h-4 text-champagne-600" />
              Signature Landmark Portfolio in Pune
            </h4>

            <div className="space-y-3">
              {developerInfo.otherProjects.map((proj, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="p-4 rounded-2xl ultra-glass border-champagne-500/20 hover:border-champagne-500 transition-all flex items-center justify-between group bg-white shadow-sm"
                >
                  <div className="space-y-1">
                    <h5 className="text-sm font-bold font-cinzel text-slate-900 group-hover:text-champagne-700 transition-colors">
                      {proj.name}
                    </h5>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-champagne-600" />
                      <span>{proj.location}, Pune</span>
                    </div>
                  </div>

                  <span className="px-3.5 py-1 rounded-full bg-champagne-100 text-champagne-900 text-[11px] font-bold border border-champagne-300">
                    {proj.type}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Assurance Box */}
            <motion.div whileHover={{ y: -2 }} className="p-4 rounded-2xl bg-gradient-to-r from-champagne-100 to-white border border-champagne-400/50 text-xs text-slate-800 flex items-center gap-3 shadow-sm">
              <Sparkles className="w-5 h-5 text-champagne-600 shrink-0" />
              <span className="leading-relaxed font-medium">
                Every Saheel Properties residence comes with 100% clear land titles, strict MahaRERA compliance, and transparent customer progress tracking.
              </span>
            </motion.div>
          </motion.div>

        </div>

        {/* Institutional Press Citations & Media Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="p-6 sm:p-8 rounded-3xl ultra-glass border-2 border-champagne-500/30 bg-white/90 shadow-milky-card space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-champagne-500/20 pb-3">
            <span className="text-[10px] font-mono uppercase text-champagne-800 font-bold tracking-widest">
              Institutional Media & Real Estate Press Citations
            </span>
            <span className="text-[11px] font-mono text-slate-500">
              Verified Real Estate Editorial Coverage
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-milky-100/70 border border-champagne-400/30 space-y-1">
              <span className="font-bold text-slate-900 font-cinzel block text-sm">The Economic Times</span>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                "Saheel Luxton sets a new standard for luxury real estate in Pune's high-growth Wakad corridor."
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-milky-100/70 border border-champagne-400/30 space-y-1">
              <span className="font-bold text-slate-900 font-cinzel block text-sm">Business Standard</span>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                "Pune's 1st 4,000 sq.ft. double-height grand lobby and rooftop aqua club redefine residential hospitality."
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-milky-100/70 border border-champagne-400/30 space-y-1">
              <span className="font-bold text-slate-900 font-cinzel block text-sm">Mid-Day Real Estate Awards</span>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                "Recognized as one of the Most Iconic High-Rise Architectural Landmarks in West Pune for 2026."
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-milky-100/70 border border-champagne-400/30 space-y-1">
              <span className="font-bold text-slate-900 font-cinzel block text-sm">Construction World</span>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                "Engineered to IS 1893:2016 Zone-III seismic safety with precision RCC shear wall formwork."
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
