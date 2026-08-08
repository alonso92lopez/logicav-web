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
  coverage: "Región Metropolitana", // [POR VALIDAR]
  coverageDetail: "Santiago y comunas de la RM. Proyectos en otras regiones se evalúan caso a caso.", // [POR VALIDAR]
  hours: "Lunes a viernes, 8:30 a 18:00 h", // [POR VALIDAR]
  hoursNote: "Atención de emergencias para clientes con contrato vigente.", // [POR VALIDAR]
};

export const stats = [
  // [POR VALIDAR] las tres cifras
  { value: 300, prefix: "+", label: "mantenciones ejecutadas" },
  { value: 120, prefix: "+", label: "equipos bajo contrato" },
  { value: 48, prefix: "", suffix: " h", label: "respuesta estándar a requerimientos" },
];

export const services = [
  {
    id: "preventiva",
    kicker: "01",
    title: "Mantención preventiva",
    text: "Programas de mantención con pauta por equipo: limpieza de unidades y filtros, revisión de presiones, consumos eléctricos y drenajes, y ajustes según fabricante.",
    includes: ["Pauta de mantención por equipo", "Informe técnico con registro fotográfico", "Calendario anual de visitas"],
    appliesTo: "Oficinas, comercio, edificios e instituciones con equipos en operación continua.",
    cta: { label: "Ver planes de mantención", href: "#planes" },
  },
  {
    id: "correctiva",
    kicker: "02",
    title: "Diagnóstico y reparación",
    text: "Inspección técnica, detección de fallas y ejecución de reparaciones para recuperar la operación en el menor tiempo posible.",
    includes: ["Diagnóstico documentado", "Reparación con repuestos cotizados", "Pruebas de funcionamiento"],
    appliesTo: "Equipos detenidos, con bajo rendimiento o consumo anormal.",
    cta: { label: "Solicitar visita técnica", href: "#cotizar" },
  },
  {
    id: "instalacion",
    kicker: "03",
    title: "Instalación de equipos",
    text: "Montaje de equipos split muro y cassette: fijaciones, vacío del circuito, carga de refrigerante, pruebas y puesta en marcha.",
    includes: ["Evaluación del recinto", "Instalación certificada de circuito y drenaje", "Puesta en marcha documentada"],
    appliesTo: "Oficinas, locales comerciales, salas técnicas y espacios de atención.",
    cta: { label: "Cotizar instalación", href: "#cotizar" },
  },
  {
    id: "proyectos",
    kicker: "04",
    title: "Proyectos e ingeniería HVAC",
    text: "Levantamiento, dimensionamiento térmico y ejecución de proyectos de climatización para recintos nuevos, ampliaciones o renovación de equipos.",
    includes: ["Levantamiento y cálculo de cargas", "Especificación de equipos", "Ejecución y entrega documentada"],
    appliesTo: "Empresas e instituciones que licitan o planifican obras.",
    cta: { label: "Conversar un proyecto", href: "#cotizar" },
  },
  {
    id: "suministro",
    kicker: "05",
    title: "Suministro de equipos",
    text: "Provisión de equipos split inverter de 9.000 a 24.000 BTU de las marcas Anwo, Midea y Clark, con instalación y mantención en un solo contrato.",
    includes: ["Equipos inverter 9.000–24.000 BTU", "Marcas Anwo, Midea y Clark", "Instalación y garantía de servicio"],
    appliesTo: "Recambio o ampliación de parque de equipos.",
    cta: { label: "Ver equipos", href: "/equipos" },
  },
];

export const plans = {
  note: "Valores referenciales netos (+ IVA) por equipo. El contrato se cotiza según catastro de equipos, criticidad y frecuencia de uso.",
  items: [
    {
      id: "preventivo",
      name: "Preventivo",
      tagline: "Para instalaciones estables que necesitan orden y respaldo.",
      price: "Desde $35.000", // dato real del catálogo actual
      priceUnit: "por equipo / visita, + IVA",
      features: [
        { label: "Visitas programadas", value: "2 al año" }, // [POR VALIDAR]
        { label: "Pauta e informe técnico por visita", value: "Incluido" },
        { label: "Registro fotográfico", value: "Incluido" },
        { label: "Atención de fallas", value: "Se cotiza por evento" },
        { label: "Respuesta a requerimientos", value: "72 h hábiles" }, // [POR VALIDAR]
      ],
      featured: false,
    },
    {
      id: "preventivo-correctivo",
      name: "Preventivo + Correctivo",
      tagline: "Para operaciones que no pueden esperar una cotización por cada falla.",
      price: "Desde $55.000", // [POR VALIDAR]
      priceUnit: "por equipo / visita, + IVA",
      features: [
        { label: "Visitas programadas", value: "4 al año" }, // [POR VALIDAR]
        { label: "Pauta e informe técnico por visita", value: "Incluido" },
        { label: "Mano de obra correctiva", value: "Incluida" }, // [POR VALIDAR]
        { label: "Repuestos", value: "Cotizados aparte" },
        { label: "Respuesta a fallas", value: "48 h hábiles" }, // [POR VALIDAR]
      ],
      featured: true,
    },
    {
      id: "integral",
      name: "Integral",
      tagline: "Para instalaciones críticas: cobertura completa y respuesta prioritaria.",
      price: "A convenir",
      priceUnit: "según catastro",
      features: [
        { label: "Visitas programadas", value: "Mensuales o según criticidad" }, // [POR VALIDAR]
        { label: "Pauta e informe técnico por visita", value: "Incluido" },
        { label: "Mano de obra correctiva", value: "Incluida" },
        { label: "Repuestos menores", value: "Incluidos" }, // [POR VALIDAR]
        { label: "Respuesta a fallas", value: "24 h" }, // [POR VALIDAR]
      ],
      featured: false,
    },
  ],
};

export const methodology = [
  {
    num: "01",
    title: "Levantamiento y catastro",
    text: "Inventario de todos los equipos de la instalación: marca, modelo, capacidad, ubicación, estado y criticidad para la operación.",
  },
  {
    num: "02",
    title: "Pauta por equipo",
    text: "Cada equipo recibe un plan de mantención según su tipo, uso y recomendaciones del fabricante. Nada queda a criterio del momento.",
  },
  {
    num: "03",
    title: "Ejecución con checklist",
    text: "Cada visita sigue la pauta punto por punto: limpieza, mediciones eléctricas, presiones de refrigerante, drenajes y ajustes.",
  },
  {
    num: "04",
    title: "Informe técnico",
    text: "Al cierre de cada visita se entrega un informe con registro fotográfico, mediciones y observaciones. Sirve de respaldo ante auditorías y licitaciones.",
  },
  {
    num: "05",
    title: "Historial y trazabilidad",
    text: "Cada equipo acumula su hoja de vida: mantenciones, fallas, repuestos. La información queda disponible para el administrador del contrato.",
  },
];

export const sectors = [
  "Oficinas corporativas",
  "Comercio y retail",
  "Edificios en administración",
  "Instituciones públicas",
  "Salud y educación",
  "Salas técnicas y de equipos",
];

export const projects = [
  {
    title: "Instalación de equipos split muro",
    category: "Instalación",
    text: "Montaje, vacío, carga, pruebas y puesta en marcha de equipos de climatización para espacios de trabajo y atención.",
    image: "/images/projects/proyecto-1.jpg",
  },
  {
    title: "Mantención preventiva programada",
    category: "Mantención",
    text: "Limpieza, revisión y ajustes según pauta, con informe técnico al cierre de cada visita.",
    image: "/images/projects/proyecto-2.jpg",
  },
  {
    title: "Diagnóstico y reparación técnica",
    category: "Correctiva",
    text: "Levantamiento de fallas, corrección y recuperación de la operación en el menor tiempo posible.",
    image: "/images/projects/proyecto-3.jpg",
  },
];

export const backing = {
  intro:
    "LOGICAV es una empresa chilena de ingeniería técnica en climatización. Trabajamos con un equipo propio de técnicos y un método claro: pauta, informe y trazabilidad en cada visita.",
  items: [
    {
      title: "Equipo técnico propio",
      text: "Técnicos en climatización con experiencia en instalación, mantención y diagnóstico de equipos split, cassette y multi-split.", // [POR VALIDAR]
    },
    {
      // [POR VALIDAR] versión con certificación SEC en DATOS-POR-VALIDAR.md:
      // no publicar esa afirmación hasta confirmarla.
      title: "Trabajo documentado",
      text: "Cada instalación y mantención se entrega con informe técnico y registro fotográfico del trabajo realizado.",
    },
    {
      title: "Marcas que trabajamos",
      text: "Instalamos y mantenemos equipos Anwo, Midea y Clark, entre otras marcas presentes en el mercado chileno.",
    },
    {
      title: "Cobertura",
      text: `${contact.coverage}. ${contact.coverageDetail}`,
    },
  ],
  since: "2019", // [POR VALIDAR]
};

export const brands = [
  { src: "/images/brands/anwo.png", alt: "Anwo" },
  { src: "/images/brands/midea.png", alt: "Midea" },
  { src: "/images/brands/clark.png", alt: "Clark" },
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
  ],
};

export const formatCLP = (value: number) =>
  new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
