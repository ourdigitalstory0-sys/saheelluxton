import React from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, User, Clock, CheckCircle2, Sparkles, Download } from 'lucide-react';
import { SEOArticle } from '../data/seoArticlesData';

interface SEOArticlesModalProps {
  article: SEOArticle | null;
  onClose: () => void;
  onOpenBooking: () => void;
  onOpenBrochure: () => void;
}

export const SEOArticlesModal: React.FC<SEOArticlesModalProps> = ({ article, onClose, onOpenBooking, onOpenBrochure }) => {
  if (!article) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fadeIn"
    >
      <motion.div 
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[90vh] rounded-3xl ultra-glass border-2 border-champagne-500/40 bg-white p-6 sm:p-10 shadow-2xl overflow-y-auto space-y-6"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 rounded-full bg-slate-100 hover:bg-champagne-500 text-slate-700 hover:text-white transition cursor-pointer shadow-sm"
          aria-label="Close Article"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Article Meta Header */}
        <div className="space-y-3 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="px-3.5 py-1 rounded-full bg-champagne-100 text-champagne-800 text-xs font-mono font-bold uppercase tracking-wider">
              {article.category}
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
              <Clock className="w-3.5 h-3.5" /> {article.readTime}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black font-cinzel text-slate-900 leading-tight">
            {article.title}
          </h2>

          <p className="text-sm sm:text-base text-champagne-800 font-medium">
            {article.subtitle}
          </p>

          <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 font-medium">
            <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5 text-champagne-600" /> {article.author}</span>
            <span>•</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-champagne-600" /> {article.date}</span>
          </div>
        </div>

        {/* Key Takeaways Box */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-champagne-100 via-white to-champagne-50 border border-champagne-400/50 space-y-2 shadow-sm">
          <h4 className="text-xs font-bold uppercase tracking-wider text-champagne-800 font-mono">
            Key Executive Findings & Metrics:
          </h4>
          <div className="space-y-2">
            {article.keyHighlights.map((hl, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-slate-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-champagne-600 shrink-0 mt-0.5" />
                <span>{hl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Article Full Body */}
        <div className="space-y-4 text-sm text-slate-700 leading-relaxed font-normal">
          {article.content.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* Keywords Cloud */}
        <div className="pt-4 border-t border-slate-200 space-y-2">
          <span className="text-[11px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
            Associated Keyword Clusters & Entities:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {article.keywords.map((kw, i) => (
              <span key={i} className="px-2.5 py-1 rounded-lg bg-milky-200 text-slate-700 text-[10px] font-medium border border-slate-300">
                #{kw}
              </span>
            ))}
          </div>
        </div>

        {/* CTA Footer */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200">
          <div className="text-xs text-slate-600">
            Official Development: <strong className="text-slate-900">Luxton by Saheel Wakad</strong> (MahaRERA PM1260002502043)
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onOpenBrochure();
              }}
              className="btn-auric-outline flex-1 sm:flex-initial px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-champagne-600" /> Brochure
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="btn-auric flex-1 sm:flex-initial px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-gold-glow cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" /> Book VIP Visit
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
};
