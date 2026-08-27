import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Pill, Clock, AlertCircle } from 'lucide-react';

export const AddMedicationModal = () => {
  const { isAddMedicationModalOpen, setIsAddMedicationModalOpen, addMedication } = useApp();

  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    timing: "Morning (08:00 AM)",
    mealInstruction: "Take with meals and water",
    purpose: "",
    remainingDays: 30
  });

  if (!isAddMedicationModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.dosage) return;
    addMedication(formData);
    setIsAddMedicationModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-surface-container-high relative max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={() => setIsAddMedicationModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
            <Pill size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-on-surface">Add New Prescription / Vitamin</h2>
            <p className="text-xs text-on-surface-variant">Configure daily medication reminders & adherence alerts</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Medication Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/50 text-xs text-on-surface focus:ring-2 focus:ring-primary/40 focus:outline-none"
              placeholder="e.g. Lisinopril, Metformin, Vitamin D3"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Dosage</label>
              <input
                type="text"
                required
                value={formData.dosage}
                onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/50 text-xs text-on-surface focus:ring-2 focus:ring-primary/40 focus:outline-none"
                placeholder="e.g. 10 mg, 500 mg, 1 tablet"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Time of Day</label>
              <select
                value={formData.timing}
                onChange={(e) => setFormData({ ...formData, timing: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/50 text-xs text-on-surface focus:ring-2 focus:ring-primary/40 focus:outline-none"
              >
                <option value="Morning (08:00 AM)">Morning (08:00 AM)</option>
                <option value="Afternoon (01:00 PM)">Afternoon (01:00 PM)</option>
                <option value="Evening (07:30 PM)">Evening (07:30 PM)</option>
                <option value="Bedtime (10:00 PM)">Bedtime (10:00 PM)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Purpose / Condition</label>
            <input
              type="text"
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/50 text-xs text-on-surface focus:ring-2 focus:ring-primary/40 focus:outline-none"
              placeholder="e.g. Blood Pressure, Joint Mobility, Sugar Control"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Meal & Water Instructions</label>
            <input
              type="text"
              value={formData.mealInstruction}
              onChange={(e) => setFormData({ ...formData, mealInstruction: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/50 text-xs text-on-surface focus:ring-2 focus:ring-primary/40 focus:outline-none"
              placeholder="Take with food, on empty stomach..."
            />
          </div>

          <div className="pt-3 flex gap-3">
            <button
              type="button"
              onClick={() => setIsAddMedicationModalOpen(false)}
              className="flex-1 py-3 px-4 rounded-xl border border-outline-variant/50 text-xs font-semibold text-on-surface hover:bg-surface-container transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 rounded-xl bg-primary text-white text-xs font-bold shadow-ambient hover:bg-primary/90 transition-all"
            >
              Add to Schedule
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
