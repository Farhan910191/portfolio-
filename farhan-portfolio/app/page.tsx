"use client";

import { useEffect, useState } from "react";
import DeveloperBackground from "@/components/effects/DeveloperBackground";
import WelcomeScreen from "@/components/ui/WelcomeScreen";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Certificates from "@/components/Certificates";
import Services from "@/components/Services";
import Github from "@/components/Github";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="relative min-h-screen bg-[var(--background-deep)] text-[var(--foreground)]">
        <DeveloperBackground />
      </main>
    );
  }

  return (
    <>
      {/* 1. SEAMLESS UNIFIED PORTFOLIO BACKGROUND (Checkered Grid + Passing Stars) */}
      <DeveloperBackground />

      {/* 2. CINEMATIC WELCOME SCREEN OVERLAY */}
      {showWelcome && (
        <WelcomeScreen onComplete={() => setShowWelcome(false)} />
      )}

      {/* 3. MAIN PORTFOLIO CONTENT */}
      <main className="relative min-h-screen text-[var(--foreground)]">
        {/* CONTENT */}
        <div className="relative z-10">
          <Navbar />

          <Hero isReady={!showWelcome} />

        <About />

        <Skills />

        <Projects />

        <Experience />

        <Education />

        <Certificates />

        <Services />

        <Github />

        <Testimonials />

        <Contact />

        <Footer />
      </div>
    </main>
    </>
  );
}