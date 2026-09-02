/*
  Capacidad orientativa por superficie.

  Los tramos salen del catálogo real: son exactamente las áreas recomendadas
  que declara cada equipo en `products` (hasta 15 m² · 15–25 · hasta 35 · 35 o
  más). No se usa una regla genérica de BTU por m² a propósito: daría cifras
  distintas a las que el propio sitio publica en /equipos, y el visitante
  vería dos recomendaciones que no calzan.

  Es una orientación previa a la visita, no un cálculo de ingeniería. La
  capacidad definitiva sale del cálculo de carga térmica.

  Vive fuera de los componentes porque lo usan tres lugares: el formulario de
  cotización, la calculadora de /calculadora y la server action que arma el
  correo del lead.
*/

const TRAMOS = [
  { max: 15, btu: 9000 },
  { max: 25, btu: 12000 },
  { max: 35, btu: 18000 },
  { max: Infinity, btu: 24000 },
] as const;

export function capacidadEnBtu(metros: number): number {
  const tramo = TRAMOS.find((t) => metros <= t.max) ?? TRAMOS[TRAMOS.length - 1];
  return tramo.btu;
}

export function formatearBtu(btu: number): string {
  return `${btu.toLocaleString("es-CL")} BTU`;
}

/* Usado por el formulario de cotización, que solo pregunta los m². */
export function sugerirCapacidad(metros: string): string | null {
  const m2 = Number(metros);
  if (!metros.trim() || Number.isNaN(m2) || m2 <= 0) return null;
  return formatearBtu(capacidadEnBtu(m2));
}

/* ------------------------------------------------------------------
   Calculadora: los mismos tramos, sobre una superficie corregida.

   En vez de inventar una segunda regla de dimensionamiento, cada condición
   del recinto se traduce a "cuántos m² se comporta como" y el resultado
   entra al mismo tramo de arriba. Así la calculadora nunca contradice al
   catálogo.

   [POR VALIDAR] Los cuatro factores son valores convencionales de la
   industria, no medidos por el equipo técnico de LOGICAV. Antes de
   promocionar la calculadora conviene que un técnico los confirme. Ver
   DATOS-POR-VALIDAR.md.
   ------------------------------------------------------------------ */

export const ALTURA_ESTANDAR = 2.4;

export const OPCIONES_SOL = [
  { id: "poco", label: "Poco sol", detalle: "Orientación sur, sombra o pocos ventanales", factor: 0.9 },
  { id: "normal", label: "Sol parcial", detalle: "Exposición promedio durante el día", factor: 1 },
  { id: "mucho", label: "Mucho sol", detalle: "Poniente, techo expuesto o ventanal amplio", factor: 1.15 },
] as const;

export type Sol = (typeof OPCIONES_SOL)[number]["id"];

export type Recinto = {
  metros: number;
  altura: number;
  sol: Sol;
  personas: number;
  cargaExtra: boolean;
};

export type Resultado = {
  metrosEfectivos: number;
  btu: number;
  capacidad: string;
  factores: { label: string; efecto: string }[];
};

export function calcular(r: Recinto): Resultado | null {
  if (!r.metros || r.metros <= 0 || Number.isNaN(r.metros)) return null;

  const fAltura = Math.max(1, r.altura / ALTURA_ESTANDAR);
  const fSol = OPCIONES_SOL.find((o) => o.id === r.sol)?.factor ?? 1;
  // Dos personas es la ocupación que ya asume el tramo base.
  const fPersonas = 1 + Math.max(0, r.personas - 2) * 0.05;
  const fCarga = r.cargaExtra ? 1.15 : 1;

  const metrosEfectivos = r.metros * fAltura * fSol * fPersonas * fCarga;
  const btu = capacidadEnBtu(metrosEfectivos);

  const pct = (f: number) => `${f >= 1 ? "+" : ""}${Math.round((f - 1) * 100)}%`;
  const factores = [
    { label: "Superficie", efecto: `${r.metros} m²` },
    { label: "Altura de cielo", efecto: fAltura === 1 ? "estándar" : pct(fAltura) },
    { label: "Exposición al sol", efecto: fSol === 1 ? "sin ajuste" : pct(fSol) },
    { label: "Ocupación", efecto: fPersonas === 1 ? "sin ajuste" : pct(fPersonas) },
    { label: "Equipos que generan calor", efecto: fCarga === 1 ? "sin ajuste" : pct(fCarga) },
  ];

  return {
    metrosEfectivos: Math.round(metrosEfectivos * 10) / 10,
    btu,
    capacidad: formatearBtu(btu),
    factores,
  };
}
