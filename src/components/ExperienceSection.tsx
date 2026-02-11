import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
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
    role: "Kassierer",
    company: "Migros Brügg",
    logoSrc: "/assets/logos/genossenschaft_migros_aare_logo.jpg",
    logoAlt: "Genossenschaft Migros Aare Logo",
    period: "April – September 2021",
    tasks: [
      "Kundenservice und Kassenabwicklung",
      "Sorgfalt im Umgang mit Geld und Abrechnungen",
    ],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="bg-secondary/50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Briefcase size={20} className="text-accent" />
            <p className="text-accent font-medium text-sm tracking-widest uppercase">Berufserfahrung</p>
          </div>
          <h2 className="section-title">
            <span className="gold-underline">Mein Werdegang</span>
          </h2>
          <p className="section-subtitle">Stationen meiner beruflichen Laufbahn.</p>
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
                        <img src={exp.logoSrc} alt={exp.logoAlt} className="h-full w-full object-contain" />
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
