import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Gift } from 'lucide-react';
import { OpeningScene3D } from './components/OpeningScene3D';
import { HeroSection } from './components/HeroSection';
import { PoeticMessage } from './components/PoeticMessage';
import { LoveTimeline } from './components/LoveTimeline';
import { WhyILoveYou } from './components/WhyILoveYou';
import { InteractiveHeart3D } from './components/InteractiveHeart3D';
import { LoveLetter } from './components/LoveLetter';
import { TogetherCounter } from './components/TogetherCounter';
import { WishMoment3D } from './components/WishMoment3D';
import { GrandSurpriseModal } from './components/GrandSurpriseModal';
import { ClosingScreen } from './components/ClosingScreen';
import { MusicPlayer } from './components/MusicPlayer';
import { RosePetalsCanvas } from './components/effects/RosePetalsCanvas';
import { SparklesCanvas } from './components/effects/SparklesCanvas';
import { CursorGlow } from './components/effects/CursorGlow';

export const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0d0106] text-[#fffaf0] overflow-x-hidden selection:bg-[#ea638c]/30 selection:text-[#f6e6b4]">
      {/* Background Multi-Layer Ambient Engines */}
      <SparklesCanvas />
      <RosePetalsCanvas />
      <CursorGlow />

      {/* 3D Cinematic Opening Scene Overlay */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="fixed inset-0 z-50 overflow-hidden"
          >
            <OpeningScene3D onComplete={() => setShowIntro(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Single-Page Cinematic Experience */}
      <main className="relative z-20">
        {/* Floating Replay Intro Button */}
        {!showIntro && (
          <button
            onClick={() => setShowIntro(true)}
            className="fixed top-3.5 left-3.5 sm:top-5 sm:left-5 z-40 flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full glass-panel border border-[#d4af37]/40 text-[11px] sm:text-xs font-medium tracking-wider text-[#f6e6b4] hover:border-[#f6e6b4] shadow-lg hover:scale-105 transition-all"
            title="Replay 3D Opening Box"
          >
            <Gift className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#ea638c]" />
            <span>Replay Intro</span>
          </button>
        )}

        {/* 1. Hero Section */}
        <HeroSection onScrollTo={handleScrollTo} />

        {/* 2. Romantic Message Reveal */}
        <PoeticMessage />

        {/* 3. Our Love Story – Timeline */}
        <LoveTimeline />

        {/* 4. Why I Love You Cards */}
        <WhyILoveYou />

        {/* 6. Interactive 3D Heart Moment */}
        <InteractiveHeart3D />

        {/* 7. Love Letter Experience */}
        <LoveLetter />

        {/* 8. Together Forever Live Counter */}
        <TogetherCounter />

        {/* 9. Magical Wish Moment */}
        <WishMoment3D />

        {/* 10. Final Big Surprise Moment */}
        <GrandSurpriseModal />

        {/* 11. Final Closing Screen */}
        <ClosingScreen />

        {/* Floating Music Control */}
        <MusicPlayer />
      </main>
    </div>
  );
};
