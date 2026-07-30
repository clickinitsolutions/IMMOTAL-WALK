import React, { useState } from "react";
import { 
  Percent, 
  CheckCircle, 
  Tag, 
  Map, 
  BookOpen, 
  Heart, 
  ChevronRight, 
  Award,
  Calculator,
  Gift
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import BuddhaPresence from "./BuddhaPresence";

interface OfferPackage {
  id: string;
  title: string;
  sanskrit: string;
  originalPrice: number;
  salePrice: number;
  badge: string;
  description: string;
  benefits: string[];
  image: string;
}

const OFFERS: OfferPackage[] = [
  {
    id: "himalaya-retreat",
    title: "Gangotri Silence Pilgrimage (Early-Bird)",
    sanskrit: "गङ्गोत्री तीर्थयात्रा (Gangotri Yatra)",
    originalPrice: 1850,
    salePrice: 1480,
    badge: "20% Seasonal Offering",
    description: "An intensive 10-day physical and spiritual retreat in the high Himalayas. Access silent contemplation, direct Satsang with lineage elders, and pure Prana breathwork overlooking the holy Ganges.",
    benefits: [
      "Traditional ashram accommodation & organic meals",
      "Daily sunrise dhyana and spinal alignment yoga",
      "Deep-dive study on Advaita Vedanta and Upanishads",
      "Guided spiritual yatra trek to the Gangotri glacier source"
    ],
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "gurukul-pass",
    title: "Unbound Gurukul Lifetime Access Pass",
    sanskrit: "सदा सत्सङ्ग (Sada Satsang)",
    originalPrice: 450,
    salePrice: 295,
    badge: "Exclusive Ashram Circle",
    description: "Your digital portal to timeless clarity. Complete access to our premium high-frequency breathwork sound oscillators, private Contemplative Journal reviews by masters, and all future online courses.",
    benefits: [
      "Lifetime access to all current and future 7-day programs",
      "Unlimited digital Japa Mala round records",
      "Monthly live virtual Darshan and Q&A with Acharya Shunya",
      "Exclusive high-definition soundscapes & Solfeggio sound mixes"
    ],
    image: "https://i.pinimg.com/736x/b2/40/20/b240202a0b48a98eb784837526cb353f.jpg"
  },
  {
    id: "sacred-study-bundle",
    title: "Svara Wisdom Book & Audio Bundle",
    sanskrit: "ज्ञान ग्रन्थ (Jnana Granth Bundle)",
    originalPrice: 125,
    salePrice: 85,
    badge: "Limited Physical Release",
    description: "A meticulously crafted set of three physical translations of foundational non-dual texts paired with a customized high-fidelity physical copper singing bowl tuned to Ajna frequencies.",
    benefits: [
      "Hardcover editions of Mandukya Upanishad with ancient commentaries",
      "Handcrafted 5-inch bronze singing bowl with velvet cushion & striker",
      "Preloaded audio card containing 24 hours of Vedic chants",
      "Free global shipping directly from our Tapovan Sanctuary"
    ],
    image: "https://i.pinimg.com/736x/52/6b/23/526b2388d24c122ce5815ff42f81d241.jpg"
  }
];

export default function OffersSection() {
  const [selectedOffer, setSelectedOffer] = useState<OfferPackage | null>(null);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0); // value in percentage
  const [couponError, setCouponError] = useState("");
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);
  const [bookingForm, setBookingForm] = useState({ name: "", email: "", notes: "" });

  // Interactive Alignment Calculator states
  const [calcDuration, setCalcDuration] = useState<number>(3); // days
  const [calcTier, setCalcTier] = useState<"standard" | "vip" | "monk">("standard");
  const [calcWithMeals, setCalcWithMeals] = useState<boolean>(true);

  // Calculate estimated contribution
  const estimatePrice = () => {
    let dailyRate = 120;
    if (calcTier === "vip") dailyRate = 220;
    if (calcTier === "monk") dailyRate = 45; // Subsidized rate

    let total = dailyRate * calcDuration;
    if (calcWithMeals) {
      total += 25 * calcDuration;
    }
    return total;
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    const code = couponCode.trim().toUpperCase();

    if (code === "OMSHANTI") {
      setAppliedCoupon("OMSHANTI");
      setCouponDiscount(15); // 15% off
      setCouponCode("");
    } else if (code === "PRANA") {
      setAppliedCoupon("PRANA");
      setCouponDiscount(25); // 25% off
      setCouponCode("");
    } else if (code === "YATRA50") {
      setAppliedCoupon("YATRA50");
      setCouponDiscount(50); // 50% off
      setCouponCode("");
    } else {
      setCouponError("This Coupon has not yet materialized in this realm.");
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingForm.name && bookingForm.email) {
      setIsBookingSuccess(true);
      setTimeout(() => {
        setIsBookingSuccess(false);
        setBookingForm({ name: "", email: "", notes: "" });
        setSelectedOffer(null);
        setAppliedCoupon(null);
        setCouponDiscount(0);
      }, 5000);
    }
  };

  return (
    <div id="offers-page" className="space-y-16 py-4">
      
      {/* Dynamic Top Header with Buddha mini presence */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="max-w-3xl">
          <span className="text-xs font-mono tracking-widest text-gold-600 uppercase block mb-2">
            Sanctuary Subsidies & Offerings
          </span>
          <h2 className="text-4xl font-serif font-bold text-sage-900 tracking-tight leading-tight">
            Sacred Exchange & Devotional Packages
          </h2>
          <p className="mt-3 text-sage-600 text-sm leading-relaxed">
            Spiritual growth should not be constrained by financial mechanics. Through seasonal subsidies, patron grants, and community scholarships, we make our physical retreats and digital instruments accessible to every sincere seeker.
          </p>
        </div>
        <BuddhaPresence variant="mini" />
      </div>

      {/* Grid of Offers - Redesigned into High-Fidelity Pricing Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {OFFERS.map((offer) => {
          const discountAmt = Math.round(offer.originalPrice - offer.salePrice);
          const isRecommended = offer.id === "gurukul-pass";
          
          return (
            <div
              key={offer.id}
              id={`offer-card-${offer.id}`}
              className={`relative bg-white rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 ${
                isRecommended 
                  ? "border-2 border-gold-400 bg-amber-50/10 shadow-[0_12px_40px_rgba(209,141,53,0.18)] scale-[1.02]" 
                  : "border border-sage-100 shadow-xs hover:shadow-md"
              }`}
            >
              {/* Recommended Ribbon / Badge */}
              {isRecommended && (
                <div className="absolute top-0 right-1/2 translate-x-1/2 z-20 bg-gold-600 text-[#faf9f5] text-[9px] font-mono font-bold px-4 py-1.5 rounded-b-xl uppercase tracking-widest shadow-md">
                  ★ RECOMMENDED BY LINEAGE ★
                </div>
              )}

              <div className="relative h-48">
                <img
                  src={offer.image}
                  alt={offer.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sage-950/80 via-sage-950/20 to-transparent"></div>
                
                <span className="absolute top-4 left-4 bg-[#faf9f5]/90 backdrop-blur-xs text-sage-900 text-[9px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-widest shadow-sm border border-gold-200">
                  {offer.badge}
                </span>

                <div className="absolute bottom-4 left-5 right-5">
                  <span className="text-gold-300 text-[10px] font-mono uppercase tracking-widest block mb-0.5 font-bold">
                    {offer.sanskrit}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-[#faf9f5] leading-tight">
                    {offer.title}
                  </h3>
                </div>
              </div>

              {/* Pricing Content Area */}
              <div className="p-6 md:p-7 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-5">
                  <p className="text-xs text-sage-600 leading-relaxed font-sans">
                    {offer.description}
                  </p>

                  <div className="space-y-2.5 pt-2">
                    <span className="text-[10px] uppercase font-mono text-sage-400 tracking-wider block font-bold">Package Inclusions:</span>
                    <ul className="space-y-2">
                      {offer.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-xs text-sage-700 flex items-start gap-2.5 leading-relaxed">
                          <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${isRecommended ? "text-gold-600" : "text-sage-500"}`} />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pricing & Selection Section */}
                <div className={`pt-5 border-t ${isRecommended ? "border-gold-200/50" : "border-sage-50"} flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-auto`}>
                  <div className="flex flex-col justify-center">
                    <span className="text-xs text-sage-400 line-through">
                      ${offer.originalPrice} USD
                    </span>
                    <span className="text-2xl font-serif font-extrabold text-sage-950 leading-none mt-1">
                      ${offer.salePrice} <span className="text-xs font-mono text-sage-500 font-normal">USD</span>
                    </span>
                    <span className={`text-[10px] font-mono mt-1 px-2 py-0.5 rounded-md inline-block w-fit font-bold ${
                      isRecommended ? "bg-gold-100 text-gold-800" : "bg-emerald-50 text-emerald-700"
                    }`}>
                      Save ${discountAmt} USD
                    </span>
                  </div>

                  <button
                    id={`claim-offer-${offer.id}`}
                    onClick={() => {
                      setSelectedOffer(offer);
                      setIsBookingSuccess(false);
                    }}
                    className={`min-h-[44px] px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-xs ${
                      isRecommended 
                        ? "bg-gold-600 hover:bg-gold-700 text-white hover:shadow-md animate-pulse-gold" 
                        : "bg-sage-900 hover:bg-sage-950 text-gold-100"
                    }`}
                  >
                    Select Offer
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Decorative Wisdom Banner from Shakyamuni Buddha */}
      <BuddhaPresence 
        variant="banner" 
        quote="Generosity is the first paramita of liberation. When we share, we dissolve the rigid boundaries of the separate self." 
      />

      {/* Interactive Estimator and Booking Column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Side: Interactive Dynamic Retreat Estimator */}
        <div className="lg:col-span-6 bg-sage-50 border border-sage-100 rounded-3xl p-8 space-y-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-gold-600" />
              <h3 className="text-xl font-serif font-bold text-sage-900">Custom Retreat Estimator</h3>
            </div>
            <p className="text-xs text-sage-600 leading-relaxed">
              Design your personalized pilgrimage stay at our Tapovan Hermitage. Adjust the parameters below to dynamically materialize your custom financial exchange.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {/* Number of Days */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono text-sage-700">
                <span>Duration of Contemplation:</span>
                <span className="font-bold text-sage-900">{calcDuration} Days</span>
              </div>
              <input
                id="calc-duration-slider"
                type="range"
                min="1"
                max="14"
                value={calcDuration}
                onChange={(e) => setCalcDuration(parseInt(e.target.value))}
                className="w-full h-1.5 bg-sage-100 rounded-full appearance-none cursor-pointer accent-gold-600"
              />
            </div>

            {/* Lodging Tier Selection */}
            <div className="space-y-2">
              <label className="block text-[10px] uppercase font-mono tracking-widest text-sage-400 font-bold">
                Lodging & Guidance Tier
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "monk", label: "Gurukul Style", desc: "Subsidized Dorm" },
                  { value: "standard", label: "Hermit Cell", desc: "Private Room" },
                  { value: "vip", label: "Ganges Room", desc: "Private Balcony" }
                ].map((tier) => (
                  <button
                    key={tier.value}
                    id={`calc-tier-${tier.value}`}
                    onClick={() => setCalcTier(tier.value as any)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      calcTier === tier.value
                        ? "bg-sage-900 text-gold-100 border-sage-900"
                        : "bg-white text-sage-700 border-sage-100 hover:bg-sage-50"
                    }`}
                  >
                    <span className="text-[11px] font-bold block">{tier.label}</span>
                    <span className="text-[9px] opacity-60 block mt-0.5">{tier.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle organic meals */}
            <label className="flex items-center gap-3 bg-white p-3 rounded-xl border border-sage-100 cursor-pointer select-none">
              <input
                id="calc-meals-checkbox"
                type="checkbox"
                checked={calcWithMeals}
                onChange={(e) => setCalcWithMeals(e.target.checked)}
                className="w-4 h-4 text-gold-600 border-sage-200 rounded-xs focus:ring-transparent accent-gold-600"
              />
              <div className="text-left">
                <span className="text-xs font-semibold text-sage-900 block">Include Organic Ayurvedic Meals</span>
                <span className="text-[9px] text-sage-500 block">Three fresh sattvic vegetarian meals daily (+ $25 USD / day)</span>
              </div>
            </label>
          </div>

          <div className="bg-white border-t border-sage-100 p-5 rounded-2xl flex items-center justify-between shadow-2xs">
            <div>
              <span className="text-[9px] uppercase font-mono text-sage-400 tracking-widest block">Estimated Value Exchange</span>
              <span className="text-2xl font-serif font-bold text-sage-900">${estimatePrice()} USD</span>
            </div>
            
            <button
              id="book-custom-retreat-btn"
              onClick={() => {
                const dummyPackage: OfferPackage = {
                  id: "custom-pilgrimage",
                  title: `Custom ${calcDuration}-Day Tapovan Pilgrimage`,
                  sanskrit: "आत्म दर्शन (Atma Darshan stay)",
                  originalPrice: estimatePrice() + 100,
                  salePrice: estimatePrice(),
                  badge: "Custom Estimation",
                  description: `A custom staying arrangement for ${calcDuration} days under the ${calcTier === "monk" ? "subsidized Gurukul style" : calcTier === "vip" ? "premium Ganges view" : "standard private Hermit"} tier.`,
                  benefits: [
                    "Individual contemplative study",
                    calcWithMeals ? "Daily organic Sattvic meals" : "Self-sourced meals from Tapovan market",
                    "Direct reference reading materials in our library"
                  ],
                  image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=800"
                };
                setSelectedOffer(dummyPackage);
                setIsBookingSuccess(false);
              }}
              className="px-5 py-2.5 rounded-full bg-gold-600 hover:bg-gold-700 text-white font-semibold text-xs uppercase tracking-wider transition-colors shadow-xs"
            >
              Lock in arrangement
            </button>
          </div>
        </div>

        {/* Right Side: Selected Offer Checkout / Form */}
        <div className="lg:col-span-6 bg-white border border-sage-100 rounded-3xl p-8 relative min-h-[460px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {selectedOffer ? (
              <motion.div
                key="checkout-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono uppercase text-gold-600 tracking-widest block font-bold">
                      Devotional Commitment
                    </span>
                    <button
                      id="cancel-checkout-btn"
                      onClick={() => setSelectedOffer(null)}
                      className="text-xs text-sage-400 hover:text-sage-600"
                    >
                      ✕ Cancel Selection
                    </button>
                  </div>
                  <h4 className="text-xl font-serif font-bold text-sage-900 mt-1">{selectedOffer.title}</h4>
                  <p className="text-[11px] text-sage-500 mt-0.5">{selectedOffer.description}</p>
                </div>

                {/* Simulated Coupon input */}
                <form onSubmit={handleApplyCoupon} className="bg-sage-50 p-4 rounded-2xl border border-sage-100 space-y-3">
                  <span className="block text-[10px] uppercase font-mono tracking-widest text-sage-400 font-bold">
                    Ashram Coupon Attunement
                  </span>
                  
                  <div className="flex gap-2">
                    <input
                      id="coupon-code-input"
                      type="text"
                      placeholder="e.g., OMSHANTI, PRANA, YATRA50"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 text-xs text-sage-950 bg-white rounded-xl p-2.5 border border-sage-100 focus:outline-none uppercase"
                    />
                    <button
                      id="apply-coupon-btn"
                      type="submit"
                      className="px-4 py-2 bg-sage-800 hover:bg-sage-950 text-gold-100 rounded-xl text-xs font-semibold cursor-pointer uppercase font-mono"
                    >
                      Apply
                    </button>
                  </div>

                  {couponError && (
                    <p className="text-[10px] text-red-500 font-mono italic">{couponError}</p>
                  )}

                  {appliedCoupon && (
                    <div className="flex items-center justify-between text-[11px] text-emerald-600 font-mono">
                      <span>✓ Coupon '{appliedCoupon}' Active</span>
                      <span>-{couponDiscount}% discount realized</span>
                    </div>
                  )}
                </form>

                {/* Interactive Booking Form */}
                {!isBookingSuccess ? (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[9px] uppercase font-mono tracking-widest text-sage-400 mb-1">
                          Aspirant Name
                        </label>
                        <input
                          id="booking-name-input"
                          type="text"
                          required
                          value={bookingForm.name}
                          onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                          placeholder="Siddhartha"
                          className="w-full text-xs text-sage-950 bg-sage-50 rounded-xl p-2.5 border border-sage-100 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase font-mono tracking-widest text-sage-400 mb-1">
                          Aspirant Email
                        </label>
                        <input
                          id="booking-email-input"
                          type="email"
                          required
                          value={bookingForm.email}
                          onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                          placeholder="peace@universe.com"
                          className="w-full text-xs text-sage-950 bg-sage-50 rounded-xl p-2.5 border border-sage-100 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase font-mono tracking-widest text-sage-400 mb-1">
                        Special requests or contemplation status
                      </label>
                      <textarea
                        id="booking-notes-input"
                        rows={2}
                        value={bookingForm.notes}
                        onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                        placeholder="e.g. dietary limits, hip stiffness, physical blockages"
                        className="w-full text-xs text-sage-950 bg-sage-50 rounded-xl p-2.5 border border-sage-100 focus:outline-none resize-none"
                      ></textarea>
                    </div>

                    {/* Final Contribution estimation */}
                    <div className="border-t border-sage-100 pt-4 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-sage-400 block uppercase">Final Exchange Contribution</span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-serif font-bold text-sage-900">
                            ${Math.round(selectedOffer.salePrice * (1 - couponDiscount / 100))} USD
                          </span>
                          {couponDiscount > 0 && (
                            <span className="text-xs text-sage-400 line-through">
                              ${selectedOffer.salePrice}
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        id="confirm-devotional-exchange-btn"
                        type="submit"
                        className="px-6 py-3 bg-sage-900 text-gold-100 hover:bg-sage-950 rounded-xl font-bold text-xs uppercase tracking-widest shadow-md cursor-pointer flex items-center gap-2"
                      >
                        <Gift className="w-3.5 h-3.5" />
                        <span>Confirm Sanctuary Reservation</span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <motion.div
                    key="checkout-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 flex flex-col items-center gap-3 text-center"
                  >
                    <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 border border-emerald-100 shadow-xs">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h5 className="text-lg font-serif font-bold text-sage-900">Pilgrimage Materialized!</h5>
                    <p className="text-xs text-sage-600 max-w-xs leading-relaxed">
                      "Thank you, <strong>{bookingForm.name}</strong>. Your devotional reservation has been registered in the physical records of our Rishikesh Sanctuary."
                    </p>
                    <p className="text-[10px] text-sage-400 max-w-xs leading-relaxed">
                      An initiation dispatch containing detailed packing guides, travel instructions, and pre-retreat meditation exercises has been transmitted to <strong className="text-sage-800">{bookingForm.email}</strong>.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center flex-1 text-center py-12 space-y-4">
                <Gift className="w-12 h-12 text-gold-200" />
                <h4 className="text-md font-serif font-semibold text-sage-800">Ashram Devotional Checkout</h4>
                <p className="text-xs text-sage-500 max-w-xs leading-relaxed">
                  Select any premium retreat package or custom stays above to materialize your reservation, apply your coupon, and finalize your sacred contribution.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>

    </div>
  );
}
