export interface SyllabusModule {
  moduleNumber: string;
  title: string;
  items: string[];
}

export interface ProgramData {
  id: string;
  subPageId: string;
  title: string;
  shortTitle: string;
  tagline: string;
  sanskrit: string;
  duration: string;
  fee: string;
  mode: string;
  intensity: string;
  aboutText: string;
  forWhom: string;
  category: "foundational" | "corporate" | "somatic" | "cognitive" | "wellness";
  categoryLabel: string;
  target: string;
  image: string;
  highlights: string[];
  syllabus: SyllabusModule[];
  benefits: string[];
}

export const ALL_PROGRAMS: ProgramData[] = [
  {
    id: "discover-harmonise",
    subPageId: "discover-transform",
    title: "Discover Harmonise Transform",
    shortTitle: "Discover Harmonise Transform",
    tagline: "Awaken Inner Equilibrium, Resolve Conflicts & Harness Conscious Focus",
    sanskrit: "अनुभव समन्वय परिवर्तन (Anubhava Samanvaya Parivartana)",
    duration: "7 Days (Guided Immersion)",
    fee: "₹14,999 / $199",
    mode: "Online Live & Self-Paced Sanctuary",
    intensity: "Gentle & Deeply Integrative",
    aboutText: "Modern life traps us in continuous over-commitments, escalating friction, and subconscious fatigue. This foundational program delves into basic human psychology, unmasking the false ego and resolving inner conflicts. By identifying the root causes of mental noise and over-commitments, you restore natural physical health, sustained productivity, and crystalline focus.",
    forWhom: "Designed for professionals, seekers, leaders, and individuals struggling with over-commitments, mental fatigue, internal friction, false ego traps, and diminished focus.",
    category: "foundational",
    categoryLabel: "Foundational Journey",
    target: "Seekers, Over-Committed Leaders & Focus Seekers",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600",
    highlights: [
      "Unmasking basic psychology & false ego mechanisms",
      "Resolving inner conflicts & over-commitment stress",
      "Restoring physical health, executive focus & productivity",
      "Mastering Three Gunas & Antahkaran self-knowledge"
    ],
    syllabus: [
      {
        moduleNumber: "I",
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
        moduleNumber: "II",
        title: "Discovering Realities of Human Life",
        items: [
          "Basic Concepts of Mind-Body Physiology",
          "Discovering Self beyond societal conditioning",
          "Three Gunas (Sattva - Balance, Rajas - Action/Restlessness, Tamas - Inertia)",
          "Antahkaran (Fourfold Mind: Manas, Buddhi, Chitta, Ahamkara)"
        ]
      },
      {
        moduleNumber: "III",
        title: "Cleaning, Balancing, Harmonising",
        items: [
          "Basis and Emotional Cleaning (Releasing accumulated tension)",
          "Karma and Dharma (Aligning right action with natural duty)",
          "Spiritual Aspects of Existence (Connecting to non-dual stillness)"
        ]
      },
      {
        moduleNumber: "IV",
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
    ]
  },
  {
    id: "corporate-unburn",
    subPageId: "corporate-unburn",
    title: "Corporate Unburn",
    shortTitle: "Corporate Unburn",
    tagline: "Unthread Stress • Rethread Life",
    sanskrit: "ऊर्जा पुनरुत्थान (Urja Punarutthana)",
    duration: "3 Days (Executive Intensive)",
    fee: "₹18,500 / $249",
    mode: "Online Live / Corporate On-Site",
    intensity: "Calming / Vagus Balancing",
    aboutText: "High-pressure executive environments subject leaders to continuous decision fatigue, sympathetic nervous overdrive, and sleep disruption. Corporate Unburn provides a scientifically backed and ancient-inspired framework to unthread chronic stress and rethread life with calm vitality.",
    forWhom: "Corporate Leaders, Business Executives, HR Champions, Team Leads, and High-Performance Professionals.",
    category: "corporate",
    categoryLabel: "Executive & Workplace",
    target: "Corporate Professionals, Executives & HR Leaders",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=600",
    highlights: [
      "Vagus nerve stimulation sequences to reduce sympathetic overdrive",
      "Micro-resets for high-velocity meeting schedules & email fatigue",
      "Cortisol reduction through ancient 4-7-8 ratio humming breathwork",
      "Sustaining clear focus without mental exhaustion"
    ],
    syllabus: [
      {
        moduleNumber: "I",
        title: "Vagus Nerve & Sympathetic Reset",
        items: [
          "Understanding sympathetic overdrive in corporate settings",
          "Vagus nerve activation techniques & HRV optimization",
          "4-7-8 ratio humming breathwork for rapid cortisol reduction"
        ]
      },
      {
        moduleNumber: "II",
        title: "Executive Micro-Resets & Meeting Resilience",
        items: [
          "Implementing 2-minute desk micro-resets between back-to-back calls",
          "Releasing decision fatigue & cognitive clutter",
          "Maintaining postural sovereignty while sitting"
        ]
      },
      {
        moduleNumber: "III",
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
    ]
  },
  {
    id: "spinelign",
    subPageId: "spinelign",
    title: "Spinelign",
    shortTitle: "Spinelign",
    tagline: "Postural Integrity & Spinal Energy Flow",
    sanskrit: "मेरुदण्ड संरेखण (Merudanda Alignment)",
    duration: "3 Days (Somatic Alignment)",
    fee: "₹12,500 / $169",
    mode: "Online Guided & Hybrid Practice",
    intensity: "Structural / Somatic Release",
    aboutText: "Extended desk work and sedentary posture compress the intervertebral disks and restrict the natural energy flow through Sushumna Nadi. Spinelign provides somatic spinal exercises and alignment principles that restore graceful posture and back vitality.",
    forWhom: "Desk Professionals, Remote Workers, Software Engineers, and anyone experiencing lumbar or neck stiffness.",
    category: "somatic",
    categoryLabel: "Somatic Spine Health",
    target: "Desk Professionals, Remote Workers & Spine Strain Seekers",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600",
    highlights: [
      "Decompressing intervertebral disks caused by prolonged sitting",
      "Opening Sushumna Nadi central energy channel for mental clarity",
      "Shoulder girdle decompression & collarbone chest expansion",
      "Lower back pelvic floor grounding anchors"
    ],
    syllabus: [
      {
        moduleNumber: "I",
        title: "Somatic Disk Decompression & Crown Elevation",
        items: [
          "Understanding intervertebral disk pressure in seated posture",
          "Crown elevation micro-movements for spinal lengthening",
          "Releasing cervical spine stiffness and forward head posture"
        ]
      },
      {
        moduleNumber: "II",
        title: "Thoracic Opening & Prana Flow",
        items: [
          "Shoulder girdle opening & collarbone expansion",
          "Freeing restricted diaphragmatic breath from tight ribs",
          "Aligning the heart center with upright posture"
        ]
      },
      {
        moduleNumber: "III",
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
    ]
  },
  {
    id: "nlp",
    subPageId: "nlp",
    title: "NLP (Neuro-Linguistic Programming – Rewire)",
    shortTitle: "NLP (Neuro-Linguistic Programming – Rewire)",
    tagline: "Rewire Subconscious Patterns & Sacred Speech",
    sanskrit: "वाक्-मनो विज्ञान (Vak-Mano Vijnana)",
    duration: "3 Days (Cognitive Workshop)",
    fee: "₹16,000 / $219",
    mode: "Online Interactive Live Stream",
    intensity: "Cognitive / Transforming",
    aboutText: "Our words and internal monologue shape our neural pathways and emotional reactions. NLP Rewire integrates modern cognitive linguistics with ancient Vedic Vak Shakti principles to deconstruct negative self-talk, rewrite subconscious scripts, and instill unwavering inner confidence.",
    forWhom: "Speakers, Coaches, Executives, Individuals overcoming self-doubt, and anyone seeking subconscious mental clarity.",
    category: "cognitive",
    categoryLabel: "Cognitive Rewiring",
    target: "Personal Growth Seekers, Speakers & High-Acuity Thinkers",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600",
    highlights: [
      "Identifying & deconstructing subconscious limiting inner speech",
      "Establishing mudra physiological anchors for instant calmness",
      "Vedic Vak speech resonance for clear, confident communication",
      "Neural re-patterning to convert anxiety into constructive action"
    ],
    syllabus: [
      {
        moduleNumber: "I",
        title: "Subconscious Auditing & Language Patterns",
        items: [
          "Mapping internal linguistic loops & automatic reactions",
          "Identifying hidden limiting beliefs and cognitive traps",
          "Deconstructing fear-based internal monologues"
        ]
      },
      {
        moduleNumber: "II",
        title: "Physiological Anchoring & Mudra Science",
        items: [
          "Creating instant calm anchors using somatic triggers",
          "Mudra integration for rapid emotional stabilization",
          "Converting nervous energy into focused enthusiasm"
        ]
      },
      {
        moduleNumber: "III",
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
    ]
  },
  {
    id: "mental-wellness",
    subPageId: "mental-wellness",
    title: "Mental Wellness Assistant Program",
    shortTitle: "Mental Wellness Assistant Program",
    tagline: "Empathetic Support, Emotional First-Aid & Community Care",
    sanskrit: "मनो स्वास्थ्य सहायता (Manas Swasthya Sahayata)",
    duration: "5 Days (Certification Pathway)",
    fee: "₹21,000 / $279",
    mode: "Online Live Certification & Practicum",
    intensity: "Reflective & Empathetic",
    aboutText: "In a world facing unprecedented anxiety and mental noise, trained empathetic listeners and wellness champions are vital. This program equips participants with non-judgmental witnessing techniques, emotional first-aid tools, and compassionate crisis support grounded in ancient wisdom.",
    forWhom: "Wellness Champions, HR Advocates, Mental Health Volunteers, Caregivers, and Empathetic Individuals.",
    category: "wellness",
    categoryLabel: "Mental Health & Counseling",
    target: "Wellness Champions, HR Advocates & Mental Health Helpers",
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=600",
    highlights: [
      "Non-judgmental active listening & emotional first-aid protocols",
      "De-escalating acute panic and cognitive overwhelm",
      "Subconscious samskara emotional release techniques",
      "Maintaining healthy energetic boundaries while holding safe space"
    ],
    syllabus: [
      {
        moduleNumber: "I",
        title: "Sakshi Bhava & Non-Judgmental Listening",
        items: [
          "Holding clean, compassionate space without personal bias",
          "Active listening techniques for emotional validation",
          "Understanding the psychology of emotional suffering"
        ]
      },
      {
        moduleNumber: "II",
        title: "Emotional First-Aid & Panic De-Escalation",
        items: [
          "Guiding grounding breathwork during acute anxiety",
          "Somatic touch and vocal cadence for calming others",
          "Recognizing warning signs and knowing when to escalate"
        ]
      },
      {
        moduleNumber: "III",
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
    ]
  }
];
