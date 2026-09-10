/**
 * Stylised Jharkhand outline used as a district concentration graphic.
 * Dots are positioned approximately and sized by problem count.
 */
const POINTS: Record<string, { x: number; y: number }> = {
  Ranchi: { x: 148, y: 150 },
  Gumla: { x: 96, y: 168 },
  Simdega: { x: 88, y: 205 },
  Khunti: { x: 132, y: 182 },
  Lohardaga: { x: 108, y: 140 },
  Palamu: { x: 78, y: 96 },
  Garhwa: { x: 48, y: 104 },
  Latehar: { x: 92, y: 122 },
  Chatra: { x: 122, y: 92 },
  Hazaribagh: { x: 156, y: 104 },
  Ramgarh: { x: 158, y: 128 },
  Koderma: { x: 172, y: 80 },
  Giridih: { x: 200, y: 92 },
  Bokaro: { x: 190, y: 128 },
  Dhanbad: { x: 216, y: 118 },
  Jamshedpur: { x: 186, y: 190 },
  Chaibasa: { x: 146, y: 205 },
  Deoghar: { x: 236, y: 88 },
  Dumka: { x: 254, y: 106 },
  Godda: { x: 262, y: 72 },
  Sahibganj: { x: 280, y: 56 },
  Pakur: { x: 278, y: 92 },
};

export function JharkhandMap({ data }: { data: { name: string; count: number }[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);

  return (
    <svg viewBox="0 0 320 250" className="h-64 w-full" role="img" aria-label="District concentration map of Jharkhand">
      <path
        d="M52 96 L70 62 L104 52 L140 60 L176 48 L214 44 L252 34 L288 44 L296 70 L282 100 L268 122 L246 132 L232 150 L206 168 L192 200 L162 224 L128 218 L98 224 L74 200 L84 168 L66 142 L44 118 Z"
        fill="var(--color-secondary)"
        stroke="var(--color-primary)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {data.map((d) => {
        const key = Object.keys(POINTS).find((k) => d.name.startsWith(k));
        const pt = key ? POINTS[key] : undefined;
        if (!pt) return null;
        const ratio = d.count / max;
        return (
          <g key={d.name}>
            <circle
              cx={pt.x}
              cy={pt.y}
              r={8 + ratio * 16}
              fill="var(--color-accent)"
              opacity={0.18 + ratio * 0.42}
            />
            <circle cx={pt.x} cy={pt.y} r={3.5} fill="var(--color-accent)" />
            <text
              x={pt.x}
              y={pt.y - 12 - ratio * 14}
              textAnchor="middle"
              fontSize="9"
              fontWeight="600"
              fill="var(--color-foreground)"
            >
              {key} · {d.count}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
