import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Calendar, User, Building, Car, FileText } from 'lucide-react';

export const BookAppointmentModal = () => {
  const {
    isBookAppointmentModalOpen,
    setIsBookAppointmentModalOpen,
    bookAppointment,
    showBookingSuccess,
    showToast,
    currentElderly
  } = useApp();

  const [formData, setFormData] = useState({
    title: "General Health Follow-up",
    doctor: "Dr. Olivia Reed, MD",
    facility: "Springfield Wellness Pavilion",
    date: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
    time: "10:00 AM",
    type: "In-Person",
    transportAssistance: true,
    notes: "Review recent vitals and knee mobility exercises."
  });

  if (!isBookAppointmentModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    bookAppointment({
      ...formData,
      transportStatus: formData.transportAssistance ? "Driver Requested (Volunteer Matching)" : "N/A"
    });
    setIsBookAppointmentModalOpen(false);
    showBookingSuccess({
      title: "Doctor Appointment Scheduled!",
      seniorName: currentElderly?.name || "Eleanor Vance",
      serviceName: `${formData.title} (${formData.type})`,
      date: formData.date,
      time: formData.time,
      caregiver: `${formData.doctor} • ${formData.facility}`,
      referenceId: `APT-${Math.floor(10000 + Math.random() * 90000)}`
    });
    showToast({
      type: 'appointment',
      title: 'Medical Visit Confirmed',
      message: `Appointment with ${formData.doctor} scheduled for ${formData.date}.`
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-surface-container-high relative max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={() => setIsBookAppointmentModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Calendar size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-on-surface">Book Doctor Appointment</h2>
            <p className="text-xs text-on-surface-variant">Schedule medical visit & coordinate escort ride</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Appointment Purpose / Specialty</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/50 text-xs text-on-surface focus:ring-2 focus:ring-primary/40 focus:outline-none"
              placeholder="e.g. Cardiology Checkup, Dental, Eye Exam"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Physician / Specialist</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.doctor}
                  onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/50 text-xs text-on-surface focus:ring-2 focus:ring-primary/40 focus:outline-none"
                />
                <User size={15} className="absolute left-3 top-3 text-on-surface-variant" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Clinic / Hospital Facility</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.facility}
                  onChange={(e) => setFormData({ ...formData, facility: e.target.value })}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/50 text-xs text-on-surface focus:ring-2 focus:ring-primary/40 focus:outline-none"
                />
                <Building size={15} className="absolute left-3 top-3 text-on-surface-variant" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Date</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/50 text-xs text-on-surface focus:ring-2 focus:ring-primary/40 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Time</label>
              <input
                type="text"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/50 text-xs text-on-surface focus:ring-2 focus:ring-primary/40 focus:outline-none"
                placeholder="10:00 AM"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Visit Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/50 text-xs text-on-surface focus:ring-2 focus:ring-primary/40 focus:outline-none"
              >
                <option value="In-Person">In-Person Clinic</option>
                <option value="Virtual Video Call">Virtual Telehealth</option>
                <option value="Home Visit">In-Home Checkup</option>
              </select>
            </div>
          </div>

          {/* Transport Assistance Checkbox */}
          <div className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex items-start gap-3">
            <input
              type="checkbox"
              id="transportCheck"
              checked={formData.transportAssistance}
              onChange={(e) => setFormData({ ...formData, transportAssistance: e.target.checked })}
              className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary"
            />
            <label htmlFor="transportCheck" className="text-xs text-on-surface cursor-pointer">
              <span className="font-bold flex items-center gap-1.5">
                <Car size={15} className="text-primary" /> Request Escort & Safe Transport Assistance
              </span>
              <p className="text-[11px] text-on-surface-variant mt-0.5">
                A verified CareConnect volunteer will drive and escort the senior to and from the appointment.
              </p>
            </label>
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Clinical Notes & Instructions</label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/50 text-xs text-on-surface focus:ring-2 focus:ring-primary/40 focus:outline-none resize-none"
              placeholder="Fasting requirements, medical records needed..."
            />
          </div>

          <div className="pt-3 flex gap-3">
            <button
              type="button"
              onClick={() => setIsBookAppointmentModalOpen(false)}
              className="flex-1 py-3 px-4 rounded-xl border border-outline-variant/50 text-xs font-semibold text-on-surface hover:bg-surface-container transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-xl bg-primary text-white text-xs font-bold shadow-ambient hover:bg-primary/90 transition-all"
            >
              Confirm Appointment
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
