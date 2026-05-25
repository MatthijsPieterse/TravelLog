export type Nullable<T> = T | null | undefined;

export type RecommendValue = string | boolean | Nullable<never>;

export type RecommendableItem = {
  name: string;
  type?: string;
  price?: string;
  comments?: string[];
  recommend?: RecommendValue;
  recommendend?: RecommendValue;
  lastUpdated?: string;
};

export type RecommendationItem = {
  name: string;
  notes?: string[];
  area?: string;
  [key: string]: unknown;
};

export type RecommendationTree = {
  [key: string]: RecommendationTree | RecommendationItem[] | undefined;
};
