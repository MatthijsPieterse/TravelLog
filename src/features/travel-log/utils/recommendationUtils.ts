import type { RecommendationItem, RecommendationTree } from "#features/travel-log/types/domain/common";

export function isRecommendationItem(value: unknown): value is RecommendationItem {
  return Boolean(value) && typeof value === "object" && "name" in (value as Record<string, unknown>);
}

export function isRecommendationItemList(value: unknown): value is RecommendationItem[] {
  return Array.isArray(value) && value.every(isRecommendationItem);
}

export function isRecommendationTree(value: unknown): value is RecommendationTree {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function hasRecommendationContent(tree?: RecommendationTree): boolean {
  if (!tree) {
    return false;
  }

  return Object.values(tree).some((value) => {
    if (isRecommendationItemList(value)) {
      return value.length > 0;
    }

    if (isRecommendationTree(value)) {
      return hasRecommendationContent(value);
    }

    return false;
  });
}

