import { RecommendedAppsSection } from "#features/travel-log/components/shared/sections/RecommendedAppsSection";
import type { PlaceEntry } from "#features/travel-log/types/domain/place";

type PlaceRecommendedAppsSectionProps = {
  recommendedApps: NonNullable<
    NonNullable<PlaceEntry["lists"]>["recommendedApps"]
  >;
};

export const PlaceRecommendedAppsSection = ({
  recommendedApps,
}: PlaceRecommendedAppsSectionProps) => (
  <section>
    <RecommendedAppsSection apps={recommendedApps} />
  </section>
);

