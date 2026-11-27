import Fastify from "fastify";
import { DelhiveryClient } from "delhivery";

const token = process.env.DELHIVERY_API_TOKEN;
if (!token) throw new Error("Set DELHIVERY_API_TOKEN before starting the server.");

const delhivery = new DelhiveryClient({
  token,
  environment: process.env.DELHIVERY_ENV === "staging" ? "staging" : "production",
  ...(process.env.DELHIVERY_API_BASE_URL
    ? { baseUrl: process.env.DELHIVERY_API_BASE_URL }
    : {}),
});

const app = Fastify({ logger: true });

app.get<{ Params: { pincode: string } }>("/serviceability/:pincode", async (request) =>
  delhivery.serviceability.check(request.params.pincode),
);

app.get<{ Params: { waybill: string } }>("/tracking/:waybill", async (request) =>
  delhivery.tracking.track(request.params.waybill),
);

await app.listen({
  port: Number(process.env.PORT ?? 3000),
  host: process.env.HOST ?? "0.0.0.0",
});
