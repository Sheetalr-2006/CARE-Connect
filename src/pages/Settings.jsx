import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import {
  Settings as SettingsIcon,
  Type,
  Eye,
  Volume2,
  Bell,
  Shield,
  Phone,
  CheckCircle2,
  Save,
  Moon
} from 'lucide-react';

export const Settings = () => {
  const {
    textSize,
    setTextSize,
    highContrast,
    setHighContrast,
    currentElderly
  } = useApp();

  const { currentUser } = useAuth();

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [fallDetection, setFallDetection] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-container-high shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-0.5 rounded-full">
              Accessibility & Preferences
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-on-surface">
            Settings & Senior Accessibility
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Customize typography sizing, high-contrast visual modes, and automated emergency alert contacts.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-3 rounded-2xl bg-primary text-white font-bold text-xs shadow-ambient hover:bg-primary/90 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Save size={16} />
          <span>Save Preferences</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-orange-100 border border-orange-300 text-orange-950 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 size={16} className="text-primary" />
          <span>Your accessibility and system preferences have been saved successfully!</span>
        </div>
      )}

      {/* Accessibility Section (Crucial for Elderly Audience) */}
      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-container-high shadow-card space-y-6">
        <h2 className="text-base font-bold text-on-surface flex items-center gap-2">
          <Eye size={20} className="text-primary" />
          Senior Vision & Accessibility
        </h2>

        {/* Text Size Slider / Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-on-surface flex items-center gap-2">
            <Type size={16} className="text-primary" />
            Display Font Size Scale:
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'normal', label: 'Standard (16px)', desc: 'Default layout' },
              { id: 'large', label: 'Large (18px)', desc: 'Comfortable reading' },
              { id: 'extra-large', label: 'Extra Large (20px)', desc: 'Maximum legibility' }
            ].map((size) => (
              <button
                key={size.id}
                type="button"
                onClick={() => setTextSize(size.id)}
                className={`p-3.5 rounded-2xl border-2 text-center transition-all ${
                  textSize === size.id
                    ? 'bg-primary text-white border-primary shadow-ambient font-bold'
                    : 'bg-surface-container-low border-surface-container text-on-surface hover:border-primary/40'
                }`}
              >
                <span className="text-xs block">{size.label}</span>
                <span className="text-[10px] opacity-80 block mt-0.5">{size.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* High Contrast Mode Toggle */}
        <div className="p-4 rounded-2xl bg-surface-container-low flex items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-on-surface block">High Contrast Visual Mode</span>
            <p className="text-[11px] text-on-surface-variant">Enhance border sharpness and darken text contrast for aging eyes</p>
          </div>
          <input
            type="checkbox"
            checked={highContrast}
            onChange={(e) => setHighContrast(e.target.checked)}
            className="w-5 h-5 text-primary rounded focus:ring-primary cursor-pointer"
          />
        </div>

        {/* Voice Assistance Toggle */}
        <div className="p-4 rounded-2xl bg-surface-container-low flex items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-on-surface block flex items-center gap-1.5">
              <Volume2 size={15} className="text-primary" /> Voice Prompts & Screen Reading
            </span>
            <p className="text-[11px] text-on-surface-variant">Read aloud medication reminders and visit notifications</p>
          </div>
          <input
            type="checkbox"
            checked={voiceEnabled}
            onChange={(e) => setVoiceEnabled(e.target.checked)}
            className="w-5 h-5 text-primary rounded focus:ring-primary cursor-pointer"
          />
        </div>
      </div>

      {/* Safety & Emergency Contacts */}
      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-container-high shadow-card space-y-4">
        <h2 className="text-base font-bold text-on-surface flex items-center gap-2">
          <Shield size={20} className="text-error" />
          Safety & Emergency Broadcast
        </h2>

        <div className="p-4 rounded-2xl bg-error-container/20 border border-error/20 space-y-2 text-xs">
          <span className="font-bold text-on-surface">Primary Contact on SOS Trigger:</span>
          <p className="text-on-surface-variant">
            {currentElderly.emergencyContact.name} ({currentElderly.emergencyContact.relation}) • {currentElderly.emergencyContact.phone}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-low flex items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-on-surface block">Automated Fall & Inactivity Detection Sync</span>
            <p className="text-[11px] text-on-surface-variant">Alert family dashboard if no check-in by 10:30 AM</p>
          </div>
          <input
            type="checkbox"
            checked={fallDetection}
            onChange={(e) => setFallDetection(e.target.checked)}
            className="w-5 h-5 text-primary rounded focus:ring-primary cursor-pointer"
          />
        </div>
      </div>

      {/* User Account Info */}
      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-container-high shadow-card space-y-3">
        <h2 className="text-base font-bold text-on-surface">Logged In Account</h2>
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-surface-container-low">
          <img src={currentUser?.avatar} alt={currentUser?.name} className="w-12 h-12 rounded-2xl object-cover" />
          <div className="text-xs">
            <p className="font-bold text-on-surface">{currentUser?.name}</p>
            <p className="text-on-surface-variant">{currentUser?.email}</p>
            <span className="text-[10px] font-semibold text-primary">{currentUser?.roleLabel}</span>
          </div>
        </div>
      </div>

    </div>
  );
};
