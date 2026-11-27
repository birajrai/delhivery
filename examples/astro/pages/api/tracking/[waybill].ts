import { DelhiveryClient } from "delhivery";
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const token = import.meta.env.DELHIVERY_API_TOKEN;
  if (!token) {
    return Response.json({ error: "Shipping service is not configured." }, { status: 500 });
  }

  try {
    const client = new DelhiveryClient({
      token,
      environment: import.meta.env.DELHIVERY_ENV === "staging" ? "staging" : "production",
      ...(import.meta.env.DELHIVERY_API_BASE_URL
        ? { baseUrl: import.meta.env.DELHIVERY_API_BASE_URL }
        : {}),
    });
    const tracking = await client.tracking.track(params.waybill ?? "");
    return Response.json(tracking);
  } catch {
    return Response.json({ error: "Unable to fetch tracking details." }, { status: 502 });
  }
};
