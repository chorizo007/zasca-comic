import { Link } from "react-router-dom";
import { site } from "../data/content";

export function NewsletterConfirm() {
  return (
    <>
      <div className="page-head">
        <div className="container">
          <p className="eyebrow">Boletín</p>
          <h1 className="page-title">Casi dentro</h1>
          <p className="page-lead">
            Te hemos enviado un correo con un enlace de confirmación. Ábrelo y
            pulsa «Confirmar suscripción»: ese paso es el que te mete en la
            lista.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container--narrow">
          <div className="contents-card">
            <h3>Si no lo encuentras</h3>
            <ul className="contents">
              <li>Mira en la carpeta de spam o promociones</li>
              <li>Comprueba que escribiste bien la dirección</li>
              <li>El enlace caduca, pero puedes pedir el alta otra vez</li>
              <li>
                Si sigue sin llegar, escríbenos a{" "}
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            </ul>

            <div className="buy-row">
              <Link className="btn btn--primary" to="/newsletter">
                Volver a pedir el alta
              </Link>
              <Link className="btn" to="/numeros">
                Ver los números
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
