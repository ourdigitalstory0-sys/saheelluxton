import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, QrCode, ExternalLink, Download, CheckCircle2, Building, Calendar, MapPin, Share2, PhoneCall, Copy, Check } from 'lucide-react';
import { projectData } from '../data/projectData';
import { dispatchLeadToEmail } from '../utils/leadDispatcher';

interface MahaRERAQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const MahaRERAQRModal: React.FC<MahaRERAQRModalProps> = ({ isOpen, onClose, onOpenBooking }) => {
  const [copied, setCopied] = useState(false);
  const [isRequestingLegalReport, setIsRequestingLegalReport] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const copyReraNo = () => {
    navigator.clipboard.writeText(projectData.reraNo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleLegalReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) return;

    await dispatchLeadToEmail({
      name: leadName,
      phone: leadPhone,
      leadType: 'RERA_VERIFICATION',
      notes: 'Homebuyer requested official MahaRERA Legal Title Search & Sanctioned Plans Report'
    });

    setIsSubmitted(true);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `🏛️ *Saheel Luxton Wakad — Official MahaRERA Verification*\n\n` +
      `✅ *MahaRERA Reg No:* ${projectData.reraNo}\n` +
      `📍 *Location:* S. No. 111, Near Phoenix Mall, Wakad, Pune\n` +
      `🏢 *Structure:* 30-Storey Landmark | 3.38 Acres\n` +
      `📅 *RERA Possession Date:* June 2030\n` +
      `🔗 *Verify Live:* https://maharera.mahaonline.gov.in\n` +
      `🌐 *Project Portal:* https://saheeluxton.in`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
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

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-champagne-200/60 z-10 my-8"
          >
            {/* Header Ribbon */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-7 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-champagne-500/20 rounded-full blur-2xl" />
              
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-champagne-400 text-xs font-semibold uppercase tracking-widest mb-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Statutory Government Transparency</span>
              </div>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide">
                MahaRERA Official Verification & QR Certificate
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                Maharashtra Real Estate Regulatory Authority Registration PM1260002502043
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[78vh] overflow-y-auto">
              
              {/* QR Code & Direct Scan Card */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center bg-slate-50 border border-slate-200/80 rounded-2xl p-5 sm:p-6">
                
                {/* Visual QR Stamp */}
                <div className="sm:col-span-5 flex flex-col items-center justify-center p-3 bg-white rounded-2xl shadow-sm border border-champagne-200 text-center relative group">
                  <div className="relative p-2 bg-white rounded-xl">
                    {/* Interactive QR Code Visual */}
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https%3A%2F%2Fmaharera.mahaonline.gov.in%2F&color=0f172a&bgcolor=ffffff`}
                      alt={`MahaRERA QR Code for PM1260002502043`}
                      className="w-40 h-40 object-contain rounded-lg shadow-inner"
                      loading="eager"
                      width="160"
                      height="160"
                    />
                    {/* Scanning Laser Line Effect */}
                    <motion.div
                      animate={{ y: [0, 140, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute left-2 right-2 top-2 h-0.5 bg-gradient-to-r from-transparent via-champagne-500 to-transparent shadow-[0_0_8px_#D4AF37]"
                    />
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                    <QrCode className="w-3.5 h-3.5 text-champagne-600" />
                    <span>Scan with Mobile Camera</span>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-0.5">Instant MahaRERA Record Redirect</p>
                </div>

                {/* Registration Details */}
                <div className="sm:col-span-7 space-y-3.5">
                  <div className="p-3 bg-champagne-50 border border-champagne-200/80 rounded-xl">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-champagne-800">
                      MahaRERA Registration Number
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-1">
                      <span className="text-base sm:text-lg font-mono font-bold text-slate-900 tracking-tight">
                        {projectData.reraNo}
                      </span>
                      <button
                        onClick={copyReraNo}
                        className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-white hover:bg-champagne-100 text-champagne-800 border border-champagne-300 rounded-lg transition-colors shadow-xs"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? 'Copied!' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <div className="p-2.5 bg-white border border-slate-200 rounded-xl">
                      <div className="text-[10px] text-slate-500 font-medium">Project Name</div>
                      <div className="font-bold text-slate-900 truncate">Luxton By Saheel</div>
                    </div>
                    <div className="p-2.5 bg-white border border-slate-200 rounded-xl">
                      <div className="text-[10px] text-slate-500 font-medium">Promoter</div>
                      <div className="font-bold text-slate-900 truncate">Saheel Properties</div>
                    </div>
                    <div className="p-2.5 bg-white border border-slate-200 rounded-xl">
                      <div className="text-[10px] text-slate-500 font-medium">Land Parcel</div>
                      <div className="font-bold text-slate-900">3.38 Acres Freehold</div>
                    </div>
                    <div className="p-2.5 bg-white border border-slate-200 rounded-xl">
                      <div className="text-[10px] text-slate-500 font-medium">RERA Possession</div>
                      <div className="font-bold text-slate-900">June 30, 2030</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-champagne-600 shrink-0" />
                    <span>S. No. 111, Near Phoenix Mall, Wakad, Pune - 411057</span>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="https://maharera.mahaonline.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs tracking-wide shadow-md transition-all group"
                >
                  <span>Verify on MahaRERA Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-champagne-400 group-hover:translate-x-0.5 transition-transform" />
                </a>

                <button
                  onClick={handleShareWhatsApp}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs tracking-wide shadow-md transition-all"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share QR Certificate on WhatsApp</span>
                </button>
              </div>

              {/* Freehold Title & Legal Due Diligence Form */}
              <div className="border-t border-slate-200 pt-5">
                {!isRequestingLegalReport && !isSubmitted && (
                  <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Need Certified Legal Search Report?</h4>
                      <p className="text-[11px] text-slate-600">Receive Advocate title search, sanctioned plans & bank approvals on WhatsApp.</p>
                    </div>
                    <button
                      onClick={() => setIsRequestingLegalReport(true)}
                      className="shrink-0 px-3.5 py-2 bg-champagne-600 hover:bg-champagne-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
                    >
                      Request Legal Pack
                    </button>
                  </div>
                )}

                {isRequestingLegalReport && !isSubmitted && (
                  <form onSubmit={handleLegalReportSubmit} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900">Enter Details to Receive Legal Title Dossier</h4>
                      <button 
                        type="button" 
                        onClick={() => setIsRequestingLegalReport(false)}
                        className="text-[11px] text-slate-400 hover:text-slate-600"
                      >
                        Cancel
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <input
                        type="text"
                        placeholder="Your Full Name"
                        value={leadName}
                        onChange={(e) => setLeadName(e.target.value)}
                        required
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-champagne-500 bg-white"
                      />
                      <input
                        type="tel"
                        placeholder="WhatsApp Phone Number"
                        value={leadPhone}
                        onChange={(e) => setLeadPhone(e.target.value)}
                        required
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:border-champagne-500 bg-white"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-champagne-600 hover:bg-champagne-700 text-white text-xs font-bold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Instant Dispatch to WhatsApp</span>
                    </button>
                  </form>
                )}

                {isSubmitted && (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-900 text-xs">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <strong>Legal Dossier Dispatched!</strong> Our compliance desk is forwarding the certified MahaRERA documents to <strong>{leadPhone}</strong>.
                    </div>
                  </div>
                )}
              </div>

              {/* Disclaimer Note */}
              <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                Registered with MahaRERA as <strong>Luxton By Saheel (PM1260002502043)</strong>. Available on the official website https://maharera.mahaonline.gov.in under registered projects.
              </p>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
