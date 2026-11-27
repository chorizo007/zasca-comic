import { issues } from "../data/content";
import { IssueCard } from "../components/ui";

export function Issues() {
  const years = Array.from(new Set(issues.map((issue) => issue.year))).sort(
    (a, b) => b - a,
  );

  return (
    <>
      <div className="page-head">
        <div className="container">
          <p className="eyebrow">Catálogo completo</p>
          <h1 className="page-title">Todos los zascas</h1>
          <p className="page-lead">
            De la entrega cero al último monográfico. Cada número tiene su
            editorial, su índice y sus enlaces de compra en papel y en digital.
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
              <div className="issue-grid">
                {issues
                  .filter((issue) => issue.year === year)
                  .map((issue) => (
                    <IssueCard key={issue.num} issue={issue} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
