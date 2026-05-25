import type { VisitedGeoJSON, VisitedFeature } from "../../types.ts";

export const getGeoStats = (
  visitedGeoJSON: VisitedGeoJSON,
): {
  northernmost: VisitedFeature;
  southernmost: VisitedFeature;
} => {
  if (!visitedGeoJSON.features.length) throw new Error("No features provided");

  const { north, south } = visitedGeoJSON.features.reduce(
    (acc: { north: any; south: any }, feature: any) => {
      const [, lat] = feature.geometry.coordinates;

      if (lat > acc.north.geometry.coordinates[1]) acc.north = feature;
      if (lat < acc.south.geometry.coordinates[1]) acc.south = feature;

      return acc;
    },
    {
      north: visitedGeoJSON.features[0],
      south: visitedGeoJSON.features[0],
    },
  );

  const northernmost: VisitedFeature = {
    geometry: {
      coordinates: north.geometry.coordinates,
    },
    properties: {
      name: north.properties?.name || "N/A",
    },
  };

  const southernmost: VisitedFeature = {
    geometry: {
      coordinates: south.geometry.coordinates,
    },
    properties: {
      name: south.properties?.name || "N/A",
    },
  };

  return { northernmost, southernmost };
};
