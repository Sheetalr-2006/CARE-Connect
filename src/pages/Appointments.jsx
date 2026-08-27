import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  Clock,
  MapPin,
  Car,
  Plus,
  Stethoscope,
  CheckCircle2,
  FileText,
  PhoneCall
} from 'lucide-react';

export const Appointments = () => {
  const { appointments, setIsBookAppointmentModalOpen, currentElderly } = useApp();

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-container-high shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-0.5 rounded-full">
              Clinical Care & Medical Escort
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-on-surface">
            Doctor Appointments & Transport
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Medical visit schedule for <strong className="text-on-surface">{currentElderly.name}</strong> with door-to-door volunteer driver escort.
          </p>
        </div>

        <button
          onClick={() => setIsBookAppointmentModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-ambient transition-all flex items-center gap-2 self-start md:self-auto"
        >
          <Plus size={16} />
          <span>Book Appointment</span>
        </button>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-high shadow-card hover:shadow-ambient transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-0.5 rounded-full">
                  {apt.type}
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  {apt.status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-on-surface">{apt.title}</h3>
              
              <div className="flex flex-wrap items-center gap-4 text-xs text-on-surface-variant">
                <span className="flex items-center gap-1 font-bold text-on-surface">
                  <Stethoscope size={15} className="text-primary" /> {apt.doctor}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin size={14} /> {apt.facility}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1 font-semibold text-primary">
                  <Clock size={14} /> {apt.date} at {apt.time}
                </span>
              </div>

              {/* Transport status alert */}
              {apt.transportAssistance && (
                <div className="p-3 rounded-2xl bg-slate-soft border border-primary/20 text-xs text-on-surface flex items-center gap-2 max-w-lg mt-2">
                  <Car size={16} className="text-primary flex-shrink-0" />
                  <div>
                    <span className="font-bold text-primary">Escort & Ride Status: </span>
                    <span>{apt.transportStatus}</span>
                  </div>
                </div>
              )}

              {apt.notes && (
                <p className="text-xs text-on-surface-variant pt-1 italic">
                  Note: {apt.notes}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2.5 self-end md:self-center">
              <a
                href="tel:5559014455"
                className="px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface transition-colors flex items-center gap-1.5"
              >
                <PhoneCall size={14} /> Clinic
              </a>
              <button
                onClick={() => alert(`Directions and clinic pass generated for ${apt.facility}. Sent to caregiver phone.`)}
                className="px-4 py-2.5 rounded-xl bg-primary text-white text-xs font-bold shadow-sm hover:bg-primary/90 transition-all"
              >
                Get Clinic Pass
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
