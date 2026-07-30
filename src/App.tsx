import React, { useState } from "react";
import { 
  Gift, 
  Compass, 
  Feather, 
  BookOpen, 
  Map, 
  PenTool, 
  Moon,
  ChevronRight,
  Menu,
  X,
  Volume2,
  Heart,
  CheckCircle,
  HelpCircle,
  Sun,
  Activity,
  Award,
  Home,
  Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import WisdomSection from "./components/WisdomSection";
import BreathworkSection from "./components/BreathworkSection";
import JournalSection from "./components/JournalSection";
import MeditationSection from "./components/MeditationSection";
import YogaSection from "./components/YogaSection";
import RetreatsSection from "./components/RetreatsSection";
import AboutSection from "./components/AboutSection";
import ProgramsSection from "./components/ProgramsSection";
import OfferingsSection from "./components/OfferingsSection";
import ContactSection from "./components/ContactSection";
import BlogSection from "./components/BlogSection";
import EventsSection from "./components/EventsSection";
import ThreeDCanvas from "./components/ThreeDCanvas";
import BuddhaPresence from "./components/BuddhaPresence";
import ThreeDBuddhaCard from "./components/ThreeDBuddhaCard";
import SacredGallery3D from "./components/SacredGallery3D";
import LineageHero from "./components/LineageHero";
import ThreeDActiveIcons from "./components/ThreeDActiveIcons";
import PresenceCard3D, { PRESENCE_DATA } from "./components/PresenceCard3D";
import PranicVisualAids from "./components/PranicVisualAids";
import CorporateBurnout from "./components/CorporateBurnout";
import SpinelignProgram from "./components/SpinelignProgram";
import NlpProgram from "./components/NlpProgram";
import MentalHealthWellness from "./components/MentalHealthWellness";
import SelfAssessment from "./components/SelfAssessment";
import DiscoverHarmoniseProgram from "./components/DiscoverHarmoniseProgram";

// Navigation pages (representing properly structured navigable pages requested by user)
type PageId = "home" | "about" | "programs" | "journal" | "blog" | "offerings" | "events" | "contact"
  | "corporate-burnout" | "spinelign" | "nlp-program" | "mental-health-wellness"
  | "corporate-unburn" | "nlp" | "mental-wellness" | "self-assessment"
  | "discover-transform" | "discover-harmonise";

export const SUB_OFFERINGS = [
  { id: "discover-transform", label: "Discover Harmonise Transform" },
  { id: "corporate-unburn", label: "Corporate Unburn" },
  { id: "spinelign", label: "Spinelign" },
  { id: "nlp", label: "NLP (Neuro-Linguistic Programming – Rewire)" },
  { id: "mental-wellness", label: "Mental Wellness Assistant Program" }
];

// Navigation tabs matching the vertical menu from the reference image inside the Home page
type TabId = "meditation" | "yoga" | "breathwork" | "wisdom" | "retreats" | "yantra";

interface NavItem {
  id: TabId;
  label: string;
  sanskrit: string;
  icon: React.ComponentType<any>;
}

const NAV_ITEMS: NavItem[] = [
  { id: "meditation", label: "Meditation", sanskrit: "ध्यान (Dhyana)", icon: Moon },
  { id: "yoga", label: "Yoga", sanskrit: "योग (Asana)", icon: Compass },
  { id: "breathwork", label: "Breathwork", sanskrit: "प्राणायाम (Pranayama)", icon: Feather },
  { id: "wisdom", label: "Wisdom Teachings", sanskrit: "सत्संग (Satsang)", icon: BookOpen },
  { id: "retreats", label: "Retreats", sanskrit: "तीर्थयात्रा (Yatra)", icon: Map },
  { id: "yantra", label: "Yantra Guides", sanskrit: "यन्त्र (Yantra)", icon: Activity }
];

export default function App() {
  const [activePage, setActivePage] = useState<PageId>("home");
  const [activeTab, setActiveTab] = useState<TabId>("meditation");
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [newsForm, setNewsForm] = useState({ name: "", email: "" });
  const [newsSubscribed, setNewsSubscribed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveringOfferings, setHoveringOfferings] = useState(false);

  // New homepage interactive states matching screenshot requirements
  const [activePranaCard, setActivePranaCard] = useState<number | null>(null);
  const [selectedFlexibility, setSelectedFlexibility] = useState<string>("gentle");
  const [selectedFocus, setSelectedFocus] = useState<string>("mindfulness");
  const [calculatedAlignment, setCalculatedAlignment] = useState<{ posture: string; mantra: string; duration: string; prana: string } | null>(null);
  const [activeChakra, setActiveChakra] = useState<string | null>(null);
  const [activeBlessing, setActiveBlessing] = useState<number | null>(null);
  const [bookingForm, setBookingForm] = useState({ name: "", email: "", path: "asana", time: "sunrise" });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [activeHero3D, setActiveHero3D] = useState<"buddha" | "geometry">("buddha");
  const [leftHovered, setLeftHovered] = useState(false);
  const [rightHovered, setRightHovered] = useState(false);

  // Smooth scroll to work chamber
  const scrollToChamber = () => {
    if (activePage !== "home") {
      handlePageNavigation("home");
      setTimeout(() => {
        const el = document.getElementById("sanctuary-chamber");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    } else {
      const el = document.getElementById("sanctuary-chamber");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsForm.name && newsForm.email) {
      setNewsSubscribed(true);
      setTimeout(() => {
        setShowNewsletter(false);
        setNewsSubscribed(false);
        setNewsForm({ name: "", email: "" });
      }, 3500);
    }
  };

  const handleAttuneAlignment = (e: React.FormEvent) => {
    e.preventDefault();
    const database: Record<string, { posture: string; mantra: string; duration: string; prana: string }> = {
      "gentle-mindfulness": {
        posture: "Sukhasana (Easy Meditative Flow)",
        mantra: "ॐ शान्तिः (Om Shanti - Inner Peace)",
        duration: "15 Minutes at Dawn",
        prana: "Anahata (Heart Meridian) flow activation"
      },
      "gentle-calm": {
        posture: "Balasana (Child's Surrender Pose)",
        mantra: "सो ऽहम् (So Ham - I am the unconditioned sky)",
        duration: "10 Minutes before sleep",
        prana: "Apana Vayu (Grounding Descending Energy)"
      },
      "gentle-breath": {
        posture: "Nadi Shodhana Pranayama",
        mantra: "ॐ (The Primal Resonance of Creation)",
        duration: "12 Minutes daily",
        prana: "Sushumna Nadi (Central Energetic Channel)"
      },
      "gentle-strength": {
        posture: "Marjariasana (Cat-Cow Spine Attunement)",
        mantra: "ॐ नमो नारायणाय (Om Namo Narayanaya)",
        duration: "15 Minutes early morning",
        prana: "Samana Vayu (Digestive and Core Fire)"
      },
      "intermediate-mindfulness": {
        posture: "Vrikshasana (The Focused Tree Pose)",
        mantra: "ॐ मणिपद्मे हूँ (Om Mani Padme Hum - Compassionate Lotus)",
        duration: "20 Minutes daily",
        prana: "Ajna (Third Eye Chakra) Focus & Stability"
      },
      "intermediate-calm": {
        posture: "Paschimottanasana (Seated Forward Surrender)",
        mantra: "ॐ त्र्यम्बकं यजामहे (Mahamrityunjaya - Vitality)",
        duration: "15 Minutes evening",
        prana: "Prana Vayu (Calming the nervous system)"
      },
      "intermediate-breath": {
        posture: "Kapalabhati (Spiritual Skull Shining)",
        mantra: "हं सः (Ham Sah - Pure Unbound Intelligence)",
        duration: "10 Minutes morning",
        prana: "Pingala Nadi (Active Solar Power Force)"
      },
      "intermediate-strength": {
        posture: "Virabhadrasana II (Sacred Warrior of Truth)",
        mantra: "ॐ क्रीं (Sadhana Seed of Courage)",
        duration: "15 Minutes active focus",
        prana: "Muladhara (Root Chakra Red Pillar) Stability"
      },
      "advanced-mindfulness": {
        posture: "Sirsasana (Headstand of Infinite Perspective)",
        mantra: "ॐ नमो भगवते वासुदेवाय (Universal Grace)",
        duration: "10 Minutes supervised",
        prana: "Sahasrara (Crown Seventh Halo) Divine Nectar"
      },
      "advanced-calm": {
        posture: "Halasana (The Plow of Spiritual Cultivation)",
        mantra: "ॐ नमः शिवाय (Om Namah Shivaya - Grounding Ego)",
        duration: "15 Minutes late night",
        prana: "Udana Vayu (Ascending Prana for dream states)"
      },
      "advanced-breath": {
        posture: "Bhastrika (The Fire-Bellows Breath)",
        mantra: "ॐ तत् सत् (Om Tat Sat - The absolute truth is)",
        duration: "8 Minutes intense pranayama",
        prana: "Kundalini Shakti (Coiled spiritual energy wake)"
      },
      "advanced-strength": {
        posture: "Bakasana (The High Crow Balancing Lift)",
        mantra: "ॐ गं गणपतये नमः (Overcoming limitations)",
        duration: "5 Minutes core strength",
        prana: "Manipura (Solar Fire Core) power and lift"
      }
    };

    const key = `${selectedFlexibility}-${selectedFocus}`;
    const result = database[key] || database["gentle-mindfulness"];
    setCalculatedAlignment(result);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingForm.name && bookingForm.email) {
      setBookingSuccess(true);
      setTimeout(() => {
        setBookingSuccess(false);
        setBookingForm({ name: "", email: "", path: "asana", time: "sunrise" });
      }, 5000);
    }
  };

  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, "");
      let page: PageId = "home";
      if (hash === "about-us" || hash === "about") {
        page = "about";
      } else if (hash === "programs") {
        page = "programs";
      } else if (hash === "blog") {
        page = "blog";
      } else if (hash === "offerings") {
        page = "offerings";
      } else if (hash === "corporate-unburn" || hash === "corporate-burnout") {
        page = "corporate-unburn";
      } else if (hash === "spinelign") {
        page = "spinelign";
      } else if (hash === "nlp" || hash === "nlp-program") {
        page = "nlp";
      } else if (hash === "mental-wellness" || hash === "mental-health-wellness") {
        page = "mental-wellness";
      } else if (hash === "self-assessment") {
        page = "self-assessment";
      } else if (hash === "events") {
        page = "events";
      } else if (hash === "contact-us" || hash === "contact") {
        page = "contact";
      } else if (hash === "journal") {
        page = "journal";
      }
      setActivePage(page);
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handlePageNavigation = (page: PageId) => {
    let hash = "";
    if (page === "about") hash = "/about-us";
    else if (page === "contact") hash = "/contact-us";
    else if (page === "home") hash = "";
    else hash = `/${page}`;

    window.location.hash = hash;
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const menuLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "offerings", label: "Programs" },
    { id: "journal", label: "Journal" },
    { id: "events", label: "Events" },
    { id: "blog", label: "Blog" },
    { id: "contact", label: "Contact" }
  ];

  return (
    <div className="min-h-screen bg-[#faf9f5] text-sage-950 font-sans selection:bg-gold-200 selection:text-gold-900 overflow-x-hidden antialiased flex flex-col justify-between pb-16 md:pb-0">
      
      <div>
        {/* 1. TOP NAVBAR (Always white background, non-sticky, static position as requested) */}
        <header className="relative z-40 w-full flex flex-col bg-white">
          
          {/* TIER 1: The Premium White Band containing the enlarged Logo and Sliding Services */}
          <div className="w-full bg-white border-b border-sage-150/60 h-24 md:h-28 px-6 flex items-center relative overflow-hidden">
            
            {/* Symmetrical/Asymmetrical Logo Container - Placed in White Band, Enlarged, Masked so it is never obscured */}
            <div className="bg-white pr-8 h-full flex items-center relative z-20 shrink-0 select-none shadow-[15px_0_20px_-5px_rgba(255,255,255,1)]">
              <button 
                id="navbar-logo-btn"
                onClick={() => handlePageNavigation("home")}
                className="flex items-center text-left focus:outline-none cursor-pointer group py-0 h-full overflow-visible"
              >
                <img 
                  src="https://lh3.googleusercontent.com/d/1VOlsOJTPTpBeVq7JUDMS5aZLEyIM1ghe"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://drive.google.com/thumbnail?id=1VOlsOJTPTpBeVq7JUDMS5aZLEyIM1ghe&sz=w500";
                  }}
                  referrerPolicy="no-referrer"
                  alt="Immortal Walks Logo"
                  className="h-32 md:h-36 w-auto object-contain shrink-0 group-hover:scale-103 transition-all duration-300 relative -my-4 md:-my-6" 
                />
              </button>
            </div>

            {/* Sliding Services in the remaining white space */}
            <div className="flex-1 overflow-hidden relative h-full flex items-center z-10 pl-4">
              {/* Soft gradient fading overlays to blend the text on the edges */}
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white via-white/80 to-transparent z-15 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white via-white/80 to-transparent z-15 pointer-events-none" />

              <div className="flex whitespace-nowrap gap-16 items-center animate-marquee py-2">
                {/* Repeat services array to ensure infinite loop */}
                {Array(5).fill([
                  "Corporate Unburn Program",
                  "Spinelign Alignment",
                  "NLP Mind Mastery",
                  "Mental Wellness Therapy",
                  "Lineage Meditation Circles",
                  "Pranayama Breathwork",
                  "Satsang Wisdom Councils",
                  "Sacred Yatra Retreats",
                  "Traditional Yantra Guides"
                ]).flat().map((service, index) => (
                  <span 
                    key={index} 
                    className="text-[11px] md:text-xs uppercase tracking-[0.25em] text-sage-600 font-mono flex items-center gap-2.5 font-medium"
                  >
                    <span className="text-gold-500 font-serif text-sm">✦</span>
                    <span className="hover:text-gold-600 transition-colors cursor-pointer">{service}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* TIER 2: The Navigation and Action Menu Bar */}
          <nav className="relative bg-[#faf9f5]/50 border-b border-sage-100 px-6 py-3.5 w-full">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              
              {/* Desktop Center Links */}
              <div className="hidden md:flex items-center gap-3 lg:gap-6 text-[12px] lg:text-[13px] font-semibold tracking-wider text-sage-800">
                {menuLinks.map((link) => {
                  if (link.id === "offerings") {
                    return (
                      <div 
                        key={link.id} 
                        className="relative group py-1"
                        onMouseEnter={() => setHoveringOfferings(true)}
                        onMouseLeave={() => setHoveringOfferings(false)}
                      >
                        <button
                          id="nav-link-offerings"
                          onClick={() => handlePageNavigation("offerings")}
                          className={`hover:text-gold-600 transition-colors cursor-pointer py-1 relative flex items-center gap-1 ${
                            activePage === "offerings" || SUB_OFFERINGS.some(s => activePage === s.id) ? "text-gold-600 font-bold" : "text-sage-850"
                          }`}
                        >
                          <span>{link.label}</span>
                          <svg className="w-3 h-3 text-sage-400 group-hover:text-gold-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                          </svg>
                          {(activePage === "offerings" || SUB_OFFERINGS.some(s => activePage === s.id)) && (
                            <motion.div 
                              layoutId="nav-underline"
                              className="absolute bottom-1 left-0 right-0 h-0.5 bg-gold-600"
                            />
                          )}
                        </button>

                        {/* Floating Dropdown Card */}
                        <AnimatePresence>
                          {hoveringOfferings && (
                            <motion.div
                              initial={{ opacity: 0, y: 10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 5, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              className="absolute left-0 mt-2 w-64 bg-white border border-sage-150 rounded-2xl shadow-xl py-3 z-50 text-left"
                            >
                              <div className="px-4 pb-2 border-b border-sage-50 mb-1">
                                <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-gold-700 block font-bold">Programs & Offerings</span>
                              </div>
                              <button
                                onClick={() => {
                                  handlePageNavigation("offerings");
                                  setHoveringOfferings(false);
                                }}
                                className={`w-full text-left px-4 py-2 text-xs hover:bg-sage-50 hover:text-gold-600 transition-colors font-semibold block ${
                                  activePage === "offerings" ? "text-gold-600 font-bold" : "text-sage-800"
                                }`}
                              >
                                All Offerings Landing
                              </button>
                              {SUB_OFFERINGS.map((sub) => (
                                <button
                                  key={sub.id}
                                  onClick={() => {
                                    handlePageNavigation(sub.id as PageId);
                                    setHoveringOfferings(false);
                                  }}
                                  className={`w-full text-left px-4 py-2 text-[11px] hover:bg-sage-50 hover:text-gold-600 transition-colors block ${
                                    activePage === sub.id ? "text-gold-600 font-bold" : "text-sage-750"
                                  }`}
                                >
                                  {sub.label}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={link.id}
                      id={`nav-link-${link.id}`}
                      onClick={() => handlePageNavigation(link.id as PageId)}
                      className={`hover:text-gold-600 transition-colors cursor-pointer py-1 relative ${
                        activePage === link.id ? "text-gold-600 font-bold" : "text-sage-850"
                      }`}
                    >
                      {link.label}
                      {activePage === link.id && (
                        <motion.div 
                          layoutId="nav-underline"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-600"
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Center brand title on mobile since links are hidden */}
              <div className="md:hidden text-xs uppercase tracking-widest text-sage-600 font-mono font-medium">
                Sanctuary Guidance
              </div>

              {/* Right Buttons / Hamburger */}
              <div className="flex items-center gap-4">
                <motion.button
                  id="join-journey-nav-btn"
                  onClick={() => setShowNewsletter(true)}
                  whileHover={{ scale: 1.04, boxShadow: "0 4px 14px rgba(92,111,89,0.3)" }}
                  whileTap={{ scale: 0.96 }}
                  className="px-5 py-2 rounded-full bg-[#5c6f59] hover:bg-[#465a44] text-white font-semibold text-[11px] uppercase tracking-widest transition-colors duration-300 cursor-pointer shadow-sm btn-shimmer flex items-center gap-1.5"
                >
                  <Sun className="w-3.5 h-3.5 text-gold-300 animate-spin-slow" />
                  <span>Join the Journey</span>
                </motion.button>

                {/* Mobile Hamburger menu */}
                <motion.button
                  id="mobile-hamburger-btn"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  whileTap={{ scale: 0.9 }}
                  className="p-1.5 text-sage-700 hover:text-sage-900 md:hidden transition-colors border border-sage-200/60 rounded-lg bg-white cursor-pointer"
                  aria-label="Toggle mobile navigation menu"
                >
                  <motion.div
                    animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </motion.div>
                </motion.button>
              </div>

            </div>
          </nav>
        </header>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-sage-100 overflow-hidden z-30 relative"
            >
              <div className="px-6 py-4 flex flex-col gap-4">
                {menuLinks.map((link) => {
                  if (link.id === "offerings") {
                    return (
                      <div key={link.id} className="flex flex-col gap-1.5 text-left">
                        <button
                          id={`mobile-nav-link-${link.id}`}
                          onClick={() => handlePageNavigation("offerings")}
                          className={`text-left text-xs uppercase font-semibold tracking-wider py-2 transition-all ${
                            activePage === "offerings" ? "text-gold-600 pl-2 border-l-2 border-gold-600" : "text-sage-600"
                          }`}
                        >
                          {link.label}
                        </button>
                        
                        {/* Mobile Sub Offerings Indented List */}
                        <div className="pl-4 flex flex-col gap-1.5 border-l border-sage-100 mb-2">
                          {SUB_OFFERINGS.map((sub) => (
                            <button
                              key={sub.id}
                              onClick={() => handlePageNavigation(sub.id as PageId)}
                              className={`text-left text-[11px] font-medium py-1.5 transition-all ${
                                activePage === sub.id ? "text-gold-600 font-bold" : "text-sage-500 hover:text-sage-850"
                              }`}
                            >
                              • {sub.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={link.id}
                      id={`mobile-nav-link-${link.id}`}
                      onClick={() => handlePageNavigation(link.id as PageId)}
                      className={`text-left text-xs uppercase font-semibold tracking-wider py-2 transition-all ${
                        activePage === link.id ? "text-gold-600 pl-2 border-l-2 border-gold-600" : "text-sage-600"
                      }`}
                    >
                      {link.label}
                    </button>
                  );
                })}
                <button
                  id="mobile-join-journey-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowNewsletter(true);
                  }}
                  className="w-full py-3 rounded-full bg-sage-700 text-white text-xs font-bold uppercase tracking-widest text-center mt-2 cursor-pointer"
                >
                  Join the Journey
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2. DYNAMIC PAGE ROUTING CONTAINER */}
        <div className={activePage === "home" ? "w-full" : "max-w-7xl mx-auto px-6 py-8"}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* ==================== A. HOME PAGE ==================== */}
              {activePage === "home" && (
                <div className="space-y-24">
                  
                  {/* HERO HEADER SECTION WITH 3D TILT, PARALLAX AND ROTATING OM */}
                  <LineageHero onExploreClick={scrollToChamber} onNavigateToPage={handlePageNavigation} />

                  {/* Wrapper for downstream home page sections to preserve standard max-width layout */}
                  <div className="max-w-7xl mx-auto px-6 space-y-24 pb-24">
                    {/* SECTION 2: PATHWAYS TO PRESENCE (3D MOUSE TILT CARDS) */}
                    <div className="space-y-12">
                    <div className="text-center space-y-3 max-w-2xl mx-auto">
                      <span className="text-xs font-mono uppercase tracking-[0.3em] text-gold-700 block">
                        Practice Your Path for Training
                      </span>
                      <h2 className="text-3xl lg:text-4xl font-serif font-bold text-sage-950 tracking-tight">
                        Pathways to Presence
                      </h2>
                      <p className="text-sage-600 text-sm leading-relaxed">
                        Hover or click each posture to visualize the active life-force meridians (prana flow channels) triggered during traditional execution.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {PRESENCE_DATA.map((item, idx) => (
                        <PresenceCard3D key={item.title} item={item} index={idx} />
                      ))}
                    </div>
                  </div>

                  {/* SECTION 3: PERSONAL ATTUNEMENT CALCULATOR & BENEFITS */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-sage-50 border border-sage-200/50 rounded-4xl p-8 lg:p-16 relative">
                    {/* Wavy layout accent */}
                    <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-[0.02] pointer-events-none overflow-hidden">
                      <svg className="w-full h-full text-sage-950" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      </svg>
                    </div>

                    {/* Left 6 cols: W Comte Hangout the YourInstructors */}
                    <div className="lg:col-span-6 space-y-8 z-10">
                      <div className="space-y-3">
                        <span className="text-xs font-mono uppercase tracking-widest text-gold-700 block">
                          The Practitioner Community
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-serif font-bold text-sage-950 tracking-tight">
                          W Comte Hangout: The Instructor Alignment
                        </h2>
                        <p className="text-sage-600 text-sm leading-relaxed">
                          We bring traditional, rigorous practices straight to modern seekers. Align your inner biological rhythms with the original Himalayan lineage templates.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          {
                            title: "Lineage Authenticity",
                            desc: "100% traditional Vedic and Hatha lineage protocols without commercial watered-down shortcuts."
                          },
                          {
                            title: "Cortical Coherence",
                            desc: "Correlating high dhyana states with modern neuroscience, heart rate variability, and brain wave synchronization."
                          },
                          {
                            title: "Direct Guru Satsangs",
                            desc: "Interactive live spiritual feedback blocks to resolve your internal blocks, doubts, and ego friction."
                          },
                          {
                            title: "Sattvic Nutrition",
                            desc: "Integration of clean, high-vitality organic foods mapped directly to keep the physical shell pure and quiet."
                          }
                        ].map((b, i) => (
                          <div key={i} className="space-y-1.5 p-4 rounded-2xl bg-white border border-sage-200/30">
                            <div className="flex items-center gap-2 text-sage-800">
                              <CheckCircle className="w-4 h-4 text-gold-600 shrink-0" />
                              <h4 className="font-semibold text-xs uppercase tracking-wider font-mono">
                                {b.title}
                              </h4>
                            </div>
                            <p className="text-[11px] text-sage-600 leading-relaxed">
                              {b.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right 6 cols: Custom Alignment Selector Form */}
                    <div className="lg:col-span-6 bg-white border border-sage-200 p-6 lg:p-8 rounded-3xl shadow-sm space-y-6 z-10">
                      <div className="space-y-1.5 text-center border-b border-sage-100 pb-4">
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold-700 block">
                          Interactive Attunement
                        </span>
                        <h3 className="text-xl font-serif font-bold text-sage-950">
                          Your Host Custom Alignment Portal
                        </h3>
                        <p className="text-[11px] text-sage-500 max-w-sm mx-auto">
                          Specify your physical temperament and mental focus to calculate your custom daily alignment mantra and posture.
                        </p>
                      </div>

                      <form onSubmit={handleAttuneAlignment} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono text-sage-700 uppercase tracking-widest block">
                              Physical Temperament
                            </label>
                            <select
                              value={selectedFlexibility}
                              onChange={(e) => setSelectedFlexibility(e.target.value)}
                              className="w-full p-2.5 rounded-xl border border-sage-200 text-xs bg-sage-50 text-sage-900 focus:outline-none focus:ring-1 focus:ring-gold-500"
                            >
                              <option value="gentle">Gentle / Beginner</option>
                              <option value="intermediate">Balanced / Intermediate</option>
                              <option value="advanced">Advanced Sadhaka</option>
                            </select>
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-mono text-sage-700 uppercase tracking-widest block">
                              Focus Intention
                            </label>
                            <select
                              value={selectedFocus}
                              onChange={(e) => setSelectedFocus(e.target.value)}
                              className="w-full p-2.5 rounded-xl border border-sage-200 text-xs bg-sage-50 text-sage-900 focus:outline-none focus:ring-1 focus:ring-gold-500"
                            >
                              <option value="mindfulness">Mindfulness</option>
                              <option value="calm">Calming / Rest</option>
                              <option value="strength">Strength / Core</option>
                              <option value="breath">Pranayama / Breath</option>
                            </select>
                          </div>
                        </div>

                        <button
                          id="attune-alignment-submit"
                          type="submit"
                          className="w-full py-3 rounded-xl bg-sage-800 hover:bg-sage-900 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-xs cursor-pointer"
                        >
                          Attune My Daily Alignment
                        </button>
                      </form>

                      {/* Display alignment calculator result */}
                      <AnimatePresence mode="wait">
                        {calculatedAlignment && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="p-4 rounded-2xl bg-gold-50 border border-gold-200 space-y-3"
                          >
                            <div className="flex items-center justify-between border-b border-gold-200/50 pb-2">
                              <span className="text-[9px] font-mono uppercase tracking-widest text-gold-800">
                                ✦ Calibrated Alignment Manifested
                              </span>
                              <span className="text-gold-600 text-xs">ॐ</span>
                            </div>

                            <div className="space-y-2 text-xs text-sage-900">
                              <p>
                                <strong className="font-mono uppercase text-[10px] text-sage-500 block">Recommended Posture:</strong>
                                <span className="font-semibold text-sage-950">{calculatedAlignment.posture}</span>
                              </p>
                              <p>
                                <strong className="font-mono uppercase text-[10px] text-sage-500 block">Sacred Seed Mantra:</strong>
                                <span className="italic font-serif font-medium text-gold-900 text-sm block mt-0.5">{calculatedAlignment.mantra}</span>
                              </p>
                              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gold-200/30 text-[10px]">
                                <p>
                                  <strong className="font-mono text-sage-500 block uppercase">Duration:</strong>
                                  <span>{calculatedAlignment.duration}</span>
                                </p>
                                <p>
                                  <strong className="font-mono text-sage-500 block uppercase">Subtle Prana:</strong>
                                  <span className="text-sage-800">{calculatedAlignment.prana}</span>
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* SECTION 4: WHAT UNFOLDS BEFORE YOU (Hat unommt fore - Dark Green wide highlight card matching Screenshot Column 2) */}
                  <div className="bg-sage-950 text-gold-100 rounded-4xl p-8 lg:p-12 border border-gold-900/30 overflow-hidden relative shadow-md">
                    <div className="absolute right-4 bottom-4 w-64 h-64 opacity-5 pointer-events-none">
                      <svg className="w-full h-full text-white" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      </svg>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                      <div className="lg:col-span-5 space-y-4">
                        <span className="text-xs font-mono uppercase tracking-[0.3em] text-gold-400">
                          Ashram Sanctuary Highlights
                        </span>
                        <h3 className="text-3xl font-serif font-bold text-white leading-tight">
                          Hat unommt fore: What Unfolds Before You
                        </h3>
                        <p className="text-sage-300 text-xs leading-relaxed">
                          A calibrated environment optimized to silence external sensory static, allowing deep neurological resting patterns to settle in and reveal your true presence.
                        </p>
                      </div>

                      <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { title: "Daily Lineage Sadhana", desc: "Two hours of traditional asana and dhyana guided by experienced lineage elders." },
                          { title: "1-on-1 Satsang Attunement", desc: "Private spiritual counsel with our master guides to directly target mental friction." },
                          { title: "Subtle Energy Grid Tuning", desc: "Advanced breathing routines calibrated strictly with modern heart rate parameters." },
                          { title: "Himalayan Retreat Pilgrimage", desc: "Priority registration access for our annual walking yatras through higher valleys." }
                        ].map((item, idx) => (
                          <div key={idx} className="p-4 bg-sage-900/60 rounded-2xl border border-sage-800/40 space-y-1">
                            <span className="text-gold-400 text-xs block">✦ {item.title}</span>
                            <p className="text-[10px] text-sage-300 leading-relaxed">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* SECTION 5: GET SET FOR YOUR JOURNEY (3-Card Instructor showcase matching screenshot) */}
                  <div className="space-y-12">
                    <div className="text-center space-y-2 max-w-xl mx-auto">
                      <span className="text-xs font-mono uppercase tracking-[0.3em] text-gold-700 block">
                        Get Set for Your Journey
                      </span>
                      <h2 className="text-3xl font-serif font-bold text-sage-950 tracking-tight">
                        Meet Our Master Guardians
                      </h2>
                      <p className="text-sage-600 text-xs">
                        An unbroken chain of lineages, scientists, and non-dual mentors who carry our core transmissions.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {[
                        {
                          id: 1,
                          name: "Acharya Shunya Prasad",
                          role: "Advaita Vedanta Master",
                          quote: "The mind is a magnificent instrument of observation, but a catastrophic sanctuary for absolute identification. Return to the silent observer background.",
                          bio: "Spent 18 years in uninterrupted contemplation in the higher Himalayas before returning to transmit traditional self-inquiry methods.",
                          avatar: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=400"
                        },
                        {
                          id: 2,
                          name: "Yogi Devendra",
                          role: "Chief of Traditional Asana & Prana",
                          quote: "Keep the physical posture perfectly perpendicular to the core earth's gravity, and you will notice that the breath naturally settles into absolute silence.",
                          bio: "Initiated into traditional ancient yoga lineages in Rishikesh. Calibrates physical posture as a foundation for deep meditation.",
                          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400"
                        },
                        {
                          id: 3,
                          name: "Dr. Evelyn Vance, PhD",
                          role: "Neuroscience Research Director",
                          quote: "By aligning ancient pranayama structures with modern alpha wave brain mapping, we witness deep cortical synchronization in under ten minutes.",
                          bio: "Harvard-trained medical researcher analyzing the direct biological markers of traditional breath retention.",
                          avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
                        }
                      ].map((master, idx) => (
                        <div
                          key={master.id}
                          className="bg-white border border-sage-200/60 p-6 rounded-3xl shadow-xs flex flex-col justify-between space-y-6 hover:shadow-md transition-all duration-300 relative group overflow-hidden"
                        >
                          <div className="space-y-4">
                            {/* Avatar circle */}
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 rounded-full overflow-hidden border border-sage-200 shrink-0">
                                <img
                                  src={master.avatar}
                                  alt={master.name}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <div>
                                <h4 className="font-serif font-bold text-sage-950 text-base leading-tight">
                                  {master.name}
                                </h4>
                                <span className="text-[10px] font-mono text-gold-700 block uppercase tracking-wider mt-0.5">
                                  {master.role}
                                </span>
                              </div>
                            </div>

                            <p className="text-xs text-sage-600 leading-relaxed italic bg-sage-50/50 p-4 rounded-2xl border border-sage-100">
                              "{master.quote}"
                            </p>
                          </div>

                          <div className="space-y-3 pt-2">
                            <p className="text-[10px] text-sage-500 leading-relaxed font-sans">
                              {master.bio}
                            </p>

                            <button
                              id={`blessing-btn-${master.id}`}
                              onClick={() => setActiveBlessing(activeBlessing === idx ? null : idx)}
                              className="w-full py-2.5 rounded-xl bg-sage-50 hover:bg-sage-100 text-sage-800 font-semibold text-xs transition-colors cursor-pointer"
                            >
                              {activeBlessing === idx ? "Close Blessing" : "Receive Master's Blessing"}
                            </button>
                          </div>

                          {/* Floating Blessing Overlay */}
                          <AnimatePresence>
                            {activeBlessing === idx && (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="absolute inset-0 bg-sage-900 text-gold-100 p-6 flex flex-col justify-center items-center text-center space-y-4 z-20"
                              >
                                <span className="text-2xl">ॐ</span>
                                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gold-400">
                                  Lineage Transmission
                                </span>
                                <p className="font-serif italic text-sm text-white max-w-xs leading-relaxed">
                                  "May your physical structure steady like the Himalayas, your breath flow thin like a thread of oil, and your awareness rest untouched like space."
                                </p>
                                <div className="w-8 h-0.5 bg-gold-500" />
                                <button
                                  id={`close-blessing-btn-${master.id}`}
                                  onClick={() => setActiveBlessing(null)}
                                  className="px-4 py-1.5 rounded-full border border-gold-400/30 text-[10px] hover:bg-white/10 transition-colors cursor-pointer"
                                >
                                  Deeply Received
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 6: INTERACTIVE CHAKRA FREQUENCY TUNER (Clor Eksin / Clear Aura Wave Section in Screenshot Column 2) */}
                  <div className="bg-sage-900 text-gold-100 rounded-4xl p-8 lg:p-12 border border-sage-800 overflow-hidden relative shadow-lg">
                    {/* Organic wavy line shapes representing vibration frequencies */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                      <svg className="w-full h-full text-white" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="1" />
                        <path d="M0,50 Q25,70 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        <path d="M0,50 Q25,10 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="0.3" />
                      </svg>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                      <div className="lg:col-span-5 space-y-4">
                        <span className="text-xs font-mono uppercase tracking-[0.3em] text-gold-400 block">
                          Clor Eksin — Aura Harmonizer
                        </span>
                        <h2 className="text-3xl font-serif font-bold text-white leading-tight">
                          Clear Mind, Clear Aura
                        </h2>
                        <p className="text-sage-300 text-xs leading-relaxed">
                          Click each energetic terminal key below to harmonize your subtle aura fields. Trigger the corresponding sacred vocal root seed frequencies to calm mental static.
                        </p>
                        
                        <div className="p-4 bg-sage-950/50 rounded-2xl border border-sage-800 text-[11px] text-sage-200">
                          <strong>Active Frequency Glow:</strong> Select an energetic terminal node on the right to lit up the protective pranic field.
                        </div>
                      </div>

                      <div className="lg:col-span-7 flex flex-col sm:flex-row gap-6 justify-center items-center">
                        {[
                          {
                            id: "root",
                            label: "Root Chakra",
                            sanskrit: "मूलाधार",
                            mantra: "LAM",
                            hz: "396 Hz (Grounding Force)",
                            color: "shadow-[0_0_20px_rgba(239,68,68,0.3)] border-red-500 text-red-400 bg-red-950/20"
                          },
                          {
                            id: "heart",
                            label: "Heart Chakra",
                            sanskrit: "अनाहत",
                            mantra: "YAM",
                            hz: "528 Hz (Restoration Force)",
                            color: "shadow-[0_0_20px_rgba(16,185,129,0.3)] border-emerald-500 text-emerald-400 bg-emerald-950/20"
                          },
                          {
                            id: "third-eye",
                            label: "Third Eye",
                            sanskrit: "आज्ञा",
                            mantra: "OM",
                            hz: "741 Hz (Infinite Insight)",
                            color: "shadow-[0_0_20px_rgba(59,130,246,0.3)] border-blue-500 text-blue-400 bg-blue-950/20"
                          }
                        ].map((chakra) => {
                          const isActive = activeChakra === chakra.id;
                          return (
                            <button
                              key={chakra.id}
                              id={`chakra-btn-${chakra.id}`}
                              onClick={() => setActiveChakra(isActive ? null : chakra.id)}
                              className={`w-full sm:w-48 p-6 rounded-3xl border text-center transition-all duration-300 cursor-pointer ${
                                isActive
                                  ? `${chakra.color} scale-[1.03]`
                                  : "border-sage-800 bg-sage-950/30 text-sage-300 hover:border-sage-700"
                              }`}
                            >
                              <span className="text-[10px] font-mono block tracking-widest text-gold-400/80 mb-1">
                                {chakra.hz.split(" ")[0]}
                              </span>
                              <h4 className="font-serif font-bold text-white text-base leading-tight">
                                {chakra.label}
                              </h4>
                              <span className="text-[10px] block font-mono text-sage-400 mt-0.5">
                                {chakra.sanskrit}
                              </span>
                              
                              <div className="my-4 w-10 h-10 rounded-full border border-sage-700/60 flex items-center justify-center mx-auto text-white text-sm font-bold font-mono">
                                {chakra.mantra}
                              </div>

                              <p className="text-[10px] text-sage-300 font-sans leading-relaxed">
                                {isActive ? "Terminals Harmonized" : "Harmonize Node"}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* SECTION 7: GO DEEP INTO THE YOGIC LIFESTYLE & YOUR PATH (3-Card grid displaying beautiful lifestyle images matching screenshot) */}
                  <div className="space-y-12">
                    <div className="text-center space-y-2 max-w-xl mx-auto">
                      <span className="text-xs font-mono uppercase tracking-[0.3em] text-gold-700 block">
                        Go Deep into the Yogic Lifestyle
                      </span>
                      <h2 className="text-3xl font-serif font-bold text-sage-950 tracking-tight">
                        Goasl Snolete: Your Pathline Pillars
                      </h2>
                      <p className="text-sage-600 text-xs">
                        Harmonize your external existence with deep internal stillness using these three daily lifestyle pillars.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {[
                        {
                          id: 1,
                          title: "Sattvic Divine Diet",
                          pillar: "Nourishing the Shell",
                          desc: "Ingesting high-prana organic, chemical-free foods prepared with sacred devotion. Relieves the physiological workload so brainwaves settle comfortably.",
                          image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=600"
                        },
                        {
                          id: 2,
                          title: "Brahma Muhurta Hour",
                          pillar: "Holy Dawn Sadhana",
                          desc: "Rising at 4:00 AM when the atmospheric layers of the earth are quiet and free from human electrical interference. The perfect hour for deep self-absorption.",
                          image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=600"
                        },
                        {
                          id: 3,
                          title: "Mounam Silence Walks",
                          pillar: "Walking Yatra Path",
                          desc: "Walking meditation through mountain heights and wild forests. By maintaining perfect verbal silence, we gather leaking pranic forces back into our energetic core.",
                          image: "https://images.unsplash.com/photo-1486916856992-e4db22c8df33?auto=format&fit=crop&q=80&w=600"
                        }
                      ].map((item) => (
                        <div
                          key={item.id}
                          className="bg-white rounded-3xl border border-sage-200/60 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
                        >
                          <div className="h-48 overflow-hidden relative">
                            <img
                              src={item.image}
                              alt={item.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-sage-950/40 via-transparent to-transparent" />
                          </div>

                          <div className="p-6 space-y-3">
                            <span className="text-[10px] font-mono uppercase tracking-widest text-gold-700 block">
                              {item.pillar}
                            </span>
                            <h3 className="text-lg font-serif font-bold text-sage-950">
                              {item.title}
                            </h3>
                            <p className="text-xs text-sage-600 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 8: CONSULTATION RESERVATION FORM (Matching bottom form "Try pleasant path for book" in Screenshot Column 2) */}
                  <div id="booking-reservation-section" className="bg-gradient-to-tr from-sage-100 to-sage-50 border border-sage-200/50 p-8 lg:p-16 rounded-4xl relative overflow-hidden">
                    {/* Background halos */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
                      <svg className="w-128 h-128 text-sage-950" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
                        <path d="M 50 0 L 50 100 M 0 50 L 100 50" stroke="currentColor" strokeWidth="0.5" />
                      </svg>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                      {/* Left side: descriptions */}
                      <div className="lg:col-span-5 space-y-6">
                        <span className="text-xs font-mono uppercase tracking-[0.3em] text-gold-700 block">
                          Sanctuary Enrollment
                        </span>
                        <h2 className="text-3xl lg:text-4xl font-serif font-bold text-sage-950 tracking-tight leading-tight">
                          Try pleasant path for book
                        </h2>
                        <p className="text-sage-700 text-sm leading-relaxed">
                          Secure your private sanctuary consultation. Meet with a lineage elder and modern neuroscientist to establish a tailored alignment program suited strictly to your body's constitutional archetype.
                        </p>
                        
                        <div className="p-4 bg-white/70 border border-sage-200 rounded-2xl space-y-2 text-xs text-sage-800">
                          <p className="font-semibold text-sage-950">✦ Included in Consultation:</p>
                          <ul className="space-y-1 list-disc pl-4 text-sage-600 text-[11px]">
                            <li>Aura bio-field mapping & prana tracking report</li>
                            <li>Personalized Vedic lineage mantra allocation</li>
                            <li>1-on-1 alignment correction & posture calibration</li>
                          </ul>
                        </div>
                      </div>

                      {/* Right side: reservation form */}
                      <div className="lg:col-span-7 bg-white border border-sage-200 p-6 lg:p-8 rounded-3xl shadow-sm space-y-6">
                        <div className="border-b border-sage-100 pb-4 text-center">
                          <h3 className="text-xl font-serif font-bold text-sage-950">
                            Book a Sanctuary Consultation
                          </h3>
                          <p className="text-[11px] text-sage-500">
                            Receive a private alignment recommendation and custom lineage blessing.
                          </p>
                        </div>

                        {bookingSuccess ? (
                          <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-4">
                            <span className="text-3xl">ॐ</span>
                            <h4 className="font-serif font-bold text-emerald-950 text-base">
                              Consultation Slot Manifested!
                            </h4>
                            <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                              Blessings, <strong>{bookingForm.name}</strong>. Your alignment channel has been established. A lineage coordinator has reserved your <strong>{bookingForm.time}</strong> slot on the sacred <strong>{bookingForm.path === 'asana' ? 'Asana Alignment' : bookingForm.path === 'meditation' ? 'Meditation Counsel' : 'Yatra Pilgrim'}</strong> path. An invitation has been sent to <strong>{bookingForm.email}</strong>.
                            </p>
                            <div className="w-12 h-0.5 bg-emerald-300 mx-auto" />
                            <p className="text-[10px] text-emerald-600">
                              Please sit quietly for 5 minutes and attend to your natural breath.
                            </p>
                          </div>
                        ) : (
                          <form onSubmit={handleBookingSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono text-sage-700 uppercase tracking-widest block">
                                  Your Full Name
                                </label>
                                <input
                                  type="text"
                                  required
                                  value={bookingForm.name}
                                  onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                                  placeholder="Sadhaka Name"
                                  className="w-full p-2.5 rounded-xl border border-sage-200 text-xs bg-sage-50 focus:outline-none focus:ring-1 focus:ring-gold-500"
                                />
                              </div>

                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono text-sage-700 uppercase tracking-widest block">
                                  Your Spiritual Email
                                </label>
                                <input
                                  type="email"
                                  required
                                  value={bookingForm.email}
                                  onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                                  placeholder="seeker@silence.org"
                                  className="w-full p-2.5 rounded-xl border border-sage-200 text-xs bg-sage-50 focus:outline-none focus:ring-1 focus:ring-gold-500"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono text-sage-700 uppercase tracking-widest block">
                                  Select Attunement Path
                                </label>
                                <select
                                  value={bookingForm.path}
                                  onChange={(e) => setBookingForm({ ...bookingForm, path: e.target.value })}
                                  className="w-full p-2.5 rounded-xl border border-sage-200 text-xs bg-sage-50 text-sage-900 focus:outline-none"
                                >
                                  <option value="asana">Asana Alignment (Body Shell)</option>
                                  <option value="meditation">Meditation Counsel (Mind Void)</option>
                                  <option value="yatra">Yatra Pilgrim (Sacred Mountains)</option>
                                </select>
                              </div>

                              <div className="space-y-1.5">
                                <label className="text-[10px] font-mono text-sage-700 uppercase tracking-widest block">
                                  Preferred Sitting Hour
                                </label>
                                <select
                                  value={bookingForm.time}
                                  onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                                  className="w-full p-2.5 rounded-xl border border-sage-200 text-xs bg-sage-50 text-sage-900 focus:outline-none"
                                >
                                  <option value="sunrise">Sunrise Satsang (04:30 AM)</option>
                                  <option value="noon">Mid-Day Meditation (12:00 PM)</option>
                                  <option value="sunset">Sunset Attunement (06:30 PM)</option>
                                </select>
                              </div>
                            </div>

                            <button
                              id="booking-submit-btn"
                              type="submit"
                              className="w-full py-3 rounded-xl bg-sage-800 hover:bg-sage-950 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-md cursor-pointer"
                            >
                              Submit Sanctuary Reservation
                            </button>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* SECTION 9: THE INTERACTIVE WORKSHOP CHAMBER (Keep previous vertical interactive tools inside this elegant segment) */}
                  <div className="space-y-12 pt-8 border-t border-sage-100">
                    <ThreeDActiveIcons />

                    <div className="text-center space-y-2 max-w-xl mx-auto">
                      <span className="text-xs font-mono uppercase tracking-[0.3em] text-gold-700 block">
                        The Sanctuary Chamber
                      </span>
                      <h2 className="text-3xl font-serif font-bold text-sage-950 tracking-tight">
                        Interactive Practice Chamber
                      </h2>
                      <p className="text-sage-600 text-xs leading-relaxed">
                        Manually select any instrument category below to engage with dynamically manifest guided retreats, mantras, and brainwave sound oscillators.
                      </p>
                    </div>

                    <div id="sanctuary-chamber" className="scroll-mt-24">
                      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-sage-100 no-scrollbar justify-center px-2">
                        {NAV_ITEMS.map((item) => {
                          const isSelected = activeTab === item.id;
                          const ItemIcon = item.icon;
                          return (
                            <motion.button
                              key={item.id}
                              id={`chamber-nav-${item.id}`}
                              onClick={() => setActiveTab(item.id)}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              className={`relative px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors duration-200 cursor-pointer flex items-center gap-2 ${
                                isSelected
                                  ? "bg-sage-900 text-gold-100 shadow-md"
                                  : "bg-white text-sage-600 border border-sage-200/70 hover:bg-sage-50 hover:border-sage-300"
                              }`}
                            >
                              <ItemIcon className={`w-3.5 h-3.5 transition-transform duration-300 ${isSelected ? "text-gold-300 scale-110" : "text-sage-500 group-hover:scale-110"}`} />
                              <span>{item.label}</span>
                              {isSelected && (
                                <motion.div
                                  layoutId="chamberActivePill"
                                  className="absolute inset-0 bg-sage-900 rounded-full -z-10 shadow-sm"
                                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                              )}
                            </motion.button>
                          );
                        })}
                      </div>

                      <div className="relative min-h-[450px]">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.4 }}
                          >
                            {activeTab === "meditation" && <MeditationSection />}
                            {activeTab === "yoga" && <YogaSection />}
                            {activeTab === "breathwork" && <BreathworkSection />}
                            {activeTab === "wisdom" && <WisdomSection />}
                            {activeTab === "retreats" && <RetreatsSection />}
                            {activeTab === "yantra" && <PranicVisualAids />}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                  
                  {/* Dedicated Flat Full-Width Carousel Section on Home Page */}
                  <div className="mt-12">
                    <SacredGallery3D 
                      layoutType="circular-carousel" 
                      sectionTitle="Sanctuary Devotional Portals" 
                      sectionSubtitle="Immersive lineage transmissions captured in high-definition light, displayed beautifully in a panoramic row" 
                    />
                  </div>

                </div>
              </div>
              )}

              {/* ==================== B. ABOUT PAGE ==================== */}
              {activePage === "about" && (
                <div className="space-y-12">
                  <AboutSection />
                  <SacredGallery3D 
                    layoutType="parallax-deck" 
                    sectionTitle="Lineage Wisdom Icons" 
                    sectionSubtitle="Carved physical forms that have anchored centuries of deep quietude and non-dual insight" 
                  />
                </div>
              )}

              {/* ==================== C. PROGRAMS PAGE ==================== */}
              {activePage === "programs" && (
                <div className="space-y-12">
                  <ProgramsSection onNavigatePage={(p) => handlePageNavigation(p as any)} />
                  <SacredGallery3D 
                    layoutType="sacred-grid" 
                    sectionTitle="Contemplative Gaze Grid" 
                    sectionSubtitle="Choose a focus icon to stabilize your breathing cycles or posture practices" 
                  />
                </div>
              )}

              {/* ==================== D. JOURNAL PAGE ==================== */}
              {activePage === "journal" && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <span className="text-xs font-mono tracking-widest text-gold-600 uppercase block mb-1">
                        Private Contemplation
                      </span>
                      <h2 className="text-3xl font-serif font-semibold text-sage-900">Reflective Svadhyaya</h2>
                      <p className="text-xs text-sage-600 max-w-xl">
                        Unburden your heart in complete privacy. Our AI Zen Master reads your entry server-side and materializes custom mantras and alignments.
                      </p>
                    </div>
                    <BuddhaPresence variant="mini" />
                  </div>
                  <JournalSection />
                  <div className="pt-12">
                    <SacredGallery3D 
                      layoutType="parallax-deck" 
                      sectionTitle="Svadhyaya Mirror Portals" 
                      sectionSubtitle="Hold the gaze of these ancient stone icons to deepen your journaling breakthrough" 
                    />
                  </div>
                </div>
              )}

              {/* ==================== E. OFFERINGS PAGE ==================== */}
              {activePage === "offerings" && (
                <div className="space-y-12">
                  <OfferingsSection />
                  <SacredGallery3D 
                    layoutType="circular-carousel" 
                    sectionTitle="Divine Offerings Portals" 
                    sectionSubtitle="Siddha artifacts and sacred statues aligned with specific mental wavelengths" 
                  />
                </div>
              )}

              {/* ==================== DISCOVER HARMONISE TRANSFORM PROGRAM ==================== */}
              {(activePage === "discover-transform" || activePage === "discover-harmonise") && (
                <div className="space-y-12">
                  <DiscoverHarmoniseProgram />
                  <SacredGallery3D 
                    layoutType="sacred-grid" 
                    sectionTitle="Sanctuary Focus Seals" 
                    sectionSubtitle="Siddha sacred visual anchors for deep attention and non-dual contemplation" 
                  />
                </div>
              )}

              {/* ==================== CORPORATE BURNOUT / UNBURN PROGRAM ==================== */}
              {(activePage === "corporate-unburn" || activePage === "corporate-burnout") && (
                <div className="space-y-12">
                  <CorporateBurnout />
                  <SacredGallery3D 
                    layoutType="circular-carousel" 
                    sectionTitle="Restorative Sanctuaries" 
                    sectionSubtitle="Siddha spaces and focal points for deep cortical release" 
                  />
                </div>
              )}

              {/* ==================== SPINELIGN PROGRAM ==================== */}
              {activePage === "spinelign" && (
                <div className="space-y-12">
                  <SpinelignProgram />
                  <SacredGallery3D 
                    layoutType="parallax-deck" 
                    sectionTitle="Somatic Posture Guides" 
                    sectionSubtitle="Traditional kinetic anchors to restore deep nervous system alignment" 
                  />
                </div>
              )}

              {/* ==================== NLP PROGRAM ==================== */}
              {(activePage === "nlp" || activePage === "nlp-program") && (
                <div className="space-y-12">
                  <NlpProgram />
                  <SacredGallery3D 
                    layoutType="sacred-grid" 
                    sectionTitle="Vibrational Resonance Glyphs" 
                    sectionSubtitle="Sound symbols preloaded for nervous system and focus alignment" 
                  />
                </div>
              )}

              {/* ==================== MENTAL HEALTH WELLNESS ==================== */}
              {(activePage === "mental-wellness" || activePage === "mental-health-wellness") && (
                <div className="space-y-12">
                  <MentalHealthWellness />
                  <SacredGallery3D 
                    layoutType="parallax-deck" 
                    sectionTitle="Conscious Mindful Icons" 
                    sectionSubtitle="Vedic archetypes aligned with emotional intelligence and steady prana" 
                  />
                </div>
              )}

              {/* ==================== SELF ASSESSMENT TOOL ==================== */}
              {activePage === "self-assessment" && (
                <div className="space-y-12">
                  <SelfAssessment />
                  <SacredGallery3D 
                    layoutType="sacred-grid" 
                    sectionTitle="Siddha Diagnostic Seals" 
                    sectionSubtitle="Sacred symbols preloaded for nervous system analysis" 
                  />
                </div>
              )}

              {/* ==================== I. UPCOMING EVENTS PAGE ==================== */}
              {activePage === "events" && (
                <div className="space-y-12">
                  <EventsSection />
                  <SacredGallery3D 
                    layoutType="sacred-grid" 
                    sectionTitle="Live Satsang Anchors" 
                    sectionSubtitle="The silent gaze anchors during our live international retreats and group meditation" 
                  />
                </div>
              )}

              {/* ==================== F. BLOG PAGE ==================== */}
              {activePage === "blog" && (
                <div className="space-y-12">
                  <BlogSection />
                  <SacredGallery3D 
                    layoutType="sacred-grid" 
                    sectionTitle="Insight Transmission Visuals" 
                    sectionSubtitle="Illustrating ancient non-dual concepts through timeless aesthetic carvings" 
                  />
                </div>
              )}

              {/* ==================== G. CONTACT PAGE ==================== */}
              {activePage === "contact" && (
                <div className="space-y-12">
                  <ContactSection />
                  <SacredGallery3D 
                    layoutType="circular-carousel" 
                    sectionTitle="Abode Refuge Entrance" 
                    sectionSubtitle="Connect directly with our Tapovan ashram caretakers and spiritual lineage keepers" 
                  />
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* 4. SAGE GREEN FOOTER BANNER (Inspired by reference image) */}
      <footer id="footer-banner" className="bg-sage-900 text-gold-100 py-12 relative mt-16 overflow-hidden border-t border-sage-800">
        
        {/* Floating background Buddha watermark in footer for global page presence */}
        <BuddhaPresence variant="watermark" className="-bottom-12 -right-12 w-64 h-64 opacity-10" />
        
        {/* Decorative background radial gradients and grid to fill blank space luxuriously */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(231,180,105,0.03)_0%,transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }} />

        <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-10">
          
          {/* Main Footer Grid to fill the blank space professionally */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-sage-800/60 text-left">
            
            {/* Left Column: Mission Description */}
            <div className="md:col-span-5 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold-400 font-mono block">
                Immortal Walks Mission
              </span>
              <p className="text-sage-300 text-sm font-serif leading-relaxed">
                Dedicated to restoring the authentic practice of Sanatana Dharma. Through sacred literature, physical scripture artifacts, and custom-tailored lineage meditation, we cultivate profound inner attunement for modern practitioners.
              </p>
            </div>

            {/* Middle Column: Navigation Directory */}
            <div className="md:col-span-4 space-y-4 md:pl-8">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold-400 font-mono block">
                Sanctuary Directory
              </span>
              <div className="grid grid-cols-2 gap-2 text-sm text-sage-300">
                <button onClick={() => handlePageNavigation("home")} className="hover:text-gold-400 transition-colors text-left font-medium cursor-pointer">Home</button>
                <button onClick={() => handlePageNavigation("programs")} className="hover:text-gold-400 transition-colors text-left font-medium cursor-pointer">Programs</button>
                <button onClick={() => handlePageNavigation("journal")} className="hover:text-gold-400 transition-colors text-left font-medium cursor-pointer">Journal</button>
                <button onClick={() => handlePageNavigation("events")} className="hover:text-gold-400 transition-colors text-left font-medium cursor-pointer">Upcoming Events</button>
                <button onClick={() => handlePageNavigation("contact")} className="hover:text-gold-400 transition-colors text-left font-medium cursor-pointer">Contact Us</button>
                <button onClick={() => handlePageNavigation("self-assessment")} className="hover:text-gold-400 transition-colors text-left font-medium cursor-pointer">Self Assessment</button>
              </div>
            </div>

            {/* Right Column: Dynamic Sanctuary Gateway */}
            <div className="md:col-span-3 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-gold-400 font-mono block">
                Sanctuary Circular
              </span>
              <p className="text-sage-300 text-xs leading-relaxed">
                Receive traditional guidance, event notices, and physical scripture updates in your inbox.
              </p>
              <button 
                onClick={() => setShowNewsletter(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500/10 to-gold-400/20 hover:from-gold-500/20 hover:to-gold-400/30 text-gold-300 border border-gold-400/30 hover:border-gold-400/50 px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer shadow-sm hover:shadow"
              >
                Join Newsletter Circular
              </button>
            </div>
          </div>

          {/* End first grid section container to make the white strip fully full-width across the viewport */}
        </div>

        {/* Premium Full-Width Horizontal White Strip (Band) Across the Footer */}
        <motion.div 
          className="w-full bg-white border-y border-sage-200/80 py-6 md:py-8 my-10 relative overflow-hidden flex items-center justify-between min-h-[140px] md:min-h-[180px] z-20 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
          animate={{
            x: ["-100%", "0%", "0%", "100%"],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.08, 0.92, 1.0]
          }}
        >
          {/* Logo Watermark in the background of this white banner */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06] z-0 select-none">
            <img 
              src="https://lh3.googleusercontent.com/d/1VOlsOJTPTpBeVq7JUDMS5aZLEyIM1ghe"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://drive.google.com/thumbnail?id=1VOlsOJTPTpBeVq7JUDMS5aZLEyIM1ghe&sz=w500";
              }}
              referrerPolicy="no-referrer"
              alt="Logo Background Watermark"
              className="h-36 md:h-56 lg:h-64 w-auto object-contain"
            />
          </div>

          {/* LEFT SIDE: Services Scrolling/Sliding Track */}
          <div className="w-[42%] overflow-hidden relative h-full flex items-center justify-end z-10 pr-6">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-15 pointer-events-none" />
            
            <motion.div 
              className="flex whitespace-nowrap gap-6 md:gap-8 items-center cursor-pointer"
              onMouseEnter={() => setLeftHovered(true)}
              onMouseLeave={() => setLeftHovered(false)}
              animate={leftHovered ? {} : {
                x: ["-80%", "0%", "80%", "80%", "0%", "-80%"],
                opacity: [0, 1, 0, 0, 1, 0]
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.25, 0.5, 0.5, 0.75, 1.0]
              }}
            >
              {[
                "Guided Meditation",
                "Mindfulness Sessions",
                "Spiritual Walks",
                "Yoga Retreats",
                "Wellness Programs",
                "Healing Experiences",
                "Nature Therapy",
                "Conscious Living"
              ].map((service, idx) => (
                <div 
                  key={`footer-left-srv-${idx}`}
                  className="bg-[#5c6f59] text-white px-4 py-1.5 rounded-full font-serif text-[11px] md:text-xs font-semibold tracking-wider flex items-center gap-2 border border-sage-600/10 shadow-sm hover:scale-103 transition-transform duration-300"
                >
                  <span className="text-gold-300 text-[10px]">✦</span>
                  <span className="text-white">{service}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* CENTERED LOGO: Positioned exactly at the center of this white strip, both horizontally and vertically, significantly enlarged */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-white px-6 md:px-8 py-2 rounded-full flex items-center justify-center select-none shadow-[0_0_25px_15px_rgba(255,255,255,1)] border border-sage-100/30">
            <img 
              src="https://lh3.googleusercontent.com/d/1VOlsOJTPTpBeVq7JUDMS5aZLEyIM1ghe"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://drive.google.com/thumbnail?id=1VOlsOJTPTpBeVq7JUDMS5aZLEyIM1ghe&sz=w500";
              }}
              referrerPolicy="no-referrer"
              alt="Immortal Walks Centered Emblem Logo"
              className="h-28 md:h-36 lg:h-40 w-auto object-contain transition-transform duration-500 hover:scale-105" 
            />
          </div>

          {/* Dummy visual gap spacer to reserve clear space for the absolute-centered logo block */}
          <div className="w-[16%] shrink-0" />

          {/* RIGHT SIDE: Services Scrolling/Sliding Track */}
          <div className="w-[42%] overflow-hidden relative h-full flex items-center justify-start z-10 pl-6">
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-15 pointer-events-none" />
            
            <motion.div 
              className="flex whitespace-nowrap gap-6 md:gap-8 items-center cursor-pointer"
              onMouseEnter={() => setRightHovered(true)}
              onMouseLeave={() => setRightHovered(false)}
              animate={rightHovered ? {} : {
                x: ["80%", "0%", "-80%", "-80%", "0%", "80%"],
                opacity: [0, 1, 0, 0, 1, 0]
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.25, 0.5, 0.5, 0.75, 1.0]
              }}
            >
              {[
                "Yoga Retreats",
                "Wellness Programs",
                "Healing Experiences",
                "Nature Therapy",
                "Conscious Living",
                "Guided Meditation",
                "Mindfulness Sessions",
                "Spiritual Walks"
              ].map((service, idx) => (
                <div 
                  key={`footer-right-srv-${idx}`}
                  className="bg-[#5c6f59] text-white px-4 py-1.5 rounded-full font-serif text-[11px] md:text-xs font-semibold tracking-wider flex items-center gap-2 border border-sage-600/10 shadow-sm hover:scale-103 transition-transform duration-300"
                >
                  <span className="text-gold-300 text-[10px]">✦</span>
                  <span className="text-white">{service}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* Start a new px-6 layout container for quotes, attributions, and footnotes to keep them perfectly structured */}
        <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-10">
            {/* Sacred quotes and attributions */}
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-[10px] uppercase tracking-[0.4em] text-gold-400 font-mono block">
                Ancient Wisdom Attunement
              </span>
              <h3 className="text-xl lg:text-2xl font-serif italic font-medium leading-relaxed text-gold-50">
                "You are not the body. You are not the mind.<br />You are immortal essence."
              </h3>
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent mx-auto"></div>
              <p className="text-sage-300 text-[10px] font-mono tracking-wider uppercase">
                — The Upanishads / Sacred Sanatana Dharma
              </p>
            </div>

          {/* Footnotes and Attribution bar */}
          <div className="pt-6 border-t border-sage-800/40 flex flex-col md:flex-row items-center justify-between text-[11px] text-sage-400 gap-4">
            <p>© 2026 Immortal Walks. Crafted with absolute devotion for modern practitioners.</p>
            <div className="flex items-center gap-2 font-mono text-[10px]">
              <span>Website developed by</span>
              <a 
                href="mailto:clickindma@gmail.com" 
                className="text-gold-400 hover:text-white transition-colors duration-300 font-semibold tracking-wider hover:underline"
              >
                ClickinDMA by Rahul Singh
              </a>
            </div>
          </div>

        </div>
      </footer>

      {/* 5. NEWSLETTER DRAWER MODAL */}
      <AnimatePresence>
        {showNewsletter && (
          <div className="fixed inset-0 bg-sage-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#faf9f5] rounded-3xl border border-gold-200 p-8 max-w-md w-full relative shadow-2xl text-center space-y-6"
            >
              <button
                id="close-news-btn"
                onClick={() => setShowNewsletter(false)}
                className="absolute top-4 right-4 p-2 bg-sage-100 hover:bg-sage-200 text-sage-600 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gold-700 block">
                  Sanctuary Circular
                </span>
                <h4 className="text-2xl font-serif font-bold text-sage-900">Join the Journey</h4>
                <p className="text-xs text-sage-600 max-w-xs mx-auto leading-relaxed">
                  Receive weekly hand-picked spiritual quotes, customized guided dhyana scripts, and early-bird notifications for Himalayan Retreats.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {!newsSubscribed ? (
                  <motion.form
                    key="news-form"
                    onSubmit={handleSubscribe}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 text-left"
                  >
                    <div>
                      <label className="block text-[9px] uppercase font-mono tracking-widest text-sage-400 mb-1">
                        Spiritual Aspirant Name
                      </label>
                      <input
                        id="news-name-input"
                        type="text"
                        required
                        value={newsForm.name}
                        onChange={(e) => setNewsForm({ ...newsForm, name: e.target.value })}
                        placeholder="e.g., Siddhartha"
                        className="w-full text-xs text-sage-950 bg-white rounded-xl p-3 border border-sage-100 focus:outline-none focus:border-sage-300"
                      />
                    </div>

                    <div>
                      <label className="block text-[9px] uppercase font-mono tracking-widest text-sage-400 mb-1">
                        Aspirant Email
                      </label>
                      <input
                        id="news-email-input"
                        type="email"
                        required
                        value={newsForm.email}
                        onChange={(e) => setNewsForm({ ...newsForm, email: e.target.value })}
                        placeholder="e.g., peace@universe.com"
                        className="w-full text-xs text-sage-950 bg-white rounded-xl p-3 border border-sage-100 focus:outline-none focus:border-sage-300"
                      />
                    </div>

                    <button
                      id="news-submit-btn"
                      type="submit"
                      className="w-full py-3 bg-sage-900 text-gold-100 hover:bg-sage-950 rounded-xl font-semibold text-xs uppercase tracking-widest transition-colors cursor-pointer"
                    >
                      Subscribe to Wisdom
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="news-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-6 flex flex-col items-center gap-3 text-center"
                  >
                    <div className="w-12 h-12 bg-sage-100 rounded-full flex items-center justify-center text-sage-600">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                    <h5 className="text-md font-semibold text-sage-900">Attunement Manifested!</h5>
                    <p className="text-xs text-sage-600 max-w-xs leading-relaxed">
                      "Welcome, <strong className="text-sage-900 font-bold">{newsForm.name}</strong>. May your walks be peaceful, aligned, and full of grace."
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Sticky Bottom Navigation Bar for Mobile App-Like Experience */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-sage-100 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] md:hidden flex items-center justify-around px-2 py-1 pb-safe select-none">
        {[
          { id: "home", label: "Home", icon: Home },
          { id: "programs", label: "Programs", icon: Award },
          { id: "events", label: "Events", icon: Calendar },
          { id: "contact", label: "Contact", icon: Compass }
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              id={`mobile-sticky-link-${item.id}`}
              onClick={() => handlePageNavigation(item.id as PageId)}
              className={`min-w-[56px] min-h-[48px] flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer relative ${
                isActive ? "text-gold-600 font-bold" : "text-sage-500 hover:text-sage-700"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="text-[9px] uppercase tracking-wider font-mono font-bold leading-none scale-90">
                {item.label}
              </span>
              {isActive && (
                <div className="absolute top-0 w-6 h-0.5 bg-gold-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

    </div>
  );
}
