import { news, site } from "../data/content";

export function News() {
  const years = Array.from(new Set(news.map((item) => item.year))).sort(
    (a, b) => b - a,
  );

  return (
    <>
      <div className="page-head">
        <div className="container">
          <p className="eyebrow">Archivo</p>
          <h1 className="page-title">Actualidad</h1>
          <p className="page-lead">
            Apariciones, colaboraciones, avances y regalos. Las entradas que no
            son números de la revista, con enlace a su publicación original.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {years.map((year) => (
            <div className="year-block" key={year}>
              <div className="year-label">
                <h2>{year}</h2>
              </div>
              <div className="news-list">
                {news
                  .filter((item) => item.year === year)
                  .map((item) => (
                    <div className="news-item" key={item.url}>
                      <time>{item.date}</time>
                      <a href={item.url} target="_blank" rel="noreferrer">
                        {item.title}
                      </a>
                      <span className="arrow" aria-hidden="true">
                        ↗
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))}

          <p className="note">
            El archivo completo, con todas las entradas desde 2022, sigue en{" "}
            <a href={site.links.blog} target="_blank" rel="noreferrer">
              zascacomic.blogspot.com
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
