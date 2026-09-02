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

      <main className="min-h-screen bg-shell">
        <section className="border-b border-line bg-navy-800">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <div className="max-w-3xl">
              <p className="eyebrow">Suministro de equipos</p>
              <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-none text-white md:text-6xl">
                Equipos con instalación y
                <br />
                mantención en un solo contrato
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-steel-400">
                Split muro inverter de 9.000 a 24.000 BTU de Anwo, Midea y Clark. Los valores son
                referenciales por unidad, netos (+ IVA): para recambios o ampliaciones de parque
                cotizamos según cantidad, instalación y plan de mantención asociado.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/#cotizar"
                  className="bg-flame-500 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-flame-600"
                >
                  Cotizar según proyecto
                </Link>
                <a
                  href={`${contact.whatsapp}?text=${encodeURIComponent(
                    "Hola, necesito cotizar equipos de aire acondicionado."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-navy-500 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-navy-700"
                >
                  Consultar por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6">
          {brandsOrder.map((marca) => (
            <section key={marca} className="border-b border-line py-14 last:border-b-0">
              <div className="flex items-center gap-4">
                <span className="rule" />
                <h2 className="font-display text-2xl font-bold uppercase tracking-[0.08em] text-navy-800">
                  {marca}
                </h2>
              </div>

              <div className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
                {products
                  .filter((p) => p.marca === marca)
                  .map((p) => (
                    <article key={p.slug} className="flex flex-col bg-white">
                      <div className="relative h-44 w-full bg-shell">
                        <Image
                          src={p.imageUrl}
                          alt={`${p.marca} ${p.nombre}`}
                          fill
                          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                          className="object-contain p-4"
                        />
                      </div>

                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-display text-lg font-bold uppercase leading-tight tracking-wide text-navy-800">
                            {p.nombre}
                          </h3>
                          <span className="shrink-0 bg-flame-50 px-2 py-1 text-[11px] font-semibold tabular-nums text-flame-600">
                            {p.capacidadBtu.toLocaleString("es-CL")} BTU
                          </span>
                        </div>

                        <p className="mt-2 text-sm leading-6 text-steel-600">{p.descripcion}</p>

                        <dl className="mt-4 border-t border-line pt-4 text-sm">
                          <div className="flex items-baseline justify-between py-1.5">
                            <dt className="text-xs uppercase tracking-[0.1em] text-steel-500">
                              Área recomendada
                            </dt>
                            <dd className="font-medium text-navy-800">{p.areaRecomendada}</dd>
                          </div>
                          <div className="flex items-baseline justify-between py-1.5">
                            <dt className="text-xs uppercase tracking-[0.1em] text-steel-500">
                              Valor referencial
                            </dt>
                            <dd className="font-display text-lg font-bold tabular-nums text-navy-800">
                              {formatCLP(p.precioReferencia)}{" "}
                              <span className="text-xs font-normal text-steel-500">+ IVA</span>
                            </dd>
                          </div>
                        </dl>

                        <a
                          href={`${contact.whatsapp}?text=${encodeURIComponent(
                            `Hola, me interesa cotizar: ${p.marca} ${p.nombre}`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-5 block border border-line px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.1em] text-navy-800 transition hover:border-flame-500 hover:text-flame-500"
                        >
                          Cotizar este equipo
                        </a>
                      </div>
                    </article>
                  ))}
              </div>
            </section>
          ))}
        </div>

        <section className="bg-navy-800">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-14 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="rule" />
              <h2 className="mt-5 font-display text-3xl font-bold uppercase leading-none text-white md:text-4xl">
                ¿Recambio de varios equipos?
              </h2>
              <p className="mt-4 text-sm leading-7 text-steel-400">
                Para parques de equipos cotizamos suministro, instalación y contrato de mantención
                como un solo proyecto, con mejores valores por volumen.
              </p>
            </div>
            <Link
              href="/#cotizar"
              className="bg-flame-500 px-7 py-4 text-center text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-flame-600 lg:shrink-0"
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
