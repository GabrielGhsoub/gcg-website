import type { ReactElement } from 'react'
import { useRef } from 'react'

import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import {
  FaDna,
  FaFlask,
  FaMicroscope,
  FaLaptopCode,
  FaLeaf,
  FaAtom,
  FaChartLine,
  FaSearch,
  FaBookOpen,
} from 'react-icons/fa'

import PageTransition from '@components/PageTransition'
import ScienceBackdrop from '@components/ScienceBackdrop'
import { ROUTES } from '@shared/constants/routes'
import { useSEO } from '@shared/hooks'

const RESEARCH_AREAS = [
  {
    icon: FaDna,
    title: 'Biotechnology & Life Sciences',
    description:
      'Exploring molecular biology, genomics, and bioinformatics to advance our understanding of living systems and develop novel therapeutic approaches.',
  },
  {
    icon: FaAtom,
    title: 'Materials Science & Engineering',
    description:
      'Investigating advanced materials, nanoscale structures, and composite systems to engineer solutions with superior mechanical, thermal, and electrical properties.',
  },
  {
    icon: FaLaptopCode,
    title: 'Data Science & AI',
    description:
      'Applying machine learning, statistical modeling, and computational intelligence to extract insights from complex datasets and automate analytical workflows.',
  },
  {
    icon: FaLeaf,
    title: 'Environmental Science',
    description:
      'Studying ecosystems, climate dynamics, and sustainability metrics to develop evidence-based strategies for environmental conservation and resource management.',
  },
]

const METHODOLOGY_STEPS = [
  {
    icon: FaSearch,
    title: 'Discovery',
    description: 'Literature review and landscape analysis to identify gaps and opportunities.',
  },
  {
    icon: FaFlask,
    title: 'Hypothesis',
    description: 'Formulating testable propositions grounded in existing evidence.',
  },
  {
    icon: FaMicroscope,
    title: 'Experimentation',
    description: 'Controlled testing with rigorous protocols and reproducible methodology.',
  },
  {
    icon: FaChartLine,
    title: 'Analysis',
    description: 'Statistical evaluation and interpretation of experimental data.',
  },
  {
    icon: FaAtom,
    title: 'Innovation',
    description: 'Translating validated findings into practical applications and solutions.',
  },
]

const DELIVERY_OUTPUTS = [
  'Literature and landscape review',
  'Hypothesis and variable map',
  'Protocol critique and reproducibility checklist',
  'Data-readiness and analysis plan',
  'Translation and commercialization options',
  'Milestone sequence for the next decision',
]

const EVIDENCE_OUTPUTS = [
  {
    title: 'Research Brief',
    description: 'A concise synthesis of what is known, uncertain, and worth testing next.',
  },
  {
    title: 'Protocol Review',
    description:
      'A practical critique of methods, controls, measurement, and reproducibility risks.',
  },
  {
    title: 'Translation Roadmap',
    description: 'A staged path from evidence to application, partnership, or further validation.',
  },
]

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

function ResearchDevelopment(): ReactElement {
  useSEO({
    title: 'Research & Development | Ghoussoub Consulting Group',
    description:
      "GCG's R&D team supports biotechnology, materials science, AI, and environmental research through rigorous experimental methods.",
    canonicalPath: ROUTES.RESEARCH,
  })

  const areasRef = useRef<HTMLDivElement>(null)
  const areasInView = useInView(areasRef, { once: true, margin: '-80px' })

  const methodologyRef = useRef<HTMLDivElement>(null)
  const methodologyInView = useInView(methodologyRef, { once: true, margin: '-80px' })

  const labRef = useRef<HTMLDivElement>(null)
  const labInView = useInView(labRef, { once: true, margin: '-80px' })

  const pubRef = useRef<HTMLDivElement>(null)
  const pubInView = useInView(pubRef, { once: true, margin: '-80px' })

  return (
    <PageTransition>
      {/* Hero */}
      <section className="theme-inverse relative flex min-h-[60vh] items-center justify-center overflow-hidden">
        <ScienceBackdrop variant="dark" density="rich" />
        {/* Laboratory background pattern */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(169,130,43,0.10)_0%,transparent_56%)]" />
          {/* Hex grid dots */}
          <div className="absolute left-[10%] top-[18%] h-2 w-2 rounded-full bg-gold/12" />
          <div className="absolute left-[18%] top-[30%] h-2.5 w-2.5 rounded-full bg-gold/10" />
          <div className="absolute right-[15%] top-[22%] h-3 w-3 rounded-full bg-gold/15" />
          <div className="absolute right-[25%] bottom-[28%] h-2 w-2 rounded-full bg-gold/10" />
          <div className="absolute left-[35%] bottom-[20%] h-2.5 w-2.5 rounded-full bg-gold/12" />
          <div className="absolute right-[40%] top-[40%] h-2 w-2 rounded-full bg-gold/10" />
          {/* Bond lines */}
          <div className="absolute left-[11%] top-[20%] h-[1px] w-24 rotate-[30deg] bg-gradient-to-r from-gold/12 to-transparent" />
          <div className="absolute right-[17%] top-[24%] h-[1px] w-20 -rotate-[25deg] bg-gradient-to-r from-gold/10 to-transparent" />
          <div className="absolute left-[36%] bottom-[22%] h-[1px] w-16 rotate-[15deg] bg-gradient-to-r from-gold/10 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 py-32 text-center sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaFlask className="h-8 w-8 text-gold" />
          </motion.div>
          <motion.h1
            className="text-4xl font-bold text-[var(--text-inverse)] md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Research &{' '}
            <span className="bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
              Development
            </span>
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-base text-[var(--text-inverse-muted)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Advancing knowledge through rigorous scientific inquiry, interdisciplinary
            collaboration, and methodical experimentation
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
              data-umami-event="research-hero-discuss"
            >
              Discuss an R&D Project
            </Link>
            <a
              href="#methodology"
              className="inline-flex items-center rounded-full border border-[var(--border-inverse)] px-8 py-3 text-base font-semibold text-[var(--text-inverse)] transition-colors hover:border-gold hover:text-gold"
              data-umami-event="research-hero-methodology"
            >
              See Methodology
            </a>
          </motion.div>
        </div>
      </section>

      {/* Research Areas */}
      <section ref={areasRef} className="bg-[var(--color-bg-secondary)] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial="hidden"
            animate={areasInView ? 'visible' : 'hidden'}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold text-[var(--color-text-primary)] md:text-5xl">
              Research Areas
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--color-text-secondary)]">
              Our interdisciplinary research spans four core domains, each grounded in empirical
              methodology and oriented toward real-world application.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {RESEARCH_AREAS.map((area, i) => (
              <motion.div
                key={area.title}
                className="rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-bg-primary)] p-8 shadow-sm transition-shadow hover:shadow-md"
                initial={{ opacity: 0, y: 30 }}
                animate={areasInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <area.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                  {area.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-[var(--color-text-secondary)]">
                  {area.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* R&D Methodology */}
      <section id="methodology" ref={methodologyRef} className="bg-[var(--color-bg-primary)] py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial="hidden"
            animate={methodologyInView ? 'visible' : 'hidden'}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold text-[var(--color-text-primary)] md:text-5xl">
              Our R&D Methodology
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--color-text-secondary)]">
              A systematic pipeline from initial inquiry through validated innovation.
            </p>
          </motion.div>

          {/* Desktop horizontal flow */}
          <div className="mt-16 hidden md:block">
            <div className="relative grid grid-cols-5 gap-4">
              {/* Connecting line */}
              <motion.div
                className="absolute left-[10%] right-[10%] top-[2.5rem] h-[2px] origin-left bg-gradient-to-r from-gold/50 via-gold/30 to-gold/50"
                initial={{ scaleX: 0 }}
                animate={methodologyInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              />

              {METHODOLOGY_STEPS.map((step, i) => (
                <motion.div
                  key={step.title}
                  className="relative z-10 flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={methodologyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="mb-4 flex h-[5rem] w-[5rem] items-center justify-center rounded-full border-2 border-gold/30 bg-[var(--color-bg-secondary)]">
                    <step.icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="mb-1 text-base font-semibold text-[var(--color-text-primary)]">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile vertical flow */}
          <div className="mt-14 md:hidden">
            <div className="relative space-y-8">
              {/* Vertical connecting line */}
              <motion.div
                className="absolute bottom-0 left-[1.75rem] top-0 w-[2px] origin-top bg-gradient-to-b from-gold/50 via-gold/30 to-gold/50"
                initial={{ scaleY: 0 }}
                animate={methodologyInView ? { scaleY: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              />

              {METHODOLOGY_STEPS.map((step, i) => (
                <motion.div
                  key={step.title}
                  className="relative flex gap-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={methodologyInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-gold/30 bg-[var(--color-bg-secondary)]">
                    <step.icon className="h-5 w-5 text-gold" />
                  </div>
                  <div className="pt-2">
                    <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Outputs */}
      <section ref={labRef} className="bg-[var(--color-bg-secondary)] py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial="hidden"
            animate={labInView ? 'visible' : 'hidden'}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold text-[var(--color-text-primary)] md:text-5xl">
              Engagement Outputs
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--color-text-secondary)]">
              R&D support is packaged around practical artifacts that help teams decide what to
              test, improve, or translate next.
            </p>
          </motion.div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {DELIVERY_OUTPUTS.map((capability, i) => (
              <motion.div
                key={capability}
                className="flex items-start gap-3 rounded-xl border border-[var(--color-border-light)] bg-[var(--color-bg-primary)] p-5"
                initial={{ opacity: 0, y: 15 }}
                animate={labInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <FaMicroscope className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span className="text-base text-[var(--color-text-primary)]">{capability}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Evidence Outputs */}
      <section ref={pubRef} className="bg-[var(--color-bg-primary)] py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial="hidden"
            animate={pubInView ? 'visible' : 'hidden'}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold text-[var(--color-text-primary)] md:text-5xl">
              Evidence Artifacts
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-[var(--color-text-secondary)]">
              Outputs are designed to make assumptions, evidence strength, and next steps easier to
              inspect.
            </p>
          </motion.div>

          <div className="mt-12 space-y-6">
            {EVIDENCE_OUTPUTS.map((pub, i) => (
              <motion.div
                key={pub.title}
                className="rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={pubInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="mb-2 flex items-start gap-3">
                  <FaBookOpen className="mt-1 h-4 w-4 shrink-0 text-gold" />
                  <h3 className="text-base font-semibold leading-snug text-[var(--color-text-primary)]">
                    {pub.title}
                  </h3>
                </div>
                <p className="ml-7 text-sm text-[var(--color-text-secondary)]">{pub.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="theme-inverse py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-[var(--text-inverse)] md:text-5xl">
            Discuss Your Research Project
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-[var(--text-inverse-muted)]">
            Whether you are exploring a new hypothesis or scaling an existing study, our team is
            ready to collaborate.
          </p>
          <Link
            to={`${ROUTES.HOME}#contact`}
            className="mt-8 inline-flex items-center rounded-full bg-gold px-8 py-3 text-base font-semibold text-navy shadow-lg shadow-gold/20 transition-colors hover:bg-gold-light"
            data-umami-event="research-bottom-discuss"
          >
            Discuss Your Research Project
          </Link>
        </div>
      </section>
    </PageTransition>
  )
}

export default ResearchDevelopment
