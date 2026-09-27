"use client";

import {
  AlertCircle,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ArrowUpRight,
  Terminal,
} from "lucide-react";

import {
  FormEvent,
  useRef,
  useState,
} from "react";

import {
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

// ======================================================
// ANIMATIONS
// ======================================================

const leftVariants = {
  hidden: {
    opacity: 0,
    x: -45,
    filter: "blur(8px)",
  },

  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const rightVariants = {
  hidden: {
    opacity: 0,
    x: 45,
    filter: "blur(8px)",
  },

  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      delay: 0.1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ======================================================
// COMPONENT
// ======================================================

export default function Contact() {
  const formRef =
    useRef<HTMLFormElement>(null);

  const [sending, setSending] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  const [error, setError] =
    useState("");

  const [whatsappSuccess, setWhatsappSuccess] =
    useState(false);

  // ====================================================
  // YOUR DETAILS
  // ====================================================

  const myEmail =
    "farhanmohammedfarhan7@gmail.com";

  const phone =
    "+919526910191";

  const whatsappNumber =
    "919526910191";

  const github =
    "https://github.com/Farhan910191";

  const linkedin =
    "https://www.linkedin.com/in/mohammed-farhan-kk";

  // ====================================================
  // EMAILJS
  // ====================================================

  const serviceId =
    process.env
      .NEXT_PUBLIC_EMAILJS_SERVICE_ID;

  const templateId =
    process.env
      .NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

  const publicKey =
    process.env
      .NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  // ====================================================
  // SEND EMAIL
  // ====================================================

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSuccess(false);
    setError("");
    setWhatsappSuccess(false);

    if (!formRef.current) {
      setError(
        "Form is not available."
      );
      return;
    }

    // ==================================================
    // ENVIRONMENT CHECK
    // ==================================================

    if (!serviceId) {
      setError(
        "EmailJS Service ID is missing. Check .env.local."
      );
      return;
    }

    if (!templateId) {
      setError(
        "EmailJS Template ID is missing. Check .env.local."
      );
      return;
    }

    if (!publicKey) {
      setError(
        "EmailJS Public Key is missing. Check .env.local."
      );
      return;
    }

    // ==================================================
    // FORM DATA
    // ==================================================

    const formData =
      new FormData(formRef.current);

    const name = String(
      formData.get("name") || ""
    ).trim();

    const visitorEmail =
      String(
        formData.get("email") || ""
      ).trim();

    const subject =
      String(
        formData.get("subject") || ""
      ).trim();

    const message =
      String(
        formData.get("message") || ""
      ).trim();

    // ==================================================
    // VALIDATION
    // ==================================================

    if (
      !name ||
      !visitorEmail ||
      !subject ||
      !message
    ) {
      setError(
        "Please fill in all fields."
      );

      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(visitorEmail)) {
      setError(
        "Please enter a valid email address."
      );

      return;
    }

    // ==================================================
    // START SENDING
    // ==================================================

    setSending(true);

    try {
      const templateParams = {
        name,
        email: visitorEmail,
        subject,
        message,

        from_name: name,
        from_email: visitorEmail,
        reply_to: visitorEmail,

        to_email: myEmail,
      };

      console.log(
        "Sending EmailJS:",
        {
          serviceId,
          templateId,
          templateParams,
        }
      );

      const response =
        await emailjs.send(
          serviceId,
          templateId,
          templateParams,
          {
            publicKey,
          }
        );

      console.log(
        "EmailJS Success:",
        response
      );

      setSuccess(true);
      setError("");

      formRef.current.reset();

      setTimeout(() => {
        setSuccess(false);
      }, 6000);

    } catch (err: unknown) {
      console.error(
        "FULL EMAILJS ERROR:",
        err
      );

      if (
        typeof err === "object" &&
        err !== null
      ) {
        const emailJsError =
          err as {
            status?: number;
            text?: string;
            message?: string;
          };

        const status =
          emailJsError.status;

        const text =
          emailJsError.text;

        const messageText =
          emailJsError.message;

        if (status && text) {
          setError(
            `EmailJS Error ${status}: ${text}`
          );
        } else if (text) {
          setError(
            `EmailJS Error: ${text}`
          );
        } else if (messageText) {
          setError(
            `EmailJS Error: ${messageText}`
          );
        } else {
          setError(
            "EmailJS rejected the request. Check your Service ID, Template ID and Public Key."
          );
        }
      } else {
        setError(
          "Unable to send email. Please check your EmailJS configuration."
        );
      }

      setTimeout(() => {
        setError("");
      }, 10000);

    } finally {
      setSending(false);
    }
  }

  // ====================================================
  // WHATSAPP
  // ====================================================

  function handleWhatsApp() {
    if (!formRef.current) {
      return;
    }

    const formData =
      new FormData(formRef.current);

    const name =
      String(
        formData.get("name") || ""
      ).trim();

    const visitorEmail =
      String(
        formData.get("email") || ""
      ).trim();

    const subject =
      String(
        formData.get("subject") || ""
      ).trim();

    const message =
      String(
        formData.get("message") || ""
      ).trim();

    // ==================================================
    // VALIDATION
    // ==================================================

    if (
      !name ||
      !visitorEmail ||
      !subject ||
      !message
    ) {
      setError(
        "Please fill in all fields before sending via WhatsApp."
      );

      setTimeout(() => {
        setError("");
      }, 5000);

      return;
    }

    // ==================================================
    // WHATSAPP MESSAGE
    // ==================================================

    const whatsappMessage = `
Hello Farhan,

I would like to contact you regarding your portfolio.

Name: ${name}

Email: ${visitorEmail}

Subject: ${subject}

Message:
${message}

Thank you.
    `.trim();

    const whatsappURL =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`;

    window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer"
    );

    setWhatsappSuccess(true);

    formRef.current.reset();

    setTimeout(() => {
      setWhatsappSuccess(false);
    }, 5000);
  }

  // ====================================================
  // CONTACT ITEMS
  // ====================================================

  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: myEmail,
      href: `mailto:${myEmail}`,
    },

    {
      icon: Phone,
      label: "Phone",
      value: phone,
      href: `tel:${phone}`,
    },

    {
      icon: FaWhatsapp,
      label: "WhatsApp",
      value: "Chat with me",
      href: `https://wa.me/${whatsappNumber}`,
    },
  ];

  // ====================================================
  // UI
  // ====================================================

  return (
    <section
      id="contact"
      className="
        relative
        border-t
        border-white/[0.05]
        py-28
        sm:py-36
      "
    >
      <div className="container-custom">

        {/* =================================================
            HEADER / MAIN GRID
        ================================================== */}

        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">

          {/* =================================================
              LEFT SIDE
          ================================================== */}

          <motion.div
            variants={leftVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.2,
            }}
          >

            {/* SECTION LABEL */}

            <div className="flex items-center gap-3">

              <span className="h-px w-8 bg-[#39ff88]" />

              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#39ff88]">
                10 — Contact
              </p>

            </div>

            {/* HEADING */}

            <h2
              className="
                mt-5
                text-4xl
                font-bold
                leading-tight
                text-white
                sm:text-5xl
                lg:text-6xl
              "
            >
              Let&apos;s Build Something{" "}
              <span className="text-[#39ff88]">
                Great Together.
              </span>
            </h2>

            <p className="mt-6 max-w-lg leading-8 text-gray-500">
              Have a project, opportunity or idea?
              Feel free to get in touch. I&apos;d be
              happy to discuss it with you.
            </p>

            {/* =================================================
                TERMINAL STATUS CARD
            ================================================== */}

            <motion.div
              variants={itemVariants}
              className="
                mt-8
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.07]
                bg-[#111113]/60
                backdrop-blur-xl
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-2
                  border-b
                  border-white/[0.06]
                  px-4
                  py-3
                "
              >
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#39ff88]/70" />

                <span className="ml-2 font-mono text-[10px] text-gray-700">
                  contact.sh
                </span>
              </div>

              <div className="p-5 font-mono text-xs leading-7">

                <p className="text-gray-600">
                  <span className="text-[#39ff88]">
                    $
                  </span>{" "}
                  ./availability
                </p>

                <p className="text-gray-500">
                  status:{" "}
                  <span className="text-[#39ff88]">
                    available
                  </span>
                </p>

                <p className="text-gray-500">
                  response:{" "}
                  <span className="text-white">
                    usually within 24h
                  </span>
                </p>

              </div>

            </motion.div>

            {/* =================================================
                CONTACT DETAILS
            ================================================== */}

            <motion.div
              variants={itemVariants}
              className="mt-9 space-y-4"
            >

              {contactItems.map(
                (item) => {
                  const Icon =
                    item.icon;

                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      target={
                        item.label ===
                        "WhatsApp"
                          ? "_blank"
                          : undefined
                      }
                      rel={
                        item.label ===
                        "WhatsApp"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      whileHover={{
                        x: 5,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                      className="
                        group
                        flex
                        items-center
                        gap-4
                        rounded-2xl
                        border
                        border-transparent
                        p-3
                        text-gray-400
                        transition-all
                        duration-300
                        hover:border-white/[0.06]
                        hover:bg-white/[0.02]
                        hover:text-[#39ff88]
                      "
                    >

                      <div
                        className="
                          flex
                          h-11
                          w-11
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          border
                          border-white/[0.07]
                          bg-white/[0.02]
                          transition-all
                          duration-300
                          group-hover:border-[#39ff88]/30
                          group-hover:bg-[#39ff88]/5
                        "
                      >
                        <Icon size={19} />
                      </div>

                      <div className="min-w-0">

                        <p className="text-xs text-gray-700">
                          {item.label}
                        </p>

                        <p className="mt-1 truncate text-sm text-gray-400 transition-colors group-hover:text-white">
                          {item.value}
                        </p>

                      </div>

                      <ArrowUpRight
                        size={15}
                        className="
                          ml-auto
                          text-gray-700
                          transition-all
                          duration-300
                          group-hover:-translate-y-0.5
                          group-hover:translate-x-0.5
                          group-hover:text-[#39ff88]
                        "
                      />

                    </motion.a>
                  );
                }
              )}

              {/* LOCATION */}

              <motion.div
                whileHover={{
                  x: 5,
                }}
                className="
                  group
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-transparent
                  p-3
                  text-gray-400
                  transition-all
                  duration-300
                  hover:border-white/[0.06]
                  hover:bg-white/[0.02]
                "
              >

                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/[0.07]
                    bg-white/[0.02]
                    text-gray-500
                  "
                >
                  <MapPin size={19} />
                </div>

                <div>

                  <p className="text-xs text-gray-700">
                    Location
                  </p>

                  <p className="mt-1 text-sm text-gray-400">
                    Malappuram, Kerala, India
                  </p>

                </div>

              </motion.div>

            </motion.div>

            {/* =================================================
                SOCIAL LINKS
            ================================================== */}

            <motion.div
              variants={itemVariants}
              className="mt-8 flex gap-3"
            >

              {/* GITHUB */}

              <motion.a
                whileHover={{
                  y: -4,
                  scale: 1.05,
                }}
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.02]
                  text-gray-400
                  transition-all
                  duration-300
                  hover:border-[#39ff88]/40
                  hover:bg-[#39ff88]/5
                  hover:text-[#39ff88]
                "
              >
                <FaGithub size={19} />
              </motion.a>

              {/* LINKEDIN */}

              <motion.a
                whileHover={{
                  y: -4,
                  scale: 1.05,
                }}
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.02]
                  text-gray-400
                  transition-all
                  duration-300
                  hover:border-[#39ff88]/40
                  hover:bg-[#39ff88]/5
                  hover:text-[#39ff88]
                "
              >
                <FaLinkedinIn size={19} />
              </motion.a>

              {/* WHATSAPP */}

              <motion.a
                whileHover={{
                  y: -4,
                  scale: 1.05,
                }}
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.02]
                  text-gray-400
                  transition-all
                  duration-300
                  hover:border-[#39ff88]/40
                  hover:bg-[#39ff88]/5
                  hover:text-[#39ff88]
                "
              >
                <FaWhatsapp size={19} />
              </motion.a>

              {/* EMAIL */}

              <motion.a
                whileHover={{
                  y: -4,
                  scale: 1.05,
                }}
                href={`mailto:${myEmail}`}
                aria-label="Email"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.02]
                  text-gray-400
                  transition-all
                  duration-300
                  hover:border-[#39ff88]/40
                  hover:bg-[#39ff88]/5
                  hover:text-[#39ff88]
                "
              >
                <Mail size={19} />
              </motion.a>

            </motion.div>

          </motion.div>

          {/* =================================================
              RIGHT SIDE — FORM
          ================================================== */}

          <motion.div
            variants={rightVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.15,
            }}
            className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-white/[0.08]
              bg-[#111113]/65
              p-6
              backdrop-blur-xl
              sm:p-8
            "
          >

            {/* CARD GLOW */}

            <div
              className="
                pointer-events-none
                absolute
                -right-32
                -top-32
                h-72
                w-72
                rounded-full
                bg-[#39ff88]/[0.045]
                blur-[100px]
              "
            />

            <div className="relative">

              {/* =================================================
                  FORM HEADER
              ================================================== */}

              <div className="mb-7">

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-[#39ff88]/20
                      bg-[#39ff88]/5
                      text-[#39ff88]
                    "
                  >
                    <Terminal size={19} />
                  </div>

                  <div>

                    <p className="font-semibold text-white">
                      Send a message
                    </p>

                    <p className="font-mono text-xs text-gray-700">
                      contact.form()
                    </p>

                  </div>

                </div>

              </div>

              {/* =================================================
                  SUCCESS
              ================================================== */}

              {success && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="
                    mb-6
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-[#39ff88]/20
                    bg-[#39ff88]/10
                    p-4
                    text-sm
                    text-[#39ff88]
                  "
                  role="status"
                >
                  <CheckCircle2 size={18} />

                  <span>
                    Your message has been sent successfully!
                  </span>
                </motion.div>
              )}

              {/* =================================================
                  ERROR
              ================================================== */}

              {error && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="
                    mb-6
                    flex
                    items-start
                    gap-3
                    rounded-2xl
                    border
                    border-red-500/20
                    bg-red-500/10
                    p-4
                    text-sm
                    text-red-400
                  "
                  role="alert"
                >
                  <AlertCircle
                    size={20}
                    className="mt-0.5 shrink-0"
                  />

                  <span className="break-words">
                    {error}
                  </span>
                </motion.div>
              )}

              {/* =================================================
                  WHATSAPP SUCCESS
              ================================================== */}

              {whatsappSuccess && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="
                    mb-6
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    border-[#39ff88]/20
                    bg-[#39ff88]/10
                    p-4
                    text-sm
                    text-[#39ff88]
                  "
                  role="status"
                >
                  <FaWhatsapp size={18} />

                  <span>
                    WhatsApp opened with your message!
                  </span>
                </motion.div>
              )}

              {/* =================================================
                  FORM
              ================================================== */}

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* NAME + EMAIL */}

                <div className="grid gap-5 sm:grid-cols-2">

                  {/* NAME */}

                  <div>

                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm text-gray-400"
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      disabled={sending}
                      className="
                        w-full
                        rounded-xl
                        border
                        border-white/[0.08]
                        bg-black/30
                        px-4
                        py-3.5
                        text-sm
                        text-white
                        outline-none
                        transition-all
                        duration-300
                        placeholder:text-gray-700
                        focus:border-[#39ff88]/50
                        focus:bg-[#39ff88]/[0.02]
                        focus:ring-1
                        focus:ring-[#39ff88]/20
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                    />

                  </div>

                  {/* EMAIL */}

                  <div>

                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm text-gray-400"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                      disabled={sending}
                      className="
                        w-full
                        rounded-xl
                        border
                        border-white/[0.08]
                        bg-black/30
                        px-4
                        py-3.5
                        text-sm
                        text-white
                        outline-none
                        transition-all
                        duration-300
                        placeholder:text-gray-700
                        focus:border-[#39ff88]/50
                        focus:bg-[#39ff88]/[0.02]
                        focus:ring-1
                        focus:ring-[#39ff88]/20
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                    />

                  </div>

                </div>

                {/* SUBJECT */}

                <div>

                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm text-gray-400"
                  >
                    Subject
                  </label>

                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    placeholder="Project / Opportunity"
                    disabled={sending}
                    className="
                      w-full
                      rounded-xl
                      border
                      border-white/[0.08]
                      bg-black/30
                      px-4
                      py-3.5
                      text-sm
                      text-white
                      outline-none
                      transition-all
                      duration-300
                      placeholder:text-gray-700
                      focus:border-[#39ff88]/50
                      focus:bg-[#39ff88]/[0.02]
                      focus:ring-1
                      focus:ring-[#39ff88]/20
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  />

                </div>

                {/* MESSAGE */}

                <div>

                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm text-gray-400"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell me about your project..."
                    disabled={sending}
                    className="
                      w-full
                      resize-none
                      rounded-xl
                      border
                      border-white/[0.08]
                      bg-black/30
                      px-4
                      py-3.5
                      text-sm
                      text-white
                      outline-none
                      transition-all
                      duration-300
                      placeholder:text-gray-700
                      focus:border-[#39ff88]/50
                      focus:bg-[#39ff88]/[0.02]
                      focus:ring-1
                      focus:ring-[#39ff88]/20
                      disabled:cursor-not-allowed
                      disabled:opacity-60
                    "
                  />

                </div>

                {/* EMAIL BUTTON */}

                <motion.button
                  whileHover={{
                    scale: 1.01,
                  }}
                  whileTap={{
                    scale: 0.99,
                  }}
                  type="submit"
                  disabled={sending}
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#39ff88]
                    px-6
                    py-4
                    font-semibold
                    text-black
                    transition-all
                    duration-300
                    hover:shadow-[0_0_35px_rgba(57,255,136,0.2)]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >

                  {sending ? (
                    <>
                      <Loader2
                        size={19}
                        className="animate-spin"
                      />

                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={19} />

                      Send via Email
                    </>
                  )}

                </motion.button>

                {/* WHATSAPP BUTTON */}

                <motion.button
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.99,
                  }}
                  type="button"
                  onClick={handleWhatsApp}
                  disabled={sending}
                  className="
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-white/[0.08]
                    bg-white/[0.03]
                    px-6
                    py-4
                    font-semibold
                    text-gray-300
                    transition-all
                    duration-300
                    hover:border-[#39ff88]/30
                    hover:bg-[#39ff88]/5
                    hover:text-[#39ff88]
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >

                  <FaWhatsapp size={19} />

                  Send via WhatsApp

                </motion.button>

              </form>

              {/* =================================================
                  FORM FOOTER
              ================================================== */}

              <div
                className="
                  mt-6
                  flex
                  items-center
                  justify-center
                  gap-2
                  text-center
                  text-xs
                  text-gray-700
                "
              >
                <MessageCircle size={14} />

                <span>
                  Your message will be sent directly to my email.
                </span>
              </div>

            </div>

            {/* BOTTOM LINE */}

            <div
              className="
                absolute
                bottom-0
                left-0
                h-px
                w-full
                bg-gradient-to-r
                from-transparent
                via-[#39ff88]/40
                to-transparent
              "
            />

          </motion.div>

        </div>

        {/* =================================================
            FOOTER LABEL
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
            mt-12
            flex
            items-center
            justify-center
            gap-3
            font-mono
            text-xs
            text-gray-700
          "
        >
          <span className="text-[#39ff88]/50">
            {"<contact />"}
          </span>

          <span>
            Let&apos;s create something meaningful.
          </span>

          <span className="text-[#39ff88]/50">
            {"</>"}
          </span>
        </motion.div>

      </div>
    </section>
  );
}