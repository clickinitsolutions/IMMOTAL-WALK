import React, { useState, useEffect, useRef } from "react";
import { 
  Timer, 
  Play, 
  Pause, 
  RotateCcw, 
  Radio, 
  Volume2, 
  VolumeX, 
  Compass, 
  Heart, 
  Bell, 
  Music,
  Wind
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function OfferingsSection() {
  const [activeSubTab, setActiveSubTab] = useState<"timer" | "mala" | "sounds">("timer");

  // ==========================================
  // 1. ZAZEN FOCUS TIMER STATE
  // ==========================================
  const [timerDuration, setTimerDuration] = useState(300); // 5 mins in seconds
  const [timeLeft, setTimeLeft] = useState(300);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerFinished, setTimerFinished] = useState(false);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (timerRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setTimerRunning(false);
            setTimerFinished(true);
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [timerRunning, timeLeft]);

  const selectTimerDuration = (seconds: number) => {
    setTimerRunning(false);
    setTimerFinished(false);
    setTimerDuration(seconds);
    setTimeLeft(seconds);
  };

  const toggleTimer = () => {
    if (timerFinished) {
      setTimeLeft(timerDuration);
      setTimerFinished(false);
    }
    setTimerRunning(!timerRunning);
  };

  const resetTimer = () => {
    setTimerRunning(false);
    setTimerFinished(false);
    setTimeLeft(timerDuration);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // ==========================================
  // 2. DIGITAL JAPA MALA COUNTER STATE
  // ==========================================
  const [selectedMantra, setSelectedMantra] = useState("Om Mani Padme Hum");
  const [malaCount, setMalaCount] = useState(0);
  const [malaRounds, setMalaRounds] = useState(0);
  const [glowingBead, setGlowingBead] = useState(false);

  const mantras = [
    { label: "Om Mani Padme Hum", sanskrit: "ॐ मणिपद्मे हूँ" },
    { label: "Om Namah Shivaya", sanskrit: "ॐ नमः शिवाय" },
    { label: "So'Ham", sanskrit: "सोऽहम् (I am that)" },
    { label: "Gayatri Mantra", sanskrit: "ॐ भूर् भुवः स्वः" }
  ];

  const handleMalaClick = () => {
    setGlowingBead(true);
    setTimeout(() => setGlowingBead(false), 200);

    setMalaCount((prev) => {
      if (prev >= 107) {
        setMalaRounds((r) => r + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const resetMala = () => {
    setMalaCount(0);
    setMalaRounds(0);
  };

  // ==========================================
  // 3. SOUNDSCAPES MIXER STATE
  // ==========================================
  const [masterPlaying, setMasterPlaying] = useState(false);
  const [soundVolumes, setSoundVolumes] = useState<{ [key: string]: number }>({
    "Om Chants": 40,
    "Temple Bell": 30,
    "Forest Wind": 60,
    "Himalayan Stream": 50
  });

  const sounds = [
    { name: "Om Chants", desc: "432Hz deep meditative resonance", icon: Bell },
    { name: "Temple Bell", desc: "Slow, resonant singing bowl bells", icon: Music },
    { name: "Forest Wind", desc: "Gentle leaves and whispers of rustling pines", icon: Wind },
    { name: "Himalayan Stream", desc: "Fresh natural spring water flows", icon: Radio }
  ];

  const updateVolume = (soundName: string, val: number) => {
    setSoundVolumes((prev) => ({
      ...prev,
      [soundName]: val
    }));
  };

  return (
    <div id="offerings-page" className="space-y-12">
      {/* Editorial Header */}
      <div>
        <span className="text-xs font-mono tracking-widest text-gold-600 uppercase block mb-2">
          Sanctuary Instruments
        </span>
        <h2 className="text-3xl font-serif font-semibold text-sage-900 tracking-tight leading-tight">
          Spiritual Tools & Offerings
        </h2>
        <p className="mt-2 text-sage-600 text-sm max-w-2xl leading-relaxed">
          Calibrated digital instruments designed to assist you in maintaining deep presence, tracking your daily repetitions (Japa), and custom blending calming sounds during active meditation.
        </p>
      </div>

      {/* Subtab Selector */}
      <div className="flex border-b border-sage-100">
        <button
          id="offering-tab-timer"
          onClick={() => setActiveSubTab("timer")}
          className={`px-6 py-3 text-xs font-semibold uppercase tracking-widest transition-all ${
            activeSubTab === "timer"
              ? "border-b-2 border-sage-900 text-sage-900"
              : "text-sage-500 hover:text-sage-700"
          }`}
        >
          Zen Focus Timer
        </button>
        <button
          id="offering-tab-mala"
          onClick={() => setActiveSubTab("mala")}
          className={`px-6 py-3 text-xs font-semibold uppercase tracking-widest transition-all ${
            activeSubTab === "mala"
              ? "border-b-2 border-sage-900 text-sage-900"
              : "text-sage-500 hover:text-sage-700"
          }`}
        >
          Japa Mala Counter
        </button>
        <button
          id="offering-tab-sounds"
          onClick={() => setActiveSubTab("sounds")}
          className={`px-6 py-3 text-xs font-semibold uppercase tracking-widest transition-all ${
            activeSubTab === "sounds"
              ? "border-b-2 border-sage-900 text-sage-900"
              : "text-sage-500 hover:text-sage-700"
          }`}
        >
          Soundscapes Mixer
        </button>
      </div>

      {/* Dynamic Tab Body */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {activeSubTab === "timer" && (
            <motion.div
              key="timer-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              {/* Left Side Controls */}
              <div className="md:col-span-5 space-y-6">
                <div>
                  <h4 className="text-xl font-serif font-bold text-sage-900">Zazen Focus Session</h4>
                  <p className="text-xs text-sage-600 mt-1 leading-relaxed">
                    Set a silent interval for your daily Zazen or quiet contemplation. Select a duration below, find a relaxed posture, and click begin.
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-sage-400 uppercase tracking-widest block font-bold">Select Duration</span>
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { label: "1 Minute", secs: 60 },
                      { label: "5 Minutes", secs: 300 },
                      { label: "10 Minutes", secs: 600 },
                      { label: "20 Minutes", secs: 1200 }
                    ].map((btn) => (
                      <button
                        key={btn.secs}
                        id={`select-timer-btn-${btn.secs}`}
                        onClick={() => selectTimerDuration(btn.secs)}
                        className={`py-2 px-4 rounded-xl text-xs font-mono border transition-all ${
                          timerDuration === btn.secs
                            ? "bg-sage-900 text-gold-100 border-sage-900"
                            : "bg-white text-sage-700 border-sage-100 hover:bg-sage-50"
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {timerFinished && (
                  <div className="bg-gold-50 border border-gold-200/50 p-4 rounded-2xl flex gap-3 items-center text-left">
                    <Bell className="w-5 h-5 text-gold-600 shrink-0" />
                    <div>
                      <h5 className="font-serif font-bold text-sage-900 text-xs">Singing Bowl Chime</h5>
                      <p className="text-[10px] text-sage-600 mt-0.5">
                        Your focused contemplation has successfully completed. May this silence continue to ripple through your walks.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Side Visual Timer Ring */}
              <div className="md:col-span-7 flex flex-col items-center justify-center p-8 bg-white border border-sage-100 rounded-3xl relative overflow-hidden h-[340px]">
                {/* Visual Ring */}
                <div className="relative w-56 h-56 flex items-center justify-center">
                  {/* Outer breathing background circle */}
                  <div className={`absolute inset-0 rounded-full bg-sage-50 border border-sage-100/50 transition-transform duration-[4000ms] ease-in-out ${
                    timerRunning ? "scale-105" : "scale-100"
                  }`}></div>

                  <svg className="w-full h-full transform -rotate-90 absolute">
                    <circle
                      cx="112"
                      cy="112"
                      r="96"
                      stroke="rgba(197, 160, 89, 0.1)"
                      strokeWidth="4"
                      fill="transparent"
                    />
                    <circle
                      cx="112"
                      cy="112"
                      r="96"
                      stroke="#c5a059"
                      strokeWidth="4"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 96}
                      strokeDashoffset={2 * Math.PI * 96 * (1 - timeLeft / timerDuration)}
                      className="transition-all duration-1000"
                    />
                  </svg>

                  {/* Timer text in center */}
                  <div className="text-center z-10 space-y-1">
                    <span className="text-3xl font-mono font-bold text-sage-900 tracking-tighter">
                      {formatTime(timeLeft)}
                    </span>
                    <span className="text-[9px] uppercase font-mono tracking-widest text-sage-400 block">
                      {timerRunning ? "Breathe Deeply" : "Standing Calm"}
                    </span>
                  </div>
                </div>

                {/* Control Actions */}
                <div className="flex items-center gap-4 mt-6 z-10">
                  <button
                    id="reset-focus-timer-btn"
                    onClick={resetTimer}
                    className="p-3 rounded-full bg-sage-100 hover:bg-sage-200 text-sage-600 transition-colors cursor-pointer"
                    title="Reset Session"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    id="toggle-focus-timer-btn"
                    onClick={toggleTimer}
                    className="px-6 py-3 rounded-full bg-sage-900 hover:bg-sage-950 text-gold-100 font-semibold text-xs tracking-widest uppercase flex items-center gap-2 transition-transform cursor-pointer shadow-md"
                  >
                    {timerRunning ? (
                      <>
                        <Pause className="w-3.5 h-3.5" />
                        <span>Pause Session</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" />
                        <span>{timerFinished ? "Re-Begin" : "Begin Session"}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeSubTab === "mala" && (
            <motion.div
              key="mala-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              {/* Left Side Mantra Selection */}
              <div className="md:col-span-5 space-y-6">
                <div>
                  <h4 className="text-xl font-serif font-bold text-sage-900">Digital Japa Mala</h4>
                  <p className="text-xs text-sage-600 mt-1 leading-relaxed">
                    Mala beads are used in Vedic and Buddhist traditions to count mantra repetitions. Choose your sacred mantra anchor, then tap the central bead to count up to 108.
                  </p>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-sage-400 uppercase tracking-widest block font-bold">Select Contemplation Mantra</span>
                  <div className="space-y-2">
                    {mantras.map((m) => (
                      <button
                        key={m.label}
                        id={`select-mantra-btn-${m.label.replace(/\s+/g, "-")}`}
                        onClick={() => setSelectedMantra(m.label)}
                        className={`w-full text-left p-3 rounded-xl border flex items-center justify-between transition-all ${
                          selectedMantra === m.label
                            ? "bg-sage-900 text-gold-100 border-sage-900"
                            : "bg-white text-sage-700 border-sage-100 hover:bg-sage-50"
                        }`}
                      >
                        <div>
                          <span className="text-xs font-semibold block">{m.label}</span>
                          <span className={`text-[10px] block mt-0.5 font-mono ${
                            selectedMantra === m.label ? "text-gold-300" : "text-sage-400"
                          }`}>{m.sanskrit}</span>
                        </div>
                        {selectedMantra === m.label && (
                          <Heart className="w-4 h-4 text-gold-400 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Central Beaded Interface */}
              <div className="md:col-span-7 flex flex-col items-center justify-center p-8 bg-white border border-sage-100 rounded-3xl h-[340px] relative overflow-hidden">
                <div className="text-center mb-6">
                  <span className="text-[9px] uppercase font-mono tracking-widest text-sage-400 block">Current Mantra Anchor</span>
                  <h5 className="font-serif font-bold text-sm text-sage-900 italic mt-0.5">"{selectedMantra}"</h5>
                </div>

                {/* Big Interactive Bead */}
                <button
                  id="mala-click-bead-btn"
                  onClick={handleMalaClick}
                  className={`w-32 h-32 rounded-full flex flex-col items-center justify-center relative cursor-pointer outline-none focus:outline-none transition-all duration-100 ${
                    glowingBead 
                      ? "bg-gold-600 text-white shadow-2xl scale-95" 
                      : "bg-sage-50 border-4 border-gold-200/50 text-sage-900 hover:border-gold-300"
                  }`}
                >
                  <span className="text-3xl font-mono font-bold leading-none">{malaCount}</span>
                  <span className="text-[9px] uppercase font-mono tracking-widest block mt-1.5 opacity-60">Tap Bead</span>
                </button>

                {/* Repetition Statistics */}
                <div className="flex items-center gap-8 mt-6">
                  <div className="text-center">
                    <span className="text-[10px] font-mono uppercase text-sage-400 block">Beads Completed</span>
                    <span className="text-md font-bold text-sage-800">{malaCount} / 108</span>
                  </div>
                  <div className="w-px h-6 bg-sage-200"></div>
                  <div className="text-center">
                    <span className="text-[10px] font-mono uppercase text-sage-400 block">Total Rounds</span>
                    <span className="text-md font-bold text-sage-800">{malaRounds} Rounds</span>
                  </div>
                </div>

                <button
                  id="reset-mala-btn"
                  onClick={resetMala}
                  className="absolute bottom-4 right-4 text-[10px] font-mono text-sage-400 hover:text-sage-600 underline"
                >
                  Reset Counts
                </button>
              </div>
            </motion.div>
          )}

          {activeSubTab === "sounds" && (
            <motion.div
              key="sounds-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              {/* Left Side Info */}
              <div className="md:col-span-5 space-y-6">
                <div>
                  <h4 className="text-xl font-serif font-bold text-sage-900">Solfeggio Soundscapes</h4>
                  <p className="text-xs text-sage-600 mt-1 leading-relaxed">
                    Formulate your personal acoustic sanctuary. Adjust the individual volume levels of Tibetan singing bowls, cascading mountain rain, and OM chants.
                  </p>
                </div>

                <div className="bg-sage-900 text-gold-100 p-5 rounded-2xl space-y-3 shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold">Atmospheric Transmission</span>
                    <button
                      id="master-mute-soundscape-btn"
                      onClick={() => setMasterPlaying(!masterPlaying)}
                      className={`p-2.5 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                        masterPlaying ? "bg-gold-600 text-white" : "bg-sage-800 text-sage-400"
                      }`}
                    >
                      {masterPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-[10px] text-sage-300 leading-relaxed">
                    {masterPlaying ? "Blending atmospheric spring sounds in a seamless loop. Feel the vibration." : "Mixer stands silent. Toggle the speaker above to authorize playback."}
                  </p>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="md:col-span-7 bg-white border border-sage-100 rounded-3xl p-6 space-y-5">
                {sounds.map((sound) => {
                  const Icon = sound.icon;
                  return (
                    <div key={sound.name} className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-sage-50 text-gold-600 flex items-center justify-center shadow-3xs">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-bold text-sage-800 block leading-tight">{sound.name}</span>
                            <span className="text-[9px] text-sage-500 block leading-none">{sound.desc}</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-sage-500 font-semibold">{soundVolumes[sound.name]}%</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          id={`volume-slider-${sound.name.replace(/\s+/g, "-")}`}
                          type="range"
                          min="0"
                          max="100"
                          disabled={!masterPlaying}
                          value={soundVolumes[sound.name]}
                          onChange={(e) => updateVolume(sound.name, parseInt(e.target.value))}
                          className="w-full h-1 bg-sage-50 rounded-full appearance-none cursor-pointer accent-gold-600 disabled:opacity-40"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
