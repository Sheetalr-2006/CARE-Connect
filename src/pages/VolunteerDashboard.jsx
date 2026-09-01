import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import {
  HeartHandshake,
  Star,
  CalendarHeart,
  Clock,
  CheckCircle2,
  Users,
  Video,
  ShieldCheck,
  Award,
  DollarSign,
  TrendingUp,
  MapPin,
  Sparkles,
  PhoneCall,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const VolunteerDashboard = () => {
  const { currentElderly, visits, startVideoCall, setIsScheduleVisitModalOpen, addNotification } = useApp();
  const { currentUser } = useAuth();

  const [visitNotes, setVisitNotes] = useState("");
  const [selectedSeniorForLog, setSelectedSeniorForLog] = useState(currentElderly.name);
  const [loggedStatus, setLoggedStatus] = useState(false);

  const assignedSeniors = [
    {
      id: "eld-001",
      name: "Eleanor Vance",
      age: 78,
      address: "142 Maplewood Drive, Springfield",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256&h=256",
      condition: "Mild Hypertension",
      nextVisit: "Today at 10:00 AM",
      matchScore: "98%",
      interests: ["Gardening", "Classical Music", "Watercolor"]
    },
    {
      id: "eld-002",
      name: "Arthur Pendelton",
      age: 82,
      address: "88 Pinehurst Blvd, Springfield",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=256&h=256",
      condition: "Early Osteoarthritis",
      nextVisit: "Tomorrow at 02:30 PM",
      matchScore: "95%",
      interests: ["Chess", "History Books", "Bird Watching"]
    }
  ];

  const handleLogVisit = (e) => {
    e.preventDefault();
    if (!visitNotes.trim()) return;
    setLoggedStatus(true);
    addNotification({
      type: "visit",
      title: "Volunteer Visit Logged",
      message: `Completed visit report submitted for ${selectedSeniorForLog}. Family notified.`
    });
    setTimeout(() => {
      setVisitNotes("");
      setLoggedStatus(false);
    }, 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      
      {/* Volunteer Profile Banner */}
      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-container-high shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256"}
            alt={currentUser?.name || "Marcus Chen"}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl object-cover border-2 border-primary/20 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-0.5 rounded-full flex items-center gap-1">
                <HeartHandshake size={13} /> Volunteer Companion Portal
              </span>
              <span className="text-xs text-primary font-semibold flex items-center gap-1">
                <ShieldCheck size={14} className="text-primary" /> Background Verified
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-on-surface mt-1">
              Welcome, {currentUser?.name || "Marcus Chen"}!
            </h1>
            <p className="text-xs text-on-surface-variant">
              Nursing Student • CPR & First Aid Certified • Serving Springfield Seniors
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => startVideoCall({
              title: "Companion Video Call with Eleanor",
              type: "volunteer",
              participants: [
                {
                  name: "Marcus Chen (You)",
                  role: "Volunteer Companion",
                  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256",
                  status: "Speaking..."
                },
                {
                  name: "Eleanor Vance",
                  role: "Senior Recipient",
                  avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256&h=256",
                  status: "Connected"
                }
              ]
            })}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary text-white font-bold text-xs shadow-ambient hover:bg-primary/90 transition-all"
          >
            <Video size={16} />
            <span>Launch Video Companion</span>
          </button>
        </div>
      </div>

      {/* Volunteer KPI Metrics (Staggered Sequential Pop-Up) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-surface-container-high shadow-card flex items-center gap-4 animate-fade-in-scale" style={{ animationDelay: '100ms' }}>
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0">
            <Star size={24} className="fill-amber-500 text-amber-500" />
          </div>
          <div>
            <p className="text-xs text-on-surface-variant font-medium">Rating Score</p>
            <p className="text-xl sm:text-2xl font-black text-on-surface">4.9 <span className="text-xs font-normal text-on-surface-variant">(28 reviews)</span></p>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-surface-container-high shadow-card flex items-center gap-4 animate-fade-in-scale" style={{ animationDelay: '200ms' }}>
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs text-on-surface-variant font-medium">Volunteered</p>
            <p className="text-xl sm:text-2xl font-black text-on-surface">142 <span className="text-xs font-normal text-on-surface-variant">Hours</span></p>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-surface-container-high shadow-card flex items-center gap-4 animate-fade-in-scale" style={{ animationDelay: '300ms' }}>
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-primary flex items-center justify-center flex-shrink-0">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-xs text-on-surface-variant font-medium">Service Rate</p>
            <p className="text-xl sm:text-2xl font-black text-on-surface">$15 <span className="text-xs font-normal text-on-surface-variant">/ hour</span></p>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-5 rounded-3xl border border-surface-container-high shadow-card flex items-center gap-4 animate-fade-in-scale" style={{ animationDelay: '400ms' }}>
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center flex-shrink-0">
            <Users size={24} />
          </div>
          <div>
            <p className="text-xs text-on-surface-variant font-medium">Assigned Elders</p>
            <p className="text-xl sm:text-2xl font-black text-on-surface">2 <span className="text-xs font-normal text-on-surface-variant">Seniors</span></p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Assigned Seniors & Scheduled Duties (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-high shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-on-surface flex items-center gap-2">
                <CalendarHeart size={18} className="text-primary" />
                My Assigned Seniors & Upcoming Visits
              </h2>
              <Link to="/volunteer-visits" className="text-xs font-bold text-primary hover:underline">
                View Full Calendar →
              </Link>
            </div>

            <div className="space-y-4">
              {assignedSeniors.map((senior) => (
                <div
                  key={senior.id}
                  className="p-5 rounded-3xl bg-surface-container-low border border-surface-container flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={senior.avatar}
                      alt={senior.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-primary/20 shadow-sm"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-on-surface">{senior.name}</h3>
                        <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">
                          {senior.matchScore} Match
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant flex items-center gap-1">
                        <MapPin size={12} className="text-primary" /> {senior.address}
                      </p>
                      <p className="text-xs text-primary font-semibold flex items-center gap-1">
                        <Clock size={12} /> Next: {senior.nextVisit}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => startVideoCall({
                        title: `Video Visit with ${senior.name}`,
                        type: "volunteer",
                        participants: [
                          { name: "Marcus Chen", role: "Volunteer", avatar: currentUser?.avatar, status: "Speaking..." },
                          { name: senior.name, role: "Senior Recipient", avatar: senior.avatar, status: "Connected" }
                        ]
                      })}
                      className="p-2.5 rounded-xl bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm"
                      title="Start Video Check-in"
                    >
                      <Video size={16} />
                    </button>
                    <Link
                      to="/volunteer-visits"
                      className="px-4 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container text-on-surface text-xs font-bold transition-colors"
                    >
                      Visit Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Log Completed Visit Report */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-high shadow-card space-y-4">
            <h2 className="text-base font-bold text-on-surface flex items-center gap-2">
              <CheckCircle2 size={18} className="text-primary" />
              Quick Log Companion Visit Notes
            </h2>
            <p className="text-xs text-on-surface-variant">
              Submit your visit observation notes so family guardians and coordinators receive live updates.
            </p>

            <form onSubmit={handleLogVisit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Select Senior</label>
                  <select
                    value={selectedSeniorForLog}
                    onChange={(e) => setSelectedSeniorForLog(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-2xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface focus:ring-2 focus:ring-primary"
                  >
                    {assignedSeniors.map(s => (
                      <option key={s.id} value={s.name}>{s.name} ({s.address})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Visit Type</label>
                  <select className="w-full px-3 py-2.5 rounded-2xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface focus:ring-2 focus:ring-primary">
                    <option>Morning Garden Walk & Conversation</option>
                    <option>Vital Signs & Blood Pressure Check</option>
                    <option>Reading & Storytelling Session</option>
                    <option>Grocery & Medication Escort</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Observation Notes & Senior Mood</label>
                <textarea
                  rows={3}
                  required
                  value={visitNotes}
                  onChange={(e) => setVisitNotes(e.target.value)}
                  placeholder="E.g., Eleanor was in great spirits today! We walked around the garden for 25 minutes, she took her afternoon chamomile tea and water..."
                  className="w-full p-3 rounded-2xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface focus:ring-2 focus:ring-primary"
                />
              </div>

              {loggedStatus && (
                <div className="p-3 rounded-xl bg-orange-100 text-orange-950 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary" /> Visit report saved! Family caregiver notified.
                </div>
              )}

              <button
                type="submit"
                className="py-3 px-6 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-ambient transition-all"
              >
                Submit Visit Report
              </button>
            </form>
          </div>

        </div>

        {/* Right Column: Qualifications, Ratings & Direct Matching (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Volunteer Qualifications */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-high shadow-card space-y-4">
            <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
              <Award size={18} className="text-primary" />
              Certifications & Badges
            </h3>

            <div className="space-y-2.5">
              {[
                { name: "CPR & AED Certified", org: "American Red Cross", valid: "Valid until 2027" },
                { name: "Elderly Dementia Support", org: "Geriatric Care Alliance", valid: "Active" },
                { name: "Background Check Level 2", org: "Springfield Police Dept", valid: "Verified" }
              ].map((cert, i) => (
                <div key={i} className="p-3 rounded-2xl bg-surface-container-low border border-surface-container text-xs space-y-0.5">
                  <div className="flex items-center justify-between font-bold text-on-surface">
                    <span>{cert.name}</span>
                    <ShieldCheck size={14} className="text-primary" />
                  </div>
                  <p className="text-[11px] text-on-surface-variant">{cert.org} • <span className="text-primary font-semibold">{cert.valid}</span></p>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Matching Search */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-high shadow-card space-y-3">
            <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
              <Sparkles size={18} className="text-amber-500" />
              Find More Companion Matches
            </h3>
            <p className="text-xs text-on-surface-variant">
              Browse elderly seniors nearby looking for conversation, hobby sharing, and strolls.
            </p>
            <Link
              to="/volunteer-matching"
              className="block w-full text-center py-3 rounded-2xl bg-primary text-white font-bold text-xs shadow-sm hover:bg-primary/90 transition-all"
            >
              Browse Senior Matches →
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};

export default VolunteerDashboard;
