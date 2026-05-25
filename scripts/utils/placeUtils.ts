import path from "node:path";
import type {
  NominatimReverseResponse,
  PlaceResolution,
  WorldRegions,
} from "../types.ts";
import { TRAVEL_LOG_DIR } from "./fileUtils.ts";
import { normalize, slugify } from "./stringUtils.ts";

export function pickPlaceName(result: NominatimReverseResponse): string | null {
  const a = result.address;
  if (!a) return null;

  return a.hamlet ?? a.village ?? a.town ?? a.city ?? a.municipality ?? null;
}

function pickNationCandidateNames(result: NominatimReverseResponse): string[] {
  const a = result.address;
  if (!a) return [];

  return [
    a.territory,
    a.island,
    a.archipelago,
    a.state_district,
    a.region,
    a.country,
  ]
    .filter((v): v is string => Boolean(v))
    .map(normalize);
}

export function resolvePlace(
  placeIndex: Map<string, PlaceResolution>,
  result: NominatimReverseResponse,
): PlaceResolution | null {
  for (const candidate of pickNationCandidateNames(result)) {
    const match = placeIndex.get(candidate);
    if (match) return match;
  }

  return null;
}

export function buildPlaceIndex(
  worldRegions: WorldRegions,
): Map<string, PlaceResolution> {
  const index = new Map<string, PlaceResolution>();

  for (const region of worldRegions.regions) {
    for (const nation of region.nations) {
      const nationKey = normalize(nation.name);

      index.set(nationKey, {
        regionName: region.name,
        nationName: nation.name,
        isTerritory: false,
        filePath: path.join(
          TRAVEL_LOG_DIR,
          "regions",
          slugify(region.name),
          slugify(nation.name),
          `${slugify(nation.name)}.json`,
        ),
      });

      for (const territory of nation.territories ?? []) {
        const territoryKey = normalize(territory.name);

        index.set(territoryKey, {
          regionName: region.name,
          nationName: nation.name,
          territoryName: territory.name,
          isTerritory: true,
          filePath: path.join(
            TRAVEL_LOG_DIR,
            "regions",
            slugify(region.name),
            slugify(nation.name),
            "territories",
            slugify(territory.name),
            `${slugify(territory.name)}.json`,
          ),
        });
      }
    }
  }

  return index;
}

export { normalize as normalizeName };
