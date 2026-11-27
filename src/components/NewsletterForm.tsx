import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { newsletter } from "../config";
import { site } from "../data/content";

type Status = "idle" | "sending" | "ok" | "error";

const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
  "Alta en el boletín de Zasca! Cómic",
)}&body=${encodeURIComponent(
  "Hola, quiero recibir un aviso cada vez que salga un número nuevo. Mi correo es: ",
)}`;

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const configured = newsletter.endpoint.trim().length > 0;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!configured) return;

    setStatus("sending");

    try {
      const body = new FormData();
      body.append("email", email);
      if (newsletter.tag) body.append("tag", newsletter.tag);

      // El proveedor responde fuera de nuestro origen; no leemos la respuesta.
      await fetch(newsletter.endpoint, {
        method: "POST",
        mode: "no-cors",
        body,
      });

      setStatus("ok");
      setEmail("");
      setConsent(false);
    } catch {
      setStatus("error");
    }
  }

  if (!configured) {
    return (
      <div className="form">
        <p className="form-note">
          El alta se hace por correo: escríbenos y te añadimos a la lista de
          avisos. Recibirás un mensaje para confirmarlo.
        </p>
        <a className="btn btn--primary" href={mailto}>
          Escríbenos para el alta
        </a>
        <p className="form-note">
          Solo usamos tu correo para avisarte de nuevos números. Baja con un
          clic cuando quieras.
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="newsletter-email">Tu correo electrónico</label>
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="tucorreo@ejemplo.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <label className="checkbox">
        <input
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          required
        />
        <span>
          Quiero recibir avisos de nuevos números y acepto la política de
          privacidad. Puedo darme de baja cuando quiera.
        </span>
      </label>

      <button
        className="btn btn--primary"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Enviando…" : "Quiero el aviso"}
      </button>

      {status === "ok" && (
        <p className="form-status form-status--ok" role="status">
          Te hemos enviado un correo con un enlace. Pulsa «Confirmar
          suscripción» para entrar en la lista; hasta entonces no estás dentro.{" "}
          <Link to="/newsletter/confirmado">¿No te llega?</Link>
        </p>
      )}

      {status === "error" && (
        <p className="form-status" role="alert">
          No hemos podido enviar la solicitud. Vuelve a intentarlo o escríbenos
          a <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      )}

      <p className="form-note">
        Doble confirmación: primero pides el alta y después la confirmas desde
        tu correo. Sin spam, solo números nuevos.
      </p>
    </form>
  );
}
