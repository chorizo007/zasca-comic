import { Link, useParams } from "react-router-dom";
import { issues } from "../data/content";
import { AuthorChip, BuyButtons, Cover, Rich } from "../components/ui";

export function IssueDetail() {
  const { num } = useParams();
  const issue = issues.find((item) => item.num === Number(num));

  if (!issue) {
    return (
      <div className="not-found container">
        <h1>Ese zasca no existe</h1>
        <p className="page-lead" style={{ margin: "0 auto 26px" }}>
          Puede que el número todavía no se haya publicado o que el enlace esté
          mal. En el catálogo están todos los que hay.
        </p>
        <Link className="btn btn--primary" to="/numeros">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const index = issues.indexOf(issue);
  const newer = index > 0 ? issues[index - 1] : undefined;
  const older = index < issues.length - 1 ? issues[index + 1] : undefined;

  return (
    <>
      <div className="container">
        <nav className="crumbs" aria-label="Migas de pan">
          <Link to="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <Link to="/numeros">Números</Link>
          <span aria-hidden="true">/</span>
          <span>Nº{issue.num}</span>
        </nav>

        <div className="detail-hero">
          <Cover issue={issue} priority />

          <div>
            <p className="eyebrow">
              Nº{issue.num} · {issue.date}
            </p>
            <h1 className="detail-title">
              <span className="num">Nº{issue.num}</span> {issue.title}
            </h1>

            {issue.tagline && <p className="pullquote">{issue.tagline}</p>}

            <dl className="fact-list">
              {issue.pages && (
                <>
                  <dt>Páginas</dt>
                  <dd>{issue.pages} a todo color</dd>
                </>
              )}
              {issue.format && (
                <>
                  <dt>Formato</dt>
                  <dd>{issue.format}</dd>
                </>
              )}
              {issue.pricePaper && (
                <>
                  <dt>Papel</dt>
                  <dd>{issue.pricePaper}</dd>
                </>
              )}
              {issue.priceDigital && (
                <>
                  <dt>Digital</dt>
                  <dd>{issue.priceDigital}</dd>
                </>
              )}
            </dl>

            <BuyButtons issue={issue} />

            {issue.links.post && (
              <p className="note">
                <a
                  href={issue.links.post}
                  target="_blank"
                  rel="noreferrer"
                  className="link-arrow"
                >
                  Ver la entrada original
                </a>
              </p>
            )}
          </div>
        </div>

        <div className="detail-body">
          {issue.intro && issue.intro.length > 0 ? (
            <div className="split">
              <div className="editorial">
                {issue.intro.map((paragraph, paragraphIndex) => (
                  <p
                    key={paragraphIndex}
                    className={paragraphIndex === 0 ? "dropcap" : undefined}
                  >
                    <Rich text={paragraph} />
                  </p>
                ))}
                {issue.sign && <p className="sign">{issue.sign}</p>}
              </div>

              <div className="stack-lg">
                {issue.contents && (
                  <div className="contents-card">
                    <h3>{issue.contentsTitle ?? "Índice"}</h3>
                    <ul className="contents">
                      {issue.contents.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {issue.authors && (
                  <div className="contents-card">
                    <h3>Autores</h3>
                    <div className="chips">
                      {issue.authors.map((author) => (
                        <AuthorChip name={author} key={author} />
                      ))}
                    </div>
                  </div>
                )}

                {issue.credits && (
                  <div className="contents-card">
                    <h3>Créditos</h3>
                    <ul className="contents">
                      {issue.credits.map((credit) => (
                        <li key={credit}>{credit}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="split">
              <div className="editorial">
                <p className="dropcap">
                  {issue.summary ??
                    "Este número forma parte del catálogo de Zasca! Cómic y está disponible en la tienda."}
                </p>
                <p className="sign">
                  Asociación Zasca Cómic · {issue.date}
                </p>
              </div>

              <div className="contents-card">
                <h3>Cómo conseguirlo</h3>
                <ul className="contents">
                  <li>Edición en papel en la tienda Sumup</li>
                  <li>Edición digital en Payhip</li>
                  <li>Suscripción anual: 4 números</li>
                </ul>
                <Link className="link-arrow" to="/tienda" style={{ marginTop: 18 }}>
                  Ver opciones de compra
                </Link>
              </div>
            </div>
          )}

          <div className="pager">
            {newer ? (
              <Link to={`/numeros/${newer.num}`}>
                <span>←</span> Nº{newer.num} · {newer.title}
              </Link>
            ) : (
              <span />
            )}
            {older ? (
              <Link to={`/numeros/${older.num}`}>
                Nº{older.num} · {older.title} <span>→</span>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
