import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, X, Gift } from 'lucide-react';
import { romanticAudio } from '../utils/audioEngine';
import { triggerRomanticFinale } from '../utils/confettiFireworks';

export const GrandSurpriseModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showGrandReveal, setShowGrandReveal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const startSurpriseSequence = () => {
    setIsOpen(true);
    setShowGrandReveal(false);
    setCountdown(3);

    const timer1 = setTimeout(() => {
      setCountdown(2);
      romanticAudio.playHeartbeatSound();
    }, 1000);

    const timer2 = setTimeout(() => {
      setCountdown(1);
      romanticAudio.playHeartbeatSound();
    }, 2000);

    const timer3 = setTimeout(() => {
      setCountdown(null);
      setShowGrandReveal(true);
      romanticAudio.playChimeSound();
      triggerRomanticFinale();
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  const handleClose = () => {
    setIsOpen(false);
    setCountdown(null);
    setShowGrandReveal(false);
  };

  return (
    <div className="relative my-20 flex flex-col items-center justify-center">
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={startSurpriseSequence}
        className="group relative px-6 py-3.5 sm:px-10 sm:py-5 rounded-full overflow-hidden shadow-[0_15px_40px_rgba(234,99,140,0.35)] transition-all duration-300 cursor-pointer max-w-xs sm:max-w-none"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-[#670d22] via-[#ea638c] to-[#d4af37] animate-pulse" />
        <span className="absolute inset-[2px] rounded-full bg-[#1b030b]" />
        <span className="relative z-10 flex items-center justify-center gap-2.5 font-serif-luxury text-lg sm:text-2xl text-[#fffaf0] font-semibold tracking-wider">
          <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-[#ffd1dc] animate-bounce" />
          <span>❤️ One Last Surprise</span>
          <Sparkles className="w-4 h-4 sm:w-6 sm:h-6 text-[#d4af37] animate-spin-slow" />
        </span>
      </motion.button>
      <span className="mt-2.5 text-[11px] sm:text-xs tracking-widest text-[#f6e6b4]/70 uppercase font-light">
        A grand celebration for Sabnam
      </span>

      {/* Cinematic Modal Rendered in Portal */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-[#080104]/96 backdrop-blur-2xl overflow-y-auto"
                onClick={handleClose}
              >
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="fixed top-3 right-3 sm:top-6 sm:right-6 p-2.5 sm:p-3 rounded-full bg-[#1b030b] border border-[#d4af37]/50 text-[#f6e6b4] hover:bg-[#d4af37] hover:text-[#1b030b] transition-colors z-[100000] cursor-pointer"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {/* Countdown Phase */}
                {countdown !== null && (
                  <motion.div
                    key={countdown}
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1.4, opacity: 1 }}
                    exit={{ scale: 2, opacity: 0 }}
                    transition={{ duration: 0.85, ease: 'easeOut' }}
                    className="text-center select-none"
                  >
                    <span className="font-serif-luxury text-7xl sm:text-9xl text-[#f6e6b4] font-bold drop-shadow-[0_0_40px_rgba(212,175,55,0.9)]">
                      {countdown}
                    </span>
                  </motion.div>
                )}

                {/* Grand Finale Reveal */}
                {showGrandReveal && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] as const }}
                    onClick={(e) => e.stopPropagation()}
                    className="relative max-w-4xl text-center px-2 sm:px-4 flex flex-col items-center"
                  >
                    {/* Bloom Aura */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[600px] rounded-full bg-gradient-to-tr from-[#ea638c]/40 via-[#d4af37]/35 to-transparent blur-[140px] pointer-events-none" />

                    {/* Giant Centered Name: Sabnam Rai ❤️ */}
                    <motion.h1
                      initial={{ y: 30 }}
                      animate={{ y: 0 }}
                      transition={{ delay: 0.2, duration: 1 }}
                      className="font-script text-4xl xs:text-5xl sm:text-7xl md:text-8xl tracking-wide max-w-full px-2 flex items-center justify-center gap-3 sm:gap-4 flex-nowrap mb-2"
                    >
                      <span className="gold-shimmer-text font-normal whitespace-nowrap">Sabnam Rai</span>
                      <span className="inline-block text-[#ea638c] animate-pulse drop-shadow-[0_0_25px_rgba(234,99,140,0.95)] shrink-0">
                        ❤️
                      </span>
                    </motion.h1>

                    {/* I would choose you in every lifetime */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 1 }}
                      className="font-cormorant italic text-xl sm:text-4xl md:text-5xl text-[#fffaf0] glow-text-rose mt-3 sm:mt-4 font-light px-2"
                    >
                      “I would choose you in every lifetime.”
                    </motion.p>

                    {/* Happy Anniversary, My Love */}
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0, duration: 1 }}
                      className="font-serif-luxury text-2xl xs:text-3xl sm:text-5xl text-[#f6e6b4] mt-4 sm:mt-6 tracking-wide px-2"
                    >
                      Happy Anniversary, My Love
                    </motion.h2>

                    {/* Forever & Always */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.4, duration: 1 }}
                      className="mt-4 sm:mt-6 inline-flex items-center gap-2 sm:gap-3 px-5 py-2 sm:px-8 sm:py-3 rounded-full glass-panel border border-[#d4af37]/60 shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                    >
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#d4af37]" />
                      <span className="font-serif-luxury text-base sm:text-2xl text-[#fffaf0] font-medium tracking-widest uppercase">
                        Forever & Always ♾️
                      </span>
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#d4af37]" />
                    </motion.div>

                    {/* Replay Confetti Button */}
                    <button
                      onClick={() => triggerRomanticFinale()}
                      className="mt-8 text-xs tracking-widest text-[#f6e6b4]/80 hover:text-white uppercase px-5 py-2 rounded-full border border-[#d4af37]/40 hover:border-[#d4af37] transition-colors cursor-pointer"
                    >
                      ✨ Burst More Sparkles
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};
