import React from 'react';
import { Instagram, Phone, MapPin } from 'lucide-react';
import { getStudioConfig } from '../data/studioData';
import { StudioLogo } from './StudioLogo';

export const Footer: React.FC = () => {
  const config = getStudioConfig();

  return (
    <footer className="bg-[#141211] text-stone-300 py-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-stone-800">
          <div>
            <StudioLogo />
            <p className="text-xs text-stone-400 mt-2 max-w-sm">
              Music arrangement, live music instrumentation, piano, bass, vocal harmonization, mixing, and mastering in Addis Ababa.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-stone-400">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#E0A96D]" />
              <span>{config.studioLocation}</span>
            </div>
            <a
              href={config.instagramProfileLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#E0A96D] transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-[#E0A96D]" />
              <span>@{config.instagramUsername}</span>
            </a>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#E0A96D]" />
              <span>{config.studioPhone}</span>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <p>&copy; {new Date().getFullYear()} Munit Production. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#about" className="hover:text-stone-300">About</a>
            <a href="#services" className="hover:text-stone-300">Services</a>
            <a href="#pricing" className="hover:text-stone-300">Rates</a>
            <a href="#gear" className="hover:text-stone-300">Instruments</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
