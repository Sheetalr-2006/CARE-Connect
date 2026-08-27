import React, { useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  AlertTriangle,
  AlertCircle,
  X,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export const WarningErrorModal = () => {
  const { warningModalData, hideWarningModal } = useApp();
  const {
    isOpen,
    title = "Attention Required",
    message = "Are you sure you want to proceed with this action?",
    confirmText = "Yes, Proceed",
    cancelText = "Cancel",
    onConfirm = null,
    isDestructive = false
  } = warningModalData || {};

  const confirmBtnRef = useRef(null);

  // Focus trap & ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        hideWarningModal();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        if (confirmBtnRef.current) {
          confirmBtnRef.current.focus();
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={hideWarningModal}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="warning-modal-title"
      aria-describedby="warning-modal-desc"
    >
      {/* Center Modal with Shake Animation & Red/Amber Border (Style 6 Spec) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-md bg-white rounded-[24px] shadow-2xl p-6 sm:p-7 text-center overflow-hidden border-2 animate-modal-shake ${
          isDestructive ? 'border-red-500/80' : 'border-amber-400/90'
        }`}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={hideWarningModal}
          className="absolute right-4 top-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Close warning dialog"
        >
          <X size={18} />
        </button>

        {/* Warning Icon Badge */}
        <div
          className={`mx-auto mb-4 w-16 h-16 rounded-2xl flex items-center justify-center shadow-md ${
            isDestructive
              ? 'bg-red-100 text-red-600 border border-red-200'
              : 'bg-amber-100 text-amber-600 border border-amber-200'
          }`}
        >
          {isDestructive ? <AlertCircle size={32} /> : <AlertTriangle size={32} />}
        </div>

        {/* Title */}
        <h3
          id="warning-modal-title"
          className="text-xl font-bold text-slate-900 font-serif leading-tight"
        >
          {title}
        </h3>

        {/* Message */}
        <p
          id="warning-modal-desc"
          className="text-xs text-slate-600 mt-2 leading-relaxed max-w-xs mx-auto"
        >
          {message}
        </p>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
          <button
            type="button"
            onClick={hideWarningModal}
            className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
          >
            {cancelText}
          </button>

          <button
            ref={confirmBtnRef}
            type="button"
            onClick={() => {
              hideWarningModal();
              if (onConfirm) onConfirm();
            }}
            className={`flex-1 py-3 px-4 rounded-xl text-white font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 ${
              isDestructive
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-primary hover:bg-primary-hover shadow-ambient'
            }`}
          >
            <span>{confirmText}</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default WarningErrorModal;
