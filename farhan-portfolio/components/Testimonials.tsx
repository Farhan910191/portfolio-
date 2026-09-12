import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Your Mentor",
    role: "Mentor / Team Lead",
    text: "Add a genuine testimonial from your mentor or team lead here.",
  },
  {
    name: "Your Teammate",
    role: "Developer / Teammate",
    text: "Add a genuine testimonial describing your teamwork and development skills.",
  },
  {
    name: "Your Client",
    role: "Client / Collaborator",
    text: "Add a genuine testimonial about your project delivery and communication.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="border-t border-white/[0.05] py-28">
      <div className="container-custom">

        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#39ff88]">
          09 — Testimonials
        </p>

        <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
          What people{" "}
          <span className="text-[#39ff88]">
            say.
          </span>
        </h2>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-3xl border border-white/[0.08] bg-[#111113] p-7 transition hover:-translate-y-1 hover:border-[#39ff88]/30"
            >
              <Quote
                size={28}
                className="text-[#39ff88]"
              />

              <div className="mt-6 flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={15}
                    fill="currentColor"
                    className="text-[#39ff88]"
                  />
                ))}
              </div>

              <p className="mt-6 min-h-[100px] leading-7 text-gray-500">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div className="mt-7 border-t border-white/[0.06] pt-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#39ff88]/10 font-semibold text-[#39ff88]">
                    {testimonial.name.charAt(0)}
                  </div>

                  <div>
                    <p className="font-semibold">
                      {testimonial.name}
                    </p>

                    <p className="text-sm text-gray-600">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}