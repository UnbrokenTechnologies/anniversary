import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

export const PoeticMessage: React.FC = () => {
  const lineVariants = {
    hidden: { opacity: 0, y: 35, filter: 'blur(12px)' },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 1.3,
        delay: custom * 0.45,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <section
      id="poetic-message"
      className="relative py-28 px-6 flex flex-col items-center justify-center text-center overflow-hidden"
    >
      {/* Background Soft Glow Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-[#670d22]/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        className="max-w-3xl mx-auto flex flex-col items-center space-y-6 sm:space-y-8"
      >
        <div className="flex items-center gap-3 text-[#d4af37]/70 mb-2">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]" />
          <Sparkles className="w-4 h-4 text-[#d4af37]" />
          <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#f6e6b4]">A Promise of Eternity</span>
          <Sparkles className="w-4 h-4 text-[#d4af37]" />
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]" />
        </div>

        {/* Line 1 */}
        <motion.p
          custom={0}
          variants={lineVariants}
          className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl text-[#fffaf0] font-normal leading-relaxed"
        >
          In your smile, I found{' '}
          <span className="text-[#f9d976] font-semibold drop-shadow-[0_0_20px_rgba(249,217,118,0.65)] italic">
            joy
          </span>
          .
        </motion.p>

        {/* Line 2 */}
        <motion.p
          custom={1}
          variants={lineVariants}
          className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl text-[#fffaf0] font-normal leading-relaxed"
        >
          In your heart, I found{' '}
          <span className="text-[#ffd1dc] font-semibold drop-shadow-[0_0_20px_rgba(255,209,220,0.65)] italic">
            peace
          </span>
          .
        </motion.p>

        {/* Line 3 */}
        <motion.p
          custom={2}
          variants={lineVariants}
          className="font-serif-luxury text-2xl sm:text-4xl md:text-5xl text-[#fffaf0] font-normal leading-relaxed"
        >
          In your love, I found my{' '}
          <span className="gold-shimmer-text font-semibold drop-shadow-[0_0_25px_rgba(212,175,55,0.7)] italic">
            forever
          </span>
          .
        </motion.p>

        {/* Divider Ornament */}
        <motion.div
          custom={3}
          variants={lineVariants}
          className="pt-6 flex items-center justify-center gap-3"
        >
          <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-[#ea638c]/60" />
          <Heart className="w-5 h-5 text-[#ea638c] fill-[#ea638c]/70 animate-pulse" />
          <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-[#ea638c]/60" />
        </motion.div>

        {/* Sign-off */}
        <motion.p
          custom={4}
          variants={lineVariants}
          className="font-script text-3xl sm:text-5xl text-[#f6e6b4] tracking-wide pt-2"
        >
          — For Sabnam, with all my love ❤️
        </motion.p>
      </motion.div>
    </section>
  );
};
