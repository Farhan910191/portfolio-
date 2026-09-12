import {
  Award,
  ExternalLink,
  FileCheck2,
} from "lucide-react";

export default function Certificates() {
  return (
    <section
      id="certificates"
      className="border-t border-white/[0.05] py-28 sm:py-36"
    >
      <div className="container-custom">

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#39ff88]">
          06 — Certifications
        </p>

        <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
          Proof of{" "}
          <span className="text-[#39ff88]">
            experience.
          </span>
        </h2>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">

          {/* Certificate Preview */}
          <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#111113]">
            <div className="border-b border-white/[0.06] p-5">
              <div className="flex items-center gap-3">
                <Award className="text-[#39ff88]" size={21} />

                <div>
                  <p className="font-semibold">
                    Internship Certificate
                  </p>

                  <p className="text-xs text-gray-500">
                    Upcode Software Labs L.L.P
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-3">
              <iframe
                src="/certificates/internship-certificate.pdf"
                title="Internship Certificate"
                className="h-[500px] w-full rounded-lg"
              />
            </div>

            <div className="flex flex-wrap gap-3 p-5">
              <a
                href="/certificates/internship-certificate.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-[#39ff88] px-5 py-3 text-sm font-semibold text-black"
              >
                View Certificate
                <ExternalLink size={16} />
              </a>

              <a
                href="/certificates/internship-certificate.pdf"
                download
                className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm text-gray-300 transition hover:border-[#39ff88]/40 hover:text-[#39ff88]"
              >
                Download
                <FileCheck2 size={16} />
              </a>
            </div>
          </div>

          {/* Certificate Details */}
          <div className="rounded-3xl border border-white/[0.08] bg-[#111113] p-7 sm:p-9">
            <span className="rounded-full border border-[#39ff88]/20 bg-[#39ff88]/5 px-3 py-1.5 text-xs text-[#39ff88]">
              Verified Certificate
            </span>

            <h3 className="mt-7 text-3xl font-bold">
              Software Developer Intern
            </h3>

            <p className="mt-3 text-gray-400">
              Upcode Software Labs L.L.P
            </p>

            <p className="mt-6 text-sm text-gray-500">
              05/05/2025 — 31/01/2026
            </p>

            <div className="mt-8">
              <p className="text-sm font-semibold text-gray-300">
                Technologies
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {[
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
                ].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-white/[0.08] px-3 py-1.5 text-xs text-gray-500"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10 border-t border-white/[0.06] pt-7">
              <p className="text-sm leading-7 text-gray-500">
                The certificate records successful work as a
                Software Developer Intern and highlights full
                stack development technologies and professional
                project work.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}