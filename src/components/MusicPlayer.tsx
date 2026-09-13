import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Upload, Check, Sliders } from 'lucide-react';
import { romanticAudio, AudioMode } from '../utils/audioEngine';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [trackTitle, setTrackTitle] = useState('Romantic Song (Perfect)');
  const [currentMode, setCurrentMode] = useState<AudioMode>('song');
  const [volume, setVolume] = useState(0.45);

  useEffect(() => {
    const unsubPlay = romanticAudio.subscribe((playing) => {
      setIsPlaying(playing);
    });
    const unsubTrack = romanticAudio.subscribeTrack((title, mode) => {
      setTrackTitle(title);
      setCurrentMode(mode);
    });
    return () => {
      unsubPlay();
      unsubTrack();
    };
  }, []);

  const handleToggle = () => {
    romanticAudio.togglePlay();
  };

  const handleModeChange = (mode: 'song' | 'synth') => {
    romanticAudio.setMode(mode);
  };

  const handleCustomAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      romanticAudio.setCustomAudioUrl(url, file.name);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    romanticAudio.setVolume(val);
  };

  return (
    <div className="fixed bottom-3.5 right-3.5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2">
      {/* Settings / Track Options Flyout */}
      {showOptions && (
        <div className="glass-panel p-3.5 sm:p-4 rounded-2xl border border-[#d4af37]/40 mb-2 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col gap-3 text-xs text-[#f6e6b4] w-64 xs:w-72 backdrop-blur-2xl">
          <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-2">
            <span className="font-serif-luxury font-semibold text-sm text-[#fffaf0]">
              Romantic Soundtrack
            </span>
            <span className="text-[10px] uppercase tracking-wider text-[#ea638c]">
              {isPlaying ? 'Playing' : 'Paused'}
            </span>
          </div>

          {/* Track Options */}
          <div className="flex flex-col gap-1.5">
            {/* 1. Romantic Song */}
            <button
              onClick={() => handleModeChange('song')}
              className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all text-left ${
                currentMode === 'song'
                  ? 'bg-gradient-to-r from-[#670d22] to-[#ea638c] text-white font-medium shadow-md'
                  : 'bg-[#1b030b]/60 hover:bg-[#1b030b] text-[#f6e6b4]/80'
              }`}
            >
              <div className="flex items-center gap-2">
                <Music className="w-3.5 h-3.5 shrink-0 text-[#f9d976]" />
                <span className="truncate">Romantic Song (Perfect)</span>
              </div>
              {currentMode === 'song' && <Check className="w-3.5 h-3.5 shrink-0" />}
            </button>

            {/* 2. Tender Piano Harmony */}
            <button
              onClick={() => handleModeChange('synth')}
              className={`flex items-center justify-between px-3 py-2 rounded-xl transition-all text-left ${
                currentMode === 'synth'
                  ? 'bg-gradient-to-r from-[#670d22] to-[#ea638c] text-white font-medium shadow-md'
                  : 'bg-[#1b030b]/60 hover:bg-[#1b030b] text-[#f6e6b4]/80'
              }`}
            >
              <div className="flex items-center gap-2">
                <Music className="w-3.5 h-3.5 shrink-0 text-[#f9d976]" />
                <span className="truncate">Tender Piano Harmony</span>
              </div>
              {currentMode === 'synth' && <Check className="w-3.5 h-3.5 shrink-0" />}
            </button>

            {/* 3. Custom Upload */}
            <label className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#1a030b]/60 hover:bg-[#1a030b] text-[#f6e6b4]/80 hover:text-white cursor-pointer transition-all border border-[#d4af37]/20 hover:border-[#d4af37]/50">
              <div className="flex items-center gap-2 truncate">
                <Upload className="w-3.5 h-3.5 shrink-0 text-[#d4af37]" />
                <span className="truncate">
                  {currentMode === 'custom' ? trackTitle : 'Upload Your Song (MP3)'}
                </span>
              </div>
              {currentMode === 'custom' && <Check className="w-3.5 h-3.5 shrink-0 text-green-400" />}
              <input
                type="file"
                accept="audio/*"
                onChange={handleCustomAudioUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Volume Slider */}
          <div className="pt-2 border-t border-[#d4af37]/20 flex flex-col gap-1">
            <div className="flex items-center justify-between text-[11px] text-[#f6e6b4]/70">
              <span>Volume</span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full accent-[#ea638c] cursor-pointer h-1.5 rounded-lg bg-[#2e0714]"
            />
          </div>
        </div>
      )}

      {/* Main Floating Pill Widget */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleToggle}
          className="group relative flex items-center gap-2 sm:gap-3 px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-full glass-panel border border-[#d4af37]/40 hover:border-[#f6e6b4] shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:scale-105 active:scale-95 transition-all duration-300"
          title="Toggle Romantic Music"
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

          <span className="text-[11px] sm:text-sm font-medium tracking-wide text-[#f6e6b4] font-serif-luxury max-w-[130px] sm:max-w-[200px] truncate">
            {isPlaying ? trackTitle : '🎵 Play Our Song'}
          </span>

          {isPlaying ? (
            <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ea638c] shrink-0" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#f6e6b4]/50 shrink-0" />
          )}
        </button>

        {/* Small settings button to swap audio */}
        <button
          onClick={() => setShowOptions(!showOptions)}
          className={`p-2 rounded-full glass-panel border transition-colors cursor-pointer ${
            showOptions
              ? 'border-[#ea638c] text-[#ea638c] bg-[#1a0208]'
              : 'border-[#d4af37]/30 text-[#f6e6b4]/60 hover:text-[#f6e6b4]'
          }`}
          title="Audio options & volume"
        >
          <Sliders className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
