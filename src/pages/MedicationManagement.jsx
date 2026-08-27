import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Pill,
  Clock,
  Plus,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  Info
} from 'lucide-react';

export const MedicationManagement = () => {
  const {
    medications,
    toggleMedicationStatus,
    requestMedRefill,
    setIsAddMedicationModalOpen,
    currentElderly,
    showToast,
    showWarningModal
  } = useApp();

  const handleToggleMed = (med) => {
    const nextStateTaken = med.status !== 'Taken';
    toggleMedicationStatus(med.id);
    showToast({
      type: 'medicine',
      title: nextStateTaken ? `${med.name} Marked as Taken` : `${med.name} Status Reset`,
      message: nextStateTaken
        ? `Adherence recorded at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`
        : `Prescription set back to pending for today.`
    });
  };

  const handleRefill = (med) => {
    requestMedRefill(med.id);
    showToast({
      type: 'success',
      title: 'Pharmacy Refill Dispatched',
      message: `30-day supply of ${med.name} ordered from Springfield Wellness Pharmacy.`
    });
  };

  const handleDiscontinue = (med) => {
    showWarningModal({
      title: `Discontinue ${med.name}?`,
      message: `Are you sure you want to remove ${med.name} (${med.dosage}) from active daily reminders? Please ensure your physician has approved this change.`,
      confirmText: "Yes, Discontinue",
      cancelText: "Keep Prescription",
      isDestructive: true,
      onConfirm: () => {
        toggleMedicationStatus(med.id);
        showToast({
          type: 'warning',
          title: 'Prescription Discontinued',
          message: `${med.name} removed from active daily schedule.`
        });
      }
    });
  };

  const takenCount = medications.filter(m => m.status === 'Taken').length;
  const adherencePercent = Math.round((takenCount / (medications.length || 1)) * 100);

  // Group medications by timing bucket
  const morningMeds = medications.filter(m => m.timing.includes('Morning'));
  const afternoonMeds = medications.filter(m => m.timing.includes('Afternoon'));
  const eveningMeds = medications.filter(m => m.timing.includes('Evening') || m.timing.includes('Bedtime'));

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      
      {/* Top Banner */}
      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-container-high shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-0.5 rounded-full">
              Prescription & Adherence Tracker
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-on-surface">
            Medication Schedule & Pharmacy Sync
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Care adherence for <strong className="text-on-surface">{currentElderly.name}</strong> • Synchronized with Springfield Wellness Pharmacy.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddMedicationModalOpen(true)}
            className="px-5 py-3 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-ambient transition-all flex items-center gap-2"
          >
            <Plus size={16} />
            <span>Add Medication</span>
          </button>
        </div>
      </div>

      {/* Adherence & Pharmacy Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-surface-container-high shadow-card flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Today's Adherence</span>
            <p className="text-2xl font-black text-on-surface mt-1">{takenCount} / {medications.length} Pills</p>
            <span className="text-xs font-semibold text-emerald-600">✓ On track for 100%</span>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 font-black text-lg flex items-center justify-center border border-emerald-200">
            {adherencePercent}%
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-surface-container-high shadow-card flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Refill Monitor</span>
            <p className="text-2xl font-black text-on-surface mt-1">
              {medications.filter(m => m.refillNeeded).length} Refill Alert
            </p>
            <span className="text-xs font-semibold text-amber-600">Auto-pharmacy notification</span>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
            <RefreshCw size={24} />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-surface-container-high shadow-card flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">Caregiver Alerts</span>
            <p className="text-2xl font-black text-on-surface mt-1">Enabled</p>
            <span className="text-xs font-semibold text-primary">SMS to Sarah Vance on miss</span>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
            <Sparkles size={24} />
          </div>
        </div>
      </div>

      {/* Medication Time Sections */}
      <div className="space-y-6">
        
        {/* Morning Meds */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
            <Clock size={16} />
            <span>Morning Prescriptions (08:00 AM)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {morningMeds.map((med) => renderMedCard(med, handleToggleMed, handleRefill, handleDiscontinue))}
          </div>
        </div>

        {/* Afternoon Meds */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700">
            <Clock size={16} />
            <span>Afternoon Prescriptions (01:00 PM)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {afternoonMeds.map((med) => renderMedCard(med, handleToggleMed, handleRefill, handleDiscontinue))}
          </div>
        </div>

        {/* Evening Meds */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700">
            <Clock size={16} />
            <span>Evening & Bedtime (07:30 PM)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eveningMeds.map((med) => renderMedCard(med, handleToggleMed, handleRefill, handleDiscontinue))}
          </div>
        </div>

      </div>

    </div>
  );
};

const renderMedCard = (med, handleToggle, handleRefill, handleDiscontinue) => {
  const isTaken = med.status === 'Taken';
  return (
    <div
      key={med.id}
      className={`p-5 rounded-3xl border-2 transition-all flex flex-col justify-between ${
        isTaken
          ? 'bg-emerald-50/40 border-emerald-300'
          : 'bg-surface-container-lowest border-surface-container-high shadow-card hover:shadow-ambient'
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                isTaken ? 'bg-emerald-600 text-white' : 'bg-primary/10 text-primary'
              }`}
            >
              <Pill size={22} />
            </div>
            <div>
              <h3 className="text-base font-bold text-on-surface">{med.name}</h3>
              <p className="text-xs text-on-surface-variant font-medium">{med.dosage} • {med.purpose}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleToggle(med)}
              className={`px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-transform active:scale-95 cursor-pointer ${
                isTaken
                  ? 'bg-emerald-600 text-white'
                  : 'bg-primary text-white hover:bg-primary/90'
              }`}
            >
              {isTaken ? '✓ Taken' : 'Mark Taken'}
            </button>
          </div>
        </div>

        <div className="text-xs text-on-surface-variant bg-surface-container-low p-3 rounded-xl mb-3 flex items-center gap-2">
          <Info size={14} className="text-primary flex-shrink-0" />
          <span>{med.mealInstruction}</span>
        </div>
      </div>

      <div className="pt-3 border-t border-surface-container flex items-center justify-between text-xs gap-2">
        <span className="text-on-surface-variant text-[11px]">
          Supply: <strong className="text-on-surface">{med.remainingDays} days left</strong>
        </span>

        <div className="flex items-center gap-2">
          {med.refillNeeded ? (
            <button
              onClick={() => handleRefill(med)}
              disabled={med.refillRequested}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                med.refillRequested
                  ? 'bg-surface-container text-outline'
                  : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
              }`}
            >
              {med.refillRequested ? '✓ Refill Ordered' : '⚠️ Order Refill'}
            </button>
          ) : (
            <span className="text-emerald-700 font-semibold text-[11px] hidden sm:inline">✓ Adequate</span>
          )}

          <button
            onClick={() => handleDiscontinue(med)}
            className="text-[11px] text-slate-400 hover:text-red-600 hover:underline px-1.5 py-0.5 rounded transition-colors cursor-pointer"
            title="Discontinue prescription"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};
