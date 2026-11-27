import { zascandiles } from "../data/authors";
import { site } from "../data/content";

export function Zascandiles() {
  return (
    <>
      <div className="page-head">
        <div className="container">
          <p className="eyebrow">La legión</p>
          <h1 className="page-title">Zascandiles</h1>
          <p className="page-lead">
            Las manos que hacen Zasca! Cómic número a número. Pincha en
            cualquiera para ir a su Instagram (o a su web, si es donde mejor se
            explica).
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <ul className="zascandil-grid">
            {zascandiles.map((zascandil) => (
              <li key={zascandil.name}>
                <a
                  className="zascandil-card"
                  href={zascandil.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="zascandil-name">{zascandil.name}</span>
                  <span className="zascandil-meta">
                    {zascandil.network} · {zascandil.handle}
                  </span>
                  <span className="zascandil-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <p className="note">
            ¿Colaboras en Zasca y falta tu enlace?{" "}
            <a href={`mailto:${site.email}`}>Escríbenos</a> y lo añadimos.
          </p>
        </div>
      </section>
    </>
  );
}
