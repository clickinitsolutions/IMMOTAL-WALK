import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sun, Heart, Anchor, ShieldAlert } from "lucide-react";

export interface PresenceCardProps {
  sanskrit: string;
  title: string;
  subtitle: string;
  meridian: string;
  desc: string;
  image: string;
  color: string;
  icon: any;
}

export const PRESENCE_DATA: PresenceCardProps[] = [
  {
    sanskrit: "गोमुखासन",
    title: "Gomukhasana",
    subtitle: "Cow Face Posture",
    meridian: "Anahata (Heart Meridian) Alignment",
    desc: "Unlocks heavy chest congestion, relieves stress points in hips, and creates a perfectly symmetrical alignment for the respiratory system.",
    image: "https://i.pinimg.com/736x/52/6b/23/526b2388d24c122ce5815ff42f81d241.jpg",
    color: "from-pink-500/10 to-sage-900/40",
    icon: Heart
  },
  {
    sanskrit: "वृक्षासन",
    title: "Vrikshasana",
    subtitle: "The Balancing Tree",
    meridian: "Muladhara (Root Red Support) Chakra",
    desc: "Calibrates unshakeable mental stability, strengthens the central spine axis, and aligns gravitational support lines straight into the core.",
    image: "https://i.pinimg.com/736x/94/44/a9/9444a9fdbdecf706160227eab7b18ed7.jpg",
    color: "from-emerald-500/10 to-sage-900/40",
    icon: Anchor
  },
  {
    sanskrit: "पद्मासन",
    title: "Padmasana",
    subtitle: "The Sacred Lotus Seat",
    meridian: "Sushumna Nadi (Central Meridian Channel)",
    desc: "The supreme seat for deep non-dual dhyana. Anchors pelvic energies and funnels pranic life-forces straight to the higher cerebral cortex.",
    image: "https://i.pinimg.com/736x/b4/58/6e/b4586e776769e07110a3cd1e158ed9e9.jpg",
    color: "from-blue-500/10 to-sage-900/40",
    icon: Sun
  }
];

export default function PresenceCard3D({ item, index }: { item: PresenceCardProps; index: number; key?: string | number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState("");
  const [glowStyle, setGlowStyle] = useState({ opacity: 0, x: 0, y: 0 });
  const [showMeridians, setShowMeridians] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Tilt calculations (max 18 degrees)
    const rX = -((mouseY / height) - 0.5) * 20;
    const rY = ((mouseX / width) - 0.5) * 20;
    
    setTiltStyle(`rotateX(${rX}deg) rotateY(${rY}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlowStyle({
      opacity: 0.15,
      x: mouseX,
      y: mouseY
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle("rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setGlowStyle({ opacity: 0, x: 0, y: 0 });
    setShowMeridians(false);
  };

  const IconComponent = item.icon;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setShowMeridians(!showMeridians)}
      style={{
        transform: tiltStyle,
        transition: "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)",
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
      className="bg-white rounded-3xl border border-sage-200/60 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between cursor-pointer h-[460px] relative"
    >
      
      {/* Dynamic 3D mouse glow */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(180px circle at ${glowStyle.x}px ${glowStyle.y}px, rgba(217,119,6,0.18), transparent 80%)`,
          opacity: glowStyle.opacity
        }}
      />

      <div className="relative h-56 overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out filter brightness-95 group-hover:brightness-100"
        />
        
        {/* Sanskrit & Category overlay badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono font-semibold uppercase text-sage-900 tracking-wider shadow-2xs border border-white/40">
            {item.sanskrit}
          </span>
        </div>

        <div className="absolute bottom-4 right-4">
          <div className="w-10 h-10 rounded-full bg-sage-900/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
            <IconComponent className="w-4 h-4 text-gold-300" />
          </div>
        </div>

        {/* Dynamic Prana / Meridian lines mapping simulation overlay */}
        <AnimatePresence>
          {showMeridians && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-sage-950/85 backdrop-blur-xs flex flex-col justify-center p-6 text-center text-white z-20 space-y-3"
            >
              <span className="text-[10px] font-mono text-gold-400 uppercase tracking-widest block">PRANA FLOW CHANNELS</span>
              <h4 className="text-md font-sans font-semibold text-white tracking-tight">{item.meridian}</h4>
              <p className="text-[11px] font-sans text-stone-300 leading-relaxed font-light">
                This posture engages specific micro-meridians, directing structural gravity to trigger steady parasympathetic feedback in the central column.
              </p>
              <div className="text-[9px] font-mono text-gold-300/80 pt-1.5 animate-pulse">
                Click to return to physical form view
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-6 flex flex-col justify-between flex-1 bg-gradient-to-b from-white to-sage-50/25">
        <div className="space-y-2 transform translate-z-[20px]">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono text-sage-500 uppercase tracking-widest">
              {item.subtitle}
            </span>
            <h3 className="text-xl font-serif font-bold text-sage-950 tracking-tight group-hover:text-gold-700 transition-colors">
              {item.title}
            </h3>
          </div>
          <p className="text-sage-700 text-xs leading-relaxed font-light line-clamp-3">
            {item.desc}
          </p>
        </div>

        <div className="pt-4 border-t border-sage-100 flex justify-between items-center text-[10px] font-mono text-sage-500">
          <span className="group-hover:text-sage-800 transition-colors">Click card to view Prana Map</span>
          <span className="text-gold-600 font-bold group-hover:translate-x-1 transition-transform">Interactive →</span>
        </div>
      </div>

    </div>
  );
}
