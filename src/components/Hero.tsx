import React from 'react';
import { motion } from 'motion/react';
import { Calendar, ChevronRight } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section
      id="hero"
      className="relative min-h-[75vh] pt-28 pb-16 md:pt-36 md:pb-24 flex items-center justify-center bg-[#FDFBF7] overflow-hidden"
    >
      {/* 3D-styled ambient lighting effects & floating glowing orbs */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-[#E0A96D]/15 via-[#D4A373]/20 to-[#9C6D38]/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse"
        style={{ animationDuration: '7s' }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 max-w-3xl mx-auto"
        >
          {/* Pill Tag */}
          <motion.div
            whileHover={{ scale: 1.04, y: -2 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-[#FAF0E4] via-[#F4E3D0] to-[#EBD5BC] border border-[#D4A373]/40 text-[#6B3E14] text-xs font-bold tracking-wide shadow-sm shadow-[#D4A373]/15 cursor-default"
          >
            <span>Music Production Studio &bull; Addis Ababa</span>
          </motion.div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#1A1818] tracking-tight leading-[1.12]">
            Music Production <br />
            <span className="bg-gradient-to-r from-[#633A18] via-[#945724] to-[#C88A4A] bg-clip-text text-transparent">
              & Live Music
            </span>
          </h1>

          <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Professional music arrangement, live music recording, piano, bass, vocal harmonization, mixing, and mastering in Addis Ababa.
          </p>

          {/* Action Buttons with 3D Pop & Hover Lift */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              type="button"
              id="hero-book-session-button"
              onClick={onOpenBooking}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#211A15] via-[#2F241C] to-[#1A1818] text-[#FDFBF7] font-medium text-sm sm:text-base shadow-lg shadow-[#1A1818]/25 hover:shadow-xl hover:shadow-[#1A1818]/30 transition-all flex items-center justify-center gap-2.5 border border-[#E0A96D]/40 group cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#E0A96D]" />
              <span>Book Session</span>
              <ChevronRight className="w-4 h-4 text-[#E0A96D] group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.a
              href="#pricing"
              id="hero-explore-packages-button"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#FFFDF9] hover:bg-[#F9F4EB] text-[#4A2F17] font-semibold text-sm sm:text-base border-2 border-[#D4A373]/50 shadow-md shadow-[#D4A373]/10 transition-all flex items-center justify-center"
            >
              <span>View Rates & Packages</span>
            </motion.a>
          </div>

          {/* Highlights Grid */}
          <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#E0A96D]/25 max-w-2xl mx-auto">
            <motion.div
              whileHover={{ y: -3 }}
              className="p-4 rounded-xl bg-gradient-to-b from-white to-[#FAF6EE] border border-[#E0A96D]/30 shadow-xs"
            >
              <span className="font-bold text-sm sm:text-base text-[#4A2F17] block">Music Prod</span>
              <p className="text-xs text-[#82531F] font-medium mt-0.5">From 10,000 ETB</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -3 }}
              className="p-4 rounded-xl bg-gradient-to-b from-white to-[#FAF6EE] border border-[#E0A96D]/30 shadow-xs"
            >
              <span className="font-bold text-sm sm:text-base text-[#4A2F17] block">Live Music</span>
              <p className="text-xs text-[#82531F] font-medium mt-0.5">Bass, Guitar, Piano</p>
            </motion.div>
            <motion.div
              whileHover={{ y: -3 }}
              className="p-4 rounded-xl bg-gradient-to-b from-white to-[#FAF6EE] border border-[#E0A96D]/30 shadow-xs"
            >
              <span className="font-bold text-sm sm:text-base text-[#4A2F17] block">Mix & Master</span>
              <p className="text-xs text-[#82531F] font-medium mt-0.5">Studio Tuned</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
