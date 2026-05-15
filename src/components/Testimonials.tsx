import type { ReactElement } from 'react'
import { useRef } from 'react'

import { motion, useInView } from 'framer-motion'
import { FaBalanceScale, FaChartLine, FaClipboardCheck, FaFlask } from 'react-icons/fa'
import type { IconType } from 'react-icons'

import { containerVariants, cardVariants } from '@shared/animations'
import ScienceBackdrop from './ScienceBackdrop'
import SectionHeading from './SectionHeading'

interface ValidationSignal {
  title: string
  domain: string
  description: string
  checks: string[]
  icon: IconType
}

const VALIDATION_SIGNALS: ValidationSignal[] = [
  {
    title: 'Evidence Quality',
    domain: 'Research',
    description:
      'Before a recommendation is treated as strong, the source quality, reproducibility, and uncertainty are made explicit.',
    checks: ['Source strength', 'Assumption log', 'Confidence range'],
    icon: FaFlask,
  },
  {
    title: 'Decision Readiness',
    domain: 'Consulting',
    description:
      'Strategic options are compared against risk, timing, cost, and the operational reality of implementation.',
    checks: ['Option scoring', 'Risk review', 'Milestone plan'],
    icon: FaChartLine,
  },
  {
    title: 'Learning Transfer',
    domain: 'Tutoring',
    description:
      'Student progress is framed around durable understanding, not short-term memorization or vague confidence.',
    checks: ['Diagnostic baseline', 'Recall cadence', 'Concept repair'],
    icon: FaClipboardCheck,
  },
  {
    title: 'Ethical Boundaries',
    domain: 'Trust',
    description:
      'Claims, privacy, student needs, research context, and investment conversations stay within a clear, documented scope.',
    checks: ['Scope clarity', 'Data care', 'Claim discipline'],
    icon: FaBalanceScale,
  },
]

function ValidationCard({ signal }: { signal: ValidationSignal }): ReactElement {
  const Icon = signal.icon

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative flex h-full flex-col rounded-2xl border border-[var(--border-inverse)] bg-[var(--surface-inverse-panel)] p-7 backdrop-blur-sm transition-colors duration-300 hover:border-gold/25 hover:bg-[var(--surface-control-hover)]"
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/20 bg-gold/10 text-gold">
          <Icon className="h-5 w-5" />
        </div>
        <span className="rounded-full border border-gold/20 bg-gold/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-gold">
          {signal.domain}
        </span>
      </div>

      <h3 className="text-xl font-bold tracking-tight text-[var(--text-inverse)]">
        {signal.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--text-inverse-muted)]">
        {signal.description}
      </p>

      <div className="mt-6 grid gap-2">
        {signal.checks.map((check) => (
          <div
            key={check}
            className="flex items-center gap-3 rounded-xl border border-[var(--border-inverse)] bg-[var(--surface-inverse-panel)] px-3 py-2 text-sm text-[var(--text-inverse-muted)]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            <span>{check}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

function Testimonials(): ReactElement {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section ref={sectionRef} className="theme-inverse relative overflow-hidden py-28 md:py-36">
      <ScienceBackdrop variant="dark" density="calm" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-12">
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <SectionHeading
            badge="Validation Signals"
            title="Trust Starts With"
            highlight="Proof Discipline"
            subtitle="Claims are strongest when evidence, limits, and next decisions are easy to inspect."
          />
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {VALIDATION_SIGNALS.map((signal) => (
            <ValidationCard key={signal.title} signal={signal} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
