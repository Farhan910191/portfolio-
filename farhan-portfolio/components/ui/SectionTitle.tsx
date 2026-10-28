"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

interface SectionTitleProps {
  /** Main title text */
  title: string;
  /** Optional subtitle / description */
  subtitle?: string;
  /** Small label above the title (e.g. "01", "About") */
  label?: string;
  /** Custom className for wrapper */
  className?: string;
  /** Text alignment. Default "center" */
  align?: "left" | "center" | "right";
  children?: ReactNode;
}

export default function SectionTitle({
  title,
  subtitle,
  label,
  className = "",
  align = "center",
  children,
}: SectionTitleProps) {
  const [isDark, setIsDark] = useState(true);

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

  const accent = isDark ? "#39ff88" : "#10b981";
  const mutedColor = isDark ? "rgba(255,255,255,0.4)" : "rgba(26,26,46,0.45)";
  const textColor = isDark ? "#ffffff" : "#1a1a2e";

  const alignClass =
    align === "left"
      ? "text-left items-start"
      : align === "right"
      ? "text-right items-end"
      : "text-center items-center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col ${alignClass} mb-16 ${className}`}
    >
      {/* Label / Badge */}
      {label && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full font-mono text-[11px] tracking-[0.25em] uppercase"
          style={{
            backgroundColor: isDark
              ? "rgba(57,255,136,0.08)"
              : "rgba(16,185,129,0.1)",
            color: accent,
            border: `1px solid ${isDark ? "rgba(57,255,136,0.15)" : "rgba(16,185,129,0.2)"}`,
          }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: accent,
              boxShadow: `0 0 6px ${accent}88`,
              animation: "badgeDotPulse 2s ease-in-out infinite",
            }}
          />
          {label}
        </motion.span>
      )}

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight"
        style={{
          background: `linear-gradient(135deg, ${textColor} 0%, ${textColor} 60%, ${accent} 100%)`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {title}
      </motion.h2>

      {/* Animated accent bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mt-4 rounded-full"
        style={{
          width: "60px",
          height: "3px",
          backgroundColor: accent,
          boxShadow: `0 0 16px ${accent}44, 0 0 40px ${accent}15`,
          transformOrigin: align === "right" ? "right" : align === "left" ? "left" : "center",
        }}
      />

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-5 max-w-lg text-sm sm:text-base leading-relaxed"
          style={{ color: mutedColor }}
        >
          {subtitle}
        </motion.p>
      )}

      {children}

      {/* Decorative side glow */}
      <div
        className="absolute pointer-events-none rounded-full blur-[80px]"
        style={{
          width: "250px",
          height: "250px",
          top: "-60px",
          left: align === "right" ? "auto" : align === "left" ? "-80px" : "50%",
          right: align === "right" ? "-80px" : "auto",
          transform: align === "center" ? "translateX(-50%)" : "none",
          backgroundColor: isDark
            ? "rgba(57,255,136,0.04)"
            : "rgba(16,185,129,0.06)",
        }}
      />
    </motion.div>
  );
}
