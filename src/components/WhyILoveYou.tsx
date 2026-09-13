import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Home, ShieldCheck, HeartHandshake } from 'lucide-react';
import { triggerHeartBurst } from '../utils/confettiFireworks';

interface ReasonCard {
  id: number;
  title: string;
  quote: string;
  icon: React.ReactNode;
  accent: string;
}

const reasons: ReasonCard[] = [
  {
    id: 1,
    title: 'Your Smile',
    quote: 'It brightens even my darkest day.',
    icon: <Heart className="w-6 h-6 text-[#ea638c] fill-[#ea638c]" />,
    accent: '#ea638c',
  },
  {
    id: 2,
    title: 'Your Kindness',
    quote: 'You make everything around you beautiful.',
    icon: <Sparkles className="w-6 h-6 text-[#f9d976]" />,
    accent: '#f9d976',
  },
  {
    id: 3,
    title: 'You Feel Like Home',
    quote: 'With you, every place feels safe and warm.',
    icon: <Home className="w-6 h-6 text-[#ffd1dc]" />,
    accent: '#ffd1dc',
  },
  {
    id: 4,
    title: 'Your Support',
    quote: 'You stand beside me through every chapter of life.',
    icon: <ShieldCheck className="w-6 h-6 text-[#d4af37]" />,
    accent: '#d4af37',
  },
  {
    id: 5,
    title: 'Simply You',
    quote: 'I love you not for one reason, but for everything you are.',
    icon: <HeartHandshake className="w-6 h-6 text-[#ff758f]" />,
    accent: '#ff758f',
  },
];

export const WhyILoveYou: React.FC = () => {
  return (
    <section id="why-i-love-you" className="relative py-16 sm:py-28 px-4 sm:px-8 max-w-6xl mx-auto overflow-hidden">
      {/* Background Radiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[450px] bg-gradient-to-br from-[#670d22]/20 via-[#ea638c]/15 to-transparent blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-12 sm:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-[#d4af37]/30 mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#f6e6b4]">A Hundred Million Reasons</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="font-serif-luxury text-2xl xs:text-3xl sm:text-5xl md:text-6xl text-[#fffaf0] font-normal px-2"
        >
          Why I Love You
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="font-cormorant italic text-base sm:text-2xl text-[#f6e6b4]/80 mt-2 max-w-xl mx-auto px-4"
        >
          Sabnam, in a world full of fleeting things, my love for you remains unchanging.
        </motion.p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
        {reasons.map((reason, index) => {
          const isSpan = index === 4; // 5th card spans nicely on wider screens
          return (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
              whileHover={{ y: -6, scale: 1.02 }}
              onHoverStart={() => triggerHeartBurst(0.5, 0.5)}
              className={`glass-card-interactive p-5 sm:p-8 rounded-2xl sm:rounded-3xl relative overflow-hidden group cursor-pointer border border-[#d4af37]/30 ${
                isSpan ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Corner Glow Accent */}
              <div
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-15 group-hover:opacity-40 transition-opacity duration-500"
                style={{ backgroundColor: reason.accent }}
              />

              {/* Icon Container */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-[#d4af37]/30 bg-[#160208] shadow-lg group-hover:scale-110 transition-transform duration-300"
                style={{ borderColor: reason.accent }}
              >
                {reason.icon}
              </div>

              {/* Card Title */}
              <h3 className="font-serif-luxury text-2xl text-[#fffaf0] font-medium mb-3 group-hover:text-[#f6e6b4] transition-colors">
                {reason.title}
              </h3>

              {/* Card Quote */}
              <p className="font-cormorant italic text-xl text-[#f3e5ab] leading-relaxed">
                “{reason.quote}”
              </p>

              {/* Subtle Bottom Bar */}
              <div
                className="h-[2px] w-12 mt-6 rounded-full transition-all duration-500 group-hover:w-full"
                style={{ backgroundColor: reason.accent }}
              />
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
