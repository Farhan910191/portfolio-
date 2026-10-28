"use client";

import { ArrowDown, ArrowRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { motion, type Variants } from "framer-motion";

import { developer } from "@/data/portfolio";
import { useTheme } from "@/components/ThemeProvider";

// ======================================================
// ANIMATIONS
// ======================================================

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const profileVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
    y: 20,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "none",
    transition: {
      duration: 0.85,
      delay: 0.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ======================================================
// HERO
// ======================================================

interface HeroProps {
  isReady?: boolean;
}

export default function Hero({ isReady = true }: HeroProps) {
  const { isDark } = useTheme();

  return (
    <section
      id="home"
      className={`
        relative
        w-full
        min-w-0
        overflow-hidden
        bg-transparent
        transition-colors
        duration-300
        ${isDark ? "text-white" : "text-gray-900"}
      `}
    >
      {/* =================================================
          HERO INNER
      ================================================== */}

      <div
        className="
          container-custom
          relative
          z-10
          flex
          w-full
          items-center
          py-20
          sm:py-24
          lg:min-h-[calc(100vh-80px)]
          lg:py-16
          xl:min-h-[calc(100vh-72px)]
        "
      >
        <div
          className="
            grid
            w-full
            min-w-0
            items-center
            gap-14
            lg:grid-cols-[1.08fr_0.92fr]
            lg:gap-10
            xl:gap-16
          "
        >
          {/* =================================================
              LEFT SIDE
          ================================================== */}

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isReady ? "visible" : "hidden"}
            className="
              min-w-0
              lg:pr-2
              xl:pr-4
            "
          >
            {/* STATUS BADGE */}

            <motion.div
              variants={itemVariants}
              className={`
                mb-6
                inline-flex
                items-center
                gap-2.5
                rounded-full
                border
                px-4
                py-2
                text-xs
                font-medium
                backdrop-blur-xl
                transition-all
                duration-300
                sm:text-sm
                ${isDark
                  ? "border-[#39ff88]/20 bg-[#39ff88]/5 text-gray-300 hover:border-[#39ff88]/40"
                  : "border-emerald-500/30 bg-emerald-50 text-emerald-900 shadow-sm hover:border-emerald-500/50"
                }
              `}
            >
              <span className="relative flex h-2 w-2">
                <span
                  className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${isDark ? "bg-[#39ff88]" : "bg-emerald-500"
                    }`}
                />
                <span
                  className={`relative inline-flex h-2 w-2 rounded-full ${isDark
                      ? "bg-[#39ff88] shadow-[0_0_10px_#39ff88]"
                      : "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                    }`}
                />
              </span>

              Available for opportunities
            </motion.div>

            {/* DEVELOPER LABEL */}

            <motion.div
              variants={itemVariants}
              className="
                mb-4
                flex
                items-center
                gap-3
              "
            >
              <span className={`h-px w-7 ${isDark ? "bg-[#39ff88]" : "bg-emerald-600"}`} />

              <span
                className={`
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  sm:text-[10px]
                  ${isDark ? "text-[#39ff88]" : "text-emerald-700"}
                `}
              >
                Python Full Stack Developer
              </span>
            </motion.div>

            {/* HEADING */}

            <motion.h1
              variants={itemVariants}
              className={`
                max-w-4xl
                text-[2.65rem]
                font-black
                leading-[0.94]
                tracking-[-0.055em]
                transition-colors
                duration-300
                sm:text-5xl
                md:text-6xl
                lg:text-[4.1rem]
                xl:text-[4.85rem]
                ${isDark ? "text-white" : "text-gray-900"}
              `}
            >
              Building Digital

              <br />

              <span
                className={
                  isDark
                    ? "bg-gradient-to-r from-[#39ff88] via-[#6dffad] to-[#20c968] bg-clip-text text-transparent"
                    : "bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 bg-clip-text text-transparent"
                }
              >
                Experiences
              </span>

              <br />

              That Make an Impact.
            </motion.h1>

            {/* DESCRIPTION */}

            <motion.p
              variants={itemVariants}
              className={`
                mt-5
                max-w-xl
                text-sm
                leading-6
                transition-colors
                duration-300
                sm:mt-6
                sm:text-base
                sm:leading-7
                ${isDark ? "text-gray-400" : "text-gray-600"}
              `}
            >
              {developer.description}
            </motion.p>

            {/* BUTTONS */}

            <motion.div
              variants={itemVariants}
              className="
                mt-7
                flex
                flex-wrap
                gap-3
              "
            >
              <motion.a
                href="#projects"
                whileHover={{
                  y: -2,
                  scale: 1.015,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className={`
                  group
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  px-5
                  py-3
                  text-xs
                  font-semibold
                  transition-all
                  duration-300
                  sm:text-sm
                  ${isDark
                    ? "bg-[#39ff88] text-black shadow-[0_0_25px_rgba(57,255,136,0.15)] hover:shadow-[0_0_35px_rgba(57,255,136,0.3)]"
                    : "bg-emerald-600 text-white shadow-[0_4px_16px_rgba(16,185,129,0.35)] hover:bg-emerald-700 hover:shadow-[0_6px_22px_rgba(16,185,129,0.45)]"
                  }
                `}
              >
                View My Work

                <ArrowRight
                  size={16}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                className={`
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  px-5
                  py-3
                  text-xs
                  font-semibold
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  sm:text-sm
                  ${isDark
                    ? "border-white/[0.1] bg-[#111113]/60 text-white hover:border-[#39ff88]/40 hover:bg-[#39ff88]/[0.05] hover:text-[#39ff88]"
                    : "border-gray-200 bg-white/90 text-gray-800 shadow-sm hover:border-emerald-500 hover:bg-emerald-50/50 hover:text-emerald-700"
                  }
                `}
              >
                Contact Me
              </motion.a>
            </motion.div>

            {/* SOCIAL */}

            <motion.div
              variants={itemVariants}
              className="
                mt-6
                flex
                items-center
                gap-5
              "
            >
              <span
                className={`
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.2em]
                  ${isDark ? "text-gray-600" : "text-gray-400"}
                `}
              >
                Find me on
              </span>

              <motion.a
                href={developer.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                whileHover={{
                  y: -3,
                  scale: 1.08,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className={`
                  transition-colors
                  ${isDark ? "text-gray-500 hover:text-[#39ff88]" : "text-gray-600 hover:text-emerald-600"}
                `}
              >
                <FaGithub size={18} />
              </motion.a>

              <motion.a
                href="https://www.linkedin.com/in/farhan-kk-66b598371/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                whileHover={{
                  y: -3,
                  scale: 1.08,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className={`
                  transition-colors
                  ${isDark ? "text-gray-500 hover:text-[#39ff88]" : "text-gray-600 hover:text-emerald-600"}
                `}
              >
                <FaLinkedinIn size={18} />
              </motion.a>

              <motion.a
                href="mailto:farhanmohammedfarhan7@gmail.com"
                aria-label="Send Email"
                whileHover={{
                  y: -3,
                  scale: 1.08,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className={`
                  transition-colors
                  ${isDark ? "text-gray-500 hover:text-[#39ff88]" : "text-gray-600 hover:text-emerald-600"}
                `}
              >
                <Mail size={18} />
              </motion.a>
            </motion.div>

            {/* DEVELOPER SIGNATURE */}

            <motion.div
              variants={itemVariants}
              className={`
                mt-5
                font-mono
                text-[9px]
                ${isDark ? "text-gray-700" : "text-gray-400"}
              `}
            >
              <span className={isDark ? "text-[#39ff88]/50" : "text-emerald-600/70"}>
                {"<developer />"}
              </span>

              <span className="mx-2">
                •
              </span>

              build.clean · ship.fast
            </motion.div>
          </motion.div>

          {/* =================================================
              RIGHT PROFILE (CARDLESS & PULSING SYSTEM)
          ================================================== */}

          <motion.div
            variants={profileVariants}
            initial="hidden"
            animate={isReady ? "visible" : "hidden"}
            className="
              relative
              mx-auto
              flex
              w-full
              max-w-[420px]
              items-center
              justify-center
              pt-4
              pb-6
              sm:max-w-[460px]
              lg:max-w-[480px]
              xl:max-w-[520px]
            "
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10 flex w-full justify-center"
            >
              {/* Dedicated Ambient Glow Layer Behind Model */}
              <div
                aria-hidden="true"
                className={`
                  pointer-events-none
                  absolute
                  top-1/2
                  left-1/2
                  -translate-x-1/2
                  -translate-y-1/2
                  h-[320px]
                  w-[260px]
                  rounded-full
                  blur-[70px]
                  transition-all
                  duration-500
                  ${isDark
                    ? "bg-[#39ff88]/20"
                    : "bg-emerald-500/15"
                  }
                `}
              />

              {/* --------------------------------------------------------
                  CHARACTER CONTOUR & SILHOUETTE EDGE GLOW SYSTEM
                  (Completely masks/absorbs background-remover fringe)
              --------------------------------------------------------- */}
              <div
                className="relative flex justify-center"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to bottom, black 72%, transparent 98%)",
                  maskImage:
                    "linear-gradient(to bottom, black 72%, transparent 98%)",
                }}
              >
                {/* 1. Underlying Animated Luminous Silhouette Rim Aura (Both Dark & Light Modes, Thin & Elegant) */}
                <motion.div
                  aria-hidden="true"
                  animate={{
                    opacity: isDark ? [0.45, 0.75, 0.45] : [0.55, 0.85, 0.55],
                    filter: isDark
                      ? [
                          "drop-shadow(0 0 1.5px #39ff88) drop-shadow(0 0 4px rgba(57,255,136,0.5))",
                          "drop-shadow(0 0 2px #00e5ff) drop-shadow(0 0 6px rgba(0,229,255,0.55))",
                          "drop-shadow(0 0 1.5px #39ff88) drop-shadow(0 0 4px rgba(57,255,136,0.5))",
                        ]
                      : [
                          "drop-shadow(0 0 1.5px #10b981) drop-shadow(0 0 4px rgba(16,185,129,0.7))",
                          "drop-shadow(0 0 2px #059669) drop-shadow(0 0 5px rgba(5,150,105,0.65))",
                          "drop-shadow(0 0 1.5px #10b981) drop-shadow(0 0 4px rgba(16,185,129,0.7))",
                        ],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="pointer-events-none absolute inset-0 z-0 flex justify-center"
                >
                  <img
                    src="/profile.png"
                    alt=""
                    onError={(e) => {
                      e.currentTarget.src = "/profile.jpg";
                    }}
                    className="
                      mx-auto
                      h-[370px]
                      w-auto
                      max-w-full
                      object-contain
                      sm:h-[450px]
                      lg:h-[490px]
                      xl:h-[530px]
                    "
                  />
                </motion.div>

                {/* 2. Main Profile Cutout with Precision Thin Edge Contour */}
                <img
                  src="/profile.png"
                  alt="Mohammed Farhan KK"
                  onError={(e) => {
                    e.currentTarget.src = "/profile.jpg";
                  }}
                  style={{
                    filter: isDark
                      ? "drop-shadow(0 0 1.5px #39ff88) drop-shadow(0 0 3px rgba(57, 255, 136, 0.45)) contrast(1.01)"
                      : "drop-shadow(0 0 1.5px #10b981) drop-shadow(0 0 3.5px rgba(16, 185, 129, 0.6)) contrast(1.01)",
                  }}
                  className="
                    relative
                    z-10
                    mx-auto
                    h-[370px]
                    w-auto
                    max-w-full
                    object-contain
                    transition-all
                    duration-300
                    sm:h-[450px]
                    lg:h-[490px]
                    xl:h-[530px]
                  "
                />

                {/* 3. Subtle & Thin Flowing Laser Sweep along the Bottom Base */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    bottom-1
                    left-1/2
                    z-20
                    h-6
                    w-full
                    max-w-[300px]
                    -translate-x-1/2
                    overflow-hidden
                    sm:bottom-2
                    sm:max-w-[340px]
                    lg:max-w-[380px]
                  "
                >
                  <motion.div
                    animate={{
                      x: ["-100%", "200%"],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: 3.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 0.8,
                    }}
                    className={`
                      h-[1.5px]
                      w-[40%]
                      rounded-full
                      ${isDark
                        ? "bg-gradient-to-r from-transparent via-[#39ff88] to-transparent shadow-[0_0_10px_#39ff88]"
                        : "bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_8px_rgba(16,185,129,0.6)]"
                      }
                    `}
                  />
                  <motion.div
                    animate={{
                      opacity: [0.15, 0.45, 0.15],
                      scaleX: [0.85, 1.1, 0.85],
                    }}
                    transition={{
                      duration: 3.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={`
                      absolute
                      bottom-0
                      left-1/2
                      -translate-x-1/2
                      h-2
                      w-[70%]
                      rounded-full
                      blur-[6px]
                      ${isDark
                        ? "bg-[#39ff88]/20"
                        : "bg-emerald-500/15"
                      }
                    `}
                  />
                </div>
              </div>
            </motion.div>

            {/* -----------------------------------------------
                FLOATING TECH PILLS & STATUS BADGES
            ------------------------------------------------ */}

            {/* Frontend: React Pill (Top Left) */}
            <motion.div
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={`
                absolute
                left-0
                top-8
                z-20
                rounded-2xl
                border
                px-3.5
                py-2
                backdrop-blur-xl
                transition-all
                duration-300
                sm:-left-4
                sm:top-12
                sm:px-4
                sm:py-2.5
                ${isDark
                  ? "border-white/[0.1] bg-[#111113]/85 shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(57,255,136,0.1)] hover:border-[#39ff88]/50"
                  : "border-gray-200 bg-white/95 shadow-[0_10px_30px_rgba(0,0,0,0.08),0_0_15px_rgba(16,185,129,0.1)] hover:border-emerald-500/50"
                }
              `}
            >
              <span
                className={`
                  font-mono
                  text-[7px]
                  uppercase
                  tracking-wider
                  ${isDark ? "text-gray-400" : "text-gray-500"}
                `}
              >
                frontend
              </span>

              <p
                className={`
                  mt-0.5
                  font-mono
                  text-xs
                  font-semibold
                  ${isDark ? "text-[#39ff88]" : "text-emerald-600"}
                `}
              >
                {"<React />"}
              </p>
            </motion.div>

            {/* Backend: Django Pill (Right Side) */}
            <motion.div
              animate={{
                y: [0, 6, 0],
              }}
              transition={{
                duration: 4.5,
                delay: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={`
                absolute
                right-0
                bottom-24
                z-20
                rounded-2xl
                border
                px-3.5
                py-2
                backdrop-blur-xl
                transition-all
                duration-300
                sm:-right-4
                sm:px-4
                sm:py-2.5
                ${isDark
                  ? "border-white/[0.1] bg-[#111113]/85 shadow-[0_15px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(57,255,136,0.1)] hover:border-[#39ff88]/50"
                  : "border-gray-200 bg-white/95 shadow-[0_10px_30px_rgba(0,0,0,0.08),0_0_15px_rgba(16,185,129,0.1)] hover:border-emerald-500/50"
                }
              `}
            >
              <span
                className={`
                  font-mono
                  text-[7px]
                  uppercase
                  tracking-wider
                  ${isDark ? "text-gray-400" : "text-gray-500"}
                `}
              >
                backend
              </span>

              <p
                className={`
                  mt-0.5
                  font-mono
                  text-xs
                  font-semibold
                  ${isDark ? "text-white" : "text-gray-900"}
                `}
              >
                Django + API
              </p>
            </motion.div>

            {/* Clean Minimalist Experience Stats Pill (Apple / Vercel style) */}
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: [0, -4, 0], opacity: 1 }}
              transition={{
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 0.6, delay: 0.2 },
              }}
              whileHover={{ scale: 1.03, y: -6 }}
              className={`
                absolute
                -bottom-2
                left-1/2
                z-30
                flex
                -translate-x-1/2
                items-center
                gap-2.5
                whitespace-nowrap
                rounded-full
                border
                px-4
                py-2.5
                backdrop-blur-xl
                transition-all
                duration-300
                sm:gap-3.5
                sm:px-5
                sm:py-2.5
                ${isDark
                  ? "border-white/[0.12] bg-[#0c0c0f]/90 shadow-[0_20px_45px_rgba(0,0,0,0.7),0_0_20px_rgba(57,255,136,0.1)] hover:border-[#39ff88]/40 hover:shadow-[0_20px_45px_rgba(0,0,0,0.7),0_0_25px_rgba(57,255,136,0.2)]"
                  : "border-gray-200 bg-white/95 shadow-[0_15px_40px_rgba(0,0,0,0.08),0_0_20px_rgba(16,185,129,0.08)] hover:border-emerald-500/40 hover:shadow-[0_15px_40px_rgba(0,0,0,0.12),0_0_25px_rgba(16,185,129,0.15)]"
                }
              `}
            >
              {/* Stat 1: Experience */}
              <div className="flex items-center gap-1.5">
                <span
                  className={`
                    font-mono
                    text-xs
                    font-bold
                    sm:text-sm
                    ${isDark ? "text-white" : "text-gray-900"}
                  `}
                >
                  FRESHER
                </span>
              </div>

              {/* Divider */}
              <span className={`h-3 w-px ${isDark ? "bg-white/15" : "bg-gray-300"}`} />

              {/* Stat 2: Projects */}
              <div className="flex items-center gap-1.5">
                <span
                  className={`
                    font-mono
                    text-xs
                    font-bold
                    sm:text-sm
                    ${isDark ? "text-white" : "text-gray-900"}
                  `}
                >
                  3+
                </span>
                <span
                  className={`
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-wider
                    sm:text-[10px]
                    ${isDark ? "text-gray-400" : "text-gray-500"}
                  `}
                >
                  Projects
                </span>
              </div>

              {/* Divider */}
              <span className={`h-3 w-px ${isDark ? "bg-white/15" : "bg-gray-300"}`} />

              {/* Stat 3: Status Indicator */}
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span
                    className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${isDark ? "bg-[#39ff88]" : "bg-emerald-500"
                      }`}
                  />
                  <span
                    className={`relative inline-flex h-2 w-2 rounded-full ${isDark
                        ? "bg-[#39ff88] shadow-[0_0_8px_#39ff88]"
                        : "bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]"
                      }`}
                  />
                </span>
                <span
                  className={`
                    font-mono
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-wider
                    sm:text-[10px]
                    ${isDark ? "text-[#39ff88]" : "text-emerald-600"}
                  `}
                >
                  Available
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* =================================================
          SCROLL INDICATOR
      ================================================== */}

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          delay: 1.3,
        }}
        className={`
          absolute
          bottom-5
          left-1/2
          z-20
          hidden
          -translate-x-1/2
          flex-col
          items-center
          gap-1
          transition-colors
          xl:flex
          ${isDark ? "text-gray-600 hover:text-[#39ff88]" : "text-gray-400 hover:text-emerald-600"}
        `}
      >
        <span
          className="
            font-mono
            text-[7px]
            uppercase
            tracking-[0.4em]
          "
        >
          Scroll
        </span>

        <motion.span
          animate={{
            y: [0, 4, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ArrowDown
            size={15}
            aria-hidden="true"
          />
        </motion.span>
      </motion.a>
    </section>
  );
}