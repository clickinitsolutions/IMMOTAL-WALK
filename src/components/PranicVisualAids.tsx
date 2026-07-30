import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, Wind, Disc, Leaf, Activity, Sun, ShieldAlert, Check } from "lucide-react";

// The 6 visualization modes
type AidMode = "breathe" | "mandala" | "chakra" | "ripple" | "smoke" | "aura";

interface AidDetail {
  id: AidMode;
  title: string;
  sanskrit: string;
  label: string;
  icon: React.ComponentType<any>;
  description: string;
}

const VISUAL_AIDS: AidDetail[] = [
  {
    id: "breathe",
    title: "Breathing Guide",
    sanskrit: "प्राण स्पन्द (Prana Spanda)",
    label: "Inhale / Exhale Circle",
    icon: Wind,
    description: "Align your lungs with this calibrated expanding circle. It guides you through equal cycles of expansion (Inhale) and absorption (Exhale) to calm the nervous system."
  },
  {
    id: "mandala",
    title: "Sacred Mandala",
    sanskrit: "मण्डल चक्र (Mandala Chakra)",
    label: "Hypnotic Concentric Rings",
    icon: Disc,
    description: "Two outer and inner rings spinning in slow, opposite directions. This dual-harmonic movement silences analytical brain hemispheres, promoting effortless focal stability."
  },
  {
    id: "chakra",
    title: "Chakra Glow",
    sanskrit: "तेजस् स्पन्द (Tejas Spanda)",
    label: "Pranic Energy Radiator",
    icon: Activity,
    description: "Concentric waves of pure light radiating outward from a central terminal point. Toggle different spinal energy nodes to harmonize corresponding focal frequencies."
  },
  {
    id: "ripple",
    title: "Meditation Ripples",
    sanskrit: "ध्यान तरङ्ग (Dhyana Taranga)",
    label: "Still Water Ripple Loops",
    icon: Eye,
    description: "Simulating concentric rings expanding outward on a completely still mountain lake. Touch or click anywhere inside the chamber to send relaxing ripples through space."
  },
  {
    id: "smoke",
    title: "Incense Drift",
    sanskrit: "धूप वाहिनी (Dhupa Vahini)",
    label: "Slow Aromatic Smoke Wave",
    icon: Leaf,
    description: "Slow wavy particles drifting upward and fading. Light a spiritual incense stick (Sandalwood, Sage, or Cedarwood) to release aromatic waves that calm mental static."
  },
  {
    id: "aura",
    title: "Aura Breath Halo",
    sanskrit: "प्रभामण्डल (Prabhamandala)",
    label: "Luminous Figure Halo",
    icon: Sun,
    description: "A soft, radiant aura expanding and contracting around an ancient meditative figure. Gaze at the central stillness and let your protective biological field widen."
  }
];

export default function PranicVisualAids() {
  const [activeMode, setActiveMode] = useState<AidMode>("breathe");
  
  // Timer for Breathing Circle text
  const [breathePhase, setBreathePhase] = useState<"Inhale" | "Hold" | "Exhale" | "Rest">("Inhale");
  const [breatheSec, setBreatheSec] = useState(4);

  // Custom configuration states for visual aids
  const [mandalaSpeed, setMandalaSpeed] = useState<number>(30); // in seconds
  const [activeChakra, setActiveChakra] = useState<"root" | "heart" | "third-eye" | "crown">("heart");
  const [incenseType, setIncenseType] = useState<"sandalwood" | "frankincense" | "jasmine">("sandalwood");
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [rippleCounter, setRippleCounter] = useState(0);

  // 1. Breath timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setBreatheSec((prev) => {
        if (prev <= 1) {
          // Switch phase
          setBreathePhase((curr) => {
            if (curr === "Inhale") return "Hold";
            if (curr === "Hold") return "Exhale";
            if (curr === "Exhale") return "Rest";
            return "Inhale";
          });
          return 4; // 4 seconds per phase (Vedic Sama Vritti protocol)
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle Ripple click
  const handleRippleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeMode !== "ripple") return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = { id: rippleCounter, x, y };
    setRipples((prev) => [...prev, newRipple]);
    setRippleCounter((prev) => prev + 1);

    // Remove ripple after animation completes (4 seconds)
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 4000);
  };

  return (
    <div className="bg-white rounded-3xl border border-sage-100 p-6 sm:p-8 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: 6 Visual Aid Selector Tabs & Descriptions */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-gold-700 uppercase block mb-1">
                Yantra Mandiram
              </span>
              <h3 className="text-2xl font-serif font-bold text-sage-950 tracking-tight leading-tight">
                Pranic Visual Guides
              </h3>
              <p className="text-xs text-sage-600 mt-2 leading-relaxed">
                Interact with our 6 certified visualizer tools. Crafted strictly to quiet peripheral optic nerves, allowing your focus to settle into absolute coherence.
              </p>
            </div>

            {/* Visual Aid Selector Row/Buttons */}
            <div className="grid grid-cols-2 gap-2">
              {VISUAL_AIDS.map((aid) => {
                const isSelected = activeMode === aid.id;
                const Icon = aid.icon;
                return (
                  <button
                    key={aid.id}
                    id={`yantra-btn-${aid.id}`}
                    onClick={() => setActiveMode(aid.id)}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? "bg-sage-50 border-sage-300 text-sage-900 shadow-xs"
                        : "bg-white border-sage-100 text-sage-600 hover:bg-sage-50"
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg border ${isSelected ? "bg-white border-gold-300 text-gold-600" : "bg-sage-50 border-transparent text-sage-500"}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[11px] font-semibold text-sage-950 block truncate leading-tight">
                        {aid.title}
                      </span>
                      <span className="text-[9px] text-sage-500 block truncate">
                        {aid.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Tool Deep Details Panel */}
          <div className="p-4 rounded-2xl bg-sage-50/50 border border-sage-100 space-y-3.5">
            <AnimatePresence mode="wait">
              {VISUAL_AIDS.filter((v) => v.id === activeMode).map((detail) => (
                <motion.div
                  key={detail.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-gold-700 uppercase tracking-widest font-semibold">
                      {detail.sanskrit}
                    </span>
                    <span className="text-[10px] text-sage-400 font-mono">✦ Calibrated</span>
                  </div>
                  <h4 className="font-serif font-bold text-sage-900 text-sm">
                    {detail.title}
                  </h4>
                  <p className="text-[11px] text-sage-600 leading-relaxed font-sans">
                    {detail.description}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Custom Interactive Controls depending on the active visualizer */}
            <div className="pt-3 border-t border-sage-200/40">
              {activeMode === "mandala" && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[10px] text-sage-500">
                    <span className="font-mono">ROTATION PERIOD</span>
                    <span className="font-mono font-bold text-gold-700">{mandalaSpeed} Seconds</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    step="5"
                    value={mandalaSpeed}
                    onChange={(e) => setMandalaSpeed(Number(e.target.value))}
                    className="w-full h-1 bg-sage-200 rounded-lg appearance-none cursor-pointer accent-[#627b63]"
                  />
                  <span className="text-[9px] text-sage-400 block font-mono text-center">Slide to adjust the hypnotic orbit velocity</span>
                </div>
              )}

              {activeMode === "chakra" && (
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-sage-500 uppercase tracking-wider block">CHAKRA FREQUENCY RADIAL</span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { id: "root", code: "LAM", label: "Root", hz: "396" },
                      { id: "heart", code: "YAM", label: "Heart", hz: "528" },
                      { id: "third-eye", code: "OM", label: "Eye", hz: "741" },
                      { id: "crown", code: "AH", label: "Crown", hz: "963" }
                    ].map((ch) => (
                      <button
                        key={ch.id}
                        onClick={() => setActiveChakra(ch.id as any)}
                        className={`py-1.5 px-1 rounded-lg text-center border text-[10px] font-semibold transition-all cursor-pointer ${
                          activeChakra === ch.id
                            ? "bg-sage-900 text-white border-sage-950"
                            : "bg-white text-sage-600 border-sage-200/60 hover:bg-sage-100/50"
                        }`}
                      >
                        <span className="block font-mono leading-none">{ch.code}</span>
                        <span className="text-[8px] text-gold-600 block mt-0.5 font-mono">{ch.hz}Hz</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeMode === "smoke" && (
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-sage-500 uppercase tracking-wider block">CHOOSE HOLY INCENSE ESSENCE</span>
                  <div className="flex gap-1.5 justify-between">
                    {[
                      { id: "sandalwood", name: "Sandalwood", vibe: "Deep Calm" },
                      { id: "frankincense", name: "Frankincense", vibe: "High Focus" },
                      { id: "jasmine", name: "Jasmine", vibe: "Open Heart" }
                    ].map((inc) => (
                      <button
                        key={inc.id}
                        onClick={() => setIncenseType(inc.id as any)}
                        className={`flex-1 py-1.5 px-2 rounded-lg border text-center transition-all cursor-pointer ${
                          incenseType === inc.id
                            ? "bg-[#5c6f59] text-white border-transparent"
                            : "bg-white text-sage-600 border-sage-200 hover:bg-sage-50"
                        }`}
                      >
                        <span className="text-[10px] font-bold block leading-none">{inc.name}</span>
                        <span className={`text-[8px] block mt-0.5 font-mono ${incenseType === inc.id ? "text-gold-200" : "text-sage-400"}`}>{inc.vibe}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeMode === "breathe" && (
                <div className="p-3 bg-white border border-sage-100 rounded-xl space-y-1 text-center">
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-gold-700 block">SAMA VRITTI STANDARD</span>
                  <p className="text-[10px] text-sage-500 leading-relaxed font-sans">
                    4s Inhale → 4s Hold → 4s Exhale → 4s Rest. Maintain an even, frictionless respiratory sequence.
                  </p>
                </div>
              )}

              {activeMode === "ripple" && (
                <div className="p-2.5 bg-white border border-sage-100 rounded-xl text-center">
                  <p className="text-[9px] text-sage-500 font-sans">
                    Tap anywhere inside the dark water frame on the right to trigger expansion rings that relax cerebral focus.
                  </p>
                </div>
              )}

              {activeMode === "aura" && (
                <div className="p-2.5 bg-white border border-sage-100 rounded-xl text-center">
                  <p className="text-[9px] text-sage-500 font-sans">
                    Rest your eyes on the center of the breathing halo. Synchronize your slow diaphragmatic expansions with the protective aura.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Immersive Premium Display Container with Interactive Visualizers */}
        <div className="lg:col-span-7 bg-[#1c221d] text-white rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden min-h-[350px] sm:min-h-[400px] border border-sage-900/40">
          
          {/* Symmetrical fine background coordinates lines for architectural beauty */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
            <svg className="w-128 h-128" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.2" />
              <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="0.15" />
              <path d="M 50 0 L 50 100 M 0 50 L 100 50" stroke="currentColor" strokeWidth="0.1" />
            </svg>
          </div>

          <AnimatePresence mode="wait">
            
            {/* 1. BREATHING CIRCLE */}
            {activeMode === "breathe" && (
              <motion.div
                key="breathe-aid"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center relative w-full h-full"
              >
                <div className="relative w-52 h-52 flex items-center justify-center">
                  {/* Surrounding fine ring */}
                  <div className="absolute inset-0 border border-gold-300/20 rounded-full animate-pulse" />
                  
                  {/* Concentric expanding outer breathing glow */}
                  <div className={`absolute inset-4 rounded-full border border-dashed border-gold-400/25 transition-transform duration-1000 ${
                    breathePhase === "Inhale" ? "scale-110" : breathePhase === "Exhale" ? "scale-90" : "scale-100"
                  }`} />
                  
                  {/* Dynamic core circle with breathing animation */}
                  <div className={`w-32 h-32 rounded-full bg-gradient-to-tr from-gold-500/80 via-[#5c6f59]/90 to-emerald-900/65 shadow-[0_0_50px_rgba(201,162,83,0.3)] transition-transform duration-[4000ms] cubic-bezier(0.45,0,0.55,1) flex flex-col items-center justify-center text-center ${
                    breathePhase === "Inhale"
                      ? "scale-115"
                      : breathePhase === "Hold"
                      ? "scale-115 animate-pulse"
                      : breathePhase === "Exhale"
                      ? "scale-85"
                      : "scale-85 opacity-60"
                  }`}>
                    {/* Breath cycle stats */}
                    <span className="text-[9px] font-mono tracking-widest uppercase text-gold-200 block mb-1">
                      {breathePhase}
                    </span>
                    <span className="text-3xl font-serif font-bold text-white leading-none">
                      {breatheSec}
                    </span>
                    <span className="text-[8px] font-mono tracking-wider text-sage-200 block mt-1">
                      SECONDS
                    </span>
                  </div>
                </div>

                {/* Ambient Sub-label */}
                <div className="mt-6 text-center space-y-1">
                  <h5 className="font-serif italic text-sm text-gold-100">
                    {breathePhase === "Inhale" && "Draw the subtle prana deep into your abdomen..."}
                    {breathePhase === "Hold" && "Rest at the quiet peak, absolute suspension..."}
                    {breathePhase === "Exhale" && "Surrender the old breath calmly into space..."}
                    {breathePhase === "Rest" && "Inhabit the complete stillness of void..."}
                  </h5>
                  <span className="text-[9px] text-sage-400 font-mono uppercase tracking-[0.15em] block">Sama Vritti Equalizer</span>
                </div>
              </motion.div>
            )}

            {/* 2. ROTATING MANDALA */}
            {activeMode === "mandala" && (
              <motion.div
                key="mandala-aid"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center relative w-full h-full"
              >
                <div className="relative w-56 h-56 flex items-center justify-center">
                  
                  {/* Mandala SVG Container */}
                  <svg 
                    className="w-full h-full" 
                    viewBox="0 0 200 200"
                    style={{
                      animation: `mandala-spin ${mandalaSpeed}s linear infinite`,
                    }}
                  >
                    <g stroke="#C9A253" fill="none" strokeWidth="1">
                      <circle cx="100" cy="100" r="90" opacity="0.15" strokeDasharray="3,3" />
                      <circle cx="100" cy="100" r="72" opacity="0.3" />
                      <circle cx="100" cy="100" r="54" opacity="0.4" />
                      
                      {/* Inner spinning elements in reverse */}
                      <g 
                        style={{
                          animation: `mandala-spin-rev ${mandalaSpeed * 0.65}s linear infinite`,
                          transformOrigin: "100px 100px"
                        }}
                      >
                        <path d="M100 15 L100 185 M15 100 L185 100 M40 40 L160 160 M160 40 L40 160" opacity="0.4" />
                        
                        {/* Sacred lotus petal vectors */}
                        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                          <g key={deg} transform={`rotate(${deg} 100 100)`}>
                            <path d="M100 100 Q88 60 100 30 Q112 60 100 100" opacity="0.5" stroke="#C9A253" />
                            <circle cx="100" cy="30" r="4" fill="#6E7C5C" stroke="none" />
                          </g>
                        ))}
                      </g>
                      
                      {/* Central Golden seed nucleus */}
                      <circle cx="100" cy="100" r="16" fill="#C9A253" stroke="none" opacity="0.75" />
                      <circle cx="100" cy="100" r="4" fill="#fff" stroke="none" />
                    </g>
                  </svg>
                </div>

                <div className="mt-6 text-center">
                  <h5 className="font-serif italic text-sm text-gold-200">The Eye of Stillness</h5>
                  <p className="text-[9px] text-sage-400 font-mono uppercase tracking-widest mt-1">Concentric Antiphase Harmonic Orbit</p>
                </div>
              </motion.div>
            )}

            {/* 3. CHAKRA GLOW PULSE */}
            {activeMode === "chakra" && (
              <motion.div
                key="chakra-aid"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center relative w-full h-full"
              >
                <div className="relative w-52 h-52 flex items-center justify-center">
                  {/* Concentric glow waves pulsing outwards */}
                  <div 
                    className="absolute inset-0 border-2 rounded-full border-gold-300/30"
                    style={{
                      animation: "chakra-pulse 3.5s cubic-bezier(0.4,0,0.6,1) infinite",
                      borderColor: activeChakra === "root" ? "rgba(239,68,68,0.4)" : activeChakra === "third-eye" ? "rgba(59,130,246,0.4)" : activeChakra === "crown" ? "rgba(168,85,247,0.4)" : "rgba(201,162,83,0.4)"
                    }}
                  />
                  <div 
                    className="absolute inset-0 border-2 rounded-full border-gold-300/20"
                    style={{
                      animation: "chakra-pulse 3.5s cubic-bezier(0.4,0,0.6,1) infinite",
                      animationDelay: "1.1s",
                      borderColor: activeChakra === "root" ? "rgba(239,68,68,0.3)" : activeChakra === "third-eye" ? "rgba(59,130,246,0.3)" : activeChakra === "crown" ? "rgba(168,85,247,0.3)" : "rgba(201,162,83,0.3)"
                    }}
                  />
                  <div 
                    className="absolute inset-0 border-2 rounded-full border-gold-300/10"
                    style={{
                      animation: "chakra-pulse 3.5s cubic-bezier(0.4,0,0.6,1) infinite",
                      animationDelay: "2.2s",
                      borderColor: activeChakra === "root" ? "rgba(239,68,68,0.2)" : activeChakra === "third-eye" ? "rgba(59,130,246,0.2)" : activeChakra === "crown" ? "rgba(168,85,247,0.2)" : "rgba(201,162,83,0.2)"
                    }}
                  />

                  {/* Stable Core Terminal point */}
                  <div className={`w-20 h-20 rounded-full border flex flex-col items-center justify-center text-center z-10 shadow-[0_0_35px_rgba(201,162,83,0.4)] ${
                    activeChakra === "root" 
                      ? "bg-red-950/80 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)]" 
                      : activeChakra === "third-eye" 
                      ? "bg-blue-950/80 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.5)]" 
                      : activeChakra === "crown"
                      ? "bg-purple-950/80 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.5)]"
                      : "bg-[#2b2e24] border-gold-400 shadow-[0_0_30px_rgba(201,162,83,0.5)]"
                  }`}>
                    <span className="text-xl font-serif font-bold text-white leading-none">
                      {activeChakra === "root" && "LAM"}
                      {activeChakra === "heart" && "YAM"}
                      {activeChakra === "third-eye" && "OM"}
                      {activeChakra === "crown" && "AH"}
                    </span>
                    <span className="text-[8px] font-mono uppercase tracking-widest text-gold-300 block mt-1">
                      {activeChakra === "root" && "396 Hz"}
                      {activeChakra === "heart" && "528 Hz"}
                      {activeChakra === "third-eye" && "741 Hz"}
                      {activeChakra === "crown" && "963 Hz"}
                    </span>
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <h5 className="font-serif italic text-sm text-gold-100">
                    {activeChakra === "root" && "Muladhara Base Grounding"}
                    {activeChakra === "heart" && "Anahata Heart Restoration"}
                    {activeChakra === "third-eye" && "Ajna Intuitive Clarity"}
                    {activeChakra === "crown" && "Sahasrara Pure Consciousness"}
                  </h5>
                  <span className="text-[9px] text-sage-400 font-mono uppercase tracking-widest block mt-1">Spinal Solfeggio Resonator</span>
                </div>
              </motion.div>
            )}

            {/* 4. MEDITATION RIPPLE RINGS */}
            {activeMode === "ripple" && (
              <motion.div
                key="ripple-aid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer select-none"
                onClick={handleRippleClick}
              >
                {/* Visual lake surface boundary label */}
                <div className="absolute top-4 left-4 text-left pointer-events-none">
                  <span className="text-[9px] font-mono tracking-widest uppercase text-gold-400/60 block">Manasarovar Lake Chamber</span>
                  <span className="text-[8px] text-sage-500 font-mono block">Tap anywhere to release tension waves</span>
                </div>

                {/* Simulated center floating stone pad */}
                <div className="w-16 h-16 rounded-full bg-[#131a14] border border-gold-500/20 shadow-inner flex items-center justify-center relative pointer-events-none">
                  <div className="w-5 h-5 rounded-full bg-gold-400 animate-pulse" />
                  <span className="absolute text-[9px] font-serif font-semibold text-gold-200 mt-10">ॐ</span>
                </div>

                {/* Concentric ripples triggered by click */}
                {ripples.map((rip) => (
                  <div
                    key={rip.id}
                    className="absolute rounded-full border border-gold-300/40 pointer-events-none"
                    style={{
                      left: rip.x,
                      top: rip.y,
                      width: "160px",
                      height: "160px",
                      marginLeft: "-80px",
                      marginTop: "-80px",
                      animation: "ripple-out 4s cubic-bezier(0.1,0.5,0.3,1) forwards",
                    }}
                  />
                ))}

                <div className="absolute bottom-6 text-center pointer-events-none">
                  <p className="text-[10px] text-sage-300 italic font-serif">"The water remains calm because you choose not to grasp the ripples."</p>
                </div>
              </motion.div>
            )}

            {/* 5. RISING INCENSE SMOKE */}
            {activeMode === "smoke" && (
              <motion.div
                key="smoke-aid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-end pb-12 overflow-hidden"
              >
                {/* Physical Incense Stick container */}
                <div className="relative w-full h-80 flex flex-col items-center justify-end pointer-events-none">
                  
                  {/* Smoke particles floating up (different delays and offsets) */}
                  <div className="absolute bottom-20 left-[calc(50%-3px)] w-2.5 h-2.5 rounded-full bg-white/10 blur-[3px] animate-smoke-rise" style={{ animationDelay: "0s" }} />
                  <div className="absolute bottom-20 left-[calc(50%-1px)] w-3 h-3 rounded-full bg-white/8 blur-[4px] animate-smoke-rise" style={{ animationDelay: "1.5s", left: "51%" }} />
                  <div className="absolute bottom-20 left-[calc(50%-4px)] w-2 h-2 rounded-full bg-white/15 blur-[2.5px] animate-smoke-rise" style={{ animationDelay: "3s", left: "49%" }} />
                  <div className="absolute bottom-20 left-[calc(50%-2px)] w-3.5 h-3.5 rounded-full bg-white/6 blur-[5px] animate-smoke-rise" style={{ animationDelay: "4.5s", left: "50.5%" }} />

                  {/* Red-hot burning incense tip */}
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping shadow-[0_0_8px_#f59e0b] z-20" />
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-600 shadow-[0_0_4px_#d97706] z-10 -mt-1.5" />

                  {/* Incense wooden stick */}
                  <div className="w-0.5 h-36 bg-amber-900/60 rounded-full" />
                  
                  {/* Brass or stone stick-holder block */}
                  <div className="w-10 h-3 bg-stone-700 rounded-lg shadow-md border-t border-stone-600" />
                </div>

                <div className="mt-4 text-center z-10">
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-gold-400 block">Lit Incense</span>
                  <h5 className="font-serif font-bold text-sm text-white capitalize">{incenseType} Blend</h5>
                  <p className="text-[10px] text-sage-300 font-sans italic mt-1 leading-relaxed">
                    {incenseType === "sandalwood" && "Sandalwood triggers calming receptors in the prefrontal cortex."}
                    {incenseType === "frankincense" && "Frankincense resin elevates oxygenation in the brain stem."}
                    {incenseType === "jasmine" && "Jasmine flower essence settles nervous chest contractions."}
                  </p>
                </div>
              </motion.div>
            )}

            {/* 6. AURA / HALO BREATHING GLOW */}
            {activeMode === "aura" && (
              <motion.div
                key="aura-aid"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center relative w-full h-full"
              >
                <div className="relative w-52 h-52 flex items-center justify-center">
                  
                  {/* Breathing glowing aura ring background */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-gold-500/20 via-amber-400/8 to-transparent blur-xl animate-aura-breathe" />
                  
                  {/* Secondary thin golden aura shell */}
                  <div className="absolute inset-4 rounded-full border border-gold-300/10 animate-aura-breathe" style={{ animationDelay: "2s" }} />

                  {/* Meditating Buddha Vector Silhouette in the center */}
                  <svg className="w-32 h-32 text-gold-300/80 z-10 relative" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Head / halo */}
                    <circle cx="50" cy="30" r="10" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="50" cy="30" r="16" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
                    {/* Spinal channel lines */}
                    <path d="M50 40 L50 80" stroke="currentColor" strokeWidth="1" opacity="0.5" />
                    {/* Torso / Sitting posture outlines */}
                    <path d="M50 40 Q40 50 32 60 Q30 70 30 80 L70 80 Q70 70 68 60 Q60 50 50 40 Z" stroke="currentColor" strokeWidth="1.5" fill="#1c221d" />
                    {/* Folded meditative legs */}
                    <path d="M22 80 C22 86, 35 88, 50 88 C65 88, 78 86, 78 80 C78 74, 65 74, 50 74 C35 74, 22 74, 22 80 Z" stroke="currentColor" strokeWidth="2" fill="#252d26" />
                    {/* Clasping hands (Dhyana Mudra) */}
                    <circle cx="50" cy="72" r="5" stroke="currentColor" strokeWidth="1" fill="#1c221d" />
                  </svg>
                </div>

                <div className="mt-6 text-center">
                  <h5 className="font-serif italic text-sm text-gold-100">Prabhamandala Aura Lock</h5>
                  <p className="text-[9px] text-sage-400 font-mono uppercase tracking-widest mt-1">Symmetrical Coherence Breathing Anchor</p>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
