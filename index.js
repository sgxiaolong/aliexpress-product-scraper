export { get as getReviews } from "./src/reviews.js";
export { parseJsonp, extractDataFromApiResponse } from "./src/parsers.js";
export { buildProductJson } from "./src/transform.js";

// Loading parsing helpers alone should not register a browser plugin.
export default async function AliexpressProductScraper(id, options) {
  const { default: scrape } = await import("./src/aliexpressProductScraper.js");
  return scrape(id, options);
}
