import { lazy, Suspense } from "react";
import { Navigate, useParams } from "react-router-dom";

import Spinner from "#shared/components/ui/Spinner";
import { ROUTES, buildNationRoute, buildRegionRoute } from "#shared/constants/routes";

import { DescriptionSection } from "#features/travel-log/components/nation-page/sections/DescriptionSection";
import { FoodCultureSection } from "#features/travel-log/components/nation-page/sections/FoodCultureSection";
import { NationOverviewSection } from "#features/travel-log/components/nation-page/sections/NationOverviewSection";
import { NationTravelPracticalitiesPanel } from "#features/travel-log/components/nation-page/sections/NationTravelPracticalitiesPanel";
import { RegionsOverviewSection } from "#features/travel-log/components/nation-page/sections/RegionsOverviewSection";
import PageFrame from "#features/travel-log/components/shared/layout/PageFrame";
import { PageSectionGroups } from "#features/travel-log/components/shared/sections/PageSectionGroups";
import { RecommendedAppsSection } from "#features/travel-log/components/shared/sections/RecommendedAppsSection";
import { useTravelLog } from "#features/travel-log/hooks/useTravelLog";
import type { NationDataEntry } from "#features/travel-log/types/domain/nation";
import {
  getNationViewData,
  hasDetailedContent,
} from "#features/travel-log/utils/detailedNationUtils";
import { displayName, slugify } from "#features/travel-log/utils/stringUtils";
import {
  getEntityCoverImagePath,
  getNationById,
  toPlaceCard,
  toTerritoryCard,
} from "#features/travel-log/utils/travelLogUtils";

const ImgCarousel = lazy(
  () => import("#features/travel-log/components/shared/media/ImgCarousel"),
);
const RecommendationsSection = lazy(
  () =>
    import("#features/travel-log/components/shared/sections/RecommendationsSection").then((module) => ({
      default: module.RecommendationsSection,
    })),
);

const NationPage = () => {
  const { nationSlug = "" } = useParams();
  const { data, isLoading } = useTravelLog();

  if (isLoading || !data) {
    return <Spinner />;
  }

  const result = getNationById(data, nationSlug);

  if (!result) {
    return <Navigate to={ROUTES.home} replace />;
  }

  const { region, nation, parentNation } = result;

  const dataEntry = (nation.data?.[0] ?? null) as NationDataEntry | null;
  const hasDetailed = hasDetailedContent(dataEntry);

  const placeCards = nation.places.map((place) =>
    toPlaceCard(
      region,
      parentNation ?? nation,
      place,
      parentNation ? nation.name : undefined,
    ),
  );
  const territoryCards = nation.territories.map((territory) =>
    toTerritoryCard(region, nation, territory),
  );

  const { allImages } = getNationViewData({
    entry: dataEntry,
    regionName: region.name,
    nationName: nation.name,
  });

  return (
    <PageFrame
      eyebrow={parentNation ? "Territory" : "Nation"}
      title={displayName(nation.name, nation.englishName)}
      coverImage={getEntityCoverImagePath({
        type: parentNation ? "territory" : "nation",
        regionName: region.name,
        entityName: nation.name,
        parentNationName: parentNation?.name,
        coverImg: nation.coverImg,
      })}
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
        { label: displayName(nation.name, nation.englishName) },
      ]}
    >
      {hasDetailed && dataEntry?.description?.intro && (
        <NationOverviewSection allImages={allImages} dataEntry={dataEntry} />
      )}

      <div className="grid gap-5 lg:grid-cols-2">
        {dataEntry?.description && (
          <div className="rounded-xl border border-stone-200 bg-white p-5">
            <DescriptionSection description={dataEntry.description} />
          </div>
        )}
        {dataEntry?.foodCulture && (
          <div className="rounded-xl border border-stone-200 bg-gradient-to-br from-white to-emerald-50/50 p-5">
            <h2 className="mb-4 text-lg font-semibold text-stone-900">🍽️ Food & Culture</h2>
            <FoodCultureSection foodCulture={dataEntry.foodCulture} />
          </div>
        )}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {dataEntry?.travelPracticalities && (
          <NationTravelPracticalitiesPanel
            practicalities={dataEntry.travelPracticalities}
          />
        )}

        {dataEntry?.regionsOverview && dataEntry.regionsOverview.length > 0 && (
          <div className="lg:row-span-2">
            <h2 className="mb-4 text-lg font-semibold text-stone-900">📍 Regions</h2>
            <div className="space-y-3">
              <RegionsOverviewSection regions={dataEntry.regionsOverview} />
            </div>
          </div>
        )}

        {dataEntry?.recommendedApps && dataEntry.recommendedApps.length > 0 && (
          <div>
            <RecommendedAppsSection apps={dataEntry.recommendedApps} />
          </div>
        )}
      </div>

      <PageSectionGroups
        filledTitle="Documented places"
        emptyTitle="Undocumented places"
        items={placeCards}
      />

      {territoryCards.length ? (
        <PageSectionGroups
          filledTitle="Documented territories"
          emptyTitle="Undocumented territories"
          items={territoryCards}
        />
      ) : null}

      {allImages.length > 1 && (
        <Suspense fallback={<Spinner />}>
          <ImgCarousel
            images={allImages}
            height="lg"
            autoRotate={true}
            autoRotateDelayMs={5000}
          />
        </Suspense>
      )}

      {dataEntry && (
        <Suspense fallback={<Spinner />}>
          <RecommendationsSection
          recommendations={dataEntry.recommendationsFromOthers}
          title="💬 Extra recommendations from others"
          />
        </Suspense>
      )}
    </PageFrame>
  );
};

export default NationPage;

