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
    duration: "To be announced",
    fee: "To be announced",
    mode: "Online / Offline",
    intensity: "Gentle & Deeply Integrative",
    description: "An integrative program addressing Basic Psychology, False Ego, Inner Conflicts, and Over Commitments affecting Health + Productivity + Focus.",
    aboutText: "An integrative foundational program delving into Basic Psychology, False Ego, Inner Conflicts, and Over Commitments affecting Health + Productivity + Focus. Unmask the root drivers of mental friction, eliminate energy drains, and align your inner instruments for lasting self-mastery.",
    forWhom: "Designed for professionals, seekers, and individuals struggling with Basic Psychology traps, False Ego mechanisms, Inner Conflicts, and Over Commitments affecting physical Health, daily Productivity, and mental Focus.",
    category: "foundational",
    categoryLabel: "Foundational Journey",
    target: "Seekers, Over-Committed Leaders & Focus Seekers",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600",
    icon: Compass,
    highlights: [
      "Basic Psychology, False Ego & Inner Conflict Resolution",
      "Over Commitments affecting Health + Productivity + Focus",
      "Understanding & Discovering Root Causes of Human Issues",
      "Discovering Realities of Human Life (Three Gunas & Antahkaran)",
      "Cleaning, Balancing, Harmonising & Sustainability Tips / Practices"
    ],
    syllabus: [
      {
        moduleNumber: "i",
        title: "Understanding Discovering Root Causes of Human Issues",
        items: [
          "the traps",
          "the illusions",
          "invisible patterns",
          "inner conflicts",
          "false ego"
        ]
      },
      {
        moduleNumber: "ii",
        title: "Discovering Realities of Human Life",
        items: [
          "basic concepts",
          "Discovering Self",
          "Three Gunas",
          "Antahkaran"
        ]
      },
      {
        moduleNumber: "iii",
        title: "Cleaning, Balancing, Harmonising",
        items: [
          "Basis and Emotional cleaning",
          "Karma and Dharma",
          "Spiritual Aspects of Existence"
        ]
      },
      {
        moduleNumber: "iv",
        title: "Sustainability Tips / Practices",
        items: [
          "Daily micro-routines to prevent burnout and sustain energy",
          "Anchoring focus and clarity amidst personal and professional demands",
          "Long-term integration of emotional cleaning and non-dual balance"
        ]
      }
    ],
    benefits: [
      "Deep understanding of Basic Psychology, False Ego mechanisms, and root causes of friction",
      "Resolution of Inner Conflicts and elimination of Over Commitments affecting Health + Productivity + Focus",
      "Restoration of natural physical vitality, daily productivity, and crystal-clear mental focus",
      "Mastery over basic concepts, Discovering Self, Three Gunas, and Antahkaran (fourfold mind)",
      "Experiencing Basis and Emotional cleaning, Karma and Dharma alignment, and Spiritual Aspects of Existence",
      "Practical Sustainability Tips / Practices to maintain emotional balance and peace in daily life"
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
    title: "Corporate Unburn",
    tagline: "Unthread Stress • Rethread Life",
    sanskrit: "ऊर्जा पुनरुत्थान (Urja Punarutthana)",
    duration: "To be announced",
    fee: "To be announced",
    mode: "Online / In-person / Hybrid",
    intensity: "Calming & Deep Executive Unwind",
    description: "An integrative program designed for corporate professionals, leaders, and teams to unthread deep-rooted stress patterns and rethread a balanced, productive, and conscious way of living and working.",
    aboutText: "An integrative executive program designed to unthread deep-rooted corporate stress patterns and rethread a balanced, productive, and conscious way of living and working.",
    forWhom: "This program is designed for corporate professionals, leaders, and teams who are experiencing high stress, burnout, over-commitment, and loss of focus due to modern work pressures. It helps unthread deep-rooted stress patterns and rethread a balanced, productive, and conscious way of living and working.",
    category: "corporate",
    categoryLabel: "Executive & Workplace",
    target: "Corporate Professionals, Leaders & Teams",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=600",
    icon: Flame,
    subPageId: "corporate-unburn",
    highlights: [
      "Understanding root causes of corporate stress & burnout",
      "Unmasking over-commitment & false productivity patterns",
      "Resolving inner conflicts & false ego in professional life",
      "Tools for emotional cleaning & mental clarity",
      "Restoring balance between work, health, and inner peace",
      "Building sustainable high-performance without burnout"
    ],
    syllabus: [
      {
        moduleNumber: "i",
        title: "Root Causes of Stress & Burnout",
        items: [
          "Understanding the root causes of corporate stress and burnout",
          "Identifying invisible patterns of over-commitment and false productivity"
        ]
      },
      {
        moduleNumber: "ii",
        title: "Inner Conflicts & Ego Mechanics",
        items: [
          "Inner conflicts and the false ego in professional life",
          "Tools for emotional cleaning and mental clarity"
        ]
      },
      {
        moduleNumber: "iii",
        title: "Restoring Balance & Sustainable High-Performance",
        items: [
          "Practical methods to restore balance between work, health, and inner peace",
          "Building sustainable high-performance without burnout"
        ]
      }
    ],
    benefits: [
      "Reduced stress and mental fatigue",
      "Improved focus, clarity, and decision-making",
      "Better emotional regulation under pressure",
      "Higher productivity with less exhaustion",
      "Stronger work-life harmony",
      "Long-term resilience against burnout"
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
    duration: "To be announced",
    fee: "To be announced",
    mode: "Online / In-person",
    intensity: "Physical & Energetic Alignment",
    description: "Physical alignment, energetic balance, and deeper body awareness through spinal practices for mental and spiritual clarity.",
    aboutText: "Spinelign is for individuals seeking physical alignment, energetic balance, and deeper body awareness. It is ideal for those dealing with postural issues, energy blockages, or anyone wanting to align the spine as a pathway to mental and spiritual clarity.",
    forWhom: "Spinelign is for individuals seeking physical alignment, energetic balance, and deeper body awareness. It is ideal for those dealing with postural issues, energy blockages, or anyone wanting to align the spine as a pathway to mental and spiritual clarity.",
    category: "somatic",
    categoryLabel: "Somatic Spine Health",
    target: "Individuals seeking physical alignment, energetic balance & body awareness",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600",
    icon: Activity,
    subPageId: "spinelign",
    highlights: [
      "Understanding the spine as the central axis of body and consciousness",
      "Postural awareness and alignment practices",
      "Breath and movement integration for spinal health",
      "Releasing energetic blockages along the spine",
      "Practices for grounding, centering, and vertical alignment",
      "Connecting physical alignment with mental clarity and emotional balance"
    ],
    syllabus: [
      {
        moduleNumber: "i",
        title: "Spine as the Central Axis & Postural Awareness",
        items: [
          "Understanding the spine as the central axis of body and consciousness",
          "Postural awareness and alignment practices"
        ]
      },
      {
        moduleNumber: "ii",
        title: "Breath, Movement & Releasing Blockages",
        items: [
          "Breath and movement integration for spinal health",
          "Releasing energetic blockages along the spine"
        ]
      },
      {
        moduleNumber: "iii",
        title: "Grounding, Vertical Alignment & Clarity",
        items: [
          "Practices for grounding, centering, and vertical alignment",
          "Connecting physical alignment with mental clarity and emotional balance"
        ]
      }
    ],
    benefits: [
      "Improved posture and physical comfort",
      "Increased energy flow and vitality",
      "Greater body awareness and presence",
      "Reduction in physical tension and stiffness",
      "Enhanced mental clarity through physical alignment",
      "Deeper sense of inner stability and balance"
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
    title: "NLP Rewire",
    tagline: "Rewire Subconscious Patterns & Sacred Speech",
    sanskrit: "वाक्-मनो विज्ञान (Vak-Mano Vijnana)",
    duration: "To be announced",
    fee: "To be announced",
    mode: "Online / Live sessions",
    intensity: "Cognitive & Neurological Rewiring",
    description: "Rewire limiting beliefs, emotional patterns, and unconscious behaviours for personal transformation, better communication, and emotional mastery.",
    aboutText: "An integrative cognitive rewiring program for anyone who wants to rewire limiting beliefs, emotional patterns, and unconscious behaviours. Ideal for those seeking personal transformation, better communication, emotional mastery, and lasting change at the neurological level.",
    forWhom: "This program is for anyone who wants to rewire limiting beliefs, emotional patterns, and unconscious behaviours. Ideal for those seeking personal transformation, better communication, emotional mastery, and lasting change at the neurological level.",
    category: "cognitive",
    categoryLabel: "Cognitive Rewiring",
    target: "Anyone seeking personal transformation, communication & emotional mastery",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600",
    icon: Brain,
    subPageId: "nlp",
    highlights: [
      "Foundations of Neuro-Linguistic Programming",
      "Understanding how the mind creates patterns and beliefs",
      "Identifying and interrupting limiting internal dialogue",
      "Techniques to reframe experiences and change emotional responses",
      "Anchoring positive states and resourceful emotions",
      "Practical tools for communication, influence, and self-mastery",
      "Rewiring habits and creating new neurological pathways"
    ],
    syllabus: [
      {
        moduleNumber: "i",
        title: "Foundations & Mind Patterns",
        items: [
          "Foundations of Neuro-Linguistic Programming",
          "Understanding how the mind creates patterns and beliefs",
          "Identifying and interrupting limiting internal dialogue"
        ]
      },
      {
        moduleNumber: "ii",
        title: "Reframing & Anchoring States",
        items: [
          "Techniques to reframe experiences and change emotional responses",
          "Anchoring positive states and resourceful emotions"
        ]
      },
      {
        moduleNumber: "iii",
        title: "Communication & Neurological Rewiring",
        items: [
          "Practical tools for communication, influence, and self-mastery",
          "Rewiring habits and creating new neurological pathways"
        ]
      }
    ],
    benefits: [
      "Freedom from old limiting beliefs and patterns",
      "Greater emotional control and resilience",
      "Improved communication and relationships",
      "Faster personal transformation",
      "Ability to create desired mental and emotional states consciously",
      "Long-term behavioural change at the root level"
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
    duration: "To be announced",
    fee: "To be announced",
    mode: "Online / Guided support",
    intensity: "Reflective & Empathetic",
    description: "Ongoing structured support for mental and emotional well-being, dealing with anxiety, overthinking, and emotional imbalance toward inner stability.",
    aboutText: "An ongoing structured program designed for individuals seeking support for mental and emotional well-being, dealing with anxiety, overthinking, and emotional imbalance to establish inner stability and mental clarity.",
    forWhom: "This program is designed for individuals seeking ongoing support for mental and emotional well-being. Suitable for those dealing with anxiety, overthinking, emotional imbalance, or anyone who wants a structured path toward inner stability and mental clarity.",
    category: "wellness",
    categoryLabel: "Mental Health & Counseling",
    target: "Individuals seeking ongoing mental well-being, inner stability & clarity",
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=600",
    icon: Heart,
    subPageId: "mental-wellness",
    highlights: [
      "Personalized mental wellness guidance",
      "Tools for emotional regulation and stress management",
      "Practices for clearing mental clutter and overthinking",
      "Building emotional resilience and inner strength",
      "Daily and weekly practices for sustained mental balance",
      "Supportive framework for long-term mental well-being"
    ],
    syllabus: [
      {
        moduleNumber: "i",
        title: "Personalized Guidance & Emotional Regulation",
        items: [
          "Personalized mental wellness guidance",
          "Tools for emotional regulation and stress management"
        ]
      },
      {
        moduleNumber: "ii",
        title: "Clutter Clearing & Resilience",
        items: [
          "Practices for clearing mental clutter and overthinking",
          "Building emotional resilience and inner strength"
        ]
      },
      {
        moduleNumber: "iii",
        title: "Sustained Practice & Supportive Framework",
        items: [
          "Daily and weekly practices for sustained mental balance",
          "Supportive framework for long-term mental well-being"
        ]
      }
    ],
    benefits: [
      "Reduced anxiety and mental restlessness",
      "Greater emotional stability and calm",
      "Improved self-awareness and clarity",
      "Better ability to handle daily stressors",
      "Sustainable mental wellness habits",
      "Feeling supported on the journey of inner growth"
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
