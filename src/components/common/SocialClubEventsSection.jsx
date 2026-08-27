import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Car,
  CheckCircle2,
  ArrowRight,
  X,
  Users,
  Heart,
  ShieldCheck,
  Ticket,
  ChevronRight,
  Info
} from 'lucide-react';

export const SOCIAL_ACTIVITIES = [
  {
    id: 'activity-1',
    emoji: '🌱',
    title: 'Community Gardening Day',
    description: 'Tend flowers and herbs together in our shared garden space.',
    category: 'Nature & Wellness',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=600',
    frequency: 'Every Tuesday & Saturday • 09:30 AM',
    location: 'Oakridge Community Greenhouse & Patio',
    duration: '90 Minutes',
    groupSize: '6–12 Seniors',
    includesTransport: false,
    extendedDescription: 'Join fellow green thumbs in planting heirloom vegetables, fragrant lavender, and indoor herbs. Raised garden beds make planting comfortable with zero bending required. Fresh herbal tea served afterwards.',
    highlight: 'Raised planter beds • Zero bending required'
  },
  {
    id: 'activity-2',
    emoji: '🎤',
    title: 'Golden Oldies Singing Circle',
    description: 'Sing along to timeless classics in a warm group setting.',
    category: 'Music & Memories',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=600',
    frequency: 'Every Wednesday • 02:00 PM',
    location: 'Harmony Hall (Acoustic Lounge)',
    duration: '60 Minutes',
    groupSize: '10–20 Seniors',
    includesTransport: false,
    extendedDescription: 'Celebrate music from the 50s, 60s, and 70s with large-print song booklets and live acoustic piano accompaniment. Boosts lung capacity, memory recall, and uplifts spirits.',
    highlight: 'Large-print songbooks • Live piano accompaniment'
  },
  {
    id: 'activity-3',
    emoji: '🎨',
    title: 'Creative Painting Afternoon',
    description: 'Relax and express yourself through guided painting sessions.',
    category: 'Arts & Expression',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=600',
    frequency: 'Every Thursday • 02:30 PM',
    location: 'Springfield Art Studio & Sunroom',
    duration: '75 Minutes',
    groupSize: '8–14 Seniors',
    includesTransport: false,
    extendedDescription: 'Gentle step-by-step watercolor and acrylic art workshops led by friendly art therapists. All easels, non-toxic paints, and brushes provided. Take your masterpiece home!',
    highlight: 'All materials provided • All skill levels welcome'
  },
  {
    id: 'activity-4',
    emoji: '🧩',
    title: 'Brain Games Café',
    description: 'Sharpen memory and focus with fun puzzles and games.',
    category: 'Cognitive Health',
    image: 'https://images.unsplash.com/photo-1611195974226-a6a9be9dd763?auto=format&fit=crop&q=80&w=600',
    frequency: 'Every Monday & Friday • 10:30 AM',
    location: 'Cozy Corner Coffee House',
    duration: '60 Minutes',
    groupSize: '6–15 Seniors',
    includesTransport: false,
    extendedDescription: 'Engaging brain health puzzles, giant Scrabble, tactile crosswords, trivia, and friendly card games. Designed in collaboration with neuropsychology specialists to boost neuroplasticity.',
    highlight: 'Memory-stimulating puzzles • Coffee & pastries included'
  },
  {
    id: 'activity-5',
    emoji: '👵',
    title: 'Grandparent–Grandchild Game Day',
    description: 'Bonding time filled with laughter and simple games across generations.',
    category: 'Intergenerational',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=600',
    frequency: 'Every Sunday • 03:00 PM',
    location: 'Family Community Pavilion',
    duration: '90 Minutes',
    groupSize: 'Family Pairs / Groups',
    includesTransport: false,
    extendedDescription: 'A heartwarming intergenerational program bringing young smiles and elder wisdom together. Includes giant Jenga, bingo, storytelling circles, and polaroid photo keepsakes.',
    highlight: 'Free polaroid photo keepsake • Snacks & juice bar'
  },
  {
    id: 'activity-6',
    emoji: '📱',
    title: 'Digital Help Hour',
    description: 'Friendly volunteers help seniors get comfortable with phones and apps.',
    category: 'Tech & Digital',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600',
    frequency: 'Every Tuesday • 04:00 PM',
    location: 'Digital Learning Hub & Library',
    duration: '60 Minutes',
    groupSize: '1-on-1 Mentorship',
    includesTransport: false,
    extendedDescription: 'Patient 1-on-1 tutoring by verified youth volunteers. Learn how to video call your grandchildren, set pill alarms, use photo albums, send voice messages, and avoid online scams.',
    highlight: '1-on-1 dedicated volunteer • Scam safety coaching'
  },
  {
    id: 'activity-7',
    emoji: '🧘',
    title: 'Gentle Chair Yoga',
    description: 'Low-impact stretches designed for comfort and mobility.',
    category: 'Mobility & Fitness',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600',
    frequency: 'Mon, Wed, Fri • 10:00 AM',
    location: 'Wellness Studio & Garden Lawn',
    duration: '45 Minutes',
    groupSize: '10–18 Seniors',
    includesTransport: false,
    extendedDescription: 'Gentle, seated breathing and joint mobility exercises taught by certified senior fitness instructors. Loosens stiff joints, improves blood circulation, and prevents falls with gentle seated support.',
    highlight: 'No floor mat required • Certified senior instructors'
  },
  {
    id: 'activity-8',
    emoji: '📚',
    title: 'Memory Lane Book Club',
    description: 'Discuss favorite stories and share memories with fellow readers.',
    category: 'Culture & Literature',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600',
    frequency: 'Bi-Weekly Thursdays • 03:00 PM',
    location: 'Springfield Heritage Reading Room',
    duration: '75 Minutes',
    groupSize: '8–12 Seniors',
    includesTransport: false,
    extendedDescription: 'Explore classic memoirs, short historical fiction, and nostalgic poems. Large-print and audio book editions provided. Inspiring discussions paired with hot chamomile tea and shortbread.',
    highlight: 'Large-print & audio formats available'
  },
  {
    id: 'activity-9',
    emoji: '🎬',
    title: 'Movie Outing',
    description: 'A companion-accompanied trip to the cinema for a favorite film on the big screen.',
    category: 'Cinema & Outing',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=600',
    frequency: 'Every Saturday Matinee • 01:30 PM',
    location: 'Palace Cinema 4K (Senior Matinee)',
    duration: '2.5 Hours',
    groupSize: 'Assisted Group Outing',
    includesTransport: true,
    extendedDescription: 'Experience the magic of cinema on the silver screen! Dedicated volunteer companions handle door-to-door escort, wheelchair-accessible van transport, reserved luxury recliners, and hearing assistance headsets.',
    highlight: 'Companion-assisted door-to-door transport included'
  },
  {
    id: 'activity-10',
    emoji: '🛕',
    title: 'Temple Visit',
    description: 'A peaceful, assisted trip to a nearby temple for prayer and reflection.',
    category: 'Spiritual & Assisted',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=600',
    frequency: 'Every Sunday Morning • 08:30 AM',
    location: 'Sacred Heart & Serene Temple Sanctuaries',
    duration: '2 Hours',
    groupSize: 'Small Escorted Group',
    includesTransport: true,
    extendedDescription: 'A peaceful, supportive spiritual pilgrimage to local temples and prayer sanctums. Verified companion volunteers provide arm-in-arm mobility support, gentle wheelchair escort, and comfortable roundtrip transport.',
    highlight: 'Companion-assisted door-to-door transport included'
  }
];

export const SocialClubEventsSection = () => {
  const { showBookingSuccess, showToast } = useApp();
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isJoined, setIsJoined] = useState(false);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedActivity) {
        setSelectedActivity(null);
        setIsJoined(false);
      }
    };
    if (selectedActivity) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedActivity]);

  const handleRegisterActivity = (activity) => {
    setIsJoined(true);
    showBookingSuccess({
      title: "Activity Registration Confirmed!",
      seniorName: "Eleanor Vance",
      serviceName: `${activity.emoji} ${activity.title}`,
      date: "Upcoming Scheduled Session",
      time: activity.frequency.split('•')[1] || "10:00 AM",
      caregiver: activity.includesTransport ? "Volunteer Companion & Escort Driver" : "Activity Lead & Volunteer Companion",
      referenceId: `ACT-${Math.floor(10000 + Math.random() * 90000)}`
    });
    showToast({
      type: 'volunteer',
      title: `Registered: ${activity.title}`,
      message: activity.includesTransport
        ? 'Reserved with companion-assisted roundtrip transport.'
        : 'Your spot is saved in the social circle.'
    });
    setTimeout(() => {
      setSelectedActivity(null);
      setIsJoined(false);
    }, 1500);
  };

  return (
    <section id="social-club-events" className="py-16 sm:py-20 lg:py-24 bg-[#F8F9FA] border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFE8DF] border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} className="animate-spin-slow" />
            <span>Community Connection</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1D20] font-serif leading-tight">
            Social Club & <span className="text-primary font-serif">Events</span>
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] leading-relaxed max-w-2xl mx-auto">
            Stay active, connected, and engaged with activities designed for joy and companionship.
          </p>
        </div>

        {/* 10 Activity Cards Grid: 5 cols on desktop, 2-3 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {SOCIAL_ACTIVITIES.map((activity, idx) => (
            <div
              key={activity.id}
              onClick={() => {
                setSelectedActivity(activity);
                setIsJoined(false);
              }}
              style={{ animationDelay: `${idx * 60}ms` }}
              className="group bg-white rounded-[24px] overflow-hidden border border-[#E2E8F0] shadow-card hover:shadow-xl hover:border-primary/40 transform transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.02] flex flex-col justify-between cursor-pointer animate-fade-in-scale select-none"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedActivity(activity);
                  setIsJoined(false);
                }
              }}
              aria-label={`View details for ${activity.title}`}
            >
              {/* Card Image & Overlay Badge */}
              <div>
                <div className="h-40 w-full relative overflow-hidden bg-slate-100">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  
                  {/* Category Pill Tag */}
                  <span className="absolute top-3 left-3 text-[10px] font-bold bg-white/95 backdrop-blur-xs text-primary px-2.5 py-1 rounded-full shadow-xs border border-orange-100 flex items-center gap-1">
                    <span>{activity.emoji}</span>
                    <span className="font-semibold">{activity.category}</span>
                  </span>

                  {/* Special Transport Badge for Movie Outing & Temple Visit */}
                  {activity.includesTransport && (
                    <span className="absolute bottom-2.5 right-2.5 text-[9px] font-bold bg-primary text-white px-2 py-0.5 rounded-full shadow-xs flex items-center gap-1 animate-pulse">
                      <Car size={10} />
                      <span>Ride Assist</span>
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-sm text-[#1A1D20] font-serif leading-snug group-hover:text-primary transition-colors flex items-start gap-1.5">
                    <span className="text-base flex-shrink-0">{activity.emoji}</span>
                    <span className="line-clamp-1">{activity.title}</span>
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
                    {activity.description}
                  </p>
                </div>
              </div>

              {/* Card Footer Tap Indicator */}
              <div className="p-4 pt-0">
                <div className="pt-2.5 border-t border-[#F1F5F9] flex items-center justify-between text-[11px] font-bold text-primary group-hover:text-primary-hover">
                  <span>View Details</span>
                  <div className="w-6 h-6 rounded-full bg-[#FFE8DF] group-hover:bg-primary group-hover:text-white flex items-center justify-center transition-all">
                    <ChevronRight size={13} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 'View All Events' Button linking to 20 Events & Movies page */}
        <div className="text-center mt-12 sm:mt-14">
          <Link
            to="/social-engagement"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white hover:bg-[#FFF5F1] text-primary border-2 border-primary/30 hover:border-primary text-xs sm:text-sm font-black shadow-card hover:shadow-ambient transition-all transform hover:-translate-y-0.5 active:scale-95 group"
          >
            <Ticket size={16} className="text-primary group-hover:rotate-12 transition-transform" />
            <span>View All 20 Events & Movies</span>
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>

      {/* POPUP / MODAL: Bottom-Sheet on Mobile, Centered Modal on Desktop (Style Spec) */}
      {selectedActivity && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 p-0 sm:p-4"
          onClick={() => setSelectedActivity(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="activity-modal-title"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-xl bg-white rounded-t-[32px] sm:rounded-[28px] border border-orange-100 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-bottom-sheet-slide-up sm:animate-modal-scale-in relative"
          >
            {/* Mobile Drag Indicator Bar */}
            <div className="sm:hidden w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-3 mb-1 flex-shrink-0"></div>

            {/* Header Image with Badges & Close Button */}
            <div className="h-48 sm:h-56 w-full relative overflow-hidden bg-slate-200 flex-shrink-0">
              <img
                src={selectedActivity.image}
                alt={selectedActivity.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

              {/* Close 'X' Button */}
              <button
                type="button"
                onClick={() => setSelectedActivity(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Close activity details"
              >
                <X size={18} />
              </button>

              {/* Title & Emoji Overlay */}
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="text-[10px] uppercase tracking-wider font-bold bg-primary text-white px-2.5 py-0.5 rounded-full shadow-xs mb-1.5 inline-block">
                  {selectedActivity.category}
                </span>
                <h3 id="activity-modal-title" className="text-xl sm:text-2xl font-black font-serif flex items-center gap-2 drop-shadow-sm">
                  <span>{selectedActivity.emoji}</span>
                  <span>{selectedActivity.title}</span>
                </h3>
              </div>
            </div>

            {/* Modal Body Content */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
              
              {/* Highlight Callout */}
              <div className="p-3.5 rounded-2xl bg-orange-50/80 border border-orange-100 text-xs font-semibold text-primary flex items-center gap-2">
                <Sparkles size={16} className="text-primary flex-shrink-0" />
                <span>{selectedActivity.highlight}</span>
              </div>

              {/* Special Companion-Assisted Transport Highlight for Movie Outing & Temple Visit */}
              {selectedActivity.includesTransport && (
                <div className="p-4 rounded-2xl bg-emerald-50/90 border-2 border-emerald-300 text-emerald-900 text-xs space-y-1">
                  <div className="flex items-center gap-2 font-bold text-emerald-800">
                    <Car size={18} className="text-emerald-700" />
                    <span className="uppercase tracking-wider text-[11px]">Companion-assisted transport included</span>
                  </div>
                  <p className="text-[11px] text-emerald-700 leading-relaxed">
                    A verified CareConnect volunteer aide provides roundtrip door-to-door escort ride in an accessible vehicle, assisting with entry, seating, and comfortable return home.
                  </p>
                </div>
              )}

              {/* Extended Description */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748B]">About this Activity</h4>
                <p className="text-xs sm:text-sm text-[#1A1D20] leading-relaxed">
                  {selectedActivity.extendedDescription}
                </p>
              </div>

              {/* Schedule & Location Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[#F8F9FA] border border-[#E2E8F0] space-y-1">
                  <span className="text-[10px] font-bold text-[#64748B] flex items-center gap-1.5 uppercase">
                    <Calendar size={13} className="text-primary" /> When & Schedule
                  </span>
                  <p className="text-xs font-bold text-[#1A1D20]">{selectedActivity.frequency}</p>
                  <p className="text-[11px] text-[#64748B]">Duration: {selectedActivity.duration}</p>
                </div>

                <div className="p-3 rounded-xl bg-[#F8F9FA] border border-[#E2E8F0] space-y-1">
                  <span className="text-[10px] font-bold text-[#64748B] flex items-center gap-1.5 uppercase">
                    <MapPin size={13} className="text-primary" /> Location & Group
                  </span>
                  <p className="text-xs font-bold text-[#1A1D20] line-clamp-1">{selectedActivity.location}</p>
                  <p className="text-[11px] text-[#64748B]">Size: {selectedActivity.groupSize}</p>
                </div>
              </div>

              {/* Care & Safety Assurance */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500 flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-600 flex-shrink-0" />
                <span>All activities supervised by background-checked volunteers and senior wellness coordinators.</span>
              </div>

            </div>

            {/* Modal Action Footer */}
            <div className="p-4 sm:p-5 bg-[#F8F9FA] border-t border-[#E2E8F0] flex items-center gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={() => setSelectedActivity(null)}
                className="py-3 px-4 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => handleRegisterActivity(selectedActivity)}
                disabled={isJoined}
                className="flex-1 py-3.5 px-5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-ambient transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                {isJoined ? (
                  <>
                    <CheckCircle2 size={16} />
                    <span>Registered Successfully!</span>
                  </>
                ) : (
                  <>
                    <span>Join & Reserve Spot</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

export default SocialClubEventsSection;
