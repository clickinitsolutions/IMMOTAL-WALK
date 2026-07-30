import React, { useState } from "react";
import { 
  BookOpen, 
  CheckCircle, 
  Play, 
  Pause, 
  Award, 
  ChevronRight, 
  Flame, 
  Timer, 
  Heart, 
  Lock,
  Compass,
  ArrowRight,
  Briefcase,
  User,
  Shield,
  Lightbulb,
  Zap
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Day {
  dayNum: number;
  title: string;
  duration: string;
  sanskrit: string;
  focus: string;
  description: string;
  guideline: string;
  mantra: string;
}

interface Program {
  id: string;
  title: string;
  sanskrit: string;
  duration: string;
  intensity: string;
  description: string;
  category: "corporate" | "mastery" | "coach" | "practitioner";
  categoryLabel: string;
  target: string;
  image: string;
  days: Day[];
}

const PROGRAMS: Program[] = [
  // 1. Corporate Wellness & Performance
  {
    id: "burnout-recovery",
    title: "Corporate Burnout Recovery",
    sanskrit: "ऊर्जा पुनरुत्थान (Urja Punarutthana)",
    duration: "3 Days",
    intensity: "Calming / Vagus Balancing",
    description: "Quieten the overstimulated autonomic nervous system. Reorganize cognitive boundaries, activate vagal tone, and anchor professional high performance in unshakeable inner silence.",
    category: "corporate",
    categoryLabel: "Corporate Wellness & Performance",
    target: "Corporate Professionals & HR Directors",
    image: "https://i.pinimg.com/736x/a9/05/67/a905674c4544a886d38657dba8b8b055.jpg",
    days: [
      {
        dayNum: 1,
        title: "Calming the Vagus Nerve",
        duration: "10 mins",
        sanskrit: "प्राण शमन (Prana Shamana)",
        focus: "Slowing heart rate variance, activating the parasympathetic response",
        description: "Release cortisol spikes. Engage in an ancient 4-7-8 ratio sequence combined with soft humming to soothe the central nervous axis.",
        guideline: "Sit back in your office chair. Uncross your ankles. Close your eyes. Inhale for 4 seconds, hold for 7 seconds, exhale making a soft bee hum for 8 seconds.",
        mantra: "Om Shanti Shanti (Deep peaceful stillness)"
      },
      {
        dayNum: 2,
        title: "Decompressing Executive Stress",
        duration: "12 mins",
        sanskrit: "मानस मोचन (Manasa Mochana)",
        focus: "Releasing psychological urgency and checklist anxiety",
        description: "Establish a mental boundary. Observe the noise of upcoming emails as simple external waves while you sit as the quiet ocean floor.",
        guideline: "Imagine your pending tasks as dry leaves floating on a slow river. You are the unmoving riverbed, watching them drift by.",
        mantra: "Aham Nirbhayah (I am free from fear and hurry)"
      },
      {
        dayNum: 3,
        title: "Sustaining Quiet in Active Operations",
        duration: "15 mins",
        sanskrit: "कर्म योग समाधि (Karma Yoga Samadhi)",
        focus: "Integrating deep meditation into high-velocity corporate choices",
        description: "Maintain your anchor in meetings. Discover how to process rapid information while breathing from the lower diaphragm.",
        guideline: "Keep your spine perfectly straight during virtual calls. Feel the ground beneath your feet and speak only from presence.",
        mantra: "Om Tat Sat (Truth is the ultimate ground)"
      }
    ]
  },
  {
    id: "spinalign",
    title: "Spinalign (Posture & Back Health)",
    sanskrit: "मेरुदण्ड संरेखण (Merudanda Alignment)",
    duration: "3 Days",
    intensity: "Structural / Physical Release",
    description: "Align your central axis (Sushumna Nadi). Rebuild perfect postural ergonomics to counter sitting fatigue, opening energy channels for mental clarity.",
    category: "corporate",
    categoryLabel: "Corporate Wellness & Performance",
    target: "Desk Professionals & Back Strain Seekers",
    image: "https://i.pinimg.com/736x/52/6b/23/526b2388d24c122ce5815ff42f81d241.jpg",
    days: [
      {
        dayNum: 1,
        title: "Sushumna Channel Decompression",
        duration: "12 mins",
        sanskrit: "मेरु चालन (Meru Chalana)",
        focus: "Stretching the intervertebral disks and aligning the skull over tailbone",
        description: "Release compressed vertebrae. Learn to lift the crown of the head while anchoring the seat to natural gravity.",
        guideline: "Sit on a firm chair. Inhale deeply, extending your spine upward. Exhale, releasing shoulder tension downward. Maintain the vertical height.",
        mantra: "Om Namo Narayana (Alignment with natural order)"
      },
      {
        dayNum: 2,
        title: "Prana Flow & Shoulder Release",
        duration: "12 mins",
        sanskrit: "स्कन्ध मोक्ष (Skandha Moksha)",
        focus: "Releasing cervical spine stiffness and chest congestion",
        description: "Decompress tight neck muscles and expand thoracic capacity. Connect structural integrity to deep tidal breathing.",
        guideline: "Roll your shoulders back 5 times. Interlace fingers behind your back and expand the collarbones while inhaling deeply.",
        mantra: "Prana Devaya Namah (Honor the life-force current)"
      },
      {
        dayNum: 3,
        title: "The Steady Core Anchor",
        duration: "15 mins",
        sanskrit: "मूलाधार दृढता (Muladhara Dridhata)",
        focus: "Establishing stability from the pelvic floor",
        description: "Build an unshakeable base. Align the lower back to alleviate desk-bound tension and anchor mental confidence.",
        guideline: "Contract the pelvic floor gently (Mula Bandha) on the exhalation. Keep the lumbar curve neutral and natural.",
        mantra: "Aham Sthirah (I am grounded, stable, and strong)"
      }
    ]
  },
  {
    id: "mental-coaching",
    title: "Mental Health Coaching & Counselling",
    sanskrit: "मनो स्वास्थ्य चिकित्सा (Manas Chikitsa)",
    duration: "3 Days",
    intensity: "Reflective / Gentle Counsel",
    description: "Transition from cognitive chaos to radiant stability. Use traditional non-dual counseling methods to identify and release deep mental blocks.",
    category: "corporate",
    categoryLabel: "Corporate Wellness & Performance",
    target: "HR Leaders, Seekers of Mental Balance",
    image: "https://i.pinimg.com/736x/b4/58/6e/b4586e776769e07110a3cd1e158ed9e9.jpg",
    days: [
      {
        dayNum: 1,
        title: "Mental Cloud Witnessing",
        duration: "15 mins",
        sanskrit: "साक्षी भाव (Sakshi Bhava)",
        focus: "De-identifying with anxious thought spirals",
        description: "Stop being the storm; become the quiet sky. Learn the art of observing memory ripples without jumping into the current.",
        guideline: "Whenever an anxious thought arises, label it objectively as 'a wave in the mind' and return your focus to the silent heart.",
        mantra: "Aham Sakshi (I am the silent witness of the mind)"
      },
      {
        dayNum: 2,
        title: "Unpacking Subconscious Burdens",
        duration: "15 mins",
        sanskrit: "संस्कार शोधन (Sanskara Shodhana)",
        focus: "Safely processing suppressed emotional blocks",
        description: "Expose ancient habitual patterns (Samskaras) to the light of present-moment awareness, neutralizing their active triggers.",
        guideline: "Inhale, welcoming the uncomfortable sensation in the body. Exhale, releasing the mental narrative attached to it.",
        mantra: "Om Hreem Namah (Vibrational purification)"
      },
      {
        dayNum: 3,
        title: "Stabilizing the Intellect",
        duration: "18 mins",
        sanskrit: "प्रज्ञा स्थिरता (Pragya Sthirata)",
        focus: "Anchoring the mind in clear, decisive wisdom",
        description: "Step into clear, wise knowing. Harmonize the active mind with the intuitive heart center to walk in absolute certainty.",
        guideline: "Inhale into the third eye, exhaling down into the spiritual heart. Rest in the quiet wisdom that emerges.",
        mantra: "Satya Swarupoham (I am of the nature of absolute truth)"
      }
    ]
  },

  // 2. Inner Mastery & Applied Practices
  {
    id: "nlp-subconscious",
    title: "NLP (Subconscious Linguistics)",
    sanskrit: "वाक्-मनो विज्ञान (Vak-Mano Vijnana)",
    duration: "3 Days",
    intensity: "Cognitive / Transforming",
    description: "Align Neuro-Linguistic Programming with Vedic Vak (Sacred Speech). Rewire unconscious triggers, dissolve limiting inner self-talk, and pattern absolute clarity.",
    category: "mastery",
    categoryLabel: "Inner Mastery & Applied Practices",
    target: "Personal Growth Seekers & High-Acuity Thinkers",
    image: "https://i.pinimg.com/736x/94/44/a9/9444a9fdbdecf706160227eab7b18ed7.jpg",
    days: [
      {
        dayNum: 1,
        title: "Mapping Subconscious Anchors",
        duration: "15 mins",
        sanskrit: "संस्कार परीक्षा (Sanskara Pariksha)",
        focus: "Identifying limiting verbal loops and neural triggers",
        description: "Uncover the silent linguistic codes that dictate your emotional states. Map your core automatic reactions to release them.",
        guideline: "Identify one phrase you say to yourself when stressed. Write it down mentally. Observe its heavy vibration and dissolve it.",
        mantra: "Om Vak Devya Namah (Honor the divine power of speech)"
      },
      {
        dayNum: 2,
        title: "Neurological Re-Patterning",
        duration: "15 mins",
        sanskrit: "मनो लय (Mano Laya)",
        focus: "Establishing positive, high-frequency mental triggers",
        description: "Superimpose Vedic truth patterns over old, anxious self-limiting tracks. Form a strong physiological anchor of success.",
        guideline: "Touch the tip of your thumb and ring finger while inhaling. Mentally associate this mudra with absolute presence and strength.",
        mantra: "Aham Brahmasmi (I am the infinite, unlimited reality)"
      },
      {
        dayNum: 3,
        title: "Empowering the Sovereign Voice",
        duration: "15 mins",
        sanskrit: "वाक् शक्ति (Vak Shakti)",
        focus: "Projecting reality from absolute heart presence",
        description: "Align your speech with truth. Learn to speak with unshakeable composure, transmitting immediate clarity to listeners.",
        guideline: "Speak slowly, breathing from the navel. Let every word you speak be seasoned with silence and intent.",
        mantra: "Om Shanti (I speak from the absolute background of peace)"
      }
    ]
  },
  {
    id: "meditation-mastery",
    title: "Meditation Mastery (Absolute Presence)",
    sanskrit: "सप्त ध्यान (Sapt Dhyana)",
    duration: "7 Days",
    intensity: "Gentle / Pure Contemplation",
    description: "Inhabit unmoving Himalayan silence. Trace the detailed 7-day path to cultivate non-dual witness consciousness and dissolve mental clutter.",
    category: "mastery",
    categoryLabel: "Inner Mastery & Applied Practices",
    target: "Sincere Seekers of Traditional Silence",
    image: "https://i.pinimg.com/736x/a3/36/8b/a3368bb5b0cb76008788b15a3a1b8772.jpg",
    days: [
      {
        dayNum: 1,
        title: "The Ground of Silence",
        duration: "12 mins",
        sanskrit: "भूमिका (Bhumika)",
        focus: "Establishing physical and mental stillness",
        description: "Let go of all control. Settle into the natural state of physical stillness and observe the mind like passing clouds.",
        guideline: "Sit upright. Close your eyes. Softly anchor your attention on the quiet rise and fall of your abdomen.",
        mantra: "Om Shantih Shantih Shantih"
      },
      {
        dayNum: 2,
        title: "The Watcher on the Hill",
        duration: "15 mins",
        sanskrit: "साक्षी (Sakshi)",
        focus: "Cultivating the Witness Consciousness",
        description: "Observe thoughts, sensations, and emotions without labeling them as good or bad. Establish yourself as the quiet screen.",
        guideline: "Whenever a thought appears, mentally note: 'A thought is arising,' and gently return to simple witnessing.",
        mantra: "Aham Sakshi (I am the silent witness)"
      },
      {
        dayNum: 3,
        title: "Befriending the Breath",
        duration: "15 mins",
        sanskrit: "प्राण सखा (Prana Sakha)",
        focus: "Sustaining anchor in natural breathing",
        description: "Feel the absolute quality of breath at the tip of the nostrils. Notice the gentle pause at the top of the inhalation.",
        guideline: "Settle your full attention at the rim of your nostrils. Trace the cool inhalation and warm exhalation.",
        mantra: "So'Ham (I am that breath)"
      },
      {
        dayNum: 4,
        title: "The Space Between Thoughts",
        duration: "18 mins",
        sanskrit: "अन्तराल (Antarala)",
        focus: "Resting in the gap of quiet reflection",
        description: "Dive deep into the precise millisecond where one thought ends and the next has not yet arisen. Expand that gap.",
        guideline: "Watch the space between words. Direct your gaze into the quiet dark screen of the third eye.",
        mantra: "Om Namah Shivaya"
      },
      {
        dayNum: 5,
        title: "Dissolving Personal History",
        duration: "20 mins",
        sanskrit: "विलीन (Vileen)",
        focus: "Releasing memories and expectations",
        description: "Surrender your narrative. For twenty minutes, you have no past, no future, and no duties. You are pure existence.",
        guideline: "Mentally repeat: 'At this moment, I need nothing, I do nothing, I am nothing.' Inhabit the immediate now.",
        mantra: "Sat-Chit-Ananda (Truth-Consciousness-Bliss)"
      },
      {
        dayNum: 6,
        title: "Radiating Heart Consciousness",
        duration: "18 mins",
        sanskrit: "करुणा (Karuna)",
        focus: "Opening the spiritual heart center",
        description: "Direct infinite loving-kindness first to yourself, then to your loved ones, and eventually to all sentient beings across space.",
        guideline: "Imagine a warm, golden light glowing in the center of your chest. Let it expand with every single exhalation.",
        mantra: "Lokah Samastah Sukhino Bhavantu"
      },
      {
        dayNum: 7,
        title: "The Unbroken Natural State",
        duration: "25 mins",
        sanskrit: "सहज समाधि (Sahaja Samadhi)",
        focus: "Integrating stillness into active living",
        description: "Acknowledge that your natural state is already perfect, silent, and complete. There is nowhere to travel, only rest.",
        guideline: "Gently open your eyes but keep the internal gaze settled. Realize that action and silence are one undivided field.",
        mantra: "Aham Brahmasmi (I am the Infinite Essence)"
      }
    ]
  },
  {
    id: "shadow-work",
    title: "Shadow Work (Subconscious Integration)",
    sanskrit: "अन्तर्च्छाया साधना (Antarchaya Sadhana)",
    duration: "3 Days",
    intensity: "Deep / Emotional Alchemy",
    description: "Expose hidden patterns. Illuminate repressed fears, shame, and unrecognized desires. Bring them into loving non-dual awareness to reclaim lost mental power.",
    category: "mastery",
    categoryLabel: "Inner Mastery & Applied Practices",
    target: "Sadhakas Seeking Subconscious Wholeness",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=600",
    days: [
      {
        dayNum: 1,
        title: "Facing the Hidden Self",
        duration: "15 mins",
        sanskrit: "छाया दर्शन (Chhaya Darshana)",
        focus: "Unveiling suppressed emotions with complete honesty",
        description: "Look straight into your core insecurities. Bring deep compassion to the parts of your personality you usually hide from others.",
        guideline: "Inhale, breathing into the area of tension in your gut. Exhale, silently welcoming your hidden self with love.",
        mantra: "Aham Svaroopam (I am complete as I am)"
      },
      {
        dayNum: 2,
        title: "The Alchemy of Loving Acceptance",
        duration: "15 mins",
        sanskrit: "करुणा परिणाम (Karuna Parinama)",
        focus: "Embracing your flaws and shadow without self-criticism",
        description: "Let go of self-blame. Recognize that every shadow is just blocked light. Open your spiritual heart to release mental judgments.",
        guideline: "Visualize the dark corners of your subconscious being bathed in warm, healing golden light from your heart.",
        mantra: "Om Shanti Premaya Namah (Peace and love integrate)"
      },
      {
        dayNum: 3,
        title: "Reclaiming Your Sovereign Power",
        duration: "18 mins",
        sanskrit: "शक्ति समेकन (Shakti Samekana)",
        focus: "Integrating the shadow to unlock creativity and confidence",
        description: "Unite divided parts of the self. Step forward as a whole, fully integrated individual, walking in power.",
        guideline: "Feel the absolute integration of your light and shadow. Stand tall, breathing with unshakeable core strength.",
        mantra: "Shivoham Shivoham (I am pure auspicious consciousness)"
      }
    ]
  },

  // 3. Life & Spiritual Coach Certification
  {
    id: "acharya-certification",
    title: "6-Month Acharya Life Coach Certification",
    sanskrit: "आचार्य दीक्षा (Acharya Deeksha)",
    duration: "4 Days",
    intensity: "Advanced / Flagship Curriculum",
    description: "Our 6-month flagship lineage program. Combines NLP linguistic mastery, non-dual Vedic psychology, Spinalign posture mechanics, and Shadow Work integration to train professional spiritual guides.",
    category: "coach",
    categoryLabel: "Life & Spiritual Coach Certification",
    target: "Aspiring Professional Life & Spiritual Coaches",
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=600",
    days: [
      {
        dayNum: 1,
        title: "Lineage & Counseling Philosophy",
        duration: "20 mins",
        sanskrit: "गुरु परम्परा (Guru Parampara)",
        focus: "Learning the non-dual paradigm of spiritual coaching",
        description: "Understand the core philosophy of counseling: seeing every client as already perfect, silent, and whole, rather than broken.",
        guideline: "Sit silently. Meditate on the concept of non-separateness. See your future clients as extensions of your own presence.",
        mantra: "Om Guruve Namah (Bow to the inner teacher of all)"
      },
      {
        dayNum: 2,
        title: "Spiritual Posture & Energy Diagnostics",
        duration: "20 mins",
        sanskrit: "प्राण परीक्षा (Prana Pariksha)",
        focus: "Diagnosing a client's energetic blocks via spinal posturing",
        description: "Learn to read energetic blockages in a client's spine and breath pattern. Cultivate intuitive diagnostic listening.",
        guideline: "Observe your breath pattern. Is it deep or shallow? Learn to recognize these indicators to offer targeted spinal sequences.",
        mantra: "Om Sushumna-Vahini Swaha (May energy flow freely)"
      },
      {
        dayNum: 3,
        title: "Linguistic Subconscious Restructuring",
        duration: "20 mins",
        sanskrit: "शब्द संस्कार (Shabda Sanskara)",
        focus: "Vedic dialogue techniques to rewrite limiting anchors",
        description: "Master powerful counseling dialogues that gently guide clients to dismantle their own anxiety models through inquiry.",
        guideline: "Practice active listening. Respond not with solutions, but with questions that prompt deep, quiet self-reflection.",
        mantra: "Aham Vimuktah (I am inherently free and liberated)"
      },
      {
        dayNum: 4,
        title: "The Ethics of Sacred Transmission",
        duration: "20 mins",
        sanskrit: "धर्म दीक्षा (Dharma Deeksha)",
        focus: "Upholding lineage purity and ethical parameters",
        description: "Honor the boundary of transmission. Learn to hold clean space for others without absorbing their emotional debris.",
        guideline: "Visualize an envelope of pure golden light guarding your aura. Hold space from a place of unattached service.",
        mantra: "Lokah Samastah Sukhino Bhavantu"
      }
    ]
  },

  // 4. Practitioner / Train-the-Trainer Track
  {
    id: "trainer-track",
    title: "Practitioner / Train-the-Trainer Track",
    sanskrit: "प्रशिक्षक दीक्षा (Prashikshak Deeksha)",
    duration: "3 Days",
    intensity: "Advanced / Teaching Competency",
    description: "Earn authorization to teach our corporate and applied practices. Master voice modulation, classroom energetic architecture, and posture diagnostics instruction.",
    category: "practitioner",
    categoryLabel: "Practitioner / Train-the-Trainer Track",
    target: "Certified Yoga & Meditation Guides Seeking Lineage Power",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600",
    days: [
      {
        dayNum: 1,
        title: "Space-Holding Architecture",
        duration: "22 mins",
        sanskrit: "सभा रक्षण (Sabha Rakshana)",
        focus: "Managing group energy fields and classroom acoustics",
        description: "Master the art of establishing an unshakeable sanctuary. Anchor the room's energy using your own breathing cycle.",
        guideline: "Practice standing in the center of a space. Take 5 slow, deep breaths, expanding your focus to fill all four corners.",
        mantra: "Om Samantaya Namah (I guard and bless this entire space)"
      },
      {
        dayNum: 2,
        title: "Somatic Diagnostic Instruction",
        duration: "25 mins",
        sanskrit: "क्रिया उपदेश (Kriya Upadesha)",
        focus: "Instructing posture alignment with precise verbal cues",
        description: "Learn to guide complex spine adjustments using only clear, calm verbal commands without physically touching.",
        guideline: "Describe a spinal lift using sensory adjectives: 'Imagine a golden thread pulling the crown of your head to the sky.'",
        mantra: "Om Kriya-Siddhaye Swaha (May active practices bear fruit)"
      },
      {
        dayNum: 3,
        title: "Lineage Projection & Voice Modulation",
        duration: "25 mins",
        sanskrit: "नाद संचरण (Nada Sancharana)",
        focus: "Projecting healing chanting frequencies from the heart",
        description: "Harmonize your vocal tone to release stress in listeners. Practice chanting foundational Sanskrit peace mantras with power.",
        guideline: "Inhale fully. Vocalize the sound 'OM' in a deep, low pitch, letting the vibrational chime echo from the chest.",
        mantra: "Om Shanti Shanti Shanti (Universal sound transmission)"
      }
    ]
  }
];

export default function ProgramsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [activeProg, setActiveProg] = useState<Program | null>(null);
  const [enrolledProgId, setEnrolledProgId] = useState<string | null>(null);
  const [currentDayIndex, setCurrentDayIndex] = useState<number>(0);
  const [completedDays, setCompletedDays] = useState<{ [progId: string]: number[] }>({});
  
  // Custom Certificate State
  const [showCert, setShowCert] = useState(false);
  const [certName, setCertName] = useState("");
  const [certCertified, setCertCertified] = useState(false);

  // Audio Play Simulation
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const filteredPrograms = activeCategory === "all"
    ? PROGRAMS
    : PROGRAMS.filter(p => p.category === activeCategory);

  const handleEnroll = (prog: Program) => {
    setEnrolledProgId(prog.id);
    setCurrentDayIndex(0);
    setIsPlaying(false);
    setCurrentTime(0);
    setShowCert(false);
    setCertCertified(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const markDayComplete = (progId: string, dayNum: number) => {
    const prevCompleted = completedDays[progId] || [];
    if (!prevCompleted.includes(dayNum)) {
      const updated = [...prevCompleted, dayNum];
      setCompletedDays({
        ...completedDays,
        [progId]: updated
      });
      // Automatically advance day if possible
      if (currentDayIndex < (activeProg?.days.length || 0) - 1) {
        setTimeout(() => {
          setCurrentDayIndex((prev) => prev + 1);
          setIsPlaying(false);
          setCurrentTime(0);
        }, 800);
      }
    }
  };

  const handleResetProgram = (progId: string) => {
    setCompletedDays({
      ...completedDays,
      [progId]: []
    });
    setCurrentDayIndex(0);
    setIsPlaying(false);
    setCurrentTime(0);
    setShowCert(false);
    setCertCertified(false);
  };

  return (
    <div id="programs-module" className="space-y-12">
      
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-sage-100">
        <div>
          <span className="text-xs font-mono tracking-widest text-gold-600 uppercase block mb-2">
            Spiritual Curriculums
          </span>
          <h3 className="text-3xl font-serif font-bold text-sage-900 tracking-tight leading-none">
            Sacred Pathways & Certifications
          </h3>
          <p className="mt-3 text-sage-600 text-sm max-w-xl leading-relaxed">
            Four specialized, highly intensive pathways integrating somatic spinal postures, subconscious NLP reprogramming, non-dual dhyana, and professional coach credentials.
          </p>
        </div>

        {enrolledProgId ? (
          <button
            id="back-to-programs-list-btn"
            onClick={() => {
              setActiveProg(null);
              setEnrolledProgId(null);
            }}
            className="px-5 py-2 rounded-full border border-sage-200 hover:bg-sage-50 text-xs font-semibold text-sage-700 transition-colors cursor-pointer"
          >
            ← View All Pathways
          </button>
        ) : (
          <div className="flex flex-wrap items-center gap-1.5 bg-sage-50 p-1.5 rounded-full border border-sage-100/60 max-w-max">
            {[
              { id: "all", label: "All Paths" },
              { id: "corporate", label: "Corporate" },
              { id: "mastery", label: "Inner Mastery" },
              { id: "coach", label: "Coach Cert" },
              { id: "practitioner", label: "Trainer Track" }
            ].map((cat) => (
              <button
                key={cat.id}
                id={`prog-category-filter-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  activeCategory === cat.id 
                    ? "bg-sage-900 text-gold-100" 
                    : "text-sage-500 hover:text-sage-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!enrolledProgId ? (
          /* SECTION A: LIST OF PROGRAMS */
          <motion.div
            key="programs-grid"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {filteredPrograms.map((prog) => {
              const completedCount = (completedDays[prog.id] || []).length;
              const percent = Math.round((completedCount / prog.days.length) * 100);

              return (
                <div
                  key={prog.id}
                  id={`program-card-${prog.id}`}
                  className="bg-white rounded-3xl overflow-hidden border border-sage-100 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="relative h-48">
                    <img
                      src={prog.image}
                      alt={prog.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-sage-950/80 via-sage-950/20 to-transparent"></div>
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-mono font-bold text-sage-900 uppercase tracking-widest">
                      {prog.duration}
                    </div>
                    <span className="absolute top-4 right-4 bg-gold-600 text-white text-[8px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
                      {prog.categoryLabel}
                    </span>
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-gold-300 text-[10px] font-mono block mb-1">
                        {prog.sanskrit}
                      </span>
                      <h4 className="text-xl font-serif font-bold text-white leading-tight">
                        {prog.title}
                      </h4>
                    </div>
                  </div>

                  <div className="p-6 space-y-5 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <p className="text-xs text-sage-600 leading-relaxed">
                        {prog.description}
                      </p>

                      <div className="flex items-center gap-1.5 text-[10px] text-sage-400 font-mono">
                        <User className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                        <span>Target: <strong className="text-sage-600">{prog.target}</strong></span>
                      </div>
                    </div>

                    {/* Progress indicator */}
                    {completedCount > 0 && (
                      <div className="space-y-1.5 bg-sage-50 p-3 rounded-2xl border border-sage-100">
                        <div className="flex items-center justify-between text-[10px] font-mono text-sage-500">
                          <span>Progress: {completedCount}/{prog.days.length} Days</span>
                          <span>{percent}% Complete</span>
                        </div>
                        <div className="w-full h-1.5 bg-white rounded-full overflow-hidden border border-sage-100">
                          <div
                            className="h-full bg-gold-600 rounded-full transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-sage-100">
                      <div className="flex items-center gap-1.5">
                        <Flame className="w-4 h-4 text-gold-600" />
                        <span className="text-[10px] font-mono uppercase tracking-widest text-sage-500 font-semibold">
                          {prog.intensity}
                        </span>
                      </div>

                      <button
                        id={`enroll-btn-${prog.id}`}
                        onClick={() => {
                          setActiveProg(prog);
                          handleEnroll(prog);
                        }}
                        className="px-5 py-2.5 rounded-full bg-sage-900 hover:bg-sage-950 text-gold-100 font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-2"
                      >
                        {completedCount > 0 ? "Continue Path" : "Begin Curriculum"}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        ) : (
          /* SECTION B: ACTIVE COURSE PLAYER VIEW */
          activeProg && (
            <motion.div
              key="active-program-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              {/* Day Selector Sidebar */}
              <div className="lg:col-span-4 bg-white border border-sage-100 p-6 rounded-3xl space-y-4 shadow-2xs">
                <div className="border-b border-sage-100 pb-4">
                  <span className="text-[10px] font-mono text-gold-600 uppercase tracking-widest font-bold">
                    Active Practice Channel
                  </span>
                  <h4 className="font-serif font-bold text-lg text-sage-900 leading-tight">
                    {activeProg.title}
                  </h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs bg-sage-50 text-sage-600 px-2.5 py-0.5 rounded-full font-serif font-medium">
                      {activeProg.sanskrit}
                    </span>
                    <button
                      id="reset-program-btn"
                      onClick={() => handleResetProgram(activeProg.id)}
                      className="text-[10px] font-mono text-sage-400 hover:text-red-500 underline transition-colors cursor-pointer"
                    >
                      Reset Progress
                    </button>
                  </div>
                </div>

                {/* Days List */}
                <div className="space-y-2 max-h-[350px] overflow-y-auto pr-1">
                  {activeProg.days.map((day, idx) => {
                    const isSelected = currentDayIndex === idx;
                    const isCompleted = (completedDays[activeProg.id] || []).includes(day.dayNum);
                    
                    return (
                      <button
                        key={day.dayNum}
                        id={`program-day-tab-${day.dayNum}`}
                        onClick={() => {
                          setCurrentDayIndex(idx);
                          setIsPlaying(false);
                          setCurrentTime(0);
                        }}
                        className={`w-full text-left p-3 rounded-2xl border transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                          isSelected
                            ? "bg-sage-900 text-gold-100 border-sage-900 shadow-xs"
                            : "bg-sage-50/40 hover:bg-sage-100/40 text-sage-800 border-sage-100"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                            isSelected ? "bg-sage-800 text-gold-400" : "bg-white text-sage-600 shadow-2xs"
                          }`}>
                            {day.dayNum}
                          </div>
                          <div>
                            <h5 className="font-semibold text-xs tracking-wide leading-tight">{day.title}</h5>
                            <span className={`text-[9px] font-mono uppercase tracking-wider block mt-0.5 ${
                              isSelected ? "text-gold-300/80" : "text-sage-500"
                            }`}>
                              {day.sanskrit} • {day.duration}
                            </span>
                          </div>
                        </div>

                        <div>
                          {isCompleted ? (
                            <CheckCircle className="w-4 h-4 text-emerald-600 fill-emerald-50 shrink-0" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Unlock Certificate Button if all days completed */}
                {(completedDays[activeProg.id] || []).length === activeProg.days.length && (
                  <button
                    id="trigger-certificate-btn"
                    onClick={() => setShowCert(true)}
                    className="w-full py-3 bg-gold-600 hover:bg-gold-700 text-white font-serif font-bold text-xs rounded-2xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all animate-pulse cursor-pointer"
                  >
                    <Award className="w-4 h-4" />
                    <span>Claim Graduation Certificate</span>
                  </button>
                )}
              </div>

              {/* Central Practice Player */}
              <div className="lg:col-span-8 bg-white border border-sage-100 rounded-3xl p-8 space-y-6 shadow-2xs">
                
                {/* Active Day Meta */}
                <div className="border-b border-sage-100 pb-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-gold-600 uppercase tracking-widest font-bold">
                      Day {activeProg.days[currentDayIndex].dayNum} — {activeProg.days[currentDayIndex].sanskrit}
                    </span>
                    <h4 className="text-2xl font-serif font-bold text-sage-900 mt-1">
                      {activeProg.days[currentDayIndex].title}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 bg-sage-50 px-3 py-1.5 rounded-full text-xs text-sage-600 font-mono">
                    <Timer className="w-3.5 h-3.5" />
                    <span>{activeProg.days[currentDayIndex].duration} session</span>
                  </div>
                </div>

                {/* Day Details */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[9px] uppercase font-mono text-sage-400 tracking-widest block font-semibold">Focus & Purpose</span>
                    <p className="text-xs text-sage-800 font-serif leading-relaxed">
                      {activeProg.days[currentDayIndex].description}
                    </p>
                  </div>

                  <div className="bg-[#faf9f5] border border-sage-100 p-5 rounded-2xl space-y-2">
                    <span className="text-[9px] uppercase font-mono text-gold-700 tracking-widest block font-bold">Practical Practice Guideline</span>
                    <p className="text-xs text-sage-700 leading-relaxed font-sans">
                      {activeProg.days[currentDayIndex].guideline}
                    </p>
                  </div>

                  <div className="border-l-2 border-gold-400 pl-4 py-1 italic text-xs text-sage-800 font-serif">
                    Mantra for contemplation: <strong>"{activeProg.days[currentDayIndex].mantra}"</strong>
                  </div>
                </div>

                {/* Interactive Simulated Audio Guidance Player */}
                <div className="bg-sage-50 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <button
                      id="play-practice-audio-btn"
                      onClick={togglePlay}
                      className="w-12 h-12 rounded-full bg-sage-900 hover:bg-sage-950 text-gold-100 flex items-center justify-center shadow-md transition-colors cursor-pointer"
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 fill-current" />
                      ) : (
                        <Play className="w-5 h-5 fill-current translate-x-0.5" />
                      )}
                    </button>
                    <div>
                      <span className="text-[9px] font-mono text-sage-400 uppercase tracking-widest block font-semibold">Simulated Guidance Audio</span>
                      <h5 className="font-semibold text-xs text-sage-800">
                        {isPlaying ? "Transmitting master voice guidance..." : "Session stands paused"}
                      </h5>
                    </div>
                  </div>

                  {/* Aesthetic Waveform */}
                  <div className="flex items-center gap-1 h-8 flex-1 max-w-xs">
                    {[12, 18, 32, 24, 16, 28, 42, 38, 22, 14, 26, 36, 18, 12].map((val, idx) => (
                      <div
                        key={idx}
                        className={`w-1.5 rounded-full transition-all duration-300 ${
                          isPlaying ? "bg-gold-600 animate-pulse" : "bg-sage-200"
                        }`}
                        style={{
                          height: isPlaying ? `${val + Math.sin(Date.now() + idx) * 8}px` : `${val * 0.4}px`
                        }}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Day Action */}
                <div className="pt-4 border-t border-sage-100 flex items-center justify-between">
                  <span className="text-xs text-sage-500">
                    Feel aligned with today's realization?
                  </span>
                  <button
                    id="mark-day-complete-btn"
                    onClick={() => markDayComplete(activeProg.id, activeProg.days[currentDayIndex].dayNum)}
                    className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Complete Day {activeProg.days[currentDayIndex].dayNum}</span>
                  </button>
                </div>
              </div>

              {/* Certificate Modal */}
              <AnimatePresence>
                {showCert && (
                  <div className="fixed inset-0 bg-sage-950/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-[#faf9f5] border-8 border-double border-gold-400 p-8 max-w-xl w-full rounded-2xl relative shadow-2xl text-center space-y-6"
                    >
                      <button
                        id="close-cert-modal-btn"
                        onClick={() => setShowCert(false)}
                        className="absolute top-4 right-4 text-sage-500 hover:text-sage-700 font-bold text-xs cursor-pointer"
                      >
                        ✕ Close
                      </button>

                      <div className="space-y-2">
                        <span className="text-xs uppercase tracking-[0.4em] text-gold-600 font-mono block font-bold">
                          Sanctuary Attunement Certificate
                        </span>
                        <div className="w-16 h-0.5 bg-gold-400 mx-auto my-3"></div>
                      </div>

                      {!certCertified ? (
                        <div className="space-y-4 text-left max-w-sm mx-auto">
                          <p className="text-xs text-sage-600 text-center leading-relaxed">
                            Please provide your full spiritual or worldly name to materialize your Registered Attunement Blessing.
                          </p>
                          <div>
                            <label className="block text-[10px] uppercase font-mono tracking-wider text-sage-400 mb-1.5 font-bold">
                              Spiritual / Full Name
                            </label>
                            <input
                              id="cert-name-input"
                              type="text"
                              value={certName}
                              onChange={(e) => setCertName(e.target.value)}
                              placeholder="e.g., Siddhartha Prasad"
                              className="w-full text-xs text-sage-950 bg-white rounded-xl p-3 border border-sage-100 focus:outline-none focus:border-sage-300"
                            />
                          </div>
                          <button
                            id="cert-submit-btn"
                            onClick={() => {
                              if (certName.trim()) {
                                setCertCertified(true);
                              }
                            }}
                            className="w-full py-3 bg-sage-900 hover:bg-sage-950 text-gold-100 font-semibold text-xs tracking-wider uppercase rounded-xl transition-colors cursor-pointer"
                          >
                            Generate Attunement Blessing
                          </button>
                        </div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="space-y-6"
                        >
                          <div className="space-y-2">
                            <span className="text-[10px] font-mono text-sage-400 uppercase tracking-widest block">
                              Be it known to all seeking worlds
                            </span>
                            <h3 className="text-2xl font-serif font-bold text-sage-900 italic">
                              {certName}
                            </h3>
                            <p className="text-xs text-sage-600 max-w-md mx-auto leading-relaxed">
                              has successfully graduated the sacred <strong>{activeProg.title}</strong> curriculum in <strong>{activeProg.categoryLabel}</strong>. Having inhabited daily non-dual stillness, vertical spinal alignments, and profound mindfulness, they hold the light of natural wisdom.
                            </p>
                          </div>

                          <div className="border-t border-b border-sage-100 py-4 max-w-xs mx-auto flex items-center justify-between text-[10px] font-mono text-sage-500">
                            <div>
                              <span>Cohort: 2026</span>
                            </div>
                            <div className="text-gold-600 font-serif font-bold tracking-widest">
                              ॐ SATSANG
                            </div>
                            <div>
                              <span>No. LW-01827734</span>
                            </div>
                          </div>

                          <div className="bg-gold-50 border border-gold-200/40 p-4 rounded-xl text-left max-w-md mx-auto flex gap-3 items-center">
                            <Flame className="w-5 h-5 text-gold-600 shrink-0" />
                            <p className="text-[11px] text-sage-700 italic font-serif leading-relaxed">
                              "May you carry this wisdom as an unmoving anchor into all your daily actions, walking as a beacon of natural grace."
                            </p>
                          </div>

                          <button
                            id="cert-close-btn"
                            onClick={() => setShowCert(false)}
                            className="px-6 py-2.5 bg-sage-900 text-gold-100 hover:bg-sage-950 text-xs font-semibold rounded-full transition-colors cursor-pointer"
                          >
                            Acknowledge & Save Blessing
                          </button>
                        </motion.div>
                      )}
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        )}
      </AnimatePresence>

    </div>
  );
}
