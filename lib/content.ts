/*
  Contenido del sitio (es-CL).
  Estructura pensada para sumar `en` más adelante sin tocar componentes.
  Los datos marcados [POR VALIDAR] están listados en DATOS-POR-VALIDAR.md.
*/

export const contact = {
  phoneDisplay: "+56 9 8706 6666",
  phoneE164: "+56987066666",
  whatsapp: "https://wa.me/56987066666",
  email: "contacto@logicav.cl",
  coverage: "Santiago y regiones", // [POR VALIDAR]
  coverageDetail:
    "Base en la Región Metropolitana. Proyectos en regiones y faena se coordinan caso a caso.", // [POR VALIDAR]
  hours: "Lunes a viernes, 8:30 a 18:00 h", // [POR VALIDAR]
  hoursNote: "Atención de emergencias para clientes con contrato vigente.", // [POR VALIDAR]
};

/*
  Franja técnica bajo el hero. Las cuatro cifras salen del catálogo real y
  de la cobertura declarada: ninguna afirma volumen de operación, así que
  no hay nada que validar acá.

  TODO — cuando existan credenciales duras (años operando, proyectos
  ejecutados, tiempo de respuesta comprometido) reemplazan a estas, que
  pesan bastante menos.
*/
export const stats = [
  { value: "9.000–24.000", label: "BTU en catálogo" },
  { value: "3", label: "Marcas que trabajamos" },
  { value: "Inverter", label: "Tecnología de los equipos" },
  { value: contact.coverage, label: "Cobertura de proyectos" },
];

/* Las tres líneas de negocio. Ordenan el sitio entero. */
export const segments = [
  {
    label: "Hogar",
    title: "Equipos e instalación",
    text: "Split muro inverter de Anwo, Midea y Clark con instalación incluida y precio cerrado. Te asesoramos en la capacidad según los m² y la orientación del recinto.",
    cta: "Ver equipos y precios",
    href: "/equipos",
  },
  {
    label: "Empresas",
    title: "Proyectos HVAC",
    text: "Oficinas, bodegas, locales comerciales y edificios. Cálculo de carga térmica, selección de equipos y mantención programada para que la operación no se detenga.",
    cta: "Solicitar cotización",
    href: "/#contacto",
  },
  {
    label: "Minería e industrial",
    title: "Entornos exigentes",
    text: "Faenas, zonas remotas y plantas en operación continua. Adaptamos la solución a la altura, el polvo en suspensión y los ciclos de trabajo sin interrupción.",
    cta: "Hablar con el área técnica",
    href: "/#contacto",
  },
];

export const trustItems = [
  {
    title: "Cálculo antes de cotizar",
    text: "Dimensionamos la capacidad según superficie, orientación, aislación y carga interna. No vendemos un equipo que va a quedar corto ni sobredimensionado.",
  },
  {
    title: "Instalación limpia",
    text: "Perforación, canalización, vacío de líneas y puesta en marcha con protocolo. Dejamos el recinto operativo y sin obra pendiente.",
  },
  {
    title: "Mantención programada",
    text: "Planes por contrato con visitas calendarizadas: lavado de filtros y serpentines, control de presiones y registro por equipo.",
  },
  {
    title: "Respuesta en terreno",
    text: "Coordinación directa con el área técnica para diagnóstico y reparación, incluida faena y zonas alejadas de la Región Metropolitana.",
  },
];

export const services = [
  {
    title: "Instalación",
    text: "Equipos split muro, cassette, ducto y piso-techo en hogares, oficinas, comercios y recintos técnicos. Incluye vacío de líneas, prueba de estanqueidad y puesta en marcha.",
  },
  {
    title: "Mantención preventiva",
    text: "Programas por contrato: lavado de filtros y serpentines, control de presiones y consumo, revisión de drenajes y registro por equipo.",
  },
  {
    title: "Diagnóstico y reparación",
    text: "Detección de fugas, falla de compresor, problemas de control y recarga de refrigerante. Informe técnico y presupuesto antes de intervenir.",
  },
  {
    title: "Proyectos HVAC",
    text: "Cálculo de carga térmica, selección de equipos, canalización y coordinación con las demás especialidades de la obra.",
  },
  {
    title: "Contratos de servicio",
    text: "Para empresas que necesitan continuidad: visitas calendarizadas, prioridad de atención y trazabilidad de cada intervención.",
  },
  {
    title: "Minería e industrial",
    text: "Climatización en faena y zonas remotas: altura, polvo en suspensión, temperatura extrema y operación continua sin ventanas de detención.",
  },
];

/*
  Servicios con precio publicado. Los valores vienen del catálogo del sitio
  anterior (precios "oferta" de abril 2026), igual que los de /equipos.
  [POR VALIDAR] vigencia de los cuatro montos.
*/
export const featuredServices = [
  {
    slug: "instalacion-aire",
    nombre: "Instalación aire acondicionado",
    descripcion:
      "Instalación profesional de equipos de aire acondicionado en hogares y empresas",
    precio: 150000,
    precioOferta: 120000,
    imageUrl: "/images/products/instalacion-aire.png",
  },
  {
    slug: "mantencion-aire",
    nombre: "Mantención aire acondicionado",
    descripcion: "Limpieza, revisión y optimización del equipo",
    precio: 50000,
    precioOferta: 35000,
    imageUrl: "/images/products/mantencion-aire.jpg",
  },
];

/*
  [POR VALIDAR] Las tres son fotos de stock y describen tipos de trabajo,
  no obras ejecutadas. Reemplazar por 2–3 proyectos reales con foto propia,
  comuna y alcance. Es el mayor limitante del rediseño.
*/
export const projects = [
  {
    title: "Instalación residencial split muro",
    category: "Hogar",
    text: "Equipos inverter para casas y departamentos. Asesoría de capacidad, canalización a la vista o embutida, y puesta en marcha el mismo día.",
    image: "/images/projects/proyecto-1.jpg",
  },
  {
    title: "Climatización de oficinas y locales",
    category: "Empresas",
    text: "Cálculo de carga térmica, selección de equipos y distribución por zona. Mantención programada para operar sin cortes en horario comercial.",
    image: "/images/projects/proyecto-2.jpg",
  },
  {
    title: "Sistema de climatización en faena",
    category: "Minería e industrial",
    text: "Instalación y mantención con polvo en suspensión, temperatura extrema y operación continua. Coordinación con los protocolos de acceso del mandante.",
    image: "/images/projects/proyecto-3.jpg",
  },
];

export const about = {
  intro:
    "LOGICAV instala, mantiene y proyecta sistemas de climatización. Vendemos equipos porque son parte del trabajo, pero lo que entregamos es el sistema funcionando: el cálculo previo, la instalación bien hecha y el plan que la sostiene.",
  introSecond:
    "Esa es también la razón por la que atendemos hogar, empresa y faena con el mismo equipo: cambian la escala y las condiciones, no el criterio.",
  /*
    Capacidades internas, no credenciales. La versión con "personal con
    licencia SEC vigente" está en DATOS-POR-VALIDAR.md y no se publica
    hasta confirmar quién la tiene y de qué clase.

    TODO — acá van las credenciales reales cuando estén: años de
    operación, inicio de actividades, certificaciones de los técnicos y
    mandantes para los que se ha trabajado.
  */
  capacidades: [
    { label: "Dimensionamiento", text: "Cálculo de carga térmica y selección de equipo" },
    { label: "Ejecución", text: "Instalación, canalización y puesta en marcha" },
    { label: "Continuidad", text: "Mantención programada y atención de fallas" },
    { label: "Administración", text: "Cotización formal, orden de compra y factura" },
  ],
  since: "2019", // [POR VALIDAR]
};

/*
  Marcas que se atienden. "Atendemos" es deliberado: describe instalar,
  mantener y reparar, sin insinuar representación ni distribución. Ver
  DATOS-POR-VALIDAR.md punto 4 antes de cambiar esa palabra.

  Los archivos se normalizan con `python scripts/normalizar-logo.py <archivo>`,
  que les quita el fondo, los recorta y los aplana a un solo tono. Un logo
  sin pasar por ahí va a desentonar con el resto.

  `scale` es corrección óptica: a igual altura, un wordmark ancho pesa mucho
  más que una marca con símbolo. 1 es la altura base; el script imprime la
  masa de tinta de cada archivo si hay que recalcularla.
*/
export const brands = [
  { src: "/images/brands/anwo.png", alt: "Anwo", scale: 1.15 },
  { src: "/images/brands/midea.png", alt: "Midea", scale: 1.25 },
  { src: "/images/brands/clark.png", alt: "Clark", scale: 0.76 },
];

export type Product = {
  nombre: string;
  marca: string;
  slug: string;
  precioReferencia: number;
  descripcion: string;
  capacidadBtu: number;
  areaRecomendada: string;
  imageUrl: string;
};

export const products: Product[] = [
  {
    nombre: "Split muro 9.000 BTU Inverter",
    marca: "ANWO",
    slug: "anwo-9000",
    precioReferencia: 326590,
    descripcion: "Oficinas privadas y salas pequeñas",
    capacidadBtu: 9000,
    areaRecomendada: "hasta 15 m²",
    imageUrl: "/images/products/anwo-9000.jpg",
  },
  {
    nombre: "Split muro 12.000 BTU Inverter",
    marca: "ANWO",
    slug: "anwo-12000",
    precioReferencia: 352990,
    descripcion: "Oficinas y locales medianos",
    capacidadBtu: 12000,
    areaRecomendada: "15–25 m²",
    imageUrl: "/images/products/anwo-12000.jpg",
  },
  {
    nombre: "Split muro 18.000 BTU Inverter",
    marca: "ANWO",
    slug: "anwo-18000",
    precioReferencia: 486590,
    descripcion: "Espacios amplios y salas de reunión",
    capacidadBtu: 18000,
    areaRecomendada: "hasta 35 m²",
    imageUrl: "/images/products/anwo-18000.jpg",
  },
  {
    nombre: "Split muro 24.000 BTU Inverter",
    marca: "ANWO",
    slug: "anwo-24000",
    precioReferencia: 611990,
    descripcion: "Áreas grandes y espacios comerciales",
    capacidadBtu: 24000,
    areaRecomendada: "35 m² o más",
    imageUrl: "/images/products/anwo-24000.jpg",
  },
  {
    nombre: "Split muro 9.000 BTU Inverter",
    marca: "MIDEA",
    slug: "midea-9000",
    precioReferencia: 275190,
    descripcion: "Oficinas privadas y salas pequeñas",
    capacidadBtu: 9000,
    areaRecomendada: "hasta 15 m²",
    imageUrl: "/images/products/midea-9000.png",
  },
  {
    nombre: "Split muro 12.000 BTU Inverter",
    marca: "MIDEA",
    slug: "midea-12000",
    precioReferencia: 280190,
    descripcion: "Oficinas y locales medianos",
    capacidadBtu: 12000,
    areaRecomendada: "15–25 m²",
    imageUrl: "/images/products/midea-12000.png",
  },
  {
    nombre: "Split muro 18.000 BTU Inverter",
    marca: "MIDEA",
    slug: "midea-18000",
    precioReferencia: 485090,
    descripcion: "Espacios amplios y salas de reunión",
    capacidadBtu: 18000,
    areaRecomendada: "hasta 35 m²",
    imageUrl: "/images/products/midea-18000.png",
  },
  {
    nombre: "Split muro 24.000 BTU Inverter",
    marca: "MIDEA",
    slug: "midea-24000",
    precioReferencia: 627990,
    descripcion: "Áreas grandes y espacios comerciales",
    capacidadBtu: 24000,
    areaRecomendada: "35 m² o más",
    imageUrl: "/images/products/midea-24000.png",
  },
  {
    nombre: "Split muro 9.000 BTU Inverter",
    marca: "CLARK",
    slug: "clark-9000",
    precioReferencia: 269150,
    descripcion: "Oficinas privadas y salas pequeñas",
    capacidadBtu: 9000,
    areaRecomendada: "hasta 15 m²",
    imageUrl: "/images/products/clark-9000.png",
  },
  {
    nombre: "Split muro 12.000 BTU Inverter",
    marca: "CLARK",
    slug: "clark-12000",
    precioReferencia: 270250,
    descripcion: "Oficinas y locales medianos",
    capacidadBtu: 12000,
    areaRecomendada: "15–25 m²",
    imageUrl: "/images/products/clark-12000.png",
  },
  {
    nombre: "Split muro 18.000 BTU Inverter",
    marca: "CLARK",
    slug: "clark-18000",
    precioReferencia: 475950,
    descripcion: "Espacios amplios y salas de reunión",
    capacidadBtu: 18000,
    areaRecomendada: "hasta 35 m²",
    imageUrl: "/images/products/clark-18000.png",
  },
  {
    nombre: "Split muro 24.000 BTU Inverter",
    marca: "CLARK",
    slug: "clark-24000",
    precioReferencia: 605990,
    descripcion: "Áreas grandes y espacios comerciales",
    capacidadBtu: 24000,
    areaRecomendada: "35 m² o más",
    imageUrl: "/images/products/clark-24000.png",
  },
];

export const formOptions = {
  serviceTypes: [
    "Contrato de mantención",
    "Mantención por una vez",
    "Reparación / equipo con falla",
    "Instalación de equipos",
    "Proyecto / obra nueva",
    "Compra de equipos",
    "Minería / faena",
  ],
};

export const formatCLP = (value: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
