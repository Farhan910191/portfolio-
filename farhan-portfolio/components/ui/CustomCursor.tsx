"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Smooth cursor position tracking
  const mouse = useRef({ x: 0, y: 0 });
  const dotPos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  // Theme detection
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

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouse.current = { x: e.clientX, y: e.clientY };
    if (!isVisible) setIsVisible(true);
  }, [isVisible]);

  const handleMouseEnterInteractive = useCallback(() => setIsHovering(true), []);
  const handleMouseLeaveInteractive = useCallback(() => setIsHovering(false), []);
  const handleMouseLeave = useCallback(() => setIsVisible(false), []);
  const handleMouseEnter = useCallback(() => setIsVisible(true), []);

  // Animation loop for smooth following
  useEffect(() => {
    const animate = () => {
      const dotSpeed = 0.25;
      const ringSpeed = 0.12;

      dotPos.current.x += (mouse.current.x - dotPos.current.x) * dotSpeed;
      dotPos.current.y += (mouse.current.y - dotPos.current.y) * dotSpeed;
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * ringSpeed;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * ringSpeed;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x - 4}px, ${dotPos.current.y - 4}px)`;
      }
      if (ringRef.current) {
        const size = isHovering ? 56 : 36;
        ringRef.current.style.transform = `translate(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isHovering]);

  // Event listeners
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const interactiveElements = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select, [data-cursor-hover]"
    );
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnterInteractive);
      el.addEventListener("mouseleave", handleMouseLeaveInteractive);
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnterInteractive);
        el.removeEventListener("mouseleave", handleMouseLeaveInteractive);
      });
    };
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter, handleMouseEnterInteractive, handleMouseLeaveInteractive]);

  const accentColor = isDark ? "#39ff88" : "#10b981";
  const glowColor = isDark
    ? "rgba(57, 255, 136, 0.35)"
    : "rgba(16, 185, 129, 0.3)";

  // Hide custom cursor on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none"
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: accentColor,
          boxShadow: `0 0 10px ${glowColor}, 0 0 20px ${glowColor}`,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s ease, background-color 0.4s ease",
          willChange: "transform",
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[99998] pointer-events-none"
        style={{
          width: isHovering ? "56px" : "36px",
          height: isHovering ? "56px" : "36px",
          borderRadius: "50%",
          border: `1.5px solid ${accentColor}`,
          opacity: isVisible ? (isHovering ? 0.6 : 0.35) : 0,
          transition:
            "opacity 0.3s ease, width 0.35s cubic-bezier(0.22,1,0.36,1), height 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.4s ease",
          willChange: "transform",
          mixBlendMode: isDark ? "screen" : "multiply",
        }}
      />
    </>
  );
}
