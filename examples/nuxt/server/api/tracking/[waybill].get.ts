import { DelhiveryClient } from "delhivery";
import { createError, defineEventHandler, getRouterParam } from "h3";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const token = config.delhiveryApiToken;
  if (!token) {
    throw createError({ statusCode: 500, statusMessage: "Shipping service is not configured." });
  }

  try {
    const client = new DelhiveryClient({
      token,
      environment: config.delhiveryEnvironment === "staging" ? "staging" : "production",
      ...(config.delhiveryApiBaseUrl ? { baseUrl: config.delhiveryApiBaseUrl } : {}),
    });
    return await client.tracking.track(getRouterParam(event, "waybill") ?? "");
  } catch {
    throw createError({ statusCode: 502, statusMessage: "Unable to fetch tracking details." });
  }
});
