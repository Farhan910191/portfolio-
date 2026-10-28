"use client";

import { useRef, useState, ReactNode, MouseEvent, useEffect } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  /** How strong the magnetic pull is (px). Default 12 */
  strength?: number;
  /** Show neon accent glow on hover. Default true */
  glow?: boolean;
  onClick?: () => void;
  href?: string;
  target?: string;
  ariaLabel?: string;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 12,
  glow = true,
  onClick,
  href,
  target,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("translate(0px, 0px)");
  const [isHovered, setIsHovered] = useState(false);
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

  const handleMouseMove = (e: MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTransform(`translate(${dx * strength}px, ${dy * strength}px)`);
  };

  const handleMouseLeave = () => {
    setTransform("translate(0px, 0px)");
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const accent = isDark ? "#39ff88" : "#10b981";
  const glowShadow =
    glow && isHovered
      ? isDark
        ? `0 0 25px rgba(57,255,136,0.25), 0 0 60px rgba(57,255,136,0.08)`
        : `0 0 20px rgba(16,185,129,0.2), 0 0 50px rgba(16,185,129,0.06)`
      : "none";

  const content = (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      role="button"
      aria-label={ariaLabel}
      data-cursor-hover
      className={`relative inline-flex items-center justify-center cursor-pointer select-none ${className}`}
      style={{
        transform,
        transition:
          "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease",
        boxShadow: glowShadow,
        borderRadius: "inherit",
      }}
    >
      {/* Hover border highlight */}
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{
          border: `1px solid ${isHovered ? accent : "transparent"}`,
          opacity: isHovered ? 0.35 : 0,
          transition: "opacity 0.4s ease, border-color 0.4s ease",
        }}
      />
      {children}
    </div>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined}>
        {content}
      </a>
    );
  }

  return content;
}
