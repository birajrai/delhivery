import type { DelhiveryRequestOptions } from "../types.js";

type Request = <T>(path: string, options?: DelhiveryRequestOptions) => Promise<T>;

export class TrackingService {
  constructor(
    private readonly request: Request,
    private readonly token: string,
  ) {}

  track(waybill: string): Promise<unknown> {
    return this.request("/api/v1/packages/json/", {
      query: { token: this.token, waybill },
    });
  }
}
