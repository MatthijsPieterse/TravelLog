import type { VisitedGeoJSON } from "../../types.ts";
import { readDir, TRAVEL_LOG_WORLD_DIR } from "../../utils/fileUtils.ts";

export const getGlobalStats = (
  visitedNations: VisitedGeoJSON,
  visitedPlaces: VisitedGeoJSON,
) => {
  return {
    totalNations: visitedNations.features.length,
    totalPlaces: visitedPlaces.features.length,
    totalRegions: readDir(TRAVEL_LOG_WORLD_DIR).filter(
      (entry) => !entry.endsWith(".json"),
    ).length,
  };
};
