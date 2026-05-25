import path from "path";
import {
  readJSON,
  writeJSON,
  readDir,
  fileExists,
  TRAVEL_LOG_DIR,
  TRAVEL_LOG_WORLD_DIR,
} from "../utils/fileUtils.ts";
import { slugify } from "../utils/stringUtils.ts";

function mergeEntityWithPlaces<T extends Record<string, any>>(
  entityData: T,
  placesBaseDir: string,
): T & { places: any[] } {
  const places = (entityData.places ?? []).map((place: any) => {
    const placeSlug = slugify(place.name);

    const fullPlaceFile = path.join(
      placesBaseDir,
      placeSlug,
      `${placeSlug}.json`,
    );

    if (fileExists(fullPlaceFile)) {
      return readJSON<any>(fullPlaceFile);
    }

    return {
      ...place,
      data: place.data ?? [],
    };
  });

  return {
    ...entityData,
    places,
  };
}

export function buildTravelLogData() {
  const worldFile = path.join(TRAVEL_LOG_WORLD_DIR, "world.json");

  if (!fileExists(worldFile)) {
    throw new Error(`World JSON file not found: ${worldFile}`);
  }

  const worldData = readJSON<any>(worldFile);

  const result = {
    ...worldData,
    regions: [] as any[],
  };

  const regions = readDir(TRAVEL_LOG_WORLD_DIR).filter((entry) => {
    if (entry.endsWith(".json")) {
      return false;
    }

    const regionFile = path.join(TRAVEL_LOG_WORLD_DIR, entry, `${entry}.json`);
    return fileExists(regionFile);
  });

  for (const region of regions) {
    const regionPath = path.join(TRAVEL_LOG_WORLD_DIR, region);
    const regionFile = path.join(regionPath, `${region}.json`);

    if (!fileExists(regionFile)) {
      continue;
    }

    const regionData = readJSON<any>(regionFile);

    const regionObj = {
      ...regionData,
      nations: [] as any[],
    };

    const nations = readDir(regionPath).filter(
      (entry) => !entry.endsWith(".json"),
    );

    for (const nation of nations) {
      const nationDir = path.join(regionPath, nation);
      const nationFile = path.join(nationDir, `${nation}.json`);

      if (!fileExists(nationFile)) continue;

      const nationData = readJSON<any>(nationFile);

      const nationObj = mergeEntityWithPlaces(
        nationData,
        path.join(nationDir, "places"),
      );

      const territoriesDir = path.join(nationDir, "territories");

      const territories: any[] = [];

      if (fileExists(territoriesDir)) {
        for (const territory of readDir(territoriesDir)) {
          const territoryDir = path.join(territoriesDir, territory);
          const territoryFile = path.join(territoryDir, `${territory}.json`);

          if (!fileExists(territoryFile)) continue;

          const territoryData = readJSON<any>(territoryFile);

          const territoryObj = mergeEntityWithPlaces(
            territoryData,
            path.join(territoryDir, "places"),
          );

          territories.push(territoryObj);
        }
      }

      regionObj.nations.push({
        ...nationObj,
        territories,
      });
    }

    result.regions.push(regionObj);
  }

  writeJSON(
    path.join(process.cwd(), TRAVEL_LOG_DIR, "travelLogMaster.json"),
    result,
  );

  console.log("✅ Master data built!");
}
