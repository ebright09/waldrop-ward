class AudioService {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;

  init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.connect(this.ctx.destination);
      this.masterGain.gain.value = 0.3; // Keep it reasonable
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq: number, type: OscillatorType, duration: number, startTime: number = 0) {
    if (!this.ctx || !this.masterGain) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime + startTime);
    
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime + startTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + startTime + duration);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start(this.ctx.currentTime + startTime);
    osc.stop(this.ctx.currentTime + startTime + duration);
  }

  playSuccess() {
    this.playTone(523.25, 'sine', 0.1, 0); // C5
    this.playTone(659.25, 'sine', 0.3, 0.1); // E5
  }

  playFailure() {
    this.playTone(150, 'sawtooth', 0.4, 0);
    this.playTone(140, 'sawtooth', 0.4, 0.1);
  }

  playClick() {
    this.playTone(800, 'triangle', 0.05, 0);
  }

  playBark() {
    // Animal crossing style mumble
    if (!this.ctx) return;
    const count = 3 + Math.floor(Math.random() * 3);
    for(let i=0; i<count; i++) {
      this.playTone(300 + Math.random() * 200, 'square', 0.05, i * 0.08);
    }
  }
}

export const audioService = new AudioService();