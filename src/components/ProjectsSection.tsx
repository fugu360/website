import { motion } from "framer-motion";
import { FolderOpen, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/data/projects";

const ProjectsSection = () => {
  return (
    <section id="projects" className="bg-secondary/50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <FolderOpen size={20} className="text-accent" />
            <p className="text-accent font-medium text-sm tracking-widest uppercase">Projekte</p>
          </div>
          <h2 className="section-title">
            <span className="gold-underline">Projekte</span>
          </h2>
          <p className="section-subtitle">Beispiele für Arbeiten und Projekte.</p>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map((project, i) => (
            <Link key={project.slug} to={`/projects/${project.slug}`} className="block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group bg-card rounded-xl border border-border p-5 hover:shadow-lg hover:border-accent/30 transition-all duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                    {project.title}
                  </h4>
                  <ExternalLink size={16} className="text-muted-foreground group-hover:text-accent transition-colors mt-1 shrink-0" />
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">{project.overview}</p>
                {project.cardTech && project.cardTech.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.cardTech.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
