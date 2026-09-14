import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram } from 'lucide-react';
import { StudioLogo } from './StudioLogo';
import { getStudioConfig } from '../data/studioData';

interface NavbarProps {
  onOpenBooking: (packageId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const config = getStudioConfig();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Instruments', href: '#gear' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FDFBF7]/95 backdrop-blur-md shadow-2xs border-b border-[#E0A96D]/20 py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="focus:outline-hidden"
          id="navbar-brand-link"
        >
          <StudioLogo />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-700">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#9C6D38] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <a
            href={config.instagramProfileLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl text-stone-600 hover:text-[#9C6D38] hover:bg-[#E0A96D]/10 transition-colors"
            title={`Instagram @${config.instagramUsername}`}
          >
            <Instagram className="w-5 h-5" />
          </a>

          <button
            type="button"
            onClick={() => onOpenBooking()}
            className="px-5 py-2.5 rounded-xl bg-[#1A1818] text-[#FDFBF7] hover:bg-[#322A23] font-medium text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
          >
            <span>Book Session</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-stone-800 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FDFBF7] border-b border-stone-200 px-5 py-4 space-y-3 shadow-md">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-stone-800 font-medium text-sm hover:text-[#9C6D38]"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-stone-200 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 rounded-xl bg-[#1A1818] text-white text-sm font-medium"
            >
              Book Session
            </button>
            <a
              href={config.instagramProfileLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl border border-stone-300 text-stone-800 text-sm font-medium flex items-center justify-center gap-2"
            >
              <Instagram className="w-4 h-4" />
              <span>@{config.instagramUsername}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
