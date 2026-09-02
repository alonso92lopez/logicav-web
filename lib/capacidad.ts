/*
  Capacidad orientativa por superficie.

  Los tramos salen del catálogo real (`products` en lib/content.ts): cada
  equipo declara su área recomendada, y estos cortes son los mismos.

  Es una orientación previa a la visita, no un cálculo. La capacidad
  definitiva sale del cálculo de carga térmica, que además considera
  orientación, aislación, altura de cielo, ocupación y carga interna.

  Vive fuera del componente porque lo usan los dos lados: el formulario
  para mostrar la sugerencia mientras se escribe, y la server action para
  recalcularla antes de mandar el correo.
*/

const TRAMOS = [
  { max: 15, btu: 9000 },
  { max: 25, btu: 12000 },
  { max: 35, btu: 18000 },
  { max: Infinity, btu: 24000 },
] as const;

export function sugerirCapacidad(metros: string): string | null {
  const m2 = Number(metros);
  if (!metros.trim() || Number.isNaN(m2) || m2 <= 0) return null;

  const tramo = TRAMOS.find((t) => m2 <= t.max) ?? TRAMOS[TRAMOS.length - 1];
  return `${tramo.btu.toLocaleString("es-CL")} BTU`;
}
