import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Heart, User, Users, HeartHandshake, ArrowRight, ShieldCheck } from 'lucide-react';

export const RoleSelectPage = () => {
  const [selectedRole, setSelectedRole] = useState('elderly');
  const navigate = useNavigate();

  const roles = [
    {
      id: "elderly",
      title: "Care Recipient (Elderly)",
      description: "I am an independent senior seeking daily companion visits, medication reminders, and community activities.",
      icon: User,
      badge: "Easy & High Contrast",
      route: "/auth/signup-elderly"
    },
    {
      id: "family",
      title: "Family Member / Caregiver",
      description: "I want to oversee the health, medication logs, and volunteer visits for my loved one with live updates.",
      icon: Users,
      badge: "Real-time Monitoring",
      route: "/auth/signup-family"
    },
    {
      id: "volunteer",
      title: "Companion Volunteer",
      description: "I want to share my time, skills, and companionship to support elderly individuals in my local neighborhood.",
      icon: HeartHandshake,
      badge: "Community Hero",
      route: "/auth/signup-volunteer"
    }
  ];

  const handleContinue = () => {
    const roleObj = roles.find(r => r.id === selectedRole);
    if (roleObj) {
      navigate(roleObj.route);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between p-4 sm:p-6 lg:p-8 max-w-lg mx-auto">
      
      {/* Top Brand */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <Link to="/auth/login" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-ambient">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <span className="font-bold text-lg text-on-surface">CareConnect</span>
          </Link>
          <Link to="/auth/login" className="text-xs font-semibold text-primary hover:underline">
            Already registered? Sign In
          </Link>
        </div>

        {/* Heading */}
        <div className="mb-6">
          <span className="text-[11px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
            Step 1 of 3 • Persona Onboarding
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-on-surface mt-2 tracking-tight">
            How would you like to use CareConnect?
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Choose your role to personalize your dashboard, accessibility settings, and tailored features.
          </p>
        </div>

        {/* Role Options */}
        <div className="space-y-3.5">
          {roles.map((r) => {
            const Icon = r.icon;
            const isSelected = selectedRole === r.id;
            return (
              <div
                key={r.id}
                onClick={() => setSelectedRole(r.id)}
                className={`p-4 sm:p-5 rounded-3xl border-2 transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-surface-container-lowest border-primary shadow-ambient ring-2 ring-primary/20'
                    : 'bg-surface-container-low/60 border-surface-container hover:bg-surface-container-low hover:border-outline-variant/60'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected ? 'bg-primary text-white shadow-md' : 'bg-surface-container text-on-surface-variant'
                  }`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-on-surface">{r.title}</h3>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant">
                        {r.badge}
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">{r.description}</p>
                  </div>
                </div>

                {/* Selected Radio Indicator */}
                <div className="absolute top-4 right-4 sm:static sm:mt-0">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected ? 'border-primary bg-primary text-white' : 'border-outline-variant bg-transparent'
                  }`}>
                    {isSelected && <span className="w-2 h-2 rounded-full bg-white"></span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mt-8 pt-4 border-t border-surface-container">
        <button
          onClick={handleContinue}
          className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow-ambient transition-transform active:scale-95"
        >
          <span>Continue Setup</span>
          <ArrowRight size={18} />
        </button>
        <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-on-surface-variant">
          <ShieldCheck size={14} className="text-emerald-600" />
          <span>Caregiver verification and encrypted identity protection</span>
        </div>
      </div>

    </div>
  );
};
