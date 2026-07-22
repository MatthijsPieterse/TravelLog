import type { RecommendableItem, RecommendationTree } from "#features/travel-log/types/domain/common";

export type ActivityItem = RecommendableItem;

export type FoodDrinkItem = RecommendableItem & {
  cuisine?: string;
};

export type AccommodationItem = RecommendableItem & {
  area?: string;
};

export type ExperienceItem = ActivityItem | FoodDrinkItem | AccommodationItem;

export type PlaceListGroup<T> = Record<string, T[] | undefined>;

export type PlaceEntry = {
  type?: string;
  summary?: {
    overallRating?: number | string | null;
    affordability?: number | string | null;
    foodRating?: number | string | null;
    nightlife?: number | string | null;
    walkability?: number | string | null;
    publicTransport?: number | string | null;
    returnInterest?: {
      level?: number | string | null;
      note?: string;
    };
  };
  description?: {
    intro?: string;
    standouts?: string[];
    tips?: string[];
    personalNotes?: string[];
    thingsToKnow?: string[];
    transportNotes?: string[];
  };
  lists?: {
    activities?: Array<PlaceListGroup<ActivityItem>>;
    food_and_drinks?: Array<PlaceListGroup<FoodDrinkItem>>;
    accommodations?: Array<PlaceListGroup<AccommodationItem>>;
    recommendedApps?: Array<{
      name: string;
      category: string;
      purpose: string;
      notes: string;
    }>;
    recommendationsFromOthers?: RecommendationTree;
  };
  metadata?: {
    tags?: string[];
    status?: string;
    lastUpdated?: string;
  };
  images?: string[];
};

