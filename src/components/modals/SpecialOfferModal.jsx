import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Tag,
  Sparkles,
  Check,
  Copy,
  X,
  ArrowRight,
  Gift
} from 'lucide-react';

export const SpecialOfferModal = ({
  discountPercent = 15,
  code = "CARE15",
  headline = "Enjoy -15% OFF Your First Month of Care",
  description = "Get dedicated companion visits, medication tracking, and 24/7 peace of mind.",
  delayMs = 3000,
  storageKey = "hasSeenWelcomeOffer",
  expiryHours = 24
}) => {
  const { isSpecialOfferOpen, setIsSpecialOfferOpen, showToast } = useApp();
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [isClaimed, setIsClaimed] = useState(false);
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  // Global Root Trigger: Checks once per session / 24hr across ALL routes & pages
  useEffect(() => {
    try {
      const sessionSeen = sessionStorage.getItem(storageKey);
      const localSeenTimestamp = localStorage.getItem(`${storageKey}_timestamp`);
      
      const now = Date.now();
      const expiryMs = expiryHours * 60 * 60 * 1000;
      const isExpired = !localSeenTimestamp || (now - parseInt(localSeenTimestamp, 10)) > expiryMs;

      if (!sessionSeen && isExpired) {
        const timer = setTimeout(() => {
          setIsSpecialOfferOpen(true);
        }, delayMs);
        return () => clearTimeout(timer);
      }
    } catch (err) {
      console.warn("Storage check skipped:", err);
    }
  }, [delayMs, storageKey, expiryHours, setIsSpecialOfferOpen]);

  // Focus trap and Escape key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isSpecialOfferOpen) {
        handleDismiss();
      }
    };
    if (isSpecialOfferOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      // Auto-focus input for accessibility
      setTimeout(() => inputRef.current?.focus(), 150);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isSpecialOfferOpen]);

  const recordDismissed = () => {
    try {
      sessionStorage.setItem(storageKey, 'true');
      localStorage.setItem(`${storageKey}_timestamp`, Date.now().toString());
    } catch (e) {
      // Storage unavailable
    }
  };

  const handleDismiss = () => {
    setIsSpecialOfferOpen(false);
    recordDismissed();
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    recordDismissed();
    if (showToast) {
      showToast({
        type: 'success',
        title: 'Discount Code Copied!',
        message: `Use code ${code} at checkout to receive ${discountPercent}% off.`
      });
    }
    setTimeout(() => setCopied(false), 2500);
  };

  const handleClaim = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsClaimed(true);
    recordDismissed();
    if (showToast) {
      showToast({
        type: 'success',
        title: 'Discount Activated!',
        message: `${discountPercent}% discount code sent to ${email}.`
      });
    }
    setTimeout(() => {
      handleDismiss();
    }, 2000);
  };

  if (!isSpecialOfferOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#1F2A44]/65 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={handleDismiss}
      role="dialog"
      aria-modal="true"
      aria-labelledby="global-welcome-offer-title"
    >
      {/* Centered Card (Rounded ~20px, Off-white/Cream, Soft Drop Shadow) */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-[#FFFDF7] rounded-[22px] border border-[#EFE8D8] shadow-2xl overflow-hidden p-6 sm:p-8 text-center animate-modal-bounce-in"
      >
        {/* Close ("×") Icon in Top-Right Corner */}
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute right-4 top-4 p-1.5 text-[#5B6B82] hover:text-[#1F2A44] rounded-full hover:bg-[#FFEBAF]/30 transition-colors cursor-pointer"
          aria-label="Close welcome offer"
        >
          <X size={20} />
        </button>

        {/* Top Icon: Small Rounded-Square Badge in Terracotta/Orange with Gift Box */}
        <div className="mx-auto mb-3.5 w-14 h-14 rounded-2xl bg-[#E8703A] flex items-center justify-center text-white shadow-md shadow-[#E8703A]/25">
          <Gift size={26} strokeWidth={2.2} />
        </div>

        {/* Small Pill-Shaped Label: Soft Pink/Rose Background with Orange Text */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFEBE8] text-[#E8703A] text-[11px] font-bold uppercase tracking-wider mb-2.5">
          <Sparkles size={12} />
          <span>✨ LIMITED WELCOME BENEFIT</span>
        </div>

        {/* Bold Serif Headline with Discount in Orange and Rest in Dark Navy */}
        <h3 id="global-welcome-offer-title" className="text-2xl sm:text-[28px] font-bold text-[#1F2A44] font-serif leading-tight">
          Enjoy <span className="text-[#E8703A] font-serif">-{discountPercent}% OFF</span> <br />
          Your First Month of Care
        </h3>

        {/* Supporting Sentence in Muted Gray/Blue */}
        <p className="text-xs sm:text-[13px] text-[#5B6B82] mt-2 max-w-xs mx-auto leading-relaxed">
          {description}
        </p>

        {/* Interactive Element 1: Discount Code Chip + Copy Code Button */}
        <div className="mt-5 p-2.5 sm:p-3 rounded-2xl bg-white border border-[#EADDBF] flex items-center justify-between gap-2 shadow-xs">
          <div className="flex items-center gap-2 pl-2">
            <Tag size={16} className="text-[#E8703A] shrink-0" />
            <span className="font-mono font-bold text-sm text-[#1F2A44] tracking-widest">{code}</span>
          </div>
          <button
            type="button"
            onClick={handleCopyCode}
            className="px-3.5 py-1.5 rounded-xl bg-[#E8703A] hover:bg-[#D45F2A] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
          >
            {copied ? (
              <>
                <Check size={14} />
                <span>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        {/* Interactive Element 2: Email Input Field paired with Solid Orange "Claim →" Button */}
        {!isClaimed ? (
          <form onSubmit={handleClaim} className="mt-3.5 space-y-3">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for instant unlock..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-white border border-[#EADDBF] text-xs text-[#1F2A44] focus:ring-2 focus:ring-[#E8703A] focus:outline-none placeholder:text-[#5B6B82]/60"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[#E8703A] hover:bg-[#D45F2A] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1 cursor-pointer active:scale-95 whitespace-nowrap"
              >
                <span>Claim</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-3.5 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2">
            <Check size={16} />
            <span>Offer unlocked! Code applied to your account.</span>
          </div>
        )}

        {/* Interactive Element 3: Muted Text Link to Dismiss Without Claiming */}
        <div className="mt-4 pt-3 border-t border-[#EFE8D8] flex items-center justify-center">
          <button
            type="button"
            onClick={handleDismiss}
            className="text-xs text-[#5B6B82] hover:text-[#1F2A44] font-medium hover:underline transition-colors cursor-pointer"
          >
            Maybe later, I'll pay regular price
          </button>
        </div>

      </div>
    </div>
  );
};

export default SpecialOfferModal;
