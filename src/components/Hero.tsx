import type { ReactElement } from 'react'
import { useState, useEffect, useMemo, useRef } from 'react'

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const taglines = [
  {
    subline: 'Evidence maps for organizations, research teams, students, and partners.',
  },
  {
    subline: 'From hypothesis to roadmap, with assumptions made visible.',
  },
  {
    subline: 'Consulting, R&D, and tutoring shaped by scientific discipline.',
  },
]

const HERO_HEADLINE = 'Science-driven consulting, R&D, and STEM tutoring'
const CYCLE_INTERVAL_MS = 5000
const NODE_COUNT = 18
const BOND_DISTANCE = 220 // px – max distance to draw a bond between nodes
const SEEDED_POINTS = [
  [8, 18],
  [18, 32],
  [28, 21],
  [38, 36],
  [48, 19],
  [58, 31],
  [70, 22],
  [82, 38],
  [92, 18],
  [12, 68],
  [24, 56],
  [34, 73],
  [46, 61],
  [56, 78],
  [68, 58],
  [80, 72],
  [90, 62],
  [16, 46],
  [32, 44],
  [50, 48],
  [66, 42],
  [74, 84],
  [88, 88],
  [7, 86],
  [42, 88],
  [61, 12],
  [76, 10],
  [96, 48],
] as const

const prefersReducedMotion =
  typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MolecularNode {
  id: number
  x: number // % of viewport
  y: number
  radius: number // px – visual size of the atom
  ringRadius: number // outer electron ring
  duration: number // drift animation duration (s)
  delay: number
  opacity: number
  isNucleus: boolean // larger, brighter nodes
  color: 'cyan' | 'gold' | 'blue'
  driftX: number
  driftY: number
}

interface Bond {
  from: number
  to: number
}

// ---------------------------------------------------------------------------
// Molecular Network Generation
// ---------------------------------------------------------------------------

function generateNodes(count: number): MolecularNode[] {
  const colors: Array<MolecularNode['color']> = ['cyan', 'cyan', 'cyan', 'blue', 'blue', 'gold']
  return Array.from({ length: count }, (_, i) => {
    const isNucleus = i % 7 === 0 // ~every 7th node is a large nucleus
    const [baseX, baseY] = SEEDED_POINTS[i % SEEDED_POINTS.length]
    const seed = (i + 1) * 0.137
    return {
      id: i,
      x: baseX,
      y: baseY,
      radius: isNucleus ? 5 + (i % 3) : 2 + (i % 4) * 0.45,
      ringRadius: isNucleus ? 12 + (i % 4) : 7 + (i % 3),
      duration: 20 + (i % 9) * 2.4,
      delay: -1 * (i % 8) * 1.7,
      opacity: isNucleus ? 0.24 : 0.08 + (i % 5) * 0.025,
      isNucleus,
      color: colors[i % colors.length],
      driftX: Math.sin(seed * 11) * 1.2,
      driftY: Math.cos(seed * 7) * 1.2,
    }
  })
}

function generateBonds(nodes: MolecularNode[]): Bond[] {
  const bonds: Bond[] = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = (nodes[i].x - nodes[j].x) * 0.01 * 1920
      const dy = (nodes[i].y - nodes[j].y) * 0.01 * 1080
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < BOND_DISTANCE) {
        bonds.push({ from: i, to: j })
      }
    }
  }
  return bonds
}

// ---------------------------------------------------------------------------
// Color helpers
// ---------------------------------------------------------------------------

function nodeColor(color: MolecularNode['color'], alpha: number): string {
  switch (color) {
    case 'cyan':
      return `rgba(0, 210, 230, ${alpha})`
    case 'gold':
      return `rgba(201, 168, 76, ${alpha})`
    case 'blue':
      return `rgba(60, 130, 246, ${alpha})`
  }
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** SVG molecular network – atoms + bonds */
function MolecularNetwork({ nodes, bonds }: { nodes: MolecularNode[]; bonds: Bond[] }) {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* Bonds (thin lines between nearby atoms) */}
      {bonds.map((b, i) => {
        const a = nodes[b.from]
        const z = nodes[b.to]
        return (
          <line
            key={`bond-${i}`}
            x1={a.x}
            y1={a.y}
            x2={z.x}
            y2={z.y}
            stroke="rgba(0, 210, 230, 0.06)"
            strokeWidth={0.06}
          />
        )
      })}

      {/* Atom nodes */}
      {nodes.map((n) => (
        <motion.g
          key={n.id}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  x: [0, n.driftX, 0],
                  y: [0, n.driftY, 0],
                  opacity: [0.75, 1, 0.75],
                }
          }
          transition={{
            duration: n.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: n.delay,
          }}
        >
          {/* Electron ring */}
          <circle
            cx={n.x}
            cy={n.y}
            r={n.ringRadius * 0.06}
            fill="none"
            stroke={nodeColor(n.color, n.opacity * 0.4)}
            strokeWidth={0.03}
          />
          {/* Atom core */}
          <circle cx={n.x} cy={n.y} r={n.radius * 0.04} fill={nodeColor(n.color, n.opacity)} />
          {/* Glow for nucleus nodes */}
          {n.isNucleus && (
            <circle cx={n.x} cy={n.y} r={n.radius * 0.12} fill={nodeColor(n.color, 0.03)} />
          )}
        </motion.g>
      ))}
    </svg>
  )
}

/** DNA double-helix SVG background element */
function DNAHelix() {
  // Build two sinusoidal strands with cross-rungs
  const points = 60
  const height = 600
  const cx = 50
  const amplitude = 18

  let strand1 = ''
  let strand2 = ''
  const rungs: Array<{ x1: number; y1: number; x2: number; y2: number }> = []

  for (let i = 0; i <= points; i++) {
    const t = i / points
    const y = t * height
    const phase = t * Math.PI * 4 // 2 full twists
    const x1 = cx + Math.sin(phase) * amplitude
    const x2 = cx + Math.sin(phase + Math.PI) * amplitude

    strand1 += `${i === 0 ? 'M' : 'L'} ${x1} ${y}`
    strand2 += `${i === 0 ? 'M' : 'L'} ${x2} ${y}`

    // Rungs every ~5 points
    if (i % 5 === 0 && i > 0 && i < points) {
      rungs.push({ x1, y1: y, x2, y2: y })
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
      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
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
  )
}

/** Large, quiet orbital field behind the hero copy. */
function HeroOrbitSystem() {
  const orbitTransition = {
    duration: 34,
    repeat: Infinity,
    ease: 'linear' as const,
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <motion.div
        className="relative opacity-60"
        style={{
          width: 'min(82vw, 42rem)',
          height: 'min(82vw, 42rem)',
        }}
        animate={prefersReducedMotion ? {} : { rotate: 360 }}
        transition={orbitTransition}
      >
        {[0, 1, 2].map((ring) => (
          <motion.div
            key={ring}
            className="absolute inset-0 rounded-full border border-[var(--hero-grid-line)]"
            style={{
              transform: `scale(${1 - ring * 0.16}) rotate(${ring * 22}deg)`,
              borderStyle: ring === 1 ? 'dashed' : 'solid',
            }}
            animate={prefersReducedMotion ? {} : { rotate: ring % 2 ? -360 : 360 }}
            transition={{
              duration: 46 + ring * 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}

        {[12, 36, 64, 84].map((top, i) => (
          <motion.span
            key={top}
            className="absolute h-2 w-2 rounded-full bg-gold/45 shadow-[0_0_18px_rgba(169,130,43,0.25)]"
            style={{
              top: `${top}%`,
              left: `${[22, 78, 16, 68][i]}%`,
            }}
            animate={
              prefersReducedMotion ? {} : { scale: [0.8, 1.25, 0.8], opacity: [0.35, 0.8, 0.35] }
            }
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
        ))}
      </motion.div>

      <div className="absolute left-4 top-28 hidden h-64 w-px bg-gradient-to-b from-transparent via-gold/20 to-transparent md:block" />
      <div className="absolute right-4 bottom-24 hidden h-72 w-px bg-gradient-to-b from-transparent via-cyan-300/20 to-transparent md:block" />
    </div>
  )
}

/** Waveform / oscilloscope line at bottom of hero */
function WaveformLine() {
  const width = 1200
  const height = 60
  const midY = height / 2

  // Generate a composite sine wave path
  function buildWavePath(offset: number): string {
    let d = ''
    for (let x = 0; x <= width; x += 2) {
      const t = x / width
      const y =
        midY +
        Math.sin(t * Math.PI * 6 + offset) * 12 +
        Math.sin(t * Math.PI * 14 + offset * 1.5) * 4 +
        Math.sin(t * Math.PI * 22 + offset * 0.7) * 2
      d += `${x === 0 ? 'M' : 'L'} ${x} ${y.toFixed(2)}`
    }
    return d
  }

  const wavePath = buildWavePath(0)

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
          animate={prefersReducedMotion ? {} : { translateX: [0, -200] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        {/* Secondary faint waveform */}
        <motion.path
          d={buildWavePath(2)}
          fill="none"
          stroke="rgba(201, 168, 76, 0.3)"
          strokeWidth="0.8"
          animate={prefersReducedMotion ? {} : { translateX: [0, -150] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </motion.svg>
    </div>
  )
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
  )
}

/** Subline fade transition */
function SublineText({
  text,
  className,
  style,
}: {
  text: string
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <motion.p
      className={className}
      style={style}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {text}
    </motion.p>
  )
}

// ---------------------------------------------------------------------------
// Main Hero Component
// ---------------------------------------------------------------------------

export default function Hero(): ReactElement {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  // Memoized molecular network
  const nodes = useMemo(() => generateNodes(NODE_COUNT), [])
  const bonds = useMemo(() => generateBonds(nodes), [nodes])

  // Cycle taglines
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % taglines.length)
    }, CYCLE_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [])

  const current = taglines[activeIndex]

  // ---------- Scroll-driven parallax ----------
  const { scrollYProgress } = useScroll()

  const contentY = useTransform(scrollYProgress, [0, 0.14], [0, -80])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const bgScale = useTransform(scrollYProgress, [0, 0.14], [1, 1.05])

  return (
    <section
      ref={sectionRef}
      className="theme-inverse relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* ----------------------------------------------------------------- */}
      {/* Background layers (always dark navy)                               */}
      {/* ----------------------------------------------------------------- */}
      <motion.div className="absolute inset-0" style={{ scale: bgScale, willChange: 'transform' }}>
        {/* Base gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'var(--hero-gradient)',
          }}
        />
        {/* Teal/cyan glow -- top left */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 40% at 25% 30%, var(--hero-cyan-glow) 0%, transparent 70%)',
          }}
        />
        {/* Cyan glow -- center right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 40% 50% at 75% 55%, var(--hero-cyan-glow) 0%, transparent 70%)',
          }}
        />
        {/* Subtle gold glow -- center */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 35% 30% at 50% 45%, var(--hero-gold-glow) 0%, transparent 70%)',
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
              'linear-gradient(var(--hero-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--hero-grid-line) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Major grid lines every 5th */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(var(--hero-grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--hero-grid-line) 1px, transparent 1px)',
            backgroundSize: '200px 200px',
          }}
        />
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Molecular network – atoms & bonds                                 */}
      {/* ----------------------------------------------------------------- */}
      <HeroOrbitSystem />

      <motion.div className="absolute inset-0" aria-hidden="true">
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
          willChange: 'transform, opacity',
        }}
      >
        {/* Company name */}
        <motion.p
          className="mb-6 text-xs font-semibold tracking-[0.35em] uppercase md:text-sm"
          style={{ color: 'var(--color-gold)' }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          Ghoussoub Consulting Group
        </motion.p>

        <motion.h1
          className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-[var(--text-inverse)] sm:text-4xl md:text-5xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <FadeUpText text={HERO_HEADLINE} />
        </motion.h1>

        {/* Decorative divider – lab-flask style with dots */}
        <motion.div
          className="mx-auto my-6 flex items-center justify-center gap-2"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.7 }}
          transition={{ duration: 0.4 }}
        >
          <div className="h-[1px] w-8 bg-[rgba(0,210,230,0.4)]" />
          <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
          <div className="h-[1px] w-16 bg-[var(--color-gold)]" />
          <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
          <div className="h-[1px] w-8 bg-[rgba(0,210,230,0.4)]" />
        </motion.div>

        {/* ---- Rotating subline ---- */}
        <div className="relative min-h-[4rem] overflow-hidden sm:min-h-[2.5rem]">
          <AnimatePresence mode="wait">
            <SublineText
              key={`subline-${activeIndex}`}
              text={current.subline}
              className="absolute inset-x-0 text-base font-light tracking-wide text-[var(--text-inverse-muted)] sm:text-lg"
            />
          </AnimatePresence>
        </div>

        {/* Progress indicators */}
        <motion.div
          className="mt-10 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {taglines.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === activeIndex}
              className="group flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-full"
            >
              <span
                className="relative block h-2.5 overflow-hidden rounded-full bg-[var(--surface-control)] transition-all duration-300"
                style={{ width: i === activeIndex ? 40 : 16 }}
              >
                {i === activeIndex && (
                  <motion.span
                    className="absolute inset-y-0 left-0 rounded-full bg-[var(--color-gold)]"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{
                      duration: CYCLE_INTERVAL_MS / 1000,
                      ease: 'linear',
                    }}
                  />
                )}
              </span>
            </button>
          ))}
        </motion.div>

        {/* ---- CTA buttons (clean, no magnetic effect) ---- */}
        <motion.div
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <a
            href="#services"
            className="inline-flex items-center gap-2 rounded-full px-9 py-4 text-sm sm:text-base font-bold tracking-widest uppercase transition-all duration-300 hover:shadow-[0_0_30px_rgba(201,168,76,0.35)] hover:brightness-110"
            data-umami-event="hero-explore-services"
            style={{
              backgroundColor: 'var(--color-gold)',
              color: 'var(--color-navy)',
            }}
          >
            Explore Our Services
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-inverse)] px-9 py-4 text-sm font-bold uppercase tracking-widest text-[var(--text-inverse)] backdrop-blur-sm transition-all duration-300 sm:text-base"
            data-umami-event="hero-book-consultation"
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
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-[var(--text-inverse-muted)] transition-colors"
        data-umami-event="hero-scroll-about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        aria-label="Scroll to next section"
      >
        <span className="text-[10px] font-light tracking-[0.25em] uppercase">Scroll</span>
        <div className="relative h-10 w-[1.5px] overflow-hidden rounded-full bg-[var(--surface-control)]">
          <motion.div
            className="absolute top-0 left-0 w-full rounded-full"
            style={{ backgroundColor: 'var(--color-gold)' }}
            animate={{ height: ['0%', '100%'], top: ['0%', '0%'] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </motion.a>
    </section>
  )
}
