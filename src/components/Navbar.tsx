import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, Download, Sparkles, ShieldCheck, Volume2, VolumeX, MessageCircle, MapPin } from 'lucide-react';
import { projectData } from '../data/projectData';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenBrochure: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenBrochure }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
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

  const audioCtxRef = React.useRef<AudioContext | null>(null);
  const oscillatorRef = React.useRef<OscillatorNode | null>(null);
  const gainNodeRef = React.useRef<GainNode | null>(null);

  const toggleAmbiance = () => {
    try {
      if (!isPlayingAudio) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return;

        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // 432 Hz warm ambient drone
        osc.type = 'sine';
        osc.frequency.setValueAtTime(432, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        oscillatorRef.current = osc;
        gainNodeRef.current = gain;
        setIsPlayingAudio(true);
      } else {
        if (gainNodeRef.current && audioCtxRef.current) {
          gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 1);
          setTimeout(() => {
            oscillatorRef.current?.stop();
            audioCtxRef.current?.close();
            audioCtxRef.current = null;
            setIsPlayingAudio(false);
          }, 1000);
        } else {
          setIsPlayingAudio(false);
        }
      }
    } catch (err) {
      setIsPlayingAudio(!isPlayingAudio);
    }
  };

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
        ? 'ultra-glass-nav py-2.5 shadow-md' 
        : 'bg-gradient-to-b from-[#FAF8F5]/95 via-[#FAF8F5]/70 to-transparent py-3.5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a 
          href="/" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            window.history.replaceState(null, '', window.location.pathname);
          }}
          className="flex items-center gap-3 group min-h-[44px]"
        >
          <motion.div 
            whileHover={{ scale: 1.08 }}
            className="w-10 h-10 rounded-2xl bg-gradient-to-br from-champagne-400 via-champagne-600 to-champagne-800 p-0.5 flex items-center justify-center shadow-gold-glow shrink-0"
          >
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <span className="font-cinzel text-xl font-black gold-gradient-text">L</span>
            </div>
          </motion.div>
          <div className="flex flex-col">
            <span className="font-cinzel text-lg sm:text-xl font-black tracking-widest text-slate-900 leading-none group-hover:text-champagne-600 transition-colors">
              LUXTON
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-champagne-600 font-extrabold mt-0.5">
              BY SAHEEL • WAKAD
            </span>
          </div>
        </a>

        {/* Floating Pill Menu Container for Large screens */}
        <nav 
          onMouseLeave={() => setHoveredIndex(null)}
          className="hidden xl:flex items-center p-1.5 rounded-full ultra-glass border border-champagne-500/30 bg-white/80 shadow-sm relative"
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
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Audio Ambience Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleAmbiance}
            className="w-10 h-10 rounded-full ultra-glass border-champagne-500/30 hover:border-champagne-600 text-champagne-700 hover:bg-champagne-50 transition-all flex items-center justify-center shadow-sm cursor-pointer"
            title={isPlayingAudio ? "Mute Resort Ambience" : "Play Luxury Ambience"}
            aria-label="Toggle Resort Ambience"
          >
            {isPlayingAudio ? <Volume2 className="w-4 h-4 text-champagne-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </motion.button>

          {/* Quick Call */}
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href={`tel:${projectData.contactPhone}`}
            className="w-10 h-10 rounded-full ultra-glass border-champagne-500/30 hover:border-champagne-600 text-champagne-700 hover:bg-champagne-50 transition-all flex items-center justify-center shadow-sm"
            title={`Call Concierge: ${projectData.contactPhone}`}
            aria-label="Call Concierge"
          >
            <Phone className="w-4 h-4" />
          </motion.a>

          {/* Brochure CTA */}
          <motion.button
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenBrochure}
            className="btn-auric-outline px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 cursor-pointer shadow-sm min-h-[40px]"
          >
            <Download className="w-3.5 h-3.5 text-champagne-600" />
            Brochure
          </motion.button>
          
          {/* Book VIP Visit CTA */}
          <motion.button
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.96 }}
            onClick={onOpenBooking}
            className="btn-auric px-5 py-2 rounded-full text-xs font-black tracking-wider uppercase flex items-center gap-1.5 cursor-pointer shadow-gold-glow min-h-[40px]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            VIP Visit
          </motion.button>
        </div>

        {/* Mobile Menu Toggle Button with Minimum 48x48px Tap Target */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden w-12 h-12 rounded-2xl ultra-glass border-champagne-500/30 text-slate-800 hover:text-black flex items-center justify-center focus:outline-none cursor-pointer shadow-sm ml-2"
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
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-champagne-400 via-champagne-600 to-champagne-800 p-0.5 flex items-center justify-center shadow-gold-glow">
                  <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                    <span className="font-cinzel text-xl font-black gold-gradient-text">L</span>
                  </div>
                </div>
                <div>
                  <span className="font-cinzel text-lg font-black tracking-widest text-slate-900 block leading-none">
                    LUXTON
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-champagne-700 font-extrabold block mt-0.5">
                    BY SAHEEL • WAKAD
                  </span>
                </div>
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
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBrochure();
                  }}
                  className="min-h-[48px] btn-auric-outline rounded-2xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-champagne-600" />
                  Brochure
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="min-h-[48px] btn-auric rounded-2xl text-xs font-extrabold tracking-wider uppercase flex items-center justify-center gap-2 shadow-gold-glow cursor-pointer text-slate-950"
                >
                  <Sparkles className="w-4 h-4" />
                  VIP Visit
                </button>
              </div>

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
