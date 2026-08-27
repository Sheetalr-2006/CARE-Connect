import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  Check,
  Sparkles,
  DollarSign,
  Globe,
  ArrowRight,
  PhoneCall,
  Zap,
  CheckCircle2
} from 'lucide-react';

export const CarePlans = () => {
  const {
    carePlans,
    selectedPlanId,
    setSelectedPlanId,
    billingInterval,
    setBillingInterval,
    currency,
    setCurrency
  } = useApp();

  const [checkoutModalPlan, setCheckoutModalPlan] = useState(null);

  const getPrice = (plan) => {
    if (currency === 'INR') {
      return billingInterval === 'monthly' ? `₹${plan.priceMonthlyINR}` : `₹${plan.priceAnnualINR}`;
    }
    return billingInterval === 'monthly' ? `$${plan.priceMonthlyUSD}` : `$${plan.priceAnnualUSD}`;
  };

  const getPeriodLabel = () => {
    return billingInterval === 'monthly' ? '/month' : '/year';
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlanId(plan.id);
    setCheckoutModalPlan(plan);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-[11px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-1 rounded-full">
          Transparent, Flexible Care Memberships
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-on-surface tracking-tight">
          Choose the Perfect Care Plan for Your Loved One
        </h1>
        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
          From basic friendly companion visits to 24/7 all-inclusive concierge support, CareConnect delivers personalized peace of mind.
        </p>

        {/* Currency & Billing Interval Toggles (Stitch Multi-Interval & Multi-Currency Support) */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          
          {/* Monthly / Annual Toggle */}
          <div className="bg-surface-container p-1 rounded-2xl flex items-center shadow-inner">
            <button
              onClick={() => setBillingInterval('monthly')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                billingInterval === 'monthly'
                  ? 'bg-surface-container-lowest text-on-surface shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingInterval('annual')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                billingInterval === 'annual'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                Save 20%
              </span>
            </button>
          </div>

          {/* Currency Toggle (USD vs INR) */}
          <div className="bg-surface-container p-1 rounded-2xl flex items-center shadow-inner">
            <button
              onClick={() => setCurrency('USD')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                currency === 'USD'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrency('INR')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                currency === 'INR'
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              INR (₹)
            </button>
          </div>

        </div>
      </div>

      {/* Plan Cards Grid (Staggered Sequential Pop-Up) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {carePlans.map((plan, idx) => {
          const isSelected = selectedPlanId === plan.id;
          return (
            <div
              key={plan.id}
              style={{ animationDelay: `${idx * 150 + 100}ms` }}
              className={`p-6 sm:p-8 rounded-3xl border-2 transition-all flex flex-col justify-between relative animate-fade-in-scale ${
                plan.recommended
                  ? 'bg-surface-container-lowest border-primary shadow-ambient ring-2 ring-primary/20 scale-100 lg:-translate-y-2'
                  : isSelected
                  ? 'bg-surface-container-lowest border-primary/60 shadow-card'
                  : 'bg-surface-container-low/70 border-surface-container hover:border-outline-variant/60 shadow-card'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                  ★ Most Popular Choice
                </div>
              )}

              <div>
                <div className="mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                    {plan.tier}
                  </span>
                  <h3 className="text-xl font-bold text-on-surface mt-2">{plan.name}</h3>
                  <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                {/* Price Display */}
                <div className="my-6 pb-6 border-b border-surface-container">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl sm:text-4xl font-black text-on-surface tracking-tight">
                      {getPrice(plan)}
                    </span>
                    <span className="text-xs font-semibold text-on-surface-variant">
                      {getPeriodLabel()}
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-700 font-medium block mt-1">
                    {billingInterval === 'annual' ? 'Billed annually • Cancel anytime' : 'Monthly recurring membership'}
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8">
                  <span className="text-xs font-bold text-on-surface block uppercase tracking-wider">
                    Included Benefits:
                  </span>
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-on-surface leading-relaxed">
                      <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={12} className="stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA Button */}
              <div>
                <button
                  onClick={() => handleSelectPlan(plan)}
                  className={`w-full py-3.5 px-4 rounded-2xl text-xs font-bold transition-all shadow-ambient flex items-center justify-center gap-2 ${
                    isSelected
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : plan.recommended
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <CheckCircle2 size={16} />
                      <span>Current Active Membership</span>
                    </>
                  ) : (
                    <>
                      <span>Select {plan.name}</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Coordinator Consultation Help Banner */}
      <div className="bg-primary/5 border border-primary/20 p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-on-surface">Need help choosing the right plan for your senior?</h4>
          <p className="text-xs text-on-surface-variant">Our geriatric care coordinator is available for a complimentary 15-minute consultation.</p>
        </div>
        <a
          href="tel:5559014455"
          className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-xs shadow-ambient hover:bg-primary/90 flex items-center gap-2 flex-shrink-0"
        >
          <PhoneCall size={15} />
          <span>Speak with Coordinator</span>
        </a>
      </div>

      {/* Checkout Success Confirmation Modal */}
      {checkoutModalPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-surface-container-lowest rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl border border-surface-container-high animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-xl font-bold text-on-surface">Care Plan Updated</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Your care tier has been updated to <strong className="text-on-surface">{checkoutModalPlan.name}</strong> ({billingInterval} in {currency}).
            </p>
            <button
              onClick={() => setCheckoutModalPlan(null)}
              className="w-full py-3 rounded-xl bg-primary text-white text-xs font-bold shadow-ambient"
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
