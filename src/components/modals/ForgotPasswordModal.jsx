import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  X,
  Lock,
  Mail,
  Phone,
  KeyRound,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Eye,
  EyeOff,
  RefreshCw
} from 'lucide-react';
import { PhoneInput } from '../common/PhoneInput';

export const ForgotPasswordModal = ({ isOpen, onClose, initialEmail = "eleanor.vance@example.com" }) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Contact Input, 2: OTP Code, 3: New Password, 4: Success
  const [method, setMethod] = useState('email'); // 'email' | 'phone'
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  
  // OTP state (6-digits)
  const [otp, setOtp] = useState(['8', '4', '9', '2', '0', '1']);
  const [resendTimer, setResendTimer] = useState(45);

  // New Password state
  const [newPassword, setNewPassword] = useState('NewSecurePass2026!');
  const [confirmPassword, setConfirmPassword] = useState('NewSecurePass2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSendCode = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setStep(2);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const enteredCode = otp.join('');
    if (enteredCode.length < 6) {
      setErrorMessage('Please enter all 6 digits of the verification code.');
      return;
    }
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
    onClose();
    navigate('/dashboard');
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) value = value.slice(-1);
    const newArr = [...otp];
    newArr[index] = value;
    setOtp(newArr);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest border border-surface-container-high rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-elevated relative animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {/* STEP 1: SEND RECOVERY CODE */}
        {step === 1 && (
          <div className="space-y-5">
            <div className="text-center">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-3">
                <KeyRound size={28} />
              </div>
              <h2 className="text-2xl font-black text-on-surface">Reset Password</h2>
              <p className="text-xs text-on-surface-variant mt-1">
                Choose how you'd like to receive your secure verification code.
              </p>
            </div>

            {/* Method Picker */}
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
                  <label className="block text-xs font-semibold text-on-surface mb-1">Registered Phone with Country Code</label>
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
            </form>
          </div>
        )}

        {/* STEP 2: ENTER OTP CODE */}
        {step === 2 && (
          <div className="space-y-5">
            <div className="text-center">
              <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-3">
                <ShieldCheck size={28} />
              </div>
              <h2 className="text-2xl font-black text-on-surface">Enter Code</h2>
              <p className="text-xs text-on-surface-variant mt-1">
                We sent a 6-digit security code to <strong className="text-on-surface">{method === 'email' ? email : phone}</strong>
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="space-y-4">
              
              {/* 6 OTP Input Boxes */}
              <div className="flex justify-between gap-1.5 sm:gap-2">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-input-${i}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    className="w-11 h-12 text-center text-lg font-black rounded-2xl bg-surface-container-low border border-outline-variant/40 text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                ))}
              </div>

              {errorMessage && (
                <p className="text-xs text-error font-semibold text-center">{errorMessage}</p>
              )}

              <div className="flex items-center justify-between text-xs text-on-surface-variant">
                <button
                  type="button"
                  onClick={() => setOtp(['8', '4', '9', '2', '0', '1'])}
                  className="text-primary font-bold hover:underline flex items-center gap-1"
                >
                  <Sparkles size={13} /> Auto-fill Demo Code (849201)
                </button>
                <span>Resend in {resendTimer}s</span>
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
                ← Back to contact options
              </button>
            </form>
          </div>
        )}

        {/* STEP 3: ENTER NEW PASSWORD */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="text-center">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Lock size={28} />
              </div>
              <h2 className="text-2xl font-black text-on-surface">Set New Password</h2>
              <p className="text-xs text-on-surface-variant mt-1">
                Create a strong new password for your CareConnect account.
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
                    placeholder="Enter new password"
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
                <label className="block text-xs font-semibold text-on-surface mb-1">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder="Confirm new password"
                  />
                  <Lock size={16} className="absolute left-3.5 top-3.5 text-on-surface-variant" />
                </div>
              </div>

              {/* Password strength meter */}
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 space-y-1">
                <span className="font-bold flex items-center gap-1">
                  <CheckCircle2 size={13} className="text-emerald-700" /> Password Security: Strong
                </span>
                <p className="text-emerald-800">Minimum 8 characters with letters, numbers, and symbols.</p>
              </div>

              {errorMessage && (
                <p className="text-xs text-error font-semibold text-center">{errorMessage}</p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-ambient transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Save New Password</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        )}

        {/* STEP 4: SUCCESS CONFIRMATION */}
        {step === 4 && (
          <div className="py-6 text-center space-y-4 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={38} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-on-surface">Password Updated!</h3>
              <p className="text-xs text-on-surface-variant mt-1 max-w-xs mx-auto">
                Your password for <strong>{email}</strong> has been successfully changed.
              </p>
            </div>

            <button
              type="button"
              onClick={handleFinishAndLogin}
              className="w-full py-3.5 px-4 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-ambient transition-transform active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Sign In & Go to Dashboard</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default ForgotPasswordModal;
