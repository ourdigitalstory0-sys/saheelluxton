import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building2, Layers, Compass, DollarSign, CheckCircle2, ArrowLeft, Download, Sparkles, ShieldCheck, Phone, Train } from 'lucide-react';
import { projectData } from '../data/projectData';

interface DynamicPageRendererProps {
  slug: string;
  onGoHome: () => void;
  onOpenBooking: () => void;
  onOpenBrochure: () => void;
}

export const DynamicPageRenderer: React.FC<DynamicPageRendererProps> = ({
  slug,
  onGoHome,
  onOpenBooking,
  onOpenBrochure
}) => {
  // Parse slug segments: e.g. "wakad-2-bhk-luxury-flats-price-cost-sheet-floor-plans"
  const formattedTitle = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Format headline keywords
  const localityMatch = slug.split('-')[0] || 'Wakad';
  const formattedLocality = localityMatch.charAt(0).toUpperCase() + localityMatch.slice(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = `${formattedTitle} | Saheel Luxton Wakad Official`;

    // Programmatically inject dynamic Google Maps Place & RealEstateListing schema
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.id = 'dynamic-pseo-maps-schema';
    schemaScript.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "RealEstateListing",
      "name": `${formattedTitle} - Saheel Luxton Wakad`,
      "url": window.location.href,
      "mainEntity": {
        "@type": "ApartmentComplex",
        "name": "Luxton By Saheel",
        "hasMap": projectData.googleMapsUrl,
        "telephone": projectData.contactPhone,
        "email": projectData.contactEmail,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "S. No. 111, Near Phoenix Mall of the Millennium",
          "addressLocality": "Wakad",
          "addressRegion": "Maharashtra",
          "postalCode": "411057",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 18.6041,
          "longitude": 73.7555
        }
      }
    });

    const existing = document.getElementById('dynamic-pseo-maps-schema');
    if (existing) existing.remove();
    document.head.appendChild(schemaScript);

    return () => {
      const el = document.getElementById('dynamic-pseo-maps-schema');
      if (el) el.remove();
    };
  }, [slug]);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 pt-24 pb-20 px-4 sm:px-6 relative selection:bg-champagne-300 selection:text-slate-950">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-champagne-200/30 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-8">
        
        {/* Navigation Top Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={onGoHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full ultra-glass border border-champagne-400/40 text-xs font-bold text-slate-800 hover:bg-white transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-champagne-700" /> Return to Master Portal
          </button>

          <span className="text-[11px] font-mono text-champagne-800 font-bold uppercase bg-champagne-100 px-3 py-1 rounded-full">
            MahaRERA: PM1260002502043
          </span>
        </div>

        {/* Hero Article Header */}
        <header className="space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne-100 text-champagne-900 text-xs font-mono font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-champagne-700" />
            Programmatic Intelligence Node • {formattedLocality} Market Hub
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-slate-900 leading-tight">
            {formattedTitle} at <br />
            <span className="gold-gradient-text">Saheel Luxton Wakad, Pune</span>
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-3xl">
            Explore dedicated floor plans, RERA carpet dimensions, pre-approved bank loans, and transit time benchmarks for luxury residences at Saheel Luxton near {formattedLocality} and Phoenix Mall of the Millennium.
          </p>
        </header>

        {/* Fast Specs Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-5 rounded-3xl ultra-glass border-2 border-champagne-500/30 bg-white shadow-sm">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Starting Price</span>
            <strong className="text-base sm:text-lg font-bold font-cinzel gold-gradient-text block">₹ 97 Lakhs*</strong>
            <span className="text-[10px] text-slate-500 block">All-Inclusive Available</span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">RERA Usable Carpet</span>
            <strong className="text-base sm:text-lg font-bold font-cinzel text-slate-900 block">753 – 1,458 Sq. Ft.</strong>
            <span className="text-[10px] text-slate-500 block">2, 3 & 4 BHK Variants</span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Grand Lobby Area</span>
            <strong className="text-base sm:text-lg font-bold font-cinzel text-slate-900 block">4,000 Sq. Ft.</strong>
            <span className="text-[10px] text-slate-500 block">Double-Height Italian Marble</span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">RERA Possession</span>
            <strong className="text-base sm:text-lg font-bold font-cinzel text-emerald-800 block">June 2030</strong>
            <span className="text-[10px] text-slate-500 block">70% Escrow Ring-Fenced</span>
          </div>
        </div>

        {/* Rich Long-Form Authority Editorial */}
        <article className="p-6 sm:p-8 rounded-3xl ultra-glass border-2 border-champagne-500/30 bg-white shadow-milky-card space-y-6 text-sm text-slate-700 leading-relaxed">
          <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-slate-900 border-b border-slate-200 pb-3">
            Why Saheel Luxton Commands the #1 Luxury Benchmark in {formattedLocality}
          </h2>

          <p>
            Situated at S. No. 111 Shankar Kalat Nagar, Wakad, <strong>Saheel Luxton</strong> represents the culmination of 25 years of architectural excellence by Saheel Properties. Designed with a signature 30-storey elevation, the project integrates Pune's first 4,000 sq.ft hotel-grade grand arrival lobby with high-speed Otis elevators and monolithic RCC shear wall construction.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-milky-50 border border-slate-200 space-y-2">
              <h3 className="text-sm font-bold font-cinzel text-slate-900 flex items-center gap-2">
                <Compass className="w-4 h-4 text-champagne-700" /> Vastu East Alignment & Closets
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                All 2, 3, and 4 BHK layouts are engineered with dedicated master dressing walk-in closets, ensuring an acoustic buffer and optimal privacy. 100% east-facing sunrise entrances available.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-milky-50 border border-slate-200 space-y-2">
              <h3 className="text-sm font-bold font-cinzel text-slate-900 flex items-center gap-2">
                <Train className="w-4 h-4 text-champagne-700" /> Rapid Transit & Phoenix Mall
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Positioned 1.8 km from Phoenix Mall of the Millennium and 1.2 km from Pune Metro Line 3 Wakad Chowk Station, residents enjoy effortless transit to Hinjawadi IT Park Phase 1 in 7 minutes.
              </p>
            </div>
          </div>

          <h3 className="text-lg font-bold font-cinzel text-slate-900 pt-2">
            Financial & Legal Clearances:
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-champagne-600 shrink-0 mt-0.5" />
              <span><strong>MahaRERA Registered</strong>: PM1260002502043 with targeted completion by June 2030.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-champagne-600 shrink-0 mt-0.5" />
              <span><strong>Approved Financial Lenders</strong>: SBI, HDFC Bank, ICICI Bank, Axis Bank with up to 80% LTV disbursement.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-champagne-600 shrink-0 mt-0.5" />
              <span><strong>Clear Freehold Land Title</strong>: 100% litigation-free land title with non-agricultural municipal sanctions.</span>
            </li>
          </ul>
        </article>

        {/* Bottom Booking & Brochure CTA Bar */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-mono text-champagne-400 uppercase tracking-widest font-bold">
              Exclusive Developer Inventory
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-white">
              Schedule Your Private VIP Experience at Saheel Luxton
            </h3>
            <p className="text-xs text-slate-400">
              Explore 4,000 sq.ft lobby scale, rooftop views & bespoke floor plan blueprints.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onOpenBrochure}
              className="w-full sm:w-auto btn-auric-outline px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white border-champagne-400 hover:bg-white/10 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" /> Download Blueprint
            </button>
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto btn-auric px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-slate-950 shadow-gold-glow flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" /> Book VIP Visit
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
