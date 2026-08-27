import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Tag,
  Sparkles,
  Check,
  Copy,
  X,
  Shield,
  ArrowRight,
  Gift,
  Clock
} from 'lucide-react';

export const SpecialOfferModal = () => {
  const { isSpecialOfferOpen, setIsSpecialOfferOpen, showToast } = useApp();
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [isClaimed, setIsClaimed] = useState(false);
  const modalRef = useRef(null);

  const promoCode = "CARE15";

  // ESC to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isSpecialOfferOpen) {
        handleDismiss();
      }
    };
    if (isSpecialOfferOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isSpecialOfferOpen]);

  const handleDismiss = () => {
    setIsSpecialOfferOpen(false);
    sessionStorage.setItem('cc_offer_dismissed', 'true');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(promoCode);
    setCopied(true);
    showToast({
      type: 'success',
      title: 'Promo Code Copied!',
      message: 'Use code CARE15 at checkout to receive 15% off.'
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleClaim = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsClaimed(true);
    showToast({
      type: 'success',
      title: 'Discount Activated!',
      message: `15% off code sent to ${email}.`
    });
    setTimeout(() => {
      handleDismiss();
    }, 2000);
  };

  if (!isSpecialOfferOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={handleDismiss}
      role="dialog"
      aria-modal="true"
      aria-labelledby="special-offer-title"
    >
      {/* Center Modal with Playful Bounce-In (Style 5 Spec) */}
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md bg-white rounded-[28px] border-2 border-orange-200/80 shadow-2xl overflow-hidden p-6 sm:p-8 text-center animate-modal-bounce-in"
      >
        {/* Top Decorative Banner Ribbon */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-xl pointer-events-none"></div>

        {/* Close 'X' Button (Style 5 Spec) */}
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close special offer"
        >
          <X size={18} />
        </button>

        {/* Gift Icon Badge */}
        <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-orange-400 flex items-center justify-center text-white shadow-ambient">
          <Gift size={28} />
        </div>

        {/* Header Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-primary text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles size={13} />
          Limited Welcome Benefit
        </div>

        {/* Bold Headline with Offer Highlighted in Orange (Style 5 Spec) */}
        <h3 id="special-offer-title" className="text-2xl sm:text-3xl font-black text-slate-900 font-serif leading-tight">
          Enjoy <span className="text-primary font-serif underline decoration-orange-300 decoration-wavy">-15% OFF</span> <br />
          Your First Month of Care
        </h3>

        <p className="text-xs text-slate-500 mt-2 max-w-xs mx-auto">
          Get dedicated companion home visits, daily medication tracking, and 24/7 family peace of mind.
        </p>

        {/* Coupon Code Pill */}
        <div className="mt-5 p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 pl-2">
            <Tag size={16} className="text-primary flex-shrink-0" />
            <span className="font-mono font-bold text-sm text-slate-900 tracking-widest">{promoCode}</span>
          </div>
          <button
            type="button"
            onClick={handleCopyCode}
            className="px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
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

        {/* Email Claim Form */}
        {!isClaimed ? (
          <form onSubmit={handleClaim} className="mt-4 space-y-3">
            <div className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email for instant unlock..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1"
              >
                <span>Claim</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </form>
        ) : (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2">
            <Check size={16} />
            <span>Offer unlocked! Code applied to your account.</span>
          </div>
        )}

        {/* Dismiss Text Link: "Maybe later" (Style 5 Spec) */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center">
          <button
            type="button"
            onClick={handleDismiss}
            className="text-xs text-slate-400 hover:text-slate-700 font-semibold hover:underline transition-colors"
          >
            Maybe later, I'll pay regular price
          </button>
        </div>

      </div>
    </div>
  );
};

export default SpecialOfferModal;
