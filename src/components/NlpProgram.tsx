import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Activity, Radio, Volume2, ArrowRight, Sparkles } from "lucide-react";
import ProgramPageTemplate from "./ProgramPageTemplate";
import { ALL_PROGRAMS } from "../data/programsData";

export default function NlpProgram() {
  const program = ALL_PROGRAMS[3]; // NLP

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
    }, 1200);
  };

  const clearAnchor = () => {
    setUserNegativeInput("");
    setReprogrammedResult(null);
    setSoundFrequencyActive(false);
  };

  const interactiveWidget = (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      {/* Left Col: Form */}
      <div className="lg:col-span-6 bg-white border border-sage-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="p-1.5 bg-gold-50 border border-gold-200 text-gold-700 rounded-lg">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-sage-500 font-bold">
              Cognitive Re-Patterning Engine
            </span>
          </div>

          <h3 className="text-xl font-serif font-bold text-sage-950">
            Dismantle Limiting Inner Scripts
          </h3>
          <p className="text-xs text-sage-600 mt-1 leading-relaxed">
            Enter a recurring negative self-talk phrase (e.g. "I'm overwhelmed", "I'm afraid of failing") to synthesize its custom Sanskrit counter-vibration.
          </p>

          <form onSubmit={handleReprogram} className="mt-5 space-y-3">
            <input
              type="text"
              placeholder="e.g. 'I feel anxious and incapable of keeping up...'"
              value={userNegativeInput}
              onChange={(e) => setUserNegativeInput(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-sage-200 text-xs text-sage-900 focus:outline-none focus:border-gold-400 bg-sage-50/50"
            />
            <button
              type="submit"
              disabled={isReprogramming || !userNegativeInput.trim()}
              className="w-full py-3 rounded-xl bg-sage-900 hover:bg-sage-950 text-gold-200 text-xs font-mono font-bold uppercase transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {isReprogramming ? (
                <span>Synthesizing Phonemes...</span>
              ) : (
                <>
                  <span>Generate Sanskrit Re-Anchor</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gold-400" />
                </>
              )}
            </button>
          </form>
        </div>

        {reprogrammedResult && (
          <div className="mt-4 p-4 rounded-2xl bg-sage-50 border border-sage-200 space-y-2">
            <span className="text-[9px] font-mono uppercase tracking-widest text-gold-700 font-bold block">
              ✦ Synthesized Counter-Vibration
            </span>
            <p className="font-serif font-bold text-sage-900 text-sm">
              {reprogrammedResult.sanskrit}
            </p>
            <p className="text-xs text-sage-700 italic">
              "{reprogrammedResult.affirmation}"
            </p>
            <button
              onClick={clearAnchor}
              className="text-[10px] font-mono text-gold-700 hover:text-gold-900 block font-bold underline cursor-pointer pt-1"
            >
              Clear & Reprogram Another Script
            </button>
          </div>
        )}
      </div>

      {/* Right Col: Audio Frequency Simulator */}
      <div className="lg:col-span-6 bg-sage-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs border border-sage-950 space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="p-1.5 bg-sage-800 border border-sage-700 text-gold-300 rounded-lg">
              <Radio className="w-4 h-4" />
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-sage-300 font-bold">
              Vedic Vak Sound Oscillator
            </span>
          </div>

          <h3 className="text-xl font-serif font-bold text-white">
            Vibrational Sound Resonator
          </h3>
          <p className="text-xs text-sage-300 mt-1 leading-relaxed">
            Listen to the high-frequency harmonic tone tuned to the 528 Hz transformation scale to relax cranial nerves during speech reframing.
          </p>

          <div className="mt-6 p-5 rounded-2xl bg-sage-850/80 border border-sage-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-serif font-bold text-white block">528 Hz Transformation Tone</span>
                <span className="text-[10px] font-mono text-sage-400 block">Solfeggio Sound Harmonic</span>
              </div>
              <button
                onClick={() => setSoundFrequencyActive(!soundFrequencyActive)}
                className={`p-3 rounded-full transition-all cursor-pointer ${
                  soundFrequencyActive ? "bg-gold-500 text-sage-950" : "bg-sage-800 text-gold-300 hover:bg-sage-750"
                }`}
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-sage-300 leading-relaxed font-sans">
              {soundFrequencyActive ? "✦ Harmonic sound oscillator active. Inhale deeply and recite your Sanskrit anchor." : "Oscillator standby. Click the speaker icon to play background tone."}
            </p>
          </div>
        </div>

        <div className="pt-3 border-t border-sage-800 text-center">
          <span className="text-[9px] text-sage-400 font-mono uppercase tracking-widest block">
            ✦ Practice for 3 minutes twice daily for neural pathway re-patterning
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <ProgramPageTemplate program={program} customInteractiveWidget={interactiveWidget} />
  );
}
