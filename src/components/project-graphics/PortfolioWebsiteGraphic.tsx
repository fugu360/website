// Component architecture diagram — clean white/matplotlib style

const BOX_FILL = "#eff6ff";
const BOX_STROKE = "#93c5fd";
const BOX_TEXT = "#1e3a8a";
const LINE_COLOR = "#94a3b8";
const LABEL_COLOR = "#374151";

type Box = { x: number; y: number; w: number; h: number; label: string };

const root: Box = { x: 315, y: 22, w: 170, h: 30, label: "portfolio-website" };

const level1: Box[] = [
  { x: 60,  y: 88, w: 110, h: 28, label: "Navbar" },
  { x: 315, y: 88, w: 170, h: 28, label: "Index.tsx" },
  { x: 630, y: 88, w: 110, h: 28, label: "Footer" },
];

const level2: Box[] = [
  { x: 62,  y: 158, w: 115, h: 26, label: "HeroSection" },
  { x: 192, y: 158, w: 115, h: 26, label: "AboutSection" },
  { x: 322, y: 158, w: 122, h: 26, label: "ProjectsSection" },
  { x: 459, y: 158, w: 122, h: 26, label: "ContactSection" },
  { x: 596, y: 158, w: 115, h: 26, label: "SkillsSection" },
];

const techStack = [
  { label: "React", x: 95 },
  { label: "TypeScript", x: 188 },
  { label: "Tailwind CSS", x: 308 },
  { label: "Vite", x: 430 },
  { label: "Framer Motion", x: 498 },
  { label: "Raspberry Pi", x: 631 },
];

const cx = (b: Box) => b.x + b.w / 2;
const cy = (b: Box) => b.y + b.h / 2;

const Rect = ({ b }: { b: Box }) => (
  <g>
    <rect x={b.x} y={b.y} width={b.w} height={b.h} rx="5"
      fill={BOX_FILL} stroke={BOX_STROKE} strokeWidth="1.2" />
    <text x={cx(b)} y={cy(b) + 4.5} fill={BOX_TEXT} fontSize="11.5"
      fontFamily="Arial, sans-serif" fontWeight="600" textAnchor="middle">
      {b.label}
    </text>
  </g>
);

const PortfolioWebsiteGraphic = () => (
  <svg
    viewBox="0 0 800 400"
    className="w-full h-full"
    preserveAspectRatio="xMidYMid slice"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* White background */}
    <rect width="800" height="400" fill="white" />

    {/* Subtle grid background */}
    {Array.from({ length: 12 }, (_, i) => i * 66).map((x) => (
      <line key={x} x1={x} y1="0" x2={x} y2="400" stroke="#f3f4f6" strokeWidth="1" />
    ))}
    {Array.from({ length: 7 }, (_, i) => i * 60).map((y) => (
      <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="#f3f4f6" strokeWidth="1" />
    ))}

    {/* Title */}
    <text x="400" y="13" fill="#111827" fontSize="13" fontFamily="Arial, sans-serif"
      textAnchor="middle" fontWeight="600">
      Komponentenarchitektur — Portfolio Website
    </text>

    {/* Root → Level 1 connecting lines */}
    {/* Vertical from root bottom to horizontal bar */}
    <line x1={cx(root)} y1={root.y + root.h} x2={cx(root)} y2={80}
      stroke={LINE_COLOR} strokeWidth="1.2" />
    {/* Horizontal bar across level 1 centers */}
    <line x1={cx(level1[0])} y1={80} x2={cx(level1[2])} y2={80}
      stroke={LINE_COLOR} strokeWidth="1.2" />
    {/* Verticals down to each level 1 box */}
    {level1.map((b) => (
      <line key={b.label} x1={cx(b)} y1={80} x2={cx(b)} y2={b.y}
        stroke={LINE_COLOR} strokeWidth="1.2" />
    ))}

    {/* Index → Level 2 connecting lines */}
    {/* Vertical from Index bottom down */}
    <line x1={cx(level1[1])} y1={level1[1].y + level1[1].h}
      x2={cx(level1[1])} y2={150}
      stroke={LINE_COLOR} strokeWidth="1.2" />
    {/* Horizontal bar across level 2 centers */}
    <line x1={cx(level2[0])} y1={150} x2={cx(level2[4])} y2={150}
      stroke={LINE_COLOR} strokeWidth="1.2" />
    {/* Verticals down to each level 2 box */}
    {level2.map((b) => (
      <line key={b.label} x1={cx(b)} y1={150} x2={cx(b)} y2={b.y}
        stroke={LINE_COLOR} strokeWidth="1.2" />
    ))}

    {/* Render boxes */}
    <Rect b={root} />
    {level1.map((b) => <Rect key={b.label} b={b} />)}
    {level2.map((b) => <Rect key={b.label} b={b} />)}

    {/* Divider */}
    <line x1="60" y1="210" x2="740" y2="210" stroke="#e5e7eb" strokeWidth="1" />

    {/* Tech stack label */}
    <text x="400" y="228" fill="#6b7280" fontSize="11" fontFamily="Arial, sans-serif"
      textAnchor="middle" fontWeight="600" letterSpacing="0.8">
      TECHNOLOGIEN
    </text>

    {/* Tech badges */}
    {techStack.map(({ label, x }) => {
      const w = label.length * 7.2 + 16;
      return (
        <g key={label}>
          <rect x={x} y={236} width={w} height={22} rx="11"
            fill="#eff6ff" stroke="#93c5fd" strokeWidth="1" />
          <text x={x + w / 2} y={251} fill="#1e40af" fontSize="10.5"
            fontFamily="Arial, sans-serif" textAnchor="middle" fontWeight="600">
            {label}
          </text>
        </g>
      );
    })}

    {/* Self-hosted note */}
    <text x="400" y="285" fill="#9ca3af" fontSize="11" fontFamily="Arial, sans-serif"
      textAnchor="middle">
      Self-hosted on Raspberry Pi · github.com/fugu360/website
    </text>
  </svg>
);

export default PortfolioWebsiteGraphic;
