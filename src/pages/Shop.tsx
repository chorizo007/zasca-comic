import { Link } from "react-router-dom";
import { site } from "../data/content";

export function Shop() {
  return (
    <>
      <div className="page-head">
        <div className="container">
          <p className="eyebrow">Tienda</p>
          <h1 className="page-title">Llévate el zasca a casa</h1>
          <p className="page-lead">
            Dos formas de leerlo: el papel, con su lomo encolado y su olor a
            tinta, y el PDF, que cabe en cualquier sitio y llega al momento.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="panel-grid">
            <div className="panel">
              <p className="panel-kicker">Edición impresa</p>
              <h2>En papel, para oler la tinta</h2>
              <p>
                Cada número se imprime a todo color y con lomo encolado. Los
                pedidos se gestionan desde la tienda Sumup de la asociación.
              </p>
              <ul>
                <li>Formato comic-book y 17 × 24 cm según el número</li>
                <li>Lomo encolado a todo color</li>
                <li>Envíos a España</li>
                <li>Suscripción anual de 4 números</li>
              </ul>
              <div className="btn-wrap">
                <a
                  className="btn btn--primary"
                  href={site.links.shop}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ir a la tienda Sumup
                </a>
              </div>
            </div>

            <div className="panel panel--dark">
              <p className="panel-kicker">Edición digital</p>
              <h2>En PDF, para leer donde sea</h2>
              <p>
                Descarga inmediata en Payhip. La mayoría de los números están a
                2 €, y el catálogo completo está en la misma tienda.
              </p>
              <ul>
                <li>PDF a todo color</li>
                <li>Descarga inmediata tras la compra</li>
                <li>Números sueltos y colección completa</li>
              </ul>
              <div className="btn-wrap">
                <a
                  className="btn"
                  href={site.links.digital}
                  target="_blank"
                  rel="noreferrer"
                >
                  Comprar en Payhip
                </a>
              </div>
            </div>
          </div>

          <div className="panel mt-4">
            <p className="panel-kicker">Suscripción</p>
            <h2>Suscríbete por un año y ahorra</h2>
            <p>
              Cuatro números al año en tu domicilio. Te ahorras las subidas del
              impresor y los gastos de envío, y cada entrega llega
              automáticamente: no tienes que hacer nada más.
            </p>
            <ul>
              <li>Cuatro entregas anuales</li>
              <li>Envío incluido</li>
              <li>Los números nuevos llegan solos</li>
            </ul>
            <div className="btn-wrap">
              <a
                className="btn btn--primary"
                href={site.links.subscription}
                target="_blank"
                rel="noreferrer"
              >
                Suscribirme
              </a>
              <Link className="btn" to="/numeros">
                Ver el catálogo
              </Link>
            </div>
          </div>

          <p className="note">
            Los pedidos en papel se preparan por tandas; revisa la fecha de
            envío en la ficha de cada número. Para cualquier duda, escribe a{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
