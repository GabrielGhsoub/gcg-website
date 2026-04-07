import { useRef, useState, useEffect, type FormEvent } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaCheck,
  FaClock,
  FaPaperPlane,
} from "react-icons/fa";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const contactInfo = [
  {
    icon: FaMapMarkerAlt,
    label: "Location",
    value: "Downtown Beirut, Nejmeh Square",
  },
  {
    icon: FaEnvelope,
    label: "Email",
    value: "contact@gcginnovate.com",
    href: "mailto:contact@gcginnovate.com",
  },
  {
    icon: FaPhone,
    label: "Phone",
    lines: ["+33 06 48 70 89 50", "+961 71 22 33 88"],
  },
] as const;

const serviceOptions = [
  "Consulting",
  "Research & Development",
  "Tutoring Services",
] as const;

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

/** Floating-label input field with validation micro-animations. */
function FloatingInput({
  id,
  name,
  type = "text",
  value,
  onChange,
  required,
  isFocusedField,
  onFocusField,
  onBlurField,
  validate,
  touched,
  onTouch,
  shake,
}: {
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  isFocusedField: boolean;
  onFocusField: () => void;
  onBlurField: () => void;
  validate?: (v: string) => boolean;
  touched: boolean;
  onTouch: () => void;
  shake?: boolean;
}) {
  const label = name.charAt(0).toUpperCase() + name.slice(1);
  const filled = value.length > 0;
  const isValid = validate ? validate(value) : value.length >= 2;
  const showValid = touched && filled && isValid;
  const showInvalid = touched && filled && !isValid;

  return (
    <motion.div
      className="relative"
      animate={{
        x: shake && !isValid && required ? [0, -3, 3, -3, 3, 0] : 0,
      }}
      transition={{ duration: shake ? 0.3 : 0.2 }}
    >
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={onFocusField}
        onBlur={() => {
          onBlurField();
          if (filled) onTouch();
        }}
        placeholder=" "
        className={`peer w-full rounded-lg border bg-white/[0.05] px-4 pt-5 pb-2 text-base text-white outline-none transition-all duration-300
          ${
            isFocusedField
              ? "border-gold/50 ring-2 ring-gold/20 shadow-[0_0_16px_rgba(201,168,76,0.12)]"
              : "border-white/10"
          }
          ${showInvalid ? "border-red-400/60" : ""}
        `}
      />
      {/* Floating label -- animates from inside the input to above it */}
      <motion.label
        htmlFor={id}
        className="pointer-events-none absolute left-4"
        animate={
          filled || isFocusedField
            ? { top: 6, fontSize: "10px", color: "rgba(201,168,76,0.7)" }
            : { top: 14, fontSize: "14px", color: "rgba(107,114,128,1)" }
        }
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{
          fontWeight: filled || isFocusedField ? 600 : 400,
          letterSpacing: filled || isFocusedField ? "0.05em" : "0",
          textTransform: filled || isFocusedField ? "uppercase" : "none",
        }}
      >
        {label}
      </motion.label>

      {/* Validation indicators */}
      <AnimatePresence>
        {showValid && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-green-400"
          >
            <FaCheck className="h-3.5 w-3.5" />
          </motion.span>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showInvalid && (
          <motion.span
            initial={{ x: 0 }}
            animate={{ x: [0, -4, 4, -4, 4, 0] }}
            transition={{ duration: 0.4 }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-red-400"
          >
            Invalid
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/** Floating-label textarea with the same focus/dim behavior. */
function FloatingTextarea({
  id,
  name,
  value,
  onChange,
  required,
  isFocusedField,
  onFocusField,
  onBlurField,
  touched,
  onTouch,
  shake,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  isFocusedField: boolean;
  onFocusField: () => void;
  onBlurField: () => void;
  touched: boolean;
  onTouch: () => void;
  shake?: boolean;
}) {
  const label = name.charAt(0).toUpperCase() + name.slice(1);
  const filled = value.length > 0;
  const isValid = value.length >= 10;
  const showValid = touched && filled && isValid;

  return (
    <motion.div
      className="relative"
      animate={{
        x: shake && !isValid && required ? [0, -3, 3, -3, 3, 0] : 0,
      }}
      transition={{ duration: shake ? 0.3 : 0.2 }}
    >
      <textarea
        id={id}
        name={name}
        required={required}
        rows={5}
        value={value}
        onChange={onChange}
        onFocus={onFocusField}
        onBlur={() => {
          onBlurField();
          if (filled) onTouch();
        }}
        placeholder=" "
        className={`peer w-full resize-none rounded-lg border bg-white/[0.05] px-4 pt-5 pb-2 text-base text-white outline-none transition-all duration-300
          ${
            isFocusedField
              ? "border-gold/50 ring-2 ring-gold/20 shadow-[0_0_16px_rgba(201,168,76,0.12)]"
              : "border-white/10"
          }
        `}
      />
      <motion.label
        htmlFor={id}
        className="pointer-events-none absolute left-4"
        animate={
          filled || isFocusedField
            ? { top: 6, fontSize: "10px", color: "rgba(201,168,76,0.7)" }
            : { top: 14, fontSize: "14px", color: "rgba(107,114,128,1)" }
        }
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{
          fontWeight: filled || isFocusedField ? 600 : 400,
          letterSpacing: filled || isFocusedField ? "0.05em" : "0",
          textTransform: filled || isFocusedField ? "uppercase" : "none",
        }}
      >
        {label}
      </motion.label>

      <AnimatePresence>
        {showValid && (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="absolute right-3 top-4 text-green-400"
          >
            <FaCheck className="h-3.5 w-3.5" />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/** Floating-label select. */
function FloatingSelect({
  id,
  name,
  value,
  onChange,
  required,
  options,
  isFocusedField,
  onFocusField,
  onBlurField,
}: {
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  options: readonly string[];
  isFocusedField: boolean;
  onFocusField: () => void;
  onBlurField: () => void;
}) {
  const label = name.charAt(0).toUpperCase() + name.slice(1);
  const filled = value.length > 0;

  return (
    <div className="relative">

      <select
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        onFocus={onFocusField}
        onBlur={onBlurField}
        className={`w-full cursor-pointer appearance-none rounded-lg border bg-white/[0.05] px-4 pt-5 pb-2 text-base text-white outline-none transition-all duration-300 [&>option]:bg-navy [&>option]:text-white
          ${
            isFocusedField
              ? "border-gold/50 ring-2 ring-gold/20 shadow-[0_0_16px_rgba(201,168,76,0.12)]"
              : "border-white/10"
          }
          ${!filled ? "text-gray-500" : ""}
        `}
      >
        <option value="" disabled>
          &nbsp;
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <motion.label
        htmlFor={id}
        className="pointer-events-none absolute left-4"
        animate={
          filled || isFocusedField
            ? { top: 6, fontSize: "10px", color: "rgba(201,168,76,0.7)" }
            : { top: 14, fontSize: "14px", color: "rgba(107,114,128,1)" }
        }
        transition={{ duration: 0.2, ease: "easeOut" }}
        style={{
          fontWeight: filled || isFocusedField ? 600 : 400,
          letterSpacing: filled || isFocusedField ? "0.05em" : "0",
          textTransform: filled || isFocusedField ? "uppercase" : "none",
        }}
      >
        {label}
      </motion.label>
      {/* Chevron */}
      <svg
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}

/** Animated submit button: idle -> loading -> success. */
function SubmitButton({
  status,
}: {
  status: "idle" | "loading" | "success";
}) {
  return (
    <motion.button
      type="submit"
      disabled={status !== "idle"}
      className="relative w-full overflow-hidden rounded-lg bg-gold px-8 py-3.5 text-sm font-semibold uppercase tracking-widest text-navy shadow-md transition-colors duration-300 hover:bg-gold-light disabled:cursor-not-allowed"
      whileHover={status === "idle" ? { scale: 1.01 } : {}}
      whileTap={status === "idle" ? { scale: 0.98 } : {}}
      animate={
        status === "success"
          ? { backgroundColor: "rgba(34,197,94,1)" }
          : {}
      }
      transition={{ duration: 0.4 }}
    >
      <AnimatePresence mode="wait">
        {status === "idle" && (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-center gap-2"
          >
            <FaPaperPlane className="h-3.5 w-3.5" />
            Send Message
          </motion.span>
        )}
        {status === "loading" && (
          <motion.span
            key="loading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-center gap-2"
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              className="inline-block h-4 w-4 rounded-full border-2 border-navy/30 border-t-navy"
            />
            Sending...
          </motion.span>
        )}
        {status === "success" && (
          <motion.span
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-2 text-white"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.3, 1] }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <FaCheck className="h-4 w-4" />
            </motion.span>
            Sent!
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

/** Contact info card with hover lift and subtle glow. */
function ContactCard({
  item,
}: {
  item: (typeof contactInfo)[number];
}) {
  return (
    <motion.div
      whileHover={{
        y: -3,
        boxShadow: "0 8px 24px rgba(201,168,76,0.1)",
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-colors duration-300 hover:border-gold/30"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold/20 bg-gold/10 transition-all duration-300 group-hover:bg-gold/20 group-hover:shadow-[0_0_12px_rgba(201,168,76,0.2)]">
        <item.icon className="h-5 w-5 text-gold transition-transform duration-300 group-hover:scale-110" />
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-gold/70">
          {item.label}
        </p>
        {"href" in item ? (
          <a
            href={item.href}
            className="mt-1 block text-base text-gray-300 transition-colors hover:text-gold"
          >
            {item.value}
          </a>
        ) : "lines" in item ? (
          item.lines.map((line) => (
            <a
              key={line}
              href={`tel:${line.replace(/\s/g, "")}`}
              className="mt-1 block text-base text-gray-300 transition-colors hover:text-gold"
            >
              {line}
            </a>
          ))
        ) : (
          <p className="mt-1 text-base text-gray-300">{item.value}</p>
        )}
      </div>
    </motion.div>
  );
}

/** Decorative location pin animation used as a map placeholder. */
function MapPlaceholder() {
  return (
    <div className="relative mt-6 flex h-52 sm:h-56 w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
      {/* Stylized grid lines */}
      <div className="absolute inset-0 opacity-[0.04]">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px w-full bg-gold"
            style={{ top: `${(i + 1) * 12.5}%` }}
          />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute h-full w-px bg-gold"
            style={{ left: `${(i + 1) * 12.5}%` }}
          />
        ))}
      </div>

      {/* Radiating rings */}
      <motion.div
        animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
        className="absolute h-8 w-8 rounded-full border border-gold/30"
      />
      <motion.div
        animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeOut",
          delay: 0.8,
        }}
        className="absolute h-8 w-8 rounded-full border border-gold/20"
      />

      {/* Pin */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-10"
      >
        <FaMapMarkerAlt className="h-8 w-8 text-gold drop-shadow-[0_0_8px_rgba(201,168,76,0.5)]" />
      </motion.div>

      {/* Label */}
      <span className="absolute bottom-3 text-[10px] tracking-wider text-white/30 uppercase">
        Downtown Beirut, Lebanon
      </span>
    </div>
  );
}

/** Confetti particles for the success state. */
function Confetti() {
  const particles = Array.from({ length: 24 }).map((_, i) => ({
    id: i,
    x: Math.random() * 300 - 150,
    y: -(Math.random() * 200 + 80),
    rotate: Math.random() * 720 - 360,
    scale: Math.random() * 0.6 + 0.4,
    color:
      i % 3 === 0
        ? "bg-gold"
        : i % 3 === 1
          ? "bg-gold-light"
          : "bg-white",
    delay: Math.random() * 0.3,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: 0,
            y: 0,
            rotate: 0,
            scale: 0,
            opacity: 1,
          }}
          animate={{
            x: p.x,
            y: p.y,
            rotate: p.rotate,
            scale: p.scale,
            opacity: 0,
          }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
            delay: p.delay,
          }}
          className={`absolute left-1/2 top-1/2 h-2 w-2 rounded-sm ${p.color}`}
        />
      ))}
    </div>
  );
}

/** Animated checkmark using SVG path drawing. */
function AnimatedCheckmark() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.15 }}
      className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-gold/40 bg-gold/10"
    >
      <svg
        className="h-10 w-10 text-gold"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          d="M5 13l4 4L19 7"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.35, ease: "easeOut" }}
        />
      </svg>
    </motion.div>
  );
}

/** Success overlay shown after form submission. */
function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="relative flex flex-col items-center justify-center rounded-2xl border border-gold/15 bg-white/[0.03] p-12 text-center shadow-lg backdrop-blur-sm"
    >
      {/* Clean checkmark */}
      <AnimatedCheckmark />

      <h3 className="mb-2 text-2xl font-bold text-white">
        Message Sent!
      </h3>
      <p className="mb-8 max-w-sm text-sm leading-relaxed text-white/60">
        Thank you for reaching out. Our team will review your message and get
        back to you within 24 hours.
      </p>

      <button
        onClick={onReset}
        className="rounded-lg border border-gold/30 bg-gold/10 px-6 py-2.5 text-sm font-semibold tracking-wider text-gold uppercase transition-colors hover:bg-gold/20"
      >
        Send Another Message
      </button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success"
  >("idle");
  const [shakeInvalid, setShakeInvalid] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const markTouched = (field: string) =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (submitStatus !== "idle") return;

    // Basic validation check -- shake invalid fields
    const nameValid = formData.name.length >= 2;
    const emailValid = isValidEmail(formData.email);
    const messageValid = formData.message.length >= 10;

    if (!nameValid || !emailValid || !messageValid) {
      setTouched({ name: true, email: true, message: true });
      setShakeInvalid(true);
      setTimeout(() => setShakeInvalid(false), 500);
      return;
    }

    setSubmitStatus("loading");

    // Simulate network request
    setTimeout(() => {
      setSubmitStatus("success");
    }, 1500);
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", service: "", message: "" });
    setTouched({});
    setFocusedField(null);
    setSubmitStatus("idle");
    setShakeInvalid(false);
  };

  // Determine if any field is focused for the dim-others effect.
  const isFocused = (field: string) => {
    if (focusedField === null) return true; // nothing focused, all bright
    return focusedField === field;
  };

  // Reset submit status after delay if user doesn't interact
  useEffect(() => {
    if (submitStatus === "success") {
      const t = setTimeout(() => {
        // Auto-reset could happen here, but we let user click instead.
      }, 5000);
      return () => clearTimeout(t);
    }
  }, [submitStatus]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden bg-navy py-24 md:py-32"
    >
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-gradient-to-br from-gold/15 via-gold-light/8 to-transparent blur-3xl" />
        <div className="absolute -right-32 bottom-1/4 h-[360px] w-[360px] rounded-full bg-gradient-to-tl from-gold/10 via-transparent to-transparent blur-3xl" />
      </div>

      <motion.div
        className="relative mx-auto max-w-6xl px-6 md:px-12"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Section heading */}
        <motion.div variants={fadeUp} className="mb-4 text-center">
          <span className="inline-block rounded-full border border-gold/30 bg-gold/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold">
            Get In Touch
          </span>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="mb-6 text-center text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl"
        >
          Contact <span className="text-gold">Us</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mx-auto mb-6 max-w-3xl text-center text-lg leading-relaxed text-gray-300"
        >
          If you require assistance with our services, please fill out the form
          with your information for immediate support. Our Customer Service team
          comprises highly qualified technicians who will promptly contact you
          back to provide the best assistance possible.
        </motion.p>

        {/* Response time badge */}
        <motion.div
          variants={fadeUp}
          className="mx-auto mb-16 flex items-center justify-center gap-2"
        >
          <motion.div
            className="flex items-center gap-2 rounded-full border border-gold/20 bg-gold/[0.06] px-4 py-1.5 text-sm text-white/60"
            whileHover={{ scale: 1.03, borderColor: "rgba(201,168,76,0.4)" }}
            transition={{ duration: 0.2 }}
          >
            <FaClock className="h-3.5 w-3.5 text-gold/70" />
            <span>Typically responds within 24 hours</span>
          </motion.div>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid gap-12 md:grid-cols-5 md:items-start">
          {/* ---------- Left column - Contact info ---------- */}
          <motion.div variants={fadeUp} className="md:col-span-2">
            <div className="space-y-4">
              {contactInfo.map((item) => (
                <ContactCard key={item.label} item={item} />
              ))}
            </div>

            {/* Interactive map placeholder */}
            <MapPlaceholder />

            {/* Decorative divider */}
            <div className="mt-8 hidden h-px w-full bg-gradient-to-r from-gold/30 via-gold/10 to-transparent md:block" />

            <p className="mt-6 hidden text-sm leading-relaxed text-gray-400 md:block">
              We are available Monday through Friday, 9 AM to 6 PM (GMT+2).
              Feel free to reach out anytime and we will respond as soon as
              possible.
            </p>
          </motion.div>

          {/* ---------- Right column - Form ---------- */}
          <motion.div variants={fadeUp} className="md:col-span-3">
            <AnimatePresence mode="wait">
              {submitStatus === "success" ? (
                <SuccessState key="success" onReset={handleReset} />
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="rounded-2xl border border-gold/15 bg-white/[0.03] p-8 shadow-lg backdrop-blur-sm md:p-10"
                >
                  <div className="space-y-6">
                    {/* Name */}
                    <FloatingInput
                      id="contact-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      isFocusedField={isFocused("name")}
                      onFocusField={() => setFocusedField("name")}
                      onBlurField={() => setFocusedField(null)}
                      touched={!!touched.name}
                      onTouch={() => markTouched("name")}
                      shake={shakeInvalid}
                    />

                    {/* Email */}
                    <FloatingInput
                      id="contact-email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      validate={isValidEmail}
                      isFocusedField={isFocused("email")}
                      onFocusField={() => setFocusedField("email")}
                      onBlurField={() => setFocusedField(null)}
                      touched={!!touched.email}
                      onTouch={() => markTouched("email")}
                      shake={shakeInvalid}
                    />

                    {/* Service */}
                    <FloatingSelect
                      id="contact-service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      options={serviceOptions}
                      isFocusedField={isFocused("service")}
                      onFocusField={() => setFocusedField("service")}
                      onBlurField={() => setFocusedField(null)}
                    />

                    {/* Message */}
                    <FloatingTextarea
                      id="contact-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      isFocusedField={isFocused("message")}
                      onFocusField={() => setFocusedField("message")}
                      onBlurField={() => setFocusedField(null)}
                      touched={!!touched.message}
                      onTouch={() => markTouched("message")}
                      shake={shakeInvalid}
                    />

                    {/* Submit */}
                    <SubmitButton status={submitStatus} />
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

export default Contact;
