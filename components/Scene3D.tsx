"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/*
  Pieza central: instalación de climatización isométrica (split muro, cassette,
  condensadora y líneas de refrigerante) modelada con primitivas. Materiales
  mate, luz neutra, sin glow.

  - Desktop sin reduced-motion: la vista se "explota" con el scroll del bloque
    #escena-scroll y cada servicio ([data-svc]) ilumina su subsistema.
  - Móvil o reduced-motion: un solo render estático (sin RAF, costo mínimo).
*/

const C = {
  casing: 0xf3f6f9,
  casingShade: 0xe4eaef,
  dark: 0x1d2b38,
  grille: 0x33465a,
  accent: 0x0a66e8,
  copper: 0xb98a6a,
  insulation: 0x44576a,
  slab: 0xf8fafc,
  edge: 0xd7dee6,
};

type FocusKey = "preventiva" | "correctiva" | "instalacion" | "proyectos" | "suministro";

const FOCUS_MAP: Record<FocusKey, string[]> = {
  preventiva: ["cassette", "split"],
  correctiva: ["condenser"],
  instalacion: ["split", "pipes"],
  proyectos: ["condenser", "split", "cassette", "pipes", "ceiling"],
  suministro: ["condenser", "split", "cassette"],
};

function mat(color: number, roughness = 0.85) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness: 0.05,
    transparent: true,
  });
}

function box(
  w: number,
  h: number,
  d: number,
  material: THREE.MeshStandardMaterial,
  x = 0,
  y = 0,
  z = 0
) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

export default function Scene3D() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return; // sin WebGL queda el fallback estático del wrapper
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    const interactive = desktop && !reduced;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";

    const scene = new THREE.Scene();

    // ——— Luces: clave direccional + relleno hemisférico, neutras
    scene.add(new THREE.HemisphereLight(0xffffff, 0xdfe6ee, 1.0));
    const key = new THREE.DirectionalLight(0xffffff, 1.7);
    key.position.set(3.5, 14, 5.5);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.camera.left = -7;
    key.shadow.camera.right = 7;
    key.shadow.camera.top = 7;
    key.shadow.camera.bottom = -7;
    key.shadow.bias = -0.0004;
    key.shadow.radius = 6;
    scene.add(key);

    // ——— Sala abstracta: piso + dos muros, con aristas marcadas
    const room = new THREE.Group();
    const slabMat = mat(C.slab, 0.95);
    const floor = box(8.4, 0.16, 8.4, slabMat, 0, -0.08, 0);
    const backWall = box(8.4, 5.2, 0.16, slabMat, 0, 2.52, -4.2);
    const sideWall = box(0.16, 5.2, 8.4, slabMat, -4.2, 2.52, 0);
    for (const slab of [floor, backWall, sideWall]) {
      slab.castShadow = false;
      room.add(slab);
      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(slab.geometry as THREE.BoxGeometry),
        new THREE.LineBasicMaterial({ color: C.edge })
      );
      edges.position.copy(slab.position);
      room.add(edges);
    }
    scene.add(room);

    // ——— Grupos de equipos (nombre → grupo, posición armada, offset de explosión)
    const groups: Record<string, { g: THREE.Group; base: THREE.Vector3; explode: THREE.Vector3 }> = {};

    const register = (name: string, g: THREE.Group, base: THREE.Vector3, explode: THREE.Vector3) => {
      g.position.copy(base);
      groups[name] = { g, base, explode };
      scene.add(g);
    };

    // Condensadora (unidad exterior)
    {
      const g = new THREE.Group();
      const bodyMat = mat(C.casing);
      g.add(box(1.9, 1.35, 0.75, bodyMat, 0, 0.77, 0));
      g.add(box(1.9, 0.1, 0.75, mat(C.casingShade), 0, 1.5, 0));
      // patas
      g.add(box(0.2, 0.12, 0.6, mat(C.dark), -0.7, 0.06, 0));
      g.add(box(0.2, 0.12, 0.6, mat(C.dark), 0.7, 0.06, 0));
      // ventilador frontal
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.44, 0.045, 12, 40),
        mat(C.grille, 0.7)
      );
      ring.position.set(-0.35, 0.82, 0.39);
      ring.castShadow = true;
      g.add(ring);
      const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.06, 16), mat(C.dark));
      hub.rotation.x = Math.PI / 2;
      hub.position.set(-0.35, 0.82, 0.4);
      g.add(hub);
      for (let i = 0; i < 3; i++) {
        const blade = box(0.72, 0.07, 0.02, mat(C.grille, 0.7), 0, 0, 0);
        blade.position.set(-0.35, 0.82, 0.38);
        blade.rotation.z = (i * Math.PI) / 3;
        g.add(blade);
      }
      // panel lateral con franja de acento
      g.add(box(0.04, 1.0, 0.55, mat(C.accent, 0.6), 0.94, 0.72, 0));
      register(
        "condenser",
        g,
        new THREE.Vector3(2.35, 0, 1.7),
        new THREE.Vector3(1.7, 0, 1.15)
      );
    }

    // Split muro (unidad interior en muro trasero)
    {
      const g = new THREE.Group();
      g.add(box(2.05, 0.62, 0.5, mat(C.casing), 0, 0, 0));
      g.add(box(2.05, 0.16, 0.5, mat(C.casingShade), 0, -0.24, 0.01));
      // flap inferior oscuro
      g.add(box(1.85, 0.05, 0.08, mat(C.grille, 0.7), 0, -0.28, 0.24));
      // led de estado
      const led = box(0.08, 0.04, 0.02, mat(C.accent, 0.4), 0.8, -0.12, 0.26);
      g.add(led);
      register(
        "split",
        g,
        new THREE.Vector3(0.95, 3.3, -3.85),
        new THREE.Vector3(0, 0.15, 1.5)
      );
    }

    // Losa de cielo + cassette
    {
      const ceil = new THREE.Group();
      const patch = box(3.9, 0.14, 3.9, mat(C.slab, 0.95), 0, 0, 0);
      patch.castShadow = false;
      ceil.add(patch);
      const ceilEdges = new THREE.LineSegments(
        new THREE.EdgesGeometry(patch.geometry as THREE.BoxGeometry),
        new THREE.LineBasicMaterial({ color: C.edge })
      );
      ceil.add(ceilEdges);
      register(
        "ceiling",
        ceil,
        new THREE.Vector3(-2.0, 4.66, -2.0),
        new THREE.Vector3(0, 1.0, 0)
      );

      const g = new THREE.Group();
      g.add(box(1.55, 0.3, 1.55, mat(C.casing), 0, 0, 0));
      // rejilla central
      g.add(box(0.95, 0.06, 0.95, mat(C.grille, 0.7), 0, -0.18, 0));
      // difusores perimetrales (4 lamas)
      const lama = mat(C.casingShade);
      g.add(box(1.3, 0.05, 0.14, lama, 0, -0.17, 0.62));
      g.add(box(1.3, 0.05, 0.14, lama, 0, -0.17, -0.62));
      g.add(box(0.14, 0.05, 1.3, lama, 0.62, -0.17, 0));
      g.add(box(0.14, 0.05, 1.3, lama, -0.62, -0.17, 0));
      register(
        "cassette",
        g,
        new THREE.Vector3(-2.0, 4.42, -2.0),
        new THREE.Vector3(0, -1.3, 0)
      );
    }

    // Líneas de refrigerante: cobre + retorno aislado, con esferas en los codos
    {
      const g = new THREE.Group();
      const makeRun = (
        radius: number,
        material: THREE.MeshStandardMaterial,
        off: number
      ) => {
        const segs: Array<{
          len: number;
          pos: [number, number, number];
          axis: "x" | "y" | "z";
        }> = [
          // condensadora → base del muro
          { len: 5.35, pos: [2.35 + off, 0.32 + off, -1.35], axis: "z" },
          // sube por el muro
          { len: 3.0, pos: [2.35 + off, 1.82, -4.02 - off], axis: "y" },
          // tramo superior hacia el cassette
          { len: 4.35, pos: [0.18, 4.35 + off, -4.02 - off], axis: "x" },
          // sale del muro hacia el cassette
          { len: 2.1, pos: [-2.0 + off, 4.35 + off, -2.97], axis: "z" },
        ];
        for (const s of segs) {
          const cyl = new THREE.Mesh(
            new THREE.CylinderGeometry(radius, radius, s.len, 12),
            material
          );
          if (s.axis === "z") cyl.rotation.x = Math.PI / 2;
          if (s.axis === "x") cyl.rotation.z = Math.PI / 2;
          cyl.position.set(...s.pos);
          cyl.castShadow = true;
          g.add(cyl);
        }
        // codos
        const joints: Array<[number, number, number]> = [
          [2.35 + off, 0.32 + off, -4.02 - off],
          [2.35 + off, 4.35 + off, -4.02 - off],
          [-2.0 + off, 4.35 + off, -4.02 - off],
        ];
        for (const j of joints) {
          const sph = new THREE.Mesh(new THREE.SphereGeometry(radius * 1.15, 12, 12), material);
          sph.position.set(...j);
          g.add(sph);
        }
      };
      makeRun(0.055, mat(C.copper, 0.6), 0);
      makeRun(0.075, mat(C.insulation, 0.9), 0.18);
      register("pipes", g, new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
    }

    // Recolecta materiales por grupo para el foco
    const groupMats: Record<string, THREE.MeshStandardMaterial[]> = {};
    for (const [name, { g }] of Object.entries(groups)) {
      const list: THREE.MeshStandardMaterial[] = [];
      g.traverse((o) => {
        if (o instanceof THREE.Mesh && o.material instanceof THREE.MeshStandardMaterial) {
          list.push(o.material);
        }
      });
      groupMats[name] = list;
    }

    // ——— Cámara ortográfica isométrica
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 60);
    const VIEW = 11.2; // alto mínimo del encuadre (unidades de mundo)
    const FIT_W = 13.6; // ancho proyectado de la pieza explotada que debe caber
    const CAM_R = 16;
    const CAM_Y = 10.5;
    const BASE_AZ = Math.PI / 4;

    const sizeCamera = () => {
      const w = host.clientWidth || 1;
      const h = host.clientHeight || 1;
      const aspect = w / h;
      // Ajusta el encuadre por ambos ejes: en paneles angostos amplía la vista
      // vertical para que la pieza completa quepa a lo ancho.
      const vsize = Math.max(VIEW, FIT_W / aspect);
      camera.left = (-vsize * aspect) / 2;
      camera.right = (vsize * aspect) / 2;
      camera.top = vsize / 2 + 1.4;
      camera.bottom = -vsize / 2 + 1.4;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };

    const placeCamera = (az: number, zoom: number) => {
      camera.position.set(Math.cos(az) * CAM_R, CAM_Y, Math.sin(az) * CAM_R);
      camera.zoom = zoom;
      camera.lookAt(0, 1.7, 0);
      camera.updateProjectionMatrix();
    };

    sizeCamera();

    // ——— Estado animado
    const target = { explode: 0, az: BASE_AZ, zoom: 1 };
    const current = { explode: 0, az: BASE_AZ, zoom: 1 };
    const opacityTargets: Record<string, number> = {};
    const opacityCurrent: Record<string, number> = {};
    for (const name of Object.keys(groups)) {
      opacityTargets[name] = 1;
      opacityCurrent[name] = 1;
    }

    const applyState = () => {
      for (const { g, base, explode } of Object.values(groups)) {
        g.position.set(
          base.x + explode.x * current.explode,
          base.y + explode.y * current.explode,
          base.z + explode.z * current.explode
        );
      }
      for (const [name, mats] of Object.entries(groupMats)) {
        for (const m of mats) m.opacity = opacityCurrent[name];
      }
      placeCamera(current.az, current.zoom);
      renderer.render(scene, camera);
    };

    const setFocus = (focus: FocusKey | null) => {
      const active = focus ? FOCUS_MAP[focus] : Object.keys(groups);
      for (const name of Object.keys(groups)) {
        opacityTargets[name] = active.includes(name) ? 1 : 0.2;
      }
    };

    let raf = 0;
    let disposed = false;
    let running = false;

    const cleanupFns: Array<() => void> = [];

    if (interactive) {
      const scrollBlock = document.getElementById("escena-scroll");

      const onScroll = () => {
        if (!scrollBlock) return;
        const rect = scrollBlock.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
        target.explode = p;
        target.az = BASE_AZ + p * 0.18;
        target.zoom = 1 - p * 0.07;
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      cleanupFns.push(() => window.removeEventListener("scroll", onScroll));
      onScroll();

      // Foco según el servicio visible al centro del viewport
      const svcItems = Array.from(document.querySelectorAll<HTMLElement>("[data-svc]"));
      if (svcItems.length) {
        const io = new IntersectionObserver(
          (entries) => {
            for (const e of entries) {
              if (e.isIntersecting) {
                setFocus((e.target as HTMLElement).dataset.svc as FocusKey);
              }
            }
          },
          { rootMargin: "-42% 0px -42% 0px" }
        );
        svcItems.forEach((el) => io.observe(el));
        cleanupFns.push(() => io.disconnect());
      }

      const loop = () => {
        if (disposed) return;
        const L = 0.09;
        current.explode += (target.explode - current.explode) * L;
        current.az += (target.az - current.az) * L;
        current.zoom += (target.zoom - current.zoom) * L;
        for (const name of Object.keys(opacityCurrent)) {
          opacityCurrent[name] += (opacityTargets[name] - opacityCurrent[name]) * L;
        }
        applyState();
        raf = requestAnimationFrame(loop);
      };

      // Pausa el RAF cuando la escena no está en pantalla
      const vis = new IntersectionObserver((entries) => {
        const onScreen = entries.some((e) => e.isIntersecting);
        if (onScreen && !running) {
          running = true;
          raf = requestAnimationFrame(loop);
        } else if (!onScreen && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      });
      vis.observe(host);
      cleanupFns.push(() => vis.disconnect());
    } else {
      // Modo estático: un solo render armado
      current.explode = 0;
      applyState();
    }

    const ro = new ResizeObserver(() => {
      sizeCamera();
      applyState();
    });
    ro.observe(host);
    cleanupFns.push(() => ro.disconnect());

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      cleanupFns.forEach((fn) => fn());
      renderer.dispose();
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          if (Array.isArray(o.material)) o.material.forEach((m) => m.dispose());
          else o.material.dispose();
        }
      });
      host.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="h-full w-full"
      role="img"
      aria-label="Diagrama isométrico de una instalación de climatización: condensadora exterior, líneas de refrigerante, split muro y cassette de cielo"
    />
  );
}
