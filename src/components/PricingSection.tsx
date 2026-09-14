import React, { useState } from 'react';
import { motion } from 'motion/react';
import { STUDIO_PACKAGES } from '../data/studioData';
import { StudioPackage } from '../types';
import { TiltCard } from './TiltCard';
import { Check, ArrowRight, Crown, Flame } from 'lucide-react';

interface PricingSectionProps {
  onSelectPackage: (packageId: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPackage }) => {
  const [filter, setFilter] = useState<'all' | 'production' | 'standalone' | 'rental'>('all');

  const filteredPackages = STUDIO_PACKAGES.filter(pkg => {
    if (filter === 'all') return true;
    return pkg.category === filter;
  });

  // Palette of warm, deep brown gradients for each category & card
  const getBrownTheme = (pkg: StudioPackage, index: number) => {
    if (pkg.id === 'prod-20000') {
      return {
        cardBg: 'bg-gradient-to-b from-[#2B211A] via-[#241A14] to-[#1A130E]',
        textColor: 'text-[#FAF5EC]',
        subtextColor: 'text-[#E0A96D]',
        deliverableText: 'text-[#E8D9C8]',
        border: 'border-2 border-[#E0A96D]',
        shadow: 'shadow-2xl shadow-[#5A3314]/35 hover:shadow-[#E0A96D]/30',
        badgeBg: 'bg-gradient-to-r from-[#D4A373] via-[#E0A96D] to-[#B8824E] text-[#1A1818]',
        badgeBorder: 'border border-[#8C5220]/50',
        btnClass: 'bg-gradient-to-r from-[#D4A373] to-[#E0A96D] text-[#1A1818] hover:opacity-95 font-bold shadow-lg shadow-[#E0A96D]/25',
        isDark: true,
      };
    }

    if (pkg.id === 'rental-prs-with-pedal') {
      return {
        cardBg: 'bg-gradient-to-b from-[#33251D] via-[#2A1D16] to-[#20150F]',
        textColor: 'text-[#FAF5EC]',
        subtextColor: 'text-[#E0A96D]',
        deliverableText: 'text-[#E8D9C8]',
        border: 'border-2 border-[#D4A373]/80',
        shadow: 'shadow-xl shadow-[#5A3314]/25 hover:shadow-[#D4A373]/30',
        badgeBg: 'bg-gradient-to-r from-[#C2854A] to-[#E0A96D] text-[#1A1818]',
        badgeBorder: 'border border-[#8C5220]/50',
        btnClass: 'bg-gradient-to-r from-[#D4A373] to-[#E0A96D] text-[#1A1818] hover:opacity-95 font-bold',
        isDark: true,
      };
    }

    const brownTones = [
      {
        cardBg: 'bg-gradient-to-b from-[#FAF7F2] via-[#F5EEE2] to-[#ECE1D0]',
        textColor: 'text-[#2B1F17]',
        subtextColor: 'text-[#7D481C]',
        deliverableText: 'text-[#3E2D22]',
        border: 'border border-[#D4A373]/50 hover:border-[#A06935]',
        shadow: 'shadow-lg shadow-[#D4A373]/15 hover:shadow-2xl hover:shadow-[#A06935]/25',
        badgeBg: 'bg-[#EAD6C0] text-[#5C320E]',
        badgeBorder: 'border border-[#C59B73]/50',
        btnClass: 'bg-[#2B1F17] hover:bg-[#423023] text-[#FAF5EC] font-semibold',
        isDark: false,
      },
      {
        cardBg: 'bg-gradient-to-b from-[#FCFAF6] via-[#F6F0E7] to-[#EEE4D4]',
        textColor: 'text-[#261A12]',
        subtextColor: 'text-[#8C5220]',
        deliverableText: 'text-[#3A281E]',
        border: 'border border-[#C89F77]/50 hover:border-[#8C5220]',
        shadow: 'shadow-lg shadow-[#C89F77]/15 hover:shadow-2xl hover:shadow-[#8C5220]/25',
        badgeBg: 'bg-[#F0DECB] text-[#633811]',
        badgeBorder: 'border border-[#CCA885]/50',
        btnClass: 'bg-[#261A12] hover:bg-[#3D291D] text-[#FAF5EC] font-semibold',
        isDark: false,
      },
      {
        cardBg: 'bg-gradient-to-b from-[#F9F5EE] via-[#F2E8DA] to-[#E8D8C3]',
        textColor: 'text-[#2E1E14]',
        subtextColor: 'text-[#965A26]',
        deliverableText: 'text-[#442D1F]',
        border: 'border border-[#BFA07E]/50 hover:border-[#965A26]',
        shadow: 'shadow-lg shadow-[#BFA07E]/15 hover:shadow-2xl hover:shadow-[#965A26]/25',
        badgeBg: 'bg-[#E6CEB5] text-[#542F0F]',
        badgeBorder: 'border border-[#C29E7A]/50',
        btnClass: 'bg-[#2E1E14] hover:bg-[#4A3222] text-[#FAF5EC] font-semibold',
        isDark: false,
      }
    ];

    return brownTones[index % brownTones.length];
  };

  return (
    <section id="pricing" className="py-20 md:py-28 bg-[#F5EFE6] relative overflow-hidden">
      {/* 3D ambient radial backdrop gradients */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4A373]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-[#9C6D38]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-[#EEDDC8] via-[#E4CCA8] to-[#D9BC93] border border-[#B88E5E]/40 text-[#543010] text-xs font-bold uppercase tracking-wider shadow-sm shadow-[#A06935]/10"
          >
            <span>Rates & Production Tiers</span>
          </motion.div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#231710] tracking-tight">
            Production & Instrument Rental
          </h2>
          <p className="text-[#5E4B3E] text-sm sm:text-base">
            Transparent pricing with deliverables tailored for independent artists, church worship songs, and media creators.
          </p>

          {/* Filter Tabs */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2.5">
            {[
              { id: 'all', label: 'All Offers' },
              { id: 'production', label: 'Music Production' },
              { id: 'standalone', label: 'Vocal & Mixing' },
              { id: 'rental', label: 'Instrument Rental' },
            ].map(tab => (
              <motion.button
                key={tab.id}
                type="button"
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-sm ${
                  filter === tab.id
                    ? 'bg-gradient-to-r from-[#2B1F17] to-[#1A130E] text-[#FDFBF7] shadow-md shadow-[#2B1F17]/30 border border-[#E0A96D]/40'
                    : 'bg-[#FFFDF9] text-[#543825] hover:bg-[#F2E8DA] border border-[#D4A373]/40'
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* 3D Mouse-Tracking Bending Cards with Top Floating Badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 pt-4">
          {filteredPackages.map((pkg, index) => {
            const theme = getBrownTheme(pkg, index);
            const isBestOffer = pkg.isPopular || pkg.id === 'prod-20000';

            return (
              <div key={pkg.id} className="relative pt-3 flex flex-col h-full">
                {/* Elevated Top Badge: Floats clearly above the card edge, never touching or overlapping internal text */}
                {pkg.badgeText && (
                  <div className="absolute -top-1.5 right-6 z-30 pointer-events-none">
                    <div
                      className={`px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg flex items-center gap-1.5 ${theme.badgeBg} ${theme.badgeBorder}`}
                    >
                      {pkg.id === 'prod-20000' ? (
                        <Crown className="w-3.5 h-3.5 text-[#1A1818]" />
                      ) : (
                        <Flame className="w-3.5 h-3.5 text-[#9E3E0E]" />
                      )}
                      <span>{pkg.badgeText}</span>
                    </div>
                  </div>
                )}

                <TiltCard
                  maxTilt={14}
                  scaleOnHover={1.03}
                  className={`h-full rounded-3xl p-7 pt-7 flex flex-col justify-between overflow-hidden ${theme.cardBg} ${theme.border} ${theme.shadow} ${
                    isBestOffer ? 'ring-2 ring-[#E0A96D]/60' : ''
                  }`}
                >
                  <div className="space-y-5">
                    {/* Category Tag & Header */}
                    <div>
                      <span className="text-[11px] uppercase font-mono tracking-widest font-bold text-[#D4A373] block">
                        {pkg.category === 'rental' ? 'Instrument Rental' : 'Studio Production'}
                      </span>
                      <h3 className={`font-serif text-2xl font-bold mt-1 leading-tight ${theme.textColor}`}>
                        {pkg.title}
                      </h3>
                      {pkg.duration && (
                        <span className="text-xs text-[#D4A373] font-semibold block mt-1">
                          ⏱ {pkg.duration}
                        </span>
                      )}
                      {pkg.note && (
                        <span className="text-xs font-semibold block mt-1 text-[#E0A96D]">
                          ★ {pkg.note}
                        </span>
                      )}
                    </div>

                    {/* Price Tag */}
                    <div className={`flex items-baseline gap-1.5 pb-4 border-b ${
                      theme.isDark ? 'border-stone-800' : 'border-[#D4A373]/30'
                    }`}>
                      <span className={`font-serif text-3xl sm:text-4xl font-extrabold tracking-tight ${theme.textColor}`}>
                        {pkg.priceETB.toLocaleString()} ETB
                      </span>
                      <span className={`text-xs font-bold uppercase tracking-wider ${theme.subtextColor}`}>
                        / {pkg.unit}
                      </span>
                    </div>

                    {/* Deliverables / What's Included */}
                    <div className="space-y-2.5 pt-1">
                      <span className={`text-[11px] font-bold uppercase tracking-wider block ${
                        theme.isDark ? 'text-stone-400' : 'text-[#7D5333]'
                      }`}>
                        What&apos;s Included:
                      </span>
                      {pkg.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                          <div className={`mt-0.5 rounded-full p-0.5 shrink-0 ${
                            theme.isDark ? 'bg-[#E0A96D]/20 text-[#E0A96D]' : 'bg-[#D4A373]/30 text-[#6B3E14]'
                          }`}>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <span className={`font-medium ${theme.deliverableText}`}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Booking Button */}
                  <div className={`mt-8 pt-5 border-t ${
                    theme.isDark ? 'border-stone-800' : 'border-[#D4A373]/30'
                  }`}>
                    <button
                      type="button"
                      onClick={() => onSelectPackage(pkg.id)}
                      className={`w-full py-3.5 px-5 rounded-2xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md ${theme.btnClass}`}
                    >
                      <span>Book This Package</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
