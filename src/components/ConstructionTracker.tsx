import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, HardHat, Calendar, CheckCircle2, ArrowUpRight, Clock, Building, Award } from 'lucide-react';
import { projectData } from '../data/projectData';

interface ConstructionTrackerProps {
  onOpenBooking: () => void;
  onOpenBrochure: () => void;
}

export const ConstructionTracker: React.FC<ConstructionTrackerProps> = ({ onOpenBooking, onOpenBrochure }) => {
  const milestones = [
    {
      phase: "Phase 1: Land Clearances & Approvals",
      status: "100% Completed",
      date: "Q1 2025",
      isDone: true,
      desc: "Environmental clearance, sanctioned architectural layouts, Title certification, and MahaRERA PM1260002502043 registration."
    },
    {
      phase: "Phase 2: Deep Foundation & Sub-Structure",
      status: "Completed",
      date: "Q3 2025",
      isDone: true,
      desc: "Precision piling, heavy-duty RCC raft foundation, and seismic shear wall subterranean retaining structures."
    },
    {
      phase: "Phase 3: Podium & Double-Height Lobby Slab",
      status: "In Progress / Active Work",
      date: "Q1 2026 - Q3 2026",
      isDone: false,
      isCurrent: true,
      desc: "Casting of the 4,000 sq.ft. double-height grand lobby structure, vehicular ramps, and podium amenity decks."
    },
    {
      phase: "Phase 4: Super-Structure 30-Storey Towers",
      status: "Scheduled",
      date: "2026 - 2028",
      isDone: false,
      desc: "Rapid aluminum formwork cycle casting of 30 residential sky floors across Wings A, B, and C."
    },
    {
      phase: "Phase 5: 5-Star Rooftop Aqua Theatre & Finishing",
      status: "Scheduled",
      date: "2028 - 2029",
      isDone: false,
      desc: "30th-floor sky club installation, infinity pool waterproofing, facade glazing, and designer walk-in closet fits."
    },
    {
      phase: "Phase 6: Final Possession & Handover",
      status: "Target: June 2030 (MahaRERA)",
      date: "June 2030",
      isDone: false,
      desc: "Statutory Occupancy Certificate (OC), joint homeowner inspections, and key handover ceremony."
    }
  ];

  return (
    <section id="construction-milestones" className="py-24 lg:py-32 relative bg-white overflow-hidden border-t border-champagne-500/20">
      
      {/* Gliding Fluid Background Orbs */}
      <motion.div 
        animate={{ y: [0, -35, 0], x: [0, 25, 0] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -right-48 w-[550px] h-[550px] bg-champagne-300/20 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full ultra-glass border-champagne-500/40 text-champagne-800 text-xs font-bold uppercase tracking-widest shadow-sm"
          >
            <HardHat className="w-4 h-4 text-champagne-600" />
            Engineering Transparency & Construction Milestones
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-slate-900 tracking-tight leading-tight"
          >
            MahaRERA Audited <br />
            <span className="gold-gradient-text">Construction Progress Roadmap</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-600 text-sm sm:text-base font-normal"
          >
            Track structural engineering milestones, escrow disbursement compliance, and timely possession milestones certified under MahaRERA PM1260002502043.
          </motion.p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {milestones.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              className={`p-6 sm:p-7 rounded-3xl ultra-glass border-2 transition-all duration-300 relative flex flex-col justify-between space-y-4 ${
                m.isCurrent
                  ? 'border-champagne-600 bg-gradient-to-b from-champagne-100/60 via-white to-champagne-50/60 shadow-milky-hover ring-2 ring-champagne-400/40'
                  : m.isDone
                  ? 'border-emerald-500/30 bg-white shadow-sm'
                  : 'border-slate-200 bg-white/70 shadow-sm opacity-80'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-slate-500">
                    Step 0{idx + 1}
                  </span>
                  {m.isDone ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                    </span>
                  ) : m.isCurrent ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full btn-auric text-white text-[10px] font-bold shadow-gold-glow animate-pulse">
                      <Clock className="w-3.5 h-3.5" /> Current Active Phase
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-medium">
                      Scheduled
                    </span>
                  )}
                </div>

                <h4 className="text-base font-bold font-cinzel text-slate-900 leading-snug">
                  {m.phase}
                </h4>

                <div className="text-xs font-mono font-bold text-champagne-700">
                  Target Timeline: {m.date}
                </div>

                <p className="text-xs text-slate-600 font-normal leading-relaxed">
                  {m.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
                <span>RERA Escrow Audited</span>
                <ShieldCheck className="w-4 h-4 text-champagne-600" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Assurance Card */}
        <div className="p-6 sm:p-8 rounded-3xl ultra-glass border-2 border-champagne-500/40 bg-gradient-to-r from-champagne-100 via-white to-champagne-50 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-milky-card">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold font-cinzel text-slate-900">
              Want Live Construction Photos & Video Updates?
            </h4>
            <p className="text-xs text-slate-600 max-w-xl">
              Subscribe to monthly digital drone walkthroughs and engineer compliance certificates.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="btn-auric px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 shadow-gold-glow cursor-pointer"
          >
            Request Latest Site Video
          </button>
        </div>

      </div>
    </section>
  );
};
