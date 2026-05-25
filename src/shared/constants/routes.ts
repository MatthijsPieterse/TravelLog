export const ROUTES = {
  home: "/",
  dashboard: "/dashboard",
  region: "/region/:regionSlug",
  nation: "/nation/:nationSlug",
  place: "/place/:placeSlug",
} as const;

export const buildRegionRoute = (regionSlug: string) => `/region/${regionSlug}`;
export const buildNationRoute = (nationSlug: string) => `/nation/${nationSlug}`;
export const buildPlaceRoute = (placeSlug: string) => `/place/${placeSlug}`;
