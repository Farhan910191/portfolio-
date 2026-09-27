"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollItemProps {
  children: ReactNode;
  className?: string;
}

export default function ScrollItem({
  children,
  className = "",
}: ScrollItemProps) {
  return (
    <motion.div
      variants={{
        hidden: {
          opacity: 0,
          y: 45,
          scale: 0.96,
        },

        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
        },
      }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}