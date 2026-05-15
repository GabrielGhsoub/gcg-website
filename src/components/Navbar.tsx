import type { ReactElement } from 'react'
import { useState, useEffect, useRef, useCallback } from 'react'

import { Link, useNavigate, useLocation } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaHandshake,
  FaLightbulb,
  FaChalkboardTeacher,
} from 'react-icons/fa'
import type { IconType } from 'react-icons'

import { SOCIAL_LINKS } from '@shared/constants/social-links'
import { ROUTES } from '@shared/constants/routes'
import { useActiveSection, useScrollDirection } from '@shared/hooks'
import ThemeToggle from './ThemeToggle'

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

interface DropdownItem {
  label: string
  href: string
  icon: IconType
  description: string
  isRoute?: boolean
}

interface NavLink {
  label: string
  href: string
  sectionId?: string
  isRoute?: boolean
  dropdown?: DropdownItem[]
}

interface MobileMenuProps {
  open: boolean
  links: NavLink[]
  dropdownOpen: string | null
  onClose: () => void
  onHashClick: (href: string) => void
  onRouteClick: () => void
  onToggleDropdown: (label: string) => void
  isActive: (link: NavLink) => boolean
}

const SERVICE_ITEMS: DropdownItem[] = [
  {
    label: 'Consulting',
    href: '#services',
    icon: FaHandshake,
    description: 'Strategic insights for business growth and expert guidance.',
    isRoute: false,
  },
  {
    label: 'Research & Development',
    href: ROUTES.RESEARCH,
    icon: FaLightbulb,
    description: 'Driving breakthroughs through innovative research.',
    isRoute: true,
  },
  {
    label: 'Tutoring Services',
    href: ROUTES.TUTORING,
    icon: FaChalkboardTeacher,
    description: 'Personalized instruction for academic excellence.',
    isRoute: true,
  },
]

const NAV_LINKS: NavLink[] = [
  {
    label: 'Services',
    href: '#services',
    sectionId: 'services',
    dropdown: SERVICE_ITEMS,
  },
  { label: 'Invest', href: ROUTES.INVEST, isRoute: true },
  { label: 'Careers', href: ROUTES.CAREERS, isRoute: true },
  { label: 'About Us', href: '#about', sectionId: 'about' },
  { label: 'Contact', href: '#contact', sectionId: 'contact' },
]

const SECTION_IDS = NAV_LINKS.filter((l) => l.sectionId).map((l) => l.sectionId as string)

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                            */
/* -------------------------------------------------------------------------- */

/** Scroll progress bar across the top of the nav. */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      className="science-signal absolute left-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-gold to-gold-light"
      style={{ scaleX: scrollYProgress }}
    />
  )
}

/** Pulsing dot on the CTA button. */
function PulsingDot() {
  return (
    <span className="relative ml-2 flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-navy/40" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-navy/70" />
    </span>
  )
}

/** Mega dropdown for services. */
function MegaDropdown({
  items,
  onHashClick,
  onRouteClick,
}: {
  items: DropdownItem[]
  onHashClick: (href: string) => void
  onRouteClick: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="absolute left-1/2 top-full mt-3 w-[92vw] max-w-[760px] -translate-x-1/2 overflow-hidden rounded-2xl border border-[var(--nav-border)] bg-[var(--nav-bg-scrolled)] shadow-2xl shadow-black/15 backdrop-blur-2xl"
    >
      {/* Decorative top gradient line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-gold/35 to-transparent" />

      <div className="flex items-center justify-between gap-6 border-b border-[var(--nav-border)] px-4 py-2.5">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold/70">Services</p>
          <p className="mt-0.5 text-xs text-[var(--nav-muted)]">
            Choose the path that matches your scientific goal.
          </p>
        </div>
        <span className="hidden h-8 w-8 shrink-0 rounded-full border border-gold/20 bg-gold/[0.06] md:block" />
      </div>

      <div className="grid gap-2 p-2 md:grid-cols-3">
        {items.map((item) =>
          item.isRoute ? (
            <Link
              key={item.label}
              to={item.href}
              onClick={onRouteClick}
              className="group flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-[var(--nav-control-hover)]"
            >
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/[0.08] text-gold transition-colors group-hover:bg-gold/15"
              >
                <item.icon className="h-4 w-4" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="block text-sm font-semibold text-[var(--nav-text)] transition-colors group-hover:text-gold">
                  {item.label}
                </span>
                <span className="mt-0.5 block text-xs leading-relaxed text-[var(--nav-muted)]">
                  {item.description}
                </span>
              </motion.div>
            </Link>
          ) : (
            <button
              key={item.label}
              type="button"
              onClick={() => onHashClick(item.href)}
              className="group flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-[var(--nav-control-hover)]"
            >
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/[0.08] text-gold transition-colors group-hover:bg-gold/15"
              >
                <item.icon className="h-4 w-4" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="block text-sm font-semibold text-[var(--nav-text)] transition-colors group-hover:text-gold">
                  {item.label}
                </span>
                <span className="mt-0.5 block text-xs leading-relaxed text-[var(--nav-muted)]">
                  {item.description}
                </span>
              </motion.div>
            </button>
          ),
        )}
      </div>
    </motion.div>
  )
}

function MobileMenu({
  open,
  links,
  dropdownOpen,
  onClose,
  onHashClick,
  onRouteClick,
  onToggleDropdown,
  isActive,
}: MobileMenuProps): ReactElement | null {
  const panelRef = useRef<HTMLElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return

    previousFocusRef.current = document.activeElement as HTMLElement | null
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      if (e.key !== 'Tab' || !panelRef.current) return

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (!first || !last) return

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', handleKeyDown)
      previousFocusRef.current?.focus()
    }
  }, [onClose, open])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <motion.button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 h-full w-full bg-black/65 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
          />

          <motion.aside
            id="mobile-navigation"
            ref={panelRef}
            className="absolute right-0 top-0 flex h-dvh w-full max-w-[25rem] flex-col overflow-hidden border-l border-[var(--border-inverse)] bg-[var(--surface-inverse)] shadow-2xl shadow-black/35 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 420, damping: 38 }}
          >
            <div className="flex items-center justify-between border-b border-[var(--border-inverse)] px-5 py-4">
              <Link
                to="/"
                onClick={onRouteClick}
                className="flex min-w-0 items-center gap-3 text-[var(--text-inverse)] no-underline"
                aria-label="GCG Home"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white p-2 shadow-lg">
                  <img
                    src={`${import.meta.env.BASE_URL}logo.png`}
                    alt="GCG"
                    className="h-full w-full object-contain"
                  />
                </span>
                <span className="min-w-0">
                  <span className="block bg-gradient-to-r from-gold to-gold-light bg-clip-text text-xl font-extrabold text-transparent">
                    GCG
                  </span>
                  <span className="block truncate text-xs text-[var(--text-inverse-muted)]">
                    Ghoussoub Consulting Group
                  </span>
                </span>
              </Link>

              <motion.button
                ref={closeButtonRef}
                type="button"
                whileTap={{ scale: 0.94 }}
                onClick={onClose}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--surface-control)] text-[var(--text-inverse)] transition-colors hover:bg-[var(--surface-control-hover)]"
                aria-label="Close menu"
              >
                <FaTimes className="h-5 w-5" />
              </motion.button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-5">
              <div className="space-y-2">
                {links.map((link, index) =>
                  link.dropdown ? (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.035 }}
                    >
                      <button
                        type="button"
                        onClick={() => onToggleDropdown(link.label)}
                        className={`flex min-h-14 w-full items-center justify-between rounded-2xl px-4 text-left text-base font-semibold transition-colors ${
                          isActive(link)
                            ? 'bg-gold/12 text-gold'
                            : 'text-[var(--text-inverse)] hover:bg-[var(--surface-control-hover)]'
                        }`}
                        aria-expanded={dropdownOpen === link.label}
                        aria-controls={`mobile-submenu-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <span>{link.label}</span>
                        <FaChevronDown
                          className={`h-3.5 w-3.5 transition-transform duration-200 ${
                            dropdownOpen === link.label ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {dropdownOpen === link.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-2 rounded-2xl border border-[var(--border-inverse)] bg-[var(--surface-control)] p-2">
                              <div className="px-3 pb-2 pt-1">
                                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold/70">
                                  Services
                                </p>
                                <p className="mt-1 text-xs leading-relaxed text-[var(--text-inverse-muted)]">
                                  Pick a focused path, then start from the right page.
                                </p>
                              </div>
                              <div
                                id={`mobile-submenu-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                                className="space-y-1"
                              >
                                {link.dropdown.map((item) =>
                                  item.isRoute ? (
                                    <Link
                                      key={item.label}
                                      to={item.href}
                                      onClick={onRouteClick}
                                      className="flex items-start gap-3 rounded-xl px-3 py-3 text-[var(--text-inverse-muted)] transition-colors hover:bg-[var(--surface-control-hover)] hover:text-gold"
                                    >
                                      <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-gold/80" />
                                      <span>
                                        <span className="block text-sm font-semibold">
                                          {item.label}
                                        </span>
                                        <span className="mt-0.5 block text-xs leading-relaxed text-[var(--text-inverse-muted)]">
                                          {item.description}
                                        </span>
                                      </span>
                                    </Link>
                                  ) : (
                                    <button
                                      key={item.label}
                                      type="button"
                                      onClick={() => onHashClick(item.href)}
                                      className="flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left text-[var(--text-inverse-muted)] transition-colors hover:bg-[var(--surface-control-hover)] hover:text-gold"
                                    >
                                      <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-gold/80" />
                                      <span>
                                        <span className="block text-sm font-semibold">
                                          {item.label}
                                        </span>
                                        <span className="mt-0.5 block text-xs leading-relaxed text-[var(--text-inverse-muted)]">
                                          {item.description}
                                        </span>
                                      </span>
                                    </button>
                                  ),
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ) : link.isRoute ? (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.035 }}
                    >
                      <Link
                        to={link.href}
                        onClick={onRouteClick}
                        className={`flex min-h-14 items-center rounded-2xl px-4 text-base font-semibold transition-colors ${
                          isActive(link)
                            ? 'bg-gold/12 text-gold'
                            : 'text-[var(--text-inverse)] hover:bg-[var(--surface-control-hover)]'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.button
                      key={link.label}
                      type="button"
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.035 }}
                      onClick={() => onHashClick(link.href)}
                      className={`flex min-h-14 w-full items-center rounded-2xl px-4 text-left text-base font-semibold transition-colors ${
                        isActive(link)
                          ? 'bg-gold/12 text-gold'
                          : 'text-[var(--text-inverse)] hover:bg-[var(--surface-control-hover)]'
                      }`}
                    >
                      {link.label}
                    </motion.button>
                  ),
                )}
              </div>
            </div>

            <div className="border-t border-[var(--border-inverse)] bg-[var(--surface-inverse-panel)] p-4">
              <button
                type="button"
                onClick={() => onHashClick('#contact')}
                className="flex min-h-12 w-full items-center justify-center rounded-2xl bg-gold px-5 text-sm font-bold text-navy shadow-lg shadow-gold/15 transition-colors hover:bg-gold-light"
              >
                Book Consultation
                <PulsingDot />
              </button>

              <div className="mt-4 flex items-center justify-center gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-inverse)] text-[var(--text-inverse-muted)] transition-colors hover:border-gold/40 hover:bg-[var(--surface-control-hover)] hover:text-gold"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

/* -------------------------------------------------------------------------- */
/*  Navbar                                                                    */
/* -------------------------------------------------------------------------- */

function Navbar(): ReactElement {
  const navigate = useNavigate()
  const location = useLocation()
  const { scrolled } = useScrollDirection()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const activeSection = useActiveSection(SECTION_IDS)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    const previousPaddingRight = document.body.style.paddingRight
    const appRoot = document.getElementById('root')
    const hadAriaHidden = appRoot?.hasAttribute('aria-hidden') ?? false
    const previousAriaHidden = appRoot?.getAttribute('aria-hidden')

    if (mobileOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow = 'hidden'
      appRoot?.setAttribute('inert', '')
      appRoot?.setAttribute('aria-hidden', 'true')
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`
      }
    }

    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPaddingRight
      appRoot?.removeAttribute('inert')
      if (hadAriaHidden && typeof previousAriaHidden === 'string') {
        appRoot?.setAttribute('aria-hidden', previousAriaHidden)
      } else {
        appRoot?.removeAttribute('aria-hidden')
      }
    }
  }, [mobileOpen])

  // Allow Escape to close the mobile menu and desktop dropdown.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        setDropdownOpen(null)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  /**
   * Handle hash-based navigation (e.g. #about, #contact, #services).
   * If already on the homepage, smooth-scroll to the section.
   * Otherwise, navigate to the homepage with the hash.
   */
  const handleHashNavClick = useCallback(
    (hash: string) => {
      setMobileOpen(false)
      setDropdownOpen(null)

      if (location.pathname === '/') {
        const el = document.querySelector(hash)
        el?.scrollIntoView({ behavior: 'smooth' })
      } else {
        navigate('/' + hash)
      }
    },
    [location.pathname, navigate],
  )

  /** Close menus when a route link is clicked. */
  const handleRouteClick = useCallback(() => {
    setMobileOpen(false)
    setDropdownOpen(null)
  }, [])

  const toggleDropdown = useCallback((label: string) => {
    setDropdownOpen((prev) => (prev === label ? null : label))
  }, [])

  /** Determine whether a nav link is currently active. */
  const isActive = useCallback(
    (link: NavLink) => {
      if (link.isRoute) {
        return location.pathname === link.href
      }
      return link.sectionId === activeSection
    },
    [activeSection, location.pathname],
  )

  /* ---------------------------------------------------------------------- */
  /*  Glassmorphism border gradient based on scroll position                */
  /* ---------------------------------------------------------------------- */
  const borderGradient = scrolled
    ? 'border-b border-gold/15 transition-colors duration-300'
    : 'border-b border-[var(--nav-border)] transition-colors duration-300'

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-[background,box-shadow] duration-300 ${borderGradient} ${
        scrolled
          ? 'bg-[var(--nav-bg-scrolled)] shadow-lg shadow-navy/10 backdrop-blur-xl'
          : 'bg-[var(--nav-bg)] backdrop-blur-xl'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Scroll progress bar */}
      <ScrollProgressBar />

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:py-3 sm:px-6 lg:px-8">
        {/* ---- Logo ---- */}
        <Link
          to="/"
          onClick={handleRouteClick}
          className="group flex items-center gap-2 text-[var(--nav-text)] no-underline"
          aria-label="GCG Home"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white p-1.5 shadow-sm transition-transform duration-200 group-hover:scale-105">
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="GCG"
              className="h-full w-full object-contain"
            />
          </div>
          <motion.span
            whileHover={{ scale: 1.06 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="relative bg-gradient-to-r from-gold to-gold-light bg-clip-text text-2xl font-extrabold tracking-tight text-transparent drop-shadow-sm"
          >
            GCG
            {/* Animated accent dot */}
            <motion.span
              className="absolute -right-2 -top-0.5 h-1.5 w-1.5 rounded-full bg-gold"
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.2, 0.9] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Hover glow */}
            <span className="pointer-events-none absolute inset-0 rounded-lg bg-gold/0 transition-all duration-300 group-hover:bg-gold/10 group-hover:shadow-[0_0_20px_rgba(201,168,76,0.3)]" />
          </motion.span>
          <span className="hidden text-sm font-medium tracking-wide text-[var(--nav-muted)] lg:inline">
            Ghoussoub Consulting Group
          </span>
        </Link>

        {/* ---- Desktop navigation ---- */}
        <div className="hidden lg:flex lg:items-center lg:gap-1" ref={dropdownRef}>
          {NAV_LINKS.map((link) =>
            link.dropdown ? (
              <div key={link.label} className="relative">
                <button
                  onClick={() => toggleDropdown(link.label)}
                  className={`relative flex cursor-pointer items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-[var(--nav-text)] ${
                    isActive(link) ? 'text-[var(--nav-text)]' : 'text-[var(--nav-muted)]'
                  }`}
                  aria-expanded={dropdownOpen === link.label}
                  aria-haspopup="true"
                >
                  {link.label}
                  <FaChevronDown
                    className={`h-3 w-3 transition-transform duration-200 ${
                      dropdownOpen === link.label ? 'rotate-180' : ''
                    }`}
                  />
                  {/* Active indicator pill */}
                  {isActive(link) && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-x-1 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-gold to-gold-light"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
                <AnimatePresence>
                  {dropdownOpen === link.label && link.dropdown && (
                    <MegaDropdown
                      items={link.dropdown}
                      onHashClick={handleHashNavClick}
                      onRouteClick={handleRouteClick}
                    />
                  )}
                </AnimatePresence>
              </div>
            ) : link.isRoute ? (
              <Link
                key={link.label}
                to={link.href}
                onClick={handleRouteClick}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-[var(--nav-text)] ${
                  isActive(link) ? 'text-[var(--nav-text)]' : 'text-[var(--nav-muted)]'
                }`}
              >
                {link.label}
                {isActive(link) && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-x-1 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-gold to-gold-light"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            ) : (
              <button
                key={link.label}
                type="button"
                onClick={() => handleHashNavClick(link.href)}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-[var(--nav-text)] ${
                  isActive(link) ? 'text-[var(--nav-text)]' : 'text-[var(--nav-muted)]'
                }`}
              >
                {link.label}
                {isActive(link) && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-x-1 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-gold to-gold-light"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </button>
            ),
          )}

          {/* CTA Button */}
          <button
            type="button"
            onClick={() => handleHashNavClick('#contact')}
            className="group ml-3 flex cursor-pointer items-center rounded-lg bg-gold px-5 py-2 text-sm font-semibold text-navy shadow-md transition-all duration-200 hover:bg-gold-light hover:shadow-lg hover:shadow-gold/20"
          >
            Book Consultation
            <PulsingDot />
          </button>

          {/* Theme Toggle - Desktop */}
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>

        {/* ---- Mobile menu toggle ---- */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--nav-control-bg)] text-[var(--nav-text)] shadow-md transition-colors hover:bg-[var(--nav-control-hover)]"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <MobileMenu
        open={mobileOpen}
        links={NAV_LINKS}
        dropdownOpen={dropdownOpen}
        onClose={handleRouteClick}
        onHashClick={handleHashNavClick}
        onRouteClick={handleRouteClick}
        onToggleDropdown={toggleDropdown}
        isActive={isActive}
      />
    </nav>
  )
}

export default Navbar
