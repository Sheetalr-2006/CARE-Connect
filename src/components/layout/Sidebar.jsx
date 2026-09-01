import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  CalendarHeart,
  Pill,
  Smile,
  Calendar,
  Sparkles,
  ShieldCheck,
  Bell,
  Settings,
  User,
  HeartHandshake,
  Compass,
  Video,
  Gift
} from 'lucide-react';

export const Sidebar = ({ onCloseMobile }) => {
  const { currentElderly, unreadNotificationCount, setIsSpecialOfferOpen } = useApp();
  const { currentUser, switchRole, availableDemoUsers } = useAuth();

  const navigate = useNavigate();
  const userRole = currentUser?.role || 'elderly';

  // Role-Specific Navigation Definitions
  const elderlyNavigation = [
    {
      section: "Senior Daily Dashboard",
      items: [
        { name: "My Daily Overview", path: "/dashboard", icon: LayoutDashboard, exact: true },
        { name: "My Medications", path: "/medications", icon: Pill },
        { name: "Daily Wellbeing Check", path: "/wellbeing", icon: Smile },
        { name: "Doctor Appointments", path: "/appointments", icon: Calendar },
        { name: "My Care Profile", path: "/elderly-profile", icon: User }
      ]
    },
    {
      section: "Family & Companions",
      items: [
        { name: "Video Call Family", path: "/video-interaction", icon: Video, badge: "Live" },
        { name: "Find Volunteer Companions", path: "/volunteer-matching", icon: HeartHandshake, badge: "98% Match" },
        { name: "My Scheduled Visits", path: "/volunteer-visits", icon: CalendarHeart },
        { name: "Social Club & Events", path: "/social", icon: Sparkles }
      ]
    },
    {
      section: "Settings & Help",
      items: [
        { name: "All Website Links", path: "/links", icon: Compass, badge: "Sitemap" },
        { name: "Accessibility & Audio", path: "/settings", icon: Settings },
        { name: "Notifications", path: "/notifications", icon: Bell, count: unreadNotificationCount }
      ]
    }
  ];

  const familyNavigation = [
    {
      section: "Family Guardian Oversight",
      items: [
        { name: "Family Care Hub", path: "/family-dashboard", icon: Users, badge: "Live Feed", exact: true },
        { name: "Senior Vitals & Profile", path: "/elderly-profile", icon: User },
        { name: "Medication Adherence", path: "/medications", icon: Pill },
        { name: "Wellbeing Logs & History", path: "/wellbeing", icon: Smile }
      ]
    },
    {
      section: "Care Services & Video",
      items: [
        { name: "Family Video Room", path: "/video-interaction", icon: Video, badge: "Live" },
        { name: "Clinical Appointments", path: "/appointments", icon: Calendar },
        { name: "Volunteer Matchmaking", path: "/volunteer-matching", icon: HeartHandshake },
        { name: "Scheduled Visits", path: "/volunteer-visits", icon: CalendarHeart }
      ]
    },
    {
      section: "Subscription & Alerts",
      items: [
        { name: "All Website Links", path: "/links", icon: Compass, badge: "Sitemap" },
        { name: "Care Plans & Subscriptions", path: "/care-plans", icon: ShieldCheck },
        { name: "Guardian Alerts & SOS", path: "/notifications", icon: Bell, count: unreadNotificationCount },
        { name: "Family Settings", path: "/settings", icon: Settings }
      ]
    }
  ];

  const volunteerNavigation = [
    {
      section: "Volunteer Duty Portal",
      items: [
        { name: "Volunteer Dashboard", path: "/volunteer-dashboard", icon: HeartHandshake, badge: "Active", exact: true },
        { name: "My Scheduled Visits", path: "/volunteer-visits", icon: CalendarHeart },
        { name: "Find Senior Matches", path: "/volunteer-matching", icon: Users, badge: "98% Match" },
        { name: "Companion Video Calls", path: "/video-interaction", icon: Video, badge: "Live" }
      ]
    },
    {
      section: "Community & Directory",
      items: [
        { name: "Volunteer Community Roster", path: "/volunteer-management", icon: UserCheck },
        { name: "Social Events & Gatherings", path: "/social", icon: Sparkles }
      ]
    },
    {
      section: "Account & Settings",
      items: [
        { name: "All Website Links", path: "/links", icon: Compass, badge: "Sitemap" },
        { name: "Volunteer Notifications", path: "/notifications", icon: Bell, count: unreadNotificationCount },
        { name: "Rates & Availability Settings", path: "/settings", icon: Settings }
      ]
    }
  ];

  const navigationItems = userRole === 'family'
    ? familyNavigation
    : userRole === 'volunteer'
    ? volunteerNavigation
    : elderlyNavigation;

  return (
    <aside className="w-64 flex-shrink-0 bg-surface-container-low/80 border-r border-surface-container-high h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto p-4 flex flex-col justify-between">
      
      {/* Top Section */}
      <div className="space-y-5">
        
        {/* Role Indicator & Persona Switcher */}
        <div className="bg-surface-container-lowest p-3.5 rounded-2xl border border-surface-container-high shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Active Persona</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
              userRole === 'family'
                ? 'bg-orange-100 text-primary'
                : userRole === 'volunteer'
                ? 'bg-orange-50 text-primary border border-orange-200'
                : 'bg-primary/10 text-primary'
            }`}>
              {userRole === 'elderly' ? 'Senior 🧓' : userRole === 'family' ? 'Family 👨‍👩‍👧' : 'Volunteer 🤝'}
            </span>
          </div>

          <div className="flex items-center gap-2.5 pt-1">
            <img
              src={currentUser?.avatar || currentElderly.avatar}
              alt={currentUser?.name}
              className="w-10 h-10 rounded-xl object-cover border border-outline-variant/30"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-on-surface truncate">{currentUser?.name}</p>
              <p className="text-[10px] text-on-surface-variant capitalize truncate">{currentUser?.roleLabel || userRole}</p>
            </div>
          </div>

          {/* Quick Role Switcher Bar */}
          <div className="pt-2 border-t border-surface-container/60">
            <p className="text-[10px] text-on-surface-variant font-semibold mb-1">Switch View:</p>
            <div className="grid grid-cols-3 gap-1">
              {[
                { id: 'elderly', label: 'Senior', anim: 'animate-pop-slide-left' },
                { id: 'family', label: 'Family', anim: 'animate-pop-bounce-up' },
                { id: 'volunteer', label: 'Volunteer', anim: 'animate-pop-slide-right' }
              ].map((r, rIdx) => (
                <button
                  key={r.id}
                  type="button"
                  style={{ animationDelay: `${rIdx * 70 + 50}ms` }}
                  onClick={() => {
                    switchRole(r.id);
                    if (r.id === 'family') {
                      navigate('/family-dashboard');
                    } else if (r.id === 'volunteer') {
                      navigate('/volunteer-dashboard');
                    } else {
                      navigate('/dashboard');
                    }
                  }}
                  className={`py-1 text-[10px] font-bold rounded-lg transition-all ${r.anim} ${
                    userRole === r.id
                      ? 'bg-primary text-white shadow-xs'
                      : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Groups (Distinct Pop-Up for Every Sub-Nav Link) */}
        <nav className="space-y-5">
          {navigationItems.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              <h3 className="px-3 text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/80">
                {group.section}
              </h3>
              <div className="space-y-0.5 pt-1">
                {group.items.map((item, iIdx) => {
                  const Icon = item.icon;
                  const itemIndex = gIdx * 3 + iIdx;
                  const anim = itemIndex % 4 === 0 ? 'animate-pop-slide-left' : itemIndex % 4 === 1 ? 'animate-pop-slide-right' : itemIndex % 4 === 2 ? 'animate-pop-bounce-up' : 'animate-pop-flip-in';
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.exact}
                      onClick={onCloseMobile}
                      style={{ animationDelay: `${itemIndex * 40 + 80}ms` }}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group ${anim} ${
                          isActive
                            ? 'bg-primary text-white shadow-ambient font-semibold'
                            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                        }`
                      }
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={17} className="flex-shrink-0" />
                        <span className="truncate">{item.name}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/20 text-primary font-semibold group-hover:bg-primary/30">
                          {item.badge}
                        </span>
                      )}
                      {item.count > 0 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-error text-white font-bold">
                          {item.count}
                        </span>
                      )}
                    </NavLink>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Welcome Offer 15% Off Promo Card in Sidebar */}
      <div className="pt-4 border-t border-surface-container/70 mt-2">
        <button
          type="button"
          onClick={() => {
            setIsSpecialOfferOpen(true);
            if (onCloseMobile) onCloseMobile();
          }}
          className="w-full p-3 rounded-2xl bg-gradient-to-tr from-[#FFEBAF] to-[#FFF6DE] border border-[#EADDBF] text-left transition-all hover:scale-[1.02] shadow-xs cursor-pointer group"
          title="Open -15% Welcome Benefit"
        >
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-5 h-5 rounded-lg bg-[#E8703A] text-white flex items-center justify-center shadow-xs">
              <Gift size={12} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#E8703A]">
              Special Offer
            </span>
          </div>
          <p className="text-xs font-bold text-[#1F2A44] font-serif leading-tight">
            Get -15% Off Care
          </p>
          <p className="text-[10px] text-[#5B6B82] mt-0.5 flex items-center justify-between">
            <span>Code: <strong className="font-mono text-[#E8703A]">CARE15</strong></span>
            <span className="text-[#E8703A] font-bold group-hover:translate-x-0.5 transition-transform">Claim →</span>
          </p>
        </button>
      </div>

      {/* Bottom Footer Info */}
      <div className="pt-2 text-center">
        <p className="text-[10px] text-outline">Viewing as: {currentUser?.name} ({userRole})</p>
      </div>

    </aside>
  );
};
