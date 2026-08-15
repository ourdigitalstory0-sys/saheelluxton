import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Grid, ChefHat, DoorClosed, Bath, Zap, Sparkles, CheckCircle2, FileCheck } from 'lucide-react';
import { projectData } from '../data/projectData';

interface SpecificationsProps {
  onOpenBrochure: () => void;
}

export const Specifications: React.FC<SpecificationsProps> = ({ onOpenBrochure }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Structure & Civil': return <Shield className="w-5 h-5 text-champagne-600" />;
      case 'Flooring & Tiling': return <Grid className="w-5 h-5 text-champagne-600" />;
      case 'Kitchen & Utility': return <ChefHat className="w-5 h-5 text-champagne-600" />;
      case 'Doors, Windows & Balconies': return <DoorClosed className="w-5 h-5 text-champagne-600" />;
      case 'Sanitary & CP Fittings': return <Bath className="w-5 h-5 text-champagne-600" />;
      case 'Electrical & Smart Tech': return <Zap className="w-5 h-5 text-champagne-600" />;
      default: return <Sparkles className="w-5 h-5 text-champagne-600" />;
    }
  };

  return (
    <section id="specs" className="py-24 lg:py-32 relative bg-white overflow-hidden">
      
      {/* Gliding Fluid Background Orbs */}
      <motion.div 
        animate={{ y: [0, -30, 0], x: [0, 30, 0] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -right-48 w-[550px] h-[550px] bg-champagne-300/20 rounded-full blur-3xl pointer-events-none"
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
            <FileCheck className="w-4 h-4 text-champagne-600" />
            Uncompromising Standards
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-slate-900 tracking-tight leading-tight"
          >
            Saheel Luxton Wakad: <br />
            <span className="gold-gradient-text">Specifications & Construction Standards</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-600 text-sm sm:text-base font-normal"
          >
            Every material, finish, and fixture at Luxton is handpicked from globally acclaimed luxury brands to ensure timeless endurance and prestige.
          </motion.p>

          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "112px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-transparent via-champagne-500 to-transparent mx-auto mt-4"
          />
        </div>

        {/* 6-Grid Specification Matrix with Gliding Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projectData.specifications.map((spec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="ultra-glass rounded-3xl p-6 sm:p-7 border-champagne-500/25 hover:border-champagne-500 shadow-milky-card hover:shadow-milky-hover transition-all duration-300 flex flex-col justify-between group bg-white"
            >
              <div className="space-y-4">
                {/* Category Header */}
                <div className="flex items-center gap-3.5 pb-3 border-b border-slate-200">
                  <motion.div 
                    whileHover={{ rotate: 8, scale: 1.1 }}
                    className="w-12 h-12 rounded-2xl bg-milky-100 border border-champagne-500/40 flex items-center justify-center shadow-sm group-hover:border-champagne-600 transition-all"
                  >
                    {getCategoryIcon(spec.category)}
                  </motion.div>
                  <div>
                    <h3 className="text-base font-bold font-cinzel text-slate-900 group-hover:text-champagne-700 transition-colors">
                      {spec.category}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-500 font-bold">Spec Section 0{index + 1}</span>
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-3 pt-1">
                  {spec.items.map((item, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-normal"
                    >
                      <CheckCircle2 className="w-4 h-4 text-champagne-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Verified Quality Tag */}
              <div className="mt-6 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                <span>Certified Quality Standard</span>
                <span className="text-champagne-800 font-mono font-bold">IS-Grade Material</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Brochure Trigger Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          whileHover={{ y: -4 }}
          className="mt-16 p-7 sm:p-9 rounded-3xl ultra-glass border-champagne-500/40 flex flex-col sm:flex-row items-center justify-between gap-6 bg-gradient-to-r from-champagne-100 via-white to-champagne-50 shadow-milky-card"
        >
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl sm:text-2xl font-bold font-cinzel text-slate-900">
              Want the Complete Engineering & Material Schedule?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 font-normal">
              Download the official technical specification dossier along with structural certifications.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenBrochure}
            className="btn-auric px-8 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase shrink-0 shadow-gold-glow cursor-pointer"
          >
            Download Technical Dossier (PDF)
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
};
