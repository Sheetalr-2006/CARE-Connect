import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Volume2,
  VolumeX,
  MessageSquare,
  Sparkles,
  Heart,
  Smile,
  Activity,
  Captions,
  Users,
  Send,
  Camera,
  Maximize2
} from 'lucide-react';

export const VideoCallModal = () => {
  const {
    isVideoCallModalOpen,
    setIsVideoCallModalOpen,
    activeVideoCallSession,
    endVideoCall,
    currentElderly
  } = useApp();

  // Call Controls State
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);
  const [isCaptionsEnabled, setIsCaptionsEnabled] = useState(true);
  const [showVitalsOverlay, setShowVitalsOverlay] = useState(true);
  const [showChat, setShowChat] = useState(false);

  // In-call messages & floating reactions
  const [callMessages, setCallMessages] = useState([
    { sender: "Sarah Vance", text: "Hi Mom! How are you feeling today?", time: "10:02 AM" },
    { sender: "Eleanor Vance", text: "Doing well dear! Just finished my morning tea.", time: "10:03 AM" }
  ]);
  const [inputMsg, setInputMsg] = useState("");
  const [reactions, setReactions] = useState([]);
  const [callDuration, setCallDuration] = useState(0);

  // Camera video stream ref
  const userVideoRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);

  // Timer for duration
  useEffect(() => {
    let interval = null;
    if (isVideoCallModalOpen) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);

      // Attempt to access webcam if available
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia && !isVideoOff) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: false })
          .then(stream => {
            if (userVideoRef.current) {
              userVideoRef.current.srcObject = stream;
              setCameraActive(true);
            }
          })
          .catch(() => {
            setCameraActive(false);
          });
      }
    } else {
      setCallDuration(0);
      if (userVideoRef.current && userVideoRef.current.srcObject) {
        userVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    }
    return () => {
      if (interval) clearInterval(interval);
      if (userVideoRef.current && userVideoRef.current.srcObject) {
        userVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [isVideoCallModalOpen, isVideoOff]);

  if (!isVideoCallModalOpen) return null;

  const formatDuration = (secs) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${rem.toString().padStart(2, '0')}`;
  };

  const triggerReaction = (emoji) => {
    const newReaction = { id: Date.now(), emoji, left: Math.random() * 60 + 20 };
    setReactions(prev => [...prev, newReaction]);
    setTimeout(() => {
      setReactions(prev => prev.filter(r => r.id !== newReaction.id));
    }, 2000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setCallMessages(prev => [
      ...prev,
      { sender: currentElderly.name, text: inputMsg.trim(), time: "Just now" }
    ]);
    setInputMsg("");
  };

  const participants = activeVideoCallSession?.participants || [
    {
      name: "Sarah Vance (Family Guardian)",
      role: "Daughter",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600&h=600",
      status: "Speaking...",
      isHost: true
    },
    {
      name: "Marcus Chen (Volunteer)",
      role: "Companion",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600&h=600",
      status: "Connected",
      isHost: false
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#1E2229] border border-white/10 rounded-3xl w-full max-w-5xl h-[90vh] max-h-[800px] flex flex-col shadow-elevated overflow-hidden relative text-white">
        
        {/* Floating Heart & Emote Reactions */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
          {reactions.map((r) => (
            <div
              key={r.id}
              style={{ left: `${r.left}%` }}
              className="absolute bottom-20 text-4xl animate-bounce duration-1000 transition-all opacity-90"
            >
              {r.emoji}
            </div>
          ))}
        </div>

        {/* Top Call Bar */}
        <div className="px-6 py-4 bg-[#111827] border-b border-white/10 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
            <div>
              <h2 className="text-sm sm:text-base font-bold flex items-center gap-2">
                {activeVideoCallSession?.title || "CareConnect Family & Volunteer Live Room"}
                <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-mono font-bold">
                  {formatDuration(callDuration)}
                </span>
              </h2>
              <p className="text-[11px] text-white/60">
                Encrypted Peer-to-Peer Telecare Stream • 3 Participants
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowVitalsOverlay(!showVitalsOverlay)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                showVitalsOverlay
                  ? 'bg-primary border-primary text-white'
                  : 'bg-white/10 border-white/20 text-white/70 hover:text-white'
              }`}
            >
              <Activity size={14} className="text-rose-400" />
              <span className="hidden sm:inline">Telemetry</span>
            </button>

            <button
              onClick={() => setShowChat(!showChat)}
              className={`p-2 rounded-xl text-xs transition-colors border ${
                showChat ? 'bg-primary border-primary' : 'bg-white/10 border-white/20 hover:bg-white/20'
              }`}
              title="Toggle Live Chat"
            >
              <MessageSquare size={16} />
            </button>

            <button
              onClick={endVideoCall}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Video Stage Area */}
        <div className="flex-1 min-h-0 flex relative bg-[#111827]">
          
          {/* Main Video Grid */}
          <div className="flex-1 p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 overflow-y-auto">
            
            {/* Participant 1: Family Member */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-md flex items-center justify-center group">
              <img
                src={participants[0]?.avatar}
                alt={participants[0]?.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              
              {/* Badge & Speaking Pulse */}
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                <span>{participants[0]?.name}</span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90">
                <span className="text-[11px] bg-primary px-2 py-0.5 rounded-md font-bold text-white">Family Guardian</span>
                <div className="flex items-center gap-1.5 bg-black/50 px-2 py-1 rounded-full text-[11px]">
                  <Mic size={13} className="text-primary" />
                  <span>Audio Active</span>
                </div>
              </div>
            </div>

            {/* Participant 2: Volunteer Companion */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-md flex items-center justify-center group">
              <img
                src={participants[1]?.avatar}
                alt={participants[1]?.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span>{participants[1]?.name}</span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90">
                <span className="text-[11px] bg-amber-600 px-2 py-0.5 rounded-md font-bold text-white">Volunteer Aide</span>
                <div className="flex items-center gap-1.5 bg-black/50 px-2 py-1 rounded-full text-[11px]">
                  <Mic size={13} className="text-primary" />
                  <span>Connected</span>
                </div>
              </div>
            </div>

            {/* Participant 3: Senior Recipient (Self Stream with Live Cam fallback) */}
            <div className="sm:col-span-2 relative h-48 sm:h-56 rounded-2xl overflow-hidden bg-[#1E2229] border-2 border-primary shadow-lg flex items-center justify-center">
              
              {/* If camera is active & video enabled, show video feed */}
              {!isVideoOff && cameraActive ? (
                <video
                  ref={userVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover scale-x-[-1]"
                />
              ) : (
                <div className="w-full h-full relative">
                  <img
                    src={currentElderly.avatar}
                    alt={currentElderly.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-xs flex flex-col items-center justify-center">
                    <img
                      src={currentElderly.avatar}
                      alt={currentElderly.name}
                      className="w-16 h-16 rounded-full border-2 border-white shadow-md mb-2"
                    />
                    <p className="text-sm font-bold">{currentElderly.name} (You)</p>
                    <p className="text-[11px] text-white/70">
                      {isVideoOff ? 'Camera Turned Off' : 'Elderly Care Recipient'}
                    </p>
                  </div>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span>{currentElderly.name} (You)</span>
              </div>

              {/* Senior Live Vitals Overlay */}
              {showVitalsOverlay && (
                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md p-2 rounded-xl border border-primary/40 flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1 text-rose-400">
                    <Heart size={14} className="fill-rose-500 animate-pulse" />
                    <span className="font-bold">{currentElderly.vitals.heartRate}</span>
                  </div>
                  <div className="w-px h-4 bg-white/20"></div>
                  <div className="text-white/80">
                    BP: <strong className="text-white font-bold">{currentElderly.vitals.bloodPressure}</strong>
                  </div>
                </div>
              )}

              {/* Subtitles / Live Captions */}
              {isCaptionsEnabled && (
                <div className="absolute bottom-3 left-4 right-4 text-center pointer-events-none">
                  <span className="inline-block bg-black/80 backdrop-blur-md text-amber-300 text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full border border-amber-500/30">
                    Sarah: "We're so glad to see you smiling today, Mom!"
                  </span>
                </div>
              )}
            </div>

          </div>

          {/* Side Live Chat & Activities Drawer */}
          {showChat && (
            <div className="w-72 sm:w-80 bg-[#1E2229] border-l border-white/10 flex flex-col animate-in slide-in-from-right duration-200">
              <div className="p-3.5 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <MessageSquare size={14} /> In-Call Family Chat
                </h3>
                <button onClick={() => setShowChat(false)} className="text-white/60 hover:text-white">
                  <X size={16} />
                </button>
              </div>

              <div className="flex-1 p-3 space-y-3 overflow-y-auto">
                {callMessages.map((msg, i) => (
                  <div key={i} className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-0.5">
                    <div className="flex items-center justify-between text-[10px] text-white/50 font-semibold">
                      <span>{msg.sender}</span>
                      <span>{msg.time}</span>
                    </div>
                    <p className="text-white/90">{msg.text}</p>
                  </div>
                ))}
              </div>

              {/* Quick Emojis Bar */}
              <div className="p-2 bg-black/40 border-t border-white/10 flex justify-around">
                {['❤️', '👋', '☕', '🌸', '👏', '😊'].map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => triggerReaction(emoji)}
                    className="p-1.5 hover:scale-125 transition-transform text-lg"
                    title={`Send ${emoji}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="p-3 border-t border-white/10 flex gap-2">
                <input
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder="Type message..."
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-primary hover:bg-primary-hover text-white transition-colors"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          )}

        </div>

        {/* Accessible Call Control Bar (Tailored for Seniors) */}
        <div className="p-4 bg-[#111827] border-t border-white/10 flex items-center justify-between gap-2 z-20">
          
          {/* Reaction Triggers */}
          <div className="hidden sm:flex items-center gap-1.5">
            {['❤️ Love', '👋 Wave', '☕ Tea Time'].map((r) => {
              const [emoji, label] = r.split(' ');
              return (
                <button
                  key={r}
                  onClick={() => triggerReaction(emoji)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white/90 transition-colors flex items-center gap-1"
                >
                  <span>{emoji}</span>
                  <span className="hidden md:inline">{label}</span>
                </button>
              );
            })}
          </div>

          {/* Central Call Actions */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mx-auto sm:mx-0">
            {/* Mic Toggle */}
            <button
              onClick={() => setIsMicMuted(!isMicMuted)}
              className={`p-3.5 sm:p-4 rounded-2xl transition-all shadow-md flex items-center gap-1.5 font-bold text-xs ${
                isMicMuted
                  ? 'bg-rose-600 hover:bg-rose-700 text-white'
                  : 'bg-white/15 hover:bg-white/25 text-white'
              }`}
              title={isMicMuted ? 'Unmute Microphone' : 'Mute Microphone'}
            >
              {isMicMuted ? <MicOff size={20} /> : <Mic size={20} />}
              <span className="hidden sm:inline">{isMicMuted ? 'Muted' : 'Mic On'}</span>
            </button>

            {/* Video Camera Toggle */}
            <button
              onClick={() => setIsVideoOff(!isVideoOff)}
              className={`p-3.5 sm:p-4 rounded-2xl transition-all shadow-md flex items-center gap-1.5 font-bold text-xs ${
                isVideoOff
                  ? 'bg-rose-600 hover:bg-rose-700 text-white'
                  : 'bg-white/15 hover:bg-white/25 text-white'
              }`}
              title={isVideoOff ? 'Turn Camera On' : 'Turn Camera Off'}
            >
              {isVideoOff ? <VideoOff size={20} /> : <Video size={20} />}
              <span className="hidden sm:inline">{isVideoOff ? 'Cam Off' : 'Camera'}</span>
            </button>

            {/* Captions Toggle */}
            <button
              onClick={() => setIsCaptionsEnabled(!isCaptionsEnabled)}
              className={`p-3.5 sm:p-4 rounded-2xl transition-all shadow-md flex items-center gap-1.5 font-bold text-xs ${
                isCaptionsEnabled
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-white/15 hover:bg-white/25 text-white'
              }`}
              title="Toggle Live Closed Captions"
            >
              <Captions size={20} />
              <span className="hidden md:inline">Captions</span>
            </button>

            {/* End Call Button */}
            <button
              onClick={endVideoCall}
              className="px-5 py-3.5 sm:py-4 rounded-2xl bg-error hover:bg-error/90 text-white font-bold text-xs sm:text-sm shadow-ambient transition-transform active:scale-95 flex items-center gap-2"
              title="Leave Video Call"
            >
              <PhoneOff size={20} />
              <span>Leave Call</span>
            </button>
          </div>

          {/* Volume Boost / Audio Toggle */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => setIsSpeakerMuted(!isSpeakerMuted)}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 transition-colors"
              title="Toggle Volume"
            >
              {isSpeakerMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default VideoCallModal;
