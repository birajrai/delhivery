# Delhivery API Client

An **unofficial** TypeScript/Node.js client foundation for calling Delhivery APIs.
It is not published or endorsed by Delhivery. API availability, base URLs,
authentication, endpoints, and payloads can vary by account and API version;
confirm them in your Delhivery One developer portal before use.

## Install

```sh
npm install delhivery-api-client
```

## Use

```ts
import { DelhiveryClient } from "delhivery-api-client";

const client = new DelhiveryClient({
  baseUrl: process.env.DELHIVERY_API_BASE_URL!,
  token: process.env.DELHIVERY_API_TOKEN!,
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

## Official documentation

- [Delhivery One API token setup](https://help.delhivery.com/docs/api-token-generation)
- [Client Developer Portal](https://help.delhivery.com/docs/client-developer-portal-1)
- [Delhivery One help index](https://help.delhivery.com/llms.txt)

The authenticated developer portal provides environment URLs, endpoint
specifications, request/response schemas, validations, and a staging tester.
