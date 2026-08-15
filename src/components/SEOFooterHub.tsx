import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, ExternalLink, ShieldCheck, Globe, Search, Building2, CheckCircle2, BookmarkCheck } from 'lucide-react';
import { projectData } from '../data/projectData';

export const SEOFooterHub: React.FC = () => {
  const keywordClusters = [
    {
      category: "Popular Typologies in West Pune",
      items: [
        "2 BHK in Wakad Pune", "3 BHK in Wakad Pune", "4 BHK in Wakad Pune",
        "2 BHK in Hinjawadi Phase 1", "3 BHK in Hinjawadi", "4 BHK in Baner",
        "3 BHK in Mahalunge Pune", "4 BHK in Mahalunge", "Duplex Flats in Pune",
        "Sky Duplex in Wakad", "Simplex & Penthouse in Wakad", "5 BHK Luxury Flats Pune"
      ]
    },
    {
      category: "Top Real Estate Corridors & Micro-Markets",
      items: [
        "Wakad Real Estate Market", "Hinjawadi IT Park Real Estate", "Baner Luxury Homes",
        "Mahalunge Township Projects", "Balewadi High Street Flats", "Punawale Residential Projects",
        "Tathawade Ongoing Projects", "Mumbai-Pune Expressway Properties", "PMRDA Metro Line 3 Corridor",
        "Near Phoenix Mall of the Millennium Properties", "Pimpri Chinchwad Luxury Homes", "West Pune Growth Corridor"
      ]
    },
    {
      category: "Saheel Properties Landmark Search Queries",
      items: [
        "Saheel Properties Luxton Wakad Pune", "Luxton by Saheel price list", "Saheel Luxton brochure PDF",
        "Saheel Luxton floor plans", "Saheel Luxton MahaRERA PM1260002502043", "Saheel Properties ongoing projects",
        "Saheel Properties reviews", "Saheel I-Trend Wakad", "Saheel Fortune Park",
        "Saheel ITrend Life Wakad", "Saheel Itrend Futura Mahalunge", "Best builders in Pune"
      ]
    },
    {
      category: "Luxury Lifestyle & Architectural Inclusions",
      items: [
        "Flats with 4000 sq ft grand lobby", "5 Star Rooftop Aqua Theatre Pune", "Apartments with designer walk-in closets",
        "30 Storey high rise towers Wakad", "Vastu compliant flats in Wakad", "Gated township in Mahalunge Hinjawadi",
        "Earthquake resistant RCC shear wall homes", "Luxury amenities swimming pool gym sky deck",
        "Bank approved home loans SBI HDFC ICICI", "Zero brokerage builder direct site visits"
      ]
    }
  ];

  const breadcrumbs = [
    { name: "Home", url: "https://www.saheeluxton.in/" },
    { name: "Maharashtra Real Estate", url: "https://www.saheeluxton.in/#pune" },
    { name: "Pune Properties", url: "https://www.saheeluxton.in/#location" },
    { name: "Wakad Luxury Projects", url: "https://www.saheeluxton.in/#overview" },
    { name: "Saheel Luxton (MahaRERA PM1260002502043)", url: "https://www.saheeluxton.in/#plans" }
  ];

  return (
    <section className="bg-[#FAF8F5] text-slate-700 py-16 border-t border-champagne-500/20 text-xs relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12 relative z-10">
        
        {/* Schema-Ready Visual Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="p-3.5 rounded-2xl ultra-glass border border-champagne-500/20 bg-white/90 shadow-sm">
          <ol className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-slate-600">
            {breadcrumbs.map((crumb, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <a href={crumb.url} className="hover:text-champagne-700 transition-colors">
                  {crumb.name}
                </a>
                {idx < breadcrumbs.length - 1 && <span className="text-slate-300">/</span>}
              </li>
            ))}
          </ol>
        </nav>

        {/* Google Maps & Google Business Entity Sync Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 rounded-3xl ultra-glass border-2 border-champagne-500/40 bg-white shadow-milky-card">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne-100 text-champagne-800 text-[11px] font-bold font-mono uppercase">
              <Globe className="w-3.5 h-3.5 text-champagne-600" /> Google Ecosystem & Local Business Verified
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-slate-900">
              Official Site & Google Business Location
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Located at <strong>S. No. 111, Near Phoenix Mall of the Millennium, Wakad, Pune - 411057</strong>. Verified on Google Maps (Geo Coordinates: 18.6041° N, 73.7555° E) with direct arterial access to Mumbai-Pune Expressway, Hinjawadi Phase 1, and Baner.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={projectData.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-auric px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-gold-glow"
              >
                <Navigation className="w-3.5 h-3.5" /> Navigate via Google Maps
              </a>
              <a
                href="https://maharera.mahaonline.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-auric-outline px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-champagne-600" /> MahaRERA PM1260002502043
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 p-4 rounded-2xl bg-milky-100 border border-slate-200 space-y-2 text-[11px]">
            <div className="font-bold text-slate-900 flex items-center gap-1.5 font-cinzel">
              <Building2 className="w-4 h-4 text-champagne-600" /> Key Project Coordinates:
            </div>
            <div className="space-y-1 font-mono text-slate-600">
              <div>• Developer: <strong className="text-slate-900">Saheel Properties</strong></div>
              <div>• Project Name: <strong className="text-slate-900">Luxton By Saheel</strong></div>
              <div>• Locality: <span className="text-slate-900">Wakad, West Pune</span></div>
              <div>• RERA No: <span className="text-champagne-700 font-bold">{projectData.reraNo}</span></div>
              <div>• Pin Code: <span className="text-slate-900">411057</span></div>
            </div>
          </div>
        </div>

        {/* Extensive 4-Column Real Estate Keyword Index */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <Search className="w-4 h-4 text-champagne-600" />
            <h4 className="text-sm font-bold font-cinzel text-slate-900 uppercase tracking-wider">
              Pune Real Estate Search Index & High-Weightage Keywords
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keywordClusters.map((cluster, i) => (
              <div key={i} className="space-y-2.5">
                <h5 className="text-xs font-bold text-champagne-800 uppercase tracking-wider font-mono">
                  {cluster.category}
                </h5>
                <ul className="space-y-1.5 text-[11px] text-slate-600">
                  {cluster.items.map((kw, idx) => (
                    <li key={idx} className="hover:text-champagne-700 transition-colors flex items-center gap-1.5">
                      <span className="text-champagne-400">•</span>
                      <span>{kw}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
