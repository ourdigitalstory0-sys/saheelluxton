import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, ShieldCheck, Sparkles, PieChart, CheckCircle2 } from 'lucide-react';
import { projectData } from '../data/projectData';

interface PricingCalculatorProps {
  onOpenBooking: () => void;
  onOpenBrochure: () => void;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({ onOpenBooking, onOpenBrochure }) => {
  const [propertyPrice, setPropertyPrice] = useState(9700000); // 97 Lakhs default (2 BHK)
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  // Financial calculations
  const downPaymentAmount = (propertyPrice * downPaymentPercent) / 100;
  const loanAmount = propertyPrice - downPaymentAmount;
  
  const monthlyRate = interestRate / (12 * 100);
  const totalMonths = tenureYears * 12;
  
  const monthlyEmi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const totalPayment = monthlyEmi * totalMonths;
  const totalInterest = totalPayment - loanAmount;

  // Pie chart calculation
  const totalFinancialCost = totalPayment + downPaymentAmount;
  const principalPercent = Math.round((loanAmount / totalPayment) * 100);
  const interestPercent = 100 - principalPercent;

  const formatCurrency = (val: number) => {
    if (val >= 10000000) {
      return `₹ ${(val / 10000000).toFixed(2)} Cr`;
    }
    return `₹ ${(val / 100000).toFixed(2)} Lakhs`;
  };

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <section id="pricing" className="py-24 lg:py-32 relative bg-gradient-to-b from-[#FAF8F5] via-[#F4F0E8] to-[#FAF8F5] overflow-hidden">
      
      {/* Gliding Fluid Background Orbs */}
      <motion.div 
        animate={{ y: [0, 35, 0], x: [0, -30, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-0 w-[550px] h-[550px] bg-champagne-300/25 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full ultra-glass border-champagne-500/40 text-champagne-800 text-xs font-bold uppercase tracking-widest shadow-sm"
          >
            <Calculator className="w-4 h-4 text-champagne-600" />
            Transparent Pricing & Financial Planner
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-slate-900 tracking-tight leading-tight"
          >
            Calculate Your EMI & <br />
            <span className="gold-gradient-text">Unlock Your Dream Home</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-600 text-sm sm:text-base font-normal"
          >
            Plan your investment in Wakad's finest luxury landmark with approved banking partners and customized payment schedules.
          </motion.p>

          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "112px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-transparent via-champagne-500 to-transparent mx-auto mt-4"
          />
        </div>

        {/* 3-Column Pricing Overview Cards with Motion Elevation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {projectData.typologies.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setPropertyPrice(item.priceNumber)}
              className={`cursor-pointer ultra-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-2 transition-all duration-300 bg-white ${
                propertyPrice === item.priceNumber
                  ? 'border-champagne-500 bg-champagne-50/50 shadow-milky-hover scale-102'
                  : 'border-champagne-500/20 hover:border-champagne-500/50 shadow-milky-card'
              }`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-mono text-champagne-700 uppercase tracking-wider font-bold block">Configuration</span>
                    <h4 className="text-xl font-bold font-cinzel text-slate-900 mt-0.5">{item.type}</h4>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-champagne-100 border border-champagne-400 text-champagne-800 text-xs font-mono font-bold">
                    {item.carpetArea}
                  </span>
                </div>

                <div className="pt-2">
                  <div className="text-xs text-slate-500 font-semibold">Starting Price</div>
                  <div className="text-3xl font-black gold-gradient-text font-cinzel tracking-tight mt-0.5">
                    {item.startingPrice}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">* Govt taxes & registration charges extra</div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-200 text-xs text-slate-700">
                  <div className="flex justify-between">
                    <span>Usable Space:</span>
                    <span className="text-slate-950 font-bold">{item.carpetArea}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Balconies:</span>
                    <span className="text-slate-950 font-bold">{item.balconies}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bathrooms:</span>
                    <span className="text-slate-950 font-bold">{item.bathrooms}</span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setPropertyPrice(item.priceNumber);
                }}
                className={`mt-6 w-full py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  propertyPrice === item.priceNumber
                    ? 'btn-auric text-white shadow-sm'
                    : 'bg-milky-200 hover:bg-champagne-500 text-slate-800 hover:text-white border border-slate-200'
                }`}
              >
                {propertyPrice === item.priceNumber ? 'Selected in Calculator' : 'Select to Calculate EMI'}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Interactive EMI Calculation Console with Motion Sliders & Visual Pie Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="ultra-glass rounded-3xl p-6 sm:p-8 lg:p-10 border-champagne-500/30 shadow-milky-card bg-white"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Controls Sliders */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-xl font-bold font-cinzel text-slate-900 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-champagne-600" />
                Loan & EMI Customizer
              </h3>

              {/* Slider 1: Property Value */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-slate-700 font-bold">Property Investment Value:</span>
                  <motion.span 
                    key={propertyPrice}
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    className="font-black text-champagne-700 font-mono text-base"
                  >
                    {formatCurrency(propertyPrice)} ({formatINR(propertyPrice)})
                  </motion.span>
                </div>
                <input
                  type="range"
                  min="8500000"
                  max="25000000"
                  step="200000"
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#B8860B]"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono font-semibold">
                  <span>₹ 85 Lakhs</span>
                  <span>₹ 1.50 Cr</span>
                  <span>₹ 2.50 Cr</span>
                </div>
              </div>

              {/* Slider 2: Down Payment */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-slate-700 font-bold">Down Payment ({downPaymentPercent}%):</span>
                  <span className="font-bold text-slate-900 font-mono text-base">{formatINR(downPaymentAmount)}</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="5"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#B8860B]"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono font-semibold">
                  <span>10% (Min)</span>
                  <span>20% (Standard)</span>
                  <span>50%</span>
                </div>
              </div>

              {/* Slider 3: Interest Rate */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-slate-700 font-bold">Home Loan Interest Rate:</span>
                  <span className="font-black text-champagne-700 font-mono text-base">{interestRate}% p.a.</span>
                </div>
                <input
                  type="range"
                  min="7.5"
                  max="12.0"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#B8860B]"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono font-semibold">
                  <span>7.5%</span>
                  <span>8.5% (Prime Rate)</span>
                  <span>12.0%</span>
                </div>
              </div>

              {/* Slider 4: Loan Tenure */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-slate-700 font-bold">Loan Tenure:</span>
                  <span className="font-bold text-slate-900 font-mono text-base">{tenureYears} Years ({tenureYears * 12} Months)</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  step="1"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#B8860B]"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-mono font-semibold">
                  <span>5 Years</span>
                  <span>20 Years</span>
                  <span>30 Years</span>
                </div>
              </div>

            </div>

            {/* Right Summary Result Card with Animated Counter & Visual Breakdown */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-champagne-50 via-white to-champagne-100 border border-champagne-500/40 space-y-5 shadow-md"
            >
              <div className="text-center space-y-1">
                <span className="text-xs uppercase tracking-widest text-champagne-800 font-bold font-mono">
                  Estimated Monthly Installment
                </span>
                <motion.div 
                  key={monthlyEmi}
                  initial={{ scale: 0.95, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-3xl sm:text-4xl font-black gold-gradient-text font-cinzel tracking-tight py-1"
                >
                  {formatINR(monthlyEmi)}
                  <span className="text-xs sm:text-sm font-sans font-normal text-slate-600"> / month</span>
                </motion.div>
                <p className="text-[11px] text-slate-500 font-medium">
                  Principal: {formatINR(loanAmount)} | Tenure: {tenureYears} Yrs
                </p>
              </div>

              {/* Visual Proportion Bar */}
              <div className="space-y-1.5 pt-2">
                <div className="flex justify-between text-[11px] font-bold">
                  <span className="text-slate-700">Principal: {principalPercent}%</span>
                  <span className="text-champagne-700">Interest: {interestPercent}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-200 overflow-hidden flex shadow-inner">
                  <motion.div 
                    style={{ width: `${principalPercent}%` }}
                    className="bg-slate-900 h-full"
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div 
                    style={{ width: `${interestPercent}%` }}
                    className="bg-champagne-500 h-full"
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              {/* Breakdown Grid */}
              <div className="space-y-2.5 pt-2 border-t border-slate-200 text-xs">
                <div className="flex justify-between items-center text-slate-700">
                  <span>Loan Amount Required:</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">{formatINR(loanAmount)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-700">
                  <span>Total Interest Payable:</span>
                  <span className="font-mono font-bold text-champagne-700 text-sm">{formatINR(totalInterest)}</span>
                </div>
                <div className="flex justify-between items-center text-slate-700 border-t border-slate-200 pt-2">
                  <span className="font-bold text-slate-900">Total Amount (Principal + Interest):</span>
                  <span className="font-mono font-bold text-slate-900 text-sm">{formatINR(totalPayment)}</span>
                </div>
              </div>

              {/* Bank Tie-ups */}
              <div className="p-3 rounded-2xl bg-white border border-champagne-500/20 text-[11px] text-slate-700 space-y-1 shadow-sm">
                <div className="font-bold text-champagne-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-champagne-600" />
                  Approved by Major Financial Institutions:
                </div>
                <p className="text-slate-500 leading-relaxed text-[11px]">
                  SBI, HDFC Bank, ICICI Bank, Axis Bank, Bank of Baroda & Bajaj Housing Finance.
                </p>
              </div>

              {/* CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onOpenBrochure}
                  className="btn-auric-outline py-3.5 rounded-full text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Download Price Sheet
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onOpenBooking}
                  className="btn-auric py-3.5 rounded-full text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-gold-glow cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  Bank Offers & Visit
                </motion.button>
              </div>

            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
