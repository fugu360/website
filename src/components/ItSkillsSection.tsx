import { motion } from "framer-motion";
import { Laptop } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const itSkillsByLang = {
  de: [
    { name: "MS Excel", level: "Sehr gut" },
    { name: "Python", level: "Sehr gut" },
    { name: "R", level: "Sehr gut" },
    { name: "SAP", level: "Gut" },
    { name: "Git", level: "Gut" },
  ],
  en: [
    { name: "MS Excel", level: "Very good" },
    { name: "Python", level: "Very good" },
    { name: "R", level: "Very good" },
    { name: "SAP", level: "Good" },
    { name: "Git", level: "Good" },
  ],
};

const ItSkillsSection = () => {
  const { lang } = useLanguage();
  const text =
    lang === "en"
      ? {
          eyebrow: "IT Skills",
          title: "IT Skills",
          subtitle: "Technical tools at a glance",
        }
      : {
          eyebrow: "IT-Kenntnisse",
          title: "IT-Kenntnisse",
          subtitle: "Fachliche Tools im Überblick",
        };
  const itSkills = itSkillsByLang[lang];

  return (
    <section id="it-skills">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Laptop size={20} className="text-accent" />
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
          {itSkills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card rounded-xl border border-border p-6"
            >
              <h3 className="font-semibold text-foreground text-lg">{skill.name}</h3>
              <p className="text-muted-foreground text-sm mt-2">{skill.level}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ItSkillsSection;
