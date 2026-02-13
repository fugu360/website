export type Project = {
  slug: string;
  title: string;
  overview: string;
  summary: string;
  pdfUrl?: string;
  presentationUrl?: string;
  grade?: string;
  cardTech?: string[];
  skills?: string[];
  result?: string;
};

export const projects: Project[] = [
  {
    slug: "aktives-portfoliomanagement",
    title: "Aktives Portfoliomanagement",
    overview: "ESG-Portfoliooptimierung mit Python, Rebalancing und Performancevergleich.",
    summary: "In diesem Projekt habe ich ein ESG-sensitives Portfolio-Optimierungsmodell auf Basis des Mean-Variance-Ansatzes entwickelt, implementiert und mit realen Marktdaten getestet. Meine Arbeit umfasste den kompletten Workflow von der Modellierung bis zur Performance-Evaluation: Formulierung eines gemischt-ganzzahligen quadratischen Optimierungsproblems, Integration von ESG-Constraints in eine klassische Risiko-Rendite-Optimierung, Erweiterung des Modells um Mindestinvestitionsanforderungen, um realistische Portfolios zu erzwingen, Implementierung des Modells in Python, Aufbau eines dynamischen Rebalancing-Prozesses über mehrere Perioden, Quantitative Performance-Analyse (Volatilität, Sortino Ratio) im Vergleich zum SMI. Die Ergebnisse zeigten, dass das optimierte Portfolio bei geringerem Risiko eine bessere risikoadjustierte Performance als der Benchmark erzielte – insbesondere nach Verschärfung der ESG-Restriktionen. Das Projekt verbindet theoretische Finanzmodelle mit praxisnaher Implementierung.",
    pdfUrl: "/assets/projects/Aktives Portfoliomanagement.pdf",
    grade: "5.5",
    result: "Optimiertes Portfolio mit geringerer Volatilität und besserer Sortino Ratio als der SMI.",
    cardTech: ["Python"],
    skills: [
      "Portfolio-Optimierung (Mean-Variance)",
      "Quadratische Optimierung",
      "Python (Datenanalyse & Modellierung)",
      "ESG-Integration",
      "Performance-Analyse & Rebalancing",
    ],
  },
  {
    slug: "auswirkung-der-trump-wahl",
    title: "Auswirkung der Trump-Wahl auf ausgewählte Aktienindizes",
    overview: "Event-Studie zur Marktreaktion auf die Trump-Wahl mit DiD und t-Test.",
    summary: "In diesem Projekt habe ich empirisch untersucht, wie Finanzmärkte auf ein politisches Großereignis reagieren. Konkret analysierte ich die Auswirkungen der Amtseinführung von Donald Trump auf US-amerikanische und internationale Aktienindizes. Mein Beitrag lag vor allem in der methodisch sauberen quantitativen Analyse: Beschaffung und Aufbereitung von Finanzmarktdaten über eine API (Yahoo Finance), Visualisierung von Zeitreihen zur explorativen Analyse, Anwendung der Difference-in-Differences-Methode, um kausale Effekte abzuschätzen, Durchführung eines statistischen Hypothesentests (t-Test) auf Basis täglicher Renditen, Interpretation der Ergebnisse aus ökonomischer und statistischer Perspektive. Die Analyse zeigte eine relative Underperformance der US-Märkte nach dem Ereignis, während internationale Märkte stabiler reagierten. Auch wenn die Ergebnisse auf dem 5-%-Niveau nicht signifikant waren, konnte ich einen klaren ökonomischen Trend herausarbeiten und kritisch einordnen.",
    pdfUrl: "/assets/projects/Auswirkung der Trump-Wahl auf ausgewählte.pdf",
    grade: "5.5",
    result: "Relative Underperformance der US-Märkte nach dem Ereignis bei stabileren internationalen Indizes.",
    cardTech: ["R"],
    skills: [
      "Empirische Datenanalyse",
      "Finanzmarktdaten & Renditeberechnung",
      "Difference-in-Differences",
      "Statistische Tests & Inferenz",
      "Datenvisualisierung & Ergebnisinterpretation",
      "R",
    ],
  },
  {
    slug: "bachelorarbeit",
    title: "Bachelorarbeit",
    overview: "MILP-Modell für faire Gruppeneinteilung mit Noten und Soft Skills.",
    summary: "In meiner Bachelorarbeit habe ich ein gemischt-ganzzahliges lineares Optimierungsmodell (MILP) konzipiert und implementiert, um die Gruppeneinteilung von Studierenden systematisch und nachvollziehbar zu optimieren. Mein Fokus lag darauf, ein reales Entscheidungsproblem formal zu modellieren und algorithmisch lösbar zu machen. Konkret habe ich: ein mathematisches Modell entwickelt, das mehrere konkurrierende Ziele gleichzeitig berücksichtigt (fachliche Diversität vs. Leistungsähnlichkeit), Nebenbedingungen formuliert, um reale Anforderungen abzubilden (z. B. keine Isolation von Minderheiten, Mindestanzahl gemeinsamer Zeitfenster), erstmals weiche Faktoren wie Führungs- und Sozialkompetenzen explizit in die Optimierung integriert, den Trade-off zwischen Zielkonflikten analysiert und pareto-effiziente Lösungen berechnet. Zur Analyse habe ich verschiedene Szenarien simuliert und die Auswirkungen einzelner Restriktionen systematisch untersucht. Die Implementierung erfolgte modellbasiert (Solver-gestützt), mit klarem Fokus auf Nachvollziehbarkeit, Skalierbarkeit und Entscheidungsunterstützung.",
    pdfUrl: "/assets/projects/Bachelorarbeit.pdf",
    grade: "5.5",
    result: "Pareto-effiziente Kompromisslösungen zwischen Diversität und Leistungsähnlichkeit.",
    cardTech: ["Excel"],
    skills: [
      "Mathematische Optimierung (MILP)",
      "Modellierung komplexer Nebenbedingungen",
      "Trade-off- & Pareto-Analyse",
      "Analytisches Denken & Problemstrukturierung",
      "Quantitative Entscheidungsmodelle",
      "Excel",
    ],
  },
  {
    slug: "agv-scheduling-dss",
    title: "Automated Guided Vehicle Scheduling Problem Decision Support System",
    overview: "DSS zur optimalen AGV-Einsatzplanung mit Energie-, Batterie- und Zeitrestriktionen.",
    summary: "In diesem Projekt habe ich ein Decision Support System (DSS) zur Lösung des Automated Guided Vehicle Scheduling Problems (AGVSP) konzipiert und umgesetzt. Ziel war es, ein reales logistisches Planungsproblem formal zu strukturieren und datenbasiert lösbar zu machen. Ich habe das Problem zunächst analytisch modelliert, indem ich: Transferaufträge mit Bearbeitungszeiten und Energieverbrauch formal beschrieben habe, Fahrzeuge mit begrenzter Batteriekapazität und Ladezeiten berücksichtigt habe, klare Restriktionen definiert habe (jeder Auftrag genau einmal, ausreichende Energiereserve, Batterielimits). Darauf aufbauend habe ich ein System entwickelt, das: Zeitpläne mit minimaler Gesamtdurchlaufzeit berechnet, verschiedene Fahrzeug- und Szenarienkonfigurationen vergleichbar macht, die Auswirkungen von Parameteränderungen (z. B. Anzahl AGVs, Energieverbrauch) transparent darstellt. Ein zentraler Bestandteil meiner Arbeit war die Szenarioanalyse. Ich habe mehrere Einsatzszenarien definiert und systematisch ausgewertet, um zu zeigen, wie sich operative Entscheidungen auf Effizienz und Systemauslastung auswirken. Die Ergebnisse habe ich visuell aufbereitet, sodass Planungsentscheidungen schnell nachvollziehbar werden. Das Projekt zeigt meine Fähigkeit, komplexe operative Probleme zu abstrahieren, in strukturierte Entscheidungsmodelle zu überführen und diese in ein praxisnahes Entscheidungsunterstützungssystem umzusetzen.",
    presentationUrl: "/assets/projects/Präsentation Topic 2.pdf",
    grade: "6",
    result: "Transparente Planungsszenarien und bessere Entscheidungsgrundlagen für den AGV-Einsatz.",
    cardTech: ["Excel"],
    skills: [
      "Entscheidungsunterstützungssysteme (Decision Support Systems)",
      "Optimierungs- & Scheduling-Probleme",
      "Modellierung logistischer Prozesse",
      "Szenario- & Sensitivitätsanalyse",
      "Analytisches Problemlösen & Systemdenken",
      "Datenbasierte Entscheidungsfindung",
      "Ergebnisvisualisierung & Präsentation",
      "Excel",
    ],
  },
  {
    slug: "portfolio-website",
    title: "Portfolio Website",
    overview: "Persönliche Portfolio-Website mit Projektübersicht, Detailseiten und PDF-Downloads.",
    summary: "Diese Website ist als persönliches Portfolio aufgebaut und zeigt Projekte, Werdegang, Ausbildung sowie Kontaktmöglichkeiten. Die Seite basiert auf Vite, React und Tailwind CSS, nutzt wiederverwendbare Komponenten und Framer Motion für Animationen. Inhalte sind in strukturierte Abschnitte gegliedert, inklusive Projektkarten und Detailseiten, auf denen PDFs geöffnet werden können. Gehostet wird die Website von mir selbst auf einem Raspberry Pi.",
    cardTech: ["React", "TypeScript"],
    skills: [
      "Vite",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "shadcn-ui",
      "Framer Motion",
    ],
  },
];
