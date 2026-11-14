"use client";

import { useState } from "react";
import { temaVars, type Tema } from "@/lib/rubros/tema";

/*
  Contenedor del sitio de un rubro: aplica su tema a todo lo que tiene
  adentro (ver `lib/rubros/tema.ts`).

  Si el rubro trae variantes candidatas, en desarrollo aparece un selector
  flotante para compararlas sobre la página real. En producción no existe:
  siempre se usa `tema`.
*/
export function RubroTema({
  tema,
  candidatos,
  children,
}: {
  tema: Tema;
  candidatos?: Tema[];
  children: React.ReactNode;
}) {
  const [actual, setActual] = useState(tema);
  const comparar =
    process.env.NODE_ENV !== "production" && candidatos && candidatos.length > 1;

  return (
    <div style={temaVars(actual)} data-motivo={actual.motivo} className="text-navy-800">
      {children}

      {comparar && (
        <div className="fixed bottom-4 left-4 z-[60] flex items-center gap-1 rounded-full border border-black/10 bg-white p-1 text-xs shadow-lg">
          <span className="px-2 font-semibold text-neutral-500">Tema</span>
          {candidatos.map((t) => (
            <button
              key={t.nombre}
              type="button"
              onClick={() => setActual(t)}
              aria-pressed={t.nombre === actual.nombre}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-semibold transition ${
                t.nombre === actual.nombre
                  ? "bg-neutral-900 text-white"
                  : "text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              <span
                aria-hidden="true"
                className="h-3 w-3 rounded-full"
                style={{ background: `linear-gradient(135deg, ${t.oscuro[1]} 50%, ${t.acento.base} 50%)` }}
              />
              {t.nombre}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
