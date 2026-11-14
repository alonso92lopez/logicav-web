import { piscinas } from "./piscinas";
import type { Rubro } from "./tipos";

export type { Rubro } from "./tipos";

/* Registro de rubros. Sumar uno: crear su archivo y agregarlo acá. */
export const rubros: Rubro[] = [piscinas];

export const getRubro = (slug: string) => rubros.find((r) => r.slug === slug);
