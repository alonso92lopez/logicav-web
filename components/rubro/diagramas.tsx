import type { DiagramaId } from "@/lib/rubros/tipos";

/* Variables y no valores fijos: el diagrama toma el tema del rubro. */
const NAVY = "var(--color-navy-800)";
const AGUA = "var(--color-navy-500)";
const GRIS = "var(--color-steel-500)";

const rotulo = {
  fontFamily: "var(--font-barlow), Arial, sans-serif",
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: "0.08em",
  fill: NAVY,
} as const;

const nota = {
  fontFamily: "var(--font-plex), Arial, sans-serif",
  fontSize: 11,
  fill: GRIS,
} as const;

/* Marca numerada: apunta a la etapa del protocolo que actúa en ese punto. */
function Marca({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={13} fill="var(--color-flame-500)" stroke="#fff" strokeWidth={2} />
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        style={{ ...rotulo, fontSize: 14, fill: "#fff", letterSpacing: 0 }}
      >
        {n}
      </text>
    </g>
  );
}

/* Piscina → skimmer y fondo → bomba → filtro → clorador → retorno. */
function CircuitoAgua() {
  return (
    <svg
      viewBox="0 0 700 300"
      role="img"
      aria-label="Circuito de agua de la piscina: el agua sale por el skimmer y el fondo, pasa por la bomba, el filtro y el clorador, y retorna a la piscina"
      className="h-auto w-full min-w-[560px]"
    >
      <defs>
        <marker
          id="flecha-circuito"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10 z" fill={NAVY} />
        </marker>
      </defs>

      {/* piscina */}
      <rect x="20" y="70" width="230" height="140" fill="none" stroke={NAVY} strokeWidth="2.5" />
      <rect x="28" y="92" width="214" height="110" fill={AGUA} />
      <path
        d="M40 112 q8 -6 16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0 t16 0"
        fill="none"
        stroke="#fff"
        strokeWidth="1.5"
        opacity=".6"
      />
      <text x="135" y="62" textAnchor="middle" style={rotulo}>
        PISCINA
      </text>

      {/* skimmer y fondo */}
      <rect x="236" y="88" width="14" height="14" fill="#fff" stroke={NAVY} strokeWidth="2" />
      <text x="262" y="84" style={nota}>
        Skimmer
      </text>
      <rect x="120" y="200" width="30" height="8" fill={NAVY} />
      <text x="112" y="232" textAnchor="end" style={nota}>
        Fondo
      </text>

      {/* succión */}
      <path d="M250 95 H285 V175" fill="none" stroke={NAVY} strokeWidth="3" />
      <path
        d="M135 208 V255 H285 V175 H305"
        fill="none"
        stroke={NAVY}
        strokeWidth="3"
        markerEnd="url(#flecha-circuito)"
      />

      {/* bomba */}
      <circle cx="330" cy="175" r="22" fill="#fff" stroke={NAVY} strokeWidth="2.5" />
      <path
        d="M330 159 L336 175 L330 191 L324 175 Z M314 175 L330 169 L346 175 L330 181 Z"
        fill={NAVY}
      />
      <text x="330" y="222" textAnchor="middle" style={rotulo}>
        BOMBA
      </text>

      {/* filtro */}
      <path
        d="M352 175 H420"
        fill="none"
        stroke={NAVY}
        strokeWidth="3"
        markerEnd="url(#flecha-circuito)"
      />
      <rect x="422" y="120" width="56" height="100" rx="26" fill="#fff" stroke={NAVY} strokeWidth="2.5" />
      <path d="M432 170 h36 M432 182 h36 M432 194 h36" stroke={GRIS} strokeWidth="1.5" />
      <text x="450" y="240" textAnchor="middle" style={rotulo}>
        FILTRO
      </text>

      {/* clorador, donde exista */}
      <path
        d="M450 120 V60 H560"
        fill="none"
        stroke={NAVY}
        strokeWidth="3"
        markerEnd="url(#flecha-circuito)"
      />
      <rect
        x="562"
        y="40"
        width="44"
        height="40"
        fill="#fff"
        stroke={NAVY}
        strokeWidth="2"
        strokeDasharray="5 4"
      />
      <circle cx="577" cy="60" r="5" fill={GRIS} />
      <circle cx="591" cy="60" r="5" fill={GRIS} />
      <text x="584" y="100" textAnchor="middle" style={rotulo}>
        CLORADOR
      </text>
      <text x="584" y="114" textAnchor="middle" style={nota}>
        donde exista
      </text>

      {/* retorno */}
      <path
        d="M606 60 H660 V30 H90 V86"
        fill="none"
        stroke={NAVY}
        strokeWidth="3"
        markerEnd="url(#flecha-circuito)"
      />
      <text x="380" y="22" textAnchor="middle" style={nota}>
        Retorno a la piscina
      </text>

      <Marca x={195} y={150} n={3} />
      <Marca x={362} y={142} n={6} />
      <Marca x={500} y={135} n={4} />
      <Marca x={630} y={70} n={5} />
    </svg>
  );
}

export const diagramas: Record<DiagramaId, () => React.JSX.Element> = {
  "circuito-agua": CircuitoAgua,
};
