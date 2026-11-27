import { DelhiveryClient } from "delhivery";

const {
  DELHIVERY_API_BASE_URL,
  DELHIVERY_API_TOKEN,
  DELHIVERY_ENV,
  WAYBILL,
} = process.env;

if (!DELHIVERY_API_TOKEN || !WAYBILL) {
  throw new Error(
    "Set DELHIVERY_API_TOKEN and WAYBILL.",
  );
}
if (DELHIVERY_ENV && DELHIVERY_ENV !== "production" && DELHIVERY_ENV !== "staging") {
  throw new Error('DELHIVERY_ENV must be either "production" or "staging".');
}

const delhivery = new DelhiveryClient({
  token: DELHIVERY_API_TOKEN,
  environment: DELHIVERY_ENV === "staging" ? "staging" : "production",
  // Optional: defaults to https://track.delhivery.com (production).
  // Set this for a custom Delhivery-provided API origin.
  ...(DELHIVERY_API_BASE_URL ? { baseUrl: DELHIVERY_API_BASE_URL } : {}),
});

try {
  const tracking = await delhivery.tracking.track(WAYBILL);
  console.log(JSON.stringify(tracking, null, 2));
} catch (error) {
  console.error("Shipment tracking request failed:", error);
  process.exitCode = 1;
}
