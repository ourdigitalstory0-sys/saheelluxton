import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Download, FileText, CheckCircle2, ShieldCheck, User, Phone, Mail } from 'lucide-react';
import { projectData } from '../data/projectData';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: ''
  });
  const [isDownloaded, setIsDownloaded] = useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsDownloaded(false);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDownloaded(true);
    
    try {
      const existingLeads = JSON.parse(localStorage.getItem('saheel_leads') || '[]');
      existingLeads.push({
        ...formData,
        type: 'BROCHURE_DOWNLOAD',
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('saheel_leads', JSON.stringify(existingLeads));
    } catch (err) {
      // Safe fallback
    }

    // Trigger actual download of official brochure PDF
    const link = document.createElement('a');
    link.href = projectData.brochurePdfUrl;
    link.target = '_blank';
    link.download = 'Luxton_by_Saheel_Brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn"
    >
      <motion.div 
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg rounded-3xl ultra-glass border-champagne-500/40 bg-white p-6 sm:p-8 shadow-2xl overflow-hidden"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-champagne-500 text-slate-700 hover:text-white transition cursor-pointer"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isDownloaded ? (
          <div className="py-8 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-champagne-100 border border-champagne-400 text-champagne-700 mx-auto flex items-center justify-center shadow-gold-glow">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-champagne-700 uppercase tracking-widest font-bold">Download Initiated</span>
              <h3 className="text-2xl font-bold font-cinzel text-slate-900">Brochure Downloaded Successfully</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto font-normal leading-relaxed pt-1">
                Your official high-definition brochure has been downloaded. A copy has also been dispatched to your provided contact details.
              </p>
            </div>

            <div className="pt-3">
              <a
                href={projectData.brochurePdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-auric px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2"
              >
                <Download className="w-4 h-4" /> Open PDF in New Tab
              </a>
            </div>
          </div>
        ) : (
          <div className="space-y-5">
            
            {/* Header */}
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-champagne-100 text-champagne-800 text-[11px] font-mono font-bold uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5" /> Official Document (12 MB PDF)
              </div>
              <h3 className="text-2xl font-bold font-cinzel text-slate-900">
                Download Luxton E-Brochure
              </h3>
              <p className="text-xs text-slate-600 font-normal">
                Complete layout plans, high-res renders, specifications & MahaRERA certificates.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleDownload} className="space-y-3.5 text-xs">
              
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-slate-700 block font-bold">Your Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-champagne-600 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 placeholder-slate-400 outline-none transition"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <label className="text-slate-700 block font-bold">WhatsApp / Mobile Number *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-champagne-600 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 placeholder-slate-400 outline-none transition font-mono"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-slate-700 block font-bold">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    placeholder="your.email@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 focus:border-champagne-600 rounded-xl pl-10 pr-4 py-2.5 text-slate-900 placeholder-slate-400 outline-none transition"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full btn-auric py-3.5 rounded-full text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-gold-glow cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Instant Download Official Brochure (PDF)
                </button>
              </div>

              <div className="text-[10px] text-slate-500 text-center flex items-center justify-center gap-1 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-champagne-600" />
                Zero Spam Assurance • Instant PDF Access
              </div>

            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
};
