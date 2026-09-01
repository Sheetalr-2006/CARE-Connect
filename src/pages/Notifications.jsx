import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  CheckCheck,
  Heart,
  Pill,
  CalendarCheck,
  ShieldAlert,
  Sparkles,
  Filter,
  Trash2
} from 'lucide-react';

export const Notifications = () => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    unreadNotificationCount
  } = useApp();

  const [activeTab, setActiveTab] = useState("all");

  const filtered = notifications.filter(n => {
    if (activeTab === "unread") return !n.read;
    if (activeTab === "health") return n.type === 'health' || n.type === 'medication';
    if (activeTab === "visits") return n.type === 'visit';
    return true;
  });

  const getIcon = (type) => {
    switch (type) {
      case 'health':
        return <Heart size={18} className="text-primary" />;
      case 'medication':
        return <Pill size={18} className="text-amber-600" />;
      case 'visit':
        return <CalendarCheck size={18} className="text-primary" />;
      case 'emergency':
        return <ShieldAlert size={18} className="text-error" />;
      default:
        return <Bell size={18} className="text-primary" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-container-high shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-0.5 rounded-full">
              Real-Time Activity Stream
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-on-surface">
            Notifications & System Alerts
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Stay informed on vital logs, medication schedules, and companion visit confirmations.
          </p>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className="px-4 py-2.5 rounded-2xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <CheckCheck size={16} className="text-primary" />
          <span>Mark All Read</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-surface-container pb-2">
        {[
          { id: 'all', label: 'All Alerts' },
          { id: 'unread', label: `Unread (${unreadNotificationCount})` },
          { id: 'health', label: 'Health & Meds' },
          { id: 'visits', label: 'Visits' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-low'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notification Stream */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-surface-container-lowest p-12 rounded-3xl border border-surface-container-high text-center text-on-surface-variant">
            <Bell size={36} className="mx-auto mb-2 text-outline-variant" />
            <p className="text-sm font-bold text-on-surface">No notifications found</p>
            <p className="text-xs text-outline mt-1">You are all caught up on all care alerts.</p>
          </div>
        ) : (
          filtered.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationRead(notif.id)}
              className={`p-4 sm:p-5 rounded-3xl border transition-all cursor-pointer flex items-start gap-4 ${
                notif.read
                  ? 'bg-surface-container-lowest border-surface-container'
                  : 'bg-primary/5 border-primary/30 shadow-sm'
              }`}
            >
              <div className="w-10 h-10 rounded-2xl bg-surface-container flex items-center justify-center flex-shrink-0 mt-0.5">
                {getIcon(notif.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-on-surface truncate">{notif.title}</h3>
                  <span className="text-[11px] text-on-surface-variant flex-shrink-0">{notif.time}</span>
                </div>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  {notif.message}
                </p>
              </div>

              {!notif.read && (
                <span className="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0 mt-2"></span>
              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
};
