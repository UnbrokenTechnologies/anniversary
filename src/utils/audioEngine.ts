/**
 * Web Audio API Romantic Ambient Engine & Sound Effects
 * Generates lush romantic ambient piano chords and realistic romantic SFX
 * Completely self-contained - zero external network dependencies required!
 */

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private timerId: number | null = null;
  private customAudio: HTMLAudioElement | null = null;
  private useCustomAudio: boolean = false;
  private subscribers: ((isPlaying: boolean) => void)[] = [];

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(cb: (isPlaying: boolean) => void) {
    this.subscribers.push(cb);
    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== cb);
    };
  }

  private notify(state: boolean) {
    this.isPlaying = state;
    this.subscribers.forEach((cb) => cb(state));
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
    if (!this.ctx || !this.masterGain) return;

    if (this.useCustomAudio && this.customAudio) {
      this.customAudio.play().catch(console.error);
      this.notify(true);
      return;
    }

    // Start synthesized romantic harmony
    this.masterGain.gain.linearRampToValueAtTime(0.35, this.ctx.currentTime + 1.5);
    this.startRomanticSequence();
    this.notify(true);
  }

  public pause() {
    if (this.ctx && this.masterGain) {
      this.masterGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
    if (this.timerId) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }
    this.notify(false);
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  /**
   * Generates a soft piano / music box chime note
   */
  private playNote(freq: number, startTime: number, duration: number = 2.5, velocity: number = 0.15) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(freq * 0.5, startTime);

    // Warm low-pass filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, startTime);
    filter.frequency.exponentialRampToValueAtTime(250, startTime + duration);

    // Gentle decay envelope
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
   * Warm romantic pad chord progression
   */
  private startRomanticSequence() {
    if (!this.ctx) return;

    // Romantic chords in F Major / D Minor: Fmaj9 -> Dm9 -> Bbmaj7 -> C9sus4
    const chords = [
      [174.61, 220.0, 261.63, 329.63, 392.0], // F3, A3, C4, E4, G4 (Fmaj9)
      [146.83, 220.0, 261.63, 329.63, 440.0], // D3, A3, C4, E4, A4 (Dm9)
      [116.54, 174.61, 233.08, 293.66, 349.23], // Bb2, F3, Bb3, D4, F4 (Bbmaj7)
      [130.81, 196.0, 261.63, 293.66, 392.0], // C3, G3, C4, D4, G4 (Csus)
    ];

    let chordIdx = 0;

    const playChordStep = () => {
      if (!this.ctx || !this.isPlaying) return;
      const now = this.ctx.currentTime;
      const currentNotes = chords[chordIdx];

      // Arpeggiate chord with tender timing
      currentNotes.forEach((f, i) => {
        const offset = i * 0.22;
        this.playNote(f, now + offset, 4.0, 0.12 - i * 0.015);
      });

      // High sparkling chime embellishment
      if (Math.random() > 0.3) {
        const highNotes = [523.25, 659.25, 783.99, 880.0, 1046.5];
        const randomHigh = highNotes[Math.floor(Math.random() * highNotes.length)];
        this.playNote(randomHigh, now + 1.2, 3.0, 0.05);
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

  /**
   * Set custom audio URL if user wants to supply their own MP3
   */
  public setCustomAudioUrl(url: string) {
    if (this.customAudio) {
      this.customAudio.pause();
    }
    this.customAudio = new Audio(url);
    this.customAudio.loop = true;
    this.useCustomAudio = true;
    if (this.isPlaying) {
      this.customAudio.play().catch(console.error);
    }
  }
}

export const romanticAudio = new RomanticAudioEngine();
