import { Link } from "react-router-dom";
import { issues, latestIssue, site } from "../data/content";
import {
  BuyButtons,
  Cover,
  IssueCard,
  Marquee,
  Rich,
  SectionHead,
} from "../components/ui";

export function Home() {
  const recent = issues.slice(0, 8);
  const intro = latestIssue.intro?.slice(0, 3) ?? [];

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">Revista de cómic · Aranjuez, desde 2022</p>
            <h1 className="hero-title">
              Humor gamberro, viñetas y mucho <span className="mark">zasca</span>.
            </h1>
            <p className="hero-lead">
              Una revista colectiva del 9.º arte: cada número es un monográfico
              dibujado por una legión de autores. Del terror a la sátira, de la
              línea clara al chiste malo bien contado.
            </p>
            <div className="hero-actions">
              <a
                className="btn btn--primary"
                href={latestIssue.links.paper}
                target="_blank"
                rel="noreferrer"
              >
                Comprar el nº{latestIssue.num}
              </a>
              <Link className="btn" to="/numeros">
                Ver todos los números
              </Link>
            </div>
            <div className="hero-stats">
              <div>
                <b>{issues.length}</b>
                <span>números publicados</span>
              </div>
              <div>
                <b>2 €</b>
                <span>cada número en digital</span>
              </div>
              <div>
                <b>Papel + PDF</b>
                <span>dos formatos</span>
              </div>
            </div>
          </div>

          <div className="hero-art">
            <Cover issue={latestIssue} priority hero />
            <p className="hero-art-note">
              Nº{latestIssue.num} · {latestIssue.date}
            </p>
          </div>
        </div>
      </section>

      <Marquee />

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow={`Nº${latestIssue.num} · ${latestIssue.date}`}
            title={latestIssue.title}
            sub={latestIssue.tagline}
            action={
              <Link className="link-arrow" to={`/numeros/${latestIssue.num}`}>
                Ver el número
              </Link>
            }
          />

          <div className="feature-grid">
            <div className="feature-cover">
              <Cover issue={latestIssue} />
            </div>

            <div>
              <dl className="fact-list">
                <dt>Publicado</dt>
                <dd>{latestIssue.date}</dd>
                {latestIssue.pages && (
                  <>
                    <dt>Páginas</dt>
                    <dd>{latestIssue.pages} a todo color</dd>
                  </>
                )}
                {latestIssue.format && (
                  <>
                    <dt>Formato</dt>
                    <dd>{latestIssue.format}</dd>
                  </>
                )}
                {latestIssue.priceDigital && (
                  <>
                    <dt>Digital</dt>
                    <dd>{latestIssue.priceDigital}</dd>
                  </>
                )}
                <dt>Papel</dt>
                <dd>Disponible en la tienda Sumup</dd>
              </dl>

              <BuyButtons issue={latestIssue} />
              <p className="note">
                También disponible la colección completa en papel y en digital.
                Los suscriptores anuales lo reciben en casa sin hacer nada más.
              </p>
            </div>
          </div>

          <div className="split mt-6">
            <div className="editorial">
              {intro.map((paragraph, index) => (
                <p key={index} className={index === 0 ? "dropcap" : undefined}>
                  <Rich text={paragraph} />
                </p>
              ))}
              <p className="sign">
                <Link to={`/numeros/${latestIssue.num}`}>
                  Leer el editorial completo →
                </Link>
              </p>
            </div>

            {latestIssue.contents && (
              <div className="contents-card">
                <h3>{latestIssue.contentsTitle ?? "Índice"}</h3>
                <ul className="contents">
                  {latestIssue.contents.slice(0, 10).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link
                  className="link-arrow"
                  to={`/numeros/${latestIssue.num}`}
                  style={{ marginTop: 18 }}
                >
                  Ver el índice completo
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Catálogo"
            title="Todos los zascas"
            sub="Diecinueve entregas, diecinueve temas. Cuentos clásicos, piratas, manga, Bruguera, música, monstruos de cine, ovnis y todo lo que se les ocurrió después."
            action={
              <Link className="link-arrow" to="/numeros">
                Ver los {issues.length} números
              </Link>
            }
          />
          <div className="issue-grid">
            {recent.map((issue) => (
              <IssueCard key={issue.num} issue={issue} />
            ))}
          </div>
        </div>
      </section>

      <section className="band">
        <div className="container band-grid">
          <div>
            <p className="eyebrow eyebrow--light">La asociación</p>
            <h2>Somos legión y estamos unidos contra una sola causa.</h2>
            <div className="band-links">
              <Link className="btn btn--yellow" to="/hazte-zascandil">
                Hazte zascandil
              </Link>
              <Link className="btn" to="/asociacion">
                Conocer el proyecto
              </Link>
            </div>
          </div>

          <div>
            {site.about.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta-inner">
          <div>
            <p className="eyebrow">Convocatoria abierta</p>
            <h2>¿Dibujas, guionizas o coleccionas zascas?</h2>
            <p>
              Cada número es un monográfico y se construye entre muchos autores.
              Rellena el formulario, revisa los formatos y súmate al siguiente.
            </p>
          </div>
          <a
            className="btn btn--dark"
            href={site.links.join}
            target="_blank"
            rel="noreferrer"
          >
            Rellenar el formulario
          </a>
        </div>
      </section>
    </>
  );
}
