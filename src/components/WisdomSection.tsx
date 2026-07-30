import React, { useState } from "react";
import { Sun, RefreshCw, Feather, Flame, Moon, Compass } from "lucide-react";
import { WisdomQuote } from "../types";
import { motion, AnimatePresence } from "motion/react";

const CATEGORIES = [
  { name: "Awaken", icon: Sun, description: "Awaken the sleeper within and connect with pure awareness." },
  { name: "Align", icon: Compass, description: "Tune the energies of the mind, body, and breath to natural flow." },
  { name: "Transcend", icon: Flame, description: "Rise above transient thoughts and inhabit the boundless immortal soul." },
  { name: "Breathwork", icon: Feather, description: "Deepen connection to the life force moving inside you." },
  { name: "Meditation", icon: Moon, description: "Settle into the quiet cave of stillness where all questions dissolve." }
];

export default function WisdomSection() {
  const [selectedCategory, setSelectedCategory] = useState("Awaken");
  const [quote, setQuote] = useState<WisdomQuote | null>({
    quote: "You are not the body. You are not the mind. You are the infinite, immortal essence of consciousness itself.",
    author: "Ancient Wisdom",
    category: "Awaken",
    source: "Local Sanctuary"
  });
  const [loading, setLoading] = useState(false);

  const fetchWisdom = async (category: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/wisdom?category=${encodeURIComponent(category)}`);
      const data = await res.json();
      setQuote(data);
    } catch (err) {
      console.error("Error fetching wisdom:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="wisdom-oracle" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Category selector */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          <span className="text-xs font-mono tracking-widest text-gold-600 uppercase block mb-2">
            The Oracle
          </span>
          <h3 className="text-3xl font-serif font-semibold text-sage-900 tracking-tight leading-tight">
            Wisdom Teachings
          </h3>
          <p className="mt-3 text-sage-600 text-sm leading-relaxed">
            Select a category of reflection and pull an ancient teaching generated with pure intent or retrieved from our sanctuary archives.
          </p>
        </div>

        <div className="space-y-3">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.name;
            return (
              <motion.button
                key={cat.name}
                id={`cat-btn-${cat.name}`}
                onClick={() => {
                  setSelectedCategory(cat.name);
                  fetchWisdom(cat.name);
                }}
                whileHover={{ scale: 1.02, x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full text-left p-4 rounded-xl border transition-colors duration-200 flex items-start gap-4 cursor-pointer group ${
                  isSelected
                    ? "bg-sage-900 text-gold-100 border-sage-800 shadow-md"
                    : "bg-white text-sage-800 border-sage-100 hover:border-sage-200 hover:bg-sage-50"
                }`}
              >
                <div
                  className={`p-2 rounded-lg transition-transform duration-300 group-hover:scale-110 ${
                    isSelected ? "bg-sage-800 text-gold-400" : "bg-sage-100 text-sage-600"
                  }`}
                >
                  <Icon className="w-5 h-5 icon-wiggle" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm tracking-wide">{cat.name}</h4>
                  <p className={`text-xs mt-1 leading-normal transition-colors ${isSelected ? "text-sage-200" : "text-sage-500"}`}>
                    {cat.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Atmospheric Wisdom Card */}
      <div className="lg:col-span-7 flex flex-col justify-center h-full">
        <div className="relative bg-gold-50/50 rounded-3xl p-8 lg:p-12 border border-gold-200/50 overflow-hidden shadow-sm flex flex-col items-center text-center min-h-[400px] justify-between">
          {/* Decorative mandala watermarks */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
            <svg className="w-96 h-96 animate-slow-spin text-sage-900" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" />
              <path d="M 50 5 L 50 95 M 5 50 L 95 50" stroke="currentColor" strokeWidth="0.3" />
            </svg>
          </div>

          <div className="w-full flex justify-between items-center z-10">
            <span className="text-xs font-mono uppercase tracking-widest text-sage-500 bg-sage-100 px-3 py-1 rounded-full">
              Category: {selectedCategory}
            </span>
            <button
              id="ref-wisdom-btn"
              onClick={() => fetchWisdom(selectedCategory)}
              disabled={loading}
              className="text-sage-500 hover:text-gold-600 transition-colors disabled:opacity-50"
              title="Draw another card"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading-wisdom"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="my-12 flex flex-col items-center gap-3 z-10"
              >
                <div className="w-12 h-12 rounded-full border-t-2 border-gold-500 border-r-2 border-transparent animate-spin"></div>
                <p className="text-sm font-mono text-sage-500 tracking-wider">Drawing teachings from the cosmos...</p>
              </motion.div>
            ) : (
              <motion.div
                key={quote ? quote.quote : "empty"}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="my-8 space-y-6 z-10 max-w-lg"
              >
                {/* Spiritual Divider Icon */}
                <div className="flex justify-center">
                  <span className="text-gold-500 text-3xl font-serif">✧ ॐ ✧</span>
                </div>

                <blockquote className="text-xl lg:text-2xl font-serif text-sage-900 italic font-medium leading-relaxed">
                  "{quote?.quote}"
                </blockquote>

                <div className="space-y-1">
                  <cite className="not-italic text-sm font-mono text-gold-700 block font-semibold">
                    — {quote?.author}
                  </cite>
                  <span className="text-[10px] uppercase tracking-widest text-sage-400 font-mono block">
                    Source: {quote?.source}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-[11px] font-mono text-sage-400 max-w-sm z-10 leading-normal border-t border-gold-200/30 pt-4 w-full">
            "You are not the body. You are not the mind. You are the immortal essence."
          </div>
        </div>
      </div>
    </div>
  );
}
