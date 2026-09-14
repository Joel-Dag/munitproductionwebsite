import React, { useState } from 'react';
import { Instagram, MessageCircle, ExternalLink, X, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getStudioConfig } from '../data/studioData';

interface FloatingContactProps {
  onOpenBooking: () => void;
}

export const FloatingContact: React.FC<FloatingContactProps> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const config = getStudioConfig();

  return (
    <div className="fixed bottom-5 right-5 z-40" id="floating-contact-container">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="mb-3 w-72 rounded-3xl bg-[#FDFBF7] border-2 border-[#D4A373]/40 shadow-2xl p-4 text-[#1A1818]"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E0A96D]/20">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] flex items-center justify-center text-white shadow-xs">
                  <Instagram className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold leading-tight">
                    @{config.instagramUsername}
                  </h4>
                  <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online for Bookings
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-stone-600 mt-2.5 mb-3 leading-relaxed">
              Have questions or ready to book? Chat with our studio lead directly on Instagram or launch the session wizard.
            </p>

            <div className="space-y-2">
              {/* Direct Message Link */}
              <a
                href={config.instagramDmLink}
                target="_blank"
                rel="noopener noreferrer"
                id="floating-dm-button"
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#D4A373] to-[#E0A96D] text-[#1A1818] font-bold text-xs flex items-center justify-between shadow-xs hover:opacity-95 transition-opacity"
              >
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Instagram Direct Message</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {/* Instagram Profile Link */}
              <a
                href={config.instagramProfileLink}
                target="_blank"
                rel="noopener noreferrer"
                id="floating-profile-button"
                className="w-full py-2 px-3 rounded-xl border border-stone-300 hover:bg-stone-100 text-stone-800 text-xs font-medium flex items-center justify-between transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Instagram className="w-3.5 h-3.5 text-[#E0A96D]" />
                  <span>Visit @{config.instagramUsername}</span>
                </div>
                <ExternalLink className="w-3 h-3 text-stone-400" />
              </a>

              {/* Booking wizard quick button */}
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-2 px-3 rounded-xl bg-[#1A1818] text-white hover:bg-stone-800 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#E0A96D]" />
                <span>Launch Booking Wizard</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        type="button"
        id="floating-contact-trigger"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 rounded-full bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white shadow-xl flex items-center justify-center border-2 border-white focus:outline-hidden ring-4 ring-[#E0A96D]/20 cursor-pointer relative"
        aria-label="Contact Studio on Instagram"
      >
        <Instagram className="w-6 h-6" />
        
        {/* Glowing pulse ring */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E0A96D] opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
        </span>
      </motion.button>
    </div>
  );
};
