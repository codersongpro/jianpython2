let isMuted = false;

function getAudioContext() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  return new AudioContext();
}

export const audioSynth = {
  getMuteState: () => isMuted,
  setMuteState: (mute) => {
    isMuted = mute;
    return isMuted;
  },
  toggleMute: () => {
    isMuted = !isMuted;
    return isMuted;
  },

  // 1. Soft water drop bubble click (G5 note, highly damped sine wave)
  playBeep: (frequency = 784, duration = 0.05) => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine"; // Mellowest wave type
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    // Damped envelope
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  },

  // 2. Cute soft retro laser bubble pop (Triangle wave sweep down)
  playLaser: () => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle"; // Soft, retro console style
    osc.frequency.setValueAtTime(660, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  },

  // 3. Xylophone sparkling double-chime (D6 then G6 sine waves)
  playCoin: () => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const playTone = (freq, delay, dur) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
      
      gain.gain.setValueAtTime(0.05, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + dur);
    };

    // Sparkling 8-bit chime notes
    playTone(1174.66, 0, 0.08);     // D6
    playTone(1567.98, 0.06, 0.15);  // G6
  },

  // 4. Magical crystal harp win fanfare (Slow clear C6-E6-G6-C7 arpeggio)
  playWin: () => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const playTone = (freq, delay, dur) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
      
      gain.gain.setValueAtTime(0.06, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + dur);
    };

    // Uplifting magical sequence
    const step = 0.08;
    playTone(1046.50, 0, 0.15);         // C6
    playTone(1318.51, step, 0.15);      // E6
    playTone(1567.98, step * 2, 0.15);  // G6
    playTone(2093.00, step * 3, 0.35);  // C7
  },

  // 5. Friendly "Uh-oh" robotic double-buzz (Sine wave thumps)
  playError: () => {
    if (isMuted) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const playThump = (freq, delay, dur) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
      osc.frequency.linearRampToValueAtTime(freq - 40, ctx.currentTime + delay + dur);

      gain.gain.setValueAtTime(0.06, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + delay + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + dur);
    };

    // Soft two-pitch robot fail sound (A3 then F3)
    playThump(220, 0, 0.12);
    playThump(174.61, 0.1, 0.15);
  }
};
