import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Flame, Moon, Wind, BookOpen, Compass, ChevronRight, Leaf, Shield, Heart } from "lucide-react";

// Re-usable premium vertical menu items with increased sizes and modern app-like hover feedback
const PracticeItem = ({ 
  label, 
  icon: Icon, 
  delay, 
  pageId, 
  onClick 
}: { 
  label: string; 
  icon: any; 
  delay: number; 
  pageId: string; 
  onClick?: (page: string) => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      onClick={() => onClick?.(pageId)}
      className="flex items-center gap-4 py-3 px-3.5 rounded-2xl cursor-pointer group select-none text-left hover:bg-[#5c6f59]/10 active:scale-98 transition-all duration-300 border border-transparent hover:border-gold-300/20"
    >
      {/* Rounded Minimalist Icon Wrapper with increased size */}
      <div className="relative w-12 h-12 flex items-center justify-center rounded-full border border-gold-400/30 bg-white/60 shadow-xs group-hover:border-gold-500 group-hover:bg-white/95 group-hover:shadow-md transition-all duration-300 shrink-0">
        <Icon className="w-5.5 h-5.5 text-[#2b4c33]" />
      </div>

      {/* Practice Title with elegant slide highlight & increased size */}
      <div className="flex-1 min-w-0">
        <span className="text-base md:text-lg font-sans font-medium text-sage-950 group-hover:text-gold-700 group-hover:translate-x-1 transition-all duration-300 block truncate">
          {label}
        </span>
        <span className="text-[10px] font-mono text-sage-500/85 uppercase tracking-widest block group-hover:text-gold-600 transition-colors">
          Tap to open path
        </span>
      </div>
      <ChevronRight className="w-4 h-4 text-sage-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 shrink-0" />
    </motion.div>
  );
};

export default function LineageHero({ onExploreClick, onNavigateToPage }: { onExploreClick: () => void; onNavigateToPage?: (page: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax background coordinate offsets on mouse move
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const [petals, setPetals] = useState<Array<{ 
    id: number; 
    left: string; 
    delay: string; 
    duration: string; 
    scale: number;
    className: string;
  }>>([]);

  // Generate floating highly-visible flower petals for atmosphere matching requested look
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) {
      const classes = ["", "petal-pink", "petal-amber", "petal-rose", "petal-coral"];
      const newPetals = Array.from({ length: 28 }).map((_, i) => {
        // Random style and animation parameters
        const leftPercent = 3 + Math.random() * 94; // random horizontal spread
        const delaySec = Math.random() * 12; // random stagger delay
        const durationSec = 15 + Math.random() * 15; // ultra slow speed: 15 to 30s
        const scaleVal = Math.random() * 0.45 + 0.6; // 0.6 to 1.05 (subtle, elegant leaf sizing)
        const className = classes[i % classes.length];

        return {
          id: i,
          left: `${leftPercent}%`,
          delay: `${delaySec}s`,
          duration: `${durationSec}s`,
          scale: scaleVal,
          className
        };
      });
      setPetals(newPetals);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Mouse coords relative to center (-0.5 to 0.5)
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    // Soft parallax offset for the background mountains
    setParallaxOffset({
      x: mouseX * 25,
      y: mouseY * 12
    });
  };

  const handleMouseLeave = () => {
    setParallaxOffset({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-visible lg:overflow-hidden flex flex-col justify-between min-h-auto lg:min-h-[calc(85vh-73px)] py-2 lg:py-1"
      style={{
        background: "#f4f5ee" // Elegant warm base
      }}
    >
      
      {/* A. CONTINUOUS BEAUTIFUL LANDSCAPE BACKGROUND WITH SEAMLESS PARALLAX AND CUSTOM HERO IMAGE */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-no-repeat transition-transform duration-300 ease-out"
        style={{
          backgroundImage: "url('https://lh3.googleusercontent.com/d/1tJCRzwDa19T5ZOyRkhNmq_ibjXxsZ9uj')",
          backgroundPosition: "left center",
          transform: `scale(1.05) translate3d(${parallaxOffset.x}px, ${parallaxOffset.y}px, 0)`
        }}
      />

      {/* B. LUXURIOUS SILKY MULTI-STOP MIST & GOLDEN SUNRISE GLOW OVERLAYS */}
      {/* We apply a sophisticated linear gradient that fades the right side of the image into warm cream base color (#f4f5ee) */}
      <div 
        className="absolute inset-0 z-5"
        style={{
          background: "linear-gradient(to right, rgba(244, 245, 238, 0) 0%, rgba(244, 245, 238, 0.1) 25%, rgba(244, 245, 238, 0.45) 50%, rgba(244, 245, 238, 0.85) 75%, rgba(244, 245, 238, 0.98) 100%)",
        }}
      />
      
      {/* Elegant Glowing Sacred Halo behind the entire hero content for highlighting - INCREASED GLOW & SIZE */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-gradient-to-tr from-gold-400/25 via-amber-300/12 to-transparent blur-3xl opacity-100 pointer-events-none z-5" />
      
      {/* Mobile-only soft solid beige overlay to protect stacked text readability */}
      <div className="absolute inset-0 bg-[#f4f5eed8] lg:hidden z-5" />

      {/* C. FLOATING PETALS ANIMATION BACKGROUND (EXACT USER KEYFRAMED METHOD) */}
      <div id="petals" className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {petals.map((petal) => (
          <div
            key={petal.id}
            className={`petal ${petal.className}`}
            style={{
              left: petal.left,
              bottom: "-5%",
              animationDuration: petal.duration,
              animationDelay: petal.delay,
              transform: `scale(${petal.scale})`,
            }}
          />
        ))}
      </div>

      {/* D. CORE HERO CONTENT (3-Part Layout: Exposed Monk, Center Typography, Transparent Practices) */}
      <div className="flex-1 w-full max-w-none mx-auto px-3 sm:px-6 lg:px-10 xl:px-12 flex items-center relative z-20 pt-1 sm:pt-2 lg:pt-3 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 xl:gap-8 items-center w-full min-h-[460px]">
          
          {/* Column 1 (Left 5 Cols): Left empty spacer area which fully exposes and showcases the beautiful meditating Buddha on the background image */}
          <div className="hidden lg:block lg:col-span-5 h-full relative pointer-events-none select-none">
            {/* Elegant empty column so the background monk is fully visible on desktop */}
          </div>

          {/* Column 2 (Middle 4 Cols): Luxurious typography aligned vertically - SUBSTANTIALLY INCREASED TEXT SIZES */}
          <div className="lg:col-span-4 space-y-7 text-left flex flex-col justify-center">
            <div className="space-y-1">
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-[4rem] font-serif font-light text-[#1a2f1e] leading-[1.05] tracking-tight"
              >
                Walk the Path of
              </motion.h1>
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-[4rem] font-serif font-medium text-[#2a4d33] leading-[1.05] tracking-tight"
              >
                Immortal Awareness
              </motion.h1>
            </div>

            {/* Symmetrical Gold Lotus Divider */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3 w-48 pt-1"
            >
              <div className="h-px bg-gold-400/50 flex-1" />
              <div className="text-gold-600 text-sm select-none">🪷</div>
              <div className="h-px bg-gold-400/50 flex-1" />
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sage-950 text-base md:text-lg lg:text-xl leading-relaxed font-sans max-w-lg font-light tracking-wide"
            >
              Discover inner equilibrium, resolve conflicts, and steady the prana. Step into the timeless light of self-realization.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <button
                onClick={onExploreClick}
                className="inline-flex items-center gap-2.5 px-10 py-4.5 rounded-full bg-[#5c6f59] hover:bg-[#465a44] text-white font-sans font-bold text-sm uppercase tracking-widest shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer active:scale-95"
              >
                <span>Explore Programs</span>
                <ChevronRight className="w-5 h-5 text-gold-300" />
              </button>
            </motion.div>
          </div>

          {/* Column 3 (Right 3 Cols): Practices vertical list without solid card background, floating elegantly to make the text stand out */}
          <div className="lg:col-span-3 flex flex-col justify-center relative z-10 w-full">
            <div className="relative w-full p-6 lg:p-7 xl:p-8 rounded-[2.5rem] overflow-visible group">
              
              {/* Outer spinning dashed ring */}
              <div className="absolute inset-0 rounded-[2.5rem] border border-dashed border-gold-400/10 animate-spin pointer-events-none" style={{ animationDuration: "120s" }} />
              
              {/* Centered Floating ॐ background symbol */}
              <div className="absolute right-4 bottom-4 w-32 h-32 flex items-center justify-center select-none pointer-events-none opacity-20 z-0">
                <motion.div
                  animate={{
                    scale: [0.94, 1.06, 0.94],
                    rotate: [0, 5],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-7xl text-gold-600/30 font-serif"
                >
                  ॐ
                </motion.div>
              </div>

              {/* Practices List vertically aligned */}
              <div className="relative z-10 flex flex-col gap-2.5 w-full">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-gold-800 font-semibold mb-1 block text-left">
                  Programs & Offerings
                </span>
                <PracticeItem label="Discover Harmonise Transform" icon={Leaf} delay={0.4} pageId="discover-transform" onClick={onNavigateToPage} />
                <PracticeItem label="Corporate Unburn" icon={Shield} delay={0.5} pageId="corporate-unburn" onClick={onNavigateToPage} />
                <PracticeItem label="Spinelign" icon={Compass} delay={0.6} pageId="spinelign" onClick={onNavigateToPage} />
                <PracticeItem label="NLP Rewire" icon={Wind} delay={0.7} pageId="nlp" onClick={onNavigateToPage} />
                <PracticeItem label="Mental Wellness" icon={Heart} delay={0.8} pageId="mental-wellness" onClick={onNavigateToPage} />
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* E. SAGE GREEN FULL WIDTH QUOTE BOTTOM BAR */}
      <div className="relative w-full bg-[#5c6f59] py-4 px-6 flex flex-col sm:flex-row items-center justify-center gap-2.5 text-center border-t border-gold-400/20 z-20 overflow-hidden">
        {/* Subtle grid pattern inside bottom bar */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <Leaf className="w-4 h-4 text-gold-300 rotate-45 shrink-0" />
        <span className="text-white/95 font-serif text-sm italic tracking-wide max-w-2xl">
          "You are not the body. You are not the mind. You are immortal essence."
        </span>
        <span className="text-gold-300 text-xs font-mono tracking-wider uppercase sm:pl-2">
          — Ancient Wisdom
        </span>
        <Leaf className="w-4 h-4 text-gold-300 -rotate-45 shrink-0 hidden sm:block" />
      </div>

    </div>
  );
}
