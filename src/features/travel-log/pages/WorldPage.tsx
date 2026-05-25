import { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";

import Spinner from "#shared/components/ui/Spinner";
import { WorldFavoriteHighlightsSection } from "#features/travel-log/components/world-page/sections/WorldFavoriteHighlightsSection";
import { RecommendedAppsSection } from "#features/travel-log/components/shared/sections/RecommendedAppsSection";
import { WorldWishlistSection } from "#features/travel-log/components/world-page/sections/WorldWishlistSection";
import PageFrame from "#features/travel-log/components/shared/layout/PageFrame";
import { useTravelLog } from "#features/travel-log/hooks/useTravelLog";

const WorldInteractiveMap = lazy(
  () =>
    import("#features/travel-log/components/world-page/sections/WorldInteractiveMap").then((module) => ({
      default: module.WorldInteractiveMap,
    })),
);

const TravelLogPage = () => {
  const { data, error, isError, isLoading } = useTravelLog();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-8 text-sm text-red-600">
        {error instanceof Error ? error.message : "Failed to load travel log."}
      </div>
    );
  }

  const worldEntry = data.data?.[0];

  return (
    <PageFrame
      eyebrow="Travel log"
      title={data.name ?? "World travel log"}
      description={worldEntry?.intro}
    >
      <Suspense fallback={<Spinner />}>
        <WorldInteractiveMap regions={data.regions} />
      </Suspense>

      <button
        type="button"
        onClick={() => navigate("/dashboard")}
        className="mt-3 h-10 w-full cursor-pointer rounded-lg border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-800 transition hover:bg-stone-50"
      >
        Go to Dashboard
      </button>

      <RecommendedAppsSection apps={worldEntry?.recommendedApps} />

      <WorldFavoriteHighlightsSection
        highlights={worldEntry?.favoriteHighlights}
      />

      <WorldWishlistSection wishlist={worldEntry?.wishlist} />
    </PageFrame>
  );
};

export default TravelLogPage;

