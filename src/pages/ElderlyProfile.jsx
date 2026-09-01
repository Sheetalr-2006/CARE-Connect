import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  Heart,
  Phone,
  MapPin,
  Calendar,
  AlertCircle,
  FileText,
  ShieldCheck,
  Stethoscope,
  Activity,
  Edit3,
  Save,
  CheckCircle2
} from 'lucide-react';

export const ElderlyProfile = () => {
  const { currentElderly, updateElderlyVitals } = useApp();
  const [isEditingVitals, setIsEditingVitals] = useState(false);
  const [vitalsForm, setVitalsForm] = useState(currentElderly.vitals);

  const handleSaveVitals = (e) => {
    e.preventDefault();
    updateElderlyVitals(vitalsForm);
    setIsEditingVitals(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      
      {/* Profile Header Banner */}
      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-container-high shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <img
            src={currentElderly.avatar}
            alt={currentElderly.name}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-2 border-primary/20 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-0.5 rounded-full">
                {currentElderly.careTier}
              </span>
              <span className="text-xs text-on-surface-variant font-medium">ID: {currentElderly.id}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-on-surface mt-1">
              {currentElderly.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-on-surface-variant mt-1.5">
              <span>Born: {currentElderly.dob} (Age {currentElderly.age})</span>
              <span>•</span>
              <span>Blood Group: <strong className="text-on-surface">{currentElderly.bloodType}</strong></span>
              <span>•</span>
              <span>{currentElderly.address}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${currentElderly.phone}`}
            className="px-4 py-2.5 rounded-2xl bg-primary text-white font-bold text-xs shadow-ambient hover:bg-primary/90 transition-all flex items-center gap-2"
          >
            <Phone size={15} />
            <span>Call Senior</span>
          </a>
        </div>
      </div>

      {/* 3-Column Profile Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Column 1: Medical Conditions & Diagnoses */}
        <div className="space-y-6">
          
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-high shadow-card space-y-4">
            <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
              <Stethoscope size={18} className="text-primary" />
              Diagnosed Medical Conditions
            </h3>
            <div className="space-y-2">
              {currentElderly.conditions.map((cond, i) => (
                <div key={i} className="p-3 rounded-2xl bg-surface-container-low border border-surface-container flex items-center gap-2 text-xs font-semibold text-on-surface">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span>{cond}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-high shadow-card space-y-4">
            <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
              <AlertCircle size={18} className="text-error" />
              Allergies & Drug Sensitivities
            </h3>
            <div className="space-y-2">
              {currentElderly.allergies.map((all, i) => (
                <div key={i} className="p-3 rounded-2xl bg-error-container/30 border border-error/20 flex items-center gap-2 text-xs font-semibold text-on-error-container">
                  <span className="w-2 h-2 rounded-full bg-error"></span>
                  <span>{all}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-high shadow-card space-y-3">
            <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
              <Activity size={18} className="text-primary" />
              Primary Care Physician
            </h3>
            <div className="p-3.5 rounded-2xl bg-surface-container-low text-xs space-y-1">
              <p className="font-bold text-on-surface">{currentElderly.primaryPhysician.name}</p>
              <p className="text-on-surface-variant">{currentElderly.primaryPhysician.specialty}</p>
              <p className="text-on-surface-variant">{currentElderly.primaryPhysician.clinic}</p>
              <p className="text-primary font-semibold pt-1">{currentElderly.primaryPhysician.phone}</p>
            </div>
          </div>

        </div>

        {/* Column 2: Live Health Vitals & Daily Assistance */}
        <div className="space-y-6">
          
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-high shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
                <Activity size={18} className="text-primary" />
                Current Health Vitals
              </h3>
              <button
                onClick={() => setIsEditingVitals(!isEditingVitals)}
                className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
              >
                <Edit3 size={13} /> {isEditingVitals ? 'Cancel' : 'Update Vitals'}
              </button>
            </div>

            {isEditingVitals ? (
              <form onSubmit={handleSaveVitals} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold text-on-surface-variant mb-1">Blood Pressure</label>
                  <input
                    type="text"
                    value={vitalsForm.bloodPressure}
                    onChange={(e) => setVitalsForm({ ...vitalsForm, bloodPressure: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-on-surface-variant mb-1">Heart Rate</label>
                  <input
                    type="text"
                    value={vitalsForm.heartRate}
                    onChange={(e) => setVitalsForm({ ...vitalsForm, heartRate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-on-surface-variant mb-1">Blood Sugar</label>
                  <input
                    type="text"
                    value={vitalsForm.bloodSugar}
                    onChange={(e) => setVitalsForm({ ...vitalsForm, bloodSugar: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-primary text-white text-xs font-bold shadow-sm"
                >
                  Save Updates
                </button>
              </form>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-surface-container-low">
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant">Blood Pressure</span>
                  <p className="text-lg font-black text-on-surface mt-0.5">{currentElderly.vitals.bloodPressure}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-surface-container-low">
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant">Heart Rate</span>
                  <p className="text-lg font-black text-on-surface mt-0.5">{currentElderly.vitals.heartRate}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-surface-container-low">
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant">Blood Sugar</span>
                  <p className="text-lg font-black text-on-surface mt-0.5">{currentElderly.vitals.bloodSugar}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-surface-container-low">
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant">Oxygen Saturation</span>
                  <p className="text-lg font-black text-on-surface mt-0.5">{currentElderly.vitals.oxygenLevel}</p>
                </div>
              </div>
            )}
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-high shadow-card space-y-4">
            <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
              <CheckCircle2 size={18} className="text-primary" />
              Assistance & Daily Support Needs
            </h3>
            <div className="space-y-2">
              {currentElderly.assistanceNeeds.map((need, i) => (
                <div key={i} className="p-3 rounded-2xl bg-surface-container-low flex items-center gap-2 text-xs font-semibold text-on-surface">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span>{need}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Column 3: Companionship Notes & Interests */}
        <div className="space-y-6">
          
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-high shadow-card space-y-4">
            <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
              <Heart size={18} className="text-rose-600" />
              Interests & Conversation Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {currentElderly.interests.map((interest, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-high shadow-card space-y-3">
            <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
              <FileText size={18} className="text-primary" />
              Care Coordinator Notes & Guidelines
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed p-4 rounded-2xl bg-surface-container-low border border-surface-container">
              {currentElderly.notes}
            </p>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-high shadow-card space-y-3">
            <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
              <User size={18} className="text-primary" />
              Primary Family Emergency Contact
            </h3>
            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 text-xs space-y-1">
              <p className="font-bold text-on-surface">{currentElderly.emergencyContact.name}</p>
              <p className="text-on-surface-variant">{currentElderly.emergencyContact.relation}</p>
              <p className="text-primary font-semibold">{currentElderly.emergencyContact.phone}</p>
              <p className="text-on-surface-variant">{currentElderly.emergencyContact.email}</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
