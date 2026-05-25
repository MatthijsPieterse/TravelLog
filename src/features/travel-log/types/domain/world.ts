import type { RecommendedApp } from "#features/travel-log/types/domain/nation";

export type WorldWishlistItem = {
  type: string;
  name: string;
  priority?: string;
  notes?: string;
};

export type WorldFavoriteHighlight = {
  type: string;
  name: string;
  location?: string;
  notes?: string;
};

export type WorldDataEntry = {
  intro?: string;
  recommendedApps?: RecommendedApp[];
  wishlist?: WorldWishlistItem[];
  favoriteHighlights?: WorldFavoriteHighlight[];
  metadata?: {
    tags?: string[];
    status?: string;
    lastUpdated?: string;
  };
};

