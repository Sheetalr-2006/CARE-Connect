import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  Users, 
  Building, 
  Calendar, 
  Check, 
  Menu, 
  X, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Coffee, 
  Wifi, 
  Clock, 
  ShieldCheck,
  CalendarCheck
} from 'lucide-react';

export const TheStationPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  
  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    people: '1 person',
    workspaceType: 'Hot Desk',
    date: new Date().toISOString().split('T')[0]
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
  };

  const scrollTo = (id) => (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF7] text-[#1F4550] font-sans antialiased selection:bg-[#4C9DB0] selection:text-white">
      
      {/* 1. NAVBAR */}
      <header className="sticky top-0 z-40 bg-[#FFFDF7]/95 backdrop-blur-md border-b border-[#E8E4D8]/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-[#1F4550] hover:bg-[#FFEBAF]/40 transition-colors"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <a href="#home" onClick={scrollTo('home')} className="flex items-center gap-3 group">
              {/* Geometric House/Station Mark */}
              <div className="w-10 h-10 rounded-xl bg-[#336E7D] text-[#FFFDF7] flex items-center justify-center shadow-xs transition-transform group-hover:scale-105">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M3 10.5L12 3l9 7.5" />
                  <path d="M5 9v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9" />
                  <path d="M9 21v-7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v7" />
                  <path d="M12 7v3" />
                </svg>
              </div>
              <div className="leading-tight">
                <span className="font-serif font-bold text-xl sm:text-2xl text-[#1F4550] tracking-tight block">
                  The Station
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.2em] text-[#4C9DB0] block -mt-0.5">
                  COWORKING SPACE
                </span>
              </div>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#1F4550]/80">
            <a href="#home" onClick={scrollTo('home')} className="text-[#1F4550] font-bold border-b-2 border-[#4C9DB0] pb-0.5 transition-colors">
              Home
            </a>
            <a href="#about" onClick={scrollTo('about')} className="hover:text-[#4C9DB0] transition-colors">
              About
            </a>
            <a href="#spaces" onClick={scrollTo('spaces')} className="hover:text-[#4C9DB0] transition-colors">
              Spaces
            </a>
            <a href="#events" onClick={scrollTo('events')} className="hover:text-[#4C9DB0] transition-colors">
              Events
            </a>
            <a href="#contact" onClick={scrollTo('contact')} className="hover:text-[#4C9DB0] transition-colors">
              Contact
            </a>
          </nav>

          {/* Right Action Button */}
          <div className="flex items-center gap-3">
            <a
              href="#book"
              onClick={scrollTo('book')}
              className="h-10 sm:h-11 px-5 sm:px-6 rounded-full bg-[#336E7D] hover:bg-[#285864] text-white text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition-all active:scale-95 flex items-center justify-center"
            >
              Book a Space
            </a>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[#E8E4D8] bg-[#FFFDF7] px-4 py-4 space-y-2 animate-in fade-in">
            <a href="#home" onClick={scrollTo('home')} className="block px-3 py-2 rounded-lg font-bold text-[#1F4550] bg-[#FFEBAF]/50">
              Home
            </a>
            <a href="#about" onClick={scrollTo('about')} className="block px-3 py-2 rounded-lg font-medium text-[#1F4550] hover:bg-[#FFEBAF]/30">
              About Us
            </a>
            <a href="#spaces" onClick={scrollTo('spaces')} className="block px-3 py-2 rounded-lg font-medium text-[#1F4550] hover:bg-[#FFEBAF]/30">
              Our Spaces
            </a>
            <a href="#events" onClick={scrollTo('events')} className="block px-3 py-2 rounded-lg font-medium text-[#1F4550] hover:bg-[#FFEBAF]/30">
              Events & Community
            </a>
            <a href="#contact" onClick={scrollTo('contact')} className="block px-3 py-2 rounded-lg font-medium text-[#1F4550] hover:bg-[#FFEBAF]/30">
              Contact Us
            </a>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION (Warm Vanilla Background) */}
      <section id="home" className="bg-[#FFF6DE] border-b border-[#EADDBF]/60 pt-8 sm:pt-14 pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: 2x2 Collage of 4 Rounded-Rectangle Illustrated Panels */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-3.5 sm:gap-4 max-w-lg mx-auto lg:max-w-none">
                
                {/* Panel 1: Desk Scene with Window */}
                <div className="bg-[#4C9DB0]/15 rounded-3xl p-4 sm:p-5 aspect-square flex flex-col justify-between relative overflow-hidden border border-[#4C9DB0]/20 shadow-xs hover:scale-[1.02] transition-transform duration-300">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* Window Frame */}
                    <rect x="25" y="20" width="150" height="95" rx="8" fill="#D2E8ED" />
                    <line x1="100" y1="20" x2="100" y2="115" stroke="#FFFDF7" strokeWidth="3" />
                    <line x1="25" y1="67" x2="175" y2="67" stroke="#FFFDF7" strokeWidth="3" />
                    {/* City Silhouette */}
                    <rect x="40" y="55" width="22" height="60" fill="#99C9D4" rx="2" />
                    <rect x="70" y="40" width="25" height="75" fill="#B3D9E2" rx="2" />
                    <rect x="110" y="50" width="28" height="65" fill="#99C9D4" rx="2" />
                    <rect x="145" y="65" width="20" height="50" fill="#B3D9E2" rx="2" />
                    {/* Ceiling Pendant Lamp */}
                    <line x1="100" y1="0" x2="100" y2="28" stroke="#1F4550" strokeWidth="2.5" />
                    <path d="M88 38 L100 28 L112 38 Z" fill="#1F4550" />
                    {/* Desk Surface */}
                    <rect x="10" y="125" width="180" height="14" rx="3" fill="#E8C988" />
                    <rect x="20" y="139" width="10" height="50" rx="2" fill="#CFB06E" />
                    <rect x="170" y="139" width="10" height="50" rx="2" fill="#CFB06E" />
                    {/* Laptop on Desk */}
                    <rect x="68" y="105" width="48" height="28" rx="3" fill="#336E7D" />
                    <rect x="72" y="108" width="40" height="22" rx="2" fill="#FFFDF7" />
                    <polygon points="60,132 124,132 118,137 66,137" fill="#1F4550" />
                    {/* Coffee Mug */}
                    <rect x="135" y="118" width="14" height="14" rx="2" fill="#4C9DB0" />
                    <path d="M149 121 A 4 4 0 0 1 149 129" stroke="#4C9DB0" strokeWidth="2" fill="none" />
                    {/* Potted Mini Plant */}
                    <rect x="35" y="120" width="14" height="10" rx="2" fill="#FFFDF7" />
                    <path d="M42 120 C 35 110, 40 98, 42 98 C 44 98, 49 110, 42 120 Z" fill="#336E7D" />
                  </svg>
                </div>

                {/* Panel 2: Potted Monstera Botanical Plant */}
                <div className="bg-[#FFEBAF] rounded-3xl p-4 sm:p-5 aspect-square flex items-center justify-center relative overflow-hidden border border-[#E8D49E] shadow-xs hover:scale-[1.02] transition-transform duration-300">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* Background Soft Glow */}
                    <circle cx="100" cy="95" r="65" fill="#FFF6DE" />
                    {/* Ceramic Pot */}
                    <ellipse cx="100" cy="148" rx="32" ry="10" fill="#FFFDF7" />
                    <path d="M70 148 L76 178 Q 100 188 124 178 L130 148 Z" fill="#FFFDF7" stroke="#E5DAC0" strokeWidth="1" />
                    {/* Plant Leaves */}
                    {/* Leaf 1 (Center Left) */}
                    <path d="M98 145 Q 60 120 52 82 Q 78 85 98 145 Z" fill="#336E7D" />
                    {/* Leaf 2 (Center High) */}
                    <path d="M100 145 Q 92 80 100 48 Q 108 80 100 145 Z" fill="#4C9DB0" />
                    {/* Leaf 3 (Center Right) */}
                    <path d="M102 145 Q 140 120 148 82 Q 122 85 102 145 Z" fill="#336E7D" />
                    {/* Leaf 4 (Lower Left) */}
                    <path d="M96 148 Q 45 140 40 115 Q 70 125 96 148 Z" fill="#24535F" />
                    {/* Leaf 5 (Lower Right) */}
                    <path d="M104 148 Q 155 140 160 115 Q 130 125 104 148 Z" fill="#24535F" />
                  </svg>
                </div>

                {/* Panel 3: Laptop & Notebook Focus Workspace */}
                <div className="bg-[#FFEBAF] rounded-3xl p-4 sm:p-5 aspect-square flex items-center justify-center relative overflow-hidden border border-[#E8D49E] shadow-xs hover:scale-[1.02] transition-transform duration-300">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* Wooden Desk Horizon */}
                    <rect x="0" y="110" width="200" height="90" fill="#E8C988" />
                    {/* Background Wall Texture & Plant Foliage */}
                    <path d="M0 40 Q 30 50 35 110 L0 110 Z" fill="#336E7D" opacity="0.8" />
                    <path d="M0 15 Q 40 30 45 90 L0 90 Z" fill="#4C9DB0" opacity="0.6" />
                    {/* Open Notebook */}
                    <polygon points="25,160 75,145 90,175 40,190" fill="#FFFDF7" />
                    <line x1="38" y1="158" x2="68" y2="150" stroke="#CBD5E1" strokeWidth="1.5" />
                    <line x1="42" y1="168" x2="72" y2="160" stroke="#CBD5E1" strokeWidth="1.5" />
                    {/* Laptop in Isometric Angle */}
                    <rect x="90" y="80" width="75" height="52" rx="4" fill="#336E7D" transform="rotate(-10 90 80)" />
                    <rect x="95" y="84" width="65" height="42" rx="2" fill="#E0F2F6" transform="rotate(-10 90 80)" />
                    <polygon points="78,140 160,126 150,148 68,162" fill="#1F4550" />
                    {/* Coffee Cup */}
                    <rect x="155" y="135" width="18" height="18" rx="3" fill="#1F4550" />
                    <path d="M173 139 A 4 4 0 0 1 173 149" stroke="#1F4550" strokeWidth="2.5" fill="none" />
                  </svg>
                </div>

                {/* Panel 4: People Community Collaboration Meeting */}
                <div className="bg-[#4C9DB0]/20 rounded-3xl p-4 sm:p-5 aspect-square flex items-center justify-center relative overflow-hidden border border-[#4C9DB0]/25 shadow-xs hover:scale-[1.02] transition-transform duration-300">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* Ambient Room Light */}
                    <line x1="100" y1="0" x2="100" y2="35" stroke="#1F4550" strokeWidth="2" />
                    <path d="M85 45 L100 35 L115 45 Z" fill="#336E7D" />
                    <polygon points="70,95 130,95 160,180 40,180" fill="#FFFDF7" opacity="0.3" />
                    {/* Meeting Table */}
                    <ellipse cx="100" cy="150" rx="55" ry="18" fill="#FFFDF7" stroke="#E5DAC0" strokeWidth="2" />
                    {/* Person 1 (Left) */}
                    <circle cx="58" cy="115" r="10" fill="#1F4550" />
                    <path d="M45 155 Q 58 128 71 155 Z" fill="#336E7D" />
                    {/* Person 2 (Center Left - Back) */}
                    <circle cx="85" cy="108" r="9" fill="#1F4550" />
                    <path d="M74 142 Q 85 120 96 142 Z" fill="#4C9DB0" />
                    {/* Person 3 (Center Right - Back) */}
                    <circle cx="115" cy="108" r="9" fill="#1F4550" />
                    <path d="M104 142 Q 115 120 126 142 Z" fill="#24535F" />
                    {/* Person 4 (Right) */}
                    <circle cx="142" cy="115" r="10" fill="#1F4550" />
                    <path d="M129 155 Q 142 128 155 155 Z" fill="#336E7D" />
                    {/* Laptop & Documents on Table */}
                    <rect x="90" y="142" width="20" height="10" rx="1" fill="#336E7D" />
                  </svg>
                </div>

              </div>
            </div>

            {/* Right Column: Hero Copy, Pricing Eyebrow & CTAs */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6 sm:space-y-7 text-center lg:text-left">
              
              {/* Pricing Eyebrow Badge */}
              <div className="inline-block">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#336E7D] text-white text-xs font-semibold tracking-wide shadow-xs">
                  from $19.99/hour
                </span>
              </div>

              {/* Large Serif Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-[#1F4550] leading-[1.15] tracking-tight">
                Your Space to <br className="hidden sm:inline" />
                Connect <span className="text-[#4C9DB0] font-serif">Offline</span>
              </h1>

              {/* Supporting Paragraph with 20% OFF */}
              <p className="text-base sm:text-lg text-[#1F4550]/85 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                A modern coworking space designed for focus, collaboration and community. Get <strong className="text-[#1F4550] font-bold">20% OFF</strong> on your first booking!
              </p>

              {/* Three Uppercase Feature Tags */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm font-bold uppercase tracking-[0.15em] text-[#1F4550]/70 py-1">
                <span>OFFICES</span>
                <span className="text-[#4C9DB0] font-normal">|</span>
                <span>PRIVATE ROOMS</span>
                <span className="text-[#4C9DB0] font-normal">|</span>
                <span>MEETING ROOMS</span>
              </div>

              {/* Dual CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 sm:gap-4 pt-2">
                <a
                  href="#book"
                  onClick={scrollTo('book')}
                  className="w-full sm:w-auto h-12 px-8 rounded-full bg-[#1F4550] hover:bg-[#16323B] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Book a Space</span>
                  <ArrowRight size={16} />
                </a>

                <a
                  href="#about"
                  onClick={scrollTo('about')}
                  className="w-full sm:w-auto h-12 px-8 rounded-full bg-transparent hover:bg-[#1F4550]/5 text-[#1F4550] border-2 border-[#1F4550] text-sm font-bold transition-all active:scale-95 flex items-center justify-center"
                >
                  Learn More
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. FLOATING BOOKING BAR */}
      <section id="book" className="relative -mt-10 sm:-mt-12 z-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-white rounded-3xl sm:rounded-full border border-[#E8E4D8] p-4 sm:p-5 shadow-xl shadow-[#1F4550]/5">
          <form onSubmit={handleBookingSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 lg:gap-3 items-center">
            
            {/* Field 1: Name */}
            <div className="lg:col-span-2 px-3 py-1.5 sm:border-r border-[#E8E4D8]">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1F4550]/60 mb-0.5">
                YOUR NAME
              </label>
              <div className="flex items-center gap-2">
                <User size={15} className="text-[#4C9DB0] shrink-0" />
                <input
                  type="text"
                  required
                  placeholder="Full name"
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                  className="w-full text-xs font-medium text-[#1F4550] bg-transparent focus:outline-none placeholder-[#1F4550]/40"
                />
              </div>
            </div>

            {/* Field 2: Phone */}
            <div className="lg:col-span-2 px-3 py-1.5 sm:border-r border-[#E8E4D8]">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1F4550]/60 mb-0.5">
                PHONE NUMBER
              </label>
              <div className="flex items-center gap-2">
                <Phone size={15} className="text-[#4C9DB0] shrink-0" />
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={bookingForm.phone}
                  onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                  className="w-full text-xs font-medium text-[#1F4550] bg-transparent focus:outline-none placeholder-[#1F4550]/40"
                />
              </div>
            </div>

            {/* Field 3: People Count */}
            <div className="lg:col-span-2 px-3 py-1.5 sm:border-r border-[#E8E4D8]">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1F4550]/60 mb-0.5">
                PEOPLE
              </label>
              <div className="flex items-center gap-2">
                <Users size={15} className="text-[#4C9DB0] shrink-0" />
                <select
                  value={bookingForm.people}
                  onChange={(e) => setBookingForm({ ...bookingForm, people: e.target.value })}
                  className="w-full text-xs font-medium text-[#1F4550] bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="1 person">1 person</option>
                  <option value="2-4 team">2-4 people</option>
                  <option value="5-10 group">5-10 people</option>
                  <option value="10+ team">10+ team</option>
                </select>
              </div>
            </div>

            {/* Field 4: Workspace Type */}
            <div className="lg:col-span-3 px-3 py-1.5 sm:border-r border-[#E8E4D8]">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1F4550]/60 mb-0.5">
                WORKSPACE TYPE
              </label>
              <div className="flex items-center gap-2">
                <Building size={15} className="text-[#4C9DB0] shrink-0" />
                <select
                  value={bookingForm.workspaceType}
                  onChange={(e) => setBookingForm({ ...bookingForm, workspaceType: e.target.value })}
                  className="w-full text-xs font-medium text-[#1F4550] bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="Hot Desk">Hot Desk</option>
                  <option value="Dedicated Desk">Dedicated Desk</option>
                  <option value="Private Office">Private Office</option>
                  <option value="Conference Room">Conference Room</option>
                  <option value="Event Studio">Event Studio</option>
                </select>
              </div>
            </div>

            {/* Field 5: Date */}
            <div className="lg:col-span-1.5 px-3 py-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1F4550]/60 mb-0.5">
                DATE
              </label>
              <div className="flex items-center gap-2">
                <Calendar size={15} className="text-[#4C9DB0] shrink-0" />
                <input
                  type="date"
                  required
                  value={bookingForm.date}
                  onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                  className="w-full text-xs font-medium text-[#1F4550] bg-transparent focus:outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="lg:col-span-1.5 flex justify-end">
              <button
                type="submit"
                className="w-full h-11 px-6 rounded-full bg-[#336E7D] hover:bg-[#285864] text-white text-xs font-bold shadow-md transition-all active:scale-95 whitespace-nowrap cursor-pointer flex items-center justify-center"
              >
                Book a Space
              </button>
            </div>

          </form>
        </div>
      </section>

      {/* 4. ABOUT SECTION */}
      <section id="about" className="py-20 sm:py-28 bg-[#FFFDF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Column: Heading, Copy, Checklist Grid & CTAs */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-7">
              
              {/* Eyebrow Label */}
              <div className="inline-block">
                <span className="inline-flex items-center gap-1 px-3.5 py-1 rounded-full bg-[#E0F2F6] text-[#336E7D] text-xs font-bold uppercase tracking-wider">
                  ABOUT US
                </span>
              </div>

              {/* Large Serif Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#1F4550] leading-tight">
                More Than Just a <br />
                <span className="text-[#4C9DB0] font-serif">Workspace</span>
              </h2>

              {/* Paragraphs */}
              <div className="space-y-3.5 text-sm sm:text-base text-[#1F4550]/80 leading-relaxed">
                <p>
                  The Station is a community-driven coworking space where ideas grow, people connect and great work happens.
                </p>
                <p>
                  Whether you're a freelancer, a startup or a remote team, we have the right space for you.
                </p>
              </div>

              {/* 2x3 Checklist Grid with Moonstone Checkmark Bubbles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {[
                  { title: "High-Speed Wi-Fi", icon: Wifi },
                  { title: "Networking Events", icon: Users },
                  { title: "Fresh Meals & Snacks", icon: Coffee },
                  { title: "Conference Room", icon: Building },
                  { title: "24/7 Access", icon: Clock },
                  { title: "Supportive Community", icon: Sparkles }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#4C9DB0] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-[#1F4550]">
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* Dual Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-4">
                <a
                  href="#spaces"
                  onClick={scrollTo('spaces')}
                  className="w-full sm:w-auto h-11 px-7 rounded-full bg-[#1F4550] hover:bg-[#16323B] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95 flex items-center justify-center"
                >
                  View Our Spaces
                </a>

                <a
                  href="#contact"
                  onClick={scrollTo('contact')}
                  className="w-full sm:w-auto h-11 px-7 rounded-full bg-transparent hover:bg-[#1F4550]/5 text-[#1F4550] border-2 border-[#1F4550] text-xs sm:text-sm font-bold transition-all active:scale-95 flex items-center justify-center"
                >
                  Get in Touch
                </a>
              </div>

            </div>

            {/* Right Column: Large Rounded Illustrated Visual */}
            <div className="lg:col-span-6">
              <div className="bg-gradient-to-br from-[#4C9DB0] to-[#285864] rounded-3xl sm:rounded-4xl p-6 sm:p-10 aspect-[4/3] sm:aspect-[5/4] relative overflow-hidden shadow-2xl border border-[#4C9DB0]/30 flex items-center justify-center">
                <svg viewBox="0 0 400 320" className="w-full h-full">
                  {/* Background Ambient Arch Window */}
                  <path d="M280 20 Q 380 20 380 120 L 380 320 L 280 320 Z" fill="#FFF6DE" opacity="0.3" />
                  <path d="M295 40 Q 365 40 365 120 L 365 320 L 295 320 Z" fill="#FFEBAF" opacity="0.5" />
                  
                  {/* Bookshelf on Left */}
                  <rect x="20" y="60" width="50" height="220" rx="3" fill="#1F4550" />
                  <line x1="20" y1="120" x2="70" y2="120" stroke="#336E7D" strokeWidth="3" />
                  <line x1="20" y1="180" x2="70" y2="180" stroke="#336E7D" strokeWidth="3" />
                  <line x1="20" y1="240" x2="70" y2="240" stroke="#336E7D" strokeWidth="3" />
                  {/* Books */}
                  <rect x="28" y="80" width="10" height="38" rx="1" fill="#FFEBAF" />
                  <rect x="40" y="86" width="8" height="32" rx="1" fill="#4C9DB0" />
                  <rect x="30" y="140" width="12" height="38" rx="1" fill="#FFFDF7" />
                  <rect x="44" y="132" width="14" height="46" rx="1" fill="#FFEBAF" />
                  <rect x="28" y="200" width="30" height="38" rx="2" fill="#E8C988" />

                  {/* Framed Wall Art: "Good Ideas Grow Here" */}
                  <rect x="120" y="45" width="120" height="95" rx="4" fill="#336E7D" stroke="#FFFDF7" strokeWidth="3" />
                  <text x="180" y="78" textAnchor="middle" fill="#FFEBAF" fontFamily="Georgia, serif" fontSize="13" fontStyle="italic">
                    Good
                  </text>
                  <text x="180" y="96" textAnchor="middle" fill="#FFFDF7" fontFamily="Georgia, serif" fontSize="14" fontWeight="bold">
                    Ideas
                  </text>
                  <text x="180" y="114" textAnchor="middle" fill="#FFEBAF" fontFamily="Georgia, serif" fontSize="13" fontStyle="italic">
                    Grow Here
                  </text>

                  {/* Ceiling Drop Light */}
                  <line x1="230" y1="0" x2="230" y2="35" stroke="#1F4550" strokeWidth="3" />
                  <path d="M210 50 L230 35 L250 50 Z" fill="#1F4550" />

                  {/* Modern Workspace Desk */}
                  <rect x="100" y="190" width="280" height="14" rx="3" fill="#FFFDF7" />
                  <rect x="115" y="204" width="12" height="110" rx="2" fill="#E5DAC0" />
                  <rect x="350" y="204" width="12" height="110" rx="2" fill="#E5DAC0" />

                  {/* Ergonomic Office Chair */}
                  <rect x="135" y="160" width="60" height="70" rx="8" fill="#1F4550" />
                  <rect x="125" y="220" width="80" height="14" rx="4" fill="#16323B" />
                  <rect x="160" y="234" width="10" height="50" fill="#16323B" />
                  <line x1="130" y1="284" x2="200" y2="284" stroke="#16323B" strokeWidth="5" strokeLinecap="round" />

                  {/* Laptop on Desk */}
                  <rect x="210" y="155" width="60" height="38" rx="3" fill="#1F4550" />
                  <rect x="215" y="159" width="50" height="30" rx="2" fill="#E0F2F6" />
                  <polygon points="200,193 280,193 272,198 208,198" fill="#336E7D" />

                  {/* Steaming Coffee Cup */}
                  <rect x="290" y="174" width="14" height="18" rx="2" fill="#FFFDF7" />
                  <path d="M304 178 A 3 3 0 0 1 304 188" stroke="#FFFDF7" strokeWidth="2" fill="none" />
                  <path d="M294 168 Q 296 162 294 158" stroke="#FFEBAF" strokeWidth="1.5" fill="none" />
                  <path d="M299 168 Q 301 162 299 158" stroke="#FFEBAF" strokeWidth="1.5" fill="none" />

                  {/* Large Potted Plant on Desk */}
                  <rect x="320" y="170" width="26" height="22" rx="3" fill="#FFFDF7" />
                  {/* Leaves */}
                  <path d="M333 170 Q 310 140 315 110 Q 340 130 333 170 Z" fill="#24535F" />
                  <path d="M333 170 Q 333 115 340 85 Q 350 120 333 170 Z" fill="#336E7D" />
                  <path d="M333 170 Q 360 140 365 110 Q 345 130 333 170 Z" fill="#24535F" />
                </svg>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. STATS BAND (Full-Width Dark Teal Section) */}
      <section className="bg-[#1F4550] text-white py-14 sm:py-18">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[#336E7D]/60 text-center">
            
            {/* Stat 1 */}
            <div className="px-4 py-4 md:py-0">
              <p className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight">
                120+
              </p>
              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#4C9DB0] mt-2">
                MEMBERS
              </p>
            </div>

            {/* Stat 2 */}
            <div className="px-4 py-4 md:py-0">
              <p className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight">
                15
              </p>
              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#4C9DB0] mt-2">
                PRIVATE OFFICES
              </p>
            </div>

            {/* Stat 3 */}
            <div className="px-4 py-4 md:py-0">
              <p className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight">
                98%
              </p>
              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#4C9DB0] mt-2">
                HAPPY CLIENTS
              </p>
            </div>

            {/* Stat 4 */}
            <div className="px-4 py-4 md:py-0">
              <p className="text-4xl sm:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight">
                24/7
              </p>
              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#4C9DB0] mt-2">
                ACCESS
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="bg-[#FFFDF7] border-t border-[#E8E4D8] py-8 sm:py-10 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs sm:text-sm text-[#1F4550]/70 font-medium">
            © 2025 The Station. All rights reserved.
          </p>
        </div>
      </footer>

      {/* BOOKING CONFIRMATION MODAL */}
      {bookingSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FFFDF7] rounded-3xl max-w-md w-full p-6 sm:p-8 border border-[#E8E4D8] shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#4C9DB0]/20 text-[#336E7D] mx-auto flex items-center justify-center">
              <CheckCircle2 size={32} />
            </div>
            
            <h3 className="font-serif font-bold text-2xl text-[#1F4550]">
              Space Reservation Received!
            </h3>
            
            <div className="p-4 rounded-2xl bg-[#FFF6DE] border border-[#EADDBF] text-xs text-left space-y-1.5 text-[#1F4550]">
              <p><strong>Name:</strong> {bookingForm.name || "Guest"}</p>
              <p><strong>Phone:</strong> {bookingForm.phone || "+91 98765 43210"}</p>
              <p><strong>Workspace:</strong> {bookingForm.workspaceType} ({bookingForm.people})</p>
              <p><strong>Date:</strong> {bookingForm.date}</p>
              <p className="text-[#336E7D] font-bold pt-1">🎉 20% First-Time Discount Applied!</p>
            </div>

            <p className="text-xs text-[#1F4550]/70">
              Our community manager will send your door access code and booking confirmation via SMS shortly.
            </p>

            <button
              onClick={() => setBookingSuccess(false)}
              className="w-full h-11 rounded-full bg-[#336E7D] hover:bg-[#285864] text-white text-xs font-bold shadow-md transition-all active:scale-95"
            >
              Done & Return to Site
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default TheStationPage;
