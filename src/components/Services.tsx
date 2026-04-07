import { useRef, useCallback } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
  type Variants,
} from "framer-motion";
import {
  FaHandshake,
  FaFlask,
  FaAtom,
  FaArrowRight,
} from "react-icons/fa";
import type { IconType } from "react-icons";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Service {
  title: string;
  description: string;
  icon: IconType;
  badge?: string;
  featured?: boolean;
}

const services: Service[] = [
  {
    title: "Consulting",
    description:
      "Strategic insights for business growth, empowering organizations through expert guidance.",
    icon: FaHandshake,
    badge: "Popular",
    featured: true,
  },
  {
    title: "Research And Development",
    description:
      "Exploring frontiers, driving breakthroughs through innovative research across diverse fields.",
    icon: FaFlask,
  },
  {
    title: "Tutoring Services",
    description:
      "Unlocking potential through personalized instruction for academic excellence and growth.",
    icon: FaAtom,
    badge: "New",
  },
];

/* ------------------------------------------------------------------ */
/*  Animated gradient border wrapper                                   */
/* ------------------------------------------------------------------ */

function SimpleBorder({
  children,
  className = "",
  featured = false,
}: {
  children: React.ReactNode;
  className?: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`relative rounded-2xl border border-navy/10 transition-colors duration-300 group-hover:border-gold/50 ${className} ${
        featured ? "bg-white/50" : "bg-white/40"
      } backdrop-blur-md`}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  3D Tilt card                                                       */
/* ------------------------------------------------------------------ */

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

function TiltCard({ children, className = "" }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [3, -3]), {
    stiffness: 200,
    damping: 25,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-3, 3]), {
    stiffness: 200,
    damping: 25,
  });

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
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Animated icon with pulse + hover intensify                         */
/* ------------------------------------------------------------------ */

function AnimatedIcon({
  icon: Icon,
  featured,
}: {
  icon: IconType;
  featured?: boolean;
}) {
  return (
    <div
      className={`relative mb-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-navy to-navy-light text-white shadow-md shadow-navy/20 transition-transform duration-300 group-hover:scale-105 ${
        featured ? "h-16 w-16" : "h-14 w-14"
      }`}
    >
      <Icon className={featured ? "h-7 w-7" : "h-6 w-6"} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Floating badge with glow                                           */
/* ------------------------------------------------------------------ */

function FloatingBadge({ text }: { text: string }) {
  return (
    <motion.div
      className="absolute -right-2 -top-3 z-20"
      initial={{ scale: 0, rotate: -12 }}
      animate={{ scale: 1, rotate: -12 }}
      transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.6 }}
    >
      <span className="inline-block rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-navy shadow-lg">
        {text}
      </span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Dot grid background pattern (CSS-based for performance)            */
/* ------------------------------------------------------------------ */

function HexMolecularPattern() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hex-pattern" x="0" y="0" width="56" height="48" patternUnits="userSpaceOnUse">
            {/* Hexagon outline */}
            <polygon
              points="28,2 50,14 50,34 28,46 6,34 6,14"
              fill="none"
              stroke="rgba(0,0,64,0.04)"
              strokeWidth="0.8"
            />
            {/* Node dots at vertices */}
            <circle cx="28" cy="2" r="1" fill="rgba(0,0,64,0.05)" />
            <circle cx="50" cy="14" r="1" fill="rgba(0,0,64,0.05)" />
            <circle cx="50" cy="34" r="1" fill="rgba(0,0,64,0.05)" />
            <circle cx="28" cy="46" r="1" fill="rgba(0,0,64,0.05)" />
            <circle cx="6" cy="34" r="1" fill="rgba(0,0,64,0.05)" />
            <circle cx="6" cy="14" r="1" fill="rgba(0,0,64,0.05)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-pattern)" />
      </svg>
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

const headingVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 0.61, 0.36, 1] },
  },
};

/* ------------------------------------------------------------------ */
/*  Service card component                                             */
/* ------------------------------------------------------------------ */

interface ServiceCardProps {
  service: Service;
}

function ServiceCard({ service }: ServiceCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      className={`group relative ${
        service.featured ? "md:col-span-2 md:row-span-1" : ""
      }`}
      style={{ perspective: "800px" }}
    >
      {/* Badge */}
      {service.badge && <FloatingBadge text={service.badge} />}

      <TiltCard className="h-full">
        <SimpleBorder featured={service.featured}>
          <div
            className={`relative overflow-hidden rounded-2xl p-8 ${
              service.featured ? "md:p-10" : ""
            }`}
          >

            <div
              className={
                service.featured
                  ? "md:flex md:items-start md:gap-8"
                  : ""
              }
            >
              <div className={service.featured ? "md:shrink-0" : ""}>
                <AnimatedIcon icon={service.icon} featured={service.featured} />
              </div>

              <div className="relative">
                <h3
                  className={`mb-3 font-bold tracking-tight text-navy ${
                    service.featured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
                  }`}
                >
                  {service.title}
                </h3>
                <p
                  className={`leading-relaxed text-gray-600 ${
                    service.featured ? "text-base md:text-lg" : "text-base"
                  }`}
                >
                  {service.description}
                </p>

                {/* Learn more link with animated arrow */}
                <motion.a
                  href="#contact"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy/70 transition-colors duration-200 hover:text-navy"
                  whileHover="hover"
                >
                  <span className="relative">
                    Learn more
                    <motion.span
                      className="absolute -bottom-0.5 left-0 h-px w-0 bg-navy/40"
                      variants={{
                        hover: {
                          width: "100%",
                          transition: { duration: 0.3, ease: "easeOut" },
                        },
                      }}
                    />
                  </span>
                  <motion.span
                    className="inline-block"
                    variants={{
                      hover: {
                        x: 6,
                        transition: {
                          type: "spring",
                          stiffness: 400,
                          damping: 15,
                        },
                      },
                    }}
                  >
                    <FaArrowRight className="h-3 w-3" />
                  </motion.span>
                </motion.a>
              </div>
            </div>

            {/* Decorative bottom accent */}
            <div className="absolute bottom-0 left-8 right-8 h-[2px] rounded-full bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        </SimpleBorder>
      </TiltCard>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Services section                                                   */
/* ------------------------------------------------------------------ */

function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative bg-cream py-28 md:py-36"
    >
      {/* Hexagonal molecular background */}
      <HexMolecularPattern />

      {/* Subtle background blobs */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-navy/[0.03] blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-gold/[0.06] blur-3xl" />
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
            What We Do
          </motion.span>
          <motion.h2
            variants={headingVariants}
            className="mt-4 text-5xl font-extrabold tracking-tight text-navy md:text-6xl lg:text-7xl"
          >
            Our <span className="text-gold">Services</span>
          </motion.h2>
          <motion.p
            variants={headingVariants}
            className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600"
          >
            Science-driven solutions tailored to advance your research,
            education, and business goals.
          </motion.p>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 md:auto-rows-auto"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a
            href="#contact"
            className="group/cta inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-base font-semibold text-navy shadow-lg shadow-gold/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-xl hover:shadow-gold/30"
          >
            Book a Free Consultation
            <motion.svg
              className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </motion.svg>
          </a>
        </motion.div>
      </div>

    </section>
  );
}

export default Services;
