# Datos propuestos — pendientes de validación

Todo lo de esta lista fue **propuesto por diseño** para que el sitio se vea
completo y profesional. **Nada de esto está confirmado.** Revisar cada punto
y corregir en `lib/content.ts` (una sola fuente de datos para todo el sitio).

> Actualizado el 2026-09-02, con la migración a la Dirección A.

## 1. Cobertura y contacto

| Dato propuesto | Dónde aparece | Qué validar |
|---|---|---|
| Cobertura: "Santiago y regiones" | Header, hero, footer, StatsBar, SEO | ¿Hasta dónde llegan realmente? ¿Qué regiones? |
| "Proyectos en regiones y faena se coordinan caso a caso" | `contact.coverageDetail` | ¿Es así? |
| Horario: lunes a viernes 8:30–18:00 | Formulario, footer, schema SEO | Horario real |
| "Atención de emergencias para clientes con contrato vigente" | `contact.hoursNote` | ¿Ofrecen emergencias? ¿24/7? |
| Dominio `www.logicav.cl` | Metadata, sitemap, robots | ¿Es el dominio definitivo? |

## 2. Cifras del hero — ✅ RESUELTO (2 sep 2026)

Las cifras sin respaldo (`+300 mantenciones`, `+120 equipos bajo contrato`,
`48 h de respuesta`) **salieron de producción** con la migración. La franja
`StatsBar` ahora muestra solo datos derivables del catálogo y de la cobertura
declarada: rango de BTU, marcas, tecnología y cobertura.

Sigue pendiente, sin bloquear: si aparecen credenciales duras (años operando,
proyectos ejecutados, tiempo de respuesta comprometido), reemplazan a estas.
Hay un `TODO` en `stats`, en `lib/content.ts`.

## 3. Planes de mantención — ⚠️ YA NO SE PUBLICAN

La sección de planes se eliminó con la Dirección A, así que los precios de
`$35.000` y `$55.000`, el plan "Integral" y la marca "Más contratado"
**ya no están en el sitio**. No hay nada que corregir con urgencia.

Si se reponen los planes, hay que validarlos completos antes: la mayor parte
de ese contenido era inventado.

## 4. Respaldo técnico

| Dato propuesto | Qué validar |
|---|---|
| "Equipo propio de técnicos" | ¿Propio o subcontratado? ¿Cuántos? |
| "Personal con licencia SEC vigente" | **Afirmación legal — no publicar sin confirmar.** Sigue **sin publicarse**: verificado contra el HTML en vivo el 2026-09-02. Hay un comentario en `about` que lo recuerda |
| "Instalamos y mantenemos equipos Anwo, Midea y Clark" | Redacción segura (no dice "representante"). ¿Hay relación formal con alguna marca? |
| `about.since: "2019"` | Año real de inicio. Hoy el dato está en `content.ts` pero **no se muestra** en ninguna sección |

## 5. Metodología — ⚠️ YA NO SE PUBLICA

Los 5 pasos (catastro → pauta → checklist → informe técnico → historial) y el
"informe de ejemplo" se eliminaron con la Dirección A.

La promesa equivalente sobrevive, más acotada, en `trustItems` ("registro por
equipo", "informe técnico y presupuesto antes de intervenir"). Validar que
refleje la operación real:

- ¿Se entrega informe técnico con fotos en cada visita?
- ¿Se mantiene historial por equipo?

## 6. Proyectos

Las 3 tarjetas siguen siendo **tipos de trabajo con fotos de stock**, no casos
reales. Cambió el encuadre (hogar / empresas / faena), no el problema.

**Esta es la mayor deuda del rediseño**, y no la resuelve el código. Para la
siguiente iteración conseguir:

- 2–3 proyectos reales: foto propia, comuna, tipo de instalación, alcance.
- Clientes referenciables (solo con autorización escrita).
- Una foto de hero propia: la actual (`/images/hero.jpg`) también es stock.

## 7. Formulario — ✅ RESUELTO (7 ago 2026)

Los leads llegan por correo a `contactologicav@gmail.com` (vía Resend, como
`cotizaciones@logicav.cl`), con respuesta directa al solicitante. La casilla
`contacto@logicav.cl` también recibe (Cloudflare Email Routing + catch-all) y
puede responder como el dominio. Destino configurable en la variable
`LEAD_TO_EMAIL` de Vercel. Pendiente definir: quién responde y en cuánto tiempo.

Con la Dirección A el formulario suma el campo de **superficie en m²** y una
**capacidad orientativa en BTU** (`lib/capacidad.ts`). Los tramos salen del
catálogo real y el texto dice que se confirma con cálculo de carga térmica en
visita. Validar que los tramos coincidan con el criterio del equipo técnico.

## 8. Precios de equipos (`/equipos`)

Los valores referenciales salen del catálogo del sitio anterior (precios
"oferta" de abril 2026). Confirmar vigencia.

## 9. Precios de servicios (`featuredServices`)

Nuevos en el sitio con la Dirección A. Salen del mismo catálogo de abril 2026:

| Servicio | Precio | Oferta |
|---|---|---|
| Instalación aire acondicionado | $150.000 | $120.000 |
| Mantención aire acondicionado | $50.000 | $35.000 |

Validar dos cosas:

- **Vigencia** de los cuatro montos.
- **Si son netos.** Se publican marcados "+ IVA" por consistencia con
  `/equipos`, pero el catálogo de origen no lo declaraba. Es un supuesto.

## 10. Posicionamiento

La migración cambió el encuadre del sitio: de "mantención para empresas en la
Región Metropolitana" a "hogar, empresas y minería" con cobertura nacional.
Afecta el `title`, la `description` y las keywords que ya estaban indexadas.

Validar que la línea de minería e industrial refleje trabajo real y no una
intención comercial.
