import type { ReactElement } from 'react'
import { useRef } from 'react'

import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import {
  FaAtom,
  FaFlask,
  FaDna,
  FaMicroscope,
  FaCalculator,
  FaLaptopCode,
  FaCogs,
  FaClipboardCheck,
} from 'react-icons/fa'

import PageTransition from '@components/PageTransition'
import ScienceBackdrop from '@components/ScienceBackdrop'
import { ROUTES } from '@shared/constants/routes'
import { useSEO } from '@shared/hooks'

const SUBJECTS = [
  {
    icon: FaCalculator,
    title: 'Mathematics',
    description:
      'From algebra and calculus to statistics and discrete mathematics, building strong analytical foundations.',
  },
  {
    icon: FaAtom,
    title: 'Physics',
    description:
      'Classical mechanics, electromagnetism, quantum physics, and thermodynamics with hands-on problem solving.',
  },
  {
    icon: FaFlask,
    title: 'Chemistry',
    description:
      'Organic, inorganic, and physical chemistry with emphasis on molecular reasoning and lab technique.',
  },
  {
    icon: FaDna,
    title: 'Biology',
    description:
      'Cell biology, genetics, ecology, and human physiology taught through systems-level understanding.',
  },
  {
    icon: FaLaptopCode,
    title: 'Computer Science',
    description:
      'Programming fundamentals, data structures, algorithms, and computational thinking for all levels.',
  },
  {
    icon: FaCogs,
    title: 'Engineering',
    description:
      'Mechanical, electrical, and civil engineering principles with applied problem-solving methodology.',
  },
]

const METHODOLOGY = [
  {
    title: 'Diagnostic Assessment',
    description:
      "We begin with a thorough evaluation of each student's current knowledge, identifying specific gaps and strengths through evidence-based diagnostic tools.",
  },
  {
    title: 'Structured Curriculum Design',
    description:
      'Based on assessment data, we construct a personalized learning pathway that sequences concepts for optimal retention and comprehension.',
  },
  {
    title: 'Active Recall & Spaced Repetition',
    description:
      'Our sessions employ proven cognitive science techniques, using active recall testing and spaced repetition to maximize long-term memory formation.',
  },
  {
    title: 'Iterative Feedback Loops',
    description:
      "Regular performance checkpoints allow us to refine the approach, ensuring continuous improvement and adapting to each student's evolving needs.",
  },
]

const STATS = [
  { value: '6', label: 'STEM Areas' },
  { value: '4', label: 'Learning Loops' },
  { value: '1', label: 'Personal Plan' },
]

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

function TutoringServices(): ReactElement {
  useSEO({
    title: 'Science Tutoring Services | Ghoussoub Consulting Group',
    description:
      'Evidence-based STEM tutoring in mathematics, physics, chemistry, biology, computer science, and engineering.',
    canonicalPath: ROUTES.TUTORING,
  })

  const subjectsRef = useRef<HTMLDivElement>(null)
  const subjectsInView = useInView(subjectsRef, { once: true, margin: '-80px' })

  const methodologyRef = useRef<HTMLDivElement>(null)
  const methodologyInView = useInView(methodologyRef, { once: true, margin: '-80px' })

  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' })

  const testimonialRef = useRef<HTMLDivElement>(null)
  const testimonialInView = useInView(testimonialRef, { once: true, margin: '-80px' })

  return (
    <PageTransition>
      {/* Hero */}
      <section className="theme-inverse relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <ScienceBackdrop variant="dark" density="rich" />
        {/* Molecular background pattern */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(169,130,43,0.10)_0%,transparent_56%)]" />
          {/* Subtle molecule nodes */}
          <div className="absolute left-[15%] top-[20%] h-3 w-3 rounded-full bg-gold/15" />
          <div className="absolute left-[22%] top-[35%] h-2 w-2 rounded-full bg-gold/10" />
          <div className="absolute right-[20%] top-[25%] h-2.5 w-2.5 rounded-full bg-gold/12" />
          <div className="absolute right-[30%] bottom-[30%] h-3 w-3 rounded-full bg-gold/10" />
          <div className="absolute left-[40%] bottom-[25%] h-2 w-2 rounded-full bg-gold/15" />
          {/* Connecting lines */}
          <div className="absolute left-[16%] top-[22%] h-[1px] w-20 rotate-[35deg] bg-gradient-to-r from-gold/15 to-transparent" />
          <div className="absolute right-[22%] top-[27%] h-[1px] w-16 -rotate-[20deg] bg-gradient-to-r from-gold/12 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 py-32 text-center sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaMicroscope className="h-8 w-8 text-gold" />
          </motion.div>
          <motion.h1
            className="text-4xl font-bold text-[var(--text-inverse)] md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Science Tutoring{' '}
            <span className="bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
              Services
            </span>
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-base text-[var(--text-inverse-muted)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Evidence-based instruction across the sciences, engineered to build deep understanding
            and lasting academic confidence
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <Link
              to={`${ROUTES.HOME}#contact`}
              className="inline-flex items-center rounded-full bg-gold px-8 py-3 text-base font-semibold text-navy shadow-lg shadow-gold/20 transition-colors hover:bg-gold-light"
              data-umami-event="tutoring-hero-plan"
            >
              Plan Tutoring
            </Link>
            <a
              href="#methodology"
              className="inline-flex items-center rounded-full border border-[var(--border-inverse)] px-8 py-3 text-base font-semibold text-[var(--text-inverse)] transition-colors hover:border-gold hover:text-gold"
              data-umami-event="tutoring-hero-methodology"
            >
              See Methodology
            </a>
          </motion.div>
        </div>
      </section>

      {/* Subjects Covered */}
      <section ref={subjectsRef} className="bg-[var(--color-bg-secondary)] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial="hidden"
            animate={subjectsInView ? 'visible' : 'hidden'}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold text-[var(--color-text-primary)] md:text-5xl">
              Subjects We Cover
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--color-text-secondary)]">
              Comprehensive tutoring across core STEM disciplines, delivered by subject-matter
              specialists with research backgrounds.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SUBJECTS.map((subject, i) => (
              <motion.div
                key={subject.title}
                className="rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-bg-primary)] p-8 shadow-sm transition-shadow hover:shadow-md"
                initial={{ opacity: 0, y: 30 }}
                animate={subjectsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <subject.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                  {subject.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-[var(--color-text-secondary)]">
                  {subject.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
      <section id="methodology" ref={methodologyRef} className="bg-[var(--color-bg-primary)] py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial="hidden"
            animate={methodologyInView ? 'visible' : 'hidden'}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold text-[var(--color-text-primary)] md:text-5xl">
              Our Scientific Approach to Learning
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--color-text-secondary)]">
              Every tutoring program is built on cognitive science research, applying the same rigor
              to teaching that we bring to the subjects themselves.
            </p>
          </motion.div>

          <div className="mt-14 space-y-6">
            {METHODOLOGY.map((item, i) => (
              <motion.div
                key={item.title}
                className="flex gap-4 rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={methodologyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/10 text-sm font-bold text-gold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-base leading-relaxed text-[var(--color-text-secondary)]">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="theme-inverse py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="text-4xl font-extrabold text-gold md:text-5xl">{stat.value}</div>
                <div className="mt-2 text-base text-[var(--text-inverse-muted)]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Standard */}
      <section ref={testimonialRef} className="bg-[var(--color-bg-secondary)] py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-bg-primary)] p-8 text-center shadow-sm md:p-12"
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <FaClipboardCheck className="mx-auto mb-6 h-8 w-8 text-gold/60" />
            <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
              Tutoring Built Around Evidence
            </h2>
            <p className="text-base leading-relaxed text-[var(--color-text-primary)] md:text-lg">
              Every plan starts with a baseline, identifies the concepts causing friction, and turns
              each session into a feedback loop that can be adjusted as the learner progresses.
            </p>
            <div className="mt-6">
              <p className="font-semibold text-[var(--color-text-primary)]">Diagnostic baseline</p>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Concept repair, recall cadence, and progress checks
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="theme-inverse py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-[var(--text-inverse)] md:text-5xl">
            Book a Free Session
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[var(--text-inverse-muted)]">
            Schedule an introductory consultation to discuss your academic goals and build a
            personalized study plan.
          </p>
          <Link
            to={`${ROUTES.HOME}#contact`}
            className="mt-8 inline-flex items-center rounded-full bg-gold px-8 py-3 text-base font-semibold text-navy shadow-lg shadow-gold/20 transition-colors hover:bg-gold-light"
            data-umami-event="tutoring-bottom-plan"
          >
            Book a Free Session
          </Link>
        </div>
      </section>
    </PageTransition>
  )
}

export default TutoringServices
