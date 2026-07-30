export const SITE_URL = "https://www.nooragencies.in";
export const SITE_NAME = "Noor Agencies";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
