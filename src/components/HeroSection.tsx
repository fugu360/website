import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const HeroSection = () => {
  const { lang } = useLanguage();
  const copy = {
    de: {
      label: "Portfolio",
      subtitle: "Masterstudent Financial Management · Universität Bern",
      contact: "Kontakt",
      about: "Über mich",
    },
    en: {
      label: "Portfolio",
      subtitle: "MSc Financial Management student · University of Bern",
      contact: "Contact",
      about: "About",
    },
  };
  const text = copy[lang];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: "radial-gradient(circle at 1px 1px, hsl(210 40% 98% / 0.3) 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }} />

      <div className="relative z-10 section-container text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-accent font-medium tracking-widest uppercase text-sm mb-6"
        >
          {text.label}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-display text-5xl md:text-7xl font-bold text-primary-foreground leading-tight mb-6"
        >
          Benjamin Oehrli
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-primary-foreground/70 text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          {text.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-accent text-accent-foreground font-semibold text-sm hover:brightness-110 transition-all"
          >
            {text.contact}
          </a>
          <a
            href="#about"
            className="inline-flex items-center px-6 py-3 rounded-lg border border-primary-foreground/20 text-primary-foreground font-semibold text-sm hover:bg-primary-foreground/10 transition-all"
          >
            {text.about}
          </a>
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors"
        >
          <ArrowDown className="animate-bounce" size={24} />
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
