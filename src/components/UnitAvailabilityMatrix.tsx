import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Compass, Layers, CheckCircle2, Sparkles, Download, Eye, ArrowRight, ShieldCheck } from 'lucide-react';
import { projectData } from '../data/projectData';

interface UnitAvailabilityMatrixProps {
  onOpenBooking: () => void;
  onOpenBrochure: () => void;
}

interface UnitInventoryItem {
  unitCode: string;
  tower: 'Tower A' | 'Tower B' | 'Tower C';
  floorRange: 'Low Rise (1-10)' | 'Mid Rise (11-20)' | 'High Rise (21-30)';
  typology: '2 BHK Luxury' | '3 BHK Grand Luxury' | '4 BHK Presidential';
  carpetArea: string;
  facing: 'East (Sunrise View)' | 'West (Skyline View)' | 'North-East (Vastu Prime)';
  status: 'Available' | 'Fast Selling' | 'Limited Units';
  features: string[];
}

export const UnitAvailabilityMatrix: React.FC<UnitAvailabilityMatrixProps> = ({
  onOpenBooking,
  onOpenBrochure
}) => {
  const [selectedTower, setSelectedTower] = useState<string>('all');
  const [selectedTypology, setSelectedTypology] = useState<string>('all');
  const [selectedFloor, setSelectedFloor] = useState<string>('all');

  const inventory: UnitInventoryItem[] = [
    {
      unitCode: 'LUX-A-201',
      tower: 'Tower A',
      floorRange: 'Low Rise (1-10)',
      typology: '2 BHK Luxury',
      carpetArea: '753 Sq. Ft.',
      facing: 'East (Sunrise View)',
      status: 'Available',
      features: ['Designer Walk-In Closet', 'Garden Podium View', 'Zero Passage Wastage']
    },
    {
      unitCode: 'LUX-A-1402',
      tower: 'Tower A',
      floorRange: 'Mid Rise (11-20)',
      typology: '3 BHK Grand Luxury',
      carpetArea: '1,027 Sq. Ft.',
      facing: 'North-East (Vastu Prime)',
      status: 'Fast Selling',
      features: ['3 Bathrooms', 'Private Master Dressing Suite', 'Unobstructed Horizon View']
    },
    {
      unitCode: 'LUX-A-2701',
      tower: 'Tower A',
      floorRange: 'High Rise (21-30)',
      typology: '4 BHK Presidential',
      carpetArea: '1,458 Sq. Ft.',
      facing: 'West (Skyline View)',
      status: 'Limited Units',
      features: ['270° Panoramic Skyline', 'Rooftop Aqua Club Access', 'Private Entrance Foyer']
    },
    {
      unitCode: 'LUX-B-504',
      tower: 'Tower B',
      floorRange: 'Low Rise (1-10)',
      typology: '2 BHK Luxury',
      carpetArea: '809 Sq. Ft.',
      facing: 'East (Sunrise View)',
      status: 'Available',
      features: ['Extended Living Balcony', 'Vastu Compliant Kitchen', 'Italian Marble Foyer']
    },
    {
      unitCode: 'LUX-B-1803',
      tower: 'Tower B',
      floorRange: 'Mid Rise (11-20)',
      typology: '3 BHK Grand Luxury',
      carpetArea: '1,162 Sq. Ft.',
      facing: 'North-East (Vastu Prime)',
      status: 'Fast Selling',
      features: ['Dual Balconies', 'Walk-In Dressing Room', 'Phoenix Mall Skyline View']
    },
    {
      unitCode: 'LUX-C-2502',
      tower: 'Tower C',
      floorRange: 'High Rise (21-30)',
      typology: '4 BHK Presidential',
      carpetArea: '1,458 Sq. Ft.',
      facing: 'West (Skyline View)',
      status: 'Limited Units',
      features: ['Cloud Deck Level', 'Double Height Living Option', 'Smart Home Automation']
    }
  ];

  const filteredInventory = inventory.filter(item => {
    const matchTower = selectedTower === 'all' || item.tower === selectedTower;
    const matchTypology = selectedTypology === 'all' || item.typology.includes(selectedTypology);
    const matchFloor = selectedFloor === 'all' || item.floorRange.includes(selectedFloor);
    return matchTower && matchTypology && matchFloor;
  });

  return (
    <section id="inventory-matrix" className="py-24 lg:py-32 relative bg-white overflow-hidden border-t border-champagne-500/20">
      
      {/* Fluid Gliding Background Glow */}
      <motion.div 
        animate={{ scale: [1, 1.08, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 -right-48 w-[600px] h-[600px] bg-champagne-300/15 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full ultra-glass border-champagne-500/40 text-champagne-800 text-xs font-bold uppercase tracking-widest shadow-sm"
          >
            <Layers className="w-4 h-4 text-champagne-600" />
            Live Tower & Unit Configuration Matrix
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-slate-900 tracking-tight leading-tight"
          >
            Interactive Inventory Selector <br />
            <span className="gold-gradient-text">& Floor-by-Floor Blueprint Explorer</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-600 text-sm sm:text-base font-normal"
          >
            Filter across 3 luxury towers, 30 storeys, and specific Vastu orientations to discover your preferred skyline residence.
          </motion.p>
        </div>

        {/* 3-Way Filter Control Bar */}
        <div className="p-4 sm:p-6 rounded-3xl ultra-glass border-2 border-champagne-500/30 bg-milky-50/70 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Tower Filter */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-champagne-800 font-bold uppercase tracking-wider block">
              Select Tower
            </span>
            <select
              value={selectedTower}
              onChange={(e) => setSelectedTower(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-champagne-500 cursor-pointer shadow-sm"
            >
              <option value="all">All 3 Towers (A, B, C)</option>
              <option value="Tower A">Tower A (Grand Lobby Entry)</option>
              <option value="Tower B">Tower B (Central Podium View)</option>
              <option value="Tower C">Tower C (Sky Deck View)</option>
            </select>
          </div>

          {/* Typology Filter */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-champagne-800 font-bold uppercase tracking-wider block">
              Select Typology
            </span>
            <select
              value={selectedTypology}
              onChange={(e) => setSelectedTypology(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-champagne-500 cursor-pointer shadow-sm"
            >
              <option value="all">All Typologies (2, 3 & 4 BHK)</option>
              <option value="2 BHK">2 BHK Luxury (753 - 809 sq.ft)</option>
              <option value="3 BHK">3 BHK Grand Luxury (1,027 - 1,162 sq.ft)</option>
              <option value="4 BHK">4 BHK Presidential (1,458 sq.ft)</option>
            </select>
          </div>

          {/* Floor Level Filter */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-champagne-800 font-bold uppercase tracking-wider block">
              Floor Elevation Band
            </span>
            <select
              value={selectedFloor}
              onChange={(e) => setSelectedFloor(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-champagne-500 cursor-pointer shadow-sm"
            >
              <option value="all">All Storeys (1 to 30)</option>
              <option value="Low Rise">Low Rise (Floors 1 – 10)</option>
              <option value="Mid Rise">Mid Rise (Floors 11 – 20)</option>
              <option value="High Rise">High Rise (Floors 21 – 30)</option>
            </select>
          </div>

        </div>

        {/* Inventory Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInventory.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="p-6 rounded-3xl ultra-glass border-2 border-champagne-500/30 bg-white shadow-milky-card flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                
                {/* Top Badge Row */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-slate-900 text-champagne-300 font-mono text-[10px] font-bold">
                    {item.unitCode} • {item.tower}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                    item.status === 'Available' ? 'bg-emerald-100 text-emerald-800' :
                    item.status === 'Fast Selling' ? 'bg-amber-100 text-amber-800' :
                    'bg-rose-100 text-rose-800'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold font-cinzel text-slate-900 group-hover:text-champagne-700 transition-colors">
                    {item.typology}
                  </h3>
                  <span className="text-xs font-mono font-bold text-champagne-800 block">
                    RERA Usable Carpet: {item.carpetArea}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-milky-50 border border-slate-100 space-y-1 text-xs">
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <Compass className="w-3.5 h-3.5 text-champagne-600" /> Facing:
                    </span>
                    <strong className="text-slate-900 font-bold">{item.facing}</strong>
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <Building2 className="w-3.5 h-3.5 text-champagne-600" /> Level:
                    </span>
                    <strong className="text-slate-900 font-bold">{item.floorRange}</strong>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-1.5 pt-1">
                  {item.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-slate-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-champagne-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={onOpenBrochure}
                  className="btn-auric-outline py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-champagne-600" /> Plan
                </button>
                <button
                  onClick={onOpenBooking}
                  className="btn-auric py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 text-slate-950 shadow-sm cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Reserve
                </button>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
