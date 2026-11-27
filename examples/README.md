# Server framework examples

These TypeScript examples keep the Delhivery token on the server and expose
small serviceability and tracking endpoints. They are examples only: add your
own application authentication, authorization, input validation, rate limits,
and error handling before deploying.

Install the SDK, the framework you want to try, and a TypeScript runner:

```sh
npm install delhivery
npm install express       # or: fastify, hono
npm install --save-dev tsx typescript
```

Set `DELHIVERY_API_TOKEN` in the server environment. Optionally set
`DELHIVERY_ENV=staging`, `DELHIVERY_API_BASE_URL` for a custom origin, and
`PORT`.

Run the selected example:

```sh
npx tsx examples/express.ts
npx tsx examples/fastify.ts
```

Hono exports a standard `Hono` app from `examples/hono.ts`; run it with the
adapter for your deployment target. For Node.js, install `@hono/node-server`
and serve the exported app using Hono's Node adapter.

Routes:

- `GET /serviceability/:pincode`
- `GET /tracking/:waybill`

Do not expose a general-purpose proxy to Delhivery APIs or ship your API token
to browser/mobile clients.
