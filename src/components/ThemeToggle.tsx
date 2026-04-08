import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../contexts/ThemeContext";

function ThemeToggle() {
  const { resolvedMode, setMode } = useTheme();
  const isDark = resolvedMode === "dark";

  const toggleTheme = () => {
    setMode(isDark ? "light" : "dark");
  };

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      className={`relative flex h-10 w-10 items-center justify-center rounded-lg backdrop-blur-md transition-colors ${
        isDark
          ? 'bg-white/10 hover:bg-white/20'
          : 'bg-black/10 hover:bg-black/20'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {isDark ? (
          <FaMoon className="h-5 w-5 text-[#c9a84c]" />
        ) : (
          <FaSun className="h-5 w-5 text-[#c9a84c]" />
        )}
      </motion.div>
    </motion.button>
  );
}

export default ThemeToggle;
