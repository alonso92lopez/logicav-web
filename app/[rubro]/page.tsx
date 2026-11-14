import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { FotoComparable } from "@/components/rubro/FotoComparable";
import { RubroFooter } from "@/components/rubro/RubroFooter";
import { RubroForm } from "@/components/rubro/RubroForm";
import { RubroHeader } from "@/components/rubro/RubroHeader";
import { RubroTema } from "@/components/rubro/RubroTema";
import { diagramas } from "@/components/rubro/diagramas";
import { contact } from "@/lib/content";
import { getRubro, rubros } from "@/lib/rubros";

/*
  Plantilla de los sitios de rubro (piscinas y los que vengan). El contenido
  vive en `lib/rubros/`; acá solo está el armado.

  Cada rubro es un sitio con identidad propia: encabezado y pie suyos, sin
  nada de climatización. Se sirve en logicav.cl/<slug> y, si el rubro declara
  `subdominio`, en la portada de ese subdominio (ver `next.config.ts`).

  Solo existen los rubros registrados: cualquier otra dirección de primer
  nivel responde 404 en vez de intentar renderizarse.
*/
export const dynamicParams = false;

export function generateStaticParams() {
  return rubros.map((r) => ({ rubro: r.slug }));
}

type Props = { params: Promise<{ rubro: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const rubro = getRubro((await params).rubro);
  if (!rubro) return {};

  const marca = `LOGICAV ${rubro.marca.subtitulo}`;
  const title = `${rubro.meta.title} | ${marca}`;
  // Con subdominio, esa es la dirección oficial; la ruta es un duplicado.
  const url = rubro.subdominio
    ? `https://${rubro.subdominio}.logicav.cl`
    : `https://www.logicav.cl/${rubro.slug}`;

  return {
    // `absolute` evita la plantilla "%s | LOGICAV" del sitio de climatización.
    title: { absolute: title },
    description: rubro.meta.description,
    // Reemplaza las palabras clave de climatización que hereda del layout.
    keywords: [rubro.nombre.toLowerCase()],
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "es_CL",
      url,
      siteName: marca,
      title,
      description: rubro.meta.description,
    },
    // A prueba: la página se puede abrir con el enlace, pero no se indexa.
    ...(rubro.enPrueba && { robots: { index: false, follow: false } }),
  };
}

const h2Class =
  "mt-4 font-display text-3xl font-bold uppercase leading-none text-navy-800 md:text-4xl";

const h3Class =
  "font-display text-xl font-bold uppercase leading-none tracking-wide text-navy-800";

export default async function RubroPage({ params }: Props) {
  const rubro = getRubro((await params).rubro);
  if (!rubro) notFound();

  const {
    marca,
    hero,
    publico,
    incluye,
    protocolo,
    diagrama,
    frecuencia,
    insumos,
    registro,
    normativa,
    faq,
    formulario,
  } = rubro;
  const Diagrama = diagrama ? diagramas[diagrama.id] : null;
  const ondas = rubro.tema.motivo === "ondas";

  const whatsappHref = `${contact.whatsapp}?text=${encodeURIComponent(formulario.whatsappTexto)}`;

  // El menú se arma con las secciones que el rubro realmente trae.
  const nav = [
    incluye && { href: "#servicio", label: "Servicio" },
    protocolo && { href: "#protocolo", label: "Protocolo" },
    registro && { href: "#registro", label: "Registro" },
    normativa && { href: "#normativa", label: "Normativa" },
    faq && { href: "#preguntas", label: "Preguntas" },
    { href: "#cotizar", label: "Contacto" },
  ].filter((item): item is { href: string; label: string } => Boolean(item));

  return (
    <RubroTema tema={rubro.tema} candidatos={rubro.temasCandidatos}>
      <RubroHeader
        subtitulo={marca.subtitulo}
        franja={marca.franja}
        nav={nav}
        whatsappHref={whatsappHref}
      />

      <main id="inicio" className="min-h-screen bg-shell">
        <section className="relative overflow-hidden bg-navy-800">
          {hero.fondo && (
            <Image
              src={hero.fondo.src}
              alt={hero.fondo.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-20"
            />
          )}
          <div
            className={`relative mx-auto grid max-w-7xl gap-12 px-6 pt-16 md:pt-20 lg:items-center ${
              hero.ficha ? "lg:grid-cols-[1.25fr_1fr]" : ""
            } ${ondas ? "pb-28 md:pb-36" : "pb-16 md:pb-20"}`}
          >
            <div className="max-w-3xl">
              <p className="eyebrow">{hero.eyebrow}</p>
              <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-none text-white md:text-6xl">
                {hero.titulo.map((linea) => (
                  <span key={linea} className="block">
                    {linea}
                  </span>
                ))}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-steel-400">{hero.texto}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#cotizar"
                  className="rounded-(--radio) bg-flame-500 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-flame-600"
                >
                  {hero.cta}
                </a>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-(--radio) border border-navy-500 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-navy-700"
                >
                  Consultar por WhatsApp
                </a>
              </div>
            </div>

            {hero.ficha && (
              <figure className="w-full max-w-md justify-self-center rounded-(--radio) bg-white p-6 shadow-[0_24px_50px_-20px_rgba(0,0,0,0.55)] lg:justify-self-end">
                <div className="flex items-start justify-between gap-4 border-b border-line pb-4">
                  <div>
                    <p className="font-display text-xl font-bold uppercase leading-none tracking-wide text-navy-800">
                      {hero.ficha.titulo}
                    </p>
                    <p className="mt-1.5 text-xs text-steel-500">{hero.ficha.subtitulo}</p>
                  </div>
                  <span className="rounded-(--radio) bg-flame-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-flame-600">
                    Ejemplo
                  </span>
                </div>
                <dl>
                  {hero.ficha.filas.map((f) => (
                    <div key={f.label} className="border-b border-line py-3">
                      <div className="flex items-baseline justify-between gap-4">
                        <dt className="text-[11px] font-semibold uppercase tracking-[0.12em] text-steel-500">
                          {f.label}
                        </dt>
                        <dd
                          className={
                            f.medidor
                              ? "font-display text-2xl font-bold leading-none tabular-nums text-navy-800"
                              : "text-right text-sm font-medium text-navy-800"
                          }
                        >
                          {f.valor}
                        </dd>
                      </div>
                      {f.medidor && (
                        <div className="mt-2.5 flex items-center gap-3">
                          {/* Barra: el tramo de color es el rango aceptado;
                              el punto, la medición. */}
                          <div className="relative h-1.5 flex-1 rounded-full bg-line">
                            <span
                              className="absolute inset-y-0 rounded-full bg-flame-500/40"
                              style={{
                                left: `${f.medidor.desde * 100}%`,
                                right: `${(1 - f.medidor.hasta) * 100}%`,
                              }}
                            />
                            <span
                              className="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-flame-500"
                              style={{ left: `${f.medidor.posicion * 100}%` }}
                            />
                          </div>
                          <span className="shrink-0 text-[11px] tabular-nums text-steel-500">
                            {f.medidor.rango}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </dl>
                <figcaption className="pt-4 text-[11px] leading-relaxed text-steel-500">
                  {hero.ficha.nota}
                </figcaption>
              </figure>
            )}
          </div>

          {/* Ondas: la portada termina en agua y no en una línea recta. La
              última ola es del color de la sección que sigue. */}
          {ondas && (
            <svg
              viewBox="0 0 1600 80"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 block h-14 w-full md:h-20"
            >
              <path
                className="fill-navy-700"
                d="M0 30 Q100 0 200 30 T400 30 T600 30 T800 30 T1000 30 T1200 30 T1400 30 T1600 30 V80 H0Z"
              />
              <path
                className="fill-navy-500"
                d="M0 46 Q100 20 200 46 T400 46 T600 46 T800 46 T1000 46 T1200 46 T1400 46 T1600 46 V80 H0Z"
              />
              <path
                className="fill-white"
                d="M0 62 Q100 40 200 62 T400 62 T600 62 T800 62 T1000 62 T1200 62 T1400 62 T1600 62 V80 H0Z"
              />
            </svg>
          )}
        </section>

        {publico && (
          <section className="border-b border-line bg-white">
            <div className="mx-auto max-w-7xl px-6 py-14">
              <p className="eyebrow">{publico.titulo}</p>
              {publico.foto && (
                <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-(--radio) md:aspect-[3/1]">
                  <FotoComparable
                    foto={publico.foto}
                    candidatas={publico.fotosCandidatas}
                    sizes="(min-width: 1280px) 1232px, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="mt-8 grid gap-px bg-line md:grid-cols-3">
                {publico.items.map((item) => (
                  <div key={item.nombre} className="bg-white py-2 md:px-7 md:first:pl-0 md:last:pr-0">
                    <h2 className={h3Class}>{item.nombre}</h2>
                    <p className="mt-3 text-sm leading-7 text-steel-600">{item.texto}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {incluye && (
          <section id="servicio" className="border-b border-line py-16">
            <div className="mx-auto max-w-7xl px-6">
              <p className="eyebrow">Alcance</p>
              <h2 className={h2Class}>{incluye.titulo}</h2>
              <div className="mt-10 grid gap-px overflow-hidden rounded-(--radio) border border-line bg-line md:grid-cols-2 xl:grid-cols-4">
                {incluye.items.map((item) => (
                  <div key={item.titulo} className="bg-white p-7">
                    <span className="rule" />
                    <h3 className={`mt-5 ${h3Class}`}>{item.titulo}</h3>
                    <p className="mt-3 text-sm leading-7 text-steel-600">{item.texto}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {protocolo && (
          <section id="protocolo" className="border-b border-line bg-white py-16">
            <div className="mx-auto max-w-7xl px-6">
              <div className="max-w-2xl">
                <p className="eyebrow">Método</p>
                <h2 className={h2Class}>{protocolo.titulo}</h2>
                <p className="mt-5 text-sm leading-7 text-steel-600">{protocolo.intro}</p>
              </div>
              <ol className="mt-10 grid gap-px overflow-hidden rounded-(--radio) border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
                {protocolo.pasos.map((paso, i) => (
                  <li key={paso.nombre} className="flex flex-col bg-white p-7">
                    {paso.foto && (
                      <div className="relative -mx-7 -mt-7 mb-6 aspect-[4/3]">
                        <Image
                          src={paso.foto.src}
                          alt={paso.foto.alt}
                          fill
                          sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex items-baseline gap-4">
                      <span className="font-display text-4xl font-bold leading-none tabular-nums text-flame-500">
                        {i + 1}
                      </span>
                      <h3 className={h3Class}>{paso.nombre}</h3>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-steel-600">{paso.texto}</p>
                    {paso.registro && (
                      <p className="mt-auto pt-5">
                        <span className="block border-t border-line pt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-steel-500">
                          Registro
                        </span>
                        <span className="mt-1.5 block text-sm font-medium text-navy-800">
                          {paso.registro}
                        </span>
                      </p>
                    )}
                  </li>
                ))}
              </ol>

              {diagrama && Diagrama && (
                <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:items-center">
                  <div>
                    <p className="eyebrow">Dónde se actúa</p>
                    <h2 className={h2Class}>{diagrama.titulo}</h2>
                    <p className="mt-5 text-sm leading-7 text-steel-600">{diagrama.intro}</p>
                    <ul className="mt-7 border-t border-line">
                      {diagrama.refs.map((ref) => (
                        <li
                          key={ref.paso}
                          className="flex items-baseline gap-4 border-b border-line py-3 text-sm leading-6 text-steel-600"
                        >
                          <span className="font-display text-lg font-bold tabular-nums text-flame-500">
                            {ref.paso}
                          </span>
                          {ref.texto}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* En pantallas angostas el diagrama se desplaza: achicarlo
                      dejaría los rótulos ilegibles. */}
                  <div className="overflow-x-auto rounded-(--radio) border border-line bg-shell p-5">
                    <Diagrama />
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {frecuencia && (
          <section className="border-b border-line py-16">
            <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_1.6fr]">
              <div>
                <p className="eyebrow">Calendario</p>
                <h2 className={h2Class}>{frecuencia.titulo}</h2>
                <p className="mt-5 text-sm leading-7 text-steel-600">{frecuencia.intro}</p>
                {frecuencia.foto && (
                  <div className="relative mt-7 aspect-[4/3] overflow-hidden rounded-(--radio)">
                    <FotoComparable
                      foto={frecuencia.foto}
                      candidatas={frecuencia.fotosCandidatas}
                      sizes="(min-width: 1024px) 38vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
              <div>
                <div className="grid gap-px overflow-hidden rounded-(--radio) border border-line bg-line sm:grid-cols-2">
                  {frecuencia.temporadas.map((t) => (
                    <div key={t.nombre} className="bg-white p-7">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-steel-500">
                        {t.nombre}
                      </p>
                      <p className="mt-3 font-display text-3xl font-bold uppercase leading-none text-navy-800">
                        {t.visitas}
                      </p>
                      <p className="mt-3 text-sm leading-7 text-steel-600">{t.texto}</p>
                    </div>
                  ))}
                </div>
                {frecuencia.nota && (
                  <p className="mt-4 text-xs leading-6 text-steel-500">{frecuencia.nota}</p>
                )}
              </div>
            </div>
          </section>
        )}

        {(insumos || registro) && (
          <section id="registro" className="border-b border-line bg-white py-16">
            <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2">
              {registro && (
                <div>
                  <p className="eyebrow">Trazabilidad</p>
                  <h2 className={h2Class}>{registro.titulo}</h2>
                  <p className="mt-5 text-sm leading-7 text-steel-600">{registro.intro}</p>
                  <dl className="mt-8 overflow-hidden rounded-(--radio) border border-line bg-white">
                    {registro.campos.map((c) => (
                      <div
                        key={c.nombre}
                        className="flex items-baseline justify-between gap-4 border-b border-line px-4 py-3 last:border-b-0"
                      >
                        <dt className="text-sm font-medium text-navy-800">{c.nombre}</dt>
                        <dd className="text-right text-sm text-steel-600">{c.detalle}</dd>
                      </div>
                    ))}
                  </dl>
                  {registro.fotos && (
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      {registro.fotos.map((foto) => (
                        <figure key={foto.src}>
                          <div className="relative aspect-[4/3] overflow-hidden rounded-(--radio) border border-line">
                            <Image
                              src={foto.src}
                              alt={foto.alt}
                              fill
                              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                              className="object-cover"
                            />
                          </div>
                          {foto.pie && (
                            <figcaption className="mt-2 text-xs leading-5 text-steel-500">
                              {foto.pie}
                            </figcaption>
                          )}
                        </figure>
                      ))}
                    </div>
                  )}
                  {registro.flujo && (
                    <ol className="mt-6 flex flex-wrap gap-x-3 gap-y-2 text-xs font-semibold uppercase tracking-[0.08em] text-navy-800">
                      {registro.flujo.map((etapa, i) => (
                        <li key={etapa} className="flex items-center gap-3">
                          {i > 0 && (
                            <span aria-hidden="true" className="text-flame-500">
                              →
                            </span>
                          )}
                          {etapa}
                        </li>
                      ))}
                    </ol>
                  )}
                  {registro.nota && (
                    <p className="mt-4 text-xs leading-6 text-steel-500">{registro.nota}</p>
                  )}
                </div>
              )}

              {insumos && (
                <div>
                  <p className="eyebrow">Insumos</p>
                  <h2 className={h2Class}>{insumos.titulo}</h2>
                  {insumos.intro && (
                    <p className="mt-5 text-sm leading-7 text-steel-600">{insumos.intro}</p>
                  )}
                  {/* El redondeo va en el envoltorio: una tabla no recorta
                      sus esquinas. */}
                  <div className="mt-8 overflow-hidden rounded-(--radio) border border-line">
                  <table className="w-full bg-white text-left text-sm">
                    <thead>
                      <tr className="bg-navy-800 text-[11px] uppercase tracking-[0.12em] text-white">
                        {insumos.columnas.map((c) => (
                          <th key={c} scope="col" className="px-4 py-3 font-semibold">
                            {c}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {insumos.filas.map((f) => (
                        <tr key={f.nombre} className="border-t border-line align-top">
                          <th scope="row" className="px-4 py-3 font-medium text-navy-800">
                            {f.nombre}
                          </th>
                          <td className="px-4 py-3 leading-6 text-steel-600">{f.uso}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                  {insumos.nota && (
                    <p className="mt-4 text-xs leading-6 text-steel-500">{insumos.nota}</p>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {normativa && (
          <section id="normativa" className="border-b border-navy-600 bg-navy-800 py-16">
            <div className="mx-auto max-w-7xl px-6">
              <div className="max-w-3xl">
                <p className="eyebrow">Normativa</p>
                <h2 className="mt-4 font-display text-3xl font-bold uppercase leading-none text-white md:text-4xl">
                  {normativa.titulo}
                </h2>
                <p className="mt-5 text-sm leading-7 text-steel-400">{normativa.intro}</p>
              </div>
              <dl className="mt-10 grid gap-px bg-navy-600 sm:grid-cols-2 xl:grid-cols-4">
                {normativa.puntos.map((p) => (
                  <div key={p.dato} className="flex flex-col-reverse justify-end bg-navy-800 py-6 sm:px-6 xl:first:pl-0">
                    <dt className="mt-3 text-sm leading-6 text-steel-400">{p.texto}</dt>
                    <dd className="font-display text-3xl font-bold uppercase leading-none text-white">
                      {p.dato}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-8 max-w-3xl border-l-2 border-flame-500 pl-5 text-sm leading-7 text-white">
                {normativa.aclaracion}
              </p>
            </div>
          </section>
        )}

        {faq && (
          <section id="preguntas" className="border-b border-line bg-white py-16">
            <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_1.6fr]">
              <div>
                <p className="eyebrow">Antes de cotizar</p>
                <h2 className={h2Class}>Preguntas frecuentes</h2>
              </div>
              <div className="border-t border-line">
                {faq.map((f) => (
                  <details key={f.pregunta} className="group border-b border-line">
                    <summary className="flex cursor-pointer list-none items-baseline justify-between gap-6 py-4 text-base font-medium text-navy-800 [&::-webkit-details-marker]:hidden">
                      {f.pregunta}
                      <span
                        aria-hidden="true"
                        className="font-display text-2xl leading-none text-flame-500 transition-transform group-open:rotate-45"
                      >
                        +
                      </span>
                    </summary>
                    <p className="max-w-2xl pb-5 text-sm leading-7 text-steel-600">{f.respuesta}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        )}

        <section id="cotizar" className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-px overflow-hidden rounded-(--radio) border border-line bg-line lg:grid-cols-[1fr_1.2fr]">
            <div className="bg-navy-800 p-7 md:p-9">
              <p className="eyebrow">Cotizar</p>
              <h2 className="mt-4 font-display text-3xl font-bold uppercase leading-none text-white md:text-4xl">
                {formulario.titulo}
              </h2>
              <p className="mt-5 text-sm leading-7 text-steel-400">{formulario.texto}</p>
              <dl className="mt-8 border-t border-navy-600">
                {formulario.pasos.map((p) => (
                  <div key={p.label} className="border-b border-navy-600 py-3.5">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.14em] text-flame-500">
                      {p.label}
                    </dt>
                    <dd className="mt-1.5 text-sm leading-6 text-steel-400">{p.texto}</dd>
                  </div>
                ))}
              </dl>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-block rounded-(--radio) border border-navy-500 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-navy-700"
              >
                O escríbenos por WhatsApp
              </a>
            </div>
            <div className="bg-white p-7 md:p-9">
              <RubroForm slug={rubro.slug} formulario={formulario} />
            </div>
          </div>
        </section>
      </main>

      <RubroFooter
        subtitulo={marca.subtitulo}
        descripcion={marca.descripcion}
        nav={nav}
        whatsappHref={whatsappHref}
      />
    </RubroTema>
  );
}
