// src/features/map/api/useMapData.ts
import { useQuery } from "@tanstack/react-query";
import type { FeatureCollection, GeoJsonObject, GeoJsonProperties } from "geojson";
import { DATA_PATHS } from "#shared/constants/dataPaths";
import { QUERY_KEYS } from "#shared/constants/queryKeys";
import { fetcher } from "#shared/lib/fetcher";
import { nationNameMap } from "#features/map/mapping/nationNameMap";

interface MapData {
  nations: GeoJsonObject;
  visitedNames: string[];
  visitedPlaces: GeoJsonObject;
  landTiles1: GeoJsonObject;
  landTiles05: GeoJsonObject;
}

type NamedFeatureCollection = FeatureCollection<GeoJSON.Geometry, GeoJsonProperties & { name?: string }>;

const fetchMapData = async (): Promise<MapData> => {
  const [
    nationsData,
    visitedNationsData,
    visitedPlacesData,
    landTiles1Data,
    landTiles05Data,
  ] = await Promise.all([
    fetcher<GeoJsonObject>(DATA_PATHS.nationsPolygons()),
    fetcher<GeoJsonObject>(DATA_PATHS.visitedNations()),
    fetcher<GeoJsonObject>(DATA_PATHS.visitedPlaces()),
    fetcher<GeoJsonObject>(DATA_PATHS.tileOverlay1()),
    fetcher<GeoJsonObject>(DATA_PATHS.tileOverlay05()),
  ]);

  const visitedFeatures =
    visitedNationsData.type === "FeatureCollection"
      ? (visitedNationsData as NamedFeatureCollection).features
      : [];

  const visitedNames = visitedFeatures
    .map((f) => f?.properties?.name)
    .filter((name): name is string => Boolean(name))
    .map((englishName) => nationNameMap[englishName] ?? englishName);

  return {
    nations: nationsData,
    visitedNames,
    visitedPlaces: visitedPlacesData,
    landTiles1: landTiles1Data,
    landTiles05: landTiles05Data,
  };
};

export const useMapData = () => {
  return useQuery<MapData>({
    queryKey: QUERY_KEYS.mapData,
    queryFn: fetchMapData,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
};
