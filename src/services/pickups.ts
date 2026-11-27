import type { DelhiveryRequestOptions } from "../types.js";

type Request = <T>(path: string, options?: DelhiveryRequestOptions) => Promise<T>;

export interface PickupRequest {
  pickup_time: string;
  pickup_date: string;
  pickup_location: string;
  expected_package_count: number;
}

export class PickupService {
  constructor(private readonly request: Request) {}

  create(payload: PickupRequest): Promise<unknown> {
    return this.request("/fm/request/new/", {
      method: "POST",
      body: payload,
    });
  }
}
