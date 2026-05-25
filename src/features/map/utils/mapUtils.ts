import type { Feature, GeoJsonProperties } from "geojson";

import { nationNameMap } from "#features/map/mapping/nationNameMap";

type NationFeature = Feature & {
  properties?: GeoJsonProperties & { name?: string };
};

type TileFeature = Feature & {
  properties?: GeoJsonProperties & { visited?: boolean };
};

export function nationStyle(visitedNations: string[]) {
  return (feature?: NationFeature) => {
    const englishName = feature?.properties?.name;
    const localName = englishName ? nationNameMap[englishName] : undefined;
    const visited = localName
      ? visitedNations.some((v) =>
          v.toLowerCase().includes(localName.toLowerCase()),
        )
      : false;

    return {
      fillColor: visited ? "green" : "gray",
      weight: 1,
      color: "black",
      fillOpacity: 0.5,
    };
  };
}

export function tileStyle(feature?: TileFeature) {
  return {
    fillColor: feature?.properties?.visited ? "green" : "red",
    weight: 0.5,
    fillOpacity: 0.2,
  };
}

export function getMarkerSize(zoom: number) {
  return zoom < 5 ? 10 : zoom < 8 ? 15 : zoom < 12 ? 20 : 30;
}
