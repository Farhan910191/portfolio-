import {
  Code2,
  Database,
  Rocket,
  Terminal,
} from "lucide-react";

const stats = [
  ["3+", "Featured Projects"],
  ["15+", "Technologies"],
  ["0+", "Entry-Level Full Stack Developer"],
  ["01", "Professional Internship"],
];

const highlights = [
  {
    icon: Code2,
    title: "Full Stack Development",
    text: "Building complete applications across frontend, backend, APIs and databases.",
  },
  {
    icon: Database,
    title: "Backend & APIs",
    text: "Creating REST APIs, authentication systems and database-driven applications.",
  },
  {
    icon: Rocket,
    title: "Modern Web Apps",
    text: "Developing responsive and scalable applications using modern technologies.",
  },
  {
    icon: Terminal,
    title: "Clean Development",
    text: "Writing maintainable code and following Git-based development workflows.",
  },
];

export default function About() {
  return (
    <section id="about" className="border-t border-white/[0.05] py-28 sm:py-36">
      <div className="container-custom">

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#39ff88]">
          01 — About Me
        </p>

        <h2 className="mt-4 max-w-3xl text-4xl font-bold sm:text-5xl">
          Turning ideas into{" "}
          <span className="text-[#39ff88]">
            digital experiences.
          </span>
        </h2>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">

          <div>
            <p className="text-xl leading-9 text-gray-300">
              I&apos;m Mohammed Farhan KK, a Full Stack Developer
              focused on building responsive, scalable and
              user-friendly web applications.
            </p>

            <p className="mt-6 leading-8 text-gray-400">
              I work across the complete development cycle —
              from creating modern user interfaces and reusable
              components to developing REST APIs, authentication
              systems and PostgreSQL-backed applications.
            </p>

            <p className="mt-6 leading-8 text-gray-400">
              I enjoy solving development problems, learning new
              technologies and turning ideas into practical digital
              products.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08]">
              {stats.map(([number, label]) => (
                <div
                  key={label}
                  className="bg-[#0d0d0f] p-6 transition hover:bg-[#151518]"
                >
                  <p className="text-3xl font-bold text-[#39ff88]">
                    {number}
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-white/[0.08] bg-[#111113] p-6 transition hover:-translate-y-1 hover:border-[#39ff88]/30"
                >
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#39ff88]/10 text-[#39ff88]">
                      <Icon size={21} />
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-gray-500">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}