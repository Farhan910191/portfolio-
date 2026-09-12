"use client";

import { Download, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/[0.06] bg-black/70 backdrop-blur-xl">
      <nav className="container-custom flex h-20 items-center justify-between">
        <a href="#home" className="text-2xl font-black">
          FK<span className="text-[#39ff88]">.</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm text-gray-400 transition hover:text-[#39ff88]"
            >
              {link.name}
            </a>
          ))}

          <a
            href="/resume.pdf"
            download
            className="flex items-center gap-2 rounded-full border border-[#39ff88]/40 px-5 py-2.5 text-sm font-medium text-[#39ff88] transition hover:bg-[#39ff88] hover:text-black"
          >
            <Download size={16} />
            Resume
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-white md:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/[0.06] bg-[#080808] md:hidden">
          <div className="container-custom flex flex-col gap-5 py-6">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-gray-300 hover:text-[#39ff88]"
              >
                {link.name}
              </a>
            ))}

            <a
              href="/resume.pdf"
              download
              className="flex w-fit items-center gap-2 rounded-full bg-[#39ff88] px-5 py-3 font-semibold text-black"
            >
              <Download size={17} />
              Download Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}