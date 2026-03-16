import { motion } from "framer-motion";
import { BarChart2, Laptop, Languages } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

// ─── Data ────────────────────────────────────────────────────────────────────

const itSkills = [
  { name: "MS Excel", level: 5 },
  { name: "Python",   level: 4 },
  { name: "R",        level: 4 },
  { name: "SAP",      level: 3 },
  { name: "Git",      level: 3 },
];

const languagesByLang = {
  de: [
    { name: "Deutsch",        desc: "Muttersprache",         level: 5 },
    { name: "Englisch",       desc: "Sehr gut · B2",         level: 4 },
    { name: "Französisch",    desc: "Sehr gut · B2",         level: 4 },
    { name: "Niederländisch", desc: "Gutes Hörverständnis",  level: 2 },
  ],
  en: [
    { name: "German",  desc: "Native",             level: 5 },
    { name: "English", desc: "Fluent · B2",        level: 4 },
    { name: "French",  desc: "Fluent · B2",        level: 4 },
    { name: "Dutch",   desc: "Good comprehension", level: 2 },
  ],
};

// ─── Proficiency dots ─────────────────────────────────────────────────────────

const Dots = ({ level }: { level: number }) => (
  <div className="flex gap-1.5 shrink-0">
    {Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`h-2 w-2 rounded-full transition-colors ${
          i < level ? "bg-accent" : "bg-border"
        }`}
      />
    ))}
  </div>
);

// ─── Component ───────────────────────────────────────────────────────────────

const SkillsSection = () => {
  const { lang } = useLanguage();
  const text =
    lang === "en"
      ? {
          eyebrow: "Skills",
          title: "Competencies",
          subtitle: "IT tools and languages at a glance",
          itTitle: "IT Tools",
          langTitle: "Languages",
        }
      : {
          eyebrow: "Kompetenzen",
          title: "Kompetenzen",
          subtitle: "IT-Tools und Sprachen im Überblick",
          itTitle: "IT-Tools",
          langTitle: "Sprachen",
        };

  const languages = languagesByLang[lang];

  return (
    <section id="skills" className="bg-secondary/50">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <BarChart2 size={20} className="text-accent" />
            <p className="text-accent font-medium text-sm tracking-widest uppercase">
              {text.eyebrow}
            </p>
          </div>
          <h2 className="section-title">
            <span className="gold-underline">{text.title}</span>
          </h2>
          <p className="section-subtitle">{text.subtitle}</p>
        </motion.div>

        {/* Two-column grid */}
        <div className="grid gap-10 md:grid-cols-2">
          {/* IT Tools */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <Laptop size={14} />
              {text.itTitle}
            </h3>
            <div className="space-y-2">
              {itSkills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3"
                >
                  <span className="text-sm font-medium text-foreground">{skill.name}</span>
                  <Dots level={skill.level} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Languages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              <Languages size={14} />
              {text.langTitle}
            </h3>
            <div className="space-y-2">
              {languages.map((language, i) => (
                <motion.div
                  key={language.name}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3"
                >
                  <div>
                    <span className="text-sm font-medium text-foreground">{language.name}</span>
                    <p className="mt-0.5 text-xs text-muted-foreground">{language.desc}</p>
                  </div>
                  <Dots level={language.level} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
