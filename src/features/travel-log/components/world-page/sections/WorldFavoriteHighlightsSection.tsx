import { GridSection } from "#features/travel-log/components/shared/sections/GridSection";
import { ItemCard } from "#features/travel-log/components/shared/cards/ItemCard";
import type { WorldFavoriteHighlight } from "#features/travel-log/types/domain/world";
import { CollapsibleSection } from "#features/travel-log/components/shared/sections/CollapsibleSection";

type WorldFavoriteHighlightsSectionProps = {
  highlights?: WorldFavoriteHighlight[];
};

export const WorldFavoriteHighlightsSection = ({
  highlights,
}: WorldFavoriteHighlightsSectionProps) => {
  if (!highlights || highlights.length === 0) return null;

  return (
    <CollapsibleSection title="⭐ Favorite highlights">
      <GridSection
        items={highlights}
        columns="md"
        renderItem={(item) => {
          const highlight = item as WorldFavoriteHighlight;
          return (
            <ItemCard
              title={highlight.name}
              subtitle={[highlight.type, highlight.location]
                .filter(Boolean)
                .join(" • ")}
              content={highlight.notes}
              className="bg-gradient-to-br from-white to-amber-50/50 hover:border-amber-200"
            />
          );
        }}
      />
    </CollapsibleSection>
  );
};

