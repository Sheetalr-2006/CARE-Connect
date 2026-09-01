import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SocialClubEventsSection } from '../components/common/SocialClubEventsSection';
import {
  Sparkles,
  Users,
  Calendar,
  MapPin,
  CheckCircle2,
  Plus,
  Share2,
  Heart,
  Search,
  Filter,
  Check,
  Clock,
  Compass,
  Film,
  Popcorn,
  Headphones,
  Armchair,
  X,
  Volume2,
  Ticket
} from 'lucide-react';

export const SocialEngagement = () => {
  const { socialEvents, toggleEventJoin } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterFamilyOnly, setFilterFamilyOnly] = useState(false);
  const [filterJoinedOnly, setFilterJoinedOnly] = useState(false);
  const [filterMoviesOnly, setFilterMoviesOnly] = useState(false);

  // Movie Details & Seat Reservation Modal State
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [seatType, setSeatType] = useState('Plush Recliner');
  const [selectedTreat, setSelectedTreat] = useState('Buttered Popcorn & Warm Tea');
  const [movieBookingSuccess, setMovieBookingSuccess] = useState(false);

  const categories = [
    'All',
    'Movie & Cinema',
    'Family & Intergenerational',
    'Music & Entertainment',
    'Outdoor & Nature',
    'Health & Mobility',
    'Arts & Creativity',
    'Games & Brain Health',
    'Wellness & Pet Therapy',
    'Dining & Social',
    'Literature & Culture'
  ];

  const filteredEvents = socialEvents.filter(ev => {
    const matchesSearch = ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ev.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ev.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || ev.category === selectedCategory;
    const matchesFamily = !filterFamilyOnly || ev.familyFriendly;
    const matchesJoined = !filterJoinedOnly || ev.joined;
    const matchesMovies = !filterMoviesOnly || ev.isMovie || ev.category === 'Movie & Cinema';

    return matchesSearch && matchesCategory && matchesFamily && matchesJoined && matchesMovies;
  });

  const joinedCount = socialEvents.filter(e => e.joined).length;
  const movieCount = socialEvents.filter(e => e.isMovie || e.category === 'Movie & Cinema').length;

  const handleConfirmMovieSeat = (movieId) => {
    toggleEventJoin(movieId);
    setMovieBookingSuccess(true);
    setTimeout(() => {
      setMovieBookingSuccess(false);
      setSelectedMovie(null);
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E2E8F0] shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-widest text-primary bg-[#FFE8DF] px-3.5 py-1 rounded-full">
              Community Events & Cinema
            </span>
            <span className="text-xs text-amber-800 font-bold bg-amber-50 px-3 py-1 rounded-full border border-amber-200 flex items-center gap-1">
              <Film size={13} className="text-primary" /> {movieCount} Classic Movie Screenings Available
            </span>
            <span className="text-xs text-primary font-bold bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
              ✓ {joinedCount} Booked
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#1A1D20] font-serif">
            Social Circles & Movie Matinees
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-2xl leading-relaxed">
            Stay socially active and entertained. Enjoy our classic cinema afternoons with hearing loops and soft recliners, community tea clubs, yoga, and family events.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => {
              setSelectedCategory('Movie & Cinema');
              setFilterMoviesOnly(true);
            }}
            className="px-5 py-3 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-ambient transition-transform active:scale-95 flex items-center gap-2"
          >
            <Film size={16} />
            <span>View Movie Events</span>
          </button>
        </div>
      </div>

      {/* 10 Featured Social Clubs & Activities Gallery */}
      <SocialClubEventsSection />

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-[#E2E8F0] shadow-card space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search size={16} className="absolute left-3.5 top-3.5 text-[#64748B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by movie title, cinema, tea, music, chess..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#F8F9FA] border border-[#E2E8F0] text-xs text-[#1A1D20] focus:ring-2 focus:ring-primary focus:outline-none placeholder:text-[#94A3B8]"
            />
          </div>

          {/* Quick Toggles */}
          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto justify-end">
            <button
              onClick={() => {
                setFilterMoviesOnly(!filterMoviesOnly);
                if (!filterMoviesOnly) setSelectedCategory('Movie & Cinema');
                else setSelectedCategory('All');
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors border flex items-center gap-1.5 ${
                filterMoviesOnly || selectedCategory === 'Movie & Cinema'
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-[#F8F9FA] border-[#E2E8F0] text-[#64748B] hover:text-[#1A1D20]'
              }`}
            >
              <Film size={14} />
              <span>🎬 Movies Only ({movieCount})</span>
            </button>

            <button
              onClick={() => setFilterFamilyOnly(!filterFamilyOnly)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors border ${
                filterFamilyOnly
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-[#F8F9FA] border-[#E2E8F0] text-[#64748B] hover:text-[#1A1D20]'
              }`}
            >
              👨‍👩‍👧 Family Friendly
            </button>

            <button
              onClick={() => setFilterJoinedOnly(!filterJoinedOnly)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors border ${
                filterJoinedOnly
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-[#F8F9FA] border-[#E2E8F0] text-[#64748B] hover:text-[#1A1D20]'
              }`}
            >
              ✓ My RSVP'd ({joinedCount})
            </button>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#F1F5F9]">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setFilterMoviesOnly(cat === 'Movie & Cinema');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-primary text-white shadow-ambient font-bold'
                  : 'bg-[#F8F9FA] hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#1A1D20] border border-[#E2E8F0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-[#64748B] px-2 font-medium">
        <span>Showing <strong>{filteredEvents.length}</strong> events & screenings</span>
        <span>All movie matinees include free soft recliners, audio loop & snacks</span>
      </div>

      {/* Events 3-Column Grid (Staggered Sequential Pop-Up) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((ev, idx) => (
          <div
            key={ev.id}
            style={{ animationDelay: `${(idx % 9) * 80 + 50}ms` }}
            className="bg-white rounded-3xl border border-[#E2E8F0] shadow-card hover:shadow-ambient hover:border-primary/40 transition-all flex flex-col justify-between overflow-hidden group animate-fade-in-scale"
          >
            <div>
              {/* Event Image Banner */}
              <div className="h-48 w-full relative overflow-hidden bg-slate-100">
                <img
                  src={ev.image}
                  alt={ev.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-primary shadow-sm flex items-center gap-1">
                  {ev.isMovie && <Film size={12} />}
                  <span>{ev.category}</span>
                </div>

                {/* Movie Badge / Family Friendly */}
                {ev.isMovie ? (
                  <div className="absolute top-3 right-3 bg-amber-500 text-white px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm flex items-center gap-1">
                    <Popcorn size={11} /> Matinee
                  </div>
                ) : ev.familyFriendly ? (
                  <div className="absolute top-3 right-3 bg-[#FFE8DF] text-primary px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm">
                    👨‍👩‍👧 Family Friendly
                  </div>
                ) : null}

                {/* Attendees count */}
                <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-white shadow-sm flex items-center gap-1">
                  <Users size={13} /> {ev.participants} attending
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5 sm:p-6 space-y-3">
                <div className="text-xs font-bold text-primary flex items-center gap-1.5">
                  <Calendar size={14} />
                  <span>{ev.time}</span>
                </div>

                <h3 className="text-lg font-bold text-[#1A1D20] font-serif leading-snug group-hover:text-primary transition-colors">
                  {ev.title}
                </h3>

                <p className="text-xs text-[#64748B] flex items-center gap-1 font-medium">
                  <MapPin size={14} className="text-primary flex-shrink-0" />
                  <span className="truncate">{ev.location}</span>
                </p>

                {/* Movie Highlight Pills */}
                {ev.movieInfo && (
                  <div className="p-3 rounded-2xl bg-[#FFF1EC] border border-[#FFE8DF] text-[11px] space-y-1.5">
                    <div className="flex items-center justify-between text-[#1A1D20] font-bold">
                      <span>🎬 {ev.movieInfo.genre}</span>
                      <span className="text-primary">{ev.movieInfo.runtime}</span>
                    </div>
                    <div className="text-[#64748B] flex items-center gap-1 text-[10px]">
                      <Headphones size={11} className="text-primary flex-shrink-0" />
                      <span className="truncate">{ev.movieInfo.audioAccessibility}</span>
                    </div>
                  </div>
                )}

                <p className="text-xs text-[#64748B] leading-relaxed pt-1">
                  {ev.description}
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-5 sm:p-6 pt-0 border-t border-[#F1F5F9] mt-2 flex items-center justify-between gap-3">
              {ev.isMovie ? (
                <>
                  <button
                    onClick={() => setSelectedMovie(ev)}
                    className="px-3.5 py-2 rounded-xl bg-[#F8F9FA] hover:bg-[#F1F5F9] text-[#1A1D20] border border-[#E2E8F0] text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <Ticket size={14} className="text-primary" />
                    <span>Seat & Treats</span>
                  </button>

                  <button
                    onClick={() => toggleEventJoin(ev.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 flex-shrink-0 active:scale-95 ${
                      ev.joined
                        ? 'bg-primary text-white hover:bg-primary-hover shadow-ambient'
                        : 'bg-primary text-white hover:bg-primary-hover'
                    }`}
                  >
                    {ev.joined ? (
                      <>
                        <CheckCircle2 size={14} />
                        <span>Ticket Reserved</span>
                      </>
                    ) : (
                      <>
                        <Film size={14} />
                        <span>Reserve Seat</span>
                      </>
                    )}
                  </button>
                </>
              ) : (
                <>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] uppercase font-bold text-[#94A3B8] block">Hosted By</span>
                    <p className="text-xs font-semibold text-[#1A1D20] truncate">{ev.host}</p>
                  </div>

                  <button
                    onClick={() => toggleEventJoin(ev.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 flex-shrink-0 active:scale-95 ${
                      ev.joined
                        ? 'bg-primary text-white hover:bg-primary-hover shadow-ambient'
                        : 'bg-primary text-white hover:bg-primary-hover'
                    }`}
                  >
                    {ev.joined ? (
                      <>
                        <CheckCircle2 size={14} />
                        <span>Joined</span>
                      </>
                    ) : (
                      <>
                        <Plus size={14} />
                        <span>Join Event</span>
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Movie Details & Seat Reservation Modal */}
      {selectedMovie && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative animate-modal-scale-in">
            <button
              onClick={() => {
                setSelectedMovie(null);
                setMovieBookingSuccess(false);
              }}
              className="absolute right-5 top-5 p-2 rounded-full bg-[#F1F5F9] text-[#64748B] hover:text-[#1A1D20]"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF1EC] text-primary flex items-center justify-center">
                <Film size={24} />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-primary tracking-wider bg-[#FFE8DF] px-2.5 py-0.5 rounded-full">
                  Classic Film Matinee
                </span>
                <h2 className="text-xl font-bold text-[#1A1D20] font-serif mt-0.5">{selectedMovie.title}</h2>
              </div>
            </div>

            {movieBookingSuccess ? (
              <div className="p-8 text-center space-y-3 bg-orange-50 rounded-2xl border border-orange-200">
                <CheckCircle2 size={44} className="mx-auto text-primary animate-bounce" />
                <h3 className="text-lg font-bold text-orange-950">Seat & Complimentary Treats Reserved!</h3>
                <p className="text-xs text-primary">
                  Your ticket, <strong>{seatType}</strong>, and <strong>{selectedTreat}</strong> are confirmed for {selectedMovie.time}.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                
                {/* Film Metadata */}
                <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-[#E2E8F0] space-y-2 text-xs">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-[10px] uppercase text-[#94A3B8] font-bold block">Starring</span>
                      <p className="font-semibold text-[#1A1D20]">{selectedMovie.movieInfo?.starring || "Classic Cast"}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase text-[#94A3B8] font-bold block">Runtime & Rating</span>
                      <p className="font-semibold text-[#1A1D20]">{selectedMovie.movieInfo?.runtime} • {selectedMovie.movieInfo?.rating}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#E2E8F0] space-y-1">
                    <div className="flex items-center gap-1.5 text-primary font-bold">
                      <Headphones size={13} />
                      <span>Audio & Visual Accessibility:</span>
                    </div>
                    <p className="text-[11px] text-[#64748B] pl-4">{selectedMovie.movieInfo?.audioAccessibility}</p>
                  </div>
                </div>

                {/* Seating Choice */}
                <div>
                  <label className="block text-xs font-bold text-[#1A1D20] mb-1.5 flex items-center gap-1.5">
                    <Armchair size={14} className="text-primary" />
                    <span>Choose Accessible Seating Preference</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Plush Recliner', 'Wheelchair Bay', 'Companion Pair', 'Front Row (Clear View)'].map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSeatType(type)}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-left ${
                          seatType === type
                            ? 'bg-primary text-white border-primary shadow-sm'
                            : 'bg-[#F8F9FA] border-[#E2E8F0] text-[#64748B] hover:border-primary/40'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Free Concessions */}
                <div>
                  <label className="block text-xs font-bold text-[#1A1D20] mb-1.5 flex items-center gap-1.5">
                    <Popcorn size={14} className="text-primary" />
                    <span>Select Free Complimentary Concession Treat</span>
                  </label>
                  <select
                    value={selectedTreat}
                    onChange={(e) => setSelectedTreat(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] border border-[#E2E8F0] text-xs text-[#1A1D20] focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    <option value="Buttered Popcorn & Warm Chamomile Tea">🍿 Warm Buttered Popcorn & Chamomile Tea</option>
                    <option value="Sugar-Free Choc-Ice & Earl Grey">🍦 Sugar-Free Choc-Ice & Earl Grey Tea</option>
                    <option value="Hot Apple Strudel & Swiss Cocoa">🥧 Hot Apple Strudel & Swiss Cocoa</option>
                    <option value="Artisan Pretzels & Sparkling Cider">🥨 Artisan Pretzels & Sparkling Cider</option>
                    <option value="Italian Gelato Cup & Espresso">🍨 Italian Gelato Cup & Espresso</option>
                  </select>
                </div>

                {/* Confirm Button */}
                <button
                  onClick={() => handleConfirmMovieSeat(selectedMovie.id)}
                  className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-ambient transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <Ticket size={16} />
                  <span>Confirm Ticket & Concessions (Free for Members)</span>
                </button>

              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default SocialEngagement;
