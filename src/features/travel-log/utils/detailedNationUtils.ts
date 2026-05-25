import type {
  DetailedNationData,
  FoodCulture,
  NationDataEntry,
  RecommendedApp,
  TravelPracticalities,
} from "#features/travel-log/types/domain/nation";
import { getNationRootPath } from "#features/travel-log/utils/travelLogPaths";

export function getNationImageBasePath(regionName: string, nationName: string): string {
  return `${getNationRootPath({ regionName, nationName })}/images/`;
}

export function getNationImageUrls(regionName: string, nationName: string, images?: string[]): string[] {
  if (!images || images.length === 0) {
    return [];
  }
  const basePath = getNationImageBasePath(regionName, nationName);
  return images.map((img) => `${basePath}${img}`);
}

type GetNationViewDataArgs = {
  entry: NationDataEntry | null;
  regionName: string;
  nationName: string;
};

export function getNationViewData({ entry, regionName, nationName }: GetNationViewDataArgs) {
  const baseImagePath = getNationImageBasePath(regionName, nationName);
  const allImages = (entry?.images ?? []).map((fileName) => `${baseImagePath}${fileName}`);

  return {
    coverImage: allImages[0],
    overviewCarouselImages: allImages.slice(1, 4),
    allImages,
  };
}

export function getDataEntry(detailedData: DetailedNationData | null | undefined): NationDataEntry | null {
  return detailedData?.data?.[0] ?? null;
}

export function getFoodCulture(entry: NationDataEntry | null): FoodCulture | null {
  return entry?.foodCulture ?? null;
}

export function getTravelPracticalities(entry: NationDataEntry | null): TravelPracticalities | null {
  return entry?.travelPracticalities ?? null;
}

export function getRecommendedApps(entry: NationDataEntry | null): RecommendedApp[] {
  return entry?.recommendedApps ?? [];
}

export function getIntro(entry: NationDataEntry | null): string | null {
  return entry?.description?.intro ?? null;
}

export function getRegionsOverview(entry: NationDataEntry | null) {
  return entry?.regionsOverview ?? [];
}

export function hasDetailedContent(entry: NationDataEntry | null): boolean {
  if (!entry) return false;
  return !!(
    entry.summary ||
    entry.description ||
    entry.travelPracticalities ||
    entry.foodCulture ||
    entry.regionsOverview?.length ||
    entry.recommendedApps?.length ||
    (entry.recommendationsFromOthers && Object.keys(entry.recommendationsFromOthers).length > 0)
  );
}

