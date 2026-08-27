import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';

/**
 * CareConnect Signature Intro Audio Synthesizer (Zero external file dependency)
 * Synthesizes:
 * 1. Gentle 1st Heartbeat Thump (0.0s)
 * 2. Gentle 2nd Heartbeat Thump (0.28s)
 * 3. Warm Rising Harmonic Chime / Bell Bloom (0.55s - 1.4s)
 */
const playSignatureChime = (audioCtxRef) => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioCtx();
    }
    const ctx = audioCtxRef.current;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;

    // Master Volume Control (Safe, soft listening level for elderly & hearing aids)
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.32, now);
    masterGain.connect(ctx.destination);

    // --- 1. FIRST HEARTBEAT THUMP (t = 0.05s) ---
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    const filter1 = ctx.createBiquadFilter();

    filter1.type = 'lowpass';
    filter1.frequency.setValueAtTime(140, now);

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(70, now + 0.05);
    osc1.frequency.exponentialRampToValueAtTime(45, now + 0.25);

    gain1.gain.setValueAtTime(0.001, now);
    gain1.gain.linearRampToValueAtTime(0.5, now + 0.08);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.26);

    osc1.connect(filter1);
    filter1.connect(gain1);
    gain1.connect(masterGain);

    osc1.start(now + 0.05);
    osc1.stop(now + 0.28);

    // --- 2. SECOND HEARTBEAT THUMP (t = 0.28s) ---
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    const filter2 = ctx.createBiquadFilter();

    filter2.type = 'lowpass';
    filter2.frequency.setValueAtTime(160, now);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(78, now + 0.28);
    osc2.frequency.exponentialRampToValueAtTime(48, now + 0.52);

    gain2.gain.setValueAtTime(0.001, now + 0.28);
    gain2.gain.linearRampToValueAtTime(0.65, now + 0.32);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.54);

    osc2.connect(filter2);
    filter2.connect(gain2);
    gain2.connect(masterGain);

    osc2.start(now + 0.28);
    osc2.stop(now + 0.55);

    // --- 3. WARM RISING HARMONIC CHIME / BELL BLOOM (t = 0.52s) ---
    // Warm soothing chord frequencies: F4, A4, C5, E5, G5
    const chordFrequencies = [349.23, 440.0, 523.25, 659.25, 783.99];

    chordFrequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Warm acoustic filtering (cuts harsh high frequencies)
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1100, now);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + 0.52 + idx * 0.03);

      const startTime = now + 0.52 + idx * 0.03;
      const duration = 0.95;

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(0.18 / (idx * 0.3 + 1), startTime + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    });

  } catch (e) {
    console.warn("Audio intro playback encountered non-fatal error:", e);
  }
};

export const SplashScreen = ({ 
  onFinish, 
  forceShow = false,
  holdDurationMs = 2300,
  storageKey = 'cc_splash_seen'
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isMuted, setIsMuted] = useState(() => {
    try {
      return localStorage.getItem('cc_splash_muted') === 'true';
    } catch {
      return false;
    }
  });

  const audioCtxRef = useRef(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    // Check if user already saw splash in current session
    if (!forceShow) {
      try {
        const alreadySeen = sessionStorage.getItem(storageKey);
        if (alreadySeen) {
          setIsVisible(false);
          return;
        }
      } catch (err) {
        console.warn("Storage check skipped:", err);
      }
    }

    // Play signature intro audio if not muted
    if (!isMuted && !hasPlayedRef.current) {
      hasPlayedRef.current = true;
      playSignatureChime(audioCtxRef);
    }

    // Dynamic sequence timer: Hold -> Smooth Dissolve
    const holdTimer = setTimeout(() => {
      handleDismiss();
    }, holdDurationMs);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        handleDismiss();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(holdTimer);
      window.removeEventListener('keydown', handleKeyDown);
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        try {
          audioCtxRef.current.close();
        } catch {}
      }
    };
  }, [holdDurationMs, forceShow, storageKey, isMuted]);

  const handleDismiss = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);
    try {
      sessionStorage.setItem(storageKey, 'true');
    } catch (e) {}

    setTimeout(() => {
      setIsVisible(false);
      if (onFinish) onFinish();
    }, 500); // 0.5s smooth crossfade
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    try {
      localStorage.setItem('cc_splash_muted', String(nextMuted));
    } catch {}

    // If user un-mutes mid-splash, play chime preview
    if (!nextMuted) {
      playSignatureChime(audioCtxRef);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      onClick={handleDismiss}
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#FAF8F5] select-none cursor-pointer overflow-hidden transition-all duration-500 ease-out ${
        isFadingOut
          ? 'opacity-0 scale-106 blur-xs pointer-events-none'
          : 'opacity-100 scale-100 blur-0'
      }`}
      style={{
        background: 'radial-gradient(ellipse at center, #FFFFFF 0%, #FAF8F5 70%, #F5F1E8 100%)'
      }}
      aria-label="CareConnect Dynamic Intro Animation with Audio"
    >
      {/* Top Action Bar (Audio Mute Toggle + Skip Button) */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
        {/* Audio Mute / Unmute Button */}
        <button
          type="button"
          onClick={toggleMute}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer border ${
            isMuted 
              ? 'bg-slate-100/90 text-slate-500 border-slate-300' 
              : 'bg-orange-50 text-orange-800 border-orange-200 hover:bg-orange-100'
          }`}
          title={isMuted ? "Unmute Intro Sound" : "Mute Intro Sound"}
          aria-label={isMuted ? "Unmute Sound" : "Mute Sound"}
        >
          {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} className="animate-pulse" />}
          <span className="hidden sm:inline">{isMuted ? 'Muted' : 'Sound On'}</span>
        </button>

        {/* Skip Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleDismiss();
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/80 hover:bg-white text-[#132E27] text-xs font-semibold backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer border border-[#E2ECE9]"
        >
          <span>Skip</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* Cinematic Flash & Aura Glow (Netflix-Style Warm Pulse) */}
      <div className="absolute w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-gradient-to-r from-orange-400/25 via-amber-300/20 to-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-netflix-aura"></div>

      {/* Wide Logo Lockup Container */}
      <div className="relative z-10 w-[92vw] sm:w-[85vw] max-w-[860px] mx-auto px-4 sm:px-8 py-6 flex flex-col items-center justify-center text-center">
        
        {/* Full-Spread High-Resolution Animated Lockup */}
        <div className="w-full flex items-center justify-center animate-netflix-pop-in drop-shadow-xl">
          <img
            src="/careconnect-logo.png"
            alt="CareConnect Logo"
            className="w-full max-h-[380px] sm:max-h-[460px] md:max-h-[520px] object-contain select-none"
          />
        </div>

        {/* Ambient Subtle Shimmer Line */}
        <div className="mt-6 w-32 sm:w-48 h-0.5 bg-gradient-to-r from-transparent via-orange-400/50 to-transparent rounded-full animate-netflix-categories"></div>

      </div>
    </div>
  );
};

export default SplashScreen;
