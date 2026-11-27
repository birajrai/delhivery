import { HttpClient } from "./core/http-client.js";
import type { DelhiveryClientOptions, DelhiveryRequestOptions } from "./types.js";

/**
 * Public SDK client. API-specific service modules can be composed here as
 * their endpoints and schemas are verified against the account's portal docs.
 */
export class DelhiveryClient {
  private readonly http: HttpClient;

  constructor(options: DelhiveryClientOptions) {
    this.http = new HttpClient(options);
  }

  request<T>(path: string, options: DelhiveryRequestOptions = {}): Promise<T> {
    return this.http.request<T>(path, options);
  }
}
