"use client";

import {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { useThemeGesture } from "@/hooks/useThemeGesture";

// ======================================================
// CONSTANTS
// ======================================================

const HINT_STORAGE_KEY = "portfolio-theme-hint-dismissed";
const HINT_DELAY = 4000; // show after 4s
const HINT_DURATION = 6000; // visible for 6s
const FLASH_DURATION = 500; // ms

// ======================================================
// THEME GESTURE PROVIDER
// ======================================================

export default function ThemeGestureProvider() {
  const { toggleTheme, isDark } = useTheme();

  // Hint state
  const [showHint, setShowHint] = useState(false);
  const hintTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // ====================================================
  // TOGGLE
  // ====================================================

  const handleToggle = useCallback(() => {
    toggleTheme();
  }, [toggleTheme]);

  // ====================================================
  // KEYBOARD SHORTCUT (Alt+T)
  // ====================================================

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === "t") {
        e.preventDefault();
        handleToggle();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [handleToggle]);

  // ====================================================
  // GESTURE HOOK
  // ====================================================

  useThemeGesture({
    onToggle: handleToggle,
    enabled: true,
  });

  // ====================================================
  // FIRST-VISIT HINT
  // ====================================================

  useEffect(() => {
    if (typeof window === "undefined") return;

    const dismissed = localStorage.getItem(
      HINT_STORAGE_KEY
    );

    if (dismissed) return;

    // Show hint after delay
    const showTimer = setTimeout(() => {
      setShowHint(true);
    }, HINT_DELAY);

    hintTimers.current.push(showTimer);

    // Auto-hide after duration
    const hideTimer = setTimeout(() => {
      setShowHint(false);
      localStorage.setItem(HINT_STORAGE_KEY, "true");
    }, HINT_DELAY + HINT_DURATION);

    hintTimers.current.push(hideTimer);

    return () => {
      hintTimers.current.forEach(clearTimeout);
      hintTimers.current = [];
    };
  }, []);

  const dismissHint = useCallback(() => {
    setShowHint(false);
    localStorage.setItem(HINT_STORAGE_KEY, "true");
  }, []);



  // ====================================================
  // RENDER
  // ====================================================

  return (
    <>


      {/* FIRST-VISIT HINT */}

      <AnimatePresence>
        {showHint && (
          <motion.div
            key="theme-hint"
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 10,
              scale: 0.97,
            }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`
              fixed
              bottom-6
              left-1/2
              z-[9998]
              -translate-x-1/2
              cursor-pointer

              ${
                isDark
                  ? "text-gray-400"
                  : "text-gray-500"
              }
            `}
            onClick={dismissHint}
          >
            <div
              className={`
                flex
                items-center
                gap-3
                rounded-2xl
                border
                px-4
                py-3
                backdrop-blur-2xl

                sm:px-5
                sm:py-3.5

                ${
                  isDark
                    ? `
                      border-white/[0.08]
                      bg-[#111113]/80
                      shadow-[0_20px_60px_rgba(0,0,0,0.5)]
                    `
                    : `
                      border-black/[0.06]
                      bg-white/90
                      shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                    `
                }
              `}
            >
              {/* Icon */}

              <span className="text-base">
                💡
              </span>

              {/* Text */}

              <span
                className="
                  text-[10px]
                  leading-snug
                  sm:text-xs
                "
              >
                <strong
                  className={
                    isDark
                      ? "text-white"
                      : "text-gray-900"
                  }
                >
                  Double-tap
                </strong>
                {" "}anywhere to switch themes
                <span className="hidden sm:inline">
                  {" · "}
                  <kbd
                    className={`
                      rounded
                      border
                      px-1
                      py-0.5
                      font-mono
                      text-[8px]

                      ${
                        isDark
                          ? "border-white/10 bg-white/5"
                          : "border-black/10 bg-black/5"
                      }
                    `}
                  >
                    Alt+T
                  </kbd>
                </span>
              </span>

              {/* Dismiss */}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  dismissHint();
                }}
                className={`
                  ml-1
                  flex
                  h-5
                  w-5
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  text-[10px]
                  transition-colors

                  ${
                    isDark
                      ? "hover:bg-white/10 hover:text-white"
                      : "hover:bg-black/10 hover:text-gray-900"
                  }
                `}
                aria-label="Dismiss hint"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
