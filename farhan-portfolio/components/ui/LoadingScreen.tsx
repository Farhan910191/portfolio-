"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  /** Minimum time (ms) to show the loader. Default 2200 */
  minDuration?: number;
  onComplete?: () => void;
}

export default function LoadingScreen({
  minDuration = 2200,
  onComplete,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Theme
  useEffect(() => {
    const check = () => {
      setIsDark(
        document.documentElement.getAttribute("data-theme") !== "light"
      );
    };
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  // Simulate progress
  useEffect(() => {
    const startTime = Date.now();
    let frame: number;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const raw = Math.min(elapsed / minDuration, 1);
      // Ease-out-cubic for a satisfying deceleration
      const eased = 1 - Math.pow(1 - raw, 3);
      setProgress(eased * 100);

      if (raw < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setIsComplete(true);
          onComplete?.();
        }, 350);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [minDuration, onComplete]);

  const accent = isDark ? "#39ff88" : "#10b981";
  const bg = isDark ? "#050505" : "#f2f7f4";
  const textColor = isDark ? "#fff" : "#1a1a2e";
  const mutedColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(26,26,46,0.4)";

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100000] flex flex-col items-center justify-center"
          style={{ backgroundColor: bg }}
        >
          {/* Ambient glow behind name */}
          <div
            className="absolute rounded-full blur-[100px]"
            style={{
              width: "400px",
              height: "400px",
              backgroundColor: isDark
                ? "rgba(57,255,136,0.06)"
                : "rgba(16,185,129,0.12)",
            }}
          />

          {/* Pulsing dot cluster */}
          <div className="relative mb-8 flex items-center gap-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="rounded-full"
                style={{
                  width: i === 1 ? 12 : 8,
                  height: i === 1 ? 12 : 8,
                  backgroundColor: accent,
                  boxShadow: `0 0 16px ${accent}55, 0 0 40px ${accent}22`,
                }}
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.6,
                  repeat: Infinity,
                  delay: i * 0.25,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Name */}
          <motion.h1
            className="text-3xl font-light tracking-[0.3em] uppercase mb-2"
            style={{ color: textColor }}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
          >
            FARHAN
          </motion.h1>

          <motion.p
            className="text-xs tracking-[0.5em] uppercase mb-10"
            style={{ color: mutedColor }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Full Stack Developer
          </motion.p>

          {/* Progress bar */}
          <div className="relative w-48 h-[2px] overflow-hidden rounded-full"
            style={{
              backgroundColor: isDark
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.06)",
            }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                backgroundColor: accent,
                boxShadow: `0 0 12px ${accent}66`,
                width: `${progress}%`,
              }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Progress percentage */}
          <motion.span
            className="mt-4 font-mono text-[11px] tracking-widest"
            style={{ color: mutedColor }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {Math.round(progress)}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
