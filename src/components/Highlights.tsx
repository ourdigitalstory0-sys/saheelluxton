import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { projectData } from '../data/projectData';

interface HighlightsProps {
  onOpenBooking: () => void;
}

export const Highlights: React.FC<HighlightsProps> = ({ onOpenBooking }) => {
  return (
    <section id="highlights" className="py-24 lg:py-32 relative bg-white overflow-hidden">
      
      {/* Gliding Fluid Ambient Glows */}
      <motion.div 
        animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[550px] h-[550px] bg-champagne-300/20 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div 
        animate={{ y: [0, -40, 0], x: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-milky-300/50 rounded-full blur-3xl pointer-events-none"
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
            <Sparkles className="w-4 h-4 text-champagne-600" />
            Refined Design & Elevated Living
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-slate-900 tracking-tight leading-tight"
          >
            Highlights Shaped by <br />
            <span className="gold-gradient-text">Architectural Mastery</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-600 text-sm sm:text-base font-normal"
          >
            Every square inch at Luxton has been conceived to redefine what luxury living means in Pune's booming Wakad corridor.
          </motion.p>

          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "112px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-transparent via-champagne-500 to-transparent mx-auto mt-4"
          />
        </div>

        {/* Highlight Cards Grid with Gliding Stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projectData.highlights.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 45, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="ultra-glass rounded-3xl overflow-hidden group flex flex-col justify-between border-champagne-500/25 hover:border-champagne-500 shadow-milky-card hover:shadow-milky-hover transition-all duration-500 bg-white"
            >
              <div>
                {/* Image Container with Badge & Parallax Scale */}
                <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                  <motion.img
                    whileHover={{ scale: 1.12 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-champagne-500/50 text-champagne-800 text-[11px] font-black uppercase tracking-wider shadow-sm">
                      {item.badge}
                    </span>
                  </div>

                  {/* Icon Indicator */}
                  <motion.div 
                    whileHover={{ rotate: 8, scale: 1.15 }}
                    className="absolute bottom-3 right-4 w-12 h-12 rounded-2xl bg-white border border-champagne-500/40 p-2.5 flex items-center justify-center shadow-md group-hover:border-champagne-600 transition-all"
                  >
                    <img src={item.icon} alt="icon" className="w-full h-full object-contain filter invert-0" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 space-y-2">
                  <div className="text-xs font-mono text-champagne-700 uppercase tracking-widest font-black">
                    Signature 0{index + 1}
                  </div>
                  
                  <h3 className="text-xl font-bold font-cinzel text-slate-900 group-hover:text-champagne-700 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm text-slate-600 font-normal leading-relaxed pt-1">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="p-6 sm:p-7 pt-0 mt-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onOpenBooking}
                  className="w-full py-3 rounded-2xl bg-milky-100 hover:bg-champagne-500 text-slate-800 hover:text-white text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 border border-champagne-500/20 hover:border-champagne-500 transition-all duration-300 cursor-pointer shadow-sm"
                >
                  Explore Feature
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Callout Banner with Floating Shimmer */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          whileHover={{ y: -4 }}
          className="mt-20 p-8 sm:p-10 rounded-3xl ultra-glass border-champagne-500/40 relative overflow-hidden bg-gradient-to-r from-champagne-100 via-white to-champagne-50 shadow-milky-card"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="space-y-2 text-center md:text-left">
              <h4 className="text-2xl sm:text-3xl font-bold font-cinzel text-slate-900">
                Ready to Experience Pune's Most Prestigious Address?
              </h4>
              <p className="text-sm text-slate-600 font-normal max-w-2xl">
                Schedule a personalized walkthrough with Saheel Properties luxury concierge and tour the actual site in Wakad.
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={onOpenBooking}
              className="btn-auric px-8 py-4 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase shrink-0 shadow-gold-glow cursor-pointer"
            >
              Book Private Consultation
            </motion.button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
