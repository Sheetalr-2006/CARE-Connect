import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Heart, Users, User, Phone, MapPin, HeartPulse, ArrowRight, ShieldCheck } from 'lucide-react';
import { PhoneInput } from '../../components/common/PhoneInput';

export const FamilySignupPage = () => {
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    caregiverName: "Sarah Vance",
    email: "sarah.vance@example.com",
    phone: "+1 (555) 890-1234",
    relation: "Daughter & Primary Legal Guardian",
    elderlyName: "Eleanor Vance",
    elderlyAge: 78,
    elderlyAddress: "142 Maplewood Drive, Springfield",
    healthSummary: "Hypertension, mild arthritis. Lives independently and loves gardening and reading."
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser({
      name: formData.caregiverName,
      email: formData.email,
      role: "family",
      phone: formData.phone
    });
    navigate('/family-dashboard');
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 max-w-xl mx-auto">
      
      <div className="flex items-center justify-between mb-6">
        <Link to="/auth/role-select" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-ambient">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <span className="font-bold text-lg text-on-surface">CareConnect</span>
        </Link>
        <span className="text-[11px] font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
          Family Caregiver Setup
        </span>
      </div>

      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl shadow-ambient border border-surface-container-high">
        
        <div className="mb-6">
          <h1 className="text-2xl font-black text-on-surface">Caregiver & Loved One Profile</h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Connect to your family member's portal for real-time vitals, medication adherence, and visit updates.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <Users size={16} /> Your Guardian Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-on-surface-variant mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.caregiverName}
                  onChange={(e) => setFormData({ ...formData, caregiverName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-xs text-on-surface"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-on-surface-variant mb-1">Relationship to Senior</label>
                <input
                  type="text"
                  required
                  value={formData.relation}
                  onChange={(e) => setFormData({ ...formData, relation: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-xs text-on-surface"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-on-surface-variant mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-xs text-on-surface"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-on-surface-variant mb-1">Mobile Phone with Country Code</label>
                <PhoneInput
                  required
                  value={formData.phone}
                  onChange={(val) => setFormData({ ...formData, phone: val })}
                />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <User size={16} /> Loved One (Elderly Member) Information
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-on-surface-variant mb-1">Senior's Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.elderlyName}
                  onChange={(e) => setFormData({ ...formData, elderlyName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-xs text-on-surface"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-on-surface-variant mb-1">Senior's Age</label>
                <input
                  type="number"
                  required
                  value={formData.elderlyAge}
                  onChange={(e) => setFormData({ ...formData, elderlyAge: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-xs text-on-surface"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-on-surface-variant mb-1">Senior's Home Address</label>
              <input
                type="text"
                required
                value={formData.elderlyAddress}
                onChange={(e) => setFormData({ ...formData, elderlyAddress: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-xs text-on-surface"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-on-surface-variant mb-1">Known Health Conditions & Needs</label>
              <textarea
                rows={2}
                value={formData.healthSummary}
                onChange={(e) => setFormData({ ...formData, healthSummary: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-surface-container-lowest border border-outline-variant/40 text-xs text-on-surface resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow-ambient transition-transform active:scale-95"
          >
            <span>Activate Family Dashboard</span>
            <ArrowRight size={18} />
          </button>
        </form>

      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
        <ShieldCheck size={16} className="text-emerald-600" />
        <span>End-to-End Encrypted Health Records Sync</span>
      </div>

    </div>
  );
};
