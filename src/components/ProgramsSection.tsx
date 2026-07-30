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
  ArrowRight, 
  User, 
  Shield, 
  Sparkles,
  X,
  Compass,
  Activity,
  Brain,
  Layers,
  Feather,
  Check,
  DollarSign,
  Calendar,
  Monitor,
  Users,
  Target,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface SyllabusModule {
  moduleNumber: string;
  title: string;
  items: string[];
}

export interface Day {
  dayNum: number;
  title: string;
  duration: string;
  sanskrit: string;
  focus: string;
  description: string;
  guideline: string;
  mantra: string;
}

export interface Program {
  id: string;
  title: string;
  tagline: string;
  sanskrit: string;
  duration: string;
  fee: string;
  mode: string;
  intensity: string;
  description: string;
  aboutText: string;
  forWhom: string;
  category: "foundational" | "corporate" | "somatic" | "cognitive" | "wellness";
  categoryLabel: string;
  target: string;
  image: string;
  icon: React.ComponentType<any>;
  subPageId?: string;
  highlights: string[];
  syllabus: SyllabusModule[];
  benefits: string[];
  days: Day[];
}

export const FIVE_PROGRAMS: Program[] = [
  {
    id: "discover-harmonise",
    title: "Discover Harmonise Transform",
    tagline: "Awaken Inner Equilibrium, Resolve Conflicts & Harness Conscious Focus",
    sanskrit: "अनुभव समन्वय परिवर्तन (Anubhava Samanvaya Parivartana)",
    duration: "7 Days (Guided Immersion)",
    fee: "₹14,999 / $199",
    mode: "Online Live & Self-Paced Sanctuary",
    intensity: "Gentle & Deeply Integrative",
    description: "A foundational holistic program addressing basic psychology, false ego, inner conflicts, and over-commitments that silently impair health, focus, and productivity.",
    aboutText: "Modern life traps us in continuous over-commitments, escalating friction, and subconscious fatigue. This program delves into basic human psychology, unmasking the false ego and resolving inner conflicts. By identifying the root causes of mental noise and over-commitments, you restore natural physical health, sustained productivity, and crystalline focus.",
    forWhom: "Designed for professionals, seekers, leaders, and individuals struggling with over-commitments, mental fatigue, internal friction, false ego traps, and diminished focus.",
    category: "foundational",
    categoryLabel: "Foundational Journey",
    target: "Seekers, Over-Committed Leaders & Focus Seekers",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600",
    icon: Compass,
    highlights: [
      "Unmasking basic psychology & false ego mechanisms",
      "Resolving inner conflicts & over-commitment stress",
      "Restoring physical health, executive focus & productivity",
      "Mastering Three Gunas & Antahkaran self-knowledge"
    ],
    syllabus: [
      {
        moduleNumber: "i",
        title: "Understanding & Discovering Root Causes of Human Issues",
        items: [
          "The Traps (Mental over-commitments & reactivity loops)",
          "The Illusions (Perceived urgencies & external validation)",
          "Invisible Patterns (Subconscious habits causing energy drains)",
          "Inner Conflicts (Disalignment between values and actions)",
          "False Ego (Identification with titles, roles, and defensiveness)"
        ]
      },
      {
        moduleNumber: "ii",
        title: "Discovering Realities of Human Life",
        items: [
          "Basic Concepts of Mind-Body Physiology",
          "Discovering Self beyond societal conditioning",
          "Three Gunas (Sattva - Balance, Rajas - Action/Restlessness, Tamas - Inertia)",
          "Antahkaran (Fourfold Mind: Manas, Buddhi, Chitta, Ahamkara)"
        ]
      },
      {
        moduleNumber: "iii",
        title: "Cleaning, Balancing, Harmonising",
        items: [
          "Basis and Emotional Cleaning (Releasing accumulated tension)",
          "Karma and Dharma (Aligning right action with natural duty)",
          "Spiritual Aspects of Existence (Connecting to non-dual stillness)"
        ]
      },
      {
        moduleNumber: "iv",
        title: "Sustainability Tips / Practices",
        items: [
          "Daily micro-routines to prevent burnout",
          "Anchoring focus amidst corporate & personal demands",
          "Sustaining emotional harmony & ego-transcendence in action"
        ]
      }
    ],
    benefits: [
      "Clear understanding of basic psychology & false ego traps",
      "Elimination of over-commitment fatigue and chronic stress",
      "Restoration of sharp focus, mental stamina, and daily productivity",
      "Resolution of inner conflicts affecting health and relationships",
      "Deep emotional cleaning and practical mastery over Three Gunas",
      "Sustainable daily practices that maintain peace under high pressure"
    ],
    days: [
      {
        dayNum: 1,
        title: "Unmasking the Root Causes & Traps",
        duration: "15 mins",
        sanskrit: "मूल कारण ज्ञान (Mula Karana Jnana)",
        focus: "Identifying mental traps, illusions, and over-commitments",
        description: "Examine the invisible patterns that drive over-commitments and inner conflict. Recognize how the false ego drains your focus.",
        guideline: "List 3 recent situations where over-commitment created stress. Observe without self-judgment.",
        mantra: "Aham Sakshi (I am the unmoving witness of all thoughts)"
      },
      {
        dayNum: 2,
        title: "Navigating False Ego & Inner Conflicts",
        duration: "15 mins",
        sanskrit: "अहंकार विसर्जन (Ahamkara Visarjana)",
        focus: "Dissolving false ego friction and restoring emotional ease",
        description: "Deconstruct the defensiveness of false ego. Learn to respond to challenges from quiet clarity rather than ego reaction.",
        guideline: "Whenever ego defensiveness arises today, pause for one deep breath and ask: 'Who am I defending?'",
        mantra: "Om Shanti (Pure undisturbed peace)"
      },
      {
        dayNum: 3,
        title: "Discovering Self & The Three Gunas",
        duration: "18 mins",
        sanskrit: "गुण त्रय विचार (Guna Traya Vichara)",
        focus: "Balancing Sattva, Rajas, and Tamas for health and stamina",
        description: "Understand your current state across the Three Gunas. Learn to elevate Tamas (inertia) into Sattva (light & calm focus).",
        guideline: "Notice whether your energy is sluggish (Tamas), frantic (Rajas), or clear (Sattva). Adjust diet and breath accordingly.",
        mantra: "Sattvam Bhashate (Sattva illuminates)"
      },
      {
        dayNum: 4,
        title: "Mastering Antahkaran (The Inner Instrument)",
        duration: "18 mins",
        sanskrit: "अन्तःकरण शुद्धि (Antahkaran Shuddhi)",
        focus: "Harmonizing Manas, Buddhi, Chitta, and Ahamkara",
        description: "Align your sensory mind (Manas), intellect (Buddhi), memory vault (Chitta), and identity (Ahamkara) into a cohesive unit.",
        guideline: "Let Buddhi (intellect) guide Manas (desires) gently during decision-making today.",
        mantra: "Om Buddhyai Namah"
      },
      {
        dayNum: 5,
        title: "Basis & Emotional Cleaning",
        duration: "15 mins",
        sanskrit: "भाव शुद्धि (Bhava Shuddhi)",
        focus: "Releasing suppressed emotional weight and mental toxins",
        description: "Clear accumulated emotional residue from past conflicts. Restore freshness to your heart and mind.",
        guideline: "Exhale through the mouth with a soft sigh, releasing stored tightness in the solar plexus.",
        mantra: "Om Hreem Namah"
      },
      {
        dayNum: 6,
        title: "Aligning Karma & Dharma",
        duration: "15 mins",
        sanskrit: "धर्म कर्म योग (Dharma Karma Yoga)",
        focus: "Connecting daily action with purpose and health",
        description: "Act with full dedication without attaching your peace to immediate external outcomes.",
        guideline: "Perform your daily duties as an offering of excellence without anxious over-concern.",
        mantra: "Karmanye Vadhikaraste (Action is your sacred domain)"
      },
      {
        dayNum: 7,
        title: "Sustainability & Unbroken Transformation",
        duration: "20 mins",
        sanskrit: "सहज स्थिति (Sahaja Sthiti)",
        focus: "Embedding lifelong practices for health, focus, and productivity",
        description: "Consolidate your transformation into daily micro-anchors that preserve clarity in all conditions.",
        guideline: "Set a 3-minute morning and evening stillness ritual to sustain this state permanently.",
        mantra: "Aham Brahmasmi (I am the unbroken essence of life)"
      }
    ]
  },
  {
    id: "corporate-unburn",
    title: "Corporate Unburn – Unthread Stress • Rethread Life",
    tagline: "Unthread Stress • Rethread Life",
    sanskrit: "ऊर्जा पुनरुत्थान (Urja Punarutthana)",
    duration: "3 Days (Executive Intensive)",
    fee: "₹18,500 / $249",
    mode: "Online Live / Corporate On-Site",
    intensity: "Calming / Vagus Balancing",
    description: "A targeted executive protocol designed to quiet an overstimulated nervous system, balance vagal tone, and protect high-performing leaders from burnout.",
    aboutText: "High-pressure executive environments subject leaders to continuous decision fatigue, sympathetic nervous overdrive, and sleep disruption. Corporate Unburn provides a scientifically backed and ancient-inspired framework to unthread chronic stress and rethread life with calm vitality.",
    forWhom: "Corporate Leaders, Business Executives, HR Champions, Team Leads, and High-Performance Professionals.",
    category: "corporate",
    categoryLabel: "Executive & Workplace",
    target: "Corporate Professionals, Executives & HR Leaders",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=600",
    icon: Flame,
    subPageId: "corporate-unburn",
    highlights: [
      "Vagus nerve stimulation sequences to reduce sympathetic overdrive",
      "Micro-resets for high-velocity meeting schedules & email fatigue",
      "Cortisol reduction through ancient 4-7-8 ratio humming breathwork",
      "Sustaining clear focus without mental exhaustion"
    ],
    syllabus: [
      {
        moduleNumber: "i",
        title: "Vagus Nerve & Sympathetic Reset",
        items: [
          "Understanding sympathetic overdrive in corporate settings",
          "Vagus nerve activation techniques & HRV optimization",
          "4-7-8 ratio humming breathwork for rapid cortisol reduction"
        ]
      },
      {
        moduleNumber: "ii",
        title: "Executive Micro-Resets & Meeting Resilience",
        items: [
          "Implementing 2-minute desk micro-resets between back-to-back calls",
          "Releasing decision fatigue & cognitive clutter",
          "Maintaining postural sovereignty while sitting"
        ]
      },
      {
        moduleNumber: "iii",
        title: "Long-Term Energy Preservation & Restful Sleep",
        items: [
          "Evening digital shutdown & pineal gland activation",
          "Preventing empathetic fatigue & emotional absorption",
          "Building a sustainable corporate wellness strategy"
        ]
      }
    ],
    benefits: [
      "Immediate reduction in acute stress and heart-rate variability normalization",
      "Enhanced decision clarity during high-stakes executive scenarios",
      "Elimination of post-work mental exhaustion & chronic fatigue",
      "Restoration of natural, restorative deep sleep patterns"
    ],
    days: [
      {
        dayNum: 1,
        title: "Vagus Nerve Attunement & Cortisol Release",
        duration: "10 mins",
        sanskrit: "प्राण शमन (Prana Shamana)",
        focus: "Slowing heart rate variance & soothing vagal tone",
        description: "Release executive tension. Engage in a 4-7-8 ratio sequence with soft humming to soothe the central nervous axis.",
        guideline: "Sit back in your chair. Uncross ankles. Inhale 4s, hold 7s, exhale with a humming sound for 8s.",
        mantra: "Om Shanti Shanti (Deep peaceful stillness)"
      },
      {
        dayNum: 2,
        title: "Decompressing Executive Stress",
        duration: "12 mins",
        sanskrit: "मानस मोचन (Manasa Mochana)",
        focus: "Releasing psychological urgency and decision fatigue",
        description: "Observe pending emails and tasks as external waves while sitting as the unmoving ocean floor.",
        guideline: "Imagine your task list as dry leaves floating down a river. You are the quiet riverbed.",
        mantra: "Aham Nirbhayah (I am free from urgency)"
      },
      {
        dayNum: 3,
        title: "Sustaining Quiet in High-Velocity Operations",
        duration: "15 mins",
        sanskrit: "कर्म योग समाधि (Karma Yoga Samadhi)",
        focus: "Maintaining deep presence during active meetings",
        description: "Discover how to process rapid information while breathing calmly from the lower diaphragm.",
        guideline: "Keep your spine upright during calls. Feel the soles of your feet on the floor.",
        mantra: "Om Tat Sat (Truth is the ultimate ground)"
      }
    ]
  },
  {
    id: "spinelign",
    title: "Spinelign",
    tagline: "Postural Integrity & Spinal Energy Flow",
    sanskrit: "मेरुदण्ड संरेखण (Merudanda Alignment)",
    duration: "3 Days (Somatic Alignment)",
    fee: "₹12,500 / $169",
    mode: "Online Guided & Hybrid Practice",
    intensity: "Structural / Somatic Release",
    description: "Decompress intervertebral disks, correct desk-bound posture, and restore the natural curvature of your spine for effortless physical alignment and vitality.",
    aboutText: "Extended desk work and sedentary posture compress the intervertebral disks and restrict the natural energy flow through Sushumna Nadi. Spinelign provides somatic spinal exercises and alignment principles that restore graceful posture and back vitality.",
    forWhom: "Desk Professionals, Remote Workers, Software Engineers, and anyone experiencing lumbar or neck stiffness.",
    category: "somatic",
    categoryLabel: "Somatic Spine Health",
    target: "Desk Professionals, Remote Workers & Spine Strain Seekers",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600",
    icon: Activity,
    subPageId: "spinelign",
    highlights: [
      "Decompressing intervertebral disks caused by prolonged sitting",
      "Opening Sushumna Nadi central energy channel for mental clarity",
      "Shoulder girdle decompression & collarbone chest expansion",
      "Lower back pelvic floor grounding anchors"
    ],
    syllabus: [
      {
        moduleNumber: "i",
        title: "Somatic Disk Decompression & Crown Elevation",
        items: [
          "Understanding intervertebral disk pressure in seated posture",
          "Crown elevation micro-movements for spinal lengthening",
          "Releasing cervical spine stiffness and forward head posture"
        ]
      },
      {
        moduleNumber: "ii",
        title: "Thoracic Opening & Prana Flow",
        items: [
          "Shoulder girdle opening & collarbone expansion",
          "Freeing restricted diaphragmatic breath from tight ribs",
          "Aligning the heart center with upright posture"
        ]
      },
      {
        moduleNumber: "iii",
        title: "Pelvic Grounding & Core Anchor",
        items: [
          "Muladhara pelvic alignment for lower back health",
          "Ergonomic seating principles for home and office",
          "Building an effortless posture habit that lasts"
        ]
      }
    ],
    benefits: [
      "Relief from chronic lower back, neck, and shoulder stiffness",
      "Increased lung capacity and improved diaphragmatic breathing",
      "Enhanced physical presence and confident, upright posture",
      "Unblocked energy flow along the central spinal column (Sushumna)"
    ],
    days: [
      {
        dayNum: 1,
        title: "Sushumna Channel Decompression",
        duration: "12 mins",
        sanskrit: "मेरु चालन (Meru Chalana)",
        focus: "Stretching intervertebral disks and crown alignment",
        description: "Release compressed vertebrae. Learn to lift the crown of your head while anchoring the seat to gravity.",
        guideline: "Inhale extending spine upward. Exhale releasing shoulder tension downward while maintaining vertical height.",
        mantra: "Om Namo Narayana (Alignment with natural order)"
      },
      {
        dayNum: 2,
        title: "Prana Flow & Shoulder Release",
        duration: "12 mins",
        sanskrit: "स्कन्ध मोक्ष (Skandha Moksha)",
        focus: "Releasing cervical spine stiffness & chest tightness",
        description: "Decompress neck muscles and expand thoracic capacity to connect structural posture with deep breathing.",
        guideline: "Roll shoulders back 5 times. Interlace fingers behind lower back and open collarbones while breathing deeply.",
        mantra: "Prana Devaya Namah (Honor life-force current)"
      },
      {
        dayNum: 3,
        title: "The Steady Pelvic Core Anchor",
        duration: "15 mins",
        sanskrit: "मूलाधार दृढता (Muladhara Dridhata)",
        focus: "Establishing stability from the pelvic floor base",
        description: "Align the lower back to alleviate sitting fatigue and anchor core confidence throughout the workday.",
        guideline: "Engage a soft pelvic lift (Mula Bandha) on the exhale while keeping the lumbar curve natural.",
        mantra: "Aham Sthirah (I am grounded, stable, and strong)"
      }
    ]
  },
  {
    id: "nlp-rewire",
    title: "Neuro-Linguistic Programming – Rewire",
    tagline: "Rewire Subconscious Patterns & Sacred Speech",
    sanskrit: "वाक्-मनो विज्ञान (Vak-Mano Vijnana)",
    duration: "3 Days (Cognitive Workshop)",
    fee: "₹16,000 / $219",
    mode: "Online Interactive Live Stream",
    intensity: "Cognitive / Transforming",
    description: "Combine modern NLP linguistic anchors with Vedic Vak science to dismantle self-limiting subconscious loops, dissolve cognitive fear, and speak with authentic presence.",
    aboutText: "Our words and internal monologue shape our neural pathways and emotional reactions. NLP Rewire integrates modern cognitive linguistics with ancient Vedic Vak Shakti principles to deconstruct negative self-talk, rewrite subconscious scripts, and instill unwavering inner confidence.",
    forWhom: "Speakers, Coaches, Executives, Individuals overcoming self-doubt, and anyone seeking subconscious mental clarity.",
    category: "cognitive",
    categoryLabel: "Cognitive Rewiring",
    target: "Personal Growth Seekers, Speakers & High-Acuity Thinkers",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600",
    icon: Brain,
    subPageId: "nlp",
    highlights: [
      "Identifying & deconstructing subconscious limiting inner speech",
      "Establishing mudra physiological anchors for instant calmness",
      "Vedic Vak speech resonance for clear, confident communication",
      "Neural re-patterning to convert anxiety into constructive action"
    ],
    syllabus: [
      {
        moduleNumber: "i",
        title: "Subconscious Auditing & Language Patterns",
        items: [
          "Mapping internal linguistic loops & automatic reactions",
          "Identifying hidden limiting beliefs and cognitive traps",
          "Deconstructing fear-based internal monologues"
        ]
      },
      {
        moduleNumber: "ii",
        title: "Physiological Anchoring & Mudra Science",
        items: [
          "Creating instant calm anchors using somatic triggers",
          "Mudra integration for rapid emotional stabilization",
          "Converting nervous energy into focused enthusiasm"
        ]
      },
      {
        moduleNumber: "iii",
        title: "Vak Shakti & Authentic Projection",
        items: [
          "Speaking from diaphragm & heart center",
          "Aligning spoken words with inner truth & conviction",
          "Mastering clear, persuasive communication"
        ]
      }
    ],
    benefits: [
      "Permanent rewriting of self-sabotaging inner scripts",
      "Ability to trigger state-of-calm within seconds using physical anchors",
      "Enhanced public speaking confidence and authentic voice resonance",
      "Freedom from fear of failure or judgment in social and professional settings"
    ],
    days: [
      {
        dayNum: 1,
        title: "Mapping Subconscious Anchors",
        duration: "15 mins",
        sanskrit: "संस्कार परीक्षा (Sanskara Pariksha)",
        focus: "Identifying limiting verbal loops and neural triggers",
        description: "Uncover the silent linguistic codes that dictate emotional states and dissolve core automatic reactions.",
        guideline: "Identify one phrase you say when stressed. Observe its heavy vibration and release it into silence.",
        mantra: "Om Vak Devyai Namah (Honor the divine power of speech)"
      },
      {
        dayNum: 2,
        title: "Neurological Re-Patterning",
        duration: "15 mins",
        sanskrit: "मनो लय (Mano Laya)",
        focus: "Superimposing empowering neural triggers",
        description: "Superimpose Vedic truth patterns over old self-limiting tracks to form a strong physiological anchor.",
        guideline: "Touch thumb and ring finger together while inhaling. Associate this mudra with unshakeable composure.",
        mantra: "Aham Brahmasmi (I am unlimited reality)"
      },
      {
        dayNum: 3,
        title: "Empowering the Sovereign Voice",
        duration: "15 mins",
        sanskrit: "वाक् शक्ति (Vak Shakti)",
        focus: "Projecting speech from deep heart presence",
        description: "Align your speech with truth. Learn to speak with calm conviction that transmits immediate clarity.",
        guideline: "Speak slowly from the navel diaphragm. Let every word be seasoned with silence and clear intent.",
        mantra: "Om Shanti (I speak from absolute peace)"
      }
    ]
  },
  {
    id: "mental-wellness-assistant",
    title: "Mental Wellness Assistant Program",
    tagline: "Empathetic Support, Emotional First-Aid & Community Care",
    sanskrit: "मनो स्वास्थ्य सहायता (Manas Swasthya Sahayata)",
    duration: "5 Days (Certification Pathway)",
    fee: "₹21,000 / $279",
    mode: "Online Live Certification & Practicum",
    intensity: "Reflective & Empathetic",
    description: "A practitioner certification pathway empowering wellness champions and mental health advocates with Vedic non-judgmental counseling, emotional first-aid, and compassionate listening.",
    aboutText: "In a world facing unprecedented anxiety and mental noise, trained empathetic listeners and wellness champions are vital. This program equips participants with non-judgmental witnessing techniques, emotional first-aid tools, and compassionate crisis support grounded in ancient wisdom.",
    forWhom: "Wellness Champions, HR Advocates, Mental Health Volunteers, Caregivers, and Empathetic Individuals.",
    category: "wellness",
    categoryLabel: "Mental Health & Counseling",
    target: "Wellness Champions, HR Advocates & Mental Health Helpers",
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=600",
    icon: Heart,
    subPageId: "mental-wellness",
    highlights: [
      "Non-judgmental active listening & emotional first-aid protocols",
      "De-escalating acute panic and cognitive overwhelm",
      "Subconscious samskara emotional release techniques",
      "Maintaining healthy energetic boundaries while holding safe space"
    ],
    syllabus: [
      {
        moduleNumber: "i",
        title: "Sakshi Bhava & Non-Judgmental Listening",
        items: [
          "Holding clean, compassionate space without personal bias",
          "Active listening techniques for emotional validation",
          "Understanding the psychology of emotional suffering"
        ]
      },
      {
        moduleNumber: "ii",
        title: "Emotional First-Aid & Panic De-Escalation",
        items: [
          "Guiding grounding breathwork during acute anxiety",
          "Somatic touch and vocal cadence for calming others",
          "Recognizing warning signs and knowing when to escalate"
        ]
      },
      {
        moduleNumber: "iii",
        title: "Samskara Release & Boundary Protection",
        items: [
          "Helping individuals process suppressed emotional blocks",
          "Establishing energetic shields to avoid personal exhaustion",
          "Ethical framework & community wellness leadership"
        ]
      }
    ],
    benefits: [
      "Practitioner certification as a Remote Walks Mental Wellness Assistant",
      "Mastery over emotional first-aid protocols for family, friends, and colleagues",
      "Deep capacity for compassionate, non-judgmental active listening",
      "Strong personal boundaries that prevent caregiver burnout"
    ],
    days: [
      {
        dayNum: 1,
        title: "Principles of Non-Judgmental Witnessing",
        duration: "15 mins",
        sanskrit: "साक्षी भाव (Sakshi Bhava)",
        focus: "Holding clean, compassionate space without projecting biases",
        description: "Learn to listen with complete presence, seeing every individual as inherently whole rather than broken.",
        guideline: "Practice silent listening without interrupting or offering immediate unsolicited solutions.",
        mantra: "Aham Sakshi (I witness with pure compassion)"
      },
      {
        dayNum: 2,
        title: "De-Escalating Panic & Urgency",
        duration: "15 mins",
        sanskrit: "मानस मोचन (Manasa Mochana)",
        focus: "Calming acute cognitive panic with gentle breath anchors",
        description: "Guide individuals through grounding somatic techniques to lower heart rate and restore nervous calm.",
        guideline: "Encourage 4-second inhales and long 6-second exhales while placing a hand over the chest.",
        mantra: "Om Shanti (Restoring peaceful order)"
      },
      {
        dayNum: 3,
        title: "Subconscious Emotional First-Aid",
        duration: "18 mins",
        sanskrit: "संस्कार शोधन (Sanskara Shodhana)",
        focus: "Safely processing suppressed emotional blocks",
        description: "Help individuals acknowledge uncomfortable sensations in the body without fear or self-criticism.",
        guideline: "Inhale welcoming the bodily sensation; exhale releasing the heavy story attached to it.",
        mantra: "Om Hreem Namah (Vibrational emotional release)"
      },
      {
        dayNum: 4,
        title: "Establishing Safe Energetic Boundaries",
        duration: "18 mins",
        sanskrit: "कवच रक्षण (Kavacha Rakshana)",
        focus: "Holding space without absorbing external emotional strain",
        description: "Protect your personal energy field while supporting others, avoiding personal fatigue or burnout.",
        guideline: "Visualize a protective shield of golden light surrounding your aura while offering counsel.",
        mantra: "Aham Rakshitah (I am anchored and protected)"
      },
      {
        dayNum: 5,
        title: "Integrating Daily Mental Wellness Protocols",
        duration: "20 mins",
        sanskrit: "प्रज्ञा स्थिरता (Pragya Sthirata)",
        focus: "Building lasting daily mental wellness habits",
        description: "Establish morning and evening self-care check-ins to maintain emotional balance and resilience.",
        guideline: "Inhale into the third eye, exhaling down into the heart. Rest in clear, wise knowing.",
        mantra: "Satya Swaroopoham (I am pure truth)"
      }
    ]
  }
];

interface ProgramsSectionProps {
  onNavigatePage?: (pageId: string) => void;
}

export default function ProgramsSection({ onNavigatePage }: ProgramsSectionProps) {
  const [selectedProg, setSelectedProg] = useState<Program | null>(null);
  const [activeTabCategory, setActiveTabCategory] = useState<string>("all");

  // Practice player state inside detail view
  const [activeDayIdx, setActiveDayIdx] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [completedDaysMap, setCompletedDaysMap] = useState<{ [progId: string]: number[] }>({});
  
  // Join Program Form Modal
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [joinForm, setJoinForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [joinSuccess, setJoinSuccess] = useState(false);

  const filteredList = activeTabCategory === "all"
    ? FIVE_PROGRAMS
    : FIVE_PROGRAMS.filter(p => p.category === activeTabCategory);

  const openProgramDetail = (prog: Program) => {
    setSelectedProg(prog);
    setActiveDayIdx(0);
    setIsPlayingAudio(false);
    setShowJoinModal(false);
    setJoinSuccess(false);
  };

  const closeProgramDetail = () => {
    setSelectedProg(null);
    setIsPlayingAudio(false);
    setShowJoinModal(false);
  };

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

  const markDayAsDone = (progId: string, dayNum: number) => {
    const existing = completedDaysMap[progId] || [];
    if (!existing.includes(dayNum)) {
      const updated = [...existing, dayNum];
      setCompletedDaysMap({ ...completedDaysMap, [progId]: updated });
      if (selectedProg && activeDayIdx < selectedProg.days.length - 1) {
        setTimeout(() => {
          setActiveDayIdx(prev => prev + 1);
          setIsPlayingAudio(false);
        }, 600);
      }
    }
  };

  return (
    <div id="programs-page-module" className="space-y-12">
      
      {/* 1. Page Header */}
      <div className="bg-gradient-to-br from-sage-900 via-sage-950 to-sage-900 text-gold-100 rounded-3xl p-8 md:p-12 relative overflow-hidden border border-sage-800 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-sage-800/80 border border-gold-400/30 px-3.5 py-1.5 rounded-full text-gold-300 text-xs font-mono tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
            <span>Remote Walks • Holistic Curriculums</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-tight text-white leading-tight">
            Sacred & Executive Wellness Programs
          </h2>
          <p className="text-sage-300 text-sm md:text-base leading-relaxed font-sans max-w-2xl">
            Explore our 5 core pathways crafted with soft earthy elegance. Each program provides a comprehensive syllabus addressing root causes, self-discovery, and sustainable transformation.
          </p>

          {/* Category Filter Bar */}
          <div className="pt-4 flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All 5 Programs" },
              { id: "foundational", label: "Foundational" },
              { id: "corporate", label: "Corporate Unburn" },
              { id: "somatic", label: "Spinelign" },
              { id: "cognitive", label: "NLP Rewire" },
              { id: "wellness", label: "Mental Wellness" }
            ].map((cat) => (
              <motion.button
                key={cat.id}
                id={`filter-prog-${cat.id}`}
                onClick={() => setActiveTabCategory(cat.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  activeTabCategory === cat.id
                    ? "bg-gold-500 text-sage-950 font-bold shadow-md"
                    : "bg-sage-800/60 text-sage-300 hover:bg-sage-800 hover:text-white border border-sage-700/50"
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Responsive Grid of 5 Program Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredList.map((prog) => {
          const IconComp = prog.icon;
          const completedCount = (completedDaysMap[prog.id] || []).length;
          const progressPercent = Math.round((completedCount / prog.days.length) * 100);

          return (
            <motion.div
              key={prog.id}
              id={`program-card-${prog.id}`}
              whileHover={{ y: -6 }}
              className="bg-white rounded-3xl overflow-hidden border border-sage-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group card-micro relative"
            >
              {/* Card Image Banner */}
              <div className="relative h-52 overflow-hidden bg-sage-100">
                <img
                  src={prog.image}
                  alt={prog.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sage-950/80 via-sage-950/30 to-transparent" />
                
                {/* Duration Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono font-bold text-sage-900 uppercase tracking-widest shadow-xs">
                  {prog.duration}
                </div>

                {/* Category Label */}
                <div className="absolute top-4 right-4 bg-sage-900/90 text-gold-300 border border-gold-400/30 text-[9px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
                  {prog.categoryLabel}
                </div>

                {/* Heading & Tagline Overlay */}
                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-gold-500/20 text-gold-300 backdrop-blur-xs">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className="text-gold-300 text-[10px] font-mono font-medium truncate block">
                      {prog.sanskrit}
                    </span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-white leading-tight">
                    {prog.title}
                  </h3>
                </div>
              </div>

              {/* Card Body Content */}
              <div className="p-6 space-y-5 flex-1 flex flex-col justify-between bg-white">
                <div className="space-y-3">
                  
                  {/* Short Tagline */}
                  <div className="bg-sage-50/80 border border-sage-100 p-2.5 rounded-xl">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-gold-700 font-bold block mb-0.5">Tagline</span>
                    <p className="text-xs font-serif italic font-medium text-sage-800 leading-snug">
                      "{prog.tagline}"
                    </p>
                  </div>

                  {/* Brief 1-2 Line Description */}
                  <p className="text-xs text-sage-600 leading-relaxed font-sans line-clamp-3">
                    {prog.description}
                  </p>

                  {/* Target Audience */}
                  <div className="flex items-center gap-2 text-[10px] text-sage-500 font-mono pt-1">
                    <User className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                    <span className="truncate">Target: <strong className="text-sage-700">{prog.target}</strong></span>
                  </div>
                </div>

                {/* Progress bar if started */}
                {completedCount > 0 && (
                  <div className="space-y-1.5 bg-sage-50 p-2.5 rounded-xl border border-sage-100">
                    <div className="flex items-center justify-between text-[10px] font-mono text-sage-600">
                      <span>Progress: {completedCount}/{prog.days.length} Days</span>
                      <span>{progressPercent}% Complete</span>
                    </div>
                    <div className="w-full h-1.5 bg-white rounded-full overflow-hidden border border-sage-200">
                      <div className="h-full bg-gold-600 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                    </div>
                  </div>
                )}

                {/* Card Footer & "Learn More" Button */}
                <div className="flex items-center justify-between pt-4 border-t border-sage-100">
                  <div className="flex items-center gap-1.5 text-sage-500 text-[10px] font-mono">
                    <Flame className="w-3.5 h-3.5 text-gold-600" />
                    <span>{prog.intensity}</span>
                  </div>

                  <motion.button
                    id={`learn-more-btn-${prog.id}`}
                    onClick={() => openProgramDetail(prog)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="px-5 py-2.5 rounded-full bg-sage-900 hover:bg-sage-950 text-gold-100 font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-2 shadow-sm btn-shimmer"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gold-400 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 3. Individual Program Detail Page Template Modal View */}
      <AnimatePresence>
        {selectedProg && (
          <div className="fixed inset-0 bg-sage-950/75 backdrop-blur-md z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-sage-200 shadow-2xl relative p-6 md:p-10 space-y-10"
            >
              {/* Close Modal Button */}
              <button
                id="close-program-modal-btn"
                onClick={closeProgramDetail}
                className="absolute top-6 right-6 p-2.5 rounded-full bg-sage-100 hover:bg-sage-200 text-sage-800 transition-colors cursor-pointer z-20 shadow-xs"
                aria-label="Close program detail view"
              >
                <X className="w-5 h-5" />
              </button>

              {/* ==================== 1. HERO SECTION ==================== */}
              <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-sage-900 via-sage-950 to-sage-900 text-white p-6 md:p-10 shadow-lg border border-sage-800 space-y-4">
                <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <div className="flex flex-wrap items-center gap-3 relative z-10">
                  <span className="bg-gold-500/20 text-gold-300 border border-gold-400/30 text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full font-bold">
                    {selectedProg.categoryLabel}
                  </span>
                  <span className="text-xs font-serif italic text-sage-300">
                    {selectedProg.sanskrit}
                  </span>
                </div>

                <h1 className="text-3xl md:text-5xl font-serif font-bold text-white leading-tight relative z-10">
                  {selectedProg.title}
                </h1>

                <p className="text-gold-200 text-base md:text-lg font-serif italic leading-snug max-w-2xl relative z-10">
                  "{selectedProg.tagline}"
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-sage-300 relative z-10">
                  <div className="flex items-center gap-1.5 bg-sage-800/80 px-3 py-1.5 rounded-lg border border-sage-700/60">
                    <Calendar className="w-4 h-4 text-gold-400" />
                    <span>Duration: {selectedProg.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-sage-800/80 px-3 py-1.5 rounded-lg border border-sage-700/60">
                    <Monitor className="w-4 h-4 text-gold-400" />
                    <span>Mode: {selectedProg.mode}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-sage-800/80 px-3 py-1.5 rounded-lg border border-sage-700/60">
                    <Flame className="w-4 h-4 text-gold-400" />
                    <span>Intensity: {selectedProg.intensity}</span>
                  </div>
                </div>
              </div>

              {/* ==================== 2. ABOUT THIS PROGRAM ==================== */}
              <div className="space-y-4 bg-sage-50/60 p-6 md:p-8 rounded-2xl border border-sage-200/80">
                <div className="flex items-center gap-2 text-gold-700 font-mono text-xs uppercase tracking-widest font-bold">
                  <FileText className="w-4 h-4" />
                  <span>Program Overview</span>
                </div>
                
                <h2 className="text-2xl font-serif font-bold text-sage-900">
                  About this Program
                </h2>

                <p className="text-sage-700 text-sm leading-relaxed font-sans">
                  {selectedProg.aboutText}
                </p>

                {/* Subheading "For Whom" */}
                <div className="pt-4 border-t border-sage-200/70 space-y-2">
                  <h3 className="text-sm font-mono uppercase tracking-wider text-sage-900 font-bold flex items-center gap-2">
                    <Users className="w-4 h-4 text-gold-600" />
                    <span>For Whom is this Program Intended?</span>
                  </h3>
                  <p className="text-xs md:text-sm text-sage-800 font-medium leading-relaxed bg-white p-4 rounded-xl border border-sage-200/80">
                    {selectedProg.forWhom}
                  </p>
                </div>
              </div>

              {/* ==================== 3. SYLLABUS / PROGRAM CONTENTS ==================== */}
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-gold-700 uppercase tracking-widest font-bold block">
                    Curriculum Framework
                  </span>
                  <h2 className="text-2xl font-serif font-bold text-sage-900">
                    Syllabus / Program Contents
                  </h2>
                </div>

                <div className="space-y-4">
                  {selectedProg.syllabus.map((mod, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-6 rounded-2xl border border-sage-200/90 shadow-xs space-y-3 transition-all hover:border-sage-300"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-full bg-sage-900 text-gold-300 font-mono font-bold text-sm flex items-center justify-center shrink-0">
                          {mod.moduleNumber}
                        </span>
                        <h3 className="text-lg font-serif font-bold text-sage-900">
                          {mod.title}
                        </h3>
                      </div>

                      <ul className="pl-11 space-y-2">
                        {mod.items.map((sub, sIdx) => (
                          <li key={sIdx} className="text-xs md:text-sm text-sage-700 flex items-start gap-2.5 leading-relaxed">
                            <span className="w-1.5 h-1.5 rounded-full bg-gold-600 mt-2 shrink-0" />
                            <span>{sub}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* ==================== 4. BENEFITS ==================== */}
              <div className="bg-gradient-to-br from-[#f8f9f6] to-[#f2f5f1] p-6 md:p-8 rounded-2xl border border-sage-200 space-y-4">
                <div className="flex items-center gap-2 text-gold-700 font-mono text-xs uppercase tracking-widest font-bold">
                  <Award className="w-4 h-4 text-gold-600" />
                  <span>Transformational Outcomes</span>
                </div>

                <h2 className="text-2xl font-serif font-bold text-sage-900">
                  Benefits of this Program
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {selectedProg.benefits.map((b, bIdx) => (
                    <div
                      key={bIdx}
                      className="bg-white p-4 rounded-xl border border-sage-200/80 flex items-start gap-3 shadow-2xs"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs md:text-sm text-sage-800 font-medium leading-relaxed">
                        {b}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ==================== 5. FEE, DURATION & MODE ==================== */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-widest text-sage-600 font-bold">
                  Program Investment Details
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Fee Box */}
                  <div className="bg-sage-900 text-white p-5 rounded-2xl border border-sage-800 space-y-1.5 shadow-sm text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 text-gold-400 text-xs font-mono uppercase tracking-wider">
                      <DollarSign className="w-4 h-4" />
                      <span>Program Fee</span>
                    </div>
                    <div className="text-2xl font-serif font-bold text-white">
                      {selectedProg.fee}
                    </div>
                    <p className="text-[11px] text-sage-300 font-sans">
                      All-inclusive sanctuary tuition & lifetime material access.
                    </p>
                  </div>

                  {/* Duration Box */}
                  <div className="bg-sage-50 p-5 rounded-2xl border border-sage-200 space-y-1.5 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 text-sage-700 text-xs font-mono uppercase tracking-wider font-bold">
                      <Calendar className="w-4 h-4 text-gold-600" />
                      <span>Duration</span>
                    </div>
                    <div className="text-xl font-serif font-bold text-sage-900">
                      {selectedProg.duration}
                    </div>
                    <p className="text-[11px] text-sage-600 font-sans">
                      Daily 15-20 min modules with flexible daily practice schedule.
                    </p>
                  </div>

                  {/* Mode Box */}
                  <div className="bg-sage-50 p-5 rounded-2xl border border-sage-200 space-y-1.5 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 text-sage-700 text-xs font-mono uppercase tracking-wider font-bold">
                      <Monitor className="w-4 h-4 text-gold-600" />
                      <span>Delivery Mode</span>
                    </div>
                    <div className="text-lg font-serif font-bold text-sage-900">
                      {selectedProg.mode}
                    </div>
                    <p className="text-[11px] text-sage-600 font-sans">
                      Accessible from mobile or desktop anytime with live Q&A.
                    </p>
                  </div>

                </div>
              </div>

              {/* ==================== 6. STRONG "JOIN THIS PROGRAM" CTA BUTTON ==================== */}
              <div className="pt-4 border-t border-sage-200 flex flex-col items-center justify-center space-y-4 text-center">
                <div className="max-w-md space-y-1">
                  <h3 className="text-xl font-serif font-bold text-sage-900">
                    Ready to Begin Your Transformation?
                  </h3>
                  <p className="text-xs text-sage-600">
                    Join participants worldwide in unmasking inner conflicts and establishing unbroken clarity.
                  </p>
                </div>

                <motion.button
                  id={`join-program-cta-btn-${selectedProg.id}`}
                  onClick={() => setShowJoinModal(true)}
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(92,111,89,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 rounded-full bg-sage-900 hover:bg-sage-950 text-gold-100 font-bold text-sm tracking-wider uppercase transition-colors cursor-pointer flex items-center gap-3 shadow-lg btn-shimmer"
                >
                  <Sparkles className="w-4 h-4 text-gold-400 animate-pulse" />
                  <span>Join this Program</span>
                  <ArrowRight className="w-4 h-4 text-gold-400" />
                </motion.button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Join Program Registration Modal */}
      <AnimatePresence>
        {showJoinModal && selectedProg && (
          <div className="fixed inset-0 bg-sage-950/80 backdrop-blur-md z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 border border-sage-200 shadow-2xl relative space-y-6"
            >
              <button
                id="close-join-modal-btn"
                onClick={() => setShowJoinModal(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-sage-100 hover:bg-sage-200 text-sage-800 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-2 text-center">
                <span className="text-[10px] font-mono text-gold-700 uppercase tracking-widest font-bold">
                  Enrollment Request
                </span>
                <h3 className="text-2xl font-serif font-bold text-sage-900">
                  Join "{selectedProg.title}"
                </h3>
                <p className="text-xs text-sage-600">
                  Investment: <strong>{selectedProg.fee}</strong> • Mode: {selectedProg.mode}
                </p>
              </div>

              {joinSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-3">
                  <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-lg font-serif font-bold text-emerald-900">
                    Welcome to the Sanctuary!
                  </h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Thank you, {joinForm.name}. Your enrollment request for <strong>{selectedProg.title}</strong> has been received. Our team will send your access code to <strong>{joinForm.email}</strong> shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleJoinSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-sage-800">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maya Lin"
                      value={joinForm.name}
                      onChange={(e) => setJoinForm({ ...joinForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-sage-200 text-xs text-sage-900 focus:outline-none focus:border-sage-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-sage-800">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. maya@example.com"
                      value={joinForm.email}
                      onChange={(e) => setJoinForm({ ...joinForm, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-sage-200 text-xs text-sage-900 focus:outline-none focus:border-sage-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-sage-800">Phone Number (Optional)</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={joinForm.phone}
                      onChange={(e) => setJoinForm({ ...joinForm, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-sage-200 text-xs text-sage-900 focus:outline-none focus:border-sage-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-sage-800">Personal Goals / Notes</label>
                    <textarea
                      rows={2}
                      placeholder="Share any specific inner conflicts, stress factors, or health goals..."
                      value={joinForm.notes}
                      onChange={(e) => setJoinForm({ ...joinForm, notes: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-sage-200 text-xs text-sage-900 focus:outline-none focus:border-sage-600"
                    />
                  </div>

                  <motion.button
                    id="submit-join-form-btn"
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 rounded-xl bg-sage-900 hover:bg-sage-950 text-gold-100 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer btn-shimmer"
                  >
                    Confirm & Proceed to Sanctuary Access
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
