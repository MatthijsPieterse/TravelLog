import type { RecommendationTree } from "#features/travel-log/types/domain/common";
import type { PlaceEntry } from "#features/travel-log/types/domain/place";
import { getPlaceImageRootPath } from "#features/travel-log/utils/travelLogPaths";

type GetPlaceViewDataArgs = {
  entry: PlaceEntry | null;
  regionName: string;
  nationName: string;
  placeName: string;
  parentNationName?: string;
};

export function getPlaceViewData({ entry, regionName, nationName, placeName, parentNationName }: GetPlaceViewDataArgs) {
  const activitiesGroups = entry?.lists?.activities ?? [];
  const foodGroups = entry?.lists?.food_and_drinks ?? [];
  const accommodations = entry?.lists?.accommodations ?? [];
  const recommendations = entry?.lists?.recommendationsFromOthers as RecommendationTree | undefined;
  const recommendedApps = entry?.lists?.recommendedApps ?? [];
  const baseImagePath = getPlaceImageRootPath({ regionName, nationName, placeName, parentNationName });
  const overviewImages = (entry?.images ?? []).map((fileName) => `${baseImagePath}/${fileName}`);

  return {
    activitiesGroups,
    foodGroups,
    accommodations,
    recommendations,
    recommendedApps,
    coverImage: overviewImages[0],
    overviewCarouselImages: overviewImages.slice(1, 4),
    inlineImages: overviewImages.slice(4, 6),
    photoLogImages: overviewImages,
  };
}

