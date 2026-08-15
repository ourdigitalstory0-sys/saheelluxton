import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Printer, Download, Sparkles, CheckCircle2, ShieldCheck, FileText, Calculator } from 'lucide-react';
import { projectData } from '../data/projectData';

interface PrintableCostSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const PrintableCostSheetModal: React.FC<PrintableCostSheetModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking
}) => {
  const [selectedTypology, setSelectedTypology] = useState<'2bhk' | '3bhk' | '4bhk'>('3bhk');
  const [clientName, setClientName] = useState('Valued Homebuyer');

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const costBreakdowns = {
    '2bhk': {
      title: '2 BHK Luxury Residence',
      carpet: '753 - 809 Sq. Ft.',
      agreementValue: 9700000,
      stampDuty: 679000, // 7% (MH Govt)
      registration: 30000,
      gst: 485000, // 5%
      possessionCharges: 250000
    },
    '3bhk': {
      title: '3 BHK Grand Luxury Residence',
      carpet: '1,027 - 1,162 Sq. Ft.',
      agreementValue: 13200000,
      stampDuty: 924000, // 7%
      registration: 30000,
      gst: 660000, // 5%
      possessionCharges: 350000
    },
    '4bhk': {
      title: '4 BHK Presidential Sky Suite',
      carpet: '1,458 Sq. Ft.',
      agreementValue: 18600000,
      stampDuty: 1302000, // 7%
      registration: 30000,
      gst: 930000, // 5%
      possessionCharges: 450000
    }
  };

  const currentData = costBreakdowns[selectedTypology];
  const allInclusiveTotal =
    currentData.agreementValue +
    currentData.stampDuty +
    currentData.registration +
    currentData.gst +
    currentData.possessionCharges;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn"
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl rounded-3xl ultra-glass border-2 border-champagne-500/40 bg-white p-6 sm:p-8 shadow-2xl overflow-hidden my-auto print:shadow-none print:border-none print:m-0"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-champagne-500 text-slate-700 hover:text-white transition cursor-pointer print:hidden"
          aria-label="Close Cost Sheet Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header & Typology Selector */}
        <div className="space-y-4 border-b border-slate-200 pb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl btn-auric text-slate-950 flex items-center justify-center font-black">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-champagne-700 uppercase tracking-widest font-bold block">
                  Official Estimation Dossier
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-cinzel text-slate-900">
                  Saheel Luxton Cost Sheet
                </h3>
              </div>
            </div>
            <span className="text-[11px] font-mono text-slate-500 hidden sm:block">
              MahaRERA: PM1260002502043
            </span>
          </div>

          {/* Typology Switcher */}
          <div className="grid grid-cols-3 gap-2 pt-1 print:hidden">
            {[
              { id: '2bhk', label: '2 BHK (₹97L*)' },
              { id: '3bhk', label: '3 BHK (₹1.32 Cr*)' },
              { id: '4bhk', label: '4 BHK (₹1.86 Cr*)' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTypology(tab.id as any)}
                className={`py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                  selectedTypology === tab.id
                    ? 'btn-auric text-white shadow-sm'
                    : 'bg-milky-100 text-slate-700 hover:bg-champagne-100 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Printable Cost Sheet Statement */}
        <div className="py-5 space-y-4 text-xs" id="printable-cost-sheet">
          <div className="p-4 rounded-2xl bg-milky-100/80 border border-champagne-400/30 flex justify-between items-center">
            <div>
              <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">Selected Typology</span>
              <strong className="text-base font-bold text-slate-900 font-cinzel">{currentData.title}</strong>
              <span className="text-xs text-slate-600 block">RERA Usable Carpet: {currentData.carpet}</span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-slate-500 uppercase block font-bold">Base Agreement Value</span>
              <strong className="text-lg font-black text-champagne-800 font-mono">
                ₹{(currentData.agreementValue / 100000).toFixed(2)} Lakhs*
              </strong>
            </div>
          </div>

          {/* Detailed Itemized Line Items Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead className="bg-slate-100 text-[10px] font-mono uppercase text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="p-3">Cost Component</th>
                  <th className="p-3">Statutory Basis</th>
                  <th className="p-3 text-right">Estimated Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                <tr>
                  <td className="p-3 font-bold text-slate-900">Agreement Value</td>
                  <td className="p-3 text-slate-500">Base Unit Rate</td>
                  <td className="p-3 text-right font-mono font-bold text-slate-900">₹{currentData.agreementValue.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="p-3">Maharashtra Stamp Duty</td>
                  <td className="p-3 text-slate-500">7% of Agreement Value</td>
                  <td className="p-3 text-right font-mono">₹{currentData.stampDuty.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="p-3">Government Registration</td>
                  <td className="p-3 text-slate-500">Fixed Statutory Charge</td>
                  <td className="p-3 text-right font-mono">₹{currentData.registration.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="p-3">GST (Goods & Services Tax)</td>
                  <td className="p-3 text-slate-500">5% (Without ITC)</td>
                  <td className="p-3 text-right font-mono">₹{currentData.gst.toLocaleString()}</td>
                </tr>
                <tr>
                  <td className="p-3">Infrastructure & Society Charges</td>
                  <td className="p-3 text-slate-500">Maintenance & Electricity</td>
                  <td className="p-3 text-right font-mono">₹{currentData.possessionCharges.toLocaleString()}</td>
                </tr>
                <tr className="bg-champagne-500/10 font-bold text-slate-900 border-t-2 border-champagne-400">
                  <td className="p-3.5 text-sm font-cinzel">Total All-Inclusive Estimated Outlay</td>
                  <td className="p-3.5 text-xs text-champagne-800">Subject to Floor Rise & Selection</td>
                  <td className="p-3.5 text-right font-mono text-base font-black gold-gradient-text">
                    ₹{allInclusiveTotal.toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="text-[10px] text-slate-500 leading-relaxed italic">
            * Note: Government taxes (Stamp Duty & GST) are subject to prevailing laws at the time of registration. Bank home loans pre-approved by SBI, HDFC, ICICI, and Axis Bank up to 80% of property cost.
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200 print:hidden">
          <button
            onClick={handlePrint}
            className="btn-auric-outline px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
          >
            <Printer className="w-4 h-4" /> Print / Save PDF
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            className="btn-auric px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-gold-glow cursor-pointer w-full sm:w-auto justify-center"
          >
            <Sparkles className="w-4 h-4" /> Lock Festive Pricing & Visit
          </button>
        </div>

      </motion.div>
    </div>
  );
};
