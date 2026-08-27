import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { Heart, User, Calendar, Phone, MapPin, Activity, ArrowRight, ShieldCheck } from 'lucide-react';
import { PhoneInput } from '../../components/common/PhoneInput';

export const ElderlySignupPage = () => {
  const { currentElderly, updateElderlyVitals } = useApp();
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "Eleanor Vance",
    age: 78,
    dob: "1948-03-15",
    phone: "+1 (555) 234-5678",
    address: "142 Maplewood Drive, Springfield",
    mobilityLevel: "Independent with cane",
    bloodType: "A+",
    emergencyContactName: "Sarah Vance",
    emergencyContactPhone: "+1 (555) 890-1234",
    primaryCondition: "Mild Hypertension"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser({
      name: formData.name,
      email: "eleanor.vance@example.com",
      role: "elderly",
      phone: formData.phone,
      address: formData.address
    });
    navigate('/auth/interactions');
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 max-w-xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link to="/auth/role-select" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-ambient">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <span className="font-bold text-lg text-on-surface">CareConnect</span>
        </Link>
        <span className="text-[11px] font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
          Step 2 of 3 • Senior Profile
        </span>
      </div>

      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl shadow-ambient border border-surface-container-high">
        
        <div className="mb-6">
          <h1 className="text-2xl font-black text-on-surface">Elderly Recipient Profile</h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Fill in details to personalize your safety network and companionship matching.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Your Full Name</label>
            <div className="relative">
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-surface-container-low border border-outline-variant/40 text-sm text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
              />
              <User size={18} className="absolute left-3.5 top-3.5 text-on-surface-variant" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Date of Birth</label>
              <input
                type="date"
                required
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full px-3.5 py-3 rounded-2xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Phone Number with Country Code</label>
              <PhoneInput
                required
                value={formData.phone}
                onChange={(val) => setFormData({ ...formData, phone: val })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Home Residence Address</label>
            <div className="relative">
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
              />
              <MapPin size={18} className="absolute left-3.5 top-3.5 text-on-surface-variant" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Mobility Status</label>
              <select
                value={formData.mobilityLevel}
                onChange={(e) => setFormData({ ...formData, mobilityLevel: e.target.value })}
                className="w-full px-3.5 py-3 rounded-2xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="Fully Independent">Fully Independent</option>
                <option value="Independent with cane">Independent with cane</option>
                <option value="Walker assisted">Walker assisted</option>
                <option value="Wheelchair assisted">Wheelchair assisted</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Primary Condition</label>
              <input
                type="text"
                value={formData.primaryCondition}
                onChange={(e) => setFormData({ ...formData, primaryCondition: e.target.value })}
                className="w-full px-3.5 py-3 rounded-2xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="e.g. Hypertension, Arthritis"
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="p-4 rounded-2xl bg-surface-container-low/70 border border-outline-variant/30 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <Activity size={15} /> Primary Emergency Contact
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-on-surface-variant mb-1">Contact Name & Relation</label>
                <input
                  type="text"
                  required
                  value={formData.emergencyContactName}
                  onChange={(e) => setFormData({ ...formData, emergencyContactName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-xs text-on-surface"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-on-surface-variant mb-1">Emergency Phone with Country Code</label>
                <PhoneInput
                  required
                  value={formData.emergencyContactPhone}
                  onChange={(val) => setFormData({ ...formData, emergencyContactPhone: val })}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow-ambient transition-transform active:scale-95"
          >
            <span>Next: Choose Activities & Interests</span>
            <ArrowRight size={18} />
          </button>
        </form>

      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
        <ShieldCheck size={16} className="text-emerald-600" />
        <span>CareConnect Identity & Medical Encryption</span>
      </div>

    </div>
  );
};
