import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Heart,
  Lock,
  Mail,
  User,
  Phone,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  HeartHandshake,
  AlertCircle,
  Eye,
  EyeOff,
  KeyRound,
  Sparkles,
  ArrowLeft,
  Check
} from 'lucide-react';
import { PhoneInput } from '../../components/common/PhoneInput';

export const LoginPage = () => {
  const { login, registerUser, availableDemoUsers } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Active View Mode: 'login' | 'register' | 'forgot'
  const initialMode = searchParams.get('mode') === 'register' 
    ? 'register' 
    : searchParams.get('mode') === 'forgot' 
      ? 'forgot' 
      : 'login';
  const [mode, setMode] = useState(initialMode);

  // Sync mode with URL if needed
  const switchMode = (newMode) => {
    setMode(newMode);
    setSearchParams(newMode === 'login' ? {} : { mode: newMode });
    setErrors({});
    setFormSubmitted(false);
  };

  // ==========================================
  // 1. LOGIN FORM STATE & VALIDATION
  // ==========================================
  const [loginIdentifier, setLoginIdentifier] = useState('eleanor.vance@example.com');
  const [loginPassword, setLoginPassword] = useState('Password123!');
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedRole, setSelectedRole] = useState('elderly');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  // ==========================================
  // 2. REGISTRATION FORM STATE & VALIDATION
  // ==========================================
  const [regData, setRegData] = useState({
    fullName: '',
    email: '',
    phone: '+1 (555) 234-5678',
    password: '',
    confirmPassword: '',
    role: 'elderly',
    termsAccepted: false
  });
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirmPassword, setShowRegConfirmPassword] = useState(false);
  const [regLoading, setRegLoading] = useState(false);

  // ==========================================
  // 3. FORGOT PASSWORD STATE
  // ==========================================
  const [forgotStep, setForgotStep] = useState(1); // 1: Send OTP, 2: Verify OTP, 3: New Password, 4: Success
  const [forgotMethod, setForgotMethod] = useState('email'); // 'email' | 'phone'
  const [forgotEmail, setForgotEmail] = useState('eleanor.vance@example.com');
  const [forgotPhone, setForgotPhone] = useState('+1 (555) 234-5678');
  const [otpCode, setOtpCode] = useState(['8', '4', '9', '2', '0', '1']);
  const [resendTimer, setResendTimer] = useState(30);
  const [resetNewPassword, setResetNewPassword] = useState('');
  const [resetConfirmPassword, setResetConfirmPassword] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  // ==========================================
  // COMMON ERROR & TOUCHED STATE
  // ==========================================
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [successBanner, setSuccessBanner] = useState('');

  // Email format regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Countdown timer for OTP
  useEffect(() => {
    let interval = null;
    if (mode === 'forgot' && forgotStep === 2 && resendTimer > 0) {
      interval = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [mode, forgotStep, resendTimer]);

  // Load remember me from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('careconnect_remember_user');
    if (savedUser) {
      setLoginIdentifier(savedUser);
      setRememberMe(true);
    }
  }, []);

  // Validation helper for Login
  const validateLogin = () => {
    const errs = {};
    if (!loginIdentifier.trim()) {
      errs.loginIdentifier = 'Username or Email is required.';
    }
    if (!loginPassword) {
      errs.loginPassword = 'Password is required.';
    } else if (loginPassword.length < 6) {
      errs.loginPassword = 'Password must be at least 6 characters.';
    }
    return errs;
  };

  // Validation helper for Registration
  const validateRegistration = () => {
    const errs = {};
    if (!regData.fullName.trim()) {
      errs.fullName = 'Full Name is required.';
    } else if (regData.fullName.trim().length < 2) {
      errs.fullName = 'Please enter a valid full name.';
    }

    if (!regData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!emailRegex.test(regData.email.trim())) {
      errs.email = 'Please enter a valid email address (e.g., name@example.com).';
    }

    if (!regData.phone.trim()) {
      errs.phone = 'Mobile phone number is required.';
    } else if (regData.phone.replace(/\D/g, '').length < 7) {
      errs.phone = 'Please enter a valid mobile number with country code.';
    }

    if (!regData.password) {
      errs.password = 'Password is required.';
    } else if (regData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters.';
    }

    if (!regData.confirmPassword) {
      errs.confirmPassword = 'Confirmation password is required.';
    } else if (regData.password !== regData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.';
    }

    if (!regData.termsAccepted) {
      errs.termsAccepted = 'You must agree to the Terms of Service & Privacy Policy.';
    }

    return errs;
  };

  // Validation helper for Forgot Password
  const validateForgotStep = (step) => {
    const errs = {};
    if (step === 1) {
      if (forgotMethod === 'email') {
        if (!forgotEmail.trim()) {
          errs.forgotEmail = 'Registered email address is required.';
        } else if (!emailRegex.test(forgotEmail.trim())) {
          errs.forgotEmail = 'Please enter a valid email format.';
        }
      } else {
        if (!forgotPhone.trim() || forgotPhone.replace(/\D/g, '').length < 7) {
          errs.forgotPhone = 'Please enter a valid registered mobile number.';
        }
      }
    } else if (step === 2) {
      if (otpCode.some((d) => !d.trim())) {
        errs.otp = 'Please enter the complete 6-digit OTP verification code.';
      }
    } else if (step === 3) {
      if (!resetNewPassword) {
        errs.resetNewPassword = 'New password is required.';
      } else if (resetNewPassword.length < 6) {
        errs.resetNewPassword = 'Password must be at least 6 characters.';
      }
      if (!resetConfirmPassword) {
        errs.resetConfirmPassword = 'Confirm password is required.';
      } else if (resetNewPassword !== resetConfirmPassword) {
        errs.resetConfirmPassword = 'Passwords do not match.';
      }
    }
    return errs;
  };

  // ==========================================
  // FORM HANDLERS
  // ==========================================

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const errs = validateLogin();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setLoginLoading(true);
      setTimeout(() => {
        if (rememberMe) {
          localStorage.setItem('careconnect_remember_user', loginIdentifier);
        } else {
          localStorage.removeItem('careconnect_remember_user');
        }

        login(loginIdentifier, loginPassword, selectedRole);
        setLoginLoading(false);

        if (selectedRole === 'family') {
          navigate('/family-dashboard');
        } else if (selectedRole === 'volunteer') {
          navigate('/volunteer-dashboard');
        } else {
          navigate('/dashboard');
        }
      }, 500);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const errs = validateRegistration();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setRegLoading(true);
      setTimeout(() => {
        registerUser({
          fullName: regData.fullName,
          email: regData.email,
          phone: regData.phone,
          password: regData.password,
          role: regData.role,
          location: 'Main Community Hub'
        });
        setRegLoading(false);
        setSuccessBanner('Account created successfully! Redirecting...');
        
        setTimeout(() => {
          if (regData.role === 'elderly') {
            navigate('/auth/interactions');
          } else if (regData.role === 'volunteer') {
            navigate('/auth/pending-approval');
          } else {
            navigate('/family-dashboard');
          }
        }, 800);
      }, 600);
    }
  };

  const handleForgotStep1 = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const errs = validateForgotStep(1);
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setForgotLoading(true);
      setTimeout(() => {
        setForgotLoading(false);
        setForgotStep(2);
        setResendTimer(30);
        setFormSubmitted(false);
      }, 500);
    }
  };

  const handleForgotStep2 = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const errs = validateForgotStep(2);
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setForgotLoading(true);
      setTimeout(() => {
        setForgotLoading(false);
        setForgotStep(3);
        setFormSubmitted(false);
      }, 500);
    }
  };

  const handleForgotStep3 = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    const errs = validateForgotStep(3);
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setForgotLoading(true);
      setTimeout(() => {
        setForgotLoading(false);
        setForgotStep(4);
        setFormSubmitted(false);
      }, 600);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const updated = [...otpCode];
    updated[index] = value;
    setOtpCode(updated);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-digit-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleQuickDemo = (user) => {
    login(user.email, 'demo123', user.role);
    if (user.role === 'family') {
      navigate('/family-dashboard');
    } else if (user.role === 'volunteer') {
      navigate('/volunteer-dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 text-[#1E293B]">
      
      {/* Brand Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <Link to="/" className="inline-flex items-center gap-2.5 group mb-3">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-ambient group-hover:scale-105 transition-transform">
            <Heart className="w-6 h-6 fill-white" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-[#0F172A] font-serif">
            Care<span className="text-primary font-serif">Connect</span>
          </span>
        </Link>

        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] font-serif">
          {mode === 'login' && 'Sign In to Your Account'}
          {mode === 'register' && 'Create New Account'}
          {mode === 'forgot' && 'Account Recovery'}
        </h1>
        <p className="mt-1 text-xs text-[#64748B]">
          {mode === 'login' && 'Enter your credentials to access your healthcare portal'}
          {mode === 'register' && 'Join CareConnect for personalized senior care & family companionship'}
          {mode === 'forgot' && 'Reset your password via registered email or mobile OTP'}
        </p>
      </div>

      {/* Main Form Card */}
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl shadow-xl border border-[#E2E8F0] space-y-6">

          {/* Success Banner */}
          {successBanner && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
              <span>{successBanner}</span>
            </div>
          )}

          {/* Mode Switcher Tabs (Login vs Register) */}
          {mode !== 'forgot' && (
            <div className="flex p-1 bg-[#F1F5F9] rounded-2xl">
              <button
                type="button"
                id="login-tab-btn"
                onClick={() => switchMode('login')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  mode === 'login'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                id="register-tab-btn"
                onClick={() => switchMode('register')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  mode === 'register'
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-[#64748B] hover:text-[#0F172A]'
                }`}
              >
                Create New Account
              </button>
            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 1: LOGIN FORM                                       */}
          {/* ========================================================= */}
          {mode === 'login' && (
            <div className="space-y-5">
              
              {/* Quick 1-Click Demo Personas */}
              <div className="p-3.5 rounded-2xl bg-[#FFF1EC] border border-[#FFE8DF]">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-primary flex items-center gap-1">
                    <Sparkles size={13} /> 1-Click Quick Demo Sign-In
                  </label>
                  <span className="text-[10px] text-[#64748B] font-medium">Instant Test</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {availableDemoUsers.map((u) => (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => handleQuickDemo(u)}
                      className={`p-2 rounded-xl text-left border transition-all flex flex-col items-center text-center ${
                        selectedRole === u.role
                          ? 'bg-white border-primary text-primary shadow-xs'
                          : 'bg-white/80 border-[#E2E8F0] hover:border-primary/40 text-[#1E293B]'
                      }`}
                    >
                      <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover mb-1" />
                      <p className="text-[11px] font-bold leading-tight truncate w-full">{u.name.split(' ')[0]}</p>
                      <p className="text-[9px] text-[#64748B] uppercase tracking-wider">{u.role}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Component */}
              <form onSubmit={handleLoginSubmit} noValidate className="space-y-4">
                
                {/* Persona Role Selection */}
                <div>
                  <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                    Account Persona Role <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'elderly', label: 'Senior', icon: User },
                      { id: 'family', label: 'Family', icon: Users },
                      { id: 'volunteer', label: 'Volunteer', icon: HeartHandshake }
                    ].map((r) => {
                      const Icon = r.icon;
                      const isSelected = selectedRole === r.id;
                      return (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => setSelectedRole(r.id)}
                          className={`py-2 px-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                            isSelected
                              ? 'bg-primary text-white border-primary shadow-sm'
                              : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#1E293B] hover:border-primary/40'
                          }`}
                        >
                          <Icon size={14} />
                          <span>{r.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Username / Email Field */}
                <div>
                  <label className="block text-xs font-bold text-[#1E293B] mb-1.5" htmlFor="login-username-email">
                    Username / Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="login-username-email"
                      type="text"
                      value={loginIdentifier}
                      onChange={(e) => {
                        setLoginIdentifier(e.target.value);
                        if (errors.loginIdentifier) {
                          setErrors((prev) => ({ ...prev, loginIdentifier: '' }));
                        }
                      }}
                      onBlur={() => setTouched((prev) => ({ ...prev, loginIdentifier: true }))}
                      placeholder="e.g. eleanor.vance@example.com"
                      className={`w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs text-[#0F172A] bg-[#F8FAFC] border transition-all focus:outline-none focus:bg-white ${
                        errors.loginIdentifier
                          ? 'border-rose-500 focus:ring-2 focus:ring-rose-200'
                          : 'border-[#CBD5E1] focus:ring-2 focus:ring-primary focus:border-primary'
                      }`}
                    />
                    <Mail size={16} className="absolute left-3.5 top-3 text-[#64748B]" />
                  </div>
                  {errors.loginIdentifier && (
                    <p className="mt-1 text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.loginIdentifier}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-[#1E293B]" htmlFor="login-password">
                      Password <span className="text-rose-500">*</span>
                    </label>
                    <button
                      type="button"
                      id="forgot-password-link"
                      onClick={() => switchMode('forgot')}
                      className="text-xs text-primary font-bold hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      id="login-password"
                      type={showLoginPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => {
                        setLoginPassword(e.target.value);
                        if (errors.loginPassword) {
                          setErrors((prev) => ({ ...prev, loginPassword: '' }));
                        }
                      }}
                      onBlur={() => setTouched((prev) => ({ ...prev, loginPassword: true }))}
                      placeholder="Enter your password"
                      className={`w-full pl-10 pr-10 py-2.5 rounded-2xl text-xs text-[#0F172A] bg-[#F8FAFC] border transition-all focus:outline-none focus:bg-white ${
                        errors.loginPassword
                          ? 'border-rose-500 focus:ring-2 focus:ring-rose-200'
                          : 'border-[#CBD5E1] focus:ring-2 focus:ring-primary focus:border-primary'
                      }`}
                    />
                    <Lock size={16} className="absolute left-3.5 top-3 text-[#64748B]" />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3.5 top-2.5 p-0.5 text-[#64748B] hover:text-[#0F172A] transition-colors"
                      aria-label={showLoginPassword ? 'Hide password' : 'Show password'}
                    >
                      {showLoginPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.loginPassword && (
                    <p className="mt-1 text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.loginPassword}
                    </p>
                  )}
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#475569]">
                    <input
                      type="checkbox"
                      id="remember-me-checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-primary focus:ring-primary border-[#CBD5E1]"
                    />
                    <span>Remember Me on this device</span>
                  </label>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  id="login-submit-btn"
                  disabled={loginLoading}
                  className="w-full mt-3 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-ambient transition-all active:scale-98 disabled:opacity-70 cursor-pointer"
                >
                  {loginLoading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Signing in...</span>
                    </span>
                  ) : (
                    <>
                      <span>Sign In / Login</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>

              {/* Switch to Registration */}
              <div className="pt-4 border-t border-[#E2E8F0] text-center">
                <p className="text-xs text-[#64748B]">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    id="switch-to-register-btn"
                    onClick={() => switchMode('register')}
                    className="font-bold text-primary hover:underline ml-1"
                  >
                    Sign Up / Create New Account
                  </button>
                </p>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 2: REGISTRATION FORM                                 */}
          {/* ========================================================= */}
          {mode === 'register' && (
            <div className="space-y-4">
              <form onSubmit={handleRegisterSubmit} noValidate className="space-y-3.5">
                
                {/* 1. Account Persona */}
                <div>
                  <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                    Account Type <span className="text-rose-500">*</span>
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
                        onClick={() => setRegData({ ...regData, role: r.id })}
                        className={`py-2 px-2.5 rounded-xl text-xs font-bold capitalize border transition-all ${
                          regData.role === r.id
                            ? 'bg-primary text-white border-primary shadow-sm'
                            : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#1E293B] hover:border-primary/40'
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Full Name */}
                <div>
                  <label className="block text-xs font-bold text-[#1E293B] mb-1.5" htmlFor="reg-fullname">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="reg-fullname"
                      type="text"
                      value={regData.fullName}
                      onChange={(e) => {
                        setRegData({ ...regData, fullName: e.target.value });
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

                {/* 3. Email Address */}
                <div>
                  <label className="block text-xs font-bold text-[#1E293B] mb-1.5" htmlFor="reg-email">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="reg-email"
                      type="email"
                      value={regData.email}
                      onChange={(e) => {
                        setRegData({ ...regData, email: e.target.value });
                        if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                      }}
                      placeholder="e.g. eleanor@example.com"
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

                {/* 4. Mobile Number */}
                <div>
                  <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                    Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <PhoneInput
                    value={regData.phone}
                    onChange={(val) => {
                      setRegData({ ...regData, phone: val });
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                    }}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.phone}
                    </p>
                  )}
                </div>

                {/* 5. Password & Confirm Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#1E293B] mb-1.5" htmlFor="reg-password">
                      Password <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="reg-password"
                        type={showRegPassword ? 'text' : 'password'}
                        value={regData.password}
                        onChange={(e) => {
                          setRegData({ ...regData, password: e.target.value });
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
                        onClick={() => setShowRegPassword(!showRegPassword)}
                        className="absolute right-2.5 top-2.5 p-0.5 text-[#64748B] hover:text-[#0F172A]"
                      >
                        {showRegPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#1E293B] mb-1.5" htmlFor="reg-confirm-password">
                      Confirm Password <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="reg-confirm-password"
                        type={showRegConfirmPassword ? 'text' : 'password'}
                        value={regData.confirmPassword}
                        onChange={(e) => {
                          setRegData({ ...regData, confirmPassword: e.target.value });
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
                        onClick={() => setShowRegConfirmPassword(!showRegConfirmPassword)}
                        className="absolute right-2.5 top-2.5 p-0.5 text-[#64748B] hover:text-[#0F172A]"
                      >
                        {showRegConfirmPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                {/* 6. Terms Checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-2 cursor-pointer text-xs text-[#475569]">
                    <input
                      type="checkbox"
                      id="reg-terms-checkbox"
                      checked={regData.termsAccepted}
                      onChange={(e) => {
                        setRegData({ ...regData, termsAccepted: e.target.checked });
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

                {/* Submit Button */}
                <button
                  type="submit"
                  id="register-submit-btn"
                  disabled={regLoading}
                  className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-ambient transition-all active:scale-98 disabled:opacity-70 cursor-pointer"
                >
                  {regLoading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Registering account...</span>
                    </span>
                  ) : (
                    <>
                      <span>Register / Create Account</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>

              {/* Switch to Login */}
              <div className="pt-4 border-t border-[#E2E8F0] text-center">
                <p className="text-xs text-[#64748B]">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => switchMode('login')}
                    className="font-bold text-primary hover:underline ml-1"
                  >
                    Sign In
                  </button>
                </p>
              </div>

            </div>
          )}

          {/* ========================================================= */}
          {/* VIEW 3: FORGOT PASSWORD RECOVERY FLOW                     */}
          {/* ========================================================= */}
          {mode === 'forgot' && (
            <div className="space-y-5">
              
              {/* Back to Login button */}
              <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className="text-xs font-bold text-[#64748B] hover:text-primary flex items-center gap-1.5 transition-colors"
                >
                  <ArrowLeft size={14} />
                  <span>Back to Sign In</span>
                </button>
                <span className="text-[11px] font-bold text-primary bg-[#FFE8DF] px-2.5 py-0.5 rounded-full">
                  Step {forgotStep} of 4
                </span>
              </div>

              {/* STEP 1: Enter email/mobile */}
              {forgotStep === 1 && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-2">
                      <KeyRound size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-[#0F172A]">Find Your Account</h3>
                    <p className="text-xs text-[#64748B]">
                      Enter your registered email or mobile number to receive a verification OTP.
                    </p>
                  </div>

                  {/* Channel Switcher */}
                  <div className="grid grid-cols-2 gap-2 bg-[#F1F5F9] p-1 rounded-2xl">
                    <button
                      type="button"
                      onClick={() => setForgotMethod('email')}
                      className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        forgotMethod === 'email'
                          ? 'bg-white text-primary shadow-sm'
                          : 'text-[#64748B] hover:text-[#0F172A]'
                      }`}
                    >
                      <Mail size={14} /> Via Email
                    </button>
                    <button
                      type="button"
                      onClick={() => setForgotMethod('phone')}
                      className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                        forgotMethod === 'phone'
                          ? 'bg-white text-primary shadow-sm'
                          : 'text-[#64748B] hover:text-[#0F172A]'
                      }`}
                    >
                      <Phone size={14} /> Via Mobile SMS
                    </button>
                  </div>

                  <form onSubmit={handleForgotStep1} noValidate className="space-y-4">
                    {forgotMethod === 'email' ? (
                      <div>
                        <label className="block text-xs font-bold text-[#1E293B] mb-1.5" htmlFor="forgot-email">
                          Registered Email Address <span className="text-rose-500">*</span>
                        </label>
                        <div className="relative">
                          <input
                            id="forgot-email"
                            type="email"
                            value={forgotEmail}
                            onChange={(e) => {
                              setForgotEmail(e.target.value);
                              if (errors.forgotEmail) setErrors((prev) => ({ ...prev, forgotEmail: '' }));
                            }}
                            placeholder="e.g. eleanor.vance@example.com"
                            className={`w-full pl-10 pr-4 py-2.5 rounded-2xl text-xs text-[#0F172A] bg-[#F8FAFC] border transition-all focus:outline-none focus:bg-white ${
                              errors.forgotEmail
                                ? 'border-rose-500 focus:ring-2 focus:ring-rose-200'
                                : 'border-[#CBD5E1] focus:ring-2 focus:ring-primary focus:border-primary'
                            }`}
                          />
                          <Mail size={16} className="absolute left-3.5 top-3 text-[#64748B]" />
                        </div>
                        {errors.forgotEmail && (
                          <p className="mt-1 text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                            <AlertCircle size={12} /> {errors.forgotEmail}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div>
                        <label className="block text-xs font-bold text-[#1E293B] mb-1.5">
                          Registered Mobile Number <span className="text-rose-500">*</span>
                        </label>
                        <PhoneInput
                          value={forgotPhone}
                          onChange={(val) => {
                            setForgotPhone(val);
                            if (errors.forgotPhone) setErrors((prev) => ({ ...prev, forgotPhone: '' }));
                          }}
                        />
                        {errors.forgotPhone && (
                          <p className="mt-1 text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                            <AlertCircle size={12} /> {errors.forgotPhone}
                          </p>
                        )}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={forgotLoading}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-ambient transition-all active:scale-98 disabled:opacity-70 cursor-pointer"
                    >
                      {forgotLoading ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          <span>Sending OTP code...</span>
                        </span>
                      ) : (
                        <>
                          <span>Send 6-Digit OTP / Reset Link</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* STEP 2: Enter OTP Code */}
              {forgotStep === 2 && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-2">
                      <ShieldCheck size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-[#0F172A]">Enter Verification Code</h3>
                    <p className="text-xs text-[#64748B]">
                      We sent a 6-digit verification OTP to{' '}
                      <strong className="text-[#0F172A]">{forgotMethod === 'email' ? forgotEmail : forgotPhone}</strong>
                    </p>
                  </div>

                  <form onSubmit={handleForgotStep2} noValidate className="space-y-4">
                    {/* 6 Digit Inputs */}
                    <div className="flex justify-between gap-1.5 sm:gap-2">
                      {otpCode.map((digit, i) => (
                        <input
                          key={i}
                          id={`otp-digit-${i}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          className="w-11 sm:w-12 h-12 text-center text-lg font-black rounded-2xl bg-[#F8FAFC] border border-[#CBD5E1] text-[#0F172A] focus:ring-2 focus:ring-primary focus:bg-white focus:outline-none"
                        />
                      ))}
                    </div>

                    {errors.otp && (
                      <p className="text-xs text-rose-600 font-semibold text-center flex items-center justify-center gap-1">
                        <AlertCircle size={13} /> {errors.otp}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-xs text-[#64748B]">
                      <button
                        type="button"
                        onClick={() => setOtpCode(['8', '4', '9', '2', '0', '1'])}
                        className="text-primary font-bold hover:underline flex items-center gap-1"
                      >
                        <Sparkles size={13} /> Auto-fill Demo (849201)
                      </button>
                      <span>
                        {resendTimer > 0 ? `Resend in ${resendTimer}s` : (
                          <button
                            type="button"
                            onClick={() => setResendTimer(30)}
                            className="text-primary font-bold hover:underline"
                          >
                            Resend Code
                          </button>
                        )}
                      </span>
                    </div>

                    <button
                      type="submit"
                      disabled={forgotLoading}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-ambient transition-all active:scale-98 disabled:opacity-70 cursor-pointer"
                    >
                      {forgotLoading ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          <span>Verifying code...</span>
                        </span>
                      ) : (
                        <>
                          <span>Verify Code & Continue</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* STEP 3: Set New Password */}
              {forgotStep === 3 && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-2">
                      <Lock size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-[#0F172A]">Set New Password</h3>
                    <p className="text-xs text-[#64748B]">
                      Create a strong new password for your account.
                    </p>
                  </div>

                  <form onSubmit={handleForgotStep3} noValidate className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-[#1E293B] mb-1.5" htmlFor="reset-new-pass">
                        New Password <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="reset-new-pass"
                          type={showResetPassword ? 'text' : 'password'}
                          value={resetNewPassword}
                          onChange={(e) => {
                            setResetNewPassword(e.target.value);
                            if (errors.resetNewPassword) setErrors((prev) => ({ ...prev, resetNewPassword: '' }));
                          }}
                          placeholder="Enter new password (min. 6 characters)"
                          className={`w-full pl-10 pr-10 py-2.5 rounded-2xl text-xs text-[#0F172A] bg-[#F8FAFC] border transition-all focus:outline-none focus:bg-white ${
                            errors.resetNewPassword
                              ? 'border-rose-500 focus:ring-2 focus:ring-rose-200'
                              : 'border-[#CBD5E1] focus:ring-2 focus:ring-primary focus:border-primary'
                          }`}
                        />
                        <Lock size={16} className="absolute left-3.5 top-3 text-[#64748B]" />
                        <button
                          type="button"
                          onClick={() => setShowResetPassword(!showResetPassword)}
                          className="absolute right-3 top-2.5 p-0.5 text-[#64748B] hover:text-[#0F172A]"
                        >
                          {showResetPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      {errors.resetNewPassword && (
                        <p className="mt-1 text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.resetNewPassword}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1E293B] mb-1.5" htmlFor="reset-confirm-pass">
                        Confirm New Password <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="reset-confirm-pass"
                          type={showResetPassword ? 'text' : 'password'}
                          value={resetConfirmPassword}
                          onChange={(e) => {
                            setResetConfirmPassword(e.target.value);
                            if (errors.resetConfirmPassword) setErrors((prev) => ({ ...prev, resetConfirmPassword: '' }));
                          }}
                          placeholder="Re-enter new password"
                          className={`w-full pl-10 pr-10 py-2.5 rounded-2xl text-xs text-[#0F172A] bg-[#F8FAFC] border transition-all focus:outline-none focus:bg-white ${
                            errors.resetConfirmPassword
                              ? 'border-rose-500 focus:ring-2 focus:ring-rose-200'
                              : 'border-[#CBD5E1] focus:ring-2 focus:ring-primary focus:border-primary'
                          }`}
                        />
                        <Lock size={16} className="absolute left-3.5 top-3 text-[#64748B]" />
                      </div>
                      {errors.resetConfirmPassword && (
                        <p className="mt-1 text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.resetConfirmPassword}
                        </p>
                      )}
                    </div>

                    {/* Security tips */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-[#475569] space-y-1">
                      <div className="font-semibold text-[#0F172A] flex items-center gap-1">
                        <Check size={13} className="text-emerald-600" /> Password Security Guidelines:
                      </div>
                      <p>At least 6 characters including letters, numbers, or symbols.</p>
                    </div>

                    <button
                      type="submit"
                      disabled={forgotLoading}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-ambient transition-all active:scale-98 disabled:opacity-70 cursor-pointer"
                    >
                      {forgotLoading ? (
                        <span className="inline-flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          <span>Updating password...</span>
                        </span>
                      ) : (
                        <>
                          <span>Save & Set New Password</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* STEP 4: Success */}
              {forgotStep === 4 && (
                <div className="py-6 text-center space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={36} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-[#0F172A]">Password Reset Complete!</h3>
                    <p className="text-xs text-[#64748B] mt-1 max-w-xs mx-auto">
                      Your password has been updated. You can now log in to your account with your new credentials.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => switchMode('login')}
                    className="w-full py-3 px-4 rounded-2xl bg-primary hover:bg-primary-hover text-white font-bold text-xs shadow-ambient transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Sign In Now</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Security & Compliance Footer */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#64748B]">
          <ShieldCheck size={16} className="text-emerald-600" />
          <span>HIPAA-Compliant 256-Bit Encrypted Healthcare Platform</span>
        </div>

      </div>

    </div>
  );
};

export default LoginPage;
