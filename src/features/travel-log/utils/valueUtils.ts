import type { RecommendValue, RecommendableItem } from "#features/travel-log/types/domain/common";

export function hasValue(value: unknown): boolean {
  return value !== null && value !== undefined && value !== "";
}

export function normalizeRecommendValue(value: RecommendValue): string {
  if (value === true) {
    return "yes";
  }

  if (value === false) {
    return "no";
  }

  if (typeof value === "string") {
    return value.trim().toLowerCase();
  }

  return "";
}

export function getRecommendValue(item: Pick<RecommendableItem, "recommend" | "recommendend">) {
  return item.recommend ?? item.recommendend;
}

export function getRecommendStatus(value: RecommendValue) {
  const normalized = normalizeRecommendValue(value);

  if (normalized === "yes" || normalized === "recommended") {
    return {
      label: "Recommended",
      tone: "positive" as const,
    };
  }

  if (normalized === "no" || normalized === "not recommended") {
    return {
      label: "Not recommended",
      tone: "negative" as const,
    };
  }

  if (normalized) {
    return {
      label: normalized,
      tone: "neutral" as const,
    };
  }

  return null;
}

