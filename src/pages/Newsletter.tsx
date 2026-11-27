import { NewsletterForm } from "../components/NewsletterForm";
import { site } from "../data/content";

export function Newsletter() {
  return (
    <>
      <div className="page-head">
        <div className="container">
          <p className="eyebrow">Boletín</p>
          <h1 className="page-title">Aviso de cada número</h1>
          <p className="page-lead">
            Un correo cuando sale un Zasca nuevo. Ni spam, ni cadenas, ni
            mensajes a deshoras: solo el aviso de que hay número y dónde
            conseguirlo.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="panel-grid">
            <div className="panel">
              <p className="panel-kicker">Alta</p>
              <h2>Apúntate a la lista</h2>
              <p>
                Te mandamos un correo para confirmar. Hasta que no pulses el
                enlace, no estás suscrito: así nadie apunta a nadie sin su
                permiso.
              </p>
              <div className="mt-4">
                <NewsletterForm />
              </div>
            </div>

            <div className="contents-card">
              <h3>Cómo funciona</h3>
              <ul className="contents">
                <li>Pones tu correo y pides el alta</li>
                <li>Recibes un correo de confirmación</li>
                <li>Pulsas el enlace y entras en la lista</li>
                <li>Te avisamos cuando sale cada número</li>
                <li>Puedes darte de baja desde cualquier envío</li>
              </ul>

              <h3 style={{ marginTop: 26 }}>Privacidad</h3>
              <p style={{ fontSize: "0.88rem", lineHeight: 1.6 }}>
                Usamos tu correo únicamente para avisarte de nuevas
                publicaciones. No lo cedemos a terceros. Para cualquier duda o
                para que te borremos, escribe a{" "}
                <a href={`mailto:${site.email}`}>{site.email}</a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
