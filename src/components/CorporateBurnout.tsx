import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Activity, Timer, CheckCircle2, ChevronRight, HelpCircle, Heart, User } from "lucide-react";

export default function CorporateBurnout() {
  const [assessmentStep, setAssessmentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [assessmentDone, setAssessmentDone] = useState(false);
  const [activePractice, setActivePractice] = useState<string>("box");
  const [timerLeft, setTimerLeft] = useState(16);
  const [timerRunning, setTimerRunning] = useState(false);

  const quizQuestions = [
    {
      q: "How often do you feel emotionally drained by the end of your workday?",
      options: [
        { label: "Rarely or never", points: 1 },
        { label: "Some days, but manageable", points: 2 },
        { label: "Almost every single day", points: 4 }
      ]
    },
    {
      q: "Do you experience difficulty disconnecting from work emails or thoughts during rest hours?",
      options: [
        { label: "I disconnect easily", points: 1 },
        { label: "Occasional worries, but I cope", points: 2 },
        { label: "Constant checkups and high anxiety", points: 4 }
      ]
    },
    {
      q: "How is your focus and cognitive speed during afternoon hours?",
      options: [
        { label: "Sharp and sustained", points: 1 },
        { label: "Slight brain fog, manageable", points: 2 },
        { label: "Extremely sluggish and relies on caffeine", points: 4 }
      ]
    }
  ];

  const handleAnswer = (points: number) => {
    const nextAnswers = [...answers, points];
    setAnswers(nextAnswers);
    if (assessmentStep < quizQuestions.length - 1) {
      setAssessmentStep(assessmentStep + 1);
    } else {
      const total = nextAnswers.reduce((a, b) => a + b, 0);
      setScore(total);
      setAssessmentDone(true);
    }
  };

  const resetQuiz = () => {
    setAssessmentStep(0);
    setAnswers([]);
    setScore(0);
    setAssessmentDone(false);
  };

  // Micro-practices timer
  useEffect(() => {
    let interval: any;
    if (timerRunning && timerLeft > 0) {
      interval = setInterval(() => {
        setTimerLeft((prev) => prev - 1);
      }, 1000);
    } else if (timerLeft === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerLeft]);

  const startPractice = (type: string, duration: number) => {
    setActivePractice(type);
    setTimerLeft(duration);
    setTimerRunning(true);
  };

  return (
    <div className="space-y-12">
      {/* Page Hero */}
      <div className="relative bg-gradient-to-r from-sage-900 to-emerald-950 text-white rounded-3xl p-8 lg:p-12 overflow-hidden shadow-sm border border-emerald-900/30">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full text-white" viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
        
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-gold-300 block">
            Specialized Corporate Recovery
          </span>
          <h1 className="text-3xl lg:text-4xl font-serif font-bold tracking-tight">
            Corporate Unburn Program
          </h1>
          <p className="text-sage-200 text-xs md:text-sm leading-relaxed font-light">
            An advanced stress-mitigation protocol designed specifically for high-performance corporate professionals. We integrate ancestral breathing templates with bio-feedback loops to quiet adrenal friction and restore cognitive bandwidth.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left 6 Columns: Burnout assessment */}
        <div className="lg:col-span-6 bg-white border border-sage-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 bg-gold-50 border border-gold-200 text-gold-700 rounded-lg">
                <Shield className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-sage-500 font-bold">
                Cortical Assessment
              </span>
            </div>
            
            <h3 className="text-xl font-serif font-bold text-sage-950">
              Measure Your Adrenal Fatigue Index
            </h3>
            <p className="text-xs text-sage-600 mt-1 leading-relaxed">
              Answer these 3 clinical markers to gauge your central nervous system strain and obtain immediate, targeted respiratory recommendations.
            </p>
          </div>

          <div className="my-6 min-h-[160px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {!assessmentDone ? (
                <motion.div
                  key={`step-${assessmentStep}`}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4 w-full"
                >
                  <span className="text-[10px] font-mono text-gold-700 uppercase tracking-wider block">
                    Question {assessmentStep + 1} of {quizQuestions.length}
                  </span>
                  <p className="text-sm font-serif font-semibold text-sage-900">
                    {quizQuestions[assessmentStep].q}
                  </p>
                  
                  <div className="space-y-2">
                    {quizQuestions[assessmentStep].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleAnswer(opt.points)}
                        className="w-full text-left p-3.5 rounded-xl border border-sage-100 hover:border-gold-300 hover:bg-sage-50/50 text-xs text-sage-700 transition-all cursor-pointer font-sans"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-5 rounded-2xl bg-sage-50 border border-sage-200/50 space-y-4 w-full"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-gold-700 font-bold">
                      ✦ Assessment Completed
                    </span>
                    <span className="text-xs text-sage-500 font-mono">Index: {score}/12</span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-sage-900 text-sm">
                      {score <= 4 && "Normal Adrenal Homeostasis"}
                      {score > 4 && score <= 8 && "Moderate Cortisol Drift"}
                      {score > 8 && "Severe Burnout Strain"}
                    </h4>
                    <p className="text-[11px] text-sage-600 leading-relaxed font-sans">
                      {score <= 4 && "Your nervous system is well-regulated. Continue maintaining deep presence with simple 5-minute morning contemplation."}
                      {score > 4 && score <= 8 && "Your body shows early signals of sympathetic dominance. We strongly recommend our 4-7-8 Pranayama reset twice daily."}
                      {score > 8 && "Critical alert. Your nervous system is locked in fight-or-flight. Practice our 16-second Box Breath immediately to unburden your heart."}
                    </p>
                  </div>

                  <button
                    onClick={resetQuiz}
                    className="text-[10px] font-mono text-gold-700 hover:text-gold-900 block font-bold underline"
                  >
                    Retake Assessment
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="pt-3 border-t border-sage-100 flex items-center justify-between text-[10px] text-sage-400 font-mono">
            <span>Secure & Private</span>
            <span>✦ Non-Clinical Wellness</span>
          </div>
        </div>

        {/* Right 6 Columns: Interactive Desk-Micro exercises */}
        <div className="lg:col-span-6 bg-sage-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs relative overflow-hidden border border-sage-950">
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none flex items-center justify-center">
            <svg className="w-64 h-64" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.2" />
              <path d="M 50 0 L 50 100 M 0 50 L 100 50" stroke="currentColor" strokeWidth="0.1" />
            </svg>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 bg-sage-800 border border-sage-700 text-gold-300 rounded-lg">
                <Activity className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-sage-300 font-bold">
                Workspace Micro-Practices
              </span>
            </div>
            
            <h3 className="text-xl font-serif font-bold text-white">
              Somatic Desk-Resets
            </h3>
            <p className="text-xs text-sage-300 mt-1 leading-relaxed">
              These 3 quick somatic sequences are calibrated to fit seamlessly into busy workdays. Trigger the timers to practice in real time.
            </p>

            <div className="mt-6 space-y-3">
              {[
                {
                  id: "box",
                  title: "16s Box Breath Resonator",
                  desc: "4s inhale, 4s hold, 4s exhale, 4s rest. Restores autonomic stability.",
                  secs: 16
                },
                {
                  id: "vagus",
                  title: "20s Vagus Eye Release",
                  desc: "Look far left, then far right without moving your head. Releases neck stress.",
                  secs: 20
                },
                {
                  id: "sigh",
                  title: "10s Double Physiological Sigh",
                  desc: "Two quick inhales through the nose, one long sigh through the mouth.",
                  secs: 10
                }
              ].map((prac) => {
                const isActive = activePractice === prac.id;
                return (
                  <div
                    key={prac.id}
                    className={`p-3.5 rounded-xl border transition-all ${
                      isActive
                        ? "bg-[#252f26] border-gold-400 text-white"
                        : "bg-sage-850/40 border-sage-800 text-sage-300 hover:bg-sage-800/60"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <span className="font-serif font-bold text-xs block">{prac.title}</span>
                        <p className="text-[10px] text-sage-400 mt-0.5 leading-relaxed">{prac.desc}</p>
                      </div>
                      <button
                        onClick={() => startPractice(prac.id, prac.secs)}
                        className={`py-1 px-3.5 rounded-lg text-[10px] font-mono uppercase font-bold transition-all cursor-pointer shrink-0 ${
                          isActive && timerRunning
                            ? "bg-gold-500 text-sage-950"
                            : "bg-sage-800 text-gold-300 hover:bg-sage-750"
                        }`}
                      >
                        {isActive && timerRunning ? `${timerLeft}s` : "Start"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 pt-4 border-t border-sage-800 mt-4 text-center">
            <span className="text-[9px] text-sage-400 font-mono uppercase tracking-widest block">
              ✦ Recommended frequency: Once every 3 hours of screens
            </span>
          </div>
        </div>

      </div>

      {/* Program Curriculum Card Row */}
      <div className="bg-sage-50 border border-sage-100 rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 className="text-xl font-serif font-bold text-sage-950 text-center">
          What is Preloaded in this 4-Week Curriculum?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              week: "Week 01",
              title: "Adrenal Down-Regulation",
              desc: "Deep-relax sequence, calming sensory overload and blue light overexposure."
            },
            {
              week: "Week 02",
              title: "Somatic Vagus Release",
              desc: "Releasing trapped structural tension in shoulders, neck and facial fascia."
            },
            {
              week: "Week 03",
              title: "Cognitive Detachment",
              desc: "Zazen detachment exercises to mentally step outside the corporate ego."
            },
            {
              week: "Week 04",
              title: "Resilient Work-Life Flow",
              desc: "Establishing strong workspace boundaries anchored by morning meditation."
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white border border-sage-100 p-4 rounded-2xl space-y-2">
              <span className="text-[10px] font-mono uppercase text-gold-700 tracking-wider font-bold block">{item.week}</span>
              <h4 className="font-serif font-bold text-xs text-sage-900 leading-tight">{item.title}</h4>
              <p className="text-[10px] text-sage-500 leading-relaxed font-sans">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
