import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  initialElderlyProfiles,
  initialVolunteers,
  initialVisits,
  initialMedications,
  initialWellbeingLogs,
  initialAppointments,
  initialSocialEvents,
  initialCarePlans,
  initialNotifications
} from './mockData';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [elderlyProfiles, setElderlyProfiles] = useState(() => {
    const saved = localStorage.getItem('cc_elderly_profiles');
    return saved ? JSON.parse(saved) : initialElderlyProfiles;
  });

  const [selectedElderlyId, setSelectedElderlyId] = useState("eld-001");

  const [volunteers, setVolunteers] = useState(() => {
    const saved = localStorage.getItem('cc_volunteers');
    return saved ? JSON.parse(saved) : initialVolunteers;
  });

  const [visits, setVisits] = useState(() => {
    const saved = localStorage.getItem('cc_visits');
    return saved ? JSON.parse(saved) : initialVisits;
  });

  const [medications, setMedications] = useState(() => {
    const saved = localStorage.getItem('cc_medications');
    return saved ? JSON.parse(saved) : initialMedications;
  });

  const [wellbeingLogs, setWellbeingLogs] = useState(() => {
    const saved = localStorage.getItem('cc_wellbeing_logs');
    return saved ? JSON.parse(saved) : initialWellbeingLogs;
  });

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('cc_appointments');
    return saved ? JSON.parse(saved) : initialAppointments;
  });

  const [socialEvents, setSocialEvents] = useState(() => {
    const saved = localStorage.getItem('cc_social_events');
    return saved ? JSON.parse(saved) : initialSocialEvents;
  });

  const [carePlans] = useState(initialCarePlans);
  const [selectedPlanId, setSelectedPlanId] = useState("plan-assisted");
  const [billingInterval, setBillingInterval] = useState("monthly"); // monthly | annual
  const [currency, setCurrency] = useState("USD"); // USD | INR

  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('cc_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);
  const [isBookAppointmentModalOpen, setIsBookAppointmentModalOpen] = useState(false);
  const [isScheduleVisitModalOpen, setIsScheduleVisitModalOpen] = useState(false);
  const [isAddMedicationModalOpen, setIsAddMedicationModalOpen] = useState(false);
  const [isRateVolunteerModalOpen, setIsRateVolunteerModalOpen] = useState(false);
  const [selectedVolunteerForRating, setSelectedVolunteerForRating] = useState(null);
  const [isVideoCallModalOpen, setIsVideoCallModalOpen] = useState(false);
  const [activeVideoCallSession, setActiveVideoCallSession] = useState(null);

  // 7 Distinct Modal & Toast States
  const [toasts, setToasts] = useState([]);
  const [bookingSuccessData, setBookingSuccessData] = useState({
    isOpen: false,
    title: "Care Service Booked Successfully!",
    seniorName: "Eleanor Vance",
    serviceName: "Warm Home Companion & Tea",
    date: "2026-08-28",
    time: "10:00 AM",
    caregiver: "David Miller (Verified Volunteer)",
    referenceId: "CC-94281"
  });
  const [isTestimonialSheetOpen, setIsTestimonialSheetOpen] = useState(false);
  const [isAuthDrawerOpen, setIsAuthDrawerOpen] = useState(false);
  const [isSpecialOfferOpen, setIsSpecialOfferOpen] = useState(false);
  const [warningModalData, setWarningModalData] = useState({
    isOpen: false,
    title: "Attention Required",
    message: "Are you sure you want to proceed?",
    confirmText: "Yes, Proceed",
    cancelText: "Cancel",
    onConfirm: null,
    isDestructive: false
  });

  // Global Toast Dispatcher (Style 2: Alerts / Reminders Top-Right Slide)
  const showToast = ({ type = 'info', title = 'Alert Notification', message = '', icon = null, duration = 5000 }) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const newToast = { id, type, title, message, icon, duration };
    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        dismissToast(id);
      }, duration);
    }
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Booking Success Modal (Style 1: Center Scale-In with Confetti Pulse)
  const showBookingSuccess = (data = {}) => {
    setBookingSuccessData({
      isOpen: true,
      title: data.title || "Care Service Booked Successfully!",
      seniorName: data.seniorName || "Eleanor Vance",
      serviceName: data.serviceName || "Warm Home Companion & Tea",
      date: data.date || "2026-08-28",
      time: data.time || "10:00 AM",
      caregiver: data.caregiver || "David Miller (Verified Volunteer)",
      referenceId: data.referenceId || `CC-${Math.floor(10000 + Math.random() * 90000)}`,
      onAction: data.onAction || null
    });
  };

  const hideBookingSuccess = () => {
    setBookingSuccessData((prev) => ({ ...prev, isOpen: false }));
  };

  // Warning & Error Modal (Style 6: Shake Animation Center Modal)
  const showWarningModal = (data = {}) => {
    setWarningModalData({
      isOpen: true,
      title: data.title || "Warning / Attention",
      message: data.message || "Please confirm your action.",
      confirmText: data.confirmText || "Confirm",
      cancelText: data.cancelText || "Cancel",
      onConfirm: data.onConfirm || null,
      isDestructive: !!data.isDestructive
    });
  };

  const hideWarningModal = () => {
    setWarningModalData((prev) => ({ ...prev, isOpen: false }));
  };

  // Multi-Language State
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem('cc_language') || 'en';
  });

  const setLanguage = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem('cc_language', langCode);
  };

  // Senior Voice Assistant State
  const [isVoiceAssistantOpen, setIsVoiceAssistantOpen] = useState(false);

  // Accessibility settings
  const [textSize, setTextSize] = useState("normal"); // normal | large | extra-large
  const [highContrast, setHighContrast] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('cc_elderly_profiles', JSON.stringify(elderlyProfiles));
  }, [elderlyProfiles]);

  useEffect(() => {
    localStorage.setItem('cc_volunteers', JSON.stringify(volunteers));
  }, [volunteers]);

  useEffect(() => {
    localStorage.setItem('cc_visits', JSON.stringify(visits));
  }, [visits]);

  useEffect(() => {
    localStorage.setItem('cc_medications', JSON.stringify(medications));
  }, [medications]);

  useEffect(() => {
    localStorage.setItem('cc_wellbeing_logs', JSON.stringify(wellbeingLogs));
  }, [wellbeingLogs]);

  useEffect(() => {
    localStorage.setItem('cc_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('cc_social_events', JSON.stringify(socialEvents));
  }, [socialEvents]);

  useEffect(() => {
    localStorage.setItem('cc_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Actions
  const currentElderly = elderlyProfiles.find(p => p.id === selectedElderlyId) || elderlyProfiles[0];

  const updateElderlyVitals = (newVitals) => {
    setElderlyProfiles(prev =>
      prev.map(p =>
        p.id === selectedElderlyId
          ? { ...p, vitals: { ...p.vitals, ...newVitals, lastUpdated: "Just now" } }
          : p
      )
    );
  };

  const toggleMedicationStatus = (medId) => {
    setMedications(prev =>
      prev.map(med => {
        if (med.id === medId) {
          const isTaken = med.status === "Taken";
          return {
            ...med,
            status: isTaken ? "Pending" : "Taken",
            takenAt: isTaken ? null : "Just now"
          };
        }
        return med;
      })
    );
  };

  const addMedication = (newMed) => {
    const item = {
      id: `med-${Date.now()}`,
      status: "Pending",
      takenAt: null,
      remainingDays: 30,
      refillNeeded: false,
      pillColor: "#4a6fa5",
      ...newMed
    };
    setMedications(prev => [item, ...prev]);
    addNotification({
      type: "medication",
      title: "New Medication Added",
      message: `${newMed.name} (${newMed.dosage}) added to your daily schedule.`
    });
  };

  const requestMedRefill = (medId) => {
    setMedications(prev =>
      prev.map(m => (m.id === medId ? { ...m, refillRequested: true } : m))
    );
    addNotification({
      type: "medication",
      title: "Refill Requested",
      message: "Refill request sent to Springfield Wellness Pharmacy."
    });
  };

  const addWellbeingLog = (logData) => {
    const newLog = {
      id: `wb-${Date.now()}`,
      date: "Today, Just now",
      ...logData
    };
    setWellbeingLogs(prev => [newLog, ...prev]);
    addNotification({
      type: "health",
      title: "Wellbeing Check-in Logged",
      message: `Eleanor completed today's check-in: Mood ${logData.mood}.`
    });
  };

  const scheduleVisit = (visitData) => {
    const newVisit = {
      id: `vis-${Date.now()}`,
      elderlyId: currentElderly.id,
      elderlyName: currentElderly.name,
      status: "Upcoming",
      checklist: [
        { id: `c-${Date.now()}-1`, task: "Initial safety & wellbeing greeting", done: false },
        { id: `c-${Date.now()}-2`, task: "Assisted interaction or activity", done: false },
        { id: `c-${Date.now()}-3`, task: "Confirm next schedule and log feedback", done: false }
      ],
      ...visitData
    };
    setVisits(prev => [newVisit, ...prev]);
    addNotification({
      type: "visit",
      title: "Visit Scheduled",
      message: `New visit booked with ${visitData.volunteerName} for ${visitData.date} at ${visitData.time}.`
    });
  };

  const toggleVisitChecklist = (visitId, taskId) => {
    setVisits(prev =>
      prev.map(v => {
        if (v.id === visitId) {
          return {
            ...v,
            checklist: v.checklist.map(c =>
              c.id === taskId ? { ...c, done: !c.done } : c
            )
          };
        }
        return v;
      })
    );
  };

  const completeVisit = (visitId, feedbackNote) => {
    setVisits(prev =>
      prev.map(v =>
        v.id === visitId
          ? {
              ...v,
              status: "Completed",
              feedback: feedbackNote || "Visit concluded smoothly."
            }
          : v
      )
    );
    addNotification({
      type: "visit",
      title: "Visit Completed",
      message: "Volunteer visit completed and logged to family dashboard."
    });
  };

  const openRateVolunteerModal = (volunteerOrVolunteerId) => {
    if (typeof volunteerOrVolunteerId === 'string') {
      const found = volunteers.find(v => v.id === volunteerOrVolunteerId) || {
        id: volunteerOrVolunteerId,
        name: "Marcus Chen",
        rating: 4.9,
        reviewsCount: 42
      };
      setSelectedVolunteerForRating(found);
    } else {
      setSelectedVolunteerForRating(volunteerOrVolunteerId);
    }
    setIsRateVolunteerModalOpen(true);
  };

  const rateVolunteer = (volunteerId, { rating, feedback, reviewerName, tags }) => {
    setVolunteers(prev =>
      prev.map(v => {
        if (v.id === volunteerId) {
          const currentTotal = (v.rating || 5.0) * (v.reviewsCount || 1);
          const newCount = (v.reviewsCount || 1) + 1;
          const newRating = Number(((currentTotal + rating) / newCount).toFixed(1));
          const newReview = {
            id: `rev-${Date.now()}`,
            reviewerName: reviewerName || "Eleanor Vance",
            rating,
            feedback,
            tags: tags || [],
            date: "Today"
          };
          return {
            ...v,
            rating: newRating,
            reviewsCount: newCount,
            reviews: [newReview, ...(v.reviews || [])]
          };
        }
        return v;
      })
    );

    addNotification({
      type: "general",
      title: "Review Submitted",
      message: `Rated ${selectedVolunteerForRating?.name || 'Volunteer'} with ${rating} stars ⭐.`
    });
  };

  const startVideoCall = (callConfig) => {
    setActiveVideoCallSession(callConfig || {
      title: "Family & Caregiver Video Room",
      type: "family",
      participants: [
        {
          name: "Sarah Vance",
          role: "Family Guardian",
          avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256&h=256",
          status: "Speaking..."
        },
        {
          name: "Marcus Chen",
          role: "Volunteer Companion",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256",
          status: "Connected"
        }
      ]
    });
    setIsVideoCallModalOpen(true);
    addNotification({
      type: "general",
      title: "Video Call Started",
      message: `Live video interaction active with ${callConfig?.title || 'Family & Volunteer'}.`
    });
  };

  const endVideoCall = () => {
    setIsVideoCallModalOpen(false);
    setActiveVideoCallSession(null);
    addNotification({
      type: "general",
      title: "Video Call Ended",
      message: "Call session concluded and logged to activity feed."
    });
  };

  const bookAppointment = (aptData) => {
    const newApt = {
      id: `apt-${Date.now()}`,
      status: "Scheduled",
      ...aptData
    };
    setAppointments(prev => [newApt, ...prev]);
    addNotification({
      type: "health",
      title: "Appointment Booked",
      message: `${aptData.title} with ${aptData.doctor} on ${aptData.date}.`
    });
  };

  const toggleEventJoin = (eventId) => {
    setSocialEvents(prev =>
      prev.map(ev => {
        if (ev.id === eventId) {
          const isJoined = !ev.joined;
          return {
            ...ev,
            joined: isJoined,
            participants: isJoined ? ev.participants + 1 : ev.participants - 1
          };
        }
        return ev;
      })
    );
  };

  const addNotification = ({ type, title, message }) => {
    const newNotif = {
      id: `notif-${Date.now()}`,
      type: type || "general",
      title,
      message,
      time: "Just now",
      read: false,
      icon:
        type === 'health'
          ? 'favorite'
          : type === 'medication'
          ? 'medication'
          : type === 'visit'
          ? 'event_available'
          : 'notifications',
      badgeColor:
        type === 'health'
          ? 'bg-primary text-white'
          : type === 'medication'
          ? 'bg-amber-500 text-white'
          : type === 'emergency'
          ? 'bg-red-600 text-white'
          : 'bg-primary text-white'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markNotificationRead = (notifId) => {
    setNotifications(prev =>
      prev.map(n => (n.id === notifId ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const triggerEmergencySOS = () => {
    addNotification({
      type: "emergency",
      title: "EMERGENCY SOS TRIGGERED",
      message: `Emergency signal broadcasted for ${currentElderly.name}. Emergency dispatch & family contacts notified.`
    });
    setIsEmergencyModalOpen(true);
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        elderlyProfiles,
        selectedElderlyId,
        setSelectedElderlyId,
        currentElderly,
        updateElderlyVitals,

        volunteers,
        visits,
        scheduleVisit,
        toggleVisitChecklist,
        completeVisit,

        medications,
        toggleMedicationStatus,
        addMedication,
        requestMedRefill,

        wellbeingLogs,
        addWellbeingLog,

        appointments,
        bookAppointment,

        socialEvents,
        toggleEventJoin,

        carePlans,
        selectedPlanId,
        setSelectedPlanId,
        billingInterval,
        setBillingInterval,
        currency,
        setCurrency,

        notifications,
        addNotification,
        markNotificationRead,
        markAllNotificationsRead,
        unreadNotificationCount,

        isEmergencyModalOpen,
        setIsEmergencyModalOpen,
        isNotificationDrawerOpen,
        setIsNotificationDrawerOpen,
        isBookAppointmentModalOpen,
        setIsBookAppointmentModalOpen,
        isScheduleVisitModalOpen,
        setIsScheduleVisitModalOpen,
        isAddMedicationModalOpen,
        setIsAddMedicationModalOpen,
        isRateVolunteerModalOpen,
        setIsRateVolunteerModalOpen,
        selectedVolunteerForRating,
        openRateVolunteerModal,
        rateVolunteer,

        isVideoCallModalOpen,
        setIsVideoCallModalOpen,
        activeVideoCallSession,
        startVideoCall,
        endVideoCall,

        // 7 Distinct Modal & Popup Exports
        toasts,
        showToast,
        dismissToast,
        bookingSuccessData,
        showBookingSuccess,
        hideBookingSuccess,
        isTestimonialSheetOpen,
        setIsTestimonialSheetOpen,
        isAuthDrawerOpen,
        setIsAuthDrawerOpen,
        isSpecialOfferOpen,
        setIsSpecialOfferOpen,
        warningModalData,
        showWarningModal,
        hideWarningModal,

        currentLanguage,
        setLanguage,
        isVoiceAssistantOpen,
        setIsVoiceAssistantOpen,

        triggerEmergencySOS,

        textSize,
        setTextSize,
        highContrast,
        setHighContrast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
