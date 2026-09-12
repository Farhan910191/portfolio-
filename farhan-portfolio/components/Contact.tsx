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
} from "lucide-react";

import { FormEvent, useRef, useState } from "react";

import {
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

import emailjs from "@emailjs/browser";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [whatsappSuccess, setWhatsappSuccess] = useState(false);

  // =====================================================
  // YOUR DETAILS
  // =====================================================

  const myEmail = "farhanmohammedfarhan7@gmail.com";

  const phone = "+919526910191";

  const whatsappNumber = "919526910191";

  const github =
    "https://github.com/Farhan910191";

  const linkedin =
    "https://www.linkedin.com/in/mohammed-farhan-kk";

  // =====================================================
  // EMAILJS CONFIGURATION
  // =====================================================

  const serviceId =
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;

  const templateId =
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

  const publicKey =
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  // =====================================================
  // SEND EMAIL
  // =====================================================

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSuccess(false);
    setError("");
    setWhatsappSuccess(false);

    if (!formRef.current) {
      setError("Form is not available.");
      return;
    }

    // ===================================================
    // CHECK ENVIRONMENT VARIABLES
    // ===================================================

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

    // ===================================================
    // GET FORM DATA
    // ===================================================

    const formData = new FormData(
      formRef.current
    );

    const name = String(
      formData.get("name") || ""
    ).trim();

    const visitorEmail = String(
      formData.get("email") || ""
    ).trim();

    const subject = String(
      formData.get("subject") || ""
    ).trim();

    const message = String(
      formData.get("message") || ""
    ).trim();

    // ===================================================
    // VALIDATION
    // ===================================================

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

    // ===================================================
    // EMAIL VALIDATION
    // ===================================================

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(visitorEmail)) {
      setError(
        "Please enter a valid email address."
      );

      return;
    }

    // ===================================================
    // START SENDING
    // ===================================================

    setSending(true);

    try {
      // =================================================
      // EMAILJS PARAMETERS
      // =================================================

      const templateParams = {
        name: name,
        email: visitorEmail,
        subject: subject,
        message: message,

        // Additional common EmailJS variable names
        from_name: name,
        from_email: visitorEmail,
        reply_to: visitorEmail,

        to_email:
          myEmail,
      };

      console.log(
        "Sending EmailJS:",
        {
          serviceId,
          templateId,
          templateParams,
        }
      );

      // =================================================
      // SEND EMAIL
      // =================================================

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

      // =================================================
      // SUCCESS
      // =================================================

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

      // ===============================================
      // SHOW REAL ERROR
      // ===============================================

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

  // =====================================================
  // WHATSAPP
  // =====================================================

  function handleWhatsApp() {
    if (!formRef.current) {
      return;
    }

    const formData = new FormData(
      formRef.current
    );

    const name = String(
      formData.get("name") || ""
    ).trim();

    const visitorEmail = String(
      formData.get("email") || ""
    ).trim();

    const subject = String(
      formData.get("subject") || ""
    ).trim();

    const message = String(
      formData.get("message") || ""
    ).trim();

    // ===================================================
    // VALIDATION
    // ===================================================

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

    // ===================================================
    // WHATSAPP MESSAGE
    // ===================================================

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

  // =====================================================
  // UI
  // =====================================================

  return (
    <section
      id="contact"
      className="border-t border-white/[0.05] py-28 sm:py-36"
    >
      <div className="container-custom">

        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">

          {/* =================================================
              LEFT SIDE
          ================================================= */}

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#39ff88]">
              10 — Contact
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight text-white sm:text-5xl">
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

            {/* CONTACT DETAILS */}

            <div className="mt-10 space-y-5">

              {/* EMAIL */}

              <a
                href={`mailto:${myEmail}`}
                className="flex items-center gap-4 text-gray-400 transition-colors duration-300 hover:text-[#39ff88]"
              >
                <Mail size={20} />

                <span>
                  {myEmail}
                </span>
              </a>

              {/* PHONE */}

              <a
                href={`tel:${phone}`}
                className="flex items-center gap-4 text-gray-400 transition-colors duration-300 hover:text-[#39ff88]"
              >
                <Phone size={20} />

                <span>
                  {phone}
                </span>
              </a>

              {/* WHATSAPP */}

              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 text-gray-400 transition-colors duration-300 hover:text-[#39ff88]"
              >
                <FaWhatsapp size={20} />

                <span>
                  WhatsApp
                </span>
              </a>

              {/* LOCATION */}

              <div className="flex items-center gap-4 text-gray-400">

                <MapPin size={20} />

                <span>
                  Malappuram, Kerala, India
                </span>

              </div>

            </div>

            {/* SOCIAL LINKS */}

            <div className="mt-10 flex gap-3">

              {/* GITHUB */}

              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all duration-300 hover:border-[#39ff88]/40 hover:text-[#39ff88]"
              >
                <FaGithub size={19} />
              </a>

              {/* LINKEDIN */}

              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all duration-300 hover:border-[#39ff88]/40 hover:text-[#39ff88]"
              >
                <FaLinkedinIn size={19} />
              </a>

              {/* WHATSAPP */}

              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all duration-300 hover:border-[#39ff88]/40 hover:text-[#39ff88]"
              >
                <FaWhatsapp size={19} />
              </a>

              {/* EMAIL */}

              <a
                href={`mailto:${myEmail}`}
                aria-label="Email"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all duration-300 hover:border-[#39ff88]/40 hover:text-[#39ff88]"
              >
                <Mail size={19} />
              </a>

            </div>

          </div>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div className="rounded-3xl border border-white/[0.08] bg-[#111113] p-6 sm:p-8">

            {/* SUCCESS MESSAGE */}

            {success && (
              <div
                role="status"
                className="mb-6 flex items-center gap-3 rounded-2xl border border-[#39ff88]/20 bg-[#39ff88]/10 p-4 text-sm text-[#39ff88]"
              >
                <CheckCircle2 size={18} />

                <span>
                  Your message has been sent successfully!
                </span>
              </div>
            )}

            {/* ERROR MESSAGE */}

            {error && (
              <div
                role="alert"
                className="mb-6 flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400"
              >
                <AlertCircle
                  size={20}
                  className="mt-0.5 shrink-0"
                />

                <span className="break-words">
                  {error}
                </span>
              </div>
            )}

            {/* WHATSAPP SUCCESS */}

            {whatsappSuccess && (
              <div
                role="status"
                className="mb-6 flex items-center gap-3 rounded-2xl border border-[#39ff88]/20 bg-[#39ff88]/10 p-4 text-sm text-[#39ff88]"
              >
                <FaWhatsapp size={18} />

                <span>
                  WhatsApp opened with your message!
                </span>
              </div>
            )}

            {/* FORM */}

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
                    className="w-full rounded-xl border border-white/[0.08] bg-black/30 px-4 py-3.5 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-700 focus:border-[#39ff88]/50 focus:ring-1 focus:ring-[#39ff88]/20 disabled:cursor-not-allowed disabled:opacity-60"
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
                    className="w-full rounded-xl border border-white/[0.08] bg-black/30 px-4 py-3.5 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-700 focus:border-[#39ff88]/50 focus:ring-1 focus:ring-[#39ff88]/20 disabled:cursor-not-allowed disabled:opacity-60"
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
                  className="w-full rounded-xl border border-white/[0.08] bg-black/30 px-4 py-3.5 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-700 focus:border-[#39ff88]/50 focus:ring-1 focus:ring-[#39ff88]/20 disabled:cursor-not-allowed disabled:opacity-60"
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
                  className="w-full resize-none rounded-xl border border-white/[0.08] bg-black/30 px-4 py-3.5 text-sm text-white outline-none transition-all duration-300 placeholder:text-gray-700 focus:border-[#39ff88]/50 focus:ring-1 focus:ring-[#39ff88]/20 disabled:cursor-not-allowed disabled:opacity-60"
                />

              </div>

              {/* EMAIL BUTTON */}

              <button
                type="submit"
                disabled={sending}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#39ff88] px-6 py-4 font-semibold text-black transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(57,255,136,0.2)] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
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

              </button>

              {/* WHATSAPP BUTTON */}

              <button
                type="button"
                onClick={handleWhatsApp}
                disabled={sending}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-6 py-4 font-semibold text-gray-300 transition-all duration-300 hover:border-[#39ff88]/30 hover:text-[#39ff88] disabled:cursor-not-allowed disabled:opacity-60"
              >

                <FaWhatsapp size={19} />

                Send via WhatsApp

              </button>

            </form>

            {/* FOOTER */}

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-700">

              <MessageCircle size={14} />

              <span>
                Your message will be sent directly to my email.
              </span>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}