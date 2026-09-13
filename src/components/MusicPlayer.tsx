import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Upload } from 'lucide-react';
import { romanticAudio } from '../utils/audioEngine';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const unsubscribe = romanticAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
    return () => unsubscribe();
  }, []);

  const handleToggle = () => {
    romanticAudio.togglePlay();
  };

  const handleCustomAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      romanticAudio.setCustomAudioUrl(url);
    }
  };

  return (
    <div className="fixed bottom-3.5 right-3.5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2">
      {/* Upload Custom Audio Flyout */}
      {showOptions && (
        <div className="glass-panel p-3 rounded-2xl border border-[#d4af37]/40 mb-2 shadow-2xl flex flex-col gap-2 text-xs text-[#f6e6b4]">
          <span className="font-serif-luxury font-medium">Custom Song (Optional)</span>
          <label className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1a030b] border border-[#d4af37]/30 hover:border-[#d4af37] cursor-pointer transition-colors">
            <Upload className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Upload MP3 file</span>
            <input
              type="file"
              accept="audio/*"
              onChange={handleCustomAudioUpload}
              className="hidden"
            />
          </label>
        </div>
      )}

      {/* Main Floating Pill Widget */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleToggle}
          className="group relative flex items-center gap-2 sm:gap-3 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full glass-panel border border-[#d4af37]/40 hover:border-[#f6e6b4] shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
          title="Toggle Romantic Soundtrack"
        >
          {/* Animated Equalizer Waveform */}
          <div className="flex items-center gap-0.5 h-3.5 w-3.5 sm:h-4 sm:w-4">
            {isPlaying ? (
              <>
                <span className="w-0.5 h-2.5 sm:h-3 bg-[#d4af37] rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-0.5 h-3.5 sm:h-4 bg-[#ea638c] rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-0.5 h-2 sm:h-2.5 bg-[#f6e6b4] rounded-full animate-bounce [animation-delay:-0.45s]" />
                <span className="w-0.5 h-3 sm:h-3.5 bg-[#ffd1dc] rounded-full animate-bounce" />
              </>
            ) : (
              <Music className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f6e6b4]/60" />
            )}
          </div>

          <span className="text-[11px] sm:text-sm font-medium tracking-wide text-[#f6e6b4] font-serif-luxury">
            {isPlaying ? 'Playing Our Song' : '🎵 Play Our Song'}
          </span>

          {isPlaying ? (
            <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ea638c]" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f6e6b4]/50" />
          )}
        </button>

        {/* Small settings button to swap audio */}
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="p-2 rounded-full glass-panel border border-[#d4af37]/30 text-[#f6e6b4]/60 hover:text-[#f6e6b4] transition-colors"
          title="Audio options"
        >
          <Music className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
