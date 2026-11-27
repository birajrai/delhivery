import type { DelhiveryRequestOptions } from "../types.js";

type Request = <T>(path: string, options?: DelhiveryRequestOptions) => Promise<T>;

export interface ShippingChargeQuery {
  md: "E" | "S";
  cgm: number;
  o_pin: string | number;
  d_pin: string | number;
  ss: "Delivered" | "RTO" | "DTO";
}

export class ChargeService {
  constructor(private readonly request: Request) {}

  /** Approximate charge estimate; final billed charges may differ. */
  estimate(query: ShippingChargeQuery): Promise<unknown> {
    return this.request("/api/kinko/v1/invoice/charges/.json", { query: { ...query } });
  }
}
