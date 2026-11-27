export type Zascandil = {
  name: string;
  /** Red social o web donde publica. */
  network: string;
  /** Texto visible bajo el nombre, p. ej. "@cardo_boceteador". */
  handle: string;
  url: string;
  /** Variantes con las que aparece en los índices de los números. */
  aliases?: string[];
};

/**
 * Zascandiles con perfil público confirmado. Los alias son las formas que usan
 * las fichas de los números ("Varela", "Pozo", "JM"…), para que el enlace
 * funcione también cuando el nombre va abreviado.
 */
export const zascandiles: Zascandil[] = [
  {
    name: "Bruno Simón",
    network: "Instagram",
    handle: "@15_year_gordo",
    url: "https://www.instagram.com/15_year_gordo/",
  },
  {
    name: "By Raiz",
    network: "Instagram",
    handle: "@javierraiz",
    url: "https://www.instagram.com/javierraiz/",
    aliases: ["Raiz"],
  },
  {
    name: "Carlos Cardo",
    network: "Instagram",
    handle: "@cardo_boceteador",
    url: "https://www.instagram.com/cardo_boceteador/",
    aliases: ["Cardo"],
  },
  {
    name: "Carlus",
    network: "Instagram",
    handle: "@carlus_comics",
    url: "https://www.instagram.com/carlus_comics/",
  },
  {
    name: "Colorín",
    network: "Instagram",
    handle: "@colorincaricatura",
    url: "https://www.instagram.com/colorincaricatura/",
  },
  {
    name: "Fernando Varela",
    network: "Instagram",
    handle: "@varela_ilustrador",
    url: "https://www.instagram.com/varela_ilustrador/",
    aliases: ["Varela"],
  },
  {
    name: "Fritz",
    network: "Instagram",
    handle: "@danielartilesrodriguez",
    url: "https://www.instagram.com/danielartilesrodriguez/",
  },
  {
    name: "Gil y Pollos",
    network: "Blog",
    handle: "gilypollos.blogspot.com",
    url: "https://gilypollos.blogspot.com/",
    aliases: ["Gil&Pollos"],
  },
  {
    name: "Iván García",
    network: "Instagram",
    handle: "@ivangarciaaguado",
    url: "https://www.instagram.com/ivangarciaaguado/",
  },
  {
    name: "J.J. Ace&Tuna",
    network: "Instagram",
    handle: "@ace.y.tuna",
    url: "https://www.instagram.com/ace.y.tuna/",
    aliases: ["J.J.", "JJ"],
  },
  {
    name: "JM Studios",
    network: "Instagram",
    handle: "@jmstudios81",
    url: "https://www.instagram.com/jmstudios81/",
    aliases: ["JM"],
  },
  {
    name: "Jodri",
    network: "Instagram",
    handle: "@jodricomic",
    url: "https://www.instagram.com/jodricomic/",
    aliases: ["Jodri Riba"],
  },
  {
    name: "Juan Alcudia",
    network: "Instagram",
    handle: "@elchinodepelocrespo",
    url: "https://www.instagram.com/elchinodepelocrespo/",
  },
  {
    name: "Kuso",
    network: "Instagram",
    handle: "@kusodibujo",
    url: "https://www.instagram.com/kusodibujo/",
  },
  {
    name: "Lex Gromiko",
    network: "Instagram",
    handle: "@las_lexadas",
    url: "https://www.instagram.com/las_lexadas/",
    aliases: ["Lex"],
  },
  {
    name: "Luis Pozo",
    network: "Instagram",
    handle: "@luisnpozo",
    url: "https://www.instagram.com/luisnpozo/",
    aliases: ["Pozo"],
  },
  {
    name: "Merino",
    network: "Instagram",
    handle: "@merimonas",
    url: "https://www.instagram.com/merimonas/",
    aliases: ["David Merino"],
  },
  {
    name: "Mikelcatoons",
    network: "Instagram",
    handle: "@mikelcatoons",
    url: "https://www.instagram.com/mikelcatoons/",
    aliases: ["Mikelca"],
  },
  {
    name: "Oscar Alajarín",
    network: "Instagram",
    handle: "@oscar.alajarin",
    url: "https://www.instagram.com/oscar.alajarin/",
    aliases: ["Óscar Alajarín"],
  },
  {
    name: "Rocío Gemma Pérez Fdez.",
    network: "Instagram",
    handle: "@rociogemma_art",
    url: "https://www.instagram.com/rociogemma_art/",
    aliases: ["Rocío", "Rocío Pérez"],
  },
  {
    name: "Rubén F.",
    network: "Instagram",
    handle: "@rubenf.pintamonigotes",
    url: "https://www.instagram.com/rubenf.pintamonigotes/",
    aliases: ["Rubén Franco", "Rubén F"],
  },
  {
    name: "Teresa Castro",
    network: "Instagram",
    handle: "@tcastrocomics",
    url: "https://www.instagram.com/tcastrocomics/",
  },
  {
    name: "Tiracajas",
    network: "Instagram",
    handle: "@tiracajas",
    url: "https://www.instagram.com/tiracajas/",
  },
  {
    name: "Violeta Latorre",
    network: "Instagram",
    handle: "@violeta_ilustracion",
    url: "https://www.instagram.com/violeta_ilustracion/",
  },
  {
    name: "Xurxo",
    network: "Instagram",
    handle: "@xurxovinetas",
    url: "https://www.instagram.com/xurxovinetas/",
  },
];

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");

const byAlias = new Map<string, Zascandil>();
for (const zascandil of zascandiles) {
  byAlias.set(normalize(zascandil.name), zascandil);
  for (const alias of zascandil.aliases ?? []) {
    byAlias.set(normalize(alias), zascandil);
  }
}

/** Devuelve la ficha del autor a partir del nombre tal y como sale en la revista. */
export function findZascandil(name: string): Zascandil | undefined {
  return byAlias.get(normalize(name));
}
