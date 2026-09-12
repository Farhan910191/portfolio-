import {
  ArrowUp,
  Mail,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";

const links = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Experience", "#experience"],
  ["Contact", "#contact"],
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="container-custom">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          {/* Logo & Description */}
          <div>
            <a
              href="#home"
              aria-label="Go to homepage"
              className="text-2xl font-black text-white"
            >
              FK<span className="text-[#39ff88]">.</span>
            </a>

            <p className="mt-2 text-sm text-gray-600">
              Mohammed Farhan KK · Full Stack Developer
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <div className="flex flex-wrap gap-5">
              {links.map(([name, href]) => (
                <a
                  key={name}
                  href={href}
                  className="text-sm text-gray-500 transition-colors duration-300 hover:text-[#39ff88]"
                >
                  {name}
                </a>
              ))}
            </div>
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {/* GitHub */}
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-gray-500 transition-colors duration-300 hover:text-[#39ff88]"
            >
              <FaGithub
                size={19}
                aria-hidden="true"
              />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/farhan-kk-66b598371/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-500 transition-colors duration-300 hover:text-[#39ff88]"
            >
              <FaLinkedinIn
                size={19}
                aria-hidden="true"
              />
            </a>

            {/* Email */}
            <a
              href="mailto:farhanmohammedfarhan7@gmail.com"
              aria-label="Email"
              className="text-gray-500 transition-colors duration-300 hover:text-[#39ff88]"
            >
              <Mail
                size={19}
                aria-hidden="true"
              />
            </a>

            {/* Back To Top */}
            <a
              href="#home"
              aria-label="Back to top"
              className="ml-2 text-gray-500 transition-colors duration-300 hover:text-[#39ff88]"
            >
              <ArrowUp
                size={19}
                aria-hidden="true"
              />
            </a>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 flex flex-col justify-between gap-3 border-t border-white/[0.05] pt-6 text-xs text-gray-700 sm:flex-row">
          <p>
            © 2026 Mohammed Farhan KK. All rights reserved.
          </p>

          <p>
            Built with Next.js · React · TypeScript · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}