import type { RegionOverview } from "#features/travel-log/types/domain/nation";
import { GridSection } from "#features/travel-log/components/shared/sections/GridSection";
import { ItemCard } from "#features/travel-log/components/shared/cards/ItemCard";

type RegionsOverviewSectionProps = {
  regions?: RegionOverview[];
};

export const RegionsOverviewSection = ({ regions }: RegionsOverviewSectionProps) => {
  if (!regions || regions.length === 0) return null;

  return (
    <GridSection
      items={regions}
      columns="sm"
      renderItem={(region) => {
        const typedRegion = region as RegionOverview;
        const runtimeNotes = (typedRegion as { notes?: unknown }).notes;
        const normalizedNotes = Array.isArray(runtimeNotes)
          ? runtimeNotes.filter((note): note is string => typeof note === "string")
          : typeof runtimeNotes === "string"
            ? runtimeNotes.trim()
              ? [runtimeNotes]
              : []
            : [];

        return (
          <ItemCard
            title={typedRegion.name}
            tags={typedRegion.knownFor}
            content={normalizedNotes.length ? normalizedNotes.join(" • ") : undefined}
            className="bg-gradient-to-br from-stone-50 to-white hover:border-emerald-200"
          />
        );
      }}
    />
  );
};
