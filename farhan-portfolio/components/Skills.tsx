"use client";

import {
  Braces,
  Database,
  GitBranch,
  Server,
  Wrench,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

const groups = [
  {
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
    title: "Backend",
    icon: Server,
    description: "Server-side applications and APIs.",
    skills: [
      "Python",
      "Django",
      "FastAPI",
      "REST API",
      "JWT Authentication",
    ],
  },
  {
    title: "Database",
    icon: Database,
    description: "Relational database development.",
    skills: [
      "PostgreSQL",
      "Django ORM",
    ],
  },
  {
    title: "Tools",
    icon: Wrench,
    description: "Development and deployment tools.",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
      "Vercel",
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const revealVariants = {
  hidden: {
    opacity: 0,
    y: 45,
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
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative border-t border-white/[0.05] py-28 sm:py-36"
    >
      <div className="container-custom">

        {/* =========================
            SECTION HEADER
        ========================== */}

        <motion.div
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#39ff88]" />

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#39ff88]">
              02 — Skills
            </p>
          </div>

          <h2 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Technologies I{" "}
            <span className="text-[#39ff88]">
              work with.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl leading-8 text-gray-500">
            Technologies and tools I use to design, develop,
            test and deploy web applications.
          </p>
        </motion.div>

        {/* =========================
            SKILL CARDS
        ========================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12,
          }}
          className="mt-16 grid gap-5 md:grid-cols-2"
        >
          {groups.map((group, groupIndex) => {
            const Icon = group.icon;

            return (
              <motion.div
                key={group.title}
                variants={cardVariants}
                whileHover={{
                  y: -7,
                  transition: {
                    duration: 0.25,
                  },
                }}
                className="
                  group relative overflow-hidden
                  rounded-3xl
                  border border-white/[0.08]
                  bg-[#111113]/65
                  p-7
                  backdrop-blur-xl
                  transition-all duration-500
                  hover:border-[#39ff88]/30
                  hover:bg-[#151518]/75
                "
              >
                {/* =========================
                    CARD GLOW
                ========================== */}

                <div
                  className="
                    pointer-events-none
                    absolute -right-24 -top-24
                    h-56 w-56
                    rounded-full
                    bg-[#39ff88]/[0.035]
                    blur-[80px]
                    transition-all duration-700
                    group-hover:bg-[#39ff88]/[0.09]
                  "
                />

                {/* =========================
                    TOP NUMBER
                ========================== */}

                <div className="absolute right-6 top-6 font-mono text-xs text-gray-700 transition-colors duration-300 group-hover:text-[#39ff88]/40">
                  0{groupIndex + 1}
                </div>

                {/* =========================
                    ICON + TITLE
                ========================== */}

                <div className="relative flex items-center gap-4">

                  <motion.div
                    whileHover={{
                      rotate: 5,
                      scale: 1.08,
                    }}
                    className="
                      flex h-12 w-12 shrink-0
                      items-center justify-center
                      rounded-xl
                      border border-[#39ff88]/10
                      bg-[#39ff88]/[0.07]
                      text-[#39ff88]
                      transition-all duration-500
                      group-hover:border-[#39ff88]/30
                      group-hover:bg-[#39ff88]/10
                      group-hover:shadow-[0_0_30px_rgba(57,255,136,0.12)]
                    "
                  >
                    <Icon size={23} />
                  </motion.div>

                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {group.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {group.description}
                    </p>
                  </div>
                </div>

                {/* =========================
                    SKILLS
                ========================== */}

                <motion.div
                  variants={containerVariants}
                  className="relative mt-8 flex flex-wrap gap-2.5"
                >
                  {group.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      variants={{
                        hidden: {
                          opacity: 0,
                          scale: 0.85,
                          y: 10,
                        },
                        visible: {
                          opacity: 1,
                          scale: 1,
                          y: 0,
                          transition: {
                            duration: 0.35,
                            delay: skillIndex * 0.04,
                          },
                        },
                      }}
                      whileHover={{
                        y: -3,
                        scale: 1.04,
                        transition: {
                          duration: 0.2,
                        },
                      }}
                      className="
                        cursor-default
                        rounded-full
                        border border-white/[0.08]
                        bg-black/30
                        px-4 py-2
                        text-sm text-gray-300
                        backdrop-blur-sm
                        transition-all duration-300
                        hover:border-[#39ff88]/40
                        hover:bg-[#39ff88]/10
                        hover:text-[#39ff88]
                        hover:shadow-[0_0_18px_rgba(57,255,136,0.08)]
                      "
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>

                {/* =========================
                    BOTTOM CODE LINE
                ========================== */}

                <div className="relative mt-7 flex items-center gap-2 font-mono text-[10px] text-gray-700">
                  <span className="text-[#39ff88]/40">
                    {"<"}
                  </span>

                  <span>
                    skill.load()
                  </span>

                  <span>
                    {" />"}
                  </span>
                </div>

                {/* =========================
                    ANIMATED BOTTOM LINE
                ========================== */}

                <div
                  className="
                    absolute bottom-0 left-0
                    h-px w-0
                    bg-[#39ff88]
                    shadow-[0_0_15px_rgba(57,255,136,0.7)]
                    transition-all duration-700
                    group-hover:w-full
                  "
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* =========================
            DEVELOPMENT WORKFLOW
        ========================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
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
            duration: 0.7,
            delay: 0.2,
          }}
          className="
            mt-14
            flex flex-wrap
            items-center
            justify-center
            gap-3
            font-mono
            text-xs
            text-gray-600
          "
        >
          <GitBranch
            size={17}
            className="text-[#39ff88]/50"
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
            size={15}
            className="text-[#39ff88]/40"
          />
        </motion.div>

      </div>
    </section>
  );
}