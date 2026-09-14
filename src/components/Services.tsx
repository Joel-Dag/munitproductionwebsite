import React from 'react';
import { motion } from 'motion/react';
import { TiltCard } from './TiltCard';
import { ArrowUpRight } from 'lucide-react';

interface ServicesProps {
  onSelectService: (packageId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const servicesList = [
    {
      id: 'prod-20000',
      title: 'Full Music Production',
      desc: 'Complete music arrangement, live music recording, vocal harmonization, and mixing & mastering.',
      rate: '20,000 ETB / Track',
      badge: 'FLAGSHIP OFFER',
      theme: {
        bg: 'bg-gradient-to-br from-[#2E2018] via-[#241710] to-[#180E09]',
        text: 'text-[#FAF5EC]',
        subtext: 'text-[#E0A96D]',
        border: 'border-2 border-[#E0A96D]/70',
        shadow: 'shadow-xl shadow-[#5C320E]/30',
        badgeBg: 'bg-gradient-to-r from-[#D4A373] to-[#E0A96D] text-[#1A1818]',
        badgeBorder: 'border border-[#8C5220]/50',
        btnText: 'text-[#E0A96D] hover:text-white',
      }
    },
    {
      id: 'prod-15000',
      title: 'Arrangement & Live Instruments',
      desc: 'Custom music arrangement, live instrumentation, and vocal harmonization.',
      rate: '15,000 ETB / Track',
      badge: 'LIVE MUSIC',
      theme: {
        bg: 'bg-gradient-to-br from-[#FCFAF6] via-[#F6ECE0] to-[#EFE2D2]',
        text: 'text-[#2B1B11]',
        subtext: 'text-[#7D491C]',
        border: 'border border-[#D4A373]/60 hover:border-[#8C5220]',
        shadow: 'shadow-lg shadow-[#D4A373]/15 hover:shadow-xl',
        badgeBg: 'bg-[#EAD4BE] text-[#542F0F]',
        badgeBorder: 'border border-[#C59B73]/50',
        btnText: 'text-[#542F0F] hover:text-[#965A26]',
      }
    },
    {
      id: 'vocal-7000',
      title: 'Vocal Harmonization',
      desc: 'Harmonic arrangements, backing stacks, and vocal layering for lead voices and church songs.',
      rate: '7,000 ETB / Track',
      badge: 'VOCAL SUITE',
      theme: {
        bg: 'bg-gradient-to-br from-[#FDFBF9] via-[#F4E9DC] to-[#E9D9C7]',
        text: 'text-[#26170E]',
        subtext: 'text-[#844F22]',
        border: 'border border-[#C89E76]/60 hover:border-[#844F22]',
        shadow: 'shadow-lg shadow-[#C89E76]/15 hover:shadow-xl',
        badgeBg: 'bg-[#E5CEB6] text-[#502B0D]',
        badgeBorder: 'border border-[#B88E65]/50',
        btnText: 'text-[#502B0D] hover:text-[#915421]',
      }
    },
    {
      id: 'mix-master-10000',
      title: 'Mixing & Mastering',
      desc: 'Clear frequency balance, analog dynamics, and streaming-compliant mastering.',
      rate: '10,000 ETB / Track',
      badge: 'POST PRODUCTION',
      theme: {
        bg: 'bg-gradient-to-br from-[#FAF5ED] via-[#EFE0CE] to-[#E4CFB8]',
        text: 'text-[#2B1B11]',
        subtext: 'text-[#8A5222]',
        border: 'border border-[#BF966E]/60 hover:border-[#8A5222]',
        shadow: 'shadow-lg shadow-[#BF966E]/15 hover:shadow-xl',
        badgeBg: 'bg-[#DFBF9F] text-[#4A2609]',
        badgeBorder: 'border border-[#B3855E]/50',
        btnText: 'text-[#4A2609] hover:text-[#8C501F]',
      }
    }
  ];

  return (
    <section id="services" className="py-20 md:py-28 bg-[#FDFBF7] relative overflow-hidden">
      {/* Soft warm brown ambient background accent */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#E0A96D]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-2xl mb-14 space-y-3">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-[#EEDDC8] to-[#E4CCA8] text-[#543010] text-xs font-bold uppercase tracking-wider border border-[#B88E5E]/40 shadow-xs"
          >
            <span>Studio Services</span>
          </motion.div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#20150F] tracking-tight">
            Production & Live Music Services
          </h2>
          <p className="text-[#5E4B3E] text-sm sm:text-base leading-relaxed">
            From worship and church arrangements to contemporary tracks, we provide high-grade audio capture and live music instrumentation.
          </p>
        </div>

        {/* 4 3D Mouse Bending Tilt Cards with floating top badges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 pt-4">
          {servicesList.map((service) => {
            return (
              <div key={service.id} className="relative pt-3 flex flex-col h-full">
                {/* Elevated Top Badge: Floats clearly above the card, leaving text completely unobstructed */}
                <div className="absolute -top-1.5 right-6 z-30 pointer-events-none">
                  <span className={`inline-block px-3.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-md ${service.theme.badgeBg} ${service.theme.badgeBorder}`}>
                    {service.badge}
                  </span>
                </div>

                <TiltCard
                  maxTilt={12}
                  scaleOnHover={1.02}
                  className={`h-full rounded-3xl p-7 pt-7 flex flex-col justify-between overflow-hidden relative ${service.theme.bg} ${service.theme.border} ${service.theme.shadow}`}
                >
                  <div className="space-y-3">
                    <div>
                      <span className={`text-xs font-bold ${service.theme.subtext}`}>
                        {service.rate}
                      </span>
                    </div>

                    <h3 className={`font-serif text-2xl font-bold ${service.theme.text}`}>
                      {service.title}
                    </h3>
                    <p className={`text-xs sm:text-sm leading-relaxed ${
                      service.theme.text.includes('FAF5EC') ? 'text-[#E8D9C8]' : 'text-[#4A372A]'
                    }`}>
                      {service.desc}
                    </p>
                  </div>

                  <div className={`mt-7 pt-4 border-t flex items-center justify-between ${
                    service.theme.text.includes('FAF5EC') ? 'border-stone-800' : 'border-[#D4A373]/30'
                  }`}>
                    <span className={`text-xs font-semibold ${service.theme.subtext}`}>
                      Deliverables Guaranteed
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectService(service.id)}
                      className={`text-xs sm:text-sm font-bold flex items-center gap-1.5 cursor-pointer ${service.theme.btnText}`}
                    >
                      <span>Book Service</span>
                      <ArrowUpRight className="w-4 h-4" />
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
