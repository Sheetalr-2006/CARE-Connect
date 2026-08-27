import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Heart,
  KeyRound,
  Mail,
  Phone,
  Lock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Eye,
  EyeOff
} from 'lucide-react';
import { PhoneInput } from '../../components/common/PhoneInput';

export const ForgotPasswordPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [method, setMethod] = useState('email');
  const [email, setEmail] = useState('eleanor.vance@example.com');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [otp, setOtp] = useState(['8', '4', '9', '2', '0', '1']);
  const [newPassword, setNewPassword] = useState('NewSecurePass2026!');
  const [confirmPassword, setConfirmPassword] = useState('NewSecurePass2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSendCode = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setStep(2);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setStep(3);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    setErrorMessage('');
    setStep(4);
  };

  const handleFinishAndLogin = () => {
    login(email || 'eleanor.vance@example.com', newPassword, 'elderly');
    navigate('/dashboard');
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);

    if (value && index < 5) {
      const nextInput = document.getElementById(`page-otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2.5 mb-3">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-ambient">
            <Heart className="w-6 h-6 fill-white" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-on-surface">CareConnect</span>
        </Link>
        <h1 className="text-2xl font-black text-on-surface">Account Recovery</h1>
        <p className="text-xs text-on-surface-variant mt-1">
          Recover access to your elderly care and caregiver dashboard
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-surface-container-lowest py-8 px-6 sm:px-10 rounded-3xl shadow-ambient border border-surface-container-high space-y-6">
          
          {step === 1 && (
            <div className="space-y-5">
              <div className="text-center">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <KeyRound size={28} />
                </div>
                <h2 className="text-xl font-bold text-on-surface">Reset Password</h2>
                <p className="text-xs text-on-surface-variant mt-1">
                  Choose your verification channel
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-surface-container p-1 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setMethod('email')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    method === 'email'
                      ? 'bg-surface-container-lowest text-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <Mail size={14} /> Via Email
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('phone')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    method === 'phone'
                      ? 'bg-surface-container-lowest text-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <Phone size={14} /> Via SMS Text
                </button>
              </div>

              <form onSubmit={handleSendCode} className="space-y-4">
                {method === 'email' ? (
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1">Registered Email Address</label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
                        placeholder="name@example.com"
                      />
                      <Mail size={16} className="absolute left-3.5 top-3.5 text-on-surface-variant" />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1">Registered Phone Number</label>
                    <PhoneInput
                      required
                      value={phone}
                      onChange={(val) => setPhone(val)}
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-ambient transition-transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Send 6-Digit Code</span>
                  <ArrowRight size={16} />
                </button>

                <div className="text-center pt-2">
                  <Link to="/" className="text-xs font-bold text-primary hover:underline">
                    ← Back to Sign In
                  </Link>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div className="text-center">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <ShieldCheck size={28} />
                </div>
                <h2 className="text-xl font-bold text-on-surface">Enter Verification Code</h2>
                <p className="text-xs text-on-surface-variant mt-1">
                  Sent to <strong className="text-on-surface">{method === 'email' ? email : phone}</strong>
                </p>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="flex justify-between gap-1.5 sm:gap-2">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`page-otp-${i}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      className="w-11 h-12 text-center text-lg font-black rounded-2xl bg-surface-container-low border border-outline-variant/40 text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs text-on-surface-variant">
                  <button
                    type="button"
                    onClick={() => setOtp(['8', '4', '9', '2', '0', '1'])}
                    className="text-primary font-bold hover:underline flex items-center gap-1"
                  >
                    <Sparkles size={13} /> Demo Code (849201)
                  </button>
                  <span>Resend in 30s</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-ambient transition-transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Verify Code</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-center text-xs text-on-surface-variant hover:text-on-surface"
                >
                  ← Change email/phone
                </button>
              </form>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div className="text-center">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <Lock size={28} />
                </div>
                <h2 className="text-xl font-bold text-on-surface">Set New Password</h2>
                <p className="text-xs text-on-surface-variant mt-1">
                  Create a secure new password
                </p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">New Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-3 rounded-2xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                    <Lock size={16} className="absolute left-3.5 top-3.5 text-on-surface-variant" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-on-surface-variant hover:text-on-surface"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
                    />
                    <Lock size={16} className="absolute left-3.5 top-3.5 text-on-surface-variant" />
                  </div>
                </div>

                {errorMessage && (
                  <p className="text-xs text-error font-semibold text-center">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-ambient transition-transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>Update Password</span>
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          )}

          {step === 4 && (
            <div className="py-6 text-center space-y-4 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={38} />
              </div>
              <h3 className="text-2xl font-black text-on-surface">Password Updated!</h3>
              <p className="text-xs text-on-surface-variant">
                You can now sign in with your new credentials.
              </p>

              <button
                type="button"
                onClick={handleFinishAndLogin}
                className="w-full py-3.5 px-4 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-ambient transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Sign In & Open Dashboard</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
