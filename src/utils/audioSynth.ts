// Light, warm Web Audio API synthesizer featuring warm piano chords, deep bass, and vocal harmonies
class StudioSynth {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private intervalId: any = null;
  private masterGain: GainNode | null = null;
  private bassGain: GainNode | null = null;
  private pianoGain: GainNode | null = null;
  private vocalGain: GainNode | null = null;

  public init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);

        this.bassGain = this.ctx.createGain();
        this.bassGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
        this.bassGain.connect(this.masterGain);

        this.pianoGain = this.ctx.createGain();
        this.pianoGain.gain.setValueAtTime(0.75, this.ctx.currentTime);
        this.pianoGain.connect(this.masterGain);

        this.vocalGain = this.ctx.createGain();
        this.vocalGain.gain.setValueAtTime(0.65, this.ctx.currentTime);
        this.vocalGain.connect(this.masterGain);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public togglePlay(onStateChange?: (playing: boolean) => void) {
    this.init();
    if (this.isPlaying) {
      this.stop();
      if (onStateChange) onStateChange(false);
      return false;
    } else {
      this.startLoop();
      if (onStateChange) onStateChange(true);
      return true;
    }
  }

  public setFader(channel: 'piano' | 'bass' | 'vocal' | 'master', value: number) {
    if (!this.ctx) return;
    const gainNode =
      channel === 'piano' ? this.pianoGain :
      channel === 'bass' ? this.bassGain :
      channel === 'vocal' ? this.vocalGain : this.masterGain;

    if (gainNode) {
      gainNode.gain.setTargetAtTime(Math.max(0, Math.min(1, value)), this.ctx.currentTime, 0.05);
    }
  }

  // Piano hammer-strike emulation with fundamental + soft harmonic overtone
  private playPianoNote(freq: number, duration: number, delay = 0) {
    if (!this.ctx || !this.pianoGain) return;
    try {
      const startTime = this.ctx.currentTime + delay;

      // Fundamental
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, startTime);

      // Attack & decay for acoustic piano feel
      gain1.gain.setValueAtTime(0.001, startTime);
      gain1.gain.linearRampToValueAtTime(0.3, startTime + 0.02);
      gain1.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc1.connect(gain1);
      gain1.connect(this.pianoGain);

      // Soft upper overtone (octave harmonic)
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2, startTime);
      gain2.gain.setValueAtTime(0.001, startTime);
      gain2.gain.linearRampToValueAtTime(0.08, startTime + 0.015);
      gain2.gain.exponentialRampToValueAtTime(0.001, startTime + (duration * 0.6));

      osc2.connect(gain2);
      gain2.connect(this.pianoGain);

      osc1.start(startTime);
      osc1.stop(startTime + duration);
      osc2.start(startTime);
      osc2.stop(startTime + duration);
    } catch {
      // AudioContext safety
    }
  }

  // Deep warm bass note
  private playBassNote(freq: number, duration: number, delay = 0) {
    if (!this.ctx || !this.bassGain) return;
    try {
      const startTime = this.ctx.currentTime + delay;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.4, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.bassGain);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch {
      // AudioContext safety
    }
  }

  // Smooth vocal pad / harmony note
  private playVocalNote(freq: number, duration: number, delay = 0) {
    if (!this.ctx || !this.vocalGain) return;
    try {
      const startTime = this.ctx.currentTime + delay;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      // Gentle vocal swell
      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.18, startTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(this.vocalGain);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch {
      // AudioContext safety
    }
  }

  private startLoop() {
    this.isPlaying = true;

    // Peaceful, soulful chord progression suitable for contemporary & church worship:
    // Cmaj9 -> Am9 -> Fmaj7 -> Gsus4 / G
    const progression = [
      {
        bass: 65.41, // C2
        piano: [261.63, 329.63, 392.00, 493.88], // C4, E4, G4, B4 (Cmaj7)
        vocal: 329.63 // E4
      },
      {
        bass: 55.00, // A1
        piano: [220.00, 261.63, 329.63, 392.00], // A3, C4, E4, G4 (Am7)
        vocal: 392.00 // G4
      },
      {
        bass: 43.65, // F1
        piano: [174.61, 261.63, 329.63, 349.23], // F3, C4, E4, F4 (Fmaj7)
        vocal: 349.23 // F4
      },
      {
        bass: 49.00, // G1
        piano: [196.00, 261.63, 293.66, 392.00], // G3, C4, D4, G4 (Gsus4)
        vocal: 293.66 // D4
      }
    ];

    let step = 0;

    const tick = () => {
      if (!this.isPlaying || !this.ctx) return;
      const current = progression[step % progression.length];

      // Bass note
      this.playBassNote(current.bass, 1.6, 0);

      // Piano chord voicing - gently arpeggiated / rolled
      current.piano.forEach((f, i) => {
        this.playPianoNote(f, 1.5, i * 0.04);
      });

      // Warm vocal harmony swell
      this.playVocalNote(current.vocal, 1.8, 0.05);

      step++;
    };

    tick();
    this.intervalId = setInterval(tick, 1800);
  }

  public stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public getIsPlaying() {
    return this.isPlaying;
  }
}

export const studioSynth = new StudioSynth();
