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
    duration: "To be announced",
    fee: "To be announced",
    mode: "Online / Offline",
    intensity: "Gentle & Deeply Integrative",
    aboutText: "An integrative foundational program delving into Basic Psychology, False Ego, Inner Conflicts, and Over Commitments affecting Health + Productivity + Focus. Unmask the root drivers of mental friction, eliminate energy drains, and align your inner instruments for lasting self-mastery.",
    forWhom: "Designed for professionals, seekers, and individuals struggling with Basic Psychology traps, False Ego mechanisms, Inner Conflicts, and Over Commitments affecting physical Health, daily Productivity, and mental Focus.",
    category: "foundational",
    categoryLabel: "Foundational Journey",
    target: "Seekers, Over-Committed Leaders & Focus Seekers",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600",
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
    ]
  },
  {
    id: "corporate-unburn",
    subPageId: "corporate-unburn",
    title: "Corporate Unburn",
    shortTitle: "Corporate Unburn",
    tagline: "Unthread Stress • Rethread Life",
    sanskrit: "ऊर्जा पुनरुत्थान (Urja Punarutthana)",
    duration: "To be announced",
    fee: "To be announced",
    mode: "Online / In-person / Hybrid",
    intensity: "Calming & Deep Executive Unwind",
    aboutText: "An integrative executive program designed to unthread deep-rooted corporate stress patterns and rethread a balanced, productive, and conscious way of living and working.",
    forWhom: "This program is designed for corporate professionals, leaders, and teams who are experiencing high stress, burnout, over-commitment, and loss of focus due to modern work pressures. It helps unthread deep-rooted stress patterns and rethread a balanced, productive, and conscious way of living and working.",
    category: "corporate",
    categoryLabel: "Executive & Workplace",
    target: "Corporate Professionals, Leaders & Teams",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=600",
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
    ]
  },
  {
    id: "spinelign",
    subPageId: "spinelign",
    title: "Spinelign",
    shortTitle: "Spinelign",
    tagline: "Postural Integrity & Spinal Energy Flow",
    sanskrit: "मेरुदण्ड संरेखण (Merudanda Alignment)",
    duration: "To be announced",
    fee: "To be announced",
    mode: "Online / In-person",
    intensity: "Physical & Energetic Alignment",
    aboutText: "Spinelign is for individuals seeking physical alignment, energetic balance, and deeper body awareness. It is ideal for those dealing with postural issues, energy blockages, or anyone wanting to align the spine as a pathway to mental and spiritual clarity.",
    forWhom: "Spinelign is for individuals seeking physical alignment, energetic balance, and deeper body awareness. It is ideal for those dealing with postural issues, energy blockages, or anyone wanting to align the spine as a pathway to mental and spiritual clarity.",
    category: "somatic",
    categoryLabel: "Somatic Spine Health",
    target: "Individuals seeking physical alignment, energetic balance & body awareness",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600",
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
    ]
  },
  {
    id: "nlp",
    subPageId: "nlp",
    title: "NLP Rewire",
    shortTitle: "NLP Rewire",
    tagline: "Rewire Subconscious Patterns & Sacred Speech",
    sanskrit: "वाक्-मनो विज्ञान (Vak-Mano Vijnana)",
    duration: "To be announced",
    fee: "To be announced",
    mode: "Online / Live sessions",
    intensity: "Cognitive & Neurological Rewiring",
    aboutText: "An integrative cognitive rewiring program for anyone who wants to rewire limiting beliefs, emotional patterns, and unconscious behaviours. Ideal for those seeking personal transformation, better communication, emotional mastery, and lasting change at the neurological level.",
    forWhom: "This program is for anyone who wants to rewire limiting beliefs, emotional patterns, and unconscious behaviours. Ideal for those seeking personal transformation, better communication, emotional mastery, and lasting change at the neurological level.",
    category: "cognitive",
    categoryLabel: "Cognitive Rewiring",
    target: "Anyone seeking personal transformation, communication & emotional mastery",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600",
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
    ]
  },
  {
    id: "mental-wellness",
    subPageId: "mental-wellness",
    title: "Mental Wellness Assistant Program",
    shortTitle: "Mental Wellness Assistant Program",
    tagline: "Empathetic Support, Emotional First-Aid & Community Care",
    sanskrit: "मनो स्वास्थ्य सहायता (Manas Swasthya Sahayata)",
    duration: "To be announced",
    fee: "To be announced",
    mode: "Online / Guided support",
    intensity: "Reflective & Empathetic",
    aboutText: "An ongoing structured program designed for individuals seeking support for mental and emotional well-being, dealing with anxiety, overthinking, and emotional imbalance to establish inner stability and mental clarity.",
    forWhom: "This program is designed for individuals seeking ongoing support for mental and emotional well-being. Suitable for those dealing with anxiety, overthinking, emotional imbalance, or anyone who wants a structured path toward inner stability and mental clarity.",
    category: "wellness",
    categoryLabel: "Mental Health & Counseling",
    target: "Individuals seeking ongoing mental well-being, inner stability & clarity",
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=600",
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
    ]
  }
];
