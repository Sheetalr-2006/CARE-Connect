import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { BookingSuccessModal } from '../components/modals/BookingSuccessModal';
import { TestimonialBottomSheet } from '../components/modals/TestimonialBottomSheet';
import { AuthDrawerModal } from '../components/modals/AuthDrawerModal';
import { SpecialOfferModal } from '../components/modals/SpecialOfferModal';
import { WarningErrorModal } from '../components/modals/WarningErrorModal';
import { GlobalToastContainer } from '../components/common/GlobalToastContainer';
import { SeniorVoiceAssistant } from '../components/common/SeniorVoiceAssistant';
import {
  Compass,
  Search,
  ExternalLink,
  Copy,
  Check,
  Shield,
  Heart,
  Users,
  UserCheck,
  Calendar,
  Pill,
  Activity,
  PhoneCall,
  Bell,
  Settings as SettingsIcon,
  Sparkles,
  ArrowRight,
  Server,
  KeyRound,
  UserPlus,
  Home,
  CheckCircle2,
  Lock,
  Layers,
  HelpCircle,
  Video,
  Mic,
  Tag,
  AlertTriangle,
  MessageSquare
} from 'lucide-react';

export const AllLinksPage = () => {
  const navigate = useNavigate();
  const { loginWithDemoUser, availableDemoUsers } = useAuth();
  const {
    showBookingSuccess,
    showToast,
    setIsTestimonialSheetOpen,
    setIsAuthDrawerOpen,
    setIsSpecialOfferOpen,
    showWarningModal,
    setIsVoiceAssistantOpen
  } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [copiedLink, setCopiedLink] = useState(null);

  const copyToClipboard = (path, e) => {
    e.preventDefault();
    e.stopPropagation();
    const fullUrl = `${window.location.origin}${path}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(path);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const sections = [
    {
      id: 'dashboards',
      title: '🏠 Dashboards & Main Portals',
      description: 'Role-specific main hubs and profiles',
      links: [
        {
          name: 'Home / Auth Landing Page',
          path: '/',
          description: 'Official welcome portal, service preview, and fast login',
          badge: 'Public',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          icon: Home,
          role: 'All'
        },
        {
          name: 'The Station — Coworking Space Showcase',
          path: '/the-station',
          description: 'Single-page website in warm Vanilla & Moonstone palette with illustrated panels & booking bar',
          badge: 'Coworking Site',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-200 font-bold',
          icon: Building,
          role: 'Public'
        },
        {
          name: 'Main Senior Dashboard',
          path: '/dashboard',
          description: 'Elderly view with quick SOS, daily health, medication reminders & appointments',
          badge: 'Senior View',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
          icon: Heart,
          role: 'Senior'
        },
        {
          name: 'Family Member Dashboard',
          path: '/family-dashboard',
          description: 'Real-time telemetry, peace of mind metrics, health tracker & family updates',
          badge: 'Family View',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: Users,
          role: 'Family'
        },
        {
          name: 'Volunteer Companion Dashboard',
          path: '/volunteer-dashboard',
          description: 'Assigned seniors, visit schedules, check-in reporting & hours tracking',
          badge: 'Volunteer View',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
          icon: UserCheck,
          role: 'Volunteer'
        },
        {
          name: 'Senior Comprehensive Profile',
          path: '/elderly-profile',
          description: 'Medical history, emergency contacts, daily preferences & dietary notes',
          badge: 'Health Record',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
          icon: Shield,
          role: 'Senior / Family'
        }
      ]
    },
    {
      id: 'auth',
      title: '🔐 Authentication & Onboarding',
      description: 'Login, registration and custom role signup funnels',
      links: [
        {
          name: 'Sign In Page',
          path: '/auth/login',
          description: 'Direct login form with demo user fast-switch',
          badge: 'Auth',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
          icon: KeyRound,
          role: 'All'
        },
        {
          name: 'Sign Up Hub',
          path: '/auth/register',
          description: 'New user registration and account creation',
          badge: 'Auth',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
          icon: UserPlus,
          role: 'All'
        },
        {
          name: 'Role Selection Matrix',
          path: '/auth/role-select',
          description: 'Interactive choice between Senior, Volunteer, or Family Caregiver',
          badge: 'Onboarding',
          badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
          icon: Layers,
          role: 'All'
        },
        {
          name: 'Senior Onboarding Registration',
          path: '/auth/signup-elderly',
          description: 'Elderly profile setup, mobility assistance & contact input',
          badge: 'Senior Flow',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
          icon: Heart,
          role: 'Senior'
        },
        {
          name: 'Volunteer Application & Verification',
          path: '/auth/signup-volunteer',
          description: 'Skill selection, background check application & availability settings',
          badge: 'Volunteer Flow',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
          icon: UserCheck,
          role: 'Volunteer'
        },
        {
          name: 'Family Member Link Account',
          path: '/auth/signup-family',
          description: 'Family relationship linkage & notification preference settings',
          badge: 'Family Flow',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: Users,
          role: 'Family'
        },
        {
          name: 'Social & Companion Interactions Hub',
          path: '/auth/interactions',
          description: 'Interactive community companion hub and social match feed',
          badge: 'Community',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
          icon: Sparkles,
          role: 'All'
        },
        {
          name: 'Pending Approval Screen',
          path: '/auth/pending-approval',
          description: 'Background verification status for newly registered volunteers',
          badge: 'Verification',
          badgeColor: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: Shield,
          role: 'Volunteer'
        },
        {
          name: 'Forgot / Reset Password',
          path: '/auth/forgot-password',
          description: 'Account recovery via registered email',
          badge: 'Recovery',
          badgeColor: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: Lock,
          role: 'All'
        }
      ]
    },
    {
      id: 'health',
      title: '💊 Health, Daily Care & Appointments',
      description: 'Medications, wellbeing logs, telemedicine and appointments',
      links: [
        {
          name: 'Medication Management',
          path: '/medications',
          description: 'Prescription schedule, dosage alerts, pill intake logger & refills',
          badge: 'Health',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          icon: Pill,
          role: 'Senior / Family'
        },
        {
          name: 'Daily Wellbeing Check-In',
          path: '/wellbeing',
          description: 'Mood tracker, pain level indicator, sleep log & wellness notes',
          badge: 'Wellness',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
          icon: Activity,
          role: 'Senior'
        },
        {
          name: 'Appointments & Doctor Visits',
          path: '/appointments',
          description: 'Upcoming clinic consults, companion ride bookings & calendar',
          badge: 'Medical',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: Calendar,
          role: 'Senior / Family'
        },
        {
          name: 'Social Events & Community Circles',
          path: '/social',
          description: 'Local gardening clubs, book readings, tea meetups & senior groups',
          badge: 'Social',
          badgeColor: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200',
          icon: Users,
          role: 'All'
        },
        {
          name: 'Social Club & 20 Events & Movies Hub',
          path: '/social-engagement',
          description: '10 Featured Social Club Activities, 20 Weekly Movie Matinees, Recliner & Treat Reservations',
          badge: 'Cinema & Clubs',
          badgeColor: 'bg-orange-100 text-primary border-orange-200 font-bold',
          icon: Ticket,
          role: 'All'
        },
        {
          name: 'Video Call & Remote Check-In',
          path: '/video-interaction',
          description: 'High-clarity senior friendly video companion interface',
          badge: 'Interactive',
          badgeColor: 'bg-violet-100 text-violet-800 border-violet-200',
          icon: Video,
          role: 'All'
        },
        {
          name: 'Custom Care Plans',
          path: '/care-plans',
          description: 'Personalized daily care routine, mobility guidelines & dietary rules',
          badge: 'Care Plan',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
          icon: Shield,
          role: 'Family / Senior'
        }
      ]
    },
    {
      id: 'volunteers',
      title: '🤝 Volunteer Matching & Visits',
      description: 'Match algorithm, volunteer directory and visit reports',
      links: [
        {
          name: 'AI Volunteer Matching',
          path: '/volunteer-matching',
          description: 'Interest-based and proximity-based matching engine with compatibility scores',
          badge: 'AI Matching',
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
          icon: Sparkles,
          role: 'Senior / Volunteer'
        },
        {
          name: 'Volunteer Roster & Management',
          path: '/volunteer-management',
          description: 'Coordinator portal to manage vetted volunteers and active assignments',
          badge: 'Admin / Coord',
          badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
          icon: UserCheck,
          role: 'Admin / Volunteer'
        },
        {
          name: 'Volunteer Visit Schedules & Logs',
          path: '/volunteer-visits',
          description: 'Upcoming companion home visits, activity logs and visit feedback',
          badge: 'Visits',
          badgeColor: 'bg-orange-100 text-orange-800 border-orange-200',
          icon: Calendar,
          role: 'Volunteer / Family'
        }
      ]
    },
    {
      id: 'settings',
      title: '⚙️ System & Preferences',
      description: 'Alert centers, language choices & accessibility adjustments',
      links: [
        {
          name: 'Notification Center',
          path: '/notifications',
          description: 'System alerts, reminder broadcasts & family check-in receipts',
          badge: 'Alerts',
          badgeColor: 'bg-red-100 text-red-800 border-red-200',
          icon: Bell,
          role: 'All'
        },
        {
          name: 'System Settings & Accessibility',
          path: '/settings',
          description: 'Font scale, high contrast mode, voice assistant, and language selector',
          badge: 'Settings',
          badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
          icon: SettingsIcon,
          role: 'All'
        }
      ]
    },
    {
      id: 'api',
      title: '🔌 Backend & API Endpoints',
      description: 'Live Node / Express backend server running on port 5000',
      links: [
        {
          name: 'Backend API Base',
          path: 'http://localhost:5000/api',
          description: 'Main API route serving database and real-time endpoints',
          badge: 'Express API (5000)',
          badgeColor: 'bg-gray-900 text-emerald-400 border-gray-700',
          icon: Server,
          role: 'Backend',
          isExternal: true
        }
      ]
    }
  ];

  // Filtered links
  const filteredSections = sections.map(section => {
    const matchesCategory = activeCategory === 'all' || section.id === activeCategory;
    if (!matchesCategory) return null;

    const matchedLinks = section.links.filter(link => {
      const matchSearch =
        link.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.role.toLowerCase().includes(searchTerm.toLowerCase());
      return matchSearch;
    });

    if (matchedLinks.length === 0) return null;

    return {
      ...section,
      links: matchedLinks
    };
  }).filter(Boolean);

  const totalLinksCount = sections.reduce((acc, sec) => acc + sec.links.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-blue-50/30 text-slate-800 font-sans pb-24">
      {/* Header Banner */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-teal-100/80 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-teal-800 to-emerald-700 bg-clip-text text-transparent">
                CareConnect All-in-One Directory
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                Complete Interactive Sitemap & Route Hub ({totalLinksCount} Available Pages)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-teal-700 bg-teal-50 hover:bg-teal-100 transition-colors border border-teal-200"
            >
              ← Back to Portal
            </Link>
            <Link
              to="/dashboard"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors shadow-sm"
            >
              Open Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Hero & Quick Demo Switcher */}
        <div className="bg-white rounded-2xl border border-teal-100 p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-teal-50 text-teal-700 border border-teal-200 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                Single Click Access to Every Screen
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                Explore All {totalLinksCount} Pages & Features
              </h2>
              <p className="text-sm text-slate-600 max-w-2xl mt-1">
                Click any link card below to navigate directly, or copy the direct URL for sharing and testing.
              </p>
            </div>

            {/* Fast Demo Role Switcher */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
              <span className="text-xs font-semibold text-slate-500 px-2 flex items-center">
                Quick Role:
              </span>
              <button
                onClick={() => {
                  loginWithDemoUser('elderly');
                  navigate('/dashboard');
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-all flex items-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 text-rose-500" />
                Senior (Eleanor)
              </button>
              <button
                onClick={() => {
                  loginWithDemoUser('family');
                  navigate('/family-dashboard');
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-all flex items-center gap-1.5"
              >
                <Users className="w-3.5 h-3.5 text-blue-500" />
                Family (Sarah)
              </button>
              <button
                onClick={() => {
                  loginWithDemoUser('volunteer');
                  navigate('/volunteer-dashboard');
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-all flex items-center gap-1.5"
              >
                <UserCheck className="w-3.5 h-3.5 text-amber-500" />
                Volunteer (David)
              </button>
            </div>
          </div>

          {/* 7 Distinct Contextual Popups Showcase (Live Interactive Trigger Hub) */}
          <div className="mt-6 pt-6 border-t border-slate-100 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-0.5 rounded-full border border-primary/20">
                  ✨ 7 Distinct Contextual Popups & Modals
                </span>
                <h3 className="text-lg font-black text-slate-900 font-serif mt-1">
                  Interactive Popup Variations Gallery
                </h3>
                <p className="text-xs text-slate-600">
                  Each screen uses a unique popup personality tailored to its context — test all 7 variations below:
                </p>
              </div>
              <span className="text-[11px] font-mono font-bold text-primary bg-orange-50 px-3 py-1 rounded-xl border border-orange-200 self-start md:self-auto">
                100% Accessible (ESC + Focus Trap + ARIA)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* 1. Booking Confirmation */}
              <button
                type="button"
                onClick={() => showBookingSuccess({
                  title: "Care Service Booked Successfully!",
                  seniorName: "Eleanor Vance",
                  serviceName: "Warm Home Companion & Tea",
                  date: "2026-08-28",
                  time: "10:00 AM",
                  caregiver: "David Miller (Verified Volunteer)"
                })}
                className="p-3.5 rounded-2xl bg-white hover:bg-orange-50/50 border border-orange-200/80 shadow-xs text-left hover:border-primary transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center shadow-2xs">
                    <CheckCircle2 size={15} />
                  </div>
                  <span className="text-xs font-bold text-slate-900 group-hover:text-primary">1. Booking Pop-In</span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  Center scale-in, checkmark animation, confetti pulse & 24px radius.
                </p>
              </button>

              {/* 2. Alert / Reminder Toast */}
              <button
                type="button"
                onClick={() => showToast({
                  type: 'medicine',
                  title: 'Medicine Reminder: Metformin 500mg',
                  message: 'Scheduled for 12:30 PM with lunch. 1 pill remaining.'
                })}
                className="p-3.5 rounded-2xl bg-white hover:bg-orange-50/50 border border-orange-200/80 shadow-xs text-left hover:border-primary transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-rose-500 text-white flex items-center justify-center shadow-2xs">
                    <Pill size={15} />
                  </div>
                  <span className="text-xs font-bold text-slate-900 group-hover:text-primary">2. Alert / Reminder Toast</span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  Top-right slide-in, compact card, 5s countdown progress bar.
                </p>
              </button>

              {/* 3. Review Bottom Sheet */}
              <button
                type="button"
                onClick={() => setIsTestimonialSheetOpen(true)}
                className="p-3.5 rounded-2xl bg-white hover:bg-orange-50/50 border border-orange-200/80 shadow-xs text-left hover:border-primary transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-2xs">
                    <MessageSquare size={15} />
                  </div>
                  <span className="text-xs font-bold text-slate-900 group-hover:text-primary">3. Review Bottom Sheet</span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  Mobile slide-up bottom sheet, photo cards, stars & review form.
                </p>
              </button>

              {/* 4. Sign-In Slide Drawer */}
              <button
                type="button"
                onClick={() => setIsAuthDrawerOpen(true)}
                className="p-3.5 rounded-2xl bg-white hover:bg-orange-50/50 border border-orange-200/80 shadow-xs text-left hover:border-primary transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-2xs">
                    <Lock size={15} />
                  </div>
                  <span className="text-xs font-bold text-slate-900 group-hover:text-primary">4. Sign-In Slide Drawer</span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  Right slide-in panel, backdrop blur filter & 1-click profiles.
                </p>
              </button>

              {/* 5. Special Offer Modal */}
              <button
                type="button"
                onClick={() => setIsSpecialOfferOpen(true)}
                className="p-3.5 rounded-2xl bg-white hover:bg-orange-50/50 border border-orange-200/80 shadow-xs text-left hover:border-primary transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-2xs">
                    <Tag size={15} />
                  </div>
                  <span className="text-xs font-bold text-slate-900 group-hover:text-primary">5. Special Offer (-15%)</span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  Bounce-in modal, -15% highlight, promo code & 'Maybe later'.
                </p>
              </button>

              {/* 6. Warning / Error Modal */}
              <button
                type="button"
                onClick={() => showWarningModal({
                  title: "Cancel Scheduled Escort Ride?",
                  message: "Your volunteer driver is currently en route to your residence. Confirm cancellation?",
                  confirmText: "Yes, Cancel Ride",
                  cancelText: "Keep Ride",
                  isDestructive: true
                })}
                className="p-3.5 rounded-2xl bg-white hover:bg-orange-50/50 border border-orange-200/80 shadow-xs text-left hover:border-primary transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-red-600 text-white flex items-center justify-center shadow-2xs">
                    <AlertTriangle size={15} />
                  </div>
                  <span className="text-xs font-bold text-slate-900 group-hover:text-primary">6. Warning / Error Shake</span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  Tactile shake animation, red/amber accent border & auto-focus.
                </p>
              </button>

              {/* 7. Voice Assistant Ripple */}
              <button
                type="button"
                onClick={() => setIsVoiceAssistantOpen(true)}
                className="p-3.5 rounded-2xl bg-white hover:bg-orange-50/50 border border-orange-200/80 shadow-xs text-left hover:border-primary transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center shadow-2xs">
                    <Mic size={15} />
                  </div>
                  <span className="text-xs font-bold text-slate-900 group-hover:text-primary">7. Voice Assistant Ripple</span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  Concentric soundwave ripple waves, tooltip bubble & 12 languages.
                </p>
              </button>

              {/* 8. Quick Toast Trigger */}
              <button
                type="button"
                onClick={() => showToast({
                  type: 'volunteer',
                  title: 'Companion Assigned: Marcus Chen',
                  message: 'Arriving Tuesday at 10:00 AM for garden walk & tea.'
                })}
                className="p-3.5 rounded-2xl bg-white hover:bg-orange-50/50 border border-orange-200/80 shadow-xs text-left hover:border-primary transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center shadow-2xs">
                    <Heart size={15} />
                  </div>
                  <span className="text-xs font-bold text-slate-900 group-hover:text-primary">8. Caregiver Alert Toast</span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2">
                  Slide-in notification with volunteer heart badge & quick dismiss.
                </p>
              </button>
            </div>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by page name, path, keyword (e.g. 'medications', 'volunteer', 'signup')..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 text-sm placeholder:text-slate-400 bg-white"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {[
                { id: 'all', label: 'All Pages' },
                { id: 'dashboards', label: '🏠 Dashboards' },
                { id: 'auth', label: '🔐 Auth & Signup' },
                { id: 'health', label: '💊 Health & Care' },
                { id: 'volunteers', label: '🤝 Volunteers' },
                { id: 'settings', label: '⚙️ Settings' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    activeCategory === cat.id
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Links Grid Sections */}
        {filteredSections.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">No matching pages found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Try searching with different keywords like 'dashboard', 'login', 'appointments', or clear your search query.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
              }}
              className="mt-4 px-4 py-2 rounded-lg text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredSections.map(section => (
              <div key={section.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      {section.title}
                    </h3>
                    <p className="text-xs text-slate-500">{section.description}</p>
                  </div>
                  <span className="text-xs font-medium text-slate-400 bg-white px-2.5 py-1 rounded-full border border-slate-200">
                    {section.links.length} {section.links.length === 1 ? 'page' : 'pages'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {section.links.map(link => {
                    const IconComponent = link.icon || Compass;
                    const isCopied = copiedLink === link.path;

                    if (link.isExternal) {
                      return (
                        <a
                          key={link.path}
                          href={link.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group bg-white rounded-xl border border-slate-200 p-4 hover:border-teal-400 hover:shadow-md transition-all flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="w-9 h-9 rounded-lg bg-slate-900 text-teal-400 flex items-center justify-center">
                                <IconComponent className="w-5 h-5" />
                              </div>
                              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${link.badgeColor}`}>
                                {link.badge}
                              </span>
                            </div>
                            <h4 className="font-bold text-sm text-slate-900 group-hover:text-teal-600 transition-colors flex items-center gap-1.5">
                              {link.name}
                              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                            </h4>
                            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                              {link.description}
                            </p>
                          </div>

                          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="font-mono text-[11px] text-slate-400 truncate max-w-[180px]">
                              {link.path}
                            </span>
                            <span className="text-teal-600 font-semibold flex items-center gap-1">
                              Open API <ArrowRight className="w-3 h-3" />
                            </span>
                          </div>
                        </a>
                      );
                    }

                    return (
                      <div
                        key={link.path}
                        className="group bg-white rounded-xl border border-slate-200/90 hover:border-teal-400 hover:shadow-md transition-all flex flex-col justify-between p-4 relative"
                      >
                        <Link to={link.path} className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-700 group-hover:bg-teal-600 group-hover:text-white transition-colors flex items-center justify-center">
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${link.badgeColor}`}>
                              {link.badge}
                            </span>
                          </div>
                          <h4 className="font-bold text-sm text-slate-900 group-hover:text-teal-600 transition-colors">
                            {link.name}
                          </h4>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                            {link.description}
                          </p>
                        </Link>

                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
                            <span className="truncate max-w-[130px]">{link.path}</span>
                            <button
                              onClick={(e) => copyToClipboard(link.path, e)}
                              title="Copy direct URL"
                              className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                              {isCopied ? (
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>

                          <Link
                            to={link.path}
                            className="text-teal-600 font-semibold flex items-center gap-1 hover:translate-x-0.5 transition-transform"
                          >
                            Visit Page <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Quick Help Card */}
        <div className="bg-gradient-to-r from-teal-800 to-emerald-800 rounded-2xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold">Need help finding a specific flow?</h3>
            <p className="text-xs text-teal-100 mt-1">
              CareConnect is equipped with 20+ dedicated screens for Seniors, Volunteers, and Family members.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white text-teal-800 hover:bg-teal-50 transition-colors shadow-sm"
            >
              Go to Home Page
            </Link>
            <Link
              to="/settings"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-700/80 hover:bg-teal-700 text-white transition-colors border border-teal-600"
            >
              System Settings
            </Link>
          </div>
        </div>
      </main>

      {/* 7 Distinct Popup System Overlays */}
      <BookingSuccessModal />
      <TestimonialBottomSheet />
      <AuthDrawerModal />
      <SpecialOfferModal />
      <WarningErrorModal />
      <GlobalToastContainer />
      <SeniorVoiceAssistant />

    </div>
  );
};
