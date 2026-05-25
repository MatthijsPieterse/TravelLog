import { RecommendedAppsSection } from "#features/travel-log/components/shared/sections/RecommendedAppsSection";
import type { RecommendedApp } from "#features/travel-log/types/domain/nation";

type RegionRecommendedAppsSectionProps = {
  apps?: RecommendedApp[];
};

export const RegionRecommendedAppsSection = ({ apps }: RegionRecommendedAppsSectionProps) => {
  if (!apps || apps.length === 0) return null;

  return (
    <section>
      <RecommendedAppsSection apps={apps} />
    </section>
  );
};

