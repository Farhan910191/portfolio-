"use client";

import {
  Code2,
  Database,
  Layout,
  Server,
  Smartphone,
  Workflow,
  ArrowUpRight,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";

const services = [
  {
    icon: Code2,
    title: "Full Stack Web Development",
    description:
      "Complete web applications from frontend interfaces to backend APIs and databases.",
  },
  {
    icon: Layout,
    title: "Frontend Development",
    description:
      "Responsive and modern interfaces using React, Next.js, TypeScript and CSS.",
  },
  {
    icon: Server,
    title: "Backend Development",
    description:
      "Backend applications and REST APIs using Python, Django and FastAPI.",
  },
  {
    icon: Workflow,
    title: "API Development",
    description:
      "Structured REST APIs with authentication, protected routes and clean integration.",
  },
  {
    icon: Database,
    title: "Database Integration",
    description:
      "Relational database integration and application data management with PostgreSQL.",
  },
  {
    icon: Smartphone,
    title: "Responsive Web Design",
    description:
      "Mobile-first experiences that work smoothly across phones, tablets and desktops.",
  },
];

const headerVariants: Variants = {
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

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 55,
    scale: 0.95,
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

export default function Services() {
  return (
    <section
      id="services"
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
              07 — What I Do
            </p>
          </div>

          <h2 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Turning skills into{" "}
            <span className="text-[#39ff88]">
              solutions.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl leading-8 text-gray-500">
            Building practical digital products with modern
            frontend, backend and database technologies.
          </p>
        </motion.div>

        {/* =================================
            SERVICES GRID
        ================================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.12,
          }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.article
                key={service.title}
                variants={cardVariants}
                whileHover={{
                  y: -8,
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
                    h-48
                    w-48
                    rounded-full
                    bg-[#39ff88]/[0.025]
                    blur-[70px]
                    transition-all
                    duration-700
                    group-hover:bg-[#39ff88]/[0.1]
                  "
                />

                {/* =================================
                    NUMBER
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
                    h-13
                    w-13
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
                    group-hover:bg-[#39ff88]
                    group-hover:text-black
                    group-hover:shadow-[0_0_30px_rgba(57,255,136,0.18)]
                  "
                >
                  <Icon size={22} />
                </motion.div>

                {/* =================================
                    TITLE
                ================================== */}

                <h3 className="relative mt-7 pr-8 text-xl font-semibold text-white">
                  {service.title}
                </h3>

                {/* =================================
                    DESCRIPTION
                ================================== */}

                <p className="relative mt-3 text-sm leading-7 text-gray-500">
                  {service.description}
                </p>

                {/* =================================
                    BOTTOM CODE
                ================================== */}

                <div
                  className="
                    relative
                    mt-7
                    flex
                    items-center
                    justify-between
                    border-t
                    border-white/[0.06]
                    pt-5
                    font-mono
                    text-[10px]
                    text-gray-700
                  "
                >
                  <span>
                    service.execute()
                  </span>

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
            );
          })}
        </motion.div>

        {/* =================================
            PROCESS FOOTER
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
            flex-wrap
            items-center
            justify-center
            gap-3
            font-mono
            text-xs
            text-gray-600
          "
        >
          <span className="text-[#39ff88]/50">
            {"<services />"}
          </span>

          <span>
            Plan
          </span>

          <span className="text-[#39ff88]/30">
            →
          </span>

          <span>
            Build
          </span>

          <span className="text-[#39ff88]/30">
            →
          </span>

          <span>
            Test
          </span>

          <span className="text-[#39ff88]/30">
            →
          </span>

          <span>
            Deploy
          </span>

          <span className="text-[#39ff88]/50">
            {"</>"}
          </span>
        </motion.div>

      </div>
    </section>
  );
}