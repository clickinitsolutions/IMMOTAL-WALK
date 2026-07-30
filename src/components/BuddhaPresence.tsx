import React from "react";
import { Flame } from "lucide-react";
import { motion } from "motion/react";

interface BuddhaPresenceProps {
  variant?: "watermark" | "card" | "mini" | "banner";
  quote?: string;
  className?: string;
}

export default function BuddhaPresence({ 
  variant = "card", 
  quote = "Peace comes from within. Do not seek it without.", 
  className = "" 
}: BuddhaPresenceProps) {
  
  // Premium client-approved Gautama Buddha images from Pinterest
  const buddhaImageUrl = "https://i.pinimg.com/736x/a9/78/34/a97834dfd7f4d5e1fb6973111b5994d2.jpg"; // Calm stone meditating Buddha
  const goldBuddhaImageUrl = "https://i.pinimg.com/736x/a3/36/8b/a3368bb5b0cb76008788b15a3a1b8772.jpg"; // Majestic glowing golden statue

  if (variant === "watermark") {
    return (
      <div className={`absolute pointer-events-none select-none overflow-hidden opacity-[0.04] mix-blend-multiply ${className}`}>
        <div className="relative w-full h-full flex items-center justify-center animate-float">
          {/* Concentric Halo Circles */}
          <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-gold-600 animate-slow-spin" style={{ animationDuration: "120s" }} />
          <div className="absolute w-[200px] h-[200px] md:w-[350px] md:h-[350px] rounded-full border border-dashed border-gold-500 animate-slow-spin" style={{ animationDuration: "90s", animationDirection: "reverse" }} />
          
          <img
            src={buddhaImageUrl}
            alt="Buddha Watermark"
            className="w-48 h-48 md:w-80 md:h-80 object-contain rounded-full filter grayscale sepia opacity-80"
          />
          <div className="absolute bottom-4 text-center font-serif text-xs tracking-widest uppercase text-gold-900">
            ॐ बुद्धाय नमः • Timeless Presence
          </div>
        </div>
      </div>
    );
  }

  if (variant === "mini") {
    return (
      <div className={`flex items-center gap-2.5 bg-gold-50/60 border border-gold-100/80 px-3.5 py-2 rounded-2xl ${className}`}>
        <div className="relative w-7 h-7 rounded-full overflow-hidden border border-gold-300 shadow-sm shrink-0 animate-float">
          <img
            src={goldBuddhaImageUrl}
            alt="Buddha Presence"
            className="w-full h-full object-cover scale-110 filter brightness-105"
          />
          <div className="absolute inset-0 bg-gold-400/10 mix-blend-color" />
        </div>
        <div className="text-left leading-none">
          <span className="text-[9px] font-mono uppercase tracking-widest text-gold-600 block font-bold">Buddha Presence</span>
          <span className="text-[10px] text-sage-600 italic block mt-0.5">"Awareness is the path to immortality."</span>
        </div>
      </div>
    );
  }

  if (variant === "banner") {
    return (
      <div className={`relative bg-[#f6f4ed] border border-gold-100/50 rounded-3xl p-6 overflow-hidden flex flex-col md:flex-row items-center gap-6 shadow-2xs ${className}`}>
        {/* Background halos */}
        <div className="absolute -right-24 -bottom-24 w-64 h-64 opacity-15 pointer-events-none">
          <div className="w-full h-full rounded-full border border-gold-500 animate-slow-spin" style={{ animationDuration: "40s" }} />
        </div>
        
        <div className="relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-gold-200/80 shadow-md animate-float">
          <img
            src={buddhaImageUrl}
            alt="Buddha Statue in Contemplation"
            className="w-full h-full object-cover filter sepia brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gold-900/20 via-transparent to-transparent" />
        </div>

        <div className="text-center md:text-left space-y-2 flex-1">
          <span className="text-[10px] font-mono tracking-widest uppercase text-gold-600 font-bold block">
            Wisdom Transmission • बुद्ध ध्यान
          </span>
          <p className="text-sm font-serif italic text-sage-800 leading-relaxed">
            "{quote}"
          </p>
          <div className="text-[10px] text-sage-500 font-mono tracking-wider">
            — Shakyamuni Buddha (Dhammapada Wisdom)
          </div>
        </div>
      </div>
    );
  }

  // Standard interactive "Card" widget with glowing gold pulse aura
  return (
    <div className={`bg-white border border-gold-100 rounded-3xl p-6 flex flex-col items-center text-center relative overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${className}`}>
      {/* Decorative Aura rings in card background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-48 h-48 rounded-full border border-gold-100/40 animate-breath" />
        <div className="w-64 h-64 rounded-full border border-gold-50/20 animate-slow-spin" style={{ animationDuration: "40s" }} />
      </div>

      <div className="relative w-36 h-36 rounded-full p-1 border-2 border-gold-300 animate-float shadow-md mb-4 bg-[#faf9f5]">
        <div className="w-full h-full rounded-full overflow-hidden relative">
          <img
            src={buddhaImageUrl}
            alt="Meditating Buddha"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
          {/* Subtle gold layer */}
          <div className="absolute inset-0 bg-gold-900/10 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-sage-950/30 via-transparent to-transparent" />
        </div>

        {/* Floating sacred lotus spark */}
        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-gold-600 text-white p-1 rounded-full border border-white shadow-md">
          <Flame className="w-3.5 h-3.5 animate-pulse" />
        </div>
      </div>

      <div className="space-y-1.5 z-10">
        <span className="text-[10px] font-mono uppercase tracking-widest text-gold-600 block font-bold">
          ॐ बुद्धाय नमः
        </span>
        <h4 className="text-base font-serif font-bold text-sage-900">Silent Inner Witness</h4>
        <p className="text-xs text-sage-600 italic leading-relaxed max-w-xs px-2">
          "{quote}"
        </p>
        <span className="text-[9px] text-gold-700 font-mono uppercase tracking-widest block pt-1">
          — Presence of Buddha
        </span>
      </div>
    </div>
  );
}
