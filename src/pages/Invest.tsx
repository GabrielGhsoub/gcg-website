import type { ReactElement } from 'react'
import { useRef } from 'react'

import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { FaFlask, FaDna, FaRobot, FaSolarPanel, FaGraduationCap } from 'react-icons/fa'

import PageTransition from '@components/PageTransition'
import ScienceBackdrop from '@components/ScienceBackdrop'
import { CONTACT_EMAIL } from '@shared/constants/contact-info'
import { ROUTES } from '@shared/constants/routes'
import { useSEO } from '@shared/hooks'

const FOCUS_AREAS = [
  {
    icon: FaDna,
    title: 'Biotech & Life Sciences',
    description:
      'Early-stage biotech research with high growth potential, from drug discovery to genomics and personalized medicine.',
  },
  {
    icon: FaRobot,
    title: 'AI & Data Science',
    description:
      'Machine learning and data-driven innovation powering breakthroughs in predictive analytics, automation, and intelligent systems.',
  },
  {
    icon: FaSolarPanel,
    title: 'Clean Energy & Sustainability',
    description:
      'Green technology and environmental solutions tackling climate challenges through next-generation energy and materials research.',
  },
  {
    icon: FaGraduationCap,
    title: 'Educational Technology',
    description:
      'Next-gen learning platforms and scientific education tools that democratize access to knowledge and accelerate skill development.',
  },
]

const METRICS = [
  { value: '4', label: 'Focus Domains' },
  { value: '3', label: 'Diligence Lenses' },
  { value: '1', label: 'Decision Roadmap' },
]

function Invest(): ReactElement {
  useSEO({
    title: 'Invest | Ghoussoub Consulting Group',
    description:
      "Explore GCG's science-driven investment focus across biotech, AI, clean energy, and educational technology.",
    canonicalPath: ROUTES.INVEST,
  })

  const focusRef = useRef<HTMLDivElement>(null)
  const focusInView = useInView(focusRef, { once: true, margin: '-80px' })

  const whyRef = useRef<HTMLDivElement>(null)
  const whyInView = useInView(whyRef, { once: true, margin: '-80px' })

  const metricsRef = useRef<HTMLDivElement>(null)
  const metricsInView = useInView(metricsRef, { once: true, margin: '-80px' })

  return (
    <PageTransition>
      {/* Hero */}
      <section className="theme-inverse relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <ScienceBackdrop variant="dark" density="rich" />
        {/* Molecular / hexagonal pattern */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(169,130,43,0.10)_0%,transparent_56%)]" />
          <svg
            className="absolute inset-0 h-full w-full opacity-[0.04]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="hex-pattern"
                width="56"
                height="100"
                patternUnits="userSpaceOnUse"
                patternTransform="scale(1.5)"
              >
                <path
                  d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100"
                  fill="none"
                  stroke="#c9a84c"
                  strokeWidth="0.8"
                />
                <path
                  d="M28 0L56 16L56 50L28 66L0 50L0 16Z"
                  fill="none"
                  stroke="#c9a84c"
                  strokeWidth="0.8"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hex-pattern)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 py-32 text-center sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaFlask className="h-6 w-6 text-gold" />
          </motion.div>
          <motion.h1
            className="text-4xl font-bold text-[var(--text-inverse)] md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Invest in{' '}
            <span className="bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
              Scientific Innovation
            </span>
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-base text-[var(--text-inverse-muted)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Review scientific opportunities through evidence quality, technical risk, and practical
            translation paths.
          </motion.p>
        </div>
      </section>

      {/* Investment Focus Areas */}
      <section ref={focusRef} className="bg-[var(--color-bg-secondary)] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={focusInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
              Investment Focus Areas
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--color-text-secondary)]">
              We channel capital into high-impact scientific domains where rigorous research meets
              transformative commercial potential.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {FOCUS_AREAS.map((area, i) => (
              <motion.div
                key={area.title}
                className="rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-bg-primary)] p-8 shadow-sm transition-shadow hover:shadow-md"
                initial={{ opacity: 0, y: 30 }}
                animate={focusInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <area.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                  {area.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  {area.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Invest - Science-Backed Returns */}
      <section ref={whyRef} className="bg-[var(--color-bg-primary)] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={whyInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-[var(--color-text-primary)] sm:text-4xl">
                Science-Backed Diligence
              </h2>
              <p className="mt-6 text-base leading-relaxed text-[var(--color-text-secondary)]">
                GCG's investment lens is designed to translate research signals into practical
                diligence questions. We examine the evidence, technical assumptions, timing, and
                path to application before a partnership conversation moves forward.
              </p>
              <p className="mt-4 text-base leading-relaxed text-[var(--color-text-secondary)]">
                The goal is not hype. It is a clearer view of the opportunity, what still needs to
                be validated, and which milestones would make the next decision credible.
              </p>
            </motion.div>

            {/* Metrics */}
            <motion.div
              ref={metricsRef}
              className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1"
              initial={{ opacity: 0, y: 20 }}
              animate={metricsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {METRICS.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-6 text-center lg:text-left"
                >
                  <p className="text-3xl font-bold text-gold">{metric.value}</p>
                  <p className="mt-1 text-sm font-medium text-[var(--color-text-secondary)]">
                    {metric.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="theme-inverse relative overflow-hidden py-20">
        {/* Subtle hex pattern */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <svg
            className="absolute inset-0 h-full w-full opacity-[0.03]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="hex-cta"
                width="56"
                height="100"
                patternUnits="userSpaceOnUse"
                patternTransform="scale(1.5)"
              >
                <path
                  d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100"
                  fill="none"
                  stroke="#c9a84c"
                  strokeWidth="0.8"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hex-cta)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-[var(--text-inverse)] sm:text-4xl">
            Schedule an Investment Discussion
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[var(--text-inverse-muted)]">
            Use the first conversation to map evidence, risk, and the next diligence step.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/#contact"
              className="inline-flex items-center rounded-full bg-gold px-8 py-3 text-base font-semibold text-navy shadow-lg shadow-gold/20 transition-colors hover:bg-gold-light"
            >
              Schedule a Discussion
            </Link>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              aria-label={`Email ${CONTACT_EMAIL}`}
              className="inline-flex max-w-full items-center rounded-full border border-[var(--border-inverse)] px-8 py-3 text-base font-semibold text-[var(--text-inverse)] transition-colors hover:border-gold hover:text-gold"
            >
              <span className="break-all">{CONTACT_EMAIL}</span>
            </a>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}

export default Invest
