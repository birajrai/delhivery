import assert from "node:assert/strict";
import test from "node:test";
import { DelhiveryClient } from "../dist/index.js";

function createClient() {
  const calls = [];
  const client = new DelhiveryClient({
    token: "test-token",
    fetch: async (url, init) => {
      calls.push({ url: new URL(url), init });
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    },
  });
  return { client, calls };
}

test("uses production origin and wraps serviceability", async () => {
  const { client, calls } = createClient();
  await client.serviceability.check("110001");
  assert.equal(calls[0].url.origin, "https://track.delhivery.com");
  assert.equal(calls[0].url.pathname, "/c/api/pin-codes/json/");
  assert.equal(calls[0].url.searchParams.get("filter_codes"), "110001");
  assert.equal(calls[0].init.headers.Authorization, "Token test-token");
});

test("tracking adds waybill and token query params", async () => {
  const { client, calls } = createClient();
  await client.tracking.track("1234567890");
  assert.equal(calls[0].url.pathname, "/api/v1/packages/json/");
  assert.equal(calls[0].url.searchParams.get("waybill"), "1234567890");
  assert.equal(calls[0].url.searchParams.get("token"), "test-token");
});

test("supports staging and caller-provided base URLs", async () => {
  const calls = [];
  const client = new DelhiveryClient({
    token: "test-token",
    environment: "staging",
    baseUrl: "https://custom.example/api/",
    fetch: async (url) => {
      calls.push(new URL(url));
      return new Response("{}", { status: 200 });
    },
  });
  await client.serviceability.check(100001);
  assert.equal(calls[0].origin, "https://custom.example");
  assert.equal(calls[0].pathname, "/api/c/api/pin-codes/json/");
});

test("manifests shipments in the documented form shape", async () => {
  const { client, calls } = createClient();
  const manifest = { pickup_location: { name: "Warehouse" }, shipments: [] };
  await client.shipments.create(manifest);
  assert.equal(calls[0].url.pathname, "/api/cmu/create.json");
  assert.equal(calls[0].init.method, "POST");
  assert.match(calls[0].init.headers["Content-Type"], /application\/x-www-form-urlencoded/);
  const form = new URLSearchParams(calls[0].init.body);
  assert.equal(form.get("format"), "json");
  assert.equal(form.get("data"), JSON.stringify(manifest));
});
