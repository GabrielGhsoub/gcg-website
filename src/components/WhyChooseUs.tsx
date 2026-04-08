import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import {
  FaUserGraduate,
  FaChartLine,
  FaGlobeAmericas,
  FaMicroscope,
  FaDna,
  FaClipboardCheck,
} from "react-icons/fa";
import type { IconType } from "react-icons";

interface Differentiator {
  icon: IconType;
  title: string;
  description: string;
}

const DIFFERENTIATORS: Differentiator[] = [
  {
    icon: FaUserGraduate,
    title: "Expert Team",
    description:
      "Our multidisciplinary specialists bring decades of combined experience across consulting, R&D, and education to every engagement.",
  },
  {
    icon: FaChartLine,
    title: "Proven Track Record",
    description:
      "A portfolio of successful projects with measurable outcomes, backed by client partnerships that span years of trust.",
  },
  {
    icon: FaGlobeAmericas,
    title: "Global Reach",
    description:
      "With offices in Beirut and Paris, we bridge markets and cultures, delivering international perspective with local insight.",
  },
  {
    icon: FaMicroscope,
    title: "Personalized Approach",
    description:
      "No cookie-cutter solutions. Every strategy is crafted around your unique challenges, goals, and organizational context.",
  },
  {
    icon: FaDna,
    title: "Innovative Solutions",
    description:
      "We leverage cutting-edge methodologies and emerging technologies to keep you ahead of the curve in a rapidly evolving landscape.",
  },
  {
    icon: FaClipboardCheck,
    title: "Measurable Results",
    description:
      "Clear KPIs, transparent reporting, and continuous optimization ensure every initiative delivers tangible, quantifiable impact.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
} as const;

const headingVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" as const },
  },
} as const;

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.2, ease: "easeOut" as const, delay: 0.2 },
  },
} as const;

function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const { resolvedMode } = useTheme();
  const isDark = resolvedMode === "dark";

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-cream py-28 md:py-36"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-40 top-1/4 h-80 w-80 rounded-full bg-navy/[0.03] blur-3xl" />
        <div className="absolute -right-40 bottom-1/4 h-80 w-80 rounded-full bg-gold/[0.06] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-12">
        {/* Section heading */}
        <motion.div
          className="mb-16 text-center"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.span
            variants={headingVariants}
            className="inline-block rounded-full border border-navy/10 bg-navy/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-navy"
          >
            Our Advantage
          </motion.span>
          <motion.h2
            variants={headingVariants}
            className="mt-4 text-5xl font-extrabold tracking-tight text-navy md:text-6xl lg:text-7xl"
          >
            Why Choose <span className="text-gold">GCG</span>
          </motion.h2>
          <motion.p
            variants={headingVariants}
            className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600"
          >
            What sets us apart is our scientific rigor and the lasting impact
            we create for every client.
          </motion.p>

          {/* Animated decorative line */}
          <motion.div
            variants={lineVariants}
            className="mx-auto mt-8 h-[2px] w-24 origin-center bg-gradient-to-r from-transparent via-gold to-transparent"
          />
        </motion.div>

        {/* Differentiators grid */}
        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {DIFFERENTIATORS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative rounded-2xl border border-navy/[0.06] bg-white/60 p-8 shadow-sm backdrop-blur-md transition-shadow duration-300 hover:shadow-lg hover:shadow-navy/[0.06]"
              >
                {/* Hover gradient overlay */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-navy/[0.02] to-gold/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Icon */}
                <div
                  className="relative mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl shadow-md transition-shadow duration-300 group-hover:shadow-lg"
                  style={{
                    background: isDark
                      ? "linear-gradient(to bottom right, #000040, #271e59)"
                      : "linear-gradient(to bottom right, #c9a84c, rgba(201, 168, 76, 0.8))",
                    color: isDark ? "#ffffff" : "#000040",
                    boxShadow: isDark
                      ? "0 4px 6px -1px rgba(0, 0, 64, 0.2)"
                      : "0 4px 6px -1px rgba(201, 168, 76, 0.2)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = isDark
                      ? "0 10px 15px -3px rgba(0, 0, 64, 0.3)"
                      : "0 10px 15px -3px rgba(201, 168, 76, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = isDark
                      ? "0 4px 6px -1px rgba(0, 0, 64, 0.2)"
                      : "0 4px 6px -1px rgba(201, 168, 76, 0.2)";
                  }}
                >
                  <Icon className="h-6 w-6" />
                </div>

                {/* Content */}
                <h3 className="relative mb-3 text-xl font-bold tracking-tight text-navy">
                  {item.title}
                </h3>
                <p className="relative text-base leading-relaxed text-gray-600">
                  {item.description}
                </p>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
