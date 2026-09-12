import { GraduationCap } from "lucide-react";

const education = [
  {
    degree: "BA Economics",
    institution:
      "University of Calicut — PPTM Arts and Science College",
    date: "2022 — 2025",
  },
  {
    degree: "Higher Secondary — Humanities",
    institution:
      "DHSE Kerala — IUHSS Parappur",
    date: "2020 — 2022",
  },
];

export default function Education() {
  return (
    <section id="education" className="border-t border-white/[0.05] py-28">
      <div className="container-custom">

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#39ff88]">
          05 — Education
        </p>

        <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
          Academic{" "}
          <span className="text-[#39ff88]">
            background.
          </span>
        </h2>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {education.map((item) => (
            <div
              key={item.degree}
              className="group rounded-3xl border border-white/[0.08] bg-[#111113] p-7 transition hover:-translate-y-1 hover:border-[#39ff88]/30"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#39ff88]/10 text-[#39ff88]">
                <GraduationCap size={23} />
              </div>

              <p className="mt-7 text-sm text-[#39ff88]">
                {item.date}
              </p>

              <h3 className="mt-2 text-xl font-bold">
                {item.degree}
              </h3>

              <p className="mt-3 leading-7 text-gray-500">
                {item.institution}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}