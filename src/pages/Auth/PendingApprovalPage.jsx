import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Clock, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export const PendingApprovalPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-between p-4 sm:p-6 lg:p-8 max-w-lg mx-auto">
      
      <div className="flex items-center justify-between mb-8">
        <Link to="/" className="flex items-center gap-2 group" title="CareConnect Home">
          <img
            src="/careconnect-logo.png"
            alt="CareConnect Logo"
            className="h-10 sm:h-12 w-auto max-w-[190px] object-contain transition-transform group-hover:scale-105"
          />
        </Link>
        <span className="text-[11px] font-semibold text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
          Verification In Progress
        </span>
      </div>

      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl shadow-ambient border border-surface-container-high text-center">
        
        <div className="w-20 h-20 rounded-3xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto mb-6 animate-pulse">
          <Clock size={40} />
        </div>

        <h1 className="text-2xl font-black text-on-surface mb-2">
          Background Verification Pending
        </h1>
        
        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-6">
          Thank you for applying to become a CareConnect Companion Volunteer! To ensure maximum safety for our elderly seniors, our coordinator team is reviewing your credentials and identity background check.
        </p>

        {/* Status Steps */}
        <div className="bg-surface-container-low p-4 rounded-2xl border border-surface-container text-left space-y-3 mb-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-on-surface">Application & Degrees Submitted</span>
              <p className="text-[11px] text-on-surface-variant">Credentials recorded successfully</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock size={18} className="text-amber-600 flex-shrink-0 animate-spin" />
            <div className="text-xs">
              <span className="font-bold text-on-surface">ID & Criminal Background Screening</span>
              <p className="text-[11px] text-amber-700 font-medium">Estimated time: 12 - 24 hours</p>
            </div>
          </div>
          <div className="flex items-center gap-3 opacity-60">
            <div className="w-4 h-4 rounded-full border-2 border-outline-variant flex-shrink-0"></div>
            <div className="text-xs">
              <span className="font-bold text-on-surface">Final Care Coordinator Approval</span>
              <p className="text-[11px] text-on-surface-variant">Profile activation & senior matching</p>
            </div>
          </div>
        </div>

        {/* Demo Fast-forward Button */}
        <div className="space-y-3">
          <Link
            to="/volunteer-matching"
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-ambient transition-all"
          >
            <span>Preview Approved Volunteer Portal (Demo)</span>
            <ArrowRight size={16} />
          </Link>
          
          <Link
            to="/"
            className="block text-xs font-semibold text-on-surface-variant hover:text-on-surface py-1"
          >
            Return to Main Portal
          </Link>
        </div>

      </div>

      <div className="mt-8 flex items-center justify-center gap-2 text-xs text-on-surface-variant text-center">
        <ShieldCheck size={16} className="text-emerald-600" />
        <span>100% Verified Community Volunteer Safeguards</span>
      </div>

    </div>
  );
};
