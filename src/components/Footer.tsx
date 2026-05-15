import type { ReactElement } from 'react'
import { useRef, useState, useEffect, useCallback, type FormEvent } from 'react'

import { Link } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { FaArrowUp, FaEnvelope } from 'react-icons/fa'
import { HiLocationMarker, HiMail, HiPhone } from 'react-icons/hi'

import { SOCIAL_LINKS, type SocialLink } from '@shared/constants/social-links'
import { CONTACT_EMAIL, PHONE_NUMBERS, LOCATION } from '@shared/constants/contact-info'
import { ROUTES } from '@shared/constants/routes'
import { trackAnalyticsEvent } from '@shared/analytics'
import ScienceBackdrop from './ScienceBackdrop'

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const FOOTER_LINKS = [
  { label: 'Research', href: ROUTES.RESEARCH },
  { label: 'Tutoring', href: ROUTES.TUTORING },
  { label: 'Invest', href: ROUTES.INVEST },
  { label: 'Careers', href: ROUTES.CAREERS },
]

const LEGAL_LINKS = [
  { label: 'Privacy', href: ROUTES.PRIVACY },
  { label: 'Terms', href: ROUTES.TERMS },
  { label: 'Accessibility', href: ROUTES.ACCESSIBILITY },
]

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const columnVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: 'easeOut' as const },
  }),
}

const linkUnderline = {
  rest: { scaleX: 0, originX: 0 },
  hover: { scaleX: 1, originX: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function AnimatedLink({
  href,
  children,
  external = false,
  isRoute = false,
}: {
  href: string
  children: React.ReactNode
  external?: boolean
  isRoute?: boolean
}) {
  const className =
    'group relative inline-flex min-h-9 items-center gap-2 py-1 text-sm text-[var(--text-inverse-muted)] transition-colors duration-200 hover:text-gold'

  const underline = (
    <motion.span
      className="absolute -bottom-0.5 left-0 h-px w-full bg-gold"
      variants={linkUnderline}
    />
  )

  if (isRoute) {
    return (
      <motion.div className="inline-flex" initial="rest" whileHover="hover" animate="rest">
        <Link to={href} className={className}>
          {children}
          {underline}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={className}
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {children}
      {underline}
    </motion.a>
  )
}

function SocialIcon({ social }: { social: SocialLink }) {
  const Icon = social.icon
  return (
    <motion.a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={social.label}
      className="group relative flex items-center gap-3"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      <motion.div
        className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border-inverse)] text-[var(--text-inverse-muted)] transition-colors"
        whileHover={{
          scale: 1.05,
          backgroundColor: social.hoverColor,
          borderColor: social.hoverColor,
          color: '#ffffff',
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <Icon className="h-5 w-5" />
      </motion.div>
      <motion.span className="relative text-sm text-[var(--text-inverse-muted)] transition-colors group-hover:text-[var(--text-inverse)]">
        {social.handle ?? social.label}
        <motion.span
          className="absolute -bottom-0.5 left-0 h-px w-full bg-gold"
          variants={linkUnderline}
        />
      </motion.span>
    </motion.a>
  )
}

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault()
      if (!email) return
      setStatus('sending')
      trackAnalyticsEvent('newsletter-attempt')

      const subject = encodeURIComponent('GCG newsletter subscription request')
      const body = encodeURIComponent(`Please subscribe this email address: ${email}`)
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`

      window.setTimeout(() => {
        setStatus('success')
        setEmail('')
        window.setTimeout(() => setStatus('idle'), 3000)
      }, 300)
    },
    [email],
  )

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
      <label htmlFor="footer-email" className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-2">
        <div className="relative min-w-0 flex-1">
          <FaEnvelope
            className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--text-placeholder)]"
            aria-hidden="true"
          />
          <input
            id="footer-email"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="min-h-10 w-full rounded-lg border border-[var(--border-inverse)] bg-transparent py-2.5 pl-9 pr-3 text-sm text-[var(--text-inverse)] outline-none transition-colors placeholder:text-sm placeholder:text-[var(--text-placeholder)] focus:border-gold/35"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'sending' || status === 'success'}
          className="min-h-10 w-full rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-gold-light disabled:opacity-70"
          data-umami-event="newsletter-submit-click"
        >
          {status === 'idle' && 'Subscribe'}
          {status === 'sending' && '...'}
          {status === 'success' && '✓'}
        </button>
      </div>
      {status === 'error' && (
        <p className="text-xs text-red-400">Something went wrong. Please try again.</p>
      )}
    </form>
  )
}

function BackToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (ticking) return

      ticking = true
      window.requestAnimationFrame(() => {
        const nextVisible = window.scrollY > 400
        setVisible((current) => (current === nextVisible ? current : nextVisible))
        ticking = false
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gold text-navy shadow-lg shadow-gold/20 hover:bg-gold-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <FaArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

/* ------------------------------------------------------------------ */
/*  Wave SVG separator                                                 */
/* ------------------------------------------------------------------ */

function WaveSeparator() {
  return (
    <div className="relative -mb-1 w-full overflow-hidden leading-[0]">
      <svg
        className="relative block w-full"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M0,60 C240,100 480,0 720,50 C960,100 1200,20 1440,60 L1440,100 L0,100 Z"
          fill="var(--footer-wave-fill)"
        />
        <path
          d="M0,70 C300,100 600,30 900,60 C1100,80 1300,40 1440,70 L1440,100 L0,100 Z"
          fill="var(--footer-wave-fill)"
          opacity="0.6"
        />
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  CTA Banner                                                         */
/* ------------------------------------------------------------------ */

function CTABanner() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section ref={ref} className="theme-inverse relative overflow-hidden py-20">
      <ScienceBackdrop variant="dark" density="calm" />
      {/* Decorative gold glow */}
      <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(169,130,43,0.18)_0%,transparent_58%)]" />
      </div>

      <motion.div
        className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <h2 className="text-3xl font-bold text-[var(--text-inverse)] sm:text-4xl lg:text-5xl">
          Ready to{' '}
          <span className="bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
            transform
          </span>{' '}
          your business?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--text-inverse-muted)]">
          Let us help you unlock new opportunities and drive sustainable growth.
        </p>
        <Link
          to="/#contact"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3.5 text-base font-semibold text-navy shadow-lg shadow-gold/20 transition-colors hover:bg-gold-light"
          data-umami-event="footer-cta-contact"
        >
          Get Started
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </motion.div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Footer                                                        */
/* ------------------------------------------------------------------ */

function Footer(): ReactElement {
  const footerRef = useRef<HTMLElement>(null)
  const inView = useInView(footerRef, { once: true, margin: '-80px' })
  const currentYear = new Date().getFullYear()

  return (
    <>
      {/* CTA Banner */}
      <CTABanner />

      {/* Wave separator */}
      <WaveSeparator />

      {/* Footer */}
      <footer
        ref={footerRef}
        className="theme-inverse text-[var(--text-inverse)] pb-[env(safe-area-inset-bottom)]"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand column */}
            <motion.div
              className="space-y-4 sm:col-span-2 lg:col-span-1"
              custom={0}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={columnVariants}
            >
              <Link to="/" className="inline-flex items-center gap-3 no-underline">
                <img
                  src={`${import.meta.env.BASE_URL}logo.png`}
                  alt="GCG"
                  className="h-10 w-10 object-contain"
                />
                <span className="bg-gradient-to-r from-gold to-gold-light bg-clip-text text-3xl font-extrabold tracking-tight text-transparent">
                  GCG
                </span>
              </Link>
              <p className="text-sm font-medium tracking-wide text-[var(--text-inverse-muted)]">
                Ghoussoub Consulting Group
              </p>
              <p className="text-sm italic text-[var(--text-inverse-muted)]">Building The Future</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2">
                {FOOTER_LINKS.map((link) => (
                  <AnimatedLink key={link.label} href={link.href} isRoute>
                    {link.label}
                  </AnimatedLink>
                ))}
              </div>
            </motion.div>

            {/* Contact column */}
            <motion.div
              className="space-y-4"
              custom={1}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={columnVariants}
            >
              <h3 className="text-lg font-semibold">Contact</h3>
              <ul className="space-y-3 text-sm text-[var(--text-inverse-muted)]">
                <li className="flex items-start gap-2">
                  <HiLocationMarker className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <span>{LOCATION}</span>
                </li>
                <li>
                  <AnimatedLink href={`mailto:${CONTACT_EMAIL}`}>
                    <HiMail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <span>{CONTACT_EMAIL}</span>
                  </AnimatedLink>
                </li>
                {PHONE_NUMBERS.map((phone) => (
                  <li key={phone.display}>
                    <AnimatedLink href={phone.href}>
                      <HiPhone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                      <span>{phone.display}</span>
                    </AnimatedLink>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Social column */}
            <motion.div
              className="space-y-4"
              custom={2}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={columnVariants}
            >
              <h3 className="text-lg font-semibold">Follow Us</h3>
              <ul className="space-y-4">
                {SOCIAL_LINKS.map((social) => (
                  <li key={social.label}>
                    <SocialIcon social={social} />
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter column */}
            <motion.div
              className="space-y-4"
              custom={3}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={columnVariants}
            >
              <h3 className="text-lg font-semibold">Stay Updated</h3>
              <p className="text-sm text-[var(--text-inverse-muted)]">
                Subscribe to our newsletter for insights and updates.
              </p>
              <NewsletterForm />
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--border-inverse)]">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <motion.p
                className="text-center text-sm text-[var(--text-inverse-muted)] md:text-left"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                &copy; {currentYear} Copyright Ghoussoub Consulting Group
              </motion.p>

              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                {LEGAL_LINKS.map((link) => (
                  <AnimatedLink key={link.label} href={link.href} isRoute>
                    {link.label}
                  </AnimatedLink>
                ))}

                {/* Periodic Table Easter Egg */}
                <motion.div
                  className="periodic-element group relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex h-12 w-12 flex-col items-center justify-center rounded border border-gold/30 bg-[var(--surface-inverse-panel)] text-gold transition-all duration-300 hover:border-gold hover:shadow-lg hover:shadow-gold/20">
                    <span className="text-[10px] font-medium leading-none">79</span>
                    <span className="text-lg font-bold leading-none">Gc</span>
                  </div>
                  {/* Tooltip */}
                  <div className="tooltip absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-gold px-3 py-1.5 text-xs font-medium text-navy opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                    Gold Consulting Group
                    <div className="tooltip-arrow" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to top button */}
      <BackToTopButton />
    </>
  )
}

export default Footer
