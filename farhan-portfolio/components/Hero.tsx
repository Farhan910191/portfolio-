"use client";

import { ArrowDown, ArrowRight, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { motion, type Variants } from "framer-motion";

import { developer } from "@/data/portfolio";

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
    x: 30,
    scale: 0.97,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay: 0.15,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

// ======================================================
// HERO
// ======================================================

export default function Hero() {
  return (
    <section
      id="home"
      className="
        relative
        w-full
        min-w-0
        overflow-hidden
        bg-transparent
        text-white
      "
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
            whileInView="visible"
            viewport={{
              once: false,
              amount: 0.2,
            }}
            className="
              min-w-0
              lg:pr-2
              xl:pr-4
            "
          >
            {/* STATUS */}

            <motion.div
              variants={itemVariants}
              className="
                mb-5
                inline-flex
                items-center
                gap-2.5
                rounded-full
                border
                border-[#39ff88]/20
                bg-[#111113]/70
                px-3.5
                py-1.5
                font-mono
                text-[9px]
                text-gray-400
                backdrop-blur-xl
                sm:px-4
                sm:py-2
                sm:text-[10px]
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  animate-pulse
                  rounded-full
                  bg-[#39ff88]
                  shadow-[0_0_12px_#39ff88]
                "
              />

              available_for_opportunities
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
              <span className="h-px w-7 bg-[#39ff88]" />

              <span
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-[#39ff88]
                  sm:text-[10px]
                "
              >
                Python Full Stack Developer
              </span>
            </motion.div>

            {/* HEADING */}

            <motion.h1
              variants={itemVariants}
              className="
                max-w-4xl
                text-[2.65rem]
                font-black
                leading-[0.94]
                tracking-[-0.055em]
                sm:text-5xl
                md:text-6xl
                lg:text-[4.1rem]
                xl:text-[4.85rem]
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

            {/* DESCRIPTION */}

            <motion.p
              variants={itemVariants}
              className="
                mt-5
                max-w-xl
                text-sm
                leading-6
                text-gray-400
                sm:mt-6
                sm:text-base
                sm:leading-7
              "
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
                className="
                  group
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-[#39ff88]
                  px-5
                  py-3
                  text-xs
                  font-semibold
                  text-black
                  shadow-[0_0_25px_rgba(57,255,136,0.12)]
                  transition-all
                  duration-300
                  hover:shadow-[0_0_35px_rgba(57,255,136,0.22)]
                  sm:text-sm
                "
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
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/[0.1]
                  bg-[#111113]/60
                  px-5
                  py-3
                  text-xs
                  font-semibold
                  text-white
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:border-[#39ff88]/40
                  hover:bg-[#39ff88]/[0.05]
                  hover:text-[#39ff88]
                  sm:text-sm
                "
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
                className="
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.2em]
                  text-gray-600
                "
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
                className="
                  text-gray-500
                  transition-colors
                  hover:text-[#39ff88]
                "
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
                className="
                  text-gray-500
                  transition-colors
                  hover:text-[#39ff88]
                "
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
                className="
                  text-gray-500
                  transition-colors
                  hover:text-[#39ff88]
                "
              >
                <Mail size={18} />
              </motion.a>
            </motion.div>

            {/* DEVELOPER SIGNATURE */}

            <motion.div
              variants={itemVariants}
              className="
                mt-5
                font-mono
                text-[9px]
                text-gray-700
              "
            >
              <span className="text-[#39ff88]/50">
                {"<developer />"}
              </span>

              <span className="mx-2">
                •
              </span>

              build.clean · ship.fast
            </motion.div>
          </motion.div>

          {/* =================================================
              RIGHT PROFILE
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
              max-w-[360px]
              sm:max-w-[390px]
              lg:max-w-[370px]
              xl:max-w-[410px]
            "
          >
            {/* STATIC GLOW */}

            <div
              className="
                pointer-events-none
                absolute
                inset-[12%]
                rounded-full
                bg-[#39ff88]/[0.05]
                blur-[80px]
              "
            />

            {/* PROFILE */}

            <div
              className="
                relative
                z-10
                aspect-[0.88]
                w-full
                overflow-hidden
                rounded-[26px]
                border
                border-white/[0.1]
                bg-[#111113]/80
                shadow-[0_25px_80px_rgba(0,0,0,0.5)]
                backdrop-blur-xl
              "
            >
              <img
                src="/profile.jpg"
                alt="Mohammed Farhan KK"
                className="
                  h-full
                  w-full
                  object-cover
                  object-center
                  grayscale-[30%]
                "
              />

              {/* IMAGE GRADIENT */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black
                  via-black/10
                  to-transparent
                "
              />

              {/* GREEN TINT */}

              <div
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

              {/* PROFILE TEXT */}

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  p-5
                "
              >
                <div
                  className="
                    flex
                    items-end
                    justify-between
                    gap-3
                  "
                >
                  <div className="min-w-0">
                    <p
                      className="
                        font-mono
                        text-[8px]
                        uppercase
                        tracking-[0.2em]
                        text-[#39ff88]
                      "
                    >
                      Python Full Stack
                    </p>

                    <h2
                      className="
                        mt-1.5
                        truncate
                        text-lg
                        font-bold
                      "
                    >
                      Mohammed Farhan KK
                    </h2>
                  </div>

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-[#39ff88]/20
                      bg-black/50
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

              {/* CORNER ACCENTS */}

              <span
                className="
                  absolute
                  left-4
                  top-4
                  h-5
                  w-5
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
                  h-5
                  w-5
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
                  h-5
                  w-5
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
                  h-5
                  w-5
                  border-b
                  border-r
                  border-[#39ff88]/40
                "
              />
            </div>

            {/* =================================================
                FRONTEND
            ================================================== */}

            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                -left-2
                top-10
                z-20
                rounded-xl
                border
                border-white/[0.08]
                bg-[#111113]/90
                px-3
                py-2
                shadow-[0_15px_35px_rgba(0,0,0,0.45)]
                backdrop-blur-xl
                sm:-left-7
                sm:top-14
                sm:px-4
                sm:py-3
              "
            >
              <span
                className="
                  font-mono
                  text-[7px]
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
                  text-xs
                  text-[#39ff88]
                "
              >
                {"<React />"}
              </p>
            </motion.div>

            {/* =================================================
                BACKEND
            ================================================== */}

            <motion.div
              animate={{
                y: [0, 5, 0],
              }}
              transition={{
                duration: 4.5,
                delay: 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                -right-2
                bottom-20
                z-20
                rounded-xl
                border
                border-white/[0.08]
                bg-[#111113]/90
                px-3
                py-2
                shadow-[0_15px_35px_rgba(0,0,0,0.45)]
                backdrop-blur-xl
                sm:-right-7
                sm:px-4
                sm:py-3
              "
            >
              <span
                className="
                  font-mono
                  text-[7px]
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
                  text-xs
                  text-white
                "
              >
                Django + API
              </p>
            </motion.div>

            {/* =================================================
                STATUS
            ================================================== */}

            <motion.div
              animate={{
                y: [0, -3, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                -bottom-4
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
                bg-[#080808]/95
                px-3
                py-2
                font-mono
                text-[8px]
                text-gray-400
                shadow-[0_15px_35px_rgba(0,0,0,0.5)]
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
        className="
          absolute
          bottom-5
          left-1/2
          z-20
          hidden
          -translate-x-1/2
          flex-col
          items-center
          gap-1
          text-gray-600
          transition-colors
          hover:text-[#39ff88]
          xl:flex
        "
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