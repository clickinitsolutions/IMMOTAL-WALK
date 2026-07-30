import React, { useState, useRef, useEffect } from "react";
import { Compass, Eye } from "lucide-react";

interface BuddhaState {
  id: string;
  name: string;
  sanskrit: string;
  bgImage: string;
  buddhaImage: string;
  haloClass: string;
  glowClass: string;
  vignetteClass: string;
  brightnessClass: string;
  contrastClass: string;
  quote: string;
}

const BUDDHA_STATES: BuddhaState[] = [
  {
    id: "sandstone",
    name: "Sandstone Dhyana",
    sanskrit: "ॐ शांत ध्यानम",
    bgImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
    buddhaImage: "https://i.pinimg.com/736x/a9/78/34/a97834dfd7f4d5e1fb6973111b5994d2.jpg",
    haloClass: "border-sage-300/20",
    glowClass: "bg-gold-200/10",
    vignetteClass: "from-white/20 via-transparent to-transparent",
    brightnessClass: "brightness-[0.98]",
    contrastClass: "contrast-[1.02]",
    quote: "The mind is everything. What you think you become."
  },
  {
    id: "marble-halo",
    name: "Marble Aureole Light",
    sanskrit: "ॐ ज्योति आभा",
    bgImage: "https://images.unsplash.com/photo-1518002171953-a080ee817e15?auto=format&fit=crop&q=80&w=800",
    buddhaImage: "https://i.pinimg.com/736x/94/44/a9/9444a9fdbdecf706160227eab7b18ed7.jpg",
    haloClass: "border-gold-400/40 shadow-[0_0_20px_rgba(251,191,36,0.3)]",
    glowClass: "bg-gold-400/25 blur-2xl",
    vignetteClass: "from-amber-100/10 via-transparent to-transparent",
    brightnessClass: "brightness-[1.03]",
    contrastClass: "contrast-[1.05]",
    quote: "Quiet the mind and the soul will speak."
  },
  {
    id: "bronze-patina",
    name: "Antique Patina Bronze",
    sanskrit: "ॐ अनंत सत्यम",
    bgImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
    buddhaImage: "https://i.pinimg.com/736x/b4/58/6e/b4586e776769e07110a3cd1e158ed9e9.jpg",
    haloClass: "border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]",
    glowClass: "bg-amber-600/15 blur-xl",
    vignetteClass: "from-sage-950/40 via-transparent to-transparent",
    brightnessClass: "brightness-[0.95]",
    contrastClass: "contrast-[1.08]",
    quote: "No matter how hard the past, you can always begin again."
  },
  {
    id: "noble-visage",
    name: "Noble Contemplation",
    sanskrit: "ॐ शांत विलोचन",
    bgImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
    buddhaImage: "https://i.pinimg.com/736x/52/6b/23/526b2388d24c122ce5815ff42f81d241.jpg",
    haloClass: "border-sage-400/30 shadow-[0_0_15px_rgba(100,120,100,0.15)]",
    glowClass: "bg-emerald-600/5 blur-xl",
    vignetteClass: "from-emerald-50/10 via-transparent to-transparent",
    brightnessClass: "brightness-[1.01]",
    contrastClass: "contrast-[1.03]",
    quote: "Health is the greatest gift, contentment the greatest wealth."
  },
  {
    id: "golden-siddha",
    name: "Golden Siddha Devotion",
    sanskrit: "ॐ सिद्धाय नमः",
    bgImage: "https://images.unsplash.com/photo-1518002171953-a080ee817e15?auto=format&fit=crop&q=80&w=800",
    buddhaImage: "https://i.pinimg.com/736x/b2/40/20/b240202a0b48a98eb784837526cb353f.jpg",
    haloClass: "border-gold-500/30 shadow-[0_0_20px_rgba(251,191,36,0.2)]",
    glowClass: "bg-gold-500/10 blur-xl",
    vignetteClass: "from-gold-50/10 via-transparent to-transparent",
    brightnessClass: "brightness-[0.99]",
    contrastClass: "contrast-[1.04]",
    quote: "To live a pure unselfish life, one must count nothing as one’s own."
  },
  {
    id: "infinite-grace",
    name: "Infinite Grace Statue",
    sanskrit: "ॐ कृपा असीम",
    bgImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
    buddhaImage: "https://i.pinimg.com/736x/a3/36/8b/a3368bb5b0cb76008788b15a3a1b8772.jpg",
    haloClass: "border-yellow-600/20 shadow-[0_0_12px_rgba(202,138,4,0.15)]",
    glowClass: "bg-yellow-600/5 blur-lg",
    vignetteClass: "from-yellow-50/10 via-transparent to-transparent",
    brightnessClass: "brightness-[1.02]",
    contrastClass: "contrast-[1.06]",
    quote: "There is no path to happiness: happiness is the path."
  },
  {
    id: "eternal-witness",
    name: "Eternal Witness Stone",
    sanskrit: "ॐ साक्षी सनातन",
    bgImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
    buddhaImage: "https://i.pinimg.com/736x/52/4d/fc/524dfc8580a82c1181233f1dece8b43d.jpg",
    haloClass: "border-sage-400/25 shadow-[0_0_25px_rgba(251,191,36,0.25)]",
    glowClass: "bg-amber-400/20 blur-2xl",
    vignetteClass: "from-amber-50/10 via-transparent to-transparent",
    brightnessClass: "brightness-[1.00]",
    contrastClass: "contrast-[1.01]",
    quote: "Conquer yourself and you conquer the world."
  },
  {
    id: "samadhi-stillness",
    name: "Samadhi Infinite Stillness",
    sanskrit: "ॐ समाधि शून्यता",
    bgImage: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800",
    buddhaImage: "https://i.pinimg.com/736x/a9/05/67/a905674c4544a886d38657dba8b8b055.jpg",
    haloClass: "border-slate-400/30",
    glowClass: "bg-amber-500/10 blur-xl",
    vignetteClass: "from-white/10 via-transparent to-transparent",
    brightnessClass: "brightness-[1.01]",
    contrastClass: "contrast-[1.02]",
    quote: "In the end, only three things matter: how much you loved, how gently you lived, and how gracefully you let go."
  }
];

export default function ThreeDBuddhaCard() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeState, setActiveState] = useState<BuddhaState>(BUDDHA_STATES[0]);

  // Smooth mouse coordinates interpolation
  const currentCoords = useRef({ x: 0, y: 0 });
  const targetCoords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let animationFrameId: number;

    const updatePosition = () => {
      currentCoords.current.x += (targetCoords.current.x - currentCoords.current.x) * 0.1;
      currentCoords.current.y += (targetCoords.current.y - currentCoords.current.y) * 0.1;

      setCoords({
        x: currentCoords.current.x,
        y: currentCoords.current.y
      });

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    updatePosition();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    targetCoords.current.x = x * 30; 
    targetCoords.current.y = -y * 30; 
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    targetCoords.current.x = 0;
    targetCoords.current.y = 0;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center space-y-5">
      
      {/* 3D Depth Card Wrapper */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-[380px] aspect-[4/5] rounded-[32px] overflow-hidden cursor-pointer select-none border border-sage-200/60 bg-white shadow-[0_20px_50px_rgba(40,60,40,0.08)] group"
        style={{
          perspective: "1000px"
        }}
      >
        {/* Tilting Stage containing all visual depth layers */}
        <div
          className="relative w-full h-full transition-transform duration-200 ease-out"
          style={{
            transform: `rotateY(${coords.x}deg) rotateX(${coords.y}deg)`,
            transformStyle: "preserve-3d"
          }}
        >
          {/* LAYER 1: Background Layer (Deepest Z) */}
          <div 
            className="absolute inset-0 transition-all duration-700 ease-in-out"
            style={{
              transform: "translateZ(-30px) scale(1.15)",
            }}
          >
            <img
              src={activeState.bgImage}
              alt="Lineage Background"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-[0.98] contrast-95 saturate-[0.4] opacity-30 transition-all duration-700"
            />
            {/* Ambient light champagne overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent mix-blend-multiply" />
          </div>

          {/* LAYER 2: Midground Sacred Geometry Aura (Medium Z) */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-300"
            style={{
              transform: "translateZ(10px) scale(1.05)",
            }}
          >
            {/* Concentric rotating glowing halos with dynamic lighting */}
            <div 
              className={`absolute w-72 h-72 rounded-full border ${activeState.haloClass} animate-spin transition-all duration-700`} 
              style={{ animationDuration: "25s" }} 
            />
            <div 
              className={`absolute w-56 h-56 rounded-full border border-dashed ${activeState.haloClass} animate-spin transition-all duration-700`} 
              style={{ animationDuration: "18s", animationDirection: "reverse" }} 
            />
            <div className={`absolute w-40 h-40 rounded-full ${activeState.glowClass} blur-xl animate-pulse transition-all duration-700`} />
          </div>

          {/* LAYER 3: Main Foreground Meditating Buddha (Positive Z) */}
          <div
            className="absolute inset-0 flex items-center justify-center p-8 transition-transform duration-500"
            style={{
              transform: "translateZ(45px) scale(0.95)",
            }}
          >
            <div className="relative w-full h-full max-h-[85%] rounded-[24px] overflow-hidden border border-sage-100 shadow-[0_15px_35px_rgba(40,60,40,0.1)]">
              <img
                src={activeState.buddhaImage}
                alt={activeState.name}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover filter ${activeState.contrastClass} ${activeState.brightnessClass} transition-all duration-700`}
              />
              {/* Internal vignette overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t ${activeState.vignetteClass} transition-all duration-700`} />
            </div>
          </div>

          {/* LAYER 4: Super-Foreground Floating Particles (Highest Z) */}
          <div
            className="absolute inset-0 pointer-events-none transition-transform duration-300"
            style={{
              transform: "translateZ(75px)",
            }}
          >
            {/* Floating golden energy particles */}
            <div className="absolute top-1/4 left-1/4 w-1.5 h-1.5 bg-gold-400 rounded-full blur-[0.5px] animate-ping" />
            <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-gold-300 rounded-full blur-[0.5px] animate-pulse" style={{ animationDuration: "3s" }} />
            <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-sage-400 rounded-full animate-pulse" style={{ animationDuration: "4s" }} />
          </div>

          {/* LAYER 5: Hover Reflection Sheen Gloss overlay */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${coords.x * 3 + 50}% ${-coords.y * 3 + 50}%, rgba(255, 255, 255, 0.45) 0%, transparent 60%)`,
              transform: "translateZ(80px)"
            }}
          />

          {/* Card Frame & Text Badge */}
          <div
            className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md border border-sage-100/80 p-4 rounded-2xl flex items-center justify-between transition-transform duration-500 shadow-sm"
            style={{
              transform: "translateZ(55px)",
            }}
          >
            <div>
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-sage-500 block font-bold">
                {activeState.sanskrit}
              </span>
              <h4 className="text-xs font-serif font-bold text-sage-900 uppercase tracking-wider mt-0.5">
                {activeState.name}
              </h4>
            </div>
            <div className="w-8 h-8 rounded-full bg-sage-50 border border-sage-200/50 flex items-center justify-center text-sage-600">
              <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: "8s" }} />
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Selector Control Panel to switch between the 8 styles */}
      <div className="grid grid-cols-4 gap-2.5 p-2 bg-sage-50/50 rounded-2xl border border-sage-200/30 select-none z-10 shadow-3xs max-w-full">
        {BUDDHA_STATES.map((state) => {
          const isActive = activeState.id === state.id;
          return (
            <button
              key={state.id}
              id={`buddha-state-${state.id}`}
              type="button"
              onClick={() => setActiveState(state)}
              className={`group/btn relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                isActive
                  ? "border-gold-500 scale-105 shadow-sm ring-2 ring-gold-200/50"
                  : "border-sage-200/80 hover:border-sage-400 hover:scale-105"
              }`}
              title={state.name}
            >
              <img
                src={state.buddhaImage}
                alt={state.name}
                className={`w-full h-full object-cover transition-transform duration-500 group-hover/btn:scale-110 ${
                  isActive ? "brightness-105 contrast-105" : "brightness-95"
                }`}
                referrerPolicy="no-referrer"
              />
              <div className={`absolute inset-0 transition-opacity duration-300 ${
                isActive ? "bg-gold-500/10" : "bg-black/5 group-hover/btn:bg-transparent"
              }`} />
            </button>
          );
        })}
      </div>

      {/* Instructional Badge under card */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-2 text-[10px] font-mono text-sage-500 uppercase tracking-widest">
          <Eye className="w-3.5 h-3.5 text-gold-600 animate-pulse" />
          <span>Move your cursor over the card to engage 3D space</span>
        </div>
        <p className="text-[10px] text-sage-400 italic max-w-[320px] text-center font-serif leading-relaxed mt-1">
          "{activeState.quote}"
        </p>
      </div>
    </div>
  );
}

