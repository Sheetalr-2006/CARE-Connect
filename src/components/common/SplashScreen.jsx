import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Volume2, VolumeX, Sparkles } from 'lucide-react';

/**
 * Robust Multi-Engine Audio Player for CareConnect Intro Chime:
 * 1. Primary: HTML5 Audio with `/careconnect-chime.wav`
 * 2. Fallback: Web Audio API Realtime Synthesizer (Heartbeat + Harmonic Chime)
 * 3. Autoplay Fallback: Unlocks and plays on first user interaction (click/touch/key)
 */
const playSynthesizedChime = (audioCtxRef) => {
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
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.45, now);
    masterGain.connect(ctx.destination);

    // 1. First Heartbeat Thump (t = 0.05s)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    const filter1 = ctx.createBiquadFilter();
    filter1.type = 'lowpass';
    filter1.frequency.setValueAtTime(140, now);
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(70, now + 0.05);
    osc1.frequency.exponentialRampToValueAtTime(45, now + 0.25);
    gain1.gain.setValueAtTime(0.001, now);
    gain1.gain.linearRampToValueAtTime(0.6, now + 0.08);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
    osc1.connect(filter1);
    filter1.connect(gain1);
    gain1.connect(masterGain);
    osc1.start(now + 0.05);
    osc1.stop(now + 0.28);

    // 2. Second Heartbeat Thump (t = 0.28s)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    const filter2 = ctx.createBiquadFilter();
    filter2.type = 'lowpass';
    filter2.frequency.setValueAtTime(160, now);
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(78, now + 0.28);
    osc2.frequency.exponentialRampToValueAtTime(48, now + 0.52);
    gain2.gain.setValueAtTime(0.001, now + 0.28);
    gain2.gain.linearRampToValueAtTime(0.75, now + 0.32);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.54);
    osc2.connect(filter2);
    filter2.connect(gain2);
    gain2.connect(masterGain);
    osc2.start(now + 0.28);
    osc2.stop(now + 0.55);

    // 3. Warm Harmonic Chime (t = 0.52s)
    const chordFrequencies = [261.63, 329.63, 392.0, 523.25, 659.25];
    chordFrequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + 0.52 + idx * 0.03);
      const startTime = now + 0.52 + idx * 0.03;
      const duration = 1.1;
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(0.24 / (idx * 0.25 + 1), startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(masterGain);
      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    });

  } catch (e) {
    console.warn("Synthesizer non-fatal warning:", e);
  }
};

export const SplashScreen = ({ 
  onFinish, 
  forceShow = false,
  holdDurationMs = 2600,
  storageKey = 'cc_splash_seen'
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);
  const [isMuted, setIsMuted] = useState(() => {
    try {
      return localStorage.getItem('cc_splash_muted') === 'true';
    } catch {
      return false;
    }
  });

  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const hasTriggeredAudioRef = useRef(false);

  const attemptPlayAudio = () => {
    if (isMuted || hasTriggeredAudioRef.current) return;

    // 1. Try HTML5 Audio element first
    if (audioRef.current) {
      audioRef.current.volume = 0.65;
      audioRef.current.currentTime = 0;
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            hasTriggeredAudioRef.current = true;
            setNeedsGesture(false);
          })
          .catch((err) => {
            console.info("Browser autoplay blocked audio until interaction:", err);
            setNeedsGesture(true);
            // Fallback try with web audio context
            try {
              playSynthesizedChime(audioCtxRef);
            } catch {}
          });
      }
    } else {
      // Direct synthesizer attempt
      try {
        playSynthesizedChime(audioCtxRef);
        hasTriggeredAudioRef.current = true;
      } catch {
        setNeedsGesture(true);
      }
    }
  };

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

    // Try playing audio immediately on mount
    attemptPlayAudio();

    // Attach global gesture unlockers (if browser policy blocked initial autoplay)
    const handleFirstGesture = () => {
      if (!hasTriggeredAudioRef.current && !isMuted) {
        attemptPlayAudio();
      }
    };

    window.addEventListener('pointerdown', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });

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
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
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

    if (!nextMuted) {
      hasTriggeredAudioRef.current = false;
      attemptPlayAudio();
      playSynthesizedChime(audioCtxRef);
    }
  };

  if (!isVisible) return null;

  return (
    <div
      onClick={(e) => {
        // If audio was pending gesture, play it and don't dismiss immediately on first tap
        if (needsGesture && !hasTriggeredAudioRef.current) {
          attemptPlayAudio();
          playSynthesizedChime(audioCtxRef);
          setNeedsGesture(false);
          return;
        }
        handleDismiss();
      }}
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#FAF8F5] select-none cursor-pointer overflow-hidden transition-all duration-500 ease-out ${
        isFadingOut
          ? 'opacity-0 scale-106 blur-xs pointer-events-none'
          : 'opacity-100 scale-100 blur-0'
      }`}
      style={{
        background: 'radial-gradient(ellipse at center, #FFFFFF 0%, #FAF8F5 70%, #F5F1E8 100%)'
      }}
      aria-label="CareConnect Dynamic Intro Animation with Sound"
    >
      {/* Hidden Native Audio Element */}
      <audio
        ref={audioRef}
        src="/careconnect-chime.wav"
        preload="auto"
        playsInline
      />

      {/* Top Action Bar (Audio Mute Toggle + Skip Button) */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-2">
        {/* Audio Mute / Unmute Button */}
        <button
          type="button"
          onClick={toggleMute}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer border ${
            isMuted 
              ? 'bg-slate-100/90 text-slate-500 border-slate-300' 
              : 'bg-orange-50 text-[#E8703A] border-orange-200 hover:bg-orange-100'
          }`}
          title={isMuted ? "Unmute Intro Sound" : "Mute Intro Sound"}
          aria-label={isMuted ? "Unmute Sound" : "Mute Sound"}
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="animate-pulse text-[#E8703A]" />}
          <span>{isMuted ? 'Muted' : 'Sound On'}</span>
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

        {/* Browser Gesture Hint (Only shown if browser blocked autoplay before gesture) */}
        {needsGesture && !isMuted && (
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/90 text-orange-900 border border-orange-200 text-[11px] font-bold animate-bounce shadow-xs">
            <Volume2 size={13} className="text-orange-600" />
            <span>Click anywhere to hear intro chime</span>
          </div>
        )}

      </div>
    </div>
  );
};

export default SplashScreen;
