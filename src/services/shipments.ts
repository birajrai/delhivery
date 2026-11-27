import type { DelhiveryRequestOptions } from "../types.js";

type Request = <T>(path: string, options?: DelhiveryRequestOptions) => Promise<T>;

export class ShipmentService {
  constructor(private readonly request: Request) {}

  /** Manifest one or more shipments. Delhivery expects form fields format=json and data=<JSON>. */
  create(payload: Record<string, unknown>): Promise<unknown> {
    const body = new URLSearchParams({
      format: "json",
      data: JSON.stringify(payload),
    });
    return this.request("/api/cmu/create.json", {
      method: "POST",
      body,
    });
  }

  edit(payload: Record<string, unknown>): Promise<unknown> {
    return this.request("/api/p/edit", {
      method: "POST",
      body: payload,
    });
  }

  cancel(payload: Record<string, unknown>): Promise<unknown> {
    return this.edit({ ...payload, cancellation: "true" });
  }

  updateNdr(waybill: string, action: string, fields: Record<string, unknown> = {}): Promise<unknown> {
    return this.request("/api/p/update", {
      method: "POST",
      body: { waybill, act: action, ...fields },
    });
  }
}
