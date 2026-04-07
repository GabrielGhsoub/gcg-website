# GCG Science-Themed Design Brief

> Ghoussoub Consulting Group -- Beirut & Paris
> R&D | Academic Tutoring | Strategic Consulting

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Color System](#2-color-system)
3. [Science-Themed Visual Elements](#3-science-themed-visual-elements)
4. [Animations & Interactions](#4-animations--interactions)
5. [Iconography](#5-iconography)
6. [Page-by-Page Recommendations](#6-page-by-page-recommendations)
7. [Content Strategy](#7-content-strategy)
8. [Typography Enhancements](#8-typography-enhancements)
9. [Competitive Reference Sites](#9-competitive-reference-sites)
10. [Implementation Priority](#10-implementation-priority)

---

## 1. Design Philosophy

GCG sits at the intersection of **scientific rigor** and **business consulting**. The design should communicate:

- **Precision** -- not chaotic, but structured. Think lab notebooks, clean data visualization, and systematic grids.
- **Discovery** -- a sense of exploration and curiosity. Animations should reveal, not distract.
- **Authority** -- this is a firm with deep expertise. The visual language should feel premium and confident.
- **Duality** -- Beirut and Paris, science and business, research and application.

**Core Principle**: Science as metaphor. Use molecular structures for "connections," orbital systems for "process," waveforms for "progress," and constellation maps for "vision." Every decorative element should carry conceptual weight.

---

## 2. Color System

### Current Palette (keep as foundation)

```css
--color-navy: #000040;        /* Authority, depth */
--color-gold: #c9a84c;        /* Premium, achievement */
--color-cream: #faf8f5;       /* Clean, scholarly */
```

### Recommended Science Accent Colors

Add these as secondary/tertiary colors used sparingly for science-themed elements:

```css
/* Add to index.css @theme block */
@theme {
  /* Existing */
  --color-navy: #000040;
  --color-navy-light: #271e59;
  --color-navy-deep: #1b0e52;
  --color-gold: #c9a84c;
  --color-gold-light: #e8d48b;
  --color-cream: #faf8f5;

  /* NEW: Science accent palette */
  --color-cyan: #00b4d8;         /* Data, technology, digital */
  --color-cyan-light: #90e0ef;   /* Lighter accents, hover states */
  --color-emerald: #2dc653;      /* Growth, biology, success */
  --color-violet: #7b2cbf;       /* Innovation, creativity */
  --color-coral: #ff6b6b;        /* Energy, alerts, emphasis */
  --color-slate: #334155;        /* Body text alternative */

  /* Glass/transparency tokens */
  --glass-bg: rgba(255, 255, 255, 0.08);
  --glass-border: rgba(255, 255, 255, 0.15);
  --glass-blur: 12px;
}
```

### Color Usage Rules

| Element | Color | Rationale |
|---------|-------|-----------|
| Backgrounds, headers | Navy | Authority |
| CTAs, highlights | Gold | Premium action |
| Data viz, particle links | Cyan | Science/tech feel |
| Success states, bio-related | Emerald | Growth/nature |
| Innovation badges, R&D | Violet | Creativity |
| Error/energy states | Coral | Attention |
| Particle nodes | Cyan + Gold mix | Science meets consulting |

### Color Palette by Service Area

- **R&D Pages**: Navy + Cyan + Violet -- feels like a lab
- **Tutoring Pages**: Navy + Emerald + Gold -- feels academic and nurturing
- **Consulting Pages**: Navy + Gold + Slate -- feels business-premium

---

## 3. Science-Themed Visual Elements

### 3.1 Molecular Network Background (Hero Section)

Replace the current simple particle system with an interactive molecular network. Particles become nodes, and lines connect nearby nodes, creating a molecular structure feel.

```tsx
// src/components/MolecularNetwork.tsx
import { useCallback, useMemo } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";

const molecularOptions: ISourceOptions = {
  fullScreen: false,
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  particles: {
    number: { value: 60, density: { enable: true, width: 1200, height: 800 } },
    color: { value: ["#c9a84c", "#00b4d8", "#7b2cbf"] },
    shape: { type: "circle" },
    opacity: {
      value: { min: 0.1, max: 0.4 },
      animation: { enable: true, speed: 0.5, startValue: "random", sync: false },
    },
    size: {
      value: { min: 1, max: 3 },
    },
    links: {
      enable: true,
      distance: 150,
      color: "#c9a84c",
      opacity: 0.12,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.6,
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "bounce" },
    },
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" },
      resize: { enable: true },
    },
    modes: {
      grab: { distance: 180, links: { opacity: 0.3, color: "#00b4d8" } },
    },
  },
  detectRetina: true,
};

export default function MolecularNetwork() {
  const init = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="molecular-bg"
      className="absolute inset-0"
      init={init}
      options={molecularOptions}
    />
  );
}
```

**Install**: `npm install @tsparticles/react @tsparticles/slim`

### 3.2 DNA Helix Decoration (Section Dividers)

Use a pure CSS DNA helix as a decorative element between sections or alongside the R&D page. This is lightweight and does not require JavaScript.

```tsx
// src/components/DNAHelix.tsx
import { motion } from "framer-motion";

interface DNAHelixProps {
  strandCount?: number;
  vertical?: boolean;
  className?: string;
  colorA?: string;
  colorB?: string;
}

export default function DNAHelix({
  strandCount = 12,
  vertical = true,
  className = "",
  colorA = "var(--color-cyan)",
  colorB = "var(--color-gold)",
}: DNAHelixProps) {
  return (
    <motion.div
      className={`dna-helix ${vertical ? "dna-vertical" : "dna-horizontal"} ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      aria-hidden="true"
    >
      {Array.from({ length: strandCount }, (_, i) => (
        <div
          key={i}
          className="dna-strand"
          style={{ animationDelay: `${-i * 0.18}s` }}
        >
          <span className="dna-dot dna-dot-a" style={{ background: colorA }} />
          <span className="dna-dot dna-dot-b" style={{ background: colorB }} />
        </div>
      ))}
    </motion.div>
  );
}
```

```css
/* Add to index.css */

/* ------------------------------------------------------------------ */
/*  DNA Helix Animation                                                */
/* ------------------------------------------------------------------ */

.dna-helix {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.dna-vertical {
  flex-direction: row;
}

.dna-horizontal {
  flex-direction: column;
}

.dna-strand {
  position: relative;
  width: 1px;
  height: 60px;
  border: 1px dotted rgba(201, 168, 76, 0.2);
  animation: dna-rotate 3.5s linear infinite;
  transform-style: preserve-3d;
}

.dna-dot {
  position: absolute;
  left: -4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.dna-dot-a {
  top: -4px;
  box-shadow: 0 0 8px currentColor;
}

.dna-dot-b {
  bottom: -4px;
  box-shadow: 0 0 8px currentColor;
}

@keyframes dna-rotate {
  0% { transform: rotateX(0deg); }
  100% { transform: rotateX(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .dna-strand {
    animation: none;
  }
}
```

### 3.3 Scientific Graph Paper Background

Enhance the existing grid overlay to feel more like scientific graph paper.

```css
/* Replace/upgrade the existing grid overlay in Hero or use on cream sections */

.science-grid-bg {
  background-image:
    /* Major grid lines */
    linear-gradient(rgba(0, 0, 64, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 64, 0.04) 1px, transparent 1px),
    /* Minor grid lines */
    linear-gradient(rgba(0, 0, 64, 0.015) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 64, 0.015) 1px, transparent 1px);
  background-size:
    80px 80px,
    80px 80px,
    16px 16px,
    16px 16px;
}

/* Dark variant for navy backgrounds */
.science-grid-bg-dark {
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(rgba(255, 255, 255, 0.01) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.01) 1px, transparent 1px);
  background-size:
    80px 80px,
    80px 80px,
    16px 16px,
    16px 16px;
}
```

### 3.4 Hexagonal Molecular Pattern (Already Exists -- Enhance)

The existing `HexMolecularPattern` in `Services.tsx` is a good start. Enhance it with subtle animation.

```tsx
// Enhanced version with animated glow nodes
function HexMolecularPattern() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hex-pattern" x="0" y="0" width="56" height="48" patternUnits="userSpaceOnUse">
            <polygon
              points="28,2 50,14 50,34 28,46 6,34 6,14"
              fill="none"
              stroke="rgba(0,0,64,0.04)"
              strokeWidth="0.8"
            />
            <circle cx="28" cy="2" r="1.2" fill="rgba(201,168,76,0.08)">
              <animate attributeName="opacity" values="0.08;0.2;0.08" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="50" cy="14" r="1" fill="rgba(0,180,216,0.06)" />
            <circle cx="50" cy="34" r="1" fill="rgba(0,0,64,0.05)" />
            <circle cx="28" cy="46" r="1.2" fill="rgba(0,180,216,0.06)">
              <animate attributeName="opacity" values="0.06;0.15;0.06" dur="5s" repeatCount="indefinite" />
            </circle>
            <circle cx="6" cy="34" r="1" fill="rgba(0,0,64,0.05)" />
            <circle cx="6" cy="14" r="1" fill="rgba(201,168,76,0.06)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-pattern)" />
      </svg>
    </div>
  );
}
```

### 3.5 Orbital System (Process Section)

An animated orbital/electron system showing the three services orbiting a central nucleus. Perfect for the "Our Process" or "How We Work" section.

```tsx
// src/components/OrbitalDiagram.tsx
import { motion } from "framer-motion";

interface OrbitProps {
  radius: number;
  duration: number;
  delay?: number;
  label: string;
  color: string;
}

function Orbit({ radius, duration, delay = 0, label, color }: OrbitProps) {
  return (
    <div className="absolute left-1/2 top-1/2" style={{ width: radius * 2, height: radius * 2, marginLeft: -radius, marginTop: -radius }}>
      {/* Orbit ring */}
      <div
        className="absolute inset-0 rounded-full border"
        style={{ borderColor: `${color}20` }}
      />
      {/* Electron */}
      <motion.div
        className="absolute"
        style={{ width: 40, height: 40, top: -20, left: "50%", marginLeft: -20 }}
        animate={{ rotate: 360 }}
        transition={{ duration, repeat: Infinity, ease: "linear", delay }}
      >
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full text-[10px] font-bold text-white shadow-lg"
          style={{ background: color, boxShadow: `0 0 20px ${color}40` }}
        >
          {label}
        </div>
      </motion.div>
    </div>
  );
}

export default function OrbitalDiagram() {
  return (
    <div className="relative mx-auto h-[400px] w-[400px]">
      {/* Nucleus */}
      <div className="absolute left-1/2 top-1/2 z-10 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-navy text-center text-xs font-bold text-gold shadow-xl">
        GCG
      </div>

      <Orbit radius={80}  duration={8}  delay={0}   label="R&D" color="#00b4d8" />
      <Orbit radius={130} duration={12} delay={0.5} label="EDU" color="#2dc653" />
      <Orbit radius={180} duration={16} delay={1}   label="BIZ" color="#c9a84c" />
    </div>
  );
}
```

### 3.6 Waveform Section Divider

A CSS sine-wave divider that separates sections with a scientific aesthetic.

```tsx
// src/components/WaveDivider.tsx

interface WaveDividerProps {
  color?: string;
  bgColor?: string;
  flip?: boolean;
}

export default function WaveDivider({
  color = "var(--color-cream)",
  bgColor = "var(--color-navy)",
  flip = false,
}: WaveDividerProps) {
  return (
    <div
      className="relative h-16 w-full md:h-24"
      style={{ backgroundColor: bgColor, transform: flip ? "scaleY(-1)" : "none" }}
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute bottom-0 h-full w-full"
      >
        <path
          d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
          fill={color}
        />
        {/* Second wave for depth */}
        <path
          d="M0,50 C320,20 640,70 960,40 C1200,20 1360,55 1440,45 L1440,80 L0,80 Z"
          fill={color}
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
```

---

## 4. Animations & Interactions

### 4.1 Framer Motion Science Variants (Reusable)

Create a shared animation config file that all components can import.

```tsx
// src/lib/animations.ts
import type { Variants, Transition } from "framer-motion";

/* ---- Shared easing curves ---- */
export const EASE_SCIENCE: number[] = [0.22, 1, 0.36, 1];
export const EASE_SMOOTH: number[] = [0.4, 0, 0.2, 1];

/* ---- Fade-up (default for headings, cards) ---- */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_SCIENCE, delay },
  }),
};

/* ---- Scale-in (for icons, badges) ---- */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: EASE_SCIENCE, delay },
  }),
};

/* ---- Slide-in from left (for data/stat reveals) ---- */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: EASE_SCIENCE, delay },
  }),
};

/* ---- Stagger container ---- */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

/* ---- Typewriter reveal (for scientific text) ---- */
export const typewriter: Variants = {
  hidden: { width: 0 },
  visible: {
    width: "auto",
    transition: { duration: 1.2, ease: EASE_SMOOTH },
  },
};

/* ---- Pulse glow (for active nodes/dots) ---- */
export const pulseGlow: Variants = {
  initial: { boxShadow: "0 0 0 0 rgba(201, 168, 76, 0)" },
  animate: {
    boxShadow: [
      "0 0 0 0 rgba(201, 168, 76, 0.4)",
      "0 0 0 12px rgba(201, 168, 76, 0)",
    ],
    transition: { duration: 1.5, repeat: Infinity },
  },
};

/* ---- Draw line (for connecting elements, borders) ---- */
export const drawLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.5, ease: EASE_SMOOTH },
  },
};
```

### 4.2 Animated Statistics Counter

Use for the "Impact Numbers" section (projects completed, students tutored, etc.)

```tsx
// src/components/AnimatedCounter.tsx
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon?: React.ReactNode;
}

export default function AnimatedCounter({
  end,
  duration = 2,
  suffix = "",
  prefix = "",
  label,
  icon,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, end, duration]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      {icon && <div className="mx-auto mb-3 text-cyan">{icon}</div>}
      <div className="text-4xl font-extrabold text-navy md:text-5xl">
        {prefix}{count}{suffix}
      </div>
      <div className="mt-2 text-sm font-medium uppercase tracking-widest text-navy/50">
        {label}
      </div>
    </motion.div>
  );
}
```

### 4.3 Glassmorphism Card Component

Premium glass-effect cards for the services section or team profiles.

```tsx
// src/components/GlassCard.tsx
import { motion } from "framer-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverGlow?: boolean;
  glowColor?: string;
}

export default function GlassCard({
  children,
  className = "",
  hoverGlow = true,
  glowColor = "rgba(201, 168, 76, 0.15)",
}: GlassCardProps) {
  return (
    <motion.div
      className={`
        relative overflow-hidden rounded-2xl
        border border-white/15
        bg-white/[0.06]
        backdrop-blur-xl
        shadow-[0_8px_32px_rgba(0,0,0,0.12)]
        transition-all duration-500
        ${hoverGlow ? "hover:border-gold/30 hover:shadow-[0_8px_40px_rgba(201,168,76,0.1)]" : ""}
        ${className}
      `}
      whileHover={hoverGlow ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      {/* Gradient shine overlay */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}, transparent 40%)`,
        }}
      />
      {children}
    </motion.div>
  );
}
```

```css
/* Glassmorphism utility classes for index.css */

.glass {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.glass-light {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.glass-dark {
  background: rgba(0, 0, 64, 0.4);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

### 4.4 Scroll-Linked Parallax Molecules

Floating molecular structures that move at different speeds during scroll, creating depth.

```tsx
// src/components/FloatingMolecules.tsx
import { motion, useScroll, useTransform } from "framer-motion";

interface Molecule {
  x: string;
  y: string;
  size: number;
  speed: number;
  color: string;
  bonds?: number;
}

const molecules: Molecule[] = [
  { x: "10%", y: "20%", size: 6, speed: 0.3, color: "var(--color-cyan)", bonds: 3 },
  { x: "85%", y: "15%", size: 4, speed: 0.5, color: "var(--color-gold)", bonds: 2 },
  { x: "70%", y: "60%", size: 8, speed: 0.2, color: "var(--color-violet)", bonds: 4 },
  { x: "20%", y: "75%", size: 5, speed: 0.4, color: "var(--color-cyan)", bonds: 2 },
  { x: "50%", y: "40%", size: 3, speed: 0.6, color: "var(--color-gold)", bonds: 1 },
];

export default function FloatingMolecules({ className = "" }: { className?: string }) {
  const { scrollYProgress } = useScroll();

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {molecules.map((mol, i) => {
        const y = useTransform(scrollYProgress, [0, 1], [0, -200 * mol.speed]);
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: mol.x,
              top: mol.y,
              width: mol.size,
              height: mol.size,
              background: mol.color,
              boxShadow: `0 0 ${mol.size * 3}px ${mol.color}`,
              opacity: 0.3,
              y,
            }}
          />
        );
      })}
    </div>
  );
}
```

### 4.5 Text Reveal with Chemical Formula Effect

A typewriter-style text reveal that makes headings appear as if being typed on a lab terminal.

```tsx
// src/components/ScienceHeading.tsx
import { motion } from "framer-motion";

interface ScienceHeadingProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3";
}

export default function ScienceHeading({ text, className = "", tag = "h2" }: ScienceHeadingProps) {
  const Tag = motion[tag];

  return (
    <Tag
      className={`relative inline-block ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 8 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.03, delay: i * 0.025 },
            },
          }}
        >
          {char}
        </motion.span>
      ))}
      {/* Blinking cursor */}
      <motion.span
        className="ml-1 inline-block h-[1em] w-[2px] bg-gold align-middle"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: 3 }}
      />
    </Tag>
  );
}
```

---

## 5. Iconography

### Recommended Icon Mapping

The project already uses `react-icons`. Here is a mapping of science-relevant icons to each concept:

```tsx
import {
  // Research & Discovery
  FaMicroscope,     // Research, lab work
  FaFlask,          // Experiments, R&D
  FaAtom,           // Science, fundamental research
  FaDna,            // Biotech, genetics
  FaVial,           // Testing, experimentation

  // Innovation & Technology
  FaLightbulb,      // Ideas, innovation
  FaRocket,         // Launch, acceleration
  FaCogs,           // Process, engineering
  FaMicrochip,      // Technology
  FaProjectDiagram, // Systems, networks

  // Data & Analysis
  FaChartLine,      // Growth, trends
  FaChartBar,       // Statistics, metrics
  FaDatabase,       // Data, storage
  FaSearchPlus,     // Discovery, analysis

  // Education & Tutoring
  FaGraduationCap,  // Academic, education
  FaBook,           // Knowledge, learning
  FaChalkboardTeacher, // Teaching, tutoring
  FaBrain,          // Intelligence, understanding
  FaUserGraduate,   // Students

  // Consulting & Strategy
  FaHandshake,      // Partnerships
  FaCompass,        // Direction, strategy
  FaBullseye,       // Goals, precision
  FaGlobe,          // Global reach (Beirut + Paris)
  FaRoute,          // Roadmap, methodology
} from "react-icons/fa";

import {
  // Additional science icons from different icon sets
  HiBeaker,         // Lab work
  HiAcademicCap,    // Education
  HiSparkles,       // Innovation
  HiGlobeAlt,       // International
} from "react-icons/hi2";
```

### Custom SVG Icons to Create

For unique brand identity, create these custom SVG components:

1. **Molecular Bond** -- Two circles connected by a line (represents connection/consulting)
2. **Erlenmeyer Flask with Lightbulb** -- Fusion of science + ideas (represents R&D)
3. **Book with Atom** -- Open book with atomic symbol (represents tutoring)
4. **Beirut-Paris Bridge** -- Abstract bridge/connection between two points (represents dual location)

---

## 6. Page-by-Page Recommendations

### 6.1 Home Page

**Hero Section**:
- Replace simple floating particles with the `MolecularNetwork` component (tsParticles with linking lines)
- Keep the rotating taglines but add a subtle waveform animation behind the text
- Add a faint scientific graph-paper grid overlay (already partially exists, enhance it)
- Consider adding the DNA helix as a vertical decorative element on the left or right edge

**About Section**:
- Add an animated statistics bar: "150+ Projects | 500+ Students Tutored | 12 Countries | 2 Offices"
- Use the `AnimatedCounter` component triggered on scroll
- Background: subtle hexagonal molecular pattern

**Services Section**:
- Upgrade cards to `GlassCard` components on a navy background
- Add the `OrbitalDiagram` as a visual centerpiece showing how the three services interconnect
- Each service card should have a unique accent color (R&D = cyan, Tutoring = emerald, Consulting = gold)

**Process Section**:
- Redesign as a horizontal "experiment pipeline" with numbered steps connected by animated lines (use `drawLine` variant)
- Steps: Discover > Analyze > Strategize > Implement > Measure
- Each step node pulses with `pulseGlow` animation when scrolled into view

**Testimonials Section**:
- Add a subtle DNA helix background on one side
- Glass-card styling for testimonial quotes

**Contact Section**:
- Dual-column layout: form on left, map/location info on right
- Highlight Beirut and Paris with a minimalist world map connecting the two cities
- Use glassmorphism for the form container on a navy background

### 6.2 Research & Development Page

**Hero Enhancement**:
- Add animated molecular visualization in the background (three.js or tsParticles with complex config)
- A floating periodic-table-style badge showing element abbreviation "Rd" as a branding element
- Graph paper grid background

**Content Sections**:
- "Research Areas" -- Display as a periodic table grid where each area is a "element card"
- "Methodology" -- Show as a scientific method flowchart (Hypothesis > Experiment > Analysis > Conclusion)
- "Publications" -- Styled like academic journal citations
- "Lab Capabilities" -- Visual grid with icons and glassmorphism cards

**New Section -- "Our Scientific Method"**:
```
1. OBSERVE    -->  2. HYPOTHESIZE  -->  3. EXPERIMENT  -->  4. ANALYZE  -->  5. CONCLUDE
   [icon]            [icon]              [icon]              [icon]           [icon]
```
Animate the arrows drawing themselves as the user scrolls.

### 6.3 Tutoring Services Page

**Hero Enhancement**:
- Chalkboard-inspired dark section with handwritten-style equations floating in the background
- Animated atomic model orbiting near the headline

**Content Sections**:
- "Subjects" -- Display as a chemistry periodic table layout
- "Our Approach" -- Visual learning pathway with milestone nodes
- "Student Success" -- Animated counters showing improvement metrics
- "Study Resources" -- Card grid with glassmorphism, each card showing a subject icon

### 6.4 Careers Page

- Background: constellation-style particle network (sparse, abstract)
- "Open Positions" as research-lab-styled cards
- Timeline of company growth on the left side

### 6.5 Invest Page

- Data visualization focus: charts, growth metrics
- Glass cards for investment highlights
- Scientific color accents (cyan for data, gold for returns)

---

## 7. Content Strategy

### 7.1 Sections Every Science Consulting Site Needs

Based on analysis of top science consulting firms:

| Section | Purpose | Priority |
|---------|---------|----------|
| Hero + Value Prop | Immediate credibility | Critical |
| Services Overview | What you do | Critical |
| Methodology / Process | How you work | High |
| Case Studies | Proof of results | High |
| Team / Expertise | Trust building | High |
| Publications / Insights | Thought leadership | Medium |
| Impact Numbers | Quick credibility | Medium |
| Client Logos / Partnerships | Social proof | Medium |
| FAQ | Address objections | Low |
| Newsletter / Blog | Ongoing engagement | Low |

### 7.2 Case Study Format

Each case study should follow this structure:

```
CASE STUDY: [Client Name / Industry]
------------------------------------
THE CHALLENGE
  [2-3 sentences on the problem]

OUR APPROACH
  [Methodology used, timeline, team size]

THE RESULTS
  [3-4 quantified outcomes with metrics]
  - 47% improvement in X
  - $2.3M saved through Y
  - 3x faster time-to-market

TECHNOLOGIES / METHODS USED
  [Tags: Machine Learning, Statistical Analysis, etc.]
```

### 7.3 Recommended Content Pieces

**For R&D**:
- "Our Research Methodology" -- detailed page explaining the scientific rigor
- White papers / research summaries (PDF downloads)
- Research areas taxonomy with descriptions
- Partnership/collaboration model explanation

**For Tutoring**:
- Subject catalog with curriculum outlines
- "Meet Our Tutors" profiles with academic credentials
- Student testimonial videos or quotes
- Study methodology description ("The GCG Learning Framework")
- Before/after metrics visualization

**For Consulting**:
- Industry expertise areas
- Engagement models (project-based, retainer, advisory)
- Case study library filterable by industry/service
- Thought leadership blog
- "Our Process" detailed breakdown

### 7.4 Bilingual Considerations (Beirut + Paris)

- Implement language toggle (EN/FR, optionally AR)
- Use `react-i18next` for internationalization
- RTL support for Arabic if needed
- Date/number formatting per locale
- Consider a "Where We Work" map section connecting Beirut and Paris

---

## 8. Typography Enhancements

### Scientific Typography Suggestions

The current Inter font is clean but generic. Consider:

```css
/* Option A: Keep Inter but add a scientific display font */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');

@theme {
  --font-heading: 'Space Grotesk', system-ui, sans-serif;  /* Geometric, techy */
  --font-sans: 'Inter', system-ui, sans-serif;              /* Clean body text */
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;   /* For data/code snippets */
}
```

```css
/* Option B: More premium, academic feel */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

@theme {
  --font-heading: 'Plus Jakarta Sans', system-ui, sans-serif;
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;
}
```

### Monospace Accents for Science Feel

Use monospace font for:
- Section labels/tags (e.g., "// SERVICES", "01. RESEARCH")
- Data points and statistics
- Code-like decorative elements
- Process step numbers

```tsx
// Example usage
<span className="font-mono text-xs uppercase tracking-widest text-gold/60">
  // Research & Development
</span>
```

---

## 9. Competitive Reference Sites

### Science/R&D Consulting Firms to Study

| Company | URL | What to Note |
|---------|-----|--------------|
| IDEO | ideo.com | Innovation storytelling, case study format, bold imagery |
| McKinsey (Science practice) | mckinsey.com | Clean data visualization, authority, white paper layout |
| BCG Henderson Institute | bcghendersoninstitute.com | Research publication layout, academic credibility |
| Kepler Consulting | kepler-consulting.com | Innovation case studies, methodology focus |
| Design Science | dscience.com | Human factors approach, scientific method branding |
| Contra Agency (science) | contra.agency | Science-specific web design, molecular imagery |
| Exponent (science consulting) | exponent.com | Technical expertise display, team credentials |
| Lux Research | luxresearchinc.com | Data-driven visuals, innovation forecasting |
| RAND Corporation | rand.org | Research publications, policy research layout |
| Kaber Technologies | kaber.com | Innovation consulting, product-to-market storytelling |

### Design Pattern Takeaways

1. **Dark hero with animated background** -- Almost universal. Navy/black with particle or abstract animation.
2. **Prominently displayed metrics** -- "500+ clients", "30 countries", etc. Always animated on scroll.
3. **Case study grid** -- Filterable by industry/service. Card-based layouts.
4. **Team as credibility** -- PhD credentials, university affiliations shown prominently.
5. **Clean section transitions** -- Generous whitespace, subtle dividers.
6. **CTA at every fold** -- Every major section ends with a consultation booking prompt.
7. **Thought leadership** -- Blog/insights section with featured articles.
8. **Dual-tone design** -- Alternating between dark (navy/charcoal) and light (white/cream) sections.

---

## 10. Implementation Priority

### Phase 1 -- Foundation (Week 1)

1. Add science color tokens to `index.css` (@theme block expansion)
2. Create `src/lib/animations.ts` with shared Framer Motion variants
3. Add glassmorphism utility CSS classes
4. Add graph-paper background CSS classes
5. Install `@tsparticles/react` and `@tsparticles/slim`

### Phase 2 -- Hero & First Impression (Week 2)

1. Build `MolecularNetwork` component and integrate into Hero
2. Enhance the existing hex molecular pattern with subtle animation
3. Add `WaveDivider` components between sections
4. Upgrade `HexMolecularPattern` with animated nodes
5. Consider adding Space Grotesk or Plus Jakarta Sans as heading font

### Phase 3 -- Section Upgrades (Week 3)

1. Build `AnimatedCounter` and create an "Impact Numbers" section
2. Build `GlassCard` and upgrade Services section cards
3. Build `OrbitalDiagram` for How We Work / Process section
4. Add `DNAHelix` as a decorative element on R&D page
5. Add monospace section labels throughout

### Phase 4 -- Content & Pages (Week 4)

1. Add case study section with proper structure
2. Add publications / insights section
3. Add team profiles with academic credentials
4. Build out the Research & Development page with periodic-table-style grid
5. Enhance Tutoring page with subject catalog and learning framework

### Phase 5 -- Polish & Bilingual (Week 5+)

1. Add language toggle (EN/FR)
2. Refine all animations for performance
3. Ensure reduced-motion preferences are respected everywhere
4. Mobile optimization pass for all new components
5. Lighthouse performance audit and optimization

---

## Appendix A: NPM Packages to Consider

```json
{
  "dependencies": {
    "@tsparticles/react": "^3.x",
    "@tsparticles/slim": "^3.x",
    "react-countup": "^6.x",
    "react-intersection-observer": "^9.x",
    "react-i18next": "^15.x",
    "i18next": "^24.x"
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.x"
  }
}
```

## Appendix B: Performance Guidelines

- **Particle count**: Keep below 80 particles on desktop, 30 on mobile
- **Glassmorphism**: Limit to 3-5 glass elements per viewport
- **Animations**: Always gate behind `prefers-reduced-motion` check
- **Fonts**: Use `font-display: swap` and preload critical fonts
- **Images**: Use WebP/AVIF with lazy loading for team photos and case study images
- **Bundle**: tsParticles slim bundle is ~30KB gzipped, acceptable for the visual impact

## Appendix C: CSS Custom Properties Quick Reference

```css
/* Full token system for easy theming */
:root {
  /* Core */
  --color-navy: #000040;
  --color-gold: #c9a84c;
  --color-cream: #faf8f5;

  /* Science accents */
  --color-cyan: #00b4d8;
  --color-emerald: #2dc653;
  --color-violet: #7b2cbf;
  --color-coral: #ff6b6b;

  /* Semantic */
  --color-research: var(--color-cyan);
  --color-education: var(--color-emerald);
  --color-consulting: var(--color-gold);
  --color-innovation: var(--color-violet);

  /* Surfaces */
  --surface-glass: rgba(255, 255, 255, 0.06);
  --surface-glass-border: rgba(255, 255, 255, 0.12);
  --surface-glass-hover: rgba(255, 255, 255, 0.1);
}
```
