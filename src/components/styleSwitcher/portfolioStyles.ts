// The three visual styles the home page can be rendered in. The content is the
// same for all of them (src/data/profile.ts); only the design changes.

export type PortfolioStyleId = "bento" | "glass" | "brutal";

export type PortfolioStyle = {
  id: PortfolioStyleId;
  name: string;
  tagline: string;
  description: string;
};

export const portfolioStyles: PortfolioStyle[] = [
  {
    id: "bento",
    name: "Bento Grid",
    tagline: "Dark mode · modular cards",
    description:
      "Apple and Linear-inspired grid of cards in a calm dark theme with a single lime accent.",
  },
  {
    id: "glass",
    name: "Liquid Glass",
    tagline: "Frosted glass · vivid light",
    description:
      "Translucent panels floating over a slowly moving gradient, inspired by Apple's newest interface.",
  },
  {
    id: "brutal",
    name: "Neo-Brutalism",
    tagline: "Bold type · hard shadows",
    description:
      "Oversized type, thick borders, flat bright colors and sticker-like details on cream paper.",
  },
];

// Key used to remember the visitor's choice in localStorage
export const STYLE_STORAGE_KEY = "portfolio-style";

// Query parameter that opens the page in a given style (e.g. /?style=glass)
export const STYLE_QUERY_PARAM = "style";

export const isPortfolioStyleId = (
  value: unknown
): value is PortfolioStyleId =>
  portfolioStyles.some((style) => style.id === value);

export const getPortfolioStyle = (id: PortfolioStyleId): PortfolioStyle =>
  portfolioStyles.find((style) => style.id === id) ?? portfolioStyles[0];

// Runs inline (from _document) before the first paint of the home page, so
// returning visitors don't see the style picker flash before their saved style
// loads. It only marks <html>; the CSS in themes/_switcher.scss does the rest.
export const restoreStyleScript = `(function(){try{if(window.location.pathname!=="/")return;var ids=${JSON.stringify(
  portfolioStyles.map((style) => style.id)
)};var q=new URLSearchParams(window.location.search).get("${STYLE_QUERY_PARAM}");var s=ids.indexOf(q)>-1?q:window.localStorage.getItem("${STYLE_STORAGE_KEY}");if(ids.indexOf(s)>-1){document.documentElement.setAttribute("data-portfolio-style",s);}}catch(e){}})();`;
