import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Square, Music, Volume2, Info, Moon } from "lucide-react";
import { MeditationPreferences, MeditationSession } from "../types";
import { motion, AnimatePresence } from "motion/react";

const SOUNDSCAPES = [
  { name: "Cosmic Chime", type: "chime" },
  { name: "Ocean Swell", type: "swell" },
  { name: "Sacred Om Drone", type: "om" },
  { name: "Silent Space", type: "none" }
];

export default function MeditationSection() {
  const [preferences, setPreferences] = useState<MeditationPreferences>({
    focus: "Inner Peace & Silence",
    durationMinutes: 5,
    technique: "Anapanasati (Mindful Breath)"
  });

  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<MeditationSession | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [selectedSound, setSelectedSound] = useState("Cosmic Chime");

  // Audio nodes for synthetic drone
  const audioCtxRef = useRef<AudioContext | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);
  const carrierRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Auto progression of meditation instructions
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      stopDrone();
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, timeLeft]);

  // Dynamically change instruction slides depending on progress
  useEffect(() => {
    if (!session) return;
    const totalTime = preferences.durationMinutes * 60;
    const elapsed = totalTime - timeLeft;
    const stepDuration = totalTime / 3;

    if (elapsed < stepDuration) {
      setActiveStepIdx(0); // Prep
    } else if (elapsed < stepDuration * 2) {
      setActiveStepIdx(1); // Core step 1
    } else {
      setActiveStepIdx(2); // Integration
    }
  }, [timeLeft, session]);

  // Audio synthesis triggers
  useEffect(() => {
    if (isPlaying) {
      startDrone();
    } else {
      stopDrone();
    }
    return () => stopDrone();
  }, [isPlaying, selectedSound]);

  const generateSession = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/meditation-custom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preferences)
      });
      const data = await res.json();
      setSession(data);
      setTimeLeft(preferences.durationMinutes * 60);
      setIsPlaying(true);
    } catch (e) {
      console.error("Failed to generate custom meditation", e);
    } finally {
      setLoading(false);
    }
  };

  const startDrone = () => {
    if (selectedSound === "Silent Space") {
      stopDrone();
      return;
    }

    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      stopDrone();

      const carrier = ctx.createOscillator();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      const masterGain = ctx.createGain();

      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 2.5); // Slow, smooth build up

      if (selectedSound === "Cosmic Chime") {
        carrier.type = "sine";
        carrier.frequency.setValueAtTime(110, ctx.currentTime); // A2 Note
        
        lfo.type = "sine";
        lfo.frequency.setValueAtTime(0.15, ctx.currentTime); // Very slow frequency modulation
        lfoGain.gain.setValueAtTime(2.5, ctx.currentTime);
      } else if (selectedSound === "Ocean Swell") {
        carrier.type = "triangle";
        carrier.frequency.setValueAtTime(73.42, ctx.currentTime); // D2 Note
        
        lfo.type = "sine";
        lfo.frequency.setValueAtTime(0.08, ctx.currentTime); // Tidal movement speed
        lfoGain.gain.setValueAtTime(6.0, ctx.currentTime);
      } else if (selectedSound === "Sacred Om Drone") {
        carrier.type = "sawtooth"; // Richer harmonics
        carrier.frequency.setValueAtTime(136.1, ctx.currentTime); // Earth Frequency (Cis / Om)
        
        // Add a bandpass filter to make it organic and soft
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(136.1, ctx.currentTime);
        filter.Q.setValueAtTime(3.0, ctx.currentTime);
        carrier.connect(filter);
        
        lfo.type = "sine";
        lfo.frequency.setValueAtTime(0.2, ctx.currentTime);
        lfoGain.gain.setValueAtTime(1.5, ctx.currentTime);
        
        filter.connect(masterGain);
      }

      if (selectedSound !== "Sacred Om Drone") {
        carrier.connect(masterGain);
      }

      lfo.connect(lfoGain);
      lfoGain.connect(carrier.frequency); // Modulate carrier pitch
      masterGain.connect(ctx.destination);

      lfo.start();
      carrier.start();

      lfoRef.current = lfo;
      carrierRef.current = carrier;
      gainNodeRef.current = masterGain;
    } catch (e) {
      console.warn("Failed to build soundscape synthesizers", e);
    }
  };

  const stopDrone = () => {
    if (lfoRef.current) {
      try { lfoRef.current.stop(); } catch (e) {}
      lfoRef.current.disconnect();
      lfoRef.current = null;
    }
    if (carrierRef.current) {
      try { carrierRef.current.stop(); } catch (e) {}
      carrierRef.current.disconnect();
      carrierRef.current = null;
    }
    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect();
      gainNodeRef.current = null;
    }
  };

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const quitSession = () => {
    setIsPlaying(false);
    setSession(null);
    stopDrone();
  };

  return (
    <div id="meditation-module" className="bg-white rounded-3xl border border-sage-100 p-8 shadow-sm">
      <AnimatePresence mode="wait">
        {!session ? (
          /* PREFERENCES BUILDER SCREEN */
          <motion.div
            key="pref-builder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            {/* Form */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-mono tracking-widest text-gold-600 uppercase block mb-2">
                  Dhyana Chamber
                </span>
                <h3 className="text-3xl font-serif font-semibold text-sage-900 tracking-tight leading-tight">
                  Guided Meditation Builder
                </h3>
                <p className="mt-2 text-sage-600 text-sm leading-relaxed">
                  Calibrate your internal compass. Choose your focus and length, and our server-side guide will construct a bespoke guided mindfulness script complete with synthetic binaural healing soundscapes.
                </p>
              </div>

              <div className="space-y-4">
                {/* Focus input */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-sage-500 mb-2">
                    Meditation Focus
                  </label>
                  <input
                    id="med-focus-input"
                    type="text"
                    value={preferences.focus}
                    onChange={(e) => setPreferences({ ...preferences, focus: e.target.value })}
                    placeholder="e.g., Deep emotional healing, focus before work, pure stillness"
                    className="w-full text-sm text-sage-950 bg-sage-50/50 rounded-xl p-3 border border-sage-100 focus:border-sage-300 focus:outline-none focus:bg-white transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Duration input */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-sage-500 mb-2">
                      Duration
                    </label>
                    <select
                      id="med-duration-select"
                      value={preferences.durationMinutes}
                      onChange={(e) => setPreferences({ ...preferences, durationMinutes: Number(e.target.value) })}
                      className="w-full text-sm text-sage-950 bg-sage-50/50 rounded-xl p-3 border border-sage-100 focus:border-sage-300 focus:outline-none focus:bg-white transition-all"
                    >
                      <option value={3}>3 Minutes (Micro)</option>
                      <option value={5}>5 Minutes (Balanced)</option>
                      <option value={10}>10 Minutes (Deep)</option>
                      <option value={15}>15 Minutes (Transcendental)</option>
                    </select>
                  </div>

                  {/* Technique input */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-sage-500 mb-2">
                      Technique
                    </label>
                    <select
                      id="med-technique-select"
                      value={preferences.technique}
                      onChange={(e) => setPreferences({ ...preferences, technique: e.target.value })}
                      className="w-full text-sm text-sage-950 bg-sage-50/50 rounded-xl p-3 border border-sage-100 focus:border-sage-300 focus:outline-none focus:bg-white transition-all"
                    >
                      <option value="Anapanasati (Mindful Breath)">Mindful Breathing</option>
                      <option value="Loving-Kindness (Metta)">Loving Kindness</option>
                      <option value="Vipassana (Body Scan)">Body Scan</option>
                      <option value="Spiritual Presence">Inner Sanctuary Presence</option>
                    </select>
                  </div>
                </div>

                {/* Soundscapes */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-sage-500 mb-2">
                    Ambient Soundscape Drone
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {SOUNDSCAPES.map((sc) => {
                      const isSelected = selectedSound === sc.name;
                      return (
                        <button
                          key={sc.name}
                          id={`sound-${sc.type}`}
                          type="button"
                          onClick={() => setSelectedSound(sc.name)}
                          className={`p-2.5 rounded-lg border text-xs font-semibold text-center transition-all ${
                            isSelected
                              ? "bg-gold-50 border-gold-300 text-gold-700 shadow-xs"
                              : "bg-white border-sage-100 text-sage-600 hover:bg-sage-50"
                          }`}
                        >
                          {sc.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Start Trigger */}
              <motion.button
                id="generate-meditation-btn"
                onClick={generateSession}
                disabled={loading}
                whileHover={{ scale: 1.02, boxShadow: "0 8px 20px -4px rgba(44,54,45,0.25)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-sage-900 text-gold-100 hover:bg-sage-950 rounded-xl font-semibold flex items-center justify-center gap-3 transition-colors cursor-pointer disabled:opacity-50 btn-shimmer"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 rounded-full border-t-2 border-gold-300 border-r-2 border-transparent animate-spin"></div>
                    <span>Channeling Divine Consciousness...</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-gold-400 animate-pulse" />
                    <span>Generate & Begin Meditation</span>
                  </>
                )}
              </motion.button>
            </div>

            {/* Immersive Graphics */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center p-8 bg-gold-50/50 rounded-2xl border border-gold-200/30 text-center relative min-h-[350px]">
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none flex items-center justify-center">
                <svg className="w-80 h-80 animate-slow-spin text-sage-950" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  <path d="M 50 0 L 50 100 M 0 50 L 100 50" stroke="currentColor" strokeWidth="0.5" />
                </svg>
              </div>

              <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center text-sage-600 mb-6">
                <Moon className="w-10 h-10 animate-pulse" />
              </div>

              <h4 className="text-xl font-serif font-semibold text-sage-900">Your Personal Sanctuary</h4>
              <p className="text-sage-600 text-sm max-w-xs mt-3 leading-relaxed">
                "Quiet the winds of thought, and the lake of the mind becomes a mirror reflecting the eternal heavens."
              </p>
              <div className="flex items-center gap-2 mt-6 text-xs text-gold-700 bg-gold-100 px-3 py-1.5 rounded-full font-semibold">
                <Volume2 className="w-3.5 h-3.5" />
                <span>Binaural microtones synthesized organically</span>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ACTIVE MEDITATION PLAYER SCREEN */
          <motion.div
            key="active-player"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-8 px-4 flex flex-col items-center justify-center relative overflow-hidden"
          >
            {/* Background Soundscape Ripples */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
              <span className={`absolute w-96 h-96 rounded-full border border-gold-300 transition-transform duration-1000 ${
                isPlaying ? "scale-110 animate-ping opacity-10" : ""
              }`}></span>
              <span className={`absolute w-72 h-72 rounded-full border border-sage-300 transition-transform duration-1000 ${
                isPlaying ? "scale-105 animate-pulse opacity-20" : ""
              }`}></span>
            </div>

            <div className="z-10 max-w-2xl space-y-8">
              {/* Header */}
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-gold-600 bg-gold-100/60 px-3 py-1 rounded-full">
                  Guided: {preferences.technique}
                </span>
                <h3 className="text-3xl font-serif font-bold text-sage-900 mt-3">
                  {session.title}
                </h3>
              </div>

              {/* Timer Dial */}
              <div className="relative w-56 h-56 mx-auto flex items-center justify-center">
                {/* Visual Ring animation */}
                <div className={`absolute inset-0 rounded-full border-4 border-dashed border-sage-100 ${
                  isPlaying ? "animate-slow-spin" : ""
                }`}></div>

                <div className="text-center space-y-1">
                  <span className="text-4xl font-mono text-sage-950 font-bold">
                    {formatTime(timeLeft)}
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-sage-400 block">
                    Remaining
                  </span>
                </div>
              </div>

              {/* Dynamic steps text */}
              <div className="bg-sage-50/70 border border-sage-100 rounded-2xl p-6 min-h-[140px] flex flex-col justify-center items-center">
                <span className="text-[10px] font-mono uppercase text-gold-700 tracking-widest mb-2 block">
                  {activeStepIdx === 0 && "Step 1: Settling In"}
                  {activeStepIdx === 1 && "Step 2: Core Intention"}
                  {activeStepIdx === 2 && "Step 3: Integration"}
                </span>

                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeStepIdx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-md font-serif text-sage-900 leading-relaxed max-w-lg italic font-medium"
                  >
                    {activeStepIdx === 0 && session.preparation}
                    {activeStepIdx === 1 && session.steps[0]}
                    {activeStepIdx === 2 && session.integration}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4 justify-center">
                {/* Play/Pause */}
                <motion.button
                  id="play-pause-med-btn"
                  onClick={() => setIsPlaying(!isPlaying)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-3 rounded-full font-semibold flex items-center gap-2 text-sm shadow-md transition-colors cursor-pointer btn-shimmer ${
                    isPlaying
                      ? "bg-sage-900 text-gold-100 hover:bg-sage-950"
                      : "bg-sage-600 text-white hover:bg-sage-700"
                  }`}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current icon-spin-hover" />}
                  <span>{isPlaying ? "Pause Session" : "Resume Session"}</span>
                </motion.button>

                {/* Quit */}
                <motion.button
                  id="quit-med-btn"
                  onClick={quitSession}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-full border border-sage-200 bg-white text-sage-600 hover:bg-sage-50 transition-colors flex items-center gap-2 text-sm font-semibold cursor-pointer shadow-xs"
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Quit Sanctuary</span>
                </motion.button>
              </div>

              {/* Volume details info */}
              <p className="text-[10px] font-mono text-sage-400 flex items-center justify-center gap-2">
                <Info className="w-3.5 h-3.5" />
                <span>Adjust sound via master volume. Soundscape Drone: <strong className="text-gold-700">{selectedSound}</strong></span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
