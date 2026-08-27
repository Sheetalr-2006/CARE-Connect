import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Star, Heart, CheckCircle2, MessageSquare, Sparkles, DollarSign, Clock, ShieldCheck } from 'lucide-react';

const praiseTagOptions = [
  "Very Punctual ⏰",
  "Compassionate & Kind ❤️",
  "Active Listener 👂",
  "Great Conversation 💬",
  "Patient & Gentle 🕊️",
  "Attentive to Health 🩺",
  "Helpful & Reliable 👍",
  "Warm & Cheerful ☀️"
];

const ratingLabels = {
  1: "Needs Improvement",
  2: "Fair Support",
  3: "Good & Helpful",
  4: "Very Good & Caring",
  5: "Exceptional & Heartwarming! 🌟"
};

export const RateVolunteerModal = () => {
  const {
    isRateVolunteerModalOpen,
    setIsRateVolunteerModalOpen,
    selectedVolunteerForRating,
    rateVolunteer,
    currentElderly
  } = useApp();

  const [overallRating, setOverallRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  
  // Specific Service Category Ratings
  const [serviceRatings, setServiceRatings] = useState({
    companionship: 5,
    punctuality: 5,
    healthAssistance: 5,
    communication: 5
  });

  const [selectedTags, setSelectedTags] = useState(["Compassionate & Kind ❤️", "Great Conversation 💬"]);
  const [reviewText, setReviewText] = useState("");
  const [reviewerName, setReviewerName] = useState(currentElderly.name || "Eleanor Vance");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isRateVolunteerModalOpen || !selectedVolunteerForRating) return null;

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleServiceRatingChange = (key, val) => {
    setServiceRatings(prev => ({ ...prev, [key]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    rateVolunteer(selectedVolunteerForRating.id, {
      rating: overallRating,
      serviceRatings,
      feedback: reviewText || `Gave a ${overallRating}-star rating with tags: ${selectedTags.join(', ')}`,
      reviewerName,
      tags: selectedTags
    });
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsRateVolunteerModalOpen(false);
      setReviewText("");
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-surface-container-lowest border border-surface-container-high rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-elevated relative animate-in zoom-in-95 duration-200 my-8">
        
        {/* Close Button */}
        <button
          onClick={() => setIsRateVolunteerModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors"
          aria-label="Close Rating Modal"
        >
          <X size={20} />
        </button>

        {isSubmitted ? (
          <div className="py-10 text-center space-y-3 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-xl font-bold text-on-surface">Thank you for rating!</h3>
            <p className="text-xs text-on-surface-variant max-w-xs mx-auto">
              Your review and service ratings for <strong>{selectedVolunteerForRating.name}</strong> have been recorded to support fellow seniors in the community.
            </p>
          </div>
        ) : (
          <div>
            {/* Header with Volunteer Info */}
            <div className="flex items-center gap-4 mb-5">
              <img
                src={selectedVolunteerForRating.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=128&h=128"}
                alt={selectedVolunteerForRating.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-primary/20 shadow-sm"
              />
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                  Volunteer Service Review
                </span>
                <h2 className="text-xl font-black text-on-surface mt-0.5">
                  Rate {selectedVolunteerForRating.name}
                </h2>
                <div className="flex items-center gap-2 text-xs text-on-surface-variant mt-0.5">
                  <span>⭐ {selectedVolunteerForRating.rating || 5.0} ({selectedVolunteerForRating.reviewsCount || 42} reviews)</span>
                  <span>•</span>
                  <span className="font-semibold text-emerald-700">{selectedVolunteerForRating.hourlyRate || "Community Volunteer"}</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Overall Star Rating */}
              <div className="text-center p-4 rounded-2xl bg-surface-container-low border border-surface-container space-y-1.5">
                <label className="block text-xs font-bold text-on-surface">
                  Overall Volunteer Companionship Rating
                </label>
                
                <div className="flex items-center justify-center gap-2 py-1">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const isFilled = (hoverRating || overallRating) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setOverallRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 text-amber-400 hover:scale-125 transition-transform"
                        aria-label={`${star} Stars`}
                      >
                        <Star
                          size={30}
                          className={`${
                            isFilled ? 'fill-amber-400 text-amber-400' : 'text-outline-variant/40'
                          } transition-colors`}
                        />
                      </button>
                    );
                  })}
                </div>

                <p className="text-xs font-bold text-primary">
                  {ratingLabels[hoverRating || overallRating]}
                </p>
              </div>

              {/* Service Sub-Category Ratings */}
              <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container space-y-2.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant block">
                  Rate Specific Service Quality:
                </span>
                
                {[
                  { key: "companionship", label: "💬 Companionship & Empathy" },
                  { key: "punctuality", label: "⏰ Punctuality & Reliability" },
                  { key: "healthAssistance", label: "🩺 Health & Vital Support" },
                  { key: "communication", label: "📱 Communication & Courtesy" }
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-semibold text-on-surface text-[11px] truncate">{item.label}</span>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => handleServiceRatingChange(item.key, st)}
                          className="p-0.5"
                        >
                          <Star
                            size={16}
                            className={
                              serviceRatings[item.key] >= st
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-outline-variant/40'
                            }
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Praise / Quality Tags */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-1.5">
                  Highlight Volunteer Strengths:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {praiseTagOptions.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => toggleTag(tag)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all border ${
                          isSelected
                            ? 'bg-primary text-white border-primary shadow-sm'
                            : 'bg-surface-container-low text-on-surface border-surface-container hover:border-primary/40'
                        }`}
                      >
                        {isSelected ? `✓ ${tag}` : tag}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Review Feedback Textarea */}
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Share a note or feedback (optional)
                </label>
                <textarea
                  rows={2}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="e.g. Marcus was extremely polite, arrived right on time, and helped me walk in the garden..."
                  className="w-full px-3.5 py-2 rounded-2xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface focus:ring-2 focus:ring-primary focus:outline-none resize-none"
                />
              </div>

              {/* Reviewer Name */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-on-surface-variant mb-1">Reviewing as:</label>
                  <input
                    type="text"
                    required
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface"
                  />
                </div>
                <div className="flex items-end">
                  <span className="text-[10px] text-on-surface-variant pb-2">
                    Verified Recipient / Family Review
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 px-4 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-ambient transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                <Star size={16} className="fill-white" />
                <span>Submit Service Rating & Review</span>
              </button>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default RateVolunteerModal;
