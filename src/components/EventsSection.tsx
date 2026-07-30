import React, { useState } from "react";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Filter, 
  Video, 
  Award, 
  Compass, 
  Bookmark, 
  Mail,
  Smartphone
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SanctuaryEvent {
  id: string;
  title: string;
  sanskrit: string;
  category: "yatra" | "satsang" | "corporate" | "certification";
  categoryLabel: string;
  date: string;
  day: string;
  month: string;
  time: string;
  location: string;
  isVirtual: boolean;
  instructor: string;
  capacity: string;
  price: string;
  description: string;
  inclusions: string[];
  image: string;
}

const EVENTS: SanctuaryEvent[] = [
  {
    id: "himalayan-silence",
    title: "10-Day Gangotri Glacier Pilgrimage",
    sanskrit: "गङ्गोत्री मौन यात्रा (Gangotri Mauna Yatra)",
    category: "yatra",
    categoryLabel: "Mountain Pilgrimage",
    date: "August 12 - 22, 2026",
    day: "12",
    month: "AUG",
    time: "Sunrise Start",
    location: "Kailas Ashram, Gangotri, Uttarakhand",
    isVirtual: false,
    instructor: "Acharya Shunya & Lineage Elders",
    capacity: "12 Seeker Cells Remaining",
    price: "$1,480 USD (Subsidized)",
    description: "An immersive, physical hike and silent contemplation trek to the physical mouth of the holy Ganges. Involves high-altitude pranayama, cold-water alignment, and direct instruction on Mandukya Upanishad.",
    inclusions: [
      "Traditional ashram single-cell stay",
      "Organic sattvic foods & herbal infusions",
      "Spinal alignment dhyana sequence",
      "Upanishad scripture manuscripts"
    ],
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "corporate-burnout-summit",
    title: "Sovereign Executive Stillness Summit",
    sanskrit: "कार्यकुशलता शान्ति (Karyakushalata Shanti)",
    category: "corporate",
    categoryLabel: "Corporate Wellness",
    date: "September 05 - 07, 2026",
    day: "05",
    month: "SEP",
    time: "09:00 AM - 05:00 PM IST",
    location: "Bangalore Sanctuary & Virtual Stream",
    isVirtual: true,
    instructor: "Gurudev Devendra",
    capacity: "45 Seats / Unlimited Digital",
    price: "$350 USD (Corporate Grant)",
    description: "Designed specifically for corporate leaders and executives on the edge of burnout. Learn ancient spinal decompression techniques, circadian reset protocols, and how to govern high-velocity operations from absolute inner silence.",
    inclusions: [
      "Circadian biomimicry sequence sheets",
      "Vagus nerve micro-tuning guides",
      "1-on-1 performance audit",
      "High-definition binaural audio loops"
    ],
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "acharya-certification-launch",
    title: "6-Month Acharya Life Coach Certification",
    sanskrit: "आचार्य दीक्षा समारम्भ (Acharya Deeksha)",
    category: "certification",
    categoryLabel: "Coach Certification",
    date: "October 01, 2026 (Cohorts Open)",
    day: "01",
    month: "OCT",
    time: "Weekly Cohort Meetings",
    location: "Online Portal & Tapovan Sanctuary Meetup",
    isVirtual: true,
    instructor: "Acharya Shunya & Council of Guides",
    capacity: "25 Sacred Initiates Only",
    price: "$2,900 USD (Installment Plan)",
    description: "The premier certification track merging non-dual philosophy with modern coaching modalities. Master sub-conscious NLP linguistic anchors, spiritual shadow integration, physical spinal posture diagnostics, and therapeutic counsel.",
    inclusions: [
      "250+ Hours direct instruction",
      "Individual mentorship sessions",
      "Lifetime access to online Gurukul",
      "Registered Immortal Walks Seal"
    ],
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "bhadra-darshan",
    title: "Autumn Equinox Sunset Satsang",
    sanskrit: "शारद संक्रान्ति सत्सङ्ग (Sharad Satsang)",
    category: "satsang",
    categoryLabel: "Satsang & Darshan",
    date: "September 22, 2026",
    day: "22",
    month: "SEP",
    time: "05:00 PM - 07:30 PM UTC",
    location: "Virtual Broadcast - Tapovan Shrin",
    isVirtual: true,
    instructor: "Acharya Shunya",
    capacity: "Open to all sincere seekers",
    price: "Free-Will Contribution (Dakshina)",
    description: "Join our global community for a deep, silent group contemplation as the sun crosses the equator. Includes a pristine vibrational hum session and exposition on the mystery of time and immortality.",
    inclusions: [
      "Access to global interactive Zoom forum",
      "Pre-satsang meditation guide",
      "Recording download for life",
      "Community prayer integration"
    ],
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "spinalign-masterclass",
    title: "Spinalign & Posture Diagnostics Workshop",
    sanskrit: "मेरुदण्ड स्वास्थ्य (Merudanda Svasthya)",
    category: "corporate",
    categoryLabel: "Applied Practice",
    date: "November 14, 2026",
    day: "14",
    month: "NOV",
    time: "10:00 AM - 01:00 PM IST",
    location: "Mumbai Sanctuary & Virtual Stream",
    isVirtual: true,
    instructor: "Sadhvi Prerna",
    capacity: "80 Seats Remaining",
    price: "$95 USD",
    description: "An intensive diagnostic session focusing on the central spine (Sushumna Nadi). Correct long-term physical damage caused by desk fatigue and learn the 5-minute daily core restoration poses.",
    inclusions: [
      "Posture assessment tools",
      "Daily 5-minute alignment printout",
      "Anatomical back health guides",
      "Humming vagal reset exercises"
    ],
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600"
  }
];

export default function EventsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedEvent, setSelectedEvent] = useState<SanctuaryEvent | null>(null);
  const [rsvpForm, setRsvpForm] = useState({ name: "", email: "", phone: "", notes: "", terms: false });
  const [isRsvpSuccess, setIsRsvpSuccess] = useState(false);
  const [savedEvents, setSavedEvents] = useState<string[]>([]);

  const filteredEvents = activeCategory === "all" 
    ? EVENTS 
    : EVENTS.filter(e => e.category === activeCategory);

  const toggleSaveEvent = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (savedEvents.includes(id)) {
      setSavedEvents(savedEvents.filter(eventId => eventId !== id));
    } else {
      setSavedEvents([...savedEvents, id]);
    }
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rsvpForm.name && rsvpForm.email && rsvpForm.terms) {
      setIsRsvpSuccess(true);
      setTimeout(() => {
        setIsRsvpSuccess(false);
        setRsvpForm({ name: "", email: "", phone: "", notes: "", terms: false });
        setSelectedEvent(null);
      }, 5000);
    }
  };

  return (
    <div id="events-page" className="space-y-16 py-4">
      
      {/* Page Header */}
      <div className="max-w-3xl">
        <span className="text-xs font-mono tracking-widest text-gold-600 uppercase block mb-2">
          Sanctuary Alignments & Satsang
        </span>
        <h2 className="text-4xl font-serif font-bold text-sage-900 tracking-tight leading-tight">
          Upcoming Events & Sacred Gatherings
        </h2>
        <p className="mt-4 text-sage-600 text-sm leading-relaxed">
          Step out of chronological time. Join our global community for intensive physical pilgrimages, online masterclasses, and sacred assemblies designed to anchor your mind in timeless awareness.
        </p>
      </div>

      {/* Category Filter & Saved Counter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-sage-100">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: "all", label: "All Gatherings" },
            { id: "yatra", label: "Mountain Yatras" },
            { id: "satsang", label: "Satsang & Darshan" },
            { id: "corporate", label: "Wellness Masterclasses" },
            { id: "certification", label: "Certifications" }
          ].map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`event-filter-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-sage-900 text-gold-100 shadow-sm"
                    : "bg-white text-sage-600 border border-sage-100 hover:bg-sage-50"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {savedEvents.length > 0 && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-50 border border-gold-200/40 text-[10px] font-mono font-bold text-gold-800 uppercase tracking-widest">
            <Bookmark className="w-3.5 h-3.5 text-gold-600 fill-current" />
            <span>{savedEvents.length} Saved Calendar Items</span>
          </div>
        )}
      </div>

      {/* Main Grid split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Events List */}
        <div className="lg:col-span-8 space-y-6">
          <AnimatePresence mode="wait">
            {filteredEvents.length > 0 ? (
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {filteredEvents.map((ev) => {
                  const isSaved = savedEvents.includes(ev.id);
                  const isSelected = selectedEvent?.id === ev.id;

                  return (
                    <div
                      key={ev.id}
                      id={`event-card-${ev.id}`}
                      onClick={() => {
                        setSelectedEvent(ev);
                        setIsRsvpSuccess(false);
                      }}
                      className={`group bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col md:flex-row items-stretch cursor-pointer hover:shadow-md ${
                        isSelected 
                          ? "border-gold-400 ring-2 ring-gold-200" 
                          : "border-sage-100"
                      }`}
                    >
                      {/* Date Block Left */}
                      <div className="md:w-32 bg-sage-50 flex md:flex-col items-center justify-center p-6 gap-2 border-r border-sage-100 shrink-0 text-center select-none group-hover:bg-sage-100/50 transition-colors">
                        <span className="text-[10px] font-mono tracking-widest text-sage-500 uppercase block font-bold leading-none">
                          {ev.month}
                        </span>
                        <span className="text-3xl font-serif font-bold text-sage-900 leading-none">
                          {ev.day}
                        </span>
                        <span className="text-[9px] font-mono tracking-wider text-gold-600 font-bold block bg-white border border-sage-100/60 px-2 py-0.5 rounded-full shadow-2xs mt-1">
                          {ev.categoryLabel}
                        </span>
                      </div>

                      {/* Info Center */}
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-mono text-gold-600 uppercase tracking-widest block font-semibold leading-none">
                              {ev.sanskrit}
                            </span>
                            <button
                              id={`save-event-btn-${ev.id}`}
                              onClick={(e) => toggleSaveEvent(ev.id, e)}
                              className={`p-1.5 rounded-full transition-colors ${
                                isSaved 
                                  ? "text-gold-600 bg-gold-50" 
                                  : "text-sage-400 hover:text-sage-700 bg-sage-50"
                              }`}
                              title={isSaved ? "Saved to calendar" : "Save calendar item"}
                            >
                              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-current" : ""}`} />
                            </button>
                          </div>

                          <h3 className="text-lg font-serif font-bold text-sage-900 leading-tight group-hover:text-gold-700 transition-colors">
                            {ev.title}
                          </h3>

                          <p className="text-xs text-sage-600 line-clamp-2 leading-relaxed">
                            {ev.description}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-[11px] font-mono text-sage-500 border-t border-sage-50 pt-3">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                            <span className="truncate">{ev.time}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            {ev.isVirtual ? (
                              <Video className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                            ) : (
                              <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                            )}
                            <span className="truncate">{ev.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Interactive Trigger Right */}
                      <div className="p-6 md:w-20 flex items-center justify-center border-t md:border-t-0 md:border-l border-sage-50 shrink-0 text-center select-none bg-[#faf9f5]">
                        <div className="w-10 h-10 rounded-full bg-sage-100 group-hover:bg-gold-600 group-hover:text-white flex items-center justify-center text-sage-700 transition-all duration-300 transform group-hover:translate-x-1">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            ) : (
              <div className="bg-white border border-sage-100 rounded-3xl p-12 text-center space-y-4">
                <Calendar className="w-12 h-12 text-sage-300 mx-auto" />
                <h4 className="font-serif font-bold text-md text-sage-800">No events found in this category</h4>
                <p className="text-xs text-sage-500 max-w-sm mx-auto">
                  Satsangs and Yatras arise as seasonal tides. Try selecting "All Gatherings" or check back during the next lunar cycle.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side: Event Details & RSVP Form */}
        <div className="lg:col-span-4 bg-white border border-sage-100 rounded-3xl p-6 relative min-h-[480px] flex flex-col justify-between shadow-2xs">
          <AnimatePresence mode="wait">
            {selectedEvent ? (
              <motion.div
                key={selectedEvent.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6 flex flex-col justify-between flex-1"
              >
                <div className="space-y-4">
                  <div className="relative h-40 rounded-2xl overflow-hidden shadow-xs">
                    <img
                      src={selectedEvent.image}
                      alt={selectedEvent.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-sage-950/80 via-transparent"></div>
                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[9px] font-mono text-gold-300 uppercase tracking-widest block mb-0.5 font-semibold">
                        {selectedEvent.sanskrit}
                      </span>
                      <h4 className="text-sm font-serif font-bold leading-tight">
                        {selectedEvent.title}
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-sage-500">
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-gold-600" />
                        <span>{selectedEvent.capacity}</span>
                      </div>
                      <span className="font-bold text-sage-800">{selectedEvent.price}</span>
                    </div>
                    <p className="text-[11px] text-sage-600 leading-relaxed font-sans">
                      {selectedEvent.description}
                    </p>
                  </div>

                  <div className="space-y-1.5 bg-[#faf9f5] border border-sage-100 p-4 rounded-xl">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-sage-400 font-bold block">
                      Sacred Inclusions:
                    </span>
                    <ul className="space-y-1">
                      {selectedEvent.inclusions.map((inc, i) => (
                        <li key={i} className="text-[10px] text-sage-700 flex items-start gap-1.5 font-medium leading-relaxed">
                          <CheckCircle className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* RSVP Form Block */}
                <div className="pt-4 border-t border-sage-100">
                  {!isRsvpSuccess ? (
                    <form onSubmit={handleRsvpSubmit} className="space-y-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-gold-700 font-bold block mb-1">
                        Request Ashram Reservation
                      </span>

                      <div className="space-y-2">
                        <input
                          id="rsvp-name"
                          type="text"
                          required
                          value={rsvpForm.name}
                          onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                          placeholder="Your Name (Sadhaka)"
                          className="w-full text-xs text-sage-950 bg-sage-50 rounded-xl p-2.5 border border-sage-100 focus:outline-none"
                        />
                        <input
                          id="rsvp-email"
                          type="email"
                          required
                          value={rsvpForm.email}
                          onChange={(e) => setRsvpForm({ ...rsvpForm, email: e.target.value })}
                          placeholder="Spiritual/Work Email"
                          className="w-full text-xs text-sage-950 bg-sage-50 rounded-xl p-2.5 border border-sage-100 focus:outline-none"
                        />
                        <textarea
                          id="rsvp-notes"
                          rows={2}
                          value={rsvpForm.notes}
                          onChange={(e) => setRsvpForm({ ...rsvpForm, notes: e.target.value })}
                          placeholder="Intention or dietary restrictions (optional)"
                          className="w-full text-[11px] text-sage-950 bg-sage-50 rounded-xl p-2.5 border border-sage-100 focus:outline-none resize-none"
                        ></textarea>
                      </div>

                      <label className="flex items-start gap-2 cursor-pointer select-none py-1">
                        <input
                          id="rsvp-terms"
                          type="checkbox"
                          required
                          checked={rsvpForm.terms}
                          onChange={(e) => setRsvpForm({ ...rsvpForm, terms: e.target.checked })}
                          className="w-3.5 h-3.5 mt-0.5 text-gold-600 accent-gold-600 cursor-pointer"
                        />
                        <span className="text-[10px] text-sage-500 leading-relaxed">
                          I agree to respect the ashram parameters, quiet hours, and sattvic food standards.
                        </span>
                      </label>

                      <button
                        id="rsvp-submit-btn"
                        type="submit"
                        className="w-full py-2.5 rounded-xl bg-sage-900 hover:bg-sage-950 text-gold-100 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Submit Reservation Request
                      </button>
                    </form>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-6 flex flex-col items-center text-center gap-2"
                    >
                      <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 border border-emerald-100 mb-1">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <h5 className="text-sm font-serif font-bold text-sage-900">Initiation Requested!</h5>
                      <p className="text-[11px] text-sage-600 leading-relaxed max-w-[220px]">
                        "Om Shanti, <strong>{rsvpForm.name}</strong>. We have saved a seat in our sacred circle for you. A welcoming dispatch is flying to your inbox."
                      </p>
                      <p className="text-[9px] text-sage-400 font-mono mt-1">
                        Target inbox: {rsvpForm.email}
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center flex-1 text-center py-16 space-y-4">
                <Calendar className="w-12 h-12 text-gold-200" />
                <h4 className="text-sm font-serif font-semibold text-sage-800">Reservation Channel</h4>
                <p className="text-xs text-sage-500 max-w-xs leading-relaxed">
                  Select any active gathering on the left to review unique event details, inclusions, locations, and request an immediate reservation slot in our circle.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
