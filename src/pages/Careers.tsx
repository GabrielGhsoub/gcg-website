import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaMicroscope,
  FaUsers,
  FaBookOpen,
  FaRocket,
  FaEnvelope,
  FaFlask,
  FaChartBar,
  FaBriefcase,
} from "react-icons/fa";
import PageTransition from "../components/PageTransition";

const VALUES = [
  {
    icon: FaMicroscope,
    title: "Intellectual Curiosity",
    description:
      "We encourage questioning and exploration. Every hypothesis matters, and no idea is too bold to investigate.",
  },
  {
    icon: FaUsers,
    title: "Collaborative Research",
    description:
      "Cross-disciplinary teamwork drives our best work. Breakthroughs happen when diverse expertise converges.",
  },
  {
    icon: FaBookOpen,
    title: "Continuous Learning",
    description:
      "Regular seminars, conferences, and skill development keep our team at the forefront of scientific knowledge.",
  },
  {
    icon: FaRocket,
    title: "Impact-Driven Work",
    description:
      "Every project contributes to meaningful scientific advancement. We measure success by the difference we make.",
  },
];

const DEPARTMENTS = [
  {
    icon: FaFlask,
    title: "Research Lab",
    description:
      "Design and execute experiments, analyze data, and publish findings that push the boundaries of current knowledge.",
  },
  {
    icon: FaChartBar,
    title: "Data Science",
    description:
      "Build models and analytics pipelines that turn raw research data into actionable scientific insights.",
  },
  {
    icon: FaBookOpen,
    title: "Education",
    description:
      "Develop curricula, learning tools, and outreach programs that make science accessible to a broader audience.",
  },
  {
    icon: FaBriefcase,
    title: "Business Development",
    description:
      "Forge partnerships, secure funding, and translate research outcomes into real-world applications and market value.",
  },
];

function Careers() {
  useEffect(() => {
    document.title = "Careers | GCG";
  }, []);

  const valuesRef = useRef<HTMLDivElement>(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: "-80px" });

  const deptRef = useRef<HTMLDivElement>(null);
  const deptInView = useInView(deptRef, { once: true, margin: "-80px" });

  const positionsRef = useRef<HTMLDivElement>(null);
  const positionsInView = useInView(positionsRef, {
    once: true,
    margin: "-80px",
  });

  return (
    <PageTransition>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-navy">
        {/* Science background decoration */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[150px]" />
          <svg
            className="absolute inset-0 h-full w-full opacity-[0.04]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="science-grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="20" cy="20" r="1" fill="#c9a84c" />
                <line
                  x1="0"
                  y1="20"
                  x2="40"
                  y2="20"
                  stroke="#c9a84c"
                  strokeWidth="0.3"
                  strokeDasharray="2 6"
                />
                <line
                  x1="20"
                  y1="0"
                  x2="20"
                  y2="40"
                  stroke="#c9a84c"
                  strokeWidth="0.3"
                  strokeDasharray="2 6"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#science-grid)" />
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 py-32 text-center sm:px-6 lg:px-8">
          <motion.div
            className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FaMicroscope className="h-6 w-6 text-gold" />
          </motion.div>
          <motion.h1
            className="text-4xl font-bold text-white md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Join Our{" "}
            <span className="bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
              Research Team
            </span>
          </motion.h1>
          <motion.p
            className="mx-auto mt-6 max-w-2xl text-base text-white/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Be part of a team pushing the boundaries of science and innovation
          </motion.p>
        </div>
      </section>

      {/* Scientific Culture & Values */}
      <section ref={valuesRef} className="bg-cream py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-navy sm:text-4xl">
              Our Scientific Culture
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-navy/60">
              At GCG, scientific rigor meets creative ambition. We foster an
              environment where researchers, engineers, and educators collaborate
              to solve problems that matter.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                className="rounded-2xl border border-navy/10 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
                initial={{ opacity: 0, y: 30 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-navy">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/60">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Departments */}
      <section ref={deptRef} className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={deptInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-navy sm:text-4xl">
              Departments
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-navy/60">
              Our work spans multiple disciplines, each contributing a vital
              piece to the broader mission of scientific advancement.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {DEPARTMENTS.map((dept, i) => (
              <motion.div
                key={dept.title}
                className="rounded-2xl border border-navy/10 bg-cream p-8 shadow-sm transition-shadow hover:shadow-md"
                initial={{ opacity: 0, y: 30 }}
                animate={deptInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 text-gold">
                  <dept.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-navy">
                  {dept.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/60">
                  {dept.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section ref={positionsRef} className="bg-cream py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={positionsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-navy sm:text-4xl">
              Open Positions
            </h2>
          </motion.div>

          <motion.div
            className="mx-auto mt-12 max-w-xl rounded-2xl border border-navy/10 bg-white p-10"
            initial={{ opacity: 0, y: 20 }}
            animate={positionsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
              <FaUsers className="h-7 w-7 text-gold" />
            </div>
            <p className="text-lg font-medium text-navy">
              We're always looking for talented scientists, researchers, and
              educators
            </p>
            <p className="mt-3 text-base text-navy/60">
              No specific openings at this time, but we'd love to hear from you.
              Send us your CV and we'll reach out when a fitting opportunity
              arises.
            </p>
            <a
              href="mailto:contact@gcginnovate.com?subject=CV%20Submission"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-8 py-3 text-base font-semibold text-navy shadow-lg shadow-gold/20 transition-colors hover:bg-gold-light"
            >
              <FaEnvelope className="h-4 w-4" />
              Send Your CV
            </a>
            <p className="mt-4 text-sm text-navy/40">
              contact@gcginnovate.com
            </p>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}

export default Careers;
