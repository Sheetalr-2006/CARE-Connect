import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  HeartHandshake,
  Star,
  MapPin,
  Award,
  ShieldCheck,
  CalendarHeart,
  Search,
  Filter,
  CheckCircle2,
  PhoneCall,
  Sparkles,
  Video
} from 'lucide-react';

export const VolunteerMatching = () => {
  const {
    volunteers,
    setIsScheduleVisitModalOpen,
    openRateVolunteerModal,
    startVideoCall,
    currentElderly
  } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filteredVolunteers = volunteers.filter(vol => {
    const matchesSearch = vol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vol.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    if (selectedFilter === "Verified") return matchesSearch && vol.backgroundVerified;
    if (selectedFilter === "High Match") return matchesSearch && vol.compatibilityScore >= 95;
    return matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-container-high shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-0.5 rounded-full">
              AI-Powered Compatibility Engine
            </span>
            <span className="text-xs text-primary font-semibold flex items-center gap-1">
              <Sparkles size={13} /> 98% Top Match
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-on-surface">
            Volunteer Companion Matching
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Matching <strong className="text-on-surface">{currentElderly.name}</strong> with verified local volunteers based on shared hobbies, language, and clinical qualifications.
          </p>
        </div>

        <button
          onClick={() => setIsScheduleVisitModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-ambient transition-all flex items-center gap-2 self-start md:self-auto"
        >
          <CalendarHeart size={16} />
          <span>Quick Schedule Visit</span>
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search volunteers by name, skill (e.g. Nursing, Chess, Gardening)..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 text-xs text-on-surface focus:ring-2 focus:ring-primary focus:outline-none shadow-sm"
          />
          <Search size={17} className="absolute left-3.5 top-3.5 text-on-surface-variant" />
        </div>

        <div className="flex gap-2">
          {["All", "High Match", "Verified"].map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border ${
                selectedFilter === filter
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-surface-container-lowest text-on-surface border-surface-container hover:bg-surface-container-low'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Volunteers Matching Grid (Staggered Sequential Pop-Up) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredVolunteers.map((vol, idx) => (
          <div
            key={vol.id}
            style={{ animationDelay: `${idx * 120 + 80}ms` }}
            className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-high shadow-card hover:shadow-ambient transition-all flex flex-col justify-between animate-fade-in-scale"
          >
            <div>
              {/* Card Header: Avatar & Score */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={vol.avatar}
                    alt={vol.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-primary/20 shadow-sm"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-on-surface">{vol.name}</h3>
                      {vol.backgroundVerified && (
                        <span title="Background Check Verified">
                          <ShieldCheck size={16} className="text-primary" />
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-on-surface-variant">{vol.role}</p>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-on-surface-variant">
                      <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                        <Star size={13} className="fill-amber-500 text-amber-500" /> {vol.rating} ({vol.reviewsCount} reviews)
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5"><MapPin size={13} /> {vol.distance}</span>
                    </div>
                  </div>
                </div>

                {/* Match Score Badge */}
                <div className="text-center bg-primary/10 px-3 py-2 rounded-2xl border border-primary/20 flex-shrink-0">
                  <span className="text-base font-black text-primary block leading-none">{vol.compatibilityScore}%</span>
                  <span className="text-[9px] font-bold uppercase text-primary tracking-wider">Match</span>
                </div>
              </div>

              {/* Degrees & Certifications */}
              <div className="space-y-1.5 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Qualifications:</span>
                <div className="flex flex-wrap gap-1.5">
                  {vol.degrees.map((deg, i) => (
                    <span key={i} className="text-[11px] font-medium px-2.5 py-0.5 rounded-lg bg-surface-container text-on-surface flex items-center gap-1">
                      <Award size={12} className="text-primary" /> {deg}
                    </span>
                  ))}
                </div>
              </div>

              {/* Service Rate & Pricing Options */}
              <div className="mb-3 p-3 rounded-2xl bg-orange-50/70 border border-orange-200/70">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-950">Volunteer Service Rate:</span>
                  <span className="text-xs font-black text-orange-900">{vol.hourlyRate || "$0 (Free Community)"}</span>
                </div>
                {vol.serviceRates && (
                  <div className="space-y-1 pt-1 border-t border-orange-200/40">
                    {vol.serviceRates.slice(0, 2).map((sr, i) => (
                      <div key={i} className="flex items-center justify-between text-[11px] text-orange-950">
                        <span>• {sr.service}</span>
                        <span className="font-semibold text-primary">{sr.rate}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Skills Chips */}
              <div className="space-y-1.5 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Skills & Hobbies:</span>
                <div className="flex flex-wrap gap-1.5">
                  {vol.skills.map((skill, i) => (
                    <span key={i} className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-soft text-primary">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs text-on-surface-variant leading-relaxed mb-4 bg-surface-container-low/50 p-3 rounded-2xl">
                "{vol.bio}"
              </p>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-surface-container flex flex-wrap items-center justify-between gap-2">
              <button
                onClick={() => openRateVolunteerModal(vol)}
                className="text-[11px] text-amber-700 font-bold hover:underline flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-xl border border-amber-200"
              >
                <Star size={13} className="fill-amber-500 text-amber-500" /> Rate
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => startVideoCall({
                    title: `Companion Video Call with ${vol.name}`,
                    type: "volunteer",
                    participants: [
                      {
                        name: vol.name,
                        role: "Volunteer Companion",
                        avatar: vol.avatar,
                        status: "Speaking..."
                      },
                      {
                        name: "Sarah Vance",
                        role: "Family Guardian",
                        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256&h=256",
                        status: "Connected"
                      }
                    ]
                  })}
                  className="p-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary transition-colors"
                  title="Start Companion Video Call"
                >
                  <Video size={16} />
                </button>
                <button
                  onClick={() => setIsScheduleVisitModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-sm hover:bg-primary/90 transition-all"
                >
                  Book Visit
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
