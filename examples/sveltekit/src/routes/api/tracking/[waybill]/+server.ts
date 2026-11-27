import { DelhiveryClient } from "delhivery";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params, platform }) => {
  const env = platform?.env as
    | {
        DELHIVERY_API_TOKEN?: string;
        DELHIVERY_ENV?: string;
        DELHIVERY_API_BASE_URL?: string;
      }
    | undefined;
  const token = env?.DELHIVERY_API_TOKEN ?? process.env.DELHIVERY_API_TOKEN;
  if (!token) return json({ error: "Shipping service is not configured." }, { status: 500 });

  try {
    const environment = env?.DELHIVERY_ENV ?? process.env.DELHIVERY_ENV;
    const baseUrl = env?.DELHIVERY_API_BASE_URL ?? process.env.DELHIVERY_API_BASE_URL;
    const client = new DelhiveryClient({
      token,
      environment: environment === "staging" ? "staging" : "production",
      ...(baseUrl ? { baseUrl } : {}),
    });
    return json(await client.tracking.track(params.waybill));
  } catch {
    return json({ error: "Unable to fetch tracking details." }, { status: 502 });
  }
};
