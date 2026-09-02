import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { contact, formatCLP, products } from "@/lib/content";

export const metadata: Metadata = {
  title: "Equipos de aire acondicionado — Anwo, Midea y Clark",
  description:
    "Suministro de equipos split inverter de 9.000 a 24.000 BTU con instalación y mantención en un solo contrato. Marcas Anwo, Midea y Clark.",
  alternates: { canonical: "/equipos" },
};

const brandsOrder = ["ANWO", "MIDEA", "CLARK"] as const;

export default function EquiposPage() {
  return (
    <>
      <Header />

      <main className="mx-auto max-w-6xl px-5 md:px-8">
        <section className="max-w-2xl pb-6 pt-16 md:pt-24">
          <p className="kicker">
            Suministro de equipos
          </p>
          <h1
            className="mt-3 font-display text-3xl font-bold tracking-tight md:text-5xl"
          >
            Equipos con instalación y mantención en un solo contrato.
          </h1>
          <p className="mt-5 leading-8 text-ink-soft">
            Split muro inverter de 9.000 a 24.000 BTU de Anwo, Midea y Clark.
            Los valores son referenciales por unidad, netos (+ IVA): para
            recambios o ampliaciones de parque cotizamos según cantidad,
            instalación y plan de mantención asociado.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/#cotizar"
              className="rounded-md bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-dark"
            >
              Cotizar según proyecto
            </Link>
            <a
              href={`${contact.whatsapp}?text=${encodeURIComponent(
                "Hola, necesito cotizar equipos de aire acondicionado para mi empresa."
              )}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-line px-6 py-3 font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </section>

        {brandsOrder.map((marca) => (
          <section key={marca} className="border-t border-line py-14">
            <h2 className="font-display text-xl font-bold tracking-tight text-ink-soft">
              {marca}
            </h2>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {products
                .filter((p) => p.marca === marca)
                .map((p) => (
                  <article
                    key={p.slug}
                    className="flex flex-col overflow-hidden rounded-lg border border-line"
                  >
                    <div className="relative h-44 w-full bg-mist">
                      <Image
                        src={p.imageUrl}
                        alt={`${p.marca} ${p.nombre}`}
                        fill
                        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                        className="object-contain p-3"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display text-base font-bold leading-snug">
                          {p.nombre}
                        </h3>
                        <span className="shrink-0 rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[11px] text-accent">
                          {p.capacidadBtu.toLocaleString("es-CL")} BTU
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-ink-soft">{p.descripcion}</p>
                      <dl className="mt-4 space-y-1.5 border-t border-line pt-4 text-sm">
                        <div className="flex justify-between">
                          <dt className="text-ink-faint">Área recomendada</dt>
                          <dd className="font-medium">{p.areaRecomendada}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-ink-faint">Valor referencial</dt>
                          <dd className="font-mono font-medium">
                            {formatCLP(p.precioReferencia)}{" "}
                            <span className="text-xs font-normal text-ink-faint">+ IVA</span>
                          </dd>
                        </div>
                      </dl>
                      <a
                        href={`${contact.whatsapp}?text=${encodeURIComponent(
                          `Hola, me interesa cotizar: ${p.marca} ${p.nombre}`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-5 rounded-md border border-line px-4 py-2.5 text-center text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
                      >
                        Cotizar este equipo
                      </a>
                    </div>
                  </article>
                ))}
            </div>
          </section>
        ))}

        <section className="border-t border-line py-16">
          <div className="rounded-lg bg-mist p-8 md:flex md:items-center md:justify-between md:p-10">
            <div className="max-w-xl">
              <h2 className="font-display text-2xl font-bold tracking-tight">
                ¿Recambio de varios equipos?
              </h2>
              <p className="mt-3 leading-7 text-ink-soft">
                Para parques de equipos cotizamos suministro, instalación y
                contrato de mantención como un solo proyecto, con mejores
                valores por volumen.
              </p>
            </div>
            <Link
              href="/#cotizar"
              className="mt-6 inline-block rounded-md bg-accent px-6 py-3 font-semibold text-white transition-colors hover:bg-accent-dark md:mt-0"
            >
              Cotizar proyecto completo
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
