# Delhivery

An **unofficial** TypeScript/Node.js client foundation for calling Delhivery APIs.
It is not published or endorsed by Delhivery. API availability, base URLs,
authentication, endpoints, and payloads can vary by account and API version;
confirm them in your Delhivery One developer portal before use.

## Install

```sh
npm install delhivery
```

## Use

```ts
import { DelhiveryClient } from "delhivery";

const client = new DelhiveryClient({
  token: process.env.DELHIVERY_API_TOKEN!,
  // Optional. Defaults to the Delhivery Express production API.
  baseUrl: process.env.DELHIVERY_API_BASE_URL,
});

const serviceability = await client.serviceability.check("110001");
const tracking = await client.tracking.track("YOUR_WAYBILL");
```

The client sends `Authorization: Token <token>` by default. Verify the
authentication scheme and request format against the documentation available
to your account. Never bundle live API tokens into frontend code.

## Example

See [`examples/track-shipment.ts`](./examples/track-shipment.ts). The package
defaults to `https://track.delhivery.com` for production and supports the
official Express staging origin using `environment: "staging"`. A custom
`baseUrl` overrides either default. For other Delhivery One APIs, use the exact
base URL shown in your authenticated developer portal.

```sh
DELHIVERY_API_TOKEN="your-token"
WAYBILL="your-waybill-number"
# Optional: set to "staging" to use Delhivery's Express staging origin.
DELHIVERY_ENV="production"
```

The example expects TypeScript to be run with a TypeScript runner (for example,
`npx tsx examples/track-shipment.ts`) and the package to be installed. Add
`DELHIVERY_API_BASE_URL` only when using a custom Delhivery-provided origin.

Framework starter examples for [Express](./examples/express.ts),
[Fastify](./examples/fastify.ts), and [Hono](./examples/hono.ts), including
installation and run notes, are in [`examples/README.md`](./examples/README.md).

## API methods

The Express API helpers use the documented production/staging routes and
Delhivery One token header:

```ts
await client.serviceability.check("110001");
await client.waybills.fetch("YOUR_REGISTERED_CLIENT_NAME");
await client.waybills.fetchBulk("YOUR_REGISTERED_CLIENT_NAME", 10);
await client.shipments.create({ pickup_location: { name: "Warehouse" }, shipments: [] });
await client.tracking.track("WAYBILL");
await client.pickups.create({
  pickup_time: "18:30:00",
  pickup_date: "2026-12-01",
  pickup_location: "Warehouse",
  expected_package_count: 1,
});
await client.labels.packingSlip("WAYBILL");
await client.charges.estimate({
  md: "E",
  cgm: 500,
  o_pin: "110001",
  d_pin: "400001",
  ss: "Delivered",
});
await client.shipments.edit({ waybill: "WAYBILL", name: "Updated consignee" });
await client.shipments.cancel({ waybill: "WAYBILL" });
await client.shipments.updateNdr("WAYBILL", "RE-ATTEMPT");
```

The raw `client.request(path, options)` remains available for APIs not yet
wrapped. All response bodies are returned as-is so integrations can handle the
account-specific response shape. Rate estimates are approximate; serviceability,
account eligibility, required fields, and permitted shipment state transitions
are determined by Delhivery.

## Official documentation

- [Delhivery One API token setup](https://help.delhivery.com/docs/api-token-generation)
- [Client Developer Portal](https://help.delhivery.com/docs/client-developer-portal-1)
- [Official Express tracking API reference](https://delhivery-express-api-doc.readme.io/reference/order-tracking-api)
- [Express API integration guide and endpoint index](https://delhivery-express-api-doc.readme.io/llms.txt)
- [Delhivery One help index](https://help.delhivery.com/llms.txt)

The authenticated developer portal provides environment URLs, endpoint
specifications, request/response schemas, validations, and a staging tester.
