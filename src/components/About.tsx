import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
  type Variants,
} from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Simple count-up stat component                                     */
/* ------------------------------------------------------------------ */

interface AnimatedStatProps {
  target: number;
  suffix?: string;
  label: string;
  inView: boolean;
  delay: number;
}

function AnimatedStat({
  target,
  suffix = "",
  label,
  inView,
  delay,
}: AnimatedStatProps) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const duration = 1200; // ms
    const startTime = performance.now();
    const delayMs = delay * 1000;

    const timeout = setTimeout(() => {
      const step = (now: number) => {
        const elapsed = now - startTime - delayMs;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out quad
        const eased = 1 - (1 - progress) * (1 - progress);
        setCount(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delayMs);

    return () => clearTimeout(timeout);
  }, [inView, target, delay]);

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      <div className="relative mb-2 font-mono text-4xl font-bold text-gold md:text-5xl">
        <span style={{ fontVariantNumeric: "tabular-nums" }}>
          {count}
          {suffix}
        </span>
      </div>

      <p className="text-sm tracking-widest text-white/60 uppercase md:text-base">
        {label}
      </p>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Interactive GCG card with mouse-tilt parallax                      */
/* ------------------------------------------------------------------ */

function InteractiveCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 120,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 120,
    damping: 18,
  });
  const glareX = useTransform(mouseX, [-0.5, 0.5], [15, 85]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], [15, 85]);

  // Parallax depth offsets for inner elements
  const innerTranslateX = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-8, 8]),
    { stiffness: 100, damping: 20 }
  );
  const innerTranslateY = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [-8, 8]),
    { stiffness: 100, damping: 20 }
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <div className="flex items-center justify-center [perspective:900px]">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          willChange: "transform",
          transformStyle: "preserve-3d",
        }}
        className="relative h-72 w-full max-w-sm cursor-default rounded-2xl border border-dashed border-gold/25 bg-white/[0.03] backdrop-blur-sm md:h-80"
      >
        {/* Glare layer */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-30"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([x, y]) =>
                `radial-gradient(circle at ${x}% ${y}%, rgba(201,168,76,0.3) 0%, transparent 55%)`
            ),
          }}
        />

        {/* Subtle shimmer edge */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{
            background: useTransform(
              [glareX],
              ([x]) =>
                `linear-gradient(${Number(x) * 3.6}deg, transparent 40%, rgba(201,168,76,0.08) 50%, transparent 60%)`
            ),
          }}
        />

        {/* Inner decorative */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative"
            style={{
              x: innerTranslateX,
              y: innerTranslateY,
              transform: "translateZ(40px)",
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              className="h-32 w-32 rounded-full border-2 border-gold/30"
              animate={{ rotate: 360 }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                className="text-5xl font-bold text-gold"
                style={{ transform: "translateZ(20px)" }}
              >
                GCG
              </motion.span>
            </div>
            {/* Hexagonal molecule shape */}
            <motion.svg
              className="absolute -right-3 -bottom-3 h-10 w-10 text-gold/40"
              viewBox="0 0 40 40"
              fill="none"
              style={{ transform: "translateZ(10px)" }}
              animate={{ rotate: [0, 60, 0] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            >
              <polygon
                points="20,2 36,11 36,29 20,38 4,29 4,11"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="rgba(201,168,76,0.15)"
              />
            </motion.svg>
            {/* Small atom shape */}
            <motion.svg
              className="absolute -top-4 -left-4 h-8 w-8 text-gold/30"
              viewBox="0 0 40 40"
              fill="none"
              style={{ transform: "translateZ(15px)" }}
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              <circle cx="20" cy="20" r="3" fill="currentColor" />
              <ellipse cx="20" cy="20" rx="16" ry="6" stroke="currentColor" strokeWidth="0.8" transform="rotate(-45 20 20)" />
              <ellipse cx="20" cy="20" rx="16" ry="6" stroke="currentColor" strokeWidth="0.8" transform="rotate(45 20 20)" />
            </motion.svg>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-6 left-8 right-8 text-center"
          style={{
            x: innerTranslateX,
            transform: "translateZ(20px)",
          }}
        >
          <p className="text-sm font-medium tracking-wide text-gold/70">
            Ghoussoub Consulting Group
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Scroll-triggered text reveal (word-by-word fade-up)                */
/* ------------------------------------------------------------------ */

interface RevealTextProps {
  children: string;
  className?: string;
  delay?: number;
}

function RevealText({ children, className = "", delay = 0 }: RevealTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const words = useMemo(() => children.split(" "), [children]);

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={
              inView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }
            }
            transition={{
              duration: 0.45,
              ease: [0.22, 0.61, 0.36, 1],
              delay: delay + i * 0.022,
            }}
            style={{ willChange: "transform, opacity" }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  Noise texture overlay (pure CSS via SVG data URI)                  */
/* ------------------------------------------------------------------ */

function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-10 opacity-[0.04]"
      aria-hidden="true"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "200px 200px",
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Decorative vertical timeline with animated dots                    */
/* ------------------------------------------------------------------ */

interface TimelineProps {
  inView: boolean;
}

function VerticalTimeline({ inView }: TimelineProps) {
  const dotPositions = useMemo(() => [0, 0.3, 0.6, 0.9], []);

  return (
    <div className="absolute left-0 top-0 h-full w-px">
      {/* Animated gradient line */}
      <motion.div
        className="h-full w-full bg-gradient-to-b from-gold/70 via-gold/30 to-gold/10"
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1.4, ease: [0.22, 0.61, 0.36, 1], delay: 0.2 }}
        style={{ transformOrigin: "top" }}
      />

      {/* Animated dots along the line */}
      {dotPositions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute left-1/2 -translate-x-1/2"
          style={{ top: `${pos * 100}%` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
            delay: 0.4 + i * 0.2,
          }}
        >
          <div
            className={`rounded-full bg-gold ${
              i === 0
                ? "h-3 w-3 shadow-[0_0_10px_rgba(201,168,76,0.6)]"
                : "h-2 w-2 opacity-60"
            }`}
          />
        </motion.div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ------------------------------------------------------------------ */
/*  About section                                                      */
/* ------------------------------------------------------------------ */

function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-navy py-28 md:py-36"
    >
      {/* Noise texture removed for cleaner look */}

      {/* Decorative geometric elements */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Gradient blob */}
        <div className="absolute -right-32 top-1/4 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-gold/20 via-gold-light/10 to-transparent blur-3xl" />

        {/* Secondary blob for depth */}
        <div className="absolute -left-48 bottom-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-navy-light/30 via-gold/5 to-transparent blur-3xl opacity-50" />

        {/* Atom diagram */}
        <svg
          className="absolute right-8 top-16 h-48 w-48 text-gold/10 md:right-24 md:top-24 md:h-72 md:w-72"
          viewBox="0 0 200 200"
          fill="none"
        >
          {/* Nucleus */}
          <circle cx="100" cy="100" r="8" fill="currentColor" opacity="0.6" />
          {/* Electron orbit 1 */}
          <ellipse
            cx="100"
            cy="100"
            rx="70"
            ry="25"
            stroke="currentColor"
            strokeWidth="1.5"
            transform="rotate(-30 100 100)"
          />
          {/* Electron orbit 2 */}
          <ellipse
            cx="100"
            cy="100"
            rx="70"
            ry="25"
            stroke="currentColor"
            strokeWidth="1.5"
            transform="rotate(30 100 100)"
          />
          {/* Electron orbit 3 */}
          <ellipse
            cx="100"
            cy="100"
            rx="70"
            ry="25"
            stroke="currentColor"
            strokeWidth="1"
            transform="rotate(90 100 100)"
          />
          {/* Electrons */}
          <circle cx="148" cy="72" r="4" fill="currentColor" opacity="0.8" />
          <circle cx="52" cy="128" r="4" fill="currentColor" opacity="0.8" />
          <circle cx="100" cy="30" r="4" fill="currentColor" opacity="0.8" />
        </svg>

        {/* DNA double helix snippet */}
        <svg
          className="absolute -left-12 bottom-20 h-40 w-40 text-gold/[0.07] md:left-8 md:h-56 md:w-56"
          viewBox="0 0 200 200"
          fill="none"
        >
          {/* Left strand */}
          <path
            d="M60,20 Q100,60 60,100 Q20,140 60,180"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Right strand */}
          <path
            d="M140,20 Q100,60 140,100 Q180,140 140,180"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Base pairs (rungs) */}
          <line x1="72" y1="40" x2="128" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.6" />
          <line x1="62" y1="60" x2="138" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.6" />
          <line x1="58" y1="80" x2="142" y2="80" stroke="currentColor" strokeWidth="1" opacity="0.6" />
          <line x1="62" y1="100" x2="138" y2="100" stroke="currentColor" strokeWidth="1" opacity="0.6" />
          <line x1="72" y1="120" x2="128" y2="120" stroke="currentColor" strokeWidth="1" opacity="0.6" />
          <line x1="58" y1="140" x2="142" y2="140" stroke="currentColor" strokeWidth="1" opacity="0.6" />
          <line x1="62" y1="160" x2="138" y2="160" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        </svg>
      </div>

      <motion.div
        className="relative z-20 mx-auto max-w-6xl px-6 md:px-12"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Heading */}
        <motion.div variants={fadeUp} className="mb-4">
          <span className="inline-block rounded-full border border-gold/30 bg-gold/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold">
            Who We Are
          </span>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="mb-12 text-5xl font-extrabold leading-tight tracking-tight text-white md:text-6xl lg:text-7xl"
        >
          About <span className="text-gold">Us</span>
        </motion.h2>

        {/* Content grid */}
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* Text column with decorative timeline */}
          <motion.div variants={fadeUp} className="relative pl-8 md:pl-10">
            {/* Decorative vertical timeline */}
            <VerticalTimeline inView={inView} />

            <RevealText
              className="text-lg leading-relaxed text-white/80 md:text-xl"
              delay={0.2}
            >
              At GCG, we are dedicated to building a brighter future through
              pioneering innovations and transformative consulting services. Our
              team specializes in delivering strategic insights, exploring new
              frontiers in research and development, and providing personalized
              tutoring services aimed at fostering academic excellence.
            </RevealText>

            <RevealText
              className="mt-6 text-lg leading-relaxed text-white/80 md:text-xl"
              delay={0.6}
            >
              Our mission is to empower individuals and organizations to reach
              their full potential, driving growth and making a positive impact on
              communities. We are committed to nurturing curiosity, advancing
              knowledge, and unlocking potential to achieve transformative growth.
            </RevealText>
          </motion.div>

          {/* Interactive decorative card column */}
          <motion.div variants={fadeUp}>
            <InteractiveCard />
          </motion.div>
        </div>

        {/* Stats section */}
        <motion.div
          variants={fadeUp}
          className="relative mt-20 overflow-hidden rounded-2xl border border-gold/15 bg-white/[0.03] px-6 py-10 backdrop-blur-sm md:px-12 md:py-14"
        >
          {/* Inner glow */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-gold/[0.03] via-transparent to-gold/[0.03]" />

          {/* Decorative corner accents */}
          <div className="pointer-events-none absolute left-4 top-4 h-8 w-8 border-l border-t border-gold/20 rounded-tl-lg" />
          <div className="pointer-events-none absolute right-4 top-4 h-8 w-8 border-r border-t border-gold/20 rounded-tr-lg" />
          <div className="pointer-events-none absolute left-4 bottom-4 h-8 w-8 border-l border-b border-gold/20 rounded-bl-lg" />
          <div className="pointer-events-none absolute right-4 bottom-4 h-8 w-8 border-r border-b border-gold/20 rounded-br-lg" />

          <div className="relative grid grid-cols-3 gap-6 md:gap-12">
            <AnimatedStat
              target={3}
              suffix="+"
              label="Services"
              inView={inView}
              delay={0.4}
            />
            <AnimatedStat
              target={2}
              label="Offices"
              inView={inView}
              delay={0.6}
            />
            <AnimatedStat
              target={100}
              suffix="+"
              label="Clients"
              inView={inView}
              delay={0.8}
            />
          </div>
        </motion.div>

        {/* Office locations */}
        <motion.div
          variants={fadeUp}
          className="mt-8 flex items-center justify-center gap-6 text-base text-white/60"
        >
          <span className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-gold/60" />
            Beirut
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-gold/60" />
            Paris
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default About;
