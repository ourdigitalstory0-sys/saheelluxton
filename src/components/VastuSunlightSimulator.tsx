import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Compass, Wind, Sparkles, CheckCircle2, Shield, Eye, Clock } from 'lucide-react';

interface VastuSunlightSimulatorProps {
  onOpenBooking: () => void;
}

export const VastuSunlightSimulator: React.FC<VastuSunlightSimulatorProps> = ({ onOpenBooking }) => {
  const [timeHour, setTimeHour] = useState<number>(10); // 6 to 18 (6 AM to 6 PM)
  const [selectedDirection, setSelectedDirection] = useState<'east' | 'north' | 'west' | 'south'>('east');

  const getTimeLabel = (hour: number) => {
    if (hour === 6) return "6:00 AM (Dawn & Sunrise)";
    if (hour < 12) return `${hour}:00 AM (Morning Golden Light)`;
    if (hour === 12) return "12:00 PM (Noon Zenith Overhead)";
    if (hour === 18) return "6:00 PM (Sunset & Twilight)";
    return `${hour - 12}:00 PM (Afternoon Sun)`;
  };

  const getSunlightOpacity = (hour: number) => {
    // Peak light around 11 to 14
    const diff = Math.abs(12 - hour);
    return Math.max(0.2, 1 - (diff * 0.12));
  };

  const vastuHighlights = {
    east: {
      name: "East-Facing Morning Light & Entrance",
      vastuScore: "100% Vastu Compliant",
      benefits: "Welcomes positive Pranic energy, abundant sunrise illumination, and natural circadian rhythm stimulation.",
      keyZones: "Main Entryway, Living Lounge Balcony, Master Dressing"
    },
    north: {
      name: "North-Facing Kuber Zone & Breezeway",
      vastuScore: "100% Vastu Compliant",
      benefits: "Continuous diffuse natural light without excessive thermal heat, optimal prosperity alignment.",
      keyZones: "Children Study Nook, Kitchenette, Dining Area"
    },
    west: {
      name: "West-Facing Golden Sunset & Breeze",
      vastuScore: "Optimal Ventilation",
      benefits: "Spectacular Sahyadri hill sunsets and prevailing evening wind currents from Hinjawadi greens.",
      keyZones: "Panoramic Balcony, Evening Tea Deck"
    },
    south: {
      name: "South-East Agni Zone & Solar Efficiency",
      vastuScore: "100% Vastu Compliant",
      benefits: "Ideal thermal efficiency, moisture elimination, and maximum winter sunlight retention.",
      keyZones: "Designer Modular Kitchen & Utility Zone"
    }
  };

  const currentVastu = vastuHighlights[selectedDirection];

  return (
    <section id="vastu-sunlight" className="py-24 lg:py-32 relative bg-white overflow-hidden border-t border-champagne-500/20">
      
      {/* Dynamic Solar Glow based on Time Slider */}
      <motion.div 
        animate={{ 
          opacity: getSunlightOpacity(timeHour) * 0.4,
          x: (timeHour - 12) * 35,
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 0.8 }}
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-br from-amber-300/40 via-champagne-400/30 to-transparent rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full ultra-glass border-champagne-500/40 text-champagne-800 text-xs font-bold uppercase tracking-widest shadow-sm"
          >
            <Compass className="w-4 h-4 text-champagne-600" />
            Solar Architecture & Vastu Shastra Compliance
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-slate-900 tracking-tight leading-tight"
          >
            Interactive Solar Trajectory <br />
            <span className="gold-gradient-text">& 100% Vastu Orientation Simulator</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-600 text-sm sm:text-base font-normal"
          >
            Experience how 3-side open floor plates maximize cross-ventilation and bathe every 2, 3 & 4 BHK residence in auspicious natural sunlight.
          </motion.p>
        </div>

        {/* Simulator Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls & Solar Dial */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl ultra-glass border-2 border-champagne-500/40 bg-white shadow-milky-card space-y-6">
            
            {/* Time of Day Slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-900 font-cinzel uppercase flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-champagne-600" /> Solar Position Simulator:
                </span>
                <span className="font-mono font-bold text-champagne-700 bg-champagne-100 px-3 py-1 rounded-full text-xs">
                  {getTimeLabel(timeHour)}
                </span>
              </div>

              <input
                type="range"
                min="6"
                max="18"
                step="1"
                value={timeHour}
                onChange={(e) => setTimeHour(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-champagne-600"
              />

              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>🌅 6 AM Sunrise</span>
                <span>☀️ 12 PM Zenith</span>
                <span>🌇 6 PM Sunset</span>
              </div>
            </div>

            {/* Direction Selector */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold font-cinzel text-slate-900 uppercase tracking-wider block">
                Select Vastu Cardinal Direction:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'east', label: 'East (Indra/Sun)' },
                  { id: 'north', label: 'North (Kuber)' },
                  { id: 'west', label: 'West (Varuna)' },
                  { id: 'south', label: 'SE (Agni)' }
                ].map((dir) => (
                  <button
                    key={dir.id}
                    onClick={() => setSelectedDirection(dir.id as any)}
                    className={`py-3 px-2 rounded-2xl text-xs font-bold transition text-center cursor-pointer ${
                      selectedDirection === dir.id
                        ? 'btn-auric text-white shadow-gold-glow'
                        : 'bg-milky-100 text-slate-700 hover:bg-champagne-100 border border-slate-200'
                    }`}
                  >
                    {dir.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Vastu Shastra Metrics */}
            <div className="p-5 rounded-2xl bg-milky-100 border border-champagne-400/40 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-900 font-cinzel">{currentVastu.name}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  {currentVastu.vastuScore}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {currentVastu.benefits}
              </p>
              <div className="pt-2 border-t border-slate-200/80 text-[11px] text-slate-700">
                <strong className="text-slate-900 font-bold">Optimal Rooms:</strong> {currentVastu.keyZones}
              </div>
            </div>

          </div>

          {/* Visual Sunlight & Wind Simulation Box */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl ultra-glass border-2 border-champagne-500/40 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white shadow-2xl space-y-6 relative overflow-hidden">
            
            {/* Ambient Sun Beam Overlay */}
            <motion.div
              style={{ opacity: getSunlightOpacity(timeHour) }}
              className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-champagne-400/15 to-transparent pointer-events-none"
            />

            <div className="flex justify-between items-center border-b border-slate-800 pb-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl btn-auric text-slate-950 flex items-center justify-center font-black">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold font-cinzel text-white">Solar Lux & Thermal Index</h4>
                  <span className="text-[11px] text-champagne-400 font-mono">Dynamic Sun Angle: {((timeHour - 6) * 15)}°</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase text-slate-400 block">Illumination</span>
                <span className="text-lg font-black text-amber-300 font-mono">{Math.round(getSunlightOpacity(timeHour) * 100)}%</span>
              </div>
            </div>

            {/* Simulated Tower Cross-Section Grid */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs relative z-10">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Cross Breeze</span>
                <Wind className="w-5 h-5 text-champagne-400 mx-auto animate-pulse" />
                <strong className="text-white font-mono block text-xs mt-1">3-Side Open</strong>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Ceiling Height</span>
                <Shield className="w-5 h-5 text-champagne-400 mx-auto" />
                <strong className="text-white font-mono block text-xs mt-1">10.5 Ft Clear</strong>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Thermal Glazing</span>
                <Sparkles className="w-5 h-5 text-champagne-400 mx-auto" />
                <strong className="text-white font-mono block text-xs mt-1">DGU Glass</strong>
              </div>
            </div>

            {/* Interactive Architecture Note */}
            <div className="p-4 rounded-2xl bg-champagne-500/10 border border-champagne-400/30 text-xs text-slate-200 relative z-10 leading-relaxed">
              ✨ <strong>Architectural Note:</strong> At Saheel Luxton, every floor plate is oriented with precision solar angles to prevent harsh afternoon glare while channeling Sahyadri breeze currents across all master bedrooms.
            </div>

            {/* CTA */}
            <button
              onClick={onOpenBooking}
              className="w-full btn-auric py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-glow relative z-10 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" /> Book Vastu-Specific Unit Selection Tour
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};
