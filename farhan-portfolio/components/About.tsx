"use client";

import {
  Code2,
  Database,
  Rocket,
  Terminal,
  ArrowUpRight,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";

// ======================================================
// DATA
// ======================================================

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
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
const stats = [
  ["3+", "Featured Projects"],
  ["15+", "Technologies"],
  ["01", "Professional Internship"],
];

const highlights = [
  {
    icon: Code2,
    title: "Full Stack Development",
    text: "Building complete applications across frontend, backend, APIs and databases.",
  },
  {
    icon: Database,
    title: "Backend & APIs",
    text: "Creating REST APIs, authentication systems and database-driven applications.",
  },
  {
    icon: Rocket,
    title: "Modern Web Apps",
    text: "Developing responsive and scalable applications using modern technologies.",
  },
  {
    icon: Terminal,
    title: "Clean Development",
    text: "Writing maintainable code and following Git-based development workflows.",
  },
];

// ======================================================
// ANIMATION VARIANTS
// ======================================================

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

const contentVariants: Variants = {
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
      duration: 0.65,
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

const statVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

// ======================================================
// ABOUT SECTION
// ======================================================

export default function About() {
  return (
    <section
      id="about"
      className="
        relative
        w-full
        min-w-0
        overflow-hidden
        border-t
        border-white/[0.05]
        py-20
        sm:py-24
        md:py-28
        lg:py-32
        xl:py-36
      "
    >
      {/* ==================================================
          CONTAINER
      =================================================== */}

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
        {/* ==================================================
            SECTION HEADER
        =================================================== */}

        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.2,
          }}
          className="min-w-0"
        >
          {/* Label */}

          <div className="flex items-center gap-3">
            <span className="h-px w-6 shrink-0 bg-[#39ff88] sm:w-8" />

            <p
              className="
                font-mono
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-[#39ff88]
                sm:text-xs
                sm:tracking-[0.25em]
                md:text-sm
              "
            >
              01 — About Me
            </p>
          </div>

          {/* Heading */}

          <h2
            className="
              mt-5
              max-w-4xl
              break-words
              text-3xl
              font-bold
              leading-[1.08]
              tracking-[-0.03em]
              text-white
              sm:mt-6
              sm:text-4xl
              md:text-5xl
              lg:mt-7
              lg:text-6xl
            "
          >
            Turning ideas into{" "}
            <span className="text-[#39ff88]">
              digital experiences.
            </span>
          </h2>

          {/* Intro */}

          <p
            className="
              mt-5
              max-w-2xl
              text-xs
              leading-6
              text-gray-500
              sm:mt-6
              sm:text-sm
              sm:leading-7
            "
          >
            A developer focused on building modern, scalable
            and user-friendly web applications.
          </p>
        </motion.div>

        {/* ==================================================
            MAIN CONTENT
        =================================================== */}

        <div
          className="
            mt-10
            grid
            w-full
            min-w-0
            gap-5
            sm:mt-12
            sm:gap-6
            lg:mt-16
            lg:grid-cols-[1.12fr_0.88fr]
            lg:gap-7
            xl:gap-8
          "
        >
          {/* ==================================================
              LEFT MAIN CARD
          =================================================== */}

          <motion.div
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: false,
              amount: 0.12,
            }}
            className="
              group
              relative
              flex
              min-w-0
              flex-col
              overflow-hidden
              rounded-2xl
              border
              border-white/[0.08]
              bg-[#111113]/75
              p-5
              shadow-[0_20px_70px_rgba(0,0,0,0.25)]
              backdrop-blur-2xl
              sm:rounded-3xl
              sm:p-7
              md:p-8
              lg:p-9
            "
          >
            {/* ==================================================
                CARD GLOW
            =================================================== */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-24
                -top-24
                h-64
                w-64
                rounded-full
                bg-[#39ff88]/[0.035]
                blur-[90px]
                transition-all
                duration-700
                group-hover:bg-[#39ff88]/[0.08]
              "
            />

            {/* ==================================================
                TOP STATUS
            =================================================== */}

            <div
              className="
                relative
                flex
                min-w-0
                items-center
                justify-between
                gap-4
              "
            >
              <div
                className="
                  flex
                  min-w-0
                  items-center
                  gap-2.5
                "
              >
                {/* Status indicator */}

                <span className="relative flex h-2.5 w-2.5 shrink-0 sm:h-3 sm:w-3">
                  <span
                    className="
                      absolute
                      inline-flex
                      h-full
                      w-full
                      animate-ping
                      rounded-full
                      bg-[#39ff88]
                      opacity-30
                    "
                  />

                  <span
                    className="
                      relative
                      inline-flex
                      h-2.5
                      w-2.5
                      rounded-full
                      bg-[#39ff88]
                      shadow-[0_0_12px_rgba(57,255,136,0.8)]
                      sm:h-3
                      sm:w-3
                    "
                  />
                </span>

                <span
                  className="
                    min-w-0
                    truncate
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-[0.12em]
                    text-gray-500
                    sm:text-[10px]
                    sm:tracking-widest
                  "
                >
                  Available for opportunities
                </span>
              </div>

              <span
                className="
                  shrink-0
                  font-mono
                  text-[10px]
                  text-[#39ff88]/50
                  sm:text-xs
                "
              >
                01
              </span>
            </div>

            {/* ==================================================
                DESCRIPTION
            =================================================== */}

            <div className="relative mt-7 sm:mt-9">
              <p
                className="
                  break-words
                  text-lg
                  leading-8
                  text-gray-200
                  sm:text-xl
                  sm:leading-9
                  md:text-2xl
                "
              >
                I&apos;m Mohammed Farhan KK, a{" "}
                <span className="text-[#39ff88]">
                  Full Stack Developer
                </span>{" "}
                focused on building responsive, scalable and
                user-friendly web applications.
              </p>

              <p
                className="
                  mt-5
                  break-words
                  text-xs
                  leading-7
                  text-gray-400
                  sm:mt-7
                  sm:text-sm
                  sm:leading-8
                "
              >
                I work across the complete development cycle —
                from creating modern user interfaces and
                reusable components to developing REST APIs,
                authentication systems and PostgreSQL-backed
                applications.
              </p>

              <p
                className="
                  mt-4
                  break-words
                  text-xs
                  leading-7
                  text-gray-400
                  sm:mt-6
                  sm:text-sm
                  sm:leading-8
                "
              >
                I enjoy solving development problems, learning
                new technologies and turning ideas into
                practical digital products.
              </p>
            </div>

            {/* ==================================================
                STATS
            =================================================== */}

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: false,
                amount: 0.25,
              }}
              className="
                relative
                mt-7
                grid
                grid-cols-1
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.06]
                sm:mt-9
                sm:grid-cols-3
              "
            >
              {stats.map(([number, label]) => (
                <motion.div
                  key={label}
                  variants={statVariants}
                  className="
                    group/stat
                    relative
                    min-w-0
                    border-b
                    border-white/[0.07]
                    bg-[#0d0d0f]/90
                    p-4
                    transition-all
                    duration-500
                    last:border-b-0
                    hover:bg-[#151518]
                    sm:border-b-0
                    sm:border-r
                    sm:p-5
                    sm:last:border-r-0
                  "
                >
                  <p
                    className="
                      text-2xl
                      font-bold
                      text-[#39ff88]
                      transition-transform
                      duration-300
                      group-hover/stat:translate-x-1
                      sm:text-3xl
                    "
                  >
                    {number}
                  </p>

                  <p
                    className="
                      mt-1.5
                      break-words
                      text-[10px]
                      leading-5
                      text-gray-500
                      sm:mt-2
                      sm:text-xs
                    "
                  >
                    {label}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* ==================================================
                CODE SIGNATURE
            =================================================== */}

            <div
              className="
                relative
                mt-6
                flex
                min-w-0
                items-center
                gap-2
                font-mono
                text-[8px]
                text-gray-600
                sm:mt-8
                sm:gap-3
                sm:text-[10px]
              "
            >
              <span className="shrink-0 text-[#39ff88]/50">
                {"<about />"}
              </span>

              <span className="h-px min-w-4 flex-1 bg-white/[0.06]" />

              <span className="hidden shrink-0 sm:block">
                building ideas into reality
              </span>

              <span className="shrink-0 sm:hidden">
                building ideas
              </span>
            </div>

            {/* Bottom line */}

            <div
              className="
                absolute
                bottom-0
                left-0
                h-[2px]
                w-0
                bg-[#39ff88]
                shadow-[0_0_18px_rgba(57,255,136,0.7)]
                transition-all
                duration-700
                group-hover:w-full
              "
            />
          </motion.div>

          {/* ==================================================
              RIGHT HIGHLIGHTS
          =================================================== */}

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: false,
              amount: 0.1,
            }}
            className="
              grid
              min-w-0
              grid-cols-1
              gap-4
              sm:grid-cols-2
              lg:grid-cols-1
            "
          >
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  variants={contentVariants}
                  whileHover={{
                    y: -5,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="
                    group
                    relative
                    flex
                    min-w-0
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/[0.08]
                    bg-[#111113]/65
                    p-4
                    backdrop-blur-xl
                    transition-all
                    duration-500
                    hover:border-[#39ff88]/30
                    hover:bg-[#151518]/80
                    sm:p-5
                    md:p-6
                  "
                >
                  {/* Card glow */}

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      -right-16
                      -top-16
                      h-32
                      w-32
                      rounded-full
                      bg-[#39ff88]/[0.035]
                      blur-[50px]
                      transition-all
                      duration-500
                      group-hover:bg-[#39ff88]/[0.1]
                    "
                  />

                  {/* Content */}

                  <div
                    className="
                      relative
                      flex
                      min-w-0
                      w-full
                      gap-3
                      sm:gap-4
                    "
                  >
                    {/* Icon */}

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
                        border-[#39ff88]/10
                        bg-[#39ff88]/[0.07]
                        text-[#39ff88]
                        transition-all
                        duration-500
                        group-hover:border-[#39ff88]/30
                        group-hover:bg-[#39ff88]/10
                        group-hover:shadow-[0_0_25px_rgba(57,255,136,0.12)]
                        sm:h-11
                        sm:w-11
                        md:h-12
                        md:w-12
                      "
                    >
                      <Icon
                        size={19}
                        className="sm:h-5 sm:w-5"
                      />
                    </div>

                    {/* Text */}

                    <div className="min-w-0 flex-1">
                      <div
                        className="
                          flex
                          min-w-0
                          items-start
                          justify-between
                          gap-2
                        "
                      >
                        <h3
                          className="
                            min-w-0
                            break-words
                            text-sm
                            font-semibold
                            leading-5
                            text-white
                            sm:text-base
                          "
                        >
                          {item.title}
                        </h3>

                        <ArrowUpRight
                          size={15}
                          className="
                            mt-0.5
                            shrink-0
                            text-gray-700
                            transition-all
                            duration-300
                            group-hover:-translate-y-1
                            group-hover:translate-x-1
                            group-hover:text-[#39ff88]
                            sm:h-[17px]
                            sm:w-[17px]
                          "
                        />
                      </div>

                      <p
                        className="
                          mt-1.5
                          break-words
                          text-[11px]
                          leading-5
                          text-gray-500
                          sm:mt-2
                          sm:text-xs
                          sm:leading-6
                        "
                      >
                        {item.text}
                      </p>
                    </div>
                  </div>

                  {/* Bottom line */}

                  <div
                    className="
                      absolute
                      bottom-0
                      left-0
                      h-px
                      w-0
                      bg-[#39ff88]
                      shadow-[0_0_12px_rgba(57,255,136,0.6)]
                      transition-all
                      duration-500
                      group-hover:w-full
                    "
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* ==================================================
            BOTTOM SIGNATURE
        =================================================== */}

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
            amount: 0.4,
          }}
          transition={{
            duration: 0.7,
          }}
          className="
            mt-10
            flex
            min-w-0
            items-center
            justify-center
            gap-2
            font-mono
            text-[9px]
            text-gray-600
            sm:mt-14
            sm:gap-3
            sm:text-xs
          "
        >
          <span className="shrink-0 text-[#39ff88]/40">
            {"<"}
          </span>

          <span className="truncate">
            designing • developing • deploying
          </span>

          <span className="shrink-0 text-[#39ff88]/40">
            {"/>"}
          </span>
        </motion.div>
      </div>
    </section>
  );
}