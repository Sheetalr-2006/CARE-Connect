import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, Sparkles, Check, ArrowRight, BookOpen, Palette, Flower2, Gamepad2, Coffee, Music, Footprints, ShieldCheck } from 'lucide-react';

export const InteractionsPage = () => {
  const navigate = useNavigate();

  const activities = [
    { id: "garden", title: "Gardening & Flower Care", icon: Flower2, desc: "Watering plants, patio gardening, floral arranging" },
    { id: "art", title: "Watercolor & Painting", icon: Palette, desc: "Gentle guided artistic expression and sketching" },
    { id: "reading", title: "Book Club & Reading", icon: BookOpen, desc: "Reading novels, poetry, and discussing classic literature" },
    { id: "walk", title: "Neighborhood Walks", icon: Footprints, desc: "Gentle morning or evening walks in shaded parks" },
    { id: "games", title: "Chess & Brain Puzzles", icon: Gamepad2, desc: "Crosswords, jigsaw puzzles, and strategy board games" },
    { id: "tea", title: "Tea & Warm Conversation", icon: Coffee, desc: "Sharing life memories, storytelling, and casual chat" },
    { id: "music", title: "Music & Acoustic Melodies", icon: Music, desc: "Listening to classic records and singing favorites" }
  ];

  const [selectedActivities, setSelectedActivities] = useState(["garden", "reading", "tea", "art"]);

  const toggleActivity = (id) => {
    if (selectedActivities.includes(id)) {
      setSelectedActivities(selectedActivities.filter(a => a !== id));
    } else {
      setSelectedActivities([...selectedActivities, id]);
    }
  };

  const handleFinish = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 max-w-xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link to="/" className="flex items-center gap-2 group" title="CareConnect Home">
          <img
            src="/careconnect-logo.png"
            alt="CareConnect Logo"
            className="h-10 sm:h-12 w-auto max-w-[190px] object-contain transition-transform group-hover:scale-105"
          />
        </Link>
        <span className="text-[11px] font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
          Step 3 of 3 • Preferences
        </span>
      </div>

      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl shadow-ambient border border-surface-container-high">
        
        <div className="mb-6">
          <h1 className="text-2xl font-black text-on-surface">Choose Favorite Interactions & Activities</h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Select hobbies and companionship activities that bring you happiness. We will match you with volunteers who share these passions.
          </p>
        </div>

        {/* Activity Cards List */}
        <div className="space-y-3">
          {activities.map((act) => {
            const Icon = act.icon;
            const isSelected = selectedActivities.includes(act.id);
            return (
              <div
                key={act.id}
                onClick={() => toggleActivity(act.id)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isSelected
                    ? 'bg-primary/5 border-primary shadow-sm ring-1 ring-primary/20'
                    : 'bg-surface-container-low border-surface-container hover:border-outline-variant/60'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'bg-primary text-white shadow-sm' : 'bg-surface-container text-on-surface-variant'
                  }`}>
                    <Icon size={22} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs sm:text-sm font-bold text-on-surface truncate">{act.title}</h3>
                    <p className="text-[11px] text-on-surface-variant truncate">{act.desc}</p>
                  </div>
                </div>

                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  isSelected ? 'bg-primary border-primary text-white' : 'border-outline-variant bg-transparent'
                }`}>
                  {isSelected && <Check size={14} className="stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-4 border-t border-surface-container">
          <button
            onClick={handleFinish}
            className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow-ambient transition-transform active:scale-95"
          >
            <span>Complete Setup & Enter Dashboard</span>
            <ArrowRight size={18} />
          </button>
        </div>

      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
        <ShieldCheck size={16} className="text-primary" />
        <span>Preferences can be adjusted anytime from Settings</span>
      </div>

    </div>
  );
};
