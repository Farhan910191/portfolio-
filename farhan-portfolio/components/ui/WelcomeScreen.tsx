"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

interface WelcomeScreenProps {
  onComplete?: () => void;
  minDuration?: number;
}

export default function WelcomeScreen({
  onComplete,
  minDuration = 2200,
}: WelcomeScreenProps) {
  const { isDark, toggleTheme } = useTheme();
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING SYSTEM...");
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    let frame: number;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const raw = Math.min(elapsed / minDuration, 1);
      // Ease-out cubic curve for natural smooth deceleration
      const eased = 1 - Math.pow(1 - raw, 3);
      const currentPct = Math.round(eased * 100);
      setProgress(currentPct);

      if (currentPct < 30) {
        setStatusText("INITIALIZING ENVIRONMENT...");
      } else if (currentPct < 60) {
        setStatusText("LOADING MODULES: REACT • DJANGO • API...");
      } else if (currentPct < 90) {
        setStatusText("CONNECTING DEVELOPER WORKSPACE...");
      } else {
        setStatusText("WELCOME • MOHAMMED FARHAN KK");
      }

      if (raw < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(() => {
            onComplete?.();
          }, 200);
        }, 200);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [minDuration, onComplete]);

  // Handle manual skip with ESC or click
  const handleSkip = () => {
    setIsFinished(true);
    setTimeout(() => {
      onComplete?.();
    }, 150);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === " ") {
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.04,
            filter: "blur(12px)",
          }}
          transition={{
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            backgroundColor: isDark ? "rgba(6, 8, 9, 0.45)" : "rgba(242, 247, 244, 0.45)",
            color: isDark ? "#ffffff" : "#1a1a2e",
          }}
          className={`
            fixed
            inset-0
            z-[999999]
            flex
            flex-col
            items-center
            justify-center
            overflow-hidden
            select-none
            backdrop-blur-[2px]
            transition-colors
            duration-300
            ${isDark ? "text-white" : "text-gray-900"}
          `}
        >

          {/* ==========================================================
              QUICK THEME TOGGLE (TOP-RIGHT CORNER)
          =========================================================== */}
          {/* <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleTheme();
            }}
            aria-label={isDark ? "Switch to white mode" : "Switch to black mode"}
            className={`
              absolute
              top-6
              right-6
              z-50
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              backdrop-blur-xl
              transition-all
              duration-300
              hover:scale-110
              ${
                isDark
                  ? "border-white/10 bg-white/[0.06] text-white hover:border-[#39ff88]/40 hover:text-[#39ff88]"
                  : "border-black/10 bg-black/[0.04] text-gray-700 hover:border-emerald-500 hover:text-emerald-700"
              }
            `}
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button> */}

          {/* ==========================================================
              CENTRAL HOLOGRAPHIC BADGE & ENERGY RINGS
          =========================================================== */}
          <div className="relative mb-8 flex items-center justify-center">
            {/* Outer rotating dashed tech ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className={`
                absolute
                h-36
                w-36
                rounded-full
                border
                border-dashed
                sm:h-44
                sm:w-44
                ${isDark ? "border-[#39ff88]/30" : "border-emerald-500/35"}
              `}
            />

            {/* Pulsing neon energy halo */}
            <motion.div
              animate={{
                scale: [0.95, 1.08, 0.95],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={`
                absolute
                h-28
                w-28
                rounded-full
                border
                sm:h-36
                sm:w-36
                ${isDark
                  ? "border-[#39ff88]/50 shadow-[0_0_35px_rgba(57,255,136,0.35),inset_0_0_20px_rgba(57,255,136,0.2)]"
                  : "border-emerald-500/40 shadow-[0_0_35px_rgba(16,185,129,0.22),inset_0_0_20px_rgba(16,185,129,0.12)]"
                }
              `}
            />

            {/* Central Monogram Card with Official FK Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`
                relative
                flex
                h-24
                w-24
                items-center
                justify-center
                rounded-2xl
                border
                p-3.5
                backdrop-blur-xl
                transition-all
                duration-300
                sm:h-28
                sm:w-28
                sm:p-4
                ${isDark
                  ? "border-[#39ff88]/40 bg-[#0c0c0e]/95 shadow-[0_0_35px_rgba(57,255,136,0.3)]"
                  : "border-emerald-500/40 bg-[#0a0f1d] shadow-[0_15px_45px_rgba(16,185,129,0.25)]"
                }
              `}
            >
              <img
                src="/fk-logo.png"
                alt="FK Logo"
                className="
                  h-full
                  w-full
                  object-contain
                  filter
                  drop-shadow-[0_0_12px_rgba(57,255,136,0.5)]
                "
              />

              {/* Corner tech marks */}
              <span
                className={`absolute -left-1 -top-1 h-2 w-2 border-l-2 border-t-2 ${isDark ? "border-[#39ff88]" : "border-emerald-500"
                  }`}
              />
              <span
                className={`absolute -right-1 -top-1 h-2 w-2 border-r-2 border-t-2 ${isDark ? "border-[#39ff88]" : "border-emerald-500"
                  }`}
              />
              <span
                className={`absolute -bottom-1 -left-1 h-2 w-2 border-b-2 border-l-2 ${isDark ? "border-[#39ff88]" : "border-emerald-500"
                  }`}
              />
              <span
                className={`absolute -bottom-1 -right-1 h-2 w-2 border-b-2 border-r-2 ${isDark ? "border-[#39ff88]" : "border-emerald-500"
                  }`}
              />
            </motion.div>
          </div>

          {/* ==========================================================
              NAME & ROLE
          =========================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="flex flex-col items-center text-center"
          >
            <h1
              className={`
                font-sans
                text-xl
                font-bold
                tracking-[0.2em]
                uppercase
                transition-colors
                duration-300
                sm:text-2xl
                ${isDark ? "text-white" : "text-gray-900"}
              `}
            >
              Mohammed Farhan KK
            </h1>
            <p
              className={`
                mt-1
                font-mono
                text-[10px]
                uppercase
                tracking-[0.4em]
                font-semibold
                transition-colors
                duration-300
                sm:text-xs
                ${isDark ? "text-[#39ff88]" : "text-emerald-600"}
              `}
            >
              Python Full Stack Developer
            </p>
          </motion.div>

          {/* ==========================================================
              TELEMETRY & PROGRESS BAR
          =========================================================== */}
          <div className="mt-8 flex w-full max-w-xs flex-col items-center px-4 sm:max-w-sm">
            {/* Live Status Readout */}
            <div className="mb-2.5 flex w-full items-center justify-between font-mono text-[9px] uppercase tracking-wider sm:text-[10px]">
              <span className={`truncate pr-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                {statusText}
              </span>
              <span className={`shrink-0 font-bold ${isDark ? "text-[#39ff88]" : "text-emerald-600"}`}>
                {progress}%
              </span>
            </div>

            {/* Glowing Progress Track */}
            <div
              className={`
                relative
                h-1.5
                w-full
                overflow-hidden
                rounded-full
                ${isDark ? "bg-white/[0.08]" : "bg-black/[0.08]"}
              `}
            >
              <motion.div
                className={`
                  absolute
                  inset-y-0
                  left-0
                  rounded-full
                  ${isDark
                    ? "bg-gradient-to-r from-[#20c968] via-[#39ff88] to-[#6dffad] shadow-[0_0_15px_#39ff88]"
                    : "bg-gradient-to-r from-emerald-600 via-teal-500 to-green-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                  }
                `}
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>

          {/* ==========================================================
              SKIP BUTTON
          =========================================================== */}
          <button
            onClick={handleSkip}
            className={`
              absolute
              bottom-6
              right-6
              rounded-full
              border
              px-4
              py-1.5
              font-mono
              text-[10px]
              uppercase
              tracking-wider
              transition-all
              duration-300
              ${isDark
                ? "border-white/10 bg-white/[0.04] text-gray-400 hover:border-white/20 hover:text-white"
                : "border-black/10 bg-black/[0.04] text-gray-600 hover:border-black/20 hover:text-gray-900"
              }
            `}
          >
            Skip Intro →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
