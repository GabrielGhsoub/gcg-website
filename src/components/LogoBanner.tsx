import { motion } from "framer-motion";

const PARTNERS = [
  "TechVision",
  "InnovateCo",
  "FutureWorks",
  "GlobalEdge",
  "NexGen Solutions",
  "Catalyst Labs",
  "PrimeConsult",
  "Horizon Group",
];

function LogoBanner() {
  // Duplicate the list so the marquee appears infinite
  const logos = [...PARTNERS, ...PARTNERS];

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-20">
      {/* Section heading */}
      <motion.p
        className="mb-12 text-center text-xs font-semibold uppercase tracking-[0.3em] text-gray-500"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6 }}
      >
        Trusted By Leading Organizations
      </motion.p>

      {/* Marquee container */}
      <div className="relative">
        {/* Left fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent md:w-40" />
        {/* Right fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent md:w-40" />

        {/* Scrolling track */}
        <div className="flex overflow-hidden">
          <motion.div
            className="flex shrink-0 items-center gap-12 md:gap-20"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {logos.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="shrink-0 select-none whitespace-nowrap text-xl font-bold tracking-wide text-gray-300 transition-colors duration-300 hover:text-gray-500 md:text-2xl"
              >
                {name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default LogoBanner;
