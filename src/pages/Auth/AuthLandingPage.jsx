import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Heart,
  Lock,
  Mail,
  User,
  Phone,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Gift,
  Users,
  HeartHandshake,
  CheckCircle2,
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
  Activity,
  Check,
  Star,
  AlertCircle,
  Coffee,
  Pill,
  Car,
  Video,
  AlertTriangle,
  Stethoscope,
  X,
  Mic,
  Globe,
  Film,
  Compass,
  Send,
  HelpCircle,
  MessageSquare,
  Award,
  Menu,
  Search,
  ExternalLink,
  Copy,
  Tag,
  KeyRound,
  UserPlus,
  Home,
  Layers,
  Settings as SettingsIcon,
  Server,
  Bell,
  Shield,
  UserCheck,
  Ticket,
  Gift
} from 'lucide-react';
import { ForgotPasswordModal } from '../../components/modals/ForgotPasswordModal';
import { SeniorVoiceAssistant } from '../../components/common/SeniorVoiceAssistant';
import { PhoneInput } from '../../components/common/PhoneInput';
import { BookingSuccessModal } from '../../components/modals/BookingSuccessModal';
import { TestimonialBottomSheet } from '../../components/modals/TestimonialBottomSheet';
import { AuthDrawerModal } from '../../components/modals/AuthDrawerModal';
import { SpecialOfferModal } from '../../components/modals/SpecialOfferModal';
import { WarningErrorModal } from '../../components/modals/WarningErrorModal';
import { GlobalToastContainer } from '../../components/common/GlobalToastContainer';
import { SocialClubEventsSection } from '../../components/common/SocialClubEventsSection';
import { useApp } from '../../context/AppContext';
import { SUPPORTED_LANGUAGES } from '../../utils/translations';

export const AuthLandingPage = () => {
  const { login, registerUser, availableDemoUsers } = useAuth();
  const {
    currentLanguage,
    setLanguage,
    setIsVoiceAssistantOpen,
    showBookingSuccess,
    setIsTestimonialSheetOpen,
    setIsAuthDrawerOpen,
    setIsSpecialOfferOpen,
    showToast
  } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Custom Staggered Dropdown States
  const [isServiceDropdownOpen, setIsServiceDropdownOpen] = useState(false);
  const [isPeopleDropdownOpen, setIsPeopleDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  // Selected Service for Direct Booking Modal
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState(null);
  const [serviceBookingSuccess, setServiceBookingSuccess] = useState(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Error States
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');

  // Sitemap & All Links Directory State
  const [directorySearch, setDirectorySearch] = useState('');
  const [directoryCategory, setDirectoryCategory] = useState('all');
  const [copiedPath, setCopiedPath] = useState(null);

  const handleCopyPath = (path, e) => {
    e.preventDefault();
    e.stopPropagation();
    const fullUrl = path.startsWith('http') ? path : `${window.location.origin}${path}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedPath(path);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  const directorySections = [
    {
      id: 'dashboards',
      title: '🏠 Dashboards & Main Portals',
      description: 'Dedicated interfaces for seniors, family guardians, and volunteers',
      links: [
        { name: 'Home & Welcome Portal', path: '/', description: 'Official welcome portal & service overview', badge: 'Public', badgeColor: 'bg-orange-100 text-primary border-orange-200', icon: Home },
        { name: 'The Station — Coworking Space Showcase', path: '/the-station', description: 'Single-page coworking space website in Vanilla & Moonstone palette', badge: 'Coworking Site', badgeColor: 'bg-amber-100 text-amber-800 border-amber-200 font-bold', icon: Sparkles },
        { name: 'Senior Member Dashboard', path: '/dashboard', description: 'Senior view with SOS, daily health, medication & appointments', badge: 'Senior', badgeColor: 'bg-rose-100 text-rose-800 border-rose-200', icon: Heart },
        { name: 'Family Guardian Dashboard', path: '/family-dashboard', description: 'Real-time telemetry, peace of mind metrics & family updates', badge: 'Family', badgeColor: 'bg-blue-100 text-blue-800 border-blue-200', icon: Users },
        { name: 'Volunteer Companion Dashboard', path: '/volunteer-dashboard', description: 'Assigned seniors, visit schedules & check-in reporting', badge: 'Volunteer', badgeColor: 'bg-amber-100 text-amber-800 border-amber-200', icon: UserCheck },
        { name: 'Senior Comprehensive Profile', path: '/elderly-profile', description: 'Medical history, emergency contacts & dietary preferences', badge: 'Health Record', badgeColor: 'bg-purple-100 text-purple-800 border-purple-200', icon: Shield }
      ]
    },
    {
      id: 'auth',
      title: '🔐 Authentication & Onboarding',
      description: 'Login, registration and custom role signup funnels',
      links: [
        { name: 'Member Sign In Page', path: '/auth/login', description: 'Direct login form with client validation & 1-click demo personas', badge: 'Sign In', badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200', icon: KeyRound },
        { name: 'New Account Registration', path: '/auth/register', description: 'Complete sign up form with full validation & terms', badge: 'Sign Up', badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200', icon: UserPlus },
        { name: '4-Step Password Recovery', path: '/auth/forgot-password', description: 'Forgot password flow with email/mobile OTP verification', badge: 'Recovery', badgeColor: 'bg-slate-100 text-slate-800 border-slate-200', icon: Lock },
        { name: 'Role Selection Matrix', path: '/auth/role-select', description: 'Interactive persona picker (Senior, Family, Volunteer)', badge: 'Onboarding', badgeColor: 'bg-sky-100 text-sky-800 border-sky-200', icon: Layers },
        { name: 'Senior Onboarding Form', path: '/auth/signup-elderly', description: 'Senior registration, mobility assistance & contact input', badge: 'Senior Flow', badgeColor: 'bg-rose-100 text-rose-800 border-rose-200', icon: Heart },
        { name: 'Volunteer Application', path: '/auth/signup-volunteer', description: 'Skill selection & background check application', badge: 'Volunteer Flow', badgeColor: 'bg-amber-100 text-amber-800 border-amber-200', icon: UserCheck },
        { name: 'Family Link Account', path: '/auth/signup-family', description: 'Family relationship linkage & notification settings', badge: 'Family Flow', badgeColor: 'bg-blue-100 text-blue-800 border-blue-200', icon: Users },
        { name: 'Companion Interactions Hub', path: '/auth/interactions', description: 'Community social match feed & onboarding interaction', badge: 'Community', badgeColor: 'bg-orange-100 text-primary border-orange-200', icon: Sparkles },
        { name: 'Volunteer Pending Approval', path: '/auth/pending-approval', description: 'Background verification status for newly registered volunteers', badge: 'Verification', badgeColor: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Shield }
      ]
    },
    {
      id: 'health',
      title: '💊 Health, Daily Care & Appointments',
      description: 'Prescriptions, mood check-ins, clinic visits & video calls',
      links: [
        { name: 'Medication Management', path: '/medications', description: 'Prescription schedules, dosage alerts & refill tracker', badge: 'Medications', badgeColor: 'bg-orange-100 text-primary border-orange-200', icon: Pill },
        { name: 'Daily Wellbeing Check-In', path: '/wellbeing', description: 'Mood tracker, pain level indicator & vitals log', badge: 'Wellness', badgeColor: 'bg-rose-100 text-rose-800 border-rose-200', icon: Activity },
        { name: 'Appointments & Escort Transport', path: '/appointments', description: 'Upcoming clinic consults & door-to-door ride escort calendar', badge: 'Medical', badgeColor: 'bg-blue-100 text-blue-800 border-blue-200', icon: Calendar },
        { name: 'Senior HD Video Telecare', path: '/video-interaction', description: '1-tap high-clarity video calls with family & nurses', badge: 'Telecare', badgeColor: 'bg-violet-100 text-violet-800 border-violet-200', icon: Video },
        { name: 'Personalized Care Plans', path: '/care-plans', description: 'Custom daily care routine, mobility guidelines & meal notes', badge: 'Care Plan', badgeColor: 'bg-amber-100 text-amber-800 border-amber-200', icon: Shield }
      ]
    },
    {
      id: 'events',
      title: '🎬 20 Events, Movies & Social Clubs',
      description: 'Classic cinema matinees, tea circles, and gardening meetups',
      links: [
        { name: '20 Events & Movies Hub', path: '/social-engagement', description: '20 Weekly Classic Movie Screenings & 10 Social Club Meetups', badge: 'Featured', badgeColor: 'bg-orange-100 text-primary border-orange-200 font-bold', icon: Ticket },
        { name: 'Cinema Matinee Theater', path: '/cinema', description: 'Complimentary movie theater reservations & seat booking', badge: 'Cinema', badgeColor: 'bg-orange-100 text-orange-800 border-orange-200', icon: Film },
        { name: 'Community Social Circles', path: '/social', description: 'Local gardening clubs, book readings, tea meetups & groups', badge: 'Social Club', badgeColor: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200', icon: Users }
      ]
    },
    {
      id: 'volunteers',
      title: '🤝 Volunteer Matching & Visits',
      description: 'AI match algorithm, coordinator roster & visit feedback',
      links: [
        { name: 'AI Volunteer Matching', path: '/volunteer-matching', description: 'Interest-based & proximity matching with compatibility scores', badge: 'AI Match', badgeColor: 'bg-orange-100 text-primary border-orange-200', icon: Sparkles },
        { name: 'Volunteer Management Roster', path: '/volunteer-management', description: 'Coordinator portal to manage vetted volunteers & assignments', badge: 'Admin', badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200', icon: UserCheck },
        { name: 'Companion Visit Logs & Schedules', path: '/volunteer-visits', description: 'Upcoming home visits, activity logs & visit feedback', badge: 'Visits', badgeColor: 'bg-orange-100 text-orange-800 border-orange-200', icon: Calendar }
      ]
    },
    {
      id: 'settings',
      title: '⚙️ System & Accessibility Settings',
      description: 'Notifications, font scale, language and voice controls',
      links: [
        { name: 'Notification Broadcast Center', path: '/notifications', description: 'System alerts, reminder broadcasts & family check-in receipts', badge: 'Alerts', badgeColor: 'bg-red-100 text-red-800 border-red-200', icon: Bell },
        { name: 'System Settings & Accessibility', path: '/settings', description: 'Font scale, high contrast, 12 languages & voice settings', badge: 'Settings', badgeColor: 'bg-slate-100 text-slate-800 border-slate-200', icon: SettingsIcon }
      ]
    },
    {
      id: 'api',
      title: '🔌 Backend Server & Express API',
      description: 'Live Node / Express backend server running on port 5000',
      links: [
        { name: 'CareConnect Express API', path: 'http://localhost:5000/api', description: 'Backend API serving health check, users, visits & telemetry', badge: 'Express :5000', badgeColor: 'bg-gray-900 text-orange-400 border-gray-700', icon: Server, isExternal: true }
      ]
    }
  ];

  // Filtered directory sections
  const filteredDirectorySections = directorySections.map(sec => {
    const matchesCat = directoryCategory === 'all' || sec.id === directoryCategory;
    if (!matchesCat) return null;

    const matchesLinks = sec.links.filter(l => {
      const q = directorySearch.toLowerCase();
      return (
        l.name.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.path.toLowerCase().includes(q) ||
        l.badge.toLowerCase().includes(q)
      );
    });

    if (matchesLinks.length === 0) return null;
    return { ...sec, links: matchesLinks };
  }).filter(Boolean);

  const totalDirectoryLinks = directorySections.reduce((acc, s) => acc + s.links.length, 0);

  // Quick Booking Form State
  const [bookingForm, setBookingForm] = useState({
    seniorName: "Eleanor Vance",
    phone: "+1 (555) 234-5678",
    peopleCount: "1 Senior Person",
    serviceType: "Warm Home Companion & Tea",
    date: "2026-08-28"
  });

  // Login State
  const [loginEmail, setLoginEmail] = useState('eleanor.vance@example.com');
  const [loginPassword, setLoginPassword] = useState('••••••••');
  const [loginRole, setLoginRole] = useState('elderly');
  const [loginConsent, setLoginConsent] = useState(true);

  // Registration State
  const [regForm, setRegForm] = useState({
    fullName: "Eleanor Vance",
    email: "eleanor.vance@example.com",
    password: "Password123!",
    confirmPassword: "Password123!",
    phone: "+1 (555) 234-5678",
    role: "elderly",
    location: "142 Maplewood Drive, Springfield",
    termsAccepted: true
  });

  const workspaceServiceOptions = [
    { label: "Warm Home Companion & Tea", desc: "1-on-1 friendly conversation & strolls", icon: Coffee },
    { label: "Vital Signs & BP Telemetry", desc: "Daily medical telemetry & clinic sync", icon: Activity },
    { label: "Doctor Appointment Escort", desc: "Door-to-door wheelchair assistance", icon: Car },
    { label: "Nutritional Meal Preparation", desc: "Diabetic-friendly recipes & groceries", icon: Stethoscope },
    { label: "20 Community & Movie Events", desc: "Complimentary social & cinema access", icon: Film }
  ];

  const peopleCountOptions = [
    { label: "1 Senior Person", desc: "Dedicated 1-on-1 personalized companion" },
    { label: "2 Seniors (Elderly Couple)", desc: "Shared dual companion & vital oversight" },
    { label: "Senior & Family Guardian", desc: "Guided family orientation session" },
    { label: "Group Care & Social Club", desc: "Community circle for 4+ seniors" }
  ];

  const servicesList = [
    {
      id: 'companion',
      category: 'companionship',
      title: "Warm Companion & Tea Visits",
      subtitle: "Friendly in-person conversation, gentle garden strolls, memory games, and tea-time companionship.",
      icon: Coffee,
      badge: "Most Requested",
      price: "Free 1st Visit • then $14.99/hr",
      features: [
        "1-on-1 verified volunteer companion",
        "Gentle neighborhood walks & reading",
        "Tea time & emotional support",
        "Post-visit family photo report"
      ]
    },
    {
      id: 'health',
      category: 'health',
      title: "Vital Signs & Health Monitoring",
      subtitle: "Daily blood pressure, blood glucose, heart rate telemetry, and automated doctor medication sync.",
      icon: Activity,
      badge: "Medical Grade",
      price: "Included in Care Plans",
      features: [
        "Daily BP & Heart Rate tracking",
        "Medication reminders with meal notes",
        "Direct synchronization with clinic doctor",
        "Emergency anomaly notifications"
      ]
    },
    {
      id: 'transport',
      category: 'transport',
      title: "Door-to-Door Transport Escort",
      subtitle: "Safe assisted rides for hospital checkups, eye exams, pharmacy pickups, and community church outings.",
      icon: Car,
      badge: "Wheelchair Accessible",
      price: "From $12.00 / ride",
      features: [
        "Certified volunteer driver assistance",
        "Door-to-door arm-assist boarding",
        "Driver waiting during appointment",
        "Real-time GPS tracking for family"
      ]
    },
    {
      id: 'video',
      category: 'telecare',
      title: "Encrypted HD Video Telecare",
      subtitle: "One-tap senior-friendly video calls with children, grandchildren, and specialized telecare nurses.",
      icon: Video,
      badge: "1-Tap Connect",
      price: "Unlimited Free for Family",
      features: [
        "Large-button simplified interface",
        "No complex passwords or logins needed",
        "Multi-person family group calls",
        "High-definition crystal clear audio"
      ]
    },
    {
      id: 'emergency',
      category: 'emergency',
      title: "24/7 Rapid Emergency & SOS",
      subtitle: "Instant one-tap medical dispatch with live GPS broadcast to family guardians and local paramedics.",
      icon: AlertTriangle,
      badge: "24/7 Active",
      price: "Zero Latency",
      features: [
        "Immediate paramedic broadcast",
        "Automatic family SMS & call alarm",
        "Medical history & allergy HUD",
        "Wearable fall-detection integration"
      ]
    },
    {
      id: 'nutrition',
      category: 'nutrition',
      title: "Nutritional Meal & Recipe Prep",
      subtitle: "Diabetic-friendly homemade meal preparation, hydration tracking, and fresh grocery market escort.",
      icon: Stethoscope,
      badge: "Dietitian Approved",
      price: "From $16.00 / session",
      features: [
        "Fresh organic farmer's market escort",
        "Low-sodium & diabetic meal support",
        "Hydration & appetite daily logs",
        "Pantry restocking & expiration check"
      ]
    }
  ];

  const featuredEvents = [
    {
      id: 'ev-1',
      title: "Singin' in the Rain Matinee",
      category: "Classic Cinema",
      date: "Friday, Aug 28 • 2:00 PM",
      location: "Lounge Theater Room",
      badge: "Movie Screening",
      image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=400&h=250"
    },
    {
      id: 'ev-2',
      title: "Gentle Morning Garden Circle",
      category: "Outdoors & Nature",
      date: "Saturday, Aug 29 • 10:00 AM",
      location: "Sunny Patio Garden",
      badge: "Companionship",
      image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=400&h=250"
    },
    {
      id: 'ev-3',
      title: "The Sound of Music & Tea",
      category: "Classic Cinema",
      date: "Sunday, Aug 30 • 3:30 PM",
      location: "Main Community Hall",
      badge: "Movie Screening",
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=400&h=250"
    },
    {
      id: 'ev-4',
      title: "Watercolor & Memory Journaling",
      category: "Creative Arts",
      date: "Tuesday, Sep 01 • 11:00 AM",
      location: "Art Studio Workshop",
      badge: "Creative Club",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400&h=250"
    }
  ];

  const testimonials = [
    {
      name: "Arthur Pendelton",
      role: "Senior Resident, 82 yrs",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
      quote: "The volunteer companionship program gave me a dear friend in Marcus. We play chess and take garden walks every Tuesday and Thursday.",
      rating: 5
    },
    {
      name: "Sarah Vance",
      role: "Family Guardian & Daughter",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
      quote: "Living 40 miles away was stressful until CareConnect. I get instant vital updates, medication logs, and HD video calls with my mom every evening.",
      rating: 5
    },
    {
      name: "Elena Rostova",
      role: "Senior Care Recipient, 74 yrs",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
      quote: "The classic movie matinees and door-to-door clinic rides make me feel vibrant, independent, and truly cared for.",
      rating: 5
    }
  ];

  const faqs = [
    {
      question: "How are volunteer companions screened and verified?",
      answer: "Every caregiver and volunteer companion undergoes rigorous identity verification, state and federal background checks, reference checks, and specialized senior empathy training before matching with any family."
    },
    {
      question: "Can family members monitor medication and health vitals remotely?",
      answer: "Yes! Family members have a dedicated Family Guardian Dashboard with real-time vitals graphs, medication adherence logs, GPS transport updates, and one-tap video calling."
    },
    {
      question: "How does the Senior Voice Assistant work?",
      answer: "Seniors can tap the large microphone button and speak in any of 12 supported languages. The system can read daily schedules, log wellbeing, launch video calls, or connect with family effortlessly."
    },
    {
      question: "What happens during a medical emergency or fall?",
      answer: "Pressing the SOS button instantly dispatches local emergency paramedics while immediately broadcasting GPS coordinates, medical history, and vital telemetry to designated family guardians."
    },
    {
      question: "Are the 20 Community & Movie Screening Events free for seniors?",
      answer: "Yes, all 20 weekly social clubs and classic cinema matinees are 100% complimentary for active members, complete with audio loop hearing assistance and transport support."
    }
  ];

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail.trim()) {
      setLoginError('Email address is mandatory.');
      return;
    }
    if (!loginPassword.trim()) {
      setLoginError('Password is mandatory.');
      return;
    }
    if (!loginConsent) {
      setLoginError('You must agree to the Terms of Care and HIPAA Privacy Policy.');
      return;
    }

    login(loginEmail, loginPassword, loginRole);
    if (loginRole === 'elderly') {
      navigate('/dashboard');
    } else if (loginRole === 'volunteer') {
      navigate('/volunteer-dashboard');
    } else {
      navigate('/family-dashboard');
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegisterError('');

    if (!regForm.fullName.trim()) {
      setRegisterError('Full Name is mandatory.');
      return;
    }
    if (!regForm.email.trim()) {
      setRegisterError('Email address is mandatory.');
      return;
    }
    if (!regForm.phone.trim()) {
      setRegisterError('Phone Number is mandatory.');
      return;
    }
    if (!regForm.password || regForm.password.length < 6) {
      setRegisterError('Password must be at least 6 characters.');
      return;
    }
    if (regForm.password !== regForm.confirmPassword) {
      setRegisterError('Passwords do not match. Please re-enter.');
      return;
    }
    if (!regForm.termsAccepted) {
      setRegisterError('You must agree to the Terms of Care and HIPAA Privacy Policy.');
      return;
    }

    registerUser(regForm);
    if (regForm.role === 'elderly') {
      navigate('/auth/interactions');
    } else if (regForm.role === 'volunteer') {
      navigate('/volunteer-dashboard');
    } else {
      navigate('/family-dashboard');
    }
  };

  const handleQuickDemo = (user) => {
    login(user.email, 'demo123', user.role);
    if (user.role === 'family') {
      navigate('/family-dashboard');
    } else if (user.role === 'volunteer') {
      navigate('/volunteer-dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  // Delayed Offer Popup Entrance (Style 5 Spec: 4 seconds timer)
  React.useEffect(() => {
    const isDismissed = sessionStorage.getItem('cc_offer_dismissed');
    if (!isDismissed) {
      const timer = setTimeout(() => {
        setIsSpecialOfferOpen(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleQuickBookingSubmit = (e) => {
    e.preventDefault();
    showBookingSuccess({
      seniorName: bookingForm.seniorName || "Eleanor Vance",
      serviceName: bookingForm.serviceType || "Warm Home Companion & Tea",
      date: bookingForm.date || "2026-08-28",
      time: "10:00 AM",
      caregiver: "David Miller (Verified Volunteer)",
      onAction: () => {
        login('eleanor.vance@example.com', 'demo123', 'elderly');
        navigate('/dashboard');
      }
    });
    showToast({
      type: 'caregiver',
      title: 'Booking Confirmed!',
      message: `Scheduled ${bookingForm.serviceType} for ${bookingForm.seniorName}.`
    });
  };

  const handleDirectServiceBooking = (e) => {
    e.preventDefault();
    const serviceTitle = selectedServiceForBooking?.title || "Warm Home Companion & Tea";
    setSelectedServiceForBooking(null);
    showBookingSuccess({
      seniorName: "Eleanor Vance",
      serviceName: serviceTitle,
      date: "2026-08-29",
      time: "02:30 PM",
      caregiver: "Marcus Chen (Verified Aide)",
      onAction: () => {
        login('eleanor.vance@example.com', 'demo123', 'elderly');
        navigate('/dashboard');
      }
    });
    showToast({
      type: 'success',
      title: 'Companion Service Confirmed!',
      message: `${serviceTitle} has been confirmed with your caregiver.`
    });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactSubmitted(true);
    showToast({
      type: 'success',
      title: 'Inquiry Sent Successfully!',
      message: 'A local care coordinator will contact you shortly.'
    });
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({ name: '', email: '', message: '' });
    }, 3000);
  };

  const scrollTo = (id) => (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setIsMobileNavOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1D20] font-sans selection:bg-primary selection:text-white">

      {/* 1. STICKY TOP NAVBAR (Clean, Minimal, Compact) */}
      <header className="border-b border-slate-200/80 bg-white sticky top-0 z-40 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">

          {/* Brand Logo & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="md:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Mobile Navigation"
            >
              {isMobileNavOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <Link to="/" className="flex items-center gap-2 group py-1" title="CareConnect - Health • Support • Together">
              <img
                src="/careconnect-logo.png"
                alt="CareConnect Logo"
                className="h-11 sm:h-12 w-auto max-w-[210px] object-contain transition-transform group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-xs lg:text-sm font-medium text-slate-600">
            <a href="#about" onClick={scrollTo('about')} className="hover:text-slate-900 transition-colors cursor-pointer">About</a>
            <a href="#services" onClick={scrollTo('services')} className="hover:text-slate-900 transition-colors cursor-pointer">Services</a>
            <a href="#events" onClick={scrollTo('events')} className="hover:text-slate-900 transition-colors cursor-pointer">20 Events & Movies</a>
            <button
              type="button"
              onClick={() => setIsTestimonialSheetOpen(true)}
              className="hover:text-slate-900 transition-colors font-medium cursor-pointer"
            >
              Testimonials
            </button>
            <a href="#all-links" onClick={scrollTo('all-links')} className="hover:text-primary text-slate-900 font-semibold transition-colors cursor-pointer">
              All Links
            </a>
            <a href="#faq" onClick={scrollTo('faq')} className="hover:text-slate-900 transition-colors cursor-pointer">FAQ</a>
            <a href="#contact" onClick={scrollTo('contact')} className="hover:text-slate-900 transition-colors cursor-pointer">Contact</a>
          </nav>

          {/* Header Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Special Offer Trigger Button */}
            <button
              type="button"
              onClick={() => setIsSpecialOfferOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#FFEBAF]/60 hover:bg-[#FFEBAF] text-[#E8703A] border border-[#EADDBF] text-xs font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
              title="Claim -15% Welcome Benefit (CARE15)"
            >
              <Gift size={14} className="text-[#E8703A]" />
              <span className="hidden sm:inline">-15% Offer</span>
            </button>

            {/* Senior Voice Control Trigger */}
            <button
              onClick={() => setIsVoiceAssistantOpen(true)}
              className="p-2 rounded-lg text-slate-600 hover:text-primary hover:bg-slate-50 transition-colors"
              title="Senior Voice Control Assistant"
              aria-label="Voice Assistant"
            >
              <Mic size={17} />
            </button>

            {/* Custom Multi-Language Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center gap-1"
                aria-label="Select Language"
              >
                <Globe size={16} />
              </button>

              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-lg border border-slate-200 p-1.5 z-50 animate-in fade-in duration-150">
                  <div className="max-h-60 overflow-y-auto space-y-0.5">
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLanguageDropdownOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${currentLanguage === lang.code
                          ? 'bg-orange-50 text-primary font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                          }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.native}</span>
                        </span>
                        {currentLanguage === lang.code && <Check size={13} className="text-primary" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/auth/register"
              className="h-9 px-3.5 rounded-lg bg-orange-50 hover:bg-orange-100 text-primary text-xs font-bold transition-all inline-flex items-center justify-center cursor-pointer border border-orange-200/60 active:scale-95"
              title="Create New CareConnect Account"
            >
              Register
            </Link>

            <Link
              to="/auth/login"
              className="h-9 px-4 rounded-lg bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-xs transition-all inline-flex items-center justify-center cursor-pointer active:scale-95"
              title="Sign In to Your Account"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* 4. MOBILE NAVIGATION MENU (Distinct Pop-Up for Every Nav Link) */}
        {isMobileNavOpen && (
          <div className="md:hidden border-t border-[#E2E8F0] bg-white p-4 space-y-2 animate-in fade-in">
            {[
              { label: "About Us", id: "about", anim: "animate-pop-slide-left" },
              { label: "Care Services", id: "services", anim: "animate-pop-bounce-up" },
              { label: "Social Club & 20 Events", id: "events", badge: "20 Live", anim: "animate-pop-slide-right" },
              { label: "Testimonials", id: "testimonials", isModal: true, anim: "animate-pop-flip-in" },
              { label: "All Platform Links (30+ Pages)", id: "all-links", badge: "30+ Hub", anim: "animate-pop-bounce-up" },
              { label: "Frequently Asked Questions", id: "faq", anim: "animate-pop-zoom-glow" },
              { label: "Contact & Location", id: "contact", anim: "animate-pop-slide-left" },
              { label: "Member Access Portal", id: "auth-portal", anim: "animate-pop-bounce-up" }
            ].map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  setIsMobileNavOpen(false);
                  if (item.isModal) {
                    setIsTestimonialSheetOpen(true);
                  } else {
                    scrollTo(item.id)(e);
                  }
                }}
                style={{ animationDelay: `${idx * 60}ms` }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-[#1A1D20] hover:bg-[#F8F9FA] hover:text-primary transition-all ${item.anim} flex items-center justify-between cursor-pointer`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] uppercase font-bold bg-[#FFE8DF] text-primary px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}

            <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
              <Link
                to="/auth/login"
                onClick={() => setIsMobileNavOpen(false)}
                className="py-2.5 rounded-xl bg-primary text-white text-xs font-bold text-center shadow-xs"
              >
                Sign In
              </Link>
              <Link
                to="/auth/register"
                onClick={() => setIsMobileNavOpen(false)}
                className="py-2.5 rounded-xl bg-orange-50 text-primary border border-orange-200 text-xs font-bold text-center"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* LEFT: 3-Pill Slanted Photo Montage */}
            <div className="lg:col-span-6 relative flex items-center justify-center p-4">

              {/* Soft Background Glow Shape */}
              <div className="absolute w-72 h-72 rounded-full bg-[#FFE8DF] blur-3xl -z-10"></div>

              {/* 3 Slanted Diagonal Pill Containers with Sequential Entrance */}
              <div className="flex gap-4 sm:gap-6 transform -rotate-6 hover:rotate-0 transition-transform duration-700">

                {/* Pill 1: Blood Pressure Check at Home */}
                <div className="w-28 sm:w-36 h-72 sm:h-96 rounded-full overflow-hidden shadow-card border-4 border-white transform translate-y-6 hover:scale-105 transition-transform duration-500 bg-[#E2E8F0] animate-fade-in-scale" style={{ animationDelay: '100ms' }}>
                  <img
                    src="/images/senior-bp-check.jpg"
                    alt="Elderly Woman Blood Pressure Check by Caregiver"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Pill 2: Companion Tea & Laughter */}
                <div className="w-32 sm:w-44 h-80 sm:h-[420px] rounded-full overflow-hidden shadow-elevated border-4 border-white transform -translate-y-4 hover:scale-105 transition-transform duration-500 bg-[#CBD5E1] animate-fade-in-scale" style={{ animationDelay: '250ms' }}>
                  <img
                    src="/images/senior-companion-tea.jpg"
                    alt="Senior Grandfather and Volunteer Caregiver Having Tea"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Pill 3: Garden Stroll */}
                <div className="w-28 sm:w-36 h-72 sm:h-96 rounded-full overflow-hidden shadow-card border-4 border-white transform translate-y-8 hover:scale-105 transition-transform duration-500 bg-[#E2E8F0] animate-fade-in-scale" style={{ animationDelay: '400ms' }}>
                  <img
                    src="/images/senior-garden-walk.jpg"
                    alt="Smiling Senior Citizen and Caregiver Walking in Sunny Garden"
                    className="w-full h-full object-cover"
                  />
                </div>

              </div>
            </div>

            {/* RIGHT: Hero Copy & Action CTAs */}
            <div className="lg:col-span-6 space-y-6 animate-fade-in-up" style={{ animationDelay: '150ms' }}>

              {/* Header Badge */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-4 py-1.5 rounded-full bg-[#FFE8DF] text-primary text-xs font-bold tracking-wide uppercase shadow-xs">
                  from $14.99 / per hour
                </span>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B]">
                  <span>5 HOSPITALS</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span>3 CLINICS</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span>4 REHAB CENTERS</span>
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1D20] font-serif leading-tight">
                Elderly Care Service <br />
                <span className="text-primary font-serif">Tailored to You</span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed max-w-xl">
                Compassionate home visits, vital sign tracking, and family peace of mind. Book dedicated companion sessions and receive <strong className="text-primary font-bold">-15% off</strong> on full-month support care plans.
              </p>

              {/* Hero CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/auth/register"
                  className="h-12 px-7 rounded-full bg-primary hover:bg-primary-hover text-white text-sm font-bold shadow-ambient transition-all active:scale-95 flex items-center justify-center cursor-pointer gap-2"
                >
                  <span>Create Account / Register</span>
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/auth/login"
                  className="h-12 px-6 rounded-full bg-orange-50 hover:bg-orange-100 text-primary border border-orange-300/80 text-sm font-bold transition-all flex items-center gap-2 shadow-xs group"
                >
                  <Lock size={15} />
                  <span>Sign In</span>
                </Link>
                
                <Link
                  to="/volunteer-matching"
                  className="h-12 px-6 rounded-full bg-white hover:bg-[#F8F9FA] text-[#1A1D20] border border-[#CBD5E1] text-sm font-bold transition-all flex items-center gap-2 shadow-xs group"
                >
                  <span>Find Companions</span>
                </Link>
              </div>

              {/* Social Proof Mini Bar */}
              <div className="pt-2 flex items-center gap-3">
                <div className="flex -space-x-2">
                  <img className="w-9 h-9 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=128&h=128" alt="Senior" />
                  <img className="w-9 h-9 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=128&h=128" alt="Senior" />
                  <img className="w-9 h-9 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=128&h=128" alt="Senior" />
                </div>
                <div className="text-xs">
                  <div className="flex items-center text-amber-500">
                    <Star size={14} className="fill-amber-400" />
                    <Star size={14} className="fill-amber-400" />
                    <Star size={14} className="fill-amber-400" />
                    <Star size={14} className="fill-amber-400" />
                    <Star size={14} className="fill-amber-400" />
                    <span className="font-bold text-[#1A1D20] ml-1.5">4.9 / 5.0</span>
                  </div>
                  <p className="text-[11px] text-[#64748B]">Trusted by over 450+ elderly families</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. HORIZONTAL QUICK BOOKING BAR (With Custom Staggered Dropdowns) */}
      <section id="quick-booking" className="py-8 lg:py-12 bg-[#F8F9FA] border-y border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-card">

            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-2">
                <Calendar size={16} />
                <span>Fast Care Scheduling & Dispatch</span>
              </span>
              <span className="text-xs text-[#64748B] font-semibold">
                ⚡ Instant 15-Minute Response Time
              </span>
            </div>

            <form onSubmit={handleQuickBookingSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6 items-end">

              {/* Senior Name */}
              <div className="lg:col-span-3 space-y-1.5">
                <label className="block text-xs font-bold text-[#1A1D20]">Senior's Name *</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-3.5 text-[#64748B]" />
                  <input
                    type="text"
                    required
                    value={bookingForm.seniorName}
                    onChange={(e) => setBookingForm({ ...bookingForm, seniorName: e.target.value })}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full h-12 pl-10 pr-3 rounded-xl bg-[#F8F9FA] border border-[#CBD5E1] text-xs text-[#1A1D20] focus:ring-2 focus:ring-primary focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* 1. DROPDOWN: Number of People (Staggered Animation Options) */}
              <div className="lg:col-span-3 space-y-1.5 relative">
                <label className="block text-xs font-bold text-[#1A1D20]">Number of People *</label>
                <button
                  type="button"
                  onClick={() => {
                    setIsPeopleDropdownOpen(!isPeopleDropdownOpen);
                    setIsServiceDropdownOpen(false);
                  }}
                  className="w-full h-12 px-3.5 rounded-xl bg-[#F8F9FA] border border-[#CBD5E1] text-xs text-[#1A1D20] font-semibold text-left flex items-center justify-between focus:ring-2 focus:ring-primary focus:bg-white"
                >
                  <span className="truncate">{bookingForm.peopleCount}</span>
                  <ChevronDown size={15} className={`text-[#64748B] transition-transform ${isPeopleDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isPeopleDropdownOpen && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-elevated border border-[#E2E8F0] p-2 z-50">
                    {peopleCountOptions.map((opt, idx) => {
                      const animClass = idx === 0 ? 'animate-pop-slide-left' : idx === 1 ? 'animate-pop-slide-right' : idx === 2 ? 'animate-pop-bounce-up' : 'animate-pop-flip-in';
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setBookingForm({ ...bookingForm, peopleCount: opt.label });
                            setIsPeopleDropdownOpen(false);
                          }}
                          style={{ animationDelay: `${idx * 60}ms` }}
                          className={`w-full text-left p-2.5 rounded-xl text-xs transition-all ${animClass} flex items-center justify-between ${bookingForm.peopleCount === opt.label
                            ? 'bg-[#FFE8DF] text-primary font-bold'
                            : 'text-[#1A1D20] hover:bg-[#F8F9FA]'
                            }`}
                        >
                          <div>
                            <p className="font-bold">{opt.label}</p>
                            <p className="text-[10px] text-[#64748B]">{opt.desc}</p>
                          </div>
                          {bookingForm.peopleCount === opt.label && <Check size={14} className="text-primary" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 1. DROPDOWN: Workspace Type / Service Category (Distinct Pop-Up for Every Sub-Option) */}
              <div className="lg:col-span-3 space-y-1.5 relative">
                <label className="block text-xs font-bold text-[#1A1D20]">Workspace / Care Type *</label>
                <button
                  type="button"
                  onClick={() => {
                    setIsServiceDropdownOpen(!isServiceDropdownOpen);
                    setIsPeopleDropdownOpen(false);
                  }}
                  className="w-full h-12 px-3.5 rounded-xl bg-[#F8F9FA] border border-[#CBD5E1] text-xs text-[#1A1D20] font-semibold text-left flex items-center justify-between focus:ring-2 focus:ring-primary focus:bg-white"
                >
                  <span className="truncate">{bookingForm.serviceType}</span>
                  <ChevronDown size={15} className={`text-[#64748B] transition-transform ${isServiceDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isServiceDropdownOpen && (
                  <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-elevated border border-[#E2E8F0] p-2 z-50">
                    {workspaceServiceOptions.map((opt, idx) => {
                      const Icon = opt.icon;
                      const animClass = idx === 0 ? 'animate-pop-slide-left' : idx === 1 ? 'animate-pop-slide-right' : idx === 2 ? 'animate-pop-bounce-up' : idx === 3 ? 'animate-pop-flip-in' : 'animate-pop-zoom-glow';
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setBookingForm({ ...bookingForm, serviceType: opt.label });
                            setIsServiceDropdownOpen(false);
                          }}
                          style={{ animationDelay: `${idx * 60}ms` }}
                          className={`w-full text-left p-2.5 rounded-xl text-xs transition-all ${animClass} flex items-center gap-3 ${bookingForm.serviceType === opt.label
                            ? 'bg-[#FFE8DF] text-primary font-bold'
                            : 'text-[#1A1D20] hover:bg-[#F8F9FA]'
                            }`}
                        >
                          <div className="w-8 h-8 rounded-lg bg-[#F8F9FA] text-primary flex items-center justify-center flex-shrink-0">
                            <Icon size={16} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-bold truncate">{opt.label}</p>
                            <p className="text-[10px] text-[#64748B] truncate">{opt.desc}</p>
                          </div>
                          {bookingForm.serviceType === opt.label && <Check size={14} className="text-primary flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Date Selection */}
              <div className="lg:col-span-1 space-y-1.5">
                <label className="block text-xs font-bold text-[#1A1D20]">Date *</label>
                <input
                  type="date"
                  required
                  value={bookingForm.date}
                  onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                  className="w-full h-12 px-2 rounded-xl bg-[#F8F9FA] border border-[#CBD5E1] text-xs text-[#1A1D20] focus:ring-2 focus:ring-primary focus:bg-white focus:outline-none"
                />
              </div>

              {/* Submit Action */}
              <div className="lg:col-span-2">
                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-ambient transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Book a Space</span>
                  <ArrowRight size={15} />
                </button>
              </div>

            </form>

            {bookingSubmitted && (
              <div className="mt-6 p-4 rounded-2xl bg-orange-50 border border-orange-200 text-orange-950 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 size={16} className="text-primary" />
                <span>Care request scheduled for {bookingForm.seniorName} on {bookingForm.date}! Redirecting to care dashboard...</span>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* 4. ABOUT US SECTION (3. Feature Checklist Staggered Slide-In From Left) */}
      <section id="about" className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-[#FFE8DF] px-3.5 py-1 rounded-full">
                About Us
              </span>

              <h2 className="text-3xl sm:text-4xl font-black text-[#1A1D20] font-serif leading-tight">
                Empowering Seniors with <br />
                <span className="text-primary font-serif">Dignity, Joy & Safety</span>
              </h2>

              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                CareConnect bridges generations — pairing compassionate, background-checked community volunteers with seniors who desire meaningful companionship, health checkups, and assistance with daily joys.
              </p>

              {/* 3. FEATURE CHECKLIST: Distinct Pop-Up Variation for Every Sub-Item */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {[
                  { label: "High-Speed Wi-Fi & Telecare", desc: "Reliable HD connection", anim: "animate-pop-slide-left" },
                  { label: "Catered Meal & Tea Time", desc: "Nutritional support", anim: "animate-pop-bounce-up" },
                  { label: "Working 24/7 Paramedic SOS", desc: "Immediate GPS response", anim: "animate-pop-slide-right" },
                  { label: "Events & Lifelong Learning", desc: "20 Weekly cinema clubs", anim: "animate-pop-flip-in" },
                  { label: "Conference & Family Room", desc: "Group video call suites", anim: "animate-pop-zoom-glow" },
                  { label: "Creative Care Community", desc: "100% verified volunteers", anim: "animate-pop-slide-left" }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={{ animationDelay: `${idx * 80}ms` }}
                    className={`flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-[#1A1D20] ${item.anim} bg-[#F8F9FA] p-3 rounded-2xl border border-[#E2E8F0]`}
                  >
                    <CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">{item.label}</p>
                      <p className="text-[10px] text-[#64748B] font-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link
                  to="/volunteer-matching"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold shadow-ambient transition-all"
                >
                  <span>Meet Our Caregivers</span>
                  <ArrowRight size={15} />
                </Link>
              </div>

            </div>

            {/* Right Photo */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-card border border-[#E2E8F0] h-[380px] sm:h-[440px]">
                <img
                  src="/images/senior-companion-tea.jpg"
                  alt="Senior and Caregiver Talking"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-sm flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
                    <HeartHandshake size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#1A1D20]">100% Background Verified</p>
                    <p className="text-[11px] text-[#64748B]">State and national registry certified volunteers</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. FRONT PAGE SERVICES DIRECTORY (2. Cards Pop Up Sequentially Staggered ~100-150ms) */}
      <section id="services" className="py-16 sm:py-20 lg:py-24 bg-[#F8F9FA] border-t border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-[#FFE8DF] px-3.5 py-1 rounded-full">
              Full-Spectrum Elder Support
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A1D20] font-serif leading-tight">
              Our Care <span className="text-primary font-serif">Services</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              Click any service below to explore features, view pricing, and directly book an appointment with verified caregivers.
            </p>
          </div>

          {/* 6 Services Grid with Sequential Staggered Animation */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {servicesList.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  style={{ animationDelay: `${idx * 120}ms` }}
                  className="bg-white rounded-3xl border border-[#E2E8F0] shadow-card hover:shadow-ambient hover:border-primary/40 transition-all p-6 sm:p-8 flex flex-col justify-between group cursor-pointer animate-fade-in-scale"
                  onClick={() => setSelectedServiceForBooking(service)}
                >
                  <div className="space-y-4">

                    {/* Top Icon & Badge */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-[#FFE8DF] text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon size={24} />
                      </div>
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-[#F8F9FA] text-[#1A1D20] border border-[#E2E8F0]">
                        {service.badge}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                      <h3 className="text-lg font-bold text-[#1A1D20] font-serif group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-xs text-[#64748B] mt-1.5 leading-relaxed">
                        {service.subtitle}
                      </p>
                    </div>

                    {/* Feature Checklist */}
                    <div className="space-y-2 pt-3 border-t border-[#F1F5F9]">
                      {service.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-[#1A1D20]">
                          <CheckCircle2 size={14} className="text-primary flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* Bottom Price & Direct Booking CTA */}
                  <div className="pt-6 mt-6 border-t border-[#F1F5F9] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#94A3B8] block">Pricing</span>
                      <p className="text-xs font-bold text-[#1A1D20]">{service.price}</p>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedServiceForBooking(service);
                      }}
                      className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-ambient transition-all active:scale-95 flex items-center gap-1"
                    >
                      <span>Book Service</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. STATS ROW (Sequential Staggered Pop-Up) */}
      <section className="py-16 sm:py-20 lg:py-24 border-t border-[#E2E8F0] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 text-center">
            {[
              { num: "450+", label: "Seniors Supported" },
              { num: "98.8%", label: "Satisfaction Rating" },
              { num: "12", label: "Global Languages" },
              { num: "20", label: "Community & Movie Events" }
            ].map((stat, idx) => (
              <div
                key={idx}
                style={{ animationDelay: `${idx * 100}ms` }}
                className="p-6 rounded-3xl bg-[#F8F9FA] border border-[#E2E8F0] animate-fade-in-scale"
              >
                <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-primary font-serif">{stat.num}</p>
                <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#64748B] mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. SOCIAL CLUB & EVENTS (10 Activity Cards Grid & Details Modal) */}
      <div id="events">
        <SocialClubEventsSection />
      </div>

      {/* 8. TESTIMONIALS SECTION (Sequential Staggered Pop-Up) */}
      <section id="testimonials" className="py-16 sm:py-20 lg:py-24 border-t border-[#E2E8F0] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-[#FFE8DF] px-3.5 py-1 rounded-full">
              Verified Reviews
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A1D20] font-serif leading-tight">
              Stories from Our <span className="text-primary font-serif">Care Community</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              Hear directly from seniors and families who found companionship, reliability, and security.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                style={{ animationDelay: `${idx * 150}ms` }}
                className="bg-[#F8F9FA] p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-card flex flex-col justify-between animate-fade-in-scale"
              >
                <div className="space-y-4">
                  <div className="flex items-center text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={15} className="fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#1A1D20] italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-6 mt-6 border-t border-[#E2E8F0]">
                  <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs" />
                  <div>
                    <p className="font-bold text-xs sm:text-sm text-[#1A1D20] font-serif">{t.name}</p>
                    <p className="text-[11px] text-[#64748B]">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              type="button"
              onClick={() => setIsTestimonialSheetOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary-container hover:bg-primary/20 text-primary border border-primary/25 font-bold text-xs sm:text-sm shadow-xs transition-all active:scale-95 group cursor-pointer"
            >
              <Star size={16} className="fill-primary" />
              <span>Browse All Verified Stories & Submit a Review (Bottom Sheet)</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>

      {/* 9. FAQ ACCORDION SECTION */}
      <section id="faq" className="py-16 sm:py-20 lg:py-24 bg-[#F8F9FA] border-t border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-[#FFE8DF] px-3.5 py-1 rounded-full">
              Help & Answers
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A1D20] font-serif leading-tight">
              Frequently Asked <span className="text-primary font-serif">Questions</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              Everything you need to know about our volunteer matching, medical telemetry, and safety standards.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E2E8F0] shadow-card overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left font-bold text-sm text-[#1A1D20] flex items-center justify-between gap-4"
                >
                  <span className="font-serif">{faq.question}</span>
                  {openFaqIndex === idx ? (
                    <ChevronUp size={18} className="text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown size={18} className="text-[#64748B] flex-shrink-0" />
                  )}
                </button>

                {openFaqIndex === idx && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[#64748B] leading-relaxed border-t border-[#F1F5F9] pt-4 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. CONTACT & LOCATION SECTION */}
      <section id="contact" className="py-16 sm:py-20 lg:py-24 border-t border-[#E2E8F0] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary bg-[#FFE8DF] px-3.5 py-1 rounded-full">
              Get in Touch
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#1A1D20] font-serif leading-tight">
              Contact Our <span className="text-primary font-serif">Care Team</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed">
              Have questions regarding family enrollment, volunteer companionship, or custom medical plans?
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Contact Info & Map Card */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#F8F9FA] border border-[#E2E8F0] space-y-6">

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FFE8DF] text-primary flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#1A1D20]">Headquarters & Community Hub</h4>
                    <p className="text-xs text-[#64748B] mt-1">142 Maplewood Drive, Suite 200, Springfield</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FFE8DF] text-primary flex items-center justify-center flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#1A1D20]">24/7 Care Dispatch Hotline</h4>
                    <p className="text-xs text-[#64748B] mt-1">+1 (800) 555-CARE (2273)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FFE8DF] text-primary flex items-center justify-center flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#1A1D20]">Email Inquiries</h4>
                    <p className="text-xs text-[#64748B] mt-1">support@careconnect-community.org</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleContactSubmit} className="p-6 sm:p-8 rounded-3xl bg-[#F8F9FA] border border-[#E2E8F0] space-y-4">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#1A1D20]">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. Sarah Vance"
                      className="w-full h-12 px-4 rounded-xl bg-white border border-[#CBD5E1] text-xs text-[#1A1D20] focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#1A1D20]">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="sarah@example.com"
                      className="w-full h-12 px-4 rounded-xl bg-white border border-[#CBD5E1] text-xs text-[#1A1D20] focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#1A1D20]">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="How can we assist your family?"
                    className="w-full p-4 rounded-xl bg-white border border-[#CBD5E1] text-xs text-[#1A1D20] focus:ring-2 focus:ring-primary focus:outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="h-12 px-8 rounded-full bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-ambient transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Send size={15} />
                  <span>Send Message</span>
                </button>

                {contactSubmitted && (
                  <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 text-orange-950 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-primary" />
                    <span>Enquiry message sent successfully! A care coordinator will connect shortly.</span>
                  </div>
                )}

              </form>
            </div>

          </div>

        </div>
      </section>

      {/* 10. ALL LINKS & SITEMAP DIRECTORY HUB (All 30+ Pages in One Website) */}
      <section id="all-links" className="py-16 sm:py-20 bg-gradient-to-b from-white via-slate-50 to-white border-t border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E2E8F0] pb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary bg-[#FFE8DF] px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 mb-2">
                <Compass size={14} className="text-primary animate-spin-slow" />
                <span>All-in-One Platform Directory</span>
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1A1D20] font-serif">
                Explore All <span className="text-primary font-serif">{totalDirectoryLinks} Platform Pages</span> & Links
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-2xl">
                Every dashboard, registration funnel, clinical telemetry tool, companion scheduler, and backend route unified in one responsive site.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto">
              <Link
                to="/links"
                className="h-10 px-5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
              >
                <span>Full Directory View</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Search & Category Filter Header */}
          <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={16} className="text-[#64748B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by page name, path or keyword (e.g. 'medications', 'volunteer', 'login')..."
                  value={directorySearch}
                  onChange={(e) => setDirectorySearch(e.target.value)}
                  className="w-full h-11 pl-10 pr-16 rounded-xl bg-[#F8F9FA] border border-[#CBD5E1] text-xs text-[#1A1D20] focus:ring-2 focus:ring-primary focus:bg-white focus:outline-none"
                />
                {directorySearch && (
                  <button
                    type="button"
                    onClick={() => setDirectorySearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-primary hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {[
                  { id: 'all', label: 'All Pages (30+)' },
                  { id: 'dashboards', label: '🏠 Dashboards' },
                  { id: 'auth', label: '🔐 Auth' },
                  { id: 'health', label: '💊 Health' },
                  { id: 'events', label: '🎬 20 Movies' },
                  { id: 'volunteers', label: '🤝 Volunteers' },
                  { id: 'settings', label: '⚙️ Settings' },
                  { id: 'api', label: '🔌 API' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setDirectoryCategory(cat.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${directoryCategory === cat.id
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-[#F8F9FA] border border-[#E2E8F0] text-[#64748B] hover:text-[#1A1D20]'
                      }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Directory Sections Grid */}
          {filteredDirectorySections.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-10 text-center space-y-3">
              <HelpCircle size={36} className="text-[#64748B] mx-auto opacity-50" />
              <h3 className="text-base font-bold text-[#1A1D20]">No matching platform links found</h3>
              <p className="text-xs text-[#64748B]">Try adjusting your search term or selecting a different category.</p>
              <button
                type="button"
                onClick={() => {
                  setDirectorySearch('');
                  setDirectoryCategory('all');
                }}
                className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-xs hover:bg-primary-hover transition-colors"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredDirectorySections.map((sec) => (
                <div key={sec.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-[#1A1D20] font-serif">
                        {sec.title}
                      </h3>
                      <p className="text-xs text-[#64748B]">{sec.description}</p>
                    </div>
                    <span className="text-[11px] font-bold text-[#64748B] bg-white px-2.5 py-0.5 rounded-full border border-[#E2E8F0]">
                      {sec.links.length} {sec.links.length === 1 ? 'Route' : 'Routes'}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {sec.links.map((link) => {
                      const IconComp = link.icon || Compass;
                      const isCopied = copiedPath === link.path;

                      if (link.isExternal) {
                        return (
                          <a
                            key={link.path}
                            href={link.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white p-4 rounded-2xl border border-[#E2E8F0] hover:border-primary hover:shadow-md transition-all flex flex-col justify-between group"
                          >
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <div className="w-8 h-8 rounded-xl bg-slate-900 text-orange-400 flex items-center justify-center">
                                  <IconComp size={16} />
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${link.badgeColor}`}>
                                  {link.badge}
                                </span>
                              </div>
                              <h4 className="text-xs font-bold text-[#1A1D20] group-hover:text-primary transition-colors flex items-center gap-1">
                                <span>{link.name}</span>
                                <ExternalLink size={12} className="text-[#64748B]" />
                              </h4>
                              <p className="text-[11px] text-[#64748B] mt-1 line-clamp-2">
                                {link.description}
                              </p>
                            </div>

                            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                              <span className="font-mono text-[10px] text-[#64748B] truncate max-w-[170px]">
                                {link.path}
                              </span>
                              <span className="text-primary font-bold">Open API →</span>
                            </div>
                          </a>
                        );
                      }

                      return (
                        <div
                          key={link.path}
                          className="bg-white p-4 rounded-2xl border border-[#E2E8F0] hover:border-primary hover:shadow-md transition-all flex flex-col justify-between group relative"
                        >
                          <Link to={link.path} className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div className="w-8 h-8 rounded-xl bg-[#FFE8DF] text-primary group-hover:bg-primary group-hover:text-white transition-colors flex items-center justify-center">
                                <IconComp size={16} />
                              </div>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${link.badgeColor}`}>
                                {link.badge}
                              </span>
                            </div>
                            <h4 className="text-xs font-bold text-[#1A1D20] group-hover:text-primary transition-colors">
                              {link.name}
                            </h4>
                            <p className="text-[11px] text-[#64748B] mt-1 line-clamp-2">
                              {link.description}
                            </p>
                          </Link>

                          <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                            <span className="font-mono text-[10px] text-[#64748B] truncate max-w-[140px]">
                              {link.path}
                            </span>
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={(e) => handleCopyPath(link.path, e)}
                                className="p-1 rounded text-[#64748B] hover:text-primary hover:bg-[#F8F9FA] transition-colors"
                                title="Copy link"
                              >
                                {isCopied ? <Check size={13} className="text-primary" /> : <Copy size={13} />}
                              </button>
                              <Link to={link.path} className="text-primary font-bold hover:underline">
                                Visit →
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 11. AUTHENTICATION PORTAL (LOGIN & REGISTRATION) */}
      <section id="auth-portal" className="py-16 sm:py-20 lg:py-24 bg-[#F8F9FA] border-t border-[#E2E8F0]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#E2E8F0] shadow-elevated">
            
            <div className="text-center max-w-lg mx-auto mb-8 space-y-3">
              <div className="flex justify-center mb-2">
                <img
                  src="/careconnect-logo.png"
                  alt="CareConnect Logo"
                  className="h-14 sm:h-16 w-auto max-w-[240px] object-contain drop-shadow-xs"
                />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary bg-[#FFE8DF] px-3.5 py-1 rounded-full">
                  Member Access Portal
                </span>
              </div>
              <h2 className="text-3xl font-black text-[#1A1D20] font-serif">
                Sign In to Your <span className="text-primary font-serif">Care Dashboard</span>
              </h2>
              <p className="text-xs text-[#64748B]">
                All login and registration fields are strictly mandatory.
              </p>
            </div>

            {/* Tab Switcher */}
            <div className="flex bg-[#F8F9FA] p-1.5 rounded-2xl max-w-xs mx-auto mb-8 border border-[#E2E8F0]">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'login'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#1A1D20]'
                  }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'register'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-[#64748B] hover:text-[#1A1D20]'
                  }`}
              >
                New Registration
              </button>
            </div>

            {/* Quick Demo Switcher */}
            <div className="mb-8 p-4 rounded-2xl bg-[#FFF1EC] border border-[#FFE8DF] space-y-2.5">
              <p className="text-xs font-bold text-[#1A1D20] flex items-center gap-1.5">
                <Sparkles size={14} className="text-primary" />
                <span>Instant Demo One-Click Login Profiles:</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {availableDemoUsers.map((u, idx) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => handleQuickDemo(u)}
                    style={{ animationDelay: `${idx * 80}ms` }}
                    className="p-2.5 rounded-xl bg-white hover:bg-[#FFE8DF] border border-[#E2E8F0] hover:border-primary text-left text-xs font-bold transition-all flex items-center gap-2 group shadow-xs animate-fade-in-scale"
                  >
                    <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-full object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] text-[#1A1D20] group-hover:text-primary truncate">{u.name}</p>
                      <p className="text-[9px] text-[#64748B] uppercase truncate">{u.role}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab 1: Sign In Form */}
            {activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">

                {loginError && (
                  <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
                    <AlertCircle size={16} />
                    <span>{loginError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-[#1A1D20] mb-1">
                    Email Address <span className="text-[#BA1A1A]">*</span>
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3.5 top-3.5 text-[#64748B]" />
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full h-12 pl-10 pr-4 rounded-xl bg-[#F8F9FA] border border-[#CBD5E1] text-xs text-[#1A1D20] focus:ring-2 focus:ring-primary focus:bg-white focus:outline-none"
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-[#1A1D20]">
                      Password <span className="text-[#BA1A1A]">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsForgotModalOpen(true)}
                      className="text-xs text-primary hover:underline font-bold"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3.5 top-3.5 text-[#64748B]" />
                    <input
                      type="password"
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full h-12 pl-10 pr-4 rounded-xl bg-[#F8F9FA] border border-[#CBD5E1] text-xs text-[#1A1D20] focus:ring-2 focus:ring-primary focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A1D20] mb-1">
                    Login Role Persona <span className="text-[#BA1A1A]">*</span>
                  </label>
                  <select
                    value={loginRole}
                    onChange={(e) => setLoginRole(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl bg-[#F8F9FA] border border-[#CBD5E1] text-xs text-[#1A1D20] focus:ring-2 focus:ring-primary focus:bg-white focus:outline-none cursor-pointer"
                  >
                    <option value="elderly">Elderly Care Recipient (Eleanor Vance)</option>
                    <option value="family">Family Caregiver / Guardian (Sarah Vance)</option>
                    <option value="volunteer">Volunteer Companion Aide (Marcus Chen)</option>
                  </select>
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-2.5 text-xs text-[#1A1D20] cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={loginConsent}
                      onChange={(e) => setLoginConsent(e.target.checked)}
                      className="w-4 h-4 rounded text-primary focus:ring-primary mt-0.5"
                    />
                    <span>I agree to the Terms of Care and HIPAA Privacy Protection Protocols <span className="text-[#BA1A1A]">*</span></span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider shadow-ambient transition-all active:scale-95"
                >
                  Sign In to Dashboard
                </button>

              </form>
            )}

            {/* Tab 2: New Registration Form */}
            {activeTab === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">

                {registerError && (
                  <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
                    <AlertCircle size={16} />
                    <span>{registerError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1A1D20] mb-1">
                      Full Legal Name <span className="text-[#BA1A1A]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={regForm.fullName}
                      onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-[#F8F9FA] border border-[#CBD5E1] text-xs text-[#1A1D20] focus:ring-2 focus:ring-primary focus:bg-white focus:outline-none"
                      placeholder="Eleanor Vance"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A1D20] mb-1">
                      Email Address <span className="text-[#BA1A1A]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={regForm.email}
                      onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-[#F8F9FA] border border-[#CBD5E1] text-xs text-[#1A1D20] focus:ring-2 focus:ring-primary focus:bg-white focus:outline-none"
                      placeholder="eleanor@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1A1D20] mb-1">
                      Password <span className="text-[#BA1A1A]">*</span>
                    </label>
                    <input
                      type="password"
                      required
                      value={regForm.password}
                      onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-[#F8F9FA] border border-[#CBD5E1] text-xs text-[#1A1D20] focus:ring-2 focus:ring-primary focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A1D20] mb-1">
                      Confirm Password <span className="text-[#BA1A1A]">*</span>
                    </label>
                    <input
                      type="password"
                      required
                      value={regForm.confirmPassword}
                      onChange={(e) => setRegForm({ ...regForm, confirmPassword: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-[#F8F9FA] border border-[#CBD5E1] text-xs text-[#1A1D20] focus:ring-2 focus:ring-primary focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#1A1D20] mb-1">
                      Phone Number with Country Code <span className="text-[#BA1A1A]">*</span>
                    </label>
                    <PhoneInput
                      required
                      value={regForm.phone}
                      onChange={(val) => setRegForm({ ...regForm, phone: val })}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1A1D20] mb-1">
                      Primary Role <span className="text-[#BA1A1A]">*</span>
                    </label>
                    <select
                      value={regForm.role}
                      onChange={(e) => setRegForm({ ...regForm, role: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl bg-[#F8F9FA] border border-[#CBD5E1] text-xs text-[#1A1D20] focus:ring-2 focus:ring-primary focus:bg-white focus:outline-none cursor-pointer"
                    >
                      <option value="elderly">Elderly Care Recipient</option>
                      <option value="family">Family Caregiver / Guardian</option>
                      <option value="volunteer">Volunteer Companion Aide</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-2.5 text-xs text-[#1A1D20] cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={regForm.termsAccepted}
                      onChange={(e) => setRegForm({ ...regForm, termsAccepted: e.target.checked })}
                      className="w-4 h-4 rounded text-primary focus:ring-primary mt-0.5"
                    />
                    <span>I agree to the Terms of Care, HIPAA Privacy Policies, and Background Verification standards <span className="text-[#BA1A1A]">*</span></span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold uppercase tracking-wider shadow-ambient transition-all active:scale-95"
                >
                  Create Account & Access Dashboard
                </button>

              </form>
            )}

          </div>

        </div>
      </section>

      {/* 12. FOOTER */}
      <footer className="border-t border-[#1E2229] bg-[#1E2229] text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-xl bg-white/95 shadow-sm">
              <img
                src="/careconnect-logo.png"
                alt="CareConnect Logo"
                className="h-9 w-auto max-w-[170px] object-contain"
              />
            </div>
            <div>
              <p className="font-bold text-xs text-white/90">Health • Support • Together</p>
              <p className="text-[11px] text-white/50">© 2026 CareConnect Platform. All rights reserved.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-white/70 font-semibold">
            <button type="button" onClick={scrollTo('about')} className="hover:text-primary transition-colors cursor-pointer">About</button>
            <button type="button" onClick={scrollTo('services')} className="hover:text-primary transition-colors cursor-pointer">Services</button>
            <Link to="/social-engagement" className="hover:text-primary transition-colors cursor-pointer">20 Events & Movies</Link>
            <button type="button" onClick={() => setIsTestimonialSheetOpen(true)} className="hover:text-primary transition-colors cursor-pointer">Testimonials</button>
            <a href="#all-links" onClick={scrollTo('all-links')} className="hover:text-primary transition-colors cursor-pointer">All Links</a>
            <button type="button" onClick={scrollTo('faq')} className="hover:text-primary transition-colors cursor-pointer">FAQ</button>
            <button type="button" onClick={scrollTo('contact')} className="hover:text-primary transition-colors cursor-pointer">Contact</button>
            <button type="button" onClick={() => setIsAuthDrawerOpen(true)} className="hover:text-primary text-primary font-bold cursor-pointer">Sign In</button>
          </div>
        </div>
      </footer>

      {/* DIRECT SERVICE BOOKING MODAL */}
      {selectedServiceForBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-elevated border border-[#E2E8F0] relative max-h-[90vh] overflow-y-auto text-[#1A1D20]">

            <button
              onClick={() => setSelectedServiceForBooking(null)}
              className="absolute top-5 right-5 p-2 rounded-xl hover:bg-[#F8F9FA] text-[#64748B] hover:text-[#1A1D20] transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#FFE8DF] text-primary flex items-center justify-center">
                <selectedServiceForBooking.icon size={24} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-primary tracking-wider bg-[#FFE8DF] px-2.5 py-0.5 rounded-full">
                  Direct Service Booking
                </span>
                <h2 className="text-xl font-bold text-[#1A1D20] font-serif mt-0.5">{selectedServiceForBooking.title}</h2>
                <p className="text-xs text-[#64748B]">{selectedServiceForBooking.price}</p>
              </div>
            </div>

            {serviceBookingSuccess ? (
              <div className="p-8 text-center space-y-3 bg-orange-50 rounded-2xl border border-orange-200">
                <CheckCircle2 size={44} className="mx-auto text-primary animate-bounce" />
                <h3 className="text-lg font-bold text-orange-950">Care Appointment Scheduled!</h3>
                <p className="text-xs text-primary">
                  Your appointment for <strong>{selectedServiceForBooking.title}</strong> is confirmed. Redirecting to your dashboard...
                </p>
              </div>
            ) : (
              <form onSubmit={handleDirectServiceBooking} className="space-y-4">

                <div>
                  <label className="block text-xs font-bold text-[#1A1D20] mb-1">
                    Senior's Name <span className="text-[#BA1A1A]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    defaultValue="Eleanor Vance"
                    className="w-full h-12 px-4 rounded-xl bg-[#F8F9FA] border border-[#CBD5E1] text-xs text-[#1A1D20] focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1A1D20] mb-1">
                      Phone Number <span className="text-[#BA1A1A]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      defaultValue="+1 (555) 234-5678"
                      className="w-full h-12 px-4 rounded-xl bg-[#F8F9FA] border border-[#CBD5E1] text-xs text-[#1A1D20] focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#1A1D20] mb-1">
                      Appointment Date <span className="text-[#BA1A1A]">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      defaultValue="2026-08-28"
                      className="w-full h-12 px-3 rounded-xl bg-[#F8F9FA] border border-[#CBD5E1] text-xs text-[#1A1D20] focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#1A1D20] mb-1">Preferred Time Slot</label>
                  <select className="w-full h-12 px-4 rounded-xl bg-[#F8F9FA] border border-[#CBD5E1] text-xs text-[#1A1D20] focus:ring-2 focus:ring-primary focus:outline-none">
                    <option>Morning (09:00 AM – 12:00 PM)</option>
                    <option>Afternoon (01:00 PM – 04:00 PM)</option>
                    <option>Evening (05:00 PM – 07:00 PM)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-bold shadow-ambient transition-all active:scale-95"
                >
                  Confirm & Schedule Care Service
                </button>

              </form>
            )}

          </div>
        </div>
      )}

      {/* Forgot Password Recovery Modal */}
      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
        initialEmail={loginEmail}
      />

      {/* 7 Distinct Popup System Overlays */}
      <BookingSuccessModal />
      <TestimonialBottomSheet />
      <AuthDrawerModal />
      <WarningErrorModal />
      <GlobalToastContainer />

      {/* Senior Voice Control Assistant */}
      <SeniorVoiceAssistant />

    </div>
  );
};

export default AuthLandingPage;
