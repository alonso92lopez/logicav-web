# Migración a Dirección A — traspaso de sesión

> Escrito el 2026-09-02 desde una sesión en `logicav_ventas`. Léelo antes de tocar código.

## Objetivo

Llevar el diseño **"Dirección A — Ingeniería Técnica"**, construido en el repo
`logicav_ventas`, a este proyecto, que es el que publica **www.logicav.cl**.

La regla que ordena todo el trabajo:

> **Se reemplaza todo lo que se ve. Se conserva todo lo que no se ve.**

El código fuente del diseño está en:

```
C:/Users/alons/OneDrive/Escritorio/logicav_ventas (old)/apps/web/
  app/globals.css      ← tokens de la Dirección A
  app/layout.tsx       ← fuentes (Barlow Condensed + IBM Plex Sans)
  app/page.tsx         ← orden de secciones
  components/*.tsx     ← 15 componentes
```

**La ruta lleva un espacio y paréntesis: hay que citarla siempre.** La carpeta
se renombró a `logicav_ventas (old)` justamente para recordar que está
deprecada y que no se trabaja ahí. Es solo lectura: se saca el diseño y nada
más.

Se lee con ruta absoluta desde acá. **No se copia el repo ni su estructura de
monorepo** — solo el lenguaje visual y los componentes.

## Por qué se migra hacia acá y no al revés

El proyecto de Vercel `logicav-ventas` lleva roto desde el 2026-05-10: todo
deployment termina en `status UNKNOWN` con `Builds: . [0ms]` y sin logs
recuperables. Falla igual por integración de GitHub que por `vercel deploy`
desde el CLI, con código que compila limpio en local y desde un checkout
limpio. Nunca se diagnosticó la causa.

Este proyecto, en cambio, despliega en ~30 s y ya tiene el dominio apuntado.
Migrar hacia acá evita el proyecto roto **y** evita mover el dominio entre
proyectos, que era el paso más riesgoso del plan alternativo.

## Decisiones ya tomadas

| Decisión | Estado |
|---|---|
| Diseño | Dirección A, tal cual está construida en `logicav_ventas` |
| Secciones `planes` y `metodología` | **Se van** |
| Pieza 3D (`Scene3D`, `HeroVisual`, dep `three`) | **Se va** |
| Página `/equipos` | **Se mantiene**, repintada con los tokens nuevos. No borrar: está indexada y en el `sitemap.ts` |
| Formulario | **Se mantiene Resend.** El diseño nuevo se conecta a la server action existente, no a WhatsApp |
| `robots.ts` y `sitemap.ts` | Se mantienen |
| Fuente de datos de productos | `lib/content.ts` de este repo. **No traer** los YAML de `configs/productos` ni el path `../../` |

## Qué se conserva exactamente

- `lib/send-lead.ts` y `lib/actions.ts` — leads por correo vía Resend a
  `contactologicav@gmail.com`, con `LEAD_TO_EMAIL` ya configurada en Vercel.
- `lib/content.ts` — fuente única de contenido y de productos, con `formatCLP`.
- `app/robots.ts`, `app/sitemap.ts`.
- `app/equipos/page.tsx` — solo cambia su estilo.
- El honeypot `empresa_web` del formulario.

## Trampas concretas

**1. Los tokens chocan.** `Header`, `Footer`, `QuoteForm` y `/equipos` de este
repo están escritos contra `bg-paper`, `text-ink`, `border-line`, `text-accent`.
La Dirección A define otros. Si se pisa `globals.css` sin más, todo lo que no
se reemplace queda sin color. Hay que portar esos componentes en la misma
pasada, o mantener ambos sets de tokens durante la migración.

Mapeo aproximado:

| Este repo | Dirección A | Uso |
|---|---|---|
| `--paper` `#ffffff` | `--color-shell` `#f4f6f7` | fondo base |
| `--mist` `#f6f8fa` | blanco / `shell` alternados | secciones |
| `--line` `#e5e9ee` | `--color-line` `#d6dee3` | reglas |
| `--ink` `#1d2b38` | `--color-navy-800` `#0b2540` | texto y marca |
| `--ink-soft` `#4b5d6e` | `--color-steel-600` `#3e566a` | texto secundario |
| `--accent` `#0a66e8` | `--color-flame-500` `#e8590c` | acento y acción |

Ojo con la diferencia de sintaxis: acá los tokens se declaran en `:root` y se
exponen con `@theme inline`; en la Dirección A se declaran directo en `@theme`.

**2. Imports.** Este repo usa alias `@/components/...`; los componentes de
origen usan rutas relativas (`../lib/types`). Hay que ajustarlos al portar.

**3. `MotionRoot` (GSAP + Lenis).** Los reveals dependen de atributos
`data-reveal` / `data-reveal-item` en el marcado, y los componentes nuevos no
los traen. Dos caminos: agregarlos a las secciones nuevas, o quitar
`MotionRoot` y las dependencias `gsap` y `lenis`. Si se quita, revisar también
la regla `html.lenis` y el flag `no-js` del `layout.tsx`.

**4. El formulario es el punto delicado.** El `QuoteForm.tsx` de la Dirección A
es un componente cliente que arma un mensaje y abre `wa.me`. Hay que
**descartar ese envío** y conectarlo a la server action de este repo,
conservando los 4 campos actuales (`nombre`, `contacto`, `servicio`,
`mensaje`) más el honeypot, y **sumando el campo de m²** con el cálculo de
capacidad orientativa en BTU, que es la pieza que vale la pena de esa versión.

Los tramos salen del catálogo real: ≤15 m² → 9.000 BTU · ≤25 → 12.000 ·
≤35 → 18.000 · resto → 24.000. El texto debe dejar claro que la capacidad
definitiva se confirma con cálculo de carga térmica en visita.

**5. Fuentes.** Este repo carga Inter + Inter Tight + IBM Plex Mono. La
Dirección A usa Barlow Condensed (titulares, mayúsculas) + IBM Plex Sans.
Al cambiar, revisar la clase `.kicker`, que hoy depende de `--font-plex-mono`.

## Contenido: lo que sigue pendiente y no lo resuelve el diseño

`DATOS-POR-VALIDAR.md` sigue vigente para toda la copia que sobreviva. Está
publicado en producción y sin confirmar:

- `+300 mantenciones`, `+120 equipos bajo contrato`, `48 h de respuesta`,
  `operando desde 2019`.
- Planes de `$35.000` y `$55.000`, y uno marcado "Más contratado".
- Los 3 proyectos son fotos de stock, no obras reales.
- Los precios de `/equipos` son de abril 2026.

La afirmación sobre licencia SEC **no** está publicada — se verificó contra el
HTML en vivo el 2026-09-02.

En la Dirección A quedaron `TODO` equivalentes en `StatsBar.tsx`,
`About.tsx` y `Projects.tsx`, por lo mismo: faltan cifras reales y fotografía
propia. **La fotografía es el mayor limitante del rediseño**, no el código.

## Cómo ejecutarlo

> **Corregido el 2026-09-02, durante la migración.** Los pasos 3 y 5 estaban
> mal: este proyecto **no tiene la integración de GitHub conectada**. Ni el
> push genera preview, ni el merge publica. Todo sale del CLI.

1. Rama nueva desde `main`. **No trabajar directo en `main`.**
2. Migrar, verificar `npm run build` y `npm run lint` en local.
3. `npx vercel deploy` → devuelve una URL de preview.
4. Revisar el preview en vivo (tiene Deployment Protection: se abre con la
   sesión de Vercel de `alonsolopezlogicav-2666`).
5. Con el visto bueno, merge a `main` y push.
6. `npx vercel deploy --prod` → **este es el paso que publica en logicav.cl.**

Rollback: `npx vercel rollback`, o promover el deployment anterior desde el
panel. `main` no se toca hasta el paso 5.

## Cuentas — es fácil equivocarse, hay varias

- **GitHub de este repo:** `alonso92lopez` (`alonso92lopez/logicav-web`, rama
  `main`). El 2026-09-02 la cuenta activa de `gh` quedó en
  `alonsolopezlogicav-maker`, que es la del *otro* repo. Hay que cambiarla de
  vuelta con `gh auth switch`.
- **Vercel:** `alonsolopezlogicav-2666`. Proyecto
  `prj_2b0FrcDClaaRq7zjHDheGv6buaGb`. El CLI quedó bien logueado ahí, pero el
  **MCP de Vercel está en `contactoaldato-5508`** y devuelve 403 contra este
  proyecto: para consultar deployments hay que usar el CLI.
- **`gh`:** el push usa la cuenta *activa* de `gh`, porque `~/.gitconfig`
  enruta github.com por `gh auth git-credential`. Hay tres cuentas cargadas;
  verificar con `gh auth status` que la activa sea `alonso92lopez`.


---

## Estado final

La migración se completó y está publicada. Después se sumaron, en este orden:
ajustes de móvil y logo con fondo transparente; la franja de marcas monocroma
con 20 logos; precios tachados en `/equipos`; y `/calculadora` con agendamiento
de visita.

Lo que quedó abierto no es de código y está en `DATOS-POR-VALIDAR.md`.
