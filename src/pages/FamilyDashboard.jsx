import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import {
  Users,
  Heart,
  Activity,
  Pill,
  Smile,
  CalendarCheck,
  Send,
  ShieldCheck,
  PhoneCall,
  AlertTriangle,
  Clock,
  CheckCircle2,
  FileText,
  Sparkles,
  TrendingUp,
  MessageSquare,
  Video
} from 'lucide-react';

export const FamilyDashboard = () => {
  const {
    currentElderly,
    medications,
    visits,
    wellbeingLogs,
    notifications,
    triggerEmergencySOS,
    carePlans,
    selectedPlanId,
    startVideoCall
  } = useApp();

  const [messageInput, setMessageInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "Marcus Chen (Volunteer)", text: "Good morning Sarah! Finished morning garden walk with Eleanor. Her spirits are high and vitals checked normal.", time: "11:15 AM", isSelf: false },
    { id: 2, sender: "Sarah Vance (You)", text: "Thank you so much Marcus! Did she remember her morning water bottle?", time: "11:20 AM", isSelf: true },
    { id: 3, sender: "Marcus Chen (Volunteer)", text: "Yes, had 2 glasses of water and chamomile tea. All is well!", time: "11:22 AM", isSelf: false }
  ]);

  const activePlan = carePlans.find(p => p.id === selectedPlanId) || carePlans[1];

  const takenMeds = medications.filter(m => m.status === 'Taken').length;
  const totalMeds = medications.length;
  const medPercentage = totalMeds > 0 ? Math.round((takenMeds / totalMeds) * 100) : 100;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    setChatMessages([
      ...chatMessages,
      {
        id: Date.now(),
        sender: "Sarah Vance (You)",
        text: messageInput.trim(),
        time: "Just now",
        isSelf: true
      }
    ]);
    setMessageInput("");
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      
      {/* Top Guardian Header */}
      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-container-high shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentElderly.avatar}
            alt={currentElderly.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl object-cover border-2 border-primary/20 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-0.5 rounded-full">
                Live Family Oversight
              </span>
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-on-surface mt-1">
              {currentElderly.name}
            </h1>
            <p className="text-xs text-on-surface-variant">
              Age {currentElderly.age} • {currentElderly.address} • Guardian: <strong className="text-on-surface">{currentElderly.emergencyContact.name}</strong>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => startVideoCall({
              title: `Live Video Session with ${currentElderly.name}`,
              type: "family",
              participants: [
                {
                  name: "Sarah Vance (You)",
                  role: "Family Guardian",
                  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256&h=256",
                  status: "Speaking..."
                },
                {
                  name: "Marcus Chen",
                  role: "Volunteer Companion",
                  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256",
                  status: "Connected"
                }
              ]
            })}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-primary text-white font-bold text-xs shadow-ambient hover:bg-primary/90 transition-all"
          >
            <Video size={16} />
            <span>Join Video Room</span>
          </button>
          <a
            href={`tel:${currentElderly.phone}`}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-surface-container hover:bg-surface-container-high text-on-surface font-bold text-xs transition-colors"
          >
            <PhoneCall size={16} />
            <span>Call Phone</span>
          </a>
          <button
            onClick={triggerEmergencySOS}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-error hover:bg-error/90 text-white font-bold text-xs shadow-md transition-all animate-pulse"
          >
            <AlertTriangle size={16} />
            <span>Emergency SOS</span>
          </button>
        </div>
      </div>

      {/* Real-time Health Vitals & Medication Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Vitals Summary */}
        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-high shadow-card space-y-4 animate-fade-in-scale" style={{ animationDelay: '150ms' }}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
              <Activity size={18} className="text-primary" />
              Latest Vitals
            </h3>
            <span className="text-[10px] text-on-surface-variant">Updated 08:30 AM</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-surface-container-low">
              <span className="text-[10px] uppercase font-bold text-on-surface-variant">Blood Pressure</span>
              <p className="text-lg font-black text-on-surface mt-0.5">{currentElderly.vitals.bloodPressure}</p>
              <span className="text-[10px] text-primary font-semibold">✓ Normal target</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-surface-container-low">
              <span className="text-[10px] uppercase font-bold text-on-surface-variant">Heart Rate</span>
              <p className="text-lg font-black text-on-surface mt-0.5">{currentElderly.vitals.heartRate}</p>
              <span className="text-[10px] text-primary font-semibold">✓ Regular sinus</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-surface-container-low">
              <span className="text-[10px] uppercase font-bold text-on-surface-variant">Blood Glucose</span>
              <p className="text-lg font-black text-on-surface mt-0.5">{currentElderly.vitals.bloodSugar}</p>
              <span className="text-[10px] text-primary font-semibold">✓ Post-breakfast</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-surface-container-low">
              <span className="text-[10px] uppercase font-bold text-on-surface-variant">Oxygen SpO2</span>
              <p className="text-lg font-black text-on-surface mt-0.5">{currentElderly.vitals.oxygenLevel}</p>
              <span className="text-[10px] text-primary font-semibold">✓ Excellent</span>
            </div>
          </div>
        </div>

        {/* Medication Adherence Tracker */}
        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-high shadow-card space-y-4 animate-fade-in-scale" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
              <Pill size={18} className="text-primary" />
              Medication Adherence
            </h3>
            <span className="text-xs font-bold text-primary">{takenMeds} of {totalMeds} Taken</span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold text-on-surface">
              <span>Today's Adherence</span>
              <span>{medPercentage}%</span>
            </div>
            <div className="w-full bg-surface-container h-3 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full rounded-full transition-all duration-500"
                style={{ width: `${medPercentage}%` }}
              />
            </div>
          </div>

          <div className="space-y-2 pt-1">
            {medications.slice(0, 3).map((m) => (
              <div key={m.id} className="flex items-center justify-between text-xs p-2 rounded-xl bg-surface-container-low">
                <div>
                  <span className="font-bold text-on-surface">{m.name}</span>
                  <span className="text-[11px] text-on-surface-variant block">{m.timing}</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  m.status === 'Taken' ? 'bg-orange-100 text-primary' : 'bg-amber-100 text-amber-800'
                }`}>
                  {m.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Care Tier */}
        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-high shadow-card space-y-4 animate-fade-in-scale" style={{ animationDelay: '450ms' }}>
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-on-surface flex items-center gap-2">
              <ShieldCheck size={18} className="text-primary" />
              Active Care Plan
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-100 text-primary font-bold">Active</span>
          </div>

          <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-2">
            <p className="text-sm font-bold text-primary">{activePlan.name}</p>
            <p className="text-xs text-on-surface-variant leading-relaxed">{activePlan.description}</p>
            <div className="pt-2 flex items-center justify-between text-xs text-on-surface font-semibold border-t border-primary/15">
              <span>Billing Cycle:</span>
              <span>Monthly Auto-Renew</span>
            </div>
          </div>

          <div className="text-xs text-on-surface-variant flex items-center gap-2">
            <CheckCircle2 size={15} className="text-primary" />
            <span>Dedicated Coordinator: Dr. Olivia Reed</span>
          </div>
        </div>

      </div>

      {/* Bottom 2-Column: Live Activity Feed & Volunteer Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Live Care Activity Feed */}
        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-high shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-on-surface flex items-center gap-2">
              <Clock size={18} className="text-primary" />
              Care Recipient Activity Feed
            </h3>
            <span className="text-xs text-on-surface-variant">Real-time alerts</span>
          </div>

          <div className="space-y-3">
            {notifications.slice(0, 4).map((n) => (
              <div key={n.id} className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-xl mt-0.5">{n.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-on-surface">{n.title}</h4>
                    <span className="text-[10px] text-on-surface-variant">{n.time}</span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-0.5">{n.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Caregiver & Volunteer Messaging Hub */}
        <div className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-high shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-on-surface flex items-center gap-2">
                <MessageSquare size={18} className="text-primary" />
                Care Team Instant Messaging
              </h3>
              <span className="text-xs text-primary font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> Online
              </span>
            </div>

            {/* Message Stream */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1 mb-4">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-3 rounded-2xl text-xs max-w-[85%] ${
                    msg.isSelf
                      ? 'ml-auto bg-primary text-white rounded-tr-none'
                      : 'bg-surface-container-low text-on-surface rounded-tl-none border border-surface-container'
                  }`}
                >
                  <p className="text-[10px] font-bold opacity-80 mb-0.5">{msg.sender}</p>
                  <p className="leading-relaxed">{msg.text}</p>
                  <span className="text-[9px] opacity-70 block text-right mt-1">{msg.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-surface-container">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Send message to Marcus Chen..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/40 text-xs text-on-surface focus:ring-2 focus:ring-primary focus:outline-none"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-primary text-white hover:bg-primary/90 transition-transform active:scale-95"
            >
              <Send size={16} />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
};
