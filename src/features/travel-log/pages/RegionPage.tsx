import { Navigate, useParams } from "react-router-dom";

import Spinner from "#shared/components/ui/Spinner";
import { ROUTES } from "#shared/constants/routes";

import { RegionDescriptionSection } from "#features/travel-log/components/region-page/sections/RegionDescriptionSection";
import { RegionFavouritesSection } from "#features/travel-log/components/region-page/sections/RegionFavouritesSection";
import { RegionRecommendedAppsSection } from "#features/travel-log/components/region-page/sections/RegionRecommendedAppsSection";
import { RegionTransportSystemsSection } from "#features/travel-log/components/region-page/sections/RegionTransportSystemsSection";
import PageFrame from "#features/travel-log/components/shared/layout/PageFrame";
import { PageSectionGroups } from "#features/travel-log/components/shared/sections/PageSectionGroups";
import { useTravelLog } from "#features/travel-log/hooks/useTravelLog";
import type { RegionDataEntry } from "#features/travel-log/types/domain/region";
import { displayName } from "#features/travel-log/utils/stringUtils";
import { getEntityCoverImagePath, getRegionById, toNationCard } from "#features/travel-log/utils/travelLogUtils";

const RegionPage = () => {
  const { regionSlug = "" } = useParams();
  const { data, isLoading } = useTravelLog();

  if (isLoading || !data) {
    return <Spinner />;
  }

  const region = getRegionById(data, regionSlug);

  if (!region) {
    return <Navigate to={ROUTES.home} replace />;
  }

  const regionEntry = (region.data?.[0] ?? null) as unknown as RegionDataEntry | null;

  return (
    <PageFrame
      eyebrow="Region"
      title={displayName(region.name, region.englishName)}
      coverImage={getEntityCoverImagePath({
        type: "region",
        regionName: region.name,
        entityName: region.name,
        coverImg: region.coverImg,
      })}
      crumbs={[
        { label: "Travel log", to: ROUTES.home },
        { label: displayName(region.name, region.englishName) },
      ]}
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <RegionDescriptionSection description={regionEntry?.description} />
        <RegionFavouritesSection favourites={regionEntry?.favourites} />
      </div>

      <RegionTransportSystemsSection transportSystems={regionEntry?.transportSystems} />

      <RegionRecommendedAppsSection apps={regionEntry?.recommendedApps} />

      <PageSectionGroups
        filledTitle="Documented nations"
        emptyTitle="Unfilled nations"
        items={region.nations.map((nation) => toNationCard(region, nation))}
        gridClassName="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        emptyBorderClassName="border-emerald-700"
      />
    </PageFrame>
  );
};

export default RegionPage;

