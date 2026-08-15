import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, MapPin, Building, ShieldCheck, ArrowRight, BarChart3, Sparkles } from 'lucide-react';
import { seoArticlesData, SEOArticle } from '../data/seoArticlesData';

interface MicroMarketInsightsProps {
  onOpenBooking: () => void;
  onSelectArticle: (article: SEOArticle) => void;
}

export const MicroMarketInsights: React.FC<MicroMarketInsightsProps> = ({ onOpenBooking, onSelectArticle }) => {
  const microMarkets = [
    {
      locality: "Wakad (Saheel Luxton Hub)",
      rates: "₹9,200 - ₹12,500 / sq.ft",
      appreciation: "+14.8% YoY",
      rentalYield: "4.8% - 5.6%",
      keyDriver: "Phoenix Mall of the Millennium, Metro Line 3, Hinjawadi Proximity",
      highlight: "Epicenter of luxury high-rise development in West Pune"
    },
    {
      locality: "Baner / Balewadi High St.",
      rates: "₹11,000 - ₹14,500 / sq.ft",
      appreciation: "+11.2% YoY",
      rentalYield: "3.8% - 4.4%",
      keyDriver: "Cosmopolitan high-street retail, fine dining & upscale IT corporate hubs",
      highlight: "Premium lifestyle residential benchmark"
    },
    {
      locality: "Hinjawadi (Phase 1, 2, 3)",
      rates: "₹7,800 - ₹10,500 / sq.ft",
      appreciation: "+12.4% YoY",
      rentalYield: "5.2% - 6.0%",
      keyDriver: "400,000+ tech workforce, Rajiv Gandhi Infotech Park",
      highlight: "Top rental investment and walk-to-work IT capital"
    },
    {
      locality: "Mahalunge (Hi-Tech City)",
      rates: "₹8,200 - ₹10,200 / sq.ft",
      appreciation: "+13.1% YoY",
      rentalYield: "4.2% - 4.8%",
      keyDriver: "PMRDA planned mega-townships, Hinjawadi-Mahalunge bridge connectivity",
      highlight: "Rapidly appreciating integrated township destination"
    }
  ];

  return (
    <section id="pune-real-estate-insights" className="py-24 lg:py-32 relative bg-gradient-to-b from-[#FAF8F5] via-[#F4F0E8] to-[#FAF8F5] overflow-hidden">
      
      {/* Ambient Glows */}
      <motion.div 
        animate={{ y: [0, -35, 0], x: [0, 25, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -right-48 w-[600px] h-[600px] bg-champagne-300/20 rounded-full blur-3xl pointer-events-none"
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
            <BarChart3 className="w-4 h-4 text-champagne-600" />
            Pune Real Estate Market Intelligence 2026
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-slate-900 tracking-tight leading-tight"
          >
            West Pune Real Estate Dynamics: <br />
            <span className="gold-gradient-text">Wakad, Hinjawadi, Baner & Mahalunge</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-600 text-sm sm:text-base font-normal"
          >
            In-depth property capital rates, rental yields, infrastructure catalysts, and investment trends across Pune's fastest-growing luxury residential corridors.
          </motion.p>

          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "112px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-transparent via-champagne-500 to-transparent mx-auto mt-4"
          />
        </div>

        {/* Micro Market Comparison Table */}
        <motion.div 
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="ultra-glass rounded-3xl overflow-hidden border-2 border-champagne-500/40 shadow-milky-hover bg-white mb-16"
        >
          <div className="p-6 sm:p-8 bg-gradient-to-r from-champagne-100 via-white to-champagne-50 border-b border-champagne-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono text-champagne-700 uppercase font-bold tracking-wider">Benchmark Matrix</span>
              <h3 className="text-xl font-bold font-cinzel text-slate-900 mt-0.5">West Pune Corridor Price & Yield Index</h3>
            </div>
            <span className="text-xs font-bold text-champagne-800 bg-champagne-100 px-4 py-1.5 rounded-full border border-champagne-400">
              Q3 2026 Live Market Data
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm text-slate-700">
              <thead className="bg-milky-100 text-[11px] font-bold uppercase tracking-wider text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="p-4 sm:p-5">Locality Corridor</th>
                  <th className="p-4 sm:p-5">Capital Values</th>
                  <th className="p-4 sm:p-5">YoY Growth</th>
                  <th className="p-4 sm:p-5">Rental Yield</th>
                  <th className="p-4 sm:p-5">Growth Catalysts</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {microMarkets.map((market, idx) => (
                  <tr key={idx} className="hover:bg-champagne-50/40 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-slate-900 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-champagne-600 shrink-0" />
                      <div>
                        <div>{market.locality}</div>
                        <div className="text-[10px] text-champagne-700 font-normal font-mono">{market.highlight}</div>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 font-mono font-bold text-slate-900">{market.rates}</td>
                    <td className="p-4 sm:p-5 font-mono font-extrabold text-emerald-700">{market.appreciation}</td>
                    <td className="p-4 sm:p-5 font-mono font-bold text-slate-800">{market.rentalYield}</td>
                    <td className="p-4 sm:p-5 text-xs text-slate-600 font-normal">{market.keyDriver}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Featured Market Intelligence Articles / Whitepapers */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono text-champagne-700 uppercase font-bold tracking-wider">Research Whitepapers</span>
              <h3 className="text-2xl font-bold font-cinzel text-slate-900">Pune Real Estate Dossiers</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {seoArticlesData.map((art) => (
              <motion.div
                key={art.id}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => onSelectArticle(art)}
                className="ultra-glass rounded-3xl p-6 sm:p-7 border-champagne-500/25 hover:border-champagne-500 shadow-milky-card hover:shadow-milky-hover transition-all duration-300 flex flex-col justify-between group bg-white cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-champagne-700 font-bold">
                    <span>{art.category}</span>
                    <span>{art.readTime}</span>
                  </div>

                  <h4 className="text-base font-bold font-cinzel text-slate-900 group-hover:text-champagne-700 transition-colors leading-snug">
                    {art.title}
                  </h4>

                  <p className="text-xs text-slate-600 font-normal line-clamp-3 leading-relaxed">
                    {art.metaDescription}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-champagne-800">
                  <span>Read Full Dossier</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-champagne-600" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
