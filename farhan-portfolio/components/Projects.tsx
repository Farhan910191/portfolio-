import {
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

const projects = [
  {
    number: "01",
    title: "CRM",
    subtitle: "Customer Relationship Management System",
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
    subtitle: "Full-Stack E-Commerce Application",
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
  title: "Expense Management System",
  subtitle: "Personal Expense Tracker",
  description:
    "A full-stack expense management application that helps users track, manage, and monitor their income and expenses through a clean and responsive interface.",
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
    "Clean and user-friendly UI",
  ],
  github: "https://github.com/Farhan910191/exp.git",
  live: "#",
},
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="border-t border-white/[0.05] py-28 sm:py-36"
    >
      <div className="container-custom">
        {/* Section Header */}
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#39ff88]">
          03 — Featured Work
        </p>

        <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="max-w-3xl text-4xl font-bold sm:text-5xl">
            Projects built with{" "}
            <span className="text-[#39ff88]">
              purpose.
            </span>
          </h2>

          <p className="max-w-md text-sm leading-7 text-gray-500">
            A selection of full-stack applications and
            development projects.
          </p>
        </div>

        {/* Projects */}
        <div className="mt-16 space-y-8">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="group overflow-hidden rounded-3xl border border-white/[0.08] bg-[#111113] transition-all duration-500 hover:border-[#39ff88]/30"
            >
              <div
                className={`grid lg:grid-cols-2 ${
                  index % 2 !== 0
                    ? "lg:[&>*:first-child]:order-2"
                    : ""
                }`}
              >
                {/* Project Image */}
                <div className="relative min-h-[300px] overflow-hidden bg-[#0a0a0c]">
                  <img
                    src={project.image}
                    alt={`${project.title} project preview`}
                    loading="lazy"
                    className="h-full min-h-[300px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Image Gradient */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
                  />

                  {/* Project Number */}
                  <span className="absolute left-6 top-6 rounded-full border border-white/10 bg-black/60 px-4 py-2 font-mono text-sm text-[#39ff88] backdrop-blur-md">
                    {project.number}
                  </span>
                </div>

                {/* Project Content */}
                <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
                  {/* Subtitle */}
                  <p className="text-sm uppercase tracking-wider text-[#39ff88]">
                    {project.subtitle}
                  </p>

                  {/* Title */}
                  <h3 className="mt-3 text-3xl font-bold text-white">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-5 leading-7 text-gray-500">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-white/[0.08] px-3 py-1.5 text-xs text-gray-400 transition-colors hover:border-[#39ff88]/30 hover:text-[#39ff88]"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  {/* Features */}
                  <div className="mt-6 grid grid-cols-1 gap-2 text-sm text-gray-500 sm:grid-cols-2">
                    {project.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2"
                      >
                        <span
                          aria-hidden="true"
                          className="text-[#39ff88]"
                        >
                          ✓
                        </span>

                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Project Links */}
                  <div className="mt-8 flex flex-wrap gap-3">
                    {/* GitHub */}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.title} on GitHub`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-[#39ff88]/40 hover:text-[#39ff88]"
                    >
                      <FaGithub
                        size={16}
                        aria-hidden="true"
                      />
                      GitHub
                    </a>

                    {/* Live Demo */}
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View live demo of ${project.title}`}
                      className="inline-flex items-center gap-2 rounded-full bg-[#39ff88] px-5 py-3 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(57,255,136,0.2)]"
                    >
                      Live Demo

                      <ExternalLink
                        size={16}
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-10 flex justify-center">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 text-sm text-gray-400 transition-colors duration-300 hover:text-[#39ff88]"
          >
            Have a project in mind?

            <ArrowUpRight
              size={17}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}