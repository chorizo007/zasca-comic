import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { seoFor, type Seo as SeoData } from "../lib/seo";

const BASE = import.meta.env.BASE_URL.replace(/\/+$/, "");

const ORIGIN =
  (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/+$/, "") ||
  (typeof window !== "undefined"
    ? `${window.location.origin}${BASE}`
    : "http://localhost:5173");

function setMeta(
  key: string,
  content: string,
  attribute: "name" | "property" = "name",
) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function applySeo(seo: SeoData) {
  document.title = seo.title;

  setMeta("description", seo.description);
  setMeta("robots", seo.noindex ? "noindex, nofollow" : "index, follow");

  setMeta("og:type", seo.type, "property");
  setMeta("og:site_name", "Zasca! Cómic", "property");
  setMeta("og:locale", "es_ES", "property");
  setMeta("og:title", seo.title, "property");
  setMeta("og:description", seo.description, "property");
  setMeta("og:url", seo.url, "property");
  setMeta("og:image", seo.image, "property");
  setMeta("og:image:alt", `Portada de ${seo.title}`, "property");

  setMeta("twitter:card", "summary_large_image");
  setMeta("twitter:title", seo.title);
  setMeta("twitter:description", seo.description);
  setMeta("twitter:image", seo.image);
  setMeta("twitter:image:alt", `Portada de ${seo.title}`);

  let canonical = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = seo.url;

  let structuredData = document.getElementById("ld-json");
  if (!structuredData) {
    structuredData = document.createElement("script");
    structuredData.id = "ld-json";
    structuredData.setAttribute("type", "application/ld+json");
    document.head.appendChild(structuredData);
  }
  structuredData.textContent = JSON.stringify(
    seo.jsonLd.length === 1 ? seo.jsonLd[0] : seo.jsonLd,
  );
}

/** Actualiza la cabecera del documento en cada navegación del cliente. */
export function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    applySeo(seoFor(pathname, ORIGIN));
  }, [pathname]);

  return null;
}
