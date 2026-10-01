import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Building2,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  MapPin,
  ChevronRight,
  HelpCircle,
  ExternalLink,
  Layers,
  Award,
  CheckCircle2,
  FileText,
  DollarSign
} from 'lucide-react';
import { KEYWORD_PILLARS_DATA, ALL_FAQ_LIST, KeywordPillar } from '../data/keywordClustersData';

interface MasterSEOTopicalHubProps {
  onOpenBooking: () => void;
  onOpenBrochure: () => void;
}

export const MasterSEOTopicalHub: React.FC<MasterSEOTopicalHubProps> = ({ onOpenBooking, onOpenBrochure }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPillar, setSelectedPillar] = useState<KeywordPillar>(KEYWORD_PILLARS_DATA[0]);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const categories = ['All', 'Brand Authority', 'Typologies', 'Signature Amenities', 'Location & Connectivity', 'Trust & Governance', 'Financial Intelligence'];

  const filteredPillars = activeCategory === 'All'
    ? KEYWORD_PILLARS_DATA
    : KEYWORD_PILLARS_DATA.filter(p => p.category === activeCategory);

  return (
    <section id="topical-authority-hub" className="py-24 bg-[#FAF8F5] relative overflow-hidden border-t border-champagne-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full ultra-glass border-champagne-500/40 text-champagne-800 text-xs font-bold uppercase tracking-widest shadow-sm">
            <Layers className="w-4 h-4 text-champagne-600" />
            Topical Real Estate Knowledge Graph
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-slate-900 tracking-tight leading-tight">
            Saheel Luxton <br />
            <span className="gold-gradient-text">Complete Project &amp; Locality Intelligence</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal">
            Authoritative, factual specifications for homebuyers and real estate investors exploring Pune's premier 30-storey luxury landmark in Wakad.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveCategory(cat);
                const matching = cat === 'All' ? KEYWORD_PILLARS_DATA[0] : KEYWORD_PILLARS_DATA.find(p => p.category === cat) || KEYWORD_PILLARS_DATA[0];
                setSelectedPillar(matching);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'btn-auric text-white shadow-md'
                  : 'bg-white border border-champagne-300 text-slate-700 hover:bg-champagne-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Master 2-Column Split: Topic Navigation + Deep Specification View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Pillar List (5 Cols) */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-[11px] font-mono text-champagne-800 font-bold uppercase tracking-widest block px-2">
              Explore 37 Verified Topical Clusters
            </span>
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
              {filteredPillars.map((pillar) => (
                <div
                  key={pillar.id}
                  onClick={() => setSelectedPillar(pillar)}
                  className={`p-4 rounded-2xl transition cursor-pointer border text-left flex items-center justify-between ${
                    selectedPillar.id === pillar.id
                      ? 'bg-white border-champagne-600 shadow-milky-card ring-2 ring-champagne-500/20'
                      : 'bg-white/70 border-slate-200 hover:bg-white hover:border-champagne-400'
                  }`}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase text-champagne-700 tracking-wider">
                      {pillar.category}
                    </span>
                    <h4 className="text-sm font-bold font-cinzel text-slate-900 leading-snug">
                      {pillar.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {pillar.summary}
                    </p>
                  </div>
                  <ChevronRight className={`w-5 h-5 shrink-0 transition-transform ${
                    selectedPillar.id === pillar.id ? 'text-champagne-700 translate-x-1' : 'text-slate-300'
                  }`} />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Active Pillar Intelligence Panel (7 Cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPillar.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="p-6 sm:p-8 rounded-3xl ultra-glass border-2 border-champagne-500/40 bg-white shadow-xl space-y-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-champagne-100 text-champagne-800 text-[10px] font-bold uppercase tracking-wider">
                      {selectedPillar.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-slate-900 mt-2">
                      {selectedPillar.title}
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={onOpenBooking}
                      className="btn-auric px-4 py-2 rounded-full text-xs font-bold uppercase shadow-sm cursor-pointer"
                    >
                      Book Tour
                    </button>
                    <button
                      onClick={onOpenBrochure}
                      className="btn-auric-outline px-4 py-2 rounded-full text-xs font-bold uppercase cursor-pointer"
                    >
                      Brochure
                    </button>
                  </div>
                </div>

                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {selectedPillar.semanticContent}
                </p>

                {/* Verified Specs Grid */}
                {selectedPillar.verifiedSpecs && selectedPillar.verifiedSpecs.length > 0 && (
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-champagne-200/80 space-y-3">
                    <span className="text-[11px] font-mono font-bold uppercase text-champagne-800 tracking-wider block">
                      Verified Technical Specifications
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedPillar.verifiedSpecs.map((spec, i) => (
                        <div key={i} className="flex items-center justify-between text-xs p-2 rounded-xl bg-white border border-slate-100">
                          <span className="text-slate-500 font-medium">{spec.label}:</span>
                          <span className="font-bold text-slate-900">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Entity Tags (Natural Topic Context) */}
                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider block">
                    Semantic Keyword Entities
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedPillar.keyEntities.map((ent, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200"
                      >
                        {ent}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* Master FAQ Accordion Section (Google PAA Rich Snippets) */}
        <div className="p-8 sm:p-12 rounded-3xl ultra-glass border-2 border-champagne-500/30 bg-white shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-mono text-champagne-800 font-bold uppercase tracking-widest block">
              Frequently Asked Questions (Google PAA)
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-slate-900">
              Essential Buyer FAQs for Saheel Luxton Wakad
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ALL_FAQ_LIST.map((faq, idx) => (
              <div
                key={idx}
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="p-5 rounded-2xl bg-[#FAF8F5] border border-champagne-200/60 transition cursor-pointer hover:bg-champagne-50/50 space-y-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">
                    {faq.question}
                  </h4>
                  <span className="text-champagne-700 font-bold text-lg leading-none shrink-0">
                    {openFaqIndex === idx ? '−' : '+'}
                  </span>
                </div>
                {openFaqIndex === idx && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-200/60"
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
