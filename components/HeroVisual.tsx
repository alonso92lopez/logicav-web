"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { LogoMark } from "./Logo";

/*
  Carga progresiva de la pieza 3D: el canvas se monta recién cuando el
  navegador está libre (idle), así el texto y el CTA del hero pintan primero.
  Mientras tanto (y si no hay JS o WebGL) se muestra el fallback estático.
*/

function StaticFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />
      <div className="relative flex flex-col items-center gap-4 text-ink-faint">
        <LogoMark className="h-14 w-14 text-line" />
        <p className="font-mono text-[11px] uppercase tracking-[0.22em]">
          Instalación de climatización
        </p>
      </div>
    </div>
  );
}

const Scene3D = dynamic(() => import("./Scene3D"), {
  ssr: false,
  loading: () => <StaticFallback />,
});

export function HeroVisual() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const w = window as Window &
      typeof globalThis & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        cancelIdleCallback?: (id: number) => void;
      };
    const usesIdle = typeof w.requestIdleCallback === "function";
    const idle = usesIdle
      ? w.requestIdleCallback!(() => setReady(true), { timeout: 1500 })
      : w.setTimeout(() => setReady(true), 300);
    return () => {
      if (usesIdle) w.cancelIdleCallback?.(idle);
      else w.clearTimeout(idle);
    };
  }, []);

  return (
    <div className="h-full w-full">{ready ? <Scene3D /> : <StaticFallback />}</div>
  );
}
