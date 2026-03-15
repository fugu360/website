import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { ArrowUp } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { baseKeywords, setSeo } from "@/lib/seo";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    setSeo({
      title: "Benjamin Oehrli - Portfolio",
      description:
        "Portfolio von Benjamin Oehrli, Masterstudent Financial Management. Projekte in Finance, Operations Research und Python.",
      keywords: baseKeywords,
      canonical: "https://www.benjamin-oehrli.ch/",
      ogUrl: "https://www.benjamin-oehrli.ch/",
    });
  }, []);

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const targetId = location.hash.replace("#", "");
    const target = document.getElementById(targetId);
    if (!target) {
      return;
    }

    const preferAuto = Boolean((location.state as { noSmooth?: boolean } | null)?.noSmooth);
    if (!preferAuto) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlBehavior = html.style.scrollBehavior;
    const previousBodyBehavior = body.style.scrollBehavior;

    html.style.scrollBehavior = "auto";
    body.style.scrollBehavior = "auto";
    target.scrollIntoView({ behavior: "auto", block: "start" });

    const restoreId = window.setTimeout(() => {
      html.style.scrollBehavior = previousHtmlBehavior;
      body.style.scrollBehavior = previousBodyBehavior;
    }, 0);

    return () => {
      window.clearTimeout(restoreId);
      html.style.scrollBehavior = previousHtmlBehavior;
      body.style.scrollBehavior = previousBodyBehavior;
    };
  }, [location.hash, location.state]);

  return (
    <div id="top" className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
      <a
        href="#top"
        aria-label="Zurueck nach oben"
        className="fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-[0_12px_28px_-16px_hsl(var(--accent)/0.9)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_32px_-18px_hsl(var(--accent)/0.95)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <ArrowUp size={20} />
      </a>
    </div>
  );
};

export default Index;
