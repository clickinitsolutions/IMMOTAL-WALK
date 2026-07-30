import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Activity, Eye, RefreshCw, Zap, Compass, Moon } from "lucide-react";

export default function ThreeDActiveIcons() {
  const [activeIcon, setActiveIcon] = useState<"yoga" | "meditation">("yoga");
  
  // Custom Tilt Ref states for the two containers
  const yogaRef = useRef<HTMLDivElement>(null);
  const medRef = useRef<HTMLDivElement>(null);
  const [yogaTilt, setYogaTilt] = useState("rotateX(0deg) rotateY(0deg)");
  const [medTilt, setMedTilt] = useState("rotateX(0deg) rotateY(0deg)");
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, type: "yoga" | "meditation") => {
    const ref = type === "yoga" ? yogaRef : medRef;
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Max 15 degree rotation
    const rX = -((mouseY / height) - 0.5) * 24;
    const rY = ((mouseX / width) - 0.5) * 24;
    
    const tiltString = `rotateX(${rX}deg) rotateY(${rY}deg) scale3d(1.02, 1.02, 1.02)`;
    if (type === "yoga") setYogaTilt(tiltString);
    else setMedTilt(tiltString);
  };

  const handleMouseLeave = (type: "yoga" | "meditation") => {
    if (type === "yoga") setYogaTilt("rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    else setMedTilt("rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  return (
    <div className="bg-white/80 border border-sage-100/80 rounded-3xl p-8 shadow-xs relative overflow-hidden">
      {/* Background radial soft aura */}
      <div className="absolute inset-0 bg-[radial-gradient(#eedcbe_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
      
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Descriptive Text Column */}
        <div className="lg:max-w-md space-y-6 text-left">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-gold-700 block">
              Contemplative Biomechanics
            </span>
            <h3 className="text-3xl font-serif font-bold text-sage-950 tracking-tight leading-tight">
              Interactive 3D Lineage Icons
            </h3>
            <p className="text-sage-600 text-xs leading-relaxed">
              Experience the physical and energetic alignments of classical tapovan practices. Toggle and tilt the tactile 3D models to reveal prana pathways, chakra points, and cortical frequencies.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setActiveIcon("yoga")}
              className={`px-5 py-2.5 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeIcon === "yoga"
                  ? "bg-[#5c6f59] text-white shadow-sm"
                  : "bg-sage-50 text-sage-600 hover:bg-sage-100"
              }`}
            >
              3D Yoga Posture Icon
            </button>
            <button
              onClick={() => setActiveIcon("meditation")}
              className={`px-5 py-2.5 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeIcon === "meditation"
                  ? "bg-[#5c6f59] text-white shadow-sm"
                  : "bg-sage-50 text-sage-600 hover:bg-sage-100"
              }`}
            >
              3D Meditation Aura Icon
            </button>
          </div>

          <div className="border-t border-sage-100 pt-5 space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-gold-50 border border-gold-200/30 flex items-center justify-center shrink-0">
                <Compass className="w-4 h-4 text-gold-600" />
              </div>
              <div>
                <h5 className="text-xs font-sans font-semibold text-sage-900">Tactile Micro-Control</h5>
                <p className="text-[11px] text-sage-500 leading-normal mt-0.5">Move your cursor directly over either icon model to tilt, rotate, and interact with the 3D projection planes.</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-sage-50 border border-sage-200/30 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4 text-[#5c6f59]" />
              </div>
              <div>
                <h5 className="text-xs font-sans font-semibold text-sage-900">Biomechanical Resonance</h5>
                <p className="text-[11px] text-sage-500 leading-normal mt-0.5">Watch real-time physiological response projections calibrate instantly as postures and focus layers shift.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Visual Model Stage Column */}
        <div className="flex-1 w-full flex items-center justify-center min-h-[380px]">
          <AnimatePresence mode="wait">
            {activeIcon === "yoga" ? (
              <motion.div
                key="yoga-3d-stage"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                ref={yogaRef}
                onMouseMove={(e) => handleMouseMove(e, "yoga")}
                onMouseLeave={() => handleMouseLeave("yoga")}
                style={{
                  transform: yogaTilt,
                  transition: "transform 0.15s ease-out",
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
                className="w-full max-w-[340px] aspect-square rounded-3xl bg-gradient-to-br from-sage-950 to-stone-900 p-6 text-white shadow-lg relative border border-white/10 flex flex-col justify-between overflow-hidden cursor-grab active:cursor-grabbing"
              >
                {/* 3D grid line overlays */}
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
                <div className="absolute top-4 left-4 flex justify-between items-center w-[90%]">
                  <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase">YOGA POSTURE MODULE</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">LIVE POSTURE</span>
                </div>

                {/* Main Interactive 3D Skeleton Figure Representation */}
                <div className="flex-1 flex items-center justify-center relative my-4">
                  {/* Outer Concentric Glowing Rings */}
                  <div className="absolute w-48 h-48 rounded-full border border-gold-400/15 animate-spin" style={{ animationDuration: "35s" }} />
                  <div className="absolute w-40 h-40 rounded-full border border-white/5 animate-spin" style={{ animationDuration: "20s", animationDirection: "reverse" }} />
                  <div className="absolute w-24 h-24 rounded-full bg-gold-600/5 blur-xl" />

                  {/* Layered Posture Outline Representation */}
                  <svg viewBox="0 0 100 100" className="w-40 h-40 drop-shadow-[0_4px_12px_rgba(217,119,6,0.3)] z-10">
                    {/* Head */}
                    <circle cx="50" cy="20" r="4.5" fill="#fcd34d" className="animate-pulse" />
                    {/* Spine Channel */}
                    <line x1="50" y1="24.5" x2="50" y2="70" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="1 1.5" />
                    {/* Heart Chakra pulse */}
                    <circle cx="50" cy="45" r="3" fill="#10b981" />
                    <circle cx="50" cy="45" r="6" fill="none" stroke="#10b981" strokeWidth="0.5" className="animate-ping" style={{ transformOrigin: "50px 45px" }} />
                    {/* Third Eye dot */}
                    <circle cx="50" cy="22" r="1.5" fill="#6366f1" />
                    {/* Crown Star */}
                    <path d="M 50 11 L 51 14 L 54 15 L 51 16 L 50 19 L 49 16 L 46 15 L 49 14 Z" fill="#d946ef" className="animate-pulse" />

                    {/* Torso Alignment */}
                    <line x1="32" y1="36" x2="68" y2="36" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                    {/* Left Arm extended in Warrior pose style */}
                    <line x1="32" y1="36" x2="16" y2="36" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="16" cy="36" r="1.5" fill="#fcd34d" />
                    {/* Right Arm angled beautifully */}
                    <line x1="68" y1="36" x2="80" y2="24" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="80" cy="24" r="1.5" fill="#fcd34d" />

                    {/* Hip axis */}
                    <line x1="40" y1="70" x2="60" y2="70" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                    {/* Left Leg grounded */}
                    <line x1="40" y1="70" x2="35" y2="92" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                    {/* Right Leg bent inward (Tree Pose alignment) */}
                    <line x1="60" y1="70" x2="68" y2="82" stroke="#ffffff" strokeWidth="1.5" />
                    <line x1="68" y1="82" x2="50" y2="82" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="50" cy="82" r="2" fill="#d97706" />
                  </svg>
                </div>

                {/* Bio Data readout parameters */}
                <div className="z-10 bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10 space-y-2 text-left">
                  <div className="flex justify-between items-center text-[10px] font-mono text-stone-300">
                    <span>SPINE DEVIATION</span>
                    <span className="text-emerald-400 font-bold">0.02% (PERFECT)</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-stone-300">
                    <span>SUSHUMNA NADI RESONANCE</span>
                    <span className="text-amber-400 font-bold">98.4% LEVEL</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-stone-300">
                    <span>CHAKRA FLOW</span>
                    <span className="text-fuchsia-400 font-bold">ANAHATA OPEN</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="meditation-3d-stage"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                ref={medRef}
                onMouseMove={(e) => handleMouseMove(e, "meditation")}
                onMouseLeave={() => handleMouseLeave("meditation")}
                style={{
                  transform: medTilt,
                  transition: "transform 0.15s ease-out",
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
                className="w-full max-w-[340px] aspect-square rounded-3xl bg-gradient-to-br from-stone-900 to-[#182a1b] p-6 text-white shadow-lg relative border border-white/10 flex flex-col justify-between overflow-hidden cursor-grab active:cursor-grabbing"
              >
                {/* 3D grid line overlays */}
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
                <div className="absolute top-4 left-4 flex justify-between items-center w-[90%]">
                  <span className="text-[10px] font-mono tracking-widest text-gold-400 uppercase">MEDITATION DHYANA MODULE</span>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">AURA FIELD</span>
                </div>

                {/* Concentric breath wave interactive element */}
                <div className="flex-1 flex items-center justify-center relative my-4">
                  {/* Glowing core field */}
                  <motion.div
                    animate={{
                      scale: [0.85, 1.25, 0.85],
                      opacity: [0.2, 0.55, 0.2]
                    }}
                    transition={{
                      duration: 5.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="absolute w-36 h-36 rounded-full bg-radial from-amber-500/25 to-transparent blur-md pointer-events-none"
                  />
                  
                  {/* Floating geometric sacred geometry wireframe */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute w-44 h-44 border border-dashed border-gold-300/15 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                    className="absolute w-36 h-36 border border-white/10 rounded-full flex items-center justify-center"
                  >
                    <div className="w-28 h-28 border border-dashed border-white/5 rounded-full" />
                  </motion.div>

                  {/* Concentric Golden Lotus Ring */}
                  <motion.div
                    animate={{
                      y: [-4, 4, -4],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="z-10 flex flex-col items-center justify-center text-center space-y-1.5"
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-b from-amber-500/20 to-gold-600/40 border border-gold-400/40 flex items-center justify-center text-gold-300 shadow-md">
                      <Moon className="w-6 h-6 animate-pulse" />
                    </div>
                    <span className="text-[14px] font-serif tracking-widest text-gold-200 mt-2 block font-medium">ध्यान</span>
                  </motion.div>
                </div>

                {/* Biological resonance tracking stats */}
                <div className="z-10 bg-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10 space-y-2 text-left">
                  <div className="flex justify-between items-center text-[10px] font-mono text-stone-300">
                    <span>CORTICAL ALPHA SYNC</span>
                    <span className="text-amber-400 font-bold">9.8 HZ (DEEP CALM)</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-stone-300">
                    <span>MENTAL CLUTTER COEFFICIENT</span>
                    <span className="text-emerald-400 font-bold">-87.5% LOWERED</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-stone-300">
                    <span>COGNITIVE FLOW COHERENCE</span>
                    <span className="text-fuchsia-400 font-bold">OPTIMAL</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
