import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import {
  Heart,
  CalendarHeart,
  Pill,
  Smile,
  Calendar,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Activity,
  Plus,
  Car,
  ChevronRight,
  Sparkles,
  PhoneCall,
  Search,
  Bell,
  BatteryCharging,
  Stethoscope,
  Video
} from 'lucide-react';

export const MainDashboard = () => {
  const {
    currentElderly,
    medications,
    toggleMedicationStatus,
    visits,
    wellbeingLogs,
    appointments,
    setIsScheduleVisitModalOpen,
    setIsBookAppointmentModalOpen,
    setIsAddMedicationModalOpen,
    triggerEmergencySOS,
    setIsNotificationDrawerOpen,
    unreadNotificationCount,
    startVideoCall
  } = useApp();

  const { currentUser } = useAuth();

  const upcomingVisits = visits.filter(v => v.status === 'Upcoming');
  const nextMed = medications.find(m => m.status === 'Pending') || medications[0];
  const nextAppointment = appointments[0];

  return (
    <div className="space-y-6 max-w-[1280px] mx-auto animate-in fade-in duration-300">
      
      {/* Dashboard Top Header (Matching Stitch Screen) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-1">
            <Sparkles size={14} />
            <span>Wednesday, August 26, 2026 • 72°F Sunny</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-on-background">
            Good morning, {currentElderly.name.split(' ')[0]}
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Here is your personalized care and companionship overview for today.
          </p>
        </div>

        {/* Search & Notification Trigger */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Search health, meds, visits..."
              className="w-full h-11 pl-10 pr-4 rounded-2xl border border-[#E5E1D9] bg-[#F9F7F2] focus:outline-none focus:border-primary text-xs text-on-surface placeholder:text-on-surface-variant transition-colors"
            />
          </div>

          <button
            onClick={() => setIsNotificationDrawerOpen(true)}
            className="h-11 w-11 flex-shrink-0 flex items-center justify-center rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface relative"
            title="Notifications"
          >
            <Bell size={18} />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-error rounded-full border-2 border-surface-container"></span>
            )}
          </button>

          <button
            onClick={triggerEmergencySOS}
            className="h-11 px-4 rounded-2xl bg-error hover:bg-error/90 text-white font-bold text-xs shadow-md flex items-center gap-1.5 transition-transform active:scale-95 animate-pulse"
          >
            <AlertTriangle size={15} />
            <span>SOS</span>
          </button>
        </div>
      </div>

      {/* Bento Grid Layout (Matching Stitch Screen Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Column Section (Col 1-8): Wellbeing, Meds & Visits */}
        <div className="md:col-span-8 space-y-6">
          
          {/* Top Row: Wellbeing Score & Next Medication */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Today's Wellbeing Card */}
            <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-card hover:shadow-ambient transition-all flex flex-col justify-between animate-fade-in-scale" style={{ animationDelay: '100ms' }}>
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-base font-bold text-on-background flex items-center gap-2">
                    <Heart size={18} className="text-primary fill-primary" />
                    Today's Wellbeing
                  </h3>
                  <span className="bg-[#FFE8DF] text-primary px-3 py-0.5 rounded-full text-xs font-semibold">
                    Today
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-black text-primary tracking-tight">88%</span>
                  <span className="text-xs text-on-surface-variant font-medium">Daily Score</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface-container-low p-3 rounded-2xl border border-surface-variant/60">
                    <span className="block text-[11px] font-semibold text-on-surface-variant mb-0.5">Mood</span>
                    <span className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                      <Smile size={16} className="text-primary" /> Calm & Happy
                    </span>
                  </div>
                  <div className="bg-surface-container-low p-3 rounded-2xl border border-surface-variant/60">
                    <span className="block text-[11px] font-semibold text-on-surface-variant mb-0.5">Energy</span>
                    <span className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                      <BatteryCharging size={16} className="text-primary" /> Moderate
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-surface-container flex items-center justify-between">
                <span className="text-[11px] text-on-surface-variant">BP: {currentElderly.vitals.bloodPressure}</span>
                <Link
                  to="/wellbeing"
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                >
                  Log Daily Check-in <ChevronRight size={14} />
                </Link>
              </div>
            </div>

            {/* Medication Card */}
            <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-card hover:shadow-ambient transition-all flex flex-col justify-between relative overflow-hidden animate-fade-in-scale" style={{ animationDelay: '200ms' }}>
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
              
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-base font-bold text-on-background flex items-center gap-2">
                    <Pill size={18} className="text-primary" />
                    Next Medication
                  </h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                    nextMed.status === 'Taken' ? 'bg-orange-100 text-primary' : 'bg-[#FFE8DF] text-primary'
                  }`}>
                    {nextMed.status}
                  </span>
                </div>

                <div className="space-y-1 mb-4">
                  <p className="text-[11px] font-semibold text-on-surface-variant">Scheduled Prescription</p>
                  <p className="text-2xl font-black text-on-surface">{nextMed.name} {nextMed.dosage}</p>
                  <p className="text-xs text-on-surface-variant flex items-center gap-1.5 pt-1">
                    <Clock size={14} className="text-primary" />
                    {nextMed.timing} • {nextMed.mealInstruction}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-surface-container flex items-center justify-between gap-3">
                <button
                  onClick={() => toggleMedicationStatus(nextMed.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-transform active:scale-95 ${
                    nextMed.status === 'Taken'
                      ? 'bg-primary text-white shadow-ambient'
                      : 'bg-primary text-white hover:bg-primary/90 shadow-sm'
                  }`}
                >
                  {nextMed.status === 'Taken' ? '✓ Taken Today' : 'Mark as Taken'}
                </button>

                <Link
                  to="/medications"
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-0.5"
                >
                  View All ({medications.length}) <ChevronRight size={14} />
                </Link>
              </div>
            </div>

          </div>

          {/* Today's Scheduled Volunteer Visits */}
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 sm:p-7 shadow-card space-y-4 animate-fade-in-scale" style={{ animationDelay: '300ms' }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <CalendarHeart size={22} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-on-surface">Volunteer Companion Visits</h3>
                  <p className="text-xs text-on-surface-variant">Confirmed community support and companionship</p>
                </div>
              </div>

              <button
                onClick={() => setIsScheduleVisitModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-sm hover:bg-primary/90 transition-all flex items-center gap-1.5"
              >
                <Plus size={15} />
                <span>Book Visit</span>
              </button>
            </div>

            {upcomingVisits.length === 0 ? (
              <div className="p-6 rounded-2xl bg-surface-container-low text-center text-on-surface-variant">
                <p className="text-xs">No upcoming visits today.</p>
                <button
                  onClick={() => setIsScheduleVisitModalOpen(true)}
                  className="mt-1 text-xs font-bold text-primary hover:underline"
                >
                  Schedule a friendly volunteer companion →
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingVisits.map((visit, vIdx) => (
                  <div
                    key={visit.id}
                    style={{ animationDelay: `${vIdx * 80 + 350}ms` }}
                    className="p-4 rounded-2xl bg-surface-container-low border border-surface-container hover:border-primary/40 transition-all animate-fade-in-scale"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3.5">
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=128&h=128"
                          alt={visit.volunteerName}
                          className="w-12 h-12 rounded-2xl object-cover border border-outline-variant/40 shadow-sm"
                        />
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                            {visit.activityType}
                          </span>
                          <h4 className="text-sm font-bold text-on-surface mt-1">{visit.volunteerName}</h4>
                          <p className="text-xs text-on-surface-variant flex items-center gap-2 mt-0.5">
                            <span className="flex items-center gap-1"><Clock size={13} /> {visit.time}</span>
                            <span>•</span>
                            <span>{visit.location}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          to="/volunteer-visits"
                          className="px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-xs font-semibold text-on-surface transition-colors"
                        >
                          Checklist
                        </Link>
                        <a
                          href="tel:5553456789"
                          className="p-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                        >
                          <PhoneCall size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Column Section (Col 9-12): Appointments & Family Contact */}
        <div className="md:col-span-4 space-y-6">
          
          {/* Upcoming Medical Appointments */}
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-card space-y-4 animate-fade-in-scale" style={{ animationDelay: '250ms' }}>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
                <Calendar size={18} className="text-primary" />
                Next Appointment
              </h3>
              <button
                onClick={() => setIsBookAppointmentModalOpen(true)}
                className="text-xs font-bold text-primary hover:underline"
              >
                + Book
              </button>
            </div>

            {nextAppointment && (
              <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container space-y-2">
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  {nextAppointment.type}
                </span>
                <h4 className="text-sm font-bold text-on-surface">{nextAppointment.title}</h4>
                <p className="text-xs text-on-surface-variant flex items-center gap-1">
                  <Stethoscope size={13} className="text-primary" /> {nextAppointment.doctor}
                </p>
                <p className="text-xs text-on-surface-variant">
                  {nextAppointment.date} at {nextAppointment.time}
                </p>
                
                {nextAppointment.transportAssistance && (
                  <div className="p-2.5 rounded-xl bg-[#FFE8DF] text-primary text-[11px] font-semibold flex items-center gap-1.5 mt-2">
                    <Car size={14} />
                    <span className="truncate">{nextAppointment.transportStatus}</span>
                  </div>
                )}
              </div>
            )}

            <Link
              to="/appointments"
              className="block text-center text-xs font-bold text-primary hover:underline pt-1"
            >
              View Clinical Calendar →
            </Link>
          </div>

          {/* Family Contact Card */}
          <div className="bg-white border border-[#E2E8F0] rounded-3xl p-6 shadow-card space-y-3">
            <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
              <Heart size={16} className="text-rose-600 fill-rose-600" />
              Primary Family Caregiver
            </h3>
            
            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-surface-container-low">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=128&h=128"
                alt="Sarah Vance"
                className="w-12 h-12 rounded-2xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-on-surface">{currentElderly.emergencyContact.name}</h4>
                <p className="text-[11px] text-on-surface-variant">{currentElderly.emergencyContact.relation}</p>
                <p className="text-[11px] text-primary font-semibold">{currentElderly.emergencyContact.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => startVideoCall({
                  title: "Family Video Catch-up with Sarah",
                  type: "family",
                  participants: [
                    {
                      name: "Sarah Vance",
                      role: "Daughter & Primary Caregiver",
                      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=128&h=128",
                      status: "Speaking..."
                    }
                  ]
                })}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all shadow-sm"
              >
                <Video size={14} /> Video Call
              </button>
              <Link
                to="/family-dashboard"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-surface-container text-on-surface text-xs font-bold hover:bg-surface-container-high transition-colors"
              >
                Family Hub
              </Link>
            </div>
          </div>

          {/* Community Social Link */}
          <div className="p-5 rounded-3xl bg-primary/5 border border-primary/20 space-y-2">
            <h4 className="text-xs font-bold text-primary flex items-center gap-1.5">
              <Sparkles size={14} /> Community Activity Tomorrow
            </h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Morning Walking Club is gathering at Springfield Rose Pergola at 09:30 AM.
            </p>
            <Link to="/social" className="inline-block text-xs font-bold text-primary hover:underline pt-1">
              View Social Calendar →
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};
