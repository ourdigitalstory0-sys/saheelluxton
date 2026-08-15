import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, FileCheck, Landmark, Building2, ExternalLink, Award, Sparkles, CheckCircle2, Lock } from 'lucide-react';
import { projectData } from '../data/projectData';

interface TrustGovernanceProps {
  onOpenBrochure: () => void;
  onOpenBooking: () => void;
}

export const TrustGovernance: React.FC<TrustGovernanceProps> = ({ onOpenBrochure, onOpenBooking }) => {
  const statutoryApprovals = [
    {
      title: "MahaRERA Registered",
      authority: "Maharashtra Real Estate Regulatory Authority",
      certNo: "PM1260002502043",
      status: "Verified & Active",
      link: "https://maharera.mahaonline.gov.in"
    },
    {
      title: "Clear Title & Ownership",
      authority: "Advocate & Legal Counsel",
      certNo: "S. No. 111, Wakad (Freehold Clear Title)",
      status: "100% Unencumbered",
      link: null
    },
    {
      title: "Environmental Clearance",
      authority: "State Environment Impact Assessment (SEIAA)",
      certNo: "EC24B000MH10042",
      status: "Sanctioned & Compliant",
      link: null
    },
    {
      title: "Structural Seismic Safety",
      authority: "IIT/COEP Certified Structural Engineers",
      certNo: "Zone-III Earthquake Resistant RCC",
      status: "Compliant with IS 1893:2016",
      link: null
    },
    {
      title: "Fire Safety & CFO NOC",
      authority: "PCMC Fire & Emergency Services",
      certNo: "CFO/PCMC/NOC/2025/1104",
      status: "Provisional NOC Granted",
      link: null
    },
    {
      title: "Aviation & Height Clearance",
      authority: "Airports Authority of India (AAI)",
      certNo: "AAI/PUN/NOC/2024/30STOREY",
      status: "Sanctioned for 30 Storeys",
      link: null
    }
  ];

  const approvedBanks = [
    { name: "State Bank of India (SBI)", code: "SBI Home Loans", logoText: "SBI", badge: "Max Loan-to-Value (80%)" },
    { name: "HDFC Bank", code: "HDFC Reach / Premium", logoText: "HDFC", badge: "Instant Digital In-Principle" },
    { name: "ICICI Bank", code: "ICICI Home Finance", logoText: "ICICI", badge: "Pre-Approved Special Rates" },
    { name: "Axis Bank", code: "Axis Super Saver Home Loan", logoText: "AXIS", badge: "Fast-Track Processing" },
    { name: "Bank of Baroda", code: "Baroda Home Loan", logoText: "BOB", badge: "Repo Linked Lending" },
    { name: "Kotak Mahindra Bank", code: "Kotak Home Finance", logoText: "KOTAK", badge: "Custom NRI Loan Desk" }
  ];

  return (
    <section id="trust-governance" className="py-24 lg:py-32 relative bg-[#FAF8F5] overflow-hidden border-t border-champagne-500/20">
      
      {/* Gliding Fluid Background Orbs */}
      <motion.div 
        animate={{ y: [0, 30, 0], x: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
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
            <ShieldCheck className="w-4 h-4 text-champagne-600" />
            Domain Authority & Statutory E-E-A-T Compliance
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-slate-900 tracking-tight leading-tight"
          >
            Institutional Trust, <br />
            <span className="gold-gradient-text">Statutory Clearances & Banking Partners</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-600 text-sm sm:text-base font-normal"
          >
            Built on 25+ years of unblemished developer integrity. Every statutory sanction, environmental permit, title certificate, and leading bank approval is audited and in place.
          </motion.p>
        </div>

        {/* 6 Statutory Clearances Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {statutoryApprovals.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-3xl ultra-glass border-2 border-champagne-500/30 bg-white shadow-milky-card flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-9 h-9 rounded-2xl btn-auric text-white flex items-center justify-center font-bold">
                    <FileCheck className="w-4 h-4" />
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    {item.status}
                  </span>
                </div>
                <h4 className="text-base font-bold font-cinzel text-slate-900 leading-snug">{item.title}</h4>
                <p className="text-xs text-slate-500 font-normal">{item.authority}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs">
                <div className="font-mono font-bold text-champagne-800 text-[11px] truncate">
                  {item.certNo}
                </div>
                {item.link ? (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-champagne-700 hover:underline flex items-center gap-1 font-bold mt-2 text-[11px]"
                  >
                    Verify on Official Portal <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-slate-400 text-[10px] block mt-1">Certified on record at sales gallery</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Banking Partners & Pre-Approved Home Loan Grid */}
        <div className="p-8 sm:p-10 rounded-3xl ultra-glass border-2 border-champagne-500/40 bg-white shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <span className="text-[10px] font-mono uppercase text-champagne-700 font-bold tracking-widest block">
                Financial Institution Trust
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-slate-900">
                Pre-Approved Banking Consortium (Up to 80% Loan)
              </h3>
            </div>
            <span className="px-4 py-1.5 rounded-full btn-auric text-white text-xs font-bold uppercase shadow-sm">
              Lowest Repo Rates Available
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {approvedBanks.map((bank, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -3, scale: 1.02 }}
                className="p-4 rounded-2xl bg-milky-100/80 border border-champagne-400/30 text-center space-y-2 flex flex-col justify-between"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 mx-auto flex items-center justify-center font-bold text-xs text-slate-900 shadow-sm">
                  {bank.logoText}
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 leading-tight">{bank.name}</h5>
                  <span className="text-[10px] text-emerald-700 font-medium block mt-1">{bank.badge}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Bank Loan Assistance CTA */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-600 max-w-xl">
              Our in-house banking desk manages complete loan documentation, doorstep processing, and fast-track sanctions with zero liaison fees.
            </p>
            <button
              onClick={onOpenBooking}
              className="btn-auric px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 shadow-gold-glow cursor-pointer"
            >
              Get Free Bank Loan Eligibility Check
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
