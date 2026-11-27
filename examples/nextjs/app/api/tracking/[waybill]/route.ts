import { DelhiveryClient } from "delhivery";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ waybill: string }> },
) {
  const token = process.env.DELHIVERY_API_TOKEN;
  if (!token) {
    return NextResponse.json({ error: "Shipping service is not configured." }, { status: 500 });
  }

  try {
    const { waybill } = await params;
    const client = new DelhiveryClient({
      token,
      environment: process.env.DELHIVERY_ENV === "staging" ? "staging" : "production",
      ...(process.env.DELHIVERY_API_BASE_URL
        ? { baseUrl: process.env.DELHIVERY_API_BASE_URL }
        : {}),
    });
    return NextResponse.json(await client.tracking.track(waybill));
  } catch {
    return NextResponse.json({ error: "Unable to fetch tracking details." }, { status: 502 });
  }
}
