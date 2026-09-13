/**
 * Romantic Audio Engine with Romantic Song Soundtrack & Ambient Effects
 * Default track: "Perfect" (Romantic Love Song in /audio/romantic-song.mp3)
 * Alternate: Lush synthesized ambient piano arpeggios
 * Interactive SFX: Realistic double heartbeat ("lub-dub") & celestial chimes
 */

export type AudioMode = 'song' | 'synth' | 'custom';

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private timerId: number | null = null;
  private bgAudio: HTMLAudioElement | null = null;
  private audioMode: AudioMode = 'song';
  private trackTitle: string = 'Romantic Song (Perfect)';
  private volume: number = 0.45;
  private subscribers: ((isPlaying: boolean) => void)[] = [];
  private trackSubscribers: ((title: string, mode: AudioMode) => void)[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initBgAudio('/audio/romantic-song.mp3');
    }
  }

  private initBgAudio(url: string) {
    if (this.bgAudio) {
      this.bgAudio.pause();
      this.bgAudio.src = '';
    }
    try {
      this.bgAudio = new Audio(url);
      this.bgAudio.loop = true;
      this.bgAudio.volume = this.volume;
      this.bgAudio.preload = 'auto';
    } catch (e) {
      console.warn('Audio element init error:', e);
    }
  }

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(cb: (isPlaying: boolean) => void) {
    this.subscribers.push(cb);
    cb(this.isPlaying);
    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== cb);
    };
  }

  public subscribeTrack(cb: (title: string, mode: AudioMode) => void) {
    this.trackSubscribers.push(cb);
    cb(this.trackTitle, this.audioMode);
    return () => {
      this.trackSubscribers = this.trackSubscribers.filter((s) => s !== cb);
    };
  }

  private notify(state: boolean) {
    this.isPlaying = state;
    this.subscribers.forEach((cb) => cb(state));
  }

  private notifyTrack() {
    this.trackSubscribers.forEach((cb) => cb(this.trackTitle, this.audioMode));
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.bgAudio) {
      this.bgAudio.volume = this.volume;
    }
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public togglePlay(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public play() {
    this.initContext();

    if (this.audioMode === 'song' || this.audioMode === 'custom') {
      if (!this.bgAudio) {
        this.initBgAudio('/audio/romantic-song.mp3');
      }
      if (this.bgAudio) {
        this.bgAudio
          .play()
          .then(() => {
            this.notify(true);
          })
          .catch((err) => {
            console.warn('Playback error, falling back to piano synthesis:', err);
            // Fallback to synthesized piano chords
            this.startRomanticSequence();
            this.notify(true);
          });
        return;
      }
    }

    // Synthesizer mode
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.linearRampToValueAtTime(this.volume, this.ctx.currentTime + 1.2);
    }
    this.startRomanticSequence();
    this.notify(true);
  }

  public pause() {
    if (this.bgAudio) {
      this.bgAudio.pause();
    }
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
    }
    if (this.timerId) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
    this.notify(false);
  }

  public setMode(mode: 'song' | 'synth') {
    const wasPlaying = this.isPlaying;
    this.pause();
    this.audioMode = mode;

    if (mode === 'song') {
      this.trackTitle = 'Romantic Song (Perfect)';
      this.initBgAudio('/audio/romantic-song.mp3');
    } else {
      this.trackTitle = 'Tender Piano Harmony';
    }

    this.notifyTrack();
    if (wasPlaying) {
      this.play();
    }
  }

  public setCustomAudioUrl(url: string, fileName?: string) {
    const wasPlaying = this.isPlaying;
    this.pause();
    this.audioMode = 'custom';
    this.trackTitle = fileName ? fileName.replace(/\.[^/.]+$/, '') : 'Custom Love Song';
    this.initBgAudio(url);
    this.notifyTrack();
    if (wasPlaying) {
      this.play();
    }
  }

  public getTrackTitle(): string {
    return this.trackTitle;
  }

  public getMode(): AudioMode {
    return this.audioMode;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  /**
   * Synthesizes tender piano tones for offline/synth mode
   */
  private playNote(freq: number, startTime: number, duration: number = 2.8, velocity: number = 0.15) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(freq * 0.5, startTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(850, startTime);
    filter.frequency.exponentialRampToValueAtTime(260, startTime + duration);

    noteGain.gain.setValueAtTime(0.0001, startTime);
    noteGain.gain.linearRampToValueAtTime(velocity, startTime + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    subOsc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(startTime);
    subOsc.start(startTime);
    osc.stop(startTime + duration);
    subOsc.stop(startTime + duration);
  }

  /**
   * Continuous romantic piano chord progression
   */
  private startRomanticSequence() {
    if (!this.ctx) return;

    // Fmaj9 -> Dm9 -> Bbmaj7 -> C9sus4
    const chords = [
      [174.61, 220.0, 261.63, 329.63, 392.0],
      [146.83, 220.0, 261.63, 329.63, 440.0],
      [116.54, 174.61, 233.08, 293.66, 349.23],
      [130.81, 196.0, 261.63, 293.66, 392.0],
    ];

    let chordIdx = 0;

    const playChordStep = () => {
      if (!this.ctx || !this.isPlaying || this.audioMode !== 'synth') return;
      const now = this.ctx.currentTime;
      const currentNotes = chords[chordIdx];

      currentNotes.forEach((f, i) => {
        const offset = i * 0.22;
        this.playNote(f, now + offset, 4.2, 0.12 - i * 0.015);
      });

      if (Math.random() > 0.3) {
        const highNotes = [523.25, 659.25, 783.99, 880.0, 1046.5];
        const randomHigh = highNotes[Math.floor(Math.random() * highNotes.length)];
        this.playNote(randomHigh, now + 1.2, 3.2, 0.05);
      }

      chordIdx = (chordIdx + 1) % chords.length;
    };

    playChordStep();
    this.timerId = window.setInterval(playChordStep, 4500);
  }

  /**
   * Realistic Heartbeat Sound (Double thump: lub-dub)
   */
  public playHeartbeatSound() {
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    const createPulse = (startTime: number, freq: number, duration: number, gainVal: number) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      osc.frequency.exponentialRampToValueAtTime(35, startTime + duration);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(gainVal, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    // First pulse "lub"
    createPulse(now, 85, 0.14, 0.6);
    // Second pulse "dub"
    createPulse(now + 0.18, 70, 0.18, 0.45);
  }

  /**
   * Romantic Chime / Sparkle sound for Gift Box & Wish Star
   */
  public playChimeSound() {
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const freqs = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];

    freqs.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.09);

      gain.gain.setValueAtTime(0.001, now + idx * 0.09);
      gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.09 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.09 + 1.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.09);
      osc.stop(now + idx * 0.09 + 1.8);
    });
  }
}

export const romanticAudio = new RomanticAudioEngine();
