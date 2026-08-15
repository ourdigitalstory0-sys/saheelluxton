import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Overview } from './components/Overview';
import { Highlights } from './components/Highlights';
import { InteractiveTowerExplorer } from './components/InteractiveTowerExplorer';
import { Amenities } from './components/Amenities';
import { FloorPlans } from './components/FloorPlans';
import { PricingCalculator } from './components/PricingCalculator';
import { LocationMatrix } from './components/LocationMatrix';
import { MicroMarketInsights } from './components/MicroMarketInsights';
import { FAQSection } from './components/FAQSection';
import { GalleryModal } from './components/GalleryModal';
import { Specifications } from './components/Specifications';
import { DeveloperLegacy } from './components/DeveloperLegacy';
import { LuxuryComparison } from './components/LuxuryComparison';
import { SEOFooterHub } from './components/SEOFooterHub';
import { VIPBookingModal } from './components/VIPBookingModal';
import { BrochureModal } from './components/BrochureModal';
import { PlanZoomModal } from './components/PlanZoomModal';
import { VideoModal } from './components/VideoModal';
import { SEOArticlesModal } from './components/SEOArticlesModal';
import { SaheelEcosystemHub } from './components/SaheelEcosystemHub';
import { Virtual360Tour } from './components/Virtual360Tour';
import { NRICalculator } from './components/NRICalculator';
import { ConstructionTracker } from './components/ConstructionTracker';
import { TrustGovernance } from './components/TrustGovernance';
import { VastuSunlightSimulator } from './components/VastuSunlightSimulator';
import { PrintableCostSheetModal } from './components/PrintableCostSheetModal';
import { FloatingHUD } from './components/FloatingHUD';
import { Footer } from './components/Footer';
import { UnitPlan } from './types/project';
import { SEOArticle } from './data/seoArticlesData';

export const App: React.FC = () => {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState<boolean>(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [isCostSheetOpen, setIsCostSheetOpen] = useState<boolean>(false);
  const [zoomedPlan, setZoomedPlan] = useState<UnitPlan | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<SEOArticle | null>(null);

  const openBooking = () => setIsBookingModalOpen(true);
  const openBrochure = () => setIsBrochureModalOpen(true);
  const openVideo = () => setIsVideoModalOpen(true);
  const openCostSheet = () => setIsCostSheetOpen(true);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-slate-900 selection:bg-[#FDE18A] selection:text-slate-900">
      {/* Top Navbar with Gliding Pill Navigation */}
      <Navbar
        onOpenBooking={openBooking}
        onOpenBrochure={openBrochure}
      />

      {/* Hero Section */}
      <Hero
        onOpenBooking={openBooking}
        onOpenBrochure={openBrochure}
        onOpenVideo={openVideo}
      />

      {/* Main Content Sections */}
      <main>
        {/* Project Overview & Vision */}
        <Overview
          onOpenBooking={openBooking}
          onOpenBrochure={openBrochure}
          onOpenVideo={openVideo}
        />

        {/* Signature Highlights */}
        <Highlights
          onOpenBooking={openBooking}
        />

        {/* Interactive 30-Storey Tower Explorer */}
        <InteractiveTowerExplorer
          onOpenBooking={openBooking}
          onOpenBrochure={openBrochure}
        />

        {/* Virtual 360 Immersion & Day/Night Lighting Visualizer */}
        <Virtual360Tour
          onOpenBooking={openBooking}
        />

        {/* 5-Star Amenities Showcase */}
        <Amenities
          onOpenBooking={openBooking}
        />

        {/* Interactive Floor Plans & Blueprints */}
        <FloorPlans
          onOpenBooking={openBooking}
          onOpenBrochure={openBrochure}
          onSelectPlanForZoom={(plan) => setZoomedPlan(plan)}
        />

        {/* Interactive Solar Trajectory & 100% Vastu Orientation Simulator */}
        <VastuSunlightSimulator
          onOpenBooking={openBooking}
        />

        {/* Pricing & Financial Planner */}
        <PricingCalculator
          onOpenBooking={openBooking}
          onOpenBrochure={openBrochure}
          onOpenCostSheet={openCostSheet}
        />

        {/* Multi-Currency NRI Investment & High-Yield ROI Calculator */}
        <NRICalculator
          onOpenBooking={openBooking}
          onOpenBrochure={openBrochure}
        />

        {/* Strategic Location & Connectivity */}
        <LocationMatrix
          onOpenBooking={openBooking}
        />

        {/* Pune Real Estate Micro-Market Intelligence & Research Dossiers */}
        <MicroMarketInsights
          onOpenBooking={openBooking}
          onSelectArticle={(art) => setSelectedArticle(art)}
        />

        {/* Homebuyer & Investor FAQ Section (Schema-Optimized) */}
        <FAQSection
          onOpenBooking={openBooking}
        />

        {/* Saheel Properties Master Project Universe & Keyword Explorer */}
        <SaheelEcosystemHub
          onOpenBooking={openBooking}
          onOpenBrochure={openBrochure}
        />

        {/* Cinematic Virtual Gallery */}
        <GalleryModal
          onOpenBooking={openBooking}
        />

        {/* Technical Specifications */}
        <Specifications
          onOpenBrochure={openBrochure}
        />

        {/* MahaRERA Audited Construction Progress Roadmap */}
        <ConstructionTracker
          onOpenBooking={openBooking}
          onOpenBrochure={openBrochure}
        />

        {/* Developer Legacy: Saheel Properties */}
        <DeveloperLegacy
          onOpenBooking={openBooking}
        />

        {/* Institutional Trust, Statutory Clearances & Banking Consortium */}
        <TrustGovernance
          onOpenBooking={openBooking}
          onOpenBrochure={openBrochure}
        />

        {/* Why Luxton Outclasses Ordinary Pune Projects (Pre-Footer) */}
        <LuxuryComparison
          onOpenBooking={openBooking}
        />

        {/* SEO Power Hub with Keyword Clusters & Google Ecosystem Integration */}
        <SEOFooterHub />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={openBooking}
        onOpenBrochure={openBrochure}
      />

      {/* Sticky Floating Quick Actions HUD */}
      <FloatingHUD
        onOpenBooking={openBooking}
        onOpenBrochure={openBrochure}
      />

      {/* Interactive Modals */}
      <VIPBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
      />

      <BrochureModal
        isOpen={isBrochureModalOpen}
        onClose={() => setIsBrochureModalOpen(false)}
      />

      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        onOpenBooking={openBooking}
      />

      <PlanZoomModal
        plan={zoomedPlan}
        onClose={() => setZoomedPlan(null)}
        onOpenBooking={openBooking}
      />

      <SEOArticlesModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onOpenBooking={openBooking}
        onOpenBrochure={openBrochure}
      />

      <PrintableCostSheetModal
        isOpen={isCostSheetOpen}
        onClose={() => setIsCostSheetOpen(false)}
        onOpenBooking={openBooking}
      />
    </div>
  );
};

export default App;
