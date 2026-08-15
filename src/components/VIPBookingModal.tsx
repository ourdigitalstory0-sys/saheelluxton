import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ShieldCheck, Sparkles, Phone, User, Mail, Calendar, Clock, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { projectData } from '../data/projectData';

interface VIPBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VIPBookingModal: React.FC<VIPBookingModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    configuration: '3 BHK Grand Luxury',
    preferredDate: '',
    preferredTime: 'Morning (10:00 AM - 1:00 PM)',
    requireCabPickup: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Trigger gold luxury confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4A017', '#B8860B', '#FAF8F5', '#1E293B']
        });
      } catch (err) {
        // Safe fallback
      }
    }, 1000);
  };

  const resetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      onClick={resetAndClose}
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <motion.div 
        initial={{ scale: 0.93, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.93, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl max-h-[92vh] rounded-3xl ultra-glass border-2 border-champagne-500/40 bg-white p-5 sm:p-8 shadow-2xl overflow-y-auto my-auto"
      >
        {/* Close Button with 44px Touch Target */}
        <button
          onClick={resetAndClose}
          className="absolute top-4 right-4 w-11 h-11 rounded-full bg-slate-100 hover:bg-champagne-500 active:bg-champagne-600 text-slate-700 hover:text-white flex items-center justify-center transition cursor-pointer shadow-sm z-10"
          aria-label="Close VIP Booking Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div className="space-y-5">
            {/* Header */}
            <div className="text-center space-y-1.5 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-champagne-100 text-champagne-800 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-champagne-600" />
                Priority VIP Site Access
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-slate-900 leading-tight">
                Schedule a Private <br />
                <span className="gold-gradient-text">Luxton Site Walkthrough</span>
              </h3>
              <p className="text-xs text-slate-600 font-normal max-w-md mx-auto">
                Experience the 4,000 sq.ft lobby, inspect sample flat finishes & receive transparent builder-direct cost sheets.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full min-h-[46px] pl-10 pr-4 py-2.5 rounded-xl bg-milky-100 border border-slate-300 focus:border-champagne-500 focus:ring-1 focus:ring-champagne-500 text-slate-900 text-xs sm:text-sm outline-none transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full min-h-[46px] pl-10 pr-4 py-2.5 rounded-xl bg-milky-100 border border-slate-300 focus:border-champagne-500 focus:ring-1 focus:ring-champagne-500 text-slate-900 text-xs sm:text-sm outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full min-h-[46px] pl-10 pr-4 py-2.5 rounded-xl bg-milky-100 border border-slate-300 focus:border-champagne-500 focus:ring-1 focus:ring-champagne-500 text-slate-900 text-xs sm:text-sm outline-none transition"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Preferred Configuration *
                </label>
                <select
                  value={formData.configuration}
                  onChange={(e) => setFormData({ ...formData, configuration: e.target.value })}
                  className="w-full min-h-[46px] px-3.5 py-2.5 rounded-xl bg-milky-100 border border-slate-300 focus:border-champagne-500 text-slate-900 text-xs sm:text-sm outline-none"
                >
                  <option value="2 BHK Luxury (753 - 809 Sq. Ft.)">2 BHK Luxury (753 - 809 Sq. Ft.) - From ₹97 Lakhs*</option>
                  <option value="3 BHK Grand Luxury (1,027 - 1,162 Sq. Ft.)">3 BHK Grand Luxury (1,027 - 1,162 Sq. Ft.) - From ₹1.32 Cr*</option>
                  <option value="4 BHK Presidential Sky Suite (1,458 Sq. Ft.)">4 BHK Presidential Sky Suite (1,458 Sq. Ft.) - From ₹1.86 Cr*</option>
                  <option value="Penthouse & Custom Duplex">Penthouse & Custom Duplex Inquiry</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Preferred Visit Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full min-h-[46px] pl-10 pr-4 py-2.5 rounded-xl bg-milky-100 border border-slate-300 focus:border-champagne-500 text-slate-900 text-xs sm:text-sm outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Preferred Time Slot
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full min-h-[46px] pl-10 pr-4 py-2.5 rounded-xl bg-milky-100 border border-slate-300 focus:border-champagne-500 text-slate-900 text-xs outline-none"
                    >
                      <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                      <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM - 4:00 PM)</option>
                      <option value="Evening (4:00 PM - 7:00 PM)">Evening (4:00 PM - 7:00 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Free Pick-up Checkbox */}
              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-champagne-50/70 border border-champagne-400/40 cursor-pointer min-h-[48px]">
                <input
                  type="checkbox"
                  checked={formData.requireCabPickup}
                  onChange={(e) => setFormData({ ...formData, requireCabPickup: e.target.checked })}
                  className="w-4 h-4 rounded text-champagne-600 focus:ring-champagne-500 accent-[#B8860B]"
                />
                <span className="text-xs text-slate-800 font-medium">
                  Complimentary Chauffeur Site Pick-up & Drop (Pune / PCMC)
                </span>
              </label>

              {/* Submit Button with 48px Minimum Height */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[48px] btn-auric py-3.5 rounded-full text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-gold-glow cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Reserving VIP Slot...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Confirm VIP Site Walkthrough
                  </>
                )}
              </button>
            </form>

            <div className="pt-2 text-center text-[11px] text-slate-500 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-champagne-600" />
              100% Privacy Guaranteed • Direct Builder Priority Service
            </div>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-champagne-100 text-champagne-700 flex items-center justify-center mx-auto border-2 border-champagne-500 shadow-md">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-champagne-700 uppercase font-bold tracking-wider">VIP Booking Confirmed</span>
              <h3 className="text-2xl font-bold font-cinzel text-slate-900">Thank You, {formData.name}!</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto font-normal">
                Your VIP invitation for <strong className="text-slate-900">{formData.configuration}</strong> at Saheel Luxton Wakad has been registered.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-milky-100 border border-slate-200 text-xs text-slate-700 space-y-1 max-w-sm mx-auto text-left font-mono">
              <div>• Date: <strong>{formData.preferredDate || 'Confirmed with Relationship Mgr'}</strong></div>
              <div>• Time Slot: <strong>{formData.preferredTime}</strong></div>
              <div>• Contact: <strong>{formData.phone}</strong></div>
              <div>• Free Cab: <strong>{formData.requireCabPickup ? 'Yes (Requested)' : 'No'}</strong></div>
            </div>

            <button
              onClick={resetAndClose}
              className="min-h-[48px] px-8 btn-auric rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              Done & Return to Overview
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
