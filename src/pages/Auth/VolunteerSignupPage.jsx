import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Heart, User, Award, Check, Plus, X, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { PhoneInput } from '../../components/common/PhoneInput';

export const VolunteerSignupPage = () => {
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "Marcus Chen",
    email: "marcus.chen@example.com",
    phone: "+1 (555) 345-6789",
    location: "Springfield North",
    bio: "Pre-med nursing student eager to provide compassionate companionship, vital checks, and friendly conversation."
  });

  const [degrees, setDegrees] = useState([
    "B.S. Nursing (Pre-Med Candidate)",
    "Certified First Aid & CPR (Red Cross)",
    "Elder Care Sensitivity Certified"
  ]);
  const [newDegree, setNewDegree] = useState("");

  const [selectedSkills, setSelectedSkills] = useState([
    "Vital Sign Monitoring",
    "Active Listening & Storytelling",
    "Light Gardening",
    "Book & Newspaper Reading",
    "Patience & Empathy"
  ]);

  const skillOptions = [
    "Vital Sign Monitoring",
    "Active Listening & Storytelling",
    "Light Gardening",
    "Book & Newspaper Reading",
    "Patience & Empathy",
    "Safe Transport & Escort",
    "Tech & Smartphone Help",
    "Cooking & Meal Preparation",
    "Art & Watercolor Guidance",
    "Chess & Brain Puzzles"
  ];

  const handleAddDegree = () => {
    if (newDegree.trim() && !degrees.includes(newDegree.trim())) {
      setDegrees([...degrees, newDegree.trim()]);
      setNewDegree("");
    }
  };

  const handleRemoveDegree = (deg) => {
    setDegrees(degrees.filter(d => d !== deg));
  };

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser({
      name: formData.name,
      email: formData.email,
      role: "volunteer",
      phone: formData.phone,
      location: formData.location,
      degrees,
      skills: selectedSkills,
      bio: formData.bio
    });
    navigate('/auth/pending-approval');
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 max-w-xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link to="/auth/role-select" className="flex items-center gap-2 group" title="CareConnect Home">
          <img
            src="/careconnect-logo.png"
            alt="CareConnect Logo"
            className="h-10 sm:h-12 w-auto max-w-[190px] object-contain transition-transform group-hover:scale-105"
          />
        </Link>
        <span className="text-[11px] font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
          Volunteer Registration
        </span>
      </div>

      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl shadow-ambient border border-surface-container-high">
        
        <div className="mb-6">
          <h1 className="text-2xl font-black text-on-surface">Volunteer Qualifications & Skills</h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Highlight your degrees, healthcare credentials, and interests to receive ideal senior matches.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Full Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Phone Number with Country Code</label>
              <PhoneInput
                required
                value={formData.phone}
                onChange={(val) => setFormData({ ...formData, phone: val })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">City / Region</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>

          {/* Volunteer Service Rate Option */}
          <div className="p-4 rounded-2xl bg-surface-container-low border border-surface-container space-y-2">
            <label className="block text-xs font-bold text-on-surface flex items-center justify-between">
              <span>Volunteer Service Rate / Compensation Option:</span>
              <span className="text-[11px] text-primary font-semibold">Configurable per service</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {[
                { id: "free", label: "Community Volunteer", rate: "$0 / hr (Pro-bono)" },
                { id: "standard", label: "Specialized Companion", rate: "$12 - $15 / hr" },
                { id: "certified", label: "Certified Healthcare Aide", rate: "$20 - $25 / hr" }
              ].map((r) => (
                <div
                  key={r.id}
                  onClick={() => setFormData({ ...formData, hourlyRate: r.rate })}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    formData.hourlyRate === r.rate
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-surface-container-lowest text-on-surface border-surface-container hover:border-primary/40'
                  }`}
                >
                  <p className="text-xs font-bold">{r.label}</p>
                  <p className={`text-[11px] mt-0.5 ${formData.hourlyRate === r.rate ? 'text-white/80' : 'text-on-surface-variant'}`}>{r.rate}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Degrees & Certifications Section (Matching Stitch Screen) */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
              <Award size={16} /> Academic Degrees & Certifications Added
            </label>
            <div className="space-y-2">
              {degrees.map((deg, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-primary/5 border border-primary/20 text-xs font-medium text-on-surface"
                >
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-primary font-bold" />
                    <span>{deg}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveDegree(deg)}
                    className="p-1 text-on-surface-variant hover:text-error rounded-lg"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>

            {/* Add new degree input */}
            <div className="flex gap-2 pt-1">
              <input
                type="text"
                value={newDegree}
                onChange={(e) => setNewDegree(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddDegree())}
                placeholder="e.g. B.S. Psychology, CPR Training"
                className="flex-1 px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddDegree}
                className="px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-bold flex items-center gap-1 hover:bg-primary/90"
              >
                <Plus size={15} /> Add
              </button>
            </div>
          </div>

          {/* Skills & Talents Chips */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-on-surface-variant mb-2">
              Companionship Skills & Interests:
            </label>
            <div className="flex flex-wrap gap-2">
              {skillOptions.map((skill) => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                      isSelected
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-surface-container-low text-on-surface border-surface-container hover:border-primary/40'
                    }`}
                  >
                    {isSelected ? `✓ ${skill}` : `+ ${skill}`}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Short Volunteer Bio</label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface focus:ring-2 focus:ring-primary focus:outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow-ambient transition-transform active:scale-95"
          >
            <span>Submit for Background Verification</span>
            <ArrowRight size={18} />
          </button>

        </form>

      </div>

      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
        <ShieldCheck size={16} className="text-primary" />
        <span>Comprehensive Background Screening with Verified ID</span>
      </div>

    </div>
  );
};
