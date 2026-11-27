import { Link } from "react-router-dom";
import { issues, site } from "../data/content";

export function About() {
  const firstYear = Math.min(...issues.map((issue) => issue.year));
  const lastYear = Math.max(...issues.map((issue) => issue.year));

  return (
    <>
      <div className="page-head">
        <div className="container">
          <p className="eyebrow">Quiénes somos</p>
          <h1 className="page-title">La asociación</h1>
          <p className="page-lead">
            Un grupo de autores del 9.º arte que publica una revista colectiva
            de cómic sin ánimo de lucro. Ni más, ni menos.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="split">
            <div className="prose">
              {site.about.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
              <p>
                Cada número se plantea como un monográfico: un tema, una
                portada, muchas miradas. Los beneficios se reinvierten en las
                actividades y publicaciones de la asociación.
              </p>

              <div className="hero-stats" style={{ marginTop: 30 }}>
                <div>
                  <b>{issues.length}</b>
                  <span>números publicados</span>
                </div>
                <div>
                  <b>
                    {firstYear}–{lastYear}
                  </b>
                  <span>años en marcha</span>
                </div>
                <div>
                  <b>4</b>
                  <span>números al año</span>
                </div>
              </div>

              <div className="buy-row">
                <Link className="btn btn--primary" to="/hazte-zascandil">
                  Hazte zascandil
                </Link>
                <a
                  className="btn"
                  href={site.links.blog}
                  target="_blank"
                  rel="noreferrer"
                >
                  Archivo del blog
                </a>
              </div>
            </div>

            <div className="stack-lg">
              <div className="contents-card">
                <h3>Dónde estamos</h3>
                <ul className="contents">
                  <li>{site.address}</li>
                  <li>
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </li>
                </ul>
              </div>

              <div className="contents-card">
                <h3>Síguenos</h3>
                <div className="social-list">
                  {site.socials.map((social) => (
                    <a
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="label">{social.label}</span>
                      <span className="handle">{social.handle}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="contents-card">
                <h3>Para autores</h3>
                <p style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
                  Formatos, medidas y entrega de material para participar en los
                  próximos números.
                </p>
                <a
                  className="link-arrow"
                  href={site.links.authors}
                  target="_blank"
                  rel="noreferrer"
                  style={{ marginTop: 14 }}
                >
                  Ver material para autores
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
