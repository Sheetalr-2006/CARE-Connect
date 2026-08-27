export const initialElderlyProfiles = [
  {
    id: "eld-001",
    name: "Eleanor Vance",
    preferredName: "Ellie",
    age: 78,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256&h=256",
    address: "142 Maplewood Drive, Springfield",
    phone: "+1 (555) 234-5678",
    emergencyContact: {
      name: "Sarah Vance",
      relation: "Daughter (Primary Guardian)",
      phone: "+1 (555) 345-6789",
      email: "sarah.vance@example.com"
    },
    primaryPhysician: {
      name: "Dr. Olivia Reed, MD",
      specialty: "Geriatric Medicine",
      clinic: "Springfield Community Health Center",
      phone: "+1 (555) 901-2345"
    },
    conditions: ["Hypertension", "Mild Osteoarthritis (Left Knee)", "Mild Presbyopia"],
    allergies: ["Penicillin", "Sulfa Drugs"],
    bloodType: "A+",
    careTier: "Comprehensive Plus",
    vitals: {
      bloodPressure: "124/82 mmHg",
      heartRate: "72 bpm",
      bloodSugar: "104 mg/dL",
      oxygenLevel: "98%",
      weight: "62 kg",
      lastUpdated: "Today, 08:30 AM"
    },
    interests: ["Botanical Watercolor", "English Literature", "Herb Gardening", "Classical Piano", "Earl Grey Tea"],
    assistanceNeeds: ["Prescription Medication Reminders", "Accompanied Grocery Trips", "Gentle Mobility Support"],
    notes: "Eleanor enjoys 20-minute morning garden walks. Prefers herbal tea before bed."
  },
  {
    id: "eld-002",
    name: "Arthur Pendelton",
    preferredName: "Artie",
    age: 82,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256&h=256",
    address: "88 Oakridge Terrace, Springfield",
    phone: "+1 (555) 456-7890",
    emergencyContact: {
      name: "David Pendelton",
      relation: "Son",
      phone: "+1 (555) 789-0123",
      email: "david.p@example.com"
    },
    primaryPhysician: {
      name: "Dr. Michael Chang",
      specialty: "Cardiology",
      clinic: "Mercy General",
      phone: "+1 (555) 888-2345"
    },
    conditions: ["Type 2 Diabetes", "Post-Hip Replacement Mobility"],
    allergies: ["Shellfish"],
    bloodType: "O+",
    careTier: "Standard Support",
    vitals: {
      bloodPressure: "128/82 mmHg",
      heartRate: "68 bpm",
      bloodSugar: "118 mg/dL",
      oxygenLevel: "97%",
      weight: "74 kg",
      lastUpdated: "Yesterday, 06:15 PM"
    },
    interests: ["Chess", "Woodworking history", "War Documentaries", "Bird Watching"],
    assistanceNeeds: ["Mobility Exercises", "Nutritional Meal Prep", "Tech Assistance"],
    notes: "Arthur enjoys 15-minute chess puzzles daily and loves sharing stories about his architecture career."
  }
];

export const initialVolunteers = [
  {
    id: "vol-001",
    name: "Marcus Chen",
    role: "Senior Companion Volunteer",
    age: 26,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256",
    rating: 4.9,
    reviewsCount: 38,
    hourlyRate: "$0 (Free Community Volunteer)",
    serviceRates: [
      { service: "Companionship & Conversation", rate: "$0 / hr (Free Community)" },
      { service: "Garden & Patio Strolls", rate: "$0 / hr (Free Community)" },
      { service: "Vital Signs & Blood Pressure Check", rate: "$12 / hr (Specialized Aide)" },
      { service: "Medical Clinic Escort", rate: "$15 / hr (Transport Assistance)" }
    ],
    distance: "1.2 miles away",
    location: "Springfield North",
    degrees: ["B.S. Nursing (Pre-Med)", "First Aid & CPR Certified"],
    skills: ["Vital Monitoring", "Active Listening", "Gardening", "Patience", "Chess"],
    backgroundVerified: true,
    verificationDate: "2026-01-15",
    languages: ["English", "Mandarin"],
    bio: "Passionate nursing graduate committed to bringing joy, companionship, and active support to seniors in our community.",
    availability: ["Monday Mornings", "Wednesday Afternoons", "Saturday All-day"],
    compatibilityScore: 98,
    completedVisits: 64,
    status: "Active & Available"
  },
  {
    id: "vol-002",
    name: "Elena Rostova",
    role: "Arts & Wellness Companion",
    age: 29,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=256&h=256",
    rating: 5.0,
    reviewsCount: 42,
    hourlyRate: "$15 / hr (Certified Art Aide)",
    serviceRates: [
      { service: "Watercolor & Art Therapy Guidance", rate: "$15 / hr" },
      { service: "Cognitive Memory & Reading Games", rate: "$15 / hr" },
      { service: "Tea Session & Storytelling", rate: "$0 / hr (Free Volunteer)" }
    ],
    distance: "2.4 miles away",
    location: "Springfield Central",
    degrees: ["M.A. Art Therapy", "Certified Elder Caregiver"],
    skills: ["Watercolor Instruction", "Cognitive Memory Games", "Book Reading", "Gentle Mobility"],
    backgroundVerified: true,
    verificationDate: "2026-02-10",
    languages: ["English", "Russian"],
    bio: "Art therapist with 5 years experience creating joyful and engaging creative sessions for elder adults.",
    availability: ["Tuesday Afternoons", "Thursday Mornings", "Sunday Mornings"],
    compatibilityScore: 94,
    completedVisits: 82,
    status: "Active & Available"
  },
  {
    id: "vol-003",
    name: "David Miller",
    role: "Tech & Physical Mobility Helper",
    age: 31,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256",
    rating: 4.8,
    reviewsCount: 29,
    hourlyRate: "$0 (Community Volunteer)",
    serviceRates: [
      { service: "Smartphone & Tablet Tech Setup", rate: "$0 / hr (Free Community)" },
      { service: "Assisted Walking & Mobility Balance", rate: "$18 / hr (Kinesiology Aide)" },
      { service: "Grocery Escort & Errand Help", rate: "$0 / hr (Free Community)" }
    ],
    distance: "3.1 miles away",
    location: "Springfield East",
    degrees: ["B.S. Physical Kinesiology", "Safe Transport Certified"],
    skills: ["Assisted Walking", "Device & Tablet Setup", "Grocery Pickup", "Outdoor Walks"],
    backgroundVerified: true,
    verificationDate: "2026-03-01",
    languages: ["English", "Spanish"],
    bio: "Physical trainer focusing on gentle mobility, balance stability, and helping seniors stay connected digitally with loved ones.",
    availability: ["Weekdays 3PM - 7PM"],
    compatibilityScore: 89,
    completedVisits: 51,
    status: "Active & Available"
  },
  {
    id: "vol-004",
    name: "Priya Sharma",
    role: "Nutrition & Music Companion",
    age: 24,
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=256&h=256",
    rating: 4.95,
    reviewsCount: 19,
    distance: "0.8 miles away",
    location: "Springfield South",
    degrees: ["B.A. Music & Psychology", "Senior Nutrition Specialist"],
    skills: ["Classical Piano", "Healthy Meal Prep", "Medication Cueing", "Story Sharing"],
    backgroundVerified: true,
    verificationDate: "2026-04-12",
    languages: ["English", "Hindi"],
    bio: "Music lover dedicated to bringing melody, healthy homemade snacks, and warm daily cheer to elderly households.",
    availability: ["Flexible / On-call"],
    compatibilityScore: 96,
    completedVisits: 37,
    status: "Active & Available"
  }
];

export const initialVisits = [
  {
    id: "vis-001",
    elderlyId: "eld-001",
    elderlyName: "Eleanor Vance",
    volunteerId: "vol-001",
    volunteerName: "Marcus Chen",
    visitCategory: "Volunteer Companion",
    date: "2026-08-26",
    time: "10:30 AM - 12:00 PM",
    activityType: "Garden Walk & Medication Review",
    location: "142 Maplewood Drive (Home Visit)",
    status: "Upcoming",
    notes: "Watering the greenhouse orchids and practicing 15-minute patio balance steps.",
    checklist: [
      { id: "c1", task: "Check blood pressure upon arrival", done: false },
      { id: "c2", task: "Assisted 20-min garden stroll", done: false },
      { id: "c3", task: "Verify noon prescription box", done: false }
    ]
  },
  {
    id: "vis-002",
    elderlyId: "eld-001",
    elderlyName: "Eleanor Vance",
    volunteerId: "vol-002",
    volunteerName: "Elena Rostova",
    visitCategory: "Creative Arts",
    date: "2026-08-28",
    time: "02:00 PM - 04:00 PM",
    activityType: "Watercolor Landscape Session",
    location: "Living Room Art Corner",
    status: "Upcoming",
    notes: "Botanical illustration painting session using non-toxic water-soluble pigments.",
    checklist: [
      { id: "c4", task: "Set up ergonomic easel and warm tea", done: false },
      { id: "c5", task: "45-min guided painting session", done: false },
      { id: "c6", task: "Photo update sent to family dashboard", done: false }
    ]
  },
  {
    id: "vis-003",
    elderlyId: "eld-001",
    elderlyName: "Eleanor Vance",
    volunteerId: "vol-001",
    volunteerName: "Sarah Vance (Family)",
    visitCategory: "Family Quality Time",
    date: "2026-08-29",
    time: "04:30 PM - 07:00 PM",
    activityType: "Family Sunday Roast & Grandkids Catch-Up",
    location: "Eleanor's Dining Room",
    status: "Upcoming",
    notes: "Family dinner with homemade vegetable pot pie and reviewing photo album from summer holiday.",
    checklist: [
      { id: "c10", task: "Prep favorite chamomile blend", done: false },
      { id: "c11", task: "Setup grandchildren video call link", done: false }
    ]
  },
  {
    id: "vis-004",
    elderlyId: "eld-001",
    elderlyName: "Eleanor Vance",
    volunteerId: "vol-003",
    volunteerName: "David Miller",
    visitCategory: "Mobility & Errands",
    date: "2026-08-31",
    time: "11:00 AM - 01:00 PM",
    activityType: "Farmer's Market & Fresh Produce Stroll",
    location: "Springfield Historic Market Square",
    status: "Upcoming",
    notes: "Visiting organic honey and fresh peach stalls with wheelchair transport assistance on standby.",
    checklist: [
      { id: "c12", task: "Bring portable walking cane", done: false },
      { id: "c13", task: "Hydration bottle refilled", done: false }
    ]
  },
  {
    id: "vis-005",
    elderlyId: "eld-001",
    elderlyName: "Eleanor Vance",
    volunteerId: "vol-004",
    volunteerName: "Priya Sharma",
    visitCategory: "Music & Mental Wellbeing",
    date: "2026-09-02",
    time: "03:00 PM - 04:30 PM",
    activityType: "Classical Piano Recital & Herbal Tea Hour",
    location: "Home Piano Parlor",
    status: "Upcoming",
    notes: "Listening to Chopin nocturnes and preparing warm cinnamon almond milk tea.",
    checklist: [
      { id: "c14", task: "Warm tea service", done: false },
      { id: "c15", task: "Memory reflection notes", done: false }
    ]
  },
  {
    id: "vis-006",
    elderlyId: "eld-001",
    elderlyName: "Eleanor Vance",
    volunteerId: "vol-001",
    volunteerName: "Marcus Chen",
    visitCategory: "Volunteer Companion",
    date: "2026-08-24",
    time: "10:30 AM - 12:00 PM",
    activityType: "Afternoon Tea & Reading Session",
    location: "Home Visit",
    status: "Completed",
    notes: "Read chapters 3 & 4 of Jane Eyre together. Eleanor was in wonderful spirits and drank 2 cups of chamomile tea.",
    feedback: "Eleanor was cheerful and energetic. Blood pressure was completely normal (120/78).",
    checklist: [
      { id: "c7", task: "Vitals log", done: true },
      { id: "c8", task: "Hydration check", done: true },
      { id: "c9", task: "Light walking", done: true }
    ]
  }
];

export const initialMedications = [
  {
    id: "med-001",
    name: "Lisinopril",
    dosage: "10 mg",
    timing: "Morning (08:00 AM)",
    mealInstruction: "Take with food & full glass of water",
    purpose: "Blood Pressure Regulation",
    status: "Taken",
    takenAt: "08:15 AM Today",
    pillColor: "#FF5A1F",
    remainingDays: 18,
    refillNeeded: false
  },
  {
    id: "med-002",
    name: "Glucosamine & Chondroitin",
    dosage: "500 mg",
    timing: "Afternoon (01:00 PM)",
    mealInstruction: "Take after lunch",
    purpose: "Joint Mobility & Cartilage Support",
    status: "Pending",
    takenAt: null,
    pillColor: "#e1dfdb",
    remainingDays: 24,
    refillNeeded: false
  },
  {
    id: "med-003",
    name: "Calcium + Vitamin D3",
    dosage: "600 mg / 400 IU",
    timing: "Evening (07:30 PM)",
    mealInstruction: "Take with dinner",
    purpose: "Bone Strength",
    status: "Pending",
    takenAt: null,
    pillColor: "#FFE8DF",
    remainingDays: 5,
    refillNeeded: true
  },
  {
    id: "med-004",
    name: "CoQ10 Heart Support",
    dosage: "100 mg",
    timing: "Morning (08:00 AM)",
    mealInstruction: "With morning meal",
    purpose: "Cardiovascular Health",
    status: "Taken",
    takenAt: "08:15 AM Today",
    pillColor: "#ffdad6",
    remainingDays: 14,
    refillNeeded: false
  }
];

export const initialWellbeingLogs = [
  {
    id: "wb-001",
    date: "Today, 08:45 AM",
    mood: "Happy & Relaxed",
    moodScore: 5,
    painLevel: 1, // 0 - 5
    sleepHours: 8,
    sleepQuality: "Restful & Uninterrupted",
    appetite: "Good / Ate full breakfast",
    energyLevel: "High",
    notes: "Slept smoothly through the night. Excited for garden stroll with Marcus today."
  },
  {
    id: "wb-002",
    date: "Yesterday, 08:30 AM",
    mood: "Calm",
    moodScore: 4,
    painLevel: 2,
    sleepHours: 7,
    sleepQuality: "Moderate",
    appetite: "Normal",
    energyLevel: "Moderate",
    notes: "Mild knee stiffness in early morning which resolved after warm towel compress."
  },
  {
    id: "wb-003",
    date: "2 days ago, 09:00 AM",
    mood: "Joyful",
    moodScore: 5,
    painLevel: 0,
    sleepHours: 8.5,
    sleepQuality: "Excellent",
    appetite: "Great",
    energyLevel: "High",
    notes: "Enjoyed watercolor session. Completed beautiful flower painting."
  }
];

export const initialAppointments = [
  {
    id: "apt-001",
    title: "Cardiology Routine Checkup",
    doctor: "Dr. Olivia Reed, MD",
    facility: "Springfield Heart & Vascular Pavilion",
    date: "2026-08-30",
    time: "11:00 AM",
    type: "In-Person",
    transportAssistance: true,
    transportStatus: "Driver Confirmed (Volunteer: David Miller)",
    notes: "Bring recent blood pressure logs and current medication list.",
    status: "Confirmed"
  },
  {
    id: "apt-002",
    title: "Annual Eye & Vision Exam",
    doctor: "Dr. Jonathan Hayes, OD",
    facility: "ClearSight Optometry Center",
    date: "2026-09-08",
    time: "02:30 PM",
    type: "In-Person",
    transportAssistance: true,
    transportStatus: "Transport Pending Assignment",
    notes: "Pupil dilation planned. Sunglasses required for return trip.",
    status: "Scheduled"
  },
  {
    id: "apt-003",
    title: "Telehealth Wellness Consultation",
    doctor: "Dr. Sarah Jenkins",
    facility: "CareConnect Virtual Care Room",
    date: "2026-09-15",
    time: "04:00 PM",
    type: "Virtual Video Call",
    transportAssistance: false,
    transportStatus: "N/A",
    notes: "Review monthly wellbeing logs and joint flexibility progress.",
    status: "Scheduled"
  }
];

// EXACT 20 VIBRANT, DIVERSE COMMUNITY & FAMILY EVENTS
export const initialSocialEvents = [
  {
    id: "soc-001",
    title: "Morning Garden & Walking Circle",
    host: "Springfield Senior Community Park",
    time: "Tomorrow, 09:30 AM",
    date: "2026-08-27",
    location: "Rose Garden Pergola",
    category: "Outdoor & Nature",
    participants: 14,
    image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=400&h=240",
    joined: true,
    familyFriendly: true,
    description: "A gentle 20-minute shaded stroll through floral pathways followed by refreshing herbal tea and lively conversation."
  },
  {
    id: "soc-002",
    title: "Memory Lane Book & Story Club",
    host: "Elena Rostova",
    time: "Thursday, 03:00 PM",
    date: "2026-08-28",
    location: "Community Library Lounge & Online",
    category: "Literature & Culture",
    participants: 9,
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=400&h=240",
    joined: true,
    familyFriendly: false,
    description: "Discussing classic 20th-century historical novels and sharing warm personal stories over Earl Grey tea."
  },
  {
    id: "soc-003",
    title: "Gentle Chair Yoga & Breathwork",
    host: "Maya Patel, Certified Yoga Instructor",
    time: "Friday, 10:00 AM",
    date: "2026-08-29",
    location: "CareConnect Virtual Wellness Hub",
    category: "Health & Mobility",
    participants: 22,
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=400&h=240",
    joined: false,
    familyFriendly: true,
    description: "Accessible seated stretching exercises designed to soothe joints, enhance flexibility, and promote calm breathing."
  },
  {
    id: "soc-004",
    title: "Classical Melodies & Choir Matinee",
    host: "Springfield Youth Orchestra & Priya Sharma",
    time: "Saturday, 04:00 PM",
    date: "2026-08-30",
    location: "Grand Heritage Hall",
    category: "Music & Entertainment",
    participants: 34,
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=400&h=240",
    joined: true,
    familyFriendly: true,
    description: "A delightful afternoon of Mozart, Bach, and classic show tunes performed live with complimentary pastries."
  },
  {
    id: "soc-005",
    title: "Watercolor & Botanical Art Workshop",
    host: "Elena Rostova (Art Therapist)",
    time: "Sunday, 02:00 PM",
    date: "2026-08-31",
    location: "Sunlight Community Studio",
    category: "Arts & Creativity",
    participants: 12,
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=400&h=240",
    joined: false,
    familyFriendly: true,
    description: "Learn gentle botanical watercolor techniques. All non-toxic paints, paper, and brushes provided free of charge."
  },
  {
    id: "soc-006",
    title: "Grandparents & Youth Cookie Baking Social",
    host: "Community Culinary Center",
    time: "Monday, 03:30 PM",
    date: "2026-09-01",
    location: "Heritage Kitchen Pavillion",
    category: "Family & Intergenerational",
    participants: 18,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400&h=240",
    joined: true,
    familyFriendly: true,
    description: "Baking traditional cinnamon cookies and apple tarts together with local volunteer youth and grandchildren."
  },
  {
    id: "soc-007",
    title: "Intergenerational Chess & Scrabble Derby",
    host: "Arthur Pendelton & Marcus Chen",
    time: "Tuesday, 02:30 PM",
    date: "2026-09-02",
    location: "Maplewood Recreation Clubhouse",
    category: "Games & Brain Health",
    participants: 16,
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=400&h=240",
    joined: false,
    familyFriendly: true,
    description: "Friendly tactical matches, puzzle stations, and Scrabble tables designed to sharpen memory and strategic thinking."
  },
  {
    id: "soc-008",
    title: "Golden Era Cinema: 'Singin' in the Rain' (1952)",
    host: "Historic Springfield Roxy Theater",
    time: "Wednesday, 02:00 PM",
    date: "2026-09-03",
    location: "Roxy Classic Screening Room",
    category: "Movie & Cinema",
    participants: 28,
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=400&h=240",
    joined: true,
    familyFriendly: true,
    isMovie: true,
    movieInfo: {
      filmTitle: "Singin' in the Rain",
      year: "1952",
      runtime: "103 mins",
      genre: "Musical / Comedy / Romance",
      starring: "Gene Kelly, Debbie Reynolds, Donald O'Connor",
      rating: "G (All Ages)",
      audioAccessibility: "High-Contrast Large Subtitles & T-Coil Hearing Loop",
      seating: "Plush Velvet Recliners with Wheelchair Access",
      treats: "Free Warm Buttered Popcorn, Sugar-Free Choc-Ice & Chamomile Tea"
    },
    description: "Enjoy Gene Kelly and Debbie Reynolds in this timeless musical masterpiece on the big screen with soft theater recliners and fresh buttery popcorn."
  },
  {
    id: "soc-008b",
    title: "Vintage Cinema: 'The Sound of Music' (1965)",
    host: "Community Arts Cinema Pavilion",
    time: "Sunday, 02:30 PM",
    date: "2026-09-06",
    location: "Grand Screen Room 1",
    category: "Movie & Cinema",
    participants: 36,
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&q=80&w=400&h=240",
    joined: true,
    familyFriendly: true,
    isMovie: true,
    movieInfo: {
      filmTitle: "The Sound of Music",
      year: "1965",
      runtime: "172 mins (with 15-min Intermission)",
      genre: "Musical / Family / Drama",
      starring: "Julie Andrews, Christopher Plummer",
      rating: "G (Family Friendly)",
      audioAccessibility: "Hearing loop equipped with optional amplified personal headphones",
      seating: "Ergonomic high-back armchair seating with companion side tables",
      treats: "Hot Apple Strudel, Swiss Hot Cocoa & Butter Popcorn"
    },
    description: "Sing along to 'Do-Re-Mi' and 'Edelweiss' in Salzburg's breathtaking hills. Includes an intermission with hot apple strudel."
  },
  {
    id: "soc-008c",
    title: "Classic Mystery Matinee: 'Rear Window' (1954)",
    host: "Alfred Hitchcock Film Society",
    time: "Friday, 06:00 PM",
    date: "2026-09-11",
    location: "Studio 4 Heritage Lounge",
    category: "Movie & Cinema",
    participants: 22,
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=400&h=240",
    joined: false,
    familyFriendly: false,
    isMovie: true,
    movieInfo: {
      filmTitle: "Rear Window",
      year: "1954",
      runtime: "112 mins",
      genre: "Mystery / Thriller",
      starring: "James Stewart, Grace Kelly",
      rating: "PG",
      audioAccessibility: "Closed captioning enabled & crystal clear dynamic stereo",
      seating: "Cozy leather club chairs with footrests",
      treats: "Artisan Pretzels, Sparkling Apple Cider & Dark Chocolate Truffles"
    },
    description: "Experience the peak of suspense with James Stewart and Grace Kelly in Hitchcock's color masterpiece."
  },
  {
    id: "soc-008d",
    title: "Audrey Hepburn Matinee: 'Roman Holiday' (1953)",
    host: "Springfield Classic Film Club",
    time: "Saturday, 03:00 PM",
    date: "2026-09-13",
    location: "Rosewood Screening Parlor",
    category: "Movie & Cinema",
    participants: 25,
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=400&h=240",
    joined: true,
    familyFriendly: true,
    isMovie: true,
    movieInfo: {
      filmTitle: "Roman Holiday",
      year: "1953",
      runtime: "118 mins",
      genre: "Romantic Comedy",
      starring: "Audrey Hepburn, Gregory Peck",
      rating: "G",
      audioAccessibility: "Subtitled and audio-enhanced for elderly clarity",
      seating: "Memory foam recliners with warm fleece lap blankets",
      treats: "Italian Gelato cups, Espresso & Biscotti"
    },
    description: "Travel to Rome on a vintage Vespa with Audrey Hepburn in her Oscar-winning role, accompanied by authentic Italian gelato."
  },
  {
    id: "soc-009",
    title: "Smartphone & Tablet Digital Skills Clinic",
    host: "David Miller & High School Volunteer Corps",
    time: "Thursday, 11:00 AM",
    date: "2026-09-04",
    location: "Community Tech Hub Room B",
    category: "Learning & Tech",
    participants: 15,
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400&h=240",
    joined: false,
    familyFriendly: false,
    description: "One-on-one patient guidance on setting up video calls, family photo sharing, audiobooks, and accessibility text sizing."
  },
  {
    id: "soc-010",
    title: "Therapy Dogs & Golden Retriever Meetup",
    host: "Paws of Joy Therapy Animal Network",
    time: "Friday, 03:00 PM",
    date: "2026-09-05",
    location: "Pine Grove Shaded Lawn",
    category: "Wellness & Pet Therapy",
    participants: 30,
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=400&h=240",
    joined: true,
    familyFriendly: true,
    description: "Spend a relaxing afternoon petting certified gentle golden retrievers and therapy poodles. proven to lower blood pressure!"
  },
  {
    id: "soc-011",
    title: "Spring Flower Arranging & Herbal Masterclass",
    host: "Greenhouse Guild",
    time: "Saturday, 10:30 AM",
    date: "2026-09-06",
    location: "Botanical Conservatory",
    category: "Outdoor & Nature",
    participants: 14,
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=400&h=240",
    joined: false,
    familyFriendly: true,
    description: "Create your own centerpiece with lavender, chamomile, and garden roses to bring home to your living room."
  },
  {
    id: "soc-012",
    title: "Traditional High Tea & Scone Social",
    host: "St. Clair Manor House",
    time: "Sunday, 03:00 PM",
    date: "2026-09-07",
    location: "Manor Terrace Garden",
    category: "Dining & Social",
    participants: 25,
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=400&h=240",
    joined: true,
    familyFriendly: true,
    description: "A three-tier Victorian tea service with clotted cream scones, cucumber sandwiches, and harp accompaniment."
  },
  {
    id: "soc-013",
    title: "Springfield Symphony Hall Group Excursion",
    host: "CareConnect Culture Transit",
    time: "Monday, 06:30 PM",
    date: "2026-09-08",
    location: "Springfield Symphony Hall",
    category: "Music & Entertainment",
    participants: 20,
    image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=400&h=240",
    joined: false,
    familyFriendly: true,
    description: "Wheelchair-accessible luxury coach shuttle to Beethoven's Fifth Symphony with VIP orchestra seating."
  },
  {
    id: "soc-014",
    title: "Senior Tai Chi for Balance & Posture",
    host: "Master Liang Chen",
    time: "Tuesday, 09:00 AM",
    date: "2026-09-09",
    location: "Oakview Shaded Pavilion",
    category: "Health & Mobility",
    participants: 19,
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=400&h=240",
    joined: true,
    familyFriendly: false,
    description: "Slow, fluid movements designed specifically to strengthen leg muscles, prevent falls, and improve equilibrium."
  },
  {
    id: "soc-015",
    title: "Bingo Extravaganza & Golden Trivia Night",
    host: "Springfield Rotary Club",
    time: "Wednesday, 06:00 PM",
    date: "2026-09-10",
    location: "Community Center Grand Hall",
    category: "Games & Brain Health",
    participants: 45,
    image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=400&h=240",
    joined: false,
    familyFriendly: true,
    description: "Fun prizes, nostalgic 60s/70s trivia questions, large-print bingo cards, and delicious fruit mocktails."
  },
  {
    id: "soc-016",
    title: "Family Lakeside Barbecue & Picnic Gathering",
    host: "CareConnect Family Network",
    time: "Thursday, 12:00 PM",
    date: "2026-09-11",
    location: "Crystal Lake Pavilion A",
    category: "Family & Intergenerational",
    participants: 38,
    image: "https://images.unsplash.com/photo-1533777857889-4be7c70e33f7?auto=format&fit=crop&q=80&w=400&h=240",
    joined: true,
    familyFriendly: true,
    description: "Bring the children and grandchildren! Grilled delicacies, lawn croquet, acoustic guitar, and shaded picnic benches."
  },
  {
    id: "soc-017",
    title: "Mindfulness & Peaceful Sound Bath Meditation",
    host: "Serenity Sound Healers",
    time: "Friday, 11:30 AM",
    date: "2026-09-12",
    location: "CareConnect Wellness Studio",
    category: "Health & Mobility",
    participants: 15,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400&h=240",
    joined: false,
    familyFriendly: false,
    description: "Immerse in Tibetan singing bowls and gentle chimes to release muscular tension and reduce anxiety."
  },
  {
    id: "soc-018",
    title: "Community Health & Free Vitals Wellness Fair",
    host: "Mercy General Geriatric Outreach",
    time: "Saturday, 09:00 AM",
    date: "2026-09-13",
    location: "Civic Plaza Health Tent",
    category: "Health & Mobility",
    participants: 50,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=400&h=240",
    joined: true,
    familyFriendly: true,
    description: "Free blood sugar checks, vision screenings, bone density consultations, and nutritional meal advice."
  },
  {
    id: "soc-019",
    title: "Gentle Waltz & Ballroom Dancing Social",
    host: "Springfield Dance Academy",
    time: "Sunday, 04:00 PM",
    date: "2026-09-14",
    location: "Grand Ballroom & Parquet Lounge",
    category: "Music & Entertainment",
    participants: 26,
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=400&h=240",
    joined: false,
    familyFriendly: true,
    description: "Step onto the dance floor for slow waltzes and foxtrots with volunteer dance partners. Seated clapping encouraged!"
  },
  {
    id: "soc-020",
    title: "Stargazing, Astronomy & Warm Cocoa Night Walk",
    host: "Springfield Amateur Astronomers Guild",
    time: "Monday, 07:30 PM",
    date: "2026-09-15",
    location: "Observatory Hill Vista",
    category: "Outdoor & Nature",
    participants: 18,
    image: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&q=80&w=400&h=240",
    joined: true,
    familyFriendly: true,
    description: "Peer through powerful high-power telescopes to view Saturn's rings and the Moon while sipping hot Swiss cocoa."
  }
];

export const initialCarePlans = [
  {
    id: "plan-essential",
    name: "Essential Companionship",
    tier: "Starter Tier",
    priceMonthlyUSD: 29,
    priceAnnualUSD: 290,
    priceMonthlyINR: 2400,
    priceAnnualINR: 24000,
    recommended: false,
    description: "Ideal for independent seniors seeking regular friendly social visits and reassurance.",
    features: [
      "2 Verified Volunteer Companion Visits per month",
      "Weekly automated wellbeing phone check-in",
      "Emergency SOS dispatch & Family Guardian alerts",
      "Access to community social groups & event calendar",
      "Basic health telemetry tracking (BP & Heart Rate)"
    ]
  },
  {
    id: "plan-assisted",
    name: "Comprehensive Care Plus",
    tier: "Most Popular",
    priceMonthlyUSD: 79,
    priceAnnualUSD: 790,
    priceMonthlyINR: 6500,
    priceAnnualINR: 65000,
    recommended: true,
    description: "Full-spectrum care with priority companion booking, doctor clinic escort, and continuous telemetry.",
    features: [
      "8 Dedicated Volunteer Companion Visits per month",
      "2 Door-to-door medical transport rides with companion escort",
      "24/7 Real-time vital sign telemetry & anomaly detection",
      "Priority HD video telecare sessions with family & doctor",
      "Medication adherence management & automatic pharmacy refill",
      "Comprehensive monthly geriatric wellbeing health report"
    ]
  },
  {
    id: "plan-concierge",
    name: "Family VIP Concierge",
    tier: "All-Inclusive",
    priceMonthlyUSD: 149,
    priceAnnualUSD: 1490,
    priceMonthlyINR: 12500,
    priceAnnualINR: 125000,
    recommended: false,
    description: "White-glove 24/7 concierge assistance, unlimited transport, and specialized nurse health management.",
    features: [
      "Unlimited Volunteer Companion visits & flexible on-demand care",
      "Dedicated Registered Nurse Care Manager assigned to family",
      "Unlimited medical transportation & clinic companion escort",
      "Direct integration with hospital EMR & specialist doctors",
      "Custom nutritional meal delivery & smart home IoT sensor suite",
      "24/7 Priority Emergency dispatch with dedicated hotline"
    ]
  }
];

export const initialNotifications = [
  {
    id: "notif-001",
    title: "Upcoming Companion Visit Today",
    message: "Marcus Chen is arriving at 10:30 AM for a gentle garden walk.",
    timestamp: "10 minutes ago",
    read: false,
    type: "visit"
  },
  {
    id: "notif-002",
    title: "Morning Medication Due",
    message: "Time for Lisinopril (10mg) with a glass of water.",
    timestamp: "1 hour ago",
    read: true,
    type: "medication"
  },
  {
    id: "notif-003",
    title: "New Community Event Scheduled",
    message: "Family Lakeside Barbecue & Picnic Gathering added for Sept 11.",
    timestamp: "3 hours ago",
    read: false,
    type: "event"
  }
];

export const demoUsers = [
  {
    id: "demo-eld-001",
    name: "Eleanor Vance",
    email: "eleanor.vance@example.com",
    role: "elderly",
    roleLabel: "Elderly Care Recipient",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256&h=256",
    details: "Age 78 • Comprehensive Care Plus Member"
  },
  {
    id: "demo-fam-001",
    name: "Sarah Vance",
    email: "sarah.vance@example.com",
    role: "family",
    roleLabel: "Family Guardian",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256&h=256",
    details: "Daughter & Primary Caregiver"
  },
  {
    id: "demo-vol-001",
    name: "Marcus Chen",
    email: "marcus.chen@example.com",
    role: "volunteer",
    roleLabel: "Certified Volunteer Aide",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256",
    details: "Pre-Med Nursing Graduate • 4.9⭐ (38 reviews)"
  }
];
