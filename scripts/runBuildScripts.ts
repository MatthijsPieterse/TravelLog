import {
  readJSON,
  writeJSON,
  joinPath,
  INPUT_DIR_SOURCE,
  DIR_TILES,
  DIR_APP,
} from "./utils/fileUtils.ts";
import { processVisitedPlaces } from "./pipeline/processVisitedPlaces.ts";
import { buildTravelLogData } from "./pipeline/buildTravelLogData.ts";
import { buildDashboardData } from "./pipeline/buildDashboardData.ts";
import type { VisitedGeoJSON, WorldRegions } from "./types.ts";
import type { DashboardData } from "../src/shared/types/dashboardData.ts";

const run = async () => {
  // Load input data
  const visitedNations = readJSON<VisitedGeoJSON>(
    joinPath(INPUT_DIR_SOURCE, "visitedNations.geojson"),
  );
  const visitedPlaces = readJSON<VisitedGeoJSON>(
    joinPath(INPUT_DIR_SOURCE, "visitedPlaces.geojson"),
  );
  const worldRegions = readJSON<WorldRegions>(
    joinPath(INPUT_DIR_SOURCE, "worldRegions.json"),
  );
  let travelLogMaster: any = {};
  try {
    travelLogMaster = readJSON<any>(
      joinPath(DIR_APP, "travel-log", "travelLogMaster.json"),
    );
  } catch {
    travelLogMaster = {};
  }
  const landTiles1 = readJSON<number[]>(
    joinPath(DIR_TILES, "landTiles_1.json"),
  );
  const landTiles05 = readJSON<number[]>(
    joinPath(DIR_TILES, "landTiles_0.5.json"),
  );

  // Process visited places
  await processVisitedPlaces({
    geoJson: visitedPlaces,
    worldRegions,
    travelLogMaster,
  });

  // Build Travel Log data json
  buildTravelLogData();

  // Build dashboard json
  const dashboardStats: DashboardData = buildDashboardData({
    visitedNations: visitedNations,
    visitedPlaces,
    landTiles1,
    landTiles05,
  });

  // Write output
  writeJSON(joinPath(DIR_APP, "dashboardStats.json"), dashboardStats);
};

(async () => {
  try {
    await run();
    console.log("✅ Data processing complete");
  } catch (err) {
    console.error("❌ Data processing failed:", err);
    process.exit(1);
  }
})();
