import type { ReactElement } from 'react'

import { motion } from 'framer-motion'

import ScienceBackdrop from './ScienceBackdrop'

const AUDIENCES = [
  'Research Labs',
  'Founders',
  'Students',
  'Families',
  'Investors',
  'Operators',
  'Academic Teams',
  'Product Teams',
]

function LogoBanner(): ReactElement {
  // Duplicate the list so the marquee appears infinite
  const labels = [...AUDIENCES, ...AUDIENCES]

  return (
    <section className="relative overflow-hidden bg-[var(--color-bg-primary)] py-16 md:py-20">
      <ScienceBackdrop variant="light" density="calm" />
      {/* Section heading */}
      <motion.p
        className="relative mb-12 text-center text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-text-secondary)]"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6 }}
      >
        Built For Evidence-Driven Teams
      </motion.p>

      {/* Marquee container */}
      <div className="relative">
        {/* Left fade */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 md:w-40"
          style={{
            background: 'linear-gradient(to right, var(--color-bg-primary), transparent)',
          }}
        />
        {/* Right fade */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 md:w-40"
          style={{
            background: 'linear-gradient(to left, var(--color-bg-primary), transparent)',
          }}
        />

        {/* Scrolling track */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex shrink-0 items-center gap-12 md:gap-20"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              x: {
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
          >
            {labels.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="science-card shrink-0 select-none whitespace-nowrap rounded-full border border-[var(--color-border-light)] bg-[var(--color-bg-primary)] px-6 py-3 text-sm font-bold tracking-[0.18em] text-[var(--color-text-secondary)]/55 transition-colors duration-300 hover:border-gold/40 hover:text-[var(--color-text-primary)] md:text-base"
              >
                {name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default LogoBanner
