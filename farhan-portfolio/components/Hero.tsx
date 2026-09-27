"use client";

import {
  ArrowDown,
  ArrowRight,
  Mail,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";

import { motion } from "framer-motion";

import { developer } from "@/data/portfolio";

// ======================================================
// ANIMATIONS
// ======================================================

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 35,
    filter: "blur(8px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const profileVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    x: 40,
    filter: "blur(8px)",
  },

  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      delay: 0.25,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ======================================================
// COMPONENT
// ======================================================

export default function Hero() {
  return (
    <section
      id="home"
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-transparent
        pt-24
        text-white
      "
    >
      {/* =================================================
          CONTENT
      ================================================== */}

      <div
        className="
          container-custom
          relative
          z-10
          flex
          min-h-screen
          items-center
          py-20
          lg:py-24
        "
      >
        <div
          className="
            grid
            w-full
            items-center
            gap-16
            lg:grid-cols-[1.08fr_0.92fr]
            lg:gap-12
            xl:gap-20
          "
        >
          {/* =================================================
              LEFT CONTENT
          ================================================== */}

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: false,
              amount: 0.2,
            }}
            className="relative"
          >
            {/* =================================================
                AVAILABILITY
            ================================================== */}

            <motion.div
              variants={itemVariants}
              className="
                mb-7
                inline-flex
                items-center
                gap-2.5
                rounded-full
                border
                border-[#39ff88]/20
                bg-[#111113]/60
                px-4
                py-2
                font-mono
                text-[11px]
                text-gray-400
                shadow-[0_0_25px_rgba(57,255,136,0.04)]
                backdrop-blur-xl
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-1.5
                  w-1.5
                  animate-pulse
                  rounded-full
                  bg-[#39ff88]
                  shadow-[0_0_12px_#39ff88]
                "
              />

              <span>
                available_for_opportunities
              </span>
            </motion.div>

            {/* =================================================
                SMALL LABEL
            ================================================== */}

            <motion.div
              variants={itemVariants}
              className="
                mb-5
                flex
                items-center
                gap-3
              "
            >
              <span className="h-px w-8 bg-[#39ff88]" />

              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-[#39ff88]
                "
              >
                Python Full Stack Developer
              </p>
            </motion.div>

            {/* =================================================
                MAIN HEADING
            ================================================== */}

            <motion.h1
              variants={itemVariants}
              className="
                max-w-5xl
                text-5xl
                font-black
                leading-[0.98]
                tracking-[-0.055em]
                sm:text-6xl
                md:text-7xl
                lg:text-7xl
                xl:text-[5.8rem]
              "
            >
              Building Digital
              <br />

              <span
                className="
                  bg-gradient-to-r
                  from-[#39ff88]
                  via-[#6dffad]
                  to-[#20c968]
                  bg-clip-text
                  text-transparent
                "
              >
                Experiences
              </span>

              <br />

              That Make an Impact.
            </motion.h1>

            {/* =================================================
                DESCRIPTION
            ================================================== */}

            <motion.p
              variants={itemVariants}
              className="
                mt-7
                max-w-2xl
                text-base
                leading-8
                text-gray-400
                sm:text-lg
              "
            >
              {developer.description}
            </motion.p>

            {/* =================================================
                BUTTONS
            ================================================== */}

            <motion.div
              variants={itemVariants}
              className="
                mt-9
                flex
                flex-wrap
                gap-3
              "
            >
              {/* VIEW WORK */}

              <motion.a
                whileHover={{
                  y: -3,
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                href="#projects"
                className="
                  group
                  inline-flex
                  items-center
                  gap-2.5
                  rounded-xl
                  bg-[#39ff88]
                  px-6
                  py-3.5
                  text-sm
                  font-semibold
                  text-black
                  shadow-[0_0_30px_rgba(57,255,136,0.12)]
                  transition-all
                  duration-300
                  hover:shadow-[0_0_40px_rgba(57,255,136,0.25)]
                "
              >
                View My Work

                <ArrowRight
                  size={17}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </motion.a>

              {/* CONTACT */}

              <motion.a
                whileHover={{
                  y: -3,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                href="#contact"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/[0.1]
                  bg-[#111113]/50
                  px-6
                  py-3.5
                  text-sm
                  font-semibold
                  text-white
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-[#39ff88]/40
                  hover:bg-[#39ff88]/[0.05]
                  hover:text-[#39ff88]
                "
              >
                Contact Me
              </motion.a>
            </motion.div>

            {/* =================================================
                SOCIAL LINKS
            ================================================== */}

            <motion.div
              variants={itemVariants}
              className="
                mt-9
                flex
                items-center
                gap-5
              "
            >
              <span
                className="
                  font-mono
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                  text-gray-600
                "
              >
                Find me on
              </span>

              {/* GitHub */}

              <motion.a
                whileHover={{
                  y: -4,
                  scale: 1.08,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                href={developer.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="
                  text-gray-500
                  transition-colors
                  duration-300
                  hover:text-[#39ff88]
                "
              >
                <FaGithub size={19} />
              </motion.a>

              {/* LinkedIn */}

              <motion.a
                whileHover={{
                  y: -4,
                  scale: 1.08,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                href="https://www.linkedin.com/in/mohammed-farhan-kk"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="
                  text-gray-500
                  transition-colors
                  duration-300
                  hover:text-[#39ff88]
                "
              >
                <FaLinkedinIn size={19} />
              </motion.a>

              {/* Email */}

              <motion.a
                whileHover={{
                  y: -4,
                  scale: 1.08,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                href={`mailto:${developer.email}`}
                aria-label="Email"
                className="
                  text-gray-500
                  transition-colors
                  duration-300
                  hover:text-[#39ff88]
                "
              >
                <Mail size={19} />
              </motion.a>
            </motion.div>

            {/* =================================================
                CODE SIGNATURE
            ================================================== */}

            <motion.div
              variants={itemVariants}
              className="
                mt-8
                font-mono
                text-[10px]
                text-gray-700
              "
            >
              <span className="text-[#39ff88]/50">
                {"<developer />"}
              </span>

              <span className="mx-2 text-gray-800">
                •
              </span>

              <span>
                build.clean · ship.fast
              </span>
            </motion.div>
          </motion.div>

          {/* =================================================
              RIGHT PROFILE AREA
              
              NO HEROSCENE HERE
              NO 3D ANIMATION
          ================================================== */}

          <motion.div
            variants={profileVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: false,
              amount: 0.15,
            }}
            className="
              relative
              mx-auto
              w-full
              max-w-[470px]
            "
          >
            {/* =================================================
                STATIC GREEN GLOW
            ================================================== */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-[10%]
                rounded-full
                bg-[#39ff88]/[0.06]
                blur-[100px]
              "
            />

            {/* =================================================
                PROFILE CARD
            ================================================== */}

            <div
              className="
                group
                relative
                z-10
                aspect-[0.9]
                overflow-hidden
                rounded-[32px]
                border
                border-white/[0.1]
                bg-[#111113]/75
                shadow-[0_30px_100px_rgba(0,0,0,0.5)]
                backdrop-blur-xl
              "
            >
              {/* =================================================
                  STATIC PROFILE IMAGE

                  No zoom animation
                  No scan line
                  No moving image
              ================================================== */}

              <img
                src="/profile.jpg"
                alt="Mohammed Farhan KK"
                className="
                  h-full
                  w-full
                  object-cover
                  grayscale-[35%]
                "
              />

              {/* Bottom gradient */}

              <div
                aria-hidden="true"
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black
                  via-black/10
                  to-transparent
                "
              />

              {/* Green tint */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-br
                  from-[#39ff88]/[0.05]
                  via-transparent
                  to-transparent
                "
              />

              {/* =================================================
                  IMAGE BOTTOM INFO
              ================================================== */}

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p
                      className="
                        font-mono
                        text-[10px]
                        uppercase
                        tracking-[0.25em]
                        text-[#39ff88]
                      "
                    >
                      Python Full Stack
                    </p>

                    <h3
                      className="
                        mt-2
                        text-xl
                        font-bold
                        text-white
                      "
                    >
                      Mohammed Farhan KK
                    </h3>
                  </div>

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-[#39ff88]/20
                      bg-black/40
                      font-mono
                      text-xs
                      text-[#39ff88]
                      backdrop-blur-md
                    "
                  >
                    FK
                  </div>
                </div>
              </div>

              {/* =================================================
                  CORNER ACCENTS
              ================================================== */}

              <span
                className="
                  absolute
                  left-4
                  top-4
                  h-6
                  w-6
                  border-l
                  border-t
                  border-[#39ff88]/40
                "
              />

              <span
                className="
                  absolute
                  right-4
                  top-4
                  h-6
                  w-6
                  border-r
                  border-t
                  border-[#39ff88]/40
                "
              />

              <span
                className="
                  absolute
                  bottom-4
                  left-4
                  h-6
                  w-6
                  border-b
                  border-l
                  border-[#39ff88]/40
                "
              />

              <span
                className="
                  absolute
                  bottom-4
                  right-4
                  h-6
                  w-6
                  border-b
                  border-r
                  border-[#39ff88]/40
                "
              />
            </div>

            {/* =================================================
                FRONTEND FLOATING CARD
            ================================================== */}

            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                -left-5
                top-16
                z-20
                rounded-2xl
                border
                border-white/[0.08]
                bg-[#111113]/80
                px-4
                py-3
                shadow-[0_15px_40px_rgba(0,0,0,0.4)]
                backdrop-blur-xl
                sm:-left-8
              "
            >
              <span
                className="
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-wider
                  text-gray-600
                "
              >
                frontend
              </span>

              <p
                className="
                  mt-1
                  font-mono
                  text-sm
                  font-medium
                  text-[#39ff88]
                "
              >
                {"<React />"}
              </p>
            </motion.div>

            {/* =================================================
                BACKEND FLOATING CARD
            ================================================== */}

            <motion.div
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 4.5,
                delay: 0.7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                -right-5
                bottom-24
                z-20
                rounded-2xl
                border
                border-white/[0.08]
                bg-[#111113]/80
                px-4
                py-3
                shadow-[0_15px_40px_rgba(0,0,0,0.4)]
                backdrop-blur-xl
                sm:-right-8
              "
            >
              <span
                className="
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-wider
                  text-gray-600
                "
              >
                backend
              </span>

              <p
                className="
                  mt-1
                  font-mono
                  text-sm
                  font-medium
                  text-white
                "
              >
                Django + API
              </p>
            </motion.div>

            {/* =================================================
                STATUS CARD
            ================================================== */}

            <motion.div
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                -bottom-5
                left-1/2
                z-20
                flex
                -translate-x-1/2
                items-center
                gap-2
                whitespace-nowrap
                rounded-full
                border
                border-[#39ff88]/20
                bg-[#080808]/85
                px-4
                py-2.5
                font-mono
                text-[10px]
                text-gray-400
                shadow-[0_15px_40px_rgba(0,0,0,0.45)]
                backdrop-blur-xl
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#39ff88]
                  shadow-[0_0_10px_#39ff88]
                "
              />

              Building the future
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* =====================================================
          SCROLL INDICATOR
      ====================================================== */}

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 1,
          delay: 1.5,
        }}
        className="
          absolute
          bottom-7
          left-1/2
          z-20
          hidden
          -translate-x-1/2
          flex-col
          items-center
          gap-2
          text-gray-600
          transition-colors
          duration-300
          hover:text-[#39ff88]
          sm:flex
        "
      >
        <span
          className="
            font-mono
            text-[8px]
            uppercase
            tracking-[0.4em]
          "
        >
          Scroll
        </span>

        <motion.span
          animate={{
            y: [0, 6, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          <ArrowDown
            size={17}
            aria-hidden="true"
          />
        </motion.span>
      </motion.a>
    </section>
  );
}