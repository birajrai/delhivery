import type { DelhiveryRequestOptions } from "../types.js";

type Request = <T>(path: string, options?: DelhiveryRequestOptions) => Promise<T>;

export interface ServiceabilityResponse {
  delivery_codes: Array<{ postal_code: Record<string, unknown> }>;
}

export class ServiceabilityService {
  constructor(private readonly request: Request) {}

  check(pincode: string | number): Promise<ServiceabilityResponse> {
    return this.request("/c/api/pin-codes/json/", {
      query: { filter_codes: pincode },
    });
  }
}
