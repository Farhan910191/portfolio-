"use client";

import { motion, type Variants } from "framer-motion";
import {
  Quote,
  Star,
  ArrowUpRight,
} from "lucide-react";

// ======================================================
// TESTIMONIAL DATA
// ======================================================

const testimonials = [
  {
    name: "Your Mentor",
    role: "Mentor / Team Lead",
    text: "Add a genuine testimonial from your mentor or team lead here.",
  },
  {
    name: "Your Teammate",
    role: "Developer / Teammate",
    text: "Add a genuine testimonial describing your teamwork and development skills.",
  },
  {
    name: "Your Client",
    role: "Client / Collaborator",
    text: "Add a genuine testimonial about your project delivery and communication.",
  },
];

// ======================================================
// ANIMATIONS
// ======================================================

const headerVariants: Variants = {
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
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const containerVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
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

const footerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const starVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
  },

  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ======================================================
// COMPONENT
// ======================================================

export default function Testimonials() {
  return (
    <section
      id="testimonials"
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
        {/* =================================================
            HEADER
        ================================================== */}

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
          {/* Section label */}

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
              09 — Testimonials
            </p>
          </div>

          {/* Heading + developer label */}

          <div
            className="
              mt-4
              flex
              flex-col
              justify-between
              gap-5
              sm:mt-5
              lg:flex-row
              lg:items-end
            "
          >
            <div className="min-w-0">
              <h2
                className="
                  max-w-3xl
                  text-3xl
                  font-bold
                  leading-[1.08]
                  tracking-tight
                  text-white
                  sm:text-4xl
                  md:text-5xl
                  lg:text-6xl
                "
              >
                What people{" "}
                <span className="text-[#39ff88]">
                  say.
                </span>
              </h2>

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
                Feedback from people I have worked with,
                learned from, and collaborated with.
              </p>
            </div>

            {/* Developer label */}

            <div
              className="
                hidden
                shrink-0
                items-center
                gap-2
                font-mono
                text-[10px]
                text-gray-700
                lg:flex
              "
            >
              <span className="text-[#39ff88]/60">
                {"<feedback />"}
              </span>

              <span>
                real experiences
              </span>
            </div>
          </div>
        </motion.div>

        {/* =================================================
            TESTIMONIAL CARDS
        ================================================== */}

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
            min-w-0
            grid-cols-1
            gap-4
            sm:mt-12
            sm:gap-5
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
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
                hover:shadow-[0_15px_50px_rgba(0,0,0,0.35)]
                sm:rounded-3xl
                sm:p-6
                lg:p-7
              "
            >
              {/* =========================================
                  CARD GLOW
              ========================================== */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-20
                  -top-20
                  h-40
                  w-40
                  rounded-full
                  bg-[#39ff88]/[0.035]
                  blur-[70px]
                  transition-all
                  duration-700
                  group-hover:bg-[#39ff88]/[0.09]
                "
              />

              {/* =========================================
                  TOP SHINE
              ========================================== */}

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

              {/* =========================================
                  CARD TOP
              ========================================== */}

              <div className="relative flex items-start justify-between">
                <motion.div
                  whileHover={{
                    rotate: 5,
                    scale: 1.06,
                  }}
                  transition={{
                    duration: 0.25,
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
                    border-[#39ff88]/15
                    bg-[#39ff88]/5
                    text-[#39ff88]
                    transition-all
                    duration-300
                    group-hover:border-[#39ff88]/40
                    group-hover:bg-[#39ff88]/10
                    group-hover:shadow-[0_0_25px_rgba(57,255,136,0.1)]
                    sm:h-12
                    sm:w-12
                    sm:rounded-2xl
                  "
                >
                  <Quote
                    size={20}
                    className="sm:h-[22px] sm:w-[22px]"
                  />
                </motion.div>

                <span
                  className="
                    font-mono
                    text-[10px]
                    text-gray-700
                    transition-colors
                    duration-300
                    group-hover:text-[#39ff88]/50
                    sm:text-xs
                  "
                >
                  0{index + 1}
                </span>
              </div>

              {/* =========================================
                  STARS
              ========================================== */}

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: false,
                  amount: 0.5,
                }}
                className="relative mt-6 flex gap-1"
              >
                {Array.from({ length: 5 }).map(
                  (_, starIndex) => (
                    <motion.div
                      key={starIndex}
                      variants={starVariants}
                      transition={{
                        delay:
                          index * 0.1 +
                          starIndex * 0.05,
                      }}
                    >
                      <Star
                        size={14}
                        fill="currentColor"
                        className="
                          text-[#39ff88]
                          transition-transform
                          duration-300
                          group-hover:scale-110
                          sm:h-[15px]
                          sm:w-[15px]
                        "
                      />
                    </motion.div>
                  )
                )}
              </motion.div>

              {/* =========================================
                  QUOTE
              ========================================== */}

              <p
                className="
                  relative
                  mt-5
                  min-h-[105px]
                  text-sm
                  leading-6
                  text-gray-500
                  sm:mt-6
                  sm:min-h-[115px]
                  sm:text-base
                  sm:leading-7
                "
              >
                <span className="text-xl text-[#39ff88]/30">
                  “
                </span>

                {testimonial.text}

                <span className="text-xl text-[#39ff88]/30">
                  ”
                </span>
              </p>

              {/* =========================================
                  PERSON
              ========================================== */}

              <div
                className="
                  relative
                  mt-6
                  border-t
                  border-white/[0.06]
                  pt-5
                "
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    {/* Avatar */}

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#39ff88]/15
                        bg-[#39ff88]/10
                        font-semibold
                        text-[#39ff88]
                        transition-all
                        duration-300
                        group-hover:border-[#39ff88]/40
                        group-hover:shadow-[0_0_20px_rgba(57,255,136,0.12)]
                        sm:h-11
                        sm:w-11
                      "
                    >
                      {testimonial.name.charAt(0)}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white sm:text-base">
                        {testimonial.name}
                      </p>

                      <p className="mt-0.5 truncate text-[10px] text-gray-600 sm:mt-1 sm:text-xs">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight
                    size={16}
                    className="
                      shrink-0
                      text-gray-700
                      transition-all
                      duration-300
                      group-hover:-translate-y-1
                      group-hover:translate-x-1
                      group-hover:text-[#39ff88]
                      sm:h-[18px]
                      sm:w-[18px]
                    "
                  />
                </div>
              </div>

              {/* =========================================
                  BOTTOM GREEN LINE
              ========================================== */}

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

        {/* =================================================
            BOTTOM DEVELOPER LABEL
        ================================================== */}

        <motion.div
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: false,
            amount: 0.5,
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
            text-gray-700
            sm:mt-10
            sm:gap-3
            sm:text-xs
          "
        >
          <span className="text-[#39ff88]/50">
            {"<testimonials />"}
          </span>

          <span>
            Learn • Build • Collaborate
          </span>

          <span className="text-[#39ff88]/50">
            {"</>"}
          </span>
        </motion.div>
      </div>
    </section>
  );
}