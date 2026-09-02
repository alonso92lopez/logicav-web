import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calculadora } from "@/components/Calculadora";

export const metadata: Metadata = {
  title: "Calculadora de capacidad — cuántos BTU necesito",
  description:
    "Calcula cuántos BTU necesita tu recinto según superficie, altura de cielo, exposición al sol y uso. Orientación previa a la visita técnica.",
  alternates: { canonical: "/calculadora" },
};

export default function CalculadoraPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-shell">
        <section className="border-b border-line bg-navy-800">
          <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">
            <div className="max-w-3xl">
              <p className="eyebrow">Calculadora de capacidad</p>
              <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-none text-white md:text-6xl">
                ¿Cuántos BTU
                <br />
                necesita tu recinto?
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-steel-400">
                Un equipo que queda corto trabaja al máximo todo el día y no alcanza la
                temperatura. Uno sobredimensionado enfría rápido, se apaga y deja el ambiente
                húmedo, además de gastar de más. Esta calculadora te da el rango correcto antes
                de cotizar.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-12 md:py-16">
          <Calculadora />
        </section>

        <section className="border-t border-line bg-white py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-2xl">
              <p className="eyebrow">Cómo se calcula</p>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase leading-none text-navy-800 md:text-4xl">
                Qué hay detrás del número
              </h2>
            </div>

            <div className="mt-10 grid gap-px bg-line md:grid-cols-2 xl:grid-cols-4">
              <div className="bg-white p-7">
                <span className="rule" />
                <h3 className="mt-5 font-display text-xl font-bold uppercase leading-none tracking-wide text-navy-800">
                  Superficie
                </h3>
                <p className="mt-3 text-sm leading-7 text-steel-600">
                  Es el punto de partida. Los tramos son los mismos que declara cada equipo del
                  catálogo como área recomendada, así que el resultado nunca contradice lo que
                  verás en la ficha del producto.
                </p>
              </div>
              <div className="bg-white p-7">
                <span className="rule" />
                <h3 className="mt-5 font-display text-xl font-bold uppercase leading-none tracking-wide text-navy-800">
                  Altura de cielo
                </h3>
                <p className="mt-3 text-sm leading-7 text-steel-600">
                  Lo que se climatiza es volumen, no superficie. Sobre los 2,4 m estándar el
                  requerimiento sube en proporción directa: un cielo de 3 m pide un 25 % más.
                </p>
              </div>
              <div className="bg-white p-7">
                <span className="rule" />
                <h3 className="mt-5 font-display text-xl font-bold uppercase leading-none tracking-wide text-navy-800">
                  Exposición al sol
                </h3>
                <p className="mt-3 text-sm leading-7 text-steel-600">
                  Un recinto al poniente con ventanal amplio recibe una carga térmica muy
                  superior a uno al sur. Es la corrección que más se subestima al elegir equipo.
                </p>
              </div>
              <div className="bg-white p-7">
                <span className="rule" />
                <h3 className="mt-5 font-display text-xl font-bold uppercase leading-none tracking-wide text-navy-800">
                  Ocupación y equipos
                </h3>
                <p className="mt-3 text-sm leading-7 text-steel-600">
                  Cada persona aporta calor, y una cocina, una sala de servidores o maquinaria en
                  operación cambian el escenario por completo.
                </p>
              </div>
            </div>

            <div className="mt-10 border-l-2 border-flame-500 bg-shell p-7">
              <h3 className="font-display text-xl font-bold uppercase leading-none tracking-wide text-navy-800">
                Lo que esta calculadora no hace
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-steel-600">
                No reemplaza un cálculo de carga térmica. No considera la aislación de muros y
                cielo, la materialidad, las infiltraciones de aire, la orientación exacta ni la
                superficie vidriada real. Para una instalación que tiene que rendir —una oficina,
                un local, una sala técnica o una faena— esos factores se levantan en visita, y
                pueden mover el resultado un tramo completo en cualquier dirección.
              </p>
              <Link
                href="/#cotizar"
                className="mt-6 inline-flex bg-navy-800 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-flame-500"
              >
                Agendar visita técnica
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
