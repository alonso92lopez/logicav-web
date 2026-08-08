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
  const contacto = String(formData.get("contacto") ?? "").trim();

  if (!nombre || !contacto) {
    return {
      status: "error",
      message:
        "Necesitamos tu nombre y un dato de contacto (teléfono o correo).",
    };
  }

  const esCorreo = contacto.includes("@");

  const lead = {
    fecha: new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" }),
    nombre,
    organizacion: "",
    email: esCorreo ? contacto : "",
    telefono: esCorreo ? "" : contacto,
    tipoInstalacion: "",
    cantidadEquipos: "",
    comuna: "",
    servicio: String(formData.get("servicio") ?? ""),
    urgencia: "",
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
