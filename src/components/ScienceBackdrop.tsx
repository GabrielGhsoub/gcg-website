import type { ReactElement } from 'react'

import { motion, useReducedMotion } from 'framer-motion'

interface ScienceBackdropProps {
  variant?: 'light' | 'dark'
  density?: 'calm' | 'rich'
  animated?: boolean
}

function ScienceBackdrop({
  variant = 'light',
  density = 'calm',
  animated = false,
}: ScienceBackdropProps): ReactElement {
  const isDark = variant === 'dark'
  const reduceMotion = useReducedMotion()
  const canAnimate = animated && !reduceMotion

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className={`science-grid ${isDark ? 'science-grid-dark' : ''}`} />
      <div
        className={`science-scanline ${canAnimate ? 'science-scanline-active' : ''} ${
          isDark ? 'science-scanline-dark' : ''
        }`}
      />

      <motion.svg
        className="absolute inset-0 h-full w-full text-[var(--science-diagram)]"
        viewBox="0 0 1200 700"
        preserveAspectRatio="none"
        fill="none"
        animate={canAnimate ? { x: [0, 10, 0], y: [0, -8, 0] } : undefined}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.path
          d="M92 180 C210 92 330 246 462 150 S728 85 884 182 1074 230 1150 146"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="5 14"
          initial={canAnimate ? { pathLength: 0.3 } : { pathLength: 1 }}
          animate={canAnimate ? { pathLength: [0.3, 1, 0.3] } : undefined}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.path
          d="M54 520 C210 390 320 602 508 484 S784 338 936 464 1094 574 1166 500"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="2 18"
          initial={canAnimate ? { pathLength: 0.45 } : { pathLength: 1 }}
          animate={canAnimate ? { pathLength: [0.45, 1, 0.45] } : undefined}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
        {[
          [92, 180],
          [462, 150],
          [884, 182],
          [54, 520],
          [508, 484],
          [936, 464],
        ].map(([cx, cy]) => (
          <motion.circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="5"
            fill="currentColor"
            animate={canAnimate ? { opacity: [0.35, 0.85, 0.35], scale: [1, 1.25, 1] } : undefined}
            transition={{ duration: 8 + cx / 140, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </motion.svg>

      {density === 'rich' && (
        <>
          <div
            className={`absolute left-[7%] top-[18%] h-28 w-28 rounded-full border ${
              isDark ? 'border-gold/12' : 'border-navy/8'
            }`}
          />
          <div
            className={`absolute right-[9%] top-[24%] h-36 w-36 rotate-45 rounded-[2rem] border ${
              isDark ? 'border-gold/10' : 'border-gold/20'
            }`}
          />
          <div
            className={`absolute bottom-[12%] left-[18%] h-px w-36 rotate-12 bg-gradient-to-r ${
              isDark
                ? 'from-transparent via-gold/18 to-transparent'
                : 'from-transparent via-[var(--science-diagram)] to-transparent'
            }`}
          />
        </>
      )}
    </div>
  )
}

export default ScienceBackdrop
