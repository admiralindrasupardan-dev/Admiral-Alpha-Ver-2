/**
 * ALPHA by Admiral — Click Sound
 * -------------------------------------------------------------
 * A short, quiet mechanical "tick" on every click — synthesized with
 * the Web Audio API rather than an audio file, fitting the precision-
 * instrument theme. The AudioContext is created lazily on first use
 * to respect browser autoplay policies (it only ever runs after a
 * real user gesture, e.g. dismissing the preloader).
 */

(function () {
  let ctx = null;

  function getContext() {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      ctx = new AudioCtx();
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function playClickSound() {
    const audioCtx = getContext();
    if (!audioCtx) return;

    const now = audioCtx.currentTime;

    const osc = audioCtx.createOscillator();
    osc.type = "square";
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.045);

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.07);
  }

  window.playClickSound = playClickSound;

  document.addEventListener("click", () => {
    playClickSound();
  });
})();
