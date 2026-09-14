import React from 'react';
import { motion } from 'motion/react';
import { TiltCard } from './TiltCard';

export const GearShowcase: React.FC = () => {
  const gearItems = [
    {
      title: 'Marcus Miller V7 Bass Guitar',
      rate: '4,000 ETB / Rental',
      category: 'BASS GUITAR',
      desc: 'Alder body, Maple neck, active/passive preamp. Available for recording sessions and rental in studio.',
      badge: 'POPULAR RENTAL',
      theme: {
        bg: 'bg-gradient-to-b from-[#2B1D14] via-[#22150E] to-[#180D07]',
        text: 'text-[#FAF5EC]',
        subtext: 'text-[#E0A96D]',
        border: 'border-2 border-[#D4A373]/70',
        shadow: 'shadow-xl shadow-[#4A2609]/30 hover:shadow-[#D4A373]/25',
        badgeBg: 'bg-[#D4A373] text-[#1A1818]',
        badgeBorder: 'border border-[#8C5220]/50',
      }
    },
    {
      title: 'PRS CE SE 24 Lead Guitar (With Pedal)',
      rate: '6,000 ETB / Rental',
      category: 'ELECTRIC GUITAR',
      desc: 'PRS CE SE 24 electric guitar with Boss ME-70 multi-effects pedal included.',
      badge: 'BEST VALUE COMBO',
      theme: {
        bg: 'bg-gradient-to-b from-[#FAF6EE] via-[#EFE5D4] to-[#E4D5BE]',
        text: 'text-[#23150D]',
        subtext: 'text-[#844E20]',
        border: 'border-2 border-[#C2854A]/80 hover:border-[#844E20]',
        shadow: 'shadow-lg shadow-[#C2854A]/15 hover:shadow-2xl hover:shadow-[#C2854A]/25',
        badgeBg: 'bg-gradient-to-r from-[#C2854A] to-[#E0A96D] text-[#1A1818]',
        badgeBorder: 'border border-[#8C5220]/50',
      }
    },
    {
      title: 'PRS CE SE 24 Lead Guitar (Without Pedal)',
      rate: '4,000 ETB / Rental',
      category: 'ELECTRIC GUITAR',
      desc: 'PRS CE SE 24 standalone electric guitar for clean, natural tone capture.',
      badge: 'STANDALONE',
      theme: {
        bg: 'bg-gradient-to-b from-[#FCFAF6] via-[#F5EEE1] to-[#EAE0CF]',
        text: 'text-[#28180E]',
        subtext: 'text-[#8C5220]',
        border: 'border border-[#BFA07E]/60 hover:border-[#8C5220]',
        shadow: 'shadow-lg shadow-[#BFA07E]/10 hover:shadow-2xl hover:shadow-[#8C5220]/25',
        badgeBg: 'bg-[#E0CCB8] text-[#542F0F]',
        badgeBorder: 'border border-[#C29E7A]/50',
      }
    },
    {
      title: 'Keyboard & Studio Monitoring',
      rate: 'In Studio Included',
      category: 'SYNTH & MONITORS',
      desc: 'MIDI keyboards, synthesizers, tuned acoustic monitoring, and pristine vocal microphones.',
      badge: 'STUDIO INCLUDED',
      theme: {
        bg: 'bg-gradient-to-b from-[#F7F2E7] via-[#EDE0CB] to-[#DFCEB2]',
        text: 'text-[#26170E]',
        subtext: 'text-[#7A451A]',
        border: 'border border-[#B38E68]/60 hover:border-[#7A451A]',
        shadow: 'shadow-lg shadow-[#B38E68]/15 hover:shadow-2xl hover:shadow-[#7A451A]/25',
        badgeBg: 'bg-[#D6BA9C] text-[#4A2609]',
        badgeBorder: 'border border-[#9E6F43]/50',
      }
    }
  ];

  return (
    <section id="gear" className="py-20 md:py-28 bg-[#FAF6EE] relative border-b border-[#E0A96D]/20 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#D4A373]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-[#EEDDC8] to-[#E4CCA8] text-[#543010] text-xs font-bold uppercase tracking-wider border border-[#B88E5E]/40 shadow-xs"
          >
            <span>Instruments & Rental</span>
          </motion.div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#20150F] tracking-tight">
            Studio Instruments & Equipment
          </h2>
          <p className="text-[#5E4B3E] text-sm sm:text-base">
            Professional instruments available for session recording and equipment rental in Addis Ababa.
          </p>
        </div>

        {/* 4 3D Mouse Bending Tilt Cards with badges floating clean above the card content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-5">
          {gearItems.map((item) => (
            <div key={item.title} className="relative pt-3 flex flex-col h-full">
              {/* Badge positioned above the card top border, completely clear of text */}
              {item.badge && (
                <div className="absolute -top-1.5 right-5 z-30 pointer-events-none">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider shadow-md ${item.theme.badgeBg} ${item.theme.badgeBorder}`}
                  >
                    {item.badge}
                  </span>
                </div>
              )}

              <TiltCard
                maxTilt={16}
                scaleOnHover={1.03}
                className={`h-full rounded-3xl p-6 pt-6 flex flex-col justify-between overflow-hidden relative ${item.theme.bg} ${item.theme.border} ${item.theme.shadow}`}
              >
                <div className="space-y-3">
                  <div>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#A06935] font-semibold">
                      {item.category}
                    </span>
                  </div>

                  <h3 className={`font-serif text-xl font-bold leading-snug ${item.theme.text}`}>
                    {item.title}
                  </h3>

                  <p className={`text-xs leading-relaxed ${
                    item.theme.text.includes('FAF5EC') ? 'text-[#E8D9C8]' : 'text-[#4A372A]'
                  }`}>
                    {item.desc}
                  </p>
                </div>

                <div className={`mt-6 pt-3.5 border-t flex items-center justify-between ${
                  item.theme.text.includes('FAF5EC') ? 'border-stone-800' : 'border-[#D4A373]/30'
                }`}>
                  <span className={`text-xs font-bold ${item.theme.subtext}`}>
                    {item.rate}
                  </span>
                  <span className="text-[10px] font-mono text-stone-400">
                    Ready
                  </span>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
