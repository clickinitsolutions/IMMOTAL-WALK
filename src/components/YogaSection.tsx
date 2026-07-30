import React, { useState, useEffect, useRef } from "react";
import { Compass, Check, ChevronRight, Award, Flame, Leaf, Rotate3d, Zap } from "lucide-react";
import { YogaPose } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface Joint3D {
  name: string;
  x: number;
  y: number;
  z: number;
}

const POSE_SKELETONS: { [poseName: string]: Joint3D[] } = {
  "Tadasana (Mountain Pose)": [
    { name: "head", x: 0, y: 1.0, z: 0 },
    { name: "neck", x: 0, y: 0.7, z: 0 },
    { name: "l_shoulder", x: -0.35, y: 0.6, z: 0 },
    { name: "r_shoulder", x: 0.35, y: 0.6, z: 0 },
    { name: "l_elbow", x: -0.4, y: 0.15, z: 0 },
    { name: "r_elbow", x: 0.4, y: 0.15, z: 0 },
    { name: "l_wrist", x: -0.42, y: -0.3, z: 0 },
    { name: "r_wrist", x: 0.42, y: -0.3, z: 0 },
    { name: "spine_mid", x: 0, y: 0.25, z: 0 },
    { name: "spine_base", x: 0, y: -0.1, z: 0 },
    { name: "l_hip", x: -0.18, y: -0.1, z: 0 },
    { name: "r_hip", x: 0.18, y: -0.1, z: 0 },
    { name: "l_knee", x: -0.18, y: -0.5, z: 0 },
    { name: "r_knee", x: 0.18, y: -0.5, z: 0 },
    { name: "l_ankle", x: -0.18, y: -0.9, z: 0 },
    { name: "r_ankle", x: 0.18, y: -0.9, z: 0 }
  ],
  "Vrikshasana (Tree Pose)": [
    { name: "head", x: 0, y: 1.0, z: 0 },
    { name: "neck", x: 0, y: 0.7, z: 0 },
    { name: "l_shoulder", x: -0.35, y: 0.6, z: 0 },
    { name: "r_shoulder", x: 0.35, y: 0.6, z: 0 },
    { name: "l_elbow", x: -0.22, y: 1.1, z: 0.1 },
    { name: "r_elbow", x: 0.22, y: 1.1, z: 0.1 },
    { name: "l_wrist", x: -0.05, y: 1.35, z: 0 },
    { name: "r_wrist", x: 0.05, y: 1.35, z: 0 },
    { name: "spine_mid", x: 0, y: 0.25, z: 0 },
    { name: "spine_base", x: 0, y: -0.1, z: 0 },
    { name: "l_hip", x: -0.18, y: -0.1, z: 0 },
    { name: "r_hip", x: 0.18, y: -0.1, z: 0 },
    { name: "l_knee", x: -0.18, y: -0.5, z: 0 },
    { name: "r_knee", x: 0.45, y: -0.3, z: 0.25 }, // Bent outward
    { name: "l_ankle", x: -0.18, y: -0.9, z: 0 },
    { name: "r_ankle", x: -0.18, y: -0.5, z: 0.05 } // Foot on inner thigh
  ],
  "Virabhadrasana II (Warrior II)": [
    { name: "head", x: 0.0, y: 0.8, z: 0 },
    { name: "neck", x: 0.0, y: 0.5, z: 0 },
    { name: "l_shoulder", x: -0.35, y: 0.45, z: 0.1 },
    { name: "r_shoulder", x: 0.35, y: 0.45, z: -0.1 },
    { name: "l_elbow", x: -0.85, y: 0.45, z: 0.2 },
    { name: "r_elbow", x: 0.85, y: 0.45, z: -0.2 },
    { name: "l_wrist", x: -1.25, y: 0.45, z: 0.25 },
    { name: "r_wrist", x: 1.25, y: 0.45, z: -0.25 },
    { name: "spine_mid", x: 0, y: 0.2, z: 0 },
    { name: "spine_base", x: 0, y: -0.1, z: 0 },
    { name: "l_hip", x: -0.18, y: -0.1, z: 0.1 },
    { name: "r_hip", x: 0.18, y: -0.1, z: -0.1 },
    { name: "l_knee", x: -0.65, y: -0.45, z: 0.3 }, // Bent deep
    { name: "r_knee", x: 0.55, y: -0.45, z: -0.3 }, // Back straight
    { name: "l_ankle", x: -0.65, y: -0.9, z: 0.3 },
    { name: "r_ankle", x: 0.95, y: -0.9, z: -0.4 }
  ],
  "Bakasana (Crow Pose)": [
    { name: "head", x: 0.55, y: -0.2, z: 0 },
    { name: "neck", x: 0.35, y: -0.15, z: 0 },
    { name: "l_shoulder", x: 0.25, y: -0.05, z: 0.35 },
    { name: "r_shoulder", x: 0.25, y: -0.05, z: -0.35 },
    { name: "l_elbow", x: 0.0, y: -0.45, z: 0.4 },
    { name: "r_elbow", x: 0.0, y: -0.45, z: -0.4 },
    { name: "l_wrist", x: 0.0, y: -0.85, z: 0.3 },
    { name: "r_wrist", x: 0.0, y: -0.85, z: -0.3 },
    { name: "spine_mid", x: -0.05, y: 0.1, z: 0 },
    { name: "spine_base", x: -0.35, y: 0.15, z: 0 },
    { name: "l_hip", x: -0.35, y: 0.1, z: 0.2 },
    { name: "r_hip", x: -0.35, y: 0.1, z: -0.2 },
    { name: "l_knee", x: 0.15, y: -0.15, z: 0.35 }, // Supported high on arms
    { name: "r_knee", x: 0.15, y: -0.15, z: -0.35 },
    { name: "l_ankle", x: -0.25, y: -0.35, z: 0.15 }, // Elevated
    { name: "r_ankle", x: -0.25, y: -0.35, z: -0.15 }
  ]
};

const SKELETON_BONES: [string, string][] = [
  ["head", "neck"],
  ["neck", "l_shoulder"],
  ["neck", "r_shoulder"],
  ["l_shoulder", "l_elbow"],
  ["r_shoulder", "r_elbow"],
  ["l_elbow", "l_wrist"],
  ["r_elbow", "r_wrist"],
  ["neck", "spine_mid"],
  ["spine_mid", "spine_base"],
  ["spine_base", "l_hip"],
  ["spine_base", "r_hip"],
  ["l_hip", "l_knee"],
  ["r_hip", "r_knee"],
  ["l_knee", "l_ankle"],
  ["r_knee", "r_ankle"]
];

// 7 Chakras with color coordinates and properties for visualization
interface Chakra {
  name: string;
  sanskrit: string;
  color: string;
  ratio: number; // Position from spine_base (0.0) to head (1.0)
}

const CHAKRAS: Chakra[] = [
  { name: "Sahasrara", sanskrit: "सहस्रार", color: "#d946ef", ratio: 1.0 }, // Crown (head)
  { name: "Ajna", sanskrit: "आज्ञा", color: "#6366f1", ratio: 0.85 },      // Third Eye (between neck and head)
  { name: "Vishuddha", sanskrit: "विशुद्ध", color: "#38bdf8", ratio: 0.7 },  // Throat (neck)
  { name: "Anahata", sanskrit: "अनाहत", color: "#10b981", ratio: 0.45 },    // Heart (mid spine)
  { name: "Manipura", sanskrit: "मणिपूर", color: "#eab308", ratio: 0.3 },    // Solar Plexus
  { name: "Svadhisthana", sanskrit: "स्वाधिष्ठान", color: "#f97316", ratio: 0.15 }, // Sacral
  { name: "Muladhara", sanskrit: "मूलाधार", color: "#ef4444", ratio: 0.0 }  // Root (base)
];

const POSES: YogaPose[] = [
  {
    name: "Tadasana (Mountain Pose)",
    sanskrit: "ताडासन",
    difficulty: "Beginner",
    benefits: [
      "Establishes physical and mental grounding",
      "Corrects skeletal posture and spinal alignment",
      "Strengthens thighs, knees, and ankles"
    ],
    steps: [
      "Stand with big toes touching, heels slightly apart.",
      "Engage your quadriceps, draw your belly gently in and up.",
      "Roll your shoulders back and down, letting your arms rest by your sides, palms facing forward.",
      "Breathe deeply, feeling rooted to the earth and reaching through the crown of your head."
    ],
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Vrikshasana (Tree Pose)",
    sanskrit: "वृक्षासन",
    difficulty: "Beginner",
    benefits: [
      "Improves physical balance and focus",
      "Stretches the thighs, groins, torso, and shoulders",
      "Builds mental focus and calmness"
    ],
    steps: [
      "Begin in Mountain Pose. Shift your weight slightly onto your left foot.",
      "Bend your right knee, placing the sole of your right foot on your inner left thigh or calf (avoid the knee).",
      "Bring your hands together in a prayer position at your chest, or reach them to the sky.",
      "Fix your gaze (Drishti) on a steady point on the wall or floor. Breathe calmly for 5 cycles."
    ],
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Virabhadrasana II (Warrior II)",
    sanskrit: "वीरभद्रासन II",
    difficulty: "Intermediate",
    benefits: [
      "Strengthens thighs, hips, core and arms",
      "Stretches chest, lungs, and groin",
      "Stimulates abdominal organs and builds stamina"
    ],
    steps: [
      "Step your feet about 4 feet apart.",
      "Turn your right foot out 90 degrees and your left foot slightly in.",
      "Extend your arms out to the sides, parallel to the floor, palms facing down.",
      "Bend your right knee over your right ankle, keeping your torso centered and looking past your right fingertips."
    ],
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=800"
  },
  {
    name: "Bakasana (Crow Pose)",
    sanskrit: "बकासन",
    difficulty: "Advanced",
    benefits: [
      "Strengthens arms, wrists, and shoulder girdle",
      "Deeply engages and tones core abdominal muscles",
      "Builds high self-trust, balance, and spatial awareness"
    ],
    steps: [
      "Squat down and place your palms flat on the mat, shoulder-width apart.",
      "Press your knees high up into the back of your triceps or armpits.",
      "Shift your weight forward into your fingers, lifting your hips high.",
      "Gently lift one foot, then the other, balancing entirely on your hands with core tightly bound."
    ],
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=800"
  }
];

export default function YogaSection() {
  const [selectedPose, setSelectedPose] = useState<YogaPose>(POSES[0]);
  const [viewMode, setViewMode] = useState<"2d" | "3d">("3d");
  const [rotationAngle, setRotationAngle] = useState({ x: 0.1, y: 0.8 }); // initial beautiful angles
  const [showChakras, setShowChakras] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });

  // Custom 3D Projection Canvas rendering loop
  useEffect(() => {
    if (viewMode !== "3d" || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const render = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Width and Height scale
      const width = canvas.width;
      const height = canvas.height;
      const cx = width / 2;
      const cy = height / 2 + 30; // offset down a bit for aesthetics
      const scale = Math.min(width, height) * 0.38;

      // Draw background design grids (sacred geometric ring in 3D perspective)
      ctx.strokeStyle = "rgba(44, 73, 62, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy + 90, scale * 0.8, 0, Math.PI * 2);
      ctx.stroke();

      // Render outer mandala aura
      ctx.strokeStyle = "rgba(197, 160, 89, 0.15)";
      ctx.beginPath();
      ctx.arc(cx, cy - 40, scale * 1.2, 0, Math.PI * 2);
      ctx.stroke();

      // Get skeleton coords
      const joints = POSE_SKELETONS[selectedPose.name] || POSE_SKELETONS[POSES[0].name];

      // Rotate joints and project to 2D
      const cosY = Math.cos(rotationAngle.y);
      const sinY = Math.sin(rotationAngle.y);
      const cosX = Math.cos(rotationAngle.x);
      const sinX = Math.sin(rotationAngle.x);

      const projected: { [name: string]: { x: number; y: number; depth: number } } = {};

      joints.forEach((joint) => {
        // Rotate around Y axis (Yaw)
        let x1 = joint.x * cosY - joint.z * sinY;
        let z1 = joint.x * sinY + joint.z * cosY;

        // Rotate around X axis (Pitch)
        let y1 = joint.y * cosX - z1 * sinX;
        let z2 = joint.y * sinX + z1 * cosX;

        // Perspective factor
        const distance = 3.5;
        const perspective = distance / (distance - z2);

        projected[joint.name] = {
          x: cx + x1 * scale * perspective,
          y: cy - y1 * scale * perspective, // invert Y coordinate in canvas space
          depth: z2
        };
      });

      // Draw Bones
      SKELETON_BONES.forEach(([b1, b2]) => {
        const p1 = projected[b1];
        const p2 = projected[b2];

        if (p1 && p2) {
          // Gradient based on depth
          const grad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
          const alpha1 = Math.max(0.3, Math.min(1.0, (p1.depth + 1) / 2));
          const alpha2 = Math.max(0.3, Math.min(1.0, (p2.depth + 1) / 2));
          grad.addColorStop(0, `rgba(197, 160, 89, ${alpha1})`); // Gold tone
          grad.addColorStop(1, `rgba(197, 160, 89, ${alpha2})`);

          ctx.strokeStyle = grad;
          ctx.lineWidth = 3.5;
          ctx.lineCap = "round";
          ctx.shadowColor = "rgba(197, 160, 89, 0.3)";
          ctx.shadowBlur = 4;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
          ctx.shadowBlur = 0; // reset
        }
      });

      // Render Chakras along the Sushumna Nadi (spinal channel)
      if (showChakras && projected["spine_base"] && projected["head"]) {
        const base = projected["spine_base"];
        const head = projected["head"];
        const mid = projected["spine_mid"];
        const neck = projected["neck"];

        CHAKRAS.forEach((chakra) => {
          // Interpolate chakra coordinates along spine path
          let cxPos = 0;
          let cyPos = 0;

          if (chakra.ratio <= 0.3) {
            // base to spine_mid
            const t = chakra.ratio / 0.3;
            cxPos = base.x + (mid.x - base.x) * t;
            cyPos = base.y + (mid.y - base.y) * t;
          } else if (chakra.ratio <= 0.7) {
            // spine_mid to neck
            const t = (chakra.ratio - 0.3) / 0.4;
            cxPos = mid.x + (neck.x - mid.x) * t;
            cyPos = mid.y + (neck.y - mid.y) * t;
          } else {
            // neck to head
            const t = (chakra.ratio - 0.7) / 0.3;
            cxPos = neck.x + (head.x - neck.x) * t;
            cyPos = neck.y + (head.y - neck.y) * t;
          }

          // Draw Glowing Chakra Center
          ctx.shadowColor = chakra.color;
          ctx.shadowBlur = 10;
          ctx.fillStyle = chakra.color;
          ctx.beginPath();
          ctx.arc(cxPos, cyPos, 5, 0, Math.PI * 2);
          ctx.fill();

          // Outer halo pulsing effect
          const pulse = 6 + Math.sin(Date.now() * 0.003 + chakra.ratio * 10) * 2;
          ctx.strokeStyle = `${chakra.color}40`;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.arc(cxPos, cyPos, pulse, 0, Math.PI * 2);
          ctx.stroke();

          ctx.shadowBlur = 0; // Reset shadow

          // Sanskrit label
          ctx.fillStyle = "rgba(44, 73, 62, 0.8)";
          ctx.font = "bold 8px monospace";
          ctx.fillText(chakra.sanskrit, cxPos + 12, cyPos + 3);
        });
      }

      // Draw Key Joint Nodes
      joints.forEach((joint) => {
        // Skip spine nodes to avoid duplicating with chakras
        if (showChakras && ["spine_base", "spine_mid", "neck", "head"].includes(joint.name)) return;

        const proj = projected[joint.name];
        if (proj) {
          ctx.fillStyle = "#ffffff";
          ctx.strokeStyle = "rgba(44, 73, 62, 0.8)";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
      });

      // Ground plane coordinates shadow
      ctx.fillStyle = "rgba(197, 160, 89, 0.05)";
      ctx.beginPath();
      ctx.ellipse(cx, cy + 120, scale * 0.6, scale * 0.15, 0, 0, Math.PI * 2);
      ctx.fill();

      // Render simple interactive orientation compass at corner
      const compassX = 50;
      const compassY = 50;
      const compassR = 15;
      ctx.strokeStyle = "rgba(44, 73, 62, 0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(compassX, compassY, compassR, 0, Math.PI * 2);
      ctx.stroke();

      // Draw dynamic pointing needle based on Y angle
      const needleX = compassX + Math.sin(rotationAngle.y) * compassR;
      const needleY = compassY + Math.cos(rotationAngle.y) * compassR * 0.5;
      ctx.strokeStyle = "#c5a059";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(compassX, compassY);
      ctx.lineTo(needleX, needleY);
      ctx.stroke();

      ctx.fillStyle = "rgba(44, 73, 62, 0.5)";
      ctx.font = "8px monospace";
      ctx.fillText("3D GRID", compassX - 18, compassY + 25);

      animId = requestAnimationFrame(render);
    };

    // Spin slowly if not dragging
    let spinAngle = rotationAngle.y;
    const slowSpin = () => {
      if (!isDraggingRef.current) {
        spinAngle += 0.002;
        setRotationAngle((prev) => ({ ...prev, y: spinAngle }));
      }
    };
    const interval = setInterval(slowSpin, 30);

    render();

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(interval);
    };
  }, [viewMode, selectedPose, rotationAngle, showChakras]);

  // Mouse & Touch events for Drag rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    prevMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - prevMouseRef.current.x;
    const dy = e.clientY - prevMouseRef.current.y;

    setRotationAngle((prev) => ({
      x: Math.max(-0.6, Math.min(0.6, prev.x - dy * 0.008)), // clamp pitch to prevent complete flipping
      y: prev.y + dx * 0.008
    }));

    prevMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - prevMouseRef.current.x;
    const dy = e.touches[0].clientY - prevMouseRef.current.y;

    setRotationAngle((prev) => ({
      x: Math.max(-0.6, Math.min(0.6, prev.x - dy * 0.008)),
      y: prev.y + dx * 0.008
    }));

    prevMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  return (
    <div id="yoga-asanas" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* List of Poses */}
      <div className="lg:col-span-5 space-y-6">
        <div>
          <span className="text-xs font-mono tracking-widest text-gold-600 uppercase block mb-2">
            Hatha Sanctuary
          </span>
          <h3 className="text-3xl font-serif font-semibold text-sage-900 tracking-tight leading-tight">
            Asana Wisdom
          </h3>
          <p className="mt-2 text-sage-600 text-sm leading-relaxed">
            Cultivate stability and flow. Select an asana to inspect skeletal alignments, pranic benefits, and step-by-step physical entries.
          </p>
        </div>

        {/* Pose Selection Cards */}
        <div className="space-y-3">
          {POSES.map((pose) => {
            const isSelected = selectedPose.name === pose.name;
            return (
              <button
                key={pose.name}
                id={`pose-btn-${pose.name.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => setSelectedPose(pose)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                  isSelected
                    ? "bg-sage-50 border-sage-300 shadow-xs scale-[1.01]"
                    : "bg-white border-sage-100 hover:border-sage-200"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${isSelected ? "bg-sage-100 text-sage-700" : "bg-sage-50 text-sage-400"}`}>
                    {pose.difficulty === "Beginner" && <Leaf className="w-5 h-5" />}
                    {pose.difficulty === "Intermediate" && <Compass className="w-5 h-5" />}
                    {pose.difficulty === "Advanced" && <Flame className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sage-900 text-sm">{pose.name}</h4>
                    <span className="text-[10px] font-mono text-sage-500 italic block mt-0.5">
                      Sanskrit: {pose.sanskrit}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full ${
                    pose.difficulty === "Beginner" ? "bg-green-100 text-green-700" :
                    pose.difficulty === "Intermediate" ? "bg-blue-100 text-blue-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {pose.difficulty}
                  </span>
                  <ChevronRight className="w-4 h-4 text-sage-400" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Visual Detail Board */}
      <div className="lg:col-span-7">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPose.name}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="bg-white rounded-3xl border border-sage-100 overflow-hidden shadow-sm flex flex-col md:flex-row h-full min-h-[460px]"
          >
            {/* Visual Panel: Image (2D) or Canvas (3D) */}
            <div className="md:w-1/2 relative min-h-[300px] md:min-h-full bg-sage-950 flex flex-col justify-between">
              
              {/* Overlay Toggle Controls */}
              <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between gap-2">
                <div className="bg-sage-900/90 backdrop-blur-md rounded-full p-1 border border-sage-800 flex gap-1">
                  <button
                    id="toggle-2d-btn"
                    onClick={() => setViewMode("2d")}
                    className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                      viewMode === "2d" ? "bg-gold-600 text-white" : "text-sage-400 hover:text-sage-200"
                    }`}
                  >
                    2D Art
                  </button>
                  <button
                    id="toggle-3d-btn"
                    onClick={() => setViewMode("3d")}
                    className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 ${
                      viewMode === "3d" ? "bg-gold-600 text-white font-bold" : "text-sage-400 hover:text-sage-200"
                    }`}
                  >
                    <Rotate3d className="w-3 h-3" />
                    3D Align
                  </button>
                </div>

                {viewMode === "3d" && (
                  <button
                    id="toggle-chakras-btn"
                    onClick={() => setShowChakras(!showChakras)}
                    className={`px-3 py-1.5 rounded-full text-[9px] font-mono uppercase tracking-widest bg-sage-900/90 backdrop-blur-md border border-sage-800 transition-all flex items-center gap-1 cursor-pointer ${
                      showChakras ? "text-gold-400 font-bold border-gold-400/40" : "text-sage-500 hover:text-sage-300"
                    }`}
                  >
                    <Flame className="w-3 h-3" />
                    {showChakras ? "Chakras ON" : "Chakras OFF"}
                  </button>
                )}
              </div>

              {/* Render Selected View */}
              {viewMode === "2d" ? (
                <div className="absolute inset-0">
                  <img
                    src={selectedPose.image}
                    alt={selectedPose.name}
                    referrerPolicy="no-referrer"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sage-950/80 via-transparent to-transparent"></div>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col justify-center items-center cursor-grab active:cursor-grabbing">
                  <canvas
                    ref={canvasRef}
                    width={400}
                    height={460}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUpOrLeave}
                    onMouseLeave={handleMouseUpOrLeave}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleMouseUpOrLeave}
                    className="w-full h-full object-contain"
                  />
                  
                  {/* Subtle 3D Instructions */}
                  <div className="absolute bottom-16 left-0 right-0 text-center pointer-events-none">
                    <span className="text-[9px] font-mono text-sage-400 uppercase tracking-widest block bg-sage-900/50 backdrop-blur-xs py-1 px-3 rounded-full w-max mx-auto">
                      Drag Canvas to Rotate Axis
                    </span>
                  </div>
                </div>
              )}

              {/* Static Posture Title (Shared bottom overlay) */}
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1 pointer-events-none z-10">
                <span className="text-xs font-mono text-gold-300 uppercase tracking-widest block">
                  {viewMode === "3d" ? "Subtle Energy Alignment" : "Asana Illustration"}
                </span>
                <h4 className="text-2xl font-serif font-bold leading-tight">
                  {selectedPose.name}
                </h4>
              </div>
            </div>

            {/* Instruction half */}
            <div className="md:w-1/2 p-6 lg:p-8 space-y-6 flex flex-col justify-between max-h-[500px] overflow-y-auto no-scrollbar">
              {/* Benefits */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-gold-600" />
                  <span className="text-[10px] font-mono text-gold-700 uppercase tracking-widest font-semibold">
                    Benefits & Pranic Flow
                  </span>
                </div>
                <ul className="space-y-2 text-xs text-sage-700 leading-relaxed">
                  {selectedPose.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-sage-500 shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step by Step alignment */}
              <div className="space-y-3 pt-4 border-t border-sage-100">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-sage-500" />
                  <span className="text-[10px] font-mono text-sage-500 uppercase tracking-widest">
                    Step-by-Step Alignment
                  </span>
                </div>
                <ol className="space-y-3 text-xs text-sage-600 list-decimal pl-4 leading-relaxed">
                  {selectedPose.steps.map((step, i) => (
                    <li key={i} className="pl-1">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Mantra block */}
              <div className="bg-gold-50 border border-gold-200/40 rounded-xl p-3.5 text-center">
                <p className="text-[10px] font-mono text-gold-800 italic">
                  "Maintain focused breathing, centering your mind at the plexus."
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
