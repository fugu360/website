const DerivativesPricingGraphic = () => (
  <svg
    viewBox="0 0 800 400"
    className="w-full h-full"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* White background */}
    <rect width="800" height="400" fill="white" />

    {/* Chart plot area background */}
    <rect x="75" y="25" width="665" height="218" fill="#f9fafb" />

    {/* Grid — horizontal */}
    {[50, 82, 114, 146, 178, 210].map((y) => (
      <line key={y} x1="75" y1={y} x2="740" y2={y} stroke="#e5e7eb" strokeWidth="1" />
    ))}
    {/* Grid — vertical */}
    {[75, 208, 341, 474, 607, 740].map((x) => (
      <line key={x} x1={x} y1="25" x2={x} y2="243" stroke="#e5e7eb" strokeWidth="1" />
    ))}

    {/* Strike K (orange dashed) */}
    <line x1="75" y1="98" x2="740" y2="98" stroke="#ff7f0e" strokeWidth="1.5" strokeDasharray="8,5" />
    <text x="746" y="102" fill="#ff7f0e" fontSize="12" fontFamily="Arial, sans-serif" fontWeight="700">K</text>

    {/* Simulation paths — light blue, semi-transparent */}
    <polyline fill="none" stroke="rgba(31,119,180,0.18)" strokeWidth="1.5"
      points="75,132 185,108 295,82 405,60 515,43 625,32 740,28" />
    <polyline fill="none" stroke="rgba(31,119,180,0.18)" strokeWidth="1.5"
      points="75,132 185,116 295,100 405,86 515,72 625,62 740,55" />
    <polyline fill="none" stroke="rgba(31,119,180,0.18)" strokeWidth="1.5"
      points="75,132 185,124 295,114 405,105 515,97 625,90 740,85" />
    <polyline fill="none" stroke="rgba(31,119,180,0.18)" strokeWidth="1.5"
      points="75,132 185,114 295,128 405,106 515,90 625,100 740,87" />
    <polyline fill="none" stroke="rgba(31,119,180,0.18)" strokeWidth="1.5"
      points="75,132 185,120 295,106 405,116 515,98 625,110 740,93" />
    <polyline fill="none" stroke="rgba(31,119,180,0.18)" strokeWidth="1.5"
      points="75,132 185,134 295,130 405,136 515,130 625,136 740,132" />
    <polyline fill="none" stroke="rgba(31,119,180,0.18)" strokeWidth="1.5"
      points="75,132 185,137 295,142 405,138 515,144 625,140 740,142" />
    <polyline fill="none" stroke="rgba(31,119,180,0.18)" strokeWidth="1.5"
      points="75,132 185,140 295,150 405,160 515,168 625,175 740,180" />
    <polyline fill="none" stroke="rgba(31,119,180,0.18)" strokeWidth="1.5"
      points="75,132 185,145 295,160 405,176 515,190 625,202 740,210" />
    <polyline fill="none" stroke="rgba(31,119,180,0.18)" strokeWidth="1.5"
      points="75,132 185,150 295,170 405,192 515,210 625,224 740,234" />
    <polyline fill="none" stroke="rgba(31,119,180,0.18)" strokeWidth="1.5"
      points="75,132 185,142 295,155 405,168 515,162 625,178 740,188" />
    <polyline fill="none" stroke="rgba(31,119,180,0.18)" strokeWidth="1.5"
      points="75,132 185,116 295,132 405,113 515,100 625,112 740,104" />

    {/* Expected value E[S(t)] — bold matplotlib blue */}
    <polyline fill="none" stroke="#1f77b4" strokeWidth="2.5"
      points="75,132 185,125 295,118 405,112 515,106 625,100 740,94" />

    {/* Axes */}
    <line x1="75" y1="25" x2="75" y2="243" stroke="#9ca3af" strokeWidth="1.5" />
    <line x1="75" y1="243" x2="740" y2="243" stroke="#9ca3af" strokeWidth="1.5" />

    {/* S₀ dot and label */}
    <circle cx="75" cy="132" r="5" fill="#1f77b4" />
    <text x="64" y="136" fill="#4b5563" fontSize="11" fontFamily="Arial, sans-serif" textAnchor="end">S₀</text>

    {/* Axis labels */}
    <text x="407" y="264" fill="#6b7280" fontSize="12" fontFamily="Arial, sans-serif" textAnchor="middle">
      t (Handelstage)
    </text>
    <text x="30" y="132" fill="#6b7280" fontSize="12" fontFamily="Arial, sans-serif"
      textAnchor="middle" transform="rotate(-90 30 132)">
      S(t)
    </text>

    {/* Title */}
    <text x="407" y="14" fill="#111827" fontSize="13" fontFamily="Arial, sans-serif"
      textAnchor="middle" fontWeight="600">
      Monte Carlo Simulation — Geometrische Brownsche Bewegung
    </text>

    {/* Legend box */}
    <rect x="538" y="163" width="194" height="72" fill="white" stroke="#e5e7eb" strokeWidth="1" rx="3" />
    <line x1="548" y1="181" x2="578" y2="181" stroke="rgba(31,119,180,0.4)" strokeWidth="1.5" />
    <text x="584" y="185" fill="#374151" fontSize="11" fontFamily="Arial, sans-serif">Simulationspfade</text>
    <line x1="548" y1="199" x2="578" y2="199" stroke="#1f77b4" strokeWidth="2.5" />
    <text x="584" y="203" fill="#374151" fontSize="11" fontFamily="Arial, sans-serif">E[S(t)]</text>
    <line x1="548" y1="217" x2="578" y2="217" stroke="#ff7f0e" strokeWidth="1.5" strokeDasharray="8,5" />
    <text x="584" y="221" fill="#374151" fontSize="11" fontFamily="Arial, sans-serif">Strike K</text>
  </svg>
);

export default DerivativesPricingGraphic;
