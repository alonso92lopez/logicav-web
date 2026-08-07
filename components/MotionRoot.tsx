"use client";

import { useEffect } from "react";

/*
  Movimiento global: scroll suave (Lenis) + reveals y counters (GSAP/ScrollTrigger).
  - Respeta prefers-reduced-motion: si está activo, no se inicializa nada.
  - Sin JS los contenidos son visibles por defecto (los tweens usan gsap.from).
*/
export function MotionRoot() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      // anchors: Lenis maneja los links #ancla (el smooth CSS nativo choca con él)
      const lenis = new Lenis({ lerp: 0.12, anchors: { offset: -96 } });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 26,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%" },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal-group]").forEach((group) => {
          const items = group.querySelectorAll("[data-reveal-item]");
          if (!items.length) return;
          gsap.from(items, {
            y: 22,
            autoAlpha: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.09,
            scrollTrigger: { trigger: group, start: "top 84%" },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const target = Number(el.dataset.count ?? "0");
          const obj = { n: 0 };
          gsap.to(obj, {
            n: target,
            duration: 0.9,
            ease: "power2.out",
            snap: { n: 1 },
            onUpdate: () => {
              el.textContent = String(Math.round(obj.n));
            },
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });
      });

      cleanup = () => {
        ctx.revert();
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return null;
}
