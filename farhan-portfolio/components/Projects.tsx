"use client";

import {
  ArrowUpRight,
  ExternalLink,
  Code2,
  Check,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { motion, type Variants } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

// ======================================================
// PROJECT DATA
// ======================================================

const projects = [
  {
    number: "01",
    title: "CRM",
    subtitle: "Customer Relationship Management",
    description:
      "A full-stack CRM system developed as a team project for managing leads, deals, activities and business workflows.",
    image: "/projects/crm.png",
    technologies: [
      "React",
      "Vite",
      "Material UI",
      "Django",
      "DRF",
      "PostgreSQL",
      "JWT",
    ],
    features: [
      "Lead tracking",
      "Deal management",
      "Activity logs",
      "Global search",
      "PDF export",
      "RBAC",
    ],
    github: "https://github.com/Farhan910191/CRM.git",
    live: "#",
  },
  {
    number: "02",
    title: "PrimBuy",
    subtitle: "Full-Stack E-Commerce",
    description:
      "A complete e-commerce application with authentication, products, shopping cart, protected routes and order history.",
    image: "/projects/primbuy.png",
    technologies: [
      "React",
      "Redux Toolkit",
      "Django",
      "DRF",
      "PostgreSQL",
      "Vite",
      "Axios",
      "JWT",
    ],
    features: [
      "Authentication",
      "Product management",
      "Shopping cart",
      "Protected routes",
      "Cart CRUD",
      "Order history",
    ],
    github: "https://github.com/Farhan910191/primbuy.git",
    live: "#",
  },
  {
    number: "04",
    title: "Expense Management System",
    subtitle: "Personal Finance & Expense Tracker",
    description:
      "A full-stack personal finance application for managing income and expenses, organizing transactions by category, and understanding spending habits through a responsive dashboard. Built with React and Django REST Framework.",
    image: "/projects/expense.png",
    technologies: [
      "React",
      "JavaScript",
      "Django",
      "Django REST Framework",
      "REST API",
      "PostgreSQL",
      "Axios",
      "JWT Authentication",
    ],
    features: [
      "Secure user authentication",
      "Create, view, update, and delete transactions",
      "Track income and expenses separately",
      "Categorize and review transactions",
      "Monthly spending and budget overview",
      "Dashboard summaries and spending insights",
      "Transaction history and filtering",
      "Protected routes and REST API integration",
      "Responsive interface for desktop and mobile",
    ],
    github: "https://github.com/Farhan910191/exp.git",
    live: "#",
  },
];

// ======================================================
// 60 FPS HARDWARE-ACCELERATED ANIMATIONS
// ======================================================

const headerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
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

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const badgeVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.25,
    },
  },
};

// ======================================================
// PROJECT CARD (MINIMAL TRANSPARENT CARD)
// ======================================================

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const { isDark } = useTheme();

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      className={`
        group
        relative
        flex
        min-w-0
        w-full
        flex-col
        overflow-hidden
        rounded-2xl
        border
        backdrop-blur-xl
        transition-all
        duration-400
        hover:-translate-y-1.5
        sm:rounded-3xl
        ${
          isDark
            ? "border-white/[0.08] bg-[#121216]/40 hover:border-[#39ff88]/30 hover:bg-[#15151c]/60 shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
            : "border-black/[0.07] bg-white/65 hover:border-[#10b981]/35 hover:bg-white/85 shadow-[0_12px_35px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_45px_rgba(16,185,129,0.08)]"
        }
      `}
      style={{
        transform: "translateZ(0)",
        willChange: "transform",
      }}
    >
      {/* ==================================================
          CARD BACKGROUND AMBIENT GLOW
      =================================================== */}
      <div
        aria-hidden="true"
        className={`
          pointer-events-none
          absolute
          -right-20
          -top-20
          z-0
          h-48
          w-48
          rounded-full
          blur-[50px]
          transition-all
          duration-700
          ${
            isDark
              ? "bg-[#39ff88]/[0.03] group-hover:bg-[#39ff88]/[0.08]"
              : "bg-[#10b981]/[0.03] group-hover:bg-[#10b981]/[0.07]"
          }
        `}
      />

      {/* ==================================================
          IMAGE WRAPPER
      =================================================== */}
      <div
        className={`
          relative
          z-10
          w-full
          min-w-0
          overflow-hidden
          border-b
          ${
            isDark
              ? "border-white/[0.07] bg-[#0a0a0d]"
              : "border-black/[0.06] bg-slate-100/80"
          }
        `}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-video">
          <motion.img
            src={project.image}
            alt={`${project.title} project preview`}
            loading="lazy"
            whileHover={{ scale: 1.03 }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          {/* Dark / Light gradient overlay */}
          <div
            aria-hidden="true"
            className={`
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              ${
                isDark
                  ? "from-black/70 via-black/15 to-transparent"
                  : "from-white/70 via-white/10 to-transparent"
              }
            `}
          />

          {/* Hover accent glow */}
          <div
            aria-hidden="true"
            className={`
              pointer-events-none
              absolute
              inset-0
              opacity-0
              transition-opacity
              duration-500
              group-hover:opacity-100
              ${
                isDark
                  ? "bg-[radial-gradient(circle_at_center,rgba(57,255,136,0.12),transparent_65%)]"
                  : "bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12),transparent_65%)]"
              }
            `}
          />

          {/* Project number pill */}
          <div
            className={`
              absolute
              left-3
              top-3
              flex
              items-center
              gap-2
              rounded-full
              border
              px-3
              py-1.5
              font-mono
              text-[10px]
              font-medium
              backdrop-blur-md
              sm:left-5
              sm:top-5
              sm:px-3.5
              sm:py-2
              sm:text-xs
              ${
                isDark
                  ? "border-[#39ff88]/20 bg-black/60 text-[#39ff88]"
                  : "border-[#10b981]/25 bg-white/80 text-[#10b981] shadow-sm"
              }
            `}
          >
            <span
              className={`
                h-1.5
                w-1.5
                shrink-0
                rounded-full
                ${
                  isDark
                    ? "bg-[#39ff88] shadow-[0_0_8px_rgba(57,255,136,0.9)]"
                    : "bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.7)]"
                }
              `}
            />
            {project.number}
          </div>

          {/* Preview label */}
          <div
            className={`
              absolute
              bottom-3
              left-3
              hidden
              rounded-lg
              border
              px-2.5
              py-1.5
              font-mono
              text-[8px]
              backdrop-blur-md
              xs:block
              sm:bottom-5
              sm:left-5
              sm:px-3
              sm:text-[9px]
              ${
                isDark
                  ? "border-white/10 bg-black/50 text-white/50"
                  : "border-black/10 bg-white/70 text-slate-600"
              }
            `}
          >
            {"<project.preview />"}
          </div>

          {/* Top-right icon */}
          <div
            className={`
              absolute
              right-3
              top-3
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              border
              backdrop-blur-md
              transition-all
              duration-300
              sm:right-5
              sm:top-5
              sm:h-9
              sm:w-9
              sm:rounded-xl
              ${
                isDark
                  ? "border-white/10 bg-black/50 text-white/60 group-hover:border-[#39ff88]/30 group-hover:text-[#39ff88]"
                  : "border-black/10 bg-white/70 text-slate-700 group-hover:border-[#10b981]/30 group-hover:text-[#10b981]"
              }
            `}
          >
            <ArrowUpRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </div>
      </div>

      {/* ==================================================
          CONTENT
      =================================================== */}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col p-4 sm:p-6 lg:p-7">
        {/* Title */}
        <div className="min-w-0">
          <p
            className={`
              break-words
              font-mono
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.16em]
              sm:text-[10px]
              sm:tracking-[0.2em]
              ${isDark ? "text-[#39ff88]" : "text-[#10b981]"}
            `}
          >
            {project.subtitle}
          </p>

          <div className="mt-2.5 flex min-w-0 items-start justify-between gap-3 sm:mt-3">
            <h3
              className={`
                min-w-0
                break-words
                text-xl
                font-bold
                leading-tight
                tracking-tight
                sm:text-2xl
                lg:text-[26px]
                ${isDark ? "text-white" : "text-slate-900"}
              `}
            >
              {project.title}
            </h3>

            <span
              className={`
                shrink-0
                pt-1
                font-mono
                text-[9px]
                sm:text-[10px]
                ${isDark ? "text-white/30" : "text-slate-400"}
              `}
            >
              {project.number}
            </span>
          </div>

          <p
            className={`
              mt-3
              break-words
              text-xs
              leading-6
              sm:mt-4
              sm:text-sm
              sm:leading-7
              ${isDark ? "text-gray-400" : "text-slate-600"}
            `}
          >
            {project.description}
          </p>
        </div>

        {/* Technologies */}
        <div className="mt-5 sm:mt-6">
          <p
            className={`
              mb-2.5
              font-mono
              text-[8px]
              uppercase
              tracking-[0.2em]
              sm:mb-3
              sm:text-[9px]
              ${isDark ? "text-white/35" : "text-slate-400"}
            `}
          >
            Technology
          </p>

          <div className="flex min-w-0 flex-wrap gap-1.5 sm:gap-2">
            {project.technologies.map((technology) => (
              <span
                key={technology}
                className={`
                  max-w-full
                  break-words
                  rounded-full
                  border
                  px-2.5
                  py-1
                  text-[9px]
                  leading-4
                  transition-all
                  duration-300
                  sm:px-3
                  sm:py-1.5
                  sm:text-[11px]
                  ${
                    isDark
                      ? "border-white/[0.08] bg-white/[0.03] text-gray-300 hover:border-[#39ff88]/30 hover:bg-[#39ff88]/10 hover:text-[#39ff88]"
                      : "border-black/[0.07] bg-black/[0.03] text-slate-700 hover:border-[#10b981]/30 hover:bg-[#10b981]/10 hover:text-[#10b981]"
                  }
                `}
              >
                {technology}
              </span>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="mt-5 sm:mt-6">
          <p
            className={`
              mb-2.5
              font-mono
              text-[8px]
              uppercase
              tracking-[0.2em]
              sm:mb-3
              sm:text-[9px]
              ${isDark ? "text-white/35" : "text-slate-400"}
            `}
          >
            Key Features
          </p>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5">
            {project.features.map((feature) => (
              <div
                key={feature}
                className={`
                  flex
                  min-w-0
                  items-start
                  gap-2
                  text-[11px]
                  leading-5
                  sm:text-xs
                  ${isDark ? "text-gray-400" : "text-slate-600"}
                `}
              >
                <span
                  className={`
                    mt-0.5
                    flex
                    h-4
                    w-4
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    ${
                      isDark
                        ? "bg-[#39ff88]/10 text-[#39ff88]"
                        : "bg-[#10b981]/10 text-[#10b981]"
                    }
                  `}
                >
                  <Check size={9} />
                </span>

                <span className="min-w-0 break-words">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Buttons */}
        <div
          className={`
            mt-7
            flex
            w-full
            flex-col
            gap-2.5
            border-t
            pt-5
            xs:flex-row
            sm:mt-8
            sm:pt-6
            ${isDark ? "border-white/[0.07]" : "border-black/[0.06]"}
          `}
        >
          {/* GitHub button */}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} on GitHub`}
            className={`
              group/github
              inline-flex
              min-h-10
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              px-4
              py-2.5
              text-xs
              font-medium
              transition-all
              duration-300
              xs:w-auto
              sm:min-h-11
              ${
                isDark
                  ? "border-white/10 bg-white/[0.03] text-white/80 hover:border-[#39ff88]/30 hover:bg-[#39ff88]/[0.08] hover:text-[#39ff88]"
                  : "border-black/10 bg-black/[0.03] text-slate-700 hover:border-[#10b981]/30 hover:bg-[#10b981]/[0.08] hover:text-[#10b981]"
              }
            `}
          >
            <FaGithub size={15} />
            GitHub
            <ArrowUpRight
              size={13}
              className="transition-transform duration-300 group-hover/github:translate-x-0.5 group-hover/github:-translate-y-0.5"
            />
          </a>

          {/* Live Demo */}
          {project.live !== "#" && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo of ${project.title}`}
              className={`
                group/demo
                inline-flex
                min-h-10
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                px-4
                py-2.5
                text-xs
                font-semibold
                transition-all
                duration-300
                hover:-translate-y-0.5
                xs:w-auto
                sm:min-h-11
                ${
                  isDark
                    ? "bg-[#39ff88] text-black hover:shadow-[0_0_25px_rgba(57,255,136,0.3)]"
                    : "bg-[#10b981] text-white hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]"
                }
              `}
            >
              Live Demo
              <ExternalLink
                size={14}
                className="transition-transform duration-300 group-hover/demo:translate-x-0.5 group-hover/demo:-translate-y-0.5"
              />
            </a>
          )}
        </div>

        {/* Footer info */}
        <div
          className={`
            mt-4
            flex
            items-center
            gap-2
            font-mono
            text-[8px]
            sm:mt-5
            sm:text-[9px]
            ${isDark ? "text-white/25" : "text-slate-400"}
          `}
        >
          <Code2
            size={11}
            className={`shrink-0 ${isDark ? "text-[#39ff88]/50" : "text-[#10b981]/60"}`}
          />
          <span>build → test → deploy</span>
        </div>
      </div>

      {/* ==================================================
          BOTTOM ACCENT LINE
      =================================================== */}
      <div
        className={`
          absolute
          bottom-0
          left-0
          h-[2px]
          w-0
          transition-all
          duration-500
          group-hover:w-full
          ${
            isDark
              ? "bg-[#39ff88] shadow-[0_0_15px_rgba(57,255,136,0.8)]"
              : "bg-[#10b981] shadow-[0_0_15px_rgba(16,185,129,0.6)]"
          }
        `}
      />
    </motion.article>
  );
}

// ======================================================
// MAIN PROJECT SECTION
// ======================================================

export default function Projects() {
  const { isDark } = useTheme();

  return (
    <section
      id="projects"
      className={`
        relative
        w-full
        min-w-0
        overflow-hidden
        border-t
        py-20
        sm:py-24
        md:py-28
        lg:py-32
        xl:py-36
        ${isDark ? "border-white/[0.05]" : "border-black/[0.05]"}
      `}
    >
      <div className="mx-auto w-full max-w-7xl min-w-0 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* ==================================================
            HEADER
        =================================================== */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.15,
          }}
          className="min-w-0"
        >
          {/* Section number */}
          <div className="flex items-center gap-3">
            <span
              className={`h-px w-6 shrink-0 sm:w-8 ${
                isDark ? "bg-[#39ff88]" : "bg-[#10b981]"
              }`}
            />
            <p
              className={`
                font-mono
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.2em]
                sm:text-xs
                sm:tracking-[0.25em]
                md:text-sm
                ${isDark ? "text-[#39ff88]" : "text-[#10b981]"}
              `}
            >
              03 — Featured Work
            </p>
          </div>

          {/* Heading */}
          <div
            className="
              mt-5
              flex
              min-w-0
              flex-col
              gap-5
              sm:mt-6
              sm:gap-6
              lg:mt-7
              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >
            <h2
              className={`
                min-w-0
                max-w-3xl
                break-words
                text-3xl
                font-bold
                leading-[1.08]
                tracking-[-0.03em]
                sm:text-4xl
                md:text-5xl
                lg:text-6xl
                ${isDark ? "text-white" : "text-slate-900"}
              `}
            >
              Projects built with{" "}
              <span className={isDark ? "text-[#39ff88]" : "text-[#10b981]"}>
                purpose.
              </span>
            </h2>

            <p
              className={`
                w-full
                max-w-md
                text-xs
                leading-6
                sm:text-sm
                sm:leading-7
                lg:shrink-0
                ${isDark ? "text-gray-400" : "text-slate-600"}
              `}
            >
              A selection of full-stack applications, development projects and
              real-world problem-solving work.
            </p>
          </div>
        </motion.div>

        {/* ==================================================
            PROJECT GRID (MINIMAL TRANSPARENT CARDS)
        =================================================== */}
        <div
          className="
            mt-10
            grid
            w-full
            min-w-0
            grid-cols-1
            gap-5
            sm:mt-12
            sm:gap-6
            md:mt-14
            md:grid-cols-2
            md:gap-7
            lg:gap-8
            xl:mt-16
            xl:grid-cols-3
          "
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* ==================================================
            CTA
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
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.5,
          }}
          className="
            mt-10
            flex
            w-full
            justify-center
            sm:mt-12
            md:mt-14
          "
        >
          <a
            href="#contact"
            className={`
              group
              inline-flex
              min-h-10
              max-w-full
              items-center
              justify-center
              gap-2
              rounded-full
              border
              px-4
              py-2.5
              text-center
              text-xs
              backdrop-blur-md
              transition-all
              duration-300
              sm:px-5
              sm:py-3
              sm:text-sm
              ${
                isDark
                  ? "border-white/[0.08] bg-[#121216]/50 text-gray-300 hover:border-[#39ff88]/30 hover:bg-[#39ff88]/[0.08] hover:text-[#39ff88]"
                  : "border-black/[0.08] bg-white/70 text-slate-700 hover:border-[#10b981]/30 hover:bg-[#10b981]/[0.08] hover:text-[#10b981]"
              }
            `}
          >
            <span className="break-words">Have a project in mind?</span>
            <ArrowUpRight
              size={16}
              className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}