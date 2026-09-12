import {
  Braces,
  Database,
  GitBranch,
  Server,
  Wrench,
} from "lucide-react";

const groups = [
  {
    title: "Frontend",
    icon: Braces,
    description: "Modern and responsive user interfaces.",
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Bootstrap",
      "Redux",
    ],
  },
  {
    title: "Backend",
    icon: Server,
    description: "Server-side applications and APIs.",
    skills: [
      "Python",
      "Django",
      "FastAPI",
      "REST API",
      "JWT Authentication",
    ],
  },
  {
    title: "Database",
    icon: Database,
    description: "Relational database development.",
    skills: [
      "PostgreSQL",
      "Django ORM",
    ],
  },
  {
    title: "Tools",
    icon: Wrench,
    description: "Development and deployment tools.",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
      "Vercel",
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="border-t border-white/[0.05] py-28 sm:py-36">
      <div className="container-custom">

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#39ff88]">
          02 — Skills
        </p>

        <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
          Technologies I{" "}
          <span className="text-[#39ff88]">
            work with.
          </span>
        </h2>

        <p className="mt-5 max-w-2xl leading-8 text-gray-500">
          Technologies and tools I use to design, develop,
          test and deploy web applications.
        </p>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {groups.map((group) => {
            const Icon = group.icon;

            return (
              <div
                key={group.title}
                className="group rounded-3xl border border-white/[0.08] bg-[#111113] p-7 transition hover:-translate-y-1 hover:border-[#39ff88]/30"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#39ff88]/10 text-[#39ff88]">
                    <Icon size={23} />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold">
                      {group.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {group.description}
                    </p>
                  </div>
                </div>

                <div className="mt-7 flex flex-wrap gap-2.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/[0.08] bg-black/30 px-4 py-2 text-sm text-gray-300 transition hover:border-[#39ff88]/40 hover:bg-[#39ff88]/10 hover:text-[#39ff88]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center gap-3 text-sm text-gray-600">
          <GitBranch size={17} />
          Building • Testing • Deploying • Improving
        </div>
      </div>
    </section>
  );
}