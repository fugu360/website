import { Link, useParams } from "react-router-dom";
import { BlockMath, InlineMath } from "react-katex";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  const showPortfolioModel = project?.slug === "aktives-portfoliomanagement";
  const showTrumpImage = project?.slug === "auswirkung-der-trump-wahl";
  const portfolioModelLatex = String.raw`\begin{aligned}
\min \quad & \sum_{i \in I} \sum_{i' \in I} w_i \, w_{i'} \, \sigma_{ii'} \\
u.d.N. \quad
& \sum_{i \in I} w_i = 1 \\
& \sum_{i \in I} w_i \, \bar{r}_i = \mu \\
& \sum_{i \in I} w_i \, ESG_i \leq ESG_{max} \\
& w_i \geq w_{min} \cdot y_i \quad (\forall i \in I) \\
& w_i \leq y_i \quad (\forall i \in I)
\end{aligned}`;
  const portfolioNotation = [
    { symbol: "I", description: "Menge aller Aktien" },
    { symbol: "\\sigma_{ii'}", description: "Kovarianz zwischen den Renditen der Aktie i und i'" },
    { symbol: "\\bar{r}_i", description: "Erwartete Rendite der Aktie i" },
    { symbol: "\\mu", description: "Vorgegebene erwartete Portfoliorendite" },
    { symbol: "ESG_i", description: "ESG-Rating der Aktie i" },
    { symbol: "ESG_{max}", description: "Vorgegebenes ESG-Rating des Portfolios" },
    { symbol: "w_{min}", description: "Minimale Gewichtung einer gewaehlten Aktie" },
  ];
  const portfolioVariables = [
    { symbol: "w_i", description: "Gewichtung der Aktie i im Portfolio" },
    { symbol: "y_i", description: "1, wenn Aktie i ins Portfolio aufgenommen wird; 0, sonst" },
  ];

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
        <Link
          className="text-sm text-muted-foreground hover:text-foreground"
          to={{ pathname: "/", hash: "#projects" }}
          state={{ noSmooth: true }}
        >
          ← Alle Projekte
        </Link>
        <h1 className="mt-4 text-4xl md:text-5xl font-bold text-foreground">{project.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl">{project.overview}</p>
        {project.grade && (
          <p className="mt-3 text-sm text-muted-foreground">
            Note: <span className="text-foreground font-semibold">{project.grade}</span>
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-3">
          {project.pdfUrl && (
            <a
              href={encodeURI(project.pdfUrl)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:opacity-80"
            >
              PDF öffnen
            </a>
          )}
          {project.presentationUrl && (
            <a
              href={encodeURI(project.presentationUrl)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:opacity-80"
            >
              Präsentation öffnen
            </a>
          )}
        </div>

        {showPortfolioModel ? (
          <>
            {project.result && (
              <div className="mt-10 bg-card border border-border rounded-xl p-6">
                <p className="text-accent font-medium">Ergebnis</p>
                <p className="mt-2 text-foreground">{project.result}</p>
              </div>
            )}
            <div className="mt-6 bg-card border border-border rounded-xl p-6">
              <img
                src="/assets/projects/portfolio_smi_white_background.png"
                alt="Portfolio vs. SMI"
                className="w-full rounded-lg"
                loading="lazy"
              />
            </div>
            <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Modell</h2>
              <div className="overflow-x-auto">
                <BlockMath math={portfolioModelLatex} />
              </div>
              <div className="mt-8 overflow-x-auto">
                <table className="w-full text-left text-sm text-muted-foreground border-collapse">
                  <thead className="text-foreground">
                    <tr className="border-b border-border">
                      <th className="py-2 pr-4 font-semibold">Menge und Parameter</th>
                      <th className="py-2 font-semibold">Bedeutung</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portfolioNotation.map((item) => (
                      <tr key={item.symbol} className="border-b border-border/60">
                        <td className="py-2 pr-4 align-top">
                          <InlineMath math={item.symbol} />
                        </td>
                        <td className="py-2">{item.description}</td>
                      </tr>
                    ))}
                    <tr className="border-b border-border">
                      <td className="py-3 pr-4 font-semibold text-foreground">Variablen</td>
                      <td className="py-3"></td>
                    </tr>
                    {portfolioVariables.map((item) => (
                      <tr key={item.symbol} className="border-b border-border/60">
                        <td className="py-2 pr-4 align-top">
                          <InlineMath math={item.symbol} />
                        </td>
                        <td className="py-2">{item.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Zusammenfassung</h2>
              <p className="text-muted-foreground leading-relaxed">{project.summary}</p>
            </div>
            </div>
          </>
        ) : (
          <>
            {project.result && (
              <div className="mt-10 bg-card border border-border rounded-xl p-6">
                <p className="text-accent font-medium">Ergebnis</p>
                <p className="mt-2 text-foreground">{project.result}</p>
              </div>
            )}
            {showTrumpImage && (
              <div className="mt-6 bg-card border border-border rounded-xl p-6">
                <img
                  src="/assets/projects/Auswirkung der Trump-Wahl auf ausgewählte.png"
                  alt="Auswirkung der Trump-Wahl auf ausgewählte Aktienindizes"
                  className="w-full rounded-lg"
                  loading="lazy"
                />
              </div>
            )}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Zusammenfassung</h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">{project.summary}</p>
          </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
