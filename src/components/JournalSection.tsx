import React, { useState, useEffect } from "react";
import { BookOpen, Trash2, Calendar, Send, ChevronRight, BookOpenCheck } from "lucide-react";
import { JournalEntry } from "../types";
import { motion, AnimatePresence } from "motion/react";

export default function JournalSection() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [newContent, setNewContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeEntry, setActiveEntry] = useState<JournalEntry | null>(null);

  // Load entries from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("immortal_walks_journal");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setEntries(parsed);
        if (parsed.length > 0) {
          setActiveEntry(parsed[0]);
        }
      } catch (e) {
        console.error("Failed to parse journal logs", e);
      }
    }
  }, []);

  // Save entries to localStorage
  const saveEntries = (updated: JournalEntry[]) => {
    setEntries(updated);
    localStorage.setItem("immortal_walks_journal", JSON.stringify(updated));
  };

  const submitJournal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    setLoading(true);
    const dateStr = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    const newId = `journal-${Date.now()}`;
    const temporaryEntry: JournalEntry = {
      id: newId,
      date: dateStr,
      content: newContent
    };

    try {
      const response = await fetch("/api/reflect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entry: newContent })
      });
      const data = await response.json();

      const completeEntry: JournalEntry = {
        ...temporaryEntry,
        reflection: data.reflection,
        focusWord: data.focusWord,
        mindfulnessTask: data.mindfulnessTask
      };

      const updated = [completeEntry, ...entries];
      saveEntries(updated);
      setActiveEntry(completeEntry);
      setNewContent("");
    } catch (err) {
      console.error("Error securing reflection:", err);
      // Fallback
      const completeEntry: JournalEntry = {
        ...temporaryEntry,
        reflection: "Every thought is a ripple on the surface of the vast, quiet ocean of your consciousness. By writing down your feelings, you have already taken the first step of the observer—separating your true self from the transient waves.",
        focusWord: "Samanvaya (Harmony)",
        mindfulnessTask: "Place your hand over your heart. Take three deep, slow breaths. On each inhale, invite stillness. On each exhale, release the need to control the tide."
      };
      const updated = [completeEntry, ...entries];
      saveEntries(updated);
      setActiveEntry(completeEntry);
      setNewContent("");
    } finally {
      setLoading(false);
    }
  };

  const deleteEntry = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = entries.filter(item => item.id !== id);
    saveEntries(updated);
    if (activeEntry?.id === id) {
      setActiveEntry(updated.length > 0 ? updated[0] : null);
    }
  };

  return (
    <div id="journal-sanctuary" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Writing pad & Past Reflections */}
      <div className="lg:col-span-7 space-y-6">
        <div>
          <span className="text-xs font-mono tracking-widest text-gold-600 uppercase block mb-2">
            Sanctuary Scroll
          </span>
          <h3 className="text-3xl font-serif font-semibold text-sage-900 tracking-tight leading-tight">
            Reflective Journaling
          </h3>
          <p className="mt-2 text-sage-600 text-sm leading-relaxed">
            Record your current thoughts, struggles, or aspirations. Our server-side Zen Guide will offer a gentle, high-vibe reflection and focus practice.
          </p>
        </div>

        {/* Input box */}
        <form onSubmit={submitJournal} className="bg-white rounded-2xl p-6 border border-sage-100 shadow-sm space-y-4">
          <textarea
            id="journal-textarea"
            rows={4}
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="How flows the river of your mind today? Write down any thoughts, blockages, or peaceful feelings..."
            className="w-full text-sm text-sage-950 placeholder-sage-400 bg-sage-50/50 rounded-xl p-4 border border-sage-100 focus:border-sage-300 focus:bg-white focus:outline-none transition-all resize-none"
            required
          />
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-mono text-sage-400">
              Your words are encrypted locally in your sanctuary vault.
            </span>
            <motion.button
              id="submit-journal-btn"
              type="submit"
              disabled={loading || !newContent.trim()}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="px-5 py-2.5 rounded-full bg-sage-600 hover:bg-sage-700 text-white font-medium text-sm flex items-center gap-2 transition-colors disabled:opacity-50 shadow-sm cursor-pointer btn-shimmer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-t-2 border-white border-r-2 border-transparent animate-spin"></div>
                  <span>Harmonizing...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 icon-spin-hover" />
                  <span>Reflect & Harmonize</span>
                </>
              )}
            </motion.button>
          </div>
        </form>

        {/* List of past Entries */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-sage-500" />
            <h4 className="text-sm font-semibold text-sage-900 font-mono tracking-wide uppercase">
              Sanctuary History ({entries.length})
            </h4>
          </div>

          {entries.length === 0 ? (
            <div className="border border-dashed border-sage-200 rounded-xl p-8 text-center text-sage-500 text-sm">
              No entries logged in your sanctuary yet. Write your first reflection above.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2">
              {entries.map((item) => {
                const isActive = activeEntry?.id === item.id;
                return (
                  <button
                    key={item.id}
                    id={`journal-log-${item.id}`}
                    onClick={() => setActiveEntry(item)}
                    className={`text-left p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
                      isActive
                        ? "bg-sage-900 text-gold-100 border-sage-800 shadow-xs"
                        : "bg-white text-sage-800 border-sage-100 hover:border-sage-200"
                    }`}
                  >
                    <div className="flex justify-between items-start w-full">
                      <span className={`text-[10px] font-mono flex items-center gap-1.5 ${isActive ? "text-gold-400" : "text-sage-500"}`}>
                        <Calendar className="w-3 h-3" />
                        {item.date}
                      </span>
                      <button
                        id={`delete-btn-${item.id}`}
                        onClick={(e) => deleteEntry(item.id, e)}
                        className={`p-1 rounded-md hover:bg-red-500/10 hover:text-red-400 transition-colors ${
                          isActive ? "text-sage-400" : "text-sage-400"
                        }`}
                        title="Delete log"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs mt-2 line-clamp-2 leading-relaxed opacity-90 font-serif">
                      "{item.content}"
                    </p>
                    <div className="mt-3 flex items-center justify-end w-full text-[10px] font-mono uppercase tracking-widest gap-1">
                      <span className={isActive ? "text-gold-300" : "text-sage-600"}>View Guidance</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Guide Reflection Card */}
      <div className="lg:col-span-5">
        <AnimatePresence mode="wait">
          {activeEntry ? (
            <motion.div
              key={activeEntry.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="bg-gold-50 border border-gold-200/50 rounded-2xl p-6 lg:p-8 space-y-6 shadow-sm relative overflow-hidden"
            >
              {/* Decorative background circle */}
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gold-200/20 pointer-events-none"></div>

              <div className="flex items-center gap-3 border-b border-gold-200/30 pb-4">
                <div className="p-2 bg-gold-100 rounded-lg text-gold-700">
                  <BookOpenCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-md font-serif font-semibold text-sage-900">
                    Spiritual Alignment
                  </h4>
                  <p className="text-[10px] font-mono text-gold-700 uppercase tracking-wider">
                    Harmonized on {activeEntry.date}
                  </p>
                </div>
              </div>

              {/* Original Entry View */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-sage-400 tracking-widest block">
                  Your Reflection
                </span>
                <p className="text-xs text-sage-700 italic border-l-2 border-sage-300 pl-3 leading-relaxed font-serif">
                  "{activeEntry.content}"
                </p>
              </div>

              {/* Reflection */}
              {activeEntry.reflection && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2">
                    <BookOpenCheck className="w-4 h-4 text-gold-500" />
                    <span className="text-[10px] font-mono uppercase text-gold-700 tracking-widest">
                      Spiritual Guide Reflection
                    </span>
                  </div>
                  <p className="text-sm text-sage-900 leading-relaxed font-serif">
                    {activeEntry.reflection}
                  </p>
                </div>
              )}

              {/* Focus Word & Mindfulness task */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gold-200/30">
                {activeEntry.focusWord && (
                  <div className="space-y-1 bg-white/60 p-3 rounded-xl border border-gold-200/20">
                    <span className="text-[9px] font-mono uppercase text-gold-700 tracking-widest block">
                      Daily Focus Mantra
                    </span>
                    <p className="text-md font-serif font-bold text-sage-950">
                      {activeEntry.focusWord}
                    </p>
                  </div>
                )}

                {activeEntry.mindfulnessTask && (
                  <div className="space-y-1 bg-white/60 p-3 rounded-xl border border-gold-200/20">
                    <span className="text-[9px] font-mono uppercase text-gold-700 tracking-widest block">
                      1-Min Alignment Practice
                    </span>
                    <p className="text-xs text-sage-800 leading-normal">
                      {activeEntry.mindfulnessTask}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="border border-dashed border-sage-200 bg-sage-50/50 rounded-2xl p-12 text-center text-sage-500 text-sm flex flex-col items-center justify-center min-h-[300px]">
              <BookOpen className="w-8 h-8 text-sage-300 mb-3" />
              <p className="max-w-xs leading-relaxed">
                Your guiding insights will bloom here once you submit your first journal entry.
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
