import { readJSON, writeJSON } from "../utils/fileUtils.ts";
import type {
  VisitedGeoJSON,
  WorldRegions,
  PlaceFile,
  PlaceEntry,
} from "../types.ts";
import {
  coordinateKey,
  buildVisitedCoordinateIndex,
} from "../utils/geoUtils.ts";
import { reverseGeocode } from "../utils/apiUtils.ts";
import { resolvePlace, buildPlaceIndex } from "../utils/placeUtils.ts";

type ProcessParams = {
  geoJson: VisitedGeoJSON;
  worldRegions: WorldRegions;
  travelLogMaster: any;
};

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function placeAlreadyExists(
  places: PlaceEntry[],
  candidate: PlaceEntry,
): boolean {
  const candidateKey = coordinateKey(candidate.coordinates);

  return places.some(
    (place) => coordinateKey(place.coordinates) === candidateKey,
  );
}

function upsertPlaceFile(
  filePath: string,
  nationName: string,
  place: PlaceEntry,
): void {
  let doc: PlaceFile;
  try {
    doc = readJSON<PlaceFile>(filePath);
  } catch {
    doc = {
      name: nationName,
      data: [],
      places: [],
    };
  }

  if (!placeAlreadyExists(doc.places, place)) {
    doc.places.push(place);
  }

  writeJSON(filePath, doc);
}

export async function processVisitedPlaces({
  geoJson,
  worldRegions,
  travelLogMaster,
}: ProcessParams): Promise<void> {
  const placeIndex = buildPlaceIndex(worldRegions);
  const seenCoordinates = buildVisitedCoordinateIndex(travelLogMaster);

  for (const feature of geoJson.features) {
    const [lon, lat] = feature.geometry.coordinates;
    const key = coordinateKey([lon, lat]);

    if (seenCoordinates.has(key)) continue;

    try {
      const reverse = await reverseGeocode(lat, lon);
      const resolution = resolvePlace(placeIndex, reverse);

      if (!resolution) {
        console.warn(
          `Could not resolve region/country/territory for ${lat},${lon}`,
        );
        await sleep(1100);
        continue;
      }

      const placeName =
        feature.properties.name ||
        `unknown-${lat.toFixed(5)}-${lon.toFixed(5)}`;

      await upsertPlaceFile(
        resolution.filePath,
        resolution.territoryName ?? resolution.nationName,
        {
          name: placeName,
          englishName: "",
          coordinates: [lon, lat],
        },
      );

      seenCoordinates.add(key);

      console.log(`Added ${placeName} -> ${resolution.filePath}`);

      await sleep(1100);
    } catch (error) {
      console.error(`Failed for ${lat},${lon}`, error);
      await sleep(1100);
    }
  }

  console.log("Visited places processing complete.");
}
