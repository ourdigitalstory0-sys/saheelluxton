import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, MapPin, Building, Train, Globe, DollarSign, CheckCircle2, ChevronRight, X, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { projectData } from '../data/projectData';

interface ProgrammaticSEOHubProps {
  onOpenBooking: () => void;
  onOpenBrochure: () => void;
}

interface SEOArticleHub {
  id: string;
  category: 'micro-markets' | 'transit' | 'typologies' | 'nri-investment' | 'legal-finance';
  title: string;
  subtitle: string;
  targetKeywords: string[];
  readTime: string;
  summary: string;
  fullContent: string[];
  keyHighlights: { label: string; value: string }[];
}

export const ProgrammaticSEOHub: React.FC<ProgrammaticSEOHubProps> = ({
  onOpenBooking,
  onOpenBrochure
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<SEOArticleHub | null>(null);

  const articleHubs: SEOArticleHub[] = [
    {
      id: 'wakad-shankar-kalat-phoenix-mall',
      category: 'micro-markets',
      title: "Why S. No. 111 Shankar Kalat Nagar is Wakad's #1 Luxury Residential Corridor",
      subtitle: "Comprehensive Micro-Market Analysis of Wakad's High-Growth Lifestyle Belt",
      targetKeywords: ["Saheel Luxton Shankar Kalat Nagar", "luxury flats near Phoenix Mall Wakad", "Wakad S No 111 real estate", "best locality to live in Wakad"],
      readTime: "6 Min Read",
      summary: "An in-depth analysis of why Shankar Kalat Nagar in Wakad commands the highest livability quotient in West Pune due to its 5-minute proximity to Phoenix Mall of the Millennium, rapid access to Hinjawadi Phase 1, and wide 24-meter DP roads.",
      keyHighlights: [
        { label: "Distance to Phoenix Mall", value: "1.8 km (4 Mins)" },
        { label: "Road Infrastructure", value: "24-Meter Arterial DP Road" },
        { label: "5-Yr Capital Appreciation", value: "14.2% Annualized CAGR" },
        { label: "MahaRERA Status", value: "Registered: PM1260002502043" }
      ],
      fullContent: [
        "Shankar Kalat Nagar has emerged as the premier residential enclave within Wakad, driven by its strategic location at the confluence of urban lifestyle retail and the Hinjawadi IT corridor.",
        "Saheel Luxton, situated at S. No. 111, represents the crown jewel of this micro-market. Featuring Pune's first 4,000 sq.ft double-height Italian marble grand lobby and a 30-storey iconic elevation, the project sets a new benchmark for luxury living in PCMC.",
        "With Phoenix Mall of the Millennium operating just 1.8 km away, residents enjoy immediate access to over 300 international retail brands, 15 fine-dining restaurants, and multiplex cinema experiences without highway congestion.",
        "Infrastructure advancements including underground cabling, 24/7 dedicated water supply lines, and storm-water drainage networks make this pocket virtually immune to urban bottlenecks."
      ]
    },
    {
      id: 'metro-line-3-wakad-chowk-impact',
      category: 'transit',
      title: "Pune Metro Line 3 (Hinjawadi to Shivajinagar): Capital Value Multiplier for Wakad",
      subtitle: "Transit-Oriented Real Estate Capital Growth Forecast (2026 – 2030)",
      targetKeywords: ["Pune Metro Line 3 Wakad Chowk Station", "flats near Hinjawadi Metro line", "Wakad property price appreciation 2026", "Saheel Luxton metro connectivity"],
      readTime: "7 Min Read",
      summary: "Detailed transit-oriented development report examining how the 23.3 km elevated Pune Metro Line 3 directly impacts rental yields and asset valuation for luxury high-rises situated near the Wakad Chowk interchange.",
      keyHighlights: [
        { label: "Nearest Station", value: "Wakad Chowk (1.2 km / 3 Mins)" },
        { label: "Commute to Hinjawadi Ph 1", value: "6 Mins via Metro" },
        { label: "Commute to Shivajinagar", value: "28 Mins Non-Stop" },
        { label: "Projected Appreciation", value: "+22% Post Operational Run" }
      ],
      fullContent: [
        "Pune Metro Line 3 is the most consequential infrastructure project in West Pune's history. Connecting the massive 500,000+ workforce of Rajiv Gandhi Infotech Park directly to central Pune, the line transforms Wakad from a suburban node into a hyper-connected core.",
        "Saheel Luxton is positioned just 1.2 km from the upcoming Wakad Chowk Metro station, allowing residents to commute to Infosys, Wipro, and TCS campuses in under 7 minutes, completely bypassing surface traffic.",
        "Global transit real estate studies indicate that residential properties located within 1.5 km of rapid mass transit stations achieve 18% to 25% higher rental yields and commanding resale liquidity compared to distant developments.",
        "For homebuyers and investors, securing a residence at Saheel Luxton during pre-metro construction offers optimal entry valuations before the full operational premium takes effect."
      ]
    },
    {
      id: 'walk-in-closets-4000-lobby-engineering',
      category: 'typologies',
      title: "Architectural Deep Dive: Pune's 1st 4,000 Sq. Ft. Lobby & Designer Walk-In Dressing Closets",
      subtitle: "Why Saheel Luxton's Floor Plans Outclass Conventional Pune 2, 3 & 4 BHKs",
      targetKeywords: ["Pune first 4000 sq ft grand lobby", "apartments with walk in closets Pune", "Saheel Luxton 3 BHK floor plan", "luxury 4 BHK Wakad price"],
      readTime: "8 Min Read",
      summary: "A technical architectural review of Saheel Luxton's zero-wastage carpet floor plates, monolithic RCC shear wall construction, 5-star double-height arrival lobby, and dedicated private dressing corridors.",
      keyHighlights: [
        { label: "Grand Lobby Scale", value: "4,000 Sq. Ft. Double-Height" },
        { label: "Walk-In Closets", value: "Included in 2, 3 & 4 BHKs" },
        { label: "Seismic Safety", value: "IS 1893:2016 Zone-III RCC" },
        { label: "Acoustic Glazing", value: "DGU Sound-Dampening Glass" }
      ],
      fullContent: [
        "Modern luxury is defined by spatial volume and sensory arrival. While most Pune developments allocate minimal carpet to entrance foyers, Saheel Luxton introduces an unprecedented 4,000 sq.ft Double-Height Grand Lobby clad in Italian Statuario marble.",
        "Inside each residence, the master suites feature dedicated walk-in dressing corridors. This private buffer isolates wardrobe spaces from the sleeping sanctuary, enhancing acoustic privacy, luxury aesthetic, and wardrobe organization.",
        "The structural engineering incorporates precision monolithic RCC shear wall formwork, providing superior seismic resilience, seamless wall finishes, and enhanced usable RERA carpet efficiency without awkward beam intrusions.",
        "With Double Glazed Unit (DGU) acoustic windows, external road ambient sound is reduced by up to 35 decibels, creating tranquil sanctuaries in the heart of bustling Wakad."
      ]
    },
    {
      id: 'nri-investment-guide-dubai-usa-pune',
      category: 'nri-investment',
      title: "The Global NRI Investment Blueprint: Why Tech Expats in UAE, USA & UK Choose Wakad",
      subtitle: "High-Yield Rental ROI (5.2%+), FEMA Repatriation & Capital Appreciation Model",
      targetKeywords: ["NRI property investment Pune West", "buy flat in Pune from Dubai UAE", "FEMA compliant real estate Pune", "Saheel Luxton NRI desk"],
      readTime: "9 Min Read",
      summary: "Comprehensive guide for Non-Resident Indians (NRIs) in Dubai, Silicon Valley, London, and Singapore on investing in high-yield luxury real estate in Pune with 100% legal repatriation and clear title governance.",
      keyHighlights: [
        { label: "Gross Rental Yield", value: "5.2% – 6.1% Annually" },
        { label: "Foreign Currency Base", value: "USD, AED, GBP, SGD Desks" },
        { label: "Legal Framework", value: "100% FEMA & RBI Compliant" },
        { label: "Tenant Demographics", value: "IT CXOs, Directors, Tech Leads" }
      ],
      fullContent: [
        "West Pune's real estate corridor represents the highest-conviction asset class for Non-Resident Indians seeking inflation-beating capital appreciation and strong rental cash flows.",
        "Due to the continuous expansion of Hinjawadi IT Park Phase 1, 2, and 3—housing global tech giants like Infosys, Cognizant, Wipro, and TCS—luxury housing in Wakad experiences perennial demand from high-earning corporate professionals.",
        "Saheel Luxton offers a dedicated International NRI Concierge Desk providing virtual video walk-throughs, digital power of attorney (POA) advisory, pre-approved home loan disbursement through NRE/NRO accounts, and hassle-free tenant placement.",
        "Under Reserve Bank of India (RBI) and FEMA regulations, capital proceeds from RERA-registered projects with clear freehold titles like Saheel Luxton are fully repatriable back to the overseas country of residence."
      ]
    },
    {
      id: 'maharera-statutory-trust-governance',
      category: 'legal-finance',
      title: "MahaRERA PM1260002502043 & The 70% Ring-Fenced Escrow Governance Architecture",
      subtitle: "How Statutory Clearances & Clear Freehold Land Titles Protect Homebuyer Capital",
      targetKeywords: ["MahaRERA PM1260002502043 verification", "Saheel Properties legal title", "SBI HDFC approved projects Wakad", "RERA escrow account rule Pune"],
      readTime: "7 Min Read",
      summary: "An institutional compliance report detailing how Saheel Luxton satisfies 100% of statutory environmental, municipal, fire CFO, and MahaRERA escrow account ring-fencing regulations.",
      keyHighlights: [
        { label: "MahaRERA Number", value: "PM1260002502043" },
        { label: "Escrow Ring-Fencing", value: "70% Construction Dedicated" },
        { label: "Approved Banks", value: "SBI, HDFC, ICICI, Axis, BoB" },
        { label: "Land Title", value: "100% Clear Freehold Non-Agri" }
      ],
      fullContent: [
        "Real estate investment security is fundamentally anchored in statutory compliance and financial ring-fencing. Saheel Luxton operates under MahaRERA Registration No. PM1260002502043 with targeted completion by June 2030.",
        "Under strict MahaRERA guidelines, 70% of all customer receivables are directly deposited into a scheduled bank escrow account. These funds can only be withdrawn in proportion to certified structural construction milestones verified by chartered engineers.",
        "The project holds 100% clear freehold land title, State Level Environment Impact Assessment (SEIAA) clearance, CFO Fire NOC, PCMC municipal building sanctions, and aviation height clearances.",
        "India's leading institutional lenders—including State Bank of India (SBI), HDFC Bank, and ICICI Bank—have conducted comprehensive title searches and pre-approved home loans up to 80% for qualified buyers."
      ]
    },
    {
      id: 'golden-triangle-hinjawadi-baner-wakad',
      category: 'micro-markets',
      title: "The West Pune Golden Triangle: Wakad, Hinjawadi & Baner Synergy",
      subtitle: "Why Wakad is the Epicenter of Capital Inflow and Commercial Expansion",
      targetKeywords: ["Wakad vs Baner real estate comparison", "Hinjawadi Wakad Baner golden triangle", "best real estate investment in West Pune", "Saheel Luxton location advantages"],
      readTime: "6 Min Read",
      summary: "Comparative regional analysis detailing why Wakad delivers 25% better carpet-area value than Baner while offering faster commute times to Hinjawadi IT campuses.",
      keyHighlights: [
        { label: "Wakad vs Baner Price Delta", value: "20% - 25% Higher Value in Wakad" },
        { label: "Hinjawadi IT Commute", value: "7 Mins from Saheel Luxton" },
        { label: "Lifestyle Access", value: "Phoenix Mall (5 Mins), Balewadi (9 Mins)" },
        { label: "Rental Tenant Demand", value: "12,000+ New IT Tech Hires/Yr" }
      ],
      fullContent: [
        "The West Pune Golden Triangle—formed by Wakad, Hinjawadi, and Baner—generates over 45% of Pune's total residential real estate demand.",
        "While Baner has reached saturation with older housing stock and inflated price tags exceeding ₹14,000 per sq.ft, Wakad offers brand-new, modern high-rises with world-class amenities at high-value pricing starting from ₹97 Lakhs.",
        "Saheel Luxton sits right at the core of this triangle. Residents can work in Hinjawadi IT Park, socialize at Balewadi High Street, and shop at Phoenix Mall of the Millennium—all within a 10-minute drive.",
        "This balanced lifestyle makes properties in Shankar Kalat Nagar, Wakad the top choice for discerning families, corporate leaders, and real estate investors alike."
      ]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Real Estate Dossiers' },
    { id: 'micro-markets', label: 'Wakad Micro-Markets' },
    { id: 'transit', label: 'Metro 3 & Transit Hubs' },
    { id: 'typologies', label: 'Floor Plans & Architecture' },
    { id: 'nri-investment', label: 'Global NRI Desks' },
    { id: 'legal-finance', label: 'MahaRERA & Legal Trust' }
  ];

  const filteredArticles = articleHubs.filter(art => {
    const matchesTab = activeTab === 'all' || art.category === activeTab;
    const matchesSearch = searchQuery === '' || 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.targetKeywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <section id="programmatic-seo-hub" className="py-24 lg:py-32 relative bg-[#FAF8F5] overflow-hidden border-t border-champagne-500/20">
      
      {/* Gliding Fluid Background Orbs */}
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
            Pune Real Estate Intelligence & Research Engine
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-slate-900 tracking-tight leading-tight"
          >
            Comprehensive Market Dossiers <br />
            <span className="gold-gradient-text">& Saheel Luxton Ecosystem Hub</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-600 text-sm sm:text-base font-normal"
          >
            Explore in-depth market research whitepapers, micro-market infrastructure audits, typology engineering guides, and NRI investment models covering Wakad and Pune.
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
          {filteredArticles.map((article) => (
            <motion.article
              key={article.id}
              whileHover={{ y: -4 }}
              className="p-6 sm:p-7 rounded-3xl ultra-glass border-2 border-champagne-500/30 bg-white shadow-milky-card flex flex-col justify-between group"
            >
              <div className="space-y-3.5">
                
                <div className="flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-champagne-100 text-champagne-800 text-[10px] font-mono font-bold uppercase tracking-wider">
                    {article.category.replace('-', ' ')}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {article.readTime}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold font-cinzel text-slate-900 group-hover:text-champagne-700 transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {article.summary}
                </p>

                {/* Micro Key Stats */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                  {article.keyHighlights.slice(0, 2).map((stat, i) => (
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
                  onClick={() => setSelectedArticle(article)}
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
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
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
                    {selectedArticle.category.replace('-', ' ')} • {selectedArticle.readTime}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-slate-900 leading-tight">
                    {selectedArticle.title}
                  </h3>
                  <p className="text-xs text-champagne-700 font-medium font-cinzel">
                    {selectedArticle.subtitle}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Key Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-milky-50 border border-champagne-400/30">
                {selectedArticle.keyHighlights.map((hl, i) => (
                  <div key={i} className="space-y-0.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">{hl.label}</span>
                    <strong className="text-xs font-bold font-cinzel text-slate-900 block">{hl.value}</strong>
                  </div>
                ))}
              </div>

              {/* Full Article Content */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                {selectedArticle.fullContent.map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              {/* Targeted Keywords Footer */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
                <span className="text-[10px] font-mono uppercase text-champagne-400 font-bold block">
                  Search Entity & Knowledge Graph Keywords:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedArticle.targetKeywords.map((kw, i) => (
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
                    setSelectedArticle(null);
                    onOpenBrochure();
                  }}
                  className="w-full sm:w-auto btn-auric-outline px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider"
                >
                  Download Project Dossier
                </button>

                <button
                  onClick={() => {
                    setSelectedArticle(null);
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
