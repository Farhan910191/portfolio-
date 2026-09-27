"use client";

import {
  Award,
  ExternalLink,
  FileCheck2,
  ShieldCheck,
  ArrowUpRight,
  Code2,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";

const technologies = [
  "HTML",
  "CSS",
  "Bootstrap",
  "JavaScript",
  "Git",
  "ReactJS",
  "Redux",
  "Next.js",
  "TypeScript",
  "Python",
  "Django",
  "Flask",
];

const certificatePath =
  "/certificates/internship-certificate.pdf";

/* =========================================
   ANIMATIONS
========================================= */

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

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.045,
    },
  },
};

const techVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
    scale: 0.92,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
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

export default function Certificates() {
  return (
    <section
      id="certificates"
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
            HEADER
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
              06 — Certifications
            </p>
          </div>

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
            Proof of{" "}
            <span className="text-[#39ff88]">
              experience.
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
            Professional certification and practical experience
            gained through software development.
          </p>
        </motion.div>

        {/* =========================================
            MAIN CONTENT
        ========================================== */}

        <div
          className="
            mt-10
            grid
            min-w-0
            grid-cols-1
            gap-5
            sm:mt-12
            lg:grid-cols-[1.05fr_0.95fr]
            lg:gap-6
            xl:grid-cols-[1.1fr_0.9fr]
          "
        >
          {/* =======================================
              CERTIFICATE PREVIEW
          ======================================== */}

          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: false,
              amount: 0.12,
            }}
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
              bg-[#111113]/75
              backdrop-blur-xl
              transition-all
              duration-500
              hover:border-[#39ff88]/30
              hover:bg-[#151518]/85
              sm:rounded-3xl
            "
          >
            {/* Glow */}

            <div
              className="
                pointer-events-none
                absolute
                -right-28
                -top-28
                h-64
                w-64
                rounded-full
                bg-[#39ff88]/[0.025]
                blur-[85px]
                transition-all
                duration-700
                group-hover:bg-[#39ff88]/[0.08]
              "
            />

            {/* Top shine */}

            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-0
                z-10
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
                PREVIEW HEADER
            ====================================== */}

            <div
              className="
                relative
                flex
                min-w-0
                items-center
                justify-between
                gap-3
                border-b
                border-white/[0.06]
                p-4
                sm:p-5
                lg:p-6
              "
            >
              <div className="flex min-w-0 items-center gap-3">
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
                    sm:h-11
                    sm:w-11
                  "
                >
                  <Award size={20} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white sm:text-base">
                    Internship Certificate
                  </p>

                  <p className="mt-0.5 truncate text-[10px] text-gray-500 sm:mt-1 sm:text-xs">
                    Upcode Software Labs L.L.P
                  </p>
                </div>
              </div>

              <span className="hidden shrink-0 font-mono text-[10px] text-gray-700 sm:block">
                certificate.pdf
              </span>
            </div>

            {/* =====================================
                PDF PREVIEW
            ====================================== */}

            <div className="relative bg-[#080808] p-3 sm:p-4 lg:p-5">
              <div
                className="
                  relative
                  h-[350px]
                  overflow-hidden
                  rounded-xl
                  border
                  border-white/[0.08]
                  bg-white
                  sm:h-[440px]
                  sm:rounded-2xl
                  md:h-[500px]
                  lg:h-[520px]
                  xl:h-[540px]
                "
              >
                <iframe
                  src={`${certificatePath}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                  title="Internship Certificate Preview"
                  className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    border-0
                  "
                  loading="lazy"
                />
              </div>

              {/* Preview badge */}

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-6
                  left-6
                  rounded-full
                  border
                  border-white/10
                  bg-black/75
                  px-3
                  py-1.5
                  font-mono
                  text-[9px]
                  text-[#39ff88]
                  backdrop-blur-md
                  sm:bottom-7
                  sm:left-7
                "
              >
                PDF PREVIEW
              </div>
            </div>

            {/* =====================================
                ACTIONS
            ====================================== */}

            <div
              className="
                relative
                grid
                grid-cols-1
                gap-2.5
                p-4
                sm:flex
                sm:flex-wrap
                sm:p-5
                lg:p-6
              "
            >
              <a
                href={certificatePath}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group/view
                  inline-flex
                  min-h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#39ff88]
                  px-5
                  py-2.5
                  text-sm
                  font-semibold
                  text-black
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  hover:shadow-[0_0_30px_rgba(57,255,136,0.2)]
                  sm:rounded-full
                "
              >
                View Certificate

                <ExternalLink
                  size={15}
                  className="
                    transition-transform
                    duration-300
                    group-hover/view:-translate-y-0.5
                    group-hover/view:translate-x-0.5
                  "
                />
              </a>

              <a
                href={certificatePath}
                download
                className="
                  inline-flex
                  min-h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-white/10
                  bg-black/20
                  px-5
                  py-2.5
                  text-sm
                  text-gray-300
                  transition-all
                  duration-300
                  hover:border-[#39ff88]/40
                  hover:bg-[#39ff88]/5
                  hover:text-[#39ff88]
                  sm:rounded-full
                "
              >
                Download
                <FileCheck2 size={15} />
              </a>
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
                shadow-[0_0_18px_rgba(57,255,136,0.7)]
                transition-all
                duration-700
                group-hover:w-full
              "
            />
          </motion.div>

          {/* =======================================
              CERTIFICATE DETAILS
          ======================================== */}

          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: false,
              amount: 0.12,
            }}
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
              xl:p-8
            "
          >
            {/* Glow */}

            <div
              className="
                pointer-events-none
                absolute
                -left-28
                -top-28
                h-64
                w-64
                rounded-full
                bg-[#39ff88]/[0.025]
                blur-[85px]
                transition-all
                duration-700
                group-hover:bg-[#39ff88]/[0.08]
              "
            />

            {/* Top shine */}

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

            <div className="relative min-w-0">
              {/* ===================================
                  VERIFIED BADGE
              ==================================== */}

              <div
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-[#39ff88]/20
                  bg-[#39ff88]/5
                  px-3
                  py-1.5
                  text-[10px]
                  text-[#39ff88]
                  sm:text-xs
                "
              >
                <ShieldCheck size={13} />

                Verified Certificate
              </div>

              {/* ===================================
                  TITLE
              ==================================== */}

              <h3
                className="
                  mt-5
                  max-w-xl
                  text-2xl
                  font-bold
                  leading-tight
                  text-white
                  sm:mt-6
                  sm:text-3xl
                "
              >
                Software Developer Intern
              </h3>

              {/* Company */}

              <p className="mt-2 text-sm text-gray-400 sm:text-base">
                Upcode Software Labs L.L.P
              </p>

              {/* Date */}

              <div className="mt-5 flex items-center gap-2">
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

                <p className="font-mono text-[10px] tracking-wider text-[#39ff88] sm:text-xs">
                  05/05/2025 — 31/01/2026
                </p>
              </div>

              {/* Divider */}

              <div className="my-6 h-px bg-white/[0.06] sm:my-7" />

              {/* ===================================
                  TECHNOLOGIES
              ==================================== */}

              <div className="flex items-center gap-2">
                <Code2
                  size={15}
                  className="text-[#39ff88]/60"
                />

                <p className="text-sm font-semibold text-gray-300">
                  Technologies
                </p>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: false,
                  amount: 0.2,
                }}
                className="mt-4 flex flex-wrap gap-1.5 sm:gap-2"
              >
                {technologies.map((tech) => (
                  <motion.span
                    key={tech}
                    variants={techVariants}
                    whileHover={{
                      y: -3,
                      scale: 1.04,
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
                      hover:border-[#39ff88]/40
                      hover:bg-[#39ff88]/10
                      hover:text-[#39ff88]
                      sm:px-3
                      sm:text-xs
                    "
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>

              {/* ===================================
                  DESCRIPTION
              ==================================== */}

              <div className="mt-7 border-t border-white/[0.06] pt-6 sm:mt-8 sm:pt-7">
                <p className="text-sm leading-6 text-gray-500 sm:leading-7">
                  The certificate records successful work as a
                  Software Developer Intern and highlights full
                  stack development technologies and professional
                  project work.
                </p>
              </div>

              {/* ===================================
                  STATUS
              ==================================== */}

              <div
                className="
                  mt-6
                  rounded-xl
                  border
                  border-[#39ff88]/10
                  bg-[#39ff88]/[0.035]
                  p-4
                  sm:mt-7
                  sm:rounded-2xl
                  sm:p-5
                "
              >
                <div className="flex items-start gap-3">
                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#39ff88]/10
                      text-[#39ff88]
                    "
                  >
                    <FileCheck2 size={16} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-300">
                      Internship Completed
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-600">
                      Professional internship certificate
                      available for verification.
                    </p>
                  </div>
                </div>
              </div>

              {/* ===================================
                  SIGNATURE
              ==================================== */}

              <div
                className="
                  mt-7
                  flex
                  items-center
                  justify-between
                  font-mono
                  text-[9px]
                  text-gray-700
                  sm:mt-8
                  sm:text-[10px]
                "
              >
                <span>{"<certificate />"}</span>

                <ArrowUpRight
                  size={14}
                  className="
                    text-[#39ff88]/40
                    transition-all
                    duration-300
                    group-hover:-translate-y-1
                    group-hover:translate-x-1
                    group-hover:text-[#39ff88]
                  "
                />
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
                shadow-[0_0_18px_rgba(57,255,136,0.7)]
                transition-all
                duration-700
                group-hover:w-full
              "
            />
          </motion.div>
        </div>

        {/* =========================================
            FOOTER
        ========================================== */}

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
            text-gray-600
            sm:mt-10
            sm:gap-3
            sm:text-xs
          "
        >
          <span className="text-[#39ff88]/50">
            {"<verified />"}
          </span>

          <span>
            Learn • Build • Prove
          </span>

          <span className="text-[#39ff88]/50">
            {"</>"}
          </span>
        </motion.div>
      </div>
    </section>
  );
}