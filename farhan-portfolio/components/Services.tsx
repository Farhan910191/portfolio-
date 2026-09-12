import {
  Code2,
  Database,
  Layout,
  Server,
  Smartphone,
  Workflow,
} from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Full Stack Web Development",
    description:
      "Complete web applications from frontend interfaces to backend APIs and databases.",
  },
  {
    icon: Layout,
    title: "Frontend Development",
    description:
      "Responsive and modern interfaces using React, Next.js, TypeScript and CSS.",
  },
  {
    icon: Server,
    title: "Backend Development",
    description:
      "Backend applications and REST APIs using Python, Django and FastAPI.",
  },
  {
    icon: Workflow,
    title: "API Development",
    description:
      "Structured REST APIs with authentication, protected routes and clean integration.",
  },
  {
    icon: Database,
    title: "Database Integration",
    description:
      "Relational database integration and application data management with PostgreSQL.",
  },
  {
    icon: Smartphone,
    title: "Responsive Web Design",
    description:
      "Mobile-first experiences that work smoothly across phones, tablets and desktops.",
  },
];

export default function Services() {
  return (
    <section id="services" className="border-t border-white/[0.05] py-28">
      <div className="container-custom">

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#39ff88]">
          07 — What I Do
        </p>

        <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
          Turning skills into{" "}
          <span className="text-[#39ff88]">
            solutions.
          </span>
        </h2>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="group rounded-3xl border border-white/[0.08] bg-[#111113] p-7 transition duration-300 hover:-translate-y-2 hover:border-[#39ff88]/30"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#39ff88]/10 text-[#39ff88] transition group-hover:bg-[#39ff88] group-hover:text-black">
                    <Icon size={22} />
                  </div>

                  <span className="font-mono text-xs text-gray-700">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-semibold">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}