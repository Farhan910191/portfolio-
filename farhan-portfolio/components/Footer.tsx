"use client";

import { motion, type Variants } from "framer-motion";
import {
  ArrowUp,
  Mail,
  ArrowUpRight,
  Code2,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";

// ======================================================
// NAVIGATION
// ======================================================

const links = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Experience", "#experience"],
  ["Contact", "#contact"],
] as const;

// ======================================================
// ANIMATIONS
// ======================================================

const footerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const linkVariants = {
  hidden: {
    opacity: 0,
    y: 10,
  },

  visible: {
    opacity: 1,
    y: 0,
  },
};

// ======================================================
// COMPONENT
// ======================================================

export default function Footer() {
  return (
    <footer
      className="
        relative
        overflow-hidden
        border-t
        border-white/[0.06]
        py-12
        sm:py-14
      "
    >
      {/* =================================================
          SUBTLE FOOTER GLOW
      ================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-1/2
          h-40
          w-[500px]
          -translate-x-1/2
          rounded-full
          bg-[#39ff88]/[0.025]
          blur-[100px]
        "
      />

      <div className="container-custom">

        <motion.div
          variants={footerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="relative"
        >

          {/* =================================================
              MAIN FOOTER
          ================================================== */}

          <div
            className="
              grid
              gap-10
              lg:grid-cols-[1.2fr_1fr_auto]
              lg:items-center
            "
          >

            {/* =================================================
                BRAND
            ================================================== */}

            <div>

              <motion.a
                href="#home"
                aria-label="Go to homepage"
                whileHover={{
                  scale: 1.03,
                }}
                className="
                  inline-flex
                  items-center
                  gap-2
                  text-2xl
                  font-black
                  tracking-tight
                  text-white
                "
              >
                FK
                <span className="text-[#39ff88]">
                  .
                </span>
              </motion.a>

              <p className="mt-3 text-sm text-gray-600">
                Mohammed Farhan KK · Full Stack Developer
              </p>

              <div
                className="
                  mt-4
                  flex
                  items-center
                  gap-2
                  font-mono
                  text-[11px]
                  text-gray-700
                "
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#39ff88]" />

                <span>
                  Available for opportunities
                </span>
              </div>

            </div>

            {/* =================================================
                NAVIGATION
            ================================================== */}

            <motion.nav
              aria-label="Footer navigation"
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
              }}
              transition={{
                staggerChildren: 0.06,
              }}
            >

              <p
                className="
                  mb-4
                  font-mono
                  text-[10px]
                  uppercase
                  tracking-[0.25em]
                  text-gray-700
                "
              >
                Navigation
              </p>

              <div className="flex flex-wrap gap-x-6 gap-y-3">

                {links.map(
                  ([name, href]) => (
                    <motion.a
                      key={name}
                      variants={linkVariants}
                      href={href}
                      className="
                        group
                        inline-flex
                        items-center
                        gap-1
                        text-sm
                        text-gray-500
                        transition-colors
                        duration-300
                        hover:text-[#39ff88]
                      "
                    >
                      {name}

                      <ArrowUpRight
                        size={12}
                        className="
                          opacity-0
                          transition-all
                          duration-300
                          group-hover:-translate-y-0.5
                          group-hover:translate-x-0.5
                          group-hover:opacity-100
                        "
                      />
                    </motion.a>
                  )
                )}

              </div>

            </motion.nav>

            {/* =================================================
                SOCIAL LINKS
            ================================================== */}

            <div>

              <p
                className="
                  mb-4
                  font-mono
                  text-[10px]
                  uppercase
                  tracking-[0.25em]
                  text-gray-700
                "
              >
                Connect
              </p>

              <div className="flex items-center gap-2">

                {/* GitHub */}

                <motion.a
                  href="https://github.com/Farhan910191"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  whileHover={{
                    y: -4,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/[0.08]
                    bg-white/[0.02]
                    text-gray-500
                    transition-all
                    duration-300
                    hover:border-[#39ff88]/30
                    hover:bg-[#39ff88]/5
                    hover:text-[#39ff88]
                  "
                >
                  <FaGithub
                    size={18}
                    aria-hidden="true"
                  />
                </motion.a>

                {/* LinkedIn */}

                <motion.a
                  href="https://www.linkedin.com/in/farhan-kk-66b598371/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  whileHover={{
                    y: -4,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/[0.08]
                    bg-white/[0.02]
                    text-gray-500
                    transition-all
                    duration-300
                    hover:border-[#39ff88]/30
                    hover:bg-[#39ff88]/5
                    hover:text-[#39ff88]
                  "
                >
                  <FaLinkedinIn
                    size={17}
                    aria-hidden="true"
                  />
                </motion.a>

                {/* Email */}

                <motion.a
                  href="mailto:farhanmohammedfarhan7@gmail.com"
                  aria-label="Email"
                  whileHover={{
                    y: -4,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/[0.08]
                    bg-white/[0.02]
                    text-gray-500
                    transition-all
                    duration-300
                    hover:border-[#39ff88]/30
                    hover:bg-[#39ff88]/5
                    hover:text-[#39ff88]
                  "
                >
                  <Mail
                    size={18}
                    aria-hidden="true"
                  />
                </motion.a>

                {/* Back To Top */}

                <motion.a
                  href="#home"
                  aria-label="Back to top"
                  whileHover={{
                    y: -4,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  className="
                    ml-1
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-[#39ff88]/20
                    bg-[#39ff88]/5
                    text-[#39ff88]
                    transition-all
                    duration-300
                    hover:bg-[#39ff88]
                    hover:text-black
                  "
                >
                  <ArrowUp
                    size={18}
                    aria-hidden="true"
                  />
                </motion.a>

              </div>

            </div>

          </div>

          {/* =================================================
              DIVIDER
          ================================================== */}

          <div
            className="
              mt-10
              h-px
              bg-gradient-to-r
              from-transparent
              via-white/[0.08]
              to-transparent
            "
          />

          {/* =================================================
              BOTTOM FOOTER
          ================================================== */}

          <div
            className="
              flex
              flex-col
              justify-between
              gap-4
              pt-6
              text-xs
              text-gray-700
              sm:flex-row
              sm:items-center
            "
          >

            <p>
              © 2026 Mohammed Farhan KK.
              All rights reserved.
            </p>

            <div
              className="
                flex
                items-center
                gap-2
                font-mono
              "
            >
              <Code2
                size={13}
                className="text-[#39ff88]/60"
              />

              <span>
                Built with Next.js · React · TypeScript · Tailwind CSS
              </span>
            </div>

          </div>

          {/* =================================================
              DEVELOPER SIGNATURE
          ================================================== */}

          <div
            className="
              mt-8
              flex
              items-center
              justify-center
              gap-3
              font-mono
              text-[10px]
              text-gray-800
            "
          >
            <span className="text-[#39ff88]/40">
              {"<footer />"}
            </span>

            <span>
              Designed • Developed • Deployed
            </span>

            <span className="text-[#39ff88]/40">
              {"</>"}
            </span>
          </div>

        </motion.div>

      </div>
    </footer>
  );
}