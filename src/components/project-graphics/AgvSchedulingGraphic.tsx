// Matplotlib-style Gantt chart for AGV scheduling

const toX = (t: number) => 95 + t * 6.45; // t: 0–100 → x: 95–740
const ROW_H = 38;
const CHARGE_COLOR = "#ff7f0e"; // matplotlib orange
const IDLE_FILL = "#f3f4f6";
const IDLE_STROKE = "#d1d5db";

const agvs = [
  {
    name: "AGV 1",
    y: 35,
    color: "#1f77b4", // matplotlib blue
    tasks: [
      { s: 0,  e: 22,  label: "T1", type: "task" },
      { s: 22, e: 30,  label: "⚡", type: "charge" },
      { s: 30, e: 52,  label: "T2", type: "task" },
      { s: 52, e: 57,  label: "",   type: "idle" },
      { s: 57, e: 76,  label: "T3", type: "task" },
      { s: 76, e: 100, label: "T4", type: "task" },
    ],
  },
  {
    name: "AGV 2",
    y: 95,
    color: "#2ca02c", // matplotlib green
    tasks: [
      { s: 0,  e: 11,  label: "",   type: "idle" },
      { s: 11, e: 36,  label: "T1", type: "task" },
      { s: 36, e: 58,  label: "T2", type: "task" },
      { s: 58, e: 68,  label: "⚡", type: "charge" },
      { s: 68, e: 100, label: "T3", type: "task" },
    ],
  },
  {
    name: "AGV 3",
    y: 155,
    color: "#9467bd", // matplotlib purple
    tasks: [
      { s: 0,  e: 25,  label: "T1", type: "task" },
      { s: 25, e: 36,  label: "",   type: "idle" },
      { s: 36, e: 56,  label: "T2", type: "task" },
      { s: 56, e: 66,  label: "⚡", type: "charge" },
      { s: 66, e: 84,  label: "T3", type: "task" },
      { s: 84, e: 100, label: "T4", type: "task" },
    ],
  },
];

const AgvSchedulingGraphic = () => (
  <svg
    viewBox="0 0 800 400"
    className="w-full h-full"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* White background */}
    <rect width="800" height="400" fill="white" />

    {/* Title */}
    <text x="417" y="14" fill="#111827" fontSize="13" fontFamily="Arial, sans-serif"
      textAnchor="middle" fontWeight="600">
      AGV-Einsatzplanung — Gantt-Diagramm (minimierter Makespan)
    </text>

    {/* Vertical time grid */}
    {[0, 25, 50, 75, 100].map((t) => (
      <line key={t} x1={toX(t)} y1="28" x2={toX(t)} y2="210"
        stroke="#e5e7eb" strokeWidth="1" />
    ))}

    {/* AGV rows */}
    {agvs.map((agv) => (
      <g key={agv.name}>
        {/* Row background */}
        <rect x={95} y={agv.y} width={645} height={ROW_H} fill="#f9fafb" />

        {/* AGV label */}
        <text x={84} y={agv.y + ROW_H / 2 + 5}
          fill="#374151" fontSize="12" fontFamily="Arial, sans-serif"
          textAnchor="end" fontWeight="600">
          {agv.name}
        </text>

        {/* Task bars */}
        {agv.tasks.map((task, i) => {
          const x = toX(task.s);
          const w = toX(task.e) - toX(task.s);
          const isIdle = task.type === "idle";
          const isCharge = task.type === "charge";
          const fill = isIdle ? IDLE_FILL : isCharge ? CHARGE_COLOR : agv.color;
          const stroke = isIdle ? IDLE_STROKE : isCharge ? "#d4620a" : "none";
          const textFill = isCharge ? "white" : isIdle ? "#9ca3af" : "white";

          return (
            <g key={i}>
              <rect
                x={x + 0.5} y={agv.y + 2} width={w - 1} height={ROW_H - 4}
                fill={fill} stroke={stroke} strokeWidth={isIdle ? 0.8 : 0} rx="2"
              />
              {task.label && w > 18 && (
                <text
                  x={x + w / 2} y={agv.y + ROW_H / 2 + 5}
                  fill={textFill} fontSize="10.5" fontFamily="Arial, sans-serif"
                  textAnchor="middle" fontWeight="600"
                >
                  {task.label}
                </text>
              )}
            </g>
          );
        })}
      </g>
    ))}

    {/* Time axis */}
    <line x1={95} y1={210} x2={740} y2={210} stroke="#9ca3af" strokeWidth="1.5" />
    {[0, 25, 50, 75, 100].map((t) => (
      <g key={t}>
        <line x1={toX(t)} y1={210} x2={toX(t)} y2={218} stroke="#6b7280" strokeWidth="1.5" />
        <text x={toX(t)} y={232} fill="#6b7280" fontSize="11" fontFamily="Arial, sans-serif"
          textAnchor="middle">
          {t}
        </text>
      </g>
    ))}
    <text x={417} y={250} fill="#6b7280" fontSize="12" fontFamily="Arial, sans-serif"
      textAnchor="middle">
      Zeiteinheiten
    </text>

    {/* Legend */}
    <rect x={130} y={265} width={520} height={32} fill="#f9fafb" stroke="#e5e7eb" strokeWidth="1" rx="4" />
    <rect x={145} y={275} width={14} height={12} fill="#1f77b4" rx="2" />
    <text x={164} y={285} fill="#374151" fontSize="11" fontFamily="Arial, sans-serif">Transportauftrag</text>
    <rect x={285} y={275} width={14} height={12} fill={CHARGE_COLOR} rx="2" />
    <text x={304} y={285} fill="#374151" fontSize="11" fontFamily="Arial, sans-serif">Ladevorgang</text>
    <rect x={405} y={275} width={14} height={12} fill={IDLE_FILL} stroke={IDLE_STROKE} strokeWidth="0.8" rx="2" />
    <text x={424} y={285} fill="#374151" fontSize="11" fontFamily="Arial, sans-serif">Idle</text>
    <text x={510} y={285} fill="#6b7280" fontSize="11" fontFamily="Arial, sans-serif">3 Fahrzeuge</text>
  </svg>
);

export default AgvSchedulingGraphic;
