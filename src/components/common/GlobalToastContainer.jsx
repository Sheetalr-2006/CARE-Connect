import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Bell,
  Pill,
  Heart,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Sparkles,
  X,
  ShieldCheck,
  PhoneCall
} from 'lucide-react';

export const GlobalToastContainer = () => {
  const { toasts, dismissToast } = useApp();

  if (!toasts || toasts.length === 0) return null;

  const getToastIcon = (type) => {
    switch (type) {
      case 'medicine':
        return { icon: Pill, color: 'text-rose-500 bg-rose-50 border-rose-200' };
      case 'appointment':
        return { icon: Calendar, color: 'text-blue-500 bg-blue-50 border-blue-200' };
      case 'caregiver':
      case 'volunteer':
        return { icon: Heart, color: 'text-primary bg-primary-container border-primary/20' };
      case 'warning':
        return { icon: AlertTriangle, color: 'text-amber-600 bg-amber-50 border-amber-200' };
      case 'success':
        return { icon: CheckCircle2, color: 'text-primary bg-orange-50 border-orange-200' };
      case 'sos':
        return { icon: AlertTriangle, color: 'text-white bg-error border-error animate-pulse' };
      default:
        return { icon: Bell, color: 'text-primary bg-primary-container border-primary/20' };
    }
  };

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed top-20 right-4 sm:right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none"
    >
      {toasts.map((toast) => {
        const { icon: IconComponent, color } = getToastIcon(toast.type);
        return (
          <div
            key={toast.id}
            role="alert"
            className="pointer-events-auto w-full bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden animate-toast-slide-in transition-all relative"
          >
            <div className="p-3.5 flex items-start gap-3">
              {/* Icon Led Badge */}
              <div className={`w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0 ${color}`}>
                <IconComponent size={18} />
              </div>

              {/* Minimal Text Content */}
              <div className="flex-1 min-w-0 pr-2">
                <h4 className="text-xs font-bold text-slate-900 tracking-tight leading-snug truncate">
                  {toast.title}
                </h4>
                {toast.message && (
                  <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed line-clamp-2">
                    {toast.message}
                  </p>
                )}
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => dismissToast(toast.id)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors flex-shrink-0"
                aria-label="Dismiss alert"
              >
                <X size={14} />
              </button>
            </div>

            {/* Auto-Dismiss Countdown Progress Bar (5s) */}
            <div className="h-1 bg-slate-100 w-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-orange-400 animate-progress-countdown"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GlobalToastContainer;
