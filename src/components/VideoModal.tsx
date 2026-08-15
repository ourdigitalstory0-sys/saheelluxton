import React from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { projectData } from '../data/projectData';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, onOpenBooking }) => {
  if (!isOpen) return null;

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
        className="relative w-full max-w-4xl rounded-3xl ultra-glass border-champagne-500/40 bg-white p-4 sm:p-6 shadow-2xl space-y-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <span className="text-xs font-mono text-champagne-700 uppercase tracking-wider font-bold">
              Official Project Cinematic Tour
            </span>
            <h3 className="text-lg sm:text-xl font-bold font-cinzel text-slate-900">
              Luxton by Saheel, Wakad
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-slate-100 hover:bg-champagne-500 text-slate-700 hover:text-white transition cursor-pointer"
            aria-label="Close Video"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-slate-200 shadow-inner">
          <video
            src={projectData.videoTourUrl}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-contain"
          />
        </div>

        {/* Action Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs">
          <p className="text-slate-600 font-normal">
            Witness the 4,000 Sq.Ft Grand Lobby, 5-Star Sky Club & luxury residences in 4K.
          </p>

          <button
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="btn-auric px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-gold-glow cursor-pointer"
          >
            <Sparkles className="w-4 h-4" /> Book Live In-Person Walkthrough
          </button>
        </div>
      </motion.div>
    </div>
  );
};
