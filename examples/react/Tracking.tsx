import { useState } from "react";

export function Tracking() {
  const [waybill, setWaybill] = useState("");
  const [result, setResult] = useState<unknown>();
  const [error, setError] = useState("");

  async function track(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setResult(undefined);
    try {
      const response = await fetch(`/api/tracking/${encodeURIComponent(waybill)}`);
      if (!response.ok) throw new Error("Tracking request failed.");
      setResult(await response.json());
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Tracking request failed.");
    }
  }

  return (
    <section>
      <form onSubmit={track}>
        <label>
          Waybill
          <input value={waybill} onChange={(event) => setWaybill(event.target.value)} required />
        </label>
        <button type="submit">Track</button>
      </form>
      {error && <p role="alert">{error}</p>}
      {result !== undefined && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </section>
  );
}
