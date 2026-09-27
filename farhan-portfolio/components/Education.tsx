"use client";

import {
  GraduationCap,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";

const education = [
  {
    degree: "BA Economics",
    institution:
      "University of Calicut — PPTM Arts and Science College",
    date: "2022 — 2025",
    type: "Undergraduate Degree",
  },
  {
    degree: "Higher Secondary — Humanities",
    institution: "DHSE Kerala — IUHSS Parappur",
    date: "2020 — 2022",
    type: "Higher Secondary",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const headerVariants: Variants = {
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

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 45,
    scale: 0.97,
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

const footerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Education() {
  return (
    <section
      id="education"
      className="
        relative
        w-full
        min-w-0
        overflow-hidden
        border-t
        border-white/[0.05]
        py-20
        sm:py-24
        lg:py-28
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-7xl
          min-w-0
          px-4
          sm:px-6
          md:px-8
          lg:px-10
          xl:px-12
        "
      >
        {/* =========================================
            SECTION HEADER
        ========================================== */}

        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.25,
          }}
          className="min-w-0"
        >
          {/* Label */}

          <div className="flex items-center gap-3">
            <span className="h-px w-7 shrink-0 bg-[#39ff88] sm:w-8" />

            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-[#39ff88]
                sm:text-xs
                sm:tracking-[0.3em]
              "
            >
              05 — Education
            </p>
          </div>

          {/* Heading */}

          <h2
            className="
              mt-4
              max-w-3xl
              text-3xl
              font-bold
              leading-[1.08]
              tracking-tight
              text-white
              sm:mt-5
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
            "
          >
            Academic{" "}
            <span className="text-[#39ff88]">
              background.
            </span>
          </h2>

          {/* Description */}

          <p
            className="
              mt-4
              max-w-2xl
              text-sm
              leading-7
              text-gray-500
              sm:mt-5
              sm:text-base
              sm:leading-8
            "
          >
            My academic journey and educational foundation.
          </p>
        </motion.div>

        {/* =========================================
            EDUCATION CARDS
        ========================================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.12,
          }}
          className="
            mt-10
            grid
            grid-cols-1
            gap-4
            sm:mt-12
            sm:gap-5
            lg:grid-cols-2
          "
        >
          {education.map((item, index) => (
            <motion.article
              key={item.degree}
              variants={cardVariants}
              whileHover={{
                y: -6,
                transition: {
                  duration: 0.25,
                },
              }}
              className="
                group
                relative
                flex
                min-w-0
                w-full
                flex-col
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.08]
                bg-[#111113]/75
                p-5
                backdrop-blur-xl
                transition-all
                duration-500
                hover:border-[#39ff88]/30
                hover:bg-[#151518]/85
                sm:rounded-3xl
                sm:p-6
                lg:p-7
              "
            >
              {/* =====================================
                  BACKGROUND GLOW
              ====================================== */}

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

              {/* =====================================
                  TOP SHINE
              ====================================== */}

              <div
                className="
                  pointer-events-none
                  absolute
                  left-1/2
                  top-0
                  h-px
                  w-0
                  -translate-x-1/2
                  bg-[#39ff88]
                  shadow-[0_0_15px_rgba(57,255,136,0.8)]
                  transition-all
                  duration-700
                  group-hover:w-2/3
                "
              />

              {/* =====================================
                  CARD NUMBER
              ====================================== */}

              <span
                className="
                  absolute
                  right-5
                  top-5
                  font-mono
                  text-[10px]
                  text-gray-700
                  transition-colors
                  duration-300
                  group-hover:text-[#39ff88]/50
                  sm:right-7
                  sm:top-7
                  sm:text-xs
                "
              >
                0{index + 1}
              </span>

              {/* =====================================
                  ICON
              ====================================== */}

              <motion.div
                whileHover={{
                  rotate: 5,
                  scale: 1.06,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="
                  relative
                  flex
                  h-12
                  w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-[#39ff88]/10
                  bg-[#39ff88]/[0.07]
                  text-[#39ff88]
                  transition-all
                  duration-500
                  group-hover:border-[#39ff88]/30
                  group-hover:bg-[#39ff88]/10
                  group-hover:shadow-[0_0_30px_rgba(57,255,136,0.13)]
                  sm:h-14
                  sm:w-14
                  sm:rounded-2xl
                "
              >
                <GraduationCap
                  size={23}
                  strokeWidth={1.8}
                  className="sm:h-[25px] sm:w-[25px]"
                />

                <span
                  className="
                    pointer-events-none
                    absolute
                    -inset-1
                    rounded-xl
                    border
                    border-[#39ff88]/0
                    transition-all
                    duration-500
                    group-hover:border-[#39ff88]/10
                    sm:rounded-2xl
                  "
                />
              </motion.div>

              {/* =====================================
                  DATE + TYPE
              ====================================== */}

              <div
                className="
                  relative
                  mt-5
                  flex
                  flex-wrap
                  items-center
                  gap-x-4
                  gap-y-2
                  sm:mt-6
                "
              >
                <div className="flex items-center gap-2">
                  <span
                    className="
                      h-1.5
                      w-1.5
                      shrink-0
                      rounded-full
                      bg-[#39ff88]
                      shadow-[0_0_8px_rgba(57,255,136,0.8)]
                    "
                  />

                  <p
                    className="
                      font-mono
                      text-[10px]
                      tracking-wider
                      text-[#39ff88]
                      sm:text-xs
                    "
                  >
                    {item.date}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-gray-600">
                  <CalendarDays size={12} />

                  <span className="font-mono text-[9px] uppercase tracking-wider sm:text-[10px]">
                    {item.type}
                  </span>
                </div>
              </div>

              {/* =====================================
                  DEGREE
              ====================================== */}

              <h3
                className="
                  relative
                  mt-3
                  break-words
                  text-xl
                  font-bold
                  leading-tight
                  text-white
                  sm:text-2xl
                "
              >
                {item.degree}
              </h3>

              {/* =====================================
                  INSTITUTION
              ====================================== */}

              <p
                className="
                  relative
                  mt-2.5
                  max-w-xl
                  break-words
                  text-sm
                  leading-6
                  text-gray-500
                  sm:mt-3
                  sm:text-base
                  sm:leading-7
                "
              >
                {item.institution}
              </p>

              {/* =====================================
                  DIVIDER
              ====================================== */}

              <div className="relative mt-6 h-px bg-white/[0.06] sm:mt-7">
                <div
                  className="
                    h-px
                    w-10
                    bg-[#39ff88]/40
                    transition-all
                    duration-500
                    group-hover:w-20
                    sm:w-12
                    sm:group-hover:w-24
                  "
                />
              </div>

              {/* =====================================
                  BOTTOM CODE INFORMATION
              ====================================== */}

              <div
                className="
                  relative
                  mt-5
                  flex
                  min-w-0
                  items-center
                  justify-between
                  gap-3
                  font-mono
                  text-[9px]
                  text-gray-700
                  sm:mt-6
                  sm:text-[10px]
                "
              >
                <div className="flex min-w-0 items-center gap-2">
                  <BookOpen
                    size={12}
                    className="shrink-0 text-[#39ff88]/40 sm:h-[13px] sm:w-[13px]"
                  />

                  <span className="truncate">
                    education.completed
                  </span>
                </div>

                <ArrowUpRight
                  size={14}
                  className="
                    shrink-0
                    text-gray-700
                    transition-all
                    duration-300
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                    group-hover:text-[#39ff88]
                  "
                />
              </div>

              {/* =====================================
                  BOTTOM GREEN LINE
              ====================================== */}

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

        {/* =========================================
            EDUCATION FOOTER
        ========================================== */}

        <motion.div
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.4,
          }}
          className="
            mt-9
            flex
            flex-wrap
            items-center
            justify-center
            gap-2
            text-center
            font-mono
            text-[10px]
            text-gray-600
            sm:mt-10
            sm:gap-3
            sm:text-xs
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