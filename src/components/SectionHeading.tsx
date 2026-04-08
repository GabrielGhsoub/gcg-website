import { motion } from "framer-motion";
import { headingVariants } from "@shared/animations";

interface SectionHeadingProps {
  badge: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  /** "dark" = section has navy background (always white text).
   *  "light" = section has light/white background (adapts to dark mode via CSS vars). */
  variant?: "light" | "dark";
}

function SectionHeading({
  badge,
  title,
  highlight,
  subtitle,
  variant = "dark",
}: SectionHeadingProps) {
  const isDarkSection = variant === "dark";

  return (
    <>
      <motion.span
        variants={headingVariants}
        className={`inline-block rounded-full border px-4 py-1 text-xs font-semibold uppercase tracking-widest ${
          isDarkSection
            ? "border-gold/30 bg-gold/10 text-gold"
            : "border-navy/10 bg-navy/5 text-navy dark:border-gold/30 dark:bg-gold/10 dark:text-gold"
        }`}
      >
        {badge}
      </motion.span>
      <motion.h2
        variants={headingVariants}
        className={`mt-4 text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl ${
          isDarkSection
            ? "text-white"
            : "text-[var(--color-text-primary)]"
        }`}
      >
        {title}
        {highlight && (
          <>
            {" "}
            <span className="text-gold">{highlight}</span>
          </>
        )}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={headingVariants}
          className={`mx-auto mt-5 max-w-2xl text-lg leading-relaxed ${
            isDarkSection
              ? "text-white/70"
              : "text-[var(--color-text-secondary)]"
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </>
  );
}

export default SectionHeading;
