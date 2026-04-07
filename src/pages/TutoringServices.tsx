import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  FaAtom,
  FaFlask,
  FaDna,
  FaMicroscope,
  FaCalculator,
  FaLaptopCode,
  FaCogs,
  FaQuoteLeft,
} from "react-icons/fa";
import PageTransition from "../components/PageTransition";

const SUBJECTS = [
  {
    icon: FaCalculator,
    title: "Mathematics",
    description:
      "From algebra and calculus to statistics and discrete mathematics, building strong analytical foundations.",
  },
  {
    icon: FaAtom,
    title: "Physics",
    description:
      "Classical mechanics, electromagnetism, quantum physics, and thermodynamics with hands-on problem solving.",
  },
  {
    icon: FaFlask,
    title: "Chemistry",
    description:
      "Organic, inorganic, and physical chemistry with emphasis on molecular reasoning and lab technique.",
  },
  {
    icon: FaDna,
    title: "Biology",
    description:
      "Cell biology, genetics, ecology, and human physiology taught through systems-level understanding.",
  },
  {
    icon: FaLaptopCode,
    title: "Computer Science",
    description:
      "Programming fundamentals, data structures, algorithms, and computational thinking for all levels.",
  },
  {
    icon: FaCogs,
    title: "Engineering",
    description:
      "Mechanical, electrical, and civil engineering principles with applied problem-solving methodology.",
  },
];

const METHODOLOGY = [
  {
    title: "Diagnostic Assessment",
    description:
      "We begin with a thorough evaluation of each student's current knowledge, identifying specific gaps and strengths through evidence-based diagnostic tools.",
  },
  {
    title: "Structured Curriculum Design",
    description:
      "Based on assessment data, we construct a personalized learning pathway that sequences concepts for optimal retention and comprehension.",
  },
  {
    title: "Active Recall & Spaced Repetition",
    description:
      "Our sessions employ proven cognitive science techniques, using active recall testing and spaced repetition to maximize long-term memory formation.",
  },
  {
    title: "Iterative Feedback Loops",
    description:
      "Regular performance checkpoints allow us to refine the approach, ensuring continuous improvement and adapting to each student's evolving needs.",
  },
];

const STATS = [
  { value: "500+", label: "Students Helped" },
  { value: "95%", label: "Pass Rate" },
  { value: "15+", label: "Subjects Covered" },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function TutoringServices() {
  useEffect(() => {
    document.title = "Science Tutoring Services | GCG";
  }, []);

  const subjectsRef = useRef<HTMLDivElement>(null);
  const subjectsInView = useInView(subjectsRef, { once: true, margin: "-80px" });

  const methodologyRef = useRef<HTMLDivElement>(null);
  const methodologyInView = useInView(methodologyRef, { once: true, margin: "-80px" });

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  const testimonialRef = useRef<HTMLDivElement>(null);
  const testimonialInView = useInView(testimonialRef, { once: true, margin: "-80px" });

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-navy">
        {/* Molecular background pattern */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[150px]" />
          {/* Subtle molecule nodes */}
          <div className="absolute left-[15%] top-[20%] h-3 w-3 rounded-full bg-gold/15" />
          <div className="absolute left-[22%] top-[35%] h-2 w-2 rounded-full bg-gold/10" />
          <div className="absolute right-[20%] top-[25%] h-2.5 w-2.5 rounded-full bg-gold/12" />
          <div className="absolute right-[30%] bottom-[30%] h-3 w-3 rounded-full bg-gold/10" />
          <div className="absolute left-[40%] bottom-[25%] h-2 w-2 rounded-full bg-gold/15" />
          {/* Connecting lines */}
          <div className="absolute left-[16%] top-[22%] h-[1px] w-20 rotate-[35deg] bg-gradient-to-r from-gold/15 to-transparent" />
          <div className="absolute right-[22%] top-[27%] h-[1px] w-16 -rotate-[20deg] bg-gradient-to-r from-gold/12 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 py-32 text-center sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaMicroscope className="h-8 w-8 text-gold" />
          </motion.div>
          <motion.h1
            className="text-4xl font-bold text-white md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Science Tutoring{" "}
            <span className="bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
              Services
            </span>
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-base text-white/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Evidence-based instruction across the sciences, engineered to build
            deep understanding and lasting academic confidence
          </motion.p>
        </div>
      </section>

      {/* Subjects Covered */}
      <section ref={subjectsRef} className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial="hidden"
            animate={subjectsInView ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold text-navy md:text-5xl">
              Subjects We Cover
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-navy/60">
              Comprehensive tutoring across core STEM disciplines, delivered by
              subject-matter specialists with research backgrounds.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SUBJECTS.map((subject, i) => (
              <motion.div
                key={subject.title}
                className="rounded-2xl border border-navy/10 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
                initial={{ opacity: 0, y: 30 }}
                animate={subjectsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <subject.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-navy">
                  {subject.title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-navy/60">
                  {subject.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
      <section ref={methodologyRef} className="bg-white py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial="hidden"
            animate={methodologyInView ? "visible" : "hidden"}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold text-navy md:text-5xl">
              Our Scientific Approach to Learning
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-navy/60">
              Every tutoring program is built on cognitive science research,
              applying the same rigor to teaching that we bring to the subjects
              themselves.
            </p>
          </motion.div>

          <div className="mt-14 space-y-6">
            {METHODOLOGY.map((item, i) => (
              <motion.div
                key={item.title}
                className="flex gap-4 rounded-2xl border border-navy/5 bg-cream p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={methodologyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/10 text-sm font-bold text-gold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-navy">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-base leading-relaxed text-navy/60">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section ref={statsRef} className="bg-navy py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="text-4xl font-extrabold text-gold md:text-5xl">
                  {stat.value}
                </div>
                <div className="mt-2 text-base text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section ref={testimonialRef} className="bg-cream py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="rounded-2xl border border-navy/10 bg-white p-8 text-center shadow-sm md:p-12"
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <FaQuoteLeft className="mx-auto mb-6 h-8 w-8 text-gold/30" />
            <p className="text-base leading-relaxed text-navy/80 md:text-lg">
              "I was struggling with organic chemistry and nearly dropped the
              course. After working with GCG for just six weeks, everything
              clicked. Their systematic approach didn't just help me pass -- it
              gave me the confidence to pursue a biochemistry major."
            </p>
            <div className="mt-6">
              <p className="font-semibold text-navy">Amara K.</p>
              <p className="text-sm text-navy/50">
                Undergraduate, Biochemistry
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white md:text-5xl">
            Book a Free Session
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/60">
            Schedule an introductory consultation to discuss your academic goals
            and build a personalized study plan.
          </p>
          <Link
            to="/#contact"
            className="mt-8 inline-flex items-center rounded-full bg-gold px-8 py-3 text-base font-semibold text-navy shadow-lg shadow-gold/20 transition-colors hover:bg-gold-light"
          >
            Book a Free Session
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}

export default TutoringServices;
