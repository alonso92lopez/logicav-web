import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TrabajaForm } from "@/components/TrabajaForm";
import { trabaja } from "@/lib/content";

/*
  logicav.cl/trabaja — reclutamiento de técnicos de climatización (16-11-2026).

  Experimento: fuera del menú, del sitemap y sin indexar. Se llega por el link
  que Alonso manda a cada técnico:
    /trabaja?origen=marketplace            (sin ficha previa)
    /trabaja?ref=<código>&origen=marketplace (completa la ficha que ya anotó)

  Encabezado propio y mínimo: el del sitio vende a clientes ("Cotiza hoy").
*/
export const metadata: Metadata = {
  title: "Trabaja con nosotros",
  description: "Técnicos de climatización: postula para recibir trabajos de Logicav.",
  alternates: { canonical: "/trabaja" },
  robots: { index: false, follow: false },
};

const uno = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function TrabajaPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;

  return (
    <>
      <header className="border-b-2 border-flame-500 bg-navy-800">
        <div className="mx-auto flex max-w-5xl items-center px-4 py-3.5 sm:px-6">
          <Link href="/" className="flex items-center gap-3.5" aria-label="LOGICAV — inicio">
            <div className="relative h-11 w-11 shrink-0 bg-white">
              <Image
                src="/images/brand/logo.png"
                alt=""
                fill
                sizes="44px"
                className="object-contain p-2"
                priority
              />
            </div>
            <p className="font-display text-2xl font-bold tracking-[0.08em] text-white">LOGICAV</p>
          </Link>
        </div>
      </header>

      <main className="min-h-screen bg-shell text-navy-800">
        <section className="bg-navy-800">
          <div className="mx-auto max-w-5xl px-4 pb-12 pt-10 sm:px-6 md:pb-16 md:pt-14">
            <p className="eyebrow">{trabaja.eyebrow}</p>
            <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-none text-white md:text-5xl">
              {trabaja.titulo.map((linea) => (
                <span key={linea} className="block">
                  {linea}
                </span>
              ))}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-steel-400">{trabaja.intro}</p>

            <dl className="mt-8 grid gap-x-10 gap-y-6 border-t border-navy-600 pt-8 sm:grid-cols-2">
              {trabaja.puntos.map((p) => (
                <div key={p.titulo} className="border-l-2 border-flame-500 pl-4">
                  <dt className="font-display text-xl font-bold uppercase leading-none tracking-wide text-white">
                    {p.titulo}
                  </dt>
                  <dd className="mt-2 text-sm leading-6 text-steel-400">{p.texto}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="postular" className="mx-auto max-w-2xl px-4 py-10 sm:px-6 md:py-14">
          <span className="rule" />
          <h2 className="mt-4 font-display text-3xl font-bold uppercase leading-none text-navy-800">
            {trabaja.formTitulo}
          </h2>
          <p className="mt-2 text-sm text-steel-600">{trabaja.formTexto}</p>
          <div className="mt-8 border border-line bg-white p-5 sm:p-8">
            <TrabajaForm origen={uno(sp.origen)} codigo={uno(sp.ref)} />
          </div>
        </section>
      </main>
    </>
  );
}
