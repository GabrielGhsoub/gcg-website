import type { ReactElement } from 'react'
import { useRef } from 'react'

import { motion, useInView } from 'framer-motion'
import {
  FaBalanceScale,
  FaBookOpen,
  FaChartLine,
  FaLock,
  FaMicroscope,
  FaUniversalAccess,
} from 'react-icons/fa'
import type { IconType } from 'react-icons'

import { containerVariants, cardVariants } from '@shared/animations'
import ScienceBackdrop from './ScienceBackdrop'
import SectionHeading from './SectionHeading'

interface Standard {
  title: string
  description: string
  icon: IconType
}

const CAPABILITIES: Standard[] = [
  {
    title: 'Experimental Thinking',
    description:
      'Problems are framed as hypotheses, variables, constraints, and measurable outcomes before a solution is presented.',
    icon: FaMicroscope,
  },
  {
    title: 'Quantitative Judgment',
    description:
      'Recommendations are weighted by evidence quality, uncertainty, timing, and the cost of being wrong.',
    icon: FaChartLine,
  },
  {
    title: 'Clear Translation',
    description:
      'Technical work is converted into language decision-makers, students, and partners can act on without losing rigor.',
    icon: FaBookOpen,
  },
  {
    title: 'Ethical Boundaries',
    description:
      'Sensitive data, research assumptions, tutoring needs, and investment conversations are handled with explicit scope and care.',
    icon: FaBalanceScale,
  },
]

const TRUST_SIGNALS: Standard[] = [
  {
    title: 'Privacy-Aware Analytics',
    description:
      'Traffic measurement is wired through Umami, a privacy-focused analytics option that can run without cookies or cross-site tracking.',
    icon: FaLock,
  },
  {
    title: 'Accessible By Default',
    description:
      'Pages are designed with keyboard access, visible focus states, responsive layouts, and reduced-motion support.',
    icon: FaUniversalAccess,
  },
  {
    title: 'Evidence Before Claims',
    description:
      'Representative examples are separated from approved client outcomes so the public site remains credible as the company grows.',
    icon: FaMicroscope,
  },
]

function StandardCard({ item }: { item: Standard }): ReactElement {
  const Icon = item.icon

  return (
    <motion.div
      variants={cardVariants}
      className="group rounded-2xl border border-[var(--border-inverse)] bg-[var(--surface-inverse-panel)] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-gold/30 hover:bg-[var(--surface-control-hover)]"
    >
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-gold/20 bg-gold/10 text-gold">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-xl font-bold tracking-tight text-[var(--text-inverse)]">{item.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-[var(--text-inverse-muted)]">
        {item.description}
      </p>
    </motion.div>
  )
}

function ExpertiseStandards(): ReactElement {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section ref={sectionRef} className="theme-inverse relative overflow-hidden py-28 md:py-36">
      <ScienceBackdrop variant="dark" density="rich" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-12">
        <motion.div
          className="mb-14 text-center"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <SectionHeading
            badge="Credibility Layer"
            title="Expertise With"
            highlight="Standards"
            subtitle="Every engagement should make the evidence, assumptions, boundaries, and next decisions easier to inspect."
          />
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {CAPABILITIES.map((item) => (
            <StandardCard key={item.title} item={item} />
          ))}
        </motion.div>

        <motion.div
          className="mt-8 grid gap-4 rounded-2xl border border-[var(--border-inverse)] bg-[var(--surface-inverse-panel)] p-5 backdrop-blur-sm md:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.2 }}
        >
          {TRUST_SIGNALS.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="flex gap-4">
                <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[var(--text-inverse)]">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--text-inverse-muted)]">
                    {item.description}
                  </p>
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default ExpertiseStandards
