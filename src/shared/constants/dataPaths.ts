import { getBaseUrl } from "#shared/lib/fetcher";

export const DATA_PATHS = {
  dashboardStats: () => `${getBaseUrl()}data/app/dashboardStats.json`,
  travelLogMaster: () => `${getBaseUrl()}data/app/travel-log/travelLogMaster.json`,
  nationsPolygons: () => `${getBaseUrl()}data/source/nationsPolygons.geojson`,
  visitedNations: () => `${getBaseUrl()}data/source/visitedNations.geojson`,
  visitedPlaces: () => `${getBaseUrl()}data/source/visitedPlaces.geojson`,
  tileOverlay1: () => `${getBaseUrl()}data/app/overlays/tileOverlay_1.geojson`,
  tileOverlay05: () => `${getBaseUrl()}data/app/overlays/tileOverlay_0.5.geojson`,
} as const;
