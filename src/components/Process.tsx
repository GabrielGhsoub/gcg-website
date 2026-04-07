import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaMicroscope,
  FaFlask,
  FaVial,
  FaChartLine,
} from "react-icons/fa";
import type { IconType } from "react-icons";

interface Step {
  number: string;
  title: string;
  description: string;
  icon: IconType;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Research & Analysis",
    description:
      "We examine your environment with scientific precision, gathering data and mapping variables to form a clear understanding of the current state.",
    icon: FaMicroscope,
  },
  {
    number: "02",
    title: "Hypothesis & Planning",
    description:
      "From our findings, we formulate a strategic hypothesis and design a structured plan with testable milestones aligned to your objectives.",
    icon: FaFlask,
  },
  {
    number: "03",
    title: "Experimentation",
    description:
      "We execute controlled implementations, deploying solutions methodically while monitoring key indicators to validate our approach in real conditions.",
    icon: FaVial,
  },
  {
    number: "04",
    title: "Results & Scaling",
    description:
      "Through rigorous measurement and analysis, we refine what works, document outcomes, and scale proven results for sustained, repeatable growth.",
    icon: FaChartLine,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.25 },
  },
} as const;

const stepVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
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

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: "easeOut" as const, delay: 0.3 },
  },
} as const;

const verticalLineVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.8, ease: "easeOut" as const, delay: 0.3 },
  },
} as const;

function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-navy py-28 md:py-36"
    >
      {/* Background decorations - molecular nodes */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-40 top-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-gold/10 via-transparent to-transparent blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-gold/8 via-transparent to-transparent blur-3xl" />
        {/* Subtle molecule decoration nodes */}
        <div className="absolute left-[8%] top-[15%] h-2 w-2 rounded-full bg-gold/10" />
        <div className="absolute left-[12%] top-[28%] h-1.5 w-1.5 rounded-full bg-gold/8" />
        <div className="absolute right-[10%] bottom-[20%] h-2 w-2 rounded-full bg-gold/10" />
        <div className="absolute right-[15%] bottom-[35%] h-1.5 w-1.5 rounded-full bg-gold/8" />
        {/* Molecular bond lines */}
        <div className="absolute left-[9%] top-[17%] h-[1px] w-12 rotate-[40deg] bg-gradient-to-r from-gold/10 to-transparent" />
        <div className="absolute right-[11%] bottom-[22%] h-[1px] w-14 -rotate-[30deg] bg-gradient-to-r from-gold/8 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 md:px-12">
        {/* Section heading */}
        <motion.div
          className="mb-16 text-center md:mb-20"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.span
            variants={headingVariants}
            className="inline-block rounded-full border border-gold/30 bg-gold/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold"
          >
            Our Methodology
          </motion.span>
          <motion.h2
            variants={headingVariants}
            className="mt-4 text-4xl font-extrabold tracking-tight text-white md:text-5xl"
          >
            The Scientific <span className="text-gold">Process</span>
          </motion.h2>
          <motion.p
            variants={headingVariants}
            className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/70"
          >
            A rigorous, evidence-based methodology that transforms inquiry into
            measurable outcomes.
          </motion.p>
        </motion.div>

        {/* Desktop horizontal timeline */}
        <motion.div
          className="hidden md:block"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Steps grid */}
          <div className="relative grid grid-cols-4 gap-8">
            {/* Connecting molecular bond line */}
            <motion.div
              variants={lineVariants}
              className="absolute left-[12.5%] right-[12.5%] top-[3.25rem] h-[2px] origin-left bg-gradient-to-r from-gold/60 via-gold/40 to-gold/60"
              style={{ zIndex: 0 }}
            />
            {/* Bond node dots along the line */}
            <div className="absolute left-[37%] top-[3.1rem] z-[1] h-1.5 w-1.5 rounded-full bg-gold/40" />
            <div className="absolute left-[62%] top-[3.1rem] z-[1] h-1.5 w-1.5 rounded-full bg-gold/40" />

            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  variants={stepVariants}
                  className="relative z-10 flex flex-col items-center text-center"
                >
                  {/* Icon circle */}
                  <div className="group relative mb-6">
                    <div className="absolute -inset-2 rounded-full bg-gold/10 opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="relative flex h-[6.5rem] w-[6.5rem] items-center justify-center rounded-full border-2 border-gold/30 bg-navy transition-colors duration-300 group-hover:border-gold/60">
                      <Icon className="h-7 w-7 text-gold" />
                    </div>
                    {/* Step number badge */}
                    <span className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-gold text-xs font-bold text-navy shadow-lg shadow-gold/30">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="mb-2 text-xl font-bold tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="text-base leading-relaxed text-white/70">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Mobile vertical timeline */}
        <motion.div
          className="relative md:hidden"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Vertical connecting bond line */}
          <motion.div
            variants={verticalLineVariants}
            className="absolute bottom-0 left-[2.25rem] top-0 w-[2px] origin-top bg-gradient-to-b from-gold/60 via-gold/30 to-gold/60"
          />
          {/* Bond node dots along vertical line */}
          <div className="absolute left-[2.1rem] top-[30%] z-[1] h-1.5 w-1.5 rounded-full bg-gold/40" />
          <div className="absolute left-[2.1rem] top-[60%] z-[1] h-1.5 w-1.5 rounded-full bg-gold/40" />

          <div className="space-y-10">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  variants={stepVariants}
                  className="relative flex gap-6"
                >
                  {/* Icon circle */}
                  <div className="relative z-10 shrink-0">
                    <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border-2 border-gold/30 bg-navy">
                      <Icon className="h-5 w-5 text-gold" />
                    </div>
                    <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-[0.65rem] font-bold text-navy shadow-md">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="pt-3">
                    <h3 className="mb-1 text-xl font-bold tracking-tight text-white">
                      {step.title}
                    </h3>
                    <p className="text-base leading-relaxed text-white/70">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Process;
