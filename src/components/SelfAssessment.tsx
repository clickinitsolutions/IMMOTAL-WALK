import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ArrowRight, Shield, RefreshCw, Heart, Activity, Compass, BookOpen } from "lucide-react";

interface Option {
  label: string;
  factor: "sympathetic" | "pranic" | "spinal" | "vibrational";
  points: number;
}

interface Question {
  id: number;
  q: string;
  desc: string;
  options: Option[];
}

export default function SelfAssessment() {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selections, setSelections] = useState<Option[]>([]);
  const [assessmentResult, setAssessmentResult] = useState<{
    profileName: string;
    description: string;
    primaryBlock: string;
    recommPostures: string[];
    recommMantra: string;
    recommSanskrit: string;
    recommFrequency: string;
    dailyActionPlan: string[];
  } | null>(null);

  const [isCalculating, setIsCalculating] = useState(false);

  const quizQuestions: Question[] = [
    {
      id: 1,
      q: "What is your primary mental and energetic state right now?",
      desc: "Select the dominant cognitive background vibration that characterizes your day-to-day experience.",
      options: [
        { label: "Restless, racing thoughts, easily startled (High Cortisol background)", factor: "sympathetic", points: 4 },
        { label: "Deep fatigue, lethargy, lacking physical vitality (Pranic Depletion)", factor: "pranic", points: 4 },
        { label: "Tense shoulders, sore neck, heavy lower back (Postural/Spinal Compression)", factor: "spinal", points: 4 },
        { label: "Scattered concentration, emotional sensitivity, mild static", factor: "vibrational", points: 4 }
      ]
    },
    {
      id: 2,
      q: "How many hours do you spend sitting at a computer or desk daily?",
      desc: "Spinal loading is cumulative and has a direct impact on the flow of cerebrospinal fluid.",
      options: [
        { label: "More than 8 hours (Critical mechanical strain)", factor: "spinal", points: 4 },
        { label: "5 to 8 hours (Moderate postural load)", factor: "spinal", points: 2 },
        { label: "Less than 5 hours (Highly mobile posture profile)", factor: "spinal", points: 1 }
      ]
    },
    {
      id: 3,
      q: "Attend to your natural breathing. Where does it expand?",
      desc: "Shallow breathing holds carbon dioxide and alerts the adrenal glands to release fight-or-flight markers.",
      options: [
        { label: "Upper chest only (Short, defensive sympathetic breath)", factor: "sympathetic", points: 4 },
        { label: "Entire belly and ribs (Deep diaphragmatic calm)", factor: "vibrational", points: 1 },
        { label: "Irregular, prone to holding breath when stressed", factor: "pranic", points: 3 }
      ]
    },
    {
      id: 4,
      q: "Which sensory static affects you the most during heavy workloads?",
      desc: "Different mental blockages react differently to sensory inputs and acoustic surroundings.",
      options: [
        { label: "Visual clutter and flashing notifications (High sensory overwhelm)", factor: "sympathetic", points: 3 },
        { label: "Inability to sit perpendicular due to physical stiffness", factor: "spinal", points: 3 },
        { label: "Sudden drops in energy levels or afternoon drowsiness", factor: "pranic", points: 4 },
        { label: "Persistent background worries or repetitive anxious mental loops", factor: "vibrational", points: 4 }
      ]
    },
    {
      id: 5,
      q: "How refreshed do you feel within the first hour of waking up?",
      desc: "Morning vitality is the truest indicator of nighttime adrenal and neural regeneration.",
      options: [
        { label: "Completely exhausted, heavy head, dry mouth (High morning strain)", factor: "pranic", points: 4 },
        { label: "Slight brain fog that clears after warm liquids or movement", factor: "vibrational", points: 2 },
        { label: "Luminous, alert, and physically ready for sunrise contemplation", factor: "sympathetic", points: 1 }
      ]
    }
  ];

  const handleSelectOption = (option: Option) => {
    const newSelections = [...selections, option];
    setSelections(newSelections);

    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCalculating(true);
      // Process result after a short premium cosmic simulation delay
      setTimeout(() => {
        // Tally factor frequencies
        const counts = { sympathetic: 0, pranic: 0, spinal: 0, vibrational: 0 };
        newSelections.forEach((sel) => {
          counts[sel.factor] += sel.points;
        });

        // Determine dominant factor
        let dominant: string = "sympathetic";
        let maxScore = -1;
        Object.entries(counts).forEach(([factor, score]) => {
          if (score > maxScore) {
            maxScore = score;
            dominant = factor as any;
          }
        });

        let profileResult = {
          profileName: "Symphonic Adrenal Overdrive",
          description: "Your nervous system is operating on a persistent fight-or-flight trajectory. Cortisol output is constantly elevated, forcing shallow respiration and active mental static.",
          primaryBlock: "Sympathetic Hyper-Arousal",
          recommPostures: ["Balasana (Child's Surrender Pose)", "Vrikshasana (Focused Tree Pose)"],
          recommMantra: "I release the urgent illusion of overdrive, breathing in silent clarity.",
          recommSanskrit: "ॐ शमः (Om Shamah)",
          recommFrequency: "396 Hz (Fear & Tension Release)",
          dailyActionPlan: [
            "Execute a 4-second double physiological sigh breathing sequence every afternoon.",
            "Touch your thumbs to index fingers (Jnana Mudra) to discharge neurological static.",
            "Decompress your visual workspace by disabling non-essential notifications."
          ]
        };

        if (dominant === "pranic") {
          profileResult = {
            profileName: "Depleted Cellular Prana",
            description: "Your vital life-force (Prana) has retreated from the extremities, resulting in a low morning battery, heavy cognitive fog, and physical fatigue.",
            primaryBlock: "Pranic Reserve Exhaustion",
            recommPostures: ["Bhastrika (The Fire-Bellows Breath)", "Sukhasana (Easy Meditative Flow)"],
            recommMantra: "My vital life-force is an infinite, flowing fountain of absolute clarity.",
            recommSanskrit: "ॐ प्राणाया नमः (Om Pranaya Namah)",
            recommFrequency: "528 Hz (Cellular Regeneration & Transformation)",
            dailyActionPlan: [
              "Perform 5 minutes of alternate-nostril breathing (Nadi Shodhana) upon waking.",
              "Introduce high-prana warm organic soups or herbal infusions during lunchtime.",
              "Take a silent 15-minute walk outdoors directly in morning sunlight."
            ]
          };
        } else if (dominant === "spinal") {
          profileResult = {
            profileName: "Compressive Postural Blockage",
            description: "Hours of sitting have compressed your vertebrae, restricting the flow of cerebrospinal fluid and blocking kinetic pranic meridians along your central nervous cord.",
            primaryBlock: "Spinal Compression & Energy Stagnation",
            recommPostures: ["Marjariasana (Cat-Cow Spine Alignment)", "Halasana (Plow of Spiritual Release)"],
            recommMantra: "My central energetic axis is perfectly perpendicular, fluid, and light.",
            recommSanskrit: "ॐ अभयं (Om Abhayam)",
            recommFrequency: "432 Hz (Natural Alpha Harmonic Balance)",
            dailyActionPlan: [
              "Perform a 16-second desktop spine decompression sequence every two hours.",
              "Re-align your workspace seating to place your hips slightly higher than knees.",
              "Practice the Cat-Cow sequence prior to evening meals to release lower lumbar strain."
            ]
          };
        } else if (dominant === "vibrational") {
          profileResult = {
            profileName: "Scattered Cognitive Resonance",
            description: "Your subtle aura fields are experiencing electromagnetic friction. You are highly reactive to surroundings, background chatter, and emotional atmospheres.",
            primaryBlock: "Vibrational Static & Auric Sensitivity",
            recommPostures: ["Nadi Shodhana Pranayama", "Sirsasana (Crown Alignment Balance)"],
            recommMantra: "I am completely anchored. The storm of thoughts passes through me like open sky.",
            recommSanskrit: "ॐ आनन्दोऽहम् (Om Anandoham)",
            recommFrequency: "639 Hz (Harmonious Emotional Balance)",
            dailyActionPlan: [
              "Chant the seed syllable 'AH' or 'OM' aloud five times during morning preparation.",
              "Limit exposure to heavy news or electrical screens for 45 minutes prior to bed.",
              "Practice 5 minutes of somatic grounding by locating five physical touchpoints in the room."
            ]
          };
        }

        setAssessmentResult(profileResult);
        setIsCalculating(false);
      }, 1500);
    };
  };

  const restartAssessment = () => {
    setCurrentStep(0);
    setSelections([]);
    setAssessmentResult(null);
    setIsCalculating(false);
  };

  return (
    <div className="space-y-12">
      {/* Editorial Page Hero */}
      <div className="relative bg-gradient-to-r from-sage-950 via-[#323d33] to-sage-900 text-white rounded-3xl p-8 lg:p-12 overflow-hidden shadow-sm border border-emerald-900/30">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full text-white" viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
        
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-gold-300 block">
            Siddha Bio-Energetic Assessment
          </span>
          <h1 className="text-3xl lg:text-4xl font-serif font-bold tracking-tight">
            Siddha Prana Self-Assessment Tool
          </h1>
          <p className="text-sage-200 text-xs md:text-sm leading-relaxed font-light">
            An advanced diagnostic interface mapping ancient Siddha wisdom with modern neurobiology. In five clinical questions, we measure your autonomic background, vertebral compression index, and pranic reserves to calibrate your personalized cellular sanctuary program.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {!assessmentResult && !isCalculating ? (
            <motion.div
              key="questions"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="bg-white border border-sage-100 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8"
            >
              {/* Step indicator bar */}
              <div className="flex items-center justify-between border-b border-sage-50 pb-4">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 bg-gold-50 border border-gold-200 text-gold-700 rounded-lg shrink-0">
                    <HelpCircle className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-sage-400 block font-bold">Diagnostic Question</span>
                    <span className="text-xs font-serif font-bold text-sage-800">Step {currentStep + 1} of {quizQuestions.length}</span>
                  </div>
                </div>
                {/* Visual Progress Bar */}
                <div className="w-32 sm:w-48 h-2 bg-sage-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gold-500 rounded-full transition-all duration-500"
                    style={{ width: `${((currentStep + 1) / quizQuestions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Active Question Title & Desc */}
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-serif font-bold text-sage-950 leading-snug">
                  {quizQuestions[currentStep].q}
                </h3>
                <p className="text-xs text-sage-600 leading-relaxed max-w-2xl font-sans">
                  {quizQuestions[currentStep].desc}
                </p>
              </div>

              {/* Options Vertical List */}
              <div className="grid grid-cols-1 gap-3 pt-2">
                {quizQuestions[currentStep].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectOption(option)}
                    className="w-full p-4 rounded-2xl bg-sage-50 hover:bg-gold-50/50 border border-sage-100 hover:border-gold-300 text-left text-xs text-sage-800 hover:text-sage-950 transition-all cursor-pointer group flex justify-between items-center"
                  >
                    <span className="font-sans leading-relaxed flex-1 pr-4">{option.label}</span>
                    <ArrowRight className="w-4 h-4 text-sage-300 group-hover:text-gold-600 group-hover:translate-x-1 transition-all shrink-0" />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : isCalculating ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-sage-100 rounded-3xl p-12 shadow-xs flex flex-col items-center justify-center text-center space-y-6 min-h-[350px]"
            >
              {/* Pulsing and spinning ring */}
              <div className="relative w-20 h-20">
                <div className="absolute inset-0 rounded-full border-4 border-sage-100 border-t-gold-500 animate-spin" />
                <div className="absolute inset-2 rounded-full border border-dashed border-gold-300 animate-pulse flex items-center justify-center text-xl">
                  ॐ
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-700 block font-bold">
                  Siddha Diagnostics Engaged
                </span>
                <h3 className="text-xl font-serif font-bold text-sage-950">
                  Calibrating Energetic Terminals...
                </h3>
                <p className="text-xs text-sage-500 max-w-md mx-auto leading-relaxed">
                  Parsing autonomic biomarkers, vertebral load indexes, and vibrational wave counts to align your cellular sanctuary coordinates.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-sage-100 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8"
            >
              {/* Header Title with Re-take */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-sage-50 pb-6 gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gold-700 block font-bold">
                    ✦ Siddha Profile Formulated
                  </span>
                  <h2 className="text-2xl font-serif font-bold text-sage-950 mt-1">
                    {assessmentResult?.profileName}
                  </h2>
                </div>
                <button
                  onClick={restartAssessment}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sage-50 hover:bg-sage-100 border border-sage-100 hover:border-sage-200 text-[10px] font-mono text-sage-700 uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3 text-gold-600" />
                  <span>Retake Profile</span>
                </button>
              </div>

              {/* Grid result sections */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Result Column */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono uppercase text-sage-400 block font-bold">Profile Characterization</h4>
                    <p className="text-xs text-sage-700 leading-relaxed font-sans">
                      {assessmentResult?.description}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-gold-50/50 border border-gold-200/50 space-y-3">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-gold-800 font-bold block">
                      Subconscious NLP Reframe Mantra
                    </span>
                    <p className="text-xs text-sage-950 font-sans italic leading-relaxed font-medium">
                      "{assessmentResult?.recommMantra}"
                    </p>
                    <div className="pt-2 border-t border-gold-200/30">
                      <strong className="block text-[9px] font-mono uppercase text-sage-500">Sanskrit Vocal Blueprint:</strong>
                      <p className="font-serif font-bold text-gold-950 text-base mt-0.5">
                        {assessmentResult?.recommSanskrit}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-mono uppercase text-sage-400 block font-bold">Daily Mindful Action Plan</h4>
                    <ul className="space-y-3">
                      {assessmentResult?.dailyActionPlan.map((action, i) => (
                        <li key={i} className="flex gap-2.5 items-start text-xs text-sage-800">
                          <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center text-[10px] font-mono font-bold shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <span className="leading-relaxed font-sans">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right Result Column (Visuals & Presets) */}
                <div className="lg:col-span-5 bg-sage-50 border border-sage-100 rounded-2xl p-5 space-y-5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-sage-500 font-bold block border-b border-sage-200 pb-2">
                    Calibrated Sanctuaries
                  </span>

                  <div className="space-y-1">
                    <span className="text-[9px] font-mono uppercase text-sage-400 block">Primary Energetic Blockage</span>
                    <span className="text-xs font-serif font-bold text-red-700 uppercase block">{assessmentResult?.primaryBlock}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[9px] font-mono uppercase text-sage-400 block">Recommended Acoustic Resonance</span>
                    <span className="text-xs font-serif font-bold text-gold-800 block">{assessmentResult?.recommFrequency}</span>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-sage-200/50">
                    <span className="text-[9px] font-mono uppercase text-sage-400 block">Recommended Somatic Postures</span>
                    <div className="space-y-1.5">
                      {assessmentResult?.recommPostures.map((posture, idx) => (
                        <div key={idx} className="p-2.5 bg-white border border-sage-100 rounded-xl flex items-center gap-2">
                          <span className="text-xs">🧘</span>
                          <span className="text-[11px] font-serif font-bold text-sage-950">{posture}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-[9px] font-mono text-sage-400 leading-relaxed pt-2 border-t border-sage-200/50">
                    ✦ Practice these aligned sequences daily for 14 continuous sun cycles to shift background autonomic baselines.
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
