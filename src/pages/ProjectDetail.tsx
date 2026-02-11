import { Link, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="section-container flex-1">
          <h1 className="section-title">Projekt nicht gefunden</h1>
          <p className="section-subtitle">Bitte prüfe die URL oder gehe zur Startseite.</p>
          <Link className="text-accent underline" to="/">
            Zurück zur Startseite
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="section-container flex-1">
        <Link className="text-sm text-muted-foreground hover:text-foreground" to="/">
          ← Alle Projekte
        </Link>
        <h1 className="mt-4 text-4xl md:text-5xl font-bold text-foreground">{project.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl">{project.overview}</p>
        {project.grade && (
          <p className="mt-3 text-sm text-muted-foreground">
            Note: <span className="text-foreground font-semibold">{project.grade}</span>
          </p>
        )}
        {project.pdfUrl && (
          <a
            href={encodeURI(project.pdfUrl)}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent hover:opacity-80"
          >
            PDF öffnen
          </a>
        )}

        {project.skills && project.skills.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {project.skills.map((item) => (
              <span
                key={item}
                className="px-3 py-1 rounded-md bg-secondary text-secondary-foreground text-sm font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        {project.result && (
          <div className="mt-10 bg-card border border-border rounded-xl p-6">
            <p className="text-accent font-medium">Ergebnis</p>
            <p className="mt-2 text-foreground">{project.result}</p>
          </div>
        )}

        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-foreground mb-4">Zusammenfassung</h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">{project.summary}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
