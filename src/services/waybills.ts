import type { DelhiveryRequestOptions } from "../types.js";

type Request = <T>(path: string, options?: DelhiveryRequestOptions) => Promise<T>;

export class WaybillService {
  constructor(private readonly request: Request) {}

  fetch(clientName: string): Promise<string> {
    return this.request("/waybill/api/fetch/json/", {
      query: { cl: clientName },
    });
  }

  fetchBulk(clientName: string, count: number): Promise<string[]> {
    if (!Number.isInteger(count) || count < 1 || count > 10_000) {
      throw new RangeError("Waybill count must be an integer from 1 to 10,000.");
    }
    return this.request("/waybill/api/bulk/json/", {
      query: { cl: clientName, count },
    });
  }
}
