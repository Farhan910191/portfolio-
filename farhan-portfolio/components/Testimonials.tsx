"use client";

import { motion } from "framer-motion";
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

const containerVariants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.12,
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

// ======================================================
// COMPONENT
// ======================================================

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="
        relative
        border-t
        border-white/[0.05]
        py-28
        sm:py-36
      "
    >
      <div className="container-custom">

        {/* =================================================
            HEADER
        ================================================== */}

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
              09 — Testimonials
            </p>
          </div>

          <div className="mt-5 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

            <div>
              <h2
                className="
                  text-4xl
                  font-bold
                  leading-tight
                  text-white
                  sm:text-5xl
                  lg:text-6xl
                "
              >
                What people{" "}
                <span className="text-[#39ff88]">
                  say.
                </span>
              </h2>

              <p className="mt-5 max-w-2xl leading-8 text-gray-500">
                Feedback from people I have worked with,
                learned from, and collaborated with.
              </p>
            </div>

            {/* Developer label */}

            <div
              className="
                hidden
                items-center
                gap-2
                font-mono
                text-xs
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
            once: true,
            amount: 0.15,
          }}
          className="
            mt-14
            grid
            gap-5
            lg:grid-cols-3
          "
        >

          {testimonials.map(
            (testimonial, index) => (
              <motion.article
                key={testimonial.name}
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
                  hover:shadow-[0_15px_50px_rgba(0,0,0,0.35)]
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
                    bg-[#39ff88]/[0.045]
                    blur-[70px]
                    transition-all
                    duration-700
                    group-hover:bg-[#39ff88]/[0.08]
                  "
                />

                {/* =========================================
                    TOP NUMBER
                ========================================== */}

                <div className="relative flex items-start justify-between">

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-2xl
                      border
                      border-[#39ff88]/15
                      bg-[#39ff88]/5
                      text-[#39ff88]
                      transition-all
                      duration-300
                      group-hover:border-[#39ff88]/40
                      group-hover:bg-[#39ff88]/10
                    "
                  >
                    <Quote size={22} />
                  </div>

                  <span
                    className="
                      font-mono
                      text-xs
                      text-gray-700
                      transition-colors
                      duration-300
                      group-hover:text-[#39ff88]/50
                    "
                  >
                    0{index + 1}
                  </span>

                </div>

                {/* =========================================
                    STARS
                ========================================== */}

                <div className="relative mt-7 flex gap-1">

                  {Array.from({
                    length: 5,
                  }).map((_, starIndex) => (
                    <motion.div
                      key={starIndex}
                      initial={{
                        opacity: 0,
                        scale: 0.5,
                      }}
                      whileInView={{
                        opacity: 1,
                        scale: 1,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.25,
                        delay:
                          index * 0.12 +
                          starIndex * 0.06,
                      }}
                    >
                      <Star
                        size={15}
                        fill="currentColor"
                        className="
                          text-[#39ff88]
                          transition-transform
                          duration-300
                          group-hover:scale-110
                        "
                      />
                    </motion.div>
                  ))}

                </div>

                {/* =========================================
                    TEXT
                ========================================== */}

                <p
                  className="
                    relative
                    mt-6
                    min-h-[120px]
                    leading-7
                    text-gray-500
                  "
                >
                  &ldquo;
                  {testimonial.text}
                  &rdquo;
                </p>

                {/* =========================================
                    PERSON
                ========================================== */}

                <div
                  className="
                    relative
                    mt-7
                    border-t
                    border-white/[0.06]
                    pt-5
                  "
                >

                  <div className="flex items-center justify-between gap-4">

                    <div className="flex items-center gap-4">

                      {/* Avatar */}

                      <div
                        className="
                          flex
                          h-11
                          w-11
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
                        "
                      >
                        {testimonial.name.charAt(0)}
                      </div>

                      <div>
                        <p className="font-semibold text-white">
                          {testimonial.name}
                        </p>

                        <p className="mt-1 text-sm text-gray-600">
                          {testimonial.role}
                        </p>
                      </div>

                    </div>

                    <ArrowUpRight
                      size={18}
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
            )
          )}

        </motion.div>

        {/* =================================================
            BOTTOM DEVELOPER LABEL
        ================================================== */}

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
          }}
          className="
            mt-12
            flex
            items-center
            justify-center
            gap-3
            font-mono
            text-xs
            text-gray-700
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