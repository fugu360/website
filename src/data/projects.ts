import { LocalizedString } from "@/lib/i18n";

export type Project = {
  slug: string;
  title: LocalizedString;
  overview: LocalizedString;
  summary: LocalizedString;
  pdfUrl?: string;
  presentationUrl?: string;
  grade?: string;
  cardTech?: string[];
  skills?: string[];
  result?: LocalizedString;
};

export const projects: Project[] = [
  {
    slug: "aktives-portfoliomanagement",
    title: {
      de: "Aktives Portfoliomanagement",
      en: "Active Portfolio Management",
    },
    overview: {
      de: "ESG-Portfoliooptimierung mit Python, Rebalancing und Performancevergleich.",
      en: "ESG portfolio optimization with Python, rebalancing, and performance comparison.",
    },
    summary: {
      de: "In diesem Projekt habe ich ein ESG-sensitives Portfolio-Optimierungsmodell basierend auf dem Mean-Variance-Ansatz entwickelt, umgesetzt und mit echten Marktdaten getestet. Mein Arbeitsbereich reichte von der Modellierung bis zur Leistungsbewertung: Ich formulierte ein gemischt-ganzzahliges quadratisches Optimierungsproblem, integrierte ESG-Constraints in eine klassische Risiko-Rendite-Optimierung, erweiterte das Modell um Mindestinvestitionsanforderungen, um realistische Portfolios zu gewährleisten, programmierte das Modell in Python, entwickelte einen dynamischen Rebalancing-Prozess über mehrere Perioden und führte eine quantitative Performance-Analyse (Volatilität, Sortino Ratio) im Vergleich zum SMI durch. Die Ergebnisse zeigten, dass das optimierte Portfolio bei geringerem Risiko eine bessere risikoadjustierte Rendite als die Benchmark erzielte, insbesondere unter strikteren ESG-Restriktionen. Das Projekt verbindet theoretische Finanzmodelle mit praktischer Umsetzung.",
      en: "In this project I developed, implemented, and tested an ESG-sensitive portfolio optimization model based on the mean-variance approach using real market data. My scope ranged from modeling to performance evaluation: I formulated a mixed-integer quadratic optimization problem, integrated ESG constraints into a classic risk-return optimization, extended the model with minimum investment requirements to ensure realistic portfolios, implemented the model in Python, built a dynamic multi-period rebalancing process, and conducted a quantitative performance analysis (volatility, Sortino ratio) versus the SMI. The results showed that the optimized portfolio achieved a better risk-adjusted return than the benchmark at lower risk, especially under stricter ESG restrictions. The project connects theoretical finance models with practical implementation.",
    },
    pdfUrl: "/assets/projects/Aktives Portfoliomanagement.pdf",
    grade: "5.5",
    result: {
      de: "Optimiertes Portfolio mit geringerer Volatilität und besserer Sortino Ratio als der SMI.",
      en: "Optimized portfolio with lower volatility and a better Sortino ratio than the SMI.",
    },
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
    title: {
      de: "Auswirkung der Trump-Wahl auf ausgewählte Aktienindizes",
      en: "Impact of the Trump Election on Selected Stock Indices",
    },
    overview: {
      de: "Event-Studie zur Marktreaktion auf die Trump-Wahl mit DiD und t-Test.",
      en: "Event study on market reaction to the Trump election using DiD and t-test.",
    },
    summary: {
      de: "In diesem Projekt habe ich empirisch untersucht, wie Finanzmärkte auf ein politisches Großereignis reagieren. Konkret analysierte ich die Auswirkungen der Amtseinführung von Donald Trump auf US-amerikanische und internationale Aktienindizes. Mein Beitrag lag vor allem in der methodisch sauberen quantitativen Analyse: Beschaffung und Aufbereitung von Finanzmarktdaten über eine API (Yahoo Finance), Visualisierung von Zeitreihen zur explorativen Analyse, Anwendung der Difference-in-Differences-Methode, um kausale Effekte abzuschätzen, Durchführung eines statistischen Hypothesentests (t-Test) auf Basis täglicher Renditen, Interpretation der Ergebnisse aus ökonomischer und statistischer Perspektive. Die Analyse zeigte eine relative Underperformance der US-Märkte nach dem Ereignis, während internationale Märkte stabiler reagierten. Auch wenn die Ergebnisse auf dem 5-%-Niveau nicht signifikant waren, konnte ich einen klaren ökonomischen Trend herausarbeiten und kritisch einordnen.",
      en: "In this project I empirically analyzed how financial markets react to a major political event. Specifically, I examined the impact of Donald Trump’s inauguration on US and international stock indices. My contribution focused on rigorous quantitative analysis: acquiring and cleaning market data via the Yahoo Finance API, visualizing time series for exploratory analysis, applying a difference-in-differences approach to estimate causal effects, running a statistical hypothesis test (t-test) on daily returns, and interpreting results from both an economic and statistical perspective. The analysis showed a relative underperformance of US markets after the event while international markets reacted more steadily. Although results were not statistically significant at the 5% level, I identified a clear economic trend and critically assessed it.",
    },
    pdfUrl: "/assets/projects/Auswirkung der Trump-Wahl auf ausgewählte.pdf",
    grade: "5.5",
    result: {
      de: "Relative Underperformance der US-Märkte nach dem Ereignis bei stabileren internationalen Indizes.",
      en: "Relative underperformance of US markets after the event, with more stable international indices.",
    },
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
    title: {
      de: "Bachelorarbeit",
      en: "Bachelor Thesis",
    },
    overview: {
      de: "MILP-Modell für faire Gruppeneinteilung mit Noten und Soft Skills.",
      en: "MILP model for fair group allocation with grades and soft skills.",
    },
    summary: {
      de: "In meiner Bachelorarbeit habe ich ein gemischt-ganzzahliges lineares Optimierungsmodell (MILP) konzipiert und implementiert, um die Gruppeneinteilung von Studierenden systematisch und nachvollziehbar zu optimieren. Mein Fokus lag darauf, ein reales Entscheidungsproblem formal zu modellieren und algorithmisch lösbar zu machen. Konkret habe ich: ein mathematisches Modell entwickelt, das mehrere konkurrierende Ziele gleichzeitig berücksichtigt (fachliche Diversität vs. Leistungsähnlichkeit), Nebenbedingungen formuliert, um reale Anforderungen abzubilden (z. B. keine Isolation von Minderheiten, Mindestanzahl gemeinsamer Zeitfenster), erstmals weiche Faktoren wie Führungs- und Sozialkompetenzen explizit in die Optimierung integriert, den Trade-off zwischen Zielkonflikten analysiert und pareto-effiziente Lösungen berechnet. Zur Analyse habe ich verschiedene Szenarien simuliert und die Auswirkungen einzelner Restriktionen systematisch untersucht. Die Implementierung erfolgte modellbasiert (Solver-gestützt), mit klarem Fokus auf Nachvollziehbarkeit, Skalierbarkeit und Entscheidungsunterstützung.",
      en: "In my bachelor thesis I designed and implemented a mixed-integer linear optimization model (MILP) to optimize student group allocation in a systematic and transparent way. My focus was to formalize a real decision problem and make it solvable algorithmically. Specifically, I developed a mathematical model that balances competing objectives (disciplinary diversity vs. performance similarity), formulated constraints to reflect real requirements (e.g., no isolation of minorities, minimum number of shared time slots), integrated soft factors such as leadership and social skills into the optimization, and analyzed trade-offs to compute Pareto-efficient solutions. I simulated multiple scenarios and systematically examined the impact of individual constraints. The implementation was model-driven (solver-based), with a clear focus on transparency, scalability, and decision support.",
    },
    pdfUrl: "/assets/projects/Bachelorarbeit.pdf",
    grade: "5.5",
    result: {
      de: "Pareto-effiziente Kompromisslösungen zwischen Diversität und Leistungsähnlichkeit.",
      en: "Pareto-efficient trade-offs between diversity and performance similarity.",
    },
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
    title: {
      de: "Automated Guided Vehicle Scheduling Problem Decision Support System",
      en: "Automated Guided Vehicle Scheduling Problem Decision Support System",
    },
    overview: {
      de: "DSS zur optimalen AGV-Einsatzplanung mit Energie-, Batterie- und Zeitrestriktionen.",
      en: "DSS for optimal AGV scheduling with energy, battery, and time constraints.",
    },
    summary: {
      de: "In diesem Projekt habe ich ein Decision Support System (DSS) zur Lösung des Automated Guided Vehicle Scheduling Problems (AGVSP) konzipiert und umgesetzt. Ziel war es, ein reales logistisches Planungsproblem formal zu strukturieren und datenbasiert lösbar zu machen. Ich habe das Problem zunächst analytisch modelliert, indem ich: Transferaufträge mit Bearbeitungszeiten und Energieverbrauch formal beschrieben habe, Fahrzeuge mit begrenzter Batteriekapazität und Ladezeiten berücksichtigt habe, klare Restriktionen definiert habe (jeder Auftrag genau einmal, ausreichende Energiereserve, Batterielimits). Darauf aufbauend habe ich ein System entwickelt, das: Zeitpläne mit minimaler Gesamtdurchlaufzeit berechnet, verschiedene Fahrzeug- und Szenarienkonfigurationen vergleichbar macht, die Auswirkungen von Parameteränderungen (z. B. Anzahl AGVs, Energieverbrauch) transparent darstellt. Ein zentraler Bestandteil meiner Arbeit war die Szenarioanalyse. Ich habe mehrere Einsatzszenarien definiert und systematisch ausgewertet, um zu zeigen, wie sich operative Entscheidungen auf Effizienz und Systemauslastung auswirken. Die Ergebnisse habe ich visuell aufbereitet, sodass Planungsentscheidungen schnell nachvollziehbar werden. Das Projekt zeigt meine Fähigkeit, komplexe operative Probleme zu abstrahieren, in strukturierte Entscheidungsmodelle zu überführen und diese in ein praxisnahes Entscheidungsunterstützungssystem umzusetzen.",
      en: "In this project I designed and implemented a decision support system (DSS) for the Automated Guided Vehicle Scheduling Problem (AGVSP). The goal was to structure a real logistics planning problem and make it solvable with data. I first modeled the problem analytically by defining transfer orders with processing times and energy consumption, accounting for vehicles with limited battery capacity and charging times, and specifying clear constraints (each order exactly once, sufficient energy reserve, battery limits). Building on this, I developed a system that computes schedules with minimal total makespan, compares vehicle and scenario configurations, and transparently shows the effects of parameter changes (e.g., number of AGVs, energy consumption). Scenario analysis was a core part of the work: I defined multiple deployment scenarios and evaluated them systematically to show how operational decisions affect efficiency and utilization. I presented the results visually so planning decisions are easy to interpret. The project demonstrates my ability to abstract complex operational problems, translate them into structured decision models, and implement a practical decision support system.",
    },
    presentationUrl: "/assets/projects/Präsentation Topic 2.pdf",
    grade: "6",
    result: {
      de: "Transparente Planungsszenarien und bessere Entscheidungsgrundlagen für den AGV-Einsatz.",
      en: "Transparent planning scenarios and improved decision basis for AGV deployment.",
    },
    cardTech: ["Excel", "VBA"],
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
    title: {
      de: "Portfolio Website",
      en: "Portfolio Website",
    },
    overview: {
      de: "Persönliche Portfolio-Website mit Projektübersicht, Detailseiten und PDF-Downloads.",
      en: "Personal portfolio website with project overview, detail pages, and PDF downloads.",
    },
    summary: {
      de: "Diese Website ist als persönliches Portfolio aufgebaut und zeigt Projekte, Werdegang, Ausbildung sowie Kontaktmöglichkeiten. Die Seite basiert auf Vite, React und Tailwind CSS, nutzt wiederverwendbare Komponenten und Framer Motion für Animationen. Inhalte sind in strukturierte Abschnitte gegliedert, inklusive Projektkarten und Detailseiten, auf denen PDFs geöffnet werden können. Gehostet wird die Website von mir selbst auf einem Raspberry Pi.",
      en: "This website is a personal portfolio showcasing projects, career, education, and contact options. It is built with Vite, React, and Tailwind CSS, uses reusable components and Framer Motion for animations, and organizes content into structured sections, including project cards and detail pages where PDFs can be opened. The site is self-hosted on a Raspberry Pi.",
    },
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
