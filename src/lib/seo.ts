import { issues, news, site, type Issue } from "../data/content";

export type JsonLd = Record<string, unknown>;

export type Seo = {
  title: string;
  description: string;
  path: string;
  url: string;
  image: string;
  type: "website" | "article";
  noindex?: boolean;
  jsonLd: JsonLd[];
};

const MONTHS: Record<string, string> = {
  enero: "01",
  febrero: "02",
  marzo: "03",
  abril: "04",
  mayo: "05",
  junio: "06",
  julio: "07",
  agosto: "08",
  septiembre: "09",
  octubre: "10",
  noviembre: "11",
  diciembre: "12",
};

const SITE_NAME = "Zasca! Cómic";

/** "Septiembre 2026" → "2026-09-01"; "2022" → "2022-01-01". */
export function issueIsoDate(date: string): string {
  const parts = date.trim().split(/\s+/);
  if (parts.length === 1) return `${parts[0]}-01-01`;
  const month = MONTHS[parts[0].toLowerCase()] ?? "01";
  return `${parts[1]}-${month}-01`;
}

export function plainText(text: string): string {
  return text
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function clip(text: string, max = 158): string {
  const clean = plainText(text);
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const space = cut.lastIndexOf(" ");
  return `${cut.slice(0, space > 60 ? space : max).trim()}…`;
}

function abs(origin: string, path: string): string {
  const base = origin.replace(/\/+$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function organization(origin: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Asociación Zasca Cómic",
    alternateName: SITE_NAME,
    url: abs(origin, "/"),
    logo: abs(origin, "/favicon.svg"),
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ronda Carlos III 32",
      postalCode: "28300",
      addressLocality: "Aranjuez",
      addressRegion: "Madrid",
      addressCountry: "ES",
    },
    sameAs: site.socials
      .filter((social) => social.url.startsWith("http"))
      .map((social) => social.url),
  };
}

function website(origin: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: abs(origin, "/"),
    inLanguage: "es-ES",
    publisher: { "@type": "Organization", name: "Asociación Zasca Cómic" },
  };
}

function breadcrumbs(
  origin: string,
  items: { name: string; path: string }[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: abs(origin, item.path),
    })),
  };
}

function publicationIssue(issue: Issue, origin: string): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "PublicationIssue",
    name: `Zasca! Cómic nº${issue.num}: ${issue.title}`,
    issueNumber: issue.num,
    datePublished: issueIsoDate(issue.date),
    url: abs(origin, `/numeros/${issue.num}`),
    image: issue.cover ? abs(origin, issue.cover) : undefined,
    numberOfPages: issue.pages,
    inLanguage: "es-ES",
    description: plainText(issue.tagline ?? issue.summary ?? ""),
    isPartOf: {
      "@type": "Periodical",
      name: SITE_NAME,
      url: abs(origin, "/numeros"),
    },
    publisher: {
      "@type": "Organization",
      name: "Asociación Zasca Cómic",
      url: abs(origin, "/asociacion"),
    },
  };
}

const STATIC_PAGES: Record<string, { title: string; description: string }> = {
  "/numeros": {
    title: "Todos los números",
    description:
      "Catálogo completo de Zasca! Cómic: todas las entregas monográficas, de «Origen» al último número. Editoriales, índices, autores y compra en papel o en digital.",
  },
  "/tienda": {
    title: "Tienda: papel, digital y suscripción",
    description:
      "Compra Zasca! Cómic en papel desde la tienda Sumup o descarga cada número en PDF desde Payhip. Suscripción anual de cuatro números con envío incluido.",
  },
  "/hazte-zascandil": {
    title: "Hazte zascandil",
    description:
      "Cómo entrar en la Asociación Zasca Cómic: formulario de alta, formatos de material para autores y participación en los próximos números.",
  },
  "/asociacion": {
    title: "La asociación",
    description:
      "Quiénes somos, dónde estamos y cómo se hace Zasca! Cómic: una revista colectiva de cómic de humor gamberro editada por la Asociación Zasca Cómic en Aranjuez.",
  },
  "/actualidad": {
    title: "Actualidad",
    description:
      "Apariciones, colaboraciones, avances y regalos de Zasca! Cómic, con enlace a la publicación original de cada entrada.",
  },
  "/newsletter": {
    title: "Boletín: aviso de cada número",
    description:
      "Un correo cuando sale un Zasca nuevo, con doble confirmación. Sin spam: solo avisos de nuevos números y baja con un clic.",
  },
  "/newsletter/confirmado": {
    title: "Confirma tu suscripción",
    description:
      "Te hemos enviado un correo con un enlace de confirmación para completar el alta en el boletín de Zasca! Cómic.",
  },
};

export const seoRoutes: string[] = [
  "/",
  ...Object.keys(STATIC_PAGES),
  ...issues.map((issue) => `/numeros/${issue.num}`),
];

export function seoFor(pathname: string, origin: string): Seo {
  const normalized = pathname.replace(/\/+$/, "");
  const path = normalized === "" ? "/" : normalized;
  const url = `${origin.replace(/\/+$/, "")}${path === "/" ? "/" : `${path}/`}`;
  const latest = issues[0];
  const defaultImage = abs(origin, latest.cover ?? "/portadas/18.jpg");

  if (path === "/") {
    return {
      title: `${SITE_NAME} — Revista de cómic de humor gamberro`,
      description: clip(
        `${plainText(site.about[0])} ${issues.length} números monográficos en papel y en digital.`,
      ),
      path,
      url,
      image: defaultImage,
      type: "website",
      jsonLd: [organization(origin), website(origin)],
    };
  }

  if (path === "/numeros") {
    return {
      title: `Todos los números · ${SITE_NAME}`,
      description: clip(
        `${STATIC_PAGES["/numeros"].description} ${issues.length} entregas publicadas.`,
      ),
      path,
      url,
      image: defaultImage,
      type: "website",
      jsonLd: [
        organization(origin),
        breadcrumbs(origin, [
          { name: "Inicio", path: "/" },
          { name: "Números", path: "/numeros" },
        ]),
      ],
    };
  }

  const issue = issues.find((item) => `/numeros/${item.num}` === path);
  if (issue) {
    const description = clip(
      [
        `Nº${issue.num} de Zasca! Cómic: ${issue.title}.`,
        `${issue.date}.`,
        issue.pages ? `${issue.pages} páginas a todo color.` : "",
        issue.tagline ?? issue.summary ?? "",
        "En papel y en digital.",
      ]
        .filter(Boolean)
        .join(" "),
      165,
    );

    return {
      title: `Nº${issue.num} · ${issue.title} | ${SITE_NAME}`,
      description,
      path,
      url,
      image: issue.cover ? abs(origin, issue.cover) : defaultImage,
      type: "article",
      jsonLd: [
        organization(origin),
        publicationIssue(issue, origin),
        breadcrumbs(origin, [
          { name: "Inicio", path: "/" },
          { name: "Números", path: "/numeros" },
          { name: `Nº${issue.num}`, path: `/numeros/${issue.num}` },
        ]),
      ],
    };
  }

  const page = STATIC_PAGES[path];
  if (page) {
    return {
      title: `${page.title} · ${SITE_NAME}`,
      description: clip(page.description),
      path,
      url,
      image: defaultImage,
      type: "website",
      noindex: path === "/newsletter/confirmado",
      jsonLd: [
        organization(origin),
        breadcrumbs(origin, [
          { name: "Inicio", path: "/" },
          { name: page.title, path },
        ]),
        ...(path === "/actualidad"
          ? [
              {
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                name: `Actualidad · ${SITE_NAME}`,
                url,
                inLanguage: "es-ES",
                about: `${news.length} entradas del archivo de Zasca! Cómic`,
              } satisfies JsonLd,
            ]
          : []),
      ],
    };
  }

  return {
    title: `Página no encontrada · ${SITE_NAME}`,
    description:
      "La página que buscas no está en este número. Vuelve al catálogo para ver todos los zascas publicados.",
    path,
    url,
    image: defaultImage,
    type: "website",
    noindex: true,
    jsonLd: [organization(origin)],
  };
}
