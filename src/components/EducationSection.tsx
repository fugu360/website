import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const educationByLang = {
  de: [
    {
      degree: "Master of Science in Financial Management",
      institution: "Universität Bern",
      period: "2024 – 2026",
      details: "Schwerpunkt Financial Management.",
      diplomaLabel: "Aktuelles Notenblatt",
      diplomaUrl: "/assets/Zeugnisse/2026-03-01_12.43.43_Studienblatt.pdf",
    },
    {
      degree: "Bachelor of Science in Business Administration und Data Science",
      institution: "Universität Bern",
      period: "2020 – 2024",
      details: "Studium an der Wirtschaftswissenschaftlichen Fakultät.",
      diplomaLabel: "Bachelordiplom",
      diplomaUrl: "/assets/Zeugnisse/Bachelordiplom.pdf",
    },
    {
      degree: "Gymnasium mit Schwerpunkt Wirtschaft & Recht",
      institution: "Gymnasium",
      period: "2016 – 2020",
      details: "Schulische Ausbildung mit Fokus auf Wirtschaft und Recht.",
    },
  ],
  en: [
    {
      degree: "Master of Science in Financial Management",
      institution: "University of Bern",
      period: "2024 – 2026",
      details: "Focus on financial management.",
      diplomaLabel: "Current transcript",
      diplomaUrl: "/assets/Zeugnisse/2026-03-01_12.43.47_Studienblatt_English.pdf",
    },
    {
      degree: "Bachelor of Science in Business Administration and Data Science",
      institution: "University of Bern",
      period: "2020 – 2024",
      details: "Studies at the School of Business, Economics and Social Sciences.",
      diplomaLabel: "Bachelor diploma",
      diplomaUrl: "/assets/Zeugnisse/Bachelordiplom.pdf",
    },
    {
      degree: "High school with a focus on Economics & Law",
      institution: "High School",
      period: "2016 – 2020",
      details: "Secondary education with a focus on economics and law.",
    },
  ],
};

const EducationSection = () => {
  const { lang } = useLanguage();
  const text =
    lang === "en"
      ? {
          eyebrow: "Education",
          title: "Academic background",
          subtitle: "Degrees and certifications",
        }
      : {
          eyebrow: "Ausbildung",
          title: "Akademischer Hintergrund",
          subtitle: "Meine Studienabschlüsse",
        };
  const education = educationByLang[lang];

  return (
    <section id="education" className="bg-secondary/50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap size={20} className="text-accent" />
            <p className="text-accent font-medium text-sm tracking-widest uppercase">
              {text.eyebrow}
            </p>
          </div>
          <h2 className="section-title">
            <span className="gold-underline">{text.title}</span>
          </h2>
          <p className="section-subtitle">{text.subtitle}</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-10">
            {education.map((edu, i) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-12 md:pl-16"
              >
                <div className="absolute left-2.5 md:left-4.5 top-1.5 w-3 h-3 rounded-full bg-accent border-2 border-background" />

                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                      <p className="text-muted-foreground text-sm">{edu.institution}</p>
                    </div>
                    <span className="text-accent text-sm font-medium mt-1 md:mt-0">{edu.period}</span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{edu.details}</p>
                  {edu.diplomaUrl && edu.diplomaLabel && (
                    <a
                      href={edu.diplomaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-sm font-medium text-accent hover:underline"
                    >
                      {edu.diplomaLabel}
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
