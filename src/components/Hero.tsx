import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const taglines = [
  {
    headline: "Transformative Consulting Services",
    subline: "Unlocking Potential and Driving Growth",
  },
  {
    headline: "Building The Future",
    subline: "Pioneering Innovations for a Brighter Tomorrow",
  },
  {
    headline: "Science-Focused Expertise",
    subline: "Nurturing Curiosity, Advancing Knowledge",
  },
];

const CYCLE_INTERVAL_MS = 5000;
const NODE_COUNT = 28;
const BOND_DISTANCE = 220; // px – max distance to draw a bond between nodes

const EASE_CURVE = [0.22, 1, 0.36, 1] as const;

const prefersReducedMotion =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MolecularNode {
  id: number;
  x: number; // % of viewport
  y: number;
  radius: number; // px – visual size of the atom
  ringRadius: number; // outer electron ring
  duration: number; // drift animation duration (s)
  delay: number;
  opacity: number;
  isNucleus: boolean; // larger, brighter nodes
  color: "cyan" | "gold" | "blue";
}

interface Bond {
  from: number;
  to: number;
}

// ---------------------------------------------------------------------------
// Molecular Network Generation
// ---------------------------------------------------------------------------

function generateNodes(count: number): MolecularNode[] {
  const colors: Array<MolecularNode["color"]> = [
    "cyan",
    "cyan",
    "cyan",
    "blue",
    "blue",
    "gold",
  ];
  return Array.from({ length: count }, (_, i) => {
    const isNucleus = i % 7 === 0; // ~every 7th node is a large nucleus
    return {
      id: i,
      x: Math.random() * 96 + 2,
      y: Math.random() * 96 + 2,
      radius: isNucleus ? Math.random() * 3 + 4 : Math.random() * 2 + 1.5,
      ringRadius: isNucleus ? Math.random() * 6 + 10 : Math.random() * 4 + 6,
      duration: Math.random() * 25 + 18,
      delay: Math.random() * -20,
      opacity: isNucleus ? 0.25 : Math.random() * 0.15 + 0.06,
      isNucleus,
      color: colors[Math.floor(Math.random() * colors.length)],
    };
  });
}

function generateBonds(nodes: MolecularNode[]): Bond[] {
  const bonds: Bond[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = (nodes[i].x - nodes[j].x) * 0.01 * 1920;
      const dy = (nodes[i].y - nodes[j].y) * 0.01 * 1080;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < BOND_DISTANCE) {
        bonds.push({ from: i, to: j });
      }
    }
  }
  return bonds;
}

// ---------------------------------------------------------------------------
// Color helpers
// ---------------------------------------------------------------------------

function nodeColor(color: MolecularNode["color"], alpha: number): string {
  switch (color) {
    case "cyan":
      return `rgba(0, 210, 230, ${alpha})`;
    case "gold":
      return `rgba(201, 168, 76, ${alpha})`;
    case "blue":
      return `rgba(60, 130, 246, ${alpha})`;
  }
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** SVG molecular network – atoms + bonds */
function MolecularNetwork({
  nodes,
  bonds,
}: {
  nodes: MolecularNode[];
  bonds: Bond[];
}) {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Bonds (thin lines between nearby atoms) */}
      {bonds.map((b, i) => {
        const a = nodes[b.from];
        const z = nodes[b.to];
        return (
          <motion.line
            key={`bond-${i}`}
            x1={a.x}
            y1={a.y}
            x2={z.x}
            y2={z.y}
            stroke="rgba(0, 210, 230, 0.06)"
            strokeWidth={0.06}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={
              prefersReducedMotion
                ? { opacity: 0.06 }
                : { pathLength: 1, opacity: [0.03, 0.08, 0.03] }
            }
            transition={{
              pathLength: { duration: 2, delay: i * 0.02 },
              opacity: { duration: 8 + Math.random() * 6, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        );
      })}

      {/* Atom nodes */}
      {nodes.map((n) => (
        <g key={n.id}>
          {/* Electron ring */}
          <motion.circle
            cx={n.x}
            cy={n.y}
            r={n.ringRadius * 0.06}
            fill="none"
            stroke={nodeColor(n.color, n.opacity * 0.4)}
            strokeWidth={0.03}
            animate={
              prefersReducedMotion
                ? {}
                : {
                    cx: [n.x, n.x + (Math.random() - 0.5) * 2, n.x],
                    cy: [n.y, n.y + (Math.random() - 0.5) * 2, n.y],
                  }
            }
            transition={{
              duration: n.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: n.delay,
            }}
          />
          {/* Atom core */}
          <motion.circle
            cx={n.x}
            cy={n.y}
            r={n.radius * 0.04}
            fill={nodeColor(n.color, n.opacity)}
            animate={
              prefersReducedMotion
                ? {}
                : {
                    cx: [n.x, n.x + (Math.random() - 0.5) * 2, n.x],
                    cy: [n.y, n.y + (Math.random() - 0.5) * 2, n.y],
                    opacity: [
                      n.opacity,
                      n.opacity * 1.5,
                      n.opacity,
                      n.opacity * 0.5,
                      n.opacity,
                    ],
                  }
            }
            transition={{
              duration: n.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: n.delay,
            }}
          />
          {/* Glow for nucleus nodes */}
          {n.isNucleus && (
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={n.radius * 0.12}
              fill={nodeColor(n.color, 0.03)}
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      cx: [n.x, n.x + (Math.random() - 0.5) * 2, n.x],
                      cy: [n.y, n.y + (Math.random() - 0.5) * 2, n.y],
                    }
              }
              transition={{
                duration: n.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: n.delay,
              }}
            />
          )}
        </g>
      ))}
    </svg>
  );
}

/** DNA double-helix SVG background element */
function DNAHelix() {
  // Build two sinusoidal strands with cross-rungs
  const points = 60;
  const height = 600;
  const cx = 50;
  const amplitude = 18;

  let strand1 = "";
  let strand2 = "";
  const rungs: Array<{ x1: number; y1: number; x2: number; y2: number }> = [];

  for (let i = 0; i <= points; i++) {
    const t = i / points;
    const y = t * height;
    const phase = t * Math.PI * 4; // 2 full twists
    const x1 = cx + Math.sin(phase) * amplitude;
    const x2 = cx + Math.sin(phase + Math.PI) * amplitude;

    strand1 += `${i === 0 ? "M" : "L"} ${x1} ${y}`;
    strand2 += `${i === 0 ? "M" : "L"} ${x2} ${y}`;

    // Rungs every ~5 points
    if (i % 5 === 0 && i > 0 && i < points) {
      rungs.push({ x1, y1: y, x2, y2: y });
    }
  }

  return (
    <motion.svg
      className="absolute -right-4 top-1/2 h-[600px] w-[100px] -translate-y-1/2 md:right-8 lg:right-16"
      viewBox={`0 0 100 ${height}`}
      fill="none"
      aria-hidden="true"
      style={{ opacity: 0.07 }}
      animate={prefersReducedMotion ? {} : { rotateY: [0, 360] }}
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
    >
      <path d={strand1} stroke="rgba(0, 210, 230, 0.6)" strokeWidth="1.2" fill="none" />
      <path d={strand2} stroke="rgba(201, 168, 76, 0.5)" strokeWidth="1.2" fill="none" />
      {rungs.map((r, i) => (
        <line
          key={i}
          x1={r.x1}
          y1={r.y1}
          x2={r.x2}
          y2={r.y2}
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="0.6"
        />
      ))}
    </motion.svg>
  );
}

/** Waveform / oscilloscope line at bottom of hero */
function WaveformLine() {
  const width = 1200;
  const height = 60;
  const midY = height / 2;

  // Generate a composite sine wave path
  function buildWavePath(offset: number): string {
    let d = "";
    for (let x = 0; x <= width; x += 2) {
      const t = x / width;
      const y =
        midY +
        Math.sin(t * Math.PI * 6 + offset) * 12 +
        Math.sin(t * Math.PI * 14 + offset * 1.5) * 4 +
        Math.sin(t * Math.PI * 22 + offset * 0.7) * 2;
      d += `${x === 0 ? "M" : "L"} ${x} ${y.toFixed(2)}`;
    }
    return d;
  }

  const wavePath = buildWavePath(0);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-[60px] overflow-hidden" aria-hidden="true">
      <motion.svg
        className="absolute bottom-0 w-full"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
        style={{ opacity: 0.12 }}
      >
        {/* Primary waveform */}
        <motion.path
          d={wavePath}
          fill="none"
          stroke="rgba(0, 210, 230, 0.6)"
          strokeWidth="1.2"
          animate={
            prefersReducedMotion
              ? {}
              : { translateX: [0, -200] }
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        {/* Secondary faint waveform */}
        <motion.path
          d={buildWavePath(2)}
          fill="none"
          stroke="rgba(201, 168, 76, 0.3)"
          strokeWidth="0.8"
          animate={
            prefersReducedMotion
              ? {}
              : { translateX: [0, -150] }
          }
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.svg>
    </div>
  );
}

/** Clean fade-up text for headlines */
function FadeUpText({ text, className }: { text: string; className?: string }) {
  return (
    <motion.span
      className={className}
      aria-label={text}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {text}
    </motion.span>
  );
}

/** Subline fade transition */
function SublineText({ text, className }: { text: string; className?: string }) {
  return (
    <motion.p
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {text}
    </motion.p>
  );
}

// ---------------------------------------------------------------------------
// Main Hero Component
// ---------------------------------------------------------------------------

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Memoized molecular network
  const nodes = useMemo(() => generateNodes(NODE_COUNT), []);
  const bonds = useMemo(() => generateBonds(nodes), [nodes]);

  // Cycle taglines
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % taglines.length);
    }, CYCLE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  const current = taglines[activeIndex];

  // ---------- Scroll-driven parallax ----------
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);

  // ---------- Mouse parallax ----------
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (prefersReducedMotion) return;
      const { clientX, clientY } = e;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set((clientX - cx) / cx);
      mouseY.set((clientY - cy) / cy);
    },
    [mouseX, mouseY],
  );

  const particleLayerX = useTransform(smoothMouseX, [-1, 1], [-10, 10]);
  const particleLayerY = useTransform(smoothMouseY, [-1, 1], [-10, 10]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* ----------------------------------------------------------------- */}
      {/* Deep navy background with teal/cyan bioluminescent glows          */}
      {/* ----------------------------------------------------------------- */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: bgScale, willChange: "transform" }}
      >
        {/* Base: deep navy */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(160deg, #000030 0%, #000040 40%, #000a3a 100%)",
          }}
        />
        {/* Teal bioluminescent glow – top left */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 25% 30%, rgba(0, 180, 200, 0.06) 0%, transparent 70%)",
          }}
        />
        {/* Cyan glow – center right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 40% 50% at 75% 55%, rgba(0, 210, 230, 0.04) 0%, transparent 70%)",
          }}
        />
        {/* Subtle gold glow – center */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 35% 30% at 50% 45%, rgba(201, 168, 76, 0.03) 0%, transparent 70%)",
          }}
        />
      </motion.div>

      {/* ----------------------------------------------------------------- */}
      {/* Scientific coordinate grid                                        */}
      {/* ----------------------------------------------------------------- */}
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        {/* Fine grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 210, 230, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 210, 230, 0.4) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Major grid lines every 5th */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 210, 230, 0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 210, 230, 0.8) 1px, transparent 1px)",
            backgroundSize: "200px 200px",
          }}
        />
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Molecular network – atoms & bonds                                 */}
      {/* ----------------------------------------------------------------- */}
      <motion.div
        className="absolute inset-0"
        style={{ x: particleLayerX, y: particleLayerY, willChange: "transform" }}
        aria-hidden="true"
      >
        <MolecularNetwork nodes={nodes} bonds={bonds} />
      </motion.div>

      {/* ----------------------------------------------------------------- */}
      {/* DNA Helix – decorative, far right                                 */}
      {/* ----------------------------------------------------------------- */}
      <DNAHelix />

      {/* ----------------------------------------------------------------- */}
      {/* Waveform / oscilloscope at bottom edge                            */}
      {/* ----------------------------------------------------------------- */}
      <WaveformLine />

      {/* ----------------------------------------------------------------- */}
      {/* Hero Content (scroll parallax wrapper)                             */}
      {/* ----------------------------------------------------------------- */}
      <motion.div
        className="relative z-10 mx-auto max-w-5xl px-6 text-center"
        style={{
          y: prefersReducedMotion ? 0 : contentY,
          opacity: prefersReducedMotion ? 1 : contentOpacity,
          willChange: "transform, opacity",
        }}
      >
        {/* Company name */}
        <motion.p
          className="mb-6 text-xs font-semibold tracking-[0.35em] uppercase text-[var(--color-gold)] md:text-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Ghoussoub Consulting Group
        </motion.p>

        {/* ---- Rotating headline ---- */}
        <div className="relative h-[8rem] sm:h-[7rem] md:h-[7.5rem]">
          <AnimatePresence mode="wait">
            <motion.h1
              key={`headline-${activeIndex}`}
              className="absolute inset-x-0 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <FadeUpText text={current.headline} />
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Decorative divider – lab-flask style with dots */}
        <motion.div
          className="mx-auto my-6 flex items-center justify-center gap-2"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.7 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="h-[1px] w-8 bg-[rgba(0,210,230,0.4)]" />
          <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
          <div className="h-[1px] w-16 bg-[var(--color-gold)]" />
          <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
          <div className="h-[1px] w-8 bg-[rgba(0,210,230,0.4)]" />
        </motion.div>

        {/* ---- Rotating subline ---- */}
        <div className="relative h-[3.5rem] sm:h-[2.5rem]">
          <AnimatePresence mode="wait">
            <SublineText
              key={`subline-${activeIndex}`}
              text={current.subline}
              className="absolute inset-x-0 text-base font-light tracking-wide text-white/70 sm:text-lg"
            />
          </AnimatePresence>
        </div>

        {/* Progress indicators */}
        <motion.div
          className="mt-10 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {taglines.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="group relative h-1.5 cursor-pointer overflow-hidden rounded-full bg-white/15 transition-all duration-300"
              style={{ width: i === activeIndex ? 40 : 16 }}
            >
              {i === activeIndex && (
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-[var(--color-gold)]"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: CYCLE_INTERVAL_MS / 1000,
                    ease: "linear",
                  }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* ---- CTA buttons (clean, no magnetic effect) ---- */}
        <motion.div
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <a
            href="#services"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--color-gold)] px-9 py-4 text-sm font-bold tracking-widest text-[var(--color-navy)] uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.35)] hover:brightness-110"
          >
            Explore Our Services
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-9 py-4 text-sm font-bold tracking-widest text-white uppercase backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/10"
          >
            Book Consultation
          </a>
        </motion.div>
      </motion.div>

      {/* ----------------------------------------------------------------- */}
      {/* Scroll indicator                                                   */}
      {/* ----------------------------------------------------------------- */}
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-white/40 transition-colors hover:text-white/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        aria-label="Scroll to next section"
      >
        <span className="text-[10px] font-light tracking-[0.25em] uppercase">
          Scroll
        </span>
        <div className="relative h-10 w-[1.5px] overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="absolute top-0 left-0 w-full rounded-full bg-[var(--color-gold)]"
            animate={{ height: ["0%", "100%"], top: ["0%", "0%"] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.a>
    </section>
  );
}
