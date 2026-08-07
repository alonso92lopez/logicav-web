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
    fecha: new Date().toISOString(),
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

  // TODO [POR DEFINIR]: envío del lead por correo (p. ej. Resend) o notificación
  // a WhatsApp. Por ahora queda registrado en el log del servidor.
  console.log("[LOGICAV] Nueva solicitud de cotización:", lead);

  return {
    status: "ok",
    message:
      "Recibimos tu solicitud. Te contactaremos dentro del horario hábil para coordinar la visita o enviarte la cotización.",
  };
}
