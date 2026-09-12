import {
  BriefcaseBusiness,
  CheckCircle2,
} from "lucide-react";

const experience = {
  role: "Software Developer Intern",
  company: "Upcode Software Labs L.L.P",
  date: "05/05/2025 — 31/01/2026",
  description:
    "Worked on full-stack development for live projects, contributing to frontend and backend development, APIs, authentication and database-driven applications.",
  technologies: [
    "ReactJS",
    "Redux",
    "Next.js",
    "TypeScript",
    "Python",
    "Django",
    "Flask",
    "Git",
    "RDBMS",
  ],
  responsibilities: [
    "Worked on frontend and backend development.",
    "Contributed to live project development strategies.",
    "Worked with modern JavaScript and Python technologies.",
    "Completed assigned projects and met important deadlines.",
  ],
};

export default function Experience() {
  return (
    <section id="experience" className="border-t border-white/[0.05] py-28 sm:py-36">
      <div className="container-custom">

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#39ff88]">
          04 — Experience
        </p>

        <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
          My professional{" "}
          <span className="text-[#39ff88]">
            journey.
          </span>
        </h2>

        <div className="relative mt-16">
          <div className="absolute bottom-0 left-[15px] top-0 w-px bg-gradient-to-b from-[#39ff88] via-white/10 to-transparent" />

          <div className="relative pl-12">
            <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-[#39ff88]/50 bg-[#080808] text-[#39ff88]">
              <BriefcaseBusiness size={15} />
            </div>

            <div className="rounded-3xl border border-white/[0.08] bg-[#111113] p-7 sm:p-10">
              <div className="flex flex-col justify-between gap-4 md:flex-row">
                <div>
                  <p className="text-sm font-medium text-[#39ff88]">
                    {experience.date}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    {experience.role}
                  </h3>

                  <p className="mt-1 text-gray-400">
                    {experience.company}
                  </p>
                </div>

                <span className="h-fit rounded-full border border-[#39ff88]/20 bg-[#39ff88]/5 px-4 py-2 text-xs text-[#39ff88]">
                  Internship
                </span>
              </div>

              <p className="mt-7 leading-8 text-gray-500">
                {experience.description}
              </p>

              <div className="mt-7 space-y-3">
                {experience.responsibilities.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 text-sm text-gray-400"
                  >
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0 text-[#39ff88]"
                    />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {experience.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/[0.08] px-3 py-1.5 text-xs text-gray-500"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}