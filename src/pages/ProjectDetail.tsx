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
          tableHeader: "Sets and parameters",
          tableMeaning: "Meaning",
          tableVariables: "Variables",
        }
      : {
          back: "← Alle Projekte",
          grade: "Note",
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
	ext{s.t.} \quad
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
        {project.grade && (
          <p className="mt-3 text-sm text-muted-foreground">
            {labels.grade}: <span className="text-foreground font-semibold">{project.grade}</span>
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
              {labels.pdf}
            </a>
          )}
          {project.presentationUrl && (
            <a
              href={encodeURI(project.presentationUrl)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:opacity-80"
            >
              {labels.presentation}
            </a>
          )}
        </div>

        {showPortfolioModel ? (
          <>
            {project.result && (
              <div className="mt-10 bg-card border border-border rounded-xl p-6">
                <p className="text-accent font-medium">{labels.result}</p>
                <p className="mt-2 text-foreground">
                  {getLocalized(project.result, lang)}
                </p>
              </div>
            )}
            <div className="mt-6 bg-card border border-border rounded-xl p-6">
              <img
                src="/assets/projects/portfolio_smi_white_background.png"
                alt={labels.portfolioAlt}
                className="w-full rounded-lg"
                loading="lazy"
              />
            </div>
            <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-2xl font-semibold text-foreground mb-4">{labels.model}</h2>
              <div className="overflow-x-auto">
                <BlockMath math={portfolioModelLatex} />
              </div>
              <div className="mt-8 overflow-x-auto">
                <table className="w-full text-left text-sm text-muted-foreground border-collapse">
                  <thead className="text-foreground">
                    <tr className="border-b border-border">
                      <th className="py-2 pr-4 font-semibold">{labels.tableHeader}</th>
                      <th className="py-2 font-semibold">{labels.tableMeaning}</th>
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
                      <td className="py-3 pr-4 font-semibold text-foreground">
                        {labels.tableVariables}
                      </td>
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
              <h2 className="text-2xl font-semibold text-foreground mb-4">{labels.summary}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {getLocalized(project.summary, lang)}
              </p>
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
          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-foreground mb-4">{labels.summary}</h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
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
