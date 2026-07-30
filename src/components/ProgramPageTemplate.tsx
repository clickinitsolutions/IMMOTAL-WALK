import React, { useState } from "react";
import { 
  CheckCircle2, 
  Calendar, 
  Monitor, 
  Flame, 
  Users, 
  FileText, 
  Award, 
  DollarSign, 
  Sparkles, 
  ArrowRight, 
  X,
  Check,
  Send
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ProgramData } from "../data/programsData";

interface ProgramPageTemplateProps {
  program: ProgramData;
  customInteractiveWidget?: React.ReactNode;
}

export default function ProgramPageTemplate({ program, customInteractiveWidget }: ProgramPageTemplateProps) {
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinForm, setJoinForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [joinSuccess, setJoinSuccess] = useState(false);

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (joinForm.name && joinForm.email) {
      setJoinSuccess(true);
      setTimeout(() => {
        setJoinSuccess(false);
        setShowJoinModal(false);
        setJoinForm({ name: "", email: "", phone: "", notes: "" });
      }, 3500);
    }
  };

  return (
    <div className="space-y-12">
      
      {/* SECTION 1: HERO HEADER */}
      <div className="relative bg-gradient-to-br from-sage-900 via-sage-950 to-sage-900 text-white rounded-3xl p-8 lg:p-12 overflow-hidden border border-sage-800 shadow-xl space-y-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-wrap items-center gap-3 relative z-10">
          <span className="bg-gold-500/20 text-gold-300 border border-gold-400/30 text-[10px] font-mono uppercase tracking-widest px-3.5 py-1 rounded-full font-bold">
            {program.categoryLabel}
          </span>
          <span className="text-xs font-serif italic text-sage-300">
            {program.sanskrit}
          </span>
        </div>

        <div className="space-y-2 relative z-10 max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
            {program.title}
          </h1>
          <p className="text-gold-200 text-base md:text-xl font-serif italic leading-snug">
            "{program.tagline}"
          </p>
        </div>

        {/* Quick Badges Bar */}
        <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono text-sage-300 relative z-10">
          <div className="flex items-center gap-2 bg-sage-800/80 px-3.5 py-2 rounded-xl border border-sage-700/60">
            <Calendar className="w-4 h-4 text-gold-400" />
            <span>Duration: <strong className="text-white">{program.duration}</strong></span>
          </div>
          <div className="flex items-center gap-2 bg-sage-800/80 px-3.5 py-2 rounded-xl border border-sage-700/60">
            <Monitor className="w-4 h-4 text-gold-400" />
            <span>Mode: <strong className="text-white">{program.mode}</strong></span>
          </div>
          <div className="flex items-center gap-2 bg-sage-800/80 px-3.5 py-2 rounded-xl border border-sage-700/60">
            <Flame className="w-4 h-4 text-gold-400" />
            <span>Intensity: <strong className="text-white">{program.intensity}</strong></span>
          </div>
        </div>

        {/* Primary CTA in Hero */}
        <div className="pt-4 relative z-10">
          <motion.button
            id={`hero-join-btn-${program.id}`}
            onClick={() => setShowJoinModal(true)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-full bg-gold-500 hover:bg-gold-400 text-sage-950 font-sans font-bold text-sm tracking-wider uppercase transition-all shadow-lg cursor-pointer inline-flex items-center gap-3"
          >
            <Sparkles className="w-4 h-4" />
            <span>Join this Program</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* SECTION 2: ABOUT THIS PROGRAM (FOR WHOM) */}
      <div className="bg-white rounded-3xl p-6 md:p-10 border border-sage-200/90 shadow-sm space-y-6">
        <div className="flex items-center gap-2.5 text-gold-700 font-mono text-xs uppercase tracking-widest font-bold">
          <FileText className="w-4 h-4 text-gold-600" />
          <span>Program Overview</span>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-sage-900">
            About this Program
          </h2>
          <p className="text-sage-700 text-sm md:text-base leading-relaxed font-sans max-w-4xl">
            {program.aboutText}
          </p>
        </div>

        {/* "For Whom" Sub-Box */}
        <div className="bg-sage-50/80 border border-sage-200 p-6 rounded-2xl space-y-2">
          <h3 className="text-xs font-mono uppercase tracking-wider text-sage-900 font-bold flex items-center gap-2">
            <Users className="w-4 h-4 text-gold-700" />
            <span>For Whom is this Program Intended?</span>
          </h3>
          <p className="text-xs md:text-sm text-sage-800 font-medium leading-relaxed">
            {program.forWhom}
          </p>
        </div>
      </div>

      {/* CUSTOM INTERACTIVE WIDGET (IF PROVIDED) */}
      {customInteractiveWidget && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gold-700 font-mono text-xs uppercase tracking-widest font-bold px-1">
            <Sparkles className="w-4 h-4 text-gold-600 animate-pulse" />
            <span>Interactive Program Practice Tool</span>
          </div>
          {customInteractiveWidget}
        </div>
      )}

      {/* SECTION 3: SYLLABUS / PROGRAM CONTENTS */}
      <div className="bg-white rounded-3xl p-6 md:p-10 border border-sage-200/90 shadow-sm space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono text-gold-700 uppercase tracking-widest font-bold block">
            Curriculum Structure
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-sage-900">
            Syllabus / Program Contents
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {program.syllabus.map((mod, idx) => (
            <div
              key={idx}
              className="bg-sage-50/70 p-6 rounded-2xl border border-sage-200/80 space-y-3 transition-all hover:border-gold-300 hover:bg-white shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-sage-900 text-gold-300 font-mono font-bold text-sm flex items-center justify-center shrink-0 border border-sage-800">
                  {mod.moduleNumber}
                </span>
                <h3 className="text-base md:text-lg font-serif font-bold text-sage-900">
                  {mod.title}
                </h3>
              </div>

              <ul className="pl-2 space-y-2 pt-1">
                {mod.items.map((item, sIdx) => (
                  <li key={sIdx} className="text-xs md:text-sm text-sage-700 flex items-start gap-2.5 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-600 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: BENEFITS */}
      <div className="bg-gradient-to-br from-[#f9faf7] to-[#f2f5f0] p-6 md:p-10 rounded-3xl border border-sage-200 shadow-sm space-y-6">
        <div className="flex items-center gap-2 text-gold-700 font-mono text-xs uppercase tracking-widest font-bold">
          <Award className="w-4 h-4 text-gold-600" />
          <span>Transformational Value</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-serif font-bold text-sage-900">
          Key Benefits of this Program
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {program.benefits.map((benefit, bIdx) => (
            <div
              key={bIdx}
              className="bg-white p-5 rounded-2xl border border-sage-200/80 flex items-start gap-3.5 shadow-xs transition-all hover:border-gold-300"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span className="text-xs md:text-sm text-sage-800 font-medium leading-relaxed">
                {benefit}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 5: FEE / DURATION / MODE */}
      <div className="bg-sage-900 text-white rounded-3xl p-6 md:p-10 border border-sage-800 shadow-xl space-y-8">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-xs font-mono uppercase tracking-widest text-gold-400 font-bold block">
            Sacred Sanctuary Investment
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">
            Fee, Duration & Delivery Mode
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Fee Card */}
          <div className="bg-sage-800/80 border border-sage-700/80 p-6 rounded-2xl space-y-2 text-center md:text-left shadow-inner">
            <div className="flex items-center justify-center md:justify-start gap-2 text-gold-300 text-xs font-mono uppercase tracking-wider font-bold">
              <DollarSign className="w-4 h-4" />
              <span>Program Fee</span>
            </div>
            <div className="text-3xl font-serif font-bold text-white">
              {program.fee}
            </div>
            <p className="text-xs text-sage-300 font-sans leading-relaxed">
              All-inclusive tuition & lifetime sanctuary portal material access.
            </p>
          </div>

          {/* Duration Card */}
          <div className="bg-sage-800/80 border border-sage-700/80 p-6 rounded-2xl space-y-2 text-center md:text-left shadow-inner">
            <div className="flex items-center justify-center md:justify-start gap-2 text-gold-300 text-xs font-mono uppercase tracking-wider font-bold">
              <Calendar className="w-4 h-4" />
              <span>Duration</span>
            </div>
            <div className="text-2xl font-serif font-bold text-white">
              {program.duration}
            </div>
            <p className="text-xs text-sage-300 font-sans leading-relaxed">
              Structured daily modules with guided meditation & practice logs.
            </p>
          </div>

          {/* Mode Card */}
          <div className="bg-sage-800/80 border border-sage-700/80 p-6 rounded-2xl space-y-2 text-center md:text-left shadow-inner">
            <div className="flex items-center justify-center md:justify-start gap-2 text-gold-300 text-xs font-mono uppercase tracking-wider font-bold">
              <Monitor className="w-4 h-4" />
              <span>Delivery Mode</span>
            </div>
            <div className="text-xl font-serif font-bold text-white">
              {program.mode}
            </div>
            <p className="text-xs text-sage-300 font-sans leading-relaxed">
              Live interactive masterclasses & downloadable offline audio guides.
            </p>
          </div>

        </div>

        {/* SECTION 5 CONTINUED: JOIN THIS PROGRAM BUTTON */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-sage-800">
          <div className="text-xs font-mono text-sage-300 text-center sm:text-left">
            <span>✦ Limited seats maintained to ensure personalized guidance.</span>
          </div>

          <motion.button
            id={`main-join-btn-${program.id}`}
            onClick={() => setShowJoinModal(true)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="w-full sm:w-auto px-10 py-4.5 rounded-full bg-gold-500 hover:bg-gold-400 text-sage-950 font-sans font-bold text-sm tracking-wider uppercase transition-all shadow-xl cursor-pointer flex items-center justify-center gap-3"
          >
            <Sparkles className="w-4 h-4" />
            <span>Join this Program</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* JOIN THIS PROGRAM MODAL */}
      <AnimatePresence>
        {showJoinModal && (
          <div className="fixed inset-0 bg-sage-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 border border-sage-200 shadow-2xl relative space-y-6"
            >
              <button
                id="close-join-modal-btn"
                onClick={() => setShowJoinModal(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-sage-100 hover:bg-sage-200 text-sage-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gold-700 font-bold block">
                  Enrollment Application
                </span>
                <h3 className="text-2xl font-serif font-bold text-sage-900">
                  Join {program.title}
                </h3>
                <p className="text-xs text-sage-600">
                  Fill in your contact details below to reserve your place in this program.
                </p>
              </div>

              {joinSuccess ? (
                <div className="bg-sage-50 border border-sage-200 p-6 rounded-2xl space-y-3 text-center">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif font-bold text-sage-900 text-lg">Application Submitted!</h4>
                  <p className="text-xs text-sage-600 leading-relaxed font-sans">
                    Thank you, {joinForm.name}. Our sanctuary counselor will review your request and reach out to you at {joinForm.email} within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleJoinSubmit} className="space-y-4">
                  <div>
                    <label className="text-[11px] font-mono text-sage-700 uppercase font-bold block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Sharma"
                      value={joinForm.name}
                      onChange={(e) => setJoinForm({ ...joinForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-sage-200 text-xs focus:outline-none focus:border-gold-500 bg-sage-50/50"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-sage-700 uppercase font-bold block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. ananya@domain.com"
                      value={joinForm.email}
                      onChange={(e) => setJoinForm({ ...joinForm, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-sage-200 text-xs focus:outline-none focus:border-gold-500 bg-sage-50/50"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-sage-700 uppercase font-bold block mb-1">
                      Phone Number / WhatsApp
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +91 98765 43210"
                      value={joinForm.phone}
                      onChange={(e) => setJoinForm({ ...joinForm, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-sage-200 text-xs focus:outline-none focus:border-gold-500 bg-sage-50/50"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-sage-700 uppercase font-bold block mb-1">
                      Personal Intention / Questions
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Briefly describe what draws you to this program..."
                      value={joinForm.notes}
                      onChange={(e) => setJoinForm({ ...joinForm, notes: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-sage-200 text-xs focus:outline-none focus:border-gold-500 bg-sage-50/50"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-sage-900 hover:bg-sage-950 text-gold-100 font-sans font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Send className="w-4 h-4 text-gold-400" />
                    <span>Submit Enrollment Request</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
