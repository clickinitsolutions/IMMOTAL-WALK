import React, { useState } from "react";
import ProgramPageTemplate from "./ProgramPageTemplate";
import { ALL_PROGRAMS } from "../data/programsData";
import { Play, Pause, CheckCircle2, Award, Clock, Heart, BookOpen, Compass } from "lucide-react";

export default function DiscoverHarmoniseProgram() {
  const program = ALL_PROGRAMS[0]; // Discover Harmonise Transform
  const [activeDay, setActiveDay] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  const days = [
    {
      dayNum: 1,
      title: "Unmasking the Root Causes & Traps",
      duration: "15 mins",
      sanskrit: "मूल कारण ज्ञान (Mula Karana Jnana)",
      focus: "Identifying mental traps, illusions, and over-commitments",
      description: "Examine the invisible patterns that drive over-commitments and inner conflict. Recognize how the false ego drains your focus.",
      guideline: "List 3 recent situations where over-commitment created stress. Observe without self-judgment.",
      mantra: "Aham Sakshi (I am the unmoving witness of all thoughts)"
    },
    {
      dayNum: 2,
      title: "Navigating False Ego & Inner Conflicts",
      duration: "15 mins",
      sanskrit: "अहंकार विसर्जन (Ahamkara Visarjana)",
      focus: "Dissolving false ego friction and restoring emotional ease",
      description: "Deconstruct the defensiveness of false ego. Learn to respond to challenges from quiet clarity rather than ego reaction.",
      guideline: "Whenever ego defensiveness arises today, pause for one deep breath and ask: 'Who am I defending?'",
      mantra: "Om Shanti (Pure undisturbed peace)"
    },
    {
      dayNum: 3,
      title: "Discovering Self & The Three Gunas",
      duration: "18 mins",
      sanskrit: "गुण त्रय विचार (Guna Traya Vichara)",
      focus: "Balancing Sattva, Rajas, and Tamas for health and stamina",
      description: "Understand your current state across the Three Gunas. Learn to elevate Tamas (inertia) into Sattva (light & calm focus).",
      guideline: "Notice whether your energy is sluggish (Tamas), frantic (Rajas), or clear (Sattva). Adjust diet and breath accordingly.",
      mantra: "Sattvam Bhashate (Sattva illuminates)"
    },
    {
      dayNum: 4,
      title: "Mastering Antahkaran (The Inner Instrument)",
      duration: "18 mins",
      sanskrit: "अन्तःकरण शुद्धि (Antahkaran Shuddhi)",
      focus: "Harmonizing Manas, Buddhi, Chitta, and Ahamkara",
      description: "Align your sensory mind (Manas), intellect (Buddhi), memory vault (Chitta), and identity (Ahamkara) into a cohesive unit.",
      guideline: "Let Buddhi (intellect) guide Manas (desires) gently during decision-making today.",
      mantra: "Om Buddhyai Namah"
    },
    {
      dayNum: 5,
      title: "Basis & Emotional Cleaning",
      duration: "15 mins",
      sanskrit: "भाव शुद्धि (Bhava Shuddhi)",
      focus: "Releasing suppressed emotional weight and mental toxins",
      description: "Clear accumulated emotional residue from past conflicts. Restore freshness to your heart and mind.",
      guideline: "Exhale through the mouth with a soft sigh, releasing stored tightness in the solar plexus.",
      mantra: "Om Hreem Namah"
    },
    {
      dayNum: 6,
      title: "Aligning Karma & Dharma",
      duration: "15 mins",
      sanskrit: "धर्म कर्म योग (Dharma Karma Yoga)",
      focus: "Connecting daily action with purpose and health",
      description: "Act with full dedication without attaching your peace to immediate external outcomes.",
      guideline: "Perform your daily duties as an offering of excellence without anxious over-concern.",
      mantra: "Karmanye Vadhikaraste (Action is your sacred domain)"
    },
    {
      dayNum: 7,
      title: "Sustainability & Unbroken Transformation",
      duration: "20 mins",
      sanskrit: "सहज स्थिति (Sahaja Sthiti)",
      focus: "Embedding lifelong practices for health, focus, and productivity",
      description: "Consolidate your transformation into daily micro-anchors that preserve clarity in all conditions.",
      guideline: "Set a 3-minute morning and evening stillness ritual to sustain this state permanently.",
      mantra: "Aham Brahmasmi (I am the unbroken essence of life)"
    }
  ];

  const markDone = (dayNum: number) => {
    if (!completedDays.includes(dayNum)) {
      setCompletedDays([...completedDays, dayNum]);
    }
  };

  const interactiveWidget = (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-sage-200/90 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-sage-100">
        <div>
          <span className="text-[10px] font-mono text-gold-700 uppercase tracking-widest font-bold block">
            7-Day Sanctuary Audio Immersion
          </span>
          <h3 className="text-xl font-serif font-bold text-sage-900">
            Interactive Daily Practice Companion
          </h3>
        </div>
        <div className="text-xs font-mono text-sage-600 bg-sage-50 px-3 py-1.5 rounded-full border border-sage-200/80">
          Completed: {completedDays.length} / 7 Days
        </div>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {days.map((d, i) => {
          const isDone = completedDays.includes(d.dayNum);
          const isCurrent = activeDay === i;
          return (
            <button
              key={d.dayNum}
              onClick={() => {
                setActiveDay(i);
                setIsPlayingAudio(false);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 shrink-0 ${
                isCurrent
                  ? "bg-sage-900 text-gold-300 shadow-sm"
                  : isDone
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : "bg-sage-50 text-sage-700 hover:bg-sage-100 border border-sage-200/60"
              }`}
            >
              <span>Day 0{d.dayNum}</span>
              {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
            </button>
          );
        })}
      </div>

      {/* Active Day Detail Card */}
      <div className="bg-sage-50/70 p-6 rounded-2xl border border-sage-200 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono text-gold-700 uppercase tracking-widest block font-bold">
              {days[activeDay].sanskrit}
            </span>
            <h4 className="text-lg font-serif font-bold text-sage-900">
              Day {days[activeDay].dayNum}: {days[activeDay].title}
            </h4>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-sage-600 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-gold-600" />
              {days[activeDay].duration}
            </span>
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer ${
                isPlayingAudio ? "bg-gold-500 text-sage-950" : "bg-sage-900 text-white hover:bg-sage-800"
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pause Guide</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-gold-400" />
                  <span>Listen Audio</span>
                </>
              )}
            </button>
          </div>
        </div>

        <p className="text-xs md:text-sm text-sage-700 leading-relaxed font-sans">
          {days[activeDay].description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-white p-4 rounded-xl border border-sage-200/80 space-y-1">
            <span className="text-[10px] font-mono uppercase text-gold-700 font-bold block">
              ✦ Daily Practice Guideline
            </span>
            <p className="text-xs text-sage-800 font-medium leading-relaxed">
              {days[activeDay].guideline}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-sage-200/80 space-y-1">
            <span className="text-[10px] font-mono uppercase text-gold-700 font-bold block">
              ✦ Contemplative Mantra
            </span>
            <p className="text-xs text-sage-900 font-serif font-bold leading-relaxed">
              {days[activeDay].mantra}
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => markDone(days[activeDay].dayNum)}
            disabled={completedDays.includes(days[activeDay].dayNum)}
            className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-2 ${
              completedDays.includes(days[activeDay].dayNum)
                ? "bg-emerald-100 text-emerald-800 border border-emerald-300 opacity-80 cursor-default"
                : "bg-sage-900 hover:bg-sage-950 text-gold-200 shadow-xs"
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{completedDays.includes(days[activeDay].dayNum) ? "Completed" : "Mark Day as Completed"}</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <ProgramPageTemplate program={program} customInteractiveWidget={interactiveWidget} />
  );
}
