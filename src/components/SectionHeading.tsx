import type { ReactElement } from 'react'

import { motion } from 'framer-motion'

import { headingVariants } from '@shared/animations'

interface SectionHeadingProps {
  badge: string
  title: string
  highlight?: string
  subtitle?: string
  /** "dark" = inverse section, "light" = standard page section. */
  variant?: 'light' | 'dark'
}

function SectionHeading({
  badge,
  title,
  highlight,
  subtitle,
  variant = 'dark',
}: SectionHeadingProps): ReactElement {
  const isDarkSection = variant === 'dark'

  return (
    <>
      <motion.span
        variants={headingVariants}
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-widest ${
          isDarkSection
            ? 'border-gold/30 bg-gold/10 text-gold'
            : 'border-[var(--border-subtle)] bg-[var(--surface-control)] text-[var(--text-primary)]'
        }`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_10px_rgba(201,168,76,0.8)]" />
        {badge}
      </motion.span>
      <motion.h2
        variants={headingVariants}
        className={`mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl ${
          isDarkSection ? 'text-[var(--text-inverse)]' : 'text-[var(--color-text-primary)]'
        }`}
      >
        {title}
        {highlight && (
          <>
            {' '}
            <span className="relative inline-block text-gold">
              {highlight}
              <span className="absolute -bottom-1 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
            </span>
          </>
        )}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={headingVariants}
          className={`mx-auto mt-5 max-w-2xl text-lg leading-relaxed ${
            isDarkSection
              ? 'text-[var(--text-inverse-muted)]'
              : 'text-[var(--color-text-secondary)]'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </>
  )
}

export default SectionHeading
