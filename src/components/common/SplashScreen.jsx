import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export const SplashScreen = ({ 
  onFinish, 
  forceShow = false,
  holdDurationMs = 2000,
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

    // Sequence: Animate In -> Hold for ~2s -> Fade out smoothly over 0.5s
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
    }, 450); // Matches transition duration
  };

  if (!isVisible) return null;

  return (
    <div
      onClick={handleDismiss}
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white select-none cursor-pointer transition-all duration-500 ease-out ${
        isFadingOut
          ? 'opacity-0 scale-105 pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
      style={{
        background: 'radial-gradient(circle at center, #FFFFFF 0%, #FAF8F5 100%)'
      }}
      aria-label="CareConnect Intro Splash Screen"
    >
      {/* Top Skip Button */}
      <div className="absolute top-6 right-6 z-10">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleDismiss();
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100/90 hover:bg-slate-200 text-slate-700 text-xs font-semibold backdrop-blur-xs transition-all hover:scale-105 active:scale-95 shadow-xs cursor-pointer border border-slate-200/60"
        >
          <span>Skip</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* Center Animated Logo & Branding Container */}
      <div className="relative flex flex-col items-center justify-center p-6 text-center max-w-xl mx-auto">
        
        {/* Ambient Soft Glow Behind Logo */}
        <div className="absolute -inset-10 bg-orange-400/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>

        {/* Logo Image with Smooth Scale + Fade Entrance Animation */}
        <div className="relative transform animate-splash-logo-in">
          <img
            src="/careconnect-logo.png"
            alt="CareConnect - Health • Support • Together"
            className="w-full max-w-[340px] sm:max-w-[480px] md:max-w-[540px] object-contain drop-shadow-md transition-transform"
          />
        </div>

        {/* Subtle Ambient Pulse Bar */}
        <div className="mt-8 w-44 sm:w-56 h-1 bg-slate-100 rounded-full overflow-hidden relative shadow-inner">
          <div className="h-full bg-gradient-to-r from-orange-400 via-orange-500 to-emerald-700 rounded-full animate-splash-progress"></div>
        </div>

        {/* Tap Anywhere Note */}
        <p className="mt-4 text-[11px] text-slate-400 font-medium tracking-wide">
          Tap anywhere to continue
        </p>

      </div>
    </div>
  );
};

export default SplashScreen;
