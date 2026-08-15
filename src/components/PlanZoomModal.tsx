import React from 'react';
import { motion } from 'framer-motion';
import { X, Layers } from 'lucide-react';
import { projectData } from '../data/projectData';
import { UnitPlan } from '../types/project';

interface PlanZoomModalProps {
  plan: UnitPlan | null;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const PlanZoomModal: React.FC<PlanZoomModalProps> = ({ plan, onClose, onOpenBooking }) => {
  if (!plan) return null;

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
        className="relative w-full max-w-5xl max-h-[90vh] rounded-3xl ultra-glass border-champagne-500/40 bg-white p-6 sm:p-8 shadow-2xl flex flex-col justify-between overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="space-y-0.5">
            <span className="text-xs font-mono text-champagne-700 uppercase tracking-wider font-bold">
              High-Definition Architectural Blueprint
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-champagne-600" />
              {plan.title} {plan.carpet && `(${plan.carpet})`}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-slate-100 hover:bg-champagne-500 text-slate-700 hover:text-white transition cursor-pointer"
            aria-label="Close Blueprint Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* High-Res Image Display */}
        <div className="my-4 relative rounded-2xl bg-white p-4 sm:p-6 flex items-center justify-center overflow-auto max-h-[60vh] border border-slate-200 shadow-inner">
          <img
            src={plan.image}
            alt={plan.title}
            className="max-h-[55vh] max-w-full object-contain"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 text-xs">
          <div className="text-slate-600 text-center sm:text-left font-medium">
            Project: <strong className="text-slate-900">Luxton by Saheel Wakad</strong> • MahaRERA: <span className="font-mono text-champagne-700 font-bold">{projectData.reraNo}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="btn-auric px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer shadow-gold-glow"
            >
              Enquire For This Unit Layout
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
};
