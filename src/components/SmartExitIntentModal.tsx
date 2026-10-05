import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Car, X, ShieldCheck, Sparkles, Phone, CheckCircle, Clock, MapPin } from 'lucide-react';
import { projectData } from '../data/projectData';
import { trackConversion } from '../utils/analytics';

interface SmartExitIntentModalProps {
  onClose?: () => void;
}

export const SmartExitIntentModal: React.FC<SmartExitIntentModalProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupLocality, setPickupLocality] = useState('Hinjawadi / Wakad');
  const [preferredDate, setPreferredDate] = useState('This Weekend');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    // Check if previously dismissed in this session
    const dismissed = sessionStorage.getItem('saheel_exit_intent_dismissed');
    if (dismissed) return;

    // Trigger on mouse leave (exit intent on desktop)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !hasTriggered) {
        setIsOpen(true);
        setHasTriggered(true);
        sessionStorage.setItem('saheel_exit_intent_dismissed', 'true');
        trackConversion('schedule_vip_visit', { lead_type: 'exit_intent_modal_opened' });
      }
    };

    // Trigger on engaged idle time (45s on mobile/desktop)
    const timer = setTimeout(() => {
      if (!hasTriggered) {
        setIsOpen(true);
        setHasTriggered(true);
        sessionStorage.setItem('saheel_exit_intent_dismissed', 'true');
        trackConversion('schedule_vip_visit', { lead_type: 'idle_timer_opened' });
      }
    }, 45000);

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, [hasTriggered]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('saheel_exit_intent_dismissed', 'true');
    if (onClose) onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) return;

    setIsSubmitted(true);
    trackConversion('book_vip_cab', {
      lead_type: 'vip_ac_cab_pickup',
      source_locality: pickupLocality,
      label: `Name: ${name}, Phone: ${phone}, Time: ${preferredDate}`
    });

    // Send WhatsApp notification
    const text = encodeURIComponent(
      `*VIP Cab Booking Request - Saheel Luxton Wakad*\n\n` +
      `👤 Name: ${name || 'Prospective Homebuyer'}\n` +
      `📞 Phone: ${phone}\n` +
      `📍 Pickup Locality: ${pickupLocality}\n` +
      `🗓️ Preferred Time: ${preferredDate}\n` +
      `🛡️ Project: Saheel Luxton (MahaRERA: PM1260002502043)`
    );
    window.open(`https://wa.me/917744009295?text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
          />

          {/* Luxury Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-white rounded-3xl border-2 border-champagne-500/40 shadow-2xl overflow-hidden z-10"
          >
            {/* Top Gold Gradient Bar */}
            <div className="h-2 bg-gradient-to-r from-champagne-400 via-champagne-600 to-amber-500" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8 space-y-6">
              {!isSubmitted ? (
                <>
                  {/* Badge & Header */}
                  <div className="space-y-2 text-center sm:text-left">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne-100 border border-champagne-300 text-champagne-900 text-[11px] font-extrabold uppercase tracking-wider">
                      <Car className="w-3.5 h-3.5 text-champagne-700" />
                      Complimentary VIP Experience
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black font-cinzel text-slate-900 leading-tight">
                      Before You Leave... <br />
                      <span className="text-champagne-700">Claim Free Luxury Cab Pickup</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Experience Pune’s 1st 4,000 sq.ft Double-Height Lobby & Rooftop Aqua Theatre. We provide a **private AC cab** to pick you up from your doorstep in Pune & PCMC and drop you back safely.
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-3 gap-2.5 text-center text-xs">
                    <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-champagne-300">
                      <div className="font-bold text-slate-900">100% Free</div>
                      <div className="text-[10px] text-slate-500">Doorstep Cab</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-champagne-300">
                      <div className="font-bold text-slate-900">VIP Priority</div>
                      <div className="text-[10px] text-slate-500">Model Flat Tour</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#FAF8F5] border border-champagne-300">
                      <div className="font-bold text-slate-900">MahaRERA</div>
                      <div className="text-[10px] text-slate-500">PM1260002502043</div>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-champagne-600 bg-slate-50/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <div className="flex gap-2">
                        <span className="px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-100 text-xs font-bold text-slate-700 flex items-center">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="10-Digit Mobile Number"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-champagne-600 bg-slate-50/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Pickup Locality</label>
                        <select
                          value={pickupLocality}
                          onChange={(e) => setPickupLocality(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-champagne-600 bg-slate-50/50"
                        >
                          <option value="Hinjawadi / Wakad">Hinjawadi / Wakad</option>
                          <option value="Baner / Balewadi">Baner / Balewadi</option>
                          <option value="Aundh / Pashan">Aundh / Pashan</option>
                          <option value="Pimple Saudagar">Pimple Saudagar</option>
                          <option value="Kothrud / Bavdhan">Kothrud / Bavdhan</option>
                          <option value="Other Pune Location">Other Pune Location</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Preferred Slot</label>
                        <select
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:border-champagne-600 bg-slate-50/50"
                        >
                          <option value="Today / Tomorrow">Today / Tomorrow</option>
                          <option value="This Weekend">This Weekend (Sat/Sun)</option>
                          <option value="Next Week">Next Week</option>
                        </select>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full btn-auric py-3.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-glow text-slate-950 cursor-pointer"
                    >
                      <Car className="w-4 h-4 text-slate-950" />
                      Confirm Free Doorstep Cab Voucher
                    </motion.button>
                  </form>
                </>
              ) : (
                /* Success Confirmation State */
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold font-cinzel text-slate-900">
                    VIP Cab Voucher Confirmed!
                  </h3>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                    Our dedicated concierge has received your request. A chauffeur will be scheduled for your site visit at <strong>Saheel Luxton Wakad</strong>.
                  </p>
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-champagne-300 text-xs space-y-1 text-slate-700">
                    <div><strong>Project:</strong> Luxton By Saheel (Wakad, Pune)</div>
                    <div><strong>MahaRERA:</strong> PM1260002502043</div>
                    <div><strong>Direct Helpline:</strong> +91 7744009295</div>
                  </div>
                  <button
                    onClick={handleClose}
                    className="px-8 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition cursor-pointer"
                  >
                    Continue Browsing
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
