import { useLoaderData } from "react-router";
import type { Route } from "./+types/tracking";

export async function loader({ params, request }: Route.LoaderArgs) {
  const endpoint = new URL(
    `/api/tracking/${encodeURIComponent(params.waybill ?? "")}`,
    request.url,
  );
  const response = await fetch(endpoint);
  if (!response.ok) throw new Response("Unable to fetch tracking details.", { status: 502 });
  return response.json() as Promise<unknown>;
}

export default function TrackingRoute() {
  const result = useLoaderData<unknown>();
  return <pre>{JSON.stringify(result, null, 2)}</pre>;
}
