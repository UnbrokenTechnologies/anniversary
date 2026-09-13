import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail, Sparkles, Stars, Calendar } from 'lucide-react';

interface HeroSectionProps {
  onScrollTo: (id: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollTo }) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 pb-16 overflow-hidden">
      {/* Cinematic Ambient Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[600px] rounded-full bg-gradient-to-tr from-[#670d22]/25 via-[#ea638c]/15 to-[#d4af37]/15 blur-[120px] pointer-events-none -z-10" />

      {/* Subtle floating 3D decorative hearts in background */}
      <motion.div
        animate={{ y: [-15, 15, -15], rotate: [0, 8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[18%] left-[8%] md:left-[14%] pointer-events-none opacity-40 blur-[1px] hidden sm:block"
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ea638c]/30 to-transparent flex items-center justify-center border border-[#ea638c]/40 backdrop-blur-md">
          <Heart className="w-8 h-8 text-[#ea638c] fill-[#ea638c]/50" />
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [20, -20, 20], rotate: [0, -10, 0] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-[22%] right-[8%] md:right-[15%] pointer-events-none opacity-40 blur-[1px] hidden sm:block"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#d4af37]/25 to-transparent flex items-center justify-center border border-[#d4af37]/35 backdrop-blur-md">
          <Sparkles className="w-9 h-9 text-[#d4af37]" />
        </div>
      </motion.div>

      {/* Small Badge / Journey Tag */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass-panel border border-[#d4af37]/40 mb-6 shadow-lg shadow-[#000000]/40"
      >
        <Sparkles className="w-4 h-4 text-[#d4af37] animate-spin-slow" />
        <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#f6e6b4] font-medium">
          Celebrating Our Beautiful Journey
        </span>
        <Sparkles className="w-4 h-4 text-[#d4af37] animate-spin-slow" />
      </motion.div>

      {/* Main Heading: Happy Anniversary */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="font-serif-luxury text-3xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#fffaf0] font-normal leading-tight px-2"
      >
        Happy Anniversary
      </motion.h1>

      {/* Handwritten Highlight: Sabnam Rai ❤️ */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3, delay: 0.45 }}
        className="mt-1 mb-4 sm:mb-8 max-w-full px-2"
      >
        <h2 className="font-script text-4xl xs:text-5xl sm:text-7xl md:text-8xl tracking-wide flex items-center justify-center gap-2.5 sm:gap-4 flex-nowrap">
          <span className="gold-shimmer-text font-normal whitespace-nowrap">Sabnam Rai</span>
          <span className="inline-block text-[#ea638c] animate-pulse drop-shadow-[0_0_20px_rgba(234,99,140,0.8)] shrink-0">
            ❤️
          </span>
        </h2>
      </motion.div>

      {/* Romantic Line */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.7 }}
        className="max-w-2xl font-cormorant italic text-lg sm:text-2xl md:text-3xl text-[#ffe3ea] font-light leading-relaxed mb-8 sm:mb-10 px-4"
      >
        “Every moment with you is my favorite memory.”
      </motion.p>

      {/* Two Premium Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.95 }}
        className="flex flex-col xs:flex-row items-center gap-3.5 sm:gap-6 z-20 w-full xs:w-auto px-4 justify-center"
      >
        <button
          onClick={() => onScrollTo('love-story')}
          className="group relative w-full xs:w-auto px-6 py-3 sm:px-8 sm:py-3.5 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-[#ea638c]/20 cursor-pointer"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-[#670d22] via-[#ea638c] to-[#9f1239] transition-transform duration-500 group-hover:scale-105" />
          <span className="relative z-10 flex items-center justify-center gap-2 text-[#fffaf0] font-medium text-sm sm:text-lg tracking-wide">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#ffd1dc] fill-[#ffd1dc] transition-transform group-hover:scale-125" />
            Our Love Story
          </span>
        </button>

        <button
          onClick={() => onScrollTo('love-letter')}
          className="group relative w-full xs:w-auto px-6 py-3 sm:px-8 sm:py-3.5 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 border border-[#d4af37]/60 glass-panel hover:border-[#f6e6b4] cursor-pointer"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/10 to-[#ea638c]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative z-10 flex items-center justify-center gap-2 text-[#f6e6b4] font-medium text-sm sm:text-lg tracking-wide">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#d4af37] transition-transform group-hover:rotate-12" />
            A Letter For You
          </span>
        </button>
      </motion.div>

      {/* Cinematic Stats / Quote Glass Ribbon */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3, delay: 1.2 }}
        className="mt-14 max-w-3xl w-full grid grid-cols-1 sm:grid-cols-3 gap-3 px-4"
      >
        <div className="glass-panel p-4 rounded-2xl flex flex-col items-center">
          <Stars className="w-5 h-5 text-[#d4af37] mb-1" />
          <span className="font-serif-luxury text-sm sm:text-base text-[#fffaf0] font-semibold">Endless Love</span>
          <span className="text-xs text-[#f6e6b4]/70 mt-0.5">Growing stronger each day</span>
        </div>
        <div className="glass-panel p-4 rounded-2xl flex flex-col items-center border-[#ea638c]/30">
          <Heart className="w-5 h-5 text-[#ea638c] mb-1 fill-[#ea638c]/40" />
          <span className="font-serif-luxury text-sm sm:text-base text-[#fffaf0] font-semibold">One Heart, One Soul</span>
          <span className="text-xs text-[#f6e6b4]/70 mt-0.5">Forever intertwined</span>
        </div>
        <div className="glass-panel p-4 rounded-2xl flex flex-col items-center">
          <Calendar className="w-5 h-5 text-[#d4af37] mb-1" />
          <span className="font-serif-luxury text-sm sm:text-base text-[#fffaf0] font-semibold">Timeless Bond</span>
          <span className="text-xs text-[#f6e6b4]/70 mt-0.5">Yesterday, today & always</span>
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="mt-12 opacity-60 flex flex-col items-center gap-1 cursor-pointer"
        onClick={() => onScrollTo('poetic-message')}
      >
        <span className="text-[11px] uppercase tracking-[0.2em] text-[#f6e6b4]">Scroll to unfold</span>
        <div className="w-4 h-7 rounded-full border border-[#f6e6b4]/50 flex items-start justify-center p-1">
          <div className="w-1 h-2 bg-[#d4af37] rounded-full animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};
