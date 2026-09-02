"use client";

import { useActionState, useState } from "react";
import { submitQuote, type QuoteState } from "@/lib/actions";
import { sugerirCapacidad } from "@/lib/capacidad";
import { contact, formOptions } from "@/lib/content";

const initialState: QuoteState = { status: "idle" };

const inputClass =
  "w-full border border-line bg-white px-3 py-2.5 text-sm text-navy-800 placeholder-steel-500/70 transition focus:border-flame-500 focus:outline-none";

const labelClass =
  "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.12em] text-steel-500";

/*
  Un solo formulario para todo el sitio: el del hero y el de la sección de
  contacto son el mismo componente en dos variantes.

  - "card": columna angosta del hero, con marco y encabezado propios.
  - "plain": ancho, dentro del panel blanco de la sección de contacto.

  Envía a la server action `submitQuote` (correo por Resend). El diseño de
  origen abría wa.me desde el cliente; eso se descartó para no tener dos
  canales de leads.
*/
export function QuoteForm({ variant = "card" }: { variant?: "card" | "plain" }) {
  const [state, formAction, pending] = useActionState(submitQuote, initialState);
  const [metros, setMetros] = useState("");

  const capacidad = sugerirCapacidad(metros);
  const wide = variant === "plain";
  const pairClass = wide ? "grid gap-4 md:grid-cols-2" : "grid gap-4";

  const shell = wide
    ? ""
    : "border border-line bg-white p-6 shadow-[0_18px_40px_-18px_rgba(7,27,46,0.55)]";

  if (state.status === "ok") {
    return (
      <div className={wide ? "border border-line bg-shell p-8" : `${shell} text-center`}>
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
    <form action={formAction} className={shell}>
      {!wide && (
        <>
          <p className="font-display text-2xl font-bold uppercase leading-none tracking-wide text-navy-800">
            Cotiza en un minuto
          </p>
          <p className="mt-2 text-sm text-steel-600">
            Te respondemos dentro del horario hábil.
          </p>
        </>
      )}

      {/* Honeypot anti-spam: un humano nunca lo llena */}
      <input
        type="text"
        name="empresa_web"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className={`${wide ? "" : "mt-5"} flex flex-col gap-4`}>
        <div className={pairClass}>
          <div>
            <label className={labelClass} htmlFor={`q-nombre-${variant}`}>
              Nombre *
            </label>
            <input
              id={`q-nombre-${variant}`}
              name="nombre"
              required
              autoComplete="name"
              placeholder="Tu nombre"
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass} htmlFor={`q-contacto-${variant}`}>
              Teléfono o correo *
            </label>
            <input
              id={`q-contacto-${variant}`}
              name="contacto"
              required
              placeholder="+56 9 … o nombre@empresa.cl"
              className={inputClass}
            />
          </div>
        </div>

        <div className={pairClass}>
          <div>
            <label className={labelClass} htmlFor={`q-servicio-${variant}`}>
              Servicio
            </label>
            <select
              id={`q-servicio-${variant}`}
              name="servicio"
              defaultValue=""
              className={inputClass}
            >
              <option value="">Selecciona el servicio</option>
              {formOptions.serviceTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor={`q-superficie-${variant}`}>
              Superficie (m²)
            </label>
            <input
              id={`q-superficie-${variant}`}
              name="superficie"
              type="number"
              min="1"
              inputMode="numeric"
              placeholder="Ej: 24"
              value={metros}
              onChange={(e) => setMetros(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor={`q-mensaje-${variant}`}>
            ¿Qué necesitas?
          </label>
          <textarea
            id={`q-mensaje-${variant}`}
            name="mensaje"
            rows={wide ? 4 : 3}
            placeholder="Ej: 8 equipos split en oficinas en Providencia, para contrato de mantención."
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>

      {/* La sugerencia aparece al escribir los m²: es el gesto que dice
          "esto lo saben calcular". */}
      <div
        aria-live="polite"
        className="mt-4 flex items-baseline justify-between gap-3 border-l-2 border-flame-500 bg-shell px-4 py-3"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-steel-500">
          Capacidad orientativa
        </span>
        <span className="font-display text-xl font-bold tabular-nums text-navy-800">
          {capacidad ?? "—"}
        </span>
      </div>

      {state.status === "error" && (
        <p className="mt-4 border-l-2 border-flame-600 bg-flame-50 px-4 py-3 text-sm leading-6 text-navy-800">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-4 w-full bg-flame-500 py-3.5 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-flame-600 disabled:opacity-60"
      >
        {pending ? "Enviando…" : "Solicitar cotización"}
      </button>

      <p className="mt-3 text-[11px] leading-relaxed text-steel-500">
        La capacidad definitiva se confirma en visita técnica, con cálculo de carga térmica.
        Respondemos dentro del horario hábil ({contact.hours.toLowerCase()}).
      </p>
    </form>
  );
}
