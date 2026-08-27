import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CalendarHeart, UserCheck, Clock, MapPin, Sparkles, Users, HeartHandshake } from 'lucide-react';

export const ScheduleVisitModal = () => {
  const {
    isScheduleVisitModalOpen,
    setIsScheduleVisitModalOpen,
    scheduleVisit,
    volunteers,
    currentElderly,
    showBookingSuccess,
    showToast
  } = useApp();

  const [visitCategory, setVisitCategory] = useState("volunteer"); // "volunteer" | "family"

  const [formData, setFormData] = useState({
    volunteerId: volunteers[0]?.id || "vol-001",
    volunteerName: volunteers[0]?.name || "Marcus Chen",
    visitCategory: "Volunteer Companion",
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    time: "10:30 AM - 12:00 PM",
    activityType: "Patio Conversation & Book Reading",
    location: "Home Residence (Living Room)",
    notes: "Companionship session, reviewing current novel and light gardening."
  });

  if (!isScheduleVisitModalOpen) return null;

  const handleVolunteerChange = (e) => {
    const volId = e.target.value;
    const vol = volunteers.find(v => v.id === volId);
    setFormData({
      ...formData,
      volunteerId: volId,
      volunteerName: vol ? vol.name : ""
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const assignedCompanion = visitCategory === 'family' ? `${currentElderly.emergencyContact.name} (Family)` : formData.volunteerName;
    scheduleVisit({
      ...formData,
      visitCategory: visitCategory === 'family' ? 'Family Quality Time' : 'Volunteer Companion',
      volunteerName: assignedCompanion
    });
    setIsScheduleVisitModalOpen(false);
    showBookingSuccess({
      title: "Companion Visit Confirmed!",
      seniorName: currentElderly?.name || "Eleanor Vance",
      serviceName: formData.activityType,
      date: formData.date,
      time: formData.time,
      caregiver: `${assignedCompanion} (${formData.location})`,
      referenceId: `VIS-${Math.floor(10000 + Math.random() * 90000)}`
    });
    showToast({
      type: 'volunteer',
      title: 'Companion Visit Booked!',
      message: `Scheduled ${formData.activityType} with ${assignedCompanion}.`
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-elevated border border-[#E2E8F0] relative max-h-[90vh] overflow-y-auto text-[#1A1D20]">
        
        <button
          onClick={() => setIsScheduleVisitModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl hover:bg-[#F1F5F9] text-[#64748B] hover:text-[#1A1D20] transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF1EC] text-primary flex items-center justify-center">
            <CalendarHeart size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#1A1D20] font-serif">Schedule In-Person Visit</h2>
            <p className="text-xs text-[#64748B]">Book a verified companion or family bonding session</p>
          </div>
        </div>

        {/* Persona Choice: Volunteer vs Family Visit */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-[#1A1D20] mb-1.5">Who is visiting?</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setVisitCategory('volunteer')}
              className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                visitCategory === 'volunteer'
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-[#F8F9FA] border-[#E2E8F0] text-[#64748B] hover:border-primary/40'
              }`}
            >
              <HeartHandshake size={16} />
              <span>Verified Volunteer Aide</span>
            </button>

            <button
              type="button"
              onClick={() => setVisitCategory('family')}
              className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                visitCategory === 'family'
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-[#F8F9FA] border-[#E2E8F0] text-[#64748B] hover:border-primary/40'
              }`}
            >
              <Users size={16} />
              <span>Family Member Visit</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {visitCategory === 'volunteer' ? (
            <div>
              <label className="block text-xs font-semibold text-[#1A1D20] mb-1">Select Volunteer Aide</label>
              <select
                value={formData.volunteerId}
                onChange={handleVolunteerChange}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] border border-[#E2E8F0] text-xs text-[#1A1D20] focus:ring-2 focus:ring-primary focus:outline-none"
              >
                {volunteers.map(vol => (
                  <option key={vol.id} value={vol.id}>
                    {vol.name} • {vol.role} ({vol.compatibilityScore}% match)
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="p-3 rounded-2xl bg-[#FFF1EC] border border-[#FFE8DF] text-xs flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=128&h=128"
                alt="Sarah Vance"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-[#1A1D20]">{currentElderly.emergencyContact.name}</p>
                <p className="text-[11px] text-[#64748B]">{currentElderly.emergencyContact.relation} • {currentElderly.emergencyContact.phone}</p>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[#1A1D20] mb-1">Activity Focus / Goal</label>
            <select
              value={formData.activityType}
              onChange={(e) => setFormData({ ...formData, activityType: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] border border-[#E2E8F0] text-xs text-[#1A1D20] focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="Cinema Matinee & Popcorn Escort">🎬 Cinema Matinee & Popcorn Escort</option>
              <option value="Home Movie Afternoon & Classic Film Discussion">🍿 Home Movie Afternoon & Classic Film Discussion</option>
              <option value="Garden Walk & Medication Review">Garden Walk & Medication Review</option>
              <option value="Patio Conversation & Book Reading">Patio Conversation & Book Reading</option>
              <option value="Watercolor Landscape Session">Watercolor Landscape Session</option>
              <option value="Family Sunday Meal & Photo Scrapbooking">Family Sunday Meal & Photo Scrapbooking</option>
              <option value="Farmer's Market & Fresh Produce Stroll">Farmer's Market & Fresh Produce Stroll</option>
              <option value="Classical Piano Recital & Herbal Tea Hour">Classical Piano Recital & Herbal Tea Hour</option>
              <option value="Memory & Chess Puzzle Challenge">Memory & Chess Puzzle Challenge</option>
              <option value="Nutritional Meal Prep Assistance">Nutritional Meal Prep Assistance</option>
              <option value="Tech Setup & Video Call Family">Tech Setup & Video Call Family</option>
              <option value="Gentle Mobility Stretches & Chair Yoga">Gentle Mobility Stretches & Chair Yoga</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#1A1D20] mb-1">Visit Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] border border-[#E2E8F0] text-xs text-[#1A1D20] focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#1A1D20] mb-1">Preferred Time Slot</label>
              <select
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] border border-[#E2E8F0] text-xs text-[#1A1D20] focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="09:00 AM - 10:30 AM">Morning (09:00 AM - 10:30 AM)</option>
                <option value="10:30 AM - 12:00 PM">Late Morning (10:30 AM - 12:00 PM)</option>
                <option value="02:00 PM - 04:00 PM">Afternoon (02:00 PM - 04:00 PM)</option>
                <option value="04:30 PM - 07:00 PM">Evening Dinner (04:30 PM - 07:00 PM)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1A1D20] mb-1">Meeting Location</label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] border border-[#E2E8F0] text-xs text-[#1A1D20] focus:ring-2 focus:ring-primary focus:outline-none"
              placeholder="e.g. 142 Maplewood Drive or Springfield Rose Park"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#1A1D20] mb-1">Special Notes / Care Guidance</label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8F9FA] border border-[#E2E8F0] text-xs text-[#1A1D20] focus:ring-2 focus:ring-primary focus:outline-none resize-none"
              placeholder="e.g. Eleanor prefers shaded walking and peppermint tea."
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-ambient transition-all active:scale-95"
          >
            Confirm & Schedule Visit
          </button>
        </form>

      </div>
    </div>
  );
};

export default ScheduleVisitModal;
