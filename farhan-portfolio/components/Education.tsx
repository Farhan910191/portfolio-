"use client";

import {
  GraduationCap,
  ArrowUpRight,
  BookOpen,
} from "lucide-react";
import { motion } from "framer-motion";

const education = [
  {
    degree: "BA Economics",
    institution:
      "University of Calicut — PPTM Arts and Science College",
    date: "2022 — 2025",
  },
  {
    degree: "Higher Secondary — Humanities",
    institution:
      "DHSE Kerala — IUHSS Parappur",
    date: "2020 — 2022",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const headerVariants = {
  hidden: {
    opacity: 0,
    y: 40,
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

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 55,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Education() {
  return (
    <section
      id="education"
      className="relative border-t border-white/[0.05] py-28 sm:py-36"
    >
      <div className="container-custom">

        {/* =================================
            SECTION HEADER
        ================================== */}

        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.25,
          }}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#39ff88]" />

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#39ff88]">
              05 — Education
            </p>
          </div>

          <h2 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Academic{" "}
            <span className="text-[#39ff88]">
              background.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl leading-8 text-gray-500">
            My academic journey and educational foundation.
          </p>
        </motion.div>

        {/* =================================
            EDUCATION CARDS
        ================================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="mt-14 grid gap-5 md:grid-cols-2"
        >
          {education.map((item, index) => (
            <motion.article
              key={item.degree}
              variants={cardVariants}
              whileHover={{
                y: -7,
                transition: {
                  duration: 0.25,
                },
              }}
              className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/[0.08]
                bg-[#111113]/65
                p-7
                backdrop-blur-xl
                transition-all
                duration-500
                hover:border-[#39ff88]/30
                hover:bg-[#151518]/75
                sm:p-8
              "
            >

              {/* =================================
                  CARD GLOW
              ================================== */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-24
                  -top-24
                  h-56
                  w-56
                  rounded-full
                  bg-[#39ff88]/[0.025]
                  blur-[80px]
                  transition-all
                  duration-700
                  group-hover:bg-[#39ff88]/[0.09]
                "
              />

              {/* =================================
                  CARD NUMBER
              ================================== */}

              <span
                className="
                  absolute
                  right-7
                  top-7
                  font-mono
                  text-xs
                  text-gray-700
                  transition-colors
                  duration-300
                  group-hover:text-[#39ff88]/40
                "
              >
                0{index + 1}
              </span>

              {/* =================================
                  ICON
              ================================== */}

              <motion.div
                whileHover={{
                  rotate: 5,
                  scale: 1.08,
                }}
                className="
                  relative
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-[#39ff88]/10
                  bg-[#39ff88]/[0.07]
                  text-[#39ff88]
                  transition-all
                  duration-500
                  group-hover:border-[#39ff88]/30
                  group-hover:bg-[#39ff88]/10
                  group-hover:shadow-[0_0_30px_rgba(57,255,136,0.12)]
                "
              >
                <GraduationCap size={25} />

                <span
                  className="
                    absolute
                    -inset-1
                    rounded-2xl
                    border
                    border-[#39ff88]/0
                    transition-all
                    duration-500
                    group-hover:border-[#39ff88]/10
                  "
                />
              </motion.div>

              {/* =================================
                  DATE
              ================================== */}

              <div className="relative mt-7 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#39ff88] shadow-[0_0_8px_rgba(57,255,136,0.8)]" />

                <p className="font-mono text-xs tracking-wider text-[#39ff88]">
                  {item.date}
                </p>
              </div>

              {/* =================================
                  DEGREE
              ================================== */}

              <h3 className="relative mt-3 text-2xl font-bold text-white">
                {item.degree}
              </h3>

              {/* =================================
                  INSTITUTION
              ================================== */}

              <p className="relative mt-3 max-w-lg leading-7 text-gray-500">
                {item.institution}
              </p>

              {/* =================================
                  DECORATIVE DIVIDER
              ================================== */}

              <div className="relative mt-7 h-px bg-white/[0.06]">
                <div className="h-px w-12 bg-[#39ff88]/40 transition-all duration-500 group-hover:w-24" />
              </div>

              {/* =================================
                  BOTTOM CODE LABEL
              ================================== */}

              <div
                className="
                  relative
                  mt-6
                  flex
                  items-center
                  justify-between
                  font-mono
                  text-[10px]
                  text-gray-700
                "
              >
                <div className="flex items-center gap-2">
                  <BookOpen
                    size={13}
                    className="text-[#39ff88]/40"
                  />

                  <span>
                    education.completed
                  </span>
                </div>

                <ArrowUpRight
                  size={14}
                  className="
                    text-gray-700
                    transition-all
                    duration-300
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                    group-hover:text-[#39ff88]
                  "
                />
              </div>

              {/* =================================
                  BOTTOM GREEN LINE
              ================================== */}

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  h-px
                  w-0
                  bg-[#39ff88]
                  shadow-[0_0_18px_rgba(57,255,136,0.7)]
                  transition-all
                  duration-700
                  group-hover:w-full
                "
              />

            </motion.article>
          ))}
        </motion.div>

        {/* =================================
            EDUCATION FOOTER
        ================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration: 0.6,
            delay: 0.2,
          }}
          className="
            mt-12
            flex
            items-center
            justify-center
            gap-3
            font-mono
            text-xs
            text-gray-600
          "
        >
          <span className="text-[#39ff88]/50">
            {"<education />"}
          </span>

          <span>
            Learn • Build • Grow
          </span>

          <span className="text-[#39ff88]/50">
            {"</>"}
          </span>
        </motion.div>

      </div>
    </section>
  );
}