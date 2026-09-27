"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";

// ======================================================
// NAVIGATION DATA
// ======================================================

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Services", href: "#services" },
  { name: "GitHub", href: "#github" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

// ======================================================
// NAVBAR
// ======================================================

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("about");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // ====================================================
  // SCROLL / ACTIVE SECTION
  // ====================================================

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      setScrolled(scrollY > 30);

      let current = "about";

      // Home section
      if (scrollY < 300) {
        current = "about";
      }

      navItems.forEach((item) => {
        const section = document.querySelector(item.href);

        if (!section) return;

        const rect = section.getBoundingClientRect();

        const sectionTop = rect.top;
        const sectionBottom = rect.bottom;

        if (
          sectionTop <= 180 &&
          sectionBottom >= 180
        ) {
          current = item.href.replace("#", "");
        }
      });

      setActiveSection(current);
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  // ====================================================
  // LOCK BODY WHEN MOBILE MENU OPEN
  // ====================================================

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // ====================================================
  // NAVIGATION
  // ====================================================

  const handleNavigation = (href: string) => {
    setMenuOpen(false);

    const element = document.querySelector(href);

    if (!element) return;

    const navbarOffset = 90;

    const elementPosition =
      element.getBoundingClientRect().top +
      window.scrollY;

    const offsetPosition =
      elementPosition - navbarOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <>
      {/* ==================================================
          NAVBAR
      =================================================== */}

      <motion.header
        initial={{
          y: -30,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          fixed
          left-0
          right-0
          top-0
          z-[100]
          w-full
          px-3
          pt-3
          sm:px-4
          sm:pt-4
          md:px-5
          lg:px-6
          xl:px-8
        "
      >
        <div
          className={`
            mx-auto
            flex
            w-full
            max-w-7xl
            min-w-0
            items-center
            justify-between
            gap-3
            transition-all
            duration-500

            ${
              scrolled
                ? `
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-[#080808]/80
                  px-3
                  py-2.5
                  shadow-[0_20px_60px_rgba(0,0,0,0.45)]
                  backdrop-blur-2xl

                  sm:px-4
                  sm:py-3

                  md:px-5

                  xl:px-6
                `
                : `
                  px-1
                  py-1.5

                  sm:py-2
                `
            }
          `}
        >
          {/* ==================================================
              LOGO
          =================================================== */}

          <button
            type="button"
            onClick={() => handleNavigation("#home")}
            className="
              group
              relative
              flex
              shrink-0
              items-center
              outline-none
            "
            aria-label="Go to home"
          >
            <div className="relative">
              <div className="flex items-baseline leading-none">
                {/* F */}

                <span
                  className="
                    font-mono
                    text-2xl
                    font-black
                    tracking-[-0.12em]
                    text-white
                    transition-colors
                    duration-300
                    group-hover:text-[#39ff88]

                    sm:text-3xl
                  "
                >
                  F
                </span>

                {/* K */}

                <span
                  className="
                    font-mono
                    text-2xl
                    font-black
                    tracking-[-0.12em]
                    text-[#39ff88]
                    transition-colors
                    duration-300
                    group-hover:text-white

                    sm:text-3xl
                  "
                >
                  K
                </span>
              </div>

              {/* Underline */}

              <motion.span
                initial={{
                  scaleX: 0,
                }}
                whileHover={{
                  scaleX: 1,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="
                  absolute
                  -bottom-1.5
                  left-0
                  h-[2px]
                  w-full
                  origin-left
                  bg-[#39ff88]
                  shadow-[0_0_10px_rgba(57,255,136,0.8)]

                  sm:-bottom-2
                "
              />
            </div>
          </button>

          {/* ==================================================
              DESKTOP NAVIGATION
              XL ONLY
          =================================================== */}

          <nav
            className="
              hidden
              min-w-0
              flex-1
              items-center
              justify-center
              gap-0.5
              xl:flex
            "
          >
            {navItems.map((item, index) => {
              const id = item.href.replace("#", "");

              const active =
                activeSection === id;

              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() =>
                    handleNavigation(item.href)
                  }
                  className="
                    group
                    relative
                    shrink-0
                    rounded-lg
                    px-2
                    py-2
                    2xl:px-2.5
                  "
                >
                  {/* Hover background */}

                  <span
                    className="
                      absolute
                      inset-0
                      rounded-lg
                      bg-white/[0.03]
                      opacity-0
                      transition-opacity
                      duration-300
                      group-hover:opacity-100
                    "
                  />

                  <span
                    className="
                      relative
                      flex
                      items-center
                      gap-1
                      2xl:gap-1.5
                    "
                  >
                    {/* Number */}

                    <span
                      className={`
                        font-mono
                        text-[7px]
                        transition-colors
                        duration-300
                        2xl:text-[8px]

                        ${
                          active
                            ? "text-[#39ff88]"
                            : "text-white/20 group-hover:text-white/40"
                        }
                      `}
                    >
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    {/* Name */}

                    <span
                      className={`
                        whitespace-nowrap
                        text-[10px]
                        transition-colors
                        duration-300
                        2xl:text-xs

                        ${
                          active
                            ? "text-white"
                            : "text-white/50 group-hover:text-white"
                        }
                      `}
                    >
                      {item.name}
                    </span>
                  </span>

                  {/* Active line */}

                  <motion.span
                    initial={false}
                    animate={{
                      width: active
                        ? "65%"
                        : "0%",
                      opacity: active ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="
                      absolute
                      bottom-0
                      left-1/2
                      h-px
                      -translate-x-1/2
                      bg-[#39ff88]
                      shadow-[0_0_12px_rgba(57,255,136,0.8)]
                    "
                  />
                </button>
              );
            })}
          </nav>

          {/* ==================================================
              TABLET / LAPTOP
              COMPACT MENU
          =================================================== */}

          <div
            className="
              hidden
              items-center
              gap-2
              lg:flex
              xl:hidden
            "
          >
            {/* Current section */}

            <div
              className="
                flex
                max-w-[180px]
                items-center
                gap-2
                rounded-xl
                border
                border-white/[0.07]
                bg-white/[0.025]
                px-3
                py-2
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  shrink-0
                  rounded-full
                  bg-[#39ff88]
                  shadow-[0_0_8px_#39ff88]
                "
              />

              <span
                className="
                  truncate
                  font-mono
                  text-[10px]
                  uppercase
                  tracking-wider
                  text-white/60
                "
              >
                {activeSection}
              </span>
            </div>

            {/* Menu */}

            <button
              type="button"
              onClick={() =>
                setMenuOpen((prev) => !prev)
              }
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-white/[0.08]
                bg-[#111113]/80
                text-white
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-[#39ff88]/40
                hover:text-[#39ff88]
              "
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <X size={19} />
              ) : (
                <Menu size={19} />
              )}
            </button>
          </div>

          {/* ==================================================
              DESKTOP CTA
              XL ONLY
          =================================================== */}

          <motion.button
            type="button"
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={() =>
              handleNavigation("#contact")
            }
            className="
              group
              hidden
              shrink-0
              items-center
              gap-2
              rounded-xl
              border
              border-[#39ff88]/30
              bg-[#39ff88]/[0.06]
              px-3
              py-2.5
              transition-all
              duration-300
              hover:border-[#39ff88]/60
              hover:bg-[#39ff88]/[0.12]

              xl:flex
              xl:px-4
            "
          >
            <span
              className="
                font-mono
                text-[10px]
                font-medium
                text-[#39ff88]
                2xl:text-xs
              "
            >
              Let&apos;s Talk
            </span>

            <ArrowUpRight
              size={14}
              className="
                text-[#39ff88]
                transition-transform
                duration-300
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </motion.button>

          {/* ==================================================
              MOBILE MENU BUTTON
              BELOW LG
          =================================================== */}

          <button
            type="button"
            onClick={() =>
              setMenuOpen((prev) => !prev)
            }
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-white/[0.08]
              bg-[#111113]/80
              text-white
              backdrop-blur-xl
              transition-all
              duration-300
              hover:border-[#39ff88]/40
              hover:text-[#39ff88]

              sm:h-10
              sm:w-10

              lg:hidden
            "
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            <AnimatePresence
              mode="wait"
              initial={false}
            >
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{
                    rotate: -90,
                    opacity: 0,
                  }}
                  animate={{
                    rotate: 0,
                    opacity: 1,
                  }}
                  exit={{
                    rotate: 90,
                    opacity: 0,
                  }}
                >
                  <X size={19} />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{
                    rotate: 90,
                    opacity: 0,
                  }}
                  animate={{
                    rotate: 0,
                    opacity: 1,
                  }}
                  exit={{
                    rotate: -90,
                    opacity: 0,
                  }}
                >
                  <Menu size={19} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* =====================================================
          MOBILE / TABLET MENU
      ====================================================== */}

      <AnimatePresence>
        {menuOpen && (
          <>
            {/* ==================================================
                OVERLAY
            =================================================== */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: 0.25,
              }}
              onClick={() =>
                setMenuOpen(false)
              }
              className="
                fixed
                inset-0
                z-[90]
                bg-black/70
                backdrop-blur-md
              "
            />

            {/* ==================================================
                MENU PANEL
            =================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: -20,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -20,
                scale: 0.97,
              }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                fixed
                left-3
                right-3
                top-[68px]
                z-[95]
                max-h-[calc(100dvh-84px)]
                overflow-y-auto
                overscroll-contain
                rounded-2xl
                border
                border-white/[0.08]
                bg-[#080808]/95
                p-2.5
                shadow-[0_25px_80px_rgba(0,0,0,0.7)]
                backdrop-blur-2xl

                sm:left-4
                sm:right-4
                sm:top-[76px]
                sm:rounded-3xl
                sm:p-3
              "
            >
              {/* ==================================================
                  MENU HEADER
              =================================================== */}

              <div
                className="
                  mb-2
                  flex
                  items-center
                  justify-between
                  border-b
                  border-white/[0.06]
                  px-2
                  py-2.5

                  sm:px-3
                  sm:py-3
                "
              >
                <div className="min-w-0">
                  <p
                    className="
                      text-[11px]
                      font-medium
                      text-white
                      sm:text-xs
                    "
                  >
                    Navigation
                  </p>

                  <p
                    className="
                      mt-0.5
                      font-mono
                      text-[8px]
                      text-[#39ff88]
                      sm:mt-1
                      sm:text-[9px]
                    "
                  >
                    farhan.dev
                  </p>
                </div>

                <span
                  className="
                    flex
                    shrink-0
                    items-center
                    gap-1.5
                    font-mono
                    text-[7px]
                    text-white/30
                    sm:gap-2
                    sm:text-[8px]
                  "
                >
                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-[#39ff88]
                      shadow-[0_0_8px_#39ff88]
                    "
                  />

                  ONLINE
                </span>
              </div>

              {/* ==================================================
                  LINKS
              =================================================== */}

              <div className="space-y-1">
                {navItems.map((item, index) => {
                  const id =
                    item.href.replace(
                      "#",
                      ""
                    );

                  const active =
                    activeSection === id;

                  return (
                    <motion.button
                      key={item.name}
                      type="button"
                      initial={{
                        opacity: 0,
                        x: -15,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay:
                          index * 0.035,
                        duration: 0.25,
                      }}
                      onClick={() =>
                        handleNavigation(
                          item.href
                        )
                      }
                      className={`
                        group
                        flex
                        w-full
                        items-center
                        justify-between
                        rounded-xl
                        px-3
                        py-2.5
                        transition-all
                        duration-300

                        sm:px-4
                        sm:py-3

                        ${
                          active
                            ? "border border-[#39ff88]/20 bg-[#39ff88]/[0.06]"
                            : "border border-transparent hover:bg-white/[0.03]"
                        }
                      `}
                    >
                      <div
                        className="
                          flex
                          min-w-0
                          items-center
                          gap-3
                          sm:gap-4
                        "
                      >
                        <span
                          className={`
                            shrink-0
                            font-mono
                            text-[8px]
                            sm:text-[9px]

                            ${
                              active
                                ? "text-[#39ff88]"
                                : "text-white/20"
                            }
                          `}
                        >
                          {String(
                            index + 1
                          ).padStart(2, "0")}
                        </span>

                        <span
                          className={`
                            truncate
                            text-xs
                            transition-colors
                            sm:text-sm

                            ${
                              active
                                ? "text-white"
                                : "text-white/55 group-hover:text-white"
                            }
                          `}
                        >
                          {item.name}
                        </span>
                      </div>

                      {active && (
                        <span
                          className="
                            shrink-0
                            font-mono
                            text-[7px]
                            text-[#39ff88]
                            sm:text-[8px]
                          "
                        >
                          ACTIVE
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* ==================================================
                  CTA
              =================================================== */}

              <button
                type="button"
                onClick={() =>
                  handleNavigation(
                    "#contact"
                  )
                }
                className="
                  group
                  mt-2.5
                  flex
                  w-full
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-[#39ff88]/30
                  bg-[#39ff88]/[0.06]
                  px-3
                  py-2.5
                  transition-all
                  duration-300
                  hover:border-[#39ff88]/50
                  hover:bg-[#39ff88]/[0.12]

                  sm:mt-3
                  sm:px-4
                  sm:py-3
                "
              >
                <span
                  className="
                    font-mono
                    text-[10px]
                    text-[#39ff88]
                    sm:text-xs
                  "
                >
                  &gt; Let&apos;s_Talk
                </span>

                <ArrowUpRight
                  size={14}
                  className="
                    text-[#39ff88]
                    transition-transform
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </button>

              {/* ==================================================
                  FOOTER STATUS
              =================================================== */}

              <div
                className="
                  mt-2.5
                  flex
                  items-center
                  justify-between
                  border-t
                  border-white/[0.06]
                  px-2
                  pt-2.5

                  sm:mt-3
                  sm:px-3
                  sm:pt-3
                "
              >
                <span
                  className="
                    font-mono
                    text-[7px]
                    text-white/25
                    sm:text-[8px]
                  "
                >
                  FK.DEV
                </span>

                <div className="flex items-center gap-2">
                  <span
                    className="
                      hidden
                      font-mono
                      text-[8px]
                      text-white/25
                      min-[400px]:block
                    "
                  >
                    SYSTEM
                  </span>

                  <span
                    className="
                      flex
                      items-center
                      gap-1.5
                      font-mono
                      text-[7px]
                      text-[#39ff88]
                      sm:text-[8px]
                    "
                  >
                    <span
                      className="
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-[#39ff88]
                        shadow-[0_0_8px_#39ff88]
                      "
                    />

                    ONLINE
                  </span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}