"use client";

import {
  BriefcaseBusiness,
  CheckCircle2,
  ArrowUpRight,
  Code2,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";

// ======================================================
// EXPERIENCE DATA
// ======================================================

const experience = {
  role: "Software Developer Intern",
  company: "Upcode Software Labs L.L.P",
  date: "05/05/2025 — 31/01/2026",

  description:
    "Worked on full-stack development for live projects, contributing to frontend and backend development, APIs, authentication and database-driven applications.",

  technologies: [
    "ReactJS",
    "Redux",
    "Next.js",
    "TypeScript",
    "Python",
    "Django",
    "Flask",
    "Git",
    "RDBMS",
  ],

  responsibilities: [
    "Worked on frontend and backend development.",
    "Contributed to live project development strategies.",
    "Worked with modern JavaScript and Python technologies.",
    "Completed assigned projects and met important deadlines.",
  ],
};

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

const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
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

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const technologyVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 7,
  },

  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

// ======================================================
// COMPONENT
// ======================================================

export default function Experience() {
  return (
    <section
      id="experience"
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
          container-custom
          w-full
          min-w-0
        "
      >
        {/* =================================================
            SECTION HEADER
        ================================================== */}

        <motion.div
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.2,
          }}
          className="max-w-3xl"
        >
          {/* LABEL */}

          <div className="flex items-center gap-3">
            <span
              className="
                h-px
                w-7
                bg-[#39ff88]
                sm:w-8
              "
            />

            <p
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-[#39ff88]
                sm:text-xs
                sm:tracking-[0.3em]
              "
            >
              04 — Experience
            </p>
          </div>

          {/* TITLE */}

          <h2
            className="
              mt-4
              text-3xl
              font-bold
              leading-tight
              tracking-tight
              sm:mt-5
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
            "
          >
            My professional{" "}
            <span className="text-[#39ff88]">
              journey.
            </span>
          </h2>

          {/* DESCRIPTION */}

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
            Experience gained through practical development,
            live projects and professional teamwork.
          </p>
        </motion.div>

        {/* =================================================
            EXPERIENCE TIMELINE
        ================================================== */}

        <div
          className="
            relative
            mt-10
            sm:mt-12
            lg:mt-14
          "
        >
          {/* =================================================
              TIMELINE LINE
          ================================================== */}

          <motion.div
            initial={{
              scaleY: 0,
            }}
            whileInView={{
              scaleY: 1,
            }}
            viewport={{
              once: false,
              amount: 0.1,
            }}
            transition={{
              duration: 1,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              transformOrigin: "top",
            }}
            className="
              absolute
              bottom-0
              left-[14px]
              top-0
              w-px
              bg-gradient-to-b
              from-[#39ff88]
              via-[#39ff88]/25
              to-transparent
              sm:left-[15px]
            "
          />

          {/* =================================================
              TIMELINE ITEM
          ================================================== */}

          <div
            className="
              relative
              pl-10
              sm:pl-14
              md:pl-16
            "
          >
            {/* =================================================
                TIMELINE NODE
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: false,
                amount: 0.3,
              }}
              transition={{
                duration: 0.45,
              }}
              className="
                absolute
                left-0
                top-1
                z-10
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-full
                border
                border-[#39ff88]/50
                bg-[#080808]
                text-[#39ff88]
                shadow-[0_0_20px_rgba(57,255,136,0.12)]
                sm:h-8
                sm:w-8
              "
            >
              <BriefcaseBusiness
                size={14}
                strokeWidth={1.8}
                className="sm:h-[15px] sm:w-[15px]"
              />

              <span
                aria-hidden="true"
                className="
                  absolute
                  inset-[-5px]
                  rounded-full
                  border
                  border-[#39ff88]/15
                  animate-ping
                "
              />
            </motion.div>

            {/* =================================================
                EXPERIENCE CARD
            ================================================== */}

            <motion.article
              variants={revealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.12,
              }}
              whileHover={{
                y: -5,
              }}
              transition={{
                duration: 0.25,
              }}
              className="
                group
                relative
                min-w-0
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.08]
                bg-[#111113]/65
                p-5
                backdrop-blur-xl
                transition-colors
                duration-500
                hover:border-[#39ff88]/25
                hover:bg-[#151518]/75
                sm:rounded-3xl
                sm:p-7
                lg:p-8
                xl:p-9
              "
            >
              {/* =================================================
                  CARD GLOW
              ================================================== */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -right-28
                  -top-28
                  h-64
                  w-64
                  rounded-full
                  bg-[#39ff88]/[0.025]
                  blur-[80px]
                  transition-all
                  duration-700
                  group-hover:bg-[#39ff88]/[0.075]
                "
              />

              {/* =================================================
                  CODE LABEL
              ================================================== */}

              <div
                className="
                  absolute
                  right-6
                  top-6
                  hidden
                  items-center
                  gap-2
                  font-mono
                  text-[9px]
                  text-gray-700
                  sm:flex
                "
              >
                <Code2
                  size={13}
                  className="text-[#39ff88]/35"
                />

                experience.tsx
              </div>

              {/* =================================================
                  HEADER
              ================================================== */}

              <div
                className="
                  relative
                  flex
                  flex-col
                  gap-5
                  md:flex-row
                  md:items-start
                  md:justify-between
                "
              >
                <div className="min-w-0">
                  {/* DATE */}

                  <div
                    className="
                      flex
                      flex-wrap
                      items-center
                      gap-2
                    "
                  >
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
                        font-medium
                        tracking-wider
                        text-[#39ff88]
                        sm:text-xs
                      "
                    >
                      {experience.date}
                    </p>
                  </div>

                  {/* ROLE */}

                  <h3
                    className="
                      mt-2.5
                      text-xl
                      font-bold
                      leading-tight
                      text-white
                      sm:mt-3
                      sm:text-2xl
                      lg:text-3xl
                    "
                  >
                    {experience.role}
                  </h3>

                  {/* COMPANY */}

                  <p
                    className="
                      mt-1.5
                      text-sm
                      text-gray-400
                      sm:mt-2
                      sm:text-base
                    "
                  >
                    {experience.company}
                  </p>
                </div>

                {/* =================================================
                    INTERNSHIP BADGE
                ================================================== */}

                <span
                  className="
                    flex
                    w-fit
                    shrink-0
                    items-center
                    gap-2
                    rounded-full
                    border
                    border-[#39ff88]/20
                    bg-[#39ff88]/[0.05]
                    px-3
                    py-1.5
                    text-[10px]
                    text-[#39ff88]
                    sm:px-4
                    sm:py-2
                    sm:text-xs
                  "
                >
                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-[#39ff88]
                      shadow-[0_0_7px_#39ff88]
                    "
                  />

                  Internship
                </span>
              </div>

              {/* =================================================
                  DIVIDER
              ================================================== */}

              <div
                className="
                  relative
                  my-6
                  h-px
                  bg-white/[0.06]
                  sm:my-7
                "
              >
                <div
                  className="
                    absolute
                    left-0
                    top-0
                    h-px
                    w-16
                    bg-[#39ff88]/40
                    sm:w-20
                  "
                />
              </div>

              {/* =================================================
                  DESCRIPTION
              ================================================== */}

              <p
                className="
                  relative
                  max-w-3xl
                  text-sm
                  leading-7
                  text-gray-500
                  sm:text-base
                  sm:leading-8
                "
              >
                {experience.description}
              </p>

              {/* =================================================
                  RESPONSIBILITIES
              ================================================== */}

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: false,
                  amount: 0.15,
                }}
                className="
                  relative
                  mt-7
                  sm:mt-8
                "
              >
                <p
                  className="
                    mb-4
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    text-gray-600
                    sm:text-xs
                  "
                >
                  Responsibilities
                </p>

                <div className="space-y-3">
                  {experience.responsibilities.map(
                    (item) => (
                      <motion.div
                        key={item}
                        variants={itemVariants}
                        className="
                          group/item
                          flex
                          gap-2.5
                          text-xs
                          leading-6
                          text-gray-400
                          sm:gap-3
                          sm:text-sm
                        "
                      >
                        <CheckCircle2
                          size={16}
                          className="
                            mt-1
                            shrink-0
                            text-[#39ff88]
                            transition-transform
                            duration-300
                            group-hover/item:scale-110
                          "
                        />

                        <span
                          className="
                            transition-colors
                            duration-300
                            group-hover/item:text-gray-300
                          "
                        >
                          {item}
                        </span>
                      </motion.div>
                    )
                  )}
                </div>
              </motion.div>

              {/* =================================================
                  TECHNOLOGIES
              ================================================== */}

              <div className="relative mt-7 sm:mt-8">
                <p
                  className="
                    mb-3
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    text-gray-600
                    sm:mb-4
                    sm:text-xs
                  "
                >
                  Technologies
                </p>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{
                    once: false,
                    amount: 0.15,
                  }}
                  className="
                    flex
                    flex-wrap
                    gap-1.5
                    sm:gap-2
                  "
                >
                  {experience.technologies.map(
                    (tech) => (
                      <motion.span
                        key={tech}
                        variants={technologyVariants}
                        whileHover={{
                          y: -2,
                          scale: 1.03,
                        }}
                        className="
                          cursor-default
                          rounded-full
                          border
                          border-white/[0.08]
                          bg-black/20
                          px-2.5
                          py-1.5
                          text-[10px]
                          text-gray-500
                          transition-all
                          duration-300
                          hover:border-[#39ff88]/35
                          hover:bg-[#39ff88]/[0.08]
                          hover:text-[#39ff88]
                          sm:px-3
                          sm:text-xs
                        "
                      >
                        {tech}
                      </motion.span>
                    )
                  )}
                </motion.div>
              </div>

              {/* =================================================
                  CODE SIGNATURE
              ================================================== */}

              <div
                className="
                  relative
                  mt-7
                  flex
                  items-center
                  gap-1.5
                  font-mono
                  text-[9px]
                  text-gray-700
                  sm:mt-8
                  sm:text-[10px]
                "
              >
                <span className="text-[#39ff88]/40">
                  {"<"}
                </span>

                <span>
                  learn → build → improve
                </span>

                <ArrowUpRight
                  size={13}
                  className="text-[#39ff88]/40"
                />

                <span>
                  {"/>"}
                </span>
              </div>

              {/* =================================================
                  HOVER LINE
              ================================================== */}

              <div
                aria-hidden="true"
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
          </div>
        </div>

        {/* =================================================
            BOTTOM STATUS
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
            amount: 0.5,
          }}
          transition={{
            duration: 0.55,
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
            text-[9px]
            text-gray-600
            sm:mt-11
            sm:gap-3
            sm:text-xs
          "
        >
          <span className="text-[#39ff88]">
            ●
          </span>

          <span>
            Professional experience through practical development
          </span>
        </motion.div>

        {/* =================================================
            DEVELOPER SIGNATURE
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            once: false,
            amount: 0.5,
          }}
          transition={{
            duration: 0.5,
            delay: 0.15,
          }}
          className="
            mt-6
            text-center
            font-mono
            text-[9px]
            text-gray-800
          "
        >
          <span className="text-[#39ff88]/35">
            {"<experience />"}
          </span>

          <span className="mx-2">
            •
          </span>

          <span>
            real projects · real development
          </span>
        </motion.div>
      </div>
    </section>
  );
}