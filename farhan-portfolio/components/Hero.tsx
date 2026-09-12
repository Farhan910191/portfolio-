import {
  ArrowDown,
  ArrowRight,
  Mail,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";

import { developer } from "@/data/portfolio";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-20"
    >
      {/* Background Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-200px] top-[20%] h-[500px] w-[500px] rounded-full bg-[#39ff88]/10 blur-[150px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-100px] right-[-200px] h-[500px] w-[500px] rounded-full bg-[#39ff88]/5 blur-[150px]"
      />

      <div className="container-custom relative z-10 grid items-center gap-16 py-20 lg:grid-cols-[1.2fr_0.8fr]">
        {/* LEFT CONTENT */}
        <div>
          {/* Availability */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#39ff88]/20 bg-[#39ff88]/5 px-4 py-2 text-sm text-gray-300">
            <span
              aria-hidden="true"
              className="h-2 w-2 animate-pulse rounded-full bg-[#39ff88]"
            />
            Available for opportunities
          </div>

          {/* Small Label */}
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-[#39ff88]">
            Full Stack Developer
          </p>

          {/* Heading */}
          <h1 className="max-w-4xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Building Digital Experiences{" "}
            <span className="gradient-text">
              That Make an Impact.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-400">
            {developer.description}
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-wrap gap-4">
            {/* View Work */}
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-[#39ff88] px-7 py-3.5 font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(57,255,136,0.25)]"
            >
              View My Work

              <ArrowRight
                size={18}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>

            {/* Contact */}
            <a
              href="#contact"
              className="inline-flex items-center rounded-full border border-white/10 px-7 py-3.5 font-semibold text-white transition-all duration-300 hover:border-[#39ff88]/40 hover:bg-white/5"
            >
              Contact Me
            </a>
          </div>

          {/* Social Links */}
          <div className="mt-10 flex items-center gap-5">
            <span className="text-sm text-gray-500">
              Find me on
            </span>

            {/* GitHub */}
            <a
              href={developer.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-gray-400 transition-colors duration-300 hover:text-[#39ff88]"
            >
              <FaGithub size={21} />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/farhan-kk-66b598371/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-400 transition-colors duration-300 hover:text-[#39ff88]"
            >
              <FaLinkedinIn size={21} />
            </a>

            {/* Email */}
            <a
              href={`mailto:${developer.email}`}
              aria-label="Email"
              className="text-gray-400 transition-colors duration-300 hover:text-[#39ff88]"
            >
              <Mail size={21} />
            </a>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="relative mx-auto w-full max-w-md">
          {/* Image Glow */}
          <div
            aria-hidden="true"
            className="absolute inset-10 rounded-full bg-[#39ff88]/20 blur-[100px]"
          />

          {/* Profile Image */}
          <div className="relative aspect-square overflow-hidden rounded-[40px] border border-white/10 bg-[#111113] shadow-2xl">
            <img
              src="/profile.jpg"
              alt="Mohammed Farhan KK"
              className="h-full w-full object-cover grayscale transition-all duration-700 hover:scale-105 hover:grayscale-0"
            />

            {/* Bottom Gradient */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent"
            />
          </div>

          {/* Frontend Card */}
          <div className="glass animate-float absolute left-[-2rem] top-16 rounded-2xl px-4 py-3 shadow-xl">
            <span className="text-xs text-gray-500">
              frontend
            </span>

            <p className="mt-1 font-mono text-sm text-[#39ff88]">
              {"<React />"}
            </p>
          </div>

          {/* Backend Card */}
          <div
            className="glass absolute bottom-20 right-[-2rem] rounded-2xl px-4 py-3 shadow-xl"
            style={{ animationDelay: "1s" }}
          >
            <span className="text-xs text-gray-500">
              backend
            </span>

            <p className="mt-1 font-mono text-sm text-white">
              Django + API
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-gray-500 transition-colors duration-300 hover:text-[#39ff88] sm:block"
      >
        <ArrowDown
          size={20}
          aria-hidden="true"
          className="animate-bounce"
        />
      </a>
    </section>
  );
}