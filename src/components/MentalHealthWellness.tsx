import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Shield, Heart, Activity, CheckCircle, ChevronRight, HelpCircle, Eye, RefreshCw } from "lucide-react";

type NervousState = "sympathetic" | "parasympathetic";

export default function MentalHealthWellness() {
  const [currentNervousState, setCurrentNervousState] = useState<NervousState>("sympathetic");
  const [breathingTriggered, setBreathingTriggered] = useState(false);
  const [activeTab, setActiveTab] = useState<"toolkit" | "leadership">("toolkit");

  const toggleNervousState = () => {
    setCurrentNervousState((prev) => (prev === "sympathetic" ? "parasympathetic" : "sympathetic"));
  };

  const handleBreathingExercise = () => {
    setBreathingTriggered(true);
    setTimeout(() => {
      setCurrentNervousState("parasympathetic");
      setBreathingTriggered(false);
    }, 4000);
  };

  return (
    <div className="space-y-12">
      {/* Editorial Header */}
      <div className="relative bg-gradient-to-r from-emerald-950 via-[#223625] to-sage-950 text-white rounded-3xl p-8 lg:p-12 overflow-hidden shadow-sm border border-emerald-900/40">
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-[0.03] pointer-events-none">
          <svg className="w-full h-full text-white" viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>
        
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-gold-300 block">
            autonomic nervous system homeostasis
          </span>
          <h1 className="text-3xl lg:text-4xl font-serif font-bold tracking-tight">
            Mental Health & Corporate Wellness
          </h1>
          <p className="text-sage-200 text-xs md:text-sm leading-relaxed font-light">
            A scientifically backed blueprint to restore mental clarity, emotional resiliency, and nervous system health for high-performance corporate environments. We teach you how to transition from fight-or-flight into rest-and-digest states in real time.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column (5 cols): Nervous System State Toggle Dashboard */}
        <div className="lg:col-span-5 bg-white border border-sage-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="p-1.5 bg-gold-50 border border-gold-200 text-gold-700 rounded-lg">
                <Activity className="w-4 h-4" />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-sage-500 font-bold">
                nervous system dashboard
              </span>
            </div>
            
            <h3 className="text-xl font-serif font-bold text-sage-950">
              Interactive Autonomic Balance
            </h3>
            <p className="text-xs text-sage-600 mt-1 leading-relaxed">
              Toggle your state below to visualize how adrenaline and cortisol shift your biological markers, and learn how to trigger the vagal brake.
            </p>
          </div>

          {/* Graphical representation of the biomarkers */}
          <div className="my-6 p-4 rounded-2xl bg-sage-50 border border-sage-100 space-y-4">
            <div className="flex justify-between items-center border-b border-sage-200/50 pb-2.5">
              <div>
                <span className="text-[9px] font-mono uppercase text-sage-400 block">Current Dominant State</span>
                <span className={`text-xs font-bold font-serif uppercase tracking-wider ${
                  currentNervousState === "sympathetic" ? "text-red-700" : "text-emerald-700"
                }`}>
                  {currentNervousState === "sympathetic" ? "Sympathetic Mode (Fight/Flight)" : "Parasympathetic Mode (Rest/Digest)"}
                </span>
              </div>
              <button
                onClick={toggleNervousState}
                className="p-2 rounded-full bg-white border border-sage-200 text-sage-600 hover:text-gold-600 shadow-3xs cursor-pointer transition-transform duration-300"
                title="Toggle State"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {[
                {
                  label: "Heart Rate (HRV Indicator)",
                  sympathetic: "88 BPM (Low HRV Coherence)",
                  parasympathetic: "62 BPM (High HRV Coherence)",
                  color: "bg-red-400"
                },
                {
                  label: "Adrenal Cortisol Output",
                  sympathetic: "Elevated (Chronic Strain)",
                  parasympathetic: "Normal Baseline (Deep Rest)",
                  color: "bg-amber-400"
                },
                {
                  label: "Respiratory Depth",
                  sympathetic: "Shallow Chest Breathing",
                  parasympathetic: "Deep Diaphragmatic Cycles",
                  color: "bg-emerald-400"
                }
              ].map((marker, i) => (
                <div key={i} className="text-xs space-y-1">
                  <span className="text-[10px] font-mono text-sage-500 block">{marker.label}</span>
                  <div className="flex items-center justify-between font-sans">
                    <span className="font-semibold text-sage-900">
                      {currentNervousState === "sympathetic" ? marker.sympathetic : marker.parasympathetic}
                    </span>
                    <div className="w-24 h-1.5 bg-sage-200/50 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          currentNervousState === "sympathetic" ? "bg-red-500 w-[85%]" : "bg-emerald-500 w-[30%]"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-sage-100 flex items-center justify-between text-[10px] text-sage-400 font-mono">
            <span>Bio-Feedback Model</span>
            <span>✦ Vagus Nerve Integration</span>
          </div>
        </div>

        {/* Right Column (7 cols): Cortisol Mitigation Action Card */}
        <div className="lg:col-span-7 bg-[#1c221d] text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs border border-sage-900">
          
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-3 border-b border-sage-800 pb-3">
              <span className="p-1.5 bg-[#252f26] border border-sage-700 text-gold-300 rounded-lg">
                <Heart className="w-4 h-4 text-gold-300" />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-sage-300 font-bold">
                interactive autonomic reset
              </span>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-white leading-tight">
                Instantly Trigger the Vagal Brake
              </h3>
              <p className="text-xs text-sage-300 leading-relaxed font-sans">
                Our vagus nerve acts as a biological brake to instantly halt cortisol production and lower heart rate. Execute this 4-second parasympathetic breathwave below.
              </p>

              <div className="p-4 rounded-2xl bg-sage-900/60 border border-sage-800/40 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-gold-400 font-bold">
                    Vagus Breathe Wave
                  </span>
                  <span className="text-[10px] font-mono text-sage-400">Duration: 4 Seconds</span>
                </div>
                <p className="text-xs text-sage-200 leading-relaxed">
                  Inhale deeply for 2 seconds, hold for 1 second, then let out a double physiological sigh to activate the stretch receptors in your lungs.
                </p>
                
                {breathingTriggered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3 bg-emerald-950/40 border border-emerald-900/50 rounded-xl flex gap-2 items-center"
                  >
                    <div className="w-3.5 h-3.5 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin shrink-0" />
                    <span className="text-[11px] text-emerald-300 font-mono">Inhaling... Expanding lungs and resetting chest pressure...</span>
                  </motion.div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-sage-850 mt-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <span className="text-[10px] text-sage-400 font-mono">
              ✦ Recommended when experiencing acute desk panic
            </span>

            <button
              onClick={handleBreathingExercise}
              disabled={breathingTriggered}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#5c6f59] hover:bg-[#465a44] disabled:opacity-50 text-white font-medium text-xs uppercase tracking-widest transition-all cursor-pointer shadow-sm text-center"
            >
              {breathingTriggered ? "Resetting Autonomics..." : "Trigger Vagal Brake"}
            </button>
          </div>

        </div>

      </div>

      {/* Toolkit tab controller */}
      <div className="bg-sage-50 border border-sage-100 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex justify-center border-b border-sage-200 pb-2">
          <button
            onClick={() => setActiveTab("toolkit")}
            className={`px-5 py-2 text-xs font-semibold uppercase tracking-widest transition-all ${
              activeTab === "toolkit" ? "border-b-2 border-sage-950 text-sage-950" : "text-sage-400 hover:text-sage-600"
            }`}
          >
            Emotional Resiliency Toolkit
          </button>
          <button
            onClick={() => setActiveTab("leadership")}
            className={`px-5 py-2 text-xs font-semibold uppercase tracking-widest transition-all ${
              activeTab === "leadership" ? "border-b-2 border-sage-950 text-sage-950" : "text-sage-400 hover:text-sage-600"
            }`}
          >
            Mindful Leadership Blueprint
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "toolkit" ? (
            <motion.div
              key="toolkit"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                { title: "Cognitive Shifting", desc: "Instantly reframe intrusive worries from project deadlines. Mentally categorizing thoughts into 'useful' and 'non-useful' segments." },
                { title: "Somatic Grounding", desc: "The 5-4-3-2-1 technique. Grounding your biological state into immediate physical touch, sound, and smell to release cortisol spikes." },
                { title: "Evening Decompression", desc: "Slower diaphragmatic breathing prior to bedtime. Extends your slow-wave and deep sleep windows to flush brain toxins." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white border border-sage-100 p-4.5 rounded-2xl space-y-2">
                  <span className="text-gold-700 text-xs">🪷</span>
                  <h4 className="font-serif font-bold text-xs text-sage-950">{item.title}</h4>
                  <p className="text-[10px] text-sage-500 leading-relaxed font-sans">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="leadership"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                { title: "Nervous-System Regulation", desc: "Leaders set the emotional thermostat of their team. Unregulated nervous systems cause silent workplace panic and defensive loops." },
                { title: "Sattvic Communication", desc: "Articulating ideas with pure, non-violent, constructive intent. Promotes high safety, trust, and creative problem-solving." },
                { title: "Strategic Stillness", desc: "Allocating 15 minutes of silent space prior to high-stakes board reviews. Halts impulsive reactive logic, ensuring clear vision." }
              ].map((item, idx) => (
                <div key={idx} className="bg-white border border-sage-100 p-4.5 rounded-2xl space-y-2">
                  <span className="text-gold-700 text-xs">✦</span>
                  <h4 className="font-serif font-bold text-xs text-sage-950">{item.title}</h4>
                  <p className="text-[10px] text-sage-500 leading-relaxed font-sans">{item.desc}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
