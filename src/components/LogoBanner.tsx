import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

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
  const { resolvedMode } = useTheme();
  const isDark = resolvedMode === "dark";

  // Duplicate the list so the marquee appears infinite
  const logos = [...PARTNERS, ...PARTNERS];

  return (
    <section
      className="relative overflow-hidden py-16 md:py-20"
      style={{
        backgroundColor: isDark ? "#0F172A" : "#ffffff",
      }}
    >
      {/* Section heading */}
      <motion.p
        className="mb-12 text-center text-xs font-semibold uppercase tracking-[0.3em]"
        style={{
          color: isDark ? "rgba(148, 163, 184, 0.7)" : "rgba(107, 114, 128, 1)",
        }}
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
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 md:w-40"
          style={{
            background: isDark
              ? "linear-gradient(to right, #0F172A, transparent)"
              : "linear-gradient(to right, #ffffff, transparent)",
          }}
        />
        {/* Right fade */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 md:w-40"
          style={{
            background: isDark
              ? "linear-gradient(to left, #0F172A, transparent)"
              : "linear-gradient(to left, #ffffff, transparent)",
          }}
        />

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
                className="shrink-0 select-none whitespace-nowrap text-xl font-bold tracking-wide transition-colors duration-300 md:text-2xl"
                style={{
                  color: isDark ? "rgba(148, 163, 184, 0.4)" : "rgb(209, 213, 219)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = isDark ? "rgba(148, 163, 184, 0.7)" : "rgb(107, 114, 128)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = isDark ? "rgba(148, 163, 184, 0.4)" : "rgb(209, 213, 219)";
                }}
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
