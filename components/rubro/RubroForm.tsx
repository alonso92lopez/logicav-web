"use client";

import { useActionState } from "react";
import { submitQuote, type QuoteState } from "@/lib/actions";
import { EMAIL_PATTERN } from "@/lib/email";
import { contact } from "@/lib/content";
import type { Rubro } from "@/lib/rubros/tipos";

const initialState: QuoteState = { status: "idle" };

const inputClass =
  "w-full rounded-(--radio) border border-line bg-white px-3 py-2.5 text-sm text-navy-800 placeholder-steel-500/70 transition focus:border-flame-500 focus:outline-none";

const labelClass =
  "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-steel-500";

/*
  Formulario de una página de rubro. Es el mismo canal que `QuoteForm` (la
  server action `submitQuote`, correo por Resend), sin lo que solo aplica a
  climatización: lista de servicios, superficie y capacidad en BTU.

  Lo que cambia entre rubros son los campos propios, que vienen del
  contenido. El servicio no se pregunta: lo fija el servidor según `rubro`.
*/
export function RubroForm({
  slug,
  formulario,
}: {
  slug: string;
  formulario: Rubro["formulario"];
}) {
  const [state, formAction, pending] = useActionState(submitQuote, initialState);

  if (state.status === "ok") {
    return (
      <div className="border border-line bg-shell p-8">
        <p className="font-display text-2xl font-bold uppercase leading-none tracking-wide text-navy-800">
          Solicitud enviada
        </p>
        <p className="mt-3 text-sm leading-7 text-steel-600">{state.message}</p>
        <a
          href={contact.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block border border-line px-5 py-3 text-xs font-semibold uppercase tracking-[0.1em] text-navy-800 transition hover:border-flame-500 hover:text-flame-500"
        >
          ¿Es urgente? Escríbenos por WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form action={formAction}>
      <input type="hidden" name="rubro" value={slug} />

      {/* Honeypot anti-spam: un humano nunca lo llena */}
      <input
        type="text"
        name="empresa_web"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="flex flex-col gap-4">
        <div>
          <label className={labelClass} htmlFor="r-nombre">
            Nombre *
          </label>
          <input
            id="r-nombre"
            name="nombre"
            required
            autoComplete="name"
            placeholder="Tu nombre"
            className={inputClass}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="r-email">
              Correo *
            </label>
            <input
              id="r-email"
              name="email"
              type="email"
              required
              pattern={EMAIL_PATTERN}
              autoComplete="email"
              placeholder="nombre@empresa.cl"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor="r-telefono">
              Teléfono / WhatsApp
            </label>
            <input
              id="r-telefono"
              name="telefono"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="+56 9 …"
              className={inputClass}
            />
          </div>
        </div>

        {formulario.campos.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            {formulario.campos.map((c) => (
              <div key={c.name}>
                <label className={labelClass} htmlFor={`r-${c.name}`}>
                  {c.label}
                </label>
                {c.opciones ? (
                  <select
                    id={`r-${c.name}`}
                    name={`extra_${c.name}`}
                    defaultValue=""
                    className={inputClass}
                  >
                    <option value="">Selecciona</option>
                    {c.opciones.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={`r-${c.name}`}
                    name={`extra_${c.name}`}
                    type={c.type ?? "text"}
                    min={c.type === "number" ? 1 : undefined}
                    inputMode={c.type === "number" ? "numeric" : undefined}
                    placeholder={c.placeholder}
                    className={inputClass}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        <div>
          <label className={labelClass} htmlFor="r-mensaje">
            ¿Qué necesitas?
          </label>
          <textarea
            id="r-mensaje"
            name="mensaje"
            rows={4}
            placeholder={formulario.placeholderMensaje}
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>

      {state.status === "error" && (
        <p className="mt-4 border-l-2 border-flame-600 bg-flame-50 px-4 py-3 text-sm leading-6 text-navy-800">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-4 w-full rounded-(--radio) bg-flame-500 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-flame-600 disabled:opacity-60"
      >
        {pending ? "Enviando…" : formulario.cta}
      </button>

      <p className="mt-3 text-[11px] leading-relaxed text-steel-500">
        Respondemos dentro del horario hábil ({contact.hours.toLowerCase()}).
      </p>
    </form>
  );
}
