import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Search, Sparkles, ChevronRight, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';

interface RealEstateGlossaryProps {
  onOpenBrochure: () => void;
  onOpenBooking: () => void;
}

export const RealEstateGlossary: React.FC<RealEstateGlossaryProps> = ({ onOpenBrochure, onOpenBooking }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const glossaryTerms = [
    {
      term: "RERA Carpet Area",
      category: "Legal & RERA",
      summary: "The net usable floor area of an apartment, excluding external walls, service shafts, and balcony areas.",
      detail: "Under MahaRERA guidelines for Saheel Luxton (PM1260002502043), all 2, 3, and 4 BHK residences are sold strictly on certified RERA usable carpet area (753 to 1,458 sq. ft.) with zero deceptive super built-up loading."
    },
    {
      term: "Double-Height Grand Lobby",
      category: "Architecture",
      summary: "An architectural arrival lounge with twice the standard ceiling height (typically 20+ feet).",
      detail: "Saheel Luxton introduces Pune's first 4,000 sq. ft. double-height grand lobby featuring Italian marble cladding, automated ambient lighting, and full 5-star hotel concierge services."
    },
    {
      term: "RCC Shear Wall Formwork",
      category: "Engineering",
      summary: "Reinforced concrete structural wall system providing superior earthquake resistance and column-free room spaces.",
      detail: "Engineered to IS 1893:2016 Zone-III seismic safety standards, ensuring ultra-smooth wall finishes, maximum carpet efficiency, and long-term structural durability."
    },
    {
      term: "MahaRERA Escrow Account",
      category: "Financial Safety",
      summary: "Mandatory bank account where 70% of buyer receivables must be deposited solely for project construction.",
      detail: "Guarantees 100% financial security for homebuyers at Saheel Luxton. Funds are independently audited and disbursed strictly based on structural milestones certified by engineers and chartered accountants."
    },
    {
      term: "DGU (Double Glazed Units) Glass",
      category: "Engineering",
      summary: "Acoustic and thermally insulated dual-pane glass assembly separated by an airtight vacuum spacer.",
      detail: "Installed across sundecks and panoramic living room facades at Saheel Luxton to reduce ambient sound by up to 35 dB and lower air conditioning cooling loads."
    },
    {
      term: "Pune Metro Line 3 (Hinjawadi-Shivajinagar)",
      category: "Connectivity",
      summary: "Elevated 23.3 km metro transit corridor connecting Hinjawadi IT Park to central Pune via Wakad.",
      detail: "Saheel Luxton is situated just 4 minutes from the Wakad Chowk Metro station, offering rapid commute access to Hinjawadi Phase 1, 2, 3 and Pune City."
    },
    {
      term: "Designer Walk-In Closets",
      category: "Interior Luxury",
      summary: "Dedicated, private dressing room corridors integrated adjacent to master ensuite bathrooms.",
      detail: "Unlike ordinary apartments where closets take up bedroom floor space, Saheel Luxton incorporates custom walk-in closet corridors in every master suite for presidential elegance."
    },
    {
      term: "Open-Air Aqua Theatre",
      category: "Amenities",
      summary: "A rooftop cinematic screening deck situated next to an infinity horizon swimming pool.",
      detail: "Located on the 30th-floor Sky Club of Saheel Luxton, enabling residents to enjoy stargazing and private cinema screenings against the West Pune skyline."
    }
  ];

  const filteredTerms = glossaryTerms.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.detail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['all', 'Legal & RERA', 'Architecture', 'Engineering', 'Financial Safety', 'Connectivity'];

  return (
    <section id="real-estate-glossary" className="py-24 lg:py-32 relative bg-white overflow-hidden border-t border-champagne-500/20">
      
      {/* Gliding Fluid Background Orbs */}
      <motion.div 
        animate={{ y: [0, -30, 0], x: [0, 30, 0] }}
        transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 -left-48 w-[550px] h-[550px] bg-champagne-300/20 rounded-full blur-3xl pointer-events-none"
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
            Real Estate Encyclopedia & Google Knowledge Entity
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-slate-900 tracking-tight leading-tight"
          >
            Real Estate Intelligence <br />
            <span className="gold-gradient-text">& Technical Terminology Guide</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-600 text-sm sm:text-base font-normal"
          >
            Demystifying luxury real estate parameters, statutory MahaRERA rights, and architectural benchmarks in Pune's West Corridor.
          </motion.p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-3xl ultra-glass border border-champagne-500/30 bg-white/90 shadow-sm">
          
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search concepts (e.g. Carpet, DGU, Escrow)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-milky-100/80 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-champagne-500 text-slate-800 font-medium"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  activeCategory === cat
                    ? 'btn-auric text-white shadow-sm'
                    : 'bg-milky-100 text-slate-600 hover:bg-champagne-100 border border-slate-200'
                }`}
              >
                {cat === 'all' ? 'All Terms' : cat}
              </button>
            ))}
          </div>

        </div>

        {/* Glossary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTerms.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="p-6 rounded-3xl ultra-glass border border-champagne-500/30 bg-white shadow-milky-card space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase font-bold text-champagne-700 bg-champagne-100 px-2.5 py-0.5 rounded-full">
                    {item.category}
                  </span>
                  <ShieldCheck className="w-4 h-4 text-champagne-600" />
                </div>
                <h4 className="text-lg font-bold font-cinzel text-slate-900">{item.term}</h4>
                <p className="text-xs text-slate-700 font-semibold leading-relaxed">
                  {item.summary}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed font-normal pt-1">
                  {item.detail}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-champagne-800 font-medium">Applied at Saheel Luxton</span>
                <button
                  onClick={onOpenBrochure}
                  className="text-champagne-700 hover:text-champagne-900 font-bold flex items-center gap-1 cursor-pointer text-[11px]"
                >
                  Download Specs <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Educational Note */}
        <div className="p-6 sm:p-8 rounded-3xl ultra-glass border-2 border-champagne-500/40 bg-gradient-to-r from-champagne-100 via-white to-champagne-50 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-milky-card">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold font-cinzel text-slate-900">
              Have Specific Technical or Legal Inquiries?
            </h4>
            <p className="text-xs text-slate-600 max-w-xl">
              Our Senior Real Estate Advisory & Legal Consultation Desk is available for one-on-one document walkthroughs.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="btn-auric px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 shadow-gold-glow cursor-pointer"
          >
            Connect With Advisory Desk
          </button>
        </div>

      </div>
    </section>
  );
};
