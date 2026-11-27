import type { DelhiveryRequestOptions } from "../types.js";

type Request = <T>(path: string, options?: DelhiveryRequestOptions) => Promise<T>;

export class LabelService {
  constructor(private readonly request: Request) {}

  /** Returns the packing-slip data; render it into a label in your application. */
  packingSlip(waybill: string): Promise<unknown> {
    return this.request("/api/p/packing_slip", {
      query: { wbns: waybill },
    });
  }
}
