import type { ReactElement } from 'react'
import { useRef } from 'react'

import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { FaHandshake, FaFlask, FaAtom, FaArrowRight } from 'react-icons/fa'
import type { IconType } from 'react-icons'

import { containerVariants, cardVariants } from '@shared/animations'
import { ROUTES } from '@shared/constants/routes'
import ScienceBackdrop from './ScienceBackdrop'
import SectionHeading from './SectionHeading'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Service {
  title: string
  description: string
  audience: string
  method: string
  outcome: string
  cta: string
  href: string
  icon: IconType
  featured?: boolean
  isRoute?: boolean
}

const services: Service[] = [
  {
    title: 'Consulting',
    description:
      'Scientific strategy for growth, operations, product, and technical decision-making.',
    audience: 'Leaders validating strategy, operations, market, or product decisions.',
    method: 'Discovery sprint, evidence map, option scoring, and practical roadmap.',
    outcome: 'Clear priorities, measurable next steps, and decision-ready recommendations.',
    cta: 'Start a Strategy Brief',
    href: '#contact',
    icon: FaHandshake,
    featured: true,
  },
  {
    title: 'Research And Development',
    description: 'Structured R&D support from hypothesis design to applied scientific translation.',
    audience: 'Labs, founders, and institutions turning hypotheses into validated programs.',
    method: 'Literature scan, experiment design, analysis, and translation planning.',
    outcome: 'Reproducible protocols, data interpretation, and commercialization options.',
    cta: 'Explore R&D',
    href: ROUTES.RESEARCH,
    isRoute: true,
    icon: FaFlask,
  },
  {
    title: 'Tutoring Services',
    description:
      'Evidence-based STEM tutoring built around diagnostics, recall, and feedback loops.',
    audience: 'Students who need deeper understanding, stronger grades, or exam readiness.',
    method: 'Diagnostic assessment, personalized curriculum, and spaced practice.',
    outcome: 'Better conceptual fluency, confidence, and durable study systems.',
    cta: 'Plan Tutoring',
    href: ROUTES.TUTORING,
    isRoute: true,
    icon: FaAtom,
  },
]

/* ------------------------------------------------------------------ */
/*  Animated gradient border wrapper                                   */
/* ------------------------------------------------------------------ */

function SimpleBorder({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`science-card relative rounded-2xl border border-[var(--color-border-light)] transition-colors duration-300 group-hover:border-gold/50 ${className} bg-[var(--color-bg-primary)] backdrop-blur-md`}
    >
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  3D Tilt card                                                       */
/* ------------------------------------------------------------------ */

interface TiltCardProps {
  children: React.ReactNode
  className?: string
}

function TiltCard({ children, className = '' }: TiltCardProps) {
  return (
    <div className={`relative transition-transform duration-200 hover:-translate-y-1 ${className}`}>
      {children}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Animated icon with pulse + hover intensify                         */
/* ------------------------------------------------------------------ */

function AnimatedIcon({ icon: Icon, featured }: { icon: IconType; featured?: boolean }) {
  return (
    <div
      className={`relative mb-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-gold to-gold/80 text-navy shadow-md shadow-gold/20 transition-transform duration-300 group-hover:scale-105 ${
        featured ? 'h-16 w-16' : 'h-14 w-14'
      }`}
    >
      <Icon className={featured ? 'h-7 w-7' : 'h-6 w-6'} />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Dot grid background pattern (CSS-based for performance)            */
/* ------------------------------------------------------------------ */

function HexMolecularPattern() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg
        className="absolute inset-0 h-full w-full text-[var(--science-diagram)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="hex-pattern"
            x="0"
            y="0"
            width="56"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            {/* Hexagon outline */}
            <polygon
              points="28,2 50,14 50,34 28,46 6,34 6,14"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.8"
            />
            {/* Node dots at vertices */}
            <circle cx="28" cy="2" r="1" fill="currentColor" />
            <circle cx="50" cy="14" r="1" fill="currentColor" />
            <circle cx="50" cy="34" r="1" fill="currentColor" />
            <circle cx="28" cy="46" r="1" fill="currentColor" />
            <circle cx="6" cy="34" r="1" fill="currentColor" />
            <circle cx="6" cy="14" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-pattern)" />
      </svg>
    </div>
  )
}

function ServiceSignalDiagram({ featured }: { featured?: boolean }) {
  return (
    <svg
      className={`pointer-events-none absolute right-5 bottom-5 text-[var(--science-diagram)] opacity-55 transition-opacity duration-300 group-hover:opacity-100 ${
        featured ? 'h-28 w-40' : 'h-20 w-28'
      }`}
      viewBox="0 0 160 100"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 70 C34 28 58 88 84 44 S126 22 152 58"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="5 8"
      />
      {[18, 68, 112, 146].map((cx, i) => (
        <circle key={cx} cx={cx} cy={[56, 64, 34, 54][i]} r="3" fill="currentColor" />
      ))}
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Service card component                                             */
/* ------------------------------------------------------------------ */

interface ServiceCardProps {
  service: Service
}

function ServiceCard({ service }: ServiceCardProps) {
  const actionClass =
    'group/link mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)] px-4 py-2 text-sm font-semibold text-[var(--color-text-primary)] transition-all duration-200 hover:border-gold hover:text-gold'

  const actionContent = (
    <>
      <span>{service.cta}</span>
      <FaArrowRight className="h-3 w-3 transition-transform duration-200 group-hover/link:translate-x-1" />
    </>
  )

  return (
    <motion.div
      variants={cardVariants}
      className={`group relative ${service.featured ? 'md:col-span-2 md:row-span-1' : ''}`}
      style={{ perspective: '800px' }}
    >
      <TiltCard className="h-full">
        <SimpleBorder>
          <div
            className={`relative overflow-hidden rounded-2xl p-8 ${
              service.featured ? 'md:p-10' : ''
            }`}
          >
            <ServiceSignalDiagram featured={service.featured} />

            <div className={service.featured ? 'md:flex md:items-start md:gap-8' : ''}>
              <div className={service.featured ? 'md:shrink-0' : ''}>
                <AnimatedIcon icon={service.icon} featured={service.featured} />
              </div>

              <div className="relative">
                <h3
                  className={`mb-3 font-bold tracking-tight text-[var(--color-text-primary)] ${
                    service.featured ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'
                  }`}
                >
                  {service.title}
                </h3>
                <p
                  className={`leading-relaxed text-[var(--color-text-secondary)] ${
                    service.featured ? 'text-base md:text-lg' : 'text-base'
                  }`}
                >
                  {service.description}
                </p>

                <div className={`mt-6 grid gap-3 ${service.featured ? 'md:grid-cols-3' : ''}`}>
                  {[
                    ['Who', service.audience],
                    ['Process', service.method],
                    ['Outcome', service.outcome],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-xl border border-[var(--color-border-light)] bg-[var(--color-bg-secondary)]/70 p-3"
                    >
                      <p className="text-[11px] font-bold uppercase tracking-wider text-gold">
                        {label}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>

                {service.isRoute ? (
                  <Link to={service.href} className={actionClass}>
                    {actionContent}
                  </Link>
                ) : (
                  <a href={service.href} className={actionClass}>
                    {actionContent}
                  </a>
                )}
              </div>
            </div>

            {/* Decorative bottom accent */}
            <div className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        </SimpleBorder>
      </TiltCard>
    </motion.div>
  )
}

/* ------------------------------------------------------------------ */
/*  Services section                                                   */
/* ------------------------------------------------------------------ */

function Services(): ReactElement {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--color-bg-secondary)] py-28 md:py-36"
    >
      <ScienceBackdrop variant="light" density="rich" />
      {/* Hexagonal molecular background */}
      <HexMolecularPattern />

      {/* Subtle background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(0,126,150,0.07)_0%,transparent_68%)]" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(169,130,43,0.07)_0%,transparent_68%)]" />
        <div className="absolute right-[8%] top-[18%] hidden h-20 w-20 rounded-full border border-gold/20 md:block" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-12">
        {/* Section heading */}
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <SectionHeading
            badge="What We Do"
            title="Our"
            highlight="Services"
            subtitle="Science-driven solutions tailored to advance your research, education, and business goals."
            variant="light"
          />
        </motion.div>

        {/* Bento grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 md:auto-rows-auto"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <a
            href="#contact"
            className="group/cta inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-semibold text-navy shadow-lg shadow-gold/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-xl hover:shadow-gold/30"
            data-umami-event="services-book-consultation"
          >
            Book a Free Consultation
            <motion.svg
              className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </motion.svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default Services
