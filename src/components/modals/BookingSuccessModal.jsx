import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Check,
  Calendar,
  Clock,
  User,
  HeartHandshake,
  Sparkles,
  X,
  ShieldCheck,
  Copy,
  ArrowRight
} from 'lucide-react';

export const BookingSuccessModal = () => {
  const { bookingSuccessData, hideBookingSuccess } = useApp();
  const {
    isOpen,
    title = "Care Service Booked Successfully!",
    seniorName = "Eleanor Vance",
    serviceName = "Warm Home Companion & Tea",
    date = "2026-08-28",
    time = "10:00 AM",
    caregiver = "David Miller (Verified Volunteer)",
    referenceId = "CC-94281",
    onAction = null
  } = bookingSuccessData || {};

  const modalRef = useRef(null);
  const primaryButtonRef = useRef(null);

  // Focus trap & ESC key handling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        hideBookingSuccess();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        if (primaryButtonRef.current) {
          primaryButtonRef.current.focus();
        }
      }, 50);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-success-title"
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-white rounded-[24px] border border-orange-100 shadow-2xl p-6 sm:p-8 text-center overflow-hidden animate-modal-scale-in"
      >
        {/* Confetti / Warm Glow Background Pulse (Style 1 Spec) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-gradient-to-b from-primary/15 via-orange-100/30 to-transparent blur-2xl pointer-events-none -z-10 animate-confetti-pulse"></div>

        {/* Floating Decorative Particle Badges */}
        <div className="absolute top-4 left-6 text-primary/40 animate-pulse pointer-events-none">
          <Sparkles size={20} />
        </div>
        <div className="absolute top-8 right-8 text-amber-500/40 animate-pulse pointer-events-none">
          <Sparkles size={16} />
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={hideBookingSuccess}
          className="absolute right-4 top-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Close confirmation"
        >
          <X size={18} />
        </button>

        {/* Checkmark Icon Animation (Style 1 Spec) */}
        <div className="mx-auto mb-5 w-20 h-20 rounded-full bg-primary-container border-4 border-white shadow-ambient flex items-center justify-center relative">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white shadow-md animate-checkmark-pop">
            <Check size={32} strokeWidth={3.5} />
          </div>
          {/* Subtle radiating ripple rings */}
          <span className="absolute inset-0 rounded-full border-2 border-primary/40 animate-ping pointer-events-none"></span>
        </div>

        {/* Modal Title & Subtitle */}
        <h2
          id="booking-success-title"
          className="text-2xl font-black text-slate-900 font-serif tracking-tight"
        >
          {title}
        </h2>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Your request has been verified and confirmed in the CareConnect companion system.
        </p>

        {/* Booking Summary Card */}
        <div className="mt-6 p-4.5 bg-slate-50/90 rounded-2xl border border-slate-200/80 text-left space-y-3 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200/70">
            <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
              Confirmation Ref
            </span>
            <span className="font-mono font-bold text-primary bg-primary-container px-2 py-0.5 rounded-md border border-primary/20 text-xs">
              {referenceId}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                <User size={13} className="text-primary" /> Senior Recipient
              </span>
              <p className="font-bold text-slate-800 truncate">{seniorName}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                <HeartHandshake size={13} className="text-primary" /> Assigned Caregiver
              </span>
              <p className="font-bold text-slate-800 truncate">{caregiver}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                <Calendar size={13} className="text-primary" /> Scheduled Date
              </span>
              <p className="font-bold text-slate-800">{date}</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                <Clock size={13} className="text-primary" /> Preferred Time
              </span>
              <p className="font-bold text-slate-800">{time}</p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-200/70 flex items-center justify-between text-[11px] text-slate-600">
            <span className="font-medium">Selected Service:</span>
            <span className="font-bold text-slate-900 truncate max-w-[220px]">{serviceName}</span>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            ref={primaryButtonRef}
            type="button"
            onClick={() => {
              hideBookingSuccess();
              if (onAction) onAction();
            }}
            className="flex-1 py-3.5 px-5 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-ambient transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span>View in Schedule / Dashboard</span>
            <ArrowRight size={15} />
          </button>

          <button
            type="button"
            onClick={hideBookingSuccess}
            className="py-3.5 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
          >
            Done
          </button>
        </div>

        {/* Security badge footer */}
        <p className="mt-4 text-[10px] text-slate-400 flex items-center justify-center gap-1">
          <ShieldCheck size={13} className="text-emerald-600" />
          HIPAA & State Registry Verified Companion Dispatch
        </p>

      </div>
    </div>
  );
};

export default BookingSuccessModal;
