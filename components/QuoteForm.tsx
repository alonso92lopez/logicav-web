"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitQuote, type QuoteState } from "@/lib/actions";
import { formOptions, contact } from "@/lib/content";

const initialState: QuoteState = { status: "idle" };

const inputCls =
  "w-full rounded-md border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20";

const labelCls = "mb-1.5 block text-sm font-medium text-ink";

export function QuoteForm() {
  const [state, formAction, pending] = useActionState(submitQuote, initialState);
  const serviceRef = useRef<HTMLSelectElement>(null);

  // Preselección del plan cuando se llega desde "#planes" (?plan=...)
  useEffect(() => {
    const plan = new URLSearchParams(window.location.search).get("plan");
    if (plan && serviceRef.current) {
      serviceRef.current.value = "Contrato de mantención";
    }
  }, []);

  if (state.status === "ok") {
    return (
      <div className="rounded-lg border border-line bg-mist p-8 text-center">
        <p className="font-display text-xl font-bold text-ink">
          Solicitud enviada
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink-soft">
          {state.message}
        </p>
        <a
          href={contact.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block rounded-md border border-line bg-paper px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
        >
          ¿Es urgente? Escríbenos por WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-4">
      {/* Honeypot */}
      <input
        type="text"
        name="empresa_web"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="q-nombre" className={labelCls}>
            Nombre *
          </label>
          <input
            id="q-nombre"
            name="nombre"
            required
            autoComplete="name"
            className={inputCls}
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <label htmlFor="q-contacto" className={labelCls}>
            Teléfono o correo *
          </label>
          <input
            id="q-contacto"
            name="contacto"
            required
            className={inputCls}
            placeholder="+56 9 … o nombre@empresa.cl"
          />
        </div>
      </div>

      <div>
        <label htmlFor="q-servicio" className={labelCls}>
          Servicio <span className="font-normal text-ink-faint">(opcional)</span>
        </label>
        <select
          id="q-servicio"
          name="servicio"
          className={inputCls}
          defaultValue=""
          ref={serviceRef}
        >
          <option value="">Selecciona el servicio</option>
          {formOptions.serviceTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="q-msg" className={labelCls}>
          ¿Qué necesitas?
        </label>
        <textarea
          id="q-msg"
          name="mensaje"
          rows={4}
          className={inputCls}
          placeholder="Ej: tenemos 8 equipos split en oficinas en Providencia y necesitamos un contrato de mantención…"
        />
      </div>

      {state.status === "error" && (
        <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </p>
      )}

      <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-accent px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-dark disabled:opacity-60"
        >
          {pending ? "Enviando…" : "Enviar solicitud"}
        </button>
        <p className="text-xs leading-5 text-ink-faint">
          Respondemos dentro del horario hábil ({contact.hours.toLowerCase()}).
        </p>
      </div>

      <p className="text-sm text-ink-soft">
        ¿Prefieres escribirnos directo?{" "}
        <a
          href={contact.whatsapp}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-ink underline decoration-line underline-offset-4 transition-colors hover:text-accent"
        >
          Háblanos por WhatsApp
        </a>
      </p>
    </form>
  );
}
