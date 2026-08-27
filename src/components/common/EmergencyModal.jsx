import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertOctagon, PhoneCall, ShieldAlert, X, HeartPulse } from 'lucide-react';

export const EmergencyModal = () => {
  const { isEmergencyModalOpen, setIsEmergencyModalOpen, currentElderly } = useApp();

  if (!isEmergencyModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-4 border-error relative animate-in zoom-in-95 duration-200">
        
        {/* Close button */}
        <button
          onClick={() => setIsEmergencyModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors"
          aria-label="Close emergency modal"
        >
          <X size={22} />
        </button>

        {/* Header Icon */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-error/15 text-error flex items-center justify-center animate-bounce">
            <AlertOctagon size={36} />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-error bg-error-container/60 px-3 py-1 rounded-full">
              Urgent Medical Protocol
            </span>
            <h2 className="text-2xl font-black text-on-surface mt-1">Emergency SOS Active</h2>
          </div>
        </div>

        {/* Patient Notice */}
        <div className="bg-error-container/30 p-4 rounded-2xl border border-error/30 mb-6">
          <p className="text-sm font-semibold text-on-error-container">
            Emergency alert initiated for: <span className="underline">{currentElderly.name}</span>
          </p>
          <p className="text-xs text-on-surface-variant mt-1">
            Location: {currentElderly.address} • Phone: {currentElderly.phone}
          </p>
          <p className="text-xs text-on-surface-variant">
            Known Conditions: {currentElderly.conditions.join(', ')}
          </p>
        </div>

        {/* Quick Action Dial Buttons */}
        <div className="space-y-3">
          <a
            href="tel:911"
            className="w-full flex items-center justify-center gap-3 bg-error hover:bg-error/90 text-white font-bold py-4 px-6 rounded-2xl text-base shadow-lg transition-transform active:scale-95 text-center"
          >
            <PhoneCall size={22} />
            Call Emergency Services (911)
          </a>

          <a
            href={`tel:${currentElderly.emergencyContact.phone}`}
            className="w-full flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-6 rounded-2xl text-sm shadow-md transition-transform active:scale-95 text-center"
          >
            <HeartPulse size={20} />
            Call Primary Contact ({currentElderly.emergencyContact.name})
          </a>

          <button
            onClick={() => {
              alert("Broadcasting urgent push alerts and SMS to Dr. Olivia Reed and family caregivers...");
            }}
            className="w-full flex items-center justify-center gap-2 bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold py-3 px-6 rounded-2xl text-xs transition-colors"
          >
            <ShieldAlert size={18} className="text-primary" />
            Notify On-Duty Care Coordinator
          </button>
        </div>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-surface-container text-center">
          <button
            onClick={() => setIsEmergencyModalOpen(false)}
            className="text-xs font-semibold text-on-surface-variant hover:text-on-surface underline"
          >
            I am safe / Cancel False Alarm
          </button>
        </div>

      </div>
    </div>
  );
};
