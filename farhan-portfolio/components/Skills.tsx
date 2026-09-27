"use client";

import {
  Braces,
  Database,
  GitBranch,
  Server,
  Wrench,
  ArrowUpRight,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";

// ======================================================
// SKILL DATA
// ======================================================

const groups = [
  {
    number: "01",
    title: "Frontend",
    icon: Braces,
    description: "Modern and responsive user interfaces.",
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Bootstrap",
      "Redux",
    ],
  },
  {
    number: "02",
    title: "Backend",
    icon: Server,
    description: "Server-side applications and REST APIs.",
    skills: [
      "Python",
      "Django",
      "FastAPI",
      "REST API",
      "JWT Authentication",
    ],
  },
  {
    number: "03",
    title: "Database",
    icon: Database,
    description: "Relational database development.",
    skills: [
      "PostgreSQL",
      "Django ORM",
    ],
  },
  {
    number: "04",
    title: "Tools",
    icon: Wrench,
    description: "Development and deployment workflow.",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
      "Vercel",
    ],
  },
];

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

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.98,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const skillVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
    scale: 0.94,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

// ======================================================
// COMPONENT
// ======================================================

export default function Skills() {
  return (
    <section
      id="skills"
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
          className="
            max-w-3xl
          "
        >
          {/* SECTION NUMBER */}

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
              02 — Skills
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
            Technologies I{" "}
            <span className="text-[#39ff88]">
              work with.
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
            Technologies and tools I use to design,
            develop, test and deploy web applications.
          </p>
        </motion.div>

        {/* =================================================
            SKILL GRID
        ================================================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.08,
          }}
          className="
            mt-10
            grid
            gap-4
            sm:mt-12
            sm:gap-5
            md:grid-cols-2
          "
        >
          {groups.map((group) => {
            const Icon = group.icon;

            return (
              <motion.article
                key={group.title}
                variants={cardVariants}
                whileHover={{
                  y: -5,
                  transition: {
                    duration: 0.25,
                  },
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
                  sm:p-6
                  lg:p-7
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
                    -right-24
                    -top-24
                    h-48
                    w-48
                    rounded-full
                    bg-[#39ff88]/[0.025]
                    blur-[70px]
                    transition-all
                    duration-700
                    group-hover:bg-[#39ff88]/[0.08]
                  "
                />

                {/* =================================================
                    TOP NUMBER
                ================================================== */}

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
                    group-hover:text-[#39ff88]/40
                    sm:right-6
                    sm:top-6
                  "
                >
                  {group.number}
                </span>

                {/* =================================================
                    CARD HEADER
                ================================================== */}

                <div
                  className="
                    relative
                    flex
                    min-w-0
                    items-center
                    gap-3.5
                    pr-10
                    sm:gap-4
                  "
                >
                  {/* ICON */}

                  <motion.div
                    whileHover={{
                      rotate: 4,
                      scale: 1.06,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="
                      flex
                      h-11
                      w-11
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-[#39ff88]/10
                      bg-[#39ff88]/[0.06]
                      text-[#39ff88]
                      transition-all
                      duration-500
                      group-hover:border-[#39ff88]/25
                      group-hover:bg-[#39ff88]/[0.09]
                      group-hover:shadow-[0_0_25px_rgba(57,255,136,0.1)]
                      sm:h-12
                      sm:w-12
                    "
                  >
                    <Icon
                      size={22}
                      strokeWidth={1.8}
                    />
                  </motion.div>

                  {/* TITLE */}

                  <div className="min-w-0">
                    <h3
                      className="
                        text-lg
                        font-semibold
                        text-white
                        sm:text-xl
                      "
                    >
                      {group.title}
                    </h3>

                    <p
                      className="
                        mt-0.5
                        text-xs
                        leading-5
                        text-gray-500
                        sm:text-sm
                      "
                    >
                      {group.description}
                    </p>
                  </div>
                </div>

                {/* =================================================
                    SKILLS
                ================================================== */}

                <motion.div
                  variants={containerVariants}
                  className="
                    relative
                    mt-6
                    flex
                    flex-wrap
                    gap-2
                    sm:mt-7
                    sm:gap-2.5
                  "
                >
                  {group.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      variants={skillVariants}
                      whileHover={{
                        y: -2,
                        scale: 1.03,
                      }}
                      className="
                        cursor-default
                        rounded-full
                        border
                        border-white/[0.08]
                        bg-black/30
                        px-3
                        py-1.5
                        text-[11px]
                        text-gray-300
                        backdrop-blur-sm
                        transition-all
                        duration-300
                        hover:border-[#39ff88]/35
                        hover:bg-[#39ff88]/[0.08]
                        hover:text-[#39ff88]
                        hover:shadow-[0_0_16px_rgba(57,255,136,0.07)]
                        sm:px-3.5
                        sm:py-2
                        sm:text-xs
                        md:text-sm
                      "
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>

                {/* =================================================
                    CODE FOOTER
                ================================================== */}

                <div
                  className="
                    relative
                    mt-6
                    flex
                    items-center
                    gap-1.5
                    font-mono
                    text-[9px]
                    text-gray-700
                    sm:mt-7
                    sm:text-[10px]
                  "
                >
                  <span className="text-[#39ff88]/40">
                    {"<"}
                  </span>

                  <span>
                    {group.title.toLowerCase()}.load()
                  </span>

                  <span>
                    {" />"}
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
                    shadow-[0_0_15px_rgba(57,255,136,0.7)]
                    transition-all
                    duration-700
                    group-hover:w-full
                  "
                />
              </motion.article>
            );
          })}
        </motion.div>

        {/* =================================================
            WORKFLOW
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
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
            duration: 0.6,
          }}
          className="
            mt-10
            flex
            flex-wrap
            items-center
            justify-center
            gap-x-2.5
            gap-y-2
            font-mono
            text-[9px]
            text-gray-600
            sm:mt-12
            sm:gap-3
            sm:text-xs
          "
        >
          <GitBranch
            size={15}
            className="text-[#39ff88]/50 sm:h-[17px] sm:w-[17px]"
          />

          <span>
            Building
          </span>

          <span className="text-[#39ff88]/30">
            →
          </span>

          <span>
            Testing
          </span>

          <span className="text-[#39ff88]/30">
            →
          </span>

          <span>
            Deploying
          </span>

          <span className="text-[#39ff88]/30">
            →
          </span>

          <span>
            Improving
          </span>

          <ArrowUpRight
            size={14}
            className="text-[#39ff88]/40"
          />
        </motion.div>

        {/* =================================================
            BOTTOM DEVELOPER SIGNATURE
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
            duration: 0.6,
            delay: 0.15,
          }}
          className="
            mt-8
            text-center
            font-mono
            text-[9px]
            text-gray-800
          "
        >
          <span className="text-[#39ff88]/35">
            {"<skills />"}
          </span>

          <span className="mx-2">
            •
          </span>

          <span>
            learn · build · improve
          </span>
        </motion.div>
      </div>
    </section>
  );
}