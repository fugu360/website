type SeoOptions = {
  title: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogUrl?: string;
};

const ensureMeta = (attr: "name" | "property", key: string, value: string) => {
  const selector = `meta[${attr}="${key}"]`;
  let element = document.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", value);
};

const ensureLink = (rel: string, href: string) => {
  const selector = `link[rel="${rel}"]`;
  let element = document.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
};

export const baseKeywords =
  "Benjamin Oehrli, Portfolio, Finance, Financial Management, Master of Science, BWL, Business Administration, Operations Research, ESG, Python, Datenanalyse, Quantitative Finance";

export const setSeo = ({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  ogUrl,
}: SeoOptions) => {
  document.title = title;

  if (description) {
    ensureMeta("name", "description", description);
  }

  if (keywords) {
    ensureMeta("name", "keywords", keywords);
  }

  if (canonical) {
    ensureLink("canonical", canonical);
  }

  ensureMeta("property", "og:title", ogTitle ?? title);

  if (ogDescription ?? description) {
    ensureMeta("property", "og:description", ogDescription ?? description ?? "");
  }

  if (ogUrl ?? canonical) {
    ensureMeta("property", "og:url", ogUrl ?? canonical ?? "");
  }

  ensureMeta("name", "twitter:card", "summary");
  ensureMeta("name", "twitter:title", ogTitle ?? title);

  if (ogDescription ?? description) {
    ensureMeta("name", "twitter:description", ogDescription ?? description ?? "");
  }

  if (ogUrl ?? canonical) {
    ensureMeta("name", "twitter:url", ogUrl ?? canonical ?? "");
  }
};
