import React, { useState, useEffect } from 'react';
import { ArrowRight, Heart } from 'lucide-react';

export const SplashScreen = ({ 
  onFinish, 
  forceShow = false,
  holdDurationMs = 2300,
  storageKey = 'cc_splash_seen'
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

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

    // Dynamic sequence: Zoom pop -> Wordmark slide -> Taglines reveal -> Hold -> Smooth Dissolve
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
    };
  }, [holdDurationMs, forceShow, storageKey]);

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
      aria-label="CareConnect Dynamic Intro Animation"
    >
      {/* Top Skip Button */}
      <div className="absolute top-6 right-6 z-20">
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

      {/* Cinematic Flash & Aura Glow (Netflix-Style Warm Flash) */}
      <div className="absolute w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-gradient-to-r from-orange-400/25 via-amber-300/20 to-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-netflix-aura"></div>

      {/* Wide Logo Lockup Container (Edge-to-Edge Desktop Span) */}
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
