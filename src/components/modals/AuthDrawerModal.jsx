import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import {
  Lock,
  Mail,
  User,
  Phone,
  ArrowRight,
  Sparkles,
  X,
  ShieldCheck,
  UserPlus,
  AlertCircle,
  CheckCircle2,
  Users,
  HeartHandshake,
  Heart
} from 'lucide-react';
import PhoneInput from '../common/PhoneInput';

export const AuthDrawerModal = () => {
  const { login, registerUser, availableDemoUsers } = useAuth();
  const { isAuthDrawerOpen, setIsAuthDrawerOpen, showToast } = useApp();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  
  // Login State
  const [email, setEmail] = useState('eleanor.vance@example.com');
  const [password, setPassword] = useState('••••••••');
  const [role, setRole] = useState('elderly');
  const [loginError, setLoginError] = useState('');

  // Registration State
  const [regForm, setRegForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: 'elderly',
    password: '',
    confirmPassword: '',
    termsAccepted: true
  });
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);

  const drawerRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isAuthDrawerOpen) {
        setIsAuthDrawerOpen(false);
      }
    };
    if (isAuthDrawerOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isAuthDrawerOpen]);

  if (!isAuthDrawerOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    if (!email.trim() || !password.trim()) {
      setLoginError('Please enter your credentials');
      return;
    }

    login(email, password, role);
    setIsAuthDrawerOpen(false);
    showToast({
      type: 'success',
      title: `Welcome back, ${role === 'elderly' ? 'Eleanor' : role === 'family' ? 'Sarah' : 'Marcus'}!`,
      message: 'Access granted to your secure companion portal.'
    });

    if (role === 'family') navigate('/family-dashboard');
    else if (role === 'volunteer') navigate('/volunteer-dashboard');
    else navigate('/dashboard');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setRegError('');

    if (!regForm.fullName.trim()) {
      setRegError('Full name is required.');
      return;
    }
    if (!regForm.email.trim()) {
      setRegError('Email address is required.');
      return;
    }
    if (!regForm.phone.trim()) {
      setRegError('Phone number is required.');
      return;
    }
    if (!regForm.password || regForm.password.length < 6) {
      setRegError('Password must be at least 6 characters.');
      return;
    }
    if (regForm.password !== regForm.confirmPassword) {
      setRegError('Passwords do not match.');
      return;
    }
    if (!regForm.termsAccepted) {
      setRegError('Please accept the Terms of Care & HIPAA Privacy Policy.');
      return;
    }

    registerUser(regForm);
    setRegSuccess(true);
    showToast({
      type: 'success',
      title: 'Account Registered!',
      message: `Welcome to CareConnect, ${regForm.fullName}.`
    });

    setTimeout(() => {
      setIsAuthDrawerOpen(false);
      if (regForm.role === 'elderly') navigate('/auth/interactions');
      else if (regForm.role === 'volunteer') navigate('/volunteer-dashboard');
      else navigate('/family-dashboard');
    }, 900);
  };

  const handleQuickSelect = (user) => {
    login(user.email, 'demo123', user.role);
    setIsAuthDrawerOpen(false);
    showToast({
      type: 'success',
      title: `Logged in as ${user.name}`,
      message: `Active persona: ${user.roleLabel}`
    });
    if (user.role === 'family') navigate('/family-dashboard');
    else if (user.role === 'volunteer') navigate('/volunteer-dashboard');
    else navigate('/dashboard');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-md transition-all duration-300 animate-in fade-in"
      onClick={() => setIsAuthDrawerOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-drawer-title"
    >
      {/* Right Slide-over Panel */}
      <div
        ref={drawerRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white h-full shadow-2xl border-l border-slate-200 overflow-y-auto p-6 sm:p-8 flex flex-col justify-between animate-drawer-slide-in"
      >
        {/* Top Header & Tab Switcher */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <Link to="/" onClick={() => setIsAuthDrawerOpen(false)} className="flex items-center gap-2 group">
              <img
                src="/careconnect-logo.png"
                alt="CareConnect Logo"
                className="h-9 w-auto max-w-[170px] object-contain transition-transform group-hover:scale-105"
              />
            </Link>

            <button
              type="button"
              onClick={() => setIsAuthDrawerOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close drawer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Tab Switcher: Sign In vs Create Account / Registration */}
          <div className="flex bg-slate-100 p-1 rounded-2xl mt-4 border border-slate-200">
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'login'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Lock size={13} />
              <span>Sign In</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'register'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserPlus size={13} />
              <span>Create Account</span>
            </button>
          </div>

          {/* TAB 1: SIGN IN FORM */}
          {activeTab === 'login' && (
            <div>
              {/* Instant 1-Click Demo Profiles */}
              <div className="mt-5 p-3.5 rounded-2xl bg-orange-50/70 border border-orange-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-primary flex items-center gap-1.5 uppercase tracking-wider">
                    <Sparkles size={13} />
                    Instant Demo Profiles
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">1-Click</span>
                </div>

                <div className="space-y-1.5">
                  {availableDemoUsers.map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => handleQuickSelect(u)}
                      className="w-full p-2 rounded-xl bg-white hover:bg-orange-100/60 border border-orange-200/60 hover:border-primary text-left text-xs font-semibold transition-all flex items-center gap-2.5 group shadow-2xs cursor-pointer"
                    >
                      <img src={u.avatar} alt={u.name} className="w-7 h-7 rounded-full object-cover border border-slate-200" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate-900 group-hover:text-primary truncate">{u.name}</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">{u.roleLabel}</p>
                      </div>
                      <ArrowRight size={14} className="text-slate-400 group-hover:text-primary group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Direct Sign-In Form */}
              <form onSubmit={handleLogin} className="mt-4 space-y-3">
                <div className="relative flex items-center py-1">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-3 text-[10px] uppercase font-bold text-slate-400 tracking-wider">or enter credentials</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                {loginError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle size={15} />
                    <span>{loginError}</span>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-primary focus:outline-none"
                      placeholder="name@example.com"
                    />
                    <Mail size={15} className="absolute left-3 top-3 text-slate-400" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700">Password</label>
                    <Link
                      to="/auth/forgot-password"
                      onClick={() => setIsAuthDrawerOpen(false)}
                      className="text-[11px] font-bold text-primary hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                    <Lock size={15} className="absolute left-3 top-3 text-slate-400" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">Role Persona</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer"
                  >
                    <option value="elderly">Elderly Care Recipient</option>
                    <option value="family">Family Caregiver / Guardian</option>
                    <option value="volunteer">Volunteer Companion Aide</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-ambient transition-transform active:scale-95 flex items-center justify-center gap-2 mt-2 cursor-pointer"
                >
                  <span>Sign In to Platform</span>
                  <ArrowRight size={15} />
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: REGISTRATION / CREATE ACCOUNT SCREEN */}
          {activeTab === 'register' && (
            <div className="mt-4">
              {regSuccess ? (
                <div className="p-6 text-center space-y-3 bg-emerald-50 rounded-2xl border border-emerald-200 my-4">
                  <CheckCircle2 size={40} className="mx-auto text-emerald-600 animate-bounce" />
                  <h4 className="text-base font-bold text-emerald-900">Account Created Successfully!</h4>
                  <p className="text-xs text-emerald-700">Setting up your personalized care portal...</p>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-3">
                  {regError && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                      <AlertCircle size={15} />
                      <span>{regError}</span>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Full Name *</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={regForm.fullName}
                        onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-primary focus:outline-none"
                        placeholder="e.g. Eleanor Vance"
                      />
                      <User size={15} className="absolute left-3 top-2.5 text-slate-400" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={regForm.email}
                      onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-primary focus:outline-none"
                      placeholder="name@example.com"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Phone Number with Country Code *</label>
                    <PhoneInput
                      required
                      value={regForm.phone}
                      onChange={(val) => setRegForm({ ...regForm, phone: val })}
                      placeholder="Mobile phone number"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Primary Role *</label>
                    <select
                      value={regForm.role}
                      onChange={(e) => setRegForm({ ...regForm, role: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer"
                    >
                      <option value="elderly">Elderly Care Recipient</option>
                      <option value="family">Family Caregiver / Guardian</option>
                      <option value="volunteer">Volunteer Companion Aide</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Password *</label>
                      <input
                        type="password"
                        required
                        value={regForm.password}
                        onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-primary focus:outline-none"
                        placeholder="Min 6 chars"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">Confirm *</label>
                      <input
                        type="password"
                        required
                        value={regForm.confirmPassword}
                        onChange={(e) => setRegForm({ ...regForm, confirmPassword: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-primary focus:outline-none"
                        placeholder="Repeat password"
                      />
                    </div>
                  </div>

                  <div className="pt-1">
                    <label className="flex items-start gap-2 text-[11px] text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={regForm.termsAccepted}
                        onChange={(e) => setRegForm({ ...regForm, termsAccepted: e.target.checked })}
                        className="w-3.5 h-3.5 rounded text-primary focus:ring-primary mt-0.5"
                      />
                      <span>I agree to HIPAA Privacy Terms & Background Checks *</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-ambient transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Complete Registration</span>
                    <ArrowRight size={15} />
                  </button>

                  <div className="pt-2 text-center">
                    <Link
                      to="/auth/role-select"
                      onClick={() => setIsAuthDrawerOpen(false)}
                      className="text-[11px] text-primary hover:underline font-semibold"
                    >
                      Or use Step-by-Step Onboarding Wizard →
                    </Link>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>

        {/* Footer Links */}
        <div className="pt-4 border-t border-slate-100 text-center space-y-2.5">
          <div className="flex items-center justify-center gap-3 text-xs">
            <Link
              to="/auth/register"
              onClick={() => setIsAuthDrawerOpen(false)}
              className="text-primary font-bold hover:underline"
            >
              Full Register Page
            </Link>
            <span className="text-slate-300">•</span>
            <Link
              to="/auth/forgot-password"
              onClick={() => setIsAuthDrawerOpen(false)}
              className="text-slate-600 hover:text-primary font-medium"
            >
              Forgot Password
            </Link>
            <span className="text-slate-300">•</span>
            <Link
              to="/links"
              onClick={() => setIsAuthDrawerOpen(false)}
              className="text-slate-600 hover:text-primary font-medium"
            >
              All Links
            </Link>
          </div>

          <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
            <ShieldCheck size={13} className="text-emerald-600" />
            256-Bit Encrypted HIPAA Compliant Session
          </p>
        </div>

      </div>
    </div>
  );
};

export default AuthDrawerModal;
