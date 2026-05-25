import type { NominatimReverseResponse } from "../types.ts";

export async function reverseGeocode(
  lat: number,
  lon: number,
): Promise<NominatimReverseResponse> {
  const url = new URL("https://nominatim.openstreetmap.org/reverse");
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lon));
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("zoom", "14");

  const response = await fetch(url.toString(), {
    headers: {
      "User-Agent": "TravelLog/1.0 (mjhf.pieterse@gmail.com)",
      "Accept-Language": "en",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Nominatim error: ${response.status} ${response.statusText}`,
    );
  }

  return (await response.json()) as NominatimReverseResponse;
}
