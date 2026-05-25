import type { RecommendedApp } from "#features/travel-log/types/domain/nation";

export type RegionDescription = {
  intro?: string;
  tips?: string[];
  personalNotes?: string[];
};

export type RegionTransportType = {
  type: string;
  notes?: string[];
};

export type RegionTravelCorridor = {
  route: string;
  transportType?: string;
  notes?: string;
};

export type RegionFavourites = {
  nations?: string[];
  places?: Array<{
    name: string;
    country?: string;
  }>;
};

export type RegionDataEntry = {
  description?: RegionDescription;
  transportSystems?: {
    commonTransportTypes?: RegionTransportType[];
    majorTravelCorridors?: RegionTravelCorridor[];
  };
  favourites?: RegionFavourites;
  recommendedApps?: RecommendedApp[];
  metadata?: {
    tags?: string[];
    status?: string;
    lastUpdated?: string;
  };
};

