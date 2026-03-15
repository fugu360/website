// Pareto-Frontier: x = Leistungsähnlichkeit →, y = Diversität ↑ (SVG y-inverted: low y = high diversity)

const paretoPoints: [number, number][] = [
  [85, 32], [160, 60], [240, 90], [320, 120],
  [400, 148], [478, 175], [555, 202], [630, 225], [705, 238],
];

const dominated: [number, number][] = [
  [100, 90], [120, 130], [150, 110], [175, 150], [200, 118],
  [225, 160], [255, 132], [280, 168], [305, 148], [318, 182],
  [340, 170], [362, 190], [382, 180], [402, 196], [425, 206],
  [450, 200], [480, 216], [502, 210], [522, 220], [548, 226],
  [572, 232], [600, 236], [622, 238], [648, 238], [670, 238],
  [135, 182], [205, 190], [305, 210], [405, 228], [138, 236],
];

const BachelorarbeitGraphic = () => {
  const ptStr = paretoPoints.map(([x, y]) => `${x},${y}`).join(" ");

  return (
    <svg
      viewBox="0 0 800 400"
      className="w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* White background */}
      <rect width="800" height="400" fill="white" />

      {/* Chart plot area */}
      <rect x="75" y="25" width="655" height="218" fill="#f9fafb" />

      {/* Grid — horizontal */}
      {[50, 82, 114, 146, 178, 210].map((y) => (
        <line key={y} x1="75" y1={y} x2="730" y2={y} stroke="#e5e7eb" strokeWidth="1" />
      ))}
      {/* Grid — vertical */}
      {[75, 206, 337, 468, 599, 730].map((x) => (
        <line key={x} x1={x} y1="25" x2={x} y2="243" stroke="#e5e7eb" strokeWidth="1" />
      ))}

      {/* Axes */}
      <line x1="75" y1="25" x2="75" y2="243" stroke="#9ca3af" strokeWidth="1.5" />
      <line x1="75" y1="243" x2="730" y2="243" stroke="#9ca3af" strokeWidth="1.5" />

      {/* Axis arrows */}
      <polygon points="730,243 720,239 720,247" fill="#9ca3af" />
      <polygon points="75,25 71,35 79,35" fill="#9ca3af" />

      {/* Dominated scatter points — gray */}
      {dominated.map(([x, y], i) => (
        <circle
          key={i} cx={x} cy={y} r="4.5"
          fill="#d1d5db" stroke="#9ca3af" strokeWidth="0.8"
        />
      ))}

      {/* Pareto frontier line */}
      <polyline
        points={ptStr}
        fill="none" stroke="#1f77b4" strokeWidth="2.2"
        strokeLinejoin="round"
      />

      {/* Pareto-optimal points — filled blue */}
      {paretoPoints.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5.5" fill="#1f77b4" stroke="white" strokeWidth="1.5" />
      ))}

      {/* Frontier label */}
      <text x="312" y="86" fill="#1f77b4" fontSize="11.5" fontFamily="Arial, sans-serif" fontWeight="600">
        ← Pareto-Grenze
      </text>

      {/* Axis labels */}
      <text x="402" y="264" fill="#6b7280" fontSize="12" fontFamily="Arial, sans-serif" textAnchor="middle">
        Leistungsähnlichkeit →
      </text>
      <text x="30" y="134" fill="#6b7280" fontSize="12" fontFamily="Arial, sans-serif"
        textAnchor="middle" transform="rotate(-90 30 134)">
        Diversität →
      </text>

      {/* Title */}
      <text x="402" y="14" fill="#111827" fontSize="13" fontFamily="Arial, sans-serif"
        textAnchor="middle" fontWeight="600">
        Pareto-Frontier — Diversität vs. Leistungsähnlichkeit (MILP)
      </text>

      {/* Legend */}
      <rect x="510" y="28" width="210" height="52" fill="white" stroke="#e5e7eb" strokeWidth="1" rx="3" />
      <circle cx="524" cy="45" r="4.5" fill="#d1d5db" stroke="#9ca3af" strokeWidth="0.8" />
      <text x="534" y="49" fill="#374151" fontSize="11" fontFamily="Arial, sans-serif">Dominierte Lösungen</text>
      <circle cx="524" cy="65" r="5" fill="#1f77b4" stroke="white" strokeWidth="1.5" />
      <text x="534" y="69" fill="#374151" fontSize="11" fontFamily="Arial, sans-serif">Pareto-optimale Lösungen</text>
    </svg>
  );
};

export default BachelorarbeitGraphic;
