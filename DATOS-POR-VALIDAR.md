# Datos propuestos — pendientes de validación

Todo lo de esta lista fue **propuesto por diseño** para que el sitio se vea
completo y profesional. **Nada de esto está confirmado.** Revisar cada punto
y corregir en `lib/content.ts` (una sola fuente de datos para todo el sitio).

## 1. Cobertura y contacto

| Dato propuesto | Dónde aparece | Qué validar |
|---|---|---|
| Cobertura: Región Metropolitana | Hero, footer, sección cotizar, SEO | ¿Es solo RM? ¿Qué comunas? ¿Toman regiones? |
| "Proyectos en otras regiones se evalúan caso a caso" | Sección cotizar | ¿Es así? |
| Horario: lunes a viernes 8:30–18:00 | Cotizar, footer, schema SEO | Horario real |
| "Atención de emergencias para clientes con contrato vigente" | Sección cotizar | ¿Ofrecen emergencias? ¿24/7? |
| Dominio `logicav.cl` | Metadata, sitemap, robots | ¿Es el dominio definitivo? |

## 2. Cifras del hero (counters)

| Dato propuesto | Qué validar |
|---|---|
| +300 mantenciones ejecutadas | Cifra real aproximada |
| +120 equipos bajo contrato | Cifra real |
| 48 h respuesta estándar | Tiempo de respuesta real |
| "Operando desde 2019" (sección Respaldo) | Año real de inicio |

Si alguna cifra no se puede respaldar, **se elimina el counter** (mejor sin
cifra que con cifra inventada).

## 3. Planes de mantención (sección más sensible)

| Dato propuesto | Qué validar |
|---|---|
| Plan Preventivo: 2 visitas/año, desde $35.000/equipo, respuesta 72 h hábiles | El precio $35.000 sale del catálogo actual (mantención en oferta). Validar el resto |
| Plan Preventivo + Correctivo: 4 visitas/año, desde $55.000, mano de obra correctiva incluida, SLA 48 h | **Todo inventado.** Validar completo |
| Plan Integral: visitas mensuales, repuestos menores incluidos, SLA 24 h, precio a convenir | **Todo inventado.** Validar completo |
| "Preventivo + Correctivo" marcado como "Más contratado" | ¿Cuál es realmente el plan típico? |

## 4. Respaldo técnico

| Dato propuesto | Qué validar |
|---|---|
| "Equipo propio de técnicos" | ¿Propio o subcontratado? ¿Cuántos? |
| "Personal con licencia SEC vigente" | **Afirmación legal — no publicar sin confirmar.** ¿Quién tiene licencia SEC y de qué clase? |
| "Instalamos y mantenemos equipos Anwo, Midea y Clark" | Redacción segura (no dice "representante"). ¿Hay relación formal con alguna marca que se pueda destacar? |

## 5. Metodología

Los 5 pasos (catastro → pauta → checklist → informe técnico → historial) son
la **promesa central del sitio**. Validar que refleje la operación real,
sobre todo:
- ¿Se entrega informe técnico con fotos en cada visita?
- ¿Se mantiene historial/hoja de vida por equipo?

El "informe de ejemplo" que se muestra en la sección es un mock ilustrativo.

## 6. Proyectos

Las 3 tarjetas son **tipos de trabajo con fotos de stock**, no casos reales.
Para la siguiente iteración conseguir:
- 2–3 proyectos reales: foto propia, comuna, tipo de instalación, alcance.
- Clientes referenciables (solo con autorización escrita).

## 7. Formulario

Los leads hoy **solo quedan en el log del servidor** (`lib/actions.ts`).
Antes de lanzar hay que conectar el envío real (correo a contacto@logicav.cl
o notificación). Definir también quién responde y en cuánto tiempo.

## 8. Precios de equipos (`/equipos`)

Los valores referenciales salen del catálogo del sitio anterior (precios
"oferta" de abril 2026). Confirmar vigencia antes de publicar.
