import { site } from "../data/content";

export function Join() {
  return (
    <>
      <div className="page-head">
        <div className="container">
          <p className="eyebrow">Asociación Zasca Cómic</p>
          <h1 className="page-title">Hazte zascandil</h1>
          <p className="page-lead">
            Zasca! Cómic se construye entre muchas manos. Si dibujas,
            guionizas o quieres ayudar a que la revista siga saliendo, este es
            el camino.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="split">
            <div>
              <div className="steps">
                <div className="step">
                  <span className="step-num">01</span>
                  <div>
                    <h3>Rellena el formulario</h3>
                    <p>
                      Cuéntanos quién eres y qué haces. El formulario es la vía
                      de entrada a la asociación.
                    </p>
                  </div>
                </div>

                <div className="step">
                  <span className="step-num">02</span>
                  <div>
                    <h3>Mira los formatos</h3>
                    <p>
                      Antes de enviar páginas, revisa la guía de material para
                      autores: medidas, resolución y cómo se entrega el trabajo.
                    </p>
                  </div>
                </div>

                <div className="step">
                  <span className="step-num">03</span>
                  <div>
                    <h3>Entra en el siguiente número</h3>
                    <p>
                      Cada entrega es un monográfico con un tema común. Cuando
                      hay convocatoria, se avisa a los socios y se reparten las
                      secciones.
                    </p>
                  </div>
                </div>
              </div>

              <div className="buy-row">
                <a
                  className="btn btn--primary"
                  href={site.links.join}
                  target="_blank"
                  rel="noreferrer"
                >
                  Formulario de inscripción
                </a>
                <a
                  className="btn"
                  href={site.links.authors}
                  target="_blank"
                  rel="noreferrer"
                >
                  Material para autores
                </a>
              </div>
            </div>

            <div className="contents-card">
              <h3>Contacto</h3>
              <ul className="contents">
                <li>{site.address}</li>
                <li>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
                <li>
                  <a
                    href={site.links.association}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Página de la asociación
                  </a>
                </li>
              </ul>

              <h3 style={{ marginTop: 26 }}>Redes</h3>
              <div className="chips">
                {site.socials
                  .filter((social) => social.label !== "Email")
                  .map((social) => (
                    <a
                      className="chip"
                      key={social.label}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: "none" }}
                    >
                      {social.label}
                    </a>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
