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

// Pass the exact path, query, and payload documented for your account.
const result = await client.request("documented/endpoint", {
  method: "GET",
  query: { example: "value" },
});
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

## Official documentation

- [Delhivery One API token setup](https://help.delhivery.com/docs/api-token-generation)
- [Client Developer Portal](https://help.delhivery.com/docs/client-developer-portal-1)
- [Official Express tracking API reference](https://delhivery-express-api-doc.readme.io/reference/order-tracking-api)
- [Delhivery One help index](https://help.delhivery.com/llms.txt)

The authenticated developer portal provides environment URLs, endpoint
specifications, request/response schemas, validations, and a staging tester.
