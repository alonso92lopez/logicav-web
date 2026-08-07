"use server";

export type QuoteState = {
  status: "idle" | "ok" | "error";
  message?: string;
};

export async function submitQuote(
  _prev: QuoteState,
  formData: FormData
): Promise<QuoteState> {
  // Honeypot anti-spam: campo invisible que un humano nunca llena
  if (formData.get("empresa_web")) {
    return { status: "ok" };
  }

  const nombre = String(formData.get("nombre") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const telefono = String(formData.get("telefono") ?? "").trim();

  if (!nombre || (!email && !telefono)) {
    return {
      status: "error",
      message:
        "Necesitamos tu nombre y al menos un dato de contacto (correo o teléfono).",
    };
  }

  const lead = {
    fecha: new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" }),
    nombre,
    organizacion: String(formData.get("organizacion") ?? "").trim(),
    email,
    telefono,
    tipoInstalacion: String(formData.get("tipo_instalacion") ?? ""),
    cantidadEquipos: String(formData.get("cantidad_equipos") ?? ""),
    comuna: String(formData.get("comuna") ?? "").trim(),
    servicio: String(formData.get("servicio") ?? ""),
    urgencia: String(formData.get("urgencia") ?? ""),
    mensaje: String(formData.get("mensaje") ?? "").trim(),
  };

  // Respaldo en logs además del correo
  console.log("[LOGICAV] Nueva solicitud de cotización:", lead);

  try {
    const { sendLeadEmail } = await import("./send-lead");
    await sendLeadEmail(lead);
  } catch (err) {
    console.error("[LOGICAV] Error enviando lead por correo:", err);
    return {
      status: "error",
      message:
        "No pudimos registrar tu solicitud en este momento. Escríbenos directo por WhatsApp al +56 9 8706 6666 y te atendemos igual.",
    };
  }

  return {
    status: "ok",
    message:
      "Recibimos tu solicitud. Te contactaremos dentro del horario hábil para coordinar la visita o enviarte la cotización.",
  };
}
