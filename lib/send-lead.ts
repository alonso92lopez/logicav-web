export type Lead = {
  fecha: string;
  nombre: string;
  organizacion: string;
  email: string;
  telefono: string;
  tipoInstalacion: string;
  cantidadEquipos: string;
  comuna: string;
  servicio: string;
  urgencia: string;
  mensaje: string;
};

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const row = (label: string, value: string) =>
  value
    ? `<tr><td style="padding:6px 12px 6px 0;color:#4b5d6e;white-space:nowrap;vertical-align:top">${label}</td><td style="padding:6px 0;color:#1d2b38;font-weight:600">${esc(value)}</td></tr>`
    : "";

export async function sendLeadEmail(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY no configurada");

  const domain = process.env.RESEND_EMAIL_DOMAIN ?? "logicav.cl";
  const to = process.env.LEAD_TO_EMAIL ?? "alonso.lopez.logicav@gmail.com";

  const subject = `Cotización web: ${lead.nombre}${
    lead.organizacion ? ` (${lead.organizacion})` : ""
  }${lead.urgencia.startsWith("Urgente") ? " — URGENTE" : ""}`;

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px">
    <h2 style="color:#1d2b38;margin:0 0 4px">Nueva solicitud de cotización</h2>
    <p style="color:#4b5d6e;margin:0 0 16px;font-size:13px">Enviada desde www.logicav.cl · ${esc(
      lead.fecha
    )}</p>
    <table style="border-collapse:collapse;font-size:14px">
      ${row("Nombre", lead.nombre)}
      ${row("Empresa / institución", lead.organizacion)}
      ${row("Correo", lead.email)}
      ${row("Teléfono", lead.telefono)}
      ${row("Tipo de instalación", lead.tipoInstalacion)}
      ${row("Cantidad de equipos", lead.cantidadEquipos)}
      ${row("Comuna", lead.comuna)}
      ${row("Servicio", lead.servicio)}
      ${row("Urgencia", lead.urgencia)}
    </table>
    ${
      lead.mensaje
        ? `<p style="margin:16px 0 4px;color:#4b5d6e;font-size:13px">Mensaje:</p>
           <p style="margin:0;padding:12px;background:#f6f8fa;border-radius:6px;color:#1d2b38;font-size:14px">${esc(
             lead.mensaje
           )}</p>`
        : ""
    }
    <p style="margin:18px 0 0;color:#8494a3;font-size:12px">Puedes responder directamente a este correo: le llegará al solicitante.</p>
  </div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `LOGICAV Web <cotizaciones@${domain}>`,
      to: [to],
      reply_to: lead.email || undefined,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend ${res.status}: ${body.slice(0, 300)}`);
  }
}
