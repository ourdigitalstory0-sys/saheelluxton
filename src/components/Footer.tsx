import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Phone, Mail, MapPin, ExternalLink, Instagram, Linkedin, Facebook, Youtube } from 'lucide-react';
import { projectData } from '../data/projectData';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenBrochure: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenBrochure }) => {
  return (
    <footer className="bg-[#FAF8F5] text-slate-600 text-xs border-t border-champagne-500/20 pt-16 pb-24 md:pb-12 relative overflow-hidden">
      
      {/* Gliding Fluid Background Glows */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], y: [0, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-champagne-300/20 rounded-full blur-3xl pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12 relative z-10">
        
        {/* Top RERA Banner with Motion Glow */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          whileHover={{ y: -4 }}
          className="p-6 sm:p-8 rounded-3xl ultra-glass border-champagne-500/40 bg-gradient-to-r from-champagne-100/90 via-white to-champagne-50/90 flex flex-col md:flex-row items-center justify-between gap-6 shadow-milky-card"
        >
          <div className="flex items-center gap-4 text-center md:text-left">
            <motion.div 
              whileHover={{ rotate: 8, scale: 1.1 }}
              className="w-14 h-14 rounded-2xl bg-champagne-200/80 border border-champagne-400 flex items-center justify-center text-champagne-800 shrink-0 shadow-sm"
            >
              <ShieldCheck className="w-8 h-8" />
            </motion.div>
            <div>
              <div className="text-xs font-mono text-champagne-700 uppercase tracking-wider font-bold">
                Government of Maharashtra Real Estate Regulatory Authority
              </div>
              <h4 className="text-base sm:text-lg font-bold font-cinzel text-slate-900">
                MahaRERA Registration No: <span className="font-mono text-champagne-700 font-black">{projectData.reraNo}</span>
              </h4>
              <p className="text-[11px] text-slate-600 mt-0.5 font-normal">
                The project is registered with MahaRERA under the official title <strong className="text-slate-900 font-bold">Luxton By Saheel</strong>.
              </p>
            </div>
          </div>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://maharera.mahaonline.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-auric-outline px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 shrink-0"
          >
            Verify on MahaRERA Portal <ExternalLink className="w-3.5 h-3.5" />
          </motion.a>
        </motion.div>

        {/* Main Footer 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-8 border-b border-slate-200">
          
          {/* Col 1: Brand & Overview */}
          <div className="space-y-4">
            <a href="#" className="flex items-center gap-3.5 group">
              <motion.div 
                whileHover={{ scale: 1.08 }}
                className="w-11 h-11 rounded-2xl bg-gradient-to-br from-champagne-400 to-champagne-800 p-0.5 flex items-center justify-center shadow-sm"
              >
                <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                  <span className="font-cinzel text-2xl font-black gold-gradient-text">L</span>
                </div>
              </motion.div>
              <div className="flex flex-col">
                <span className="font-cinzel text-lg font-black tracking-widest text-slate-900 leading-none">
                  LUXTON
                </span>
                <span className="text-[10px] uppercase tracking-[0.25em] text-champagne-700 font-black mt-0.5">
                  BY SAHEEL • WAKAD
                </span>
              </div>
            </a>

            <p className="text-slate-600 font-normal leading-relaxed">
              Pune’s iconic 30-storey luxury landmark in prime Wakad. Designed with a 4,000 sq.ft Double-Height Grand Lobby, 5-Star Rooftop Aqua Theatre & designer walk-in closets.
            </p>

            {/* Social Media Links */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: <Instagram className="w-4 h-4" />, href: "https://www.instagram.com/saheelpropertiesofficial/", label: "Instagram" },
                { icon: <Linkedin className="w-4 h-4" />, href: "https://www.linkedin.com/company/saheel-properties/", label: "LinkedIn" },
                { icon: <Facebook className="w-4 h-4" />, href: "https://www.facebook.com/SaheelPropertiesOfficial/", label: "Facebook" },
                { icon: <Youtube className="w-4 h-4" />, href: "https://www.youtube.com/@saheelproperties", label: "YouTube" }
              ].map((soc, i) => (
                <motion.a
                  key={i}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white hover:bg-champagne-500 text-slate-700 hover:text-white border border-slate-200 flex items-center justify-center transition-colors shadow-sm"
                  aria-label={soc.label}
                >
                  {soc.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold font-cinzel text-slate-900 uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-slate-600 font-medium">
              {[
                { label: 'Architectural Overview', id: 'overview' },
                { label: 'Signature Highlights', id: 'highlights' },
                { label: '5-Star Rooftop Amenities', id: 'amenities' },
                { label: 'Floor Plans & Blueprints', id: 'plans' },
                { label: 'Pricing & EMI Calculator', id: 'pricing' },
                { label: 'Strategic Location & Map', id: 'location' },
                { label: 'Cinematic Gallery', id: 'gallery' },
                { label: 'Technical Specifications', id: 'specs' }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                      window.history.replaceState(null, '', window.location.pathname);
                    }}
                    className="hover:text-champagne-700 transition-colors text-left cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Typologies & Portfolio */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold font-cinzel text-slate-900 uppercase tracking-wider">
              Luxury Typologies
            </h4>
            <ul className="space-y-2 text-slate-600 font-normal">
              <li><strong className="text-slate-900 font-bold">2 BHK Luxury:</strong> 753 - 809 Sq. Ft.</li>
              <li><strong className="text-slate-900 font-bold">3 BHK Grand Luxury:</strong> 1,027 - 1,162 Sq. Ft.</li>
              <li><strong className="text-slate-900 font-bold">4 BHK Presidential:</strong> 1,458 Sq. Ft.</li>
              <li><strong className="text-slate-900 font-bold">Land Parcel:</strong> 3.38 Acres Gated Sanctuary</li>
              <li><strong className="text-slate-900 font-bold">Elevation:</strong> 30 Storeys Iconic Facade</li>
              <li><strong className="text-slate-900 font-bold">Possession:</strong> June 2030 (MahaRERA)</li>
            </ul>
          </div>

          {/* Col 4: Corporate Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold font-cinzel text-slate-900 uppercase tracking-wider">
              Site & Corporate Office
            </h4>
            <div className="space-y-2.5 text-slate-600 font-normal leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-champagne-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900">Site Address:</strong> S. No. 111, Near Phoenix Mall of the Millennium, Wakad, Pune - 411057
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-champagne-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-900">Headquarters:</strong> {projectData.corporateAddress}
                </span>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-champagne-600" />
                <a href={`tel:${projectData.contactPhone}`} className="hover:text-champagne-700 transition-colors font-mono font-bold text-slate-900">
                  {projectData.contactPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-champagne-600" />
                <a href={`mailto:${projectData.contactEmail}`} className="hover:text-champagne-700 transition-colors font-medium">
                  {projectData.contactEmail}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Statutory Disclaimer & Copyright */}
        <div className="space-y-3 pt-2 text-[11px] text-slate-500 font-normal leading-relaxed">
          <p>
            <strong>Disclaimer:</strong> The imagery, renders, plans, elevations, artistic impressions, features, specifications, and dimensions shown on this website are conceptual and indicative in nature. The promoter reserves the right to amend or alter any aspects as per approvals from relevant statutory authorities. All units are subject to availability.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-slate-200 pt-4 text-slate-600">
            <div>
              © {new Date().getFullYear()} Saheel Properties. All Rights Reserved. | <span className="text-champagne-800 font-bold">Luxton by Saheel (MahaRERA: {projectData.reraNo})</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:underline">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:underline">Terms of Service</a>
              <span>•</span>
              <a href="https://maharera.mahaonline.gov.in" target="_blank" rel="noopener noreferrer" className="text-champagne-700 hover:underline font-bold">MahaRERA Verification</a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
