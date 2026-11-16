import { trabaja } from "./content";
import { esc } from "./send-lead";

/*
  Aviso por correo de cada postulación de /trabaja (pedido de Alonso,
  16-11-2026). La ficha ya quedó guardada en el panel antes de esto; el correo
  es solo un aviso. Va a postulaciones@logicav.cl para que caiga en la etiqueta
  "Postulaciones" de Gmail (Cloudflare reenvía a contactologicav@gmail.com).
*/

export type PostulacionAviso = {
  nombre: string;
  telefono: string; // 569XXXXXXXX
  correo: string;
  comuna: string;
  mayor_18: string;
  cedula_chilena: string;
  trabajos_hvac: string[];
  tarifa_dia: number;
  sabado: string;
  domingo: string;
  origen: string;
  ref: string;
};

const fila = (label: string, value: string) =>
  `<tr><td style="padding:6px 12px 6px 0;color:#4b5d6e;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 0;color:#1d2b38;font-weight:600">${esc(value)}</td></tr>`;

export async function sendPostulacionEmail(p: PostulacionAviso): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY no configurada");
  const domain = process.env.RESEND_EMAIL_DOMAIN ?? "logicav.cl";

  const trabajos = p.trabajos_hvac
    .map((v) => trabaja.trabajos.find((t) => t.valor === v)?.label ?? v)
    .join(", ");
  const finde =
    [p.sabado === "sí" && "sábado", p.domingo === "sí" && "domingo"].filter(Boolean).join(" y ") ||
    "ninguno";
  const tarifa = new Intl.NumberFormat("es-CL").format(p.tarifa_dia);
  const fecha = new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" });
  // Alerta visible si no cumple lo mínimo para trabajar.
  const alertas = [
    p.mayor_18 !== "sí" && "dice que NO es mayor de 18",
    p.cedula_chilena !== "sí" && "dice que NO tiene cédula chilena",
  ].filter(Boolean);

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px">
    <h2 style="color:#1d2b38;margin:0 0 4px">Nueva postulación: técnico de climatización</h2>
    <p style="color:#4b5d6e;margin:0 0 16px;font-size:13px">Desde logicav.cl/trabaja · ${esc(fecha)}</p>
    ${
      alertas.length
        ? `<p style="margin:0 0 16px;padding:10px 12px;background:#fdefe6;color:#1d2b38;font-size:14px">Ojo: ${esc(alertas.join(" y "))}.</p>`
        : ""
    }
    <table style="border-collapse:collapse;font-size:14px">
      ${fila("Nombre", p.nombre)}
      ${fila("WhatsApp", `+${p.telefono}`)}
      ${p.correo ? fila("Correo", p.correo) : ""}
      ${fila("Comuna", p.comuna)}
      ${fila("Qué hace", trabajos)}
      ${fila("Valor por día", `$${tarifa}`)}
      ${fila("Fin de semana", finde)}
      ${fila("Mayor de 18", p.mayor_18)}
      ${fila("Cédula chilena", p.cedula_chilena)}
      ${fila("Fuente", p.origen)}
      ${p.ref ? fila("Link personal", "sí (completó su ficha)") : ""}
    </table>
    <p style="margin:18px 0 0">
      <a href="https://wa.me/${esc(p.telefono)}" style="color:#c9490a;font-weight:600">Escribirle por WhatsApp</a>
    </p>
    <p style="margin:12px 0 0;color:#8494a3;font-size:12px">La ficha ya está en el panel: RRHH → Reclutamiento.${
      p.correo ? " Puedes responder este correo: le llega al postulante." : ""
    }</p>
  </div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: `LOGICAV Web <postulaciones@${domain}>`,
      to: [trabaja.documentos.correo],
      reply_to: p.correo || undefined,
      subject: `Postulación: ${p.nombre} (${p.comuna}) – $${tarifa}/día`,
      html,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend ${res.status}: ${body.slice(0, 300)}`);
  }
}
