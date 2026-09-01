import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Video,
  PhoneCall,
  Users,
  Heart,
  Calendar,
  Clock,
  Sparkles,
  ShieldCheck,
  Activity,
  Smile,
  Mic,
  Camera,
  Volume2,
  CheckCircle2,
  Play
} from 'lucide-react';

export const VideoInteraction = () => {
  const { startVideoCall, currentElderly } = useApp();

  const [activeTab, setActiveTab] = useState('rooms'); // 'rooms' | 'scheduled' | 'history'

  const videoRooms = [
    {
      id: "room-family",
      title: "Family Video Tea Room",
      subtitle: "Casual morning catchup with your primary caregiver & family",
      participant: "Sarah Vance (Daughter)",
      participantRole: "Family Guardian",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256&h=256",
      status: "Available Now • Online",
      badge: "Instant Connect",
      type: "family"
    },
    {
      id: "room-volunteer",
      title: "Volunteer Companion Session",
      subtitle: "Friendly conversation, storytelling, and virtual vital sign check",
      participant: "Marcus Chen",
      participantRole: "Certified Volunteer Aide",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256",
      status: "Ready • In Session",
      badge: "Volunteer Care",
      type: "volunteer"
    },
    {
      id: "room-doctor",
      title: "Doctor Telehealth Consultation",
      subtitle: "Clinical evaluation, prescription review, and health telemetry",
      participant: "Dr. Olivia Reed, MD",
      participantRole: "Geriatric Specialist",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=256&h=256",
      status: "Scheduled • 11:00 AM Today",
      badge: "HIPAA Telehealth",
      type: "doctor"
    }
  ];

  const scheduledCalls = [
    {
      id: "sc-1",
      title: "Sunday Family Brunch Video Call",
      participants: ["Sarah Vance", "Grandkids (Leo & Maya)"],
      date: "Sunday, Aug 30",
      time: "11:00 AM",
      type: "Family Gathering"
    },
    {
      id: "sc-2",
      title: "Memory Lane Watercolor Review",
      participants: ["Elena Rostova (Art Companion)"],
      date: "Tomorrow, Aug 27",
      time: "02:30 PM",
      type: "Creative Arts"
    }
  ];

  const recentCalls = [
    {
      id: "rc-1",
      title: "Evening Wellness Checkup",
      with: "Sarah Vance",
      duration: "18 mins",
      date: "Yesterday, 07:15 PM",
      vitalsLogged: "BP 124/80, HR 74 bpm"
    },
    {
      id: "rc-2",
      title: "Afternoon Companion Storytelling",
      with: "Marcus Chen",
      duration: "32 mins",
      date: "Aug 24, 03:00 PM",
      vitalsLogged: "Mood: Happy & Calm"
    }
  ];

  const handleLaunchCall = (room) => {
    startVideoCall({
      title: room.title,
      type: room.type,
      participants: [
        {
          name: room.participant,
          role: room.participantRole,
          avatar: room.avatar,
          status: "Speaking..."
        },
        {
          name: "Marcus Chen",
          role: "Volunteer Companion",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256",
          status: "Connected"
        }
      ]
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="bg-surface-container-lowest p-6 sm:p-8 rounded-3xl border border-surface-container-high shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-0.5 rounded-full flex items-center gap-1">
              <Video size={13} /> Live Telecare & Video Interaction
            </span>
            <span className="text-xs text-primary font-semibold flex items-center gap-1">
              <ShieldCheck size={14} /> 256-Bit Encrypted
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-on-surface">
            Video Interaction & Telehealth
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            High-definition, accessible video rooms connecting <strong className="text-on-surface">{currentElderly.name}</strong> with family, volunteers, and doctors.
          </p>
        </div>

        <button
          onClick={() => handleLaunchCall(videoRooms[0])}
          className="px-6 py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-ambient transition-all flex items-center gap-2 self-start md:self-auto animate-pulse"
        >
          <Video size={18} />
          <span>Launch Family Video Call</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-surface-container pb-2">
        {[
          { id: 'rooms', label: 'Live Video Rooms' },
          { id: 'scheduled', label: `Scheduled Sessions (${scheduledCalls.length})` },
          { id: 'history', label: 'Call History & Logs' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-low'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: LIVE VIDEO ROOMS */}
      {activeTab === 'rooms' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
          {videoRooms.map((room) => (
            <div
              key={room.id}
              className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-high shadow-card hover:shadow-ambient transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                    {room.badge}
                  </span>
                  <span className="text-[11px] text-primary font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                    {room.status}
                  </span>
                </div>

                <div className="flex items-center gap-3.5 mb-3">
                  <img
                    src={room.avatar}
                    alt={room.participant}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-primary/20 shadow-sm"
                  />
                  <div>
                    <h3 className="text-base font-bold text-on-surface">{room.title}</h3>
                    <p className="text-xs text-primary font-semibold">{room.participant}</p>
                    <p className="text-[11px] text-on-surface-variant">{room.participantRole}</p>
                  </div>
                </div>

                <p className="text-xs text-on-surface-variant leading-relaxed mb-4 bg-surface-container-low/50 p-3 rounded-2xl">
                  {room.subtitle}
                </p>
              </div>

              <div className="pt-4 border-t border-surface-container space-y-2">
                <button
                  onClick={() => handleLaunchCall(room)}
                  className="w-full py-3 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <Video size={16} />
                  <span>Start Video Interaction</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: SCHEDULED SESSIONS */}
      {activeTab === 'scheduled' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {scheduledCalls.map((call) => (
            <div
              key={call.id}
              className="bg-surface-container-lowest p-6 rounded-3xl border border-surface-container-high shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                  {call.type}
                </span>
                <h3 className="text-base font-bold text-on-surface">{call.title}</h3>
                <p className="text-xs text-on-surface-variant">
                  With: <strong className="text-on-surface">{call.participants.join(', ')}</strong>
                </p>
                <p className="text-xs text-primary font-semibold flex items-center gap-1.5 pt-1">
                  <Calendar size={14} /> {call.date} at {call.time}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleLaunchCall(videoRooms[0])}
                  className="px-5 py-2.5 rounded-2xl bg-primary text-white text-xs font-bold shadow-sm hover:bg-primary/90 transition-all flex items-center gap-1.5"
                >
                  <Video size={15} /> Join Early
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: CALL HISTORY & VITALS RECORDINGS */}
      {activeTab === 'history' && (
        <div className="space-y-4 animate-in fade-in duration-200">
          {recentCalls.map((log) => (
            <div
              key={log.id}
              className="bg-surface-container-lowest p-5 rounded-3xl border border-surface-container-high shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-on-surface">{log.title}</h3>
                  <span className="text-xs text-on-surface-variant">• {log.duration}</span>
                </div>
                <p className="text-xs text-on-surface-variant">
                  Participant: <strong className="text-on-surface">{log.with}</strong>
                </p>
                <p className="text-[11px] text-primary font-semibold bg-orange-50 px-2.5 py-1 rounded-xl inline-block mt-1">
                  Telemetry Summary: {log.vitalsLogged}
                </p>
              </div>

              <div className="text-xs text-on-surface-variant">
                <span>{log.date}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Senior Device Diagnostics Card */}
      <div className="p-6 rounded-3xl bg-surface-container-low border border-surface-container flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
            <Mic size={22} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-on-surface">Senior Video & Audio Self-Test</h4>
            <p className="text-xs text-on-surface-variant">
              Check microphone volume, hearing aid compatibility, and auto-caption contrast before calls.
            </p>
          </div>
        </div>

        <button
          onClick={() => handleLaunchCall(videoRooms[0])}
          className="px-4 py-2.5 rounded-2xl bg-surface-container hover:bg-surface-container-high text-xs font-bold text-on-surface transition-colors"
        >
          Run Equipment Test
        </button>
      </div>

    </div>
  );
};

export default VideoInteraction;
