import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, Sparkles, ShieldCheck, MessageCircle, MapPin } from 'lucide-react';
import { projectData } from '../data/projectData';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenBrochure?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenBrochure }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
    window.history.replaceState(null, '', window.location.pathname);
  };

  const navLinks = [
    { label: 'Overview', id: 'overview' },
    { label: 'Highlights', id: 'highlights' },
    { label: 'Tower', id: 'tower-explorer' },
    { label: 'Amenities', id: 'amenities' },
    { label: 'Floor Plans', id: 'plans' },
    { label: 'Pricing & EMI', id: 'pricing' },
    { label: 'Location', id: 'location' },
    { label: 'Market Insights', id: 'pune-real-estate-insights' },
    { label: 'FAQs', id: 'faqs' },
    { label: 'Gallery', id: 'gallery' },
    { label: 'Why Luxton', id: 'comparison' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'ultra-glass-nav py-2.5 sm:py-3 shadow-md' 
        : 'bg-gradient-to-b from-[#FAF8F5]/98 via-[#FAF8F5]/85 to-transparent py-3.5 sm:py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        
        {/* Brand Dual Logos: Luxton + Saheel Properties (Enlarged, Balanced & High-Impact) */}
        <a 
          href="/" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            window.history.replaceState(null, '', window.location.pathname);
          }}
          className="flex items-center gap-3 sm:gap-4 md:gap-5 group shrink-0 min-h-[48px]"
          title="Luxton by Saheel Properties Wakad Pune"
        >
          {/* Luxton Emblem & Wordmark Logo */}
          <img 
            src="/logos/luxton-logo.jpg" 
            alt="Luxton By Saheel Logo" 
            className="h-11 sm:h-13 md:h-15 w-auto max-w-[140px] sm:max-w-[175px] md:max-w-[210px] object-contain rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-200 shrink-0" 
          />
          
          {/* Subtle Vertical Divider */}
          <div className="h-8 sm:h-10 md:h-11 w-px bg-slate-300/90 shrink-0" />
          
          {/* Saheel Properties Developer Logo */}
          <img 
            src="/logos/saheel-developer-logo.webp" 
            alt="Saheel Properties Developer Logo" 
            className="h-8 sm:h-10 md:h-11 w-auto max-w-[110px] sm:max-w-[140px] md:max-w-[165px] object-contain shrink-0 group-hover:opacity-90 transition-opacity" 
          />
        </a>

        {/* Floating Pill Menu Container for Large screens */}
        <nav 
          onMouseLeave={() => setHoveredIndex(null)}
          className="hidden xl:flex items-center p-1.5 rounded-full ultra-glass border border-champagne-500/30 bg-white/85 shadow-sm relative"
        >
          {navLinks.slice(0, 9).map((link, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <a
                key={link.label}
                href="/"
                onClick={(e) => handleNavClick(e, link.id)}
                onMouseEnter={() => setHoveredIndex(idx)}
                className={`relative px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-colors z-10 ${
                  isHovered ? 'text-slate-950 font-extrabold' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                {isHovered && (
                  <motion.div
                    layoutId="navPillGlider"
                    className="absolute inset-0 bg-gradient-to-r from-champagne-100 via-champagne-200 to-champagne-100 rounded-full border border-champagne-400/50 shadow-sm -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Desktop Action Suite */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {/* Direct Concierge Call */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={`tel:${projectData.contactPhone}`}
            className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-full ultra-glass border border-champagne-500/40 text-slate-800 hover:text-slate-950 hover:bg-champagne-50 text-xs font-bold transition-all shadow-sm min-h-[42px]"
            title={`Call Concierge: ${projectData.contactPhone}`}
          >
            <span className="w-7 h-7 rounded-full bg-champagne-200/80 flex items-center justify-center text-champagne-800">
              <Phone className="w-3.5 h-3.5" />
            </span>
            <span className="font-mono tracking-tight font-bold">{projectData.contactPhone}</span>
          </motion.a>

          {/* Quick Call Icon (visible on smaller sm viewports) */}
          <motion.a
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            href={`tel:${projectData.contactPhone}`}
            className="md:hidden w-11 h-11 rounded-full ultra-glass border-champagne-500/30 text-champagne-700 hover:bg-champagne-50 transition-all flex items-center justify-center shadow-sm"
            title={`Call Concierge: ${projectData.contactPhone}`}
            aria-label="Call Concierge"
          >
            <Phone className="w-4 h-4" />
          </motion.a>
          
          {/* Book VIP Visit CTA */}
          <motion.button
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenBooking}
            className="btn-auric px-6 py-2.5 rounded-full text-xs font-black tracking-wider uppercase flex items-center gap-2 cursor-pointer shadow-gold-glow min-h-[42px] text-slate-950"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            VIP Visit
          </motion.button>
        </div>

        {/* Mobile Menu Toggle Button with Minimum 48x48px Tap Target */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden w-12 h-12 rounded-2xl ultra-glass border-champagne-500/30 text-slate-800 hover:text-black flex items-center justify-center focus:outline-none cursor-pointer shadow-sm ml-auto"
          aria-label={mobileMenuOpen ? "Close Mobile Navigation" : "Open Mobile Navigation"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6 text-champagne-600" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Full-Screen Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="xl:hidden fixed inset-0 bg-[#FAF8F5] z-[100] flex flex-col justify-between overflow-y-auto"
          >
            {/* Top Bar inside Mobile Drawer */}
            <div className="p-4 sm:p-6 border-b border-champagne-500/20 flex items-center justify-between bg-white/90 backdrop-blur-md sticky top-0 z-20">
              <div className="flex items-center gap-3">
                <img 
                  src="/logos/luxton-logo.jpg" 
                  alt="Luxton by Saheel Logo" 
                  className="h-10 sm:h-12 w-auto max-w-[135px] sm:max-w-[160px] object-contain rounded-md shadow-sm shrink-0" 
                />
                <div className="h-7 sm:h-8 w-px bg-slate-300 shrink-0" />
                <img 
                  src="/logos/saheel-developer-logo.webp" 
                  alt="Saheel Properties Developer Logo" 
                  className="h-7 sm:h-9 w-auto max-w-[105px] sm:max-w-[130px] object-contain shrink-0" 
                />
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-11 h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center cursor-pointer transition"
                aria-label="Close Mobile Navigation"
              >
                <X className="w-6 h-6 text-slate-900" />
              </button>
            </div>

            {/* Scrollable Nav Links Grid */}
            <div className="px-6 py-6 space-y-2 flex-1">
              <span className="text-[10px] font-mono text-champagne-800 uppercase tracking-widest font-bold block mb-3">
                Quick Navigation Directory
              </span>
              <div className="grid grid-cols-1 gap-1.5">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href="/"
                    onClick={(e) => handleNavClick(e, link.id)}
                    className="min-h-[52px] px-5 py-3.5 rounded-2xl bg-white border border-slate-200/90 active:bg-champagne-100 text-slate-900 font-bold uppercase tracking-wider text-xs transition-all flex items-center justify-between shadow-sm cursor-pointer"
                  >
                    <span className="font-cinzel">{link.label}</span>
                    <span className="text-champagne-700 font-bold text-base">→</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Direct Mobile Quick Actions Bar */}
            <div className="p-6 border-t border-champagne-500/20 bg-white/95 space-y-3 sticky bottom-0 z-20">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full min-h-[50px] btn-auric rounded-2xl text-xs font-black tracking-wider uppercase flex items-center justify-center gap-2 shadow-gold-glow cursor-pointer text-slate-950"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                Book VIP Site Visit
              </button>

              {/* Direct Phone and WhatsApp */}
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={`tel:${projectData.contactPhone}`}
                  className="min-h-[48px] rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-900 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
                >
                  <Phone className="w-4 h-4 text-champagne-600" />
                  Direct Call
                </a>
                <a
                  href={`https://wa.me/${projectData.whatsappPhone}?text=${encodeURIComponent("Hello Saheel Properties, I am interested in Luxton by Saheel Wakad.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[48px] rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
              </div>

              {/* RERA and Location Badge */}
              <div className="p-2.5 rounded-xl bg-milky-50 border border-champagne-500/20 text-center text-xs text-slate-700 space-y-0.5">
                <div className="flex items-center justify-center gap-1.5 font-bold text-slate-900 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-champagne-600" />
                  MahaRERA: <span className="font-mono text-champagne-800 font-bold">{projectData.reraNo}</span>
                </div>
                <div className="text-[10px] text-slate-500 flex items-center justify-center gap-1">
                  <MapPin className="w-3 h-3 text-champagne-600" /> S. No. 111, Near Phoenix Mall, Wakad
                </div>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
