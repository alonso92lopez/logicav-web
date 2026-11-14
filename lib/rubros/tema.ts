import type { CSSProperties } from "react";

/*
  Tema visual de un sitio de rubro. Cambia la piel, no el esqueleto: la
  plantilla y las clases son las mismas del sitio principal, y el tema
  redefine la paleta dentro de la página del rubro.

  Cómo funciona: los colores del sitio son variables CSS (`--color-navy-800`,
  `--color-flame-500`, etc., ver `app/globals.css`). `temaVars` las vuelve a
  declarar en el contenedor de la página, así que todo lo que está adentro
  toma los colores del rubro sin tocar un solo componente. Por eso dentro de
  un rubro "navy" es su color oscuro y "flame" su acento, sean cuales sean.

  El acento hace doble trabajo: fondo de botones con texto blanco y texto
  sobre el color oscuro. Tiene que ser un tono medio; ni pastel ni muy oscuro.
*/
export type Tema = {
  /* Solo para identificarlo en el selector de variantes. */
  nombre: string;
  /* Del más oscuro al más claro: franja superior, fondo de bloques oscuros,
     hover, líneas sobre oscuro, bordes de botones. */
  oscuro: [string, string, string, string, string];
  acento: { base: string; hover: string; tinte: string };
  /* Texto secundario sobre los bloques oscuros. */
  textoSobreOscuro: string;
  /* Fondo general de la página y color de las líneas divisorias. */
  fondo: string;
  linea: string;
  /* Redondeo de botones, campos y tarjetas. "0px" es el ángulo recto del
     sitio principal. */
  radio: string;
  /* "ondas": olas bajo la portada y regla ondulada. "recto": como el sitio
     principal. */
  motivo: "recto" | "ondas";
};

export const temaVars = (t: Tema) =>
  ({
    "--color-navy-900": t.oscuro[0],
    "--color-navy-800": t.oscuro[1],
    "--color-navy-700": t.oscuro[2],
    "--color-navy-600": t.oscuro[3],
    "--color-navy-500": t.oscuro[4],
    "--color-flame-600": t.acento.hover,
    "--color-flame-500": t.acento.base,
    "--color-flame-50": t.acento.tinte,
    "--color-steel-400": t.textoSobreOscuro,
    "--color-shell": t.fondo,
    "--color-line": t.linea,
    "--radio": t.radio,
  }) as CSSProperties;
