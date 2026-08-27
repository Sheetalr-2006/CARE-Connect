import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Globe,
  Sparkles,
  Heart,
  Activity,
  Pill,
  PhoneCall,
  Calendar,
  AlertTriangle,
  X,
  ChevronDown,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { SUPPORTED_LANGUAGES, TRANSLATIONS } from '../../utils/translations';

export const SeniorVoiceAssistant = () => {
  const {
    currentLanguage,
    setLanguage,
    isVoiceAssistantOpen,
    setIsVoiceAssistantOpen,
    currentElderly,
    medications,
    startVideoCall,
    triggerEmergencySOS,
    setIsScheduleVisitModalOpen
  } = useApp();

  const navigate = useNavigate();

  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [assistantReply, setAssistantReply] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSpeechSupported, setIsSpeechSupported] = useState(true);

  const recognitionRef = useRef(null);
  const synthRef = useRef(window.speechSynthesis || null);

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS['en'];
  const activeLangObj = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = activeLangObj.speechCode || 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setTranscript('');
      };

      recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        processVoiceCommand(text);
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setIsSpeechSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [currentLanguage, activeLangObj]);

  // Senior-Friendly Text-to-Speech (TTS)
  const speak = (text) => {
    if (!synthRef.current) return;
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = activeLangObj.speechCode || 'en-US';
    utterance.rate = 0.88; // Slower, clearer speech rate for elderly users
    utterance.pitch = 1.05;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
    } else {
      stopSpeaking();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.lang = activeLangObj.speechCode || 'en-US';
          recognitionRef.current.start();
        } catch (e) {
          console.warn(e);
          setIsListening(true);
        }
      } else {
        // Fallback simulator
        setIsListening(true);
        setTimeout(() => {
          setIsListening(false);
          const sample = "Check my vitals";
          setTranscript(sample);
          processVoiceCommand(sample);
        }, 2000);
      }
    }
  };

  // Process and Execute Voice Command
  const processVoiceCommand = (commandText) => {
    const text = commandText.toLowerCase();

    // 1. Call Family
    if (text.includes('family') || text.includes('call') || text.includes('sarah') || text.includes('llam') || text.includes('परिवार') || text.includes('appeler') || text.includes('anrufen') || text.includes('呼叫') || text.includes('chiama') || text.includes('ligar') || text.includes('電話') || text.includes('اتصل') || text.includes('குடும்ப')) {
      const reply = t.voiceFeedback.callFamily;
      setAssistantReply(reply);
      speak(reply);
      setTimeout(() => {
        setIsVoiceAssistantOpen(false);
        startVideoCall({
          title: "Family Video Catch-up with Sarah",
          type: "family",
          participants: [
            {
              name: "Sarah Vance",
              role: "Daughter & Primary Caregiver",
              avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=128&h=128",
              status: "Speaking..."
            }
          ]
        });
      }, 1800);
      return;
    }

    // 2. Check Vitals / BP
    if (text.includes('vital') || text.includes('pressure') || text.includes('bp') || text.includes('heart') || text.includes('presion') || text.includes('स्वास्थ्य') || text.includes('constante') || text.includes('blutdruck') || text.includes('血压') || text.includes('pressione') || text.includes('pressão') || text.includes('血圧') || text.includes('ضغط') || text.includes('ரத்த')) {
      const reply = t.voiceFeedback.checkVitals;
      setAssistantReply(reply);
      speak(reply);
      return;
    }

    // 3. Next Medication
    if (text.includes('med') || text.includes('pill') || text.includes('drug') || text.includes('prescription') || text.includes('medicina') || text.includes('दवाई') || text.includes('médicament') || text.includes('medizin') || text.includes('药') || text.includes('farmaco') || text.includes('remédio') || text.includes('薬') || text.includes('دواء') || text.includes('மருந்து')) {
      const nextMed = medications.find(m => m.status === 'Pending') || medications[0];
      const reply = `${t.voiceFeedback.nextMedicine} (${nextMed.name} ${nextMed.dosage}).`;
      setAssistantReply(reply);
      speak(reply);
      return;
    }

    // 4. Book a Companion
    if (text.includes('companion') || text.includes('visit') || text.includes('book') || text.includes('volunteer') || text.includes('acompañante') || text.includes('साथी') || text.includes('compagnon') || text.includes('begleiter') || text.includes('陪伴') || text.includes('volontario') || text.includes('companheiro') || text.includes('付き添い') || text.includes('رفيق') || text.includes('துணைவர்')) {
      const reply = t.voiceFeedback.bookCompanion;
      setAssistantReply(reply);
      speak(reply);
      setTimeout(() => {
        setIsVoiceAssistantOpen(false);
        setIsScheduleVisitModalOpen(true);
      }, 1500);
      return;
    }

    // 5. Emergency SOS
    if (text.includes('emergency') || text.includes('sos') || text.includes('help') || text.includes('ambulance') || text.includes('emergencia') || text.includes('आपात') || text.includes('urgence') || text.includes('notfall') || text.includes('求救') || text.includes('emergenza') || text.includes('socorro') || text.includes('救急') || text.includes('طوارئ') || text.includes('அவசரம்')) {
      const reply = t.voiceFeedback.emergency;
      setAssistantReply(reply);
      speak(reply);
      setTimeout(() => {
        setIsVoiceAssistantOpen(false);
        triggerEmergencySOS();
      }, 1500);
      return;
    }

    // 6. Read Screen / Dashboard Overview
    if (text.includes('read') || text.includes('dashboard') || text.includes('home') || text.includes('overview') || text.includes('leer') || text.includes('पढ़ो') || text.includes('lire') || text.includes('lesen') || text.includes('阅读') || text.includes('leggi') || text.includes('ler') || text.includes('読む') || text.includes('اقرأ') || text.includes('படி')) {
      const reply = t.voiceFeedback.readingDashboard;
      setAssistantReply(reply);
      speak(reply);
      navigate('/dashboard');
      return;
    }

    // Default Fallback
    const fallback = t.voiceFeedback.unknownCommand;
    setAssistantReply(fallback);
    speak(fallback);
  };

  const handleQuickTrigger = (commandText) => {
    setTranscript(commandText);
    processVoiceCommand(commandText);
  };

  return (
    <>
      {/* FLOATING PROMINENT ACCESSIBLE VOICE BUTTON (Style 7 Spec: Ripple & Tooltip Bubble) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 group">
        
        {/* Tooltip Bubble Popup Near Mic (Style 7 Spec) */}
        <div className="flex items-center gap-2 bg-slate-900 text-white text-xs font-bold px-3.5 py-2 rounded-2xl shadow-xl border border-white/15 animate-tooltip-fade-in">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
          <span>{t.voiceAssistant}</span>
          <span className="text-[10px] bg-primary/20 text-orange-300 font-normal px-2 py-0.5 rounded-full border border-primary/30">
            {activeLangObj.flag} 12 Languages
          </span>
        </div>

        {/* Mic Button with Concentric Animated Ripples */}
        <div className="relative flex items-center justify-center">
          {/* Concentric Pulse Ripple Waves (Style 7 Spec) */}
          <span className="absolute w-full h-full rounded-full bg-primary/30 animate-mic-ripple pointer-events-none"></span>
          <span className="absolute w-full h-full rounded-full bg-primary/20 animate-mic-ripple pointer-events-none" style={{ animationDelay: '0.6s' }}></span>

          <button
            type="button"
            onClick={() => {
              setIsVoiceAssistantOpen(true);
              stopSpeaking();
            }}
            className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-gradient-to-tr from-primary to-orange-500 hover:from-primary-hover hover:to-primary text-white shadow-ambient flex items-center justify-center transition-all hover:scale-105 active:scale-95 relative border-3 border-white ring-4 ring-primary/25 focus:outline-none"
            aria-label="Open Senior Voice Assistant"
            title="Open Senior Voice Assistant"
          >
            <Mic size={28} className="animate-pulse" />
            
            {/* Status dot */}
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white animate-ping" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white" />
          </button>
        </div>
      </div>

      {/* VOICE ASSISTANT MODAL (Senior-Optimized Big Text & High Contrast) */}
      {isVoiceAssistantOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-elevated border-2 border-[#E2E8F0] overflow-hidden flex flex-col relative text-[#1A1D20]">
            
            {/* Top Bar: Title, Language Switcher & Close */}
            <div className="p-5 bg-[#F8F9FA] border-b border-[#E2E8F0] flex items-center justify-between gap-3">
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-ambient">
                  <Mic size={22} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-[#1A1D20] font-serif">
                    {t.voiceAssistant}
                  </h3>
                  <p className="text-[11px] text-[#64748B] font-medium">
                    Speak naturally or tap any action below
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Language Picker Dropdown */}
                <div className="relative">
                  <select
                    value={currentLanguage}
                    onChange={(e) => {
                      setLanguage(e.target.value);
                      const newT = TRANSLATIONS[e.target.value] || TRANSLATIONS['en'];
                      setAssistantReply(newT.languageChanged);
                      speak(newT.languageChanged);
                    }}
                    className="appearance-none bg-white border border-[#CBD5E1] text-[#1A1D20] text-xs font-bold py-2 pl-3 pr-8 rounded-xl shadow-xs focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer"
                  >
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.native} ({lang.name})
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-2.5 top-3 text-[#64748B] pointer-events-none" />
                </div>

                <button
                  onClick={() => {
                    stopSpeaking();
                    setIsVoiceAssistantOpen(false);
                  }}
                  className="p-2 rounded-xl text-[#64748B] hover:text-[#1A1D20] hover:bg-[#E2E8F0] transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

            </div>

            {/* Middle Section: Microphone & Listening Animation */}
            <div className="p-6 sm:p-8 flex flex-col items-center justify-center text-center space-y-5 bg-white">
              
              {/* Animated Glowing Mic Circle */}
              <div className="relative flex items-center justify-center">
                {isListening && (
                  <>
                    <div className="absolute w-36 h-36 rounded-full bg-primary/20 animate-ping" />
                    <div className="absolute w-28 h-28 rounded-full bg-primary/30 animate-pulse" />
                  </>
                )}
                
                <button
                  onClick={toggleListening}
                  className={`w-24 sm:w-28 h-24 sm:h-28 rounded-full flex flex-col items-center justify-center gap-1 shadow-ambient transition-transform active:scale-95 z-10 ${
                    isListening
                      ? 'bg-rose-600 hover:bg-rose-700 text-white animate-pulse'
                      : 'bg-primary hover:bg-primary-hover text-white'
                  }`}
                >
                  {isListening ? <MicOff size={36} /> : <Mic size={36} />}
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {isListening ? 'Stop' : 'Tap to Speak'}
                  </span>
                </button>
              </div>

              <div>
                <p className="text-sm sm:text-base font-bold text-[#1A1D20]">
                  {isListening ? t.listening : t.tapToSpeak}
                </p>
                <p className="text-xs text-[#64748B] mt-1 max-w-md mx-auto">
                  {t.saySomething}
                </p>
              </div>

              {/* Transcript & Response Display Box */}
              {(transcript || assistantReply) && (
                <div className="w-full p-4 rounded-2xl bg-[#F8F9FA] border border-[#E2E8F0] text-left space-y-2 animate-in fade-in duration-200">
                  {transcript && (
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block">You said:</span>
                      <p className="text-sm font-semibold text-[#1A1D20]">"{transcript}"</p>
                    </div>
                  )}

                  {assistantReply && (
                    <div className="pt-2 border-t border-[#E2E8F0] flex items-start justify-between gap-3">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary block">CareConnect Assistant:</span>
                        <p className="text-xs sm:text-sm font-medium text-[#1A1D20] leading-relaxed">{assistantReply}</p>
                      </div>

                      {/* Replay or Mute TTS */}
                      <button
                        onClick={() => {
                          if (isSpeaking) {
                            stopSpeaking();
                          } else {
                            speak(assistantReply);
                          }
                        }}
                        className="p-2 rounded-xl bg-white border border-[#CBD5E1] text-[#1A1D20] hover:text-primary transition-colors flex-shrink-0"
                        title={isSpeaking ? "Stop Speaking" : "Replay Speech"}
                      >
                        {isSpeaking ? <VolumeX size={16} className="text-rose-600 animate-pulse" /> : <Volume2 size={16} />}
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Quick Senior 1-Tap Command Action Buttons */}
            <div className="p-4 sm:p-5 bg-[#F8F9FA] border-t border-[#E2E8F0] space-y-2">
              <div className="flex items-center justify-between text-[11px] text-[#64748B] font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Sparkles size={13} className="text-primary" />
                  1-Tap Senior Voice Actions:
                </span>
                <span className="text-primary">{activeLangObj.name} Voice Ready</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                
                <button
                  onClick={() => handleQuickTrigger('Call my family')}
                  style={{ animationDelay: '50ms' }}
                  className="p-2.5 rounded-xl bg-white hover:border-primary border border-[#E2E8F0] text-left text-xs font-bold flex items-center gap-2 transition-all shadow-xs animate-pop-slide-left"
                >
                  <PhoneCall size={16} className="text-primary flex-shrink-0" />
                  <span className="truncate">{t.callFamily}</span>
                </button>

                <button
                  onClick={() => handleQuickTrigger('Check my vitals')}
                  style={{ animationDelay: '100ms' }}
                  className="p-2.5 rounded-xl bg-white hover:border-primary border border-[#E2E8F0] text-left text-xs font-bold flex items-center gap-2 transition-all shadow-xs animate-pop-bounce-up"
                >
                  <Activity size={16} className="text-rose-500 flex-shrink-0" />
                  <span className="truncate">{t.checkVitals}</span>
                </button>

                <button
                  onClick={() => handleQuickTrigger('What is my next medicine?')}
                  style={{ animationDelay: '150ms' }}
                  className="p-2.5 rounded-xl bg-white hover:border-primary border border-[#E2E8F0] text-left text-xs font-bold flex items-center gap-2 transition-all shadow-xs animate-pop-slide-right"
                >
                  <Pill size={16} className="text-amber-500 flex-shrink-0" />
                  <span className="truncate">{t.nextMedicine}</span>
                </button>

                <button
                  onClick={() => handleQuickTrigger('Book a companion visit')}
                  style={{ animationDelay: '200ms' }}
                  className="p-2.5 rounded-xl bg-white hover:border-primary border border-[#E2E8F0] text-left text-xs font-bold flex items-center gap-2 transition-all shadow-xs animate-pop-flip-in"
                >
                  <Calendar size={16} className="text-blue-500 flex-shrink-0" />
                  <span className="truncate">{t.bookCompanion}</span>
                </button>

                <button
                  onClick={() => handleQuickTrigger('Read my dashboard')}
                  style={{ animationDelay: '250ms' }}
                  className="p-2.5 rounded-xl bg-white hover:border-primary border border-[#E2E8F0] text-left text-xs font-bold flex items-center gap-2 transition-all shadow-xs animate-pop-zoom-glow"
                >
                  <Heart size={16} className="text-emerald-500 flex-shrink-0" />
                  <span className="truncate">{t.dashboard}</span>
                </button>

                <button
                  onClick={() => handleQuickTrigger('Emergency SOS help')}
                  style={{ animationDelay: '300ms' }}
                  className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-left text-xs font-bold flex items-center gap-2 transition-all shadow-xs animate-pop-bounce-up"
                >
                  <AlertTriangle size={16} className="text-rose-600 flex-shrink-0" />
                  <span className="truncate">{t.emergencySos}</span>
                </button>

              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default SeniorVoiceAssistant;
