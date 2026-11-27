import express from "express";
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

const app = express();
app.use(express.json());

app.get("/serviceability/:pincode", async (req, res, next) => {
  try {
    res.json(await delhivery.serviceability.check(req.params.pincode));
  } catch (error) {
    next(error);
  }
});

app.get("/tracking/:waybill", async (req, res, next) => {
  try {
    res.json(await delhivery.tracking.track(req.params.waybill));
  } catch (error) {
    next(error);
  }
});

app.listen(Number(process.env.PORT ?? 3000), () => {
  console.log("Express example listening on port", process.env.PORT ?? 3000);
});
