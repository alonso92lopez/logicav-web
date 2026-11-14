/*
  Página de rubro: Logicav enfocado en un nicho distinto de la climatización.

  Un rubro es un archivo de contenido en esta carpeta, registrado en
  `index.ts`. La ruta `app/[rubro]/page.tsx` arma la página desde acá, así
  que sumar un rubro no toca componentes.

  Regla de contenido: solo lo verdadero. Una página de rubro describe cómo
  se hace el servicio (protocolo, insumos, registro). No lleva clientes,
  años de experiencia ni trabajos ejecutados mientras no existan.

  Todos los bloques salvo `hero` y `formulario` son opcionales: el que no
  viene, no se dibuja.
*/

import type { Tema } from "./tema";

/* Diagramas disponibles. Cada id tiene su componente en
   `components/rubro/diagramas.tsx`. */
export type DiagramaId = "circuito-agua";

/*
  `src` es una ruta bajo `public/`, por ejemplo
  "/images/rubros/piscinas/aspirado.jpg".

  Hay dos clases de foto y no se mezclan:
  - De ambiente (`hero.fondo`, `publico.foto`, `frecuencia.foto`): pueden ser
    de banco de imágenes con licencia libre. Van sin pie y nunca se presentan
    como un recinto atendido.
  - De trabajo (`protocolo.pasos[].foto`, `registro.fotos`): solo fotos
    propias de visitas reales.
*/
export type Foto = {
  src: string;
  alt: string;
  pie?: string;
  /* Qué parte se conserva cuando el marco recorta la foto, como
     `object-position` de CSS ("50% 80%" = centrada, hacia abajo). */
  posicion?: string;
};

export type CampoFormulario = {
  /* Identificador sin espacios; viaja como `extra_<name>`. */
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "number";
  /* Si viene, el campo es una lista desplegable. */
  opciones?: string[];
};

export type Rubro = {
  /* La dirección: logicav.cl/<slug>. */
  slug: string;
  nombre: string;

  /* Mientras el rubro esté a prueba la página existe pero no se anuncia:
     fuera del sitemap y con noindex. El menú no lista rubros en ningún caso. */
  enPrueba: boolean;

  /* Si viene, el rubro tiene sitio propio en <subdominio>.logicav.cl: la
     portada de ese dominio muestra esta página (ver `next.config.ts`). */
  subdominio?: string;

  /* Identidad del sitio del rubro. La página no usa el encabezado ni el pie
     de climatización: tiene los suyos, armados con esto. */
  marca: {
    /* Bajo el logotipo, donde el sitio principal dice "Climatización e ingeniería". */
    subtitulo: string;
    /* Franja superior: cobertura y a quién se atiende. */
    franja: string;
    /* Una línea para el pie de página. */
    descripcion: string;
  };

  /* Colores, redondeo y motivo gráfico del sitio del rubro. */
  tema: Tema;

  /* Variantes para comparar a la vista mientras se elige el tema. Solo se
     ofrecen en desarrollo (`npm run dev`); en producción se ignoran. Borrar
     cuando el tema esté decidido. */
  temasCandidatos?: Tema[];

  meta: { title: string; description: string };

  hero: {
    eyebrow: string;
    /* Una entrada por línea del titular. */
    titulo: string[];
    texto: string;
    cta: string;
    /* Textura de fondo, muy atenuada bajo el color oscuro del tema. */
    fondo?: Foto;
    /* Ficha de ejemplo junto al titular: muestra el entregable en vez de
       describirlo. Los valores son ilustrativos y la ficha lo dice. */
    ficha?: {
      titulo: string;
      subtitulo: string;
      filas: {
        label: string;
        valor: string;
        /* Para mediciones: dibuja una barra con el rango aceptado y un
           punto en `posicion` (0 a 1 dentro de la barra). */
        medidor?: { rango: string; desde: number; hasta: number; posicion: number };
      }[];
      nota: string;
    };
  };

  /* Para quién es. El primero es el público principal. */
  publico?: {
    titulo: string;
    foto?: Foto;
    /* Alternativas para comparar a la vista; `pie` es el rótulo del botón.
       Solo se ofrecen en desarrollo. Borrar cuando la foto esté decidida. */
    fotosCandidatas?: Foto[];
    items: { nombre: string; texto: string }[];
  };

  incluye?: {
    titulo: string;
    items: { titulo: string; texto: string }[];
  };

  frecuencia?: {
    titulo: string;
    intro: string;
    foto?: Foto;
    /* Igual que en `publico`: alternativas para comparar, solo en desarrollo. */
    fotosCandidatas?: Foto[];
    temporadas: { nombre: string; visitas: string; texto: string }[];
    nota?: string;
  };

  /* Norma que rige al cliente y cómo el servicio lo ayuda a cumplirla.
     `aclaracion` dice lo que el servicio NO cubre de esa norma. */
  normativa?: {
    titulo: string;
    intro: string;
    puntos: { dato: string; texto: string }[];
    aclaracion: string;
  };

  faq?: { pregunta: string; respuesta: string }[];

  protocolo?: {
    titulo: string;
    intro: string;
    /* El número de etapa es la posición en la lista. `registro` es lo que
       esa etapa deja anotado o fotografiado. */
    pasos: { nombre: string; texto: string; registro?: string; foto?: Foto }[];
  };

  diagrama?: {
    id: DiagramaId;
    titulo: string;
    intro: string;
    /* `paso` es el número de etapa del protocolo que actúa en ese punto. */
    refs: { paso: number; texto: string }[];
  };

  insumos?: {
    titulo: string;
    intro?: string;
    columnas: [string, string];
    filas: { nombre: string; uso: string }[];
    nota?: string;
  };

  registro?: {
    titulo: string;
    intro: string;
    campos: { nombre: string; detalle: string }[];
    /* Una ficha real, una limpieza terminada: evidencia del entregable. */
    fotos?: Foto[];
    /* Del trabajo en terreno a la factura, en orden. */
    flujo?: string[];
    nota?: string;
  };

  formulario: {
    /* Cómo llega rotulado el lead en el correo. */
    servicio: string;
    titulo: string;
    texto: string;
    pasos: { label: string; texto: string }[];
    campos: CampoFormulario[];
    placeholderMensaje: string;
    cta: string;
    whatsappTexto: string;
  };
};
