import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const education = [
  {
    degree: "Master of Science in Financial Management",
    institution: "Universität Bern",
    period: "Seit 2024",
    details: "Schwerpunkt Financial Management.",
  },
  {
    degree: "Bachelor of Science in Business Administration und Data Science",
    institution: "Universität Bern",
    period: "2020 – 2024",
    details: "Studium an der Wirtschaftswissenschaftlichen Fakultät.",
  },
  {
    degree: "Gymnasium mit Schwerpunkt Wirtschaft & Recht",
    institution: "Gymnasium",
    period: "2016 – 2020",
    details: "Schulische Ausbildung mit Fokus auf Wirtschaft und Recht.",
  },
];

const EducationSection = () => {
  return (
    <section id="education">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <GraduationCap size={20} className="text-accent" />
            <p className="text-accent font-medium text-sm tracking-widest uppercase">Ausbildung</p>
          </div>
          <h2 className="section-title">
            <span className="gold-underline">Akademischer Hintergrund</span>
          </h2>
          <p className="section-subtitle">Meine Studienabschlüsse und Zertifizierungen.</p>
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
