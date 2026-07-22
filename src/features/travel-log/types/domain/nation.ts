import type { RecommendationTree } from "#features/travel-log/types/domain/common";

export type NationSummary = {
  overallRating?: string;
  affordability?: string;
  transportRating?: string;
  foodRating?: string;
  returnInterest?: {
    level: string;
    note: string;
  };
};

export type NationDescription = {
  intro?: string;
  standouts?: string[];
  tips?: string[];
  thingsToKnow?: string[];
  culturalNotes?: string[];
  personalNotes?: string[];
};

export type TravelPracticalities = {
  visaNotes?: string;
  currency?: string;
  paymentNotes?: string[];
  paymentCulture?: string[];
  transportNotes?: string[];
  languageNotes?: string[];
  packingNotes?: string[];
  seasonalNotes?: SeasonalNote[];
};

export type SeasonalNote = {
  season: string;
  notes: string[];
};

export type FoodCulture = {
  mustTryDishes?: string[];
  foodNotes?: string[];
};

export type RegionOverview = {
  name: string;
  knownFor?: string[];
  notes?: string[];
};

export type AppLink = {
  url: string;
  title: string; // e.g., "Google Play", "App Store", "Web"
};

export type RecommendedApp = {
  name: string;
  category: string;
  purpose: string;
  notes?: string;
  links?: AppLink[] | string[]; // Support both new format and legacy string URLs
};

export type WishlistItem = {
  type: string;
  name: string;
  notes?: string;
};

export type NationDataEntry = {
  summary?: NationSummary;
  description?: NationDescription;
  travelPracticalities?: TravelPracticalities;
  foodCulture?: FoodCulture;
  regionsOverview?: RegionOverview[];
  recommendedApps?: RecommendedApp[];
  wishlist?: WishlistItem[];
  recommendationsFromOthers?: RecommendationTree;
  metadata?: {
    tags?: string[];
    status?: string;
    lastUpdated?: string;
  };
  images?: string[];
};

export type DetailedNationData = {
  name: string;
  coverImg?: string;
  data: NationDataEntry[];
  images?: string[];
  places: Array<{
    name: string;
    englishName?: string;
    coordinates: [number, number];
  }>;
};

