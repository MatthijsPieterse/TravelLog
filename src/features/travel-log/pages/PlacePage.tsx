import { lazy, Suspense } from "react";
import { Navigate, useParams } from "react-router-dom";

import Spinner from "#shared/components/ui/Spinner";
import {
  ROUTES,
  buildNationRoute,
  buildRegionRoute,
} from "#shared/constants/routes";

import { PlaceExperiencesTabsSection } from "#features/travel-log/components/place-page/sections/PlaceExperiencesTabsSection";
import { PlaceNotesSection } from "#features/travel-log/components/place-page/sections/PlaceNotesSection";
import { PlaceOverviewSection } from "#features/travel-log/components/place-page/sections/PlaceOverviewSection";
import { PlaceQuickNotesSection } from "#features/travel-log/components/place-page/sections/PlaceQuickNotesSection";
import { PlaceRecommendedAppsSection } from "#features/travel-log/components/place-page/sections/PlaceRecommendedAppsSection";
import PageFrame from "#features/travel-log/components/shared/layout/PageFrame";
import { useTravelLog } from "#features/travel-log/hooks/useTravelLog";
import type { PlaceEntry } from "#features/travel-log/types/domain/place";
import { getPlaceViewData } from "#features/travel-log/utils/placeDataUtils";
import { displayName, slugify } from "#features/travel-log/utils/stringUtils";
import { getPlaceById } from "#features/travel-log/utils/travelLogUtils";

const ImgCarousel = lazy(
  () => import("#features/travel-log/components/shared/media/ImgCarousel"),
);
const RecommendationsSection = lazy(
  () =>
    import("#features/travel-log/components/shared/sections/RecommendationsSection").then((module) => ({
      default: module.RecommendationsSection,
    })),
);

const PlacePage = () => {
  const { placeSlug = "" } = useParams();
  const { data, isLoading } = useTravelLog();

  if (isLoading || !data) {
    return <Spinner />;
  }

  const result = getPlaceById(data, placeSlug);

  if (!result) {
    return <Navigate to={ROUTES.home} replace />;
  }

  const { region, nation, place, parentNation } = result;
  const entry = (place.data?.[0] ?? null) as PlaceEntry | null;
  const {
    accommodations,
    activitiesGroups,
    coverImage,
    foodGroups,
    overviewCarouselImages,
    photoLogImages,
    recommendations,
    recommendedApps,
  } = getPlaceViewData({
    entry,
    regionName: region.name,
    nationName: nation.name,
    parentNationName: parentNation?.name,
    placeName: place.name,
  });

  return (
    <PageFrame
      eyebrow="Place"
      title={displayName(place.name, place.englishName)}
      description={`Coordinates: ${place.coordinates[1].toFixed(5)}, ${place.coordinates[0].toFixed(5)}`}
      coverImage={coverImage}
      crumbs={[
        { label: "Travel log", to: ROUTES.home },
        {
          label: displayName(region.name, region.englishName),
          to: buildRegionRoute(slugify(region.name)),
        },
        ...(parentNation
          ? [
              {
                label: displayName(parentNation.name, parentNation.englishName),
                to: buildNationRoute(slugify(parentNation.name)),
              },
            ]
          : []),
        {
          label: displayName(nation.name, nation.englishName),
          to: buildNationRoute(slugify(nation.name)),
        },
        { label: displayName(place.name, place.englishName) },
      ]}
    >
      <div className="grid gap-5 xl:grid-cols-[1.35fr_0.95fr]">
        <PlaceOverviewSection
          entry={entry}
          overviewCarouselImages={overviewCarouselImages}
        />

        <PlaceQuickNotesSection entry={entry} />
      </div>

      <PlaceNotesSection entry={entry} />

      <PlaceExperiencesTabsSection
        activitiesGroups={activitiesGroups}
        foodGroups={foodGroups}
        accommodations={accommodations}
      />

      {recommendedApps && recommendedApps.length > 0 && (
        <PlaceRecommendedAppsSection recommendedApps={recommendedApps} />
      )}

      <Suspense fallback={<Spinner />}>
        <ImgCarousel images={photoLogImages} height="lg" autoRotate />
      </Suspense>

      <Suspense fallback={<Spinner />}>
        <RecommendationsSection recommendations={recommendations} />
      </Suspense>
    </PageFrame>
  );
};

export default PlacePage;

