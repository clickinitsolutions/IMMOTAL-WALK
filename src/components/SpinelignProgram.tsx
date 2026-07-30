import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Activity, ShieldAlert, Check, HelpCircle, Flame, Sun, Heart, Volume2 } from "lucide-react";
import ProgramPageTemplate from "./ProgramPageTemplate";
import { ALL_PROGRAMS } from "../data/programsData";

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
  const program = ALL_PROGRAMS[2]; // Spinelign

  const [activeZone, setActiveZone] = useState<SpineZone>("lumbar");
  const [asanaTimer, setAsanaTimer] = useState(45);
  const [timerRunning, setTimerRunning] = useState(false);

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

  const interactiveWidget = (
    <div className="bg-white border border-sage-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sage-100 pb-4">
        <div>
          <span className="text-[10px] font-mono text-gold-700 uppercase tracking-widest font-bold block">
            Somatic Diagnostic Tool
          </span>
          <h3 className="text-xl font-serif font-bold text-sage-900">
            Interactive Spine Zone Decompression
          </h3>
        </div>
        <span className="text-xs font-mono text-sage-500 bg-sage-50 px-3 py-1 rounded-full border border-sage-200/80">
          Select Vertebral Zone Below
        </span>
      </div>

      {/* Zone Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {ALIGNMENTS.map((zone) => {
          const isSelected = activeZone === zone.id;
          return (
            <button
              key={zone.id}
              onClick={() => {
                setActiveZone(zone.id);
                setTimerRunning(false);
                setAsanaTimer(45);
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? "bg-sage-900 text-white border-gold-400 shadow-sm"
                  : "bg-sage-50/70 text-sage-800 border-sage-200/80 hover:bg-sage-100"
              }`}
            >
              <span className="text-[9px] font-mono uppercase tracking-widest block text-gold-300 font-bold">
                {zone.sanskrit}
              </span>
              <span className="text-xs font-serif font-bold leading-tight block mt-0.5">
                {zone.name.split(" ")[0]} Spine
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Zone Detail Card */}
      <div className="bg-sage-50/80 border border-sage-200 p-6 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono text-gold-700 font-bold uppercase tracking-wider block">
              {activeDetail.sanskrit}
            </span>
            <h4 className="text-lg font-serif font-bold text-sage-950">
              {activeDetail.name}
            </h4>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-sage-600 bg-white px-3 py-1.5 rounded-lg border border-sage-200">
              Target: {activeDetail.focus}
            </span>
            <button
              onClick={triggerTimer}
              className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer ${
                timerRunning
                  ? "bg-gold-500 text-sage-950"
                  : "bg-sage-900 text-gold-200 hover:bg-sage-950"
              }`}
            >
              {timerRunning ? `${asanaTimer}s Hold` : "Start 45s Practice"}
            </button>
          </div>
        </div>

        <div className="space-y-2 pt-1">
          <span className="text-[10px] font-mono uppercase text-sage-600 font-bold block">
            ✦ Recommended Somatic Micro-Movement
          </span>
          <p className="text-xs font-serif font-bold text-sage-900">
            {activeDetail.asana}
          </p>

          <ul className="space-y-1.5 pt-1">
            {activeDetail.steps.map((step, idx) => (
              <li key={idx} className="text-xs text-sage-700 flex items-start gap-2 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-600 mt-1.5 shrink-0" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <ProgramPageTemplate program={program} customInteractiveWidget={interactiveWidget} />
  );
}
