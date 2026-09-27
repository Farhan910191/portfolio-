"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollGroupProps {
  children: ReactNode;
  className?: string;
}

export default function ScrollGroup({
  children,
  className = "",
}: ScrollGroupProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.1,
      }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}