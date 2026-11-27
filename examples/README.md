# Framework examples

The SDK and Delhivery token belong on the server. **Never import the SDK or put
the token in a React/Vue/browser bundle.** The server-rendered framework
examples add a tracking API route; the React, React Router, and Vue components
call that same-origin endpoint.

Install the SDK, the framework you want to try, and a TypeScript runner:

```sh
npm install delhivery
npm install express       # or: fastify, hono
npm install --save-dev tsx typescript
```

Choose a framework and install its dependencies as needed:

```sh
npm install next react react-dom
npm install react-router
npm install vue
npm install astro
npm install nuxt
npm install @sveltejs/kit
```

Set `DELHIVERY_API_TOKEN` only in the **server** environment. Optionally set
`DELHIVERY_ENV=staging` and `DELHIVERY_API_BASE_URL` for a custom origin.
For Nuxt, expose these as private `runtimeConfig` values (for example,
`delhiveryApiToken: process.env.DELHIVERY_API_TOKEN`) in `nuxt.config.ts`.

Run the selected example:

```sh
npx tsx examples/express.ts
npx tsx examples/fastify.ts
```

Hono exports a standard `Hono` app from `examples/hono.ts`; run it with the
adapter for your deployment target. For Node.js, install `@hono/node-server`
and serve the exported app using Hono's Node adapter.

Additional starters:

- Next.js App Router: `nextjs/app/api/tracking/[waybill]/route.ts`
- React component: `react/Tracking.tsx`
- React Router route module: `react-router/routes/tracking.tsx`
- Vue component: `vue/Tracking.vue`
- Astro API route: `astro/pages/api/tracking/[waybill].ts`
- Nuxt server API route: `nuxt/server/api/tracking/[waybill].get.ts`
- SvelteKit server endpoint: `sveltekit/src/routes/api/tracking/[waybill]/+server.ts`

Routes:

- `GET /serviceability/:pincode`
- `GET /tracking/:waybill`

These are starter snippets, not complete deployable applications. Add
application authentication/authorization, input validation, rate limiting,
logging, and framework-specific runtime configuration before deploying. Do
not expose a general-purpose proxy to Delhivery APIs or ship your API token to
browser/mobile clients.
