import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Volume2, 
  Compass, 
  Moon, 
  Feather, 
  BookOpen, 
  RotateCw,
  Layers,
  Fingerprint
} from "lucide-react";

export interface GalleryItem {
  id: string;
  name: string;
  sanskrit: string;
  image: string;
  quote: string;
  energyCenter: string;
  colorTheme: {
    bg: string;
    text: string;
    border: string;
    glow: string;
    gradient: string;
  };
  details: string;
}

export const SACRED_PINS: GalleryItem[] = [
  {
    id: "sandstone-dhyana",
    name: "Sandstone Dhyana State",
    sanskrit: "ॐ शांत ध्यानम",
    image: "https://i.pinimg.com/736x/a9/78/34/a97834dfd7f4d5e1fb6973111b5994d2.jpg",
    quote: "No matter how hard the past, you can always begin again.",
    energyCenter: "Anahata (Heart Meridian)",
    colorTheme: {
      bg: "from-emerald-950/40 to-stone-900/40",
      text: "text-emerald-300",
      border: "border-emerald-500/20",
      glow: "rgba(16,185,129,0.15)",
      gradient: "from-emerald-500/20 via-teal-500/5 to-transparent"
    },
    details: "Hand-sculpted sandstone capturing the pristine stillness of deep samadhi. The downcast eyes signify perfect introversion, radiating absolute peace."
  },
  {
    id: "marble-aureole",
    name: "Marble Aureole Light",
    sanskrit: "ॐ ज्योति आभा",
    image: "https://i.pinimg.com/736x/94/44/a9/9444a9fdbdecf706160227eab7b18ed7.jpg",
    quote: "A disciplined mind brings happiness.",
    energyCenter: "Ajna (Third Eye / Insight)",
    colorTheme: {
      bg: "from-amber-950/40 to-stone-900/40",
      text: "text-amber-300",
      border: "border-amber-500/20",
      glow: "rgba(245,158,11,0.18)",
      gradient: "from-amber-500/20 via-yellow-500/5 to-transparent"
    },
    details: "Representing pure illumination, carved in sacred white Makrana marble. The concentric halos express the infinite radiating fields of conscious awareness."
  },
  {
    id: "antique-patina",
    name: "Antique Patina Bronze",
    sanskrit: "ॐ अनंत सत्यम",
    image: "https://i.pinimg.com/736x/b4/58/6e/b4586e776769e07110a3cd1e158ed9e9.jpg",
    quote: "The root of suffering is attachment.",
    energyCenter: "Vishuddha (Thyroid / Expression)",
    colorTheme: {
      bg: "from-teal-950/40 to-stone-900/40",
      text: "text-teal-300",
      border: "border-teal-500/20",
      glow: "rgba(20,184,166,0.15)",
      gradient: "from-teal-500/20 via-cyan-500/5 to-transparent"
    },
    details: "Weathered by the sands of time, this ancient bronze relic exhibits deep spiritual resilience. Its oxidized patina holds centuries of silent prayers."
  },
  {
    id: "noble-visage",
    name: "Noble Contemplation",
    sanskrit: "ॐ शांत विलोचन",
    image: "https://i.pinimg.com/736x/52/6b/23/526b2388d24c122ce5815ff42f81d241.jpg",
    quote: "Health is the greatest gift, contentment the greatest wealth.",
    energyCenter: "Muladhara (Root / Presence)",
    colorTheme: {
      bg: "from-sage-950/40 to-stone-900/40",
      text: "text-stone-300",
      border: "border-stone-500/20",
      glow: "rgba(139,92,26,0.12)",
      gradient: "from-stone-500/20 via-stone-400/5 to-transparent"
    },
    details: "A classic representation of lineage wisdom, focused entirely on internal grounding and the absolute non-dual nature of existence."
  },
  {
    id: "golden-siddha",
    name: "Golden Siddha Devotion",
    sanskrit: "ॐ सिद्धाय नमः",
    image: "https://i.pinimg.com/736x/b2/40/20/b240202a0b48a98eb784837526cb353f.jpg",
    quote: "To live a pure unselfish life, one must count nothing as one's own.",
    energyCenter: "Sahasrara (Crown / Transcendence)",
    colorTheme: {
      bg: "from-yellow-950/45 to-stone-900/40",
      text: "text-yellow-200",
      border: "border-yellow-500/25",
      glow: "rgba(234,179,8,0.2)",
      gradient: "from-yellow-500/25 via-amber-500/5 to-transparent"
    },
    details: "Shimmering with authentic gold-leaf overlays. This deity figure embodies the fully integrated master who is awake to the self-luminous reality."
  },
  {
    id: "infinite-grace",
    name: "Infinite Grace Statue",
    sanskrit: "ॐ कृपा असीम",
    image: "https://i.pinimg.com/736x/a3/36/8b/a3368bb5b0cb76008788b15a3a1b8772.jpg",
    quote: "There is no path to happiness: happiness is the path.",
    energyCenter: "Manipura (Solar Plexus / Will)",
    colorTheme: {
      bg: "from-gold-950/40 to-stone-900/40",
      text: "text-amber-200",
      border: "border-amber-500/20",
      glow: "rgba(217,119,6,0.16)",
      gradient: "from-amber-600/20 via-yellow-600/5 to-transparent"
    },
    details: "The compassionate glance of the infinite, offering absolute refuge. It channels the sun-center (Manipura) for balanced will and grace."
  },
  {
    id: "eternal-witness",
    name: "Eternal Witness Stone",
    sanskrit: "ॐ साक्षी सनातन",
    image: "https://i.pinimg.com/736x/52/4d/fc/524dfc8580a82c1181233f1dece8b43d.jpg",
    quote: "Conquer yourself and you conquer the world.",
    energyCenter: "Svadhishthana (Sacral / Vitality)",
    colorTheme: {
      bg: "from-rose-950/40 to-stone-900/40",
      text: "text-rose-300",
      border: "border-rose-500/20",
      glow: "rgba(244,63,94,0.12)",
      gradient: "from-rose-500/20 via-orange-500/5 to-transparent"
    },
    details: "Standing resiliently in the elements, this granite icon represents the timeless and indestructible presence of the Inner Witness."
  },
  {
    id: "samadhi-stillness",
    name: "Samadhi Infinite Stillness",
    sanskrit: "ॐ समाधि शून्यता",
    image: "https://i.pinimg.com/736x/a9/05/67/a905674c4544a886d38657dba8b8b055.jpg",
    quote: "How gently you lived, and how gracefully you let go.",
    energyCenter: "Sushumna (Central Channel)",
    colorTheme: {
      bg: "from-violet-950/40 to-stone-900/40",
      text: "text-violet-300",
      border: "border-violet-500/20",
      glow: "rgba(139,92,246,0.15)",
      gradient: "from-violet-500/20 via-purple-500/5 to-transparent"
    },
    details: "Perfect, boundless silence in physical form. Its visual balance encourages instant meditative absorption in the watcher."
  }
];

interface SacredGallery3DProps {
  layoutType: "circular-carousel" | "parallax-deck" | "sacred-grid";
  sectionTitle?: string;
  sectionSubtitle?: string;
}

export default function SacredGallery3D({ 
  layoutType = "circular-carousel",
  sectionTitle = "Sanctuary Devotional Portals",
  sectionSubtitle = "Direct transmission forms of the lineage, captured in pure light"
}: SacredGallery3DProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [audioHint, setAudioHint] = useState<string | null>(null);

  // Screen width tracking for flat panoramic slider
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getVisibleCount = () => {
    if (windowWidth >= 1024) return 4;
    if (windowWidth >= 768) return 3;
    if (windowWidth >= 640) return 2;
    return 1;
  };

  const visibleCount = getVisibleCount();
  const maxStartIndex = Math.max(0, SACRED_PINS.length - visibleCount);

  // Sound generator
  const playSound = (freq: number) => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 1.2);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch (e) {
      // Audio fallback
    }
  };

  const handleNext = () => {
    if (layoutType === "circular-carousel") {
      const nextIndex = startIndex >= maxStartIndex ? 0 : startIndex + 1;
      setStartIndex(nextIndex);
      setActiveIndex(nextIndex);
    } else {
      setActiveIndex((prev) => (prev + 1) % SACRED_PINS.length);
    }
    playSound(261.63); // C4 Note
  };

  const handlePrev = () => {
    if (layoutType === "circular-carousel") {
      const prevIndex = startIndex <= 0 ? maxStartIndex : startIndex - 1;
      setStartIndex(prevIndex);
      setActiveIndex(prevIndex);
    } else {
      setActiveIndex((prev) => (prev - 1 + SACRED_PINS.length) % SACRED_PINS.length);
    }
    playSound(196.00); // G3 Note
  };

  // Card Mouse Move Tilt Effect
  const TiltCard = ({ item, index, isFocused = false }: { item: GalleryItem; index: number; isFocused?: boolean }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [tiltStyle, setTiltStyle] = useState("");

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left - width / 2;
      const mouseY = e.clientY - rect.top - height / 2;
      
      // Calculate angles (max 15 degrees)
      const rX = -(mouseY / height) * 18;
      const rY = (mouseX / width) * 18;
      
      setTiltStyle(`rotateX(${rX}deg) rotateY(${rY}deg) scale3d(1.03, 1.03, 1.03)`);
    };

    const handleMouseLeave = () => {
      setTiltStyle("rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    };

    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          setSelectedItem(item);
          playSound(329.63); // E4 Note
        }}
        style={{
          transform: tiltStyle,
          transition: "transform 0.15s cubic-bezier(0.25, 1, 0.5, 1)",
          transformStyle: "preserve-3d",
          perspective: "1000px"
        }}
        className={`group relative aspect-[3/4] rounded-2xl overflow-hidden border cursor-pointer bg-stone-950 shadow-xl transition-all duration-500 ${
          isFocused ? "border-gold-500/60 shadow-[0_0_30px_rgba(217,119,6,0.15)]" : "border-stone-800/60"
        }`}
      >
        {/* Visual Glow overlay */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${item.colorTheme.glow}, transparent 40%)`
          }}
        />

        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 filter brightness-[0.9] group-hover:brightness-100 contrast-[1.02]"
          referrerPolicy="no-referrer"
        />

        {/* Dynamic Vignette Gradient based on Theme */}
        <div className={`absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500`} />

        {/* Inner Content using 3D translation layers */}
        <div className="absolute inset-x-0 bottom-0 p-5 z-20 flex flex-col gap-2 transform translate-z-[40px] transition-transform duration-300">
          <span className={`text-[10px] uppercase font-mono tracking-widest ${item.colorTheme.text} font-semibold flex items-center gap-1.5`}>
            <Feather className="w-3 h-3 animate-pulse text-gold-400" />
            {item.energyCenter}
          </span>
          <div>
            <h3 className="font-sans text-lg font-bold text-white tracking-tight leading-tight group-hover:text-gold-100 transition-colors">
              {item.name}
            </h3>
            <p className="text-[11px] font-sans text-stone-300 italic font-light line-clamp-1 mt-1 opacity-90">
              "{item.quote}"
            </p>
          </div>
          
          <div className="pt-2 border-t border-stone-800/80 flex justify-between items-center text-[9px] font-mono text-stone-400">
            <span>{item.sanskrit}</span>
            <span className="text-gold-400 font-bold group-hover:translate-x-1 transition-transform">Explore Portal →</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-stone-950 to-stone-900 border-t border-stone-800/40 w-full">
      
      {/* Absolute Ambient Background Lights based on Active Index */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-[140px] opacity-[0.08] transition-all duration-1000"
          style={{ backgroundColor: SACRED_PINS[activeIndex].colorTheme.glow.replace("0.15", "0.6").replace("0.18", "0.6").replace("0.2", "0.6") }}
        />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-stone-700/30 to-transparent" />
      </div>

      <div className="w-full max-w-[1800px] mx-auto relative z-10">
        
        {/* Elegant Display Section Header */}
        <div className="text-center mb-16 space-y-3">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] font-mono tracking-[0.3em] text-gold-400 uppercase font-semibold flex items-center justify-center gap-2"
          >
            <span className="w-6 h-px bg-gold-400/50" />
            Sacred Darshan Presence
            <span className="w-6 h-px bg-gold-400/50" />
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-sans font-light tracking-tight text-white"
          >
            {sectionTitle}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-stone-400 font-light text-sm max-w-2xl mx-auto"
          >
            {sectionSubtitle}
          </motion.p>
          
          {/* Audio Resonance switch */}
          <div className="flex justify-center pt-2">
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                setAudioHint(soundEnabled ? null : "Resonance chime enabled. Explore statues to hear vibrational frequencies.");
                if (!soundEnabled) {
                  setTimeout(() => setAudioHint(null), 5000);
                }
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[10px] font-mono uppercase tracking-widest transition-all ${
                soundEnabled 
                  ? "bg-gold-500/20 text-gold-200 border border-gold-500/40" 
                  : "bg-stone-900 text-stone-400 border border-stone-800/50 hover:text-white"
              }`}
            >
              <Volume2 className={`w-3.5 h-3.5 ${soundEnabled ? "animate-bounce" : ""}`} />
              <span>Solfeggio Soundscape: {soundEnabled ? "On" : "Off"}</span>
            </button>
          </div>
          {audioHint && (
            <motion.p initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-[10px] font-mono text-gold-300/80 animate-pulse mt-2">
              {audioHint}
            </motion.p>
          )}
        </div>

        {/* -------------------- VARIANT 1: FLAT FULL-WIDTH CAROUSEL (3-4 CARDS VISIBLE) -------------------- */}
        {layoutType === "circular-carousel" && (
          <div className="relative py-8 flex flex-col items-center w-full overflow-hidden">
            
            {/* Slider track container */}
            <div className="w-full overflow-hidden relative px-1 py-4">
              <motion.div
                className="flex gap-6 w-full"
                animate={{
                  x: `calc(-${startIndex} * (100% + ${visibleCount > 1 ? 24 : 0}px) / ${visibleCount})`
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              >
                {SACRED_PINS.map((item, index) => {
                  const isVisible = index >= startIndex && index < startIndex + visibleCount;
                  return (
                    <div
                      key={item.id}
                      className="w-full sm:w-[calc((100%-24px)/2)] md:w-[calc((100%-48px)/3)] lg:w-[calc((100%-72px)/4)] shrink-0 transition-all duration-500"
                      style={{
                        opacity: isVisible ? 1 : 0.45,
                        transform: isVisible ? "scale(1)" : "scale(0.96)",
                      }}
                    >
                      <TiltCard item={item} index={index} isFocused={isVisible} />
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Intuitive Controls with Active Quote Display */}
            <div className="mt-10 flex flex-col items-center gap-6 w-full text-center z-20">
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrev}
                  className="w-12 h-12 rounded-full bg-stone-900 border border-stone-800 hover:border-gold-500/50 hover:bg-stone-800 text-stone-300 hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg cursor-pointer"
                  title="Previous Devotional Portal"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                <span className="text-xs font-mono text-stone-500 tracking-wider">
                  <span className="text-gold-400 font-bold">{startIndex + 1}</span> - <span className="text-gold-400 font-bold">{Math.min(startIndex + visibleCount, SACRED_PINS.length)}</span> of {SACRED_PINS.length}
                </span>

                <button
                  onClick={handleNext}
                  className="w-12 h-12 rounded-full bg-stone-900 border border-stone-800 hover:border-gold-500/50 hover:bg-stone-800 text-stone-300 hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg cursor-pointer"
                  title="Next Devotional Portal"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Dynamic lineage quotes panel synced with active state */}
              <motion.div
                key={startIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-stone-950/60 backdrop-blur-md rounded-2xl p-6 border border-stone-800/60 max-w-xl w-full shadow-2xl relative"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-0.5 rounded-full text-[8px] font-mono uppercase tracking-widest bg-stone-900 border border-stone-800 text-gold-400">
                  Lineage transmission
                </div>
                <p className="text-stone-300 text-sm font-sans italic font-light leading-relaxed">
                  "{SACRED_PINS[startIndex].quote}"
                </p>
                <div className="mt-3 flex justify-between items-center text-[10px] font-mono text-stone-500 pt-3 border-t border-stone-900">
                  <span>{SACRED_PINS[startIndex].name}</span>
                  <span className={SACRED_PINS[startIndex].colorTheme.text}>{SACRED_PINS[startIndex].sanskrit}</span>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* -------------------- VARIANT 2: 3D PARALLAX DECK -------------------- */}
        {layoutType === "parallax-deck" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-8">
            
            {/* Visual stacked card deck representing depth layers */}
            <div className="lg:col-span-5 flex justify-center relative min-h-[460px] items-center">
              <div className="relative w-[280px] sm:w-[320px] aspect-[3/4]">
                {SACRED_PINS.map((item, idx) => {
                  const isCurrent = idx === activeIndex;
                  const isBehind = (idx === (activeIndex + 1) % SACRED_PINS.length);
                  const isFarBehind = (idx === (activeIndex + 2) % SACRED_PINS.length);

                  if (!isCurrent && !isBehind && !isFarBehind) return null;

                  let zIndex = 10;
                  let offsetScale = 1;
                  let offsetY = 0;
                  let offsetX = 0;
                  let opacity = 1;
                  let rotate = 0;

                  if (isBehind) {
                    zIndex = 9;
                    offsetScale = 0.93;
                    offsetY = -18;
                    offsetX = 10;
                    opacity = 0.65;
                    rotate = 2;
                  } else if (isFarBehind) {
                    zIndex = 8;
                    offsetScale = 0.86;
                    offsetY = -36;
                    offsetX = 20;
                    opacity = 0.35;
                    rotate = 4;
                  }

                  return (
                    <motion.div
                      key={item.id}
                      animate={{
                        scale: offsetScale,
                        y: offsetY,
                        x: offsetX,
                        opacity,
                        rotate,
                        zIndex
                      }}
                      className="absolute inset-0 cursor-pointer"
                      onClick={() => {
                        if (!isCurrent) {
                          setActiveIndex(idx);
                          playSound(293.66); // D4 Note
                        } else {
                          setSelectedItem(item);
                        }
                      }}
                    >
                      <TiltCard item={item} index={idx} isFocused={isCurrent} />
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Immersive information panel describing the spiritual details of active state */}
            <div className="lg:col-span-7 space-y-6 lg:pl-8">
              <div className="space-y-2">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-widest bg-stone-900 border ${SACRED_PINS[activeIndex].colorTheme.border} ${SACRED_PINS[activeIndex].colorTheme.text}`}>
                  {SACRED_PINS[activeIndex].energyCenter}
                </span>
                <h3 className="text-3xl sm:text-4xl font-sans font-semibold text-white tracking-tight">
                  {SACRED_PINS[activeIndex].name}
                </h3>
                <p className="text-xs font-mono text-stone-500 uppercase tracking-widest">
                  SANSKRIT: <span className="text-gold-400 font-bold">{SACRED_PINS[activeIndex].sanskrit}</span>
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-stone-950/60 border border-stone-800/80 relative overflow-hidden">
                <div 
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 100% 0%, ${SACRED_PINS[activeIndex].colorTheme.glow}, transparent 60%)`
                  }}
                />
                <p className="text-stone-300 font-sans font-light leading-relaxed text-sm">
                  {SACRED_PINS[activeIndex].details}
                </p>
                <div className="mt-5 pt-4 border-t border-stone-900 flex items-center gap-3">
                  <Fingerprint className="w-5 h-5 text-gold-500" />
                  <span className="text-xs font-mono text-stone-400">Authentic Lineage Darshan Portal Integration</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setSelectedItem(SACRED_PINS[activeIndex]);
                    playSound(392.00); // G4 Note
                  }}
                  className="px-6 py-3 rounded-xl bg-gold-600 hover:bg-gold-500 text-stone-950 font-sans font-medium text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-gold-500/20 flex items-center gap-2"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>Expand Sacred Portal</span>
                </button>
                <button
                  onClick={() => {
                    const nextIdx = (activeIndex + 1) % SACRED_PINS.length;
                    setActiveIndex(nextIdx);
                    playSound(440.00); // A4 Note
                  }}
                  className="px-5 py-3 rounded-xl bg-stone-900 border border-stone-800 text-stone-300 hover:text-white font-mono text-xs uppercase tracking-widest transition-all hover:bg-stone-800/60"
                >
                  Cycle Statues
                </button>
              </div>

              {/* Sub-Selector thumbnails bar */}
              <div className="pt-6 border-t border-stone-800/40">
                <p className="text-[10px] font-mono text-stone-500 uppercase tracking-widest mb-3">Lineage Gallery Directory</p>
                <div className="flex flex-wrap gap-2.5">
                  {SACRED_PINS.map((item, idx) => {
                    const isActive = idx === activeIndex;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveIndex(idx);
                          playSound(329.63);
                        }}
                        className={`relative w-12 h-12 rounded-lg overflow-hidden border transition-all duration-300 ${
                          isActive 
                            ? "border-gold-500 ring-2 ring-gold-500/30 scale-110" 
                            : "border-stone-800 opacity-60 hover:opacity-100 hover:scale-105"
                        }`}
                      >
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------- VARIANT 3: SACRED 3D BENTO GRID -------------------- */}
        {layoutType === "sacred-grid" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {SACRED_PINS.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TiltCard item={item} index={index} />
                </motion.div>
              ))}
            </div>

            {/* Aesthetic Bottom Zen Anchor */}
            <div className="rounded-2xl p-8 bg-stone-950 border border-stone-800/80 text-center relative overflow-hidden max-w-4xl mx-auto mt-12">
              <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]" />
              <p className="text-xs font-mono text-gold-500 uppercase tracking-[0.25em] mb-3">Vedic Transmission Note</p>
              <h4 className="text-lg font-sans text-white font-light tracking-wide max-w-2xl mx-auto">
                "Each form of the Buddha is not a mere representation, but a visual portal aligning the mind with distinct energetic wavelengths."
              </h4>
              <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] font-mono text-stone-500">
                <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '20s' }} />
                <span>Lineage Certified Devotional Portals</span>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* -------------------- SACRED DARSHAN EXPANDED DETAIL PORTAL MODAL -------------------- */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/95 backdrop-blur-xl"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div 
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl bg-stone-900 border border-stone-800/80 rounded-3xl overflow-hidden shadow-2xl relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-stone-950/70 border border-stone-800 text-stone-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              >
                ✕
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                
                {/* Left: Beautiful Image Portal with overlay */}
                <div className="relative aspect-square md:aspect-auto md:h-[550px] overflow-hidden bg-stone-950">
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.name} 
                    className="w-full h-full object-cover filter brightness-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle radiating aura ring */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-56 h-56 rounded-full border border-gold-500/10 animate-ping" style={{ animationDuration: '4s' }} />
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-stone-950/80 backdrop-blur-md border border-stone-800/60">
                    <span className="text-[8px] font-mono uppercase tracking-[0.2em] text-gold-400">Linage Darshan URL</span>
                    <p className="text-[10px] font-mono text-stone-400 truncate mt-1">
                      Pinterest Ref: {selectedItem.image.substring(0, 50)}...
                    </p>
                  </div>
                </div>

                {/* Right: Rich detail panel with Sacred Vedic text styling */}
                <div className="p-8 md:p-10 flex flex-col justify-between h-[550px] overflow-y-auto">
                  
                  {/* Category, Title, Mantra */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono uppercase tracking-widest bg-stone-950 border ${selectedItem.colorTheme.border} ${selectedItem.colorTheme.text}`}>
                        {selectedItem.energyCenter}
                      </span>
                      <span className="text-[9px] font-mono text-stone-500">Gautama Series</span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-2xl font-sans font-bold text-white tracking-tight">
                        {selectedItem.name}
                      </h3>
                      <p className="text-xs font-mono text-gold-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                        <Compass className="w-3.5 h-3.5" />
                        Mantra: {selectedItem.sanskrit}
                      </p>
                    </div>

                    <div className="h-px bg-stone-800" />

                    <p className="text-stone-300 font-sans font-light leading-relaxed text-sm">
                      {selectedItem.details}
                    </p>

                    {/* Vedic reflection card */}
                    <div className="p-5 rounded-2xl bg-stone-950/60 border border-stone-800/40 relative">
                      <div className="text-[9px] font-mono uppercase tracking-widest text-stone-500 mb-2">Sacred Lineage Quote</div>
                      <p className="text-stone-200 text-sm italic font-light font-sans">
                        "{selectedItem.quote}"
                      </p>
                    </div>
                  </div>

                  {/* Actions & Verification */}
                  <div className="space-y-4 pt-6 border-t border-stone-800">
                    <div className="flex items-center gap-2 text-[10px] font-mono text-stone-500">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-500 animate-pulse" />
                      <span>Vibrational resonance: 528Hz (Solfeggio Cleansing Key)</span>
                    </div>

                    <div className="flex gap-3">
                      <button 
                        onClick={() => {
                          playSound(528); // Miraculous resonance chime
                          alert("A meditative resonance ripple has been initiated at 528Hz. Absorb the sound internally.");
                        }}
                        className="flex-1 py-3 rounded-xl bg-gold-600 hover:bg-gold-500 text-stone-950 font-sans font-medium text-xs uppercase tracking-wider transition-all shadow-lg text-center cursor-pointer"
                      >
                        Initiate Attunement
                      </button>
                      <button 
                        onClick={() => setSelectedItem(null)}
                        className="px-5 py-3 rounded-xl bg-stone-800 border border-stone-700 text-stone-300 hover:text-white font-mono text-xs uppercase tracking-widest transition-all cursor-pointer"
                      >
                        Close Portal
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
