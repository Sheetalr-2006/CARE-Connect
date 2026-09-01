import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  CalendarHeart,
  Clock,
  MapPin,
  CheckSquare,
  Square,
  Plus,
  CheckCircle2,
  PhoneCall,
  User,
  MessageSquare,
  Star,
  Users,
  HeartHandshake
} from 'lucide-react';

export const VolunteerVisits = () => {
  const {
    visits,
    toggleVisitChecklist,
    completeVisit,
    setIsScheduleVisitModalOpen,
    openRateVolunteerModal,
    currentElderly
  } = useApp();

  const [activeTab, setActiveTab] = useState("Upcoming");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [feedbackNote, setFeedbackNote] = useState("");
  const [completingVisitId, setCompletingVisitId] = useState(null);

  const visitCategories = ["All", "Volunteer Companion", "Family Quality Time", "Creative Arts", "Mobility & Errands", "Music & Mental Wellbeing"];

  const filteredVisits = visits.filter(v => {
    const matchesTab = v.status === activeTab;
    const matchesCat = selectedCategory === "All" || v.visitCategory === selectedCategory;
    return matchesTab && matchesCat;
  });

  const handleFinishVisit = (visitId) => {
    completeVisit(visitId, feedbackNote || "Visit concluded successfully with pleasant interaction.");
    setCompletingVisitId(null);
    setFeedbackNote("");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-primary bg-[#FFE8DF] px-3.5 py-1 rounded-full">
              In-Person Care & Family Visits
            </span>
          </div>
          <h1 className="text-3xl font-black text-[#1A1D20] font-serif">
            Visit Schedules & Activity Checklists
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-2xl leading-relaxed">
            Manage daily home visits, family quality time, and interactive checklists for <strong className="text-[#1A1D20]">{currentElderly.name}</strong>.
          </p>
        </div>

        <button
          onClick={() => setIsScheduleVisitModalOpen(true)}
          className="px-6 py-3.5 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-ambient transition-transform active:scale-95 flex items-center gap-2 self-start md:self-auto"
        >
          <Plus size={16} />
          <span>Schedule In-Person Visit</span>
        </button>
      </div>

      {/* Tabs & Category Filter */}
      <div className="bg-white p-4 rounded-3xl border border-[#E2E8F0] shadow-card space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Status Tabs */}
          <div className="flex bg-[#F1F5F9] p-1 rounded-2xl">
            {["Upcoming", "Completed"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-[#64748B] hover:text-[#1A1D20]'
                }`}
              >
                {tab} Visits ({visits.filter(v => v.status === tab).length})
              </button>
            ))}
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap gap-1.5">
            {visitCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-white shadow-ambient font-bold'
                    : 'bg-[#F8F9FA] hover:bg-[#F1F5F9] text-[#64748B] border border-[#E2E8F0]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Visits List */}
      <div className="space-y-4">
        {filteredVisits.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-[#E2E8F0] shadow-card text-center text-[#64748B]">
            <CalendarHeart size={40} className="mx-auto mb-3 text-primary/40" />
            <p className="text-sm font-bold text-[#1A1D20]">No {activeTab.toLowerCase()} visits found in this category</p>
            <p className="text-xs text-[#64748B] mt-1">Click "Schedule In-Person Visit" to book a new session.</p>
          </div>
        ) : (
          filteredVisits.map((visit) => (
            <div
              key={visit.id}
              className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E2E8F0] shadow-card space-y-4 hover:shadow-ambient transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-[#FFE8DF] px-3 py-0.5 rounded-full">
                      {visit.visitCategory || "Volunteer Companion"}
                    </span>
                    <span className="text-[11px] text-[#64748B] font-semibold flex items-center gap-1">
                      <Clock size={13} /> {visit.date} • {visit.time}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1A1D20] font-serif">{visit.activityType}</h3>
                  <p className="text-xs text-[#64748B] flex items-center gap-1 mt-1 font-medium">
                    <MapPin size={14} className="text-primary" /> {visit.location}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-[#94A3B8] block">Visitor</span>
                    <p className="text-xs font-bold text-[#1A1D20]">{visit.volunteerName}</p>
                  </div>
                  <a
                    href="tel:5553456789"
                    className="p-2.5 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    title="Call Visitor"
                  >
                    <PhoneCall size={16} />
                  </a>
                </div>
              </div>

              {/* Notes */}
              <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-[#E2E8F0] text-xs text-[#1A1D20]">
                <strong className="text-primary font-bold">Care Notes: </strong>
                <span>{visit.notes}</span>
              </div>

              {/* Interactive Checklist */}
              {visit.checklist && visit.checklist.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-[#F1F5F9]">
                  <p className="text-xs font-bold text-[#1A1D20]">Visit Tasks & Care Checklist:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {visit.checklist.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleVisitChecklist(visit.id, item.id)}
                        className={`flex items-center gap-2.5 p-3 rounded-2xl border text-left text-xs transition-all ${
                          item.done
                            ? 'bg-orange-50 border-orange-200 text-orange-900 font-semibold'
                            : 'bg-[#F8F9FA] border-[#E2E8F0] text-[#1A1D20] hover:border-primary/40'
                        }`}
                      >
                        {item.done ? (
                          <CheckSquare size={16} className="text-primary flex-shrink-0" />
                        ) : (
                          <Square size={16} className="text-[#94A3B8] flex-shrink-0" />
                        )}
                        <span className={item.done ? 'line-through opacity-80' : ''}>{item.task}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Complete & Rate Buttons */}
              <div className="pt-3 border-t border-[#F1F5F9] flex flex-wrap items-center justify-between gap-3">
                {visit.status === 'Upcoming' ? (
                  <>
                    {completingVisitId === visit.id ? (
                      <div className="w-full space-y-2">
                        <textarea
                          rows={2}
                          value={feedbackNote}
                          onChange={(e) => setFeedbackNote(e.target.value)}
                          placeholder="Add post-visit summary notes..."
                          className="w-full p-3 rounded-2xl bg-[#F8F9FA] border border-[#E2E8F0] text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleFinishVisit(visit.id)}
                            className="px-4 py-2 rounded-xl bg-primary text-white font-bold text-xs shadow-sm hover:bg-primary-hover"
                          >
                            Submit & Mark Completed
                          </button>
                          <button
                            onClick={() => setCompletingVisitId(null)}
                            className="px-4 py-2 rounded-xl bg-[#F1F5F9] text-[#64748B] font-bold text-xs"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setCompletingVisitId(visit.id)}
                        className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-sm transition-all"
                      >
                        Mark Visit as Completed
                      </button>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs text-primary font-bold flex items-center gap-1.5">
                      <CheckCircle2 size={16} /> Visit Completed Successfully
                    </span>
                    <button
                      onClick={() => openRateVolunteerModal({ id: visit.volunteerId || "vol-001", name: visit.volunteerName })}
                      className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-ambient flex items-center gap-1.5"
                    >
                      <Star size={14} className="fill-white" />
                      <span>Rate Visitor</span>
                    </button>
                  </div>
                )}
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default VolunteerVisits;
