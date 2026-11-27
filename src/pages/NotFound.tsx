import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="not-found container">
      <h1>Esa viñeta no existe</h1>
      <p className="page-lead" style={{ margin: "0 auto 26px" }}>
        La página que buscas no está en este número. Prueba con el catálogo: ahí
        están todos los zascas publicados.
      </p>
      <Link className="btn btn--primary" to="/numeros">
        Volver al catálogo
      </Link>
    </div>
  );
}
