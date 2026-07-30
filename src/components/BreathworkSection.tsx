import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Volume2, VolumeX, ShieldAlert, CheckCircle2 } from "lucide-react";
import { BreathworkPattern } from "../types";
import { motion, AnimatePresence } from "motion/react";

const PATTERNS: BreathworkPattern[] = [
  {
    name: "Sama Vritti (Box Breathing)",
    description: "Equal-duration breathing. Relieves severe stress, focuses the mind, and balances systemic energy.",
    inhale: 4,
    holdIn: 4,
    exhale: 4,
    holdOut: 4
  },
  {
    name: "Prana Shanti (Deep Calm)",
    description: "Extended exhale triggers deep parasympathetic nervous system response, dissolving anxiety instantly.",
    inhale: 4,
    holdIn: 2,
    exhale: 7,
    holdOut: 0
  },
  {
    name: "Ushma Bodhi (Energizer)",
    description: "Short holding and powerful releases to saturate the blood with oxygen, building high vital energy.",
    inhale: 3,
    holdIn: 1,
    exhale: 1,
    holdOut: 1
  }
];

export default function BreathworkSection() {
  const [selectedPattern, setSelectedPattern] = useState<BreathworkPattern>(PATTERNS[0]);
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<"Inhale" | "Hold" | "Exhale" | "Rest" | "Idle">("Idle");
  const [timeLeft, setTimeLeft] = useState(0);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Sound Synth references
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Handle countdown timer and phase switches
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      if (timeLeft > 0) {
        interval = setInterval(() => {
          setTimeLeft((prev) => prev - 1);
        }, 1000);
      } else {
        // Switch to the next phase
        switchPhase();
      }
    } else {
      if (interval) clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  // Handle synthesis changes depending on the phase
  useEffect(() => {
    if (!soundEnabled || !isActive) {
      stopTone();
      return;
    }

    if (currentPhase === "Inhale") {
      playTone(330, 440, selectedPattern.inhale); // Sweeps up
    } else if (currentPhase === "Exhale") {
      playTone(440, 220, selectedPattern.exhale); // Sweeps down
    } else {
      stopTone();
    }
  }, [currentPhase, soundEnabled, isActive]);

  const startBreathwork = () => {
    if (!isActive) {
      setIsActive(true);
      setCurrentPhase("Inhale");
      setTimeLeft(selectedPattern.inhale);
    } else {
      setIsActive(false);
      stopTone();
    }
  };

  const resetBreathwork = () => {
    setIsActive(false);
    setCurrentPhase("Idle");
    setTimeLeft(0);
    setCyclesCompleted(0);
    stopTone();
  };

  const switchPhase = () => {
    if (currentPhase === "Inhale") {
      if (selectedPattern.holdIn > 0) {
        setCurrentPhase("Hold");
        setTimeLeft(selectedPattern.holdIn);
      } else {
        setCurrentPhase("Exhale");
        setTimeLeft(selectedPattern.exhale);
      }
    } else if (currentPhase === "Hold") {
      setCurrentPhase("Exhale");
      setTimeLeft(selectedPattern.exhale);
    } else if (currentPhase === "Exhale") {
      if (selectedPattern.holdOut > 0) {
        setCurrentPhase("Rest");
        setTimeLeft(selectedPattern.holdOut);
      } else {
        setCurrentPhase("Inhale");
        setTimeLeft(selectedPattern.inhale);
        setCyclesCompleted((prev) => prev + 1);
      }
    } else if (currentPhase === "Rest") {
      setCurrentPhase("Inhale");
      setTimeLeft(selectedPattern.inhale);
      setCyclesCompleted((prev) => prev + 1);
    }
  };

  // Web Audio API Synthesizer for organic, smooth breathing cues
  const playTone = (startFreq: number, endFreq: number, duration: number) => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      // Stop existing oscillator if any
      stopTone();

      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "sine";
      // Gentle, low frequencies for soothing soundscapes
      osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + duration);

      // Smooth volume fade-in and fade-out to prevent clicks
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.5);
      gainNode.gain.setValueAtTime(0.12, ctx.currentTime + duration - 0.5);
      gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + duration);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();

      oscRef.current = osc;
      gainRef.current = gainNode;
    } catch (e) {
      console.warn("AudioContext failed to initialize or resume: ", e);
    }
  };

  const stopTone = () => {
    if (oscRef.current) {
      try {
        oscRef.current.stop();
      } catch (e) {}
      oscRef.current.disconnect();
      oscRef.current = null;
    }
    if (gainRef.current) {
      gainRef.current.disconnect();
      gainRef.current = null;
    }
  };

  // Toggle sound option
  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled && audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  // Helper for progress ring
  const getPhaseTotalTime = () => {
    switch (currentPhase) {
      case "Inhale": return selectedPattern.inhale;
      case "Hold": return selectedPattern.holdIn;
      case "Exhale": return selectedPattern.exhale;
      case "Rest": return selectedPattern.holdOut;
      default: return 1;
    }
  };

  const phaseProgress = timeLeft / getPhaseTotalTime();

  // Balloon size mapping depending on the phase
  const getBalloonScale = () => {
    if (currentPhase === "Inhale") {
      // Scale grows from 1 to 1.45 based on time elapsed
      const elapsed = selectedPattern.inhale - timeLeft;
      return 1 + (elapsed / selectedPattern.inhale) * 0.45;
    }
    if (currentPhase === "Hold") {
      return 1.45;
    }
    if (currentPhase === "Exhale") {
      // Scale shrinks from 1.45 back to 1
      return 1 + (timeLeft / selectedPattern.exhale) * 0.45;
    }
    return 1; // Idle or Rest
  };

  return (
    <div id="breathwork-module" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      {/* Pattern details and choice */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          <span className="text-xs font-mono tracking-widest text-gold-600 uppercase block mb-2">
            Pranayama Lab
          </span>
          <h3 className="text-3xl font-serif font-semibold text-sage-900 tracking-tight leading-tight">
            Nervous System Calibration
          </h3>
          <p className="mt-3 text-sage-600 text-sm leading-relaxed">
            Choose a precise breathing pattern. Sit upright, relax your chest, and align your breathing with the cosmic expanding balloon.
          </p>
        </div>

        {/* Pattern Cards */}
        <div className="grid grid-cols-1 gap-3">
          {PATTERNS.map((pat) => {
            const isSelected = selectedPattern.name === pat.name;
            return (
              <button
                key={pat.name}
                id={`pattern-${pat.name.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => {
                  setSelectedPattern(pat);
                  resetBreathwork();
                }}
                className={`text-left p-4 rounded-xl border transition-all duration-300 ${
                  isSelected
                    ? "bg-sage-50 border-sage-300 shadow-xs"
                    : "bg-white border-sage-100 hover:border-sage-200"
                }`}
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-sage-900 text-sm">{pat.name}</h4>
                  <span className="text-[10px] font-mono text-gold-700 bg-gold-100 px-2 py-0.5 rounded-full">
                    {pat.inhale}-{pat.holdIn}-{pat.exhale}-{pat.holdOut}s
                  </span>
                </div>
                <p className="text-xs text-sage-500 mt-2 leading-relaxed">{pat.description}</p>
              </button>
            );
          })}
        </div>

        {/* Informative Stats */}
        <div className="bg-sage-50/50 rounded-xl p-4 border border-sage-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-sage-600" />
            <div>
              <p className="text-[10px] uppercase font-mono tracking-wider text-sage-400">Cycles Completed</p>
              <p className="text-lg font-semibold text-sage-900">{cyclesCompleted}</p>
            </div>
          </div>
          <button
            id="audio-toggle-btn"
            onClick={toggleSound}
            className={`p-3 rounded-xl border flex items-center gap-2 text-xs font-medium transition-all ${
              soundEnabled
                ? "bg-gold-50 text-gold-700 border-gold-200 shadow-xs"
                : "bg-white text-sage-500 border-sage-100 hover:bg-sage-50"
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            {soundEnabled ? "Sanctuary Tone Active" : "Tone Muted"}
          </button>
        </div>
      </div>

      {/* Visual Balloon Interactive Area */}
      <div className="lg:col-span-7 flex flex-col items-center justify-center relative p-8 bg-sage-50 rounded-3xl border border-sage-100 min-h-[420px]">
        {/* Progress Ring wrapping the balloon */}
        <div className="relative w-72 h-72 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            {/* Background circle */}
            <circle
              cx="144"
              cy="144"
              r="120"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="4"
              className="opacity-50"
            />
            {/* Active countdown circle */}
            {isActive && (
              <motion.circle
                cx="144"
                cy="144"
                r="120"
                fill="none"
                stroke={currentPhase === "Inhale" ? "#627b63" : currentPhase === "Exhale" ? "#dda85d" : "#ccd6cd"}
                strokeWidth="4"
                strokeDasharray="754"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: 754 * phaseProgress }}
                transition={{ duration: 1, ease: "linear" }}
              />
            )}
          </svg>

          {/* Balloon Core */}
          <motion.div
            id="breathing-balloon"
            style={{ scale: getBalloonScale() }}
            transition={{ type: "spring", stiffness: 40, damping: 15 }}
            className={`w-40 h-40 rounded-full flex flex-col items-center justify-center text-center relative z-10 shadow-lg ${
              currentPhase === "Inhale"
                ? "bg-sage-500 text-gold-50"
                : currentPhase === "Exhale"
                ? "bg-gold-400 text-sage-950"
                : currentPhase === "Hold"
                ? "bg-sage-700 text-white"
                : "bg-sage-200 text-sage-800"
            }`}
          >
            {/* Internal ambient halo rings */}
            <span className="absolute inset-0 rounded-full bg-inherit opacity-20 animate-ping pointer-events-none"></span>

            <span className="text-[10px] font-mono uppercase tracking-widest opacity-85 block mb-1">
              {currentPhase === "Idle" ? "Ready" : currentPhase}
            </span>
            <span className="text-3xl font-serif font-bold">
              {currentPhase === "Idle" ? "✧" : timeLeft}
            </span>
            {isActive && (
              <span className="text-[9px] font-mono mt-1 tracking-wider opacity-75">
                sec remaining
              </span>
            )}
          </motion.div>
        </div>

        {/* Guidance Prompt */}
        <div className="mt-8 text-center space-y-4">
          <h4 className="text-md font-serif font-semibold text-sage-900">
            {currentPhase === "Inhale" && "Gently breathe deep in through your nose..."}
            {currentPhase === "Hold" && "Hold the breath, allowing the prana to settle..."}
            {currentPhase === "Exhale" && "Slowly release the air through your mouth..."}
            {currentPhase === "Rest" && "Inhabit the silence of empty lungs..."}
            {currentPhase === "Idle" && "Find a stable posture, focus, and press start."}
          </h4>

          {/* Player controls */}
          <div className="flex items-center gap-3 justify-center">
            <motion.button
              id="start-breathwork-btn"
              onClick={startBreathwork}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`px-6 py-3 rounded-full flex items-center gap-2 text-sm font-semibold transition-colors duration-200 shadow-md cursor-pointer btn-shimmer ${
                isActive
                  ? "bg-sage-900 text-gold-100 hover:bg-sage-950"
                  : "bg-sage-600 text-white hover:bg-sage-700"
              }`}
            >
              {isActive ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current icon-spin-hover" />}
              <span>{isActive ? "Pause Sanctuary" : "Begin Breathing"}</span>
            </motion.button>
            <motion.button
              id="reset-breathwork-btn"
              onClick={resetBreathwork}
              whileHover={{ scale: 1.1, rotate: -90 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full border border-sage-200 bg-white text-sage-600 hover:bg-sage-50 transition-colors cursor-pointer shadow-xs"
              title="Reset Session"
            >
              <RotateCcw className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
