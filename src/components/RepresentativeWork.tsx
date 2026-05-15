import type { ReactElement } from 'react'
import { useRef } from 'react'

import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { FaArrowRight, FaAtom, FaChartBar, FaClipboardCheck, FaFlask } from 'react-icons/fa'
import type { IconType } from 'react-icons'

import { containerVariants, cardVariants } from '@shared/animations'
import { ROUTES } from '@shared/constants/routes'
import ScienceBackdrop from './ScienceBackdrop'
import SectionHeading from './SectionHeading'

interface Engagement {
  title: string
  domain: string
  question: string
  methods: string[]
  deliverable: string
  href: string
  isRoute?: boolean
  icon: IconType
}

const ENGAGEMENTS: Engagement[] = [
  {
    title: 'Evidence Map For Strategic Expansion',
    domain: 'Consulting',
    question:
      'Which growth path has the strongest evidence, lowest operational friction, and clearest measurement plan?',
    methods: ['Market signal review', 'Risk scoring', 'Operating model map'],
    deliverable:
      'A ranked decision matrix with milestones, assumptions, and indicators to monitor before scaling.',
    href: '#contact',
    icon: FaChartBar,
  },
  {
    title: 'Applied R&D Translation Sprint',
    domain: 'Research And Development',
    question:
      'How should a promising hypothesis move from literature and lab assumptions into a testable applied roadmap?',
    methods: ['Literature scan', 'Protocol critique', 'Commercial path framing'],
    deliverable:
      'A reproducible experimental outline, data-readiness checklist, and translation sequence.',
    href: ROUTES.RESEARCH,
    isRoute: true,
    icon: FaFlask,
  },
  {
    title: 'STEM Learning Diagnostic Loop',
    domain: 'Tutoring',
    question:
      'Where is the learner losing conceptual fluency, and which feedback loop will make the next session measurable?',
    methods: ['Baseline diagnostic', 'Misconception map', 'Spaced recall plan'],
    deliverable:
      'A tutoring path that pairs core concepts with practice cadence, reflection, and progress checkpoints.',
    href: ROUTES.TUTORING,
    isRoute: true,
    icon: FaAtom,
  },
]

function EngagementCard({ engagement }: { engagement: Engagement }): ReactElement {
  const Icon = engagement.icon
  const action = (
    <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-gold">
      Explore path
      <FaArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
    </span>
  )

  const content = (
    <>
      <div className="flex items-center justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
          <Icon className="h-5 w-5" />
        </div>
        <p className="rounded-full border border-gold/20 bg-gold/[0.06] px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-gold">
          {engagement.domain}
        </p>
      </div>

      <h3 className="mt-7 text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
        {engagement.title}
      </h3>
      <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
        Question
      </p>
      <p className="mt-2 text-base leading-relaxed text-[var(--color-text-primary)]">
        {engagement.question}
      </p>

      <div className="mt-6 grid gap-3">
        {engagement.methods.map((method) => (
          <div
            key={method}
            className="flex items-center gap-3 rounded-xl border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)]/70 px-3 py-2 text-sm text-[var(--color-text-secondary)]"
          >
            <FaClipboardCheck className="h-3.5 w-3.5 shrink-0 text-gold" />
            <span>{method}</span>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--color-text-secondary)]">
        Deliverable
      </p>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-secondary)]">
        {engagement.deliverable}
      </p>
      {action}
    </>
  )

  const className =
    'science-card group block h-full rounded-2xl border border-[var(--color-border-light)] bg-[var(--color-bg-primary)] p-7 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-gold/35 hover:shadow-lg hover:shadow-gold/[0.08]'

  if (engagement.isRoute) {
    return (
      <Link
        to={engagement.href}
        className={className}
        data-umami-event={`engagement-${engagement.domain.toLowerCase().replace(/\s+/g, '-')}`}
      >
        {content}
      </Link>
    )
  }

  return (
    <a
      href={engagement.href}
      className={className}
      data-umami-event={`engagement-${engagement.domain.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {content}
    </a>
  )
}

function RepresentativeWork(): ReactElement {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--color-bg-secondary)] py-28 md:py-36"
    >
      <ScienceBackdrop variant="light" density="rich" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-12">
        <motion.div
          className="mb-14 text-center"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <SectionHeading
            badge="Representative Work"
            title="What An Engagement"
            highlight="Can Look Like"
            subtitle="Each model shows how GCG frames questions, methods, and deliverables before work begins."
            variant="light"
          />
        </motion.div>

        <motion.div
          className="grid gap-6 lg:grid-cols-3"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {ENGAGEMENTS.map((engagement) => (
            <motion.div key={engagement.title} variants={cardVariants}>
              <EngagementCard engagement={engagement} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default RepresentativeWork
