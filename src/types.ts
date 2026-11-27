export interface DelhiveryClientOptions {
  /**
   * API origin supplied by Delhivery for your account/environment.
   * Overrides the built-in Express API origin when provided.
   */
  baseUrl?: string;
  /** Built-in Express API environment. Defaults to production. */
  environment?: "production" | "staging";
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
