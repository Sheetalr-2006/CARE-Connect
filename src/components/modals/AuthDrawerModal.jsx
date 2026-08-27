import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import {
  Heart,
  Lock,
  Mail,
  User,
  ArrowRight,
  Sparkles,
  X,
  ShieldCheck,
  KeyRound,
  UserCheck,
  AlertCircle
} from 'lucide-react';

export const AuthDrawerModal = () => {
  const { login, availableDemoUsers } = useAuth();
  const { isAuthDrawerOpen, setIsAuthDrawerOpen, showToast } = useApp();
  const navigate = useNavigate();

  const [email, setEmail] = useState('eleanor.vance@example.com');
  const [password, setPassword] = useState('••••••••');
  const [role, setRole] = useState('elderly');
  const [error, setError] = useState('');
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
    if (!email.trim() || !password.trim()) {
      setError('Please enter your credentials');
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
      {/* Right Slide-over Panel (Style 4 Spec) */}
      <div
        ref={drawerRef}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white h-full shadow-2xl border-l border-slate-200 overflow-y-auto p-6 sm:p-8 flex flex-col justify-between animate-drawer-slide-in"
      >
        {/* Top Header & Close */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-ambient">
                <Heart size={18} className="fill-white" />
              </div>
              <div>
                <h3 id="auth-drawer-title" className="text-base font-bold text-slate-900 font-serif">
                  Quick Member Sign In
                </h3>
                <p className="text-[11px] text-slate-500">Secure Access to CareConnect Portal</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsAuthDrawerOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors"
              aria-label="Close sign in drawer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Instant 1-Click Demo Profiles */}
          <div className="mt-6 p-4 rounded-2xl bg-orange-50/70 border border-orange-100 space-y-2.5">
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
                  className="w-full p-2.5 rounded-xl bg-white hover:bg-orange-100/60 border border-orange-200/60 hover:border-primary text-left text-xs font-semibold transition-all flex items-center gap-2.5 group shadow-2xs"
                >
                  <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
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
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div className="relative flex items-center py-1">
              <div className="flex-grow border-t border-slate-200"></div>
              <span className="flex-shrink mx-3 text-[10px] uppercase font-bold text-slate-400 tracking-wider">or sign in with email</span>
              <div className="flex-grow border-t border-slate-200"></div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle size={15} />
                <span>{error}</span>
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
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="elderly">Elderly Care Recipient</option>
                <option value="family">Family Caregiver / Guardian</option>
                <option value="volunteer">Volunteer Companion Aide</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-ambient transition-transform active:scale-95 flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              <span>Sign In to Platform</span>
              <ArrowRight size={15} />
            </button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="pt-6 border-t border-slate-100 text-center space-y-3">
          <div className="flex items-center justify-center gap-4 text-xs">
            <Link
              to="/auth/register"
              onClick={() => setIsAuthDrawerOpen(false)}
              className="text-primary font-bold hover:underline"
            >
              Create Account
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
