import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Volume2, VolumeX, Sparkles, Music, Heart, Bell, Radio } from 'lucide-react';

export const SOUND_PROFILES = [
  {
    id: 'cinematic',
    label: 'Netflix Ta-Dum',
    icon: Sparkles,
    file: '/careconnect-sound-cinematic.wav',
    desc: 'Deep sub-pulse & rich warm cello bloom'
  },
  {
    id: 'acoustic',
    label: 'Acoustic Chime',
    icon: Bell,
    file: '/careconnect-sound-acoustic.wav',
    desc: 'Gentle morning harp & soothing bells'
  },
  {
    id: 'heartbeat',
    label: 'Organic Heartbeat',
    icon: Heart,
    file: '/careconnect-sound-heartbeat.wav',
    desc: 'Authentic lub-dub pulse & ambient warmth'
  },
  {
    id: 'sparkle',
    label: 'Crystal Sparkle',
    icon: Music,
    file: '/careconnect-sound-sparkle.wav',
    desc: 'Modern airy crystal chime chord'
  }
];

export const SplashScreen = ({ 
  onFinish, 
  forceShow = false,
  holdDurationMs = 2800,
  storageKey = 'cc_splash_seen'
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);
  
  const [selectedSoundId, setSelectedSoundId] = useState(() => {
    try {
      return localStorage.getItem('cc_sound_profile') || 'cinematic';
    } catch {
      return 'cinematic';
    }
  });

  const [isMuted, setIsMuted] = useState(() => {
    try {
      return localStorage.getItem('cc_splash_muted') === 'true';
    } catch {
      return false;
    }
  });

  const audioRef = useRef(null);
  const hasTriggeredAudioRef = useRef(false);

  const currentProfile = SOUND_PROFILES.find(p => p.id === selectedSoundId) || SOUND_PROFILES[0];

  const playActiveSound = (customFile) => {
    if (isMuted) return;

    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const soundUrl = customFile || currentProfile.file;
    audioRef.current.src = soundUrl;
    audioRef.current.volume = 0.70;
    audioRef.current.currentTime = 0;

    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          hasTriggeredAudioRef.current = true;
          setNeedsGesture(false);
        })
        .catch((err) => {
          console.info("Autoplay requires interaction:", err);
          setNeedsGesture(true);
        });
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

    // Attempt autoplay on mount
    playActiveSound();

    // Attach global gesture unlockers
    const handleFirstGesture = () => {
      if (!hasTriggeredAudioRef.current && !isMuted) {
        playActiveSound();
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
      if (audioRef.current) {
        try {
          audioRef.current.pause();
        } catch {}
      }
    };
  }, [holdDurationMs, forceShow, storageKey, isMuted, selectedSoundId]);

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
      playActiveSound();
    }
  };

  const changeSoundProfile = (e, profile) => {
    e.stopPropagation();
    setSelectedSoundId(profile.id);
    try {
      localStorage.setItem('cc_sound_profile', profile.id);
    } catch {}

    // Unmute if muted and play selected sound preview immediately
    setIsMuted(false);
    try {
      localStorage.setItem('cc_splash_muted', 'false');
    } catch {}
    
    playActiveSound(profile.file);
  };

  if (!isVisible) return null;

  return (
    <div
      onClick={(e) => {
        // If user tapped to unlock sound, don't dismiss immediately
        if (needsGesture && !hasTriggeredAudioRef.current) {
          playActiveSound();
          setNeedsGesture(false);
          return;
        }
        handleDismiss();
      }}
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-between py-6 px-4 bg-[#FAF8F5] select-none cursor-pointer overflow-hidden transition-all duration-500 ease-out ${
        isFadingOut
          ? 'opacity-0 scale-106 blur-xs pointer-events-none'
          : 'opacity-100 scale-100 blur-0'
      }`}
      style={{
        background: 'radial-gradient(ellipse at center, #FFFFFF 0%, #FAF8F5 70%, #F5F1E8 100%)'
      }}
      aria-label="CareConnect Dynamic Intro Animation with Sound Selection"
    >
      {/* Top Action Bar */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between z-20">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-[#E2ECE9] text-[11px] font-bold text-[#132E27]">
          <Radio size={13} className="text-primary animate-pulse" />
          <span>CareConnect Audio Experience</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Mute Toggle */}
          <button
            type="button"
            onClick={toggleMute}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-xs cursor-pointer border ${
              isMuted 
                ? 'bg-slate-100/90 text-slate-500 border-slate-300' 
                : 'bg-orange-50 text-[#E8703A] border-orange-200 hover:bg-orange-100'
            }`}
            title={isMuted ? "Unmute Intro Sound" : "Mute Intro Sound"}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} className="animate-pulse text-[#E8703A]" />}
            <span>{isMuted ? 'Muted' : 'Sound On'}</span>
          </button>

          {/* Skip Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleDismiss();
            }}
            className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-white/80 hover:bg-white text-[#132E27] text-xs font-semibold backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-xs cursor-pointer border border-[#E2ECE9]"
          >
            <span>Skip</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Cinematic Flash & Aura Glow */}
      <div className="absolute w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-gradient-to-r from-orange-400/25 via-amber-300/20 to-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-netflix-aura"></div>

      {/* Center Animated Logo Lockup */}
      <div className="relative z-10 w-[92vw] sm:w-[85vw] max-w-[860px] mx-auto px-4 sm:px-8 flex flex-col items-center justify-center text-center my-auto">
        
        {/* Animated Brand Emblem */}
        <div className="w-full flex items-center justify-center animate-netflix-pop-in drop-shadow-xl">
          <img
            src="/careconnect-logo.png"
            alt="CareConnect Logo"
            className="w-full max-h-[340px] sm:max-h-[420px] md:max-h-[480px] object-contain select-none"
          />
        </div>

        {/* Ambient Subtle Shimmer */}
        <div className="mt-4 w-32 sm:w-48 h-0.5 bg-gradient-to-r from-transparent via-orange-400/50 to-transparent rounded-full animate-netflix-categories"></div>

        {/* Autoplay unlock prompt (if browser blocked sound) */}
        {needsGesture && !isMuted && (
          <div className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-orange-100/90 text-orange-900 border border-orange-200 text-xs font-bold animate-bounce shadow-xs">
            <Volume2 size={14} className="text-orange-600" />
            <span>Click anywhere to play intro chime</span>
          </div>
        )}

      </div>

      {/* Bottom Sound Style Selector Bar */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative z-20 w-full max-w-2xl mx-auto p-2 sm:p-2.5 rounded-2xl bg-white/85 backdrop-blur-lg border border-[#E2ECE9] shadow-md flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
      >
        <div className="flex items-center gap-1.5 px-2 text-[#132E27] font-bold text-[11px] whitespace-nowrap">
          <Music size={13} className="text-primary" />
          <span>Sound Effect:</span>
        </div>

        <div className="grid grid-cols-2 sm:flex items-center gap-1.5 w-full sm:w-auto">
          {SOUND_PROFILES.map((profile) => {
            const Icon = profile.icon;
            const isSelected = selectedSoundId === profile.id;
            return (
              <button
                key={profile.id}
                type="button"
                onClick={(e) => changeSoundProfile(e, profile)}
                className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-white shadow-xs scale-105'
                    : 'bg-[#F4F1EA] text-[#132E27] hover:bg-[#EAE4D8]'
                }`}
                title={profile.desc}
              >
                <Icon size={12} />
                <span>{profile.label}</span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default SplashScreen;
