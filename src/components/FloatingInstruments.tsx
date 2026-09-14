import React from 'react';
import { motion } from 'motion/react';

// Floating 3D animated musical instruments with perspective, realistic shadows, and multi-axis rotation
export const FloatingInstruments: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0 [perspective:1200px]">
      
      {/* 1. 3D Floating Grand Piano Harp & Keys */}
      <motion.div
        animate={{
          y: [-18, 22, -18],
          x: [-12, 14, -12],
          rotateX: [6, -8, 6],
          rotateY: [-10, 12, -10],
          rotateZ: [-4, 5, -4],
        }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-24 left-4 md:left-14 drop-shadow-[0_25px_35px_rgba(107,62,20,0.22)] opacity-40 hover:opacity-75 transition-opacity"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <svg width="150" height="110" viewBox="0 0 150 110" fill="none">
          {/* Subtle gradient definitions */}
          <defs>
            <linearGradient id="pianoBody" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8C5220" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#5C3411" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#2E1807" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="goldRim" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#E0A96D" />
              <stop offset="100%" stopColor="#9C6D38" />
            </linearGradient>
          </defs>
          
          {/* 3D Depth Cast Shadow */}
          <path d="M18 88 L18 35 C18 20, 42 15, 80 15 C122 15, 142 35, 142 88 Z" fill="#2E1807" fillOpacity="0.25" transform="translate(6, 8)" />

          {/* Grand Piano Top Lid Wing with Gold Rim */}
          <path d="M12 80 L12 28 C12 16, 38 10, 75 10 C118 10, 138 32, 138 80 Z" fill="url(#pianoBody)" stroke="url(#goldRim)" strokeWidth="1.8" />

          {/* Soundboard strings harp effect */}
          <line x1="30" y1="30" x2="115" y2="72" stroke="#E0A96D" strokeWidth="0.8" strokeOpacity="0.6" />
          <line x1="40" y1="26" x2="120" y2="72" stroke="#E0A96D" strokeWidth="0.8" strokeOpacity="0.6" />
          <line x1="50" y1="22" x2="125" y2="72" stroke="#E0A96D" strokeWidth="0.8" strokeOpacity="0.6" />
          <line x1="60" y1="20" x2="130" y2="72" stroke="#E0A96D" strokeWidth="0.8" strokeOpacity="0.6" />

          {/* Piano keyboard bed */}
          <rect x="20" y="65" width="105" height="18" rx="3" fill="#1A1818" stroke="#E0A96D" strokeWidth="1.2" />
          
          {/* White ivory keys */}
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={i} x1={26 + i * 7} y1="65" x2={26 + i * 7} y2="83" stroke="#FAF6EE" strokeWidth="1" strokeOpacity="0.9" />
          ))}

          {/* Ebony black keys */}
          <rect x="29" y="65" width="4.5" height="10" rx="1" fill="#1A1818" />
          <rect x="36" y="65" width="4.5" height="10" rx="1" fill="#1A1818" />
          <rect x="50" y="65" width="4.5" height="10" rx="1" fill="#1A1818" />
          <rect x="57" y="65" width="4.5" height="10" rx="1" fill="#1A1818" />
          <rect x="64" y="65" width="4.5" height="10" rx="1" fill="#1A1818" />
          <rect x="78" y="65" width="4.5" height="10" rx="1" fill="#1A1818" />
          <rect x="85" y="65" width="4.5" height="10" rx="1" fill="#1A1818" />
          <rect x="99" y="65" width="4.5" height="10" rx="1" fill="#1A1818" />
          <rect x="106" y="65" width="4.5" height="10" rx="1" fill="#1A1818" />
        </svg>
      </motion.div>

      {/* 2. 3D Floating Marcus Miller Bass Guitar */}
      <motion.div
        animate={{
          y: [20, -26, 20],
          x: [14, -10, 14],
          rotateX: [-8, 12, -8],
          rotateY: [15, -12, 15],
          rotateZ: [22, 34, 22],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        className="absolute top-1/4 right-6 md:right-24 drop-shadow-[0_30px_35px_rgba(92,52,17,0.28)] opacity-45 hover:opacity-80 transition-opacity"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <svg width="85" height="190" viewBox="0 0 85 190" fill="none">
          <defs>
            <linearGradient id="bassBody" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#C88A4A" />
              <stop offset="50%" stopColor="#7A4214" />
              <stop offset="100%" stopColor="#381D08" />
            </linearGradient>
          </defs>

          {/* 3D Offset Body */}
          <path d="M26 110 C14 122, 12 146, 24 168 C34 182, 52 182, 62 168 C74 150, 72 126, 58 110 Z" fill="url(#bassBody)" stroke="#E0A96D" strokeWidth="1.5" />
          
          {/* White Pearl Pickguard (Marcus Miller classic) */}
          <path d="M30 120 C24 128, 22 142, 32 152 C40 152, 44 140, 42 124 Z" fill="#FFFDF8" fillOpacity="0.4" stroke="#FAF6EE" strokeWidth="0.8" />

          {/* Long Maple Neck */}
          <rect x="39" y="32" width="7" height="85" fill="#DDBB90" stroke="#8C5220" strokeWidth="1" />
          
          {/* Fret Markers */}
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1="39" y1={36 + i * 6.5} x2="46" y2={36 + i * 6.5} stroke="#5C3411" strokeWidth="0.7" />
          ))}

          {/* 4 Real Bass Strings */}
          <line x1="40" y1="28" x2="40" y2="155" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.9" />
          <line x1="42" y1="28" x2="42" y2="155" stroke="#FFFFFF" strokeWidth="1.1" strokeOpacity="0.9" />
          <line x1="44" y1="28" x2="44" y2="155" stroke="#FFFFFF" strokeWidth="1.0" strokeOpacity="0.9" />
          <line x1="45.5" y1="28" x2="45.5" y2="155" stroke="#FFFFFF" strokeWidth="0.9" strokeOpacity="0.9" />

          {/* Headstock & 4 Tuners */}
          <path d="M36 6 L49 6 L47 32 L38 32 Z" fill="#DDBB90" stroke="#8C5220" strokeWidth="1.2" />
          <circle cx="33" cy="12" r="3" fill="#E0A96D" stroke="#5C3411" strokeWidth="0.8" />
          <circle cx="33" cy="22" r="3" fill="#E0A96D" stroke="#5C3411" strokeWidth="0.8" />
          <circle cx="52" cy="16" r="3" fill="#E0A96D" stroke="#5C3411" strokeWidth="0.8" />
          <circle cx="52" cy="26" r="3" fill="#E0A96D" stroke="#5C3411" strokeWidth="0.8" />

          {/* Jazz Pickups */}
          <rect x="34" y="130" width="17" height="4.5" rx="1.5" fill="#1A1818" stroke="#E0A96D" strokeWidth="0.8" />
          <rect x="34" y="142" width="17" height="4.5" rx="1.5" fill="#1A1818" stroke="#E0A96D" strokeWidth="0.8" />

          {/* High-Mass Chrome Bridge */}
          <rect x="36" y="156" width="13" height="7" rx="1" fill="#E0A96D" stroke="#5C3411" strokeWidth="0.8" />
        </svg>
      </motion.div>

      {/* 3. 3D Floating PRS CE SE 24 Lead Guitar */}
      <motion.div
        animate={{
          y: [-22, 18, -22],
          x: [-14, 14, -14],
          rotateX: [12, -10, 12],
          rotateY: [-16, 14, -16],
          rotateZ: [-28, -16, -28],
        }}
        transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute bottom-36 left-8 md:left-24 drop-shadow-[0_25px_30px_rgba(107,62,20,0.25)] opacity-40 hover:opacity-75 transition-opacity"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <svg width="80" height="180" viewBox="0 0 80 180" fill="none">
          <defs>
            <linearGradient id="prsBurst" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#D4A373" />
              <stop offset="40%" stopColor="#9C5D26" />
              <stop offset="100%" stopColor="#2B1506" />
            </linearGradient>
          </defs>

          {/* Double Cutaway Contoured Body */}
          <path d="M24 95 C16 102, 14 114, 22 124 C12 136, 15 154, 29 164 C39 169, 47 169, 54 162 C67 152, 67 134, 57 124 C64 114, 62 102, 54 95 Z" fill="url(#prsBurst)" stroke="#E0A96D" strokeWidth="1.5" />

          {/* Neck with Bird Inlays */}
          <rect x="36" y="26" width="6.5" height="74" fill="#C29263" stroke="#6B3E14" strokeWidth="1" />
          {/* Bird inlays */}
          <circle cx="39.2" cy="40" r="1.2" fill="#FAF5EC" />
          <circle cx="39.2" cy="55" r="1.2" fill="#FAF5EC" />
          <circle cx="39.2" cy="70" r="1.2" fill="#FAF5EC" />
          <circle cx="39.2" cy="85" r="1.2" fill="#FAF5EC" />

          {/* PRS Sculpted Headstock */}
          <polygon points="39,8 32,26 46,26" fill="#C29263" stroke="#6B3E14" strokeWidth="1.2" />
          {/* 3 + 3 Tuners */}
          <circle cx="28" cy="14" r="2.5" fill="#E0A96D" />
          <circle cx="28" cy="21" r="2.5" fill="#E0A96D" />
          <circle cx="50" cy="14" r="2.5" fill="#E0A96D" />
          <circle cx="50" cy="21" r="2.5" fill="#E0A96D" />

          {/* Dual Zebra Humbuckers */}
          <rect x="32" y="112" width="15" height="6" rx="1.5" fill="#1A1818" stroke="#E0A96D" strokeWidth="0.8" />
          <rect x="32" y="125" width="15" height="6" rx="1.5" fill="#1A1818" stroke="#E0A96D" strokeWidth="0.8" />

          {/* PRS Tremolo Bridge */}
          <rect x="34" y="139" width="11" height="6" rx="1" fill="#D4A373" stroke="#5C3411" strokeWidth="0.8" />
        </svg>
      </motion.div>

      {/* 4. 3D Floating Synthesizer Keyboard */}
      <motion.div
        animate={{
          y: [16, -20, 16],
          x: [-8, 12, -8],
          rotateX: [10, -12, 10],
          rotateY: [-14, 10, -14],
          rotateZ: [-6, 8, -6],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2.2 }}
        className="absolute bottom-20 right-8 md:right-28 drop-shadow-[0_25px_30px_rgba(92,52,17,0.22)] opacity-45 hover:opacity-80 transition-opacity"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <svg width="130" height="65" viewBox="0 0 130 65" fill="none">
          {/* Synth chassis with wooden side cheeks */}
          <rect x="8" y="12" width="114" height="40" rx="5" fill="#1E1B18" stroke="#E0A96D" strokeWidth="1.5" />
          {/* Wood cheeks */}
          <rect x="8" y="12" width="10" height="40" rx="3" fill="#8C5220" stroke="#5C3411" strokeWidth="1" />
          <rect x="112" y="12" width="10" height="40" rx="3" fill="#8C5220" stroke="#5C3411" strokeWidth="1" />

          {/* Synth knobs & pitch wheel */}
          <circle cx="26" cy="22" r="3" fill="#E0A96D" />
          <circle cx="36" cy="22" r="3" fill="#E0A96D" />
          <circle cx="46" cy="22" r="3" fill="#E0A96D" />
          <rect x="56" y="20" width="18" height="5" rx="1" fill="#332A22" />

          {/* Keybed */}
          <rect x="22" y="30" width="86" height="18" rx="2" fill="#FAF6EE" stroke="#1A1818" strokeWidth="1" />
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1={22 + i * 7.1} y1="30" x2={22 + i * 7.1} y2="48" stroke="#251F1A" strokeWidth="0.8" />
          ))}
          {/* Black keys */}
          <rect x="26" y="30" width="4" height="11" fill="#1A1818" />
          <rect x="33" y="30" width="4" height="11" fill="#1A1818" />
          <rect x="47" y="30" width="4" height="11" fill="#1A1818" />
          <rect x="54" y="30" width="4" height="11" fill="#1A1818" />
          <rect x="61" y="30" width="4" height="11" fill="#1A1818" />
          <rect x="75" y="30" width="4" height="11" fill="#1A1818" />
          <rect x="82" y="30" width="4" height="11" fill="#1A1818" />
          <rect x="96" y="30" width="4" height="11" fill="#1A1818" />
        </svg>
      </motion.div>

    </div>
  );
};
