import React, { useEffect, useRef, useState } from "react";
import { Compass, RotateCw, HelpCircle, Activity } from "lucide-react";

interface Point3D {
  x: number;
  y: number;
  z: number;
  color?: string;
}

interface Edge {
  a: number;
  b: number;
}

export default function ThreeDCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeShape, setActiveShape] = useState<"merkaba" | "torus" | "lotus">("merkaba");
  const [rotationSpeed, setRotationSpeed] = useState<number>(1);
  const [dimensions, setDimensions] = useState({ width: 300, height: 300 });

  // Mouse coords for interactive tilt
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef({ y: 0, targetY: 0 });

  useEffect(() => {
    // Handle container resizing dynamically
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight || 300
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Track scroll
    const handleScroll = () => {
      scrollRef.current.targetY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Track mouse movement over the container
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseRef.current.targetX = x * 2.5;
        mouseRef.current.targetY = y * 2.5;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let angleX = 0;
    let angleY = 0;
    let angleZ = 0;

    // Generate coordinates based on active shape
    const getVerticesAndEdges = (): { vertices: Point3D[]; edges: Edge[] } => {
      const vertices: Point3D[] = [];
      const edges: Edge[] = [];

      if (activeShape === "merkaba") {
        // Merkaba - interpenetrating tetrahedrons
        // Tetrahedron 1
        const s = 45;
        vertices.push({ x: s, y: s, z: s });
        vertices.push({ x: -s, y: -s, z: s });
        vertices.push({ x: -s, y: s, z: -s });
        vertices.push({ x: s, y: -s, z: -s });

        // Edges for tetrahedron 1
        edges.push({ a: 0, b: 1 }, { a: 0, b: 2 }, { a: 0, b: 3 });
        edges.push({ a: 1, b: 2 }, { a: 1, b: 3 }, { a: 2, b: 3 });

        // Tetrahedron 2 (inverted)
        const offset = 4; // Vertices index offset
        vertices.push({ x: -s, y: -s, z: -s });
        vertices.push({ x: s, y: s, z: -s });
        vertices.push({ x: s, y: -s, z: s });
        vertices.push({ x: -s, y: s, z: s });

        // Edges for tetrahedron 2
        edges.push({ a: 4 + 0, b: 4 + 1 }, { a: 4 + 0, b: 4 + 2 }, { a: 4 + 0, b: 4 + 3 });
        edges.push({ a: 4 + 1, b: 4 + 2 }, { a: 4 + 1, b: 4 + 3 }, { a: 4 + 2, b: 4 + 3 });

      } else if (activeShape === "torus") {
        // Kundalini Torus Knot / Spiral Double Helix
        const numPoints = 140;
        const R = 45; // major radius
        const r = 20; // minor radius
        const p = 3;  // frequency 1
        const q = 7;  // frequency 2

        for (let i = 0; i < numPoints; i++) {
          const theta = (i / numPoints) * Math.PI * 2 * p;
          const x = (R + r * Math.cos(q * theta)) * Math.cos(theta);
          const y = (R + r * Math.cos(q * theta)) * Math.sin(theta);
          const z = r * Math.sin(q * theta);
          vertices.push({ x, y, z });

          if (i > 0) {
            edges.push({ a: i - 1, b: i });
          }
        }
        // Connect tail to head
        edges.push({ a: numPoints - 1, b: 0 });

      } else if (activeShape === "lotus") {
        // Lotus concentric rotating geometry rings
        const numRings = 4;
        const ptsPerRing = 25;
        let pIndex = 0;

        for (let ring = 0; ring < numRings; ring++) {
          const radius = (ring + 1) * 18;
          const ringZ = Math.sin(ring * 1.5) * 8;

          for (let pIdx = 0; pIdx < ptsPerRing; pIdx++) {
            const angle = (pIdx / ptsPerRing) * Math.PI * 2;
            const x = radius * Math.cos(angle);
            const y = radius * Math.sin(angle);
            vertices.push({ x, y, z: ringZ });

            if (pIdx > 0) {
              edges.push({ a: pIndex - 1, b: pIndex });
            }
            pIndex++;
          }
          // Close ring
          edges.push({ a: pIndex - 1, b: pIndex - ptsPerRing });
        }
      }

      return { vertices, edges };
    };

    const draw = () => {
      if (!ctx || !canvas) return;

      // Clear with soft gradient or clean slate
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Damp mouse & scroll inputs
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.1;
      scrollRef.current.y += (scrollRef.current.targetY - scrollRef.current.y) * 0.05;

      const { vertices, edges } = getVerticesAndEdges();

      // Dynamic rotation calculated from time + mouse + scroll depth
      const scrollFactor = scrollRef.current.y * 0.0015;
      angleX = (Date.now() * 0.0004 * rotationSpeed) + mouseRef.current.y + scrollFactor;
      angleY = (Date.now() * 0.0006 * rotationSpeed) + mouseRef.current.x + scrollFactor * 0.7;
      angleZ = (Date.now() * 0.0002 * rotationSpeed) + scrollFactor * 0.3;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosZ = Math.cos(angleZ);
      const sinZ = Math.sin(angleZ);

      const focalLength = 280;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Transform and project points
      const projected: { x: number; y: number; originalZ: number }[] = [];

      // Dynamic dispersion on scroll
      const dispersion = Math.min(scrollRef.current.y * 0.03, 30);

      vertices.forEach((v) => {
        // Apply scroll dispersion outward from center
        const length = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z) || 1;
        const dispX = v.x + (v.x / length) * dispersion;
        const dispY = v.y + (v.y / length) * dispersion;
        const dispZ = v.z + (v.z / length) * dispersion;

        // 3D Rotations
        // Rotate Y
        let x1 = dispX * cosY - dispZ * sinY;
        let z1 = dispX * sinY + dispZ * cosY;

        // Rotate X
        let y2 = dispY * cosX - z1 * sinX;
        let z2 = dispY * sinX + z1 * cosX;

        // Rotate Z
        let x3 = x1 * cosZ - y2 * sinZ;
        let y3 = x1 * sinZ + y2 * cosZ;

        // Perspective projection
        const scale = focalLength / (focalLength + z2);
        const px = x3 * scale + centerX;
        const py = y3 * scale + centerY;

        projected.push({ x: px, y: py, originalZ: z2 });
      });

      // Draw Edges with glowing gold/amber gradient
      edges.forEach((edge) => {
        const p1 = projected[edge.a];
        const p2 = projected[edge.b];

        if (!p1 || !p2) return;

        // Depth cueing (alpha fades as objects recede)
        const avgDepth = (p1.originalZ + p2.originalZ) / 2;
        const alpha = Math.max(0.1, Math.min(0.85, 1 - (avgDepth + 100) / 200));

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);

        // Gold stroke
        ctx.strokeStyle = `rgba(197, 160, 89, ${alpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      // Draw glowing vertices (particles)
      projected.forEach((p) => {
        const alpha = Math.max(0.2, Math.min(1, 1 - (p.originalZ + 100) / 200));
        
        ctx.beginPath();
        // Glow radius expands slightly on scroll speed
        const radius = 2.5 + Math.abs(scrollRef.current.targetY - scrollRef.current.y) * 0.02;
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);

        // Radial gold glow
        ctx.fillStyle = `rgba(197, 160, 89, ${alpha})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = "rgba(197, 160, 89, 0.6)";
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // Draw fine center halo circles (Sacred Geometry background)
      ctx.beginPath();
      ctx.arc(centerX, centerY, 60 + dispersion * 0.5, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(197, 160, 89, 0.05)";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(centerX, centerY, 100, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(197, 160, 89, 0.02)";
      ctx.lineWidth = 0.5;
      ctx.stroke();

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [activeShape, rotationSpeed, dimensions]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[350px] relative flex flex-col justify-between items-center bg-white border border-sage-200/60 rounded-3xl p-6 shadow-[0_20px_50px_rgba(40,60,40,0.08)] select-none overflow-hidden"
    >
      {/* Background Star field effect */}
      <div className="absolute inset-0 opacity-[0.2] pointer-events-none">
        <div className="absolute top-10 left-12 w-1.5 h-1.5 bg-gold-400 rounded-full animate-ping" />
        <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-gold-300 rounded-full" />
        <div className="absolute bottom-16 left-28 w-1 h-1 bg-sage-400 rounded-full" />
        <div className="absolute bottom-32 right-12 w-1 h-1 bg-gold-400 rounded-full" />
      </div>

      {/* Top Header Controls */}
      <div className="w-full flex items-center justify-between z-10 flex-wrap gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-sage-500 font-bold block">
            Sacred 3D Attunement
          </span>
          <h4 className="text-sm font-serif font-bold text-sage-900 uppercase tracking-wider mt-0.5">
            {activeShape === "merkaba" && "Merkaba Light Vehicle"}
            {activeShape === "torus" && "Kundalini Sushumna Spiral"}
            {activeShape === "lotus" && "Lotus Mandala Rings"}
          </h4>
        </div>
        
        <div className="flex items-center gap-1.5 bg-sage-50/80 p-1 rounded-full border border-sage-200/60 shadow-3xs">
          {[
            { id: "merkaba", label: "Merkaba" },
            { id: "torus", label: "Kundalini" },
            { id: "lotus", label: "Lotus" }
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveShape(s.id as any)}
              className={`px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-widest transition-all cursor-pointer ${
                activeShape === s.id 
                  ? "bg-sage-800 text-white shadow-xs" 
                  : "text-sage-500 hover:text-sage-900"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
 
      {/* 3D Projection Canvas */}
      <div className="flex-1 w-full flex items-center justify-center relative my-4">
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          className="max-w-full max-h-full"
        />
 
        {/* Central Core coordinate line indicator (Anti-Slop Clean Look, but subtle aesthetic) */}
        <div className="absolute text-[8px] font-mono text-gold-600/30 pointer-events-none flex flex-col items-center">
          <Activity className="w-4 h-4 animate-pulse opacity-40" />
          <span>ॐ 3D MATRIX</span>
        </div>
      </div>
 
      {/* Footer Speed Indicator */}
      <div className="w-full flex items-center justify-between text-[10px] font-mono text-sage-500 z-10 pt-3 border-t border-sage-100">
        <div className="flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-gold-600 animate-spin" style={{ animationDuration: `${20 / rotationSpeed}s` }} />
          <span>Tilt & scroll coordinates active</span>
        </div>
 
        <div className="flex items-center gap-2">
          <span>Speed:</span>
          <div className="flex gap-1">
            {[0.5, 1, 2].map((sp) => (
              <button
                key={sp}
                onClick={() => setRotationSpeed(sp)}
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] border transition-colors cursor-pointer ${
                  rotationSpeed === sp
                    ? "bg-sage-800 text-white border-sage-800 shadow-3xs"
                    : "border-sage-200 text-sage-500 hover:text-sage-900 hover:bg-sage-50"
                }`}
              >
                {sp}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
