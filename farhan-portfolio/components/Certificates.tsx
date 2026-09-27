"use client";

import {
  Award,
  ExternalLink,
  FileCheck2,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { motion } from "framer-motion";

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

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export default function Certificates() {
  return (
    <section
      id="certificates"
      className="relative border-t border-white/[0.05] py-28 sm:py-36"
    >
      <div className="container-custom">

        {/* =====================================
            SECTION HEADER
        ====================================== */}

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
              06 — Certifications
            </p>
          </div>

          <h2 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Proof of{" "}
            <span className="text-[#39ff88]">
              experience.
            </span>
          </h2>

          <p className="mt-5 max-w-2xl leading-8 text-gray-500">
            Professional certification and practical experience
            gained through software development.
          </p>
        </motion.div>

        {/* =====================================
            MAIN GRID
        ====================================== */}

        <div className="mt-16 grid gap-7 lg:grid-cols-[1.15fr_0.85fr]">

          {/* =====================================
              CERTIFICATE PREVIEW
          ====================================== */}

          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            whileHover={{
              y: -5,
              transition: {
                duration: 0.3,
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
              backdrop-blur-xl
              transition-all
              duration-500
              hover:border-[#39ff88]/30
              hover:bg-[#151518]/75
            "
          >

            {/* CARD GLOW */}

            <div
              className="
                pointer-events-none
                absolute
                -right-32
                -top-32
                h-72
                w-72
                rounded-full
                bg-[#39ff88]/[0.025]
                blur-[90px]
                transition-all
                duration-700
                group-hover:bg-[#39ff88]/[0.08]
              "
            />

            {/* =================================
                CARD HEADER
            ================================== */}

            <div
              className="
                relative
                flex
                items-center
                justify-between
                border-b
                border-white/[0.06]
                p-5
                sm:p-6
              "
            >
              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-[#39ff88]/10
                    bg-[#39ff88]/[0.07]
                    text-[#39ff88]
                  "
                >
                  <Award size={21} />
                </div>

                <div>
                  <p className="font-semibold text-white">
                    Internship Certificate
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Upcode Software Labs L.L.P
                  </p>
                </div>
              </div>

              <span className="hidden font-mono text-[10px] text-gray-700 sm:block">
                certificate.pdf
              </span>
            </div>

            {/* =================================
                PDF PREVIEW
            ================================== */}

            <div className="relative bg-[#080808] p-3 sm:p-5">

              {/* PDF FRAME */}

              <div
                className="
                  relative
                  h-[430px]
                  overflow-hidden
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-white
                  sm:h-[520px]
                  lg:h-[560px]
                "
              >
                <iframe
                  src={`${certificatePath}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                  title="Internship Certificate Preview"
                  className="
                    absolute
                    left-0
                    top-0
                    h-full
                    w-full
                    border-0
                  "
                  loading="lazy"
                />
              </div>

              {/* PDF LABEL */}

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-8
                  left-8
                  rounded-full
                  border
                  border-black/10
                  bg-black/70
                  px-3
                  py-1.5
                  font-mono
                  text-[10px]
                  text-[#39ff88]
                  backdrop-blur-md
                "
              >
                PDF PREVIEW
              </div>
            </div>

            {/* =================================
                ACTION BUTTONS
            ================================== */}

            <div className="relative flex flex-wrap gap-3 p-5 sm:p-6">

              <a
                href={certificatePath}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group/view
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  bg-[#39ff88]
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-black
                  transition-all
                  duration-300
                  hover:scale-[1.03]
                  hover:shadow-[0_0_30px_rgba(57,255,136,0.22)]
                "
              >
                View Certificate

                <ExternalLink
                  size={16}
                  className="
                    transition-transform
                    duration-300
                    group-hover/view:translate-x-0.5
                    group-hover/view:-translate-y-0.5
                  "
                />
              </a>

              <a
                href={certificatePath}
                download
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-white/10
                  bg-black/20
                  px-5
                  py-3
                  text-sm
                  text-gray-300
                  transition-all
                  duration-300
                  hover:border-[#39ff88]/40
                  hover:bg-[#39ff88]/5
                  hover:text-[#39ff88]
                "
              >
                Download

                <FileCheck2 size={16} />
              </a>
            </div>

            {/* BOTTOM LINE */}

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

          {/* =====================================
              CERTIFICATE DETAILS
          ====================================== */}

          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            whileHover={{
              y: -5,
              transition: {
                duration: 0.3,
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
              sm:p-9
            "
          >

            {/* GLOW */}

            <div
              className="
                pointer-events-none
                absolute
                -left-32
                -top-32
                h-72
                w-72
                rounded-full
                bg-[#39ff88]/[0.025]
                blur-[90px]
                transition-all
                duration-700
                group-hover:bg-[#39ff88]/[0.08]
              "
            />

            <div className="relative">

              {/* VERIFIED BADGE */}

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
                  text-xs
                  text-[#39ff88]
                "
              >
                <ShieldCheck size={14} />

                Verified Certificate
              </div>

              {/* TITLE */}

              <h3 className="mt-7 text-3xl font-bold leading-tight text-white">
                Software Developer Intern
              </h3>

              {/* COMPANY */}

              <p className="mt-3 text-gray-400">
                Upcode Software Labs L.L.P
              </p>

              {/* DATE */}

              <div className="mt-6 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#39ff88] shadow-[0_0_8px_rgba(57,255,136,0.8)]" />

                <p className="font-mono text-xs tracking-wider text-[#39ff88]">
                  05/05/2025 — 31/01/2026
                </p>
              </div>

              {/* DIVIDER */}

              <div className="my-8 h-px bg-white/[0.06]" />

              {/* TECHNOLOGIES */}

              <p className="text-sm font-semibold text-gray-300">
                Technologies
              </p>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                className="mt-4 flex flex-wrap gap-2"
              >
                {technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    variants={{
                      hidden: {
                        opacity: 0,
                        scale: 0.8,
                        y: 8,
                      },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: {
                          duration: 0.3,
                          delay: index * 0.035,
                        },
                      },
                    }}
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
                      px-3
                      py-1.5
                      text-xs
                      text-gray-500
                      transition-all
                      duration-300
                      hover:border-[#39ff88]/40
                      hover:bg-[#39ff88]/10
                      hover:text-[#39ff88]
                    "
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>

              {/* DESCRIPTION */}

              <div className="mt-10 border-t border-white/[0.06] pt-7">

                <p className="text-sm leading-7 text-gray-500">
                  The certificate records successful work as a
                  Software Developer Intern and highlights full
                  stack development technologies and professional
                  project work.
                </p>

              </div>

              {/* CERTIFICATE STATUS */}

              <div
                className="
                  mt-8
                  rounded-2xl
                  border
                  border-[#39ff88]/10
                  bg-[#39ff88]/[0.035]
                  p-5
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
                    <FileCheck2 size={17} />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-300">
                      Internship Completed
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-600">
                      Professional internship certificate available
                      for verification.
                    </p>
                  </div>
                </div>
              </div>

              {/* CODE SIGNATURE */}

              <div
                className="
                  mt-8
                  flex
                  items-center
                  justify-between
                  font-mono
                  text-[10px]
                  text-gray-700
                "
              >
                <span>
                  {"<certificate />"}
                </span>

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

            {/* BOTTOM LINE */}

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

        {/* =====================================
            FOOTER SIGNATURE
        ====================================== */}

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
            text-gray-600
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