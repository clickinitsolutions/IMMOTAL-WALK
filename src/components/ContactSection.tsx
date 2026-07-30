import React, { useState } from "react";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import BuddhaPresence from "./BuddhaPresence";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "Meditation Practice",
    message: ""
  });
  
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Please complete the required details to reach the sanctuary.");
      return;
    }

    setLoading(true);

    // Simulated network transmission for the seeker to the lineage masters
    setTimeout(() => {
      const answers: { [key: string]: string } = {
        "Meditation Practice": "The struggle with a wandering mind is merely the observation of thoughts. Do not try to fight the waves. Realize that you are the vast ocean, untouched and still beneath the surface currents. Sit for ten minutes in complete silence before dawn, anchoring your awareness solely on the cool rim of your nostrils.",
        "Yoga Philosophy": "Asanas are not physical gymnastics, but rather a preparatory tuning of the nervous system. By steadying the body, you steady the prana; by steadying the prana, you settle the mind. View each posture as a devotional alignment with gravity and the earth.",
        "Retreat Queries": "Our sanctuaries are calibrated spaces of silence. If your spirit is calling you to join, we welcome you to step through the threshold. Trust that the path opens exactly when the seeker is ready to discard external noise.",
        "General Guidance": "Seek nothing outside yourself. Everything you search for—peace, love, clarity, and absolute awareness—is already your fundamental nature. Quiet the mind, and you will inhabit this timeless, immortal light."
      };

      setResponse({
        masterName: form.topic === "Meditation Practice" ? "Acharya Shunya" : "Yogi Devendra",
        blessing: "May the light of absolute awareness dispel all illusions of your path.",
        counsel: answers[form.topic] || answers["General Guidance"],
        recommendedMantra: form.topic === "Meditation Practice" ? "Aham Sakshi (I am the silent witness)" : "So'Ham (I am that)"
      });
      setLoading(false);
    }, 1200);
  };

  const handleReset = () => {
    setResponse(null);
    setForm({
      name: "",
      email: "",
      topic: "Meditation Practice",
      message: ""
    });
  };

  return (
    <div id="contact-page" className="space-y-12">
      {/* Editorial Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="text-xs font-mono tracking-widest text-gold-600 uppercase block mb-2 font-bold">
            Sanctuary Threshold
          </span>
          <h2 className="text-3xl font-serif font-semibold text-sage-900 tracking-tight leading-tight">
            Connect with the Ashram
          </h2>
          <p className="mt-2 text-sage-600 text-sm max-w-2xl leading-relaxed font-sans">
            Have a question about a physical posture, a deep meditative block, or an upcoming Himalayan Pilgrimage? Seek counsel directly from our resident lineage guides.
          </p>
        </div>

        {/* Dynamic Buddha Presence */}
        <BuddhaPresence variant="mini" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Interactive Advice Form / Response */}
        <div className="lg:col-span-8 bg-white border border-sage-100 rounded-3xl p-6 md:p-8 relative min-h-[420px] flex flex-col justify-between shadow-xs">
          <AnimatePresence mode="wait">
            {!response ? (
              <motion.form
                key="contact-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                <div className="space-y-1">
                  <h4 className="text-lg font-serif font-bold text-sage-900">Ashram Inquiry Form</h4>
                  <p className="text-xs text-sage-500 font-sans">Provide your details or spiritual queries below to receive direct guidance.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-sage-400 mb-1.5 font-bold">
                      Your Spiritual / Wordly Name *
                    </label>
                    <input
                      id="contact-name-input"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g., Siddhartha"
                      className="w-full text-sm text-sage-950 bg-sage-50/60 rounded-xl p-3 border border-sage-100 focus:outline-none focus:border-gold-300 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-mono tracking-wider text-sage-400 mb-1.5 font-bold">
                      Ashram Contact Email *
                    </label>
                    <input
                      id="contact-email-input"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="e.g., peace@universe.com"
                      className="w-full text-sm text-sage-950 bg-sage-50/60 rounded-xl p-3 border border-sage-100 focus:outline-none focus:border-gold-300 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-sage-400 mb-1.5 font-bold">
                    Spiritual Topic of Guidance
                  </label>
                  <select
                    id="contact-topic-select"
                    value={form.topic}
                    onChange={(e) => setForm({ ...form, topic: e.target.value })}
                    className="w-full text-sm text-sage-950 bg-sage-50/60 rounded-xl p-3 border border-sage-100 focus:outline-none focus:border-gold-300 transition-colors"
                  >
                    <option value="Meditation Practice">Meditation Practice & Obstacles</option>
                    <option value="Yoga Philosophy">Yoga Philosophy & Alignment</option>
                    <option value="Retreat Queries">Retreat Pilgrimage Questions</option>
                    <option value="General Guidance">General Non-Dual Guidance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-mono tracking-wider text-sage-400 mb-1.5 font-bold">
                    Formulate Your Query / Intention *
                  </label>
                  <textarea
                    id="contact-message-input"
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Describe your current energetic blockage, practice schedule, or any question you wish to lay at the masters' feet..."
                    className="w-full text-sm text-sage-950 bg-sage-50/60 rounded-xl p-3 border border-sage-100 focus:outline-none focus:border-gold-300 transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  id="submit-contact-btn"
                  type="submit"
                  disabled={loading}
                  className="w-full min-h-[48px] bg-sage-900 text-gold-100 hover:bg-sage-950 rounded-xl font-semibold flex items-center justify-center gap-2 text-xs transition-colors cursor-pointer uppercase tracking-widest"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-t-2 border-gold-300 border-r-2 border-transparent animate-spin"></div>
                      <span>Transmitting & Consulting lineage...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Transmit Spiritual Query</span>
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="contact-response"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-2 text-gold-600 bg-gold-50 border border-gold-200/50 p-4 rounded-2xl">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-serif font-bold text-sage-900">Query Transmitted</h4>
                    <p className="text-[11px] text-sage-600 font-sans">
                      Your query has reached the inner sanctuary. Please absorb the transmission below.
                    </p>
                  </div>
                </div>

                {/* Return letter */}
                <div className="border border-double border-gold-200 p-6 rounded-2xl bg-[#faf9f5] space-y-4 relative overflow-hidden">
                  {/* Gentle Floating Watermark behind letter */}
                  <div className="absolute right-4 top-4 text-xs font-mono text-sage-300 font-bold select-none">
                    ॐ
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-mono text-sage-400 tracking-widest block font-bold">Counsel for {form.name}</span>
                    <p className="text-xs text-sage-700 leading-relaxed font-serif mt-2">
                      "{response.counsel}"
                    </p>
                  </div>

                  <blockquote className="border-l-2 border-gold-400 pl-3 italic text-xs text-sage-600 font-serif leading-relaxed">
                    {response.blessing}
                  </blockquote>

                  <div className="pt-4 border-t border-sage-100 flex flex-col md:flex-row md:items-center justify-between text-[10px] font-mono text-sage-500 gap-2">
                    <div>
                      <span>Recommended Mantra: <strong>{response.recommendedMantra}</strong></span>
                    </div>
                    <div className="text-right text-gold-600 font-semibold uppercase">
                      — {response.masterName}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    id="reset-contact-btn"
                    onClick={handleReset}
                    className="min-h-[44px] px-6 rounded-xl border border-sage-200 text-sage-600 hover:bg-sage-50 text-xs font-semibold transition-all cursor-pointer"
                  >
                    Submit Another Query
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Ashram Information Card with Respectful Buddha representation */}
        <div className="lg:col-span-4 bg-sage-50 border border-sage-100 rounded-3xl p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <h4 className="text-lg font-serif font-bold text-sage-900 leading-tight">Ashram Sanctuary</h4>
            
            <p className="text-xs text-sage-600 leading-relaxed">
              Our physical coordinates are nestled high on the banks of the Bhagirathi River. We welcome serious practitioners who have prepared their bodies with dedicated study.
            </p>

            <div className="space-y-4 pt-4 border-t border-sage-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] uppercase font-mono text-sage-400 tracking-widest block font-bold">Physical Coordinates</span>
                  <p className="text-xs text-sage-800 font-medium font-sans">
                    Rishikesh Sanctuary, Tapovan Valley, Uttarakhand, Himalayas, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] uppercase font-mono text-sage-400 tracking-widest block font-bold">Wisdom Contact Email</span>
                  <p className="text-xs text-sage-800 font-medium font-mono">
                    sanctuary@immortalwalks.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] uppercase font-mono text-sage-400 tracking-widest block font-bold">Sanskrit Voice Line</span>
                  <p className="text-xs text-sage-800 font-medium font-mono">
                    +91 (135) 244-0808
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-sage-200/60">
            <BuddhaPresence 
              variant="card" 
              quote="Holding on to anger is like grasping a hot coal with the intent of throwing it at someone else; you are the one who gets burned." 
            />
          </div>
        </div>

      </div>
    </div>
  );
}
