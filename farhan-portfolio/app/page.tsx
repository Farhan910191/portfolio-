import DeveloperBackground from "@/components/effects/DeveloperBackground";

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
  return (
    <main className="relative min-h-screen bg-[#050505] text-white">
      {/* ONLY PAGE-WIDE BACKGROUND */}
      <DeveloperBackground />

      {/* CONTENT */}
      <div className="relative z-10">
        <Navbar />

        <Hero />

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
  );
}