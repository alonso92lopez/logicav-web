import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QuoteForm } from "@/components/QuoteForm";
import {
  backing,
  brands,
  contact,
  methodology,
  plans,
  projects,
  sectors,
  services,
  stats,
} from "@/lib/content";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HVACBusiness",
  name: "LOGICAV",
  description:
    "Mantención preventiva y correctiva, instalación y proyectos de climatización para empresas, edificios e instituciones.",
  url: "https://logicav.cl",
  email: contact.email,
  telephone: contact.phoneE164,
  areaServed: { "@type": "AdministrativeArea", name: "Región Metropolitana, Chile" },
  address: { "@type": "PostalAddress", addressRegion: "Región Metropolitana", addressCountry: "CL" },
  openingHours: "Mo-Fr 08:30-18:00",
  priceRange: "$$",
};

export default function Home() {
  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <main>
        {/* ——— Hero + Servicios ——— */}
        <div className="relative mx-auto max-w-6xl px-5 md:px-8">
          <div>
            <div>
              <section className="flex min-h-[calc(100vh-5rem)] flex-col justify-center py-14">
                <p className="kicker">
                  Climatización · Mantención · Proyectos — {contact.coverage}
                </p>
                <h1
                  className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-tight md:text-[3.4rem]"
                >
                  Mantención y climatización para instalaciones que no pueden
                  detenerse.
                </h1>
                <p className="mt-6 max-w-xl text-lg leading-8 text-ink-soft">
                  Instalación, mantención preventiva y correctiva de aire
                  acondicionado para empresas, edificios e instituciones.
                  Ejecución ordenada, informe técnico y trazabilidad por equipo.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="#cotizar"
                    className="rounded-md bg-accent px-6 py-3.5 font-semibold text-white transition-colors hover:bg-accent-dark"
                  >
                    Solicitar cotización
                  </Link>
                  <Link
                    href="#cotizar"
                    className="rounded-md border border-line px-6 py-3.5 font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
                  >
                    Agendar visita técnica
                  </Link>
                </div>

                <ul className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-line pt-6">
                  {stats.map((s) => (
                    <li key={s.label}>
                      <p className="font-mono text-2xl font-medium text-ink">
                        {s.prefix}
                        <span>{s.value}</span>
                        {s.suffix ?? ""}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-ink-faint">{s.label}</p>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Servicios */}
              <section id="servicios" className="pb-10">
                <p className="kicker">
                  Servicios
                </p>
                <h2
                  className="mt-3 max-w-lg font-display text-3xl font-bold tracking-tight md:text-4xl"
                >
                  Un solo proveedor para operar, mantener y proyectar.
                </h2>

                <div className="mt-4">
                  {services.map((s) => (
                    <article
                      key={s.id}
                      data-svc={s.id}
                      className="flex min-h-[44vh] flex-col justify-center border-b border-line py-12 last:border-b-0"
                    >
                      <p className="font-mono text-sm text-accent">{s.kicker}</p>
                      <h3 className="mt-2 font-display text-2xl font-bold tracking-tight">
                        {s.title}
                      </h3>
                      <p className="mt-4 max-w-xl leading-7 text-ink-soft">{s.text}</p>
                      <ul className="mt-5 space-y-2">
                        {s.includes.map((item) => (
                          <li key={item} className="flex items-start gap-2.5 text-sm text-ink-soft">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-5 text-sm text-ink-faint">
                        <span className="font-medium text-ink">Aplica a:</span> {s.appliesTo}
                      </p>
                      <Link
                        href={s.cta.href}
                        className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-semibold text-accent hover:text-accent-dark"
                      >
                        {s.cta.label}
                        <span aria-hidden="true">→</span>
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* ——— Marcas ——— */}
        <section className="border-y border-line bg-mist">
          <div className="mx-auto max-w-6xl px-5 py-12 md:px-8">
            <p className="text-center font-mono text-xs uppercase tracking-[0.22em] text-ink-faint">
              Instalamos y mantenemos equipos de estas marcas
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
              {brands.map((b) => (
                <div key={b.alt}>
                  <Image
                    src={b.src}
                    alt={b.alt}
                    width={140}
                    height={56}
                    className="h-10 w-auto object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 md:h-12"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ——— Planes ——— */}
        <section id="planes" className="mx-auto max-w-6xl px-5 py-24 md:px-8">
          <div className="max-w-2xl">
            <p className="kicker">
              Planes de mantención
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
              Un contrato claro, sin letra chica técnica.
            </h2>
            <p className="mt-4 leading-7 text-ink-soft">
              {plans.note}
            </p>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {plans.items.map((p) => (
              <div
                key={p.id}
                className={`flex flex-col rounded-lg border p-7 ${
                  p.featured ? "border-accent shadow-[0_8px_40px_-12px_rgba(10,102,232,0.25)]" : "border-line"
                }`}
              >
                {p.featured && (
                  <p className="mb-4 w-fit rounded-full bg-accent-soft px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                    Más contratado
                  </p>
                )}
                <h3 className="font-display text-2xl font-bold">{p.name}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{p.tagline}</p>
                <p className="mt-6 font-mono text-2xl font-medium text-ink">{p.price}</p>
                <p className="text-xs text-ink-faint">{p.priceUnit}</p>
                <ul className="mt-6 flex-1 space-y-3 border-t border-line pt-6">
                  {p.features.map((f) => (
                    <li key={f.label} className="flex items-baseline justify-between gap-4 text-sm">
                      <span className="text-ink-soft">{f.label}</span>
                      <span className="text-right font-medium text-ink">{f.value}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/?plan=${p.id}#cotizar`}
                  className={`mt-8 rounded-md px-5 py-3 text-center text-sm font-semibold transition-colors ${
                    p.featured
                      ? "bg-accent text-white hover:bg-accent-dark"
                      : "border border-line text-ink hover:border-accent hover:text-accent"
                  }`}
                >
                  Cotizar este plan
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ——— Metodología ——— */}
        <section id="metodologia" className="border-y border-line bg-mist">
          <div className="mx-auto max-w-6xl px-5 py-24 md:px-8">
            <div className="max-w-2xl">
              <p className="kicker">
                Metodología
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
                Cada mantención deja evidencia.
              </h2>
              <p className="mt-4 leading-7 text-ink-soft">
                No trabajamos “a ojo”. Cada equipo tiene su pauta, cada visita su
                checklist, y cada cierre su informe. Esa trazabilidad es la
                diferencia entre un contrato de mantención y una promesa.
              </p>
            </div>

            <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_360px]">
              <ol className="space-y-0">
                {methodology.map((m, i) => (
                  <li
                    key={m.num}
                    className={`grid grid-cols-[64px_1fr] gap-5 py-7 ${
                      i < methodology.length - 1 ? "border-b border-line" : ""
                    }`}
                  >
                    <span className="step-num text-3xl font-medium text-accent md:text-4xl">
                      {m.num}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-bold">{m.title}</h3>
                      <p className="mt-2 max-w-xl leading-7 text-ink-soft">{m.text}</p>
                    </div>
                  </li>
                ))}
              </ol>

              {/* Mock del informe técnico */}
              <aside className="lg:pt-2">
                <div className="sticky top-28 rounded-lg border border-line bg-paper p-6 shadow-[0_10px_40px_-16px_rgba(29,43,56,0.18)]">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
                    Informe técnico · Ejemplo
                  </p>
                  <p className="mt-3 font-display text-lg font-bold">
                    Mantención preventiva — Visita 2/4
                  </p>
                  <dl className="mt-5 space-y-3 border-t border-line pt-5 font-mono text-[13px]">
                    <div className="flex justify-between">
                      <dt className="text-ink-faint">Equipo</dt>
                      <dd>Split muro 18.000 BTU</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-ink-faint">Presión succión</dt>
                      <dd>68 psi ✓</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-ink-faint">Consumo compresor</dt>
                      <dd>4,1 A ✓</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-ink-faint">Filtros</dt>
                      <dd>Lavados ✓</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-ink-faint">Drenaje</dt>
                      <dd>Despejado ✓</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-ink-faint">Registro fotográfico</dt>
                      <dd>6 fotos</dd>
                    </div>
                  </dl>
                  <p className="mt-5 border-t border-line pt-4 text-xs leading-5 text-ink-soft">
                    Observación: se recomienda recambio de aislación en línea de
                    succión en la próxima visita.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* ——— Sectores y proyectos ——— */}
        <section id="proyectos" className="mx-auto max-w-6xl px-5 py-24 md:px-8">
          <div className="max-w-2xl">
            <p className="kicker">
              Sectores y trabajos
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
              Donde una falla de clima es un problema operativo.
            </h2>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2.5">
            {sectors.map((s) => (
              <li
                key={s}
                className="rounded-full border border-line px-4 py-2 text-sm text-ink-soft"
              >
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {projects.map((p) => (
              <article
                key={p.title}
                className="overflow-hidden rounded-lg border border-line"
              >
                <div className="relative h-52 w-full">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
                    {p.category}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-bold leading-snug">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-ink-soft">{p.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ——— Respaldo ——— */}
        <section id="respaldo" className="border-y border-line bg-mist">
          <div className="mx-auto max-w-6xl px-5 py-24 md:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_1fr]">
              <div>
                <p className="kicker">
                  Respaldo técnico
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
                  Quiénes ejecutan el trabajo.
                </h2>
                <p className="mt-5 max-w-xl leading-8 text-ink-soft">
                  {backing.intro}
                </p>
                <p className="mt-6 font-mono text-sm text-ink-faint">
                  Operando desde {backing.since} · {contact.coverage}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {backing.items.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-lg border border-line bg-paper p-6"
                  >
                    <h3 className="font-display text-base font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ——— Cotización ——— */}
        <section id="cotizar" className="mx-auto max-w-6xl px-5 py-24 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="kicker">
                Cotización
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
                Cuéntanos qué necesita tu instalación.
              </h2>
              <p className="mt-5 max-w-md leading-7 text-ink-soft">
                Con estos datos preparamos una cotización o coordinamos una
                visita técnica para hacer el catastro de tus equipos.
              </p>

              <dl className="mt-10 space-y-5 text-sm">
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
                    WhatsApp
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={contact.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-ink hover:text-accent"
                    >
                      {contact.phoneDisplay}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
                    Correo
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-semibold text-ink hover:text-accent"
                    >
                      {contact.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
                    Horario
                  </dt>
                  <dd className="mt-1 text-ink-soft">
                    {contact.hours}. {contact.hoursNote}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
                    Cobertura
                  </dt>
                  <dd className="mt-1 text-ink-soft">{contact.coverageDetail}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-lg border border-line p-6 md:p-8">
              <QuoteForm />
            </div>
          </div>
        </section>
      </main>

      {/* WhatsApp flotante, discreto */}
      <a
        href={contact.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Escribir por WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-paper shadow-lg transition-colors hover:border-accent"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-ink" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.6 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.3-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3c-.3-.4 0-.5.1-.7l.4-.5c.1-.2.1-.3.2-.5v-.5c-.1-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.7 4.3 3.8.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.4-.2z" />
        </svg>
      </a>

      <Footer />
    </>
  );
}
