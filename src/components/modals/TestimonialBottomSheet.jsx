import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Star,
  X,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  ThumbsUp,
  Heart,
  Sparkles,
  Send,
  UserCheck,
  CheckCircle2
} from 'lucide-react';

export const TestimonialBottomSheet = () => {
  const { isTestimonialSheetOpen, setIsTestimonialSheetOpen, showToast } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newReviewForm, setNewReviewForm] = useState({
    name: '',
    role: 'Family Member',
    rating: 5,
    comment: ''
  });
  const [isFormOpen, setIsFormOpen] = useState(false);

  const reviews = [
    {
      id: 1,
      name: "Arthur Pendelton",
      role: "Senior Resident, 82 yrs",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
      rating: 5,
      date: "2 days ago",
      badge: "Verified Senior",
      quote: "The volunteer companionship program gave me a dear friend in Marcus. We play chess and take garden walks every Tuesday and Thursday without fail.",
      highlight: "Gentle Companionship & Tea"
    },
    {
      id: 2,
      name: "Sarah Vance",
      role: "Family Guardian & Daughter",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
      rating: 5,
      date: "1 week ago",
      badge: "Family Guardian",
      quote: "Living 40 miles away was stressful until CareConnect. I get instant vital updates, medication logs, and HD video calls with my mom every evening.",
      highlight: "Real-time Peace of Mind"
    },
    {
      id: 3,
      name: "Elena Rostova",
      role: "Senior Care Recipient, 74 yrs",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
      rating: 5,
      date: "2 weeks ago",
      badge: "Active Member",
      quote: "The classic movie matinees and door-to-door clinic rides make me feel vibrant, independent, and truly cared for in my golden years.",
      highlight: "Community & Transport"
    },
    {
      id: 4,
      name: "Dr. Robert Sterling",
      role: "Consultant Geriatrician",
      avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=150&h=150",
      rating: 5,
      date: "3 weeks ago",
      badge: "Medical Partner",
      quote: "CareConnect’s daily telemetry logs make clinical reviews twice as accurate. Patients who use it have far fewer emergency hospitalizations.",
      highlight: "Clinical Synchronization"
    }
  ];

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isTestimonialSheetOpen) {
        setIsTestimonialSheetOpen(false);
      }
    };
    if (isTestimonialSheetOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isTestimonialSheetOpen]);

  if (!isTestimonialSheetOpen) return null;

  const currentReview = reviews[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReviewForm.name || !newReviewForm.comment) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsFormOpen(false);
      setNewReviewForm({ name: '', role: 'Family Member', rating: 5, comment: '' });
      showToast({
        type: 'success',
        title: 'Review Submitted!',
        message: 'Thank you for sharing your experience with our community.'
      });
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={() => setIsTestimonialSheetOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="testimonials-sheet-title"
    >
      {/* Bottom Sheet Container (Style 3 Spec) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white rounded-t-[32px] border-t border-orange-100 shadow-2xl overflow-hidden animate-bottom-sheet-slide-up max-h-[90vh] flex flex-col"
      >
        {/* Mobile Drag Indicator Bar */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-3 mb-2 flex-shrink-0"></div>

        {/* Header */}
        <div className="px-6 py-3 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary-container text-primary flex items-center justify-center">
              <Star size={18} className="fill-primary" />
            </div>
            <div>
              <h3 id="testimonials-sheet-title" className="text-base font-bold text-slate-900 font-serif">
                Community Stories & Reviews
              </h3>
              <p className="text-[11px] text-slate-500">4.9 / 5.0 Star Rating from 450+ verified families</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="text-xs font-semibold text-primary bg-primary-container hover:bg-primary/20 px-3 py-1.5 rounded-xl border border-primary/20 transition-colors"
            >
              {isFormOpen ? "View Stories" : "+ Add Review"}
            </button>
            <button
              type="button"
              onClick={() => setIsTestimonialSheetOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Close bottom sheet"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {isFormOpen ? (
            /* Add Review Form */
            <form onSubmit={handleSubmitReview} className="space-y-4 animate-in fade-in">
              <h4 className="text-sm font-bold text-slate-900">Share Your Experience</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newReviewForm.name}
                    onChange={(e) => setNewReviewForm({ ...newReviewForm, name: e.target.value })}
                    placeholder="e.g. Sarah Vance"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Role in Care</label>
                  <select
                    value={newReviewForm.role}
                    onChange={(e) => setNewReviewForm({ ...newReviewForm, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    <option value="Senior Care Recipient">Senior Care Recipient</option>
                    <option value="Family Member">Family Member / Guardian</option>
                    <option value="Volunteer Companion">Volunteer Companion</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Star Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReviewForm({ ...newReviewForm, rating: star })}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform"
                    >
                      <Star
                        size={22}
                        className={star <= newReviewForm.rating ? "fill-amber-400 text-amber-400" : "text-slate-300"}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-600 ml-2">{newReviewForm.rating} / 5 Stars</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Your Feedback / Review</label>
                <textarea
                  required
                  rows={3}
                  value={newReviewForm.comment}
                  onChange={(e) => setNewReviewForm({ ...newReviewForm, comment: e.target.value })}
                  placeholder="How did CareConnect assist your family or loved one?"
                  className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-ambient transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Posting Review...</span>
                ) : (
                  <>
                    <span>Submit Verified Review</span>
                    <Send size={14} />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Swipeable Reviews Showcase */
            <div className="space-y-4">
              {/* Active Review Card */}
              <div className="bg-slate-50/90 rounded-2xl border border-slate-200/80 p-5 sm:p-6 relative space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={currentReview.avatar}
                      alt={currentReview.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{currentReview.name}</h4>
                      <p className="text-xs text-slate-500">{currentReview.role}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-orange-50 text-primary border border-orange-200 flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    {currentReview.badge}
                  </span>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(currentReview.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-slate-600 ml-1.5">{currentReview.date}</span>
                </div>

                {/* Quote Text */}
                <blockquote className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                  "{currentReview.quote}"
                </blockquote>

                {/* Tag pill */}
                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="text-[11px] font-semibold text-primary bg-primary-container px-2.5 py-0.5 rounded-md border border-primary/20">
                    {currentReview.highlight}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Review {currentIndex + 1} of {reviews.length}
                  </span>
                </div>
              </div>

              {/* Navigation Arrows & Dot Indicators */}
              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <ChevronLeft size={16} />
                  <span>Previous</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {reviews.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentIndex(i)}
                      className={`h-2 rounded-full transition-all ${
                        currentIndex === i ? 'w-6 bg-primary' : 'w-2 bg-slate-300'
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="px-3.5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialBottomSheet;
