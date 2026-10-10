"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function ScrollCard({
  children,
  className = "",
  delay = 0,
}: ScrollCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
        scale: 0.98,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -6,
        transition: {
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1],
        },
      }}
      className={`
        glass
        glass-hover
        relative
        ${className}
      `}
      style={{
        transformPerspective: 1000,
      }}
    >
      {children}
    </motion.div>
  );
}