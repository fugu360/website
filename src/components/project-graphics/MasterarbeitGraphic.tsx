import { useLanguage } from "@/lib/i18n";

const MasterarbeitGraphic = () => {
  const { isEnglish } = useLanguage();
  const toX = (t: number) => 80 + (t / 60) * 660;
  const toY = (v: number) => 310 - (v / 100) * 280;

  const milpPts:  [number, number][] = [[0,100],[3,92],[6,87],[15,83],[30,80],[60,78]];
  const acPts:    [number, number][] = [[0,100],[1,65],[2,50],[5,38],[10,32],[20,28],[60,25]];
  const msPts:    [number, number][] = [[0,100],[0.5,60],[1,40],[2,25],[4,20],[10,17],[30,16],[60,15]];

  const pts = (data: [number, number][]) =>
    data.map(([t, v]) => `${toX(t).toFixed(1)},${toY(v).toFixed(1)}`).join(" ");

  const x4 = toX(4);

  const gridY = [20, 40, 60, 80];
  const gridT = [10, 20, 30, 40, 50];
  const tickT = [0, 10, 20, 30, 40, 50, 60];
  const tickV = [20, 40, 60, 80, 100];

  return (
    <svg
      viewBox="0 0 800 400"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="800" height="400" fill="white" />

      {/* Plot area */}
      <rect x="80" y="30" width="660" height="280" fill="#f9fafb" />

      {/* Horizontal grid */}
      {gridY.map((v) => (
        <line key={v} x1="80" y1={toY(v)} x2="740" y2={toY(v)} stroke="#e5e7eb" strokeWidth="1" />
      ))}

      {/* Vertical grid */}
      {gridT.map((t) => (
        <line key={t} x1={toX(t)} y1="30" x2={toX(t)} y2="310" stroke="#e5e7eb" strokeWidth="1" />
      ))}

      {/* Axes */}
      <line x1="80" y1="30" x2="80" y2="310" stroke="#9ca3af" strokeWidth="1.5" />
      <line x1="80" y1="310" x2="740" y2="310" stroke="#9ca3af" strokeWidth="1.5" />

      {/* Axis arrows */}
      <polygon points="740,310 730,306 730,314" fill="#9ca3af" />
      <polygon points="80,30 76,40 84,40" fill="#9ca3af" />

      {/* 4-min marker */}
      <line x1={x4} y1="30" x2={x4} y2="310" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="4,4" />
      <text x={x4 + 3} y="48" fill="#ef4444" fontSize="10" fontFamily="Arial, sans-serif">4 min</text>

      {/* Data lines */}
      <polyline points={pts(milpPts)} fill="none" stroke="#9ca3af" strokeWidth="2" strokeDasharray="8,4" strokeLinejoin="round" />
      <polyline points={pts(acPts)}   fill="none" stroke="#1f77b4" strokeWidth="2.2" strokeLinejoin="round" />
      <polyline points={pts(msPts)}   fill="none" stroke="#2ca02c" strokeWidth="2.2" strokeLinejoin="round" />

      {/* X-axis tick labels */}
      {tickT.map((t) => (
        <text key={t} x={toX(t)} y="325" fill="#6b7280" fontSize="10" fontFamily="Arial, sans-serif" textAnchor="middle">{t}</text>
      ))}

      {/* Y-axis tick labels */}
      {tickV.map((v) => (
        <text key={v} x="72" y={toY(v) + 4} fill="#6b7280" fontSize="10" fontFamily="Arial, sans-serif" textAnchor="end">{v}</text>
      ))}

      {/* Axis labels */}
      <text x="410" y="348" fill="#6b7280" fontSize="12" fontFamily="Arial, sans-serif" textAnchor="middle">
        {isEnglish ? "Time (Minutes)" : "Zeit (Minuten)"}
      </text>
      <text
        x="22" y="170"
        fill="#6b7280" fontSize="12" fontFamily="Arial, sans-serif"
        textAnchor="middle"
        transform="rotate(-90 22 170)"
      >
        {isEnglish ? "Objective Value (normalized)" : "Zielfunktionswert (normiert)"}
      </text>

      {/* Title */}
      <text x="410" y="18" fill="#111827" fontSize="13" fontFamily="Arial, sans-serif" textAnchor="middle" fontWeight="600">
        {isEnglish
          ? "Solution Quality over Time — Large Instance (schematic)"
          : "Lösungsqualität über Zeit — Grosse Instanz (schematisch)"}
      </text>

      {/* Legend */}
      <rect x="450" y="42" width="280" height="76" fill="white" stroke="#e5e7eb" strokeWidth="1" rx="3" />
      <line x1="464" y1="59" x2="492" y2="59" stroke="#9ca3af" strokeWidth="2" strokeDasharray="7,3" />
      <text x="500" y="63" fill="#374151" fontSize="11" fontFamily="Arial, sans-serif">
        {isEnglish ? "MILP (exact model)" : "MILP (exaktes Modell)"}
      </text>
      <line x1="464" y1="79" x2="492" y2="79" stroke="#1f77b4" strokeWidth="2.2" />
      <text x="500" y="83" fill="#374151" fontSize="11" fontFamily="Arial, sans-serif">
        {isEnglish ? "Adaptive Cohort Matheuristic" : "Adaptive Cohort Matheuristik"}
      </text>
      <line x1="464" y1="99" x2="492" y2="99" stroke="#2ca02c" strokeWidth="2.2" />
      <text x="500" y="103" fill="#374151" fontSize="11" fontFamily="Arial, sans-serif">
        {isEnglish ? "Multi-Strategy Matheuristic" : "Multi-Strategy Matheuristik"}
      </text>
    </svg>
  );
};

export default MasterarbeitGraphic;
