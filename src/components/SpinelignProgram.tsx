import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Activity, ShieldAlert, Check, HelpCircle, Flame, Sun, Heart, Volume2 } from "lucide-react";

type SpineZone = "cervical" | "thoracic" | "lumbar" | "sacral";

interface AlignmentDetail {
  id: SpineZone;
  name: string;
  sanskrit: string;
  focus: string;
  symptoms: string;
  asana: string;
  steps: string[];
}

const ALIGNMENTS: AlignmentDetail[] = [
  {
    id: "cervical",
    name: "Cervical Spine Alignment",
    sanskrit: "ग्रीवा सन्धि (Griva Sandhi)",
    focus: "Upper neck, skull base, and shoulders.",
    symptoms: "Text-neck, forward head tilt, migraine pressure, tight upper trapezius.",
    asana: "Grivasana & Matsyasana (Fish Pose Variant)",
    steps: [
      "Inhale deeply, elevate the collarbones, and retract your shoulder blades.",
      "Gently roll the neck in slow 360-degree semicircles, synchronizing with the breath.",
      "Lengthen the back of the neck upward, tucking the chin slightly to align the atlas vertebrae."
    ]
  },
  {
    id: "thoracic",
    name: "Thoracic Rib Alignment",
    sanskrit: "वक्षः प्रसर (Vakshah Prasara)",
    focus: "Middle back, chest expansion, and diaphragmatic capacity.",
    symptoms: "Slouched posture, compressed breathing chamber, shallow lung capacity.",
    asana: "Bhujangasana (Classic Serpent Posture)",
    steps: [
      "Lie prone, placing palms beneath the shoulders, fingers spread flat.",
      "Inhale, peel the chest off the floor using upper-back muscles rather than arm force.",
      "Pull the shoulders away from the ears, widening the chest and stimulating the heart meridian."
    ]
  },
  {
    id: "lumbar",
    name: "Lumbar Core Decompression",
    sanskrit: "कटि पीठ (Kati Pitha)",
    focus: "Lower back, pelvis, and kidney area.",
    symptoms: "Lower back soreness, sciatic pressure, tight hip flexors from long sitting.",
    asana: "Marjariasana to Bitilasana (Cat-Cow Spine Wave)",
    steps: [
      "Rest on all fours in complete symmetry (hands under shoulders, knees under hips).",
      "Inhale: drop the belly, lift the tailbone, and look up to decompress lumbar disks.",
      "Exhale: arch the back upward, tuck the tailbone, and draw the navel to the spine."
    ]
  },
  {
    id: "sacral",
    name: "Sacral Grounding Decompression",
    sanskrit: "मूलाधार सन्धि (Muladhara Sandhi)",
    focus: "Tailbone, hips, and deep sciatic integration.",
    symptoms: "Hip stiffness, lower back compression, asymmetrical pelvic posture.",
    asana: "Balasana to Sethu Bandhasana (Bridge / Child's Posture)",
    steps: [
      "Lie flat, bend knees, and place feet hip-width apart.",
      "Inhale, press heels down, and elevate the pelvis toward the sky.",
      "Clasp fingers underneath, rolling shoulders back to expand the chest-sacral line."
    ]
  }
];

export default function SpinelignProgram() {
  const [activeZone, setActiveZone] = useState<SpineZone>("lumbar");
  const [asanaTimer, setAsanaTimer] = useState(45);
  const [timerRunning, setTimerRunning] = useState(false);

  // Handle timer
  useEffect(() => {
    let interval: any;
    if (timerRunning && asanaTimer > 0) {
      interval = setInterval(() => {
        setAsanaTimer((prev) => prev - 1);
      }, 1000);
    } else if (asanaTimer === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, asanaTimer]);

  const triggerTimer = () => {
    setAsanaTimer(45);
    setTimerRunning(true);
  };

  const activeDetail = ALIGNMENTS.find((a) => a.id === activeZone)!;

  return (
    <div className="space-y-12">
      {/* Editorial Header */}
      <div className="relative bg-gradient-to-r from-[#2b3c2c] to-sage-950 text-white rounded-3xl p-8 lg:p-12 overflow-hidden border border-emerald-900/20">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full text-white" viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
        
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-gold-300 block">
            Hatha Spine Decompression
          </span>
          <h1 className="text-3xl lg:text-4xl font-serif font-bold tracking-tight">
            Spinelign Program
          </h1>
          <p className="text-sage-200 text-xs md:text-sm leading-relaxed font-light">
            Sedentary office sitting compresses the spinal column, shutting down respiratory volume and nervous system pathways. Our Spinelign curriculum pairs traditional posture alignments with modern biomechanics to decompress lumbar discs and stimulate spinal energy flow.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Col (5 cols): Spine Selector Visualizer */}
        <div className="lg:col-span-5 bg-white border border-sage-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 bg-gold-50 border border-gold-200 text-gold-700 rounded-lg">
                <Activity className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-sage-500 font-bold">
                interactive spine map
              </span>
            </div>
            
            <h3 className="text-xl font-serif font-bold text-sage-950">
              Select Spine Segment
            </h3>
            <p className="text-xs text-sage-600 mt-1 leading-relaxed">
              Long hours of sedentary sitting strain different regions of your back. Click a spine segment to isolate target tensions and get recommended decompressions.
            </p>
          </div>

          {/* Interactive Spinal Column representation */}
          <div className="my-8 flex justify-center items-center gap-12">
            
            {/* Visual spine mockup column */}
            <div className="flex flex-col gap-1 items-center bg-sage-50/60 p-4 rounded-full border border-sage-100">
              {[
                { id: "cervical", label: "C1 - C7 Cervical", color: "bg-red-400" },
                { id: "thoracic", label: "T1 - T12 Thoracic", color: "bg-amber-400" },
                { id: "lumbar", label: "L1 - L5 Lumbar", color: "bg-emerald-400" },
                { id: "sacral", label: "Sacral Base", color: "bg-blue-400" }
              ].map((item) => {
                const isActive = activeZone === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveZone(item.id as SpineZone)}
                    className={`flex flex-col items-center justify-center p-2 rounded-full cursor-pointer transition-all ${
                      isActive
                        ? "bg-sage-900 text-white shadow-md scale-105"
                        : "bg-white text-sage-600 border border-sage-100 hover:bg-sage-50"
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded-full ${item.color} ${isActive ? "animate-pulse" : ""}`} />
                    <span className="text-[8px] font-mono font-bold mt-1 px-1.5 leading-none uppercase tracking-wide">
                      {item.id.substring(0, 3)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected segment data block */}
            <div className="flex-1 space-y-3 p-4 rounded-2xl bg-sage-50/40 border border-sage-100/50">
              <span className="text-[9px] font-mono uppercase tracking-widest text-gold-700 block">
                {activeDetail.sanskrit}
              </span>
              <h4 className="font-serif font-bold text-sm text-sage-900 leading-tight">
                {activeDetail.name}
              </h4>
              <div className="space-y-1.5 text-xs text-sage-700">
                <p>
                  <strong className="font-semibold block text-[10px] uppercase text-sage-500 font-mono">Scope:</strong>
                  {activeDetail.focus}
                </p>
                <p>
                  <strong className="font-semibold block text-[10px] uppercase text-sage-500 font-mono">Tension:</strong>
                  {activeDetail.symptoms}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-sage-100 text-[10px] font-mono text-sage-400 text-center">
            ✦ Calibrated specifically for long desk-working periods
          </div>
        </div>

        {/* Right Col (7 cols): Alignment practice cards */}
        <div className="lg:col-span-7 bg-[#1c221d] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs border border-sage-900">
          
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-sage-800 pb-3">
              <div>
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-gold-400 block">
                  alignment posture anchor
                </span>
                <h3 className="text-lg font-serif font-bold text-white capitalize">
                  {activeDetail.asana}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-sage-400 font-mono">Decompression Time</span>
                <span className="text-xl font-mono font-bold text-gold-300 block">45 Seconds</span>
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-[10px] font-mono text-sage-400 uppercase tracking-wider block">
                Lineage Alignment Sequence
              </span>
              <div className="space-y-3.5">
                {activeDetail.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <span className="w-5.5 h-5.5 rounded-full bg-[#2a352c] border border-gold-400/25 flex items-center justify-center text-[10px] font-bold text-gold-300 font-mono shrink-0 mt-0.5">
                      0{idx + 1}
                    </span>
                    <p className="text-xs text-sage-200 leading-relaxed font-sans">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-sage-850 mt-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] font-mono text-sage-400">STATUS:</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase font-bold ${
                timerRunning ? "bg-amber-950 text-amber-300 border border-amber-900" : "bg-emerald-950 text-emerald-300 border border-emerald-900"
              }`}>
                {timerRunning ? `Aligning - ${asanaTimer}s` : "Standing Ready"}
              </span>
            </div>

            <button
              onClick={triggerTimer}
              className="px-6 py-2.5 rounded-full bg-[#5c6f59] hover:bg-[#465a44] text-white font-medium text-xs uppercase tracking-widest transition-all cursor-pointer shadow-sm"
            >
              {timerRunning ? "Reset Timer" : "Start 45s Breath-Hold"}
            </button>
          </div>

        </div>

      </div>

      {/* Spinal Health Index Guide */}
      <div className="bg-sage-50 border border-sage-100 rounded-3xl p-6 sm:p-8 space-y-4">
        <h4 className="font-serif font-bold text-sage-950 text-center">Spinelign Daily Decompression Rule</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white border border-sage-100 rounded-2xl text-center space-y-1">
            <span className="text-xl font-mono text-gold-600 block">50m</span>
            <span className="text-xs font-serif font-semibold text-sage-900 block">Continuous Sitting</span>
            <p className="text-[10px] text-sage-500 font-sans mt-1">Never sit continuously for more than 50 minutes without decompressing.</p>
          </div>
          <div className="p-4 bg-white border border-sage-100 rounded-2xl text-center space-y-1">
            <span className="text-xl font-mono text-gold-600 block">3m</span>
            <span className="text-xs font-serif font-semibold text-sage-900 block">Cat-Cow Reset</span>
            <p className="text-[10px] text-sage-500 font-sans mt-1">Execute a 3-minute pelvic tilt wave to restore blood supply to disks.</p>
          </div>
          <div className="p-4 bg-white border border-sage-100 rounded-2xl text-center space-y-1">
            <span className="text-xl font-mono text-gold-600 block">100%</span>
            <span className="text-xs font-serif font-semibold text-sage-900 block">Symmetrical Gaze</span>
            <p className="text-[10px] text-sage-500 font-sans mt-1">Keep eyes completely level to the horizon to avoid upper cervical compression.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
