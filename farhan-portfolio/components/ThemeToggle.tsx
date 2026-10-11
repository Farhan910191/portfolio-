"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

// ======================================================
// THEME TOGGLE
// ======================================================

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className={`
        relative
        flex
        h-9
        w-9
        shrink-0
        items-center
        justify-center
        rounded-xl
        border
        backdrop-blur-xl
        transition-all
        duration-500

        sm:h-10
        sm:w-10

        ${
          isDark
            ? `
              border-white/[0.08]
              bg-[#111113]/80
              text-white
              hover:border-[#39ff88]/40
              hover:text-[#39ff88]
            `
            : `
              border-gray-300
              bg-white/80
              text-gray-700
              shadow-sm
              hover:border-gray-400
              hover:text-gray-900
            `
        }
      `}
      aria-label={
        isDark
          ? "Switch to light mode"
          : "Switch to dark mode"
      }
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="sun"
            initial={{
              rotate: -90,
              opacity: 0,
              scale: 0.6,
            }}
            animate={{
              rotate: 0,
              opacity: 1,
              scale: 1,
            }}
            exit={{
              rotate: 90,
              opacity: 0,
              scale: 0.6,
            }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 20,
            }}
          >
            <Sun size={18} className="text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.6)]" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{
              rotate: 90,
              opacity: 0,
              scale: 0.6,
            }}
            animate={{
              rotate: 0,
              opacity: 1,
              scale: 1,
            }}
            exit={{
              rotate: -90,
              opacity: 0,
              scale: 0.6,
            }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 20,
            }}
          >
            <Moon size={18} className="text-emerald-600 drop-shadow-[0_0_6px_rgba(16,185,129,0.4)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
