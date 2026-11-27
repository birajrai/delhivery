import { Hono } from "hono";
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

const app = new Hono();

app.get("/serviceability/:pincode", async (context) => {
  const result = await delhivery.serviceability.check(context.req.param("pincode"));
  return context.json(result);
});

app.get("/tracking/:waybill", async (context) => {
  const result = await delhivery.tracking.track(context.req.param("waybill"));
  return context.json(result);
});

export default app;
