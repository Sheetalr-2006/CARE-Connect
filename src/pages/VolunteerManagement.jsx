import React from 'react';
import { useApp } from '../context/AppContext';
import {
  UserCheck,
  ShieldCheck,
  Star,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  Filter,
  Plus
} from 'lucide-react';

export const VolunteerManagement = () => {
  const { volunteers, setIsScheduleVisitModalOpen, openRateVolunteerModal } = useApp();

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-container-high shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-0.5 rounded-full">
              Coordinator & Caregiver Admin
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-on-surface">
            Volunteer Network Roster & Management
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Track credentials, background checks, ratings, and active assignments across the community volunteer team.
          </p>
        </div>

        <button
          onClick={() => setIsScheduleVisitModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-ambient transition-all flex items-center gap-2 self-start md:self-auto"
        >
          <Plus size={16} />
          <span>Assign New Visit</span>
        </button>
      </div>

      {/* Roster Table / Card Grid */}
      <div className="bg-surface-container-lowest rounded-3xl border border-surface-container-high shadow-card overflow-hidden">
        <div className="p-5 border-b border-surface-container flex items-center justify-between">
          <h3 className="text-sm font-bold text-on-surface">Verified Community Volunteers ({volunteers.length})</h3>
          <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
            <ShieldCheck size={15} /> 100% Background Screened
          </span>
        </div>

        <div className="divide-y divide-surface-container">
          {volunteers.map((vol) => (
            <div key={vol.id} className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-surface-container-low/40 transition-colors">
              
              {/* Left Column: Avatar & Basic Info */}
              <div className="flex items-start gap-4">
                <img
                  src={vol.avatar}
                  alt={vol.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-primary/20 shadow-sm"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-on-surface">{vol.name}</h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                      <ShieldCheck size={12} /> Verified {vol.verificationDate}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant">{vol.role} • Age {vol.age}</p>
                  
                  {/* Degrees */}
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {vol.degrees.map((deg, i) => (
                      <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-surface-container text-on-surface flex items-center gap-1">
                        <Award size={11} className="text-primary" /> {deg}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Middle Column: Stats & Availability */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant block">Rating</span>
                  <span className="text-sm font-bold text-on-surface flex items-center gap-1 mt-0.5">
                    <Star size={14} className="fill-amber-500 text-amber-500" /> {vol.rating} ({vol.reviewsCount})
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant block">Completed</span>
                  <span className="text-sm font-bold text-on-surface mt-0.5 block">{vol.completedVisits} visits</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-on-surface-variant block">Status</span>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md mt-0.5 inline-block">
                    {vol.status}
                  </span>
                </div>
              </div>

              {/* Right Column: Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => openRateVolunteerModal(vol)}
                  className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Star size={14} className="fill-amber-500 text-amber-500" />
                  <span>Rate</span>
                </button>
                <a
                  href={`tel:${vol.phone}`}
                  className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface transition-colors"
                  title="Call Volunteer"
                >
                  <Phone size={15} />
                </a>
                <button
                  onClick={() => setIsScheduleVisitModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-sm hover:bg-primary/90 transition-all"
                >
                  Schedule Visit
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
