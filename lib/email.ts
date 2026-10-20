/* Una sola regla de correo válido, compartida por el formulario (atributo
   `pattern`) y la server action. Pide algo@dominio.tld: el `type="email"` del
   navegador acepta "nombre@empresa" sin punto, y a eso no se puede responder. */
export const EMAIL_PATTERN = "[^\\s@]+@[^\\s@]+\\.[^\\s@]+";

const emailRegex = new RegExp(`^${EMAIL_PATTERN}$`);

export const esCorreoValido = (s: string) => emailRegex.test(s);
