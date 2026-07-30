import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Activity, Radio, Volume2, HelpCircle, Check, ArrowRight } from "lucide-react";

export default function NlpProgram() {
  const [userNegativeInput, setUserNegativeInput] = useState("");
  const [isReprogramming, setIsReprogramming] = useState(false);
  const [reprogrammedResult, setReprogrammedResult] = useState<{
    affirmation: string;
    sanskrit: string;
    translation: string;
    frequency: string;
    beadText: string;
  } | null>(null);

  const [soundFrequencyActive, setSoundFrequencyActive] = useState(false);

  const handleReprogram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userNegativeInput.trim()) return;

    setIsReprogramming(true);
    setReprogrammedResult(null);

    // Simulate subconscious rewiring algorithm (Vedic NLP)
    setTimeout(() => {
      const inputs = userNegativeInput.toLowerCase();
      let customResult = {
        affirmation: "I operate in perfect, quiet clarity, detached from the frantic illusion of overload.",
        sanskrit: "ॐ शमः (Om Shamah)",
        translation: "Salutations to the profound, absolute stillness of the mind.",
        frequency: "432 Hz Alpha Harmonic",
        beadText: "SHAM"
      };

      if (inputs.includes("tired") || inputs.includes("exhaust") || inputs.includes("burnout") || inputs.includes("energy")) {
        customResult = {
          affirmation: "My vital life-force is an infinite, flowing fountain. I draw strength from the silent space inside.",
          sanskrit: "ॐ प्राणाया नमः (Om Pranaya Namah)",
          translation: "I align my breathing with the supreme cosmic vital power.",
          frequency: "528 Hz Bio-Transformation",
          beadText: "YAM"
        };
      } else if (inputs.includes("scared") || inputs.includes("anxious") || inputs.includes("worry") || inputs.includes("fear")) {
        customResult = {
          affirmation: "I am completely anchored. The storm of thoughts passes through me like wind through open sky.",
          sanskrit: "ॐ अभयं सर्वभूतेभ्यः (Om Abhayam Sarvabhutebhyah)",
          translation: "May there be absolute fearlessness in all dimensions of my presence.",
          frequency: "396 Hz Fear Release",
          beadText: "LAM"
        };
      } else if (inputs.includes("sad") || inputs.includes("depress") || inputs.includes("lonely") || inputs.includes("hurt")) {
        customResult = {
          affirmation: "My core is pure, unconditioned bliss. I release the old anchors and breathe in the fresh light of sunrise.",
          sanskrit: "ॐ आनन्दोऽहम् (Om Anandoham)",
          translation: "I am the nature of eternal, luminous happiness.",
          frequency: "639 Hz Emotional Harmony",
          beadText: "AH"
        };
      }

      setReprogrammedResult(customResult);
      setIsReprogramming(false);
    }, 1500);
  };

  const clearAnchor = () => {
    setUserNegativeInput("");
    setReprogrammedResult(null);
    setSoundFrequencyActive(false);
  };

  return (
    <div className="space-y-12">
      {/* Editorial Page Hero */}
      <div className="relative bg-gradient-to-r from-sage-950 via-[#2d3a2e] to-sage-900 text-white rounded-3xl p-8 lg:p-12 overflow-hidden shadow-sm border border-emerald-900/30">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full text-white" viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
        
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-gold-300 block">
            subconscious neuro-linguistic rewiring
          </span>
          <h1 className="text-3xl lg:text-4xl font-serif font-bold tracking-tight">
            Neuro-Linguistic Sanskrit Program (NLP)
          </h1>
          <p className="text-sage-200 text-xs md:text-sm leading-relaxed font-light">
            Sanskrit is a vibrational language. When you articulate specific phonemes, they stimulate cranial nerves to physically dismantle negative mental tracks. Our NLP program pairs modern cognitive reframing with ancient sound templates to instantly redirect subconscious anxiety loops.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Col (6 cols): Reprogramming Input Form */}
        <div className="lg:col-span-6 bg-white border border-sage-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 bg-gold-50 border border-gold-200 text-gold-700 rounded-lg">
                <Radio className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-sage-500 font-bold">
                reprogramming anchor portal
              </span>
            </div>
            
            <h3 className="text-xl font-serif font-bold text-sage-950">
              Discharge the Cognitive Loop
            </h3>
            <p className="text-xs text-sage-600 mt-1 leading-relaxed">
              Type the repetitive anxious thoughts or stressors currently cluttering your mind. We will parse the neurological triggers and customize a resonant Vedic mantra to reprogram the subconscious anchor.
            </p>

            <form onSubmit={handleReprogram} className="mt-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-sage-600 uppercase tracking-wider block">
                  Write your current stress loop
                </label>
                <textarea
                  value={userNegativeInput}
                  onChange={(e) => setUserNegativeInput(e.target.value)}
                  placeholder="e.g., I feel completely tired and worried that my workload is piling up and I won't have enough energy..."
                  className="w-full h-24 p-3 rounded-xl border border-sage-200 bg-sage-50/50 text-xs text-sage-900 focus:outline-none focus:ring-1 focus:ring-gold-500 font-sans resize-none"
                  maxLength={250}
                  disabled={isReprogramming || !!reprogrammedResult}
                />
                <span className="text-[9px] text-sage-400 font-mono block text-right">
                  {250 - userNegativeInput.length} characters left
                </span>
              </div>

              {!reprogrammedResult && (
                <button
                  type="submit"
                  disabled={isReprogramming || !userNegativeInput.trim()}
                  className="w-full py-3 rounded-xl bg-sage-800 hover:bg-sage-900 text-white font-bold text-xs uppercase tracking-widest transition-all disabled:opacity-45 disabled:pointer-events-none cursor-pointer flex items-center justify-center gap-2"
                >
                  {isReprogramming ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Reprogramming Subconscious Anchor...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit and Reprogram Loop</span>
                      <ArrowRight className="w-4 h-4 text-gold-300" />
                    </>
                  )}
                </button>
              )}
            </form>

            <AnimatePresence>
              {reprogrammedResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-5 rounded-2xl bg-gold-50/70 border border-gold-200/60 space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-gold-200/40 pb-2">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-gold-800 font-bold">
                      ✦ Vedic NLP Alignment Formulated
                    </span>
                    <button
                      onClick={clearAnchor}
                      className="text-[9px] font-mono text-sage-400 hover:text-sage-600 underline uppercase"
                    >
                      Clear
                    </button>
                  </div>

                  <div className="space-y-2 text-xs text-sage-900 font-sans">
                    <div>
                      <strong className="block text-[9px] font-mono uppercase text-sage-500">Cognitive Reframing Focus:</strong>
                      <p className="font-semibold text-sage-950 italic">"{reprogrammedResult.affirmation}"</p>
                    </div>
                    <div className="pt-2 border-t border-gold-200/20">
                      <strong className="block text-[9px] font-mono uppercase text-sage-500">Vibrational Seed-Mantra:</strong>
                      <p className="font-serif font-bold text-gold-900 text-base mt-0.5">{reprogrammedResult.sanskrit}</p>
                      <p className="text-[10px] text-sage-600 italic">{reprogrammedResult.translation}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="pt-3 border-t border-sage-100 text-[10px] font-mono text-sage-400 text-center">
            ✦ NLP principles applied in harmony with Vedic acoustics
          </div>
        </div>

        {/* Right Col (6 cols): Acoustic Aura Visualizer representation */}
        <div className="lg:col-span-6 bg-sage-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs border border-sage-900/40 relative overflow-hidden">
          
          {/* Subtle background lines */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
            <svg className="w-64 h-64" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.2" />
              <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="0.1" />
            </svg>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 bg-sage-900 border border-sage-800 text-gold-300 rounded-lg">
                <Radio className="w-4 h-4 animate-pulse" />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-sage-300 font-bold">
                acoustic resonance chamber
              </span>
            </div>
            
            <h3 className="text-xl font-serif font-bold text-white">
              Cranial Vibration Anchor
            </h3>
            <p className="text-xs text-sage-300 mt-1 leading-relaxed">
              Articulate the seed-syllables aloud to resonate the brain stem and vagus pathways. Enable the acoustic wave to align your respiration period.
            </p>
          </div>

          {/* Large visual breathing wave ring */}
          <div className="my-6 flex flex-col items-center justify-center relative min-h-[180px]">
            {/* Spinning orbital rays */}
            <div className={`absolute w-40 h-40 rounded-full border border-dashed border-gold-400/10 transition-transform ${
              soundFrequencyActive ? "animate-spin scale-110" : ""
            }`} style={{ animationDuration: "20s" }} />

            {/* Inner pulsing core node */}
            <div className={`w-24 h-24 rounded-full bg-gradient-to-tr from-gold-500/30 to-[#3b4c3d]/70 border-2 border-gold-400/40 flex flex-col items-center justify-center text-center transition-all ${
              soundFrequencyActive ? "scale-110 shadow-[0_0_40px_rgba(201,162,83,0.3)] animate-pulse" : "scale-100"
            }`}>
              <span className="text-2xl font-serif font-bold text-white">
                {reprogrammedResult ? reprogrammedResult.beadText : "ॐ"}
              </span>
              <span className="text-[8px] font-mono text-gold-300 tracking-wider block mt-1">
                {reprogrammedResult ? reprogrammedResult.frequency.split(" ")[0] : "432 Hz"}
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-sage-900 mt-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
            <span className="text-[9px] text-sage-400 font-mono tracking-wide uppercase">
              ✦ Frequency: {reprogrammedResult ? reprogrammedResult.frequency : "432 Hz Solfeggio Harmonic"}
            </span>

            <button
              onClick={() => setSoundFrequencyActive(!soundFrequencyActive)}
              className={`px-5 py-2 rounded-full border text-[10px] font-mono uppercase tracking-widest transition-all cursor-pointer ${
                soundFrequencyActive
                  ? "bg-gold-500 text-sage-950 border-gold-600 font-bold"
                  : "bg-sage-900 text-gold-200 border-sage-800 hover:bg-sage-850"
              }`}
            >
              {soundFrequencyActive ? "Harmonic Active" : "Activate Harmonic"}
            </button>
          </div>

        </div>

      </div>

      {/* Vibration mapping rules */}
      <div className="bg-sage-50 border border-sage-100 rounded-3xl p-6 sm:p-8 space-y-4 text-center">
        <h4 className="font-serif font-bold text-sage-950">Vibrational Sound Mechanics (Vedic NLP)</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-white border border-sage-100 p-4 rounded-xl space-y-1">
            <span className="font-serif text-gold-800 block text-sm font-bold">Mudra (मुद्रा)</span>
            <p className="text-[10px] text-sage-500 font-sans leading-relaxed">Touch the thumb to the index finger (Jnana Mudra) to stimulate focus feedback loops.</p>
          </div>
          <div className="bg-white border border-sage-100 p-4 rounded-xl space-y-1">
            <span className="font-serif text-gold-800 block text-sm font-bold">Nadi (नाडी)</span>
            <p className="text-[10px] text-sage-500 font-sans leading-relaxed">Align your spine to allow cranial resonances to travel unobstructed up the central cord.</p>
          </div>
          <div className="bg-white border border-sage-100 p-4 rounded-xl space-y-1">
            <span className="font-serif text-gold-800 block text-sm font-bold">Prana (प्राण)</span>
            <p className="text-[10px] text-sage-500 font-sans leading-relaxed">Exhale completely on the mantra syllables to decompress cortisol storage in the lungs.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
