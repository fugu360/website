import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const languagesByLang = {
  de: [
    { name: "Deutsch", level: "Mündlich und schriftlich: sehr gut (Muttersprache)" },
    { name: "Englisch", level: "Mündlich und schriftlich: sehr gut (Niveau B2, ohne Diplom)" },
    { name: "Französisch", level: "Mündlich und schriftlich: sehr gut (Niveau B2, ohne Diplom)" },
    { name: "Niederländisch", level: "Gutes mündliches Verständnis" },
  ],
  en: [
    { name: "German", level: "Native (spoken and written)" },
    { name: "English", level: "Fluent (spoken and written, B2 level, no certificate)" },
    { name: "French", level: "Fluent (spoken and written, B2 level, no certificate)" },
    { name: "Dutch", level: "Good spoken comprehension" },
  ],
};

const SkillsSection = () => {
  const { lang } = useLanguage();
  const text =
    lang === "en"
      ? {
          eyebrow: "Languages",
          title: "Language skills",
          subtitle: "Languages and proficiency at a glance.",
        }
      : {
          eyebrow: "Sprachen",
          title: "Sprachkenntnisse",
          subtitle: "Sprachen und Kompetenzniveau im Überblick.",
        };
  const languages = languagesByLang[lang];

  return (
    <section id="skills" className="bg-secondary/50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Zap size={20} className="text-accent" />
            <p className="text-accent font-medium text-sm tracking-widest uppercase">
              {text.eyebrow}
            </p>
          </div>
          <h2 className="section-title">
            <span className="gold-underline">{text.title}</span>
          </h2>
          <p className="section-subtitle">{text.subtitle}</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {languages.map((language, i) => (
            <motion.div
              key={language.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-card rounded-xl border border-border p-6"
            >
              <h3 className="font-semibold text-foreground mb-2">{language.name}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{language.level}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
