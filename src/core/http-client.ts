import { DelhiveryApiError } from "../errors.js";
import type { DelhiveryClientOptions, DelhiveryRequestOptions } from "../types.js";

const API_ORIGINS = {
  production: "https://track.delhivery.com",
  staging: "https://staging-express.delhivery.com",
} as const;

export class HttpClient {
  private readonly baseUrl: string;
  private readonly token: string;
  private readonly fetchImpl: typeof fetch;
  private readonly defaultHeaders: Record<string, string>;

  constructor(options: DelhiveryClientOptions) {
    if (!options.token.trim()) throw new TypeError("A Delhivery API token is required");
    const baseUrl = options.baseUrl ?? API_ORIGINS[options.environment ?? "production"];
    this.baseUrl = baseUrl.replace(/\/+$/, "");
    this.token = options.token;
    this.fetchImpl = options.fetch ?? fetch;
    this.defaultHeaders = options.headers ?? {};
  }

  async request<T>(path: string, options: DelhiveryRequestOptions = {}): Promise<T> {
    const url = new URL(`${this.baseUrl}/${path.replace(/^\/+/, "")}`);
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
        ...(options.body === undefined
          ? {}
          : {
              "Content-Type":
                options.body instanceof URLSearchParams
                  ? "application/x-www-form-urlencoded"
                  : "application/json",
            }),
      },
      ...(options.body === undefined
        ? {}
        : {
            body:
              options.body instanceof URLSearchParams || typeof options.body === "string"
                ? options.body
                : JSON.stringify(options.body),
          }),
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
