"use client";

import { startTransition, useActionState, useState } from "react";
import { submitPostulacion, type PostulacionState } from "@/lib/postulacion";
import { trabaja } from "@/lib/content";
import { EMAIL_PATTERN } from "@/lib/email";

const initialState: PostulacionState = { status: "idle" };

const inputClass =
  "w-full border border-line bg-white px-3 py-3 text-base text-navy-800 placeholder-steel-500/70 transition focus:border-flame-500 focus:outline-none";

const labelClass = "mb-2 block text-sm font-semibold text-navy-800";

/* Opción tipo botón (sí/no, casillas): área grande para el dedo en celular. */
const opcionClass =
  "flex min-h-12 cursor-pointer items-center gap-3 border border-line bg-white px-4 py-3 text-base text-navy-800 transition has-[:checked]:border-flame-500 has-[:checked]:bg-flame-50";

function SiNo({ name, legend }: { name: string; legend: string }) {
  return (
    <fieldset>
      <legend className={labelClass}>{legend}</legend>
      <div className="grid grid-cols-2 gap-2">
        {["sí", "no"].map((v) => (
          <label key={v} className={opcionClass}>
            <input type="radio" name={name} value={v} required className="h-5 w-5 accent-flame-500" />
            {v === "sí" ? "Sí" : "No"}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/*
  Formulario de /trabaja. Las preguntas las decide Alonso: no agregar sin él
  (sumó el correo y el texto libre, ambos opcionales, el 16-11-2026).
  Envía a `submitPostulacion`, que se la pasa al servicio que guarda.

  Se envía con onSubmit + startTransition en vez de `action={...}`: así React
  no vacía el formulario cuando el servidor devuelve un error, y la persona no
  tiene que llenar todo de nuevo.
*/
export function TrabajaForm({ origen, codigo }: { origen: string; codigo: string }) {
  const [state, formAction, pending] = useActionState(submitPostulacion, initialState);
  const [finde, setFinde] = useState<string[]>([]);
  const [aviso, setAviso] = useState("");
  const [texto, setTexto] = useState("");
  // Para el asunto del correo con documentos: así se ubica su ficha en el panel.
  const [quien, setQuien] = useState({ nombre: "", telefono: "" });

  const { documentos, comentario } = trabaja;

  if (state.status === "ok") {
    const asunto = ["Postulación", quien.nombre, quien.telefono].filter(Boolean).join(" – ");
    const mailto = `mailto:${documentos.correo}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(documentos.cuerpo)}`;
    return (
      <div className="border border-line bg-shell p-8">
        <p className="font-display text-2xl font-bold uppercase leading-none tracking-wide text-navy-800">
          Postulación enviada
        </p>
        <p className="mt-3 text-base leading-7 text-steel-600">{state.message}</p>
        <div className="mt-6 border-t border-line pt-6">
          <p className="text-base leading-7 text-navy-800">{documentos.despues}</p>
          <a
            href={mailto}
            className="mt-4 block bg-flame-500 py-4 text-center text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-flame-600"
          >
            {documentos.boton}
          </a>
          <p className="mt-3 text-sm text-steel-600">
            O escribe a{" "}
            <span className="select-all font-semibold text-navy-800">{documentos.correo}</span>
          </p>
        </div>
      </div>
    );
  }

  // "Ninguno" excluye a sábado y domingo, y al revés.
  const marcarFinde = (valor: string, marcado: boolean) => {
    if (!marcado) return setFinde(finde.filter((f) => f !== valor));
    setFinde(valor === "ninguno" ? ["ninguno"] : [...finde.filter((f) => f !== "ninguno"), valor]);
  };

  const enviar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    // Las casillas no tienen "required" de grupo en HTML: se revisa acá.
    if (fd.getAll("trabajos_hvac").length === 0) {
      return setAviso("Marca al menos un trabajo de climatización.");
    }
    if (fd.getAll("finde").length === 0) {
      return setAviso("Dinos si trabajas sábado o domingo (o ninguno).");
    }
    setAviso("");
    setQuien({
      nombre: String(fd.get("nombre") ?? "").trim(),
      telefono: String(fd.get("telefono") ?? "").replace(/\D/g, ""),
    });
    startTransition(() => formAction(fd));
  };

  const error = aviso || (state.status === "error" ? state.message : "");

  return (
    <form onSubmit={enviar}>
      {/* Honeypot: un humano nunca lo llena */}
      <input
        type="text"
        name="sitio_web"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <input type="hidden" name="origen" value={origen} />
      <input type="hidden" name="ref" value={codigo} />

      <div className="flex flex-col gap-6">
        <div>
          <label className={labelClass} htmlFor="t-nombre">
            Nombre
          </label>
          <input
            id="t-nombre"
            name="nombre"
            required
            maxLength={80}
            autoComplete="name"
            placeholder="Tu nombre"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="t-telefono">
            WhatsApp
          </label>
          <div className="flex">
            <span className="flex items-center border border-r-0 border-line bg-shell px-3 text-base text-steel-600">
              +56
            </span>
            <input
              id="t-telefono"
              name="telefono"
              type="tel"
              required
              inputMode="numeric"
              autoComplete="tel-national"
              pattern="\s*9(\s*[0-9]){8}\s*"
              title="9 dígitos, empezando con 9"
              placeholder="9 1234 5678"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="t-correo">
            Correo electrónico <span className="font-normal text-steel-500">(opcional)</span>
          </label>
          <input
            id="t-correo"
            name="correo"
            type="email"
            maxLength={120}
            pattern={EMAIL_PATTERN}
            autoComplete="email"
            placeholder="nombre@gmail.com"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="t-comuna">
            Comuna
          </label>
          <select id="t-comuna" name="comuna" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Elige tu comuna
            </option>
            {trabaja.comunas.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <SiNo name="mayor_18" legend="¿Eres mayor de 18?" />
        <SiNo name="cedula_chilena" legend="¿Tienes cédula de identidad chilena?" />

        <fieldset>
          <legend className={labelClass}>
            ¿Qué haces en climatización?{" "}
            <span className="font-normal text-steel-500">(puedes marcar varias)</span>
          </legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {trabaja.trabajos.map((t) => (
              <label key={t.valor} className={opcionClass}>
                <input
                  type="checkbox"
                  name="trabajos_hvac"
                  value={t.valor}
                  className="h-5 w-5 accent-flame-500"
                />
                {t.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label className={labelClass} htmlFor="t-tarifa">
            Tu valor por día <span className="font-normal text-steel-500">(en pesos chilenos)</span>
          </label>
          <div className="flex">
            <span className="flex items-center border border-r-0 border-line bg-shell px-3 text-base text-steel-600">
              $
            </span>
            <input
              id="t-tarifa"
              name="tarifa_dia"
              required
              inputMode="numeric"
              pattern="[0-9.]*"
              title="En pesos, solo números"
              placeholder="60000"
              className={inputClass}
            />
          </div>
        </div>

        <fieldset>
          <legend className={labelClass}>¿Trabajas sábado o domingo?</legend>
          <div className="grid grid-cols-3 gap-2">
            {[
              ["sabado", "Sábado"],
              ["domingo", "Domingo"],
              ["ninguno", "Ninguno"],
            ].map(([valor, label]) => (
              <label key={valor} className={opcionClass}>
                <input
                  type="checkbox"
                  name="finde"
                  value={valor}
                  checked={finde.includes(valor)}
                  onChange={(e) => marcarFinde(valor, e.target.checked)}
                  className="h-5 w-5 accent-flame-500"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label className={labelClass} htmlFor="t-comentario">
            {comentario.label} <span className="font-normal text-steel-500">(opcional)</span>
          </label>
          <textarea
            id="t-comentario"
            name="comentario"
            rows={4}
            maxLength={comentario.max}
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder={comentario.placeholder}
            className={`${inputClass} resize-y leading-6`}
          />
          <div className="mt-1.5 flex justify-between gap-4 text-xs leading-5 text-steel-500">
            <span>{comentario.aviso}</span>
            <span className="shrink-0 tabular-nums" aria-live="polite">
              {texto.length}/{comentario.max}
            </span>
          </div>
        </div>

        <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-steel-600">
          <input
            type="checkbox"
            name="consentimiento"
            value="sí"
            required
            className="mt-0.5 h-5 w-5 shrink-0 accent-flame-500"
          />
          Autorizo a Logicav a guardar mis datos para contactarme.
        </label>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-6 border-l-2 border-flame-600 bg-flame-50 px-4 py-3 text-sm leading-6 text-navy-800"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-6 w-full bg-flame-500 py-4 text-sm font-semibold uppercase tracking-[0.08em] text-white transition hover:bg-flame-600 disabled:opacity-60"
      >
        {pending ? "Enviando…" : "Enviar postulación"}
      </button>
      <p className="mt-3 text-sm leading-6 text-steel-600">{documentos.aviso}</p>
    </form>
  );
}
