import type { ReactElement } from 'react'
import { useRef } from 'react'

import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { FaArrowRight, FaBuilding, FaChartLine, FaMicroscope, FaUserGraduate } from 'react-icons/fa'
import type { IconType } from 'react-icons'

import { containerVariants, cardVariants } from '@shared/animations'
import { ROUTES } from '@shared/constants/routes'
import ScienceBackdrop from './ScienceBackdrop'
import SectionHeading from './SectionHeading'

interface Pathway {
  title: string
  signal: string
  description: string
  proofPoints: string[]
  href: string
  isRoute?: boolean
  icon: IconType
  eventName: string
}

const PATHWAYS: Pathway[] = [
  {
    title: 'Organizations',
    signal: 'Strategy, operations, growth',
    description:
      'Turn uncertain business decisions into ranked options, evidence maps, and practical implementation roadmaps.',
    proofPoints: ['Decision audit', 'KPI map', 'Execution sprint'],
    href: '#services',
    icon: FaBuilding,
    eventName: 'path-organizations',
  },
  {
    title: 'Research Teams',
    signal: 'R&D design and translation',
    description:
      'Shape research questions, protocols, literature scans, and commercialization paths around reproducible methods.',
    proofPoints: ['Hypothesis map', 'Protocol review', 'Translation plan'],
    href: ROUTES.RESEARCH,
    isRoute: true,
    icon: FaMicroscope,
    eventName: 'path-research',
  },
  {
    title: 'Students And Families',
    signal: 'STEM mastery and exams',
    description:
      'Build durable understanding with diagnostic tutoring, spaced recall, and feedback loops that expose misconceptions early.',
    proofPoints: ['Diagnostic baseline', 'Learning plan', 'Progress checks'],
    href: ROUTES.TUTORING,
    isRoute: true,
    icon: FaUserGraduate,
    eventName: 'path-tutoring',
  },
  {
    title: 'Partners And Investors',
    signal: 'Scientific diligence',
    description:
      'Review technical claims, market assumptions, and venture paths with a clearer view of risk, evidence, and timing.',
    proofPoints: ['Risk register', 'Evidence review', 'Milestone lens'],
    href: ROUTES.INVEST,
    isRoute: true,
    icon: FaChartLine,
    eventName: 'path-investors',
  },
]

function SignalTrace(): ReactElement {
  return (
    <svg
      viewBox="0 0 120 42"
      className="h-10 w-28 text-[var(--science-diagram)] transition-colors group-hover:text-gold/50"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 28 C18 8 30 36 44 22 S70 14 82 26 S104 36 116 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeDasharray="4 5"
      />
      {[18, 44, 82, 116].map((cx, index) => (
        <circle key={cx} cx={cx} cy={[18, 22, 26, 12][index]} r="2.8" fill="currentColor" />
      ))}
    </svg>
  )
}

function PathwayCard({ pathway }: { pathway: Pathway }): ReactElement {
  const Icon = pathway.icon
  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
          <Icon className="h-5 w-5" />
        </div>
        <SignalTrace />
      </div>

      <p className="mt-7 text-xs font-bold uppercase tracking-[0.16em] text-gold">
        {pathway.signal}
      </p>
      <h3 className="mt-3 text-2xl font-bold tracking-tight text-[var(--color-text-primary)]">
        {pathway.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
        {pathway.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {pathway.proofPoints.map((item) => (
          <span
            key={item}
            className="rounded-full border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] px-3 py-1 text-xs font-semibold text-[var(--color-text-secondary)]"
          >
            {item}
          </span>
        ))}
      </div>

      <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-gold">
        Start here
        <FaArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
      </span>
    </>
  )

  const className =
    'group block h-full rounded-2xl border border-[var(--color-border-light)] bg-[var(--surface-panel-strong)] p-6 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-gold/35 hover:shadow-lg hover:shadow-gold/[0.08]'

  if (pathway.isRoute) {
    return (
      <Link to={pathway.href} className={className} data-umami-event={pathway.eventName}>
        {content}
      </Link>
    )
  }

  return (
    <a href={pathway.href} className={className} data-umami-event={pathway.eventName}>
      {content}
    </a>
  )
}

function Pathways(): ReactElement {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--color-bg-primary)] py-24 md:py-32"
    >
      <ScienceBackdrop variant="light" density="calm" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-12">
        <motion.div
          className="mb-14 text-center"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <SectionHeading
            badge="Choose Your Path"
            title="Find The Right"
            highlight="Entry Point"
            subtitle="Different goals need different evidence, timelines, and conversations. Start with the path that matches your role."
            variant="light"
          />
        </motion.div>

        <motion.div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {PATHWAYS.map((pathway) => (
            <motion.div key={pathway.title} variants={cardVariants}>
              <PathwayCard pathway={pathway} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Pathways
