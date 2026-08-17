import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Search, Layers, Compass, MapPin, DollarSign, Download, ArrowRight, CheckCircle2, ShieldCheck, Share2, BookOpen } from 'lucide-react';
import { projectData } from '../data/projectData';

interface DynamicProgrammaticGeneratorProps {
  onOpenBooking: () => void;
  onOpenBrochure: () => void;
}

export const DynamicProgrammaticGenerator: React.FC<DynamicProgrammaticGeneratorProps> = ({
  onOpenBooking,
  onOpenBrochure
}) => {
  const [selectedTypology, setSelectedTypology] = useState<string>('2 BHK Luxury');
  const [selectedLocality, setSelectedLocality] = useState<string>('Shankar Kalat Nagar, Wakad');
  const [selectedPersona, setSelectedPersona] = useState<string>('Hinjawadi IT Professional');
  const [selectedIntent, setSelectedIntent] = useState<string>('Floor Plan & Spatial Efficiency');

  const typologies = [
    { name: '2 BHK Luxury', carpet: '753 – 809 Sq. Ft.', price: '₹97 Lakhs*', usps: 'Designer Walk-In Closet, Sunlit Balcony' },
    { name: '3 BHK Grand Luxury', carpet: '1,027 – 1,162 Sq. Ft.', price: '₹1.32 Cr*', usps: '3 Full Baths, Master Dressing Suite' },
    { name: '4 BHK Presidential Suite', carpet: '1,458 Sq. Ft.', price: '₹1.86 Cr*', usps: '270° Panoramic Skyline, Private Foyer' }
  ];

  const localities = [
    { name: 'Shankar Kalat Nagar, Wakad', distance: 'S. No. 111 (Direct Site)', highlight: '24m DP Arterial Road, Zero Congestion' },
    { name: 'Phoenix Mall of the Millennium Belt', distance: '1.8 km (4 Mins)', highlight: '300+ Retail Brands & Fine Dining' },
    { name: 'Pune Metro Line 3 (Wakad Chowk)', distance: '1.2 km (3 Mins)', highlight: 'Rapid Direct Transit to Hinjawadi' },
    { name: 'Hinjawadi Phase 1 Tech Corridor', distance: '3.2 km (7 Mins)', highlight: 'Infosys, Wipro, TCS Campuses' },
    { name: 'Balewadi High Street & Baner', distance: '4.5 km (9 Mins)', highlight: 'Nightlife, Gourmet Cafes & Corporate Hubs' },
    { name: 'Tathawade & Mahalunge Belt', distance: '3.8 km (8 Mins)', highlight: 'Educational Hub & Hi-Tech City' }
  ];

  const personas = [
    { name: 'Hinjawadi IT Professional', benefit: 'Cut daily commute to under 7 mins; high rental yield liquidity.' },
    { name: 'UAE & Dubai NRI Investor', benefit: 'High-yield 5.8% rental return, AED pricing desk & FEMA repatriation.' },
    { name: 'US & Silicon Valley NRI', benefit: 'Clear freehold title, 70% ring-fenced MahaRERA escrow security.' },
    { name: 'Executive Family & Upgraders', benefit: 'Pune’s 1st 4,000 sq.ft lobby, 30+ 5-star amenities, rooftop aqua theatre.' }
  ];

  const intents = [
    { name: 'Floor Plan & Spatial Efficiency', focus: 'Zero passage wastage, private walk-in closets, Vastu East orientation.' },
    { name: 'Pricing, Cost Sheet & Bank ROI', focus: 'All-inclusive price, 7% stamp duty breakdown, SBI/HDFC 80% pre-approved loans.' },
    { name: 'Infrastructure & Capital Growth', focus: 'Pune Metro Line 3 + Ring Road synergy driving 14%+ annual capital CAGR.' }
  ];

  const currentTyp = typologies.find(t => t.name === selectedTypology) || typologies[0];
  const currentLoc = localities.find(l => l.name === selectedLocality) || localities[0];
  const currentPer = personas.find(p => p.name === selectedPersona) || personas[0];
  const currentInt = intents.find(i => i.name === selectedIntent) || intents[0];

  return (
    <section id="programmatic-generator" className="py-24 lg:py-32 relative bg-gradient-to-b from-[#FFFFFF] via-[#FAF8F5] to-[#F4F0E8] overflow-hidden border-t border-champagne-500/20">
      
      {/* Gliding Fluid Background Glow */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: [0, 60, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-champagne-300/15 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full ultra-glass border-champagne-500/40 text-champagne-800 text-xs font-bold uppercase tracking-widest shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-champagne-600" />
            Dynamic Programmatic SEO Intelligence Engine
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-slate-900 tracking-tight leading-tight"
          >
            Personalized Buyer Dossier <br />
            <span className="gold-gradient-text">& Real Estate Matrix Multiplier</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-600 text-sm sm:text-base font-normal"
          >
            Customize your search parameters across configuration, micro-location, buyer persona, and financial intent to generate a real-time programmatic intelligence report.
          </motion.p>
        </div>

        {/* 4-Parameter Interactive Selector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-3xl ultra-glass border-2 border-champagne-500/30 bg-white/90 shadow-sm">
          
          {/* Dimension 1: Typology */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-champagne-800 font-bold uppercase tracking-wider block">
              1. Residence Typology
            </label>
            <select
              value={selectedTypology}
              onChange={(e) => setSelectedTypology(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-milky-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-champagne-500 cursor-pointer shadow-sm"
            >
              {typologies.map((t) => (
                <option key={t.name} value={t.name}>{t.name} ({t.carpet})</option>
              ))}
            </select>
          </div>

          {/* Dimension 2: Micro-Location */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-champagne-800 font-bold uppercase tracking-wider block">
              2. Micro-Market Proximity
            </label>
            <select
              value={selectedLocality}
              onChange={(e) => setSelectedLocality(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-milky-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-champagne-500 cursor-pointer shadow-sm"
            >
              {localities.map((l) => (
                <option key={l.name} value={l.name}>{l.name}</option>
              ))}
            </select>
          </div>

          {/* Dimension 3: Buyer Persona */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-champagne-800 font-bold uppercase tracking-wider block">
              3. Buyer Profile / Segment
            </label>
            <select
              value={selectedPersona}
              onChange={(e) => setSelectedPersona(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-milky-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-champagne-500 cursor-pointer shadow-sm"
            >
              {personas.map((p) => (
                <option key={p.name} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>

          {/* Dimension 4: Core Intent */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono text-champagne-800 font-bold uppercase tracking-wider block">
              4. Strategic Priority
            </label>
            <select
              value={selectedIntent}
              onChange={(e) => setSelectedIntent(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-milky-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-champagne-500 cursor-pointer shadow-sm"
            >
              {intents.map((i) => (
                <option key={i.name} value={i.name}>{i.name}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Dynamic Programmatic Result Card */}
        <motion.div
          key={`${selectedTypology}-${selectedLocality}-${selectedPersona}-${selectedIntent}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-6 sm:p-8 rounded-3xl ultra-glass border-2 border-champagne-500/40 bg-white shadow-milky-card space-y-6"
        >
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
            <div className="space-y-1">
              <span className="px-3 py-1 rounded-full bg-champagne-100 text-champagne-800 text-[10px] font-mono font-bold uppercase">
                Dynamic SEO Matrix Node: {selectedTypology} • {selectedLocality}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-slate-900 leading-tight">
                {selectedTypology} at Saheel Luxton near {selectedLocality}
              </h3>
              <p className="text-xs text-champagne-700 font-medium font-cinzel">
                Targeted Intelligence for {selectedPersona} • Focus: {selectedIntent}
              </p>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] font-mono text-slate-400 uppercase block">Starting Investment</span>
              <strong className="text-xl sm:text-2xl font-black font-cinzel gold-gradient-text block">
                {currentTyp.price}
              </strong>
            </div>
          </div>

          {/* 4-Pillar Specification Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-milky-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1">
                <Layers className="w-3.5 h-3.5 text-champagne-600" /> RERA Usable Carpet
              </span>
              <strong className="text-xs sm:text-sm font-bold font-cinzel text-slate-900 block">{currentTyp.carpet}</strong>
              <span className="text-[11px] text-slate-500 block">{currentTyp.usps}</span>
            </div>

            <div className="p-4 rounded-2xl bg-milky-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-champagne-600" /> Proximity & Access
              </span>
              <strong className="text-xs sm:text-sm font-bold font-cinzel text-slate-900 block">{currentLoc.distance}</strong>
              <span className="text-[11px] text-slate-500 block">{currentLoc.highlight}</span>
            </div>

            <div className="p-4 rounded-2xl bg-milky-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-champagne-600" /> Persona Advantage
              </span>
              <strong className="text-xs sm:text-sm font-bold font-cinzel text-slate-900 block">{selectedPersona}</strong>
              <span className="text-[11px] text-slate-500 block">{currentPer.benefit}</span>
            </div>

            <div className="p-4 rounded-2xl bg-milky-50 border border-slate-200/80 space-y-1">
              <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-champagne-600" /> Strategic Insight
              </span>
              <strong className="text-xs sm:text-sm font-bold font-cinzel text-slate-900 block">{selectedIntent}</strong>
              <span className="text-[11px] text-slate-500 block">{currentInt.focus}</span>
            </div>
          </div>

          {/* Bottom Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <span className="text-xs text-slate-500 font-mono">
              MahaRERA: PM1260002502043 • Pune's 1st 4,000 sq.ft lobby & rooftop aqua theatre
            </span>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={onOpenBrochure}
                className="w-full sm:w-auto btn-auric-outline px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Download Blueprint
              </button>
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto btn-auric px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-slate-950 shadow-gold-glow flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" /> Reserve Unit Preview
              </button>
            </div>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
