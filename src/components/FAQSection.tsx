import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { projectData } from '../data/projectData';

interface FAQSectionProps {
  onOpenBooking: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenBooking }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is the MahaRERA registration number of Saheel Luxton Wakad?",
      answer: `Saheel Luxton is registered under the Maharashtra Real Estate Regulatory Authority (MahaRERA) with registration number ${projectData.reraNo}. All sanctioned building plans, layout approvals, floor plates, and possession timelines strictly adhere to MahaRERA statutory standards and can be verified directly on the official MahaRERA online portal.`
    },
    {
      question: "What typologies and carpet areas are available at Saheel Luxton Pune?",
      answer: "Saheel Luxton offers luxury 2 BHK (753 - 809 sq. ft. usable carpet), 3 BHK Grand Luxury (1,027 - 1,162 sq. ft. usable carpet), and 4 BHK Presidential Sky Suites (1,458 sq. ft. usable carpet). Every layout features zero passage wastage, 100% Vastu compliance, and private master bedroom designer walk-in dressing suites."
    },
    {
      question: "What is the starting price for 2 BHK, 3 BHK, and 4 BHK apartments at Luxton by Saheel?",
      answer: "Residences at Saheel Luxton start at ₹97 Lakhs* onwards for 2 BHK luxury apartments, ₹1.32 Cr* onwards for 3 BHK grand luxury apartments, and ₹1.86 Cr* onwards for 4 BHK presidential suites. Flexible construction-linked payment milestones and special financial schemes are offered with leading banking partners."
    },
    {
      question: "How far is Saheel Luxton from Hinjawadi Rajiv Gandhi Infotech Park and Baner?",
      answer: "Saheel Luxton is centrally positioned in prime Wakad: Hinjawadi IT Park Phase 1 is just 8 to 10 minutes away, Phoenix Mall of the Millennium is 5 minutes away, Mumbai-Pune Expressway is 5 minutes away, and Balewadi High Street / Baner is under 12 minutes away via wide 6-lane arterial roads."
    },
    {
      question: "What are the signature 5-Star amenities at Saheel Luxton?",
      answer: "Saheel Luxton delivers over 30 curated world-class amenities across dual levels. Highlights include Pune's 1st 4,000 sq. ft. Double-Height Grand Arrival Lobby, a 5-Star Rooftop Aqua Theatre for cinematic open-air movie screenings, an infinity-edge horizon pool, sky cocktail deck, co-working suites, private fitness studios, and multi-tier sports courts."
    },
    {
      question: "Which banks have approved home loans for Saheel Luxton Wakad?",
      answer: "Saheel Luxton is approved by all premier nationalized and private banking institutions, including State Bank of India (SBI), HDFC Bank, ICICI Bank, Axis Bank, Bank of Baroda, and Kotak Mahindra Bank. Special interest rates, quick sanction turnarounds, and pre-approved loans are available for eligible buyers."
    },
    {
      question: "What construction technology and quality standards are implemented?",
      answer: "The project uses advanced earthquake-resistant RCC shear wall technology conforming to IS seismic engineering codes. Features include acoustic insulation between adjacent residences, high-grade vitrified and marble flooring, concealed copper wiring with modular switches, branded sanitary ware (Kohler/Toto or equivalent), and multi-tier 24/7 security."
    },
    {
      question: "Who is the developer behind Saheel Luxton, and what is their track record in Pune?",
      answer: "Saheel Luxton is developed by Saheel Properties, one of West Pune's most reputed luxury developers with over 25 years of legacy, 10+ million square feet delivered, and a thriving community of over 8,500 happy homeowners across landmark developments in Wakad, Hinjawadi, Tathawade, Balewadi, and Ravet."
    }
  ];

  return (
    <section id="faqs" className="py-24 lg:py-32 relative bg-white overflow-hidden">
      
      {/* Ambient Fluid Glows */}
      <motion.div 
        animate={{ y: [0, 35, 0], x: [0, -25, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 -left-48 w-[550px] h-[550px] bg-champagne-300/20 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full ultra-glass border-champagne-500/40 text-champagne-800 text-xs font-bold uppercase tracking-widest shadow-sm"
          >
            <HelpCircle className="w-4 h-4 text-champagne-600" />
            Homebuyer & Investor Guide
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-cinzel text-slate-900 tracking-tight leading-tight"
          >
            Frequently Asked Questions <br />
            <span className="gold-gradient-text">About Saheel Luxton & Pune Real Estate</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-600 text-sm sm:text-base font-normal max-w-2xl mx-auto"
          >
            Everything you need to know regarding MahaRERA certifications, pricing, unit specifications, location advantages, and bank approvals.
          </motion.p>

          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "112px" }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-transparent via-champagne-500 to-transparent mx-auto mt-4"
          />
        </div>

        {/* Accordion FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="ultra-glass rounded-2xl border-champagne-500/30 overflow-hidden bg-white shadow-sm hover:border-champagne-500/60 transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-champagne-700 transition-colors cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-cinzel">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-8 h-8 rounded-full bg-milky-100 flex items-center justify-center text-champagne-700 shrink-0 border border-slate-200"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-5 sm:p-6 pt-0 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-12 text-center p-6 rounded-2xl ultra-glass border-champagne-500/30 bg-gradient-to-r from-champagne-50 via-white to-champagne-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left text-xs text-slate-700">
            <strong>Have customized questions regarding unit floor plates, bank loans, or MahaRERA documents?</strong>
            <p className="text-slate-500 mt-0.5">Our senior relationship directors are available 24/7 for direct consultations.</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={onOpenBooking}
            className="btn-auric px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider shrink-0 shadow-gold-glow cursor-pointer"
          >
            <Sparkles className="w-4 h-4 mr-1.5 inline" /> Speak with Relationship Director
          </motion.button>
        </div>

      </div>
    </section>
  );
};
