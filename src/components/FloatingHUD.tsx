import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Sparkles, Download } from 'lucide-react';
import { projectData } from '../data/projectData';

interface FloatingHUDProps {
  onOpenBooking: () => void;
  onOpenBrochure: () => void;
}

export const FloatingHUD: React.FC<FloatingHUDProps> = ({ onOpenBooking, onOpenBrochure }) => {
  return (
    <>
      {/* Desktop Floating Right HUD with Fluid Spring Motion */}
      <aside aria-label="Quick Actions" className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-3.5">
        {/* Call */}
        <motion.a
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.15, x: -6 }}
          whileTap={{ scale: 0.95 }}
          href={`tel:${projectData.contactPhone}`}
          className="w-13 h-13 rounded-2xl ultra-glass border-champagne-500/40 hover:border-champagne-600 hover:bg-champagne-500 text-slate-800 hover:text-white flex items-center justify-center shadow-md transition-all duration-300 group bg-white"
          title="Call Luxury Concierge"
          aria-label="Call Luxury Concierge"
        >
          <Phone className="w-5 h-5 text-champagne-600 group-hover:text-white transition-colors" />
        </motion.a>

        {/* WhatsApp with Pulsing Spring */}
        <motion.a
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
          whileHover={{ scale: 1.15, x: -6 }}
          whileTap={{ scale: 0.95 }}
          href={`https://wa.me/${projectData.whatsappPhone}?text=${encodeURIComponent("Hello Saheel Properties, I am interested in Luxton by Saheel Wakad. Please share the brochure and available units.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 rounded-2xl bg-emerald-600/90 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg transition-all duration-300 group border border-emerald-400/40"
          title="WhatsApp Concierge"
          aria-label="WhatsApp Concierge"
        >
          <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </motion.a>

        {/* Schedule VIP Visit */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0 }}
          whileHover={{ scale: 1.15, x: -6 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenBooking}
          className="w-13 h-13 rounded-2xl btn-auric text-white flex items-center justify-center shadow-gold-glow transition-all duration-300 group cursor-pointer"
          title="Book VIP Site Visit"
          aria-label="Book VIP Site Visit"
        >
          <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </motion.button>

        {/* Brochure Download */}
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1 }}
          whileHover={{ scale: 1.15, x: -6 }}
          whileTap={{ scale: 0.95 }}
          onClick={onOpenBrochure}
          className="w-13 h-13 rounded-2xl ultra-glass border-champagne-500/30 hover:border-champagne-600 text-slate-800 hover:text-champagne-800 flex items-center justify-center shadow-md transition-all duration-300 group cursor-pointer bg-white"
          title="Download Brochure"
          aria-label="Download Brochure"
        >
          <Download className="w-5 h-5 text-champagne-600 group-hover:scale-110 transition-transform" />
        </motion.button>
      </aside>

      {/* Mobile Sticky Bottom Action Bar with Safe-Area & 48px Tap Targets */}
      <motion.div 
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 ultra-glass border-t border-champagne-500/30 px-3 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-10px_25px_rgba(15,23,42,0.1)] flex items-center gap-2 bg-white/95 backdrop-blur-xl"
      >
        <a
          href={`tel:${projectData.contactPhone}`}
          className="flex-1 min-h-[48px] rounded-xl bg-milky-200 active:bg-champagne-200 text-slate-900 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-slate-300 shadow-sm"
          aria-label="Call Concierge"
        >
          <Phone className="w-4 h-4 text-champagne-700 shrink-0" />
          <span>Call</span>
        </a>

        <a
          href={`https://wa.me/${projectData.whatsappPhone}?text=${encodeURIComponent("Hello Saheel Properties, I am interested in Luxton by Saheel Wakad.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-h-[48px] rounded-xl bg-emerald-600 active:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
          aria-label="WhatsApp Concierge"
        >
          <MessageCircle className="w-4 h-4 shrink-0" />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={onOpenBooking}
          className="flex-[1.4] min-h-[48px] btn-auric rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-gold-glow cursor-pointer"
          aria-label="Book VIP Site Visit"
        >
          <Sparkles className="w-4 h-4 shrink-0" />
          <span>Book Visit</span>
        </button>
      </motion.div>
    </>
  );
};
