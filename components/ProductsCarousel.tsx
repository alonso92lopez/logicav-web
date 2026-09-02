"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { contact, formatCLP, products, type Product } from "@/lib/content";

/*
  Muestra del catálogo en la home. El catálogo completo vive en /equipos,
  que está indexada y en el sitemap: acá se muestra y desde acá se enlaza.

  Los valores son netos (+ IVA), igual que en /equipos.
*/
export function ProductsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    scrollRef.current.scrollTo({
      left: direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <section id="productos" className="border-b border-line bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Equipos</p>
            <h2 className="mt-4 font-display text-4xl font-bold uppercase leading-none text-navy-800 md:text-5xl">
              Split muro inverter
            </h2>
            <p className="mt-5 text-sm leading-7 text-steel-600">
              Capacidades de 9.000 a 24.000 BTU para dormitorios, livings, oficinas y locales. El
              área recomendada es orientativa: la capacidad final se confirma con cálculo de carga
              térmica.
            </p>
          </div>

          <div className="flex gap-px bg-line">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="bg-navy-800 px-4 py-3 text-white transition hover:bg-flame-500"
              aria-label="Ver equipos anteriores"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="bg-navy-800 px-4 py-3 text-white transition hover:bg-flame-500"
              aria-label="Ver más equipos"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="mt-12 flex gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {products.map((product: Product) => (
            <article
              key={product.slug}
              className="flex min-w-[290px] max-w-[290px] shrink-0 flex-col border border-line bg-white transition hover:border-navy-800"
            >
              <div className="relative h-52 bg-shell p-6">
                <Image
                  src={product.imageUrl}
                  alt={`${product.marca} ${product.nombre}`}
                  fill
                  sizes="290px"
                  className="object-contain p-6"
                />
                {product.precioNormal > product.precioReferencia && (
                  <span className="absolute left-0 top-0 bg-flame-500 px-2.5 py-1 text-[11px] font-semibold tabular-nums text-white">
                    −{Math.round((1 - product.precioReferencia / product.precioNormal) * 100)}%
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-steel-500">
                  {product.marca}
                </p>
                <h3 className="mt-2 font-display text-xl font-bold uppercase leading-tight tracking-wide text-navy-800">
                  {product.nombre}
                </h3>
                <p className="mt-2 text-sm leading-6 text-steel-600">{product.descripcion}</p>

                <dl className="mt-5 border-t border-line text-sm">
                  <div className="flex items-baseline justify-between border-b border-line py-2.5">
                    <dt className="text-xs uppercase tracking-[0.1em] text-steel-500">Capacidad</dt>
                    <dd className="font-display text-lg font-bold tabular-nums text-navy-800">
                      {product.capacidadBtu.toLocaleString("es-CL")} BTU
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between py-2.5">
                    <dt className="text-xs uppercase tracking-[0.1em] text-steel-500">
                      Área recomendada
                    </dt>
                    <dd className="font-medium text-navy-800">{product.areaRecomendada}</dd>
                  </div>
                </dl>

                <div className="mt-auto pt-5">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <p className="font-display text-3xl font-bold leading-none tabular-nums text-navy-800">
                      {formatCLP(product.precioReferencia)}
                    </p>
                    {product.precioNormal > product.precioReferencia && (
                      <p className="text-sm tabular-nums text-steel-500 line-through">
                        {formatCLP(product.precioNormal)}
                      </p>
                    )}
                    <p className="text-xs text-steel-500">+ IVA</p>
                  </div>

                  <a
                    href={`${contact.whatsapp}?text=${encodeURIComponent(
                      `Hola, quiero cotizar el ${product.nombre} (${product.marca}).`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 block bg-flame-500 py-3 text-center text-xs font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-flame-600"
                  >
                    Cotizar con instalación
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6">
          <p className="text-sm text-steel-600">
            ¿No sabes qué capacidad necesitas? Dinos los m² y te lo calculamos.
          </p>
          <Link
            href="/calculadora"
            className="text-xs font-semibold uppercase tracking-[0.12em] text-flame-500 transition hover:text-flame-600"
          >
            Calcular capacidad →
          </Link>
          <Link
            href="/equipos"
            className="text-xs font-semibold uppercase tracking-[0.12em] text-navy-800 transition hover:text-flame-500"
          >
            Ver catálogo completo →
          </Link>
        </div>
      </div>
    </section>
  );
}
