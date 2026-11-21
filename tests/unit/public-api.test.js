import { test } from "node:test";
import assert from "node:assert/strict";
import scrape, { getReviews, parseJsonp, extractDataFromApiResponse, buildProductJson } from "../../index.js";
import { get } from "../../src/reviews.js";
import * as parsers from "../../src/parsers.js";
import * as transform from "../../src/transform.js";

test("the public entry exposes the helpers used by the crawler", () => {
  assert.equal(getReviews, get);
  assert.equal(parseJsonp, parsers.parseJsonp);
  assert.equal(extractDataFromApiResponse, parsers.extractDataFromApiResponse);
  assert.equal(buildProductJson, transform.buildProductJson);
});

test("the default scraper still rejects a missing product ID before launching a browser", async () => {
  await assert.rejects(scrape(), /valid product id/);
});
