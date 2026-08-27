import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { 
  Heart, 
  Bell, 
  AlertTriangle, 
  ChevronDown, 
  LogOut, 
  Settings as SettingsIcon,
  Shield,
  Menu,
  X,
  Mic,
  Globe,
  Compass,
  User,
  Users,
  HeartHandshake,
  Check
} from 'lucide-react';
import { SUPPORTED_LANGUAGES } from '../../utils/translations';

export const Navbar = ({ onToggleMobileMenu, isMobileMenuOpen }) => {
  const { currentUser, switchRole, logout, availableDemoUsers } = useAuth();
  const { 
    unreadNotificationCount, 
    setIsNotificationDrawerOpen, 
    triggerEmergencySOS,
    currentLanguage,
    setLanguage,
    setIsVoiceAssistantOpen
  } = useApp();
  
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const profileRef = useRef(null);
  const languageRef = useRef(null);
  const roleRef = useRef(null);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setIsLanguageDropdownOpen(false);
      }
      if (roleRef.current && !roleRef.current.contains(event.target)) {
        setIsRoleDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Senior', path: '/dashboard' },
    { label: 'Family', path: '/family-dashboard' },
    { label: 'Volunteers', path: '/volunteer-dashboard' },
    { label: 'Medications', path: '/medications' },
    { label: 'Appointments', path: '/appointments' },
    { label: '20 Events', path: '/social-engagement' },
    { label: 'All Links', path: '/links' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.03)] px-4 lg:px-8 h-14 transition-colors">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        
        {/* Left: Brand & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button 
            onClick={onToggleMobileMenu}
            className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white transition-transform group-hover:scale-105">
              <Heart className="w-4 h-4 fill-white" />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900 font-serif">
              Care<span className="text-primary font-serif">Connect</span>
            </span>
          </Link>
        </div>

        {/* Center: Clean Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'text-primary font-semibold bg-orange-50/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Minimal Utility Icons & Profile Dropdown */}
        <div className="flex items-center gap-1 sm:gap-2">
          
          {/* Quick Role Switcher Pill */}
          <div className="relative" ref={roleRef}>
            <button
              type="button"
              onClick={() => {
                setIsRoleDropdownOpen(!isRoleDropdownOpen);
                setIsProfileDropdownOpen(false);
                setIsLanguageDropdownOpen(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-slate-100 border border-slate-200 transition-colors"
              title="Switch Demo Persona"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-medium hidden sm:inline">{currentUser?.roleLabel || "Role"}</span>
              <span className="font-medium sm:hidden capitalize">{currentUser?.role}</span>
              <ChevronDown size={12} className="text-slate-400" />
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-64 bg-white rounded-xl shadow-lg border border-slate-200 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-2.5 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Switch Demo Persona
                </div>
                <div className="space-y-0.5">
                  {availableDemoUsers.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => {
                        switchRole(user.role);
                        setIsRoleDropdownOpen(false);
                        if (user.role === 'family') navigate('/family-dashboard');
                        else if (user.role === 'volunteer') navigate('/volunteer-dashboard');
                        else navigate('/dashboard');
                      }}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left text-xs transition-colors ${
                        currentUser?.role === user.role
                          ? 'bg-orange-50 text-primary font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-6 h-6 rounded-full object-cover border border-slate-200" 
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{user.name}</p>
                        <p className="text-[10px] text-slate-400">{user.roleLabel}</p>
                      </div>
                      {currentUser?.role === user.role && (
                        <Check size={14} className="text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Voice Assistant Icon */}
          <button
            onClick={() => setIsVoiceAssistantOpen(true)}
            className="p-2 rounded-lg text-slate-500 hover:text-primary hover:bg-slate-50 transition-colors"
            title="Open Voice Assistant"
            aria-label="Voice Assistant"
          >
            <Mic size={16} />
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative" ref={languageRef}>
            <button
              type="button"
              onClick={() => {
                setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
                setIsProfileDropdownOpen(false);
                setIsRoleDropdownOpen(false);
              }}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors flex items-center gap-1"
              title="Select Language"
              aria-label="Select Language"
            >
              <Globe size={16} />
            </button>

            {isLanguageDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-lg border border-slate-200 p-1.5 z-50 max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-100">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsLanguageDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                      currentLanguage === lang.code
                        ? 'bg-orange-50 text-primary font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.native}</span>
                    </span>
                    {currentLanguage === lang.code && <Check size={12} className="text-primary" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Emergency SOS Button (Compact) */}
          <button
            onClick={triggerEmergencySOS}
            className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition-colors flex items-center gap-1 shadow-xs"
            title="Trigger Emergency SOS"
          >
            <AlertTriangle size={13} />
            <span>SOS</span>
          </button>

          {/* Notifications Bell */}
          <button
            onClick={() => setIsNotificationDrawerOpen(true)}
            className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            aria-label="View Notifications"
          >
            <Bell size={17} />
            {unreadNotificationCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white"></span>
            )}
          </button>

          {/* User Profile Avatar Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => {
                setIsProfileDropdownOpen(!isProfileDropdownOpen);
                setIsRoleDropdownOpen(false);
                setIsLanguageDropdownOpen(false);
              }}
              className="flex items-center p-0.5 rounded-full hover:ring-2 hover:ring-slate-300 transition-all ml-1"
              aria-label="Open user menu"
            >
              <img
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="w-7 h-7 rounded-full object-cover border border-slate-200"
              />
            </button>

            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-52 bg-white rounded-xl shadow-lg border border-slate-200 p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-2 border-b border-slate-100">
                  <p className="text-xs font-semibold text-slate-900 truncate">{currentUser?.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{currentUser?.email}</p>
                </div>
                <div className="py-1 space-y-0.5">
                  <Link
                    to="/links"
                    onClick={() => setIsProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
                  >
                    <Compass size={14} className="text-slate-400" />
                    <span>All Website Links</span>
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setIsProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
                  >
                    <SettingsIcon size={14} className="text-slate-400" />
                    <span>Settings</span>
                  </Link>
                  <Link
                    to="/care-plans"
                    onClick={() => setIsProfileDropdownOpen(false)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-slate-50 hover:text-primary transition-colors"
                  >
                    <Shield size={14} className="text-slate-400" />
                    <span>Care Plans</span>
                  </Link>
                </div>
                <div className="pt-1 border-t border-slate-100">
                  <button
                    onClick={() => {
                      logout();
                      setIsProfileDropdownOpen(false);
                      navigate('/auth/login');
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-rose-600 hover:bg-rose-50 transition-colors font-medium"
                  >
                    <LogOut size={14} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};

export default Navbar;
