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
        y: 70,
        scale: 0.94,
        rotateX: 5,
        filter: "blur(8px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        filter: "blur(0px)",
      }}
      viewport={{
        once: true,
        amount: 0.18,
      }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -8,
        scale: 1.015,
        transition: {
          duration: 0.35,
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