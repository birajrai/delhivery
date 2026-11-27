import { DelhiveryApiError } from "./errors.js";

export interface DelhiveryClientOptions {
  /** API origin supplied by Delhivery for your account/environment. */
  baseUrl: string;
  /** Delhivery One API token. Keep this secret and never expose it in a browser. */
  token: string;
  fetch?: typeof fetch;
  headers?: Record<string, string>;
}

export interface DelhiveryRequestOptions {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  query?: Record<string, string | number | boolean | null | undefined>;
  body?: unknown;
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

/**
 * Lightweight authenticated HTTP client. Endpoint paths and payloads should
 * follow the API documentation enabled for the customer's Delhivery account.
 */
export class DelhiveryClient {
  private readonly baseUrl: string;
  private readonly token: string;
  private readonly fetchImpl: typeof fetch;
  private readonly defaultHeaders: Record<string, string>;

  constructor(options: DelhiveryClientOptions) {
    if (!options.token.trim()) throw new TypeError("A Delhivery API token is required");
    this.baseUrl = options.baseUrl.replace(/\/+$/, "");
    this.token = options.token;
    this.fetchImpl = options.fetch ?? fetch;
    this.defaultHeaders = options.headers ?? {};
  }

  async request<T>(path: string, options: DelhiveryRequestOptions = {}): Promise<T> {
    const url = new URL(
      `${this.baseUrl}/${path.replace(/^\/+/, "")}`,
    );
    for (const [key, value] of Object.entries(options.query ?? {})) {
      if (value !== null && value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }

    const response = await this.fetchImpl(url, {
      method: options.method ?? "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Token ${this.token}`,
        ...this.defaultHeaders,
        ...options.headers,
        ...(options.body === undefined ? {} : { "Content-Type": "application/json" }),
      },
      ...(options.body === undefined ? {} : { body: JSON.stringify(options.body) }),
      signal: options.signal,
    });

    const text = await response.text();
    let data: unknown = undefined;
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }
    }
    if (!response.ok) {
      throw new DelhiveryApiError(
        `Delhivery API request failed with HTTP ${response.status}`,
        response.status,
        data,
      );
    }
    return data as T;
  }
}
