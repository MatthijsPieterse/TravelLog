export type Coordinates = [number, number]; // [longitude, latitude]

export interface VisitedFeature {
  geometry: {
    coordinates: Coordinates;
  };
  properties: {
    name: string;
  };
}

export interface VisitedGeoJSON {
  features: VisitedFeature[];
}

export type TileFeature = {
  type: "Feature";
  properties: {
    visited: boolean;
  };
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
};

export type TileFeatureCollection = {
  type: "FeatureCollection";
  features: TileFeature[];
};

export type PlaceEntry = {
  name: string;
  englishName: string;
  coordinates: Coordinates;
};

export type PlaceFile = {
  name: string;
  data: unknown[];
  places: PlaceEntry[];
};

export type WorldRegions = {
  regions: {
    name: string;
    nations: {
      name: string;
      territories?: {
        name: string;
        type: string;
      }[];
    }[];
  }[];
};

export type PlaceResolution = {
  regionName: string;
  nationName: string;
  territoryName?: string;
  isTerritory: boolean;
  filePath: string;
};

export type NominatimReverseResponse = {
  address?: {
    hamlet?: string;
    suburb?: string;
    village?: string;
    town?: string;
    city?: string;
    municipality?: string;
    county?: string;
    state?: string;
    country?: string;
    country_code?: string;
    territory?: string;
    island?: string;
    archipelago?: string;
    state_district?: string;
    region?: string;
  };
  name?: string;
  display_name?: string;
};
