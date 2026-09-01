import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCheck, Bell, Heart, Pill, CalendarCheck, ShieldAlert } from 'lucide-react';

export const NotificationDrawer = () => {
  const {
    isNotificationDrawerOpen,
    setIsNotificationDrawerOpen,
    notifications,
    markNotificationRead,
    markAllNotificationsRead
  } = useApp();

  if (!isNotificationDrawerOpen) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'health':
        return <Heart size={16} className="text-primary" />;
      case 'medication':
        return <Pill size={16} className="text-amber-600" />;
      case 'visit':
        return <CalendarCheck size={16} className="text-primary" />;
      case 'emergency':
        return <ShieldAlert size={16} className="text-error" />;
      default:
        return <Bell size={16} className="text-primary" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsNotificationDrawerOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-surface-container-lowest shadow-2xl border-l border-surface-container-high flex flex-col animate-in slide-in-from-right duration-200">
          
          {/* Header */}
          <div className="p-5 border-b border-surface-container flex items-center justify-between bg-surface-container-low/50">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Bell size={18} />
              </div>
              <h2 className="text-base font-bold text-on-surface">Notifications</h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={markAllNotificationsRead}
                className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 p-1"
                title="Mark all as read"
              >
                <CheckCheck size={15} />
                <span className="hidden sm:inline">Mark read</span>
              </button>
              <button
                onClick={() => setIsNotificationDrawerOpen(false)}
                className="p-1.5 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-on-surface-variant">
                <Bell size={36} className="mx-auto mb-2 text-outline-variant" />
                <p className="text-sm font-medium">All caught up!</p>
                <p className="text-xs text-outline">No new notifications.</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => markNotificationRead(notif.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    notif.read
                      ? 'bg-surface-container-lowest border-surface-container opacity-80'
                      : 'bg-primary/5 border-primary/20 shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0 mt-0.5">
                      {getIcon(notif.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs font-bold text-on-surface truncate">{notif.title}</h4>
                        <span className="text-[10px] text-on-surface-variant flex-shrink-0">{notif.time}</span>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">{notif.message}</p>
                    </div>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5"></span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-surface-container bg-surface-container-low/30 text-center">
            <p className="text-[11px] text-on-surface-variant">
              Live updates enabled for CareConnect Network
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
