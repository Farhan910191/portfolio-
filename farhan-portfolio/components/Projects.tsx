"use client";

import {
  ArrowUpRight,
  ExternalLink,
  Code2,
  Check,
} from "lucide-react";

import { FaGithub } from "react-icons/fa";

import { motion } from "framer-motion";

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
    number: "03",
    title: "Expense Management",
    subtitle: "Personal Expense Tracker",
    description:
      "A full-stack expense management application that helps users track, manage, and monitor income and expenses through a clean responsive interface.",

    image: "/projects/expense.png",

    technologies: [
      "React",
      "JavaScript",
      "HTML",
      "CSS",
      "Django",
      "REST API",
      "SQLite",
    ],

    features: [
      "Add and manage expenses",
      "Track income and spending",
      "Expense categorization",
      "REST API integration",
      "Responsive dashboard",
      "Clean user interface",
    ],

    github: "https://github.com/Farhan910191/exp.git",

    live: "#",
  },
];

// ======================================================
// ANIMATIONS
// ======================================================

const headerVariants = {
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

const badgeVariants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
  },

  visible: {
    opacity: 1,
    scale: 1,

    transition: {
      duration: 0.3,
    },
  },
};

// ======================================================
// PROJECT CARD
// ======================================================

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <motion.article
      variants={cardVariants}
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
        w-full
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.08]
        bg-[#0d0d0f]/80
        shadow-[0_20px_60px_rgba(0,0,0,0.3)]
        backdrop-blur-2xl
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-[#39ff88]/30
        hover:shadow-[0_25px_70px_rgba(0,0,0,0.45)]
        sm:rounded-3xl
      "
    >
      {/* ==================================================
          CARD BACKGROUND GLOW
      =================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          z-0
          h-56
          w-56
          rounded-full
          bg-[#39ff88]/[0.025]
          blur-[90px]
          transition-all
          duration-700
          group-hover:bg-[#39ff88]/[0.07]
          sm:-right-32
          sm:-top-32
          sm:h-72
          sm:w-72
        "
      />

      {/* ==================================================
          IMAGE
      =================================================== */}

      <div
        className="
          relative
          z-10
          w-full
          min-w-0
          overflow-hidden
          border-b
          border-white/[0.07]
          bg-[#080808]
        "
      >
        <div
          className="
            relative
            aspect-[16/10]
            w-full
            overflow-hidden
            bg-[#080808]
            sm:aspect-video
          "
        >
          <motion.img
            src={project.image}
            alt={`${project.title} project preview`}
            loading="lazy"
            whileHover={{
              scale: 1.04,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              object-center
            "
          />

          {/* Dark image overlay */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-black/75
              via-black/10
              to-transparent
            "
          />

          {/* Green image glow */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[radial-gradient(circle_at_center,rgba(57,255,136,0.15),transparent_60%)]
              opacity-0
              transition-opacity
              duration-700
              group-hover:opacity-100
            "
          />

          {/* Project number */}

          <div
            className="
              absolute
              left-3
              top-3
              flex
              items-center
              gap-2
              rounded-full
              border
              border-[#39ff88]/20
              bg-black/65
              px-3
              py-1.5
              font-mono
              text-[10px]
              font-medium
              text-[#39ff88]
              backdrop-blur-xl
              sm:left-5
              sm:top-5
              sm:px-3.5
              sm:py-2
              sm:text-xs
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                shrink-0
                rounded-full
                bg-[#39ff88]
                shadow-[0_0_10px_rgba(57,255,136,0.9)]
              "
            />

            {project.number}
          </div>

          {/* Preview label */}

          <div
            className="
              absolute
              bottom-3
              left-3
              hidden
              rounded-lg
              border
              border-white/10
              bg-black/50
              px-2.5
              py-1.5
              font-mono
              text-[8px]
              text-white/45
              backdrop-blur-md
              xs:block
              sm:bottom-5
              sm:left-5
              sm:px-3
              sm:text-[9px]
            "
          >
            {"<project.preview />"}
          </div>

          {/* Top-right icon */}

          <div
            className="
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
              border-white/10
              bg-black/50
              text-white/60
              backdrop-blur-md
              transition-all
              duration-300
              group-hover:border-[#39ff88]/30
              group-hover:text-[#39ff88]
              sm:right-5
              sm:top-5
              sm:h-9
              sm:w-9
              sm:rounded-xl
            "
          >
            <ArrowUpRight
              size={15}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-0.5
                group-hover:-translate-y-0.5
              "
            />
          </div>
        </div>
      </div>

      {/* ==================================================
          CONTENT
      =================================================== */}

      <div
        className="
          relative
          z-10
          flex
          min-w-0
          flex-1
          flex-col
          p-4
          sm:p-6
          lg:p-7
        "
      >
        {/* ==================================================
            TITLE
        =================================================== */}

        <div className="min-w-0">
          <p
            className="
              break-words
              font-mono
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.16em]
              text-[#39ff88]
              sm:text-[10px]
              sm:tracking-[0.2em]
            "
          >
            {project.subtitle}
          </p>

          <div className="mt-2.5 flex min-w-0 items-start justify-between gap-3 sm:mt-3">
            <h3
              className="
                min-w-0
                break-words
                text-xl
                font-bold
                leading-tight
                tracking-tight
                text-white
                sm:text-2xl
                lg:text-[26px]
              "
            >
              {project.title}
            </h3>

            <span
              className="
                shrink-0
                pt-1
                font-mono
                text-[9px]
                text-white/20
                sm:text-[10px]
              "
            >
              0{index + 1}
            </span>
          </div>

          <p
            className="
              mt-3
              break-words
              text-xs
              leading-6
              text-gray-500
              sm:mt-4
              sm:text-sm
              sm:leading-7
            "
          >
            {project.description}
          </p>
        </div>

        {/* ==================================================
            TECHNOLOGIES
        =================================================== */}

        <div className="mt-5 sm:mt-6">
          <p
            className="
              mb-2.5
              font-mono
              text-[8px]
              uppercase
              tracking-[0.2em]
              text-white/25
              sm:mb-3
              sm:text-[9px]
            "
          >
            Technology
          </p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: false,
              amount: 0.2,
            }}
            className="
              flex
              min-w-0
              flex-wrap
              gap-1.5
              sm:gap-2
            "
          >
            {project.technologies.map((technology) => (
              <motion.span
                key={technology}
                variants={badgeVariants}
                className="
                  max-w-full
                  break-words
                  rounded-full
                  border
                  border-white/[0.08]
                  bg-white/[0.02]
                  px-2.5
                  py-1
                  text-[9px]
                  leading-4
                  text-gray-400
                  transition-all
                  duration-300
                  hover:border-[#39ff88]/30
                  hover:bg-[#39ff88]/[0.06]
                  hover:text-[#39ff88]
                  sm:px-3
                  sm:py-1.5
                  sm:text-[11px]
                "
              >
                {technology}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* ==================================================
            FEATURES
        =================================================== */}

        <div className="mt-5 sm:mt-6">
          <p
            className="
              mb-2.5
              font-mono
              text-[8px]
              uppercase
              tracking-[0.2em]
              text-white/25
              sm:mb-3
              sm:text-[9px]
            "
          >
            Key Features
          </p>

          <div
            className="
              grid
              grid-cols-1
              gap-2
              sm:grid-cols-2
              sm:gap-2.5
            "
          >
            {project.features.map((feature, featureIndex) => (
              <motion.div
                key={feature}
                initial={{
                  opacity: 0,
                  x: -8,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: false,
                  amount: 0.25,
                }}
                transition={{
                  duration: 0.3,
                  delay: featureIndex * 0.035,
                }}
                className="
                  flex
                  min-w-0
                  items-start
                  gap-2
                  text-[11px]
                  leading-5
                  text-gray-500
                  sm:text-xs
                "
              >
                <span
                  className="
                    mt-0.5
                    flex
                    h-4
                    w-4
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#39ff88]/10
                    text-[#39ff88]
                  "
                >
                  <Check size={9} />
                </span>

                <span className="min-w-0 break-words">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ==================================================
            SPACER
        =================================================== */}

        <div className="flex-1" />

        {/* ==================================================
            BUTTONS
        =================================================== */}

        <div
          className="
            mt-7
            flex
            w-full
            flex-col
            gap-2.5
            border-t
            border-white/[0.06]
            pt-5
            xs:flex-row
            sm:mt-8
            sm:pt-6
          "
        >
          {/* GitHub */}

          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} on GitHub`}
            className="
              group/github
              inline-flex
              min-h-10
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-white/10
              bg-white/[0.02]
              px-4
              py-2.5
              text-xs
              font-medium
              text-white/70
              transition-all
              duration-300
              hover:border-[#39ff88]/30
              hover:bg-[#39ff88]/[0.05]
              hover:text-[#39ff88]
              xs:w-auto
              sm:min-h-11
            "
          >
            <FaGithub size={15} />

            GitHub

            <ArrowUpRight
              size={13}
              className="
                transition-transform
                duration-300
                group-hover/github:translate-x-0.5
                group-hover/github:-translate-y-0.5
              "
            />
          </a>

          {/* Live Demo */}

          {project.live !== "#" && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View live demo of ${project.title}`}
              className="
                group/demo
                inline-flex
                min-h-10
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#39ff88]
                px-4
                py-2.5
                text-xs
                font-semibold
                text-black
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-[0_0_30px_rgba(57,255,136,0.2)]
                xs:w-auto
                sm:min-h-11
              "
            >
              Live Demo

              <ExternalLink
                size={14}
                className="
                  transition-transform
                  duration-300
                  group-hover/demo:translate-x-0.5
                  group-hover/demo:-translate-y-0.5
                "
              />
            </a>
          )}
        </div>

        {/* ==================================================
            FOOTER
        =================================================== */}

        <div
          className="
            mt-4
            flex
            items-center
            gap-2
            font-mono
            text-[8px]
            text-white/20
            sm:mt-5
            sm:text-[9px]
          "
        >
          <Code2
            size={11}
            className="shrink-0 text-[#39ff88]/40"
          />

          <span>
            build → test → deploy
          </span>
        </div>
      </div>

      {/* ==================================================
          BOTTOM GREEN LINE
      =================================================== */}

      <div
        className="
          absolute
          bottom-0
          left-0
          h-[2px]
          w-0
          bg-[#39ff88]
          shadow-[0_0_18px_rgba(57,255,136,0.8)]
          transition-all
          duration-700
          group-hover:w-full
        "
      />
    </motion.article>
  );
}

// ======================================================
// MAIN PROJECT SECTION
// ======================================================

export default function Projects() {
  return (
    <section
      id="projects"
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
          RESPONSIVE CONTAINER
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
            HEADER
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
          {/* Section number */}

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
              className="
                min-w-0
                max-w-3xl
                break-words
                text-3xl
                font-bold
                leading-[1.08]
                tracking-[-0.03em]
                text-white
                sm:text-4xl
                md:text-5xl
                lg:text-6xl
              "
            >
              Projects built with{" "}
              <span className="text-[#39ff88]">
                purpose.
              </span>
            </h2>

            <p
              className="
                w-full
                max-w-md
                text-xs
                leading-6
                text-gray-500
                sm:text-sm
                sm:leading-7
                lg:shrink-0
              "
            >
              A selection of full-stack applications,
              development projects and real-world
              problem-solving work.
            </p>
          </div>
        </motion.div>

        {/* ==================================================
            PROJECT GRID
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
            y: 25,
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
            w-full
            justify-center
            sm:mt-12
            md:mt-14
          "
        >
          <a
            href="#contact"
            className="
              group
              inline-flex
              min-h-10
              max-w-full
              items-center
              justify-center
              gap-2
              rounded-full
              border
              border-white/[0.08]
              bg-[#111113]/60
              px-4
              py-2.5
              text-center
              text-xs
              text-gray-400
              backdrop-blur-md
              transition-all
              duration-300
              hover:border-[#39ff88]/30
              hover:bg-[#39ff88]/[0.05]
              hover:text-[#39ff88]
              sm:px-5
              sm:py-3
              sm:text-sm
            "
          >
            <span className="break-words">
              Have a project in mind?
            </span>

            <ArrowUpRight
              size={16}
              className="
                shrink-0
                transition-transform
                duration-300
                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}