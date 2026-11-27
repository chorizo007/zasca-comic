import { Fragment, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { findZascandil } from "../data/authors";
import { marqueeWords, type Issue } from "../data/content";

/** Convierte *cursiva* y **negrita** en marcado real. */
export function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) {
          return <em key={index}>{part.slice(1, -1)}</em>;
        }
        return <Fragment key={index}>{part}</Fragment>;
      })}
    </>
  );
}

export function Cover({
  issue,
  priority = false,
  hero = false,
}: {
  issue: Issue;
  priority?: boolean;
  hero?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(issue.cover) && !failed;
  // En GitHub Pages el sitio cuelga de /nombre-del-repo/: las rutas de imagen
  // son cadenas en tiempo de ejecución, así que hay que anteponer la base.
  const coverSrc = issue.cover
    ? `${import.meta.env.BASE_URL}${issue.cover.replace(/^\/+/, "")}`
    : "";

  return (
    <div className={hero ? "cover cover--hero" : "cover"}>
      <div className="cover-frame">
        {showImage ? (
          <img
            src={coverSrc}
            alt={`Portada del Zasca! Cómic nº${issue.num}: ${issue.title}`}
            loading={priority ? "eager" : "lazy"}
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="cover-fallback" data-accent={issue.accent}>
            <span className="cf-kicker">Zasca! Cómic</span>
            <span className="cf-num">{issue.num}</span>
            <span className="cf-title">{issue.title}</span>
            <span className="cf-foot">Revista de cómic</span>
          </div>
        )}
      </div>
      {issue.isNew && <span className="sticker">Nuevo</span>}
    </div>
  );
}

/** Nombre de autor: enlace a su perfil si lo tiene, texto si no. */
export function AuthorChip({ name }: { name: string }) {
  const zascandil = findZascandil(name);

  if (!zascandil) {
    return <span className="chip">{name}</span>;
  }

  return (
    <a
      className="chip chip--link"
      href={zascandil.url}
      target="_blank"
      rel="noreferrer"
      title={`${zascandil.name} · ${zascandil.network}`}
    >
      {name}
      <span aria-hidden="true"> ↗</span>
    </a>
  );
}

export function IssueCard({ issue }: { issue: Issue }) {
  return (
    <Link to={`/numeros/${issue.num}`} className="issue-card">
      <Cover issue={issue} />
      <h3>{issue.title}</h3>
      <p className="card-meta">
        Nº{issue.num} · {issue.date}
      </p>
    </Link>
  );
}

export function SectionHead({
  eyebrow,
  title,
  sub,
  action,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  action?: ReactNode;
}) {
  return (
    <div className="section-head">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-title">{title}</h2>
        {sub && <p className="section-sub">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((group) => (
          <div className="marquee-group" key={group}>
            {marqueeWords.map((word) => (
              <span key={`${group}-${word}`}>{word}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function BuyButtons({ issue }: { issue: Issue }) {
  return (
    <div className="buy-row">
      {issue.links.paper && (
        <a
          className="btn btn--primary"
          href={issue.links.paper}
          target="_blank"
          rel="noreferrer"
        >
          Comprar en papel
        </a>
      )}
      {issue.links.digital && (
        <a className="btn" href={issue.links.digital} target="_blank" rel="noreferrer">
          Descargar en digital
        </a>
      )}
    </div>
  );
}
