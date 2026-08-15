import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Maximize2, Download, Check, Sparkles, ArrowRight } from 'lucide-react';
import { projectData } from '../data/projectData';
import { UnitPlan } from '../types/project';

interface FloorPlansProps {
  onOpenBooking: () => void;
  onOpenBrochure: () => void;
  onSelectPlanForZoom: (plan: UnitPlan) => void;
}

export const FloorPlans: React.FC<FloorPlansProps> = ({ onOpenBooking, onOpenBrochure, onSelectPlanForZoom }) => {
  const [selectedTypologyId, setSelectedTypologyId] = useState('2bhk');
  const [activePlanIndex, setActivePlanIndex] = useState(0);

  const currentTypology = projectData.typologies.find(t => t.id === selectedTypologyId) || projectData.typologies[0];
  const activePlan = currentTypology.plans[activePlanIndex] || currentTypology.plans[0];

  const handleTypologyChange = (id: string) => {
    setSelectedTypologyId(id);
    setActivePlanIndex(0);
  };

  return (
    <section id="plans" className="py-24 lg:py-32 relative bg-white overflow-hidden">
      
      {/* Gliding Fluid Background Orbs */}
      <motion.div 
        animate={{ y: [0, -35, 0], x: [0, 25, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -right-48 w-[500px] h-[500px] bg-champagne-300/20 rounded-full blur-3xl pointer-events-none"
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
            <Layers className="w-4 h-4 text-champagne-600" />
            Smart Floor Designs & Typologies
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-slate-900 tracking-tight leading-tight"
          >
            Curated Layouts Engineered <br />
            <span className="gold-gradient-text">For Maximum Space & Sunlight</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-600 text-sm sm:text-base font-normal"
          >
            Vastu-compliant layouts with zero wasted passages, private master dressing corridors, and panoramic sunset balconies.
          </motion.p>

          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "112px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-transparent via-champagne-500 to-transparent mx-auto mt-4"
          />
        </div>

        {/* Main Typology Tabs with Motion Switcher */}
        <div className="flex flex-wrap justify-center gap-3.5 mb-12">
          {projectData.typologies.map((item) => (
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              key={item.id}
              onClick={() => handleTypologyChange(item.id)}
              className={`px-6 sm:px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-3 border cursor-pointer ${
                selectedTypologyId === item.id
                  ? 'btn-auric border-transparent shadow-gold-glow scale-105 text-white'
                  : 'ultra-glass border-champagne-500/30 text-slate-700 hover:border-champagne-500 hover:text-slate-950 bg-white'
              }`}
            >
              <span>{item.type}</span>
              <span className={`text-[10px] px-2.5 py-0.5 rounded-full ${
                selectedTypologyId === item.id ? 'bg-white/25 text-white font-black' : 'bg-champagne-100 text-champagne-800 font-bold'
              }`}>
                {item.carpetArea}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Interactive Floor Plan Viewer Card with Gliding Spring Entrance */}
        <motion.div 
          layout
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="ultra-glass rounded-3xl p-6 sm:p-8 lg:p-10 border-champagne-500/30 shadow-milky-card bg-white"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Interactive Blueprint Display */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Sub-plan Layout Selector Pills */}
              <div className="flex items-center gap-2.5 overflow-x-auto pb-2">
                {currentTypology.plans.map((plan, idx) => (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    key={idx}
                    onClick={() => setActivePlanIndex(idx)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      activePlanIndex === idx
                        ? 'btn-auric text-white shadow-sm'
                        : 'bg-milky-100 text-slate-700 hover:text-slate-950 border border-slate-200'
                    }`}
                  >
                    {plan.title}
                  </motion.button>
                ))}
              </div>

              {/* Blueprint Image Container with Click-To-Zoom & Spring Physics */}
              <motion.div 
                key={activePlan.image}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onClick={() => onSelectPlanForZoom(activePlan)}
                className="relative rounded-2xl overflow-hidden bg-white p-4 sm:p-6 cursor-zoom-in group shadow-sm border-2 border-champagne-500/30 hover:border-champagne-500 transition-all duration-300"
              >
                <div className="relative aspect-[4/3] flex items-center justify-center">
                  <motion.img
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.5 }}
                    src={activePlan.image}
                    alt={activePlan.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Hover Zoom Prompt */}
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="px-5 py-2.5 rounded-full bg-white/95 backdrop-blur-md border border-champagne-500 text-slate-900 text-xs font-bold flex items-center gap-2 shadow-xl">
                    <Maximize2 className="w-4 h-4 text-champagne-600" />
                    Click to View Full-Screen HD Blueprint
                  </div>
                </div>

                {/* Plan Badge Overlay */}
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-champagne-400/40 text-slate-900 text-xs shadow-sm font-bold">
                  <span className="text-champagne-700 font-mono">{activePlan.carpet}</span> • {activePlan.title}
                </div>
              </motion.div>

              <p className="text-[11px] text-slate-500 text-center italic">
                * Architectural blueprints are artistic impressions subject to RERA approvals and final site execution.
              </p>
            </div>

            {/* Right: Layout Specs & Details */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="space-y-2">
                <span className="px-3.5 py-1 rounded-full bg-champagne-100 border border-champagne-400 text-champagne-800 text-xs font-mono font-bold uppercase tracking-wider">
                  {currentTypology.type}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-slate-900 mt-1">
                  {activePlan.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                  {currentTypology.description}
                </p>
              </div>

              {/* Key Metric Highlights */}
              <div className="grid grid-cols-2 gap-3.5">
                <motion.div whileHover={{ y: -2 }} className="p-4 rounded-2xl ultra-glass-card border-champagne-500/20 shadow-sm">
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider font-bold">Usable Carpet</div>
                  <div className="text-lg font-bold text-slate-900 font-cinzel mt-0.5">{activePlan.carpet || currentTypology.carpetArea}</div>
                </motion.div>

                <motion.div whileHover={{ y: -2 }} className="p-4 rounded-2xl ultra-glass-card border-champagne-500/40 shadow-sm">
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider font-bold">Starting Price</div>
                  <div className="text-lg font-black gold-gradient-text font-cinzel mt-0.5">{currentTypology.startingPrice}</div>
                </motion.div>

                <motion.div whileHover={{ y: -2 }} className="p-4 rounded-2xl ultra-glass-card border-champagne-500/20 shadow-sm">
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider font-bold">Balconies</div>
                  <div className="text-sm font-bold text-slate-800 mt-0.5">{currentTypology.balconies}</div>
                </motion.div>

                <motion.div whileHover={{ y: -2 }} className="p-4 rounded-2xl ultra-glass-card border-champagne-500/20 shadow-sm">
                  <div className="text-[11px] text-slate-500 uppercase tracking-wider font-bold">Washrooms</div>
                  <div className="text-sm font-bold text-slate-800 mt-0.5">{currentTypology.bathrooms}</div>
                </motion.div>
              </div>

              {/* Bullet Features */}
              <div className="space-y-2.5">
                <div className="text-xs font-bold text-champagne-800 uppercase tracking-wider">
                  Signature Inclusions:
                </div>
                {currentTypology.features.map((feat, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                  >
                    <Check className="w-4 h-4 text-champagne-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </motion.div>
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
                  Check Exact Unit Availability
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onOpenBrochure}
                  className="btn-auric-outline px-5 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-champagne-600" />
                  Floor Plan PDF
                </motion.button>
              </div>

            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
