"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ALTURA_ESTANDAR,
  OPCIONES_SOL,
  calcular,
  type Sol,
} from "@/lib/capacidad";
import { formatCLP, products } from "@/lib/content";
import { QuoteForm } from "./QuoteForm";

const labelClass =
  "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-steel-500";

const inputClass =
  "w-full border border-line bg-white px-3 py-2.5 text-sm text-navy-800 placeholder-steel-500/70 transition focus:border-flame-500 focus:outline-none";

export function Calculadora() {
  const [metros, setMetros] = useState("24");
  const [altura, setAltura] = useState("2.4");
  const [sol, setSol] = useState<Sol>("normal");
  const [personas, setPersonas] = useState("2");
  const [cargaExtra, setCargaExtra] = useState(false);

  const resultado = calcular({
    metros: Number(metros),
    altura: Number(altura) || ALTURA_ESTANDAR,
    sol,
    personas: Number(personas) || 0,
    cargaExtra,
  });

  // Equipos del catálogo que dan justo esa capacidad, del más barato al más caro.
  const equipos = resultado
    ? products
        .filter((p) => p.capacidadBtu === resultado.btu)
        .sort((a, b) => a.precioReferencia - b.precioReferencia)
    : [];

  return (
    <>
    <div className="grid gap-px bg-line lg:grid-cols-[1fr_1fr]">
      {/* ---------- Entradas ---------- */}
      <div className="bg-white p-7 md:p-9">
        <p className="eyebrow">El recinto</p>
        <h2 className="mt-3 font-display text-2xl font-bold uppercase leading-none tracking-wide text-navy-800">
          Cuéntanos cómo es
        </h2>

        <div className="mt-7 flex flex-col gap-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="c-metros">
                Superficie (m²)
              </label>
              <input
                id="c-metros"
                type="number"
                min="1"
                inputMode="numeric"
                value={metros}
                onChange={(e) => setMetros(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="c-altura">
                Altura de cielo (m)
              </label>
              <input
                id="c-altura"
                type="number"
                min="2"
                max="6"
                step="0.1"
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <fieldset>
            <legend className={labelClass}>Exposición al sol</legend>
            <div className="grid gap-px bg-line sm:grid-cols-3">
              {OPCIONES_SOL.map((o) => (
                <label
                  key={o.id}
                  className={`cursor-pointer bg-white p-3.5 transition ${
                    sol === o.id ? "outline outline-2 -outline-offset-2 outline-flame-500" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="sol"
                    value={o.id}
                    checked={sol === o.id}
                    onChange={() => setSol(o.id)}
                    className="sr-only"
                  />
                  <span className="block font-display text-base font-bold uppercase leading-tight tracking-wide text-navy-800">
                    {o.label}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-steel-600">{o.detalle}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="c-personas">
                Personas habitualmente
              </label>
              <input
                id="c-personas"
                type="number"
                min="0"
                max="60"
                inputMode="numeric"
                value={personas}
                onChange={(e) => setPersonas(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="flex items-end">
              <label className="flex w-full cursor-pointer items-start gap-3 border border-line p-3">
                <input
                  type="checkbox"
                  checked={cargaExtra}
                  onChange={(e) => setCargaExtra(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[#e8590c]"
                />
                <span className="text-xs leading-5 text-steel-600">
                  Hay cocina, servidores o maquinaria que genera calor
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Resultado ---------- */}
      <div className="flex flex-col bg-navy-800 p-7 md:p-9">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-flame-500">
          Capacidad orientativa
        </p>

        <p
          aria-live="polite"
          className="mt-4 font-display text-6xl font-bold leading-none tabular-nums text-white"
        >
          {resultado ? resultado.capacidad : "—"}
        </p>

        {resultado && (
          <>
            <p className="mt-4 text-sm leading-7 text-steel-400">
              El recinto se comporta como uno de{" "}
              <strong className="font-semibold text-white">
                {resultado.metrosEfectivos} m²
              </strong>{" "}
              una vez corregido por altura, sol y uso.
            </p>

            <dl className="mt-6 border-t border-navy-600">
              {resultado.factores.map((f) => (
                <div
                  key={f.label}
                  className="flex items-baseline justify-between gap-3 border-b border-navy-600 py-2.5"
                >
                  <dt className="text-xs text-steel-400">{f.label}</dt>
                  <dd className="font-display text-sm font-bold tabular-nums text-white">
                    {f.efecto}
                  </dd>
                </div>
              ))}
            </dl>

            {equipos.length > 0 && (
              <div className="mt-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-steel-400">
                  Equipos de esa capacidad
                </p>
                <ul className="mt-3 flex flex-col gap-2">
                  {equipos.map((p) => (
                    <li key={p.slug} className="flex items-baseline justify-between gap-3 text-sm">
                      <span className="text-white">
                        {p.marca}{" "}
                        <span className="text-steel-400">{p.areaRecomendada}</span>
                      </span>
                      <span className="shrink-0 font-display font-bold tabular-nums text-white">
                        {formatCLP(p.precioReferencia)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        <div className="mt-auto pt-8">
          <p className="text-[11px] leading-relaxed text-steel-500">
            Es una orientación, no un cálculo de carga térmica. La capacidad definitiva se
            confirma en visita técnica, que además considera aislación, materialidad,
            infiltraciones y uso real del recinto.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <a
              href="#agendar"
              className="bg-flame-500 px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-flame-600"
            >
              Agendar visita técnica
            </a>
            <Link
              href="/equipos"
              className="border border-navy-500 px-6 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-navy-700"
            >
              Ver catálogo
            </Link>
          </div>
        </div>
      </div>
    </div>

    <div id="agendar" className="mt-16 scroll-mt-28">
      <AgendarVisita metros={metros} />
    </div>
    </>
  );
}

/*
  El agendamiento vive en la misma página que el cálculo: mandar a un ancla de
  la home obligaba a un salto entre páginas que además se desviaba, porque el
  hero todavía estaba acomodando su imagen y sus fuentes cuando el navegador
  saltaba.

  El formulario recibe los m² que la persona ya escribió arriba y llega con
  "Visita técnica en terreno" preseleccionado, así el lead llega con el
  contexto del cálculo en vez de en blanco.
*/
function AgendarVisita({ metros }: { metros: string }) {
  return (
    <div className="grid gap-px bg-line lg:grid-cols-[1fr_1.2fr]">
      <div className="bg-navy-800 p-7 md:p-9">
        <p className="eyebrow">Agendar</p>
        <h2 className="mt-4 font-display text-3xl font-bold uppercase leading-none text-white md:text-4xl">
          Que un técnico lo confirme en terreno
        </h2>
        <p className="mt-5 text-sm leading-7 text-steel-400">
          La visita levanta lo que la calculadora no puede ver: aislación, materialidad,
          superficie vidriada real, infiltraciones y por dónde pasan las líneas. Con eso sale
          la capacidad definitiva y una cotización con precio cerrado.
        </p>

        <dl className="mt-8 border-t border-navy-600">
          {[
            ["Coordinación", "Te contactamos para acordar día y hora"],
            ["En la visita", "Medición del recinto y revisión de la instalación"],
            ["Después", "Cotización con capacidad definitiva y precio cerrado"],
          ].map(([k, v]) => (
            <div key={k} className="border-b border-navy-600 py-3.5">
              <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-flame-500">
                {k}
              </dt>
              <dd className="mt-1.5 text-sm leading-6 text-steel-400">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="bg-white p-7 md:p-9">
        <QuoteForm
          variant="plain"
          superficieInicial={metros}
          servicioInicial="Visita técnica en terreno"
          ctaLabel="Agendar visita técnica"
        />
      </div>
    </div>
  );
}
