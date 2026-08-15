import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, DollarSign, TrendingUp, ShieldCheck, Sparkles, HelpCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { projectData } from '../data/projectData';

interface NRICalculatorProps {
  onOpenBooking: () => void;
  onOpenBrochure: () => void;
}

export const NRICalculator: React.FC<NRICalculatorProps> = ({ onOpenBooking, onOpenBrochure }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<'INR' | 'USD' | 'AED' | 'GBP' | 'EUR'>('USD');
  const [selectedUnit, setSelectedUnit] = useState<'2bhk' | '3bhk' | '4bhk'>('3bhk');
  const [holdingPeriod, setHoldingPeriod] = useState<number>(5);

  const currencyRates: Record<string, { symbol: string; rate: number; label: string }> = {
    INR: { symbol: '₹', rate: 1, label: 'Indian Rupee (INR)' },
    USD: { symbol: '$', rate: 86.5, label: 'US Dollar (USD)' },
    AED: { symbol: 'AED ', rate: 23.55, label: 'UAE Dirham (AED)' },
    GBP: { symbol: '£', rate: 109.2, label: 'British Pound (GBP)' },
    EUR: { symbol: '€', rate: 91.8, label: 'Euro (EUR)' }
  };

  const unitPrices: Record<string, { inr: number; name: string; carpet: string; defaultRent: number }> = {
    '2bhk': { inr: 9700000, name: '2 BHK Luxury', carpet: '753 - 809 Sq.Ft.', defaultRent: 38000 },
    '3bhk': { inr: 13200000, name: '3 BHK Grand Luxury', carpet: '1,027 - 1,162 Sq.Ft.', defaultRent: 55000 },
    '4bhk': { inr: 18600000, name: '4 BHK Presidential', carpet: '1,458 Sq.Ft.', defaultRent: 78000 }
  };

  const currentUnitData = unitPrices[selectedUnit];
  const activeCurrency = currencyRates[selectedCurrency];

  const priceInSelectedCurrency = Math.round(currentUnitData.inr / activeCurrency.rate);
  const annualRentalInr = currentUnitData.defaultRent * 12;
  const annualRentalSelected = Math.round(annualRentalInr / activeCurrency.rate);
  const grossYield = ((annualRentalInr / currentUnitData.inr) * 100).toFixed(2);

  // Projected 5-Year Capital Appreciation (Assumed conservative 11% CAGR in Wakad / West Pune)
  const projectedAppreciationRate = 0.11;
  const projectedValueInr = Math.round(currentUnitData.inr * Math.pow(1 + projectedAppreciationRate, holdingPeriod));
  const projectedValueSelected = Math.round(projectedValueInr / activeCurrency.rate);
  const capitalGainSelected = projectedValueSelected - priceInSelectedCurrency;

  const formatPrice = (amount: number, symbol: string) => {
    return `${symbol} ${amount.toLocaleString()}`;
  };

  return (
    <section id="nri-hub" className="py-24 lg:py-32 relative bg-gradient-to-b from-[#FAF8F5] via-[#F4F0E8] to-[#FAF8F5] overflow-hidden border-t border-champagne-500/20">
      
      {/* Fluid Ambient Glows */}
      <motion.div 
        animate={{ y: [0, 35, 0], x: [0, -25, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 -left-48 w-[550px] h-[550px] bg-champagne-300/20 rounded-full blur-3xl pointer-events-none"
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
            <Globe className="w-4 h-4 text-champagne-600" />
            NRI & Global Investor Gateway
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-slate-900 tracking-tight leading-tight"
          >
            Multi-Currency Investment <br />
            <span className="gold-gradient-text">& High-Yield ROI Calculator</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-600 text-sm sm:text-base font-normal"
          >
            Calculate live rental yields (4.8% - 5.6%), projected multi-year capital gains, and FEMA-compliant repatriation frameworks for overseas investors.
          </motion.p>
        </div>

        {/* Interactive Calculator Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl ultra-glass border-2 border-champagne-500/40 bg-white shadow-milky-card space-y-6">
            
            {/* Currency Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold font-cinzel text-slate-900 uppercase tracking-wider block">
                Select Investment Currency:
              </label>
              <div className="grid grid-cols-5 gap-2">
                {(['USD', 'AED', 'GBP', 'EUR', 'INR'] as const).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setSelectedCurrency(curr)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      selectedCurrency === curr
                        ? 'btn-auric text-white shadow-gold-glow'
                        : 'bg-milky-100 text-slate-700 hover:bg-champagne-100 border border-slate-200'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            {/* Typology Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold font-cinzel text-slate-900 uppercase tracking-wider block">
                Select Typology:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '2bhk', label: '2 BHK Luxury' },
                  { id: '3bhk', label: '3 BHK Grand' },
                  { id: '4bhk', label: '4 BHK Suite' }
                ].map((unit) => (
                  <button
                    key={unit.id}
                    onClick={() => setSelectedUnit(unit.id as any)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                      selectedUnit === unit.id
                        ? 'btn-auric text-white shadow-gold-glow'
                        : 'bg-milky-100 text-slate-700 hover:bg-champagne-100 border border-slate-200'
                    }`}
                  >
                    {unit.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Holding Period Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-900 font-cinzel uppercase">Investment Horizon:</span>
                <span className="font-mono font-bold text-champagne-700 text-sm">{holdingPeriod} Years</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={holdingPeriod}
                onChange={(e) => setHoldingPeriod(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-champagne-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>1 Year</span>
                <span>5 Years (Optimal)</span>
                <span>10 Years</span>
              </div>
            </div>

            {/* NRI Exclusive Facilitation Badges */}
            <div className="p-4 rounded-2xl bg-milky-100 border border-champagne-400/40 space-y-2 text-xs">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 font-cinzel">
                <ShieldCheck className="w-4 h-4 text-champagne-600" /> NRI Special Benefits at Saheel Luxton:
              </div>
              <ul className="space-y-1 text-[11px] text-slate-600">
                <li>• 100% NRE/NRO Account Bank Repatriation Compliance under RBI & FEMA</li>
                <li>• Remote Video Consultations & Digital Documentation Facilitation</li>
                <li>• Dedicated NRI Relationship Director on 24/7 Global Timezones</li>
              </ul>
            </div>

          </div>

          {/* ROI & Capital Gains Display Column */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl ultra-glass border-2 border-champagne-500/40 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white shadow-2xl space-y-6">
            
            <div className="flex justify-between items-start border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-champagne-400 font-bold block">Asset Price ({selectedCurrency})</span>
                <strong className="text-3xl sm:text-4xl font-black font-cinzel gold-gradient-text">
                  {formatPrice(priceInSelectedCurrency, activeCurrency.symbol)}
                </strong>
                <div className="text-[11px] text-slate-400 mt-0.5">INR Value: ₹{(currentUnitData.inr / 100000).toFixed(2)} Lakhs*</div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono uppercase text-champagne-400 font-bold block">Gross Rental Yield</span>
                <span className="text-2xl font-black font-mono text-emerald-400">{grossYield}%</span>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Est. Monthly Rent</span>
                <strong className="text-base sm:text-lg font-bold text-white font-mono mt-1 block">
                  {formatPrice(Math.round(currentUnitData.defaultRent / activeCurrency.rate), activeCurrency.symbol)}
                </strong>
                <span className="text-[10px] text-emerald-400">High IT demand</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Projected {holdingPeriod}-Yr Gain</span>
                <strong className="text-base sm:text-lg font-bold text-champagne-400 font-mono mt-1 block">
                  +{formatPrice(capitalGainSelected, activeCurrency.symbol)}
                </strong>
                <span className="text-[10px] text-slate-300">~11% CAGR Wakad</span>
              </div>
            </div>

            {/* Projected Asset Value */}
            <div className="p-4 rounded-2xl bg-champagne-500/10 border border-champagne-400/30 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-champagne-400 font-bold block">Projected Value After {holdingPeriod} Years</span>
                <strong className="text-xl font-bold font-mono text-white">
                  {formatPrice(projectedValueSelected, activeCurrency.symbol)}
                </strong>
              </div>
              <TrendingUp className="w-8 h-8 text-champagne-400" />
            </div>

            {/* CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="btn-auric py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-gold-glow cursor-pointer"
              >
                <Sparkles className="w-4 h-4" /> Book NRI Consultation
              </button>
              <button
                onClick={onOpenBrochure}
                className="btn-auric-outline py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer text-white border-champagne-400/50 hover:bg-white/10"
              >
                Download NRI Dossier
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
