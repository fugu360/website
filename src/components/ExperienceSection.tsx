import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

type Experience = {
  role: string;
  company: string;
  logoSrc?: string;
  logoAlt?: string;
  period: string;
  tasks: string[];
  certificateLabel?: string;
  certificateUrl?: string;
};

const experiencesByLang: Record<"de" | "en", Experience[]> = {
  de: [
    {
      role: "Hilfsassistent",
      company: "Universität Bern",
      logoSrc: "/assets/logos/university_of_bern_logo.jpg",
      logoAlt: "Universität Bern Logo",
      period: "Seit August 2023",
      tasks: [
        "Unterstützung des internen Kontrollsystems",
        "Erstellung und Durchführung von Finanz- und Budgetplanungen",
      ],
    },
    {
      role: "Zivildienst",
      company: "IGS",
      logoSrc: "/assets/logos/igs.jfif",
      logoAlt: "IGS Logo",
      period: "Juni – August 2025",
      tasks: [
        "Prozess- und Organisationssupport (QMS, Datenstruktur, Prozessdarstellungen)",
        "Administrative Projektunterstützung (Protokolle, Versand, Statistiken, Rechnungswesen)",
      ],
      certificateLabel: "Arbeitszeugnis IGS",
      certificateUrl: "/assets/Zeugnisse/Arbeitszeugnis igs.pdf",
    },
    {
      role: "Kassierer",
      company: "Migros Brügg",
      logoSrc: "/assets/logos/genossenschaft_migros_aare_logo.jpg",
      logoAlt: "Genossenschaft Migros Aare Logo",
      period: "April – September 2021",
      tasks: [
        "Kundenservice und Kassenabwicklung",
        "Sorgfalt im Umgang mit Geld und Abrechnungen",
      ],
      certificateLabel: "Arbeitszeugnis Migros",
      certificateUrl: "/assets/Zeugnisse/Arbeitsuzegnis Migros.pdf",
    },
  ],
  en: [
    {
      role: "Teaching Assistant",
      company: "University of Bern",
      logoSrc: "/assets/logos/university_of_bern_logo.jpg",
      logoAlt: "University of Bern logo",
      period: "Since Aug 2023",
      tasks: [
        "Support for the internal control system",
        "Preparation and execution of financial and budget planning",
      ],
    },
    {
      role: "Civilian Service",
      company: "IGS",
      logoSrc: "/assets/logos/igs.jfif",
      logoAlt: "IGS logo",
      period: "June – August 2025",
      tasks: [
        "Process and organizational support (QMS, data structure, process mapping)",
        "Administrative project support (minutes, dispatch, statistics, accounting)",
      ],
      certificateLabel: "IGS work reference",
      certificateUrl: "/assets/Zeugnisse/Arbeitszeugnis_IGS_English.pdf",
    },
    {
      role: "Cashier",
      company: "Migros Brügg",
      logoSrc: "/assets/logos/genossenschaft_migros_aare_logo.jpg",
      logoAlt: "Genossenschaft Migros Aare logo",
      period: "Apr – Sep 2021",
      tasks: [
        "Customer service and checkout operations",
        "Careful handling of cash and reconciliations",
      ],
      certificateLabel: "Migros work reference",
      certificateUrl: "/assets/Zeugnisse/Arbeitszeugnis_Migros_English.pdf",
    },
  ],
};

const ExperienceSection = () => {
  const { lang } = useLanguage();
  const text =
    lang === "en"
      ? {
          eyebrow: "Experience",
          title: "Career journey",
          subtitle: "Highlights of my professional path",
        }
      : {
          eyebrow: "Berufserfahrung",
          title: "Mein Werdegang",
          subtitle: "Stationen meiner beruflichen Laufbahn",
        };
  const experiences = experiencesByLang[lang];

  return (
    <section id="experience">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Briefcase size={20} className="text-accent" />
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
          {/* Timeline line */}
          <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-12 md:pl-16"
              >
                {/* Dot */}
                <div className="absolute left-2.5 md:left-4.5 top-1.5 w-3 h-3 rounded-full bg-accent border-2 border-background" />

                <div className="bg-card rounded-xl border border-border p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 flex items-center justify-center">
                        {exp.logoSrc ? (
                          <img src={exp.logoSrc} alt={exp.logoAlt ?? `${exp.company} logo`} className="h-full w-full object-contain" />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-secondary text-foreground text-xs font-semibold flex items-center justify-center border border-border">
                            {exp.company.slice(0, 3).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{exp.role}</h3>
                        <p className="text-muted-foreground text-sm">{exp.company}</p>
                      </div>
                    </div>
                    <span className="text-accent text-sm font-medium md:mt-0">{exp.period}</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-1.5 marker:text-accent">
                    {exp.tasks.map((task, j) => (
                      <li key={j} className="text-muted-foreground text-sm">
                        {task}
                      </li>
                    ))}
                  </ul>
                  {exp.certificateUrl && exp.certificateLabel && (
                    <a
                      href={exp.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-sm font-medium text-accent hover:underline"
                    >
                      {exp.certificateLabel}
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

export default ExperienceSection;
