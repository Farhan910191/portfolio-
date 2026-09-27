"use client";

import { motion, useScroll } from "framer-motion";

interface ScrollProgressProps {
  className?: string;
}

export default function ScrollProgress({
  className = "",
}: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 z-[9999] h-1 origin-left bg-white ${className}`}
      style={{
        scaleX: scrollYProgress,
      }}
    />
  );
}