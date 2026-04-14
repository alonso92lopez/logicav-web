"use client";

import Image from "next/image";

import { useRef } from "react";

export default function Home() {
  const services = [
    {
      title: "Instalación de aire acondicionado",
      text: "Implementamos soluciones de climatización para oficinas, comercios, recintos técnicos y espacios de atención.",
    },
    {
      title: "Mantención preventiva",
      text: "Programas de mantención orientados a continuidad operativa, eficiencia y mayor vida útil de los equipos.",
    },
    {
      title: "Diagnóstico y reparación",
      text: "Inspección técnica, detección de fallas y ejecución de reparaciones para recuperar operación con rapidez.",
    },
    {
      title: "Proyectos HVAC",
      text: "Desarrollo e implementación de proyectos de climatización adaptados a cada requerimiento operativo.",
    },
    {
      title: "Atención a empresas",
      text: "Respuesta ágil para clientes que necesitan cumplimiento, trazabilidad y ejecución técnica confiable.",
    },
    {
      title: "Sector público",
      text: "Experiencia trabajando con organismos públicos y requerimientos técnicos y administrativos exigentes.",
    },
  ];

  const highlights = [
    "Ejecución técnica confiable",
    "Respuesta rápida y ordenada",
    "Experiencia en proyectos y mantenciones",
    "Foco en empresas y sector público",
  ];

  const trustItems = [
    {
      title: "Respuesta ágil",
      text: "Comunicación clara y rápida para avanzar sin fricción.",
    },
    {
      title: "Cumplimiento técnico",
      text: "Soluciones bien ejecutadas, con foco en calidad y continuidad.",
    },
    {
      title: "Versatilidad operativa",
      text: "Capacidad para abordar instalación, mantención y soporte.",
    },
    {
      title: "Enfoque profesional",
      text: "Una propuesta ordenada para empresas, instituciones y sector público.",
    },
  ];

  const projects = [
    {
      title: "Instalación de equipos split muro",
      category: "Instalación",
      text: "Montaje, pruebas y puesta en marcha de equipos de climatización para espacios de trabajo y atención.",
      image: "/images/projects/proyecto-1.jpg",
    },
    {
      title: "Mantención preventiva programada",
      category: "Mantención",
      text: "Limpieza, revisión y ajustes orientados a asegurar continuidad operativa y mejor desempeño.",
      image: "/images/projects/proyecto-2.jpg",
    },
    {
      title: "Diagnóstico y reparación técnica",
      category: "Soporte técnico",
      text: "Levantamiento de fallas, corrección de problemas y recuperación de operación en menor tiempo.",
      image: "/images/projects/proyecto-3.jpg",
    },
  ];

    const products = [
  {
    nombre: "Aire acondicionado 9.000 BTU Inverter",
    marca: "ANWO",
    slug: "aire-9000-btu",
    categoria: "products",
    precio: 379990,
    precioOferta: 326590,
    descripcionCorta: "Ideal para dormitorios y espacios pequeños",
    capacidadBtu: 9000,
    areaRecomendada: "hasta 15 m2",
    imageUrl: "/images/products/anwo-9000.jpg",
  },
  {
    nombre: "Split Muro Anwo Inverter Cool Design 9.000 BTU",
    marca: "ANWO",
    slug: "aire-9000-btu-cool",
    categoria: "products",
    precio: 549990,
    precioOferta: 495290,
    descripcionCorta: "Climatiza tus espacios con estilo gracias al equipo cool design",
    capacidadBtu: 9000,
    areaRecomendada: "hasta 15 m2",
    imageUrl: "/images/products/anwo-9000-cool.png",
  },
  {
    nombre: "Aire acondicionado 12.000 BTU Inverter",
    marca: "ANWO",
    slug: "aire-12000-btu",
    categoria: "products",
    precio: 449990,
    precioOferta: 352990,
    descripcionCorta: "Solución estándar para livings y oficinas",
    capacidadBtu: 12000,
    areaRecomendada: "15–25 m2",
    imageUrl: "/images/products/anwo-12000.jpg",
  },
  {
    nombre: "Aire acondicionado 18.000 BTU Inverter",
    marca: "ANWO",
    slug: "aire-18000-btu",
    categoria: "products",
    precio: 579990,
    precioOferta: 486590,
    descripcionCorta: "Recomendado para espacios amplios",
    capacidadBtu: 18000,
    areaRecomendada: "hasta 35 m2",
    imageUrl: "/images/products/anwo-18000.jpg",
  },
  {
    nombre: "Aire acondicionado 24.000 BTU Inverter",
    marca: "ANWO",
    slug: "aire-24000-btu",
    categoria: "products",
    precio: 699990,
    precioOferta: 611990,
    descripcionCorta: "Ideal para áreas grandes o comerciales",
    capacidadBtu: 24000,
    areaRecomendada: "35+ m2",
    imageUrl: "/images/products/anwo-24000.jpg",
  },
  {
    nombre: "Instalación aire acondicionado",
    marca: "LOGICAV",
    slug: "instalacion-aire",
    categoria: "services",
    precio: 150000,
    precioOferta: 120000,
    descripcionCorta: "Instalación profesional de equipos de aire acondicionado en hogares y empresas",
    capacidadBtu: null,
    areaRecomendada: "Según proyecto",
    imageUrl: "/images/products/instalacion-aire.png",
  },
  {
    nombre: "Mantención aire acondicionado",
    marca: "LOGICAV",
    slug: "mantencion-aire",
    categoria: "services",
    precio: 50000,
    precioOferta: 35000,
    descripcionCorta: "Limpieza, revisión y optimización del equipo",
    capacidadBtu: null,
    areaRecomendada: "Según equipo",
    imageUrl: "/images/products/mantencion-aire.jpg",
  },
  {
    nombre: "Aire acondicionado 9.000 BTU Inverter",
    marca: "MIDEA",
    slug: "aire-9000-btu-midea",
    categoria: "products",
    precio: 354990,
    precioOferta: 275190,
    descripcionCorta: "Ideal para dormitorios y espacios pequeños",
    capacidadBtu: 9000,
    areaRecomendada: "hasta 15 m2",
    imageUrl: "/images/products/midea-9000.png",
  },
  {
    nombre: "Aire acondicionado 12.000 BTU Inverter",
    marca: "MIDEA",
    slug: "aire-12000-btu-midea",
    categoria: "products",
    precio: 379990,
    precioOferta: 280190,
    descripcionCorta: "Solución estándar para livings y oficinas",
    capacidadBtu: 12000,
    areaRecomendada: "15–25 m2",
    imageUrl: "/images/products/midea-12000.png",
  },
  {
    nombre: "Aire acondicionado 18.000 BTU Inverter",
    marca: "MIDEA",
    slug: "aire-18000-btu-midea",
    categoria: "products",
    precio: 519990,
    precioOferta: 485090,
    descripcionCorta: "Recomendado para espacios amplios",
    capacidadBtu: 18000,
    areaRecomendada: "hasta 35 m2",
    imageUrl: "/images/products/midea-18000.png",
  },
  {
    nombre: "Aire acondicionado 24.000 BTU Inverter",
    marca: "MIDEA",
    slug: "aire-24000-btu-midea",
    categoria: "products",
    precio: 699990,
    precioOferta: 627990,
    descripcionCorta: "Ideal para áreas grandes o comerciales",
    capacidadBtu: 24000,
    areaRecomendada: "35+ m2",
    imageUrl: "/images/products/midea-24000.png",
  },
  {
    nombre: "Aire acondicionado 9.000 BTU Inverter",
    marca: "CLARK",
    slug: "aire-9000-btu-clark",
    categoria: "products",
    precio: 344990,
    precioOferta: 269150,
    descripcionCorta: "Ideal para dormitorios y espacios pequeños",
    capacidadBtu: 9000,
    areaRecomendada: "hasta 15 m2",
    imageUrl: "/images/products/clark-9000.png",
  },
  {
    nombre: "Aire acondicionado 12.000 BTU Inverter",
    marca: "CLARK",
    slug: "aire-12000-btu-clark",
    categoria: "products",
    precio: 369990,
    precioOferta: 270250,
    descripcionCorta: "Solución estándar para livings y oficinas",
    capacidadBtu: 12000,
    areaRecomendada: "15–25 m2",
    imageUrl: "/images/products/clark-12000.png",
  },
  {
    nombre: "Aire acondicionado 18.000 BTU Inverter",
    marca: "CLARK",
    slug: "aire-18000-btu-clark",
    categoria: "products",
    precio: 499990,
    precioOferta: 475950,
    descripcionCorta: "Recomendado para espacios amplios",
    capacidadBtu: 18000,
    areaRecomendada: "hasta 35 m2",
    imageUrl: "/images/products/clark-18000.png",
  },
  {
    nombre: "Aire acondicionado 24.000 BTU Inverter",
    marca: "CLARK",
    slug: "aire-24000-btu-clark",
    categoria: "products",
    precio: 675000,
    precioOferta: 605990,
    descripcionCorta: "Ideal para áreas grandes o comerciales",
    capacidadBtu: 24000,
    areaRecomendada: "35+ m2",
    imageUrl: "/images/products/clark-24000.png",
  },
  ];

  const featuredProducts = products.filter(
    (item) => item.categoria === "products"
  );
  const featuredServices = products.filter((item) => item.categoria === "services");

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      maximumFractionDigits: 0,
    }).format(value);

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const { scrollLeft, clientWidth } = scrollRef.current;

    scrollRef.current.scrollTo({
      left:
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen bg-[#081120] text-white">
      <a
        href="https://wa.me/56987066666"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-[60] inline-flex items-center rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-2xl shadow-cyan-900/30 transition hover:scale-[1.02] hover:bg-cyan-300"
      >
        WhatsApp
      </a>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#081120]/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-white/10 bg-white p-1 shadow-lg">
              <Image
                src="/images/brand/logo.png"
                alt="Logo Logicav"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <p className="text-2xl font-bold tracking-wide text-white">LOGICAV</p>
              <p className="text-sm text-white/60">Climatización e ingeniería</p>
            </div>
          </div>

          <nav className="hidden gap-8 text-sm text-white/80 md:flex">
            <a href="#servicios" className="transition hover:text-white">
              Servicios
            </a>
            <a href="#productos" className="transition hover:text-white">
              Productos
            </a>
            <a href="#proyectos" className="transition hover:text-white">
              Proyectos
            </a>
            <a href="#nosotros" className="transition hover:text-white">
              Nosotros
            </a>
            <a href="#contacto" className="transition hover:text-white">
              Contacto
            </a>
          </nav>

          <a
            href="https://wa.me/56987066666"
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            WhatsApp
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_left,rgba(59,130,246,0.14),transparent_24%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <p className="mb-5 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-300">
              Soluciones de climatización e ingeniería
            </p>

            <h1 className="max-w-3xl text-5xl font-bold leading-tight md:text-6xl">
              Ingeniería y climatización para operar con confianza
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">
              En LOGICAV desarrollamos soluciones de climatización, mantención e
              instalación para empresas, instituciones y sector público, con
              foco en cumplimiento, rapidez y buena ejecución.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://wa.me/56987066666"
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Solicitar contacto
              </a>
              <a
                href="#servicios"
                className="rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/5"
              >
                Ver servicios
              </a>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-2 gap-4 text-sm text-white/75">
              {highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="md:justify-self-end">
            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-2xl shadow-cyan-950/20">
              <div className="h-[520px] w-full">
                <img
                  src="/images/hero.jpg"
                  alt="Hero"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-8">
        <div className="grid gap-4 rounded-[28px] border border-white/10 bg-white/[0.04] p-6 md:grid-cols-3">
          <div className="rounded-2xl bg-[#0d1728] p-6">
            <p className="text-3xl font-bold text-cyan-300">Empresas</p>
            <p className="mt-2 text-white/65">
              Soluciones para operación, continuidad y soporte técnico.
            </p>
          </div>
          <div className="rounded-2xl bg-[#0d1728] p-6">
            <p className="text-3xl font-bold text-cyan-300">Sector público</p>
            <p className="mt-2 text-white/65">
              Respuesta a requerimientos técnicos y administrativos exigentes.
            </p>
          </div>
          <div className="rounded-2xl bg-[#0d1728] p-6">
            <p className="text-3xl font-bold text-cyan-300">Proyectos</p>
            <p className="mt-2 text-white/65">
              Instalación, mantención, diagnóstico y ejecución técnica.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.04] p-8 md:p-10">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
                Confianza
              </p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                Una propuesta pensada para resolver bien
              </h2>
            </div>
            <p className="max-w-2xl text-white/65">
              Esta sección ayuda a comunicar por qué elegir LOGICAV, incluso
              antes de que el cliente te escriba.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {trustItems.map((item) => (
              <div
                key={item.title}
                className="rounded-[24px] border border-white/10 bg-[#0d1728] p-6"
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 leading-7 text-white/65">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="rounded-[30px] border border-white/10 bg-white/[0.04] px-6 py-12">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
            Trabajamos con marcas reconocidas
          </p>

          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-10">
            {[
              { src: "/images/brands/anwo.png", alt: "ANWO" },
              { src: "/images/brands/midea.png", alt: "MIDEA" },
              { src: "/images/brands/clark.png", alt: "CLARK" },
            ].map((brand) => (
              <div
                key={brand.alt}
                className="flex items-center justify-center rounded-2xl border border-white/10 bg-[#0d1728] p-6"
              >
                <img
                  src={brand.src}
                  alt={brand.alt}
                  className="h-14 md:h-20 object-contain opacity-90"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="servicios" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
              Servicios
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Soluciones para operación, mantención y proyectos
            </h2>
          </div>

          <p className="max-w-2xl text-white/65">
            Una propuesta clara, técnica y orientada a resolver requerimientos
            de climatización con orden y rapidez.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group rounded-[24px] border border-white/10 bg-white/[0.04] p-7 transition hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/[0.06]"
            >
              <div className="mb-5 h-12 w-12 rounded-2xl bg-cyan-400/12 ring-1 ring-cyan-400/20" />
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="mt-4 leading-7 text-white/65">{service.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="productos" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
              Productos
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Equipos disponibles para climatizar tus espacios
            </h2>
          </div>

          <p className="max-w-2xl text-white/65">
            Equipos inverter seleccionados para hogares, oficinas y espacios comerciales,
            con opción de instalación y soporte de LOGICAV.
          </p>
        </div>

        <div className="relative">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[#081120]/80 p-3 text-white backdrop-blur transition hover:bg-cyan-400 hover:text-slate-900"
            aria-label="Ver productos anteriores"
          >
            ❮
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-[#081120]/80 p-3 text-white backdrop-blur transition hover:bg-cyan-400 hover:text-slate-900"
            aria-label="Ver más productos"
          >
            ❯
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto px-10 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {featuredProducts.map((product) => (
              <div
                key={product.slug}
                className="min-w-[320px] max-w-[320px] shrink-0 overflow-hidden rounded-[26px] border border-white/10 bg-[#0d1728] shadow-lg transition hover:-translate-y-1 hover:border-cyan-400/40"
              >
                <div className="relative h-64 w-full overflow-hidden bg-slate-800">
                  <img
                    src={product.imageUrl}
                    alt={product.nombre}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">
                        {product.marca}
                      </p>
                      <h3 className="mt-2 text-xl font-semibold leading-snug">
                        {product.nombre}
                      </h3>
                    </div>

                    {product.capacidadBtu && (
                      <p className="shrink-0 rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
                        {product.capacidadBtu} BTU
                      </p>
                    )}
                  </div>

                  <p className="mt-4 min-h-[56px] leading-7 text-white/65">
                    {product.descripcionCorta}
                  </p>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm text-white/50">Área recomendada</p>
                    <p className="mt-1 font-medium text-white">
                      {product.areaRecomendada}
                    </p>
                  </div>

                  <div className="mt-5 flex items-end gap-3">
                    <p className="text-2xl font-bold text-cyan-300">
                      {formatPrice(product.precioOferta)}
                    </p>
                    <p className="text-sm text-white/40 line-through">
                      {formatPrice(product.precio)}
                    </p>
                  </div>

                  <a
                    href={`https://wa.me/56987066666?text=${encodeURIComponent(
                      `Hola, me interesa cotizar este producto: ${product.nombre}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
                  >
                    Cotizar por WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

  <div className="mt-10 flex justify-center">
    <a
      href="https://wa.me/56987066666?text=Hola, quiero ayuda para elegir un aire acondicionado"
      target="_blank"
      rel="noreferrer"
      className="inline-flex rounded-full border border-white/15 px-6 py-3 font-semibold text-white transition hover:bg-white/5"
    >
      Necesito ayuda para elegir
    </a>
  </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
            Servicios destacados
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Instalación y mantención con soporte LOGICAV
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {featuredServices.map((service) => (
            <div
              key={service.slug}
              className="overflow-hidden rounded-[26px] border border-white/10 bg-[#0d1728]"
            >
              <div className="grid md:grid-cols-[240px_1fr]">
                <div className="h-64 md:h-full">
                  <img
                    src={service.imageUrl}
                    alt={service.nombre}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-cyan-300">
                    Servicio
                  </p>

                  <h3 className="mt-3 text-2xl font-semibold">
                    {service.nombre}
                  </h3>

                  <p className="mt-4 leading-7 text-white/65">
                    {service.descripcionCorta}
                  </p>

                  <div className="mt-5 flex items-end gap-3">
                    <p className="text-2xl font-bold text-cyan-300">
                      Desde {formatPrice(service.precioOferta)}
                    </p>
                    <p className="text-sm text-white/40 line-through">
                      {formatPrice(service.precio)}
                    </p>
                  </div>

                  <a
                    href={`https://wa.me/56987066666?text=${encodeURIComponent(
                      `Hola, me interesa cotizar este servicio: ${service.nombre}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
                  >
                    Cotizar servicio
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="proyectos" className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
                Proyectos
              </p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                Tipos de trabajos que puede ejecutar LOGICAV
              </h2>
            </div>

            <p className="max-w-2xl text-white/65">
              Experiencia en instalación, mantención y soporte técnico para distintos
              tipos de requerimientos en climatización.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {projects.map((project) => (
              <div
                key={project.title}
                className="overflow-hidden rounded-[26px] border border-white/10 bg-[#0d1728]"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm uppercase tracking-[0.18em] text-cyan-300">
                    {project.category}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold">{project.title}</h3>
                  <p className="mt-4 leading-7 text-white/65">{project.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="nosotros" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
              Nosotros
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Una empresa técnica orientada a ejecutar bien
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
              En LOGICAV combinamos criterio técnico, capacidad de respuesta y
              foco comercial para ofrecer soluciones de climatización confiables.
              Nuestro objetivo es que el cliente tenga claridad, rapidez y una
              ejecución sólida de principio a fin.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[24px] border border-white/10 bg-[#0d1728] p-6">
              <p className="text-3xl font-bold text-cyan-300">+10</p>
              <p className="mt-2 text-white/70">
                Tipos de requerimientos que podemos abordar
              </p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-[#0d1728] p-6">
              <p className="text-3xl font-bold text-cyan-300">Rápido</p>
              <p className="mt-2 text-white/70">
                Comunicación clara y respuesta comercial ágil
              </p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-[#0d1728] p-6">
              <p className="text-3xl font-bold text-cyan-300">Confiable</p>
              <p className="mt-2 text-white/70">
                Foco en cumplimiento técnico y ejecución ordenada
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-[32px] border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 via-white/[0.04] to-blue-500/10 p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
                Contacto
              </p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                Conversemos sobre tu proyecto o requerimiento
              </h2>
              <p className="mt-5 max-w-2xl text-white/70">
                Si necesitas instalación, mantención, diagnóstico o apoyo en
                proyectos de climatización, escríbenos y vemos la mejor forma de
                ayudarte.
              </p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-[#0d1728] p-6">
              <p className="text-sm text-white/50">Correo</p>
              <a
                href="mailto:contacto@logicav.cl"
                className="mt-2 block text-lg font-semibold hover:text-cyan-300"
              >
                contacto@logicav.cl
              </a>

              <p className="mt-6 text-sm text-white/50">WhatsApp</p>
              <a
                href="https://wa.me/56987066666"
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex rounded-full bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Escribir ahora
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-[30px] border border-white/10 bg-[#0d1728] p-8 md:flex md:items-center md:justify-between md:p-10">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
              Listos para ayudarte
            </p>
            <h2 className="mt-3 text-3xl font-bold">
              ¿Necesitas una solución de climatización?
            </h2>
            <p className="mt-4 leading-7 text-white/65">
              Hablemos por WhatsApp y evaluamos tu instalación, mantención o
              requerimiento técnico.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <a
              href="https://wa.me/56987066666"
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Contactar ahora
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© 2026 LOGICAV. Todos los derechos reservados.</p>
          <p>Climatización, mantención e ingeniería.</p>
        </div>
      </footer>
    </main>
  );
}