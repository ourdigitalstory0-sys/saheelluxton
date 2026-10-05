import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, FileText, Video, Sparkles, MapPin, Calculator, Send } from 'lucide-react';
import { projectData } from '../data/projectData';
import { trackConversion } from '../utils/analytics';

export const WhatsAppActionDeck: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actionTemplates = [
    {
      id: 'cost-sheet-2bhk',
      icon: <FileText className="w-4 h-4 text-emerald-600" />,
      title: '2 BHK Itemized Cost Sheet',
      subtitle: '₹97 Lakhs* all-inclusive breakdown',
      text: 'Hello Saheel Properties, please share the itemized 2 BHK (753 sq.ft) cost sheet, stamp duty breakdown, and payment plan for Saheel Luxton Wakad.'
    },
    {
      id: 'cost-sheet-3bhk',
      icon: <FileText className="w-4 h-4 text-emerald-600" />,
      title: '3 BHK Grand Residence Cost Sheet',
      subtitle: '₹1.32 Cr* all-inclusive breakdown',
      text: 'Hello Saheel Properties, please send the 3 BHK (1,027 sq.ft) detailed cost sheet, high-floor availability, and floor plan layouts for Saheel Luxton Wakad.'
    },
    {
      id: 'sample-flat-video',
      icon: <Video className="w-4 h-4 text-amber-600" />,
      title: '360° Sample Flat Video Tour',
      subtitle: 'High-res walkthrough & rooftop view',
      text: 'Hello, please send the official 360-degree sample flat video and rooftop aqua cinema walkthrough for Saheel Luxton Wakad.'
    },
    {
      id: 'google-maps-pin',
      icon: <MapPin className="w-4 h-4 text-blue-600" />,
      title: 'Site Location Pin & Route Map',
      subtitle: 'Near Phoenix Mall of Millennium',
      text: 'Hello, please send the Google Maps live location pin and driving directions from Mumbai-Pune Expressway / Hinjawadi Phase 1 for Saheel Luxton Wakad.'
    },
    {
      id: 'vip-visit-booking',
      icon: <Sparkles className="w-4 h-4 text-purple-600" />,
      title: 'Book VIP Site Visit & AC Cab',
      subtitle: 'Complimentary doorstep pickup',
      text: 'Hello, I want to book a VIP site visit with complimentary AC cab pickup for Saheel Luxton Wakad. Please connect me with a senior project manager.'
    }
  ];

  const handleActionClick = (item: typeof actionTemplates[0]) => {
    trackConversion('whatsapp_inquiry', {
      lead_type: item.id,
      label: item.title
    });

    const url = `https://wa.me/917744009295?text=${encodeURIComponent(item.text)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {/* Floating Action Tray Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="mb-3 w-[320px] sm:w-[360px] bg-white/95 backdrop-blur-xl rounded-3xl border-2 border-emerald-500/40 shadow-2xl overflow-hidden p-4 space-y-3"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <MessageCircle className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Instant WhatsApp Concierge</h4>
                  <p className="text-[10px] text-emerald-600 font-semibold">● Online • Typical reply in &lt; 2 mins</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition"
                aria-label="Close tray"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Action Items */}
            <div className="space-y-1.5">
              {actionTemplates.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleActionClick(item)}
                  className="w-full text-left p-2.5 rounded-2xl hover:bg-emerald-50/70 border border-transparent hover:border-emerald-200 transition-all flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-white flex items-center justify-center shrink-0 shadow-xs">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-800 group-hover:text-emerald-950">
                        {item.title}
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                  <Send className="w-3.5 h-3.5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </button>
              ))}
            </div>

            {/* Footer Trust Info */}
            <div className="pt-2 border-t border-slate-100 text-center text-[10px] text-slate-500">
              🛡️ MahaRERA Verified: <strong>PM1260002502043</strong> | Luxton By Saheel
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-emerald-500/30 transition-all cursor-pointer"
        aria-label="Open 1-Click WhatsApp Quick Actions"
      >
        <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
          <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-600" />
        </span>
        <span className="hidden sm:inline font-bold">WhatsApp Action Desk</span>
        <span className="sm:hidden font-bold">WhatsApp</span>
      </motion.button>
    </div>
  );
};
