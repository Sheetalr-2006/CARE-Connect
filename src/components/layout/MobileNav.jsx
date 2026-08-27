import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  Pill,
  Smile,
  Calendar,
  HeartHandshake,
  Video,
  ShieldCheck,
  CalendarHeart,
  UserCheck,
  User
} from 'lucide-react';

export const MobileNav = () => {
  const { currentUser } = useAuth();
  const userRole = currentUser?.role || 'elderly';

  const elderlyTabs = [
    { name: "My Day", path: "/dashboard", icon: LayoutDashboard, exact: true },
    { name: "Meds", path: "/medications", icon: Pill },
    { name: "Wellbeing", path: "/wellbeing", icon: Smile },
    { name: "Video", path: "/video-interaction", icon: Video },
    { name: "Companions", path: "/volunteer-matching", icon: HeartHandshake }
  ];

  const familyTabs = [
    { name: "Guardian Hub", path: "/family-dashboard", icon: Users, exact: true },
    { name: "Senior Vitals", path: "/elderly-profile", icon: User },
    { name: "Meds Log", path: "/medications", icon: Pill },
    { name: "Video Call", path: "/video-interaction", icon: Video },
    { name: "Care Plans", path: "/care-plans", icon: ShieldCheck }
  ];

  const volunteerTabs = [
    { name: "Duties", path: "/volunteer-dashboard", icon: HeartHandshake, exact: true },
    { name: "Visits", path: "/volunteer-visits", icon: CalendarHeart },
    { name: "Senior Matches", path: "/volunteer-matching", icon: Users },
    { name: "Video Call", path: "/video-interaction", icon: Video },
    { name: "Roster", path: "/volunteer-management", icon: UserCheck }
  ];

  const tabs = userRole === 'family'
    ? familyTabs
    : userRole === 'volunteer'
    ? volunteerTabs
    : elderlyTabs;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-surface-container-high/80 px-2 py-2 backdrop-blur-md bg-opacity-95 shadow-lg">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              end={tab.exact}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 px-2 rounded-xl text-[10px] font-medium transition-all ${
                  isActive
                    ? 'text-primary font-bold scale-105'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`
              }
            >
              <Icon size={19} className="mb-0.5" />
              <span className="truncate max-w-[64px]">{tab.name}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNav;
