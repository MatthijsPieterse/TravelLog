import type { Coordinates } from "../types.ts";

export function coordinateKey([lon, lat]: Coordinates): string {
  return `${lat.toFixed(5)},${lon.toFixed(5)}`;
}

export function buildVisitedCoordinateIndex(master: any): Set<string> {
  const seen = new Set<string>();

  for (const region of master.regions ?? []) {
    for (const nation of region.nations ?? []) {
      for (const place of nation.places ?? []) {
        if (
          Array.isArray(place.coordinates) &&
          place.coordinates.length === 2
        ) {
          seen.add(coordinateKey(place.coordinates as Coordinates));
        }
      }

      for (const territory of nation.territories ?? []) {
        for (const place of territory.places ?? []) {
          if (
            Array.isArray(place.coordinates) &&
            place.coordinates.length === 2
          ) {
            seen.add(coordinateKey(place.coordinates as Coordinates));
          }
        }
      }
    }
  }

  return seen;
}
