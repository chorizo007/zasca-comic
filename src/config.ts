/**
 * Boletín con doble confirmación.
 *
 * El formulario hace un POST a esta URL y el proveedor se encarga de mandar el
 * correo de confirmación (doble opt-in) y de gestionar las bajas. No hay
 * backend propio: por eso sirve para un sitio estático como este.
 *
 * Buttondown (recomendado, doble opt-in por defecto):
 *   1. Crea la cuenta en https://buttondown.email
 *   2. Copia la URL de tu formulario incrustado:
 *      https://buttondown.email/api/emails/embed-subscribe/TU_USUARIO
 *   3. Pega esa URL aquí o define la variable de repositorio
 *      NEWSLETTER_ENDPOINT en GitHub (Ajustes → Secrets and variables →
 *      Actions → Variables).
 *
 * Mientras esté vacío, la web ofrece el alta escribiendo a zascacomic@gmail.com.
 */
export const newsletter = {
  endpoint:
    (import.meta.env.VITE_NEWSLETTER_ENDPOINT as string | undefined) ?? "",
  tag: "web",
};
