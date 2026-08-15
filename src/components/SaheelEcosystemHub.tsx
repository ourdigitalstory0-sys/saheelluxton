import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, MapPin, Search, Sparkles, ShieldCheck, ArrowRight, 
  ExternalLink, Layers, Compass, TrendingUp, HelpCircle, CheckCircle2, ChevronRight
} from 'lucide-react';
import { saheelProjectsList, locationHubsList, semanticIntentMatrix, SaheelProject, LocationHub } from '../data/saheelEcosystemData';
import { projectData } from '../data/projectData';

interface SaheelEcosystemHubProps {
  onOpenBooking: () => void;
  onOpenBrochure: () => void;
}

export const SaheelEcosystemHub: React.FC<SaheelEcosystemHubProps> = ({ onOpenBooking, onOpenBrochure }) => {
  const [activeTab, setActiveTab] = useState<'projects' | 'locations' | 'matrix'>('projects');
  const [selectedProject, setSelectedProject] = useState<SaheelProject>(saheelProjectsList[0]);
  const [selectedLocation, setSelectedLocation] = useState<LocationHub>(locationHubsList[0]);

  return (
    <section id="saheel-ecosystem" className="py-24 lg:py-32 relative bg-gradient-to-b from-[#FAF8F5] via-[#FFFFFF] to-[#FAF8F5] overflow-hidden border-t border-champagne-500/20">
      
      {/* Subtle Ambient Glows */}
      <motion.div 
        animate={{ y: [0, -30, 0], x: [0, 30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 -right-48 w-[600px] h-[600px] bg-champagne-300/15 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        
        {/* Section Header with E-E-A-T Authority Badge */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full ultra-glass border-champagne-500/40 text-champagne-800 text-xs font-bold uppercase tracking-widest shadow-sm"
          >
            <Building2 className="w-4 h-4 text-champagne-600" />
            Saheel Properties Portfolio & Micro-Market Directory
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-slate-900 tracking-tight leading-tight"
          >
            Explore the Complete <br />
            <span className="gold-gradient-text">Saheel Properties Ecosystem</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-600 text-sm sm:text-base font-normal"
          >
            Discover certified residential landmarks across Wakad, Hinjawadi, Mahalunge, Tathawade, and PCMC with genuine RERA verification, live price benchmarks, and architectural specifications.
          </motion.p>

          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "112px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-transparent via-champagne-500 to-transparent mx-auto mt-4"
          />
        </div>

        {/* Dynamic Navigation Pill Bar (100% Mobile & Touch Friendly) */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 rounded-2xl ultra-glass border border-champagne-500/30 bg-white/90 shadow-sm gap-1 sm:gap-2">
            {[
              { id: 'projects', label: '1. Project Directory', icon: Building2 },
              { id: 'locations', label: '2. Location & Micro-Markets', icon: MapPin },
              { id: 'matrix', label: '3. Buyer Intent & Search Index', icon: Layers }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`min-h-[44px] px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'btn-auric text-white shadow-gold-glow'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-champagne-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: Saheel Projects Showcase */}
        {activeTab === 'projects' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
            {/* Left Project Selector Column */}
            <div className="lg:col-span-4 space-y-2.5">
              <span className="text-[11px] font-mono text-champagne-700 uppercase font-bold tracking-wider block mb-2">
                Select Saheel Landmark:
              </span>
              {saheelProjectsList.map((proj) => {
                const isSelected = selectedProject.id === proj.id;
                return (
                  <motion.button
                    key={proj.id}
                    whileHover={{ x: 4 }}
                    onClick={() => setSelectedProject(proj)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                      isSelected
                        ? 'bg-gradient-to-r from-champagne-100 via-white to-champagne-50 border-champagne-500 shadow-md ring-1 ring-champagne-400'
                        : 'bg-white border-slate-200 hover:border-champagne-400 hover:bg-champagne-50/40 shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-champagne-700 transition-colors font-cinzel">
                        {proj.name}
                      </div>
                      <div className="text-[11px] text-slate-500 font-normal">
                        {proj.locality}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[11px] font-mono font-bold text-champagne-800">
                        {proj.startingPrice}
                      </span>
                      <ChevronRight className="w-4 h-4 text-champagne-600 ml-auto group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Right Project Detail Dossier */}
            <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl ultra-glass border-2 border-champagne-500/40 bg-white shadow-milky-card space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne-100 text-champagne-800 text-[10px] font-mono font-bold uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-champagne-600" /> {selectedProject.category}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black font-cinzel text-slate-900 mt-1">
                    {selectedProject.name}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-champagne-600" /> {selectedProject.locality}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Starting From</span>
                  <strong className="text-2xl font-black font-cinzel gold-gradient-text">{selectedProject.startingPrice}</strong>
                </div>
              </div>

              {/* Highlight Banner */}
              <div className="p-4 rounded-2xl bg-milky-100 border border-champagne-400/40 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-champagne-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-slate-900 font-cinzel">Signature Feature:</div>
                  <div className="text-xs text-slate-700 mt-0.5">{selectedProject.keyHighlight}</div>
                </div>
              </div>

              {/* Configurations & Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200">
                  <span className="text-slate-500 uppercase text-[10px] font-bold block">Configurations</span>
                  <div className="font-bold text-slate-900 mt-1">{selectedProject.configurations.join(', ')}</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200">
                  <span className="text-slate-500 uppercase text-[10px] font-bold block">RERA Status</span>
                  <div className="font-mono font-bold text-champagne-700 mt-1">{selectedProject.reraNumber || 'Verified'}</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200">
                  <span className="text-slate-500 uppercase text-[10px] font-bold block">Project Status</span>
                  <div className="font-bold text-emerald-700 mt-1">{selectedProject.status}</div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                {selectedProject.description}
              </p>

              {/* Associated Verified Keywords Cloud */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold mb-1.5">
                  Associated Certified Search Entities:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.keywords.map((kw, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-milky-200 text-slate-700 text-[10px] font-medium border border-slate-300">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onOpenBooking}
                  className="btn-auric px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-gold-glow cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" /> Book Site Visit / Consultation
                </button>
                <button
                  onClick={onOpenBrochure}
                  className="btn-auric-outline px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Request Official Brochure
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Location & Micro-Markets Hub */}
        {activeTab === 'locations' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
            {/* Left Location Selector */}
            <div className="lg:col-span-4 space-y-2.5">
              <span className="text-[11px] font-mono text-champagne-700 uppercase font-bold tracking-wider block mb-2">
                Select Corridor / Suburb:
              </span>
              {locationHubsList.map((loc) => {
                const isSelected = selectedLocation.name === loc.name;
                return (
                  <motion.button
                    key={loc.name}
                    whileHover={{ x: 4 }}
                    onClick={() => setSelectedLocation(loc)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between group ${
                      isSelected
                        ? 'bg-gradient-to-r from-champagne-100 via-white to-champagne-50 border-champagne-500 shadow-md ring-1 ring-champagne-400'
                        : 'bg-white border-slate-200 hover:border-champagne-400 hover:bg-champagne-50/40 shadow-sm'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-champagne-700 transition-colors font-cinzel">
                        {loc.name}
                      </div>
                      <div className="text-[10px] text-slate-500 font-normal line-clamp-1">
                        {loc.tag}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[11px] font-mono font-bold text-emerald-700">
                        {loc.growthYoY}
                      </span>
                      <ChevronRight className="w-4 h-4 text-champagne-600 ml-auto group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Right Location Dossier */}
            <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl ultra-glass border-2 border-champagne-500/40 bg-white shadow-milky-card space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne-100 text-champagne-800 text-[10px] font-mono font-bold uppercase">
                    <Compass className="w-3.5 h-3.5 text-champagne-600" /> {selectedLocation.tag}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black font-cinzel text-slate-900 mt-1">
                    {selectedLocation.name} Real Estate Corridor
                  </h3>
                  <p className="text-xs text-slate-600 font-medium">
                    {selectedLocation.headline}
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Avg Property Rate</span>
                  <strong className="text-xl font-bold font-mono text-slate-900">{selectedLocation.avgRate}</strong>
                </div>
              </div>

              {/* Key Connectivity */}
              <div className="p-4 rounded-2xl bg-milky-100 border border-slate-200 space-y-1">
                <span className="text-[10px] font-mono uppercase text-champagne-700 font-bold">Corridor Infrastructure & Growth Drivers:</span>
                <p className="text-xs text-slate-800 font-medium leading-relaxed">
                  {selectedLocation.keyConnectivity}
                </p>
              </div>

              {/* Projects in this Corridor */}
              <div>
                <span className="text-xs font-bold font-cinzel text-slate-900 block mb-2">Saheel Landmarks in this Locality:</span>
                <div className="flex flex-wrap gap-2">
                  {selectedLocation.projects.map((p, idx) => (
                    <span key={idx} className="px-3.5 py-1.5 rounded-xl bg-champagne-100 text-champagne-800 text-xs font-bold border border-champagne-400">
                      🏢 {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* High-Intent Search Entities for this Locality */}
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-bold mb-1.5">
                  Frequently Searched Terms in {selectedLocation.name}:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedLocation.topKeywords.map((kw, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-lg bg-milky-200 text-slate-700 text-[10px] font-medium border border-slate-300">
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Buyer Intent & Semantic Search Index */}
        {activeTab === 'matrix' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {semanticIntentMatrix.map((item, idx) => (
                <div key={idx} className="p-6 rounded-3xl ultra-glass border border-champagne-500/25 bg-white shadow-milky-card space-y-3">
                  <h4 className="text-sm font-bold font-cinzel text-slate-900 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-champagne-600"></span>
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 font-normal leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                    {item.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="px-2 py-0.5 rounded-md bg-milky-100 text-slate-700 text-[10px] font-medium border border-slate-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
