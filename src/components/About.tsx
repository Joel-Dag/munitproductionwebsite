import React from 'react';
import { motion } from 'motion/react';
import { TiltCard } from './TiltCard';

export const About: React.FC = () => {
  const pillars = [
    {
      title: 'Music Arrangement',
      desc: 'Careful composition, chord voicing, and harmonic song structure suited for church worship and contemporary releases.',
    },
    {
      title: 'Live Music & Instruments',
      desc: 'Live bass, lead guitar, keyboard, and acoustic captures that bring authentic organic warmth to your songs.',
    },
    {
      title: 'Vocal Harmonization',
      desc: 'Layered harmonies, choir voicing, and melodic counter-melodies tailored to complement lead vocals.',
    },
    {
      title: 'Mixing & Mastering',
      desc: 'Clean frequency balance, analog dynamics, and streaming-compliant loudness for all playback systems.',
    }
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#F4EFE6] relative border-t border-b border-[#E0A96D]/20 overflow-hidden">
      {/* 3D background depth glow */}
      <div className="absolute -bottom-10 left-1/3 w-[600px] h-64 bg-[#D4A373]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-[#EEDDC8] to-[#E4CCA8] text-[#543010] text-xs font-bold uppercase tracking-wider border border-[#B88E5E]/40 shadow-xs"
          >
            <span>About Munit Production</span>
          </motion.div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#20150F] tracking-tight">
            Dedicated Music Production in Addis Ababa
          </h2>
          <p className="text-[#5E4B3E] text-sm sm:text-base leading-relaxed">
            We provide independent singers, choirs, and media producers with high quality music arrangement, live instrument recording, and sound engineering.
          </p>
        </div>

        {/* 4 3D Mouse Bending Tilt Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, index) => {
            const isDark = index === 0;

            return (
              <TiltCard
                key={pillar.title}
                maxTilt={16}
                scaleOnHover={1.03}
                className={`h-full rounded-3xl p-6 pt-7 border shadow-lg flex flex-col justify-between overflow-hidden relative ${
                  isDark
                    ? 'bg-gradient-to-b from-[#2E1E14] via-[#24170E] to-[#180D07] text-[#FAF5EC] border-[#E0A96D]/60 shadow-[#4A2609]/30 hover:shadow-[#E0A96D]/20'
                    : 'bg-gradient-to-b from-[#FFFDFB] via-[#F8EFE4] to-[#EEE2D3] text-[#28180E] border-[#D4A373]/50 shadow-[#D4A373]/10 hover:shadow-2xl hover:shadow-[#A06935]/20'
                }`}
              >
                <div className="space-y-3">
                  <h3 className="font-serif text-xl font-bold">
                    {pillar.title}
                  </h3>

                  <p className={`text-xs sm:text-sm leading-relaxed ${
                    isDark ? 'text-[#E8D9C8]' : 'text-[#503D30]'
                  }`}>
                    {pillar.desc}
                  </p>
                </div>
              </TiltCard>
            );
          })}
        </div>

      </div>
    </section>
  );
};
