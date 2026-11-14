import type { Tema } from "./tema";
import type { Rubro } from "./tipos";

/*
  Tema "Laguna": azul profundo y turquesa. Elegido por Alonso el 13-11-2026
  entre tres variantes (las otras eran el navy de Logicav con acento azul y
  un verde petróleo con verde agua).

  El naranja del sitio principal es "calor": en un sitio de agua comunica lo
  contrario, así que acá no se usa. Las ondas vienen de la portada de la
  propuesta técnica, para que sitio y documentos sean de la misma familia.
*/
const laguna: Tema = {
  nombre: "Laguna",
  oscuro: ["#06283d", "#0a3a57", "#114a6b", "#1c5f85", "#3f86a8"],
  acento: { base: "#0c9fb0", hover: "#0a8696", tinte: "#e3f6f8" },
  textoSobreOscuro: "#93bccf",
  fondo: "#f2f8fa",
  linea: "#d2e3ea",
  radio: "10px",
  motivo: "ondas",
};


/*
  Mantención de piscinas. Primer rubro fuera de climatización, con sitio
  propio en piscinas.logicav.cl.

  POSICIONAMIENTO. La competencia en Santiago (revisada el 13-11-2026) vende
  a casas, por WhatsApp y por precio; se apoya en años de experiencia y
  galería de trabajos, que acá no existen todavía. Ninguno de los sitios
  revisados menciona la normativa sanitaria y el registro aparece, cuando
  aparece, en una línea. Por eso este sitio apunta primero a condominios,
  colegios e instituciones y vende método y trazabilidad.

  ORIGEN DEL CONTENIDO. El método (etapas, circuito, productos, registro)
  sale de la propuesta técnica de la compra ágil 1210674-113-COT26. Quedó
  fuera todo lo que era de esa oferta: cantidad de piscinas, número de
  limpiezas, volúmenes, carta Gantt y el nombre del organismo. Es una oferta,
  no un trabajo ejecutado.

  SIN PRECIOS a propósito: no hay tarifa validada. Referencia de mercado:
  plan semanal residencial entre $65.000 y $180.000 al mes.

  FOTOS. Hay tres de ambiente, de banco de imágenes con licencia libre (uso
  comercial sin atribución), pedidas por Alonso el 13-11-2026. Van sin pie y
  no se presentan como recintos atendidos:
  - agua-azulejos.jpg: pexels.com/photo/347143
  - hojas-agua.jpg: pexels.com/photo/34797587
  - edificio-blanco.jpg: pexels.com/photo/15994062
  Las de trabajo (`protocolo.pasos[].foto`, `registro.fotos`) siguen vacías a
  propósito: ahí solo van fotos propias de visitas reales. Antes de
  publicarlas: permiso del mandante, sin niños y sin nada que identifique el
  recinto.

  [POR VALIDAR]
  - La propuesta afirma que todos los productos cuentan con autorización
    sanitaria. No se publica hasta confirmarlo producto a producto.
  - Cobertura "Región Metropolitana" (`marca.franja`).
  - Temporada baja "1 o 2 visitas al mes": la propuesta ofrecía 1; el
    mercado ofrece 2.
  - FAQ: que los químicos de rutina van incluidos y que las reparaciones no
    son parte del servicio.
  - Cifras del DS 209 (cloro 0,5–1,5 ppm, pH 7,2–8,2, 3 mediciones diarias,
    libro de registro; arts. 2, 8, 19, 20, 21 y 80): tomadas del texto en
    leychile.cl. Releer el decreto antes de salir de prueba.
*/
export const piscinas: Rubro = {
  slug: "piscinas",
  nombre: "Mantención de piscinas",
  enPrueba: true,
  subdominio: "piscinas",

  marca: {
    subtitulo: "Piscinas",
    franja: "Región Metropolitana · Condominios, edificios, colegios e instituciones",
    descripcion:
      "Mantención de piscinas con protocolo, registro por visita e informe mensual.",
  },

  tema: laguna,

  meta: {
    title: "Mantención de piscinas para condominios e instituciones",
    description:
      "Mantención de piscinas para condominios, edificios, colegios e instituciones. Protocolo de seis etapas, registro de cloro y pH en cada visita, fotografías e informe mensual.",
  },

  hero: {
    eyebrow: "Condominios · Edificios · Colegios · Instituciones",
    titulo: ["Mantención de piscinas", "con registro", "de cada visita"],
    texto:
      "Limpieza, filtrado y control químico del agua en visitas programadas. Cada visita sigue las mismas seis etapas y deja por escrito el cloro, el pH, los productos aplicados y las fotografías, para que la administración pueda mostrar qué se hizo y cuándo.",
    cta: "Solicitar cotización",
    fondo: { src: "/images/rubros/piscinas/agua-azulejos.jpg", alt: "" },
    /* Las barras muestran el rango del DS 209 (cloro 0,5–1,5 ppm; pH
       7,2–8,2) dentro de una escala más amplia. */
    ficha: {
      titulo: "Registro de mantención",
      subtitulo: "Piscina 1 · visita semanal",
      filas: [
        {
          label: "Cloro libre",
          valor: "1,0 ppm",
          medidor: { rango: "0,5 – 1,5", desde: 0.25, hasta: 0.75, posicion: 0.5 },
        },
        {
          label: "pH",
          valor: "7,4",
          medidor: { rango: "7,2 – 8,2", desde: 0.3, hasta: 0.8, posicion: 0.4 },
        },
        { label: "Filtro", valor: "Retrolavado y enjuague" },
        { label: "Productos", valor: "Cloro líquido, clarificante" },
        { label: "Fotos", valor: "2 adjuntas" },
      ],
      nota: "Ficha de ejemplo. Así queda anotada cada visita.",
    },
  },

  publico: {
    titulo: "Para quién es",
    /* Elegida por Alonso el 13-11-2026 entre seis. Es vertical: el encuadre
       se fija en el agua y las reposeras. */
    foto: {
      src: "/images/rubros/piscinas/edificio-blanco.jpg",
      alt: "Piscina al pie de un edificio blanco, con reposeras",
      posicion: "50% 88%",
    },
    items: [
      {
        nombre: "Condominios y edificios",
        texto:
          "La administración recibe un registro por piscina y un informe al cierre de cada mes, listo para presentar al comité o adjuntar a los gastos comunes.",
      },
      {
        nombre: "Colegios e instituciones",
        texto:
          "Cotización formal, orden de compra y factura. Antes de iniciar se entrega la nómina del personal, con su certificado de inhabilidad para trabajar con menores cuando el recinto lo requiere.",
      },
      {
        nombre: "Casas",
        texto:
          "El mismo protocolo y el mismo registro, con un día fijo de visita. Sabes qué se hizo sin tener que estar ahí.",
      },
    ],
  },

  incluye: {
    titulo: "Qué incluye el servicio",
    items: [
      {
        titulo: "Limpieza",
        texto:
          "Retiro de hojas y flotantes, aspirado del fondo, escobillado de muros y barrido del entorno y de la caseta de la bomba.",
      },
      {
        titulo: "Filtrado",
        texto:
          "Retrolavado y enjuague del filtro, chequeo de la bomba y programación de sus horas de funcionamiento para el resto de la semana.",
      },
      {
        titulo: "Agua",
        texto:
          "Medición de cloro y pH en cada visita y aplicación de productos según el volumen de la piscina.",
      },
      {
        titulo: "Registro",
        texto:
          "Una ficha por piscina con mediciones, productos aplicados y fotografías, y un informe al cierre de cada mes.",
      },
    ],
  },

  protocolo: {
    titulo: "Protocolo de cada visita",
    intro:
      "Las seis etapas se cumplen en todas las visitas, sea la frecuencia semanal o mensual, y varias dejan su registro.",
    pasos: [
      {
        nombre: "Superficie",
        texto:
          "Retiro y limpieza de la cubierta de protección, donde exista. Retiro de hojas y elementos flotantes.",
      },
      {
        nombre: "Entorno",
        texto:
          "Barrido del entorno inmediato y barrido y limpieza de la caseta de la bomba de filtrado.",
      },
      {
        nombre: "Vaso",
        texto: "Limpieza y aspirado del fondo. Escobillado de muros y superficies.",
      },
      {
        nombre: "Filtrado",
        texto: "Retrolavado y enjuague. Chequeo técnico de los equipos y del filtrado.",
        registro: "Estado de bomba y filtro",
      },
      {
        nombre: "Agua",
        texto:
          "Chequeo químico y de pH. Productos según el volumen de la piscina. Tabletas al clorador en línea, donde exista.",
        registro: "Cloro y pH, productos aplicados, foto de las tabletas",
      },
      {
        nombre: "Cierre",
        texto:
          "Relleno del nivel de agua, programación de la bomba para el resto de la semana, reinstalación de la cubierta y retiro de la basura en bolsa, fuera del recinto.",
        registro: "Foto de la limpieza terminada",
      },
    ],
  },

  diagrama: {
    id: "circuito-agua",
    titulo: "Circuito de agua",
    intro:
      "Dónde actúa cada etapa de la visita. Los números corresponden al protocolo.",
    refs: [
      { paso: 3, texto: "Vaso: aspirado del fondo y escobillado de muros" },
      { paso: 4, texto: "Filtro: retrolavado, enjuague y chequeo del filtrado" },
      { paso: 5, texto: "Agua y clorador: chequeo químico, pH y tabletas" },
      { paso: 6, texto: "Bomba: programación para el resto de la semana" },
    ],
  },

  frecuencia: {
    titulo: "Frecuencia por temporada",
    intro:
      "El plan cubre el año completo: la piscina que se abandona en invierno es la que cuesta recuperar en primavera.",
    /* Elegida por Alonso el 13-11-2026 entre cuatro. */
    foto: {
      src: "/images/rubros/piscinas/hojas-agua.jpg",
      alt: "Hojas de otoño flotando sobre el agua de una piscina",
    },
    temporadas: [
      {
        nombre: "Temporada alta",
        visitas: "1 visita por semana",
        texto: "Siempre el mismo día de la semana, acordado al inicio del servicio.",
      },
      {
        nombre: "Temporada baja",
        visitas: "1 o 2 visitas al mes",
        texto: "Mantiene el agua y los equipos en condiciones mientras la piscina no se usa.",
      },
    ],
    nota: "Los meses de cada temporada y el día de visita se fijan en la cotización, según el uso del recinto.",
  },

  insumos: {
    titulo: "Productos químicos",
    columnas: ["Producto", "Uso"],
    filas: [
      { nombre: "Cloro líquido", uso: "Desinfección del agua" },
      { nombre: "Alguicida", uso: "Prevención y control de algas" },
      { nombre: "Clarificante", uso: "Transparencia del agua" },
      {
        nombre: "Decantador",
        uso: "Precipita las partículas en suspensión para retirarlas con el aspirado",
      },
      { nombre: "Regulador de pH (sube o baja)", uso: "Corrección del pH" },
      {
        nombre: "Tabletas para clorador en línea",
        uso: "Cloración continua entre visitas, en piscinas que tengan clorador",
      },
    ],
    nota: "La dosis se ajusta al volumen de agua de cada piscina. Las fichas técnicas de los productos se envían antes de iniciar el servicio.",
  },

  registro: {
    titulo: "Registro e informe mensual",
    intro:
      "Cada piscina lleva su propio registro. Las fotografías de cada limpieza terminada se envían a quien esté a cargo del recinto.",
    campos: [
      { nombre: "Fecha", detalle: "Día de cada visita" },
      { nombre: "Cloro y pH", detalle: "Medición en cada visita" },
      { nombre: "Productos aplicados", detalle: "Qué se agregó al agua" },
      { nombre: "Observaciones", detalle: "Estado de bomba, filtro y recinto" },
      { nombre: "Fotos", detalle: "Limpieza terminada y tabletas instaladas" },
    ],
    flujo: [
      "Visitas del mes",
      "Registro y fotos por piscina",
      "Informe mensual",
      "Recepción conforme",
      "Factura",
    ],
    nota: "El informe del mes acompaña la factura y respalda la recepción conforme del servicio.",
  },

  normativa: {
    titulo: "Lo que exige el reglamento sanitario",
    intro:
      "Las piscinas de condominios, colegios, hoteles, gimnasios e instituciones son de uso público restringido y se rigen por el Reglamento de Piscinas de Uso Público (Decreto 209 del Ministerio de Salud). El responsable ante la autoridad sanitaria es el administrador del recinto.",
    puntos: [
      { dato: "0,5 a 1,5 ppm", texto: "Cloro libre residual en el agua" },
      { dato: "7,2 a 8,2", texto: "pH del agua, en todo momento" },
      { dato: "3 al día", texto: "Mediciones mínimas de cloro y de pH" },
      {
        dato: "Libro de registro",
        texto: "Mediciones, desinfectante aplicado y limpiezas, anotados a diario",
      },
    ],
    aclaracion:
      "Nuestra visita no reemplaza las mediciones diarias, que siguen a cargo del recinto. Lo que entregamos queda por escrito: mediciones de cada visita, productos aplicados, retrolavados y fotografías. Ese registro respalda el libro que debe llevar la administración.",
  },

  faq: [
    {
      pregunta: "¿Los productos químicos están incluidos?",
      respuesta:
        "Sí. La cotización considera los productos de uso habitual que aparecen en la tabla. Los tratamientos fuera de la rutina, como recuperar un agua que ya está verde, se cotizan aparte.",
    },
    {
      pregunta: "¿Qué no incluye la mantención?",
      respuesta:
        "La reparación o el recambio de bombas, filtros y otros equipos, y las obras en el vaso. Si en una visita se detecta una falla, queda anotada en el registro y se informa a quien esté a cargo.",
    },
    {
      pregunta: "¿La visita semanal cumple con las mediciones que pide el reglamento?",
      respuesta:
        "No por sí sola. El reglamento pide mediciones diarias de cloro y pH, que son responsabilidad del recinto. La mantención deja el agua y los equipos en condiciones y entrega un registro que respalda ese control.",
    },
    {
      pregunta: "¿Trabajan con orden de compra y factura?",
      respuesta:
        "Sí. Emitimos cotización formal y factura, y trabajamos con orden de compra. Con organismos públicos, a través de Mercado Público.",
    },
    {
      pregunta: "¿Cómo parte el servicio?",
      respuesta:
        "Con una coordinación inicial en que se acuerda el día fijo de visita y a quién se envían el registro y las fotografías. Antes de la primera visita se entregan las fichas técnicas de los productos.",
    },
  ],

  formulario: {
    servicio: "Mantención de piscinas",
    titulo: "Cuéntanos del recinto",
    texto:
      "Con la cantidad de piscinas, su tamaño aproximado y la comuna podemos proponerte una frecuencia de visitas y enviarte una cotización formal.",
    pasos: [
      { label: "Coordinación", texto: "Te contactamos para entender el recinto y la frecuencia que necesitas" },
      { label: "Cotización", texto: "Propuesta formal con visitas, productos y registro" },
      { label: "Inicio", texto: "Se acuerda el día fijo de visita y se envían las fichas técnicas" },
    ],
    campos: [
      {
        name: "organizacion",
        label: "Condominio, empresa o institución",
        placeholder: "Nombre del recinto",
      },
      {
        name: "tipo",
        label: "Tipo de recinto",
        opciones: [
          "Condominio o edificio",
          "Colegio o institución",
          "Hotel, gimnasio o club",
          "Empresa",
          "Casa",
        ],
      },
      { name: "cantidad", label: "Cantidad de piscinas", placeholder: "Ej: 2", type: "number" },
      { name: "volumen", label: "Tamaño o volumen aproximado", placeholder: "Ej: 8 × 4 m, o 40 m³" },
      { name: "comuna", label: "Comuna", placeholder: "Ej: Las Condes" },
    ],
    placeholderMensaje:
      "Ej: dos piscinas en un condominio, una con clorador en línea. Necesitamos mantención semanal en temporada.",
    cta: "Solicitar cotización",
    whatsappTexto: "Hola, necesito cotizar mantención de piscinas.",
  },
};
