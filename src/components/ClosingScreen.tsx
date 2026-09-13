import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

export const ClosingScreen: React.FC = () => {
  return (
    <footer className="relative py-28 px-4 sm:px-8 text-center flex flex-col items-center justify-center overflow-hidden border-t border-[#d4af37]/20">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-t from-[#670d22]/30 via-[#1b030b] to-transparent blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-2xl mx-auto flex flex-col items-center space-y-6"
      >
        {/* Soft Toast */}
        <p className="font-cormorant italic text-2xl sm:text-3xl text-[#f6e6b4]/90 tracking-wide">
          “Here’s to us...”
        </p>

        {/* Poetic Lines */}
        <div className="space-y-2">
          <p className="font-serif-luxury text-xl sm:text-3xl text-[#fffaf0] font-normal leading-relaxed">
            To yesterday’s memories,
          </p>
          <p className="font-serif-luxury text-xl sm:text-3xl text-[#ffd1dc] font-normal leading-relaxed">
            today’s love,
          </p>
          <p className="font-serif-luxury text-xl sm:text-3xl text-[#f9d976] font-normal leading-relaxed">
            and all of our tomorrows. ❤️
          </p>
        </div>

        {/* Golden Underline Ornament */}
        <div className="py-4 flex items-center justify-center gap-3">
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-[#d4af37]" />
          <Heart className="w-5 h-5 text-[#ea638c] fill-[#ea638c] animate-pulse" />
          <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-[#d4af37]" />
        </div>

        {/* Happy Anniversary Sabnam Rai ❤️ */}
        <div className="space-y-1">
          <h3 className="font-serif-luxury text-2xl sm:text-4xl text-[#fffaf0] font-normal">
            Happy Anniversary
          </h3>
          <h2 className="font-script text-4xl xs:text-5xl sm:text-7xl md:text-8xl tracking-wide max-w-full px-2">
            <span className="gold-shimmer-text font-normal">Sabnam Rai</span>
            <span className="inline-block ml-2 sm:ml-4 text-[#ea638c] animate-pulse drop-shadow-[0_0_20px_rgba(234,99,140,0.8)]">
              ❤️
            </span>
          </h2>
        </div>

        {/* Animated Infinity Symbol with Glowing Golden & Rose Aura */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative my-4"
        >
          <div className="text-5xl sm:text-6xl text-[#d4af37] drop-shadow-[0_0_25px_rgba(212,175,55,0.7)]">
            ♾️
          </div>
          <div className="absolute -inset-2 bg-gradient-to-r from-[#ea638c]/20 to-[#d4af37]/20 blur-xl rounded-full pointer-events-none" />
        </motion.div>

        {/* Bottom Line */}
        <p className="font-cormorant italic text-sm sm:text-base text-[#f6e6b4]/70 tracking-widest pt-4">
          Made with endless love, only for you.
        </p>
      </motion.div>
    </footer>
  );
};
