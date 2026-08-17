import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, MapPin, Building, Train, Globe, DollarSign, CheckCircle2, ChevronRight, X, Sparkles, ArrowRight, ShieldCheck, TrendingUp, Download } from 'lucide-react';
import { programmaticDossiers, ProgrammaticDossier } from '../data/puneProgrammaticSEOData';

interface ProgrammaticSEOHubProps {
  onOpenBooking: () => void;
  onOpenBrochure: () => void;
}

export const ProgrammaticSEOHub: React.FC<ProgrammaticSEOHubProps> = ({
  onOpenBooking,
  onOpenBrochure
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDossier, setSelectedDossier] = useState<ProgrammaticDossier | null>(null);

  const categories = [
    { id: 'all', label: 'All Real Estate Dossiers' },
    { id: 'wakad-micromarkets', label: 'Wakad Micro-Markets' },
    { id: 'infra-metro', label: 'Metro 3 & Infrastructure' },
    { id: 'typology-engineering', label: 'Floor Plans & Lobby' },
    { id: 'it-corridors', label: 'Hinjawadi IT Hubs' },
    { id: 'nri-global-desks', label: 'Global NRI Desks' },
    { id: 'developer-comparisons', label: 'Builder Benchmarks' }
  ];

  const filteredDossiers = programmaticDossiers.filter(dossier => {
    const matchesTab = activeTab === 'all' || dossier.cluster === activeTab;
    const matchesSearch = searchQuery === '' || 
      dossier.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dossier.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dossier.metaDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dossier.targetKeywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <section id="programmatic-seo-hub" className="py-24 lg:py-32 relative bg-[#FAF8F5] overflow-hidden border-t border-champagne-500/20">
      
      {/* Gliding Fluid Background Glow */}
      <motion.div 
        animate={{ y: [0, -30, 0], scale: [1, 1.06, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-champagne-300/20 rounded-full blur-3xl pointer-events-none"
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
            <BookOpen className="w-4 h-4 text-champagne-600" />
            Pune Real Estate Intelligence & Topical Authority Hub
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-slate-900 tracking-tight leading-tight"
          >
            Comprehensive Market Dossiers <br />
            <span className="gold-gradient-text">& Saheel Luxton Ecosystem Engine</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-600 text-sm sm:text-base font-normal"
          >
            Explore in-depth market research whitepapers, transit infrastructure reports, typology engineering audits, and NRI investment models covering Wakad and Pune.
          </motion.p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-4">
          
          {/* Real-time Query Filter Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, locality, Metro Line 3, NRI ROI, 4000 sq ft lobby, MahaRERA..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl ultra-glass border-2 border-champagne-500/40 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-champagne-500 shadow-sm font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === cat.id
                    ? 'btn-auric text-slate-950 shadow-sm'
                    : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200 hover:border-champagne-400'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDossiers.map((dossier) => (
            <motion.article
              key={dossier.id}
              whileHover={{ y: -4 }}
              className="p-6 sm:p-7 rounded-3xl ultra-glass border-2 border-champagne-500/30 bg-white shadow-milky-card flex flex-col justify-between group"
            >
              <div className="space-y-3.5">
                
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-champagne-100 text-champagne-800 text-[10px] font-mono font-bold uppercase tracking-wider">
                    {dossier.cluster.replace('-', ' ')}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {dossier.readTime}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold font-cinzel text-slate-900 group-hover:text-champagne-700 transition-colors leading-snug">
                  {dossier.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {dossier.metaDesc}
                </p>

                {/* Micro Key Stats */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  {dossier.stats.slice(0, 2).map((stat, i) => (
                    <div key={i} className="p-2 rounded-xl bg-milky-50 border border-slate-100">
                      <span className="text-[9px] font-mono text-slate-400 block">{stat.label}</span>
                      <strong className="text-[11px] font-bold text-slate-900 block truncate">{stat.value}</strong>
                    </div>
                  ))}
                </div>

              </div>

              {/* Read Full Whitepaper Trigger */}
              <div className="pt-5 border-t border-slate-100 flex items-center justify-between mt-4">
                <button
                  onClick={() => setSelectedDossier(dossier)}
                  className="text-xs font-bold font-cinzel text-champagne-700 hover:text-champagne-900 flex items-center gap-1.5 cursor-pointer"
                >
                  Read Full Dossier <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onOpenBooking}
                  className="btn-auric px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-slate-950 shadow-sm cursor-pointer"
                >
                  VIP Visit
                </button>
              </div>

            </motion.article>
          ))}
        </div>

      </div>

      {/* Deep Dossier Modal View */}
      <AnimatePresence>
        {selectedDossier && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-3xl rounded-3xl ultra-glass border-2 border-champagne-500/40 bg-white p-6 sm:p-8 shadow-2xl space-y-6 max-h-[85vh] overflow-y-auto"
            >
              
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
                <div className="space-y-1">
                  <span className="px-3 py-1 rounded-full bg-champagne-100 text-champagne-800 text-[10px] font-mono font-bold uppercase">
                    {selectedDossier.cluster.replace('-', ' ')} • {selectedDossier.readTime}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-slate-900 leading-tight">
                    {selectedDossier.title}
                  </h3>
                  <p className="text-xs text-champagne-700 font-medium font-cinzel">
                    {selectedDossier.subtitle}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedDossier(null)}
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Key Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-milky-50 border border-champagne-400/30">
                {selectedDossier.stats.map((hl, i) => (
                  <div key={i} className="space-y-0.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">{hl.label}</span>
                    <strong className="text-xs font-bold font-cinzel text-slate-900 block">{hl.value}</strong>
                  </div>
                ))}
              </div>

              {/* Editorial Analysis */}
              <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {selectedDossier.editorialAnalysis.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {/* Strategic Key Highlights */}
              <div className="space-y-2 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold font-cinzel text-slate-900 uppercase tracking-wider block">
                  Strategic Real Estate Takeaways:
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {selectedDossier.keyHighlights.map((hl, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-champagne-600 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial & ROI Projection Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-champagne-50 to-milky-50 border border-champagne-400/40 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Gross Rental Yield</span>
                  <strong className="font-bold font-cinzel text-champagne-800 text-sm">{selectedDossier.roiProjection.rentalYield}</strong>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Projected CAGR</span>
                  <strong className="font-bold font-cinzel text-emerald-800 text-sm">{selectedDossier.roiProjection.annualCagr}</strong>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">RERA Possession</span>
                  <strong className="font-bold font-cinzel text-slate-900 text-xs">{selectedDossier.roiProjection.possessionTimeframe}</strong>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Incentives</span>
                  <strong className="font-bold font-cinzel text-slate-900 text-xs">{selectedDossier.roiProjection.stampDutyIncentive}</strong>
                </div>
              </div>

              {/* Targeted Keywords Knowledge Graph Footer */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
                <span className="text-[10px] font-mono uppercase text-champagne-400 font-bold block">
                  Search Entity & Knowledge Graph Keywords:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDossier.targetKeywords.map((kw, i) => (
                    <span key={i} className="px-2.5 py-0.5 rounded-lg bg-white/10 text-slate-300 text-[10px] font-mono">
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => {
                    setSelectedDossier(null);
                    onOpenBrochure();
                  }}
                  className="w-full sm:w-auto btn-auric-outline px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider"
                >
                  Download Project Dossier
                </button>

                <button
                  onClick={() => {
                    setSelectedDossier(null);
                    onOpenBooking();
                  }}
                  className="w-full sm:w-auto btn-auric px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider shadow-gold-glow text-slate-950"
                >
                  Book Private Site Experience
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
