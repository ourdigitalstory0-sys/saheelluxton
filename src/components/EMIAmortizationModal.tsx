import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Calculator, DollarSign, ShieldCheck, CheckCircle2, TrendingDown, Sparkles, Building } from 'lucide-react';
import { projectData } from '../data/projectData';

interface EMIAmortizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  loanAmountLakhs: number;
  interestRate: number;
  tenureYears: number;
  onOpenBooking: () => void;
}

export const EMIAmortizationModal: React.FC<EMIAmortizationModalProps> = ({
  isOpen,
  onClose,
  loanAmountLakhs,
  interestRate,
  tenureYears,
  onOpenBooking
}) => {
  if (!isOpen) return null;

  const principal = loanAmountLakhs * 100000;
  const monthlyRate = interestRate / (12 * 100);
  const totalMonths = tenureYears * 12;

  // Monthly EMI Calculation
  const monthlyEMI = Math.round(
    (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const totalPayment = monthlyEMI * totalMonths;
  const totalInterest = totalPayment - principal;

  // Generate Year-by-Year Amortization Breakdown
  const generateAmortization = () => {
    let balance = principal;
    const schedule = [];

    for (let yr = 1; yr <= tenureYears; yr++) {
      let yearlyInterest = 0;
      let yearlyPrincipal = 0;

      for (let m = 1; m <= 12; m++) {
        const interestForMonth = balance * monthlyRate;
        const principalForMonth = monthlyEMI - interestForMonth;
        yearlyInterest += interestForMonth;
        yearlyPrincipal += principalForMonth;
        balance -= principalForMonth;
        if (balance < 0) balance = 0;
      }

      schedule.push({
        year: yr,
        principalPaid: Math.round(yearlyPrincipal),
        interestPaid: Math.round(yearlyInterest),
        totalYearly: Math.round(yearlyPrincipal + yearlyInterest),
        balanceRemaining: Math.max(0, Math.round(balance))
      });
    }
    return schedule;
  };

  const schedule = generateAmortization();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-md overflow-y-auto print:p-0 print:bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-4xl rounded-3xl ultra-glass border-2 border-champagne-500/40 bg-white p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto print:max-h-none print:shadow-none print:border-none"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4 print:border-black">
          <div>
            <span className="px-3 py-1 rounded-full bg-champagne-100 text-champagne-800 text-[10px] font-mono font-bold uppercase">
              Financial Intelligence & Amortization Schedule
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-slate-900 mt-1">
              Loan Repayment & Tax Optimization Planner
            </h3>
            <p className="text-xs text-slate-500 font-mono">
              Saheel Luxton Wakad • MahaRERA PM1260002502043
            </p>
          </div>

          <div className="flex items-center gap-2 print:hidden">
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1.5 text-xs font-bold cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Print Schedule
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Loan Summary Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-milky-50 border border-champagne-400/30">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Loan Amount</span>
            <strong className="text-sm font-bold font-cinzel text-slate-900 block">₹{loanAmountLakhs} Lakhs</strong>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Interest Rate</span>
            <strong className="text-sm font-bold font-cinzel text-slate-900 block">{interestRate}% p.a.</strong>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Tenure</span>
            <strong className="text-sm font-bold font-cinzel text-slate-900 block">{tenureYears} Years</strong>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Monthly EMI</span>
            <strong className="text-sm font-bold font-cinzel text-champagne-800 block">₹{monthlyEMI.toLocaleString('en-IN')}/mo</strong>
          </div>
        </div>

        {/* Tax Benefits Advisory Callout */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-champagne-50 to-white border border-champagne-300 text-xs text-slate-800 space-y-1 shadow-sm">
          <div className="flex items-center gap-2 font-bold font-cinzel text-slate-900">
            <Sparkles className="w-4 h-4 text-champagne-600" />
            <span>Annual Home Loan Tax Deductions Available:</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            • <strong>Section 24(b)</strong>: Deduct up to <strong>₹2,00,000/year</strong> on interest paid for self-occupied properties.<br />
            • <strong>Section 80C</strong>: Deduct up to <strong>₹1,50,000/year</strong> on principal repayment plus 7% Maharashtra Stamp Duty.
          </p>
        </div>

        {/* Amortization Schedule Table */}
        <div className="space-y-2">
          <span className="text-xs font-bold font-cinzel text-slate-900 uppercase tracking-wider block">
            Year-by-Year Repayment Roadmap
          </span>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-mono text-[10px] uppercase">
                  <th className="p-3">Year</th>
                  <th className="p-3">Principal (₹)</th>
                  <th className="p-3">Interest (₹)</th>
                  <th className="p-3">Total Payment (₹)</th>
                  <th className="p-3">Remaining Balance (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {schedule.map((row) => (
                  <tr key={row.year} className="hover:bg-milky-50 transition-colors">
                    <td className="p-3 font-bold text-slate-900">Year {row.year}</td>
                    <td className="p-3 text-emerald-700 font-semibold">₹{row.principalPaid.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-amber-700">₹{row.interestPaid.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-slate-800">₹{row.totalYearly.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-slate-500">₹{row.balanceRemaining.toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 print:hidden border-t border-slate-100">
          <span className="text-[11px] font-mono text-slate-500">
            Pre-approved by SBI, HDFC, ICICI, Axis Bank (80% LTV).
          </span>

          <button
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="w-full sm:w-auto btn-auric px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-slate-950 shadow-gold-glow cursor-pointer"
          >
            Lock Bank Special ROI Offer
          </button>
        </div>

      </motion.div>
    </div>
  );
};
