"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function AnimatedCard({
  children,
  className = "",
  delay = 0,
}: AnimatedCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 60,
        scale: 0.96,
        filter: "blur(8px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={{
        once: false,
        amount: 0.15,
      }}
      transition={{
        duration: 0.7,
        delay,
        ease: "easeOut",
      }}
      animate={{
        y: [0, -5, 0],
      }}
      whileHover={{
        y: -10,
        scale: 1.015,
        transition: {
          duration: 0.25,
          ease: "easeOut",
        },
      }}
      className={`group relative ${className}`}
    >
      {/* Soft green glow */}
      <div
        className="
          pointer-events-none
          absolute
          -inset-2
          rounded-[32px]
          bg-[#39ff88]/0
          opacity-0
          blur-2xl
          transition-all
          duration-700
          group-hover:bg-[#39ff88]/10
          group-hover:opacity-100
        "
      />

      {/* Card */}
      <div
        className="
          relative
          h-full
          overflow-hidden
          rounded-3xl
          border
          border-white/[0.08]
          bg-[#111113]/70
          backdrop-blur-xl
          transition-all
          duration-500
          group-hover:border-[#39ff88]/30
          group-hover:bg-[#111113]/85
        "
      >
        {children}

        {/* Neon bottom line */}
        <div
          className="
            pointer-events-none
            absolute
            bottom-0
            left-0
            h-px
            w-0
            bg-[#39ff88]
            shadow-[0_0_18px_rgba(57,255,136,0.8)]
            transition-all
            duration-700
            group-hover:w-full
          "
        />
      </div>
    </motion.div>
  );
}