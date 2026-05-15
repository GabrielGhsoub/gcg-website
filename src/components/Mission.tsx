import type { ReactElement } from 'react'
import { useRef, useEffect, useState } from 'react'

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
  animate,
} from 'framer-motion'
import { FaFlask, FaShieldAlt, FaLeaf, FaAward, FaQuoteLeft } from 'react-icons/fa'

import { containerVariants, fadeUp } from '@shared/animations'
import ScienceBackdrop from './ScienceBackdrop'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Pillar {
  icon: React.ReactNode
  label: string
  description: string
  details: string
}

const PILLARS: Pillar[] = [
  {
    icon: <FaFlask className="h-5 w-5" />,
    label: 'Innovation',
    description: 'Hypothesis-led work before big claims',
    details:
      'Ideas are framed as questions, variables, constraints, and evidence gaps before they become recommendations.',
  },
  {
    icon: <FaShieldAlt className="h-5 w-5" />,
    label: 'Integrity',
    description: 'Transparent and ethical in every interaction',
    details:
      'Every decision is guided by honesty and accountability. We build trust through open communication and unwavering principles.',
  },
  {
    icon: <FaLeaf className="h-5 w-5" />,
    label: 'Sustainability',
    description: 'Decisions that can hold up over time',
    details:
      'We favor systems, learning plans, and research paths that can be maintained, measured, and improved.',
  },
  {
    icon: <FaAward className="h-5 w-5" />,
    label: 'Excellence',
    description: 'Relentless pursuit of the highest standards',
    details:
      'Quality comes from clear methods: diagnostic baselines, evidence maps, option scoring, and review loops.',
  },
]

interface Metric {
  value: number
  suffix: string
  label: string
}

const METRICS: Metric[] = [
  { value: 4, suffix: '', label: 'Operating Pillars' },
  { value: 3, suffix: '', label: 'Service Paths' },
  { value: 2, suffix: '', label: 'Location Hubs' },
  { value: 1, suffix: '', label: 'Evidence Standard' },
]

const MARQUEE_VALUES = ['Innovation', 'Integrity', 'Sustainability', 'Excellence']

const ORBIT_LABELS = [
  { label: 'Consulting', className: 'left-4 top-[18%]' },
  { label: 'R&D', className: 'right-2 top-1/2' },
  { label: 'Tutoring', className: 'bottom-[16%] left-[18%]' },
] as const

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const fadeLeft = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

const pillarVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

/** Animated counter that counts up from 0 to `target` when in view. */
function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const motionVal = useMotionValue(0)
  const springVal = useSpring(motionVal, { stiffness: 60, damping: 20 })
  const [display, setDisplay] = useState('0')
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  useEffect(() => {
    if (!inView) return
    const controls = animate(motionVal, target, {
      duration: 2,
      ease: 'easeOut',
    })
    return controls.stop
  }, [inView, motionVal, target])

  useEffect(() => {
    const unsubscribe = springVal.on('change', (v) => setDisplay(Math.round(v).toString()))
    return unsubscribe
  }, [springVal])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

/**
 * Marquee-style auto-scrolling banner of the 4 core values.
 * Duplicates the array several times for a seamless infinite loop.
 */
function ValueMarquee({ active }: { active: boolean }) {
  const icons: Record<string, React.ReactNode> = {
    Innovation: <FaFlask className="h-3.5 w-3.5" />,
    Integrity: <FaShieldAlt className="h-3.5 w-3.5" />,
    Sustainability: <FaLeaf className="h-3.5 w-3.5" />,
    Excellence: <FaAward className="h-3.5 w-3.5" />,
  }

  // Repeat enough times so that the strip is wider than any viewport
  const repeated = [
    ...MARQUEE_VALUES,
    ...MARQUEE_VALUES,
    ...MARQUEE_VALUES,
    ...MARQUEE_VALUES,
    ...MARQUEE_VALUES,
    ...MARQUEE_VALUES,
  ]

  return (
    <div className="relative w-full overflow-hidden py-6" aria-hidden="true">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--surface-inverse)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--surface-inverse)] to-transparent" />

      <motion.div
        className="flex w-max gap-6"
        animate={active ? { x: ['0%', '-50%'] } : { x: '0%' }}
        transition={{
          x: {
            repeat: active ? Infinity : 0,
            repeatType: 'loop',
            duration: 45,
            ease: 'linear',
          },
        }}
      >
        {repeated.map((v, i) => (
          <span
            key={`${v}-${i}`}
            className="flex shrink-0 items-center gap-2 rounded-full border border-gold/20 bg-gold/[0.06] px-5 py-2 text-sm font-semibold tracking-wide text-gold/80 whitespace-nowrap"
          >
            {icons[v]}
            {v}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/** Highlighted text that animates a gold underline when scrolled into view. */
function HighlightWord({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <span ref={ref} className="relative inline-block">
      <span className="relative z-10">{children}</span>
      {/* Animated gold underline */}
      <motion.span
        className="absolute bottom-0 left-0 h-[3px] rounded-full bg-gradient-to-r from-gold to-gold-light"
        initial={{ width: '0%' }}
        animate={inView ? { width: '100%' } : { width: '0%' }}
        transition={{ duration: 0.8, ease: 'easeOut', delay }}
      />
      {/* Soft glow behind the underline */}
      <motion.span
        className="absolute -bottom-0.5 left-0 h-[6px] rounded-full bg-gold/20 blur-sm"
        initial={{ width: '0%' }}
        animate={inView ? { width: '100%' } : { width: '0%' }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: delay + 0.1 }}
      />
    </span>
  )
}

/** Stable value card. Details are preallocated to avoid hover reflow. */
function PillarCard({ pillar }: { pillar: Pillar }) {
  return (
    <motion.article
      variants={pillarVariant}
      className="science-card group relative min-h-[15.5rem] overflow-hidden rounded-xl border border-[var(--border-inverse)] bg-[var(--surface-inverse-panel)] p-5 backdrop-blur-sm transition-[border-color,background-color,transform] duration-200 hover:-translate-y-1 hover:border-gold/30 focus-within:border-gold/35"
    >
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gold/12 text-gold transition-colors duration-200 group-hover:bg-gold/20">
        {pillar.icon}
      </div>

      <h3 className="mb-1 text-base font-bold text-[var(--text-inverse)] transition-colors duration-200 group-hover:text-gold">
        {pillar.label}
      </h3>

      <p className="text-sm leading-snug text-[var(--text-inverse-muted)]">{pillar.description}</p>

      <div className="mt-3 border-t border-[var(--border-inverse)] pt-3 opacity-85 transition-[opacity,transform] duration-200 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="text-sm leading-relaxed text-[var(--text-inverse-muted)]">{pillar.details}</p>
      </div>
    </motion.article>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

function Mission(): ReactElement {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const sectionActive = useInView(sectionRef, { once: false, margin: '-15% 0px' })
  const reduceMotion = useReducedMotion()
  const runAmbientMotion = sectionActive && !reduceMotion

  return (
    <section
      ref={sectionRef}
      className="theme-inverse relative w-full overflow-hidden py-28 sm:py-36"
    >
      <ScienceBackdrop variant="dark" density="calm" />
      {/* ---- Parallax background layers ---- */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at top right, rgba(201,168,76,0.08) 0%, transparent 58%), radial-gradient(ellipse at bottom left, rgba(201,168,76,0.05) 0%, transparent 52%)',
        }}
      />

      {/* ---- Value Marquee Banner ---- */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ValueMarquee active={runAmbientMotion} />
      </div>

      {/* ---- Main grid ---- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative z-10 mx-auto mt-8 grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8"
      >
        {/* ---------- Left column -- text content ---------- */}
        <div>
          <motion.span
            variants={fadeUp}
            className="mb-3 inline-block rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-gold uppercase"
          >
            Our Purpose
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mb-6 text-4xl font-extrabold tracking-tight text-[var(--text-inverse)] sm:text-5xl lg:text-6xl"
          >
            Company{' '}
            <span className="bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
              Mission
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mb-10 max-w-xl text-lg leading-relaxed text-[var(--text-inverse-muted)] sm:text-xl"
          >
            At GCG, our mission is to <HighlightWord delay={0.2}>innovate</HighlightWord> and lead
            with <HighlightWord delay={0.4}>integrity</HighlightWord>, turning complex decisions
            into evidence that people can inspect and act on. We are committed to{' '}
            <HighlightWord delay={0.6}>sustainability</HighlightWord>,{' '}
            <HighlightWord delay={0.8}>excellence</HighlightWord>, and work that makes assumptions,
            risks, and next steps visible.
          </motion.p>

          {/* Pillar cards with hover reveal */}
          <motion.div variants={containerVariants} className="grid grid-cols-2 gap-3 sm:gap-4">
            {PILLARS.map((pillar) => (
              <PillarCard key={pillar.label} pillar={pillar} />
            ))}
          </motion.div>
        </div>

        {/* ---------- Right column -- orbital + metrics ---------- */}
        <motion.div
          variants={fadeLeft}
          className="relative flex flex-col items-center justify-center gap-12"
        >
          {/* ---- Orbital animation with 2 rings ---- */}
          <div className="relative aspect-square w-full max-w-md [perspective:900px]">
            {/* Outer rotating ring */}
            <motion.div
              animate={
                runAmbientMotion ? { rotateY: 360, rotateX: 15 } : { rotateY: 0, rotateX: 15 }
              }
              transition={{ duration: 90, repeat: runAmbientMotion ? Infinity : 0, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-gold/15 [transform-style:preserve-3d]"
            >
              {/* Orbiting dot with teal/cyan accent */}
              <div className="absolute -top-1.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#00d4aa]/60 shadow-[0_0_8px_2px_rgba(0,212,170,0.3)]" />
            </motion.div>

            {/* Inner rotating ring (counter-clockwise) */}
            <motion.div
              animate={
                runAmbientMotion ? { rotateY: -360, rotateX: -10 } : { rotateY: 0, rotateX: -10 }
              }
              transition={{ duration: 60, repeat: runAmbientMotion ? Infinity : 0, ease: 'linear' }}
              className="absolute inset-12 rounded-full border border-gold/10 sm:inset-16 [transform-style:preserve-3d]"
            >
              <div className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-gold/50 shadow-[0_0_6px_2px_rgba(201,168,76,0.25)]" />
              {/* Additional teal accent dot */}
              <div className="absolute -left-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#00d4aa]/50 shadow-[0_0_5px_1px_rgba(0,212,170,0.2)]" />
            </motion.div>

            {/* Center orb */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-28 w-28 rounded-full sm:h-36 sm:w-36">
                {/* Outer glow */}
                <div className="absolute -inset-4 rounded-full bg-[radial-gradient(circle,rgba(169,130,43,0.08)_0%,transparent_70%)]" />
                {/* Inner gradient orb */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/30 via-gold-light/15 to-transparent shadow-[inset_0_0_20px_rgba(201,168,76,0.2)]" />
                {/* Highlight */}
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[var(--surface-panel)] to-transparent" />
              </div>
            </div>

            {ORBIT_LABELS.map((item, index) => (
              <motion.div
                key={item.label}
                className={`absolute ${item.className} flex items-center gap-2 rounded-full border border-[var(--border-inverse)] bg-[var(--surface-inverse-panel)] px-3 py-1.5 text-xs font-semibold tracking-widest text-[var(--text-inverse-muted)] uppercase backdrop-blur-sm`}
                animate={
                  runAmbientMotion
                    ? { y: [0, -6, 0], opacity: [0.72, 1, 0.72] }
                    : { y: 0, opacity: 0.86 }
                }
                transition={{
                  duration: 5 + index,
                  repeat: runAmbientMotion ? Infinity : 0,
                  ease: 'easeInOut',
                  delay: index * 0.45,
                }}
              >
                <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_12px_rgba(201,168,76,0.65)]" />
                {item.label}
              </motion.div>
            ))}
          </div>

          {/* ---- Animated metrics ---- */}
          <motion.div
            variants={fadeUp}
            className="grid w-full max-w-md grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {METRICS.map((m) => (
              <div
                key={m.label}
                className="science-card flex flex-col items-center rounded-xl border border-[var(--border-inverse)] bg-[var(--surface-inverse-panel)] px-3 py-4 backdrop-blur-sm"
              >
                <span className="text-2xl font-extrabold text-gold sm:text-3xl">
                  <AnimatedCounter target={m.value} suffix={m.suffix} />
                </span>
                <span className="mt-1 text-center text-xs font-medium tracking-widest text-[var(--text-inverse-muted)] uppercase">
                  {m.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ---- Featured Quote Block ---- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative z-10 mx-auto mt-24 max-w-3xl px-6 text-center"
      >
        {/* Large decorative opening quote mark */}
        <FaQuoteLeft className="mx-auto mb-2 h-12 w-12 text-gold/20" />

        <blockquote className="text-xl leading-relaxed font-light text-[var(--text-inverse)] italic sm:text-2xl md:text-3xl">
          Our commitment to innovation drives everything we do.
        </blockquote>

        {/* Large decorative closing quote mark */}
        <div className="mt-2 flex justify-center">
          <FaQuoteLeft className="h-12 w-12 rotate-180 text-gold/20" />
        </div>

        {/* Attribution */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold/40" />
          <p className="text-sm font-semibold tracking-wider text-gold uppercase">GCG Leadership</p>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold/40" />
        </div>
      </motion.div>
    </section>
  )
}

export default Mission
