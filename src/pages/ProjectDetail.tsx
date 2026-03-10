import { Link, useParams } from "react-router-dom";
import { BlockMath, InlineMath } from "react-katex";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";
import { baseKeywords, setSeo } from "@/lib/seo";
import { getLocalized, useLanguage } from "@/lib/i18n";

const ProjectDetail = () => {
  const { lang, isEnglish } = useLanguage();
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug);
  const showPortfolioModel = project?.slug === "aktives-portfoliomanagement";
  const showBachelorModel = project?.slug === "bachelorarbeit";
  const showModelSection = showPortfolioModel || showBachelorModel;
  const showTrumpImage = project?.slug === "auswirkung-der-trump-wahl";
  const canonicalBase = isEnglish
    ? "https://www.benjamin-oehrli.ch/en"
    : "https://www.benjamin-oehrli.ch";
  const canonicalUrl = slug ? `${canonicalBase}/projects/${slug}` : `${canonicalBase}/`;
  const labels =
    lang === "en"
      ? {
          back: "← All projects",
          grade: "Grade",
          technologies: "Technologies",
          result: "Result",
          summary: "Summary",
          pdf: "Open PDF",
          presentation: "Open presentation",
          notFoundTitle: "Project not found",
          notFoundText: "Please check the URL or return to the home page.",
          backHome: "Back to home",
          portfolioAlt: "Portfolio vs. SMI",
          trumpAlt: "Impact of the Trump election on selected stock indices",
          model: "Model",
          objective: "Objective",
          constraints: "Constraints",
          tableHeader: "Sets and parameters",
          tableMeaning: "Meaning",
          tableVariables: "Variables",
        }
      : {
          back: "← Alle Projekte",
          grade: "Note",
          technologies: "Technologien",
          result: "Ergebnis",
          summary: "Zusammenfassung",
          pdf: "PDF öffnen",
          presentation: "Präsentation öffnen",
          notFoundTitle: "Projekt nicht gefunden",
          notFoundText: "Bitte prüfe die URL oder gehe zur Startseite.",
          backHome: "Zurück zur Startseite",
          portfolioAlt: "Portfolio vs. SMI",
          trumpAlt: "Auswirkung der Trump-Wahl auf ausgewählte Aktienindizes",
          model: "Modell",
          objective: "Zielfunktion",
          constraints: "Nebenbedingungen",
          tableHeader: "Menge und Parameter",
          tableMeaning: "Bedeutung",
          tableVariables: "Variablen",
        };

  useEffect(() => {
    if (!project) {
      setSeo({
        title: isEnglish ? "Project not found - Benjamin Oehrli" : "Projekt nicht gefunden - Benjamin Oehrli",
        description: isEnglish
          ? "The requested project could not be found."
          : "Das angeforderte Projekt wurde nicht gefunden.",
        canonical: canonicalUrl,
        ogUrl: canonicalUrl,
        lang,
      });
      return;
    }

    setSeo({
      title: `${getLocalized(project.title, lang)} - Benjamin Oehrli`,
      description: getLocalized(project.overview, lang),
      keywords: `${getLocalized(project.title, lang)}, ${baseKeywords}`,
      canonical: canonicalUrl,
      ogTitle: getLocalized(project.title, lang),
      ogDescription: getLocalized(project.overview, lang),
      ogUrl: canonicalUrl,
      lang,
    });
  }, [canonicalUrl, isEnglish, lang, project]);
  const portfolioModelLatex =
    lang === "en"
      ? String.raw`\begin{aligned}
\min \quad & \sum_{i \in I} \sum_{i' \in I} w_i \, w_{i'} \, \sigma_{ii'} \\
s.t. \quad
& \sum_{i \in I} w_i = 1 \\
& \sum_{i \in I} w_i \, \bar{r}_i = \mu \\
& \sum_{i \in I} w_i \, ESG_i \leq ESG_{max} \\
& w_i \geq w_{min} \cdot y_i \quad (\forall i \in I) \\
& w_i \leq y_i \quad (\forall i \in I)
\end{aligned}`
      : String.raw`\begin{aligned}
\min \quad & \sum_{i \in I} \sum_{i' \in I} w_i \, w_{i'} \, \sigma_{ii'} \\
u.d.N. \quad
& \sum_{i \in I} w_i = 1 \\
& \sum_{i \in I} w_i \, \bar{r}_i = \mu \\
& \sum_{i \in I} w_i \, ESG_i \leq ESG_{max} \\
& w_i \geq w_{min} \cdot y_i \quad (\forall i \in I) \\
& w_i \leq y_i \quad (\forall i \in I)
\end{aligned}`;
  const portfolioNotation =
    lang === "en"
      ? [
          { symbol: "I", description: "Set of all stocks" },
          { symbol: "\\sigma_{ii'}", description: "Covariance between returns of stock i and i'" },
          { symbol: "\\bar{r}_i", description: "Expected return of stock i" },
          { symbol: "\\mu", description: "Target portfolio return" },
          { symbol: "ESG_i", description: "ESG score of stock i" },
          { symbol: "ESG_{max}", description: "Maximum ESG score of the portfolio" },
          { symbol: "w_{min}", description: "Minimum weight of a selected stock" },
        ]
      : [
          { symbol: "I", description: "Menge aller Aktien" },
          { symbol: "\\sigma_{ii'}", description: "Kovarianz zwischen den Renditen der Aktie i und i'" },
          { symbol: "\\bar{r}_i", description: "Erwartete Rendite der Aktie i" },
          { symbol: "\\mu", description: "Vorgegebene erwartete Portfoliorendite" },
          { symbol: "ESG_i", description: "ESG-Rating der Aktie i" },
          { symbol: "ESG_{max}", description: "Vorgegebenes ESG-Rating des Portfolios" },
          { symbol: "w_{min}", description: "Minimale Gewichtung einer gewaehlten Aktie" },
        ];
  const portfolioVariables =
    lang === "en"
      ? [
          { symbol: "w_i", description: "Weight of stock i in the portfolio" },
          { symbol: "y_i", description: "1 if stock i is included in the portfolio; 0 otherwise" },
        ]
      : [
          { symbol: "w_i", description: "Gewichtung der Aktie i im Portfolio" },
          { symbol: "y_i", description: "1, wenn Aktie i ins Portfolio aufgenommen wird; 0, sonst" },
        ];
  const bachelorModelLatex =
    lang === "en"
      ? String.raw`\begin{aligned}
\min \quad & \sum_{g \in G}\left[(h_g - l_g) + M^{1}\sum_{m \in M}(z_{1mg}+z_{2mg})\right] \\
s.t. \quad
& \sum_{g \in G} x_{ig} = 1 \quad (\forall i \in I) \\
& \lfloor |I|/|G| \rfloor \leq \sum_{i \in I} x_{ig} \leq \lceil |I|/|G| \rceil \quad (\forall g \in G) \\
& \lfloor |R^m|/|G| \rfloor - z_{1mg} \leq \sum_{i\mid(i,m)\in R^m} x_{ig} \leq \lceil |R^m|/|G| \rceil + z_{2mg} \\
& \hspace{7.2cm}(\forall m \in M, \forall g \in G) \\
& 2 - \sum_{i \in I} b^i x_{ig} \leq M^{2} c_g \quad (\forall g \in G) \\
& \sum_{i \in I} b^i x_{ig} \leq M^{2}(1-c_g) \quad (\forall g \in G) \\
& 2 - \sum_{i \in I} a^{ie}x_{ig} \leq M^{2}y_{eg} \quad (\forall g \in G, e \in E) \\
& \sum_{i \in I} a^{ie}x_{ig} \leq M^{2}(1-y_{eg}) \quad (\forall g \in G, e \in E) \\
& p^i x_{ig} \leq h_g \quad (\forall i \in I, g \in G) \\
& p^i + M^{3}(1-x_{ig}) \geq l_g \quad (\forall i \in I, g \in G) \\
& \sum_{i \in I} f^i x_{ig} \geq 1 \quad (\forall g \in G) \\
& \sum_{i \in I} k^i x_{ig} \geq 1 \quad (\forall g \in G) \\
& s_{gn} \leq \sum_{i \in I}(1-t^{in})x_{ig} \leq M^{4}s_{gn} \quad (\forall g \in G, n \in N) \\
& \sum_{n \in N} s_{gn} \leq |N| - w \quad (\forall g \in G)
\end{aligned}`
      : String.raw`\begin{aligned}
\min \quad & \sum_{g \in G}\left[(h_g - l_g) + M^{1}\sum_{m \in M}(z_{1mg}+z_{2mg})\right] \\
u.d.N. \quad
& \sum_{g \in G} x_{ig} = 1 \quad (\forall i \in I) \\
& \lfloor |I|/|G| \rfloor \leq \sum_{i \in I} x_{ig} \leq \lceil |I|/|G| \rceil \quad (\forall g \in G) \\
& \lfloor |R^m|/|G| \rfloor - z_{1mg} \leq \sum_{i\mid(i,m)\in R^m} x_{ig} \leq \lceil |R^m|/|G| \rceil + z_{2mg} \\
& \hspace{7.2cm}(\forall m \in M, \forall g \in G) \\
& 2 - \sum_{i \in I} b^i x_{ig} \leq M^{2} c_g \quad (\forall g \in G) \\
& \sum_{i \in I} b^i x_{ig} \leq M^{2}(1-c_g) \quad (\forall g \in G) \\
& 2 - \sum_{i \in I} a^{ie}x_{ig} \leq M^{2}y_{eg} \quad (\forall g \in G, e \in E) \\
& \sum_{i \in I} a^{ie}x_{ig} \leq M^{2}(1-y_{eg}) \quad (\forall g \in G, e \in E) \\
& p^i x_{ig} \leq h_g \quad (\forall i \in I, g \in G) \\
& p^i + M^{3}(1-x_{ig}) \geq l_g \quad (\forall i \in I, g \in G) \\
& \sum_{i \in I} f^i x_{ig} \geq 1 \quad (\forall g \in G) \\
& \sum_{i \in I} k^i x_{ig} \geq 1 \quad (\forall g \in G) \\
& s_{gn} \leq \sum_{i \in I}(1-t^{in})x_{ig} \leq M^{4}s_{gn} \quad (\forall g \in G, n \in N) \\
& \sum_{n \in N} s_{gn} \leq |N| - w \quad (\forall g \in G)
\end{aligned}`;
  const bachelorNotation =
    lang === "en"
      ? [
          { symbol: "I", description: "Set of all students, indexed by i" },
          { symbol: "G", description: "Set of all groups, indexed by g" },
          { symbol: "E", description: "Set of all ethnicities, indexed by e" },
          { symbol: "N", description: "Set of all time slots, indexed by n" },
          { symbol: "M", description: "Set of all majors, indexed by m" },
          { symbol: "R^m", description: "For major m, set of pairs (i,m) where student i has major m" },
          { symbol: "M^j", description: "Big-M parameter in constraint j, j in {1,2,3,4}" },
          { symbol: "p^i", description: "GPA of student i, p^i in [0,4]" },
          { symbol: "w", description: "Minimum number of common available time slots per group" },
          { symbol: "f^{max}", description: "Leadership threshold for indicator f^i" },
          { symbol: "k^{max}", description: "Social skills threshold for indicator k^i" },
          { symbol: "b^i", description: "1 if student i belongs to a gender minority; 0 otherwise" },
          { symbol: "a^{ie}", description: "1 if student i belongs to ethnicity e; 0 otherwise" },
          { symbol: "t^{in}", description: "1 if student i is unavailable in time slot n; 0 otherwise" },
          { symbol: "f^i", description: "1 if leadership score of student i is at least f^{max}; 0 otherwise" },
          { symbol: "k^i", description: "1 if social skill score of student i is at least k^{max}; 0 otherwise" },
        ]
      : [
          { symbol: "I", description: "Menge aller Studierenden, indexiert durch i" },
          { symbol: "G", description: "Menge aller Gruppen, indexiert durch g" },
          { symbol: "E", description: "Menge aller Ethnien, indexiert durch e" },
          { symbol: "N", description: "Menge aller Zeitfenster, indexiert durch n" },
          { symbol: "M", description: "Menge aller Hauptfächer, indexiert durch m" },
          { symbol: "R^m", description: "Für Hauptfach m: Menge der Paarungen (i,m), wobei i Hauptfach m hat" },
          { symbol: "M^j", description: "Big-M-Parameter in Nebenbedingung j, j in {1,2,3,4}" },
          { symbol: "p^i", description: "GPA von Studierendem i, p^i in [0,4]" },
          { symbol: "w", description: "Minimale Anzahl gemeinsamer verfügbarer Zeitfenster pro Gruppe" },
          { symbol: "f^{max}", description: "Schwellenwert der Führungskompetenz für Indikator f^i" },
          { symbol: "k^{max}", description: "Schwellenwert der Sozialkompetenz für Indikator k^i" },
          { symbol: "b^i", description: "1, wenn Studierender i einer geschlechtlichen Minderheit angehört; sonst 0" },
          { symbol: "a^{ie}", description: "1, wenn Studierender i der Ethnie e angehört; sonst 0" },
          { symbol: "t^{in}", description: "1, wenn Studierender i im Zeitfenster n nicht verfügbar ist; sonst 0" },
          { symbol: "f^i", description: "1, wenn Führungskompetenz von i mindestens f^{max} ist; sonst 0" },
          { symbol: "k^i", description: "1, wenn Sozialkompetenz von i mindestens k^{max} ist; sonst 0" },
        ];
  const bachelorVariables =
    lang === "en"
      ? [
          { symbol: "x_{ig}", description: "1 if student i is assigned to group g; 0 otherwise" },
          { symbol: "c_g", description: "Gender-minority indicator for group g" },
          { symbol: "y_{eg}", description: "Ethnicity indicator for ethnicity e in group g" },
          { symbol: "s_{gn}", description: "1 if not all students in group g are available in time slot n; 0 otherwise" },
          { symbol: "z_{1mg}", description: "Slack variable for lower bound of major m in group g" },
          { symbol: "z_{2mg}", description: "Slack variable for upper bound of major m in group g" },
          { symbol: "h_g", description: "Highest GPA in group g" },
          { symbol: "l_g", description: "Lowest GPA in group g" },
        ]
      : [
          { symbol: "x_{ig}", description: "1, wenn Studierender i in Gruppe g ist; sonst 0" },
          { symbol: "c_g", description: "Indikator für geschlechtliche Minderheit in Gruppe g" },
          { symbol: "y_{eg}", description: "Indikator, ob Ethnie e in Gruppe g vertreten ist" },
          { symbol: "s_{gn}", description: "1, wenn nicht alle Mitglieder von Gruppe g in Zeitfenster n verfügbar sind; sonst 0" },
          { symbol: "z_{1mg}", description: "Hilfsvariable für untere Schranke des Hauptfachs m in Gruppe g" },
          { symbol: "z_{2mg}", description: "Hilfsvariable für obere Schranke des Hauptfachs m in Gruppe g" },
          { symbol: "h_g", description: "Höchster GPA in Gruppe g" },
          { symbol: "l_g", description: "Niedrigster GPA in Gruppe g" },
        ];
  const bachelorObjectiveLatex = String.raw`\min \quad \sum_{g \in G}\left[(h_g-l_g)+M^{1}\sum_{m \in M}(z_{1mg}+z_{2mg})\right]`;
  const bachelorConstraintsLatex = [
    String.raw`\sum_{g \in G} x_{ig} = 1 \quad (\forall i \in I)`,
    String.raw`\lfloor |I|/|G| \rfloor \leq \sum_{i \in I} x_{ig} \leq \lceil |I|/|G| \rceil \quad (\forall g \in G)`,
    String.raw`\lfloor |R^m|/|G| \rfloor - z_{1mg} \leq \sum_{i \in I:(i,m)\in R^m} x_{ig} \leq \lceil |R^m|/|G| \rceil + z_{2mg} \quad (\forall m \in M, \forall g \in G)`,
    String.raw`2 - \sum_{i \in I} b^i x_{ig} \leq M^{2} c_g \quad (\forall g \in G)`,
    String.raw`\sum_{i \in I} b^i x_{ig} \leq M^{2}(1-c_g) \quad (\forall g \in G)`,
    String.raw`2 - \sum_{i \in I} a^{ie}x_{ig} \leq M^{2}y_{eg} \quad (\forall g \in G, e \in E)`,
    String.raw`\sum_{i \in I} a^{ie}x_{ig} \leq M^{2}(1-y_{eg}) \quad (\forall g \in G, e \in E)`,
    String.raw`p^i x_{ig} \leq h_g \quad (\forall i \in I, g \in G)`,
    String.raw`p^i + M^{3}(1-x_{ig}) \geq l_g \quad (\forall i \in I, g \in G)`,
    String.raw`\sum_{i \in I} f^i x_{ig} \geq 1 \quad (\forall g \in G)`,
    String.raw`\sum_{i \in I} k^i x_{ig} \geq 1 \quad (\forall g \in G)`,
    String.raw`s_{gn} \leq \sum_{i \in I}(1-t^{in})x_{ig} \leq M^{4}s_{gn} \quad (\forall g \in G, n \in N)`,
    String.raw`\sum_{n \in N} s_{gn} \leq |N| - w \quad (\forall g \in G)`,
  ];
  const modelLatex = showBachelorModel ? bachelorModelLatex : portfolioModelLatex;
  const modelNotation = showBachelorModel ? bachelorNotation : portfolioNotation;
  const modelVariables = showBachelorModel ? bachelorVariables : portfolioVariables;

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="section-container flex-1">
          <h1 className="section-title">{labels.notFoundTitle}</h1>
          <p className="section-subtitle">{labels.notFoundText}</p>
          <Link className="text-accent underline" to={isEnglish ? "/en" : "/"}>
            {labels.backHome}
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
          to={{ pathname: isEnglish ? "/en" : "/", hash: "#projects" }}
          state={{ noSmooth: true }}
        >
          {labels.back}
        </Link>
        <h1 className="mt-4 text-4xl md:text-5xl font-bold text-foreground">
          {getLocalized(project.title, lang)}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-3xl">
          {getLocalized(project.overview, lang)}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          {project.grade && (
            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium">
              {labels.grade}: {project.grade}
            </span>
          )}
          {project.cardTech && project.cardTech.length > 0 &&
            project.cardTech.map((tech) => (
              tech === "GitHub" && project.githubUrl ? (
                <a
                  key={tech}
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-2.5 py-1 rounded-md border border-border text-xs font-medium text-accent hover:bg-secondary/70 transition-colors"
                >
                  {tech}
                </a>
              ) : (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium"
                >
                  {tech}
                </span>
              )
            ))}
          {project.pdfUrl && (
            <a
              href={encodeURI(project.pdfUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-2.5 py-1 rounded-md border border-border text-xs font-medium text-accent hover:bg-secondary/70 transition-colors"
            >
              {labels.pdf}
            </a>
          )}
          {project.presentationUrl && (
            <a
              href={encodeURI(project.presentationUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-2.5 py-1 rounded-md border border-border text-xs font-medium text-accent hover:bg-secondary/70 transition-colors"
            >
              {labels.presentation}
            </a>
          )}
        </div>

        {showModelSection ? (
          <>
            {project.result && (
              <div className="mt-10 bg-card border border-border rounded-xl p-6">
                <p className="text-accent font-medium">{labels.result}</p>
                <p className="mt-2 text-foreground">
                  {getLocalized(project.result, lang)}
                </p>
              </div>
            )}
            {showPortfolioModel && (
              <div className="mt-6 bg-card border border-border rounded-xl p-6">
                <img
                  src="/assets/projects/portfolio_smi_white_background.png"
                  alt={labels.portfolioAlt}
                  className="w-full rounded-lg"
                  loading="lazy"
                />
              </div>
            )}
            <div className="mt-10 space-y-8">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">{labels.summary}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {getLocalized(project.summary, lang)}
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">{labels.model}</h2>
              {showBachelorModel ? (
                <div className="space-y-4 [&_.katex]:text-[0.95rem]">
                  <p className="text-sm font-medium text-foreground">{labels.objective}</p>
                  <div className="overflow-x-auto">
                    <BlockMath math={bachelorObjectiveLatex} />
                  </div>
                  <p className="text-sm font-medium text-foreground pt-2">{labels.constraints}</p>
                  <div className="space-y-2">
                    {bachelorConstraintsLatex.map((constraint, index) => (
                      <div key={index} className="overflow-x-auto">
                        <BlockMath math={constraint} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <BlockMath math={modelLatex} />
                </div>
              )}
              <div className="mt-8 overflow-x-auto">
                <table className="w-full text-left text-sm text-muted-foreground border-collapse">
                  <thead className="text-foreground">
                    <tr className="border-b border-border">
                      <th className="py-2 pr-4 font-semibold">{labels.tableHeader}</th>
                      <th className="py-2 font-semibold">{labels.tableMeaning}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modelNotation.map((item) => (
                      <tr key={item.symbol} className="border-b border-border/60">
                        <td className="py-2 pr-4 align-top">
                          <InlineMath math={item.symbol} />
                        </td>
                        <td className="py-2">{item.description}</td>
                      </tr>
                    ))}
                    <tr className="border-b border-border">
                      <td className="py-3 pr-4 font-semibold text-foreground">
                        {labels.tableVariables}
                      </td>
                      <td className="py-3"></td>
                    </tr>
                    {modelVariables.map((item) => (
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
            </div>
          </>
        ) : (
          <>
            {project.result && (
              <div className="mt-10 bg-card border border-border rounded-xl p-6">
                <p className="text-accent font-medium">{labels.result}</p>
                <p className="mt-2 text-foreground">
                  {getLocalized(project.result, lang)}
                </p>
              </div>
            )}
            {showTrumpImage && (
              <div className="mt-6 bg-card border border-border rounded-xl p-6">
                <img
                  src="/assets/projects/Auswirkung der Trump-Wahl auf ausgewählte.png"
                  alt={labels.trumpAlt}
                  className="w-full rounded-lg"
                  loading="lazy"
                />
              </div>
            )}
          <div className="mt-10 bg-card border border-border rounded-xl p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{labels.summary}</h2>
            <p className="text-muted-foreground leading-relaxed">
              {getLocalized(project.summary, lang)}
            </p>
          </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
