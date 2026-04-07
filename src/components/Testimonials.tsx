import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "GCG transformed our approach to market expansion. Their strategic consulting gave us the clarity and confidence to enter two new regions, resulting in 40% revenue growth within a year.",
    name: "Sophie Marchand",
    title: "CEO",
    company: "Meridian Ventures",
    rating: 5,
  },
  {
    quote:
      "The R&D team at GCG is exceptional. They helped us develop a proprietary process that cut our production costs by 25% while improving quality. Truly world-class expertise.",
    name: "Karim El-Amine",
    title: "Director of Innovation",
    company: "NovaTech Industries",
    rating: 5,
  },
  {
    quote:
      "My son went from struggling in physics to finishing top of his class. GCG's tutoring approach is personal, patient, and incredibly effective. We could not be more grateful.",
    name: "Layla Haddad",
    title: "Parent",
    company: "Private Client",
    rating: 5,
  },
  {
    quote:
      "Working with GCG felt like having a dedicated partner, not just a consultant. Their hands-on approach and deep industry knowledge set them apart from every firm we have worked with.",
    name: "Thomas Renaud",
    title: "COO",
    company: "Altera Group",
    rating: 5,
  },
];

const AUTO_SCROLL_INTERVAL = 5000;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
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

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <FaStar
          key={i}
          className={`h-4 w-4 ${
            i < rating ? "text-gold" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  // Auto-scroll carousel on mobile
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, AUTO_SCROLL_INTERVAL);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-navy py-28 md:py-36"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-gold/10 via-transparent to-transparent blur-3xl" />
        <div className="absolute -left-32 bottom-1/4 h-[400px] w-[400px] rounded-full bg-gradient-to-tr from-gold/8 via-transparent to-transparent blur-3xl" />
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
            className="inline-block rounded-full border border-gold/30 bg-gold/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold"
          >
            Testimonials
          </motion.span>
          <motion.h2
            variants={headingVariants}
            className="mt-4 text-5xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl"
          >
            What Our Clients{" "}
            <span className="text-gold">Say</span>
          </motion.h2>
          <motion.p
            variants={headingVariants}
            className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70"
          >
            Real stories from the people and organizations we have had the
            privilege of working with.
          </motion.p>
        </motion.div>

        {/* Desktop grid */}
        <motion.div
          className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-colors duration-300 hover:border-gold/25 hover:bg-white/[0.06]"
            >
              {/* Decorative quotation mark */}
              <span
                className="pointer-events-none absolute -top-2 left-5 select-none text-6xl font-serif leading-none text-gold/15"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              {/* Stars */}
              <div className="relative mb-4">
                <StarRating rating={t.rating} />
              </div>

              {/* Quote */}
              <p className="relative mb-6 flex-1 text-base leading-relaxed text-white/80">
                {t.quote}
              </p>

              {/* Author */}
              <div className="relative mt-auto border-t border-white/10 pt-4">
                <p className="text-sm font-semibold text-white">{t.name}</p>
                <p className="text-xs text-gold/70">
                  {t.title}, {t.company}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile carousel */}
        <div
          className="md:hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
        >
          <div className="relative min-h-[20rem]">
            <AnimatePresence mode="wait">
              {TESTIMONIALS.map(
                (t, i) =>
                  i === activeIndex && (
                    <motion.div
                      key={t.name}
                      initial={{ opacity: 0, x: 60 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -60 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="absolute inset-x-0 flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm"
                    >
                      {/* Decorative quotation mark */}
                      <span
                        className="pointer-events-none absolute -top-2 left-5 select-none text-6xl font-serif leading-none text-gold/15"
                        aria-hidden="true"
                      >
                        &ldquo;
                      </span>

                      <div className="relative mb-4">
                        <StarRating rating={t.rating} />
                      </div>

                      <p className="relative mb-6 text-base leading-relaxed text-white/80">
                        {t.quote}
                      </p>

                      <div className="relative mt-auto border-t border-white/10 pt-4">
                        <p className="text-sm font-semibold text-white">
                          {t.name}
                        </p>
                        <p className="text-xs text-gold/70">
                          {t.title}, {t.company}
                        </p>
                      </div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>

          {/* Dots indicator */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-8 bg-gold"
                    : "w-2 bg-white/25 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
