import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Sparkles, X, HeartHandshake } from 'lucide-react';
import { romanticAudio } from '../utils/audioEngine';
import { triggerHeartBurst } from '../utils/confettiFireworks';

export const LoveLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [flapOpened, setFlapOpened] = useState(false);
  const [letterExtracted, setLetterExtracted] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Step-by-step 3D unfolding
      const timer1 = setTimeout(() => setFlapOpened(true), 250);
      const timer2 = setTimeout(() => setLetterExtracted(true), 800);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
      setFlapOpened(false);
      setLetterExtracted(false);
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    romanticAudio.playChimeSound();
    triggerHeartBurst(0.5, 0.4);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <section id="love-letter" className="relative py-28 px-4 sm:px-6 flex flex-col items-center justify-center text-center">
      {/* Background Soft Warmth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[450px] bg-gradient-to-tr from-[#670d22]/20 via-[#ea638c]/15 to-transparent blur-[130px] pointer-events-none" />

      {/* Intro prompt */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10 max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-[#d4af37]/30 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#f6e6b4]">A Secret From My Soul</span>
        </div>

        <h2 className="font-serif-luxury text-2xl xs:text-3xl sm:text-5xl md:text-6xl text-[#fffaf0] font-normal px-2">
          I wrote something for you...
        </h2>
        <p className="font-cormorant italic text-base sm:text-2xl text-[#f6e6b4]/80 mt-2 px-4">
          Words straight from the depths of my heart, penned only for Sabnam.
        </p>
      </motion.div>

      {/* Unopened Luxury Envelope Teaser */}
      <div className="flex flex-col items-center">
        <motion.div
          whileHover={{ scale: 1.04, y: -6 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleOpen}
          className="cursor-pointer group relative w-64 xs:w-72 sm:w-96 h-44 xs:h-48 sm:h-60 rounded-2xl sm:rounded-3xl glass-panel border-2 border-[#d4af37]/60 shadow-[0_25px_60px_rgba(0,0,0,0.7)] flex items-center justify-center overflow-hidden transition-all duration-500 hover:border-[#f6e6b4]"
        >
          {/* Shimmer background on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#670d22]/40 via-[#1b030b]/80 to-[#d4af37]/20 group-hover:opacity-90 transition-opacity" />

          {/* Envelope fold diagonal styling */}
          <div className="absolute top-0 left-0 right-0 h-28 sm:h-32 border-b border-[#d4af37]/40 [clip-path:polygon(0_0,100%_0,50%_100%)] bg-gradient-to-b from-[#2a0612] to-[#1a0209]/80 shadow-md" />

          {/* Wax Seal with Pulsing Heart */}
          <div className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#670d22] via-[#ea638c] to-[#9f1239] border-2 border-[#d4af37] flex items-center justify-center shadow-[0_0_25px_rgba(234,99,140,0.6)] group-hover:scale-110 transition-transform duration-300">
            <Heart className="w-8 h-8 sm:w-9 sm:h-9 text-[#ffd1dc] fill-[#ffd1dc] animate-pulse" />
          </div>

          <div className="absolute bottom-3 text-center z-10">
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#f6e6b4]/70 font-light">
              Tap to open envelope
            </span>
          </div>
        </motion.div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleOpen}
          className="mt-6 sm:mt-8 px-6 py-3 sm:px-8 sm:py-3.5 rounded-full bg-gradient-to-r from-[#670d22] via-[#ea638c] to-[#d4af37] text-[#fffaf0] font-medium text-base sm:text-lg tracking-wider shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 cursor-pointer z-20"
        >
          <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#f6e6b4]" />
          💌 Open My Letter
        </button>
      </div>

      {/* Full-Screen Romantic Letter Modal rendered in Portal */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-[#070104]/95 backdrop-blur-2xl overflow-y-auto"
                onClick={handleClose}
              >
                {/* Close Button Top-Right */}
                <button
                  type="button"
                  onClick={handleClose}
                  className="fixed top-3 right-3 sm:top-5 sm:right-5 z-[100000] p-2.5 sm:p-3 rounded-full bg-[#1b030b]/90 border border-[#d4af37]/60 text-[#f6e6b4] hover:bg-[#d4af37] hover:text-[#1b030b] transition-all shadow-2xl cursor-pointer"
                  title="Close Letter"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {/* Modal Container */}
                <div
                  className="relative w-full max-w-2xl my-auto py-4 sm:py-8 flex flex-col items-center max-h-[94vh]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* 3D Envelope Base Graphic */}
                  <motion.div
                    initial={{ scale: 0.8, y: 40 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="relative w-full overflow-y-auto pr-1"
                  >
                    {/* Unfolding Flap Animation */}
                    <div className="relative w-full flex justify-center -mb-4 sm:-mb-6 z-10 perspective-1000">
                      <motion.div
                        initial={{ rotateX: 0 }}
                        animate={{ rotateX: flapOpened ? -170 : 0 }}
                        transition={{ duration: 0.8, ease: 'easeInOut' }}
                        style={{ transformOrigin: 'top center' }}
                        className="w-full max-w-lg h-20 sm:h-32 bg-gradient-to-b from-[#2e0714] to-[#1f030d] border-t-2 border-x-2 border-[#d4af37]/60 rounded-t-2xl sm:rounded-t-3xl [clip-path:polygon(0_0,100%_0,50%_100%)] shadow-2xl"
                      />
                    </div>

                    {/* Romantic Parchment Letter (Slides Up & Expands) */}
                    <motion.div
                      initial={{ y: 80, opacity: 0, scale: 0.9 }}
                      animate={{
                        y: letterExtracted ? 0 : 40,
                        opacity: letterExtracted ? 1 : 0.6,
                        scale: 1,
                      }}
                      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
                      className="relative z-20 w-full bg-gradient-to-b from-[#fffaf0] via-[#fff5eb] to-[#faebd7] text-[#2c1810] p-5 sm:p-10 md:p-14 rounded-2xl sm:rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.9)] border-2 sm:border-4 border-[#d4af37]/70 text-left font-serif"
                    >
                      {/* Decorative Filigrees */}
                      <div className="absolute top-4 left-5 text-[#d4af37]/70 text-2xl font-script select-none">
                        ❦
                      </div>
                      <div className="absolute top-4 right-5 text-[#d4af37]/70 text-2xl font-script select-none">
                        ❦
                      </div>
                      <div className="absolute bottom-4 left-5 text-[#d4af37]/70 text-2xl font-script select-none">
                        ❦
                      </div>
                      <div className="absolute bottom-4 right-5 text-[#d4af37]/70 text-2xl font-script select-none">
                        ❦
                      </div>

                      {/* Header Ribbon / Salutation */}
                      <div className="mb-6 border-b border-[#d4af37]/30 pb-4">
                        <span className="text-[11px] uppercase tracking-[0.25em] text-[#8c102a] font-sans font-semibold">
                          Anniversary Love Letter
                        </span>
                        <h3 className="font-script text-4xl sm:text-6xl text-[#670d22] font-semibold mt-1">
                          My Dear Sabnam,
                        </h3>
                      </div>

                      {/* Letter Content */}
                      <div className="font-cormorant text-lg sm:text-2xl text-[#3b1d24] leading-relaxed space-y-4">
                        <p>
                          Another year has passed, yet my love for you feels even deeper than before.
                        </p>

                        <p>
                          Thank you for filling my life with happiness, comfort, strength, and love.
                        </p>

                        <div className="py-2.5 pl-4 sm:pl-6 border-l-2 border-[#ea638c] italic text-[#670d22] bg-[#ea638c]/5 rounded-r-xl">
                          <p>You are not only my wife,</p>
                          <p>you are my best friend,</p>
                          <p>my peace,</p>
                          <p>my smile,</p>
                          <p>and the most precious part of my life.</p>
                        </div>

                        <p>
                          Through every beautiful moment and every difficult day,
                          your presence has made life meaningful.
                        </p>

                        <p className="font-semibold text-[#8c102a] text-xl sm:text-2xl">
                          If life gave me a thousand chances,
                          I would still choose you every single time.
                        </p>

                        <p className="text-xl sm:text-3xl font-medium text-[#670d22] pt-2">
                          Happy Anniversary, Sabnam. ❤️
                        </p>

                        <p className="italic text-base sm:text-xl text-[#522b35]">
                          I love you more than words can ever express.
                        </p>
                      </div>

                      {/* Handwritten Signature */}
                      <div className="mt-8 pt-6 border-t border-[#d4af37]/40 flex flex-col items-end">
                        <div className="font-script text-4xl sm:text-6xl text-[#670d22] flex items-center gap-2 drop-shadow-sm">
                          <span>Forever Yours</span>
                          <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-[#ea638c] fill-[#ea638c] animate-pulse" />
                        </div>
                        <span className="font-cormorant italic text-sm sm:text-base text-[#7a4c56] mt-1 font-medium">
                          With all my heart and soul
                        </span>
                      </div>

                      {/* Bottom close action */}
                      <div className="mt-8 flex justify-center">
                        <button
                          type="button"
                          onClick={handleClose}
                          className="px-6 py-2 rounded-full border border-[#670d22]/40 text-xs uppercase tracking-widest text-[#670d22] hover:bg-[#670d22] hover:text-[#fffaf0] transition-colors font-sans"
                        >
                          Close Letter
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};
