import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Activity, CheckCircle2, Shield, Users, HelpCircle } from "lucide-react";
import ProgramPageTemplate from "./ProgramPageTemplate";
import { ALL_PROGRAMS } from "../data/programsData";

export default function MentalHealthWellness() {
  const program = ALL_PROGRAMS[4]; // Mental Wellness Assistant Program

  const [scenarioStep, setScenarioStep] = useState(0);
  const [selectedResponse, setSelectedResponse] = useState<number | null>(null);

  const scenarios = [
    {
      title: "De-escalating Acute Corporate Anxiety",
      situation: "A colleague joins a call hyperventilating and panicked about an imminent board presentation.",
      options: [
        {
          label: "Immediately offer harsh logical advice: 'You're overreacting, just read the slides.'",
          feedback: "Ineffective. Rationalizing during acute panic escalates cortisol response.",
          correct: false
        },
        {
          label: "Offer Sakshi Bhava non-judgmental presence: 'Take a breath with me. 4 seconds in... 7 seconds hold...'",
          feedback: "Exemplary. Co-regulation calms the amygdala before addressing the task.",
          correct: true
        }
      ]
    },
    {
      title: "Holding Clean Space for Emotional Overwhelm",
      situation: "A team member opens up about feeling utterly exhausted and unappreciated.",
      options: [
        {
          label: "Silently listen with pure witnessing awareness, validating their emotional state without offering unasked fixes.",
          feedback: "Exemplary. Non-judgmental active listening allows samskaras to process.",
          correct: true
        },
        {
          label: "Interrupt with your own stories of hardship to show that everyone struggles.",
          feedback: "Ineffective. Shifts the focus away from the individual needing space.",
          correct: false
        }
      ]
    }
  ];

  const interactiveWidget = (
    <div className="bg-white border border-sage-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sage-100 pb-4">
        <div>
          <span className="text-[10px] font-mono text-gold-700 uppercase tracking-widest font-bold block">
            Practicum Practicing Tool
          </span>
          <h3 className="text-xl font-serif font-bold text-sage-900">
            Sakshi Bhava Empathetic Counseling Simulator
          </h3>
        </div>
        <span className="text-xs font-mono text-sage-500 bg-sage-50 px-3 py-1 rounded-full border border-sage-200/80">
          Scenario {scenarioStep + 1} of {scenarios.length}
        </span>
      </div>

      <div className="bg-sage-50/80 border border-sage-200 p-6 rounded-2xl space-y-4">
        <div>
          <span className="text-[10px] font-mono uppercase text-gold-700 font-bold block">
            ✦ Real-World Case Scenario
          </span>
          <h4 className="text-lg font-serif font-bold text-sage-900">
            {scenarios[scenarioStep].title}
          </h4>
          <p className="text-xs md:text-sm text-sage-700 mt-1 leading-relaxed">
            "{scenarios[scenarioStep].situation}"
          </p>
        </div>

        <div className="space-y-2 pt-2">
          <span className="text-[10px] font-mono uppercase text-sage-600 font-bold block">
            Select Your Counselor Response Pattern:
          </span>
          {scenarios[scenarioStep].options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setSelectedResponse(i)}
              className={`w-full text-left p-4 rounded-xl border text-xs transition-all cursor-pointer ${
                selectedResponse === i
                  ? opt.correct
                    ? "bg-emerald-50 border-emerald-300 text-emerald-950 font-medium"
                    : "bg-rose-50 border-rose-300 text-rose-950 font-medium"
                  : "bg-white border-sage-200 text-sage-800 hover:border-gold-300"
              }`}
            >
              <div className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-600 mt-1.5 shrink-0" />
                <div>
                  <span className="block">{opt.label}</span>
                  {selectedResponse === i && (
                    <p className={`mt-2 text-[11px] font-mono ${opt.correct ? "text-emerald-700" : "text-rose-700"}`}>
                      ✦ {opt.feedback}
                    </p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {selectedResponse !== null && (
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => {
                setSelectedResponse(null);
                setScenarioStep((prev) => (prev + 1) % scenarios.length);
              }}
              className="px-5 py-2 rounded-xl bg-sage-900 hover:bg-sage-950 text-gold-200 text-xs font-mono font-bold uppercase transition-all cursor-pointer"
            >
              Next Scenario
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <ProgramPageTemplate program={program} customInteractiveWidget={interactiveWidget} />
  );
}
