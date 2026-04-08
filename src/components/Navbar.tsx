import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaHandshake,
  FaLightbulb,
  FaChalkboardTeacher,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
} from "react-icons/fa";
import type { IconType } from "react-icons";
import ThemeToggle from "./ThemeToggle";

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

interface DropdownItem {
  label: string;
  href: string;
  icon: IconType;
  description: string;
  isRoute?: boolean;
}

interface NavLink {
  label: string;
  href: string;
  sectionId?: string;
  isRoute?: boolean;
  dropdown?: DropdownItem[];
}

const SERVICE_ITEMS: DropdownItem[] = [
  {
    label: "Consulting",
    href: "#services",
    icon: FaHandshake,
    description: "Strategic insights for business growth and expert guidance.",
    isRoute: false,
  },
  {
    label: "Research & Development",
    href: "/services/research",
    icon: FaLightbulb,
    description: "Driving breakthroughs through innovative research.",
    isRoute: true,
  },
  {
    label: "Tutoring Services",
    href: "/services/tutoring",
    icon: FaChalkboardTeacher,
    description: "Personalized instruction for academic excellence.",
    isRoute: true,
  },
];

const NAV_LINKS: NavLink[] = [
  {
    label: "Services",
    href: "#services",
    sectionId: "services",
    dropdown: SERVICE_ITEMS,
  },
  { label: "Invest", href: "/invest", isRoute: true },
  { label: "Careers", href: "/careers", isRoute: true },
  { label: "About Us", href: "#about", sectionId: "about" },
  { label: "Contact", href: "#contact", sectionId: "contact" },
];

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/gcginnovate",
    icon: FaLinkedin,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/gcginnovate",
    icon: FaInstagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/gcginnovate",
    icon: FaFacebook,
  },
];

const SECTION_IDS = NAV_LINKS.filter((l) => l.sectionId).map(
  (l) => l.sectionId as string,
);

/* -------------------------------------------------------------------------- */
/*  Hooks                                                                     */
/* -------------------------------------------------------------------------- */

/** Returns the id of the section currently most visible in the viewport. */
function useActiveSection(sectionIds: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Only track sections on the homepage
    if (location.pathname !== "/") {
      setActive(null);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (
            entry.isIntersecting &&
            (!best || entry.intersectionRatio > best.intersectionRatio)
          ) {
            best = entry;
          }
        }
        if (best) {
          setActive(best.target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sectionIds, location.pathname]);

  return active;
}

/** Tracks scroll direction so the nav can hide/show. */
function useScrollDirection() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);

      if (y > 150) {
        setHidden(y > lastY.current && y - lastY.current > 5);
      } else {
        setHidden(false);
      }
      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { hidden, scrolled };
}

/* -------------------------------------------------------------------------- */
/*  Sub-components                                                            */
/* -------------------------------------------------------------------------- */

/** Scroll progress bar across the top of the nav. */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="absolute left-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-gold to-gold-light"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

/** Pulsing dot on the CTA button. */
function PulsingDot() {
  return (
    <span className="relative ml-2 flex h-2 w-2">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-navy/40" />
      <span className="relative inline-flex h-2 w-2 rounded-full bg-navy/70" />
    </span>
  );
}

/** Mega dropdown for services. */
function MegaDropdown({
  items,
  onHashClick,
  onRouteClick,
}: {
  items: DropdownItem[];
  onHashClick: (href: string) => void;
  onRouteClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute left-1/2 top-full mt-3 w-[90vw] max-w-[360px] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-navy/95 shadow-2xl shadow-black/30 backdrop-blur-2xl"
    >
      {/* Decorative top gradient line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

      <div className="p-2">
        {items.map((item, i) =>
          item.isRoute ? (
            <Link
              key={item.label}
              to={item.href}
              onClick={onRouteClick}
              className="group flex items-start gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-white/[0.06]"
            >
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold transition-colors group-hover:bg-gold/20"
              >
                <item.icon className="h-4 w-4" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="block text-sm font-semibold text-white/90 transition-colors group-hover:text-gold">
                  {item.label}
                </span>
                <span className="mt-0.5 block text-xs leading-relaxed text-white/50">
                  {item.description}
                </span>
              </motion.div>
            </Link>
          ) : (
            <button
              key={item.label}
              type="button"
              onClick={() => onHashClick(item.href)}
              className="group flex w-full items-start gap-3 rounded-xl px-4 py-3 text-left transition-colors hover:bg-white/[0.06]"
            >
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/10 text-gold transition-colors group-hover:bg-gold/20"
              >
                <item.icon className="h-4 w-4" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="block text-sm font-semibold text-white/90 transition-colors group-hover:text-gold">
                  {item.label}
                </span>
                <span className="mt-0.5 block text-xs leading-relaxed text-white/50">
                  {item.description}
                </span>
              </motion.div>
            </button>
          ),
        )}
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Navbar                                                                    */
/* -------------------------------------------------------------------------- */

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { hidden, scrolled } = useScrollDirection();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const activeSection = useActiveSection(SECTION_IDS);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(null);
  }, [location.pathname]);

  /**
   * Handle hash-based navigation (e.g. #about, #contact, #services).
   * If already on the homepage, smooth-scroll to the section.
   * Otherwise, navigate to the homepage with the hash.
   */
  const handleHashNavClick = useCallback(
    (hash: string) => {
      setMobileOpen(false);
      setDropdownOpen(null);

      if (location.pathname === "/") {
        const el = document.querySelector(hash);
        el?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/" + hash);
      }
    },
    [location.pathname, navigate],
  );

  /** Close menus when a route link is clicked. */
  const handleRouteClick = useCallback(() => {
    setMobileOpen(false);
    setDropdownOpen(null);
  }, []);

  const toggleDropdown = (label: string) => {
    setDropdownOpen((prev) => (prev === label ? null : label));
  };

  /** Determine whether a nav link is currently active. */
  const isActive = (link: NavLink) => {
    if (link.isRoute) {
      return location.pathname === link.href;
    }
    return link.sectionId === activeSection;
  };

  /* ---------------------------------------------------------------------- */
  /*  Glassmorphism border gradient based on scroll position                */
  /* ---------------------------------------------------------------------- */
  const borderGradient = scrolled
    ? "border-b border-gold/15 transition-colors duration-300"
    : "border-b border-white/5 transition-colors duration-300";

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-[background,box-shadow] duration-300 ${borderGradient} ${
        scrolled
          ? "bg-navy/95 shadow-lg shadow-navy/30 backdrop-blur-xl"
          : "bg-navy/80 backdrop-blur-xl"
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
          className="group flex items-center gap-2 text-white no-underline"
          aria-label="GCG Home"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white p-1.5 shadow-sm transition-transform duration-200 group-hover:scale-105">
            <img src={`${import.meta.env.BASE_URL}logo.png`} alt="GCG" className="h-full w-full object-contain" />
          </div>
          <motion.span
            whileHover={{ scale: 1.06 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="relative bg-gradient-to-r from-gold to-gold-light bg-clip-text text-2xl font-extrabold tracking-tight text-transparent drop-shadow-sm"
          >
            GCG
            {/* Animated accent dot */}
            <motion.span
              className="absolute -right-2 -top-0.5 h-1.5 w-1.5 rounded-full bg-gold"
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.2, 0.9] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Hover glow */}
            <span className="pointer-events-none absolute inset-0 rounded-lg bg-gold/0 transition-all duration-300 group-hover:bg-gold/10 group-hover:shadow-[0_0_20px_rgba(201,168,76,0.3)]" />
          </motion.span>
          <span className="hidden text-sm font-medium tracking-wide text-white/80 md:inline">
            Ghoussoub Consulting Group
          </span>
        </Link>

        {/* ---- Desktop navigation ---- */}
        <div className="hidden md:flex md:items-center md:gap-1" ref={dropdownRef}>
          {NAV_LINKS.map((link) =>
            link.dropdown ? (
              <div key={link.label} className="relative">
                <button
                  onClick={() => toggleDropdown(link.label)}
                  className={`relative flex cursor-pointer items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-white ${
                    isActive(link) ? "text-white" : "text-white/80"
                  }`}
                  aria-expanded={dropdownOpen === link.label}
                  aria-haspopup="true"
                >
                  {link.label}
                  <FaChevronDown
                    className={`h-3 w-3 transition-transform duration-200 ${
                      dropdownOpen === link.label ? "rotate-180" : ""
                    }`}
                  />
                  {/* Active indicator pill */}
                  {isActive(link) && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-x-1 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-gold to-gold-light"
                      transition={{
                        type: "spring",
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
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-white ${
                  isActive(link) ? "text-white" : "text-white/80"
                }`}
              >
                {link.label}
                {isActive(link) && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-x-1 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-gold to-gold-light"
                    transition={{
                      type: "spring",
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
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-white ${
                  isActive(link) ? "text-white" : "text-white/80"
                }`}
              >
                {link.label}
                {isActive(link) && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-x-1 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-gold to-gold-light"
                    transition={{
                      type: "spring",
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
            onClick={() => handleHashNavClick("#contact")}
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
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="cursor-pointer rounded-lg bg-white/10 p-3 text-white shadow-md transition-colors hover:bg-white/20"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <FaTimes className="h-5 w-5" />
            ) : (
              <FaBars className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* ---- Mobile menu overlay + slide-in panel ---- */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Full-screen modal panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-50 flex flex-col bg-navy backdrop-blur-xl md:hidden pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between border-b border-gold/20 px-6 py-5">
                <span className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white p-2 shadow-lg">
                    <img src={`${import.meta.env.BASE_URL}logo.png`} alt="GCG" className="h-full w-full object-contain" />
                  </div>
                  <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-2xl font-extrabold text-transparent">
                    GCG
                  </span>
                </span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileOpen(false)}
                  className="cursor-pointer rounded-full p-3 text-white bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20"
                  aria-label="Close menu"
                >
                  <FaTimes className="h-6 w-6" />
                </motion.button>
              </div>

              {/* Mobile links with staggered animation */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                {NAV_LINKS.map((link, i) =>
                  link.dropdown ? (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <button
                        onClick={() => toggleDropdown(link.label)}
                        className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-4 py-4 text-lg font-semibold transition-all hover:bg-white/10 hover:pl-5 ${
                          isActive(link) ? "text-gold bg-gold/10" : "text-white/90"
                        }`}
                      >
                        {link.label}
                        <FaChevronDown
                          className={`h-3 w-3 transition-transform duration-200 ${
                            dropdownOpen === link.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {dropdownOpen === link.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            {link.dropdown!.map((item) =>
                              item.isRoute ? (
                                <Link
                                  key={item.label}
                                  to={item.href}
                                  onClick={handleRouteClick}
                                  className="flex items-center gap-3 rounded-lg py-4 pl-5 pr-3 text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-gold"
                                >
                                  <item.icon className="h-3.5 w-3.5 text-gold/70" />
                                  {item.label}
                                </Link>
                              ) : (
                                <button
                                  key={item.label}
                                  type="button"
                                  onClick={() => handleHashNavClick(item.href)}
                                  className="flex w-full items-center gap-3 rounded-lg py-4 pl-5 pr-3 text-left text-sm text-white/70 transition-colors hover:bg-white/10 hover:text-gold"
                                >
                                  <item.icon className="h-3.5 w-3.5 text-gold/70" />
                                  {item.label}
                                </button>
                              ),
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ) : link.isRoute ? (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        to={link.href}
                        onClick={handleRouteClick}
                        className={`block rounded-xl px-4 py-4 text-lg font-semibold transition-all hover:bg-white/10 hover:pl-5 hover:text-white ${
                          isActive(link) ? "text-gold bg-gold/10" : "text-white/90"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ) : (
                    <motion.button
                      key={link.label}
                      type="button"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => handleHashNavClick(link.href)}
                      className={`block w-full rounded-lg px-3 py-3 text-left text-base font-medium transition-colors hover:bg-white/10 hover:text-white ${
                        isActive(link) ? "text-gold" : "text-white/90"
                      }`}
                    >
                      {link.label}
                    </motion.button>
                  ),
                )}
              </div>

              {/* Mobile footer: CTA + Social links */}
              <div className="border-t border-white/10 p-4">
                <button
                  type="button"
                  onClick={() => handleHashNavClick("#contact")}
                  className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-gold py-3 text-sm font-semibold text-navy transition-all duration-200 hover:bg-gold-light"
                >
                  Book Consultation
                  <PulsingDot />
                </button>

                {/* Social media links */}
                <div className="mt-4 flex items-center justify-center gap-4">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-gold"
                      aria-label={social.label}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
