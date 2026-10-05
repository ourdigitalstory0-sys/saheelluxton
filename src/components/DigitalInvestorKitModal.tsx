import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, CheckCircle2, Sparkles, Send, FileSpreadsheet, Map, ShieldCheck, ArrowRight, PhoneCall } from 'lucide-react';
import confetti from 'canvas-confetti';
import { projectData } from '../data/projectData';
import { dispatchLeadToEmail } from '../utils/leadDispatcher';

interface DigitalInvestorKitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const DigitalInvestorKitModal: React.FC<DigitalInvestorKitModalProps> = ({ isOpen, onClose, onOpenBooking }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    configuration: 'All Configurations (2, 3 & 4 BHK)'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const kitContents = [
    {
      title: "Master Architectural Brochure PDF",
      desc: "30-Storey elevation renders, 4,000 sq ft grand lobby specs & 5-star rooftop club overview.",
      icon: <FileText className="w-4 h-4 text-champagne-600" />,
      tag: "Official PDF"
    },
    {
      title: "RERA Carpet Blueprints (2, 3 & 4 BHK)",
      desc: "Precise dimensions, master walk-in wardrobe layouts, and panoramic deck orientations.",
      icon: <Sparkles className="w-4 h-4 text-champagne-600" />,
      tag: "HD Blueprints"
    },
    {
      title: "Itemized Cost Sheet & EMI Breakdown",
      desc: "All-inclusive pricing starting ₹1.09 Cr* / ₹1.58 Cr*, 7% stamp duty & bank loan payment schedules.",
      icon: <FileSpreadsheet className="w-4 h-4 text-champagne-600" />,
      tag: "Pricing 2026"
    },
    {
      title: "Metro Line 3 & IT Park Commute Map",
      desc: "High-resolution transit radar covering Phoenix Mall (5 mins) & Hinjawadi Phase 1, 2, 3.",
      icon: <Map className="w-4 h-4 text-champagne-600" />,
      tag: "Transit Radar"
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);

    try {
      await dispatchLeadToEmail({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        leadType: 'INVESTOR_KIT_DOWNLOAD',
        configuration: formData.configuration,
        notes: `Downloaded 4-in-1 Digital Investor Kit for ${formData.configuration}`
      });

      // Fire festive celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Confetti fallback
      }

      setIsSuccess(true);

      // Auto trigger official PDF brochure download
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = projectData.brochurePdfUrl;
        link.target = '_blank';
        link.download = 'Saheel_Luxton_Master_Investor_Kit.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 800);

    } catch (err) {
      console.error('Lead dispatch error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppInstant = () => {
    const text = encodeURIComponent(
      `Hello Saheel Properties Sales Team, I would like to receive the complete 4-in-1 Digital Investor Kit (Brochure, Floor Plans, Cost Sheet & Commute Map) for Saheel Luxton Wakad.`
    );
    window.open(`https://api.whatsapp.com/send?phone=${projectData.whatsappPhone}&text=${text}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-champagne-200/70 z-10 my-8"
          >
            {/* Top Luxury Banner */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-7 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-champagne-500/25 rounded-full blur-2xl" />
              
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-champagne-400 text-xs font-semibold uppercase tracking-widest mb-1.5">
                <Sparkles className="w-4 h-4" />
                <span>All-Inclusive VIP Asset Bundle</span>
              </div>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide">
                Download 4-in-1 Digital Investor Kit
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                Official high-res brochures, carpet layouts, itemized pricing & metro commute roadmap.
              </p>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[78vh] overflow-y-auto">
              
              {!isSuccess ? (
                <>
                  {/* Kit Items Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {kitContents.map((item, idx) => (
                      <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-start gap-3 hover:border-champagne-300 transition-colors">
                        <div className="p-2 bg-white rounded-xl shadow-xs border border-slate-200 shrink-0 mt-0.5">
                          {item.icon}
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-slate-900 leading-tight">{item.title}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Submission Form */}
                  <form onSubmit={handleSubmit} className="space-y-3.5 bg-champagne-50/50 border border-champagne-200/80 rounded-2xl p-5">
                    <div className="text-xs font-bold font-cinzel text-slate-900 uppercase tracking-wider">
                      Enter Details for Instant 1-Click WhatsApp & PDF Dispatch
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sameer Sharma"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-champagne-500 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">WhatsApp Phone *</label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-champagne-500 bg-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Email Address (Optional)</label>
                        <input
                          type="email"
                          placeholder="e.g. sameer@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-champagne-500 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 mb-1">Preferred Typology</label>
                        <select
                          value={formData.configuration}
                          onChange={(e) => setFormData({ ...formData, configuration: e.target.value })}
                          className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-champagne-500 bg-white"
                        >
                          <option value="All Configurations (2, 3 & 4 BHK)">All Configurations (2, 3 & 4 BHK)</option>
                          <option value="2 BHK Luxury (753 - 809 Sq.Ft) - From ₹1.09 Cr*">2 BHK Luxury (From ₹1.09 Cr*)</option>
                          <option value="3 BHK Grand Luxury (1,027 - 1,162 Sq.Ft) - From ₹1.58 Cr*">3 BHK Grand Luxury (From ₹1.58 Cr*)</option>
                          <option value="4 BHK Presidential Sky Suite (1,458 Sq.Ft) - From ₹1.86 Cr*">4 BHK Presidential Sky Suite (From ₹1.86 Cr*)</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-champagne-600 via-champagne-700 to-amber-600 hover:from-champagne-700 hover:to-amber-700 text-white font-bold text-xs tracking-wider uppercase shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                    >
                      {isSubmitting ? (
                        <span>Preparing Your Investor Package...</span>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          <span>Download Complete Investor Kit (Instant PDF)</span>
                        </>
                      )}
                    </button>
                  </form>

                  {/* Or 1-Click WhatsApp Shortcut */}
                  <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-2xl">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                        <Send className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-slate-800">
                        Prefer instant receipt on WhatsApp?
                      </span>
                    </div>
                    <button
                      onClick={handleWhatsAppInstant}
                      className="px-3.5 py-1.5 bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 rounded-xl text-xs font-bold transition-colors"
                    >
                      1-Click WhatsApp
                    </button>
                  </div>
                </>
              ) : (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 text-center space-y-5 bg-emerald-50/70 border border-emerald-200 rounded-3xl"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="font-cinzel text-xl font-bold text-emerald-950">
                      Investor Kit Dispatched Successfully!
                    </h4>
                    <p className="text-xs text-emerald-800 max-w-md mx-auto">
                      Your master download has started. We have also forwarded the direct WhatsApp link and itemized cost breakdown to <strong>{formData.phone}</strong>.
                    </p>
                  </div>

                  <div className="p-4 bg-white border border-emerald-200 rounded-2xl space-y-2 text-left text-xs max-w-md mx-auto">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Included in your package:</span>
                    </div>
                    <ul className="space-y-1 text-slate-600 text-[11px] list-disc list-inside">
                      <li>Official 2026 Master Brochure PDF</li>
                      <li>2 BHK, 3 BHK & 4 BHK RERA Usable Blueprints</li>
                      <li>Cost Sheet with 7% Stamp Duty & Loan EMI Matrix</li>
                      <li>Wakad Metro Line 3 Transit Map</li>
                    </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        onClose();
                        onOpenBooking();
                      }}
                      className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                    >
                      Book VIP Cab Site Visit
                    </button>
                    <button
                      onClick={onClose}
                      className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-semibold text-xs rounded-xl transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              )}

              {/* RERA Guarantee */}
              <div className="text-center text-[10px] text-slate-400">
                Official Saheel Properties Developer Digital Distribution | MahaRERA Registration: <strong>{projectData.reraNo}</strong>
              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
