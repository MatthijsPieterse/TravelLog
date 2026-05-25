import {
  DEFAULT_RECOMMENDED_APP_CATEGORY_COLOR,
  RECOMMENDED_APP_CATEGORY_COLORS,
} from "#features/travel-log/constants/recommendedApps";

export type AppLink = {
  url: string;
  title?: string;
};

export function normalizeLink(link: unknown): AppLink | null {
  if (typeof link === "string") {
    return link ? { url: link, title: "Web" } : null;
  }

  if (typeof link === "object" && link !== null && "url" in link) {
    const value = link as { url?: unknown; title?: unknown };

    if (typeof value.url !== "string" || !value.url) return null;

    return {
      url: value.url,
      title: typeof value.title === "string" ? value.title : "Web",
    };
  }

  return null;
}

export function formatCategory(category?: string) {
  if (!category) return "App";

  return category
    .replaceAll("_", " ")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function getCategoryColor(category?: string) {
  if (!category) return DEFAULT_RECOMMENDED_APP_CATEGORY_COLOR;

  return RECOMMENDED_APP_CATEGORY_COLORS[category.toLowerCase()] ??
    DEFAULT_RECOMMENDED_APP_CATEGORY_COLOR;
}
