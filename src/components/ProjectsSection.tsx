import { motion } from "framer-motion";
import { FolderOpen, ExternalLink, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { projects, type Project } from "@/data/projects";
import { getLocalized, useLanguage } from "@/lib/i18n";
import DerivativesPricingGraphic from "./project-graphics/DerivativesPricingGraphic";
import BachelorarbeitGraphic from "./project-graphics/BachelorarbeitGraphic";
import AgvSchedulingGraphic from "./project-graphics/AgvSchedulingGraphic";

const graphicComponents: Record<string, React.FC> = {
  "derivatives-pricing": DerivativesPricingGraphic,
  "bachelorarbeit": BachelorarbeitGraphic,
  "agv-scheduling-dss": AgvSchedulingGraphic,
};

const imageFocusBySlug: Record<string, string> = {
  "aktives-portfoliomanagement": "center 30%",
  "auswirkung-der-trump-wahl": "center 24%",
  "portfolio-website": "center center",
};

const containImageBySlug: Record<string, boolean> = {
  "aktives-portfoliomanagement": true,
  "auswirkung-der-trump-wahl": true,
};

const ProjectsSection = () => {
  const { lang, isEnglish } = useLanguage();
  const text =
    lang === "en"
      ? {
          eyebrow: "Projects",
          title: "Projects",
          subtitle: "Visual snapshots of selected work",
          open: "View project",
        }
      : {
          eyebrow: "Projekte",
          title: "Projekte",
          subtitle: "Visuelle Einblicke in ausgewählte Arbeiten",
          open: "Projekt ansehen",
        };
  const basePath = isEnglish ? "/en" : "";

  const renderProjectPanel = (project: Project, index: number) => {
    const Graphic = graphicComponents[project.slug];
    const useContainImage = Boolean(containImageBySlug[project.slug]);

    return (
      <Link key={project.slug} to={`${basePath}/projects/${project.slug}`} className="block">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.04 }}
          className="group relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 transition-colors duration-300 hover:border-accent/35"
        >
          <div className="relative h-[300px] md:h-[340px]">
            {project.previewImage ? (
              <>
                <div
                  className={`absolute inset-0 ${
                    useContainImage
                      ? "bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100"
                      : ""
                  }`}
                />
                <img
                  src={project.previewImage}
                  alt={getLocalized(project.title, lang)}
                  className={`absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-[1.02] ${
                    useContainImage ? "object-contain p-4 md:p-6" : "object-cover"
                  }`}
                  style={{ objectPosition: imageFocusBySlug[project.slug] ?? "center center" }}
                />
                {!useContainImage && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-primary/10 to-transparent md:from-primary/24 md:via-primary/8" />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary/55 to-transparent pointer-events-none" />
                  </>
                )}
              </>
            ) : Graphic ? (
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80">
                <Graphic />
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary to-primary/80">
                <Globe
                  size={78}
                  strokeWidth={1}
                  className="text-accent/30 transition-colors duration-300 group-hover:text-accent/50"
                />
              </div>
            )}
          </div>

          <div className="border-t border-border/70 bg-background/92 px-4 py-3.5 md:px-5 md:py-4">
            <div className="flex items-start justify-between gap-3">
              <h4 className="text-base font-semibold leading-snug text-foreground md:text-lg">
                {getLocalized(project.title, lang)}
              </h4>
              <ExternalLink
                size={16}
                className="mt-0.5 shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>

            <p
              className="mt-1.5 text-xs leading-relaxed text-muted-foreground md:text-[0.84rem]"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {getLocalized(project.overview, lang)}
            </p>

            <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
              {project.cardTech?.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-accent/25 bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent"
                >
                  {skill}
                </span>
              ))}
              <span className="ml-auto text-[10px] font-semibold uppercase tracking-[0.12em] text-accent/80">
                {text.open}
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  };

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
            <p className="text-accent font-medium text-sm tracking-widest uppercase">{text.eyebrow}</p>
          </div>
          <h2 className="section-title">
            <span className="gold-underline">{text.title}</span>
          </h2>
          <p className="section-subtitle">{text.subtitle}</p>
        </motion.div>

        <div>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, i) => {
              const isLastOddItem = projects.length % 2 === 1 && i === projects.length - 1;
              return (
                <div key={project.slug} className={isLastOddItem ? "md:col-span-2" : ""}>
                  {renderProjectPanel(project, i)}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
