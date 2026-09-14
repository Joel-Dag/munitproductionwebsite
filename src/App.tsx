import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { PricingSection } from './components/PricingSection';
import { GearShowcase } from './components/GearShowcase';
import { BookingWizardModal } from './components/BookingWizardModal';
import { FloatingContact } from './components/FloatingContact';
import { FloatingInstruments } from './components/FloatingInstruments';
import { Footer } from './components/Footer';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string>('prod-20000');
  const [bookingNotes, setBookingNotes] = useState<string>('');

  const handleOpenBooking = (packageId?: string, notes?: string) => {
    if (packageId) {
      setSelectedPackageId(packageId);
    }
    if (notes) {
      setBookingNotes(notes);
    } else {
      setBookingNotes('');
    }
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1A1818] font-sans antialiased selection:bg-[#E0A96D]/30 selection:text-[#1A1818] relative">
      {/* Floating 3D Animated Background Musical Instruments */}
      <FloatingInstruments />

      {/* Sticky Navbar with Studio Logo */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Content Sections */}
      <main id="main-content" className="relative z-10">
        {/* Hero Section */}
        <Hero onOpenBooking={() => handleOpenBooking('prod-20000')} />

        {/* Studio About with 3D Mouse Bending Tilt Pillars */}
        <About />

        {/* Core Services with 3D Mouse Bending Tilt Cards */}
        <Services onSelectService={handleOpenBooking} />

        {/* Pricing & Deliverables with 3D Mouse Bending Tilt Cards & Best Offer Badges */}
        <PricingSection onSelectPackage={handleOpenBooking} />

        {/* Instruments & Gear Showcase with 3D Mouse Bending Tilt Cards */}
        <GearShowcase />
      </main>

      {/* Footer */}
      <Footer />

      {/* Booking Wizard Modal with Kewti Calendar */}
      <BookingWizardModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialPackageId={selectedPackageId}
        initialNotes={bookingNotes}
      />

      {/* Floating Quick Contact */}
      <FloatingContact onOpenBooking={() => handleOpenBooking()} />
    </div>
  );
}
