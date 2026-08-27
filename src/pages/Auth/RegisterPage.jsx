import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Heart,
  User,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Eye,
  EyeOff,
  ArrowLeft
} from 'lucide-react';
import { PhoneInput } from '../../components/common/PhoneInput';

export const RegisterPage = () => {
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '+1 (555) 234-5678',
    password: '',
    confirmPassword: '',
    role: 'elderly',
    termsAccepted: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverSuccess, setServerSuccess] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required.';
    } else if (formData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter a valid full name.';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address (e.g., name@example.com).';
    }

    if (!formData.phone.trim()) {
      errs.phone = 'Mobile phone number is required.';
    } else if (formData.phone.replace(/\D/g, '').length < 7) {
      errs.phone = 'Please enter a valid phone number with country code.';
    }

    if (!formData.password) {
      errs.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }

    if (!formData.confirmPassword) {
      errs.confirmPassword = 'Confirmation password is required.';
    } else if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    if (!formData.termsAccepted) {
      errs.termsAccepted = 'You must agree to the Terms of Service & Privacy Policy.';
    }

    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setLoading(true);
      setTimeout(() => {
        registerUser({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: formData.role,
          location: 'Main Community Hub'
        });
        setLoading(false);
        setServerSuccess('Registration successful! Redirecting...');

        setTimeout(() => {
          if (formData.role === 'elderly') {
            navigate('/auth/interactions');
          } else if (formData.role === 'volunteer') {
            navigate('/auth/pending-approval');
          } else {
            navigate('/family-dashboard');
          }
        }, 800);
      }, 600);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 text-[#1E293B]">
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link to="/" className="inline-flex items-center justify-center mb-3 group" title="CareConnect Home">
          <img
            src="/careconnect-logo.png"
            alt="CareConnect Logo"
            className="h-16 sm:h-18 w-auto max-w-[260px] object-contain transition-transform group-hover:scale-105"
          />
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] font-serif">Create New Account</h1>
        <p className="text-xs text-[#64748B] mt-1">
          Join our verified eldercare companion & family network
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl shadow-xl border border-[#E2E8F0] space-y-4">
          
          {serverSuccess && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
              {serverSuccess}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
            
            {/* Account Type */}
            <div>
              <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                Account Persona Type <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'elderly', label: 'Senior' },
                  { id: 'family', label: 'Family' },
                  { id: 'volunteer', label: 'Volunteer' }
                ].map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, role: r.id })}
                    className={`py-2 px-2.5 rounded-xl text-xs font-bold capitalize border transition-all ${
                      formData.role === r.id
                        ? 'bg-primary text-white border-primary shadow-sm'
                        : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#1E293B] hover:border-primary/40'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-[#1E293B] mb-1.5" htmlFor="reg-fullname-page">
                Full Legal Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="reg-fullname-page"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
                  }}
                  placeholder="e.g. Eleanor Vance"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs text-[#0F172A] bg-[#F8FAFC] border transition-all focus:outline-none focus:bg-white ${
                    errors.fullName
                      ? 'border-rose-500 focus:ring-2 focus:ring-rose-200'
                      : 'border-[#CBD5E1] focus:ring-2 focus:ring-primary focus:border-primary'
                  }`}
                />
                <User size={16} className="absolute left-3.5 top-3 text-[#64748B]" />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-[#1E293B] mb-1.5" htmlFor="reg-email-page">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="reg-email-page"
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                    if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                  }}
                  placeholder="name@example.com"
                  className={`w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs text-[#0F172A] bg-[#F8FAFC] border transition-all focus:outline-none focus:bg-white ${
                    errors.email
                      ? 'border-rose-500 focus:ring-2 focus:ring-rose-200'
                      : 'border-[#CBD5E1] focus:ring-2 focus:ring-primary focus:border-primary'
                  }`}
                />
                <Mail size={16} className="absolute left-3.5 top-3 text-[#64748B]" />
              </div>
              {errors.email && (
                <p className="mt-1 text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                Mobile Number <span className="text-rose-500">*</span>
              </label>
              <PhoneInput
                value={formData.phone}
                onChange={(val) => {
                  setFormData({ ...formData, phone: val });
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                }}
              />
              {errors.phone && (
                <p className="mt-1 text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.phone}
                </p>
              )}
            </div>

            {/* Password & Confirm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#1E293B] mb-1.5" htmlFor="reg-pass-page">
                  Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="reg-pass-page"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => {
                      setFormData({ ...formData, password: e.target.value });
                      if (errors.password) setErrors((prev) => ({ ...prev, password: '' }));
                    }}
                    placeholder="••••••••"
                    className={`w-full pl-9 pr-9 py-2.5 rounded-2xl text-xs text-[#0F172A] bg-[#F8FAFC] border transition-all focus:outline-none focus:bg-white ${
                      errors.password
                        ? 'border-rose-500 focus:ring-2 focus:ring-rose-200'
                        : 'border-[#CBD5E1] focus:ring-2 focus:ring-primary focus:border-primary'
                    }`}
                  />
                  <Lock size={15} className="absolute left-3 top-3 text-[#64748B]" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-2.5 p-0.5 text-[#64748B] hover:text-[#0F172A]"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.password}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-[#1E293B] mb-1.5" htmlFor="reg-conf-page">
                  Confirm Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="reg-conf-page"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => {
                      setFormData({ ...formData, confirmPassword: e.target.value });
                      if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: '' }));
                    }}
                    placeholder="••••••••"
                    className={`w-full pl-9 pr-9 py-2.5 rounded-2xl text-xs text-[#0F172A] bg-[#F8FAFC] border transition-all focus:outline-none focus:bg-white ${
                      errors.confirmPassword
                        ? 'border-rose-500 focus:ring-2 focus:ring-rose-200'
                        : 'border-[#CBD5E1] focus:ring-2 focus:ring-primary focus:border-primary'
                    }`}
                  />
                  <Lock size={15} className="absolute left-3 top-3 text-[#64748B]" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2.5 top-2.5 p-0.5 text-[#64748B] hover:text-[#0F172A]"
                  >
                    {showConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Terms */}
            <div className="pt-1">
              <label className="flex items-start gap-2 cursor-pointer text-xs text-[#475569]">
                <input
                  type="checkbox"
                  id="page-terms-checkbox"
                  checked={formData.termsAccepted}
                  onChange={(e) => {
                    setFormData({ ...formData, termsAccepted: e.target.checked });
                    if (errors.termsAccepted) setErrors((prev) => ({ ...prev, termsAccepted: '' }));
                  }}
                  className="mt-0.5 w-4 h-4 rounded text-primary focus:ring-primary border-[#CBD5E1]"
                />
                <span>
                  I agree to the <strong className="text-[#0F172A]">Terms of Service</strong> & <strong className="text-[#0F172A]">Privacy Policy</strong> <span className="text-rose-500">*</span>
                </span>
              </label>
              {errors.termsAccepted && (
                <p className="mt-1 text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.termsAccepted}
                </p>
              )}
            </div>

            {/* Register CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-ambient transition-all active:scale-98 disabled:opacity-70 cursor-pointer"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Registering...</span>
                </span>
              ) : (
                <>
                  <span>Register / Create Account</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-[#E2E8F0] text-center">
            <p className="text-xs text-[#64748B]">
              Already have an account?{' '}
              <Link to="/auth/login" className="font-bold text-primary hover:underline ml-1">
                Sign In
              </Link>
            </p>
          </div>

        </div>

        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#64748B]">
          <ShieldCheck size={16} className="text-emerald-600" />
          <span>Your privacy & healthcare data is strictly protected</span>
        </div>

      </div>
    </div>
  );
};

export default RegisterPage;
