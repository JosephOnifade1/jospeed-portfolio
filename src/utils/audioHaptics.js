// Elegant, ultra-subtle mechanical tactile audio feedback synthesized via Web Audio API
// Zero external audio asset dependencies — pure physical feedback
let audioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playTactileClick(variant = 'light') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;

    // Distinct gentle mechanical tactile tone
    const startFreq = variant === 'pop' ? 720 : variant === 'xray' ? 880 : 540;
    const duration = variant === 'xray' ? 0.06 : 0.035;

    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(startFreq * 0.45, now + duration);

    // Kept extremely quiet and polite (0.025 max gain) so it feels like a subtle haptic
    gain.gain.setValueAtTime(0.025, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  } catch {
    // Fail silently if browser policy restricts audio autoplay
  }
}
