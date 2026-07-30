import React, { useState } from "react";
import { Calendar, DollarSign, MapPin, Check, Send, AlertCircle, X } from "lucide-react";
import { Retreat } from "../types";
import { motion, AnimatePresence } from "motion/react";

const RETREATS: Retreat[] = [
  {
    id: "rishikesh",
    title: "Sacred Valley Sanctuary",
    location: "Rishikesh, Himalayas, India",
    duration: "10 Days",
    price: "$2,450",
    description: "Inhabit the ancient spiritual energy of the Ganges. Connect with deep lineage teachings of Kundalini, Advaita Vedanta, and holy meditation in silent ashrams.",
    image: "https://i.pinimg.com/736x/52/6b/23/526b2388d24c122ce5815ff42f81d241.jpg",
    inclusions: [
      "Traditional Ashram Accommodations",
      "Daily Satsangs with Enlightened Masters",
      "Organic Ayurvedic Sattvic Meals",
      "Sacred Fire Ceremonies (Havan)"
    ]
  },
  {
    id: "kyoto",
    title: "Zen Bamboo Forest Temple",
    location: "Kyoto, Arashiyama, Japan",
    duration: "7 Days",
    price: "$3,100",
    description: "Align your spirit with the silence of Japanese bamboo forests. Experience calligraphy meditations, traditional tea ceremonies, and pristine Zen garden walking.",
    image: "https://images.unsplash.com/photo-1542382156909-9ae3b0245754?auto=format&fit=crop&q=80&w=1200",
    inclusions: [
      "Historic Temple Ryokan Accommodations",
      "Guided Zazen Walking Meditations",
      "Organic Shojin Ryori (Zen Temple Cuisine)",
      "Exclusive Matcha Ritual Masterclasses"
    ]
  },
  {
    id: "costarica",
    title: "Jungle Canopy Awakening",
    location: "Nosara Jungle, Costa Rica",
    duration: "8 Days",
    price: "$1,890",
    description: "Awaken your physical prana in high Nosara jungle canopies. Breathe ocean mist during sunset Vinyasa and connect with pristine raw tropical nature.",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
    inclusions: [
      "Sustainable Bamboo Eco-Lodge Cabin",
      "Cacao Ceremonies & Sound Baths",
      "Sunset Shoreline Vinyasa & Breathwork",
      "Organic Farm-to-Table Superfood Meals"
    ]
  }
];

export default function RetreatsSection() {
  const [activeRetreat, setActiveRetreat] = useState<Retreat | null>(null);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    retreatId: "",
    date: "",
    specialNeeds: ""
  });
  const [itinerary, setItinerary] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEnquire = (retreat: Retreat) => {
    setActiveRetreat(retreat);
    setBookingForm((prev) => ({
      ...prev,
      retreatId: retreat.id
    }));
    setItinerary(null);
  };

  const handleBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.email || !bookingForm.date) {
      alert("Please fill in all necessary credentials.");
      return;
    }

    setLoading(true);
    // Simulate generation of a personalized spiritual itinerary
    setTimeout(() => {
      const selected = RETREATS.find(r => r.id === bookingForm.retreatId) || RETREATS[0];
      setItinerary({
        retreatTitle: selected.title,
        location: selected.location,
        clientName: bookingForm.name,
        date: bookingForm.date,
        blessing: "May the guardians of stillness welcome your heart on this sacred journey.",
        packingSuggestions: [
          "Light, comfortable off-white cotton clothes",
          "Personal meditation shawl",
          "A journal to record revelations",
          "A completely open, quiet mind"
        ],
        dailyFlow: [
          "05:30 AM — Prana Pranayama and Morning Silence",
          "07:00 AM — Solar Hatha Yoga Alignment",
          "09:00 AM — Organic Sattvic Breakfast Feast",
          "11:00 AM — Sacred Lineage Wisdom Teaching / satsang",
          "04:00 PM — Earth Walks & Mindful Forest Bathing",
          "06:30 PM — Evening Mantra Chanting & Candlelit Zazen"
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div id="retreats-module" className="space-y-12">
      <div>
        <span className="text-xs font-mono tracking-widest text-gold-600 uppercase block mb-2">
          Immortal Journeys
        </span>
        <h3 className="text-3xl font-serif font-semibold text-sage-900 tracking-tight leading-tight">
          Global Wellness Retreats
        </h3>
        <p className="mt-2 text-sage-600 text-sm max-w-2xl leading-relaxed">
          Step out of the mechanical matrix. Inhabit sacred natural vortexes around the globe with master lineage guides, organic cuisine, and deep silent stillness.
        </p>
      </div>

      {/* Retreat Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {RETREATS.map((ret) => {
          return (
            <motion.div
              key={ret.id}
              id={`retreat-card-${ret.id}`}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl overflow-hidden border border-sage-100 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 group card-micro"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={ret.image}
                  alt={ret.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-sage-950/80 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-mono text-gold-300 uppercase tracking-widest">
                  {ret.duration}
                </div>
              </div>

              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-sage-500 text-xs font-mono">
                    <MapPin className="w-3.5 h-3.5 text-gold-600" />
                    <span>{ret.location}</span>
                  </div>
                  <h4 className="text-xl font-serif font-bold text-sage-900 leading-tight">
                    {ret.title}
                  </h4>
                  <p className="text-xs text-sage-600 leading-relaxed">
                    {ret.description}
                  </p>
                </div>

                {/* Inclusions */}
                <div className="space-y-2 pt-4 border-t border-sage-100">
                  <span className="text-[10px] font-mono text-sage-400 uppercase tracking-widest block">
                    Sanctuary Inclusions
                  </span>
                  <ul className="grid grid-cols-1 gap-1.5 text-xs text-sage-700">
                    {ret.inclusions.map((inc, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                        <span className="truncate">{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-sage-100">
                  <div>
                    <span className="text-[9px] uppercase font-mono tracking-widest text-sage-400 block">
                      Enlightened Value
                    </span>
                    <span className="text-lg font-bold text-sage-900">
                      {ret.price} <span className="text-xs text-sage-500 font-normal">/ all-inclusive</span>
                    </span>
                  </div>
                  <motion.button
                    id={`enquire-btn-${ret.id}`}
                    onClick={() => handleEnquire(ret)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-full bg-sage-600 hover:bg-sage-700 text-white font-semibold text-xs transition-colors cursor-pointer shadow-xs btn-shimmer"
                  >
                    Join the Journey
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Booking Drawer/Modal */}
      <AnimatePresence>
        {activeRetreat && (
          <div className="fixed inset-0 bg-sage-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl border border-sage-100 max-w-4xl w-full overflow-hidden shadow-2xl relative grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                id="close-booking-modal-btn"
                onClick={() => setActiveRetreat(null)}
                className="absolute top-4 right-4 p-2 bg-sage-100 hover:bg-sage-200 text-sage-600 rounded-full transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Sidebar description */}
              <div className="md:col-span-5 bg-sage-50 p-8 border-r border-sage-100 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="text-xs font-mono text-gold-700 uppercase tracking-widest bg-gold-100 px-3 py-1 rounded-full inline-block">
                    {activeRetreat.duration} Journey
                  </span>
                  <h4 className="text-2xl font-serif font-bold text-sage-900 leading-tight">
                    {activeRetreat.title}
                  </h4>
                  <p className="text-xs text-sage-600 leading-relaxed">
                    {activeRetreat.description}
                  </p>
                  
                  <div className="space-y-2 pt-4 border-t border-sage-200">
                    <span className="text-[10px] font-mono text-sage-400 uppercase tracking-widest block font-bold">
                      Essential Highlights
                    </span>
                    <ul className="space-y-1.5 text-xs text-sage-700">
                      {activeRetreat.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-sage-600 shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-sage-200">
                  <span className="text-xs text-sage-500 block font-mono uppercase tracking-widest">All-Inclusive Sanctuary Value</span>
                  <span className="text-2xl font-serif font-bold text-sage-900">{activeRetreat.price}</span>
                </div>
              </div>

              {/* Form or Itinerary output */}
              <div className="md:col-span-7 p-8">
                <AnimatePresence mode="wait">
                  {!itinerary ? (
                    /* Booking Form */
                    <motion.form
                      key="booking-form"
                      onSubmit={handleBook}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div>
                        <h4 className="text-lg font-serif font-semibold text-sage-900">Enquiry Form</h4>
                        <p className="text-xs text-sage-500">Provide your travel intention and details below to unlock your custom schedule.</p>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="block text-[10px] uppercase font-mono tracking-wider text-sage-400 mb-1.5">
                            Spiritual Name / Full Name
                          </label>
                          <input
                            id="book-name-input"
                            type="text"
                            required
                            value={bookingForm.name}
                            onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                            placeholder="e.g., Siddhartha Gautama"
                            className="w-full text-xs text-sage-950 bg-sage-50 rounded-lg p-2.5 border border-sage-100 focus:outline-none focus:border-sage-300"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-mono tracking-wider text-sage-400 mb-1.5">
                            Sanctuary Contact Email
                          </label>
                          <input
                            id="book-email-input"
                            type="email"
                            required
                            value={bookingForm.email}
                            onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                            placeholder="e.g., peace@awareness.com"
                            className="w-full text-xs text-sage-950 bg-sage-50 rounded-lg p-2.5 border border-sage-100 focus:outline-none focus:border-sage-300"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] uppercase font-mono tracking-wider text-sage-400 mb-1.5">
                              Preferred Session Date
                            </label>
                            <input
                              id="book-date-input"
                              type="date"
                              required
                              value={bookingForm.date}
                              onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                              className="w-full text-xs text-sage-950 bg-sage-50 rounded-lg p-2.5 border border-sage-100 focus:outline-none focus:border-sage-300"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] uppercase font-mono tracking-wider text-sage-400 mb-1.5">
                              Dietary / Spiritual Focus
                            </label>
                            <select
                              id="book-focus-select"
                              value={bookingForm.specialNeeds}
                              onChange={(e) => setBookingForm({ ...bookingForm, specialNeeds: e.target.value })}
                              className="w-full text-xs text-sage-950 bg-sage-50 rounded-lg p-2.5 border border-sage-100 focus:outline-none focus:border-sage-300"
                            >
                              <option value="Sattvic Vegetarian">Sattvic Vegetarian</option>
                              <option value="Vegan Cleanse">Vegan Organic Cleanse</option>
                              <option value="Mauna Silence Focus">Mauna (Vow of Silence)</option>
                              <option value="No restrictions">Balanced / No restrictions</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <button
                        id="submit-booking-btn"
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-sage-900 text-gold-100 hover:bg-sage-950 rounded-xl font-semibold flex items-center justify-center gap-2 text-xs transition-colors cursor-pointer"
                      >
                        {loading ? (
                          <>
                            <div className="w-4 h-4 rounded-full border-t-2 border-gold-300 border-r-2 border-transparent animate-spin"></div>
                            <span>Casting Spiritual Manifestation...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Submit Journey Enquiry</span>
                          </>
                        )}
                      </button>
                    </motion.form>
                  ) : (
                    /* Beautiful Itinerary Output */
                    <motion.div
                      key="itinerary"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center gap-2 text-gold-600 bg-gold-50 border border-gold-200/50 p-4 rounded-2xl">
                        <Check className="w-5 h-5 shrink-0" />
                        <div>
                          <h4 className="text-sm font-serif font-bold text-sage-900">Enquiry Confirmed!</h4>
                          <p className="text-[11px] text-sage-600">Your personal spiritual itinerary has materialized below.</p>
                        </div>
                      </div>

                      {/* Itinerary specifications */}
                      <div className="space-y-4">
                        <div className="space-y-1">
                          <span className="text-[9px] uppercase font-mono text-sage-400 tracking-widest block">Journeyman details</span>
                          <p className="text-xs text-sage-900">
                            <strong>{itinerary.clientName}</strong> — Joining the <strong>{itinerary.retreatTitle}</strong> on <strong>{itinerary.date}</strong>.
                          </p>
                        </div>

                        {/* Blessing quote */}
                        <blockquote className="border-l-2 border-gold-400 pl-3 italic text-xs text-sage-700 font-serif leading-relaxed">
                          "{itinerary.blessing}"
                        </blockquote>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Packing suggestions */}
                          <div className="space-y-2 bg-sage-50/50 p-4 rounded-xl border border-sage-100">
                            <span className="text-[9px] uppercase font-mono text-sage-500 tracking-widest block font-semibold">Suggested Packing List</span>
                            <ul className="space-y-1.5 text-[11px] text-sage-700">
                              {itinerary.packingSuggestions.map((item: string, i: number) => (
                                <li key={i} className="flex items-center gap-1.5">
                                  <Check className="w-3 h-3 text-sage-600" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Daily Flow schedule */}
                          <div className="space-y-2 bg-sage-50/50 p-4 rounded-xl border border-sage-100">
                            <span className="text-[9px] uppercase font-mono text-sage-500 tracking-widest block font-semibold">Typical Daily Flow</span>
                            <ul className="space-y-1.5 text-[10px] text-sage-700 font-mono">
                              {itinerary.dailyFlow.map((item: string, i: number) => (
                                <li key={i} className="truncate">
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          id="reset-enquiry-btn"
                          onClick={() => setItinerary(null)}
                          className="px-4 py-2 rounded-lg border border-sage-200 text-sage-600 hover:bg-sage-50 text-xs font-semibold transition-all"
                        >
                          Modify Enquiry
                        </button>
                        <button
                          id="close-entire-btn"
                          onClick={() => setActiveRetreat(null)}
                          className="px-4 py-2 rounded-lg bg-sage-900 text-gold-100 hover:bg-sage-950 text-xs font-semibold transition-all"
                        >
                          Acknowledge & Close
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
