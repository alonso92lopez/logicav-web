"use server";

import { contact, trabaja } from "./content";
import { esCorreoValido } from "./email";

/*
  Postulación de /trabaja. El sitio NO guarda nada ni tiene llave de la base
  de datos: valida y le pasa la postulación al servicio `postulaciones_web`
  (Cloud Run, logicav_ops_platform/intel/rrhh/postulaciones_web), que es el
  único que escribe en Firestore y vuelve a validar todo.

  Variables: POSTULACIONES_URL y POSTULACIONES_CLAVE. La clave solo permite
  dejar postulaciones, lo mismo que el formulario público.
*/

export type PostulacionState = {
  status: "idle" | "ok" | "error";
  message?: string;
};

const SI_NO = ["sí", "no"];
const TRABAJOS = trabaja.trabajos.map((t) => t.valor);
const FUENTES = ["marketplace", "grupo de Facebook", "referido", "web"];

const falla = (message: string): PostulacionState => ({ status: "error", message });

export async function submitPostulacion(
  _prev: PostulacionState,
  formData: FormData
): Promise<PostulacionState> {
  // Honeypot: un humano nunca llena este campo.
  if (formData.get("sitio_web")) return { status: "ok", message: trabaja.gracias };

  const texto = (k: string) => String(formData.get(k) ?? "").trim();

  const nombre = texto("nombre").replace(/\s+/g, " ");
  if (nombre.length < 2 || nombre.length > 80) return falla("Revisa tu nombre.");

  const digitos = texto("telefono").replace(/\D/g, "");
  const telefono = digitos.length === 9 ? `56${digitos}` : digitos;
  if (!/^569\d{8}$/.test(telefono)) {
    return falla("El WhatsApp debe tener 9 dígitos y empezar con 9 (ej. 9 1234 5678).");
  }

  // Opcional: muchos técnicos se manejan solo por WhatsApp.
  const correo = texto("correo").toLowerCase();
  if (correo && (correo.length > 120 || !esCorreoValido(correo))) {
    return falla("Revisa tu correo (ej. nombre@gmail.com), o déjalo en blanco.");
  }

  const comuna = texto("comuna");
  if (!trabaja.comunas.includes(comuna)) return falla("Elige tu comuna de la lista.");

  const mayor18 = texto("mayor_18");
  const cedula = texto("cedula_chilena");
  if (!SI_NO.includes(mayor18) || !SI_NO.includes(cedula)) {
    return falla("Responde si eres mayor de 18 y si tienes cédula chilena.");
  }

  const trabajos = formData.getAll("trabajos_hvac").map(String);
  if (trabajos.length === 0 || trabajos.some((t) => !TRABAJOS.includes(t))) {
    return falla("Marca al menos un trabajo de climatización.");
  }

  const tarifaTexto = texto("tarifa_dia").replace(/[.$\s]/g, "");
  const tarifa = Number(tarifaTexto);
  if (!/^\d+$/.test(tarifaTexto) || tarifa < 1000 || tarifa > 1_000_000) {
    return falla("Tu valor por día va en pesos, sin puntos (ej. 60000).");
  }

  const finde = formData.getAll("finde").map(String);
  if (finde.length === 0) return falla("Dinos si trabajas sábado o domingo (o ninguno).");
  const ninguno = finde.includes("ninguno");

  if (texto("consentimiento") !== "sí") {
    return falla("Necesitamos tu autorización para guardar tus datos.");
  }

  // Texto libre opcional. El servicio lo limpia y revisa el tope de nuevo.
  const comentario = texto("comentario").replace(/\r\n?/g, "\n");
  if (comentario.length > trabaja.comentario.max) {
    return falla(`Lo que nos cuentas puede tener hasta ${trabaja.comentario.max} caracteres.`);
  }

  const origen = texto("origen");
  const cuerpo = {
    nombre,
    telefono,
    correo,
    comentario,
    comuna,
    mayor_18: mayor18,
    cedula_chilena: cedula,
    trabajos_hvac: trabajos,
    tarifa_dia: tarifa,
    sabado: !ninguno && finde.includes("sabado") ? "sí" : "no",
    domingo: !ninguno && finde.includes("domingo") ? "sí" : "no",
    consentimiento: "sí",
    origen: FUENTES.includes(origen) ? origen : "web",
    ref: texto("ref").toLowerCase().slice(0, 40),
  };

  const url = process.env.POSTULACIONES_URL;
  const clave = process.env.POSTULACIONES_CLAVE;
  const caida = falla(
    `No pudimos guardar tu postulación en este momento. Escríbenos por WhatsApp al ${contact.phoneDisplay}.`
  );
  if (!url || !clave) {
    console.error("[LOGICAV] /trabaja sin POSTULACIONES_URL o POSTULACIONES_CLAVE");
    return caida;
  }

  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/postular`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Clave": clave },
      body: JSON.stringify(cuerpo),
      signal: AbortSignal.timeout(20_000),
    });
    if (res.status === 422) {
      const { detail } = (await res.json().catch(() => ({}))) as { detail?: unknown };
      return falla(typeof detail === "string" ? detail : "Revisa tus respuestas.");
    }
    if (res.status === 429) {
      return falla("Hay muchas postulaciones en este momento. Intenta de nuevo en un minuto.");
    }
    if (!res.ok) {
      console.error("[LOGICAV] postulaciones_web respondió", res.status, await res.text());
      return caida;
    }
  } catch (err) {
    console.error("[LOGICAV] Error llamando a postulaciones_web:", err);
    return caida;
  }

  // Aviso por correo. La ficha ya está guardada: si el correo falla, la
  // postulación igual cuenta y el técnico ve "enviada".
  try {
    const { sendPostulacionEmail } = await import("./send-postulacion");
    await sendPostulacionEmail(cuerpo);
  } catch (err) {
    console.error("[LOGICAV] Postulación guardada, pero falló el aviso por correo:", err);
  }

  return { status: "ok", message: trabaja.gracias };
}
