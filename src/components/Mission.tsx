import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  animate,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  FaFlask,
  FaShieldAlt,
  FaLeaf,
  FaAward,
  FaQuoteLeft,
} from "react-icons/fa";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Pillar {
  icon: React.ReactNode;
  label: string;
  description: string;
  details: string;
}

const PILLARS: Pillar[] = [
  {
    icon: <FaFlask className="h-5 w-5" />,
    label: "Innovation",
    description: "Pioneering solutions that push boundaries",
    details:
      "We invest in R&D and emerging technologies, transforming bold ideas into market-ready products that redefine industries.",
  },
  {
    icon: <FaShieldAlt className="h-5 w-5" />,
    label: "Integrity",
    description: "Transparent and ethical in every interaction",
    details:
      "Every decision is guided by honesty and accountability. We build trust through open communication and unwavering principles.",
  },
  {
    icon: <FaLeaf className="h-5 w-5" />,
    label: "Sustainability",
    description: "Building a responsible future together",
    details:
      "Our commitment to environmental and social stewardship is embedded in every process, from supply chain to final delivery.",
  },
  {
    icon: <FaAward className="h-5 w-5" />,
    label: "Excellence",
    description: "Relentless pursuit of the highest standards",
    details:
      "Quality is never an accident. Through rigorous standards and continuous improvement, we consistently deliver world-class results.",
  },
];

interface Metric {
  value: number;
  suffix: string;
  label: string;
}

const METRICS: Metric[] = [
  { value: 15, suffix: "+", label: "Years of Experience" },
  { value: 200, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 30, suffix: "+", label: "Expert Consultants" },
];

const MARQUEE_VALUES = [
  "Innovation",
  "Integrity",
  "Sustainability",
  "Excellence",
];

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const pillarVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

/** Animated counter that counts up from 0 to `target` when in view. */
function AnimatedCounter({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { stiffness: 60, damping: 20 });
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionVal, target, {
      duration: 2,
      ease: "easeOut",
    });
    return controls.stop;
  }, [inView, motionVal, target]);

  useEffect(() => {
    const unsubscribe = springVal.on("change", (v) =>
      setDisplay(Math.round(v).toString())
    );
    return unsubscribe;
  }, [springVal]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/**
 * Marquee-style auto-scrolling banner of the 4 core values.
 * Duplicates the array several times for a seamless infinite loop.
 */
function ValueMarquee() {
  const icons: Record<string, React.ReactNode> = {
    Innovation: <FaFlask className="h-3.5 w-3.5" />,
    Integrity: <FaShieldAlt className="h-3.5 w-3.5" />,
    Sustainability: <FaLeaf className="h-3.5 w-3.5" />,
    Excellence: <FaAward className="h-3.5 w-3.5" />,
  };

  // Repeat enough times so that the strip is wider than any viewport
  const repeated = [
    ...MARQUEE_VALUES,
    ...MARQUEE_VALUES,
    ...MARQUEE_VALUES,
    ...MARQUEE_VALUES,
    ...MARQUEE_VALUES,
    ...MARQUEE_VALUES,
  ];

  return (
    <div className="relative w-full overflow-hidden py-6" aria-hidden="true">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-navy to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-navy to-transparent" />

      <motion.div
        className="flex w-max gap-6"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 45,
            ease: "linear",
          },
        }}
      >
        {repeated.map((v, i) => (
          <span
            key={`${v}-${i}`}
            className="flex shrink-0 items-center gap-2 rounded-full border border-gold/20 bg-gold/[0.06] px-5 py-2 text-sm font-semibold tracking-wide text-gold/80 whitespace-nowrap"
          >
            {icons[v]}
            {v}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/** Highlighted text that animates a gold underline when scrolled into view. */
function HighlightWord({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <span ref={ref} className="relative inline-block">
      <span className="relative z-10">{children}</span>
      {/* Animated gold underline */}
      <motion.span
        className="absolute bottom-0 left-0 h-[3px] rounded-full bg-gradient-to-r from-gold to-gold-light"
        initial={{ width: "0%" }}
        animate={inView ? { width: "100%" } : { width: "0%" }}
        transition={{ duration: 0.8, ease: "easeOut", delay }}
      />
      {/* Soft glow behind the underline */}
      <motion.span
        className="absolute -bottom-0.5 left-0 h-[6px] rounded-full bg-gold/20 blur-sm"
        initial={{ width: "0%" }}
        animate={inView ? { width: "100%" } : { width: "0%" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: delay + 0.1 }}
      />
    </span>
  );
}

/** A value pillar card that expands on hover to reveal more detail. */
function PillarCard({ pillar }: { pillar: Pillar }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={pillarVariant}
      className="group relative cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setHovered(!hovered)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      role="button"
      aria-label={`${pillar.label}: ${pillar.description}. Hover for details.`}
    >
      <motion.div
        animate={{
          height: hovered ? "auto" : "11rem",
          boxShadow: hovered
            ? "0 8px 32px rgba(201,168,76,0.12)"
            : "0 0px 0px rgba(201,168,76,0)",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-colors duration-300 hover:border-gold/25"
      >
        {/* Icon */}
        <motion.div
          animate={{
            backgroundColor: hovered
              ? "rgba(201,168,76,0.25)"
              : "rgba(201,168,76,0.15)",
          }}
          transition={{ duration: 0.3 }}
          className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg text-gold"
        >
          {pillar.icon}
        </motion.div>

        {/* Label */}
        <h3 className="mb-1 text-base font-bold text-white transition-colors duration-300 group-hover:text-gold">
          {pillar.label}
        </h3>

        {/* Short description */}
        <p className="text-sm leading-snug text-white/60">
          {pillar.description}
        </p>

        {/* Expanded detail -- always rendered but hidden via height animation */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={
            hovered
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 6 }
          }
          transition={{ duration: 0.3, delay: hovered ? 0.1 : 0 }}
          className="mt-3 border-t border-white/10 pt-3"
        >
          <p className="text-sm leading-relaxed text-white/70">
            {pillar.details}
          </p>
        </motion.div>

        {/* Hint when not hovered */}
        <motion.span
          animate={{ opacity: hovered ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="mt-3 inline-block text-[10px] tracking-wider text-gold/40 uppercase"
        >
          Hover to learn more
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

function Mission() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  /* Parallax scroll setup */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxSlow = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const parallaxMed = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const parallaxFast = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-navy py-28 sm:py-36"
    >
      {/* ---- Parallax background layers ---- */}
      <motion.div
        style={{ y: parallaxSlow }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,168,76,0.08)_0%,transparent_60%)]"
      />
      <motion.div
        style={{ y: parallaxMed }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,168,76,0.05)_0%,transparent_50%)]"
      />
      <motion.div
        style={{ y: parallaxFast }}
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-gold/[0.03] blur-3xl"
      />
      <motion.div
        style={{ y: parallaxMed }}
        className="pointer-events-none absolute -bottom-24 left-1/4 h-72 w-72 rounded-full bg-gold-light/[0.04] blur-3xl"
      />

      {/* ---- Value Marquee Banner ---- */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ValueMarquee />
      </div>

      {/* ---- Main grid ---- */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 mx-auto mt-8 grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8"
      >
        {/* ---------- Left column -- text content ---------- */}
        <div>
          <motion.span
            variants={fadeUp}
            className="mb-3 inline-block rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold tracking-widest text-gold uppercase"
          >
            Our Purpose
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mb-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Company{" "}
            <span className="bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
              Mission
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mb-10 max-w-xl text-lg leading-relaxed text-white/80 sm:text-xl"
          >
            At GCG, our mission is to{" "}
            <HighlightWord delay={0.2}>innovate</HighlightWord> and lead with{" "}
            <HighlightWord delay={0.4}>integrity</HighlightWord>, providing
            exceptional value to our customers through groundbreaking solutions.
            We are committed to{" "}
            <HighlightWord delay={0.6}>sustainability</HighlightWord>,{" "}
            <HighlightWord delay={0.8}>excellence</HighlightWord>, and fostering
            a culture of continuous improvement. By prioritizing our community,
            we strive to make a positive impact on the world around us, ensuring
            a better future for generations to come. Our dedication to quality,
            customer satisfaction, and ethical business practices guides our path
            forward as we continue to set new standards in our industry.
          </motion.p>

          {/* Pillar cards with hover reveal */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 gap-3 sm:gap-4"
          >
            {PILLARS.map((pillar) => (
              <PillarCard key={pillar.label} pillar={pillar} />
            ))}
          </motion.div>
        </div>

        {/* ---------- Right column -- orbital + metrics ---------- */}
        <motion.div
          variants={fadeLeft}
          className="relative flex flex-col items-center justify-center gap-12"
        >
          {/* ---- Orbital animation with 2 rings ---- */}
          <div className="relative aspect-square w-full max-w-md [perspective:900px]">
            {/* Outer rotating ring */}
            <motion.div
              animate={{ rotateY: 360, rotateX: 15 }}
              transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border border-gold/15 [transform-style:preserve-3d]"
            >
              {/* Orbiting dot with teal/cyan accent */}
              <div className="absolute -top-1.5 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#00d4aa]/60 shadow-[0_0_8px_2px_rgba(0,212,170,0.3)]" />
            </motion.div>

            {/* Inner rotating ring (counter-clockwise) */}
            <motion.div
              animate={{ rotateY: -360, rotateX: -10 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-12 rounded-full border border-gold/10 sm:inset-16 [transform-style:preserve-3d]"
            >
              <div className="absolute -right-1 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-gold/50 shadow-[0_0_6px_2px_rgba(201,168,76,0.25)]" />
              {/* Additional teal accent dot */}
              <div className="absolute -left-1 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#00d4aa]/50 shadow-[0_0_5px_1px_rgba(0,212,170,0.2)]" />
            </motion.div>

            {/* Center orb */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-28 w-28 rounded-full sm:h-36 sm:w-36">
                {/* Outer glow */}
                <div className="absolute -inset-4 rounded-full bg-gold/[0.06] blur-3xl" />
                {/* Inner gradient orb */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/30 via-gold-light/15 to-transparent shadow-[inset_0_0_20px_rgba(201,168,76,0.2)]" />
                {/* Highlight */}
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white/10 to-transparent" />
              </div>
            </div>
          </div>

          {/* ---- Animated metrics ---- */}
          <motion.div
            variants={fadeUp}
            className="grid w-full max-w-md grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {METRICS.map((m) => (
              <div
                key={m.label}
                className="flex flex-col items-center rounded-xl border border-white/10 bg-white/[0.03] px-3 py-4 backdrop-blur-sm"
              >
                <span className="text-2xl font-extrabold text-gold sm:text-3xl">
                  <AnimatedCounter target={m.value} suffix={m.suffix} />
                </span>
                <span className="mt-1 text-center text-xs font-medium tracking-widest text-white/60 uppercase">
                  {m.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ---- Featured Quote Block ---- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 mx-auto mt-24 max-w-3xl px-6 text-center"
      >
        {/* Large decorative opening quote mark */}
        <FaQuoteLeft className="mx-auto mb-2 h-12 w-12 text-gold/20" />

        <blockquote className="text-xl leading-relaxed font-light text-white/85 italic sm:text-2xl md:text-3xl">
          Our commitment to innovation drives everything we do.
        </blockquote>

        {/* Large decorative closing quote mark */}
        <div className="mt-2 flex justify-center">
          <FaQuoteLeft className="h-12 w-12 rotate-180 text-gold/20" />
        </div>

        {/* Attribution */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold/40" />
          <p className="text-sm font-semibold tracking-wider text-gold uppercase">
            GCG Leadership
          </p>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold/40" />
        </div>
      </motion.div>
    </section>
  );
}

export default Mission;
