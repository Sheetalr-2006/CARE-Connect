import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Smile,
  Heart,
  Moon,
  Utensils,
  Activity,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const WellbeingCheckIn = () => {
  const { currentElderly, addWellbeingLog, wellbeingLogs } = useApp();

  const moods = [
    { label: "Joyful & Energetic", emoji: "😄", score: 5, color: "border-orange-500 bg-orange-50/50" },
    { label: "Calm & Happy", emoji: "😊", score: 4, color: "border-primary bg-primary/10" },
    { label: "Neutral / Relaxed", emoji: "😐", score: 3, color: "border-surface-container bg-surface-container-low" },
    { label: "A Bit Tired", emoji: "🥱", score: 2, color: "border-amber-500 bg-amber-50/40" },
    { label: "Uncomfortable / Down", emoji: "😔", score: 1, color: "border-rose-500 bg-rose-50/40" }
  ];

  const [selectedMood, setSelectedMood] = useState(moods[0]);
  const [painLevel, setPainLevel] = useState(1);
  const [sleepHours, setSleepHours] = useState(8);
  const [sleepQuality, setSleepQuality] = useState("Restful & Uninterrupted");
  const [appetite, setAppetite] = useState("Good / Ate full breakfast");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addWellbeingLog({
      mood: selectedMood.label,
      moodScore: selectedMood.score,
      painLevel,
      sleepHours,
      sleepQuality,
      appetite,
      energyLevel: selectedMood.score >= 4 ? "High" : "Moderate",
      notes: notes || "Daily check-in logged smoothly."
    });
    setSubmitted(true);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-container-high shadow-card text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-primary/10 text-primary text-[11px] font-bold uppercase tracking-widest mb-2">
            Daily Senior Health Routine
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-on-surface">
            Today's Wellbeing Check-In
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Hi {currentElderly.name.split(' ')[0]}! Sharing how you feel each morning helps your caregiver & volunteers best support your day.
          </p>
        </div>

        <div className="w-16 h-16 rounded-3xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
          <Smile size={36} />
        </div>
      </div>

      {submitted ? (
        <div className="bg-surface-container-lowest p-8 sm:p-12 rounded-3xl border-2 border-primary shadow-ambient text-center space-y-4 animate-in zoom-in-95 duration-200">
          <div className="w-20 h-20 rounded-full bg-orange-100 text-primary flex items-center justify-center mx-auto">
            <CheckCircle2 size={44} />
          </div>
          <h2 className="text-2xl font-black text-on-surface">Thank You! Check-in Recorded</h2>
          <p className="text-sm text-on-surface-variant max-w-md mx-auto">
            Your morning check-in has been synchronized with Sarah Vance's Family Dashboard and your assigned volunteer.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setSubmitted(false)}
              className="px-6 py-3 rounded-2xl bg-primary text-white font-bold text-xs shadow-ambient hover:bg-primary/90 transition-all"
            >
              Update or Log Another Check-in
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* 1. Mood Selection */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-high shadow-card space-y-4">
            <label className="block text-sm font-bold text-on-surface flex items-center gap-2">
              <Smile size={18} className="text-primary" />
              1. How are you feeling overall this morning?
            </label>
            
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {moods.map((m, i) => {
                const isSelected = selectedMood.label === m.label;
                return (
                  <div
                    key={i}
                    onClick={() => setSelectedMood(m)}
                    className={`p-4 rounded-2xl border-2 text-center cursor-pointer transition-all ${
                      isSelected
                        ? `${m.color} shadow-sm ring-2 ring-primary/30 scale-105`
                        : 'bg-surface-container-low border-surface-container hover:border-primary/40'
                    }`}
                  >
                    <span className="text-3xl sm:text-4xl block mb-2">{m.emoji}</span>
                    <span className="text-xs font-bold text-on-surface block leading-tight">{m.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Pain & Joint Comfort */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-high shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-on-surface flex items-center gap-2">
                <Heart size={18} className="text-rose-600" />
                2. Any physical pain, knee stiffness or discomfort?
              </label>
              <span className="text-xs font-bold text-primary px-3 py-1 rounded-full bg-primary/10">
                Level {painLevel} of 5 ({painLevel === 0 ? 'No Pain' : painLevel <= 2 ? 'Mild' : 'Moderate/High'})
              </span>
            </div>

            <div className="grid grid-cols-6 gap-2">
              {[0, 1, 2, 3, 4, 5].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setPainLevel(lvl)}
                  className={`py-3 rounded-2xl text-xs font-bold transition-all border ${
                    painLevel === lvl
                      ? 'bg-primary text-white border-primary shadow-sm scale-105'
                      : 'bg-surface-container-low border-surface-container text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {lvl}
                  <span className="block text-[9px] font-normal opacity-80 mt-0.5">
                    {lvl === 0 ? 'None' : lvl === 5 ? 'Severe' : ''}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Sleep & Appetite */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-high shadow-card space-y-3">
              <label className="block text-sm font-bold text-on-surface flex items-center gap-2">
                <Moon size={18} className="text-indigo-600" />
                3. Last Night's Sleep
              </label>
              <div className="space-y-2">
                <select
                  value={sleepQuality}
                  onChange={(e) => setSleepQuality(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="Restful & Uninterrupted">Restful & Uninterrupted (8+ hrs)</option>
                  <option value="Good / Woke up once">Good / Woke up once (6-7 hrs)</option>
                  <option value="Restless / Difficulty sleeping">Restless / Difficulty sleeping</option>
                </select>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-high shadow-card space-y-3">
              <label className="block text-sm font-bold text-on-surface flex items-center gap-2">
                <Utensils size={18} className="text-amber-600" />
                4. Appetite & Breakfast
              </label>
              <div className="space-y-2">
                <select
                  value={appetite}
                  onChange={(e) => setAppetite(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="Good / Ate full breakfast">Good / Ate full breakfast</option>
                  <option value="Light snack / Tea only">Light snack / Tea only</option>
                  <option value="Low appetite today">Low appetite today</option>
                </select>
              </div>
            </div>

          </div>

          {/* 4. Notes */}
          <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-high shadow-card space-y-3">
            <label className="block text-sm font-bold text-on-surface">
              5. Anything specific you would like to share with your family or volunteer? (Optional)
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Looking forward to reading Jane Eyre today, knee feels much better..."
              className="w-full p-3 rounded-2xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface focus:ring-2 focus:ring-primary focus:outline-none resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow-ambient transition-transform active:scale-95"
          >
            <span>Submit Today's Wellbeing Check-In</span>
            <ArrowRight size={18} />
          </button>

        </form>
      )}

      {/* Recent History Table */}
      <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-high shadow-card space-y-4">
        <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
          <Calendar size={18} className="text-primary" />
          Recent Check-In History
        </h3>
        
        <div className="space-y-3">
          {wellbeingLogs.map((log) => (
            <div key={log.id} className="p-4 rounded-2xl bg-surface-container-low border border-surface-container flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-on-surface">{log.date}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    Mood: {log.mood}
                  </span>
                </div>
                <p className="text-on-surface-variant leading-relaxed">
                  Sleep: {log.sleepQuality} • Pain Level: {log.painLevel}/5 • {log.notes}
                </p>
              </div>
              <span className="text-primary font-bold flex items-center gap-1 self-end sm:self-center">
                <CheckCircle2 size={14} /> Logged
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
