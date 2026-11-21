import test from "node:test";
import assert from "node:assert/strict";

test("optional reviews tolerate network, body, HTTP and timeout failures", async t => {
  let fetchFixture;
  t.mock.module("node-fetch", { defaultExport: (...args) => fetchFixture(...args) });
  const { get } = await import("../../src/reviews.js");
  const args = { productId: "fixture", total: 21, limit: 21, timeoutMs: 5 };
  const untilAbort = signal => new Promise((_, reject) => {
    signal.addEventListener("abort", () => reject(signal.reason), { once: true });
  });
  for (const fixture of [
    async () => {
      throw Error("fixture network");
    },
    async () => ({ ok: false, status: 500 }),
    async () => ({ ok: true, json: async () => {
      throw SyntaxError("fixture JSON");
    } }),
    (_url, { signal }) => untilAbort(signal),
    async (_url, { signal }) => ({ ok: true, json: () => untilAbort(signal) }),
  ]) {
    fetchFixture = fixture;
    assert.deepEqual(await get(args), []);
  }
  let page = 0;
  fetchFixture = async () => {
    if (++page > 1) {
      throw Error("fixture second page");
    }
    return { ok: true, json: async () => ({ data: { evaViewList: [{ buyerName: "fixture", buyerEval: 100 }] } }) };
  };
  assert.equal((await get(args)).length, 1);
});
